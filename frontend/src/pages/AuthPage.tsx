import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { post } from "../api";

const schema = z.object({ email: z.string().email(), password: z.string().min(8) });

export function AuthPage() {
  const { register, handleSubmit, formState } = useForm({ resolver: zodResolver(schema) });
  return (
    <form className="max-w-md p-4 rounded-xl border bg-white dark:bg-slate-800" onSubmit={handleSubmit(async (v) => {
      await post("/api/auth/login", v);
      alert("Connexion simulée réussie.");
    })}>
      <h2 className="font-semibold text-lg mb-2">Connexion</h2>
      <input className="w-full border rounded p-2 mb-2 text-slate-900" placeholder="email" {...register("email")} />
      <input type="password" className="w-full border rounded p-2 mb-2 text-slate-900" placeholder="password" {...register("password")} />
      <button className="px-3 py-2 rounded bg-blue-600 text-white">Se connecter</button>
      {formState.errors.email && <p className="text-red-500 text-sm">Email invalide</p>}
    </form>
  );
}
