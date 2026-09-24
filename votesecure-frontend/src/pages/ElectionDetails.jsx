import { Link, useParams } from "react-router";
import { ArrowLeft, CalendarDays, Users, ShieldCheck } from "lucide-react";
import { useSelector } from "react-redux";

export default function ElectionDetails() {
  const { id } = useParams();
  const election = useSelector((state) => state.elections.items.find((e) => e.id === id));
  const candidates = useSelector((state) => state.candidates.items.filter((c) => c.electionId === id));
  const voted = useSelector((state) => state.vote.votedElections[id]);

  if (!election) return <div className="mx-auto max-w-7xl px-5 py-20 text-center"><h1 className="text-2xl font-bold">Election not found</h1></div>;

  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <Link to="/elections" className="flex w-fit items-center gap-2 text-sm text-slate-400 hover:text-white"><ArrowLeft size={16} /> Back to elections</Link>

      <div className="card mt-7 p-7 sm:p-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row">
          <div>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${election.status === "active" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"}`}>
              {election.status.toUpperCase()}
            </span>
            <h1 className="mt-5 text-3xl font-bold sm:text-4xl">{election.title}</h1>
            <p className="mt-2 text-slate-400">{election.subtitle}</p>
            <p className="mt-5 max-w-2xl leading-7 text-slate-500">{election.description}</p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 text-sm text-slate-400">
            <div className="flex items-center gap-2"><CalendarDays size={17} className="text-blue-400" /> {election.startDate} → {election.endDate}</div>
            <div className="flex items-center gap-2"><Users size={17} className="text-violet-400" /> {candidates.length} candidates</div>
          </div>
        </div>

        {voted ? (
          <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5 text-emerald-300">
            <div className="flex items-center gap-3"><ShieldCheck /> <div><p className="font-semibold">Vote recorded</p><p className="text-sm text-emerald-400/80">You have already voted in this election.</p></div></div>
          </div>
        ) : election.status === "active" ? (
          <Link to={`/vote/${election.id}`} className="mt-8 block rounded-xl bg-blue-600 py-3.5 text-center font-semibold hover:bg-blue-500">Proceed to vote</Link>
        ) : (
          <div className="mt-8 rounded-xl bg-slate-900 py-3.5 text-center font-semibold text-slate-500">Voting has not started</div>
        )}
      </div>
    </div>
  );
}
