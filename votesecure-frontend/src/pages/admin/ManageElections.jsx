import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addElection, deleteElection } from "../../redux/slices/electionSlice";
import { toast } from "react-toastify";

export default function ManageElections() {
  const elections = useSelector((state) => state.elections.items);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");

  const create = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    dispatch(addElection({
      id: `election-${Date.now()}`,
      title,
      subtitle: "MITS Gwalior",
      category: "College",
      status: "upcoming",
      startDate: "To be announced",
      endDate: "To be announced",
      candidates: 0,
      description: "New election created by administrator.",
    }));
    setTitle("");
    setShow(false);
    toast.success("Election created.");
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div><p className="text-sm text-blue-400">ADMIN</p><h1 className="mt-2 text-4xl font-bold">Manage elections</h1></div>
        <button onClick={() => setShow(!show)} className="flex w-fit items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-500"><Plus size={18} /> New election</button>
      </div>

      {show && <form onSubmit={create} className="card mt-6 flex flex-col gap-3 p-5 sm:flex-row"><input autoFocus value={title} onChange={(e) => setTitle(e.target.value)} className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-blue-500" placeholder="Election title" /><button className="rounded-xl bg-blue-600 px-6 py-3 font-semibold">Create</button></form>}

      <div className="card mt-8 divide-y divide-slate-800 overflow-hidden">
        {elections.map((e) => <div key={e.id} className="flex items-center justify-between gap-4 p-5"><div><p className="font-semibold">{e.title}</p><p className="text-xs text-slate-500">{e.category} • {e.status}</p></div><button onClick={() => { dispatch(deleteElection(e.id)); toast.success("Election deleted."); }} className="rounded-lg p-2 text-red-400 hover:bg-red-500/10"><Trash2 size={18} /></button></div>)}
      </div>
    </div>
  );
}
