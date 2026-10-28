const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const LIMITS = { name: 100, email: 254, subject: 150, message: 2000 };

const clean = (value) =>
  typeof value === "string"
    ? // strip control characters (keep tab/newline), then trim
      // eslint-disable-next-line no-control-regex
      value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim()
    : "";

export function validateContact(body = {}) {
  const data = {
    name: clean(body.name),
    email: clean(body.email),
    subject: clean(body.subject),
    message: clean(body.message),
  };
  const errors = {};

  if (!data.name) errors.name = "Please enter your name.";
  else if (data.name.length > LIMITS.name)
    errors.name = `Name must be ${LIMITS.name} characters or fewer.`;

  if (!data.email) errors.email = "Please enter your email.";
  else if (data.email.length > LIMITS.email || !EMAIL_RE.test(data.email))
    errors.email = "Please enter a valid email address.";

  if (data.subject.length > LIMITS.subject)
    errors.subject = `Subject must be ${LIMITS.subject} characters or fewer.`;

  if (data.message.length < 10)
    errors.message = "Message should be at least 10 characters.";
  else if (data.message.length > LIMITS.message)
    errors.message = `Message must be ${LIMITS.message} characters or fewer.`;

  return { data, errors, valid: Object.keys(errors).length === 0 };
}
