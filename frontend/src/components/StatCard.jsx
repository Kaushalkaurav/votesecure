export default function StatCard({label,value}){return <div className="card"><div className="muted text-sm">{label}</div><div className="text-3xl font-bold mt-3">{value??'—'}</div></div>}
