import express, { json } from "express";
import { verify } from "jsonwebtoken";
import { createProxyMiddleware } from "http-proxy-middleware";
import { config } from "dotenv";
import cors from "cors";

config();

const app = express();
app.use(cors());
app.use(json());

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }
    req.user = user; // Attach user info (id, role) to request
    next();
  });
};

// Routes that don't require authentication
app.use(
  "/api/auth",
  createProxyMiddleware({
    target: "http://auth-service:3000", // Kubernetes service name
    changeOrigin: true,
  })
);

// Protected routes (example for other services)
app.use(
  "/api/restaurant",
  authenticateToken,
  createProxyMiddleware({
    target: "http://restaurant-service:3001",
    changeOrigin: true,
  })
);

app.use(
  "/api/order",
  authenticateToken,
  createProxyMiddleware({
    target: "http://order-service:3002",
    changeOrigin: true,
  })
);

// Error handling
app.use((err, req, res, next) => {
  console.error("Gateway error:", err);
  res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
