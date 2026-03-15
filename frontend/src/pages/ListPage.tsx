import { DataTable } from "../components/DataTable";
import { useQuery } from "@tanstack/react-query";
import { get } from "../api";

export function ListPage({ title, endpoint }: { title: string; endpoint: string }) {
  const q = useQuery({ queryKey: [endpoint], queryFn: () => get(endpoint) });
  return (
    <section>
      <h2 className="font-semibold text-xl mb-3">{title}</h2>
      <DataTable rows={q.data || []} />
    </section>
  );
}
