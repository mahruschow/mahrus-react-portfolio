import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

// Tiny JSON-file store. Fine for a portfolio's contact inbox; swap for a real
// database (SQLite, Postgres, ...) if the volume ever grows.
export function createStore(filePath) {
  let queue = Promise.resolve();

  async function load() {
    try {
      return JSON.parse(await readFile(filePath, "utf8"));
    } catch (err) {
      if (err.code === "ENOENT") return [];
      throw err;
    }
  }

  async function save(messages) {
    await mkdir(path.dirname(filePath), { recursive: true });
    const tmp = `${filePath}.tmp`;
    await writeFile(tmp, JSON.stringify(messages, null, 2));
    await rename(tmp, filePath); // atomic replace
  }

  // Serialize writes so concurrent requests can't clobber each other.
  function enqueue(task) {
    const run = queue.then(task, task);
    queue = run.catch(() => {});
    return run;
  }

  return {
    add(entry) {
      return enqueue(async () => {
        const messages = await load();
        const message = {
          id: randomUUID(),
          createdAt: new Date().toISOString(),
          ...entry,
        };
        messages.push(message);
        await save(messages);
        return message;
      });
    },
    list() {
      return enqueue(async () => (await load()).reverse());
    },
    remove(id) {
      return enqueue(async () => {
        const messages = await load();
        const next = messages.filter((m) => m.id !== id);
        if (next.length === messages.length) return false;
        await save(next);
        return true;
      });
    },
  };
}
