import{r as p,j as e,e as f,h as $,k as q}from"./index-9677fb1d.js";import{d as F}from"./Edit-df589310.js";import{d as _,D as z,a as A,b as N,c as U,e as W,f as O,g as G,T as H}from"./Delete-c7937caa.js";import{u as M}from"./common-702765eb.js";import{a as B}from"./api-8c80c0c6.js";import{B as j,P as V}from"./Page-7009a855.js";import{A as J}from"./Alert-808764c1.js";import{B as k}from"./Box-fdb4e9b4.js";import{T as R,c as E,P as K}from"./Typography-6afa1d35.js";import{L as Q}from"./LoadingButton-571f862e.js";import{E as I}from"./styled-74b42274.js";import{I as X}from"./Select-f2ad5919.js";import{T as Y}from"./Toolbar-fd339549.js";import{L as Z,T as ee,a as ae,b as se,c as y,d as l,e as re,S as L}from"./TableRow-1857ef83.js";import{C as te}from"./Container-5281b8e5.js";import"./createSvgIcon-ed689591.js";import"./Menu-c1c20287.js";import"./IconButton-9816c940.js";import"./MenuItem-22f563d2.js";import"./dividerClasses-62e16709.js";function ne({id:r,name:c,onFinished:g}){const[b,d]=p.useState(!1),[n,x]=p.useState(!1),i=M(m=>m.showSnackbar),h=()=>{d(!0)},o=()=>{d(!1)},P=()=>{C({id:r})},C=({id:m})=>{x(!0);const S=new URL(`${B}:3000/api/roles/${m}`);fetch(S,{method:"DELETE"}).then(u=>u.json()).then(u=>{i("El rol se eliminó corretamente","success"),g()}).catch(u=>i("Error al intentar eliminar el rol","error")).finally(()=>{d(!1),x(!1)})};return e.jsxs(e.Fragment,{children:[e.jsx(j,{size:"small",color:"error",startIcon:e.jsx(_,{}),onClick:h,children:"Eliminar"}),e.jsxs(z,{fullWidth:!0,maxWidth:"sm",open:b,onClose:o,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[e.jsx(A,{id:"alert-dialog-title",children:"Eliminar rol"}),e.jsxs(N,{children:[e.jsxs(U,{id:"alert-dialog-description",children:[e.jsx(J,{severity:"error",children:"Depués de eliminar un rol, este se borra de manera permanente. Esta acción no se puede deshacer."}),e.jsxs(k,{m:2,children:[e.jsx(R,{variant:"caption",children:"Nombre del rol"}),e.jsx(R,{mt:1,color:"black",children:c})]})]}),e.jsxs(W,{children:[e.jsx(j,{size:"small",onClick:o,children:"Cancelar"}),e.jsx(Q,{loading:n,variant:"contained",color:"error",size:"small",disableElevation:!0,autoFocus:!0,onClick:P,children:"Eliminar"})]})]})]})]})}const ie=I("div")(({theme:r})=>({position:"relative",borderRadius:r.shape.borderRadius,backgroundColor:E().palette.mode==="dark"?f(r.palette.common.white,.15):f(r.palette.common.black,.05),"&:hover":{backgroundColor:E().palette.mode==="dark"?f(r.palette.common.white,.25):f(r.palette.common.black,.15)},marginLeft:0,width:"100%",[r.breakpoints.up("sm")]:{marginLeft:r.spacing(1),width:"auto"}})),oe=I("div")(({theme:r})=>({padding:r.spacing(0,2),height:"100%",position:"absolute",pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center"})),le=I(X)(({theme:r})=>({color:"inherit","& .MuiInputBase-input":{padding:r.spacing(1,1,1,0),paddingLeft:`calc(1em + ${r.spacing(4)})`,transition:r.transitions.create("width"),width:"100%",[r.breakpoints.up("sm")]:{width:"12ch","&:focus":{width:"20ch"}}}}));function ce(){var T;const r=$(),[c,g]=q(),[b,d]=p.useState(!1),[n,x]=p.useState({}),[i,h]=p.useState({perPage:parseInt(c.get("perPage")||"10"),page:parseInt(c.get("page")||"0"),q:c.get("q")||""});p.useEffect(()=>{o(i)},[]);const o=({perPage:a,page:t,q:s})=>{d(!0);const v=new URL(`${B}:3000/api/roles`),D={perPage:String(a),page:String(t),q:s};v.search=new URLSearchParams(D).toString(),fetch(v).then(w=>w.json()).then(w=>{x(w)}).finally(()=>d(!1))},P=(a,t)=>{const s={...i,page:t};h(s),o(s),g({perPage:String(s.perPage),page:String(s.page),q:s.q})},C=a=>{const t=parseInt(a.target.value),s={...i,perPage:t,page:0};h(s),o(s),g({perPage:String(s.perPage),page:String(s.page),q:s.q})},m=a=>{const t=a.target.value,s={...i,q:t,page:0};h(s),o(s),g({perPage:String(s.perPage),page:String(s.page),q:s.q})},S=a=>{r(`/admin/roles/${a}/edit`)},u=()=>{r("/admin/roles/create")};return e.jsx(k,{sx:{width:"100%",position:"relative"},children:e.jsxs(K,{variant:"outlined",sx:{width:"100%",mb:2},children:[e.jsxs(Y,{children:[e.jsx(R,{variant:"h6",noWrap:!0,component:"div",color:"primary",sx:{flexGrow:1,display:{xs:"none",sm:"block"}},children:"Roles"}),e.jsxs(k,{sx:{display:"flex",alignItems:"center",gap:2},children:[e.jsxs(ie,{children:[e.jsx(oe,{children:e.jsx(O,{})}),e.jsx(le,{placeholder:"Buscar…",type:"search",inputProps:{"aria-label":"search"},onChange:m,defaultValue:c.get("q")})]}),e.jsx(j,{size:"small",color:"primary",startIcon:e.jsx(G,{}),onClick:()=>u(),children:"Agregar"})]})]}),b&&e.jsx(Z,{sx:{position:"absolute",top:"0",left:0,right:0,borderRadius:4}}),e.jsx(ee,{children:e.jsxs(ae,{size:"small",children:[e.jsx(se,{children:e.jsxs(y,{children:[e.jsx(l,{children:"Nombre"}),e.jsx(l,{children:"No. de permisos"}),e.jsx(l,{children:"No. de usuarios"}),e.jsx(l,{align:"right",children:"Acciones"})]})}),e.jsx(re,{children:(T=n==null?void 0:n.data)==null?void 0:T.map(a=>{var t;return e.jsxs(y,{children:[e.jsx(l,{sx:{textTransform:"capitalize"},children:a.name}),e.jsx(l,{children:e.jsx(L,{direction:"row",spacing:1,children:(t=a.permissions)==null?void 0:t.length})}),e.jsx(l,{children:a._count.users}),e.jsx(l,{children:e.jsxs(L,{direction:"row",spacing:1,justifyContent:"flex-end",children:[e.jsx(j,{size:"small",color:"info",startIcon:e.jsx(F,{}),onClick:()=>S(a.id),children:"Editar"}),e.jsx(ne,{id:a.id,name:a.name,onFinished:()=>o(i)})]})})]},a.id)})})]})}),e.jsx(H,{rowsPerPageOptions:[5,10,25,100],component:"div",count:(n==null?void 0:n.total)||0,rowsPerPage:i.perPage,page:(n==null?void 0:n.page)||0,onPageChange:P,onRowsPerPageChange:C,labelRowsPerPage:"Filas por página:",labelDisplayedRows:({from:a,to:t,count:s})=>`${a}-${t} de ${s}`,showFirstButton:!0,showLastButton:!0,getItemAriaLabel:a=>a==="first"?"Ir a la primera página":a==="last"?"Ir a la última página":a==="next"?"Ir a la página siguiente":"Regresar a la pagina anterior"})]})})}function de(){return e.jsx(te,{sx:{mt:4,mb:4},children:e.jsx(ce,{})})}function Le(){return e.jsx(V,{title:"Roles",children:e.jsx(de,{})})}export{Le as default};
