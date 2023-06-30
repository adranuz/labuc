import{c as t,a as r,e as u,r as z,u as R,_ as m,j as B}from"./index-9677fb1d.js";import{g as C,E as x,a as y,c as $}from"./styled-74b42274.js";import{g as I,B as h}from"./Typography-6afa1d35.js";function k(o){return C("MuiIconButton",o)}const E=I("MuiIconButton",["root","disabled","colorInherit","colorPrimary","colorSecondary","colorError","colorInfo","colorSuccess","colorWarning","edgeStart","edgeEnd","sizeSmall","sizeMedium","sizeLarge"]),M=E,_=["edge","children","className","color","disabled","disableFocusRipple","size"],j=o=>{const{classes:a,disabled:e,color:s,edge:i,size:n}=o,l={root:["root",e&&"disabled",s!=="default"&&`color${t(s)}`,i&&`edge${t(i)}`,`size${t(n)}`]};return $(l,k,a)},O=x(h,{name:"MuiIconButton",slot:"Root",overridesResolver:(o,a)=>{const{ownerState:e}=o;return[a.root,e.color!=="default"&&a[`color${t(e.color)}`],e.edge&&a[`edge${t(e.edge)}`],a[`size${t(e.size)}`]]}})(({theme:o,ownerState:a})=>r({textAlign:"center",flex:"0 0 auto",fontSize:o.typography.pxToRem(24),padding:8,borderRadius:"50%",overflow:"visible",color:(o.vars||o).palette.action.active,transition:o.transitions.create("background-color",{duration:o.transitions.duration.shortest})},!a.disableRipple&&{"&:hover":{backgroundColor:o.vars?`rgba(${o.vars.palette.action.activeChannel} / ${o.vars.palette.action.hoverOpacity})`:u(o.palette.action.active,o.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},a.edge==="start"&&{marginLeft:a.size==="small"?-3:-12},a.edge==="end"&&{marginRight:a.size==="small"?-3:-12}),({theme:o,ownerState:a})=>{var e;const s=(e=(o.vars||o).palette)==null?void 0:e[a.color];return r({},a.color==="inherit"&&{color:"inherit"},a.color!=="inherit"&&a.color!=="default"&&r({color:s==null?void 0:s.main},!a.disableRipple&&{"&:hover":r({},s&&{backgroundColor:o.vars?`rgba(${s.mainChannel} / ${o.vars.palette.action.hoverOpacity})`:u(s.main,o.palette.action.hoverOpacity)},{"@media (hover: none)":{backgroundColor:"transparent"}})}),a.size==="small"&&{padding:5,fontSize:o.typography.pxToRem(18)},a.size==="large"&&{padding:12,fontSize:o.typography.pxToRem(28)},{[`&.${M.disabled}`]:{backgroundColor:"transparent",color:(o.vars||o).palette.action.disabled}})}),T=z.forwardRef(function(a,e){const s=R({props:a,name:"MuiIconButton"}),{edge:i=!1,children:n,className:l,color:g="default",disabled:c=!1,disableFocusRipple:d=!1,size:v="medium"}=s,b=m(s,_),p=r({},s,{edge:i,color:g,disabled:c,disableFocusRipple:d,size:v}),f=j(p);return B.jsx(O,r({className:y(f.root,l),centerRipple:!0,focusRipple:!d,disabled:c,ref:e,ownerState:p},b,{children:n}))}),P=T;export{P as I};
