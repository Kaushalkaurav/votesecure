export default function StatCard({ icon: Icon, label, value, description }) {
  return (
    <div className="card p-5">
      <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-blue-500/10 text-blue-400">
        <Icon size={21} />
      </div>
      <p className="text-3xl font-bold text-white">{value}</p>
      <p className="mt-1 font-medium text-slate-300">{label}</p>
      {description && <p className="mt-1 text-xs text-slate-500">{description}</p>}
    </div>
  );
}
