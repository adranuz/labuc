import{b as p,f as L,i as z,r as d,j as e}from"./index-0c29d899.js";import{f as D,g as A}from"./Delete-dad75097.js";import{d as _}from"./Search-c54aedb7.js";import{C as N}from"./ConfirmCustomerDeletion-edb5e55e.js";import{a as U}from"./api-ff746449.js";import{E as x}from"./styled-1354fb8a.js";import{b as C,P as W,T as G}from"./Typography-3ca4fb90.js";import{I as H}from"./Select-1f0e709b.js";import{B as b}from"./Box-c9cec713.js";import{T as M}from"./Toolbar-5d78288d.js";import{B as S,P as O}from"./Page-1a493442.js";import{L as V,T as J,a as K,b as Q,c as I,d as i,e as X}from"./TableRow-fc5bf907.js";import{S as k}from"./Stack-75599046.js";import{C as v}from"./Chip-e70051c9.js";import{T as Y}from"./TablePagination-a016ec4b.js";import{C as Z}from"./Container-18546780.js";import"./Backdrop-956e9521.js";import"./Menu-98bf16ef.js";import"./createSvgIcon-3d5d7fc7.js";import"./common-3c77f740.js";import"./Alert-4c46d2e6.js";import"./LoadingButton-047ce5b6.js";import"./KeyboardArrowRight-b37c2a27.js";import"./MenuItem-0b7c80ac.js";import"./dividerClasses-a1a459bd.js";const ee=x("div")(({theme:t})=>({position:"relative",borderRadius:t.shape.borderRadius,backgroundColor:C().palette.mode==="dark"?p(t.palette.common.white,.15):p(t.palette.common.black,.05),"&:hover":{backgroundColor:C().palette.mode==="dark"?p(t.palette.common.white,.25):p(t.palette.common.black,.15)},marginLeft:0,width:"100%",[t.breakpoints.up("sm")]:{marginLeft:t.spacing(1),width:"auto"}})),ae=x("div")(({theme:t})=>({padding:t.spacing(0,2),height:"100%",position:"absolute",pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center"})),re=x(H)(({theme:t})=>({color:"inherit","& .MuiInputBase-input":{padding:t.spacing(1,1,1,0),paddingLeft:`calc(1em + ${t.spacing(4)})`,transition:t.transitions.create("width"),width:"100%",[t.breakpoints.up("sm")]:{width:"12ch","&:focus":{width:"20ch"}}}}));function te(){var j;const t=L(),[c,g]=z(),[w,f]=d.useState(!1),[n,T]=d.useState({}),[o,m]=d.useState({perPage:parseInt(c.get("perPage")||"10"),page:parseInt(c.get("page")||"0"),q:c.get("q")||""});d.useEffect(()=>{l(o)},[]);const l=({perPage:a,page:s,q:r})=>{f(!0);const P=new URL(`${U}/customers`),F={perPage:String(a),page:String(s),q:r};P.search=new URLSearchParams(F).toString(),fetch(P).then(h=>h.json()).then(h=>{T(h)}).finally(()=>f(!1))},y=(a,s)=>{const r={...o,page:s};m(r),l(r),g({perPage:String(r.perPage),page:String(r.page),q:r.q})},R=a=>{const s=parseInt(a.target.value),r={...o,perPage:s,page:0};m(r),l(r),g({perPage:String(r.perPage),page:String(r.page),q:r.q})},B=a=>{const s=a.target.value,r={...o,q:s,page:0};m(r),l(r),g({perPage:String(r.perPage),page:String(r.page),q:r.q})},q=(a,s)=>{a.stopPropagation(),a.preventDefault(),t(`/admin/customers/${s}/edit`,{state:o})},$=()=>{t("/admin/customers/create")},u=a=>{t(`/admin/customers/${a}`,{state:o})},E=a=>a==="Activo"?"success":a==="Prospecto"?"info":a==="Pruebas"?"warning":a==="Suspendido"?"error":"info";return e.jsx(b,{sx:{width:"100%",position:"relative"},children:e.jsxs(W,{variant:"outlined",sx:{width:"100%",mb:2},children:[e.jsxs(M,{children:[e.jsx(G,{component:"h2",variant:"h5",noWrap:!0,color:"primary",sx:{flexGrow:1,display:{xs:"none",sm:"block"}},children:"Clientes"}),e.jsxs(b,{sx:{display:"flex",alignItems:"center",gap:2},children:[e.jsxs(ee,{children:[e.jsx(ae,{children:e.jsx(_,{})}),e.jsx(re,{placeholder:"Buscar…",type:"search",inputProps:{"aria-label":"search"},onChange:B,defaultValue:c.get("q")})]}),e.jsx(S,{size:"small",color:"primary",startIcon:e.jsx(D,{}),onClick:()=>$(),disabled:!0,children:"Agregar"})]})]}),w&&e.jsx(V,{sx:{position:"absolute",top:"0",left:0,right:0,borderRadius:4}}),e.jsx(J,{children:e.jsxs(K,{size:"small",children:[e.jsx(Q,{children:e.jsxs(I,{children:[e.jsx(i,{children:"ID"}),e.jsx(i,{children:"Nombre"}),e.jsx(i,{children:"Productos"}),e.jsx(i,{children:"Estatus"}),e.jsx(i,{align:"right",children:"Acciones"})]})}),e.jsx(X,{children:(j=n==null?void 0:n.data)==null?void 0:j.map(a=>{var s;return e.jsxs(I,{hover:!0,onClick:()=>u(a.id),sx:{cursor:"pointer"},children:[e.jsx(i,{children:a.customId}),e.jsx(i,{children:a.name}),e.jsx(i,{children:e.jsx(k,{direction:"row",spacing:1,children:(s=a.products)==null?void 0:s.map(r=>e.jsx(v,{label:r.name,variant:"outlined",size:"small",color:"primary",onClick:()=>u(a.id)},r.shortName))})}),e.jsx(i,{children:a.status&&e.jsx(v,{label:a.status,variant:"outlined",size:"small",color:E(a.status),onClick:()=>u(a.id)})}),e.jsx(i,{children:e.jsxs(k,{direction:"row",spacing:1,justifyContent:"flex-end",children:[e.jsx(S,{size:"small",color:"info",startIcon:e.jsx(A,{}),onClick:r=>q(r,a.id),children:"Editar"}),e.jsx(N,{id:a.id,name:a.name,onFinished:()=>l(o)})]})})]},a.id)})})]})}),e.jsx(Y,{rowsPerPageOptions:[5,10,25,100],component:"div",count:(n==null?void 0:n.total)||0,rowsPerPage:o.perPage,page:(n==null?void 0:n.page)||0,onPageChange:y,onRowsPerPageChange:R,labelRowsPerPage:"Filas por página:",labelDisplayedRows:({from:a,to:s,count:r})=>`${a}-${s} de ${r}`,showFirstButton:!0,showLastButton:!0,getItemAriaLabel:a=>a==="first"?"Ir a la primera página":a==="last"?"Ir a la última página":a==="next"?"Ir a la página siguiente":"Regresar a la pagina anterior"})]})})}function se(){return e.jsx(Z,{sx:{mt:4,mb:4},children:e.jsx(te,{})})}function Be(){return e.jsx(O,{title:"Clientes",children:e.jsx(se,{})})}export{Be as default};
