import{r as e,j as t,s as p}from"./index-d910b063.js";import{U as l}from"./UserForm-27f8c01d.js";import{A as c,C as f}from"./constants-53c7a41b.js";import{C as u}from"./Container-07cda008.js";import{P as x}from"./Page-3b479898.js";import"./zod-c60ef88b.js";import"./SaveAlt-d9410daf.js";import"./Select-4dcb9f12.js";import"./Menu-f153eb6a.js";import"./Paper-37965af9.js";import"./Backdrop-6925e10d.js";import"./createSvgIcon-08e146b5.js";import"./ArrowBack-1462d81c.js";import"./common-67d9a476.js";import"./middleware-514cbe06.js";import"./Toolbar-bb7e79c6.js";import"./LoadingButton-54b2c4a2.js";import"./CardContent-441a39f3.js";import"./Grid-1fa796df.js";import"./TextField-47f91fce.js";import"./FormControl-070dad34.js";function j(){const[s,o]=e.useState(!1),[i,a]=e.useState({});e.useEffect(()=>{m()},[]);const m=()=>{o(!0);const n=new URL(`${c}/roles`);fetch(n).then(async r=>await r.json()).then(r=>{a(r)}).finally(()=>o(!1))};return t.jsx(u,{sx:{mt:4,mb:4},children:s&&t.jsx(p,{sx:{display:"flex",flexDirection:"column",alignItems:"center"},children:t.jsx(f,{})})||t.jsx(l,{roles:i})})}function v(){return t.jsx(x,{title:"Crear usuario",children:t.jsx(j,{})})}export{v as default};
