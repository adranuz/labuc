import{k as U,i as V,j as l,E as p,m as B,C as h,D as y,_ as a,r as F,b as Z,c as D,d as q,e as G}from"./index-32292c13.js";import{c,P as J}from"./Paper-d19b285b.js";import{I as K}from"./Backdrop-752351c6.js";function Q(o){return V("MuiAlert",o)}const X=U("MuiAlert",["root","action","icon","message","filled","filledSuccess","filledInfo","filledWarning","filledError","outlined","outlinedSuccess","outlinedInfo","outlinedWarning","outlinedError","standard","standardSuccess","standardInfo","standardWarning","standardError"]),z=X,Y=c(l.jsx("path",{d:"M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"}),"SuccessOutlined"),oo=c(l.jsx("path",{d:"M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"}),"ReportProblemOutlined"),to=c(l.jsx("path",{d:"M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),"ErrorOutline"),so=c(l.jsx("path",{d:"M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"}),"InfoOutlined"),lo=c(l.jsx("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close"),eo=["action","children","className","closeText","color","components","componentsProps","icon","iconMapping","onClose","role","severity","slotProps","slots","variant"],ro=o=>{const{variant:s,color:e,severity:r,classes:t}=o,d={root:["root",`${s}${B(e||r)}`,`${s}`],icon:["icon"],message:["message"],action:["action"]};return G(d,Q,t)},no=p(J,{name:"MuiAlert",slot:"Root",overridesResolver:(o,s)=>{const{ownerState:e}=o;return[s.root,s[e.variant],s[`${e.variant}${B(e.color||e.severity)}`]]}})(({theme:o,ownerState:s})=>{const e=o.palette.mode==="light"?h:y,r=o.palette.mode==="light"?y:h,t=s.color||s.severity;return a({},o.typography.body2,{backgroundColor:"transparent",display:"flex",padding:"6px 16px"},t&&s.variant==="standard"&&{color:o.vars?o.vars.palette.Alert[`${t}Color`]:e(o.palette[t].light,.6),backgroundColor:o.vars?o.vars.palette.Alert[`${t}StandardBg`]:r(o.palette[t].light,.9),[`& .${z.icon}`]:o.vars?{color:o.vars.palette.Alert[`${t}IconColor`]}:{color:o.palette[t].main}},t&&s.variant==="outlined"&&{color:o.vars?o.vars.palette.Alert[`${t}Color`]:e(o.palette[t].light,.6),border:`1px solid ${(o.vars||o).palette[t].light}`,[`& .${z.icon}`]:o.vars?{color:o.vars.palette.Alert[`${t}IconColor`]}:{color:o.palette[t].main}},t&&s.variant==="filled"&&a({fontWeight:o.typography.fontWeightMedium},o.vars?{color:o.vars.palette.Alert[`${t}FilledColor`],backgroundColor:o.vars.palette.Alert[`${t}FilledBg`]}:{backgroundColor:o.palette.mode==="dark"?o.palette[t].dark:o.palette[t].main,color:o.palette.getContrastText(o.palette[t].main)}))}),ao=p("div",{name:"MuiAlert",slot:"Icon",overridesResolver:(o,s)=>s.icon})({marginRight:12,padding:"7px 0",display:"flex",fontSize:22,opacity:.9}),io=p("div",{name:"MuiAlert",slot:"Message",overridesResolver:(o,s)=>s.message})({padding:"8px 0",minWidth:0,overflow:"auto"}),L=p("div",{name:"MuiAlert",slot:"Action",overridesResolver:(o,s)=>s.action})({display:"flex",alignItems:"flex-start",padding:"4px 0 0 16px",marginLeft:"auto",marginRight:-8}),P={success:l.jsx(Y,{fontSize:"inherit"}),warning:l.jsx(oo,{fontSize:"inherit"}),error:l.jsx(to,{fontSize:"inherit"}),info:l.jsx(so,{fontSize:"inherit"})},co=F.forwardRef(function(s,e){var r,t,d,f,C,x;const u=Z({props:s,name:"MuiAlert"}),{action:g,children:R,className:b,closeText:A="Close",color:k,components:I={},componentsProps:m={},icon:M,iconMapping:_=P,onClose:$,role:E="alert",severity:v="success",slotProps:j={},slots:S={},variant:O="standard"}=u,N=D(u,eo),n=a({},u,{color:k,severity:v,variant:O}),i=ro(n),W=(r=(t=S.closeButton)!=null?t:I.CloseButton)!=null?r:K,w=(d=(f=S.closeIcon)!=null?f:I.CloseIcon)!=null?d:lo,H=(C=j.closeButton)!=null?C:m.closeButton,T=(x=j.closeIcon)!=null?x:m.closeIcon;return l.jsxs(no,a({role:E,elevation:0,ownerState:n,className:q(i.root,b),ref:e},N,{children:[M!==!1?l.jsx(ao,{ownerState:n,className:i.icon,children:M||_[v]||P[v]}):null,l.jsx(io,{ownerState:n,className:i.message,children:R}),g!=null?l.jsx(L,{ownerState:n,className:i.action,children:g}):null,g==null&&$?l.jsx(L,{ownerState:n,className:i.action,children:l.jsx(W,a({size:"small","aria-label":A,title:A,color:"inherit",onClick:$},H,{children:l.jsx(w,a({fontSize:"small"},T))}))}):null]}))}),vo=co;export{vo as A};
