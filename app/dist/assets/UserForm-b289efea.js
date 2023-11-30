import{q as R,r as V,j as e,s as w,T as W,w as $}from"./index-64ee5db4.js";import{o as u,s as i,a as U,u as O,t as A,C as J}from"./zod-bb631345.js";import{d as H,F as D,C as K}from"./SaveAlt-53517b5f.js";import{d as M}from"./ArrowBack-afe2bf24.js";import{u as Q}from"./common-49ff51cc.js";import{A as L}from"./constants-2e6fc461.js";import{T as X}from"./Toolbar-984ecaee.js";import{I as Y}from"./Backdrop-83b371ec.js";import{L as Z}from"./LoadingButton-d1fcde35.js";import{C as ee,a as re}from"./CardContent-e1ee60bb.js";import{G as m}from"./Grid-6d55df83.js";import{T as x,F as ae}from"./TextField-3b5635c4.js";import{F as oe,a as se}from"./FormControl-24d1bd67.js";const ne=u({name:i({required_error:"Se requiere el nombre"}).nonempty({message:"Se requiere el nombre"}),email:i({required_error:"Se requiere la dirección de correo electrónico"}).nonempty({message:"Se requiere la dirección de correo electrónico"}).email("La dirección de correo electrónico es inválida"),roles:U(u({name:i({required_error:"Se requiere el nombre del rol"})})).nonempty({message:"Se requiere al menos un rol"})}),te=u({name:i({required_error:"Se requiere el nombre"}).min(1,{message:"Se requiere el nombre"}),email:i({required_error:"Se requiere la dirección de correo electrónico"}).min(1,{message:"Se requiere la dirección de correo electrónico"}).email("La dirección de correo electrónico es inválida"),roles:U(u({name:i({required_error:"Se requiere el nombre del rol"})})).nonempty({message:"Se requiere al menos un rol"}),password:i({required_error:"Se requiere la contraseña"}).nonempty({message:"Se requiere la contraseña"}).min(8,"La contraseña debe tener más de 8 caracteres")});function je({user:r,roles:p}){var f,S,b,j,C,q,y,T;const _=R(),[g,c]=V.useState(!1),l=Q(o=>o.showSnackbar),{control:z,formState:{errors:s},getValues:k,handleSubmit:v,register:h,setValue:E}=O({defaultValues:{name:r==null?void 0:r.name,email:r==null?void 0:r.email,roles:(r==null?void 0:r.roles)||[]},resolver:A(r?ne:te)}),F=o=>{const{roles:a}=k(),n=a!=null&&a.find(t=>t.name===o.name)?a==null?void 0:a.filter(t=>t.name!==o.name):[...a??[],{name:o.name}];E("roles",n)},B=o=>{r?G(r.id,o):I(o)},G=(o,a)=>{c(!0);const n=new URL(`${L}/users/${o}`);fetch(n,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}).then(t=>{if(!t.ok){l("Error al intentar acualizar el usuario","error");return}d(),l("El usuario se actualizó correctamente","success")}).catch(t=>l("Error al intentar acualizar el usuario","error")).finally(()=>c(!1))},I=o=>{c(!0);const a=new URL(`${L}/users`);fetch(a,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}).then(n=>{if(!n.ok){l("Error al intentar crear el usuario","error");return}d(),l("El usuario se creó correctamente","success")}).catch(n=>l("Error al intentar crear el usuario","error")).finally(()=>c(!1))},N=()=>{d()},P=()=>{d()},d=()=>{_("/admin/users")};return e.jsxs(w,{component:"form",onSubmit:v(B),noValidate:!0,children:[e.jsxs(X,{disableGutters:!0,children:[e.jsx(Y,{size:"large",color:"inherit",sx:{mr:2},onClick:N,children:e.jsx(M,{})}),e.jsx(W,{component:"h2",variant:"h5",noWrap:!0,sx:{flexGrow:1},children:"Usuario"}),e.jsxs(w,{sx:{display:"flex",gap:2},children:[e.jsx($,{size:"small",onClick:P,disabled:g,children:"Cancelar"}),e.jsx(Z,{variant:"contained",size:"small",loadingPosition:"start",disableElevation:!0,startIcon:e.jsx(H,{}),type:"submit",disabled:g,children:"Guardar"})]})]}),e.jsx(ee,{variant:"outlined",children:e.jsxs(re,{children:[e.jsxs(m,{container:!0,spacing:3,children:[e.jsx(m,{item:!0,xs:12,md:6,children:e.jsx(x,{margin:"normal",required:!0,fullWidth:!0,size:"small",label:"Nombre",autoFocus:!0,autoComplete:"name",error:!!((f=s.name)!=null&&f.message),helperText:!!((S=s.name)!=null&&S.message)&&String(s.name.message),...h("name")})}),e.jsx(m,{item:!0,xs:12,md:6,children:e.jsx(x,{margin:"normal",required:!0,fullWidth:!0,size:"small",label:"Correo electrónico",autoComplete:"email",error:!!((b=s.email)!=null&&b.message),helperText:!!((j=s.email)!=null&&j.message)&&String(s.email.message),...h("email"),disabled:!!r})})]}),!r&&e.jsx(m,{container:!0,spacing:3,children:e.jsx(m,{item:!0,xs:12,md:6,children:e.jsx(x,{margin:"normal",required:!0,fullWidth:!0,size:"small",label:"Contraseña",type:"password",error:!!((C=s.password)!=null&&C.message),helperText:!!((q=s.password)!=null&&q.message)&&String(s.password.message),...h("password")})})}),e.jsxs(oe,{sx:{m:1.5},variant:"standard",error:!!((y=s.roles)!=null&&y.message),children:[e.jsx(se,{children:"Roles"}),e.jsx(J,{name:"roles",render:()=>{var o;return(o=p==null?void 0:p.data)==null?void 0:o.map(a=>{var n;return e.jsx(D,{sx:{textTransform:"capitalize"},control:e.jsx(K,{size:"small",color:"secondary",onChange:()=>F(a),defaultChecked:!!((n=r==null?void 0:r.roles)!=null&&n.find(t=>t.name===a.name))}),label:a.name},a.id)})},control:z}),e.jsx(ae,{children:!!((T=s.roles)!=null&&T.message)&&String(s.roles.message)})]})]})})]})}export{je as U};
