import { AlertTriangle, X } from "lucide-react";

export default function ConfirmVoteModal({ candidate, onConfirm, onCancel }) {
  if (!candidate) return null;

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-black/70 p-5 backdrop-blur-sm">
      <div className="card w-full max-w-md p-7">
        <div className="flex items-start justify-between">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-amber-500/10 text-amber-400">
            <AlertTriangle />
          </div>
          <button onClick={onCancel} className="text-slate-500 hover:text-white"><X /></button>
        </div>

        <h2 className="mt-6 text-2xl font-bold">Confirm your vote</h2>
        <p className="mt-2 text-sm text-slate-400">Please check your selection carefully. Your vote cannot be changed after submission.</p>

        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-xs uppercase tracking-wider text-slate-500">Selected candidate</p>
          <p className="mt-2 text-lg font-bold">{candidate.name}</p>
          <p className="text-sm text-slate-400">{candidate.department} • {candidate.year}</p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button onClick={onCancel} className="rounded-xl border border-slate-700 px-4 py-3 font-semibold hover:bg-slate-900">Cancel</button>
          <button onClick={onConfirm} className="rounded-xl bg-blue-600 px-4 py-3 font-semibold hover:bg-blue-500">Confirm Vote</button>
        </div>
      </div>
    </div>
  );
}
