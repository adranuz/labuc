import{k as j,r as i,j as t}from"./index-e06af375.js";import{U}from"./UserForm-69c4d1f8.js";import{a as n}from"./api-ff746449.js";import{C as g}from"./Container-4a502da1.js";import{B as E}from"./Box-88fb8089.js";import{C as P}from"./LoadingButton-3a7488f1.js";import{P as R}from"./Page-a29a2f01.js";import"./zod-c70e1e28.js";import"./SaveAlt-917863ad.js";import"./styled-bbf70655.js";import"./ArrowBack-5b5e2c49.js";import"./Select-29c49290.js";import"./Backdrop-d96c61dd.js";import"./Typography-c441fe83.js";import"./Menu-e27c80cb.js";import"./createSvgIcon-af59304e.js";import"./common-5771c6fd.js";import"./Toolbar-7d3cc063.js";import"./CardContent-9509f165.js";import"./Grid-d5f187a5.js";import"./TextField-d9fc59e3.js";function y(){const m=j(),[a,e]=i.useState(!1),[l,p]=i.useState({}),[c,u]=i.useState({});i.useEffect(()=>{const{id:r}=m;f({id:r}),x()},[]);const f=({id:r})=>{e(!0);const s=new URL(`${n}/users/${r}`);fetch(s).then(o=>o.json()).then(o=>{const d=o.roles.map(({name:h})=>({name:h}));p({...o,roles:d})}).finally(()=>e(!1))},x=()=>{e(!0);const r=new URL(`${n}/roles`);fetch(r).then(s=>s.json()).then(s=>{u(s)}).finally(()=>e(!1))};return t.jsx(g,{sx:{mt:4,mb:4},children:a&&t.jsx(E,{sx:{display:"flex",flexDirection:"column",alignItems:"center"},children:t.jsx(P,{})})||t.jsx(U,{user:l,roles:c})})}function K(){return t.jsx(R,{title:"Editar usuario",children:t.jsx(y,{})})}export{K as default};
