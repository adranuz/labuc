import{k as j,r as i,j as t}from"./index-ac188f65.js";import{U}from"./UserForm-efdc737d.js";import{a as n}from"./api-ff746449.js";import{C as g}from"./Container-daddc436.js";import{B as E}from"./Box-2099d454.js";import{C as P}from"./LoadingButton-a21a2d58.js";import{P as R}from"./Page-26c9b60a.js";import"./zod-d70736a0.js";import"./SaveAlt-92cc09df.js";import"./styled-3f9e6ac5.js";import"./ArrowBack-fed016d3.js";import"./Select-8053c5b6.js";import"./Backdrop-ed2d8653.js";import"./Typography-f4c329c2.js";import"./Menu-cc1ec0f3.js";import"./createSvgIcon-b7cd30e7.js";import"./common-d48a2c7f.js";import"./Toolbar-15aff84d.js";import"./CardContent-7816c3b5.js";import"./Grid-af0e3c43.js";import"./TextField-85daf831.js";function y(){const m=j(),[a,e]=i.useState(!1),[l,p]=i.useState({}),[c,u]=i.useState({});i.useEffect(()=>{const{id:r}=m;f({id:r}),x()},[]);const f=({id:r})=>{e(!0);const s=new URL(`${n}/users/${r}`);fetch(s).then(o=>o.json()).then(o=>{const d=o.roles.map(({name:h})=>({name:h}));p({...o,roles:d})}).finally(()=>e(!1))},x=()=>{e(!0);const r=new URL(`${n}/roles`);fetch(r).then(s=>s.json()).then(s=>{u(s)}).finally(()=>e(!1))};return t.jsx(g,{sx:{mt:4,mb:4},children:a&&t.jsx(E,{sx:{display:"flex",flexDirection:"column",alignItems:"center"},children:t.jsx(P,{})})||t.jsx(U,{user:l,roles:c})})}function K(){return t.jsx(R,{title:"Editar usuario",children:t.jsx(y,{})})}export{K as default};
