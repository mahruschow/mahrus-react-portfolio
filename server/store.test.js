import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { test } from "node:test";
import { createStore } from "./store.js";

async function withStore(fn) {
  const dir = await mkdtemp(path.join(tmpdir(), "portfolio-store-"));
  try {
    await fn(createStore(path.join(dir, "nested", "messages.json")));
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

test("starts empty, then lists newest first", () =>
  withStore(async (store) => {
    assert.deepEqual(await store.list(), []);
    await store.add({ name: "first" });
    await store.add({ name: "second" });
    const list = await store.list();
    assert.deepEqual(list.map((m) => m.name), ["second", "first"]);
    assert.ok(list[0].id && list[0].createdAt);
  }));

test("concurrent writes are all kept", () =>
  withStore(async (store) => {
    await Promise.all(Array.from({ length: 25 }, (_, i) => store.add({ n: i })));
    assert.equal((await store.list()).length, 25);
  }));

test("remove deletes by id and reports misses", () =>
  withStore(async (store) => {
    const { id } = await store.add({ name: "gone" });
    assert.equal(await store.remove("does-not-exist"), false);
    assert.equal(await store.remove(id), true);
    assert.deepEqual(await store.list(), []);
  }));
