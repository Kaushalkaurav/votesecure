import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const submit = (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Please fill all fields.");
      return;
    }

    const isAdmin = form.email.toLowerCase().includes("admin");
    const user = {
      id: Date.now().toString(),
      name: isAdmin ? "System Administrator" : "Kaushal Kaurav",
      email: form.email,
      role: isAdmin ? "admin" : "voter",
      department: "Computer Science & Engineering",
    };

    dispatch(login(user));
    toast.success("Login successful.");
    navigate(location.state?.from || (isAdmin ? "/admin" : "/dashboard"), { replace: true });
  };

  return (
    <AuthShell title="Welcome back" subtitle="Sign in to access your voting dashboard.">
      <form onSubmit={submit} className="space-y-5">
        <Field icon={Mail} label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="you@college.edu" />
        <Field icon={LockKeyhole} label="Password" type="password" value={form.password} onChange={(v) => setForm({ ...form, password: v })} placeholder="••••••••" />
        <button className="w-full rounded-xl bg-blue-600 py-3.5 font-semibold hover:bg-blue-500">Sign in</button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500">
        New voter? <Link className="font-semibold text-blue-400 hover:text-blue-300" to="/register">Create an account</Link>
      </p>
      <p className="mt-3 text-center text-xs text-slate-600">Prototype: use any valid-looking email and password. Use an email containing “admin” for the admin demo.</p>
    </AuthShell>
  );
}

function Field({ icon: Icon, label, type, value, onChange, placeholder }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-300">{label}</span>
      <div className="relative">
        <Icon className="absolute left-3 top-3.5 text-slate-500" size={18} />
        <input className="w-full rounded-xl border border-slate-700 bg-slate-900 px-10 py-3 text-sm outline-none placeholder:text-slate-600 focus:border-blue-500" type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
      </div>
    </label>
  );
}

function AuthShell({ title, subtitle, children }) {
  return (
    <div className="grid min-h-[75vh] place-items-center px-5 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/20"><ShieldCheck /></div>
          <h1 className="mt-5 text-3xl font-bold">{title}</h1>
          <p className="mt-2 text-slate-500">{subtitle}</p>
        </div>
        <div className="card p-7">{children}</div>
      </div>
    </div>
  );
}
