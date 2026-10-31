import {useState,useEffect} from 'react';import {useNavigate} from 'react-router';import {toast} from 'react-toastify';import api from '../../services/api';
const newCandidate=()=>({email:'',symbol:'',manifesto:'',description:'',photoUrl:''});
export default function ManageElections(){
const navigate=useNavigate(),[busy,setBusy]=useState(false),[users,setUsers]=useState([]),[loadingUsers,setLoadingUsers]=useState(true);
const [form,setForm]=useState({title:'',position:'',type:'student-council',scope:'college',branch:'',startAt:'',endAt:'',allowSelfVote:true,candidates:[newCandidate(),newCandidate()]});
const set=(key,value)=>setForm(old=>({...old,[key]:value}));
const refreshUsers=async()=>{setLoadingUsers(true);try{const {data}=await api.get('/admin/users');setUsers(data.users||[])}catch(err){toast.error(err.response?.data?.message||'Could not load voter approvals')}finally{setLoadingUsers(false)}};
useEffect(()=>{refreshUsers()},[]);
const eligibleUsers=users.filter(u=>u.role!=='admin'&&u.emailVerified&&u.profileComplete&&u.approved&&(['college','university','institution'].includes(form.scope)||u.branch===form.branch));
const pendingUsers=users.filter(u=>u.role==='student'&&!u.approved);
async function approveUser(u){try{await api.patch('/admin/users/'+u._id+'/approval',{approved:true});toast.success('Approved '+u.email);await refreshUsers()}catch(err){toast.error(err.response?.data?.message||'Could not approve voter')}}

const setCandidate=(i,key,value)=>setForm(old=>({...old,candidates:old.candidates.map((c,j)=>i===j?{...c,[key]:value}:c)}));
async function saveDraft(){if(!form.title.trim()||!form.position.trim()||!form.type.trim())return toast.error('Fill in election title, position and type');
if(!form.startAt||!form.endAt||new Date(form.endAt)<=new Date(form.startAt)||new Date(form.startAt)<=new Date())return toast.error('Enter valid future start and end times');
if(['class','department'].includes(form.scope)&&!form.branch.trim())return toast.error('Branch is required');
setBusy(true);try{const {data}=await api.post('/admin/elections',{title:form.title,position:form.position,type:form.type,scope:form.scope,branch:form.branch,startAt:new Date(form.startAt).toISOString(),endAt:new Date(form.endAt).toISOString(),allowSelfVote:form.allowSelfVote});
toast.success('Draft saved. Add approved candidates and schedule when voters are ready.');navigate('/admin/elections/'+data.election._id);
}catch(err){toast.error(err.response?.data?.message||'Draft could not be saved')}finally{setBusy(false)}}
async function create(event){event.preventDefault();if(new Date(form.endAt)<=new Date(form.startAt))return toast.error('End time must be after start time');
if(!eligibleUsers.length)return toast.error('No eligible voters. Approve verified students below before scheduling.');setBusy(true);try{const {data}=await api.post('/admin/elections/complete',{...form,startAt:new Date(form.startAt).toISOString(),endAt:new Date(form.endAt).toISOString()});
toast.success('Election created and scheduled');navigate('/admin/elections/'+data.election._id);
}catch(err){toast.error(err.response?.data?.message||'Could not create election')}finally{setBusy(false)}}
return <div className="max-w-5xl mx-auto px-5 py-12"><h1 className="heading mb-3">Create Election</h1><p className="muted mb-8">Enter all election information once. The election will become visible for voting at its scheduled start and close at its end. All candidates must already have approved student accounts.</p>
<section className="card mb-6"><div className="flex items-center justify-between flex-wrap gap-3"><div><h2 className="font-bold text-lg">Student approval and eligibility</h2><p className="muted text-sm">Approve students first. Only verified accounts with complete profiles can be approved.</p></div><button className="btn secondary" onClick={refreshUsers} disabled={loadingUsers}>Refresh voters</button></div>
<p className="mt-4 text-lg font-bold">{loadingUsers?'Checking…':eligibleUsers.length+' eligible voters for selected scope'}</p>
{!loadingUsers&&pendingUsers.length>0&&<div className="mt-4 space-y-2">{pendingUsers.slice(0,100).map(u=><div className="flex justify-between items-center flex-wrap gap-3 border-t border-slate-700 pt-3" key={u._id}><div className="text-sm"><b>{u.name||u.email}</b><p className="muted">{u.email} · {u.branch||'No branch'} · {u.emailVerified?'Verified':'Email unverified'} · {u.profileComplete?'Profile complete':'Profile incomplete'}</p></div><button className="btn" disabled={!u.emailVerified||!u.profileComplete} onClick={()=>approveUser(u)}>Approve</button></div>)}</div>}
{!loadingUsers&&!users.length&&<p className="muted mt-4">No registered users found. Students must register, verify their email and complete their profile before they can be approved. Admin accounts are not substitute student voters.</p>}
{!loadingUsers&&users.length>0&&!eligibleUsers.length&&<p className="muted mt-4">No eligible approved students in this election group. Check branch spelling, email verification and profile completion.</p>}</section>
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
<section className="card"><h2 className="font-bold mb-3">3. Confirm and schedule</h2><p className="muted text-sm mb-5">Save a draft now even if students are not yet approved. Drafts are private and do not appear in student accounts. Once candidates and voters are ready, you can schedule it. Scheduling freezes the candidate list and eligible voters.</p>
<div className="flex flex-col md:flex-row gap-3"><button type="button" onClick={saveDraft} className="btn secondary flex-1" disabled={busy}>{busy?'Saving…':'Save as Draft'}</button><button className="btn flex-1" disabled={busy||loadingUsers||!eligibleUsers.length}>{busy?'Creating election…':'Create and Schedule Election'}</button></div><p className="muted text-xs mt-4">Saving a draft stores election details. Candidate entries in this form are not saved with a draft; add registered student candidates on the draft management screen.</p></section></form></div>}
