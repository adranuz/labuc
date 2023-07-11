import{r as d,c as x,_ as s,u as m,a as v,j as l}from"./index-3b2b324b.js";import{g as h,E as p,c as g,a as D,r as oo}from"./styled-f0e90b3e.js";import{g as C,P as F,b as eo,i as to,T as I}from"./Typography-26330211.js";import{B as ao,F as so}from"./Backdrop-e1437e82.js";import{M as ro}from"./Menu-7587e473.js";import{r as T,i as R}from"./createSvgIcon-72e0666c.js";function io(o){return h("MuiDialog",o)}const no=C("MuiDialog",["root","scrollPaper","scrollBody","container","paper","paperScrollPaper","paperScrollBody","paperWidthFalse","paperWidthXs","paperWidthSm","paperWidthMd","paperWidthLg","paperWidthXl","paperFullWidth","paperFullScreen"]),k=no,lo=d.createContext({}),E=lo,co=["aria-describedby","aria-labelledby","BackdropComponent","BackdropProps","children","className","disableEscapeKeyDown","fullScreen","fullWidth","maxWidth","onBackdropClick","onClose","open","PaperComponent","PaperProps","scroll","TransitionComponent","transitionDuration","TransitionProps"],po=p(ao,{name:"MuiDialog",slot:"Backdrop",overrides:(o,e)=>e.backdrop})({zIndex:-1}),uo=o=>{const{classes:e,scroll:t,maxWidth:a,fullWidth:i,fullScreen:r}=o,n={root:["root"],container:["container",`scroll${x(t)}`],paper:["paper",`paperScroll${x(t)}`,`paperWidth${x(String(a))}`,i&&"paperFullWidth",r&&"paperFullScreen"]};return D(n,io,e)},go=p(ro,{name:"MuiDialog",slot:"Root",overridesResolver:(o,e)=>e.root})({"@media print":{position:"absolute !important"}}),xo=p("div",{name:"MuiDialog",slot:"Container",overridesResolver:(o,e)=>{const{ownerState:t}=o;return[e.container,e[`scroll${x(t.scroll)}`]]}})(({ownerState:o})=>s({height:"100%","@media print":{height:"auto"},outline:0},o.scroll==="paper"&&{display:"flex",justifyContent:"center",alignItems:"center"},o.scroll==="body"&&{overflowY:"auto",overflowX:"hidden",textAlign:"center","&:after":{content:'""',display:"inline-block",verticalAlign:"middle",height:"100%",width:"0"}})),fo=p(F,{name:"MuiDialog",slot:"Paper",overridesResolver:(o,e)=>{const{ownerState:t}=o;return[e.paper,e[`scrollPaper${x(t.scroll)}`],e[`paperWidth${x(String(t.maxWidth))}`],t.fullWidth&&e.paperFullWidth,t.fullScreen&&e.paperFullScreen]}})(({theme:o,ownerState:e})=>s({margin:32,position:"relative",overflowY:"auto","@media print":{overflowY:"visible",boxShadow:"none"}},e.scroll==="paper"&&{display:"flex",flexDirection:"column",maxHeight:"calc(100% - 64px)"},e.scroll==="body"&&{display:"inline-block",verticalAlign:"middle",textAlign:"left"},!e.maxWidth&&{maxWidth:"calc(100% - 64px)"},e.maxWidth==="xs"&&{maxWidth:o.breakpoints.unit==="px"?Math.max(o.breakpoints.values.xs,444):`max(${o.breakpoints.values.xs}${o.breakpoints.unit}, 444px)`,[`&.${k.paperScrollBody}`]:{[o.breakpoints.down(Math.max(o.breakpoints.values.xs,444)+32*2)]:{maxWidth:"calc(100% - 64px)"}}},e.maxWidth&&e.maxWidth!=="xs"&&{maxWidth:`${o.breakpoints.values[e.maxWidth]}${o.breakpoints.unit}`,[`&.${k.paperScrollBody}`]:{[o.breakpoints.down(o.breakpoints.values[e.maxWidth]+32*2)]:{maxWidth:"calc(100% - 64px)"}}},e.fullWidth&&{width:"calc(100% - 64px)"},e.fullScreen&&{margin:0,width:"100%",maxWidth:"100%",height:"100%",maxHeight:"none",borderRadius:0,[`&.${k.paperScrollBody}`]:{margin:0,maxWidth:"100%"}})),mo=d.forwardRef(function(e,t){const a=m({props:e,name:"MuiDialog"}),i=eo(),r={enter:i.transitions.duration.enteringScreen,exit:i.transitions.duration.leavingScreen},{"aria-describedby":n,"aria-labelledby":c,BackdropComponent:u,BackdropProps:$,children:z,className:L,disableEscapeKeyDown:j=!1,fullScreen:q=!1,fullWidth:H=!1,maxWidth:V="sm",onBackdropClick:B,onClose:y,open:N,PaperComponent:O=F,PaperProps:A={},scroll:Y="paper",TransitionComponent:K=so,transitionDuration:U=r,TransitionProps:X}=a,G=v(a,co),b=s({},a,{disableEscapeKeyDown:j,fullScreen:q,fullWidth:H,maxWidth:V,scroll:Y}),M=uo(b),S=d.useRef(),J=f=>{S.current=f.target===f.currentTarget},Q=f=>{S.current&&(S.current=null,B&&B(f),y&&y(f,"backdropClick"))},W=to(c),Z=d.useMemo(()=>({titleId:W}),[W]);return l.jsx(go,s({className:g(M.root,L),closeAfterTransition:!0,components:{Backdrop:po},componentsProps:{backdrop:s({transitionDuration:U,as:u},$)},disableEscapeKeyDown:j,onClose:y,open:N,ref:t,onClick:Q,ownerState:b},G,{children:l.jsx(K,s({appear:!0,in:N,timeout:U,role:"presentation"},X,{children:l.jsx(xo,{className:g(M.container),onMouseDown:J,ownerState:b,children:l.jsx(fo,s({as:O,elevation:24,role:"dialog","aria-describedby":n,"aria-labelledby":W},A,{className:g(M.paper,A.className),ownerState:b,children:l.jsx(E.Provider,{value:Z,children:z})}))})}))}))}),ie=mo;function vo(o){return h("MuiDialogActions",o)}C("MuiDialogActions",["root","spacing"]);const ho=["className","disableSpacing"],Do=o=>{const{classes:e,disableSpacing:t}=o;return D({root:["root",!t&&"spacing"]},vo,e)},Co=p("div",{name:"MuiDialogActions",slot:"Root",overridesResolver:(o,e)=>{const{ownerState:t}=o;return[e.root,!t.disableSpacing&&e.spacing]}})(({ownerState:o})=>s({display:"flex",alignItems:"center",padding:8,justifyContent:"flex-end",flex:"0 0 auto"},!o.disableSpacing&&{"& > :not(:first-of-type)":{marginLeft:8}})),bo=d.forwardRef(function(e,t){const a=m({props:e,name:"MuiDialogActions"}),{className:i,disableSpacing:r=!1}=a,n=v(a,ho),c=s({},a,{disableSpacing:r}),u=Do(c);return l.jsx(Co,s({className:g(u.root,i),ownerState:c,ref:t},n))}),ne=bo;function $o(o){return h("MuiDialogContent",o)}C("MuiDialogContent",["root","dividers"]);function yo(o){return h("MuiDialogTitle",o)}const Mo=C("MuiDialogTitle",["root"]),So=Mo,Wo=["className","dividers"],ko=o=>{const{classes:e,dividers:t}=o;return D({root:["root",t&&"dividers"]},$o,e)},To=p("div",{name:"MuiDialogContent",slot:"Root",overridesResolver:(o,e)=>{const{ownerState:t}=o;return[e.root,t.dividers&&e.dividers]}})(({theme:o,ownerState:e})=>s({flex:"1 1 auto",WebkitOverflowScrolling:"touch",overflowY:"auto",padding:"20px 24px"},e.dividers?{padding:"16px 24px",borderTop:`1px solid ${(o.vars||o).palette.divider}`,borderBottom:`1px solid ${(o.vars||o).palette.divider}`}:{[`.${So.root} + &`]:{paddingTop:0}})),Ro=d.forwardRef(function(e,t){const a=m({props:e,name:"MuiDialogContent"}),{className:i,dividers:r=!1}=a,n=v(a,Wo),c=s({},a,{dividers:r}),u=ko(c);return l.jsx(To,s({className:g(u.root,i),ownerState:c,ref:t},n))}),le=Ro;function wo(o){return h("MuiDialogContentText",o)}C("MuiDialogContentText",["root"]);const _o=["children","className"],Po=o=>{const{classes:e}=o,a=D({root:["root"]},wo,e);return s({},e,a)},jo=p(I,{shouldForwardProp:o=>oo(o)||o==="classes",name:"MuiDialogContentText",slot:"Root",overridesResolver:(o,e)=>e.root})({}),Bo=d.forwardRef(function(e,t){const a=m({props:e,name:"MuiDialogContentText"}),{className:i}=a,r=v(a,_o),n=Po(r);return l.jsx(jo,s({component:"p",variant:"body1",color:"text.secondary",ref:t,ownerState:r,className:g(n.root,i)},a,{classes:n}))}),ce=Bo,No=["className","id"],Ao=o=>{const{classes:e}=o;return D({root:["root"]},yo,e)},Uo=p(I,{name:"MuiDialogTitle",slot:"Root",overridesResolver:(o,e)=>e.root})({padding:"16px 24px",flex:"0 0 auto"}),Fo=d.forwardRef(function(e,t){const a=m({props:e,name:"MuiDialogTitle"}),{className:i,id:r}=a,n=v(a,No),c=a,u=Ao(c),{titleId:$=r}=d.useContext(E);return l.jsx(Uo,s({component:"h2",className:g(u.root,i),ownerState:c,ref:t,variant:"h6",id:r??$},n))}),de=Fo;var w={},Io=R;Object.defineProperty(w,"__esModule",{value:!0});var Eo=w.default=void 0,zo=Io(T()),Lo=l,qo=(0,zo.default)((0,Lo.jsx)("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"}),"Edit");Eo=w.default=qo;var _={},Ho=R;Object.defineProperty(_,"__esModule",{value:!0});var Vo=_.default=void 0,Oo=Ho(T()),Yo=l,Ko=(0,Oo.default)((0,Yo.jsx)("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"}),"Add");Vo=_.default=Ko;var P={},Xo=R;Object.defineProperty(P,"__esModule",{value:!0});var Go=P.default=void 0,Jo=Xo(T()),Qo=l,Zo=(0,Jo.default)((0,Qo.jsx)("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"}),"Delete");Go=P.default=Zo;export{ie as D,de as a,le as b,ce as c,Go as d,ne as e,Vo as f,Eo as g};
