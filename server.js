require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ─── Routes ──────────────────────────────────────────────────────────────────
const infoRouter = require("./routes/info");
const downloadRouter = require("./routes/download");

app.use("/api/info", infoRouter);
app.use("/api/download", downloadRouter);

// ─── Catch-all → SPA ─────────────────────────────────────────────────────────
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ─── Error Handler ────────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error", details: err.message });
});

app.listen(PORT, () => {
  console.log(`\n🎬  VidDrop running → http://localhost:${PORT}\n`);
});
