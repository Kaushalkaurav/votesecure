import {useEffect,useState} from 'react';
import {Link} from 'react-router';
import api from '../../services/api';
export default function AdminDashboard(){
 const [elections,setElections]=useState([]),[loading,setLoading]=useState(true),[error,setError]=useState('');
 useEffect(()=>{let live=true;api.get('/admin/elections').then(({data})=>{if(live)setElections(data.elections||[])}).catch(err=>{if(live)setError(err.response?.data?.message||'Unable to load current elections')}).finally(()=>{if(live)setLoading(false)});return()=>{live=false}},[]);
 return <main className="max-w-6xl mx-auto px-5 py-12">
 <div className="flex items-start justify-between flex-wrap gap-5 mb-9"><div><h1 className="heading">Election administration</h1><p className="muted mt-2">Create an election or manage one that is still in progress.</p></div><Link className="btn" to="/admin/elections">+ Create Election</Link></div>
 <h2 className="text-xl font-bold mb-4">Current elections</h2>
 {loading?<div className="card muted">Loading elections…</div>:error?<div className="card"><p>{error}</p><button className="btn secondary mt-4" onClick={()=>window.location.reload()}>Retry</button></div>:elections.length?<div className="grid-cards">{elections.map(e=><Link className="card block hover:border-indigo-400" to={'/admin/elections/'+e._id} key={e._id}><div className="flex justify-between items-center gap-2"><span className="pill capitalize">{e.state}</span><span className="text-sm text-indigo-300">Open management →</span></div><h3 className="font-bold text-lg mt-5">{e.title}</h3><p className="muted mt-2">{e.position} · {e.scope}</p><p className="muted text-sm mt-3">Start: {new Date(e.startAt).toLocaleString()}</p><p className="muted text-sm">End: {new Date(e.endAt).toLocaleString()}</p></Link>)}</div>:<div className="card"><p className="muted">No draft or ongoing elections. Create your first election to begin.</p><Link className="btn mt-5" to="/admin/elections">Create Election</Link></div>}
 </main>;
}
