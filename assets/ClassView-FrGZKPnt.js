import{u as h,r as k,o as w,w as C,c,a as l,b as L,F as y,d as v,e as b,f as _,g as $,h as g,i as s,j as B,k as S,_ as V,l as x}from"./index-BkqMDDG8.js";import{_ as D}from"./Breadcrumb-CLhXGeMR.js";const F=["dir"],R={key:0,class:"space-y-3"},I={__name:"ClassView",setup(q){const m=[{title:"Semesters List",link:"/"},{title:"Classes List",link:""}],i=$().query.semester,p=h(),{getClasses:f}=g();let u="ltr",n=[];const t=k([]);return w(async()=>{const{classesData:a,direction:e}=await f(i);n=a,u=e,t.value=n}),C(()=>p.searchValue,a=>{const e=a.toLowerCase();t.value=n.filter(r=>r.title.toLowerCase().includes(e)||r.description.toLowerCase().includes(e))}),(a,e)=>{var d;const r=S("RouterLink");return s(),c("main",null,[l(D,{"breadcrumb-items":m}),L("div",{class:"mt-5",dir:_(u)},[((d=t.value)==null?void 0:d.length)>0?(s(),c("ul",R,[(s(!0),c(y,null,v(t.value,o=>(s(),c("li",{key:"semester"+o.id},[l(r,{to:`/classes/students?semester=${_(i)}&class=${o.id}`},{default:B(()=>[l(V,{title:o.title,description:o.description},null,8,["title","description"])]),_:2},1032,["to"])]))),128))])):(s(),b(x,{key:1}))],8,F)])}}};export{I as default};