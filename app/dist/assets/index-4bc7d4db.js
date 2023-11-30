import{r as p,j as e,w as f,s as L,T as R,E as S,g as x,x as v,L as T}from"./index-64ee5db4.js";import{d as D,D as $,a as q,b as B,c as F}from"./Delete-5f4b6b52.js";import{d as A}from"./Search-e7363662.js";import{T as _}from"./Toolbar-85484bb9.js";import{u as z}from"./common-49ff51cc.js";import{A as E}from"./constants-2e6fc461.js";import{D as N,a as U,b as O}from"./DialogActions-38fadaca.js";import{A as W}from"./Alert-29c9fbb4.js";import{L as H}from"./LoadingButton-d1fcde35.js";import{u as I,P as M}from"./Paper-3ba8c3cc.js";import{I as V}from"./Select-eabe2e08.js";import{L as G}from"./LinearProgress-1962e334.js";import{T as J,a as K,b as Q,c as k,d as i,e as X}from"./TableRow-8cb96c2e.js";import{S as Y}from"./Stack-44fd4b01.js";import{T as Z}from"./TablePagination-99ffd7cc.js";import{C as ee}from"./Container-5ebdd271.js";import{P as ae}from"./Page-9b18e939.js";import"./createSvgIcon-9ace6ece.js";import"./ArrowBack-afe2bf24.js";import"./Toolbar-984ecaee.js";import"./Backdrop-83b371ec.js";import"./middleware-4ff88eea.js";import"./Menu-292a1a41.js";import"./KeyboardArrowRight-69b7f4ee.js";import"./MenuItem-99edd351.js";import"./dividerClasses-f4851a5f.js";function re({id:r,name:g,onFinished:j}){const[h,n]=p.useState(!1),[b,o]=p.useState(!1),c=z(d=>d.showSnackbar),l=()=>{n(!0)},m=()=>{n(!1)},P=()=>{w({id:r})},w=({id:d})=>{o(!0);const t=new URL(`${E}/roles/${d}`);fetch(t,{method:"DELETE"}).then(async s=>await s.json()).then(s=>{c("El rol se eliminó corretamente","success"),j()}).catch(s=>c("Error al intentar eliminar el rol","error")).finally(()=>{n(!1),o(!1)})};return e.jsxs(e.Fragment,{children:[e.jsx(f,{size:"small",color:"error",startIcon:e.jsx(D,{}),onClick:l,children:"Eliminar"}),e.jsxs(N,{fullWidth:!0,maxWidth:"sm",open:h,onClose:m,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[e.jsx($,{id:"alert-dialog-title",children:"Eliminar rol"}),e.jsxs(U,{children:[e.jsxs(q,{id:"alert-dialog-description",children:[e.jsx(W,{severity:"error",children:"Depués de eliminar un rol, este se borra de manera permanente. Esta acción no se puede deshacer."}),e.jsxs(L,{m:2,children:[e.jsx(R,{variant:"caption",children:"Nombre del rol"}),e.jsx(R,{mt:1,color:"black",children:g})]})]}),e.jsxs(O,{children:[e.jsx(f,{size:"small",onClick:m,children:"Cancelar"}),e.jsx(H,{loading:b,variant:"contained",color:"error",size:"small",loadingPosition:"start",disableElevation:!0,autoFocus:!0,onClick:P,children:"Eliminar"})]})]})]})]})}const te=S("div")(({theme:r})=>({position:"relative",borderRadius:r.shape.borderRadius,backgroundColor:I().palette.mode==="dark"?x(r.palette.common.white,.15):x(r.palette.common.black,.05),"&:hover":{backgroundColor:I().palette.mode==="dark"?x(r.palette.common.white,.25):x(r.palette.common.black,.15)},marginLeft:0,width:"100%",[r.breakpoints.up("sm")]:{marginLeft:r.spacing(1),width:"auto"}})),se=S("div")(({theme:r})=>({padding:r.spacing(0,2),height:"100%",position:"absolute",pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center"})),ne=S(V)(({theme:r})=>({color:"inherit","& .MuiInputBase-input":{padding:r.spacing(1,1,1,0),paddingLeft:`calc(1em + ${r.spacing(4)})`,transition:r.transitions.create("width"),width:"100%",[r.breakpoints.up("sm")]:{width:"12ch","&:focus":{width:"20ch"}}}}));function oe(){var d;const[r,g]=v(),[j,h]=p.useState(!1),[n,b]=p.useState({}),[o,c]=p.useState({perPage:parseInt(r.get("perPage")??"10"),page:parseInt(r.get("page")??"0"),q:r.get("q")??""});p.useEffect(()=>{l(o)},[]);const l=({perPage:t,page:s,q:a})=>{h(!0);const u=new URL(`${E}/roles`),y={perPage:String(t),page:String(s),q:a};u.search=new URLSearchParams(y).toString(),fetch(u).then(async C=>await C.json()).then(C=>{b(C)}).finally(()=>h(!1))},m=(t,s)=>{const a={...o,page:s};c(a),l(a),g({perPage:String(a.perPage),page:String(a.page),q:a.q})},P=t=>{const s=parseInt(t.target.value),a={...o,perPage:s,page:0};c(a),l(a),g({perPage:String(a.perPage),page:String(a.page),q:a.q})},w=t=>{const s=t.target.value,a={...o,q:s,page:0};c(a),l(a),g({perPage:String(a.perPage),page:String(a.page),q:a.q})};return e.jsx(L,{sx:{width:"100%",position:"relative"},children:e.jsxs(M,{variant:"outlined",sx:{width:"100%",mb:2},children:[e.jsxs(_,{title:"Roles",children:[e.jsxs(te,{children:[e.jsx(se,{children:e.jsx(A,{})}),e.jsx(ne,{placeholder:"Buscar…",type:"search",inputProps:{"aria-label":"search"},onChange:w,defaultValue:r.get("q")})]}),e.jsx(f,{size:"small",color:"primary",startIcon:e.jsx(B,{}),component:T,to:"/admin/roles/create",children:"Agregar"})]}),j&&e.jsx(G,{sx:{position:"absolute",top:"0",left:0,right:0,borderTopLeftRadius:4,borderTopRightRadius:4}}),e.jsx(J,{children:e.jsxs(K,{size:"small",children:[e.jsx(Q,{children:e.jsxs(k,{children:[e.jsx(i,{children:"Nombre"}),e.jsx(i,{align:"right",children:"No. de permisos"}),e.jsx(i,{align:"right",children:"No. de usuarios"}),e.jsx(i,{align:"right",children:"Acciones"})]})}),e.jsx(X,{children:(d=n==null?void 0:n.data)==null?void 0:d.map(({id:t,name:s,permissions:a,_count:u})=>e.jsxs(k,{children:[e.jsx(i,{sx:{textTransform:"capitalize"},children:s}),e.jsx(i,{align:"right",children:a==null?void 0:a.length}),e.jsx(i,{align:"right",children:u.users}),e.jsx(i,{children:e.jsxs(Y,{direction:"row",spacing:1,justifyContent:"flex-end",children:[e.jsx(f,{size:"small",color:"info",startIcon:e.jsx(F,{}),component:T,to:`/admin/roles/${t}/edit`,children:"Editar"}),e.jsx(re,{id:t,name:s,onFinished:()=>l(o)})]})})]},t))})]})}),e.jsx(Z,{rowsPerPageOptions:[5,10,25,100],component:"div",count:(n==null?void 0:n.total)??0,rowsPerPage:o.perPage,page:(n==null?void 0:n.page)??0,onPageChange:m,onRowsPerPageChange:P,labelRowsPerPage:"Filas por página:",labelDisplayedRows:({from:t,to:s,count:a})=>`${t}-${s} de ${a}`,showFirstButton:!0,showLastButton:!0,getItemAriaLabel:t=>t==="first"?"Ir a la primera página":t==="last"?"Ir a la última página":t==="next"?"Ir a la página siguiente":"Regresar a la pagina anterior"})]})})}function ie(){return e.jsx(ee,{sx:{mt:4,mb:4},children:e.jsx(oe,{})})}function qe(){return e.jsx(ae,{title:"Roles",children:e.jsx(ie,{})})}export{qe as default};
