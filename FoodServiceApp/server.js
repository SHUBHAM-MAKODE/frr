import { App } from "@tinyhttp/app";
import { createApp } from "json-server/lib/app.js";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import path from "path";
import { fileURLToPath } from "url";

// ==========================================
// 1. DATABASE SETUP
// ==========================================
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbFile = path.join(__dirname, "db.json");
const adapter = new JSONFile(dbFile);
const defaultData = {
  users: [],
  restaurants: [],
  menuItems: [],
  orders: [],
  cart: [],
  coupons: [],
  notifications: [],
  complaints: [],
};
const db = new Low(adapter, defaultData);

const getUserSafe = (user) => {
  const { password: _password, ...rest } = user || {};
  return rest;
};
// ... existing imports and db setup ...

const server = new App();
const jsonServerApp = createApp(db, { static: ["public"] });

// ==========================================
// 1.5 MIDDLEWARE: GLOBAL CORS
// ==========================================
server.use((req, res, next) => {
  // Allow your React app (localhost:5173) to communicate with this server
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle browser "preflight" checks
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

// ==========================================
// 2. MIDDLEWARE: JSON BODY PARSER
// ==========================================
// tinyhttp doesn't parse JSON by default. This reads the incoming data
// stream and attaches it to req.body so your routes don't crash.
server.use((req, res, next) => {
  if (["POST", "PUT", "PATCH"].includes(req.method)) {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        req.body = body ? JSON.parse(body) : {};
      } catch (e) {
        req.body = {};
      }
      next();
    });
  } else {
    next();
  }
});

// ==========================================
// 3. CUSTOM INTERCEPTOR ROUTES
// ==========================================
// These must go BEFORE the jsonServerApp catch-all!

server.post("/api/users/login", async (req, res) => {
  const { email, password } = req.body;
  const users = db.data.users;

  const user = users.find(
    (u) =>
      (u.email === email || u.name === email || u.phone === email) &&
      u.password === password,
  );

  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });
  }

  const token = `fake-jwt-token-${user.id}-${Date.now()}`;
  return res.json({ success: true, data: { token, user: getUserSafe(user) } });
});

server.post("/api/users/register", async (req, res) => {
  // Now req.body will successfully contain your data!
  const { email, password, name, phone, role = "CUSTOMER" } = req.body;
  const users = db.data.users;

  if (users.some((u) => u.email === email)) {
    return res
      .status(409)
      .json({ success: false, message: "Email already exists" });
  }

  const newUser = { id: Date.now(), email, password, name, phone, role };
  db.data.users.push(newUser);
  await db.write();

  const token = `fake-jwt-token-${newUser.id}-${Date.now()}`;
  return res
    .status(201)
    .json({ success: true, data: { token, user: getUserSafe(newUser) } });
});

server.post("/api/users/logout", (req, res) => {
  return res.json({ success: true, message: "Logged out successfully" });
});

server.get("/api/auth/verify-token", (req, res) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer")) {
    return res.status(401).json({ success: false, message: "Missing token" });
  }

  const token = authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }

  return res.json({ success: true, data: { token } });
});

server.get("/api/restaurants/:restaurantId/menu", (req, res) => {
  const restaurantId = Number(req.params.restaurantId);
  const menuItems = db.data.menuItems.filter(
    (m) => m.restaurantId === restaurantId,
  );
  return res.json({ success: true, data: menuItems });
});

server.get("/api/orders/:orderId/location", (req, res) => {
  const orderId = Number(req.params.orderId);
  const order = db.data.orders.find((o) => o.id === orderId);

  if (!order) {
    return res.status(404).json({ success: false, message: "Order not found" });
  }

  const location = order.location || {
    latitude: 0,
    longitude: 0,
    timestamp: new Date().toISOString(),
  };
  return res.json({ success: true, data: location });
});

// ==========================================
// 4. JSON SERVER CATCH-ALL
// ==========================================
// This handles all standard REST routes (like GET /api/restaurants)
server.use("/api", jsonServerApp);

// ==========================================
// 5. SERVER STARTUP
// ==========================================
const configuredPort = process.env.PORT ? Number(process.env.PORT) : 3000;

const startServer = async () => {
  await new Promise((resolve, reject) => {
    const httpServer = server.listen(configuredPort, () => {
      resolve(httpServer);
    });

    httpServer.on("error", (err) => {
      reject(err);
    });
  });

  console.log(
    `✅ Custom JSON Server is running on http://localhost:${configuredPort}/api`,
  );
};

const run = async () => {
  await db.read();

  // ensure data structure exists
  db.data ||= defaultData;
  await db.write();

  await startServer();
};

run().catch((err) => {
  console.error("JSON Server startup failed:", err);
  process.exit(1);
});
