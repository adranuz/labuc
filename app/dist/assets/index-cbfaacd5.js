import{r as g,j as e,b as f,f as D,i as $}from"./index-2dbb1652.js";import{d as q,D as F,a as z,b as A,c as _,e as N,f as O}from"./Delete-b74427b3.js";import{d as W,a as J}from"./Add-5498f444.js";import{u as G}from"./common-58346add.js";import{a as L}from"./api-ff746449.js";import{B as j,P as H}from"./Page-d6c42c0d.js";import{A as M}from"./Alert-7e485670.js";import{B as I}from"./Box-2b2c394b.js";import{T as v,b as E,P as V}from"./Typography-94b0b471.js";import{L as K}from"./LoadingButton-8732500b.js";import{E as T}from"./styled-4db7b868.js";import{I as Q}from"./Select-491dbed8.js";import{T as X}from"./Toolbar-cb95e5db.js";import{L as Y,T as Z,a as ee,b as ae,c as R,d as c,e as re}from"./TableRow-eb79be1e.js";import{S as U}from"./Stack-36365620.js";import{C as se}from"./Chip-6cafd6db.js";import{T as te}from"./TablePagination-1b4153af.js";import{C as ne}from"./Container-84fa18ed.js";import"./Backdrop-6c8621f1.js";import"./Menu-c2f3532a.js";import"./createSvgIcon-a0ec418b.js";import"./KeyboardArrowRight-4c518d3a.js";import"./MenuItem-eec1fee2.js";import"./dividerClasses-8f9b60d6.js";function ie({id:s,name:d,onFinished:m}){var x;const[b,p]=g.useState(!1),[n,u]=g.useState(!1),o=G(i=>i.showSnackbar),h=()=>{p(!0)},l=()=>{p(!1)},C=()=>{P({id:s})},P=({id:i})=>{u(!0);const a=new URL(`${L}/users/${i}`);fetch(a,{method:"DELETE"}).then(t=>t.json()).then(t=>{o("El usuario se eliminó corretamente","success"),m()}).catch(t=>o("Error al intentar eliminar el usuario","error")).finally(()=>{p(!1),u(!1)})},S=()=>{const i=localStorage.getItem("token");if(i)return w(i)},w=i=>JSON.parse(decodeURIComponent(escape(atob(i.split(".")[1]))));return e.jsxs(e.Fragment,{children:[e.jsx(j,{size:"small",color:"error",startIcon:e.jsx(q,{}),onClick:h,disabled:s===((x=S())==null?void 0:x.id),children:"Eliminar"}),e.jsxs(F,{fullWidth:!0,maxWidth:"sm",open:b,onClose:l,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[e.jsx(z,{id:"alert-dialog-title",children:"Eliminar usuario"}),e.jsxs(A,{children:[e.jsxs(_,{id:"alert-dialog-description",children:[e.jsx(M,{severity:"error",children:"Depués de eliminar un usuario, este se borra de manera permanente. Esta acción no se puede deshacer."}),e.jsxs(I,{m:2,children:[e.jsx(v,{variant:"caption",children:"Nombre del usuario"}),e.jsx(v,{mt:1,color:"black",children:d})]})]}),e.jsxs(N,{children:[e.jsx(j,{size:"small",onClick:l,children:"Cancelar"}),e.jsx(K,{loading:n,variant:"contained",color:"error",size:"small",disableElevation:!0,autoFocus:!0,onClick:C,children:"Eliminar"})]})]})]})]})}const oe=T("div")(({theme:s})=>({position:"relative",borderRadius:s.shape.borderRadius,backgroundColor:E().palette.mode==="dark"?f(s.palette.common.white,.15):f(s.palette.common.black,.05),"&:hover":{backgroundColor:E().palette.mode==="dark"?f(s.palette.common.white,.25):f(s.palette.common.black,.15)},marginLeft:0,width:"100%",[s.breakpoints.up("sm")]:{marginLeft:s.spacing(1),width:"auto"}})),le=T("div")(({theme:s})=>({padding:s.spacing(0,2),height:"100%",position:"absolute",pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center"})),ce=T(Q)(({theme:s})=>({color:"inherit","& .MuiInputBase-input":{padding:s.spacing(1,1,1,0),paddingLeft:`calc(1em + ${s.spacing(4)})`,transition:s.transitions.create("width"),width:"100%",[s.breakpoints.up("sm")]:{width:"12ch","&:focus":{width:"20ch"}}}}));function de(){var i;const s=D(),[d,m]=$(),[b,p]=g.useState(!1),[n,u]=g.useState({}),[o,h]=g.useState({perPage:parseInt(d.get("perPage")||"10"),page:parseInt(d.get("page")||"0"),q:d.get("q")||""});g.useEffect(()=>{l(o)},[]);const l=({perPage:a,page:t,q:r})=>{p(!0);const y=new URL(`${L}/users`),B={perPage:String(a),page:String(t),q:r};y.search=new URLSearchParams(B).toString(),fetch(y).then(k=>k.json()).then(k=>{u(k)}).finally(()=>p(!1))},C=(a,t)=>{const r={...o,page:t};h(r),l(r),m({perPage:String(r.perPage),page:String(r.page),q:r.q})},P=a=>{const t=parseInt(a.target.value),r={...o,perPage:t,page:0};h(r),l(r),m({perPage:String(r.perPage),page:String(r.page),q:r.q})},S=a=>{const t=a.target.value,r={...o,q:t,page:0};h(r),l(r),m({perPage:String(r.perPage),page:String(r.page),q:r.q})},w=a=>{s(`/admin/users/${a}/edit`)},x=()=>{s("/admin/users/create")};return e.jsx(I,{sx:{width:"100%",position:"relative"},children:e.jsxs(V,{variant:"outlined",sx:{width:"100%",mb:2},children:[e.jsxs(X,{children:[e.jsx(v,{variant:"h6",noWrap:!0,component:"div",color:"primary",sx:{flexGrow:1,display:{xs:"none",sm:"block"}},children:"Usuarios"}),e.jsxs(I,{sx:{display:"flex",alignItems:"center",gap:2},children:[e.jsxs(oe,{children:[e.jsx(le,{children:e.jsx(W,{})}),e.jsx(ce,{placeholder:"Buscar…",type:"search",inputProps:{"aria-label":"search"},onChange:S,defaultValue:d.get("q")})]}),e.jsx(j,{size:"small",color:"primary",startIcon:e.jsx(J,{}),onClick:()=>x(),children:"Agregar"})]})]}),b&&e.jsx(Y,{sx:{position:"absolute",top:"0",left:0,right:0,borderRadius:4}}),e.jsx(Z,{children:e.jsxs(ee,{size:"small",children:[e.jsx(ae,{children:e.jsxs(R,{children:[e.jsx(c,{children:"Nombre"}),e.jsx(c,{children:"Correo electrónico"}),e.jsx(c,{children:"Roles"}),e.jsx(c,{align:"right",children:"Acciones"})]})}),e.jsx(re,{children:(i=n==null?void 0:n.data)==null?void 0:i.map(a=>{var t;return e.jsxs(R,{children:[e.jsx(c,{children:a.name}),e.jsx(c,{children:a.email}),e.jsx(c,{children:e.jsx(U,{direction:"row",spacing:1,children:(t=a.roles)==null?void 0:t.map(r=>e.jsx(se,{label:r.name,variant:"outlined",size:"small",color:"primary",sx:{textTransform:"capitalize"}},r.name))})}),e.jsx(c,{children:e.jsxs(U,{direction:"row",spacing:1,justifyContent:"flex-end",children:[e.jsx(j,{size:"small",color:"info",startIcon:e.jsx(O,{}),onClick:()=>w(a.id),children:"Editar"}),e.jsx(ie,{id:a.id,name:a.name,onFinished:()=>l(o)})]})})]},a.id)})})]})}),e.jsx(te,{rowsPerPageOptions:[5,10,25,100],component:"div",count:(n==null?void 0:n.total)||0,rowsPerPage:o.perPage,page:(n==null?void 0:n.page)||0,onPageChange:C,onRowsPerPageChange:P,labelRowsPerPage:"Filas por página:",labelDisplayedRows:({from:a,to:t,count:r})=>`${a}-${t} de ${r}`,showFirstButton:!0,showLastButton:!0,getItemAriaLabel:a=>a==="first"?"Ir a la primera página":a==="last"?"Ir a la última página":a==="next"?"Ir a la página siguiente":"Regresar a la pagina anterior"})]})})}function pe(){return e.jsx(ne,{sx:{mt:4,mb:4},children:e.jsx(de,{})})}function qe(){return e.jsx(H,{title:"Usuarios",children:e.jsx(pe,{})})}export{qe as default};
