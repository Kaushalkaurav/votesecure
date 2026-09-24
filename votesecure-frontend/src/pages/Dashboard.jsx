import { Link } from "react-router";
import { Activity, CheckCircle2, Clock3, Vote, ArrowRight } from "lucide-react";
import { useSelector } from "react-redux";
import StatCard from "../components/StatCard";
import ElectionCard from "../components/ElectionCard";

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.elections);
  const { votedElections } = useSelector((state) => state.vote);

  const active = items.filter((e) => e.status === "active");
  const voted = Object.keys(votedElections).length;

  return (
    <div className="mx-auto max-w-7xl px-5 py-10">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm text-blue-400">VOTER DASHBOARD</p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Welcome back, {user?.name?.split(" ")[0] || "Voter"} 👋</h1>
          <p className="mt-2 text-slate-500">Your voting activity at a glance.</p>
        </div>
        <Link to="/elections" className="flex w-fit items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold hover:bg-blue-500">Browse elections <ArrowRight size={17} /></Link>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Vote} value={items.length} label="Elections" description="Available in the system" />
        <StatCard icon={CheckCircle2} value={voted} label="Voted" description="Elections you participated in" />
        <StatCard icon={Clock3} value={Math.max(items.length - voted, 0)} label="Pending" description="Not yet participated" />
        <StatCard icon={Activity} value={active.length} label="Active now" description="Open for voting" />
      </div>

      <div className="mt-12">
        <div className="flex items-end justify-between">
          <div><p className="text-sm text-blue-400">OPEN NOW</p><h2 className="mt-1 text-2xl font-bold">Active elections</h2></div>
          <Link to="/elections" className="text-sm text-slate-400 hover:text-white">View all</Link>
        </div>
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {active.map((election) => <ElectionCard key={election.id} election={election} />)}
        </div>
      </div>
    </div>
  );
}
