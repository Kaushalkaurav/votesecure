import { Link } from "react-router";
import { ArrowRight, CheckCircle2, LockKeyhole, BarChart3, Smartphone, ShieldCheck, UserCheck, Vote, Eye } from "lucide-react";

const features = [
  { icon: LockKeyhole, title: "Secure", text: "Authentication and server-side validation protect the voting process." },
  { icon: BarChart3, title: "Transparent", text: "Clear election information and result statistics make the process easier to understand." },
  { icon: Smartphone, title: "Accessible", text: "Responsive design lets eligible voters use the platform across devices." },
];

export default function Home() {
  return (
    <div>
      <section className="hero-grid relative overflow-hidden">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-600/15 blur-3xl" />
        <div className="mx-auto max-w-7xl px-5 pb-24 pt-20 lg:pb-32 lg:pt-28">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs font-semibold text-blue-300">
              <ShieldCheck size={15} /> Secure Digital Voting Platform
            </div>
            <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              Your Vote. <span className="gradient-text">Your Voice.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
              A modern online voting experience designed for educational institutions, with secure authentication, clear elections and reliable results.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/register" className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold hover:bg-blue-500">
                Get Started <ArrowRight size={18} />
              </Link>
              <a href="#how-it-works" className="rounded-xl border border-slate-700 px-6 py-3.5 font-semibold text-slate-200 hover:bg-slate-900">
                How it works
              </a>
            </div>
          </div>

          <div className="mx-auto mt-16 grid max-w-5xl gap-4 md:grid-cols-3">
            {[
              ["1", "Register", "Create your voter account."],
              ["2", "Verify", "Authenticate before accessing an election."],
              ["3", "Vote", "Select a candidate and confirm your vote."],
            ].map(([n, title, text]) => (
              <div key={n} className="glass rounded-2xl p-5">
                <div className="text-xs font-bold text-blue-400">STEP {n}</div>
                <h3 className="mt-2 font-bold">{title}</h3>
                <p className="mt-1 text-sm text-slate-500">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-800 bg-slate-950 py-20">
        <div className="mx-auto max-w-7xl px-5">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">Built for trust</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Everything voters need in one place.</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {features.map(({ icon: Icon, title, text }) => (
              <div key={title} className="card p-7">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-blue-500/10 text-blue-400"><Icon /></div>
                <h3 className="mt-6 text-xl font-bold">{title}</h3>
                <p className="mt-3 leading-7 text-slate-500">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20">
        <div className="mx-auto max-w-7xl px-5">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">How it works</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Simple for voters. Structured for administrators.</h2>
              <div className="mt-8 space-y-5">
                {[
                  [UserCheck, "Authenticate", "Only authenticated and eligible voters can access protected election pages."],
                  [Vote, "Cast one vote", "The backend should enforce one-vote-per-election rules."],
                  [Eye, "Review results", "Results can be published after the election closes according to election rules."],
                ].map(([Icon, title, text]) => (
                  <div className="flex gap-4" key={title}>
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-slate-900 text-blue-400"><Icon size={20} /></div>
                    <div><h3 className="font-bold">{title}</h3><p className="mt-1 text-sm leading-6 text-slate-500">{text}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card p-8">
              <div className="flex items-center justify-between border-b border-slate-800 pb-5">
                <div><p className="text-xs text-slate-500">CURRENT ELECTION</p><h3 className="mt-1 text-xl font-bold">Student Council 2026–27</h3></div>
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">ACTIVE</span>
              </div>
              <div className="mt-7 space-y-4">
                {["Secure login", "Candidate selection", "Vote confirmation", "Result publication"].map((item) => (
                  <div className="flex items-center gap-3 rounded-xl bg-slate-900 p-4" key={item}>
                    <CheckCircle2 size={18} className="text-emerald-400" />
                    <span className="text-sm text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/register" className="mt-7 block rounded-xl bg-blue-600 py-3 text-center font-semibold hover:bg-blue-500">Create voter account</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
