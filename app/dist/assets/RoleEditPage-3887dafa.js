import{l as j,r as i,j as s}from"./index-9677fb1d.js";import{R}from"./RoleForm-fca79080.js";import{a as n}from"./api-8c80c0c6.js";import{C as g}from"./Container-5281b8e5.js";import{B as E}from"./Box-fdb4e9b4.js";import{C as P}from"./LoadingButton-571f862e.js";import{P as y}from"./Page-7009a855.js";import"./zod-17690143.js";import"./common-702765eb.js";import"./CardContent-b2ff2756.js";import"./styled-74b42274.js";import"./Typography-6afa1d35.js";import"./Grid-ee256b94.js";import"./TextField-ab7eae9e.js";import"./Select-f2ad5919.js";import"./Menu-c1c20287.js";import"./FormControlLabel-b25ec66b.js";import"./Checkbox-aa8a1e6b.js";function C(){const m=j(),[a,r]=i.useState(!1),[p,l]=i.useState({}),[c,f]=i.useState({});i.useEffect(()=>{const{id:t}=m;u({id:t}),x()},[]);const u=({id:t})=>{r(!0);const o=new URL(`${n}:3000/api/roles/${t}`);fetch(o).then(e=>e.json()).then(e=>{const d=e.permissions.map(({action:h})=>({action:h}));l({...e,permissions:d})}).finally(()=>r(!1))},x=()=>{r(!0);const t=new URL(`${n}:3000/api/permissions`);fetch(t).then(o=>o.json()).then(o=>{f(o)}).finally(()=>r(!1))};return s.jsx(g,{sx:{mt:4,mb:4},children:a&&s.jsx(E,{sx:{display:"flex",flexDirection:"column",alignItems:"center"},children:s.jsx(P,{})})||s.jsx(R,{role:p,permissions:c})})}function H(){return s.jsx(y,{title:"Editar role",children:s.jsx(C,{})})}export{H as default};
