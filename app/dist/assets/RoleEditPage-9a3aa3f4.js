import{y as j,r as i,j as s,s as R}from"./index-64ee5db4.js";import{R as g}from"./RoleForm-55b1a49c.js";import{A as n,C as P}from"./constants-2e6fc461.js";import{C as y}from"./Container-5ebdd271.js";import{P as E}from"./Page-9b18e939.js";import"./zod-bb631345.js";import"./SaveAlt-53517b5f.js";import"./Select-eabe2e08.js";import"./Menu-292a1a41.js";import"./Paper-3ba8c3cc.js";import"./Backdrop-83b371ec.js";import"./createSvgIcon-9ace6ece.js";import"./ArrowBack-afe2bf24.js";import"./common-49ff51cc.js";import"./middleware-4ff88eea.js";import"./Toolbar-984ecaee.js";import"./LoadingButton-d1fcde35.js";import"./CardContent-e1ee60bb.js";import"./Grid-6d55df83.js";import"./TextField-3b5635c4.js";import"./FormControl-24d1bd67.js";function L(){const m=j(),[a,r]=i.useState(!1),[p,l]=i.useState({}),[c,f]=i.useState({});i.useEffect(()=>{const{id:t}=m;u({id:t}),x()},[]);const u=({id:t})=>{r(!0);const o=new URL(`${n}/roles/${t}`);fetch(o).then(async e=>await e.json()).then(e=>{const d=e.permissions.map(({action:h})=>({action:h}));l({...e,permissions:d})}).finally(()=>r(!1))},x=()=>{r(!0);const t=new URL(`${n}/permissions`);fetch(t).then(async o=>await o.json()).then(o=>{f(o)}).finally(()=>r(!1))};return s.jsx(y,{sx:{mt:4,mb:4},children:a&&s.jsx(R,{sx:{display:"flex",flexDirection:"column",alignItems:"center"},children:s.jsx(P,{})})||s.jsx(g,{role:p,permissions:c})})}function K(){return s.jsx(E,{title:"Editar role",children:s.jsx(L,{})})}export{K as default};
