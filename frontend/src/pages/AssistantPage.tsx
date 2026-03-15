import { useState } from "react";
import { post } from "../api";

export function AssistantPage() {
  const [q, setQ] = useState("");
  const [a, setA] = useState("Posez une question métier ou générale.");
  return (
    <section className="max-w-2xl border rounded-xl bg-white dark:bg-slate-800 p-4">
      <h2 className="font-semibold text-lg">Assistant IA Hybride</h2>
      <input className="w-full border p-2 rounded mt-2 text-slate-900" value={q} onChange={(e) => setQ(e.target.value)} />
      <button className="mt-2 px-3 py-2 rounded bg-blue-600 text-white" onClick={async () => {
        const r = await post("/api/ai/assistant", { message: q });
        setA(`${r.intent} → ${r.answer}`);
      }}>Envoyer</button>
      <p className="mt-3">{a}</p>
    </section>
  );
}
