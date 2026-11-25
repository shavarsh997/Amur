#!/usr/bin/env bash
# PreToolUse hook (Bash): blocks `git commit` when secrets or forbidden files
# would end up in the commit. Exit 2 = block (reason in stderr), exit 0 = allow.

input="$(cat)"
command -v jq >/dev/null 2>&1 || exit 0

cmd="$(printf '%s' "$input" | jq -r '.tool_input.command // empty' 2>/dev/null)"
[ -z "$cmd" ] && exit 0

# Only git commit commands are checked.
printf '%s' "$cmd" | grep -Eq '(^|[^[:alnum:]_./-])git([[:space:]]+[^;&|]*)?[[:space:]]commit([[:space:]]|$|;|&|\|)' || exit 0

# The index is checked before the command runs, so `git add … && git commit` would slip through.
printf '%s' "$cmd" | grep -Eq '(^|[^[:alnum:]_./-])git[[:space:]]+add([[:space:]]|$)' && { echo "Хук block-secret-commit.sh: запусти git add и git commit отдельными командами, чтобы проверить индекс." >&2; exit 2; }

# Resolve the repo: hook cwd from JSON, then current dir.
hook_cwd="$(printf '%s' "$input" | jq -r '.cwd // empty' 2>/dev/null)"
[ -n "$hook_cwd" ] && [ -d "$hook_cwd" ] || hook_cwd="$PWD"
top="$(git -C "$hook_cwd" rev-parse --show-toplevel 2>/dev/null)" || exit 0
[ -z "$top" ] && exit 0

g() { git -C "$top" "$@"; }

# Does the command also commit tracked working-tree changes (-a, -am, --all)?
include_worktree=0
if printf '%s' "$cmd" | grep -Eq '(^|[[:space:]])(-[A-Za-z]*a[A-Za-z]*|--all)([[:space:]]|$)'; then
  include_worktree=1
fi

files="$(g diff --cached --name-only --diff-filter=d 2>/dev/null)"
if [ "$include_worktree" = 1 ]; then
  files="$(printf '%s\n%s\n' "$files" "$(g diff --name-only --diff-filter=d 2>/dev/null)")"
fi
files="$(printf '%s\n' "$files" | sed '/^$/d' | sort -u)"
[ -z "$files" ] && exit 0

bad_names=""
while IFS= read -r f; do
  [ -z "$f" ] && continue
  base="${f##*/}"
  reason=""
  case "$f" in
    sites/*) reason="папка sites/" ;;
  esac
  case "$base" in
    .env.example) ;;
    .env|.env.*) reason="файл окружения .env" ;;
    *.pem) reason="ключ/сертификат .pem" ;;
    *oauth-client*.json) reason="OAuth client secret" ;;
    application_default_credentials.json) reason="Google ADC credentials" ;;
  esac
  [ -n "$reason" ] && bad_names="${bad_names}  - ${f} (${reason})"$'\n'
done <<< "$files"

patterns=(
  -e 'ya29\.'
  -e '1//0[A-Za-z0-9_-]{20,}'
  -e 'AIza[0-9A-Za-z_-]{35}'
  -e '-----BEGIN [A-Z ]*PRIVATE KEY'
  -e '[0-9]{8,10}:[A-Za-z0-9_-]{35}'
  -e 'GOCSPX-'
)

bad_content=""
while IFS= read -r f; do
  [ -z "$f" ] && continue
  added="$(g diff --cached -U0 -- "$f" 2>/dev/null)"
  if [ "$include_worktree" = 1 ]; then
    added="${added}"$'\n'"$(g diff -U0 -- "$f" 2>/dev/null)"
  fi
  if printf '%s\n' "$added" | grep -E '^\+' | grep -Ev '^\+\+\+ ' | grep -Eq "${patterns[@]}"; then
    bad_content="${bad_content}  - ${f}"$'\n'
  fi
done <<< "$files"

if [ -n "$bad_names" ] || [ -n "$bad_content" ]; then
  {
    echo "Коммит заблокирован хуком block-secret-commit.sh: в него попадают секреты или запрещённые файлы."
    if [ -n "$bad_names" ]; then
      echo "Запрещённые файлы:"
      printf '%s' "$bad_names"
    fi
    if [ -n "$bad_content" ]; then
      echo "Похоже на токен/ключ в добавленных строках (значение не показано):"
      printf '%s' "$bad_content"
    fi
    echo "Убери их из индекса (git restore --staged <файл>) и вынеси секреты в .env / менеджер секретов."
  } >&2
  exit 2
fi

exit 0
