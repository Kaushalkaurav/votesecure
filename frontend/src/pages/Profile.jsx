import {useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import api from '../services/api';
import {setUser} from '../redux/slices/authSlice';

const BRANCH_GROUPS = [
  {
    "label": "Computing & AI",
    "options": [
      "Mathematics and Computing (MAC)",
      "Computer Science and Engineering (CSE)",
      "Computer Science and Technology (CST)",
      "Computer Science and Design (CSD)",
      "Information Technology (IT)",
      "Artificial Intelligence (AI)",
      "Artificial Intelligence and Machine Learning (AIML)",
      "Artificial Intelligence and Data Science (AIDS)",
      "Computer Science and Business Systems (CSBS)",
      "Internet of Things (IoT)"
    ]
  },
  {
    "label": "Core Engineering",
    "options": [
      "Civil Engineering",
      "Mechanical Engineering",
      "Electrical Engineering",
      "Electronics Engineering",
      "Electronics and Telecommunication Engineering",
      "Electronics and Communication Engineering",
      "Chemical Engineering",
      "Automobile Engineering",
      "Industrial and Production Engineering",
      "Biotechnology",
      "Biomedical Engineering",
      "Robotics and Automation",
      "Mechatronics Engineering"
    ]
  },
  {
    "label": "Design & Other",
    "options": [
      "Architecture",
      "Architecture and Planning",
      "Planning",
      "Other Engineering Branch"
    ]
  }
];
const KNOWN_BRANCHES = BRANCH_GROUPS.flatMap(group => group.options);
export default function Profile(){
 const user=useSelector(s=>s.auth.user);
 const dispatch=useDispatch();
 const [name,setName]=useState(user?.name||'');
 const [branch,setBranch]=useState(user?.branch||'');
 const [year,setYear]=useState(user?.year||1);
 const [busy,setBusy]=useState(false);
 async function save(e){
  e.preventDefault();
  setBusy(true);
  try{
   const {data}=await api.put('/auth/profile',{name:name.trim(),branch,year:Number(year)});
   dispatch(setUser(data.user));
   toast.success('Profile saved');
  }catch(err){
   toast.error(err.response?.data?.message||'Could not save profile');
  }finally{setBusy(false)}
 }
 return <div className="max-w-xl mx-auto px-5 py-12">
  <h1 className="heading mb-6">My profile</h1>
  <form onSubmit={save} className="card space-y-5">
   <p className="muted">{user?.email}</p>
   <label className="field">Full name
    <input required value={name} onChange={e=>setName(e.target.value)}/>
   </label>
   <label className="field">Department / branch
    <select required value={branch} onChange={e=>setBranch(e.target.value)} className="w-full">
     <option value="" disabled>Select your department / branch</option>
     {branch&&!KNOWN_BRANCHES.includes(branch)&&<option value={branch}>{branch} (existing profile value)</option>}
     {BRANCH_GROUPS.map(group=><optgroup key={group.label} label={group.label}>
      {group.options.map(option=><option key={option} value={option}>{option}</option>)}
     </optgroup>)}
    </select>
    <span className="muted text-xs">Select the correct branch. Department and class election eligibility uses this value.</span>
   </label>
   <label className="field">Academic year
    <select required value={year} onChange={e=>setYear(e.target.value)} className="w-full">
     {[1,2,3,4,5].map(y=><option key={y} value={y}>Year {y}</option>)}
    </select>
   </label>
   <p className="text-sm muted">Account approval: <b>{user?.approved?'Approved':'Pending'}</b></p>
   <button className="btn" disabled={busy}>{busy?'Saving…':'Save profile'}</button>
  </form>
 </div>;
}
