import{x as k,j as e,r as Y,A as B}from"./index-64ee5db4.js";import{T as W}from"./Toolbar-85484bb9.js";import{d as q}from"./Download-755992dc.js";import{l as N}from"./utils-ae6c9da2.js";import{u as O}from"./pac-d937917d.js";import{B as _}from"./BooleanIndicator-c8c56839.js";import{T as H,a as V,b as G,c as E,d as l,e as J}from"./TableRow-8cb96c2e.js";import{C as K}from"./Chip-2f6d8532.js";import{T as Q}from"./TablePagination-99ffd7cc.js";import{A as X}from"./constants-2e6fc461.js";import{C as Z}from"./Container-5ebdd271.js";import{P as ee}from"./Paper-3ba8c3cc.js";import{F as te,I as ae}from"./FormControl-24d1bd67.js";import{S as re}from"./Select-eabe2e08.js";import{M as A}from"./MenuItem-99edd351.js";import{L as oe}from"./LoadingButton-d1fcde35.js";import{L as se}from"./LinearProgress-1962e334.js";import{D as z}from"./DatePicker-f255bc1c.js";import{P as ne}from"./Page-9b18e939.js";import"./ArrowBack-afe2bf24.js";import"./createSvgIcon-9ace6ece.js";import"./Toolbar-984ecaee.js";import"./Backdrop-83b371ec.js";import"./middleware-4ff88eea.js";import"./Close-63b124a7.js";import"./Tooltip-3e7b931d.js";import"./Popper-91005be0.js";import"./KeyboardArrowRight-69b7f4ee.js";import"./Menu-292a1a41.js";import"./dividerClasses-f4851a5f.js";import"./Grid-6d55df83.js";import"./TextField-3b5635c4.js";import"./InputAdornment-50aee76d.js";import"./DialogActions-38fadaca.js";import"./listItemButtonClasses-845061d1.js";function ie({customerId:a,status:u,startDate:o,endDate:b}){var R;const[r,S]=k(),[j,P,D,d]=O(s=>[s.getScoreReportListFilters,s.setScoreReportListFilters,s.getScoreReportList,s.scoreReportList]),n=(s,c)=>{if(a===void 0)return;const p={...j,page:c};P(p),D(a,u,o,b),r.set("page",String(c)),S(r)},m=s=>{if(a===void 0)return;const c=parseInt(s.target.value),p={...j,perPage:c,page:0};P(p),D(a,u,o,b),r.set("perPage",String(c)),S(r)};return e.jsxs(e.Fragment,{children:[e.jsx(H,{children:e.jsxs(V,{size:"small",children:[e.jsx(G,{children:e.jsxs(E,{children:[e.jsx(l,{children:"No. de crédito"}),e.jsx(l,{children:"Referencia"}),e.jsx(l,{children:"No. Solicitud"}),e.jsx(l,{children:"Fecha"}),e.jsx(l,{children:"Estado"}),e.jsx(l,{align:"center",children:"Score"}),e.jsx(l,{align:"center",children:"Dispositivo validado previamente"}),e.jsx(l,{children:"ID de dispositivo"})]})}),e.jsx(J,{children:(R=d==null?void 0:d.data)==null?void 0:R.map(({status:s,creditId:c,previouslyValidatedDevice:p,reference:g,requestDate:h,requestId:M,score:w,deviceId:F})=>e.jsxs(E,{hover:!0,children:[e.jsx(l,{children:c}),e.jsx(l,{children:g}),e.jsx(l,{children:M}),e.jsx(l,{children:!!h&&N({date:h})}),e.jsx(l,{children:e.jsx(K,{label:s,variant:"outlined",size:"small",color:s==="Aceptado"?"success":"warning"})}),e.jsx(l,{align:"center",children:w}),e.jsx(l,{align:"center",children:e.jsx(_,{value:p==="Si"})}),e.jsx(l,{children:F})]},c))})]})}),e.jsx(Q,{rowsPerPageOptions:[5,10,25,100],component:"div",count:(d==null?void 0:d.total)??0,rowsPerPage:j.perPage,page:(d==null?void 0:d.page)??0,onPageChange:n,onRowsPerPageChange:m,labelRowsPerPage:"Filas por página:",labelDisplayedRows:({from:s,to:c,count:p})=>`${s}-${c} de ${p}`,showFirstButton:!0,showLastButton:!0,getItemAriaLabel:s=>s==="first"?"Ir a la primera página":s==="last"?"Ir a la última página":s==="next"?"Ir a la página siguiente":"Regresar a la pagina anterior"})]})}function le(){const[a,u]=k(),[o,b]=Y.useState(a.get("startDate")?B(a.get("startDate")):null),[r,S]=Y.useState(a.get("endDate")?B(a.get("endDate")):null),[j,P]=Y.useState(!1),[D,d]=Y.useState(!1),n=a.get("customerId")??void 0,[m,R]=Y.useState(a.get("status")??void 0),s=[{id:"accepted",name:"Aceptado"},{id:"notAccepted",name:"No aceptado"}],[c,p,g,h]=O(t=>[t.getScoreReportListFilters,t.setScoreReportListFilters,t.getScoreReportList,t.getScoreReportListLoading]),M=t=>{b(t),t!==null?a.set("startDate",t.format("YYYY-MM-DD")):a.delete("startDate"),a.set("page","0"),u(a);const i={...c,page:0};p(i),t&&r&&n&&g(n,m,t.format("YYYY-MM-DD"),r.format("YYYY-MM-DD")),t===null&&r==null&&n&&g(n,m)},w=t=>{S(t),t!==null?a.set("endDate",t.format("YYYY-MM-DD")):a.delete("endDate"),a.set("page","0"),u(a);const i={...c,page:0};p(i),o&&t&&n&&g(n,m,o.format("YYYY-MM-DD"),t.format("YYYY-MM-DD")),o===null&&t==null&&n&&g(n,m)},F=t=>{const i=t.target.value;R(i),console.log(i),a.set("status",i),a.set("page","0"),u(a);const f={...c,page:0};p(f),n&&g(n,i,o==null?void 0:o.format("YYYY-MM-DD"),r==null?void 0:r.format("YYYY-MM-DD"))},$=()=>{U(n,m,o==null?void 0:o.format("YYYY-MM-DD"),r==null?void 0:r.format("YYYY-MM-DD"))},U=(t,i,f,C)=>{d(!0);const L=new URL(`${X}/pac/customers/${t}/score/report/download`),T={};Object.assign(T,i&&{status:i},f&&C&&{startDate:f,endDate:C}),L.search=new URLSearchParams(T).toString();let v="";fetch(L).then(async x=>{const I=x.headers.get("Content-Disposition");return I&&(v=I.split(";")[1].split("=")[1].replaceAll('"',"")),await x.blob()}).then(x=>URL.createObjectURL(x)).then(x=>{Object.assign(document.createElement("a"),{href:x,download:v}).click()}).finally(()=>{d(!1)})},y=t=>t.isBefore(o);return Y.useEffect(()=>{if(n===void 0)return;const t=a.get("perPage"),i=a.get("page"),f=a.get("q");p({perPage:t!==null?parseInt(t):10,page:i!==null?parseInt(i):0,q:f?c.q:""}),console.log("setSearchParams"),console.log(a.values()),g(n,m,o==null?void 0:o.format("YYYY-MM-DD"),r==null?void 0:r.format("YYYY-MM-DD"))},[]),e.jsx(Z,{sx:{mt:4,mb:4},maxWidth:"xl",children:e.jsxs(ee,{variant:"outlined",sx:{width:"100%",mb:2,pt:1,position:"relative"},children:[e.jsxs(W,{title:"Reporte de score PAC",pathRouteForBackButton:`/tool/pac/score?customerId=${n}`,children:[e.jsx(z,{value:o,onChange:M,label:"Fecha de inicio",slotProps:{actionBar:{actions:["clear"]},textField:o===null&&r!==null?{size:"small",error:!0}:{size:"small"}},disableFuture:!0,sx:{maxWidth:180},disabled:h}),e.jsx(z,{value:r,open:j,onChange:w,onClose:()=>{P(!1)},onOpen:()=>{P(!0)},label:"Fecha de fin",slotProps:{actionBar:{actions:["clear"]},textField:o!==null&&r===null?{size:"small",error:!0}:{size:"small"}},disableFuture:!0,shouldDisableDate:y,sx:{maxWidth:180},disabled:h}),e.jsxs(te,{margin:"none",size:"small",sx:{minWidth:135},disabled:h,children:[e.jsx(ae,{children:"Estado"}),e.jsxs(re,{label:"Estado",onChange:F,defaultValue:m,children:[e.jsx(A,{value:"",children:e.jsx("em",{children:"Todos"})}),s==null?void 0:s.map(({id:t,name:i})=>e.jsx(A,{value:t,children:i},t))]})]}),e.jsx(oe,{size:"small",color:"primary",loadingPosition:"start",startIcon:e.jsx(q,{}),onClick:()=>$(),disabled:h||D,loading:D,children:"Descargar (.csv)"})]}),h&&e.jsx(se,{sx:{position:"absolute",top:"0",left:0,right:0,borderTopLeftRadius:4,borderTopRightRadius:4}}),e.jsx(ie,{customerId:n,status:m,startDate:o==null?void 0:o.format("YYYY-MM-DD"),endDate:r==null?void 0:r.format("YYYY-MM-DD")})]})})}function _e(){return e.jsx(ne,{title:"Reporte de score de crédito PAC",children:e.jsx(le,{})})}export{_e as default};
