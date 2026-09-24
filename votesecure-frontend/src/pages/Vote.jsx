import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import CandidateCard from "../components/CandidateCard";
import ConfirmVoteModal from "../components/ConfirmVoteModal";
import { castVote } from "../redux/slices/voteSlice";

export default function Vote() {
  const { electionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const election = useSelector((state) => state.elections.items.find((e) => e.id === electionId));
  const candidates = useSelector((state) => state.candidates.items.filter((c) => c.electionId === electionId));
  const alreadyVoted = useSelector((state) => state.vote.votedElections[electionId]);
  const [selected, setSelected] = useState("");
  const [confirm, setConfirm] = useState(false);

  if (!election) return null;
  if (alreadyVoted) return <div className="mx-auto max-w-3xl px-5 py-20 text-center"><h1 className="text-3xl font-bold">You have already voted.</h1><Link to="/results" className="mt-6 inline-block text-blue-400">View results →</Link></div>;

  const candidate = candidates.find((c) => c.id === selected);

  const submit = () => {
    dispatch(castVote({ electionId, candidateId: selected }));
    setConfirm(false);
    toast.success("Your vote has been recorded.");
    navigate(`/elections/${electionId}`);
  };

  return (
    <>
      <div className="mx-auto max-w-6xl px-5 py-10">
        <Link to={`/elections/${electionId}`} className="flex w-fit items-center gap-2 text-sm text-slate-400 hover:text-white"><ArrowLeft size={16} /> Back</Link>

        <div className="mt-8 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-blue-500/10 text-blue-400"><LockKeyhole /></div>
          <p className="mt-5 text-sm font-semibold text-blue-400">SECURE BALLOT</p>
          <h1 className="mt-2 text-3xl font-bold">{election.title}</h1>
          <p className="mt-2 text-slate-500">Select one candidate. You can confirm your choice on the next step.</p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {candidates.map((item) => (
            <CandidateCard key={item.id} candidate={item} selected={selected === item.id} onSelect={setSelected} />
          ))}
        </div>

        <button disabled={!selected} onClick={() => setConfirm(true)} className="mx-auto mt-8 block w-full max-w-md rounded-xl bg-blue-600 py-3.5 font-semibold disabled:cursor-not-allowed disabled:opacity-40 hover:bg-blue-500">
          Continue to confirmation
        </button>
      </div>

      <ConfirmVoteModal candidate={candidate} onConfirm={submit} onCancel={() => setConfirm(false)} />
    </>
  );
}
