import{k as g,r as s,j as t}from"./index-0c29d899.js";import{C as j}from"./CustomerForm-7d167900.js";import{a as n}from"./api-ff746449.js";import{C as h}from"./Container-18546780.js";import{B as P}from"./Box-c9cec713.js";import{C as L}from"./LoadingButton-047ce5b6.js";import{P as y}from"./Page-1a493442.js";import"./zod-dc8287a8.js";import"./createSvgIcon-3d5d7fc7.js";import"./Typography-3ca4fb90.js";import"./styled-1354fb8a.js";import"./Delete-dad75097.js";import"./Backdrop-956e9521.js";import"./Menu-98bf16ef.js";import"./SaveAlt-c6042c56.js";import"./ArrowBack-b36fab9a.js";import"./Select-1f0e709b.js";import"./ConfirmCustomerDeletion-edb5e55e.js";import"./common-3c77f740.js";import"./Alert-4c46d2e6.js";import"./Grid-8d009676.js";import"./CardContent-50f741c0.js";import"./Stack-75599046.js";import"./TextField-1117f610.js";import"./MenuItem-0b7c80ac.js";import"./dividerClasses-a1a459bd.js";import"./InputAdornment-2b5e9b64.js";import"./Close-77287c24.js";import"./Toolbar-5d78288d.js";import"./TabPanel-63ce7963.js";import"./KeyboardArrowRight-b37c2a27.js";function S(){const a=g(),[p,i]=s.useState(!1),[u,m]=s.useState(!1),[c,l]=s.useState({}),[f,d]=s.useState({});s.useEffect(()=>{const{id:r}=a;x({id:r}),C()},[]);const x=({id:r})=>{i(!0);const o=new URL(`${n}/customers/${r}`);fetch(o).then(e=>e.json()).then(e=>{l(e)}).finally(()=>i(!1))},C=()=>{m(!0);const r=new URL(`${n}/products`);fetch(r).then(o=>o.json()).then(o=>{d(o)}).finally(()=>m(!1))};return t.jsx(h,{sx:{mt:4,mb:4},children:(p||u)&&t.jsx(P,{sx:{display:"flex",flexDirection:"column",alignItems:"center"},children:t.jsx(L,{})})||t.jsx(j,{customer:c,productsList:f,readOnly:!0})})}function rt(){return t.jsx(y,{title:"Cliente",children:t.jsx(S,{})})}export{rt as default};
