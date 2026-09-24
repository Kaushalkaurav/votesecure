import { useSelector } from "react-redux";
import { User, Mail, ShieldCheck, IdCard } from "lucide-react";

export default function Profile() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">Account</p>
      <h1 className="mt-2 text-4xl font-bold">Profile</h1>
      <div className="card mt-8 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600/20 to-violet-600/20 p-8">
          <div className="grid h-20 w-20 place-items-center rounded-3xl bg-blue-600 text-2xl font-bold">{user?.name?.charAt(0) || "U"}</div>
          <h2 className="mt-5 text-2xl font-bold">{user?.name}</h2>
          <p className="text-slate-400">{user?.role}</p>
        </div>
        <div className="space-y-1 p-6">
          <Info icon={User} label="Full name" value={user?.name} />
          <Info icon={Mail} label="Email" value={user?.email} />
          <Info icon={IdCard} label="Enrollment" value={user?.enrollment || "Verified voter"} />
          <Info icon={ShieldCheck} label="Role" value={user?.role} />
        </div>
      </div>
    </div>
  );
}

function Info({ icon: Icon, label, value }) {
  return <div className="flex items-center gap-4 rounded-xl p-4 hover:bg-slate-900"><Icon size={19} className="text-blue-400" /><div><p className="text-xs text-slate-500">{label}</p><p className="mt-1 font-medium">{value}</p></div></div>;
}
