const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());

// Middleware to verify JWT for protected routes
const verifyToken = (req, res, next) => {
  const publicRoutes = ['/api/auth/register', '/api/auth/login'];
  if (publicRoutes.includes(req.path)) return next();

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

app.use(verifyToken);

// Proxy routes to microservices
app.use(
  '/api/auth',
  createProxyMiddleware({
    target: 'http://auth-service:3000',
    changeOrigin: true,
  })
);

app.use(
  '/api/restaurant',
  createProxyMiddleware({
    target: 'http://restaurant-service:3001',
    changeOrigin: true,
  })
);

app.use(
  '/api/order',
  createProxyMiddleware({
    target: 'http://order-service:3002',
    changeOrigin: true,
  })
);

app.use(
  '/api/delivery',
  createProxyMiddleware({
    target: 'http://delivery-service:3003',
    changeOrigin: true,
  })
);

const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});