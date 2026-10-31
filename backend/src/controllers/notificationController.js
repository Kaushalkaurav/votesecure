import Notification from '../models/Notification.js';import {fail} from '../config/validation.js';
export const list=async(req,res)=>{const [notifications,unread]=await Promise.all([Notification.find({user:req.user.id}).sort({createdAt:-1}).limit(100),Notification.countDocuments({user:req.user.id,readAt:null})]);res.json({notifications,unread});};
export const read=async(req,res)=>{const item=await Notification.findOneAndUpdate({_id:req.params.id,user:req.user.id},{$set:{readAt:new Date()}},{new:true});if(!item)throw fail('Notification not found',404);res.json({notification:item});};
