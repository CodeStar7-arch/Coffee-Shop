import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: "Missing Authorization token" });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("JWT_SECRET is not set in environment variables");
    return res.status(500).json({ error: "Server misconfiguration" });
  }

  try {
    const payload = jwt.verify(token, secret);
    // Support common claim names (sub, id, userId)
    const userId = payload.sub || payload.id || payload.userId;
    if (!userId) {
      return res.status(401).json({ error: "Invalid token payload (no user id)" });
    }

    req.user = { id: String(userId) };
    next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    return res.status(401).json({ error: "Invalid token" });
  }
}
