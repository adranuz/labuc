import{l as j,r as i,j as s}from"./index-a059c80c.js";import{R}from"./RoleForm-a53ebcb6.js";import{a as n}from"./api-ff746449.js";import{C as g}from"./Container-56d5a9bf.js";import{B as E}from"./Box-224b09ef.js";import{C as P}from"./LoadingButton-a40bbbaf.js";import{P as y}from"./Page-bc3f9c48.js";import"./zod-5b6f7f46.js";import"./common-498f3145.js";import"./CardContent-57e3b388.js";import"./styled-d13899d2.js";import"./Typography-72a89b57.js";import"./Grid-2b651f1b.js";import"./TextField-9a3829b7.js";import"./Select-0007cd07.js";import"./Menu-8a0a1d4d.js";import"./FormControlLabel-f9ba4ae5.js";import"./Checkbox-ff1d9646.js";function C(){const m=j(),[a,r]=i.useState(!1),[l,p]=i.useState({}),[c,f]=i.useState({});i.useEffect(()=>{const{id:t}=m;u({id:t}),x()},[]);const u=({id:t})=>{r(!0);const o=new URL(`${n}/roles/${t}`);fetch(o).then(e=>e.json()).then(e=>{const d=e.permissions.map(({action:h})=>({action:h}));p({...e,permissions:d})}).finally(()=>r(!1))},x=()=>{r(!0);const t=new URL(`${n}/permissions`);fetch(t).then(o=>o.json()).then(o=>{f(o)}).finally(()=>r(!1))};return s.jsx(g,{sx:{mt:4,mb:4},children:a&&s.jsx(E,{sx:{display:"flex",flexDirection:"column",alignItems:"center"},children:s.jsx(P,{})})||s.jsx(R,{role:l,permissions:c})})}function H(){return s.jsx(y,{title:"Editar role",children:s.jsx(C,{})})}export{H as default};
