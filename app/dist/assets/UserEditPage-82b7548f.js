import{k as j,r as i,j as t}from"./index-0c29d899.js";import{U}from"./UserForm-8d2a4fd0.js";import{a as n}from"./api-ff746449.js";import{C as g}from"./Container-18546780.js";import{B as E}from"./Box-c9cec713.js";import{C as P}from"./LoadingButton-047ce5b6.js";import{P as R}from"./Page-1a493442.js";import"./zod-dc8287a8.js";import"./SaveAlt-c6042c56.js";import"./styled-1354fb8a.js";import"./ArrowBack-b36fab9a.js";import"./Select-1f0e709b.js";import"./Backdrop-956e9521.js";import"./Typography-3ca4fb90.js";import"./Menu-98bf16ef.js";import"./createSvgIcon-3d5d7fc7.js";import"./common-3c77f740.js";import"./Toolbar-5d78288d.js";import"./CardContent-50f741c0.js";import"./Grid-8d009676.js";import"./TextField-1117f610.js";function y(){const m=j(),[a,e]=i.useState(!1),[l,p]=i.useState({}),[c,u]=i.useState({});i.useEffect(()=>{const{id:r}=m;f({id:r}),x()},[]);const f=({id:r})=>{e(!0);const s=new URL(`${n}/users/${r}`);fetch(s).then(o=>o.json()).then(o=>{const d=o.roles.map(({name:h})=>({name:h}));p({...o,roles:d})}).finally(()=>e(!1))},x=()=>{e(!0);const r=new URL(`${n}/roles`);fetch(r).then(s=>s.json()).then(s=>{u(s)}).finally(()=>e(!1))};return t.jsx(g,{sx:{mt:4,mb:4},children:a&&t.jsx(E,{sx:{display:"flex",flexDirection:"column",alignItems:"center"},children:t.jsx(P,{})})||t.jsx(U,{user:l,roles:c})})}function K(){return t.jsx(R,{title:"Editar usuario",children:t.jsx(y,{})})}export{K as default};
