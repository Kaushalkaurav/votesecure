import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { IdCard, LockKeyhole, Mail, User, ShieldCheck } from "lucide-react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { register } from "../redux/slices/authSlice";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", enrollment: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    if (Object.values(form).some((v) => !v.trim())) {
      toast.error("Please fill all fields.");
      return;
    }

    dispatch(register({
      id: Date.now().toString(),
      name: form.name,
      email: form.email,
      enrollment: form.enrollment,
      role: "voter",
      department: "Computer Science & Engineering",
    }));
    toast.success("Account created successfully.");
    navigate("/dashboard");
  };

  const update = (key, value) => setForm({ ...form, [key]: value });

  return (
    <div className="grid min-h-[75vh] place-items-center px-5 py-16">
      <div className="w-full max-w-lg">
        <div className="mb-8 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-blue-600"><ShieldCheck /></div>
          <h1 className="mt-5 text-3xl font-bold">Create voter account</h1>
          <p className="mt-2 text-slate-500">Register to participate in eligible elections.</p>
        </div>

        <form onSubmit={submit} className="card space-y-5 p-7">
          <Field icon={User} label="Full name" value={form.name} onChange={(v) => update("name", v)} placeholder="Your full name" />
          <Field icon={Mail} label="College email" type="email" value={form.email} onChange={(v) => update("email", v)} placeholder="you@college.edu" />
          <Field icon={IdCard} label="Enrollment number" value={form.enrollment} onChange={(v) => update("enrollment", v)} placeholder="2026CSE001" />
          <Field icon={LockKeyhole} label="Password" type="password" value={form.password} onChange={(v) => update("password", v)} placeholder="Create a password" />
          <button className="w-full rounded-xl bg-blue-600 py-3.5 font-semibold hover:bg-blue-500">Create account</button>
          <p className="text-center text-sm text-slate-500">Already registered? <Link to="/login" className="text-blue-400">Sign in</Link></p>
        </form>
      </div>
    </div>
  );
}

function Field({ icon: Icon, label, type = "text", value, onChange, placeholder }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-300">{label}</span>
      <div className="relative">
        <Icon size={18} className="absolute left-3 top-3.5 text-slate-500" />
        <input className="w-full rounded-xl border border-slate-700 bg-slate-900 px-10 py-3 outline-none focus:border-blue-500" type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
      </div>
    </label>
  );
}
