import{r as p,j as e,e as j,h as D,k as $}from"./index-34ad4850.js";import{d as q,D as F,a as z,b as _,c as A,e as W,f as N}from"./Delete-bf15f795.js";import{d as O,a as G,T as H}from"./Add-47463381.js";import{u as M}from"./common-06c0ba0d.js";import{L as V,a as U}from"./api-27aaaf1f.js";import{B as f,P as J}from"./Page-71ea8f73.js";import{A as K}from"./Alert-e5863f7c.js";import{B as k}from"./Box-75332173.js";import{T as v,c as E,P as Q}from"./Typography-9c675a68.js";import{E as I}from"./styled-db9bd02e.js";import{I as X}from"./Select-4e098193.js";import{T as Y}from"./Toolbar-8cf9848f.js";import{L as Z,T as ee,a as ae,b as se,c as R,d as l,e as re,S as L}from"./TableRow-c252149f.js";import{C as te}from"./Chip-57e8d9bb.js";import{C as ne}from"./Container-a49fcf75.js";import"./Menu-f695c361.js";import"./createSvgIcon-7a5c32e7.js";import"./IconButton-eaa1ff04.js";import"./MenuItem-65d60ca1.js";import"./dividerClasses-c6d35102.js";function ie({id:r,name:c,onFinished:g}){const[b,d]=p.useState(!1),[n,x]=p.useState(!1),i=M(h=>h.showSnackbar),m=()=>{d(!0)},o=()=>{d(!1)},P=()=>{C({id:r})},C=({id:h})=>{x(!0);const S=new URL(`${U}/users/${h}`);fetch(S,{method:"DELETE"}).then(u=>u.json()).then(u=>{i("El usuario se eliminó corretamente","success"),g()}).catch(u=>i("Error al intentar eliminar el usuario","error")).finally(()=>{d(!1),x(!1)})};return e.jsxs(e.Fragment,{children:[e.jsx(f,{size:"small",color:"error",startIcon:e.jsx(q,{}),onClick:m,children:"Eliminar"}),e.jsxs(F,{fullWidth:!0,maxWidth:"sm",open:b,onClose:o,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[e.jsx(z,{id:"alert-dialog-title",children:"Eliminar usuario"}),e.jsxs(_,{children:[e.jsxs(A,{id:"alert-dialog-description",children:[e.jsx(K,{severity:"error",children:"Depués de eliminar un usuario, este se borra de manera permanente. Esta acción no se puede deshacer."}),e.jsxs(k,{m:2,children:[e.jsx(v,{variant:"caption",children:"Nombre del usuario"}),e.jsx(v,{mt:1,color:"black",children:c})]})]}),e.jsxs(W,{children:[e.jsx(f,{size:"small",onClick:o,children:"Cancelar"}),e.jsx(V,{loading:n,variant:"contained",color:"error",size:"small",disableElevation:!0,autoFocus:!0,onClick:P,children:"Eliminar"})]})]})]})]})}const oe=I("div")(({theme:r})=>({position:"relative",borderRadius:r.shape.borderRadius,backgroundColor:E().palette.mode==="dark"?j(r.palette.common.white,.15):j(r.palette.common.black,.05),"&:hover":{backgroundColor:E().palette.mode==="dark"?j(r.palette.common.white,.25):j(r.palette.common.black,.15)},marginLeft:0,width:"100%",[r.breakpoints.up("sm")]:{marginLeft:r.spacing(1),width:"auto"}})),le=I("div")(({theme:r})=>({padding:r.spacing(0,2),height:"100%",position:"absolute",pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center"})),ce=I(X)(({theme:r})=>({color:"inherit","& .MuiInputBase-input":{padding:r.spacing(1,1,1,0),paddingLeft:`calc(1em + ${r.spacing(4)})`,transition:r.transitions.create("width"),width:"100%",[r.breakpoints.up("sm")]:{width:"12ch","&:focus":{width:"20ch"}}}}));function de(){var T;const r=D(),[c,g]=$(),[b,d]=p.useState(!1),[n,x]=p.useState({}),[i,m]=p.useState({perPage:parseInt(c.get("perPage")||"10"),page:parseInt(c.get("page")||"0"),q:c.get("q")||""});p.useEffect(()=>{o(i)},[]);const o=({perPage:s,page:t,q:a})=>{d(!0);const y=new URL(`${U}/users`),B={perPage:String(s),page:String(t),q:a};y.search=new URLSearchParams(B).toString(),fetch(y).then(w=>w.json()).then(w=>{x(w)}).finally(()=>d(!1))},P=(s,t)=>{const a={...i,page:t};m(a),o(a),g({perPage:String(a.perPage),page:String(a.page),q:a.q})},C=s=>{const t=parseInt(s.target.value),a={...i,perPage:t,page:0};m(a),o(a),g({perPage:String(a.perPage),page:String(a.page),q:a.q})},h=s=>{const t=s.target.value,a={...i,q:t,page:0};m(a),o(a),g({perPage:String(a.perPage),page:String(a.page),q:a.q})},S=s=>{r(`/admin/users/${s}/edit`)},u=()=>{r("/admin/users/create")};return e.jsx(k,{sx:{width:"100%",position:"relative"},children:e.jsxs(Q,{variant:"outlined",sx:{width:"100%",mb:2},children:[e.jsxs(Y,{children:[e.jsx(v,{variant:"h6",noWrap:!0,component:"div",color:"primary",sx:{flexGrow:1,display:{xs:"none",sm:"block"}},children:"Usuarios"}),e.jsxs(k,{sx:{display:"flex",alignItems:"center",gap:2},children:[e.jsxs(oe,{children:[e.jsx(le,{children:e.jsx(O,{})}),e.jsx(ce,{placeholder:"Buscar…",type:"search",inputProps:{"aria-label":"search"},onChange:h,defaultValue:c.get("q")})]}),e.jsx(f,{size:"small",color:"primary",startIcon:e.jsx(G,{}),onClick:()=>u(),children:"Agregar"})]})]}),b&&e.jsx(Z,{sx:{position:"absolute",top:"0",left:0,right:0,borderRadius:4}}),e.jsx(ee,{children:e.jsxs(ae,{size:"small",children:[e.jsx(se,{children:e.jsxs(R,{children:[e.jsx(l,{children:"Nombre"}),e.jsx(l,{children:"Correo electrónico"}),e.jsx(l,{children:"Roles"}),e.jsx(l,{align:"right",children:"Acciones"})]})}),e.jsx(re,{children:(T=n==null?void 0:n.data)==null?void 0:T.map(s=>{var t;return e.jsxs(R,{children:[e.jsx(l,{children:s.name}),e.jsx(l,{children:s.email}),e.jsx(l,{children:e.jsx(L,{direction:"row",spacing:1,children:(t=s.roles)==null?void 0:t.map(a=>e.jsx(te,{label:a.name,variant:"outlined",size:"small",color:"primary",sx:{textTransform:"capitalize"}},a.name))})}),e.jsx(l,{children:e.jsxs(L,{direction:"row",spacing:1,justifyContent:"flex-end",children:[e.jsx(f,{size:"small",color:"info",startIcon:e.jsx(N,{}),onClick:()=>S(s.id),children:"Editar"}),e.jsx(ie,{id:s.id,name:s.name,onFinished:()=>o(i)})]})})]},s.id)})})]})}),e.jsx(H,{rowsPerPageOptions:[5,10,25,100],component:"div",count:(n==null?void 0:n.total)||0,rowsPerPage:i.perPage,page:(n==null?void 0:n.page)||0,onPageChange:P,onRowsPerPageChange:C,labelRowsPerPage:"Filas por página:",labelDisplayedRows:({from:s,to:t,count:a})=>`${s}-${t} de ${a}`,showFirstButton:!0,showLastButton:!0,getItemAriaLabel:s=>s==="first"?"Ir a la primera página":s==="last"?"Ir a la última página":s==="next"?"Ir a la página siguiente":"Regresar a la pagina anterior"})]})})}function pe(){return e.jsx(ne,{sx:{mt:4,mb:4},children:e.jsx(de,{})})}function Ue(){return e.jsx(J,{title:"Usuarios",children:e.jsx(pe,{})})}export{Ue as default};
