import{y as j,r as i,j as t,s as U}from"./index-64ee5db4.js";import{U as g}from"./UserForm-b289efea.js";import{A as n,C as y}from"./constants-2e6fc461.js";import{C as E}from"./Container-5ebdd271.js";import{P}from"./Page-9b18e939.js";import"./zod-bb631345.js";import"./SaveAlt-53517b5f.js";import"./Select-eabe2e08.js";import"./Menu-292a1a41.js";import"./Paper-3ba8c3cc.js";import"./Backdrop-83b371ec.js";import"./createSvgIcon-9ace6ece.js";import"./ArrowBack-afe2bf24.js";import"./common-49ff51cc.js";import"./middleware-4ff88eea.js";import"./Toolbar-984ecaee.js";import"./LoadingButton-d1fcde35.js";import"./CardContent-e1ee60bb.js";import"./Grid-6d55df83.js";import"./TextField-3b5635c4.js";import"./FormControl-24d1bd67.js";function R(){const a=j(),[m,e]=i.useState(!1),[l,p]=i.useState({}),[c,u]=i.useState({});i.useEffect(()=>{const{id:s}=a;f({id:s}),x()},[]);const f=({id:s})=>{e(!0);const r=new URL(`${n}/users/${s}`);fetch(r).then(async o=>await o.json()).then(o=>{const d=o.roles.map(({name:h})=>({name:h}));p({...o,roles:d})}).finally(()=>e(!1))},x=()=>{e(!0);const s=new URL(`${n}/roles`);fetch(s).then(async r=>await r.json()).then(r=>{u(r)}).finally(()=>e(!1))};return t.jsx(E,{sx:{mt:4,mb:4},children:m&&t.jsx(U,{sx:{display:"flex",flexDirection:"column",alignItems:"center"},children:t.jsx(y,{})})||t.jsx(g,{user:l,roles:c})})}function J(){return t.jsx(P,{title:"Editar usuario",children:t.jsx(R,{})})}export{J as default};
