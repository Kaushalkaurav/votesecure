import { Link } from "react-router";
import { BarChart3, CheckCircle2, ClipboardList, Users, ArrowRight } from "lucide-react";
import { useSelector } from "react-redux";
import StatCard from "../../components/StatCard";

export default function AdminDashboard() {
  const stats = useSelector((state) => state.admin.stats);
  const elections = useSelector((state) => state.elections.items);

  return (
    <div className="mx-auto max-w-7xl px-5 py-10">
      <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">Administration</p>
      <h1 className="mt-2 text-4xl font-bold">Admin dashboard</h1>
      <p className="mt-2 text-slate-500">Manage elections, candidates, voters and results.</p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} value={stats.voters.toLocaleString()} label="Registered voters" />
        <StatCard icon={CheckCircle2} value={stats.votes.toLocaleString()} label="Votes cast" />
        <StatCard icon={BarChart3} value={`${stats.turnout}%`} label="Turnout" />
        <StatCard icon={ClipboardList} value={stats.activeElections} label="Active elections" />
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {[
          ["Manage elections", "Create, update and close elections.", "/admin/elections"],
          ["Manage candidates", "Add candidates to elections.", "/admin/candidates"],
          ["Manage voters", "Review registered voter accounts.", "/admin/voters"],
          ["View results", "Monitor published election results.", "/admin/results"],
        ].map(([title, text, href]) => (
          <Link key={href} to={href} className="card group p-6 transition hover:-translate-y-1 hover:border-blue-500/30">
            <div className="flex items-center justify-between"><h2 className="text-lg font-bold">{title}</h2><ArrowRight className="text-slate-500 group-hover:text-blue-400" size={19} /></div>
            <p className="mt-2 text-sm text-slate-500">{text}</p>
          </Link>
        ))}
      </div>

      <div className="card mt-10 overflow-hidden">
        <div className="border-b border-slate-800 p-6"><h2 className="font-bold">Current elections</h2></div>
        <div className="divide-y divide-slate-800">
          {elections.map((e) => <div key={e.id} className="flex flex-col justify-between gap-3 p-5 sm:flex-row sm:items-center"><div><p className="font-semibold">{e.title}</p><p className="text-xs text-slate-500">{e.startDate} → {e.endDate}</p></div><span className="w-fit rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">{e.status}</span></div>)}
        </div>
      </div>
    </div>
  );
}
