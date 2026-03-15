import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({ status: z.enum(["processed", "needs_review", "error"]), notes: z.string().optional() });

export function ReviewPage() {
  const { register, handleSubmit } = useForm({ resolver: zodResolver(schema) });
  return (
    <form className="max-w-lg border rounded-xl bg-white dark:bg-slate-800 p-4" onSubmit={handleSubmit(async (v) => {
      await fetch("http://localhost:4000/api/documents/doc-2/review", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(v) });
      alert("Review envoyée");
    })}>
      <h2 className="font-semibold text-lg">Review OCR</h2>
      <select className="w-full border p-2 rounded mt-2 text-slate-900" {...register("status")}>
        <option value="processed">processed</option>
        <option value="needs_review">needs_review</option>
        <option value="error">error</option>
      </select>
      <textarea className="w-full border p-2 rounded mt-2 text-slate-900" {...register("notes")} placeholder="notes" />
      <button className="mt-2 px-3 py-2 rounded bg-blue-600 text-white">Valider</button>
    </form>
  );
}
