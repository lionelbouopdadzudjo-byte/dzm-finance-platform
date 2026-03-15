const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";
export async function get(path: string) { const r = await fetch(`${API}${path}`); return r.json(); }
export async function post(path: string, body: any) { const r = await fetch(`${API}${path}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }); return r.json(); }
