const nodemailer = require("nodemailer");
const crypto = require("crypto");

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

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const { name, email, budget, projectType, details } = req.body || {};
  if (!name || !email) {
    return res.status(400).json({ ok: false, error: "Name and email required." });
  }

  const transport = buildTransport();
  if (!transport) {
    return res.status(500).json({ ok: false, error: "Email service not configured." });
  }

  const ticket = crypto.randomUUID().slice(0, 8).toUpperCase();
  const toAddress = process.env.CONTACT_TO || "info@tempdev.xyz";
  const fromAddress =
    process.env.SMTP_FROM || process.env.SMTP_USER || "info@tempdev.xyz";

  const ownerSubject = `New inquiry · Ticket ${ticket}`;
  const ownerBody = [
    `Ticket: ${ticket}`,
    `Name: ${name}`,
    `Email: ${email}`,
    `Budget: ${budget || ""}`,
    `Project type: ${projectType || ""}`,
    "",
    "Details:",
    details || ""
  ].join("\n");

  const clientSubject = `We received your request · Ticket ${ticket}`;
  const clientBody = [
    `Hi ${name},`,
    "",
    "Thanks for reaching out. We received your message and will reply within 12 hours.",
    `Your ticket number is: ${ticket}`,
    "",
    "If you need to add anything, reply to this email.",
    "",
    "— Temp Dev"
  ].join("\n");

  try {
    await Promise.all([
      transport.sendMail({
        to: toAddress,
        from: fromAddress,
        replyTo: email,
        subject: ownerSubject,
        text: ownerBody
      }),
      transport.sendMail({
        to: email,
        from: fromAddress,
        subject: clientSubject,
        text: clientBody
      })
    ]);
    return res.status(200).json({ ok: true, ticket });
  } catch (error) {
    console.error("Contact email error:", error);
    return res.status(500).json({ ok: false, error: "Email send failed." });
  }
};
