import{k as d,r as e,j as t}from"./index-c55a0fba.js";import{C}from"./CustomerForm-83e3ff7f.js";import{a as m}from"./api-ff746449.js";import{C as j}from"./Container-32e80ff4.js";import{B as h}from"./Box-c2177a00.js";import{C as g}from"./LoadingButton-a5da5fcf.js";import{P}from"./Page-32cf40c3.js";import"./createSvgIcon-bd1704b2.js";import"./Typography-68b384b6.js";import"./styled-82db80f4.js";import"./Delete-bbed9d1b.js";import"./Menu-14efc5a8.js";import"./useSlotProps-46c78ac0.js";import"./SaveAlt-22959695.js";import"./ArrowBack-6e29c51a.js";import"./Select-7661252d.js";import"./ConfirmCustomerDeletion-8a354d48.js";import"./common-7636977c.js";import"./Alert-b8124b93.js";import"./Grid-b631e025.js";import"./TextField-1e720d3c.js";import"./MenuItem-cecebb2e.js";import"./dividerClasses-1f28331c.js";import"./InputAdornment-b31e0d3b.js";import"./Toolbar-d0ba1ecd.js";import"./TabPanel-3bbdc03e.js";import"./KeyboardArrowRight-d32c6298.js";function L(){const n=d(),[a,s]=e.useState(!1),[p,u]=e.useState({}),[c,l]=e.useState({});e.useEffect(()=>{const{id:r}=n;f({id:r}),x()},[]);const f=({id:r})=>{s(!0);const o=new URL(`${m}/customers/${r}`);fetch(o).then(i=>i.json()).then(i=>{u(i)}).finally(()=>s(!1))},x=()=>{s(!0);const r=new URL(`${m}/products`);fetch(r).then(o=>o.json()).then(o=>{l(o)}).finally(()=>s(!1))};return t.jsx(j,{sx:{mt:4,mb:4},children:a&&t.jsx(h,{sx:{display:"flex",flexDirection:"column",alignItems:"center"},children:t.jsx(g,{})})||t.jsx(C,{customer:p,productsList:c,readOnly:!0})})}function W(){return t.jsx(P,{title:"Cliente",children:t.jsx(L,{})})}export{W as default};
