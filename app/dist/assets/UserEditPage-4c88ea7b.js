import{k as j,r as i,j as t}from"./index-c55a0fba.js";import{U}from"./UserForm-703ea68d.js";import{a as n}from"./api-ff746449.js";import{C as g}from"./Container-32e80ff4.js";import{B as E}from"./Box-c2177a00.js";import{C as P}from"./LoadingButton-a5da5fcf.js";import{P as R}from"./Page-32cf40c3.js";import"./zod-199a2f50.js";import"./SaveAlt-22959695.js";import"./styled-82db80f4.js";import"./ArrowBack-6e29c51a.js";import"./Select-7661252d.js";import"./useSlotProps-46c78ac0.js";import"./Typography-68b384b6.js";import"./Menu-14efc5a8.js";import"./createSvgIcon-bd1704b2.js";import"./common-7636977c.js";import"./Toolbar-d0ba1ecd.js";import"./CardContent-044b4f90.js";import"./Grid-b631e025.js";import"./TextField-1e720d3c.js";function y(){const m=j(),[a,e]=i.useState(!1),[l,p]=i.useState({}),[c,u]=i.useState({});i.useEffect(()=>{const{id:r}=m;f({id:r}),x()},[]);const f=({id:r})=>{e(!0);const s=new URL(`${n}/users/${r}`);fetch(s).then(o=>o.json()).then(o=>{const d=o.roles.map(({name:h})=>({name:h}));p({...o,roles:d})}).finally(()=>e(!1))},x=()=>{e(!0);const r=new URL(`${n}/roles`);fetch(r).then(s=>s.json()).then(s=>{u(s)}).finally(()=>e(!1))};return t.jsx(g,{sx:{mt:4,mb:4},children:a&&t.jsx(E,{sx:{display:"flex",flexDirection:"column",alignItems:"center"},children:t.jsx(P,{})})||t.jsx(U,{user:l,roles:c})})}function K(){return t.jsx(R,{title:"Editar usuario",children:t.jsx(y,{})})}export{K as default};
