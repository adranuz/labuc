import{k as j,r as i,j as s}from"./index-b42bb106.js";import{R}from"./RoleForm-7bc4cc34.js";import{a as n}from"./api-8c80c0c6.js";import{C as g}from"./Container-39c7183f.js";import{B as E}from"./Box-244d35cf.js";import{C as P}from"./LoadingButton-81671c98.js";import{P as y}from"./Page-d4992afd.js";import"./zod-a8855a22.js";import"./SaveAlt-79ed37c7.js";import"./styled-82e1a40e.js";import"./ArrowBack-97b0fd8e.js";import"./Select-b0379f96.js";import"./Backdrop-8d503ce4.js";import"./Typography-97eb5159.js";import"./Menu-8b8cdc95.js";import"./createSvgIcon-d23abb9c.js";import"./common-f20c29b3.js";import"./Toolbar-d2130989.js";import"./CardContent-829057de.js";import"./Grid-a49563b8.js";import"./TextField-4fbb389d.js";function C(){const m=j(),[a,r]=i.useState(!1),[p,l]=i.useState({}),[c,f]=i.useState({});i.useEffect(()=>{const{id:t}=m;u({id:t}),x()},[]);const u=({id:t})=>{r(!0);const o=new URL(`${n}/roles/${t}`);fetch(o).then(e=>e.json()).then(e=>{const d=e.permissions.map(({action:h})=>({action:h}));l({...e,permissions:d})}).finally(()=>r(!1))},x=()=>{r(!0);const t=new URL(`${n}/permissions`);fetch(t).then(o=>o.json()).then(o=>{f(o)}).finally(()=>r(!1))};return s.jsx(g,{sx:{mt:4,mb:4},children:a&&s.jsx(E,{sx:{display:"flex",flexDirection:"column",alignItems:"center"},children:s.jsx(P,{})})||s.jsx(R,{role:p,permissions:c})})}function M(){return s.jsx(y,{title:"Editar role",children:s.jsx(C,{})})}export{M as default};
