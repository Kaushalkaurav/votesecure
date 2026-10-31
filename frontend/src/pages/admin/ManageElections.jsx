import {useState} from 'react';import {useNavigate} from 'react-router';import {toast} from 'react-toastify';import api from '../../services/api';
const newCandidate=()=>({email:'',symbol:'',manifesto:'',description:'',photoUrl:''});
export default function ManageElections(){
const navigate=useNavigate(),[busy,setBusy]=useState(false);
const [form,setForm]=useState({title:'',position:'',type:'student-council',scope:'college',branch:'',startAt:'',endAt:'',allowSelfVote:true,candidates:[newCandidate(),newCandidate()]});
const set=(key,value)=>setForm(old=>({...old,[key]:value}));
const setCandidate=(i,key,value)=>setForm(old=>({...old,candidates:old.candidates.map((c,j)=>i===j?{...c,[key]:value}:c)}));
async function create(event){event.preventDefault();if(new Date(form.endAt)<=new Date(form.startAt))return toast.error('End time must be after start time');
setBusy(true);try{const {data}=await api.post('/admin/elections/complete',{...form,startAt:new Date(form.startAt).toISOString(),endAt:new Date(form.endAt).toISOString()});
toast.success('Election created and scheduled');navigate('/admin/elections/'+data.election._id);
}catch(err){toast.error(err.response?.data?.message||'Could not create election')}finally{setBusy(false)}}
return <div className="max-w-5xl mx-auto px-5 py-12"><h1 className="heading mb-3">Create Election</h1><p className="muted mb-8">Enter all election information once. The election will become visible for voting at its scheduled start and close at its end. All candidates must already have approved student accounts.</p>
<form className="space-y-6" onSubmit={create}>
<section className="card grid md:grid-cols-2 gap-5"><h2 className="text-xl font-bold md:col-span-2">1. Election details</h2>
{[['title','Election title'],['position','Position'],['type','Election type']].map(([key,label])=><label className="field" key={key}>{label}<input required value={form[key]} onChange={e=>set(key,e.target.value)}/></label>)}
<label className="field">Eligible voter group<select value={form.scope} onChange={e=>set('scope',e.target.value)}>{['college','department','class','university','institution'].map(s=><option value={s} key={s}>{s}</option>)}</select></label>
{['class','department'].includes(form.scope)&&<label className="field">Eligible branch<input required value={form.branch} onChange={e=>set('branch',e.target.value)} placeholder="Exact branch from student profiles"/></label>}
<label className="field">Voting start date and time<input required type="datetime-local" value={form.startAt} onChange={e=>set('startAt',e.target.value)}/></label>
<label className="field">Voting end date and time<input required type="datetime-local" value={form.endAt} onChange={e=>set('endAt',e.target.value)}/></label>
<label className="flex gap-3 items-center"><input type="checkbox" checked={form.allowSelfVote} onChange={e=>set('allowSelfVote',e.target.checked)}/> Allow candidate to vote for themselves</label>
<p className="muted text-sm md:col-span-2">Only verified, approved students with completed profiles can vote. For class or department elections, the branch must match. The eligible list is frozen at creation.</p></section>
<section className="space-y-4"><h2 className="text-xl font-bold">2. Candidate information</h2>{form.candidates.map((candidate,i)=><div className="card grid md:grid-cols-2 gap-4" key={i}><h3 className="font-bold md:col-span-2">Candidate {i+1}</h3>
{[['email','Candidate MITS email'],['symbol','Candidate symbol'],['photoUrl','Photo URL (optional)'],['description','Short description']].map(([key,label])=><label className="field" key={key}>{label}<input required={['email','symbol'].includes(key)} type={key==='email'?'email':'text'} value={candidate[key]} onChange={e=>setCandidate(i,key,e.target.value)}/></label>)}
<label className="field md:col-span-2">Manifesto<textarea rows={3} required value={candidate.manifesto} onChange={e=>setCandidate(i,'manifesto',e.target.value)}/></label>
{form.candidates.length>2&&<button type="button" className="btn danger md:col-span-2" onClick={()=>set('candidates',form.candidates.filter((_,j)=>i!==j))}>Remove candidate</button>}</div>)}
<button type="button" className="btn secondary" onClick={()=>set('candidates',[...form.candidates,newCandidate()])}>+ Add candidate</button></section>
<section className="card"><h2 className="font-bold mb-3">3. Confirm and schedule</h2><p className="muted text-sm mb-5">Creating this election schedules it immediately and freezes candidates and voter eligibility. Results become public automatically after voting closes while the backend is running.</p>
<button className="btn w-full" disabled={busy}>{busy?'Creating election…':'Create and Schedule Election'}</button></section></form></div>}
