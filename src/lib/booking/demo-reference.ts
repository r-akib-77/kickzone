/** Generate a demo-only booking reference. No server involved. */
export function generateDemoReference(): string {
  const timePart = Date.now().toString(36).toUpperCase().slice(-4).padStart(4, "0");
  const randPart = Math.random().toString(36).slice(2, 6).toUpperCase().padStart(4, "X");
  return `KZ-${timePart}-${randPart}`;
}
