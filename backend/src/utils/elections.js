export const statusOf=(e,at=new Date())=>{if(e.status==='cancelled')return 'cancelled';if(e.status==='draft')return 'draft';if(e.publishedAt)return 'published';if(at<e.startAt)return 'scheduled';if(at>=e.endAt)return 'closed';return 'active';};
export const eligible=(u,e)=>u.emailVerified&&u.approved&&u.profileComplete&&(e.scope!=='department'&&e.scope!=='class'||u.branch===e.branch);
