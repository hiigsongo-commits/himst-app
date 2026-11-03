// Simple Node server for Render (or any Node host): serves /public and the /api/generate function.
const http = require("http"), fs = require("fs"), path = require("path");
const handler = require("./api/generate.js");
const PUB = path.join(__dirname, "public");
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".json": "application/json", ".png": "image/png", ".webp": "image/webp" };

http.createServer((req, res) => {
  const url = new URL(req.url, "http://x");
  if (url.pathname === "/api/generate") {
    let data = "";
    req.on("data", c => { data += c; if (data.length > 20000) req.destroy(); });
    req.on("end", () => {
      try { req.body = JSON.parse(data || "{}"); } catch (e) { req.body = {}; }
      res.status = c => { res.statusCode = c; return res; };
      res.json = o => { res.setHeader("content-type", "application/json"); res.end(JSON.stringify(o)); return res; };
      handler(req, res);
    });
    return;
  }
  let p;
  try { p = path.normalize(decodeURIComponent(url.pathname)); } catch (e) { res.statusCode = 400; return res.end(); }
  if (p === "/" || p === "\\") p = "/index.html";
  const f = path.join(PUB, p);
  if (!f.startsWith(PUB)) { res.statusCode = 403; return res.end(); }
  fs.readFile(f, (e, b) => {
    if (e) { res.statusCode = 404; return res.end("Not found"); }
    res.setHeader("content-type", TYPES[path.extname(f)] || "application/octet-stream");
    res.end(b);
  });
}).listen(process.env.PORT || 3000, () => console.log("HIMST running"));
