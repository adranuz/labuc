import{j as i,E as w,z as F,T as R,q as E,r as y,A as L}from"./index-32292c13.js";import{r as _,i as N}from"./createSvgIcon-abbd2357.js";import{d as $}from"./Close-22468df7.js";import{T as Y}from"./TextField-dc504966.js";import{I as M}from"./InputAdornment-ce6d5b02.js";import{I as q,B as G}from"./Backdrop-752351c6.js";import{d as V}from"./Upload-06298009.js";import{u as Z}from"./common-f0c17bc9.js";import{C as O,A as U}from"./constants-a5768e35.js";import{T as W}from"./Toolbar-d70cb619.js";import{C as H}from"./Container-430f5354.js";import{L as K}from"./LoadingButton-e0ccb8bc.js";import{C as J,a as Q}from"./CardContent-9b693bcc.js";import{A as X}from"./Alert-c2f8e205.js";import{S as tt}from"./Stack-b443227d.js";import{D as et}from"./DatePicker-8a2cb260.js";import{P as rt}from"./Page-163afb69.js";import"./Paper-d19b285b.js";import"./FormControl-1302c8b4.js";import"./Select-1f7de27f.js";import"./Menu-3217b6b0.js";import"./middleware-4d18dae0.js";import"./ArrowBack-77e9619e.js";import"./Toolbar-c06937fa.js";import"./Grid-003d548d.js";import"./Popper-c4f5970e.js";import"./DialogActions-c49c2bf1.js";import"./listItemButtonClasses-08f4cb3c.js";import"./Chip-94effd15.js";var I={},it=N;Object.defineProperty(I,"__esModule",{value:!0});var T=I.default=void 0,nt=it(_()),ot=i,at=(0,nt.default)((0,ot.jsx)("path",{d:"M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"}),"AttachFile");T=I.default=at;const st=["B","kB","MB","GB","TB","PB","EB","ZB","YB"],lt=["B","kiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"],ut=["b","kbit","Mbit","Gbit","Tbit","Pbit","Ebit","Zbit","Ybit"],ct=["b","kibit","Mibit","Gibit","Tibit","Pibit","Eibit","Zibit","Yibit"],S=(e,t,r)=>{let n=e;return typeof t=="string"||Array.isArray(t)?n=e.toLocaleString(t,r):(t===!0||r!==void 0)&&(n=e.toLocaleString(void 0,r)),n};function k(e,t){if(!Number.isFinite(e))throw new TypeError(`Expected a finite number, got ${typeof e}: ${e}`);t={bits:!1,binary:!1,...t};const r=t.bits?t.binary?ct:ut:t.binary?lt:st;if(t.signed&&e===0)return` 0 ${r[0]}`;const n=e<0,u=n?"-":t.signed?"+":"";n&&(e=-e);let o;if(t.minimumFractionDigits!==void 0&&(o={minimumFractionDigits:t.minimumFractionDigits}),t.maximumFractionDigits!==void 0&&(o={maximumFractionDigits:t.maximumFractionDigits,...o}),e<1){const s=S(e,t.locale,o);return u+s+" "+r[0]}const p=Math.min(Math.floor(t.binary?Math.log(e)/Math.log(1024):Math.log10(e)/3),r.length-1);e/=(t.binary?1024:1e3)**p,o||(e=e.toPrecision(3));const d=S(Number(e),t.locale,o),m=r[p];return u+d+" "+m}const pt=w("label")`
  position: relative;

  input {
    opacity: 0 !important;
  }

  span {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 2;
    display: flex;
    align-items: center;
  }

  span.MuiFileInput-placeholder {
    color: gray;
  }
`,mt={Label:pt},dt=F.forwardRef((e,t)=>{const{text:r,isPlaceholder:n,placeholder:u,...o}=e,p=F.useId();return i.jsxs(mt.Label,{htmlFor:p,children:[i.jsx("input",{...o,ref:t,id:p}),r?i.jsx("span",{"aria-placeholder":u,className:n?"MuiFileInput-placeholder":"",children:r}):null]})});function ft(e){return e.length>0}function ht(e){return e.reduce((t,r)=>t+r.size,0)}function B(e){return typeof window<"u"&&e instanceof File}function gt(e){return Array.from(e)}function bt(e,t){if(e.length<t)return e;const r=Math.floor((t-1)/2);return`${e.slice(0,r)}…${e.slice(e.length-r)}`}function xt(e){var P;const{value:t,onChange:r,disabled:n,getInputText:u,getSizeText:o,placeholder:p,hideSizeText:d,inputProps:m,InputProps:s,multiple:h,className:v,...j}=e,g=F.useRef(null),b=h||(m==null?void 0:m.multiple)||((P=s==null?void 0:s.inputProps)==null?void 0:P.multiple)||!1,a=()=>{const c=g.current;c&&(c.value="")},A=c=>{const x=c.target.files,C=x?gt(x):[];a(),r==null||r(b?C:C[0])},f=c=>{c.preventDefault(),!n&&(r==null||r(h?[]:null))},l=Array.isArray(t)?ft(t):B(t),z=()=>{var c;if(t===null||Array.isArray(t)&&t.length===0)return p||"";if(typeof u=="function"&&t!==void 0)return u(t);if(t&&l){if(Array.isArray(t)&&t.length>1)return`${t.length} files`;const x=B(t)?t.name:((c=t[0])==null?void 0:c.name)||"";return bt(x,20)}return""},D=()=>{if(typeof o=="function"&&t!==void 0)return o(t);if(l){if(Array.isArray(t)){const c=ht(t);return k(c)}if(B(t))return k(t.size)}return""};return i.jsx(Y,{type:"file",disabled:n,onChange:A,className:`MuiFileInput-TextField ${v||""}`,InputProps:{startAdornment:i.jsx(M,{position:"start",children:i.jsx(T,{})}),endAdornment:i.jsxs(M,{position:"end",style:{visibility:l?"visible":"hidden"},children:[d?null:i.jsx(R,{variant:"caption",mr:"2px",className:"MuiFileInput-Typography-size-text",children:D()}),i.jsx(q,{"aria-label":"Clear",title:"Clear",size:"small",disabled:n,className:"MuiFileInput-IconButton",onClick:f,children:i.jsx($,{fontSize:"small"})})]}),...s,inputProps:{text:z(),multiple:b,isPlaceholder:t===null||Array.isArray(t)&&t.length===0,ref:g,placeholder:p,...m,...s==null?void 0:s.inputProps},inputComponent:dt},...j})}function yt(){const e=E(),t=Z(a=>a.showSnackbar),[r,n]=y.useState([]),[u,o]=y.useState(L()),[p,d]=y.useState(!1),[m,s]=y.useState(!1),h=a=>{d(!1),n(a)},v=a=>{d(!1),o(a)},j=()=>{Array.isArray(r)&&r.length>0&&g(r)},g=a=>{if(u===null)return;s(!0),d(!1);const A=new URL(`${U}/blocking/reports`),f=new FormData;f.append("reportedAt",u.format("YYYY-MM-DD"));for(const l of a)f.append("files",l,l.name);fetch(A,{method:"POST",body:f}).then(async l=>{if(!l.ok){d(!0);return}return await l.json()}).then(l=>{b(l.id),t("La importación se completó correctamente","success")}).catch(l=>d(!0)).finally(()=>s(!1))},b=a=>{e({pathname:"/tool/blocking/reports",search:`?selected=${a}`})};return i.jsxs(H,{sx:{mt:4,mb:4},children:[i.jsx(W,{title:"Importar Reporte",pathRouteForBackButton:"/tool/blocking/reports",disableGutters:!0,children:i.jsx(K,{loading:m,variant:"contained",loadingPosition:"start",size:"small",disableElevation:!0,startIcon:i.jsx(V,{}),onClick:j,children:"Importar"})}),i.jsx(J,{variant:"outlined",children:i.jsxs(Q,{children:[p&&i.jsx(X,{severity:"error",sx:{marginBottom:1},children:"La importación falló. Intentelo nuevamente."}),i.jsxs(tt,{direction:"column",children:[i.jsx(et,{value:u,label:"Fecha del reporte",slotProps:{textField:{margin:"normal",required:!0,size:"small"}},disableFuture:!0,onChange:v,sx:{maxWidth:320}}),i.jsx(xt,{label:"Archivos (.csv)",size:"small",margin:"normal",required:!0,fullWidth:!0,multiple:!0,value:r,onChange:h,inputProps:{accept:".csv"},disabled:m,sx:{maxWidth:320}})]})]})}),i.jsx(G,{sx:{color:"#fff",zIndex:a=>a.zIndex.drawer+1},open:m,children:i.jsx(O,{color:"inherit"})})]})}function Ht(){return i.jsx(rt,{title:"Importar reporte",children:i.jsx(yt,{})})}export{Ht as default};
