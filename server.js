const express = require("express");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

const dataDir = path.join(__dirname, "data");
const usersFile = path.join(dataDir, "users.json");
const carsFile = path.join(dataDir, "cars.json");
const contactsFile = path.join(dataDir, "contacts.json");

const buildTransport = () => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) return null;
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS }
  });
};

const ensureDataFiles = () => {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(usersFile)) {
    fs.writeFileSync(usersFile, JSON.stringify([]), "utf8");
  }
  if (!fs.existsSync(carsFile)) {
    fs.writeFileSync(carsFile, JSON.stringify([]), "utf8");
  }
  if (!fs.existsSync(contactsFile)) {
    fs.writeFileSync(contactsFile, JSON.stringify([]), "utf8");
  }
};

const readJson = (filePath, fallback) => {
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw);
  } catch (error) {
    return fallback;
  }
};

const writeJson = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
};

const hashPassword = (password, salt = crypto.randomBytes(16).toString("hex")) => {
  const iterations = 120000;
  const hash = crypto.pbkdf2Sync(password, salt, iterations, 64, "sha512").toString("hex");
  return `${iterations}:${salt}:${hash}`;
};

const verifyPassword = (password, storedHash) => {
  if (!storedHash) return false;
  const [iterations, salt, hash] = storedHash.split(":");
  if (!iterations || !salt || !hash) return false;
  const candidate = crypto
    .pbkdf2Sync(password, salt, Number(iterations), 64, "sha512")
    .toString("hex");
  return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(candidate, "hex"));
};

const buildChatReply = (message, cars) => {
  const text = message.toLowerCase();
  const carNames = cars.map((car) => car.model.toLowerCase());
  const matchIndex = carNames.findIndex((name) => text.includes(name.split(" ")[0]));
  const featured = cars[matchIndex] || cars[0];

  if (text.includes("price") || text.includes("cost")) {
    return `The ${featured.model} starts at $${featured.basePrice.toLocaleString()} before options.`;
  }
  if (text.includes("range") || text.includes("battery")) {
    return `The ${featured.model} delivers up to ${featured.specs.range} with the standard pack.`;
  }
  if (text.includes("performance") || text.includes("0-60") || text.includes("speed")) {
    return `Performance highlights: ${featured.specs.power}, 0-60 in ${featured.specs.zeroTo60}, top speed ${featured.specs.topSpeed}.`;
  }
  if (text.includes("trim")) {
    const trimNames = featured.trims.map((trim) => trim.name).join(", ");
    return `Available trims for the ${featured.model}: ${trimNames}.`;
  }
  if (text.includes("custom") || text.includes("configure")) {
    return "You can customize color, wheels, and trim. Open a model and hit Configure to see the live changes.";
  }

  return `I can help with pricing, performance, trims, or customization for ${featured.model}. Ask away!`;
};

ensureDataFiles();

app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/data", express.static(path.join(__dirname, "data")));

app.post("/api/signup", (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password) {
    return res.status(400).json({ ok: false, error: "Missing required fields." });
  }
  const users = readJson(usersFile, []);
  const existing = users.find((user) => user.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(409).json({ ok: false, error: "Email already registered." });
  }
  const newUser = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: email.trim(),
    passwordHash: hashPassword(password)
  };
  users.push(newUser);
  writeJson(usersFile, users);
  return res.json({ ok: true, user: { id: newUser.id, name: newUser.name, email: newUser.email } });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ ok: false, error: "Missing email or password." });
  }
  const users = readJson(usersFile, []);
  const existing = users.find((user) => user.email.toLowerCase() === email.toLowerCase());
  if (!existing || !verifyPassword(password, existing.passwordHash)) {
    return res.status(401).json({ ok: false, error: "Invalid credentials." });
  }
  return res.json({
    ok: true,
    user: { id: existing.id, name: existing.name, email: existing.email }
  });
});

app.post("/api/chat", (req, res) => {
  const { message } = req.body || {};
  if (!message) {
    return res.status(400).json({ ok: false, error: "Message required." });
  }
  const cars = readJson(carsFile, []);
  const reply = cars.length ? buildChatReply(message, cars) : "I can help with models and specs.";
  return res.json({ ok: true, reply });
});

app.post("/api/contact", (req, res) => {
  const { name, email, budget, projectType, details } = req.body || {};
  if (!name || !email) {
    return res.status(400).json({ ok: false, error: "Name and email required." });
  }
  const transport = buildTransport();
  if (!transport) {
    return res.status(500).json({ ok: false, error: "Email service not configured." });
  }
  const contacts = readJson(contactsFile, []);
  const ticket = crypto.randomUUID().slice(0, 8).toUpperCase();
  const record = {
    id: crypto.randomUUID(),
    name: String(name).trim(),
    email: String(email).trim(),
    budget: budget || "",
    projectType: projectType || "",
    details: details || "",
    ticket,
    createdAt: new Date().toISOString()
  };
  contacts.push(record);
  writeJson(contactsFile, contacts);

  const toAddress = process.env.CONTACT_TO || "info@tempdev.xyz";
  const fromAddress =
    process.env.SMTP_FROM || process.env.SMTP_USER || "info@tempdev.xyz";

  const ownerSubject = `New inquiry · Ticket ${ticket}`;
  const ownerBody = [
    `Ticket: ${ticket}`,
    `Name: ${record.name}`,
    `Email: ${record.email}`,
    `Budget: ${record.budget}`,
    `Project type: ${record.projectType}`,
    "",
    "Details:",
    record.details || ""
  ].join("\n");

  const clientSubject = `We received your request · Ticket ${ticket}`;
  const clientBody = [
    `Hi ${record.name},`,
    "",
    "Thanks for reaching out. We received your message and will reply within 12 hours.",
    `Your ticket number is: ${ticket}`,
    "",
    "If you need to add anything, reply to this email.",
    "",
    "— Temp Dev"
  ].join("\n");

  Promise.all([
    transport.sendMail({
      to: toAddress,
      from: fromAddress,
      replyTo: record.email,
      subject: ownerSubject,
      text: ownerBody
    }),
    transport.sendMail({
      to: record.email,
      from: fromAddress,
      subject: clientSubject,
      text: clientBody
    })
  ])
    .then(() => res.json({ ok: true, ticket }))
    .catch((error) => {
      console.error("Contact email error:", error);
      return res.status(500).json({ ok: false, error: "Email send failed." });
    });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
