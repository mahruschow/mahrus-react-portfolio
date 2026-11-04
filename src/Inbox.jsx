import { useEffect, useState } from "react";

function Messages() {
  const [token, setToken] = useState("");
  const [messages, setMessages] = useState(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");

  const [health, setHealth] = useState("Checking API…");
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/health", { signal: controller.signal })
      .then((response) => response.json())
      .then((data) => setHealth(data.status === "ok" ? "API online" : "API unavailable"))
      .catch(() => { if (!controller.signal.aborted) setHealth("API unavailable"); });
    return () => controller.abort();
  }, []);

  async function request(id, method = "GET", read) {
    setBusy(true);
    setNotice("");
    try {
      const response = await fetch(id ? `/api/messages/${encodeURIComponent(id)}` : "/api/messages", {
        method,
        headers: {
          Authorization: `Bearer ${token.trim()}`,
          ...(method === "PATCH" && { "Content-Type": "application/json" }),
        },
        body: method === "PATCH" ? JSON.stringify({ read }) : undefined,
      });
      if (!response.ok) {
        if (response.status === 401 || response.status === 503) setMessages(null);
        const error = await response.json();
        throw new Error(error.error || "Request failed. Please try again.");
      }
      if (method === "DELETE") {
        setMessages((items) => items.filter((item) => item.id !== id));
        setNotice("Message deleted.");
      } else if (method === "PATCH") {
        const { message } = await response.json();
        setMessages((items) => items.map((item) => item.id === id ? message : item));
        setNotice(message.read ? "Marked as read." : "Marked as unread.");
      } else {
        const data = await response.json();
        setMessages(data.messages);
      }
    } catch (error) {
      setNotice(error instanceof SyntaxError ? "The inbox API is unavailable." : error.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="inbox-panel">
      <p className="eyebrow">{health}</p>
      {messages === null ? (
        <form className="form-field" onSubmit={(event) => { event.preventDefault(); request(); }}>
          <label htmlFor="inbox-token">Admin token</label>
          <input id="inbox-token" type="password" required autoComplete="off" value={token}
            onChange={(event) => setToken(event.target.value)} disabled={busy} />
          <button className="button" disabled={busy}>Load messages</button>
        </form>
      ) : (
        <>
          <button className="button" disabled={busy} onClick={() => request()}>Refresh inbox</button>
          {messages.length === 0 && <p>No messages yet.</p>}
          {messages.map((item) => (
            <article key={item.id} className="inbox-message">
              <span className="eyebrow">{item.read ? "Read" : "Unread"}</span>
              <h3>{item.subject || "No subject"}</h3>
              <p>{item.name} · {item.email}</p>
              <p className="message-text">{item.message}</p>
              <div className="inbox-actions">
                <button className="button" disabled={busy} onClick={() => request(item.id, "PATCH", !item.read)}>
                  Mark {item.read ? "unread" : "read"}
                </button>
                <button className="copy-button" disabled={busy} onClick={() => {
                  if (window.confirm("Delete this message from the inbox?")) request(item.id, "DELETE");
                }}>Delete</button>
              </div>
            </article>
          ))}
        </>
      )}
      <p role="status">{busy ? "Working…" : notice}</p>
    </div>
  );
}

export default function Inbox() {
  const [open, setOpen] = useState(false);
  return (
    <div className="owner-inbox">
      <button className="copy-button" aria-expanded={open} onClick={() => setOpen(!open)}>
        {open ? "Close owner inbox" : "Owner inbox"}
      </button>
      {open && <Messages />}
    </div>
  );
}
