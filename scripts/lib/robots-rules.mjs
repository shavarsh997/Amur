/** Robots groups and path rules used by this site's smoke checks (no dependency). */
export function robotsAllows(text, url, userAgent = "Googlebot") {
  const groups = [];
  let group;
  for (const line of text.split(/\r?\n/)) {
    const match = line
      .replace(/#.*/, "")
      .trim()
      .match(/^([^:]+):\s*(.*)$/);
    if (!match) continue;
    const key = match[1].trim().toLowerCase();
    const value = match[2].trim();
    if (key === "user-agent") {
      if (!group || group.seenRules) {
        group = { agents: [], rules: [], seenRules: false };
        groups.push(group);
      }
      group.agents.push(value.toLowerCase());
    } else if (group && ["allow", "disallow"].includes(key)) {
      group.seenRules = true;
      if (!value) continue;
      if (!value.startsWith("/"))
        throw new Error(`Invalid robots path: ${value}`);
      group.rules.push({ allow: key === "allow", pattern: value });
    }
  }
  const agent = userAgent.toLowerCase();
  const scored = groups.map((entry) => ({
    ...entry,
    score: Math.max(
      -1,
      ...entry.agents.map((name) =>
        name === "*" ? 0 : agent.includes(name) ? name.length : -1
      )
    ),
  }));
  const best = Math.max(-1, ...scored.map(({ score }) => score));
  const parsed = new URL(url);
  const path = parsed.pathname + parsed.search;
  const matches = scored
    .filter(({ score }) => score >= 0 && score === best)
    .flatMap(({ rules }) => rules)
    .filter(({ pattern }) => {
      const exact = pattern.endsWith("$");
      const body = exact ? pattern.slice(0, -1) : pattern;
      const regex = body
        .split("*")
        .map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
        .join(".*");
      return new RegExp(`^${regex}${exact ? "$" : ""}`).test(path);
    })
    .sort(
      (a, b) =>
        b.pattern.replace(/[*$]/g, "").length -
          a.pattern.replace(/[*$]/g, "").length ||
        Number(b.allow) - Number(a.allow)
    );
  return matches[0]?.allow ?? true;
}
