function timingSafeEqual(a: string, b: string): boolean {
  const enc = new TextEncoder();
  const ab = enc.encode(a);
  const bb = enc.encode(b);
  if (ab.byteLength !== bb.byteLength) return false;
  return crypto.subtle.timingSafeEqual(ab, bb);
}

export function requireDevAuth(request: Request, secret: string, header = "X-Dev-Secret"): Response | null {
  const provided = request.headers.get(header) ?? "";
  if (!provided || !secret || !timingSafeEqual(provided, secret)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export function requireInternalAuth(request: Request, secret: string): Response | null {
  const provided = request.headers.get("X-Internal-Secret") ?? "";
  if (!timingSafeEqual(provided, secret)) {
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
