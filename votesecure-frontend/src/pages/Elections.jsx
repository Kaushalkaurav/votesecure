import { useSelector } from "react-redux";
import ElectionCard from "../components/ElectionCard";

export default function Elections() {
  const elections = useSelector((state) => state.elections.items);

  return (
    <div className="mx-auto max-w-7xl px-5 py-10">
      <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">Elections</p>
      <h1 className="mt-2 text-4xl font-bold">Available elections</h1>
      <p className="mt-3 max-w-2xl text-slate-500">Browse active and upcoming elections available to eligible voters.</p>

      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {elections.map((election) => <ElectionCard key={election.id} election={election} />)}
      </div>
    </div>
  );
}
