const isProduction = process.env.NODE_ENV === "production";

export const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: isProduction ? "none" : "lax",
  secure: isProduction,
  maxAge: parseInt(process.env.COOKIE_EXPIRY_MS) || 7 * 24 * 60 * 60 * 1000 // fallback: 7 days
};