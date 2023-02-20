export function parseBoolean(booleanString?: string, strict = true) {
  if (!booleanString) return strict ? undefined : false;
  const lowerCase = booleanString.toLowerCase();
  if (lowerCase === "true") return true;
  if (lowerCase === "false") return false;
  return strict ? undefined : false;
}
