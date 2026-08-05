import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: "Missing Authorization token" });
  }

  const secret = process.env.JWT_SECRET;

  if (secret) {
    try {
      const payload = jwt.verify(token, secret);
      const userId = payload.sub || payload.id || payload.userId;
      if (!userId) {
        return res.status(401).json({ error: "Invalid token payload (no user id)" });
      }

      req.user = { id: String(userId) };
      return next();
    } catch (err) {
      console.error("JWT verification failed:", err);
      return res.status(401).json({ error: "Invalid token" });
    }
  }

  // Fallback for demo/mock auth tokens generated on the frontend.
  const parts = token.split(".");
  if (parts.length !== 3) {
    return res.status(401).json({ error: "Invalid token format" });
  }

  try {
    const payload = JSON.parse(Buffer.from(parts[1], "base64").toString("utf-8"));
    const userId = payload.sub || payload.id || payload.userId;
    if (!userId) {
      return res.status(401).json({ error: "Invalid token payload (no user id)" });
    }

    req.user = { id: String(userId) };
    next();
  } catch (err) {
    console.error("Token decode failed:", err);
    return res.status(401).json({ error: "Invalid token" });
  }
}
