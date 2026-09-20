export interface ContactSubmission {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
}

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    res.end("ok");
    return;
  }
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Method not allowed. Use POST." }));
    return;
  }

  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch { body = {}; } }
  body = body || {};

  const { name, email, company, message } = body as ContactSubmission;

  if (!name || !email || !message) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Name, email and message are required." }));
    return;
  }

  if (typeof email === "string" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Please provide a valid email address." }));
    return;
  }

  // Demo-friendly submission handler: records the enquiry and returns success.
  // Configure an email provider to forward enquiries to an inbox.
  console.log(
    `[contact] ${new Date().toISOString()} ${name} <${email}> ${company || ""}: ${(message || "").slice(0, 120)}`
  );

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ ok: true, message: "Enquiry received. We'll be in touch shortly." }));
}