import{_ as h,r as x,u as X,a as D,j as a,c as Y,b as ce,f as ue,h as xe,i as fe}from"./index-c55a0fba.js";import{r as y,i as E}from"./createSvgIcon-bd1704b2.js";import{f as he}from"./Delete-bbed9d1b.js";import{C as U,d as me}from"./SaveAlt-22959695.js";import{S as pe,F as $,d as je}from"./ArrowBack-6e29c51a.js";import{C as ve}from"./ConfirmCustomerDeletion-8a354d48.js";import{G as i}from"./Grid-b631e025.js";import{T as t,F as g,I as T,a as M}from"./TextField-1e720d3c.js";import{u as be,f as ge,S as N}from"./Select-7661252d.js";import{M as u}from"./MenuItem-cecebb2e.js";import{I as Ce}from"./InputAdornment-b31e0d3b.js";import{g as O,E as I,c as ee,a as ae,r as Re}from"./styled-82db80f4.js";import{g as ne,c as le,i as ze,j as Se,u as Pe,k as Ie,T as $e,P as Me}from"./Typography-68b384b6.js";import{C as ke}from"./Container-32e80ff4.js";import{B as _}from"./Box-c2177a00.js";import{T as _e}from"./Toolbar-d0ba1ecd.js";import{I as Fe}from"./Menu-14efc5a8.js";import{B as Ve}from"./Page-32cf40c3.js";import{L as Be}from"./LoadingButton-a5da5fcf.js";import{T as Ge,a as we,b as F,c as V}from"./TabPanel-3bbdc03e.js";function We(e){return O("MuiFormGroup",e)}ne("MuiFormGroup",["root","row","error"]);const Te=["className","row"],Ne=e=>{const{classes:n,row:l,error:r}=e;return ae({root:["root",l&&"row",r&&"error"]},We,n)},De=I("div",{name:"MuiFormGroup",slot:"Root",overridesResolver:(e,n)=>{const{ownerState:l}=e;return[n.root,l.row&&n.row]}})(({ownerState:e})=>h({display:"flex",flexDirection:"column",flexWrap:"wrap"},e.row&&{flexDirection:"row"})),ye=x.forwardRef(function(n,l){const r=X({props:n,name:"MuiFormGroup"}),{className:s,row:d=!1}=r,v=D(r,Te),c=be(),b=ge({props:r,muiFormControl:c,states:["error"]}),p=h({},r,{row:d,error:b.error}),m=Ne(p);return a.jsx(De,h({className:ee(m.root,s),ownerState:p,ref:l},v))}),Ee=ye,He=le(a.jsx("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),"RadioButtonUnchecked"),Ae=le(a.jsx("path",{d:"M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"}),"RadioButtonChecked"),qe=I("span")({position:"relative",display:"flex"}),Ue=I(He)({transform:"scale(1)"}),Le=I(Ae)(({theme:e,ownerState:n})=>h({left:0,position:"absolute",transform:"scale(0)",transition:e.transitions.create("transform",{easing:e.transitions.easing.easeIn,duration:e.transitions.duration.shortest})},n.checked&&{transform:"scale(1)",transition:e.transitions.create("transform",{easing:e.transitions.easing.easeOut,duration:e.transitions.duration.shortest})}));function ie(e){const{checked:n=!1,classes:l={},fontSize:r}=e,s=h({},e,{checked:n});return a.jsxs(qe,{className:l.root,ownerState:s,children:[a.jsx(Ue,{fontSize:r,className:l.background,ownerState:s}),a.jsx(Le,{fontSize:r,className:l.dot,ownerState:s})]})}const Ze=x.createContext(void 0),se=Ze;function Je(){return x.useContext(se)}function Ke(e){return O("MuiRadio",e)}const Qe=ne("MuiRadio",["root","checked","disabled","colorPrimary","colorSecondary"]),L=Qe,Xe=["checked","checkedIcon","color","icon","name","onChange","size","className"],Ye=e=>{const{classes:n,color:l}=e,r={root:["root",`color${Y(l)}`]};return h({},n,ae(r,Ke,n))},Oe=I(pe,{shouldForwardProp:e=>Re(e)||e==="classes",name:"MuiRadio",slot:"Root",overridesResolver:(e,n)=>{const{ownerState:l}=e;return[n.root,n[`color${Y(l.color)}`]]}})(({theme:e,ownerState:n})=>h({color:(e.vars||e).palette.text.secondary},!n.disableRipple&&{"&:hover":{backgroundColor:e.vars?`rgba(${n.color==="default"?e.vars.palette.action.activeChannel:e.vars.palette[n.color].mainChannel} / ${e.vars.palette.action.hoverOpacity})`:ce(n.color==="default"?e.palette.action.active:e.palette[n.color].main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},n.color!=="default"&&{[`&.${L.checked}`]:{color:(e.vars||e).palette[n.color].main}},{[`&.${L.disabled}`]:{color:(e.vars||e).palette.action.disabled}}));function ea(e,n){return typeof n=="object"&&n!==null?e===n:String(e)===String(n)}const Z=a.jsx(ie,{checked:!0}),J=a.jsx(ie,{}),aa=x.forwardRef(function(n,l){var r,s;const d=X({props:n,name:"MuiRadio"}),{checked:v,checkedIcon:c=Z,color:b="primary",icon:p=J,name:m,onChange:C,size:j="medium",className:S}=d,R=D(d,Xe),z=h({},d,{color:b,size:j}),o=Ye(z),f=Je();let P=v;const de=ze(C,f&&f.onChange);let k=m;return f&&(typeof P>"u"&&(P=ea(f.value,d.value)),typeof k>"u"&&(k=f.name)),a.jsx(Oe,h({type:"radio",icon:x.cloneElement(p,{fontSize:(r=J.props.fontSize)!=null?r:j}),checkedIcon:x.cloneElement(c,{fontSize:(s=Z.props.fontSize)!=null?s:j}),ownerState:z,classes:o,name:k,checked:P,onChange:de,ref:l,className:ee(o.root,S)},R))}),K=aa,na=["actions","children","defaultValue","name","onChange","value"],la=x.forwardRef(function(n,l){const{actions:r,children:s,defaultValue:d,name:v,onChange:c,value:b}=n,p=D(n,na),m=x.useRef(null),[C,j]=Se({controlled:b,default:d,name:"RadioGroup"});x.useImperativeHandle(r,()=>({focus:()=>{let o=m.current.querySelector("input:not(:disabled):checked");o||(o=m.current.querySelector("input:not(:disabled)")),o&&o.focus()}}),[]);const S=Pe(l,m),R=Ie(v),z=x.useMemo(()=>({name:R,onChange(o){j(o.target.value),c&&c(o,o.target.value)},value:C}),[R,c,j,C]);return a.jsx(se.Provider,{value:z,children:a.jsx(Ee,h({role:"radiogroup",ref:S},p,{children:s}))})}),Q=la;var H={},ia=E;Object.defineProperty(H,"__esModule",{value:!0});var re=H.default=void 0,sa=ia(y()),B=a,ra=(0,sa.default)([(0,B.jsx)("path",{d:"m12 2-5.5 9h11z"},"0"),(0,B.jsx)("circle",{cx:"17.5",cy:"17.5",r:"4.5"},"1"),(0,B.jsx)("path",{d:"M3 13.5h8v8H3z"},"2")],"Category");re=H.default=ra;var A={},oa=E;Object.defineProperty(A,"__esModule",{value:!0});var oe=A.default=void 0,ta=oa(y()),da=a,ca=(0,ta.default)((0,da.jsx)("path",{d:"M20 0H4v2h16V0zM4 24h16v-2H4v2zM20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 2.75c1.24 0 2.25 1.01 2.25 2.25s-1.01 2.25-2.25 2.25S9.75 10.24 9.75 9 10.76 6.75 12 6.75zM17 17H7v-1.5c0-1.67 3.33-2.5 5-2.5s5 .83 5 2.5V17z"}),"Contacts");oe=A.default=ca;var q={},ua=E;Object.defineProperty(q,"__esModule",{value:!0});var te=q.default=void 0,xa=ua(y()),fa=a,ha=(0,xa.default)((0,fa.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"}),"Info");te=q.default=ha;function ma({customer:e,readOnly:n}){var l;return a.jsxs(a.Fragment,{children:[a.jsxs(i,{container:!0,spacing:3,children:[a.jsx(i,{item:!0,xs:12,md:4,children:a.jsx(t,{margin:"normal",fullWidth:!0,size:"small",label:"ID",defaultValue:e==null?void 0:e.customId,disabled:n})}),a.jsx(i,{item:!0,xs:12,md:4,children:a.jsx(t,{margin:"normal",fullWidth:!0,size:"small",label:"Nombre",defaultValue:e==null?void 0:e.name,disabled:n})}),a.jsx(i,{item:!0,xs:12,md:4,children:a.jsx(t,{margin:"normal",fullWidth:!0,size:"small",label:"Correo electrónico",type:"email",defaultValue:e==null?void 0:e.email,disabled:n})})]}),a.jsxs(i,{container:!0,spacing:3,children:[a.jsx(i,{item:!0,xs:12,md:4,children:a.jsx(t,{margin:"normal",fullWidth:!0,size:"small",label:"País",defaultValue:e==null?void 0:e.country,disabled:n})}),a.jsx(i,{item:!0,xs:12,md:4,children:n&&a.jsx(t,{margin:"normal",fullWidth:!0,size:"small",label:"Giro",defaultValue:e==null?void 0:e.economicActivity,disabled:n})||a.jsxs(g,{margin:"normal",fullWidth:!0,size:"small",children:[a.jsx(T,{children:"Giro"}),a.jsxs(N,{label:"Giro",defaultValue:e==null?void 0:e.economicActivity,children:[a.jsx(u,{value:"",children:a.jsx("em",{children:"Ninguno"})}),a.jsx(u,{value:"Distribuidor",children:"Distribuidor"}),a.jsx(u,{value:"Fintech",children:"Fintech"}),a.jsx(u,{value:"Operador / Distribuidor",children:"Operador / Distribuidor"})]})]})}),a.jsx(i,{item:!0,xs:12,md:4,children:n&&a.jsx(t,{margin:"normal",fullWidth:!0,size:"small",label:"Estatus",defaultValue:e==null?void 0:e.status,disabled:n})||a.jsxs(g,{margin:"normal",fullWidth:!0,size:"small",children:[a.jsx(T,{children:"Estatus"}),a.jsxs(N,{label:"Estatus",defaultValue:e==null?void 0:e.status,children:[a.jsx(u,{value:"",children:a.jsx("em",{children:"Ninguno"})}),a.jsx(u,{value:"Activo",children:"Activo"}),a.jsx(u,{value:"Prospecto",children:"Prospecto"}),a.jsx(u,{value:"Pruebas",children:"Pruebas"}),a.jsx(u,{value:"Suspendido",children:"Suspendido"})]})]})})]}),a.jsxs(i,{container:!0,spacing:3,children:[a.jsx(i,{item:!0,xs:12,md:4,children:a.jsx(t,{margin:"normal",fullWidth:!0,size:"small",label:"RFC",defaultValue:e==null?void 0:e.rfc,disabled:n})}),a.jsx(i,{item:!0,xs:12,md:4,children:a.jsx(t,{margin:"normal",fullWidth:!0,size:"small",label:"Razón social",defaultValue:e==null?void 0:e.registeredName,disabled:n})}),a.jsx(i,{item:!0,xs:12,md:4,children:a.jsx(t,{margin:"normal",fullWidth:!0,size:"small",label:"Domicilio fiscal",defaultValue:e==null?void 0:e.address,disabled:n})})]}),a.jsxs(i,{container:!0,spacing:3,children:[a.jsx(i,{item:!0,xs:12,md:4,children:a.jsx(t,{margin:"normal",fullWidth:!0,size:"small",label:"Nombre del vendedor",defaultValue:e==null?void 0:e.sellerName,disabled:n})}),a.jsx(i,{item:!0,xs:12,md:4,children:a.jsx(t,{margin:"normal",fullWidth:!0,size:"small",label:"Vigencia de comisión",type:"date",InputLabelProps:{shrink:!0},defaultValue:(l=e==null?void 0:e.comissionTerm)==null?void 0:l.slice(0,10),disabled:n})}),a.jsx(i,{item:!0,xs:12,md:4,children:a.jsx(t,{margin:"normal",fullWidth:!0,size:"small",label:"Porcentaje de comisión",type:"number",InputProps:{inputProps:{disabled:n,step:1,min:0},endAdornment:a.jsx(Ce,{position:"end",children:"%"})},defaultValue:(e==null?void 0:e.percentageComissions)||0,disabled:n})})]}),a.jsx(i,{container:!0,spacing:3,children:a.jsx(i,{item:!0,xs:12,md:4,children:a.jsx(t,{margin:"normal",fullWidth:!0,size:"small",label:"Comentarios del vendedor",defaultValue:e==null?void 0:e.sellerComments,disabled:n})})})]})}function pa({contacts:e,readOnly:n}){return a.jsx(a.Fragment,{children:e==null?void 0:e.map(l=>a.jsxs(i,{container:!0,spacing:3,children:[a.jsx(i,{item:!0,xs:12,md:2,children:n&&a.jsx(t,{margin:"normal",fullWidth:!0,size:"small",label:"Tipo",defaultValue:(l==null?void 0:l.type)==="com"?"Comercial":"Tecnología",disabled:n})||a.jsxs(g,{margin:"normal",fullWidth:!0,size:"small",children:[a.jsx(T,{children:"Tipo"}),a.jsxs(N,{label:"Tipo",defaultValue:l==null?void 0:l.type,children:[a.jsx(u,{value:"com",children:"Comercial"}),a.jsx(u,{value:"tec",children:"Tecnología"})]})]})}),a.jsx(i,{item:!0,xs:12,md:5,children:a.jsx(t,{margin:"normal",fullWidth:!0,size:"small",label:"Nombre",defaultValue:l==null?void 0:l.name,disabled:n})}),a.jsx(i,{item:!0,xs:12,md:5,children:a.jsx(t,{margin:"normal",fullWidth:!0,size:"small",label:"Correo electrónico",defaultValue:l==null?void 0:l.email,disabled:n})})]}))})}const G=[{name:"Android"},{name:"iOS"},{name:"Windows"}],w=[{name:"HBM3M"},{name:"HBM3A"},{name:"HBM1A"},{name:"HBMF "},{name:"HBMPRE"}],W=[{name:"HBM3M"},{name:"HBM3A"},{name:"HBM1A"},{name:"HBMF "},{name:"HBMPRE"}];function ja({productsList:e,products:n,readOnly:l}){var r;return a.jsxs(i,{container:!0,spacing:1,children:[a.jsx(i,{item:!0,xs:12,md:6,lg:3,children:a.jsxs(g,{variant:"standard",children:[a.jsx(M,{children:"Productos General"}),(r=e==null?void 0:e.data)==null?void 0:r.map(s=>a.jsx($,{control:a.jsx(U,{size:"small",color:"secondary",defaultChecked:!!(n!=null&&n.find(d=>d.shortName===s.shortName)),disabled:l}),label:s.name}))]})}),a.jsx(i,{item:!0,xs:12,md:6,lg:3,children:a.jsxs(g,{variant:"standard",children:[a.jsx(M,{children:"Dispositivos"}),G==null?void 0:G.map(s=>a.jsx($,{control:a.jsx(U,{size:"small",color:"secondary",defaultChecked:!1,disabled:l}),label:s.name}))]})}),a.jsx(i,{item:!0,xs:12,md:6,lg:3,children:a.jsxs(g,{variant:"standard",children:[a.jsx(M,{children:"Dispositivos Start"}),a.jsx(Q,{children:w==null?void 0:w.map(s=>a.jsx($,{value:s.name,control:a.jsx(K,{size:"small",color:"secondary",disabled:l}),label:s.name}))})]})}),a.jsx(i,{item:!0,xs:12,md:6,lg:3,children:a.jsxs(g,{variant:"standard",children:[a.jsx(M,{children:"Dispositivos End"}),a.jsx(Q,{children:W==null?void 0:W.map(s=>a.jsx($,{value:s.name,control:a.jsx(K,{size:"small",color:"secondary",disabled:l}),label:s.name}))})]})})]})}function Na({customer:e,productsList:n=null,readOnly:l=!1}){const r=ue(),s=xe(),[d,v]=fe(),[c,b]=x.useState(d.get("tab")||"general"),p=(o,f)=>{b(f),v({tab:f})},m=()=>{S()},C=()=>{z()},j=o=>{o.preventDefault(),e!=null&&e.name&&R()},S=()=>{if(s.state){const{perPage:o,page:f,q:P}=s.state;r({pathname:"/admin/customers",search:`?perPage=${o}&page=${f}&q=${P}`})}else r("/admin/customers")},R=()=>{r({pathname:`/admin/customers/${e==null?void 0:e.id}`,search:`?tab=${c}`},{state:s.state})},z=()=>{r({pathname:`/admin/customers/${e==null?void 0:e.id}/edit`,search:`?tab=${c}`})};return a.jsx(ke,{sx:{mt:4,mb:4},children:a.jsxs(_,{component:"form",onSubmit:j,noValidate:!0,children:[a.jsxs(_e,{disableGutters:!0,children:[a.jsx(Fe,{size:"large",color:"inherit",sx:{mr:2},onClick:m,children:a.jsx(je,{})}),a.jsx($e,{component:"h1",variant:"h6",noWrap:!0,sx:e!=null&&e.name?{flexGrow:1}:{flexGrow:1,fontStyle:"italic"},children:e!=null&&e.name?e==null?void 0:e.name:"Cliente sin nombre"}),a.jsxs(_,{sx:{display:"flex",gap:2},children:[a.jsx(Ve,{size:"small",color:"info",startIcon:a.jsx(he,{}),onClick:C,disabled:!l,children:"Editar"}),a.jsx(ve,{id:e==null?void 0:e.id,name:e==null?void 0:e.name,onFinished:()=>{},disabled:!l}),a.jsx(Be,{variant:"contained",size:"small",disableElevation:!0,startIcon:a.jsx(me,{}),type:"submit",disabled:l,children:"Guardar"})]})]}),a.jsx(Me,{variant:"outlined",children:a.jsxs(Ge,{value:c,children:[a.jsx(_,{sx:{borderBottom:1,borderColor:"divider"},children:a.jsxs(we,{onChange:p,indicatorColor:"secondary",children:[a.jsx(F,{icon:a.jsx(te,{}),iconPosition:"start",label:"Información general",value:"general"}),a.jsx(F,{icon:a.jsx(oe,{}),iconPosition:"start",label:"Contactos",value:"contacts"}),a.jsx(F,{icon:a.jsx(re,{}),iconPosition:"start",label:"Productos",value:"products"})]})}),a.jsx(V,{value:"general",children:a.jsx(ma,{customer:e,readOnly:l})}),a.jsx(V,{value:"contacts",children:a.jsx(pa,{contacts:e==null?void 0:e.contacts,readOnly:l})}),a.jsx(V,{value:"products",children:a.jsx(ja,{productsList:n,products:e==null?void 0:e.products,readOnly:l})})]})})]})})}export{Na as C};
