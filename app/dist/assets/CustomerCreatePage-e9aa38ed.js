import{r as o,j as t,s as n}from"./index-32292c13.js";import{C as c}from"./CustomerForm-3620b264.js";import{A as u,C as l}from"./constants-a5768e35.js";import{C as f}from"./Container-430f5354.js";import{P as x}from"./Page-163afb69.js";import"./zod-c0bdc337.js";import"./createSvgIcon-abbd2357.js";import"./Paper-d19b285b.js";import"./ConfirmCustomerDeletion-d56f0a77.js";import"./Delete-298fa468.js";import"./DialogActions-c49c2bf1.js";import"./Backdrop-752351c6.js";import"./Menu-3217b6b0.js";import"./common-f0c17bc9.js";import"./middleware-4d18dae0.js";import"./Alert-c2f8e205.js";import"./LoadingButton-e0ccb8bc.js";import"./SaveAlt-2532f71d.js";import"./Select-1f7de27f.js";import"./ArrowBack-77e9619e.js";import"./Grid-003d548d.js";import"./CardContent-9b693bcc.js";import"./CardHeader-b4119aa6.js";import"./Stack-b443227d.js";import"./TextField-dc504966.js";import"./FormControl-1302c8b4.js";import"./MenuItem-416c8a5f.js";import"./dividerClasses-39a22909.js";import"./InputAdornment-ce6d5b02.js";import"./Close-22468df7.js";import"./Tooltip-64f1a3d2.js";import"./Popper-c4f5970e.js";import"./Toolbar-c06937fa.js";import"./KeyboardArrowRight-8567b424.js";function C(){const[s,i]=o.useState(!1),[e,m]=o.useState({});o.useEffect(()=>{p()},[]);const p=()=>{i(!0);const a=new URL(`${u}/products`);fetch(a).then(async r=>await r.json()).then(r=>{m(r)}).finally(()=>i(!1))};return t.jsx(f,{sx:{mt:4,mb:4},children:s&&t.jsx(n,{sx:{display:"flex",flexDirection:"column",alignItems:"center"},children:t.jsx(l,{})})||t.jsx(c,{productsList:e,newCustomer:!0})})}function W(){return t.jsx(x,{title:"Crear cliente",children:t.jsx(C,{})})}export{W as default};
