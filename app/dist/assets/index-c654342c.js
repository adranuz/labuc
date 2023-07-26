import{b as p,f as _,i as F,r as g,j as e}from"./index-b42bb106.js";import{f as D,g as U}from"./Delete-6bc3e474.js";import{d as A}from"./Search-f763a38f.js";import{d as z,a as W,b as K}from"./LaptopWindows-4ca6bd33.js";import{d as N,C as O}from"./ConfirmCustomerDeletion-1a33986d.js";import{a as G}from"./api-8c80c0c6.js";import{E as f}from"./styled-82e1a40e.js";import{b as C,P as H,T as S}from"./Typography-97eb5159.js";import{I as M}from"./Select-b0379f96.js";import{B as v}from"./Box-244d35cf.js";import{T as V}from"./Toolbar-d2130989.js";import{B as w,P as J}from"./Page-d4992afd.js";import{L as Q,T as X,a as Y,b as Z,c as I,d as i,e as ee}from"./TableRow-1b9ea06e.js";import{S as j}from"./Stack-ea032fd5.js";import{T as m}from"./Tooltip-523a799b.js";import{T as ae}from"./TablePagination-8f236e51.js";import{C as se}from"./Container-39c7183f.js";import"./Backdrop-8d503ce4.js";import"./Menu-8b8cdc95.js";import"./createSvgIcon-d23abb9c.js";import"./common-f20c29b3.js";import"./Alert-5b357520.js";import"./LoadingButton-81671c98.js";import"./KeyboardArrowRight-92e666a9.js";import"./MenuItem-d7a9b7ba.js";import"./dividerClasses-994ab282.js";const te=f("div")(({theme:t})=>({position:"relative",borderRadius:t.shape.borderRadius,backgroundColor:C().palette.mode==="dark"?p(t.palette.common.white,.15):p(t.palette.common.black,.05),"&:hover":{backgroundColor:C().palette.mode==="dark"?p(t.palette.common.white,.25):p(t.palette.common.black,.15)},marginLeft:0,width:"100%",[t.breakpoints.up("sm")]:{marginLeft:t.spacing(1),width:"auto"}})),re=f("div")(({theme:t})=>({padding:t.spacing(0,2),height:"100%",position:"absolute",pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center"})),ie=f(M)(({theme:t})=>({color:"inherit","& .MuiInputBase-input":{padding:t.spacing(1,1,1,0),paddingLeft:`calc(1em + ${t.spacing(4)})`,transition:t.transitions.create("width"),width:"100%",[t.breakpoints.up("sm")]:{width:"12ch","&:focus":{width:"20ch"}}}}));function ne(){var P;const t=_(),[d,h]=F(),[T,b]=g.useState(!1),[o,k]=g.useState({}),[l,u]=g.useState({perPage:parseInt(d.get("perPage")||"10"),page:parseInt(d.get("page")||"0"),q:d.get("q")||""});g.useEffect(()=>{c(l)},[]);const c=({perPage:a,page:r,q:s})=>{b(!0);const n=new URL(`${G}/customers`),L={perPage:String(a),page:String(r),q:s};n.search=new URLSearchParams(L).toString(),fetch(n).then(async x=>await x.json()).then(x=>{k(x)}).finally(()=>b(!1))},y=(a,r)=>{const s={...l,page:r};u(s),c(s),h({perPage:String(s.perPage),page:String(s.page),q:s.q})},R=a=>{const r=parseInt(a.target.value),s={...l,perPage:r,page:0};u(s),c(s),h({perPage:String(s.perPage),page:String(s.page),q:s.q})},$=a=>{const r=a.target.value,s={...l,q:r,page:0};u(s),c(s),h({perPage:String(s.perPage),page:String(s.page),q:s.q})},B=(a,r)=>{a.stopPropagation(),a.preventDefault(),t(`/admin/customers/${r}/edit`,{state:l})},q=()=>{t("/admin/customers/create")},E=a=>{t(`/admin/customers/${a}`,{state:l})};return e.jsx(v,{sx:{width:"100%",position:"relative"},children:e.jsxs(H,{variant:"outlined",sx:{width:"100%",mb:2},children:[e.jsxs(V,{children:[e.jsx(S,{component:"h2",variant:"h5",noWrap:!0,color:"primary",sx:{flexGrow:1,display:{xs:"none",sm:"block"}},children:"Clientes"}),e.jsxs(v,{sx:{display:"flex",alignItems:"center",gap:2},children:[e.jsxs(te,{children:[e.jsx(re,{children:e.jsx(A,{})}),e.jsx(ie,{placeholder:"Buscar…",type:"search",inputProps:{"aria-label":"search"},onChange:$,defaultValue:d.get("q")})]}),e.jsx(w,{size:"small",color:"primary",startIcon:e.jsx(D,{}),onClick:()=>q(),disabled:!0,children:"Agregar"})]})]}),T&&e.jsx(Q,{sx:{position:"absolute",top:"0",left:0,right:0,borderTopLeftRadius:4,borderTopRightRadius:4}}),e.jsx(X,{children:e.jsxs(Y,{size:"small",children:[e.jsx(Z,{children:e.jsxs(I,{children:[e.jsx(i,{children:"ID"}),e.jsx(i,{children:"Nombre"}),e.jsx(i,{align:"center",children:"Productos"}),e.jsx(i,{align:"center",children:"Dispositivos"}),e.jsx(i,{align:"center",children:"SKU Start"}),e.jsx(i,{align:"center",children:"SKU End"}),e.jsx(i,{align:"right",children:"Acciones"})]})}),e.jsx(ee,{children:(P=o==null?void 0:o.data)==null?void 0:P.map(a=>{var r,s;return e.jsxs(I,{hover:!0,onClick:()=>E(a.id),sx:{cursor:"pointer"},children:[e.jsx(i,{children:a.customId}),e.jsx(i,{children:a.name}),e.jsx(i,{children:e.jsxs(j,{direction:"row",spacing:1,justifyContent:"center",children:[e.jsx(S,{children:(r=a.products)==null?void 0:r.length}),e.jsx(m,{title:((s=a.products)==null?void 0:s.length)===0?e.jsx("em",{children:"Sin productos"}):a.products.map(n=>e.jsxs("div",{children:[n.name,e.jsx("br",{})]})),arrow:!0,children:e.jsx(N,{color:"info"})})]})}),e.jsx(i,{children:e.jsxs(j,{direction:"row",spacing:.5,justifyContent:"center",children:[e.jsx(m,{title:"Android",children:e.jsx(z,{color:a.devices.find(n=>n==="android")?"primary":"disabled"})}),e.jsx(m,{title:"iOS",children:e.jsx(W,{color:a.devices.find(n=>n==="ios")?"primary":"disabled"})}),e.jsx(m,{title:"Windows",children:e.jsx(K,{color:a.devices.find(n=>n==="windows")?"primary":"disabled"})})]})}),e.jsx(i,{children:a.skuStart}),e.jsx(i,{children:a.skuEnd}),e.jsx(i,{children:e.jsxs(j,{direction:"row",spacing:1,justifyContent:"flex-end",children:[e.jsx(w,{size:"small",color:"info",startIcon:e.jsx(U,{}),onClick:n=>B(n,a.id),children:"Editar"}),e.jsx(O,{id:a.id,name:a.name,onFinished:()=>c(l)})]})})]},a.id)})})]})}),e.jsx(ae,{rowsPerPageOptions:[5,10,25,100],component:"div",count:(o==null?void 0:o.total)||0,rowsPerPage:l.perPage,page:(o==null?void 0:o.page)||0,onPageChange:y,onRowsPerPageChange:R,labelRowsPerPage:"Filas por página:",labelDisplayedRows:({from:a,to:r,count:s})=>`${a}-${r} de ${s}`,showFirstButton:!0,showLastButton:!0,getItemAriaLabel:a=>a==="first"?"Ir a la primera página":a==="last"?"Ir a la última página":a==="next"?"Ir a la página siguiente":"Regresar a la pagina anterior"})]})})}function oe(){return e.jsx(se,{sx:{mt:4,mb:4},children:e.jsx(ne,{})})}function Le(){return e.jsx(J,{title:"Clientes",children:e.jsx(oe,{})})}export{Le as default};
