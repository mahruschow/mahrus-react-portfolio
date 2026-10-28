import { timingSafeEqual } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { createStore } from "./store.js";
import { validateContact } from "./validate.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

export function createApp({
  dataFile = process.env.DATA_FILE || path.join(__dirname, "data", "messages.json"),
  adminToken = process.env.ADMIN_TOKEN || "",
  allowedOrigins = (process.env.CORS_ORIGINS || "http://localhost:5173")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
} = {}) {
  const app = express();
  const store = createStore(dataFile);

  app.disable("x-powered-by");
  app.set("trust proxy", 1); // correct client IPs behind Render/Fly/Heroku/etc.
  app.use(
    helmet({
      // The built React app loads DM Sans from Google Fonts.
      contentSecurityPolicy: {
        directives: {
          ...helmet.contentSecurityPolicy.getDefaultDirectives(),
          "style-src": ["'self'", "https:", "'unsafe-inline'"],
          "font-src": ["'self'", "https:", "data:"],
        },
      },
    }),
  );
  app.use(cors({ origin: allowedOrigins, methods: ["GET", "POST", "DELETE"] }));
  app.use(express.json({ limit: "10kb" }));

  // --- Health -------------------------------------------------------------
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", uptime: Math.round(process.uptime()) });
  });

  // --- Contact form -------------------------------------------------------
  const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: { error: "Too many messages. Please try again in a few minutes." },
  });

  app.post("/api/contact", contactLimiter, async (req, res, next) => {
    try {
      // Honeypot: real users never see or fill this field. Pretend success so
      // bots don't learn they were filtered.
      if (typeof req.body?.website === "string" && req.body.website.trim()) {
        return res.status(201).json({ ok: true });
      }
      const { data, errors, valid } = validateContact(req.body);
      if (!valid) return res.status(400).json({ error: "Invalid input.", errors });

      const saved = await store.add({
        ...data,
        ip: req.ip,
        userAgent: String(req.get("user-agent") || "").slice(0, 300),
      });
      res.status(201).json({ ok: true, id: saved.id });
    } catch (err) {
      next(err);
    }
  });

  // --- Admin (token-protected) -------------------------------------------
  function requireAdmin(req, res, next) {
    if (!adminToken) {
      return res.status(503).json({ error: "Admin access is not configured." });
    }
    const header = req.get("authorization") || "";
    const supplied = header.startsWith("Bearer ") ? header.slice(7) : "";
    const a = Buffer.from(supplied);
    const b = Buffer.from(adminToken);
    if (a.length !== b.length || !timingSafeEqual(a, b)) {
      return res.status(401).json({ error: "Unauthorized." });
    }
    next();
  }

  app.get("/api/messages", requireAdmin, async (_req, res, next) => {
    try {
      res.json({ messages: await store.list() });
    } catch (err) {
      next(err);
    }
  });

  app.delete("/api/messages/:id", requireAdmin, async (req, res, next) => {
    try {
      const removed = await store.remove(req.params.id);
      if (!removed) return res.status(404).json({ error: "Not found." });
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  });

  app.use("/api", (_req, res) => res.status(404).json({ error: "Not found." }));

  // --- Serve the built frontend in production ----------------------------
  const dist = path.join(root, "dist");
  if (fs.existsSync(dist)) {
    app.use(express.static(dist));
    app.get(/^(?!\/api\/).*/, (_req, res) => res.sendFile(path.join(dist, "index.html")));
  }

  // --- Errors -------------------------------------------------------------
  // eslint-disable-next-line no-unused-vars
  app.use((err, _req, res, _next) => {
    if (err.type === "entity.parse.failed") {
      return res.status(400).json({ error: "Invalid JSON." });
    }
    if (err.type === "entity.too.large") {
      return res.status(413).json({ error: "Request too large." });
    }
    console.error(err);
    res.status(500).json({ error: "Something went wrong." });
  });

  return app;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT) || 3001;
  createApp().listen(port, () => {
    console.log(`API listening on http://localhost:${port}`);
  });
}
