export function slugify(id) {
  return String(id).replace(/\s+/g, "-").toLowerCase();
}
