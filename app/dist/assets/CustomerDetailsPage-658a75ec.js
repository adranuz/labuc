import{k as g,r as s,j as t}from"./index-e6b00dba.js";import{C as j}from"./CustomerForm-0cda16f9.js";import{a}from"./api-ff746449.js";import{C as h}from"./Container-da7fa41d.js";import{B as P}from"./Box-4d443ccc.js";import{C as L}from"./LoadingButton-7fd84695.js";import{P as y}from"./Page-2b0df87c.js";import"./zod-4c3dfc28.js";import"./createSvgIcon-5b37f33e.js";import"./Typography-425bb86c.js";import"./styled-53ebf3b5.js";import"./ConfirmCustomerDeletion-e274aae7.js";import"./Delete-824e20ab.js";import"./Backdrop-23fe5f4c.js";import"./Menu-6e4d3cba.js";import"./common-c7f5b8b1.js";import"./Alert-ff5f309e.js";import"./SaveAlt-58f99f44.js";import"./ArrowBack-dc63cbab.js";import"./Select-5e794b8d.js";import"./Grid-53f8bb93.js";import"./CardContent-98e38034.js";import"./Stack-a9dc3a4e.js";import"./TextField-3853a7e5.js";import"./MenuItem-80ae3d3c.js";import"./dividerClasses-466e3cd9.js";import"./InputAdornment-8cf9561c.js";import"./Close-cf018037.js";import"./Tooltip-e17630af.js";import"./Toolbar-51529faa.js";import"./TabPanel-92d2a962.js";import"./KeyboardArrowRight-5d5a10e6.js";function w(){const n=g(),[p,i]=s.useState(!1),[u,m]=s.useState(!1),[c,l]=s.useState(void 0),[f,d]=s.useState({});s.useEffect(()=>{const{id:r}=n;x({id:r}),C()},[]);const x=({id:r})=>{i(!0);const o=new URL(`${a}/customers/${r}`);fetch(o).then(async e=>await e.json()).then(e=>{l(e)}).finally(()=>i(!1))},C=()=>{m(!0);const r=new URL(`${a}/products`);fetch(r).then(async o=>await o.json()).then(o=>{d(o)}).finally(()=>m(!1))};return t.jsx(h,{sx:{mt:4,mb:4},children:(p||u)&&t.jsx(P,{sx:{display:"flex",flexDirection:"column",alignItems:"center"},children:t.jsx(L,{})})||t.jsx(j,{customer:c,productsList:f,readOnly:!0})})}function ot(){return t.jsx(y,{title:"Cliente",children:t.jsx(w,{})})}export{ot as default};
