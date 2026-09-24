import { Link } from "react-router";
import { ArrowRight, CalendarDays, Users } from "lucide-react";

export default function ElectionCard({ election }) {
  const active = election.status === "active";

  return (
    <div className="card group p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-500/30">
      <div className="flex items-center justify-between">
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${active ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"}`}>
          {active ? "● ACTIVE" : "UPCOMING"}
        </span>
        <span className="text-xs text-slate-500">{election.category}</span>
      </div>

      <h3 className="mt-6 text-xl font-bold text-white">{election.title}</h3>
      <p className="mt-1 text-sm text-slate-400">{election.subtitle}</p>
      <p className="mt-4 text-sm leading-6 text-slate-500">{election.description}</p>

      <div className="mt-5 grid grid-cols-2 gap-3 text-xs text-slate-400">
        <div className="rounded-xl bg-slate-900 p-3">
          <CalendarDays size={16} className="mb-1 text-blue-400" />
          Ends {election.endDate}
        </div>
        <div className="rounded-xl bg-slate-900 p-3">
          <Users size={16} className="mb-1 text-violet-400" />
          {election.candidates} candidates
        </div>
      </div>

      <Link to={`/elections/${election.id}`} className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold transition hover:bg-blue-500">
        {active ? "View & Vote" : "View Election"} <ArrowRight size={17} />
      </Link>
    </div>
  );
}
