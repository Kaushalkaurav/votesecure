import { Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCandidate } from "../../redux/slices/candidateSlice";
import { toast } from "react-toastify";

export default function ManageCandidates() {
  const candidates = useSelector((state) => state.candidates.items);
  const elections = useSelector((state) => state.elections.items);
  const dispatch = useDispatch();

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <p className="text-sm text-blue-400">ADMIN</p><h1 className="mt-2 text-4xl font-bold">Manage candidates</h1>
      <p className="mt-2 text-slate-500">Candidate data shown here is mock data until the backend is connected.</p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {candidates.map((c) => {
          const election = elections.find((e) => e.id === c.electionId);
          return <div className="card p-5" key={c.id}>
            <div className="flex justify-between"><div className="grid h-12 w-12 place-items-center rounded-xl bg-blue-500/10 text-blue-400">{c.symbol}</div><button onClick={() => { dispatch(deleteCandidate(c.id)); toast.success("Candidate removed."); }} className="text-red-400"><Trash2 size={18} /></button></div>
            <h2 className="mt-4 font-bold">{c.name}</h2><p className="text-sm text-slate-500">{c.department} • {c.year}</p>
            <p className="mt-3 text-xs text-slate-600">{election?.title}</p>
          </div>;
        })}
      </div>
    </div>
  );
}
