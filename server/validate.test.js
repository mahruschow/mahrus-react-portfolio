import assert from "node:assert/strict";
import { test } from "node:test";
import { validateContact } from "./validate.js";

const good = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  subject: "Hello",
  message: "I would like to collaborate on something.",
};

test("accepts a valid message and trims whitespace", () => {
  const { valid, data } = validateContact({ ...good, name: "  Ada Lovelace  " });
  assert.equal(valid, true);
  assert.equal(data.name, "Ada Lovelace");
});

test("subject is optional", () => {
  assert.equal(validateContact({ ...good, subject: undefined }).valid, true);
});

test("rejects missing and malformed fields", () => {
  const { valid, errors } = validateContact({ name: "", email: "nope", message: "short" });
  assert.equal(valid, false);
  assert.ok(errors.name && errors.email && errors.message);
});

test("rejects over-long message", () => {
  const { errors } = validateContact({ ...good, message: "x".repeat(2001) });
  assert.ok(errors.message);
});

test("non-string values are treated as empty", () => {
  const { valid, errors } = validateContact({ ...good, name: { $ne: null }, email: 42 });
  assert.equal(valid, false);
  assert.ok(errors.name && errors.email);
});

test("handles an undefined body", () => {
  assert.equal(validateContact(undefined).valid, false);
});
