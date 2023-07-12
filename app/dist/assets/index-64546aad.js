import{j as e,f as C,r as l}from"./index-e06af375.js";import{o as b,s as c,u as w,C as m,t as y}from"./zod-c70e1e28.js";import{a as v}from"./api-ff746449.js";import{c as u,T as z}from"./Typography-c441fe83.js";import{C as I,a as P}from"./CardContent-9509f165.js";import{B as T}from"./Box-88fb8089.js";import{T as d}from"./TextField-d9fc59e3.js";import{I as q}from"./InputAdornment-75db42dd.js";import{I as L}from"./Menu-e27c80cb.js";import{L as B}from"./LoadingButton-3a7488f1.js";import{P as M}from"./Page-a29a2f01.js";import"./styled-bbf70655.js";import"./Select-29c49290.js";import"./Backdrop-d96c61dd.js";const k=u(e.jsx("path",{d:"M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"}),"Visibility"),V=u(e.jsx("path",{d:"M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78 3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"}),"VisibilityOff"),F=b({email:c({required_error:"Se requiere la dirección de correo electrónico"}).min(1,{message:"Se requiere la dirección de correo electrónico"}).email("La dirección de correo electrónico es inválida"),password:c({required_error:"Se requiere la contraseña"}).min(1,{message:"Se requiere la contraseña"})});function O(){const p=C(),[s,f]=l.useState(!1),[h,a]=l.useState(!1),x=()=>f(t=>!t),g=t=>{t.preventDefault()},{control:r,handleSubmit:j,formState:{errors:o}}=w({resolver:y(F)}),S=({email:t,password:i})=>{a(!0),fetch(`${v}/login`,{method:"POST",body:JSON.stringify({email:t,password:i}),headers:{"Content-Type":"application/json"}}).then(n=>n.json()).then(n=>{n!=null&&n.token&&(localStorage.setItem("token",n.token),p("/"))}).finally(()=>a(!1))};return e.jsxs(e.Fragment,{children:[e.jsx(z,{variant:"h5",component:"h2",gutterBottom:!0,children:"Iniciar sesión"}),e.jsx(I,{variant:"outlined",children:e.jsx(P,{children:e.jsxs(T,{component:"form",onSubmit:j(S),noValidate:!0,children:[e.jsx(m,{name:"email",control:r,render:({field:t})=>{var i;return e.jsx(d,{margin:"normal",required:!0,fullWidth:!0,size:"small",label:"Correo electrónico",autoFocus:!0,autoComplete:"email",error:!!(o!=null&&o.email),helperText:(o==null?void 0:o.email)!==null?(i=o==null?void 0:o.email)==null?void 0:i.message:null,...t})}}),e.jsx(m,{name:"password",control:r,render:({field:t})=>{var i;return e.jsx(d,{margin:"normal",required:!0,fullWidth:!0,size:"small",label:"Contraseña",type:s?"text":"password",error:!!(o!=null&&o.password),helperText:(o==null?void 0:o.password)!==null?(i=o==null?void 0:o.password)==null?void 0:i.message:null,...t,InputProps:{endAdornment:e.jsx(q,{position:"end",children:e.jsx(L,{"aria-label":"Alternar la visibilidad de la contraseña",onClick:x,onMouseDown:g,edge:"end",children:s?e.jsx(V,{}):e.jsx(k,{})})})}})}}),e.jsx(B,{loading:h,variant:"contained",size:"small",loadingPosition:"start",sx:{mt:1},fullWidth:!0,disableElevation:!0,type:"submit",children:"Continuar"})]})})})]})}function X(){return e.jsx(M,{title:"Iniciar sesión",children:e.jsx(O,{})})}export{X as default};
