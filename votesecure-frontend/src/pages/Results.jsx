import { BarChart3, CheckCircle2, Users } from "lucide-react";
import { resultData } from "../data/mockData";

export default function Results() {
  const total = resultData.reduce((sum, item) => sum + item.votes, 0);
  const max = Math.max(...resultData.map((x) => x.votes));

  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">Results</p>
      <h1 className="mt-2 text-4xl font-bold">Election results</h1>
      <p className="mt-3 text-slate-500">Example results dashboard for the Student Council Election.</p>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <Summary icon={Users} value="2,450" label="Registered voters" />
        <Summary icon={CheckCircle2} value="1,982" label="Votes cast" />
        <Summary icon={BarChart3} value="81%" label="Turnout" />
      </div>

      <div className="card mt-6 p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <div><h2 className="text-xl font-bold">President</h2><p className="text-sm text-slate-500">Student Council 2026–27</p></div>
          <span className="text-sm text-slate-500">{total.toLocaleString()} counted votes</span>
        </div>

        <div className="mt-8 space-y-6">
          {resultData.map((item) => (
            <div key={item.name}>
              <div className="mb-2 flex justify-between text-sm"><span className="font-medium">{item.name}</span><span className="text-slate-400">{item.votes.toLocaleString()} votes</span></div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full rounded-full bg-blue-500 transition-all" style={{ width: `${max ? (item.votes / max) * 100 : 0}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Summary({ icon: Icon, value, label }) {
  return <div className="card p-5"><Icon className="text-blue-400" size={20} /><p className="mt-4 text-2xl font-bold">{value}</p><p className="mt-1 text-sm text-slate-500">{label}</p></div>;
}
