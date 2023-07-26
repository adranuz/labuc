import{r as p,j as e,b as f,f as D,i as $}from"./index-b42bb106.js";import{d as q,D as F,a as _,b as z,c as A,e as N,f as U,g as W}from"./Delete-6bc3e474.js";import{d as O}from"./Search-f763a38f.js";import{u as G}from"./common-f20c29b3.js";import{a as L}from"./api-8c80c0c6.js";import{B as j,P as H}from"./Page-d4992afd.js";import{A as M}from"./Alert-5b357520.js";import{B as R}from"./Box-244d35cf.js";import{T as k,b as y,P as V}from"./Typography-97eb5159.js";import{L as J}from"./LoadingButton-81671c98.js";import{E as T}from"./styled-82e1a40e.js";import{I as K}from"./Select-b0379f96.js";import{T as Q}from"./Toolbar-d2130989.js";import{L as X,T as Y,a as Z,b as ee,c as E,d as l,e as ae}from"./TableRow-1b9ea06e.js";import{S as re}from"./Stack-ea032fd5.js";import{T as se}from"./TablePagination-8f236e51.js";import{C as te}from"./Container-39c7183f.js";import"./Backdrop-8d503ce4.js";import"./Menu-8b8cdc95.js";import"./createSvgIcon-d23abb9c.js";import"./KeyboardArrowRight-92e666a9.js";import"./MenuItem-d7a9b7ba.js";import"./dividerClasses-994ab282.js";function ne({id:s,name:c,onFinished:g}){const[b,d]=p.useState(!1),[n,x]=p.useState(!1),i=G(h=>h.showSnackbar),m=()=>{d(!0)},o=()=>{d(!1)},P=()=>{C({id:s})},C=({id:h})=>{x(!0);const S=new URL(`${L}/roles/${h}`);fetch(S,{method:"DELETE"}).then(u=>u.json()).then(u=>{i("El rol se eliminó corretamente","success"),g()}).catch(u=>i("Error al intentar eliminar el rol","error")).finally(()=>{d(!1),x(!1)})};return e.jsxs(e.Fragment,{children:[e.jsx(j,{size:"small",color:"error",startIcon:e.jsx(q,{}),onClick:m,children:"Eliminar"}),e.jsxs(F,{fullWidth:!0,maxWidth:"sm",open:b,onClose:o,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[e.jsx(_,{id:"alert-dialog-title",children:"Eliminar rol"}),e.jsxs(z,{children:[e.jsxs(A,{id:"alert-dialog-description",children:[e.jsx(M,{severity:"error",children:"Depués de eliminar un rol, este se borra de manera permanente. Esta acción no se puede deshacer."}),e.jsxs(R,{m:2,children:[e.jsx(k,{variant:"caption",children:"Nombre del rol"}),e.jsx(k,{mt:1,color:"black",children:c})]})]}),e.jsxs(N,{children:[e.jsx(j,{size:"small",onClick:o,children:"Cancelar"}),e.jsx(J,{loading:n,variant:"contained",color:"error",size:"small",loadingPosition:"start",disableElevation:!0,autoFocus:!0,onClick:P,children:"Eliminar"})]})]})]})]})}const ie=T("div")(({theme:s})=>({position:"relative",borderRadius:s.shape.borderRadius,backgroundColor:y().palette.mode==="dark"?f(s.palette.common.white,.15):f(s.palette.common.black,.05),"&:hover":{backgroundColor:y().palette.mode==="dark"?f(s.palette.common.white,.25):f(s.palette.common.black,.15)},marginLeft:0,width:"100%",[s.breakpoints.up("sm")]:{marginLeft:s.spacing(1),width:"auto"}})),oe=T("div")(({theme:s})=>({padding:s.spacing(0,2),height:"100%",position:"absolute",pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center"})),le=T(K)(({theme:s})=>({color:"inherit","& .MuiInputBase-input":{padding:s.spacing(1,1,1,0),paddingLeft:`calc(1em + ${s.spacing(4)})`,transition:s.transitions.create("width"),width:"100%",[s.breakpoints.up("sm")]:{width:"12ch","&:focus":{width:"20ch"}}}}));function ce(){var I;const s=D(),[c,g]=$(),[b,d]=p.useState(!1),[n,x]=p.useState({}),[i,m]=p.useState({perPage:parseInt(c.get("perPage")||"10"),page:parseInt(c.get("page")||"0"),q:c.get("q")||""});p.useEffect(()=>{o(i)},[]);const o=({perPage:a,page:t,q:r})=>{d(!0);const v=new URL(`${L}/roles`),B={perPage:String(a),page:String(t),q:r};v.search=new URLSearchParams(B).toString(),fetch(v).then(async w=>await w.json()).then(w=>{x(w)}).finally(()=>d(!1))},P=(a,t)=>{const r={...i,page:t};m(r),o(r),g({perPage:String(r.perPage),page:String(r.page),q:r.q})},C=a=>{const t=parseInt(a.target.value),r={...i,perPage:t,page:0};m(r),o(r),g({perPage:String(r.perPage),page:String(r.page),q:r.q})},h=a=>{const t=a.target.value,r={...i,q:t,page:0};m(r),o(r),g({perPage:String(r.perPage),page:String(r.page),q:r.q})},S=a=>{s(`/admin/roles/${a}/edit`)},u=()=>{s("/admin/roles/create")};return e.jsx(R,{sx:{width:"100%",position:"relative"},children:e.jsxs(V,{variant:"outlined",sx:{width:"100%",mb:2},children:[e.jsxs(Q,{children:[e.jsx(k,{component:"h2",variant:"h5",noWrap:!0,color:"primary",sx:{flexGrow:1,display:{xs:"none",sm:"block"}},children:"Roles"}),e.jsxs(R,{sx:{display:"flex",alignItems:"center",gap:2},children:[e.jsxs(ie,{children:[e.jsx(oe,{children:e.jsx(O,{})}),e.jsx(le,{placeholder:"Buscar…",type:"search",inputProps:{"aria-label":"search"},onChange:h,defaultValue:c.get("q")})]}),e.jsx(j,{size:"small",color:"primary",startIcon:e.jsx(U,{}),onClick:()=>u(),children:"Agregar"})]})]}),b&&e.jsx(X,{sx:{position:"absolute",top:"0",left:0,right:0,borderTopLeftRadius:4,borderTopRightRadius:4}}),e.jsx(Y,{children:e.jsxs(Z,{size:"small",children:[e.jsx(ee,{children:e.jsxs(E,{children:[e.jsx(l,{children:"Nombre"}),e.jsx(l,{align:"right",children:"No. de permisos"}),e.jsx(l,{align:"right",children:"No. de usuarios"}),e.jsx(l,{align:"right",children:"Acciones"})]})}),e.jsx(ae,{children:(I=n==null?void 0:n.data)==null?void 0:I.map(a=>{var t;return e.jsxs(E,{children:[e.jsx(l,{sx:{textTransform:"capitalize"},children:a.name}),e.jsx(l,{align:"right",children:(t=a.permissions)==null?void 0:t.length}),e.jsx(l,{align:"right",children:a._count.users}),e.jsx(l,{children:e.jsxs(re,{direction:"row",spacing:1,justifyContent:"flex-end",children:[e.jsx(j,{size:"small",color:"info",startIcon:e.jsx(W,{}),onClick:()=>S(a.id),children:"Editar"}),e.jsx(ne,{id:a.id,name:a.name,onFinished:()=>o(i)})]})})]},a.id)})})]})}),e.jsx(se,{rowsPerPageOptions:[5,10,25,100],component:"div",count:(n==null?void 0:n.total)||0,rowsPerPage:i.perPage,page:(n==null?void 0:n.page)||0,onPageChange:P,onRowsPerPageChange:C,labelRowsPerPage:"Filas por página:",labelDisplayedRows:({from:a,to:t,count:r})=>`${a}-${t} de ${r}`,showFirstButton:!0,showLastButton:!0,getItemAriaLabel:a=>a==="first"?"Ir a la primera página":a==="last"?"Ir a la última página":a==="next"?"Ir a la página siguiente":"Regresar a la pagina anterior"})]})})}function de(){return e.jsx(te,{sx:{mt:4,mb:4},children:e.jsx(ce,{})})}function $e(){return e.jsx(H,{title:"Roles",children:e.jsx(de,{})})}export{$e as default};
