import{r as o,j as r}from"./index-0c29d899.js";import{R as p}from"./RoleForm-b54c5feb.js";import{a as l}from"./api-ff746449.js";import{C as f}from"./Container-18546780.js";import{B as c}from"./Box-c9cec713.js";import{C as x}from"./LoadingButton-047ce5b6.js";import{P as u}from"./Page-1a493442.js";import"./zod-dc8287a8.js";import"./SaveAlt-c6042c56.js";import"./styled-1354fb8a.js";import"./ArrowBack-b36fab9a.js";import"./Select-1f0e709b.js";import"./Backdrop-956e9521.js";import"./Typography-3ca4fb90.js";import"./Menu-98bf16ef.js";import"./createSvgIcon-3d5d7fc7.js";import"./common-3c77f740.js";import"./Toolbar-5d78288d.js";import"./CardContent-50f741c0.js";import"./Grid-8d009676.js";import"./TextField-1117f610.js";function j(){const[e,s]=o.useState(!1),[i,m]=o.useState({});o.useEffect(()=>{n()},[]);const n=()=>{s(!0);const a=new URL(`${l}/permissions`);fetch(a).then(t=>t.json()).then(t=>{m(t)}).finally(()=>s(!1))};return r.jsx(f,{sx:{mt:4,mb:4},children:e&&r.jsx(c,{sx:{display:"flex",flexDirection:"column",alignItems:"center"},children:r.jsx(x,{})})||r.jsx(p,{permissions:i})})}function A(){return r.jsx(u,{title:"Crear role",children:r.jsx(j,{})})}export{A as default};
