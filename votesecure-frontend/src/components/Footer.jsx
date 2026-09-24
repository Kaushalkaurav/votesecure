import { ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-slate-300">
          <ShieldCheck size={18} className="text-blue-500" />
          <span>VoteSecure</span>
        </div>
        <p>Secure digital voting platform • MITS Gwalior prototype</p>
      </div>
    </footer>
  );
}
