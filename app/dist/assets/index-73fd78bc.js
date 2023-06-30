import{r as g,j as e,e as f,h as z,k as A}from"./index-9677fb1d.js";import{d as _}from"./Edit-df589310.js";import{d as N,D as U,a as W,b as O,c as G,e as H,f as M,g as V,T as J}from"./Delete-c7937caa.js";import{u as K}from"./common-702765eb.js";import{a as $}from"./api-8c80c0c6.js";import{B as j,P as Q}from"./Page-7009a855.js";import{A as X}from"./Alert-808764c1.js";import{B as I}from"./Box-fdb4e9b4.js";import{T as w,c as D,P as Y}from"./Typography-6afa1d35.js";import{L as Z}from"./LoadingButton-571f862e.js";import{E}from"./styled-74b42274.js";import{I as ee}from"./Select-f2ad5919.js";import{T as ae}from"./Toolbar-fd339549.js";import{L as te,T as re,a as se,b as ne,c as L,d as l,e as ie,S as R}from"./TableRow-1857ef83.js";import{C as B}from"./Chip-9df3e0b8.js";import{C as oe}from"./Container-5281b8e5.js";import"./createSvgIcon-ed689591.js";import"./Menu-c1c20287.js";import"./IconButton-9816c940.js";import"./MenuItem-22f563d2.js";import"./dividerClasses-62e16709.js";function le({id:r,name:d,onFinished:m}){const[C,p]=g.useState(!1),[i,x]=g.useState(!1),o=K(s=>s.showSnackbar),u=s=>{s.stopPropagation(),s.preventDefault(),p(!0)},c=s=>{s.stopPropagation(),s.preventDefault(),p(!1)},b=s=>{s.stopPropagation(),s.preventDefault(),P({id:r})},P=({id:s})=>{x(!0);const S=new URL(`${$}/customers/${s}`);fetch(S,{method:"DELETE"}).then(h=>h.json()).then(h=>{o("El cliente se eliminó corretamente","success"),m()}).catch(h=>o("Error al intentar eliminar el cliente","error")).finally(()=>{p(!1),x(!1)})};return e.jsxs(e.Fragment,{children:[e.jsx(j,{size:"small",color:"error",startIcon:e.jsx(N,{}),onClick:s=>u(s),children:"Eliminar"}),e.jsxs(U,{fullWidth:!0,maxWidth:"sm",open:C,onClose:s=>c(s),"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[e.jsx(W,{id:"alert-dialog-title",children:"Eliminar cliente"}),e.jsxs(O,{children:[e.jsxs(G,{id:"alert-dialog-description",children:[e.jsx(X,{severity:"warning",color:"error",children:"Depués de eliminar un cliente, este se borra de manera permanente. Esta acción no se puede deshacer."}),e.jsxs(I,{m:2,children:[e.jsx(w,{variant:"caption",children:"Nombre del cliente"}),e.jsx(w,{mt:1,color:"black",children:d})]})]}),e.jsxs(H,{children:[e.jsx(j,{size:"small",onClick:c,children:"Cancelar"}),e.jsx(Z,{loading:i,variant:"contained",color:"error",size:"small",disableElevation:!0,autoFocus:!0,onClick:b,children:"Eliminar"})]})]})]})]})}const ce=E("div")(({theme:r})=>({position:"relative",borderRadius:r.shape.borderRadius,backgroundColor:D().palette.mode==="dark"?f(r.palette.common.white,.15):f(r.palette.common.black,.05),"&:hover":{backgroundColor:D().palette.mode==="dark"?f(r.palette.common.white,.25):f(r.palette.common.black,.15)},marginLeft:0,width:"100%",[r.breakpoints.up("sm")]:{marginLeft:r.spacing(1),width:"auto"}})),de=E("div")(({theme:r})=>({padding:r.spacing(0,2),height:"100%",position:"absolute",pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center"})),pe=E(ee)(({theme:r})=>({color:"inherit","& .MuiInputBase-input":{padding:r.spacing(1,1,1,0),paddingLeft:`calc(1em + ${r.spacing(4)})`,transition:r.transitions.create("width"),width:"100%",[r.breakpoints.up("sm")]:{width:"12ch","&:focus":{width:"20ch"}}}}));function ge(){var T;const r=z(),[d,m]=A(),[C,p]=g.useState(!1),[i,x]=g.useState({}),[o,u]=g.useState({perPage:parseInt(d.get("perPage")||"10"),page:parseInt(d.get("page")||"0"),q:d.get("q")||""});g.useEffect(()=>{c(o)},[]);const c=({perPage:a,page:n,q:t})=>{p(!0);const y=new URL(`${$}/customers`),F={perPage:String(a),page:String(n),q:t};y.search=new URLSearchParams(F).toString(),fetch(y).then(v=>v.json()).then(v=>{x(v)}).finally(()=>p(!1))},b=(a,n)=>{const t={...o,page:n};u(t),c(t),m({perPage:String(t.perPage),page:String(t.page),q:t.q})},P=a=>{const n=parseInt(a.target.value),t={...o,perPage:n,page:0};u(t),c(t),m({perPage:String(t.perPage),page:String(t.page),q:t.q})},s=a=>{const n=a.target.value,t={...o,q:n,page:0};u(t),c(t),m({perPage:String(t.perPage),page:String(t.page),q:t.q})},S=(a,n)=>{a.stopPropagation(),a.preventDefault(),r(`/admin/customers/${n}/edit`,{state:o})},h=()=>{r("/admin/customers/create")},k=a=>{r(`/admin/customers/${a}`,{state:o})},q=a=>a==="Activo"?"success":a==="Prospecto"?"info":a==="Pruebas"?"warning":a==="Suspendido"?"error":"info";return e.jsx(I,{sx:{width:"100%",position:"relative"},children:e.jsxs(Y,{variant:"outlined",sx:{width:"100%",mb:2},children:[e.jsxs(ae,{children:[e.jsx(w,{variant:"h6",noWrap:!0,component:"div",color:"primary",sx:{flexGrow:1,display:{xs:"none",sm:"block"}},children:"Clientes"}),e.jsxs(I,{sx:{display:"flex",alignItems:"center",gap:2},children:[e.jsxs(ce,{children:[e.jsx(de,{children:e.jsx(M,{})}),e.jsx(pe,{placeholder:"Buscar…",type:"search",inputProps:{"aria-label":"search"},onChange:s,defaultValue:d.get("q")})]}),e.jsx(j,{size:"small",color:"primary",startIcon:e.jsx(V,{}),onClick:()=>h(),children:"Agregar"})]})]}),C&&e.jsx(te,{sx:{position:"absolute",top:"0",left:0,right:0,borderRadius:4}}),e.jsx(re,{children:e.jsxs(se,{size:"small",children:[e.jsx(ne,{children:e.jsxs(L,{children:[e.jsx(l,{children:"ID"}),e.jsx(l,{children:"Nombre"}),e.jsx(l,{children:"Productos"}),e.jsx(l,{children:"Estatus"}),e.jsx(l,{align:"right",children:"Acciones"})]})}),e.jsx(ie,{children:(T=i==null?void 0:i.data)==null?void 0:T.map(a=>{var n;return e.jsxs(L,{hover:!0,onClick:()=>k(a.id),sx:{cursor:"pointer"},children:[e.jsx(l,{children:a.customId}),e.jsx(l,{children:a.name}),e.jsx(l,{children:e.jsx(R,{direction:"row",spacing:1,children:(n=a.products)==null?void 0:n.map(t=>e.jsx(B,{label:t.name,variant:"outlined",size:"small",color:"primary",onClick:()=>k(a.id)},t.shortName))})}),e.jsx(l,{children:a.status&&e.jsx(B,{label:a.status,variant:"outlined",size:"small",color:q(a.status),onClick:()=>k(a.id)})}),e.jsx(l,{children:e.jsxs(R,{direction:"row",spacing:1,justifyContent:"flex-end",children:[e.jsx(j,{size:"small",color:"info",startIcon:e.jsx(_,{}),onClick:t=>S(t,a.id),children:"Editar"}),e.jsx(le,{id:a.id,name:a.name,onFinished:()=>c(o)})]})})]},a.id)})})]})}),e.jsx(J,{rowsPerPageOptions:[5,10,25,100],component:"div",count:(i==null?void 0:i.total)||0,rowsPerPage:o.perPage,page:(i==null?void 0:i.page)||0,onPageChange:b,onRowsPerPageChange:P,labelRowsPerPage:"Filas por página:",labelDisplayedRows:({from:a,to:n,count:t})=>`${a}-${n} de ${t}`,showFirstButton:!0,showLastButton:!0,getItemAriaLabel:a=>a==="first"?"Ir a la primera página":a==="last"?"Ir a la última página":a==="next"?"Ir a la página siguiente":"Regresar a la pagina anterior"})]})})}function me(){return e.jsx(oe,{sx:{mt:4,mb:4},children:e.jsx(ge,{})})}function qe(){return e.jsx(Q,{title:"Clientes",children:e.jsx(me,{})})}export{qe as default};
