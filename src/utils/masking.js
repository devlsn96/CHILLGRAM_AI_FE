export function maskName(name = "") {
  const trimmed = String(name).trim();
  if (!trimmed) return "익명";

  if (trimmed.length === 1) return trimmed;
  if (trimmed.length === 2) return trimmed[0] + "*";

  return (
    trimmed[0] + "*".repeat(trimmed.length - 2) + trimmed[trimmed.length - 1]
  );
}

export function maskEmail(email = "") {
  const trimmed = String(email).trim();
  if (!trimmed) return "익명";

  const [local, domain] = trimmed.split("@");

  if (!domain) return trimmed[0] + "*".repeat(trimmed.length - 1);

  if (local.length <= 2) {
    return local[0] + "*" + "@" + domain;
  }

  return local.slice(0, 4) + "*".repeat(local.length - 2) + "@" + domain;
}
