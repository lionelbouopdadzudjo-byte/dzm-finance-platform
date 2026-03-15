const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

async function parse<T>(response: Response): Promise<T> {
  const data = await response.json();
  if (!response.ok) throw new Error((data as any)?.error || "API error");
  return data as T;
}

export async function get<T = any>(path: string): Promise<T> {
  const response = await fetch(`${API}${path}`);
  return parse<T>(response);
}

export async function post<T = any>(path: string, body: any): Promise<T> {
  const response = await fetch(`${API}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  return parse<T>(response);
}
