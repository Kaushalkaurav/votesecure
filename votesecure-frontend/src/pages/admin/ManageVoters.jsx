import { Search, UserCheck } from "lucide-react";

const voters = [
  { name: "Kaushal Kaurav", email: "kaushal@example.com", status: "Verified", role: "Voter" },
  { name: "Aman Verma", email: "aman@example.com", status: "Verified", role: "Voter" },
  { name: "Priya Patel", email: "priya@example.com", status: "Pending", role: "Voter" },
];

export default function ManageVoters() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <p className="text-sm text-blue-400">ADMIN</p><h1 className="mt-2 text-4xl font-bold">Manage voters</h1>
      <div className="card mt-8 overflow-hidden">
        <div className="border-b border-slate-800 p-5"><div className="relative max-w-md"><Search size={17} className="absolute left-3 top-3 text-slate-500" /><input className="w-full rounded-xl border border-slate-700 bg-slate-900 py-2.5 pl-10 pr-4 outline-none focus:border-blue-500" placeholder="Search voters..." /></div></div>
        <div className="divide-y divide-slate-800">
          {voters.map((v) => <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between" key={v.email}>
            <div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-full bg-slate-800"><UserCheck size={18} className="text-blue-400" /></div><div><p className="font-semibold">{v.name}</p><p className="text-xs text-slate-500">{v.email}</p></div></div>
            <div className="flex gap-2"><span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-300">{v.role}</span><span className={`rounded-full px-3 py-1 text-xs ${v.status === "Verified" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"}`}>{v.status}</span></div>
          </div>)}
        </div>
      </div>
    </div>
  );
}
