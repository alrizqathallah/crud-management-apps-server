import express from "express";
import morganMiddleware from "./middlewares/morgan.middleware.js";

const app = express();

// Middleware keamanan dan utilitas
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging request (HTTP)
app.use(morganMiddleware);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  });
});

// Simulasi error (uji logging)
app.get("/error", () => {
  throw new Error("Test error for exception log");
});

export default app;
