export function requireInternalAuth(request: Request, secret: string): Response | null {
  if (request.headers.get("X-Internal-Secret") !== secret) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export function sanitiseWallet(input: unknown): string | null {
  if (typeof input !== "string") return null;
  const clean = input.trim();
  if (!clean.startsWith("keeta_")) return null;
  if (clean.length < 20 || clean.length > 120) return null;
  if (!/^keeta_[a-z0-9]+$/.test(clean)) return null;
  return clean;
}
