import{r as D,i as E}from"./createSvgIcon-b7cd30e7.js";import{j as r,r as n}from"./index-ac188f65.js";import{d as b,D as _,a as k,b as S,c as y,e as z}from"./Delete-9f6c9900.js";import{u as I}from"./common-d48a2c7f.js";import{a as L}from"./api-ff746449.js";import{B as c}from"./Page-26c9b60a.js";import{A as B}from"./Alert-67fb8a6b.js";import{B as P}from"./Box-2099d454.js";import{T as d}from"./Typography-f4c329c2.js";import{L as R}from"./LoadingButton-a21a2d58.js";var o={},T=E;Object.defineProperty(o,"__esModule",{value:!0});var w=o.default=void 0,q=T(D()),A=r,O=(0,q.default)((0,A.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"}),"Info");w=o.default=O;function K({id:m,name:u,onFinished:p,disabled:f=!1}){const[h,a]=n.useState(!1),[x,i]=n.useState(!1),s=I(e=>e.showSnackbar),g=e=>{e.stopPropagation(),e.preventDefault(),a(!0)},l=e=>{e.stopPropagation(),e.preventDefault(),a(!1)},j=e=>{e.stopPropagation(),e.preventDefault(),v({id:m})},v=({id:e})=>{i(!0);const C=new URL(`${L}/customers/${e}`);fetch(C,{method:"DELETE"}).then(t=>t.json()).then(t=>{s("El cliente se eliminó corretamente","success"),p()}).catch(t=>s("Error al intentar eliminar el cliente","error")).finally(()=>{a(!1),i(!1)})};return r.jsxs(r.Fragment,{children:[r.jsx(c,{size:"small",color:"error",startIcon:r.jsx(b,{}),onClick:e=>g(e),disabled:f,children:"Eliminar"}),r.jsxs(_,{fullWidth:!0,maxWidth:"sm",open:h,onClose:e=>l(e),"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[r.jsx(k,{id:"alert-dialog-title",children:"Eliminar cliente"}),r.jsxs(S,{children:[r.jsxs(y,{id:"alert-dialog-description",children:[r.jsx(B,{severity:"warning",color:"error",children:"Depués de eliminar un cliente, este se borra de manera permanente. Esta acción no se puede deshacer."}),r.jsxs(P,{m:2,children:[r.jsx(d,{variant:"caption",children:"Nombre del cliente"}),r.jsx(d,{mt:1,color:"black",children:u})]})]}),r.jsxs(z,{children:[r.jsx(c,{size:"small",onClick:l,children:"Cancelar"}),r.jsx(R,{loading:x,variant:"contained",color:"error",size:"small",loadingPosition:"start",disableElevation:!0,autoFocus:!0,onClick:j,children:"Eliminar"})]})]})]})]})}export{K as C,w as d};
