import { CheckCircle2 } from "lucide-react";

export default function CandidateCard({ candidate, selected, onSelect, disabled }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onSelect?.(candidate.id)}
      className={`w-full text-left card p-5 transition duration-200 ${
        selected ? "border-blue-500 bg-blue-500/10 ring-2 ring-blue-500/20" : "hover:-translate-y-1 hover:border-slate-600"
      } ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
    >
      <div className="flex items-start justify-between">
        <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-blue-500/30 to-violet-500/30 text-2xl font-bold">
          {candidate.symbol}
        </div>
        {selected && <CheckCircle2 className="text-blue-400" />}
      </div>

      <h3 className="mt-5 text-lg font-bold">{candidate.name}</h3>
      <p className="mt-1 text-sm text-slate-400">{candidate.department} • {candidate.year}</p>
      <p className="mt-4 text-sm leading-6 text-slate-500">{candidate.manifesto}</p>

      <div className={`mt-5 rounded-xl border px-4 py-3 text-center text-sm font-semibold ${selected ? "border-blue-500/30 bg-blue-500/10 text-blue-300" : "border-slate-700 text-slate-300"}`}>
        {selected ? "Selected" : "Select Candidate"}
      </div>
    </button>
  );
}
