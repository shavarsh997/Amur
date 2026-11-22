#!/bin/zsh
# One-time Google authorization for the SHINEX marketing agent.
# Waits for the Desktop OAuth client JSON (client_secret_*.json) in ~/Downloads,
# moves it to a private folder and creates Application Default Credentials
# with Google Ads (adwords — no read-only scope exists, the code enforces read-only), GA4 and
# Search Console read-only scopes plus cloud-platform. No secret is stored in the repo.
set -euo pipefail
setopt null_glob
DIR="$HOME/.config/shinex-marketing"
CLIENT="$DIR/oauth-client.json"
mkdir -p "$DIR" && chmod 700 "$DIR"
if [[ ! -f "$CLIENT" ]]; then
  echo "Waiting for ~/Downloads/client_secret_*.json ..."
  while true; do
    f=$(ls -t "$HOME"/Downloads/client_secret_*.json 2>/dev/null | head -1 || true)
    [[ -n "$f" ]] && break
    sleep 3
  done
  mv "$f" "$CLIENT" && chmod 600 "$CLIENT"
  echo "Client saved to $CLIENT"
fi
gcloud auth application-default login \
  --client-id-file="$CLIENT" \
  --scopes=https://www.googleapis.com/auth/adwords,https://www.googleapis.com/auth/analytics.readonly,https://www.googleapis.com/auth/webmasters.readonly,https://www.googleapis.com/auth/cloud-platform
gcloud auth application-default set-quota-project shinex-marketing-agent
echo "DONE: Google authorization complete."
