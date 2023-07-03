import{r as D,n as L}from"./index-53c75230.js";const T=e=>{let t;const r=new Set,i=(S,f)=>{const l=typeof S=="function"?S(t):S;if(!Object.is(l,t)){const h=t;t=f??typeof l!="object"?l:Object.assign({},t,l),r.forEach(y=>y(t,h))}},n=()=>t,d={setState:i,getState:n,subscribe:S=>(r.add(S),()=>r.delete(S)),destroy:()=>{({VITE_API_URL:"https://buc.solucionfaas.com/api",BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0,SSR:!1}&&"production")!=="production"&&console.warn("[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."),r.clear()}};return t=e(i,n,d),d},U=e=>e?T(e):T;var A={exports:{}},P={},k={exports:{}},C={};/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var E=D;function j(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var N=typeof Object.is=="function"?Object.is:j,M=E.useState,H=E.useEffect,J=E.useLayoutEffect,z=E.useDebugValue;function $(e,t){var r=t(),i=M({inst:{value:r,getSnapshot:t}}),n=i[0].inst,o=i[1];return J(function(){n.value=r,n.getSnapshot=t,I(n)&&o({inst:n})},[e,r,t]),H(function(){return I(n)&&o({inst:n}),e(function(){I(n)&&o({inst:n})})},[e]),z(r),r}function I(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!N(e,r)}catch{return!0}}function B(e,t){return t()}var F=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?B:$;C.useSyncExternalStore=E.useSyncExternalStore!==void 0?E.useSyncExternalStore:F;k.exports=C;var V=k.exports;/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var R=D,W=V;function K(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var q=typeof Object.is=="function"?Object.is:K,X=W.useSyncExternalStore,G=R.useRef,Q=R.useEffect,Y=R.useMemo,Z=R.useDebugValue;P.useSyncExternalStoreWithSelector=function(e,t,r,i,n){var o=G(null);if(o.current===null){var p={hasValue:!1,value:null};o.current=p}else p=o.current;o=Y(function(){function S(v){if(!f){if(f=!0,l=v,v=i(v),n!==void 0&&p.hasValue){var m=p.value;if(n(m,v))return h=m}return h=v}if(m=h,q(l,v))return m;var s=i(v);return n!==void 0&&n(m,s)?m:(l=v,h=s)}var f=!1,l,h,y=r===void 0?null:r;return[function(){return S(t())},y===null?void 0:function(){return S(y())}]},[t,r,i,n]);var d=X(e,o[0],o[1]);return Q(function(){p.hasValue=!0,p.value=d},[d]),Z(d),d};A.exports=P;var ee=A.exports;const te=L(ee),{useSyncExternalStoreWithSelector:ne}=te;function re(e,t=e.getState,r){const i=ne(e.subscribe,e.getState,e.getServerState||e.getState,t,r);return D.useDebugValue(i),i}const x=e=>{({VITE_API_URL:"https://buc.solucionfaas.com/api",BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0,SSR:!1}&&"production")!=="production"&&typeof e!="function"&&console.warn("[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.");const t=typeof e=="function"?U(e):e,r=(i,n)=>re(t,i,n);return Object.assign(r,t),r},oe=e=>e?x(e):x,w=new Map,b=e=>{const t=w.get(e);return t?Object.fromEntries(Object.entries(t.stores).map(([r,i])=>[r,i.getState()])):{}},se=(e,t,r)=>{if(e===void 0)return{type:"untracked",connection:t.connect(r)};const i=w.get(r.name);if(i)return{type:"tracked",store:e,...i};const n={connection:t.connect(r),stores:{}};return w.set(r.name,n),{type:"tracked",store:e,...n}},ie=(e,t={})=>(r,i,n)=>{const{enabled:o,anonymousActionType:p,store:d,...S}=t;let f;try{f=(o??({VITE_API_URL:"https://buc.solucionfaas.com/api",BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0,SSR:!1}&&"production")!=="production")&&window.__REDUX_DEVTOOLS_EXTENSION__}catch{}if(!f)return({VITE_API_URL:"https://buc.solucionfaas.com/api",BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0,SSR:!1}&&"production")!=="production"&&o&&console.warn("[zustand devtools middleware] Please install/enable Redux devtools extension"),e(r,i,n);const{connection:l,...h}=se(d,f,S);let y=!0;n.setState=(s,u,c)=>{const a=r(s,u);if(!y)return a;const g=c===void 0?{type:p||"anonymous"}:typeof c=="string"?{type:c}:c;return d===void 0?(l==null||l.send(g,i()),a):(l==null||l.send({...g,type:`${d}/${g.type}`},{...b(S.name),[d]:n.getState()}),a)};const v=(...s)=>{const u=y;y=!1,r(...s),y=u},m=e(n.setState,i,n);if(h.type==="untracked"?l==null||l.init(m):(h.stores[h.store]=n,l==null||l.init(Object.fromEntries(Object.entries(h.stores).map(([s,u])=>[s,s===h.store?m:u.getState()])))),n.dispatchFromDevtools&&typeof n.dispatch=="function"){let s=!1;const u=n.dispatch;n.dispatch=(...c)=>{({VITE_API_URL:"https://buc.solucionfaas.com/api",BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0,SSR:!1}&&"production")!=="production"&&c[0].type==="__setState"&&!s&&(console.warn('[zustand devtools middleware] "__setState" action type is reserved to set state from the devtools. Avoid using it.'),s=!0),u(...c)}}return l.subscribe(s=>{var u;switch(s.type){case"ACTION":if(typeof s.payload!="string"){console.error("[zustand devtools middleware] Unsupported action format");return}return O(s.payload,c=>{if(c.type==="__setState"){if(d===void 0){v(c.state);return}Object.keys(c.state).length!==1&&console.error(`
                    [zustand devtools middleware] Unsupported __setState action format. 
                    When using 'store' option in devtools(), the 'state' should have only one key, which is a value of 'store' that was passed in devtools(),
                    and value of this only key should be a state object. Example: { "type": "__setState", "state": { "abc123Store": { "foo": "bar" } } }
                    `);const a=c.state[d];if(a==null)return;JSON.stringify(n.getState())!==JSON.stringify(a)&&v(a);return}n.dispatchFromDevtools&&typeof n.dispatch=="function"&&n.dispatch(c)});case"DISPATCH":switch(s.payload.type){case"RESET":return v(m),d===void 0?l==null?void 0:l.init(n.getState()):l==null?void 0:l.init(b(S.name));case"COMMIT":if(d===void 0){l==null||l.init(n.getState());return}return l==null?void 0:l.init(b(S.name));case"ROLLBACK":return O(s.state,c=>{if(d===void 0){v(c),l==null||l.init(n.getState());return}v(c[d]),l==null||l.init(b(S.name))});case"JUMP_TO_STATE":case"JUMP_TO_ACTION":return O(s.state,c=>{if(d===void 0){v(c);return}JSON.stringify(n.getState())!==JSON.stringify(c[d])&&v(c[d])});case"IMPORT_STATE":{const{nextLiftedState:c}=s.payload,a=(u=c.computedStates.slice(-1)[0])==null?void 0:u.state;if(!a)return;v(d===void 0?a:a[d]),l==null||l.send(null,c);return}case"PAUSE_RECORDING":return y=!y}return}}),m},ae=ie,O=(e,t)=>{let r;try{r=JSON.parse(e)}catch(i){console.error("[zustand devtools middleware] Could not parse the received json",i)}r!==void 0&&t(r)};function ue(e,t){let r;try{r=e()}catch{return}return{getItem:n=>{var o;const p=S=>S===null?null:JSON.parse(S,t==null?void 0:t.reviver),d=(o=r.getItem(n))!=null?o:null;return d instanceof Promise?d.then(p):p(d)},setItem:(n,o)=>r.setItem(n,JSON.stringify(o,t==null?void 0:t.replacer)),removeItem:n=>r.removeItem(n)}}const _=e=>t=>{try{const r=e(t);return r instanceof Promise?r:{then(i){return _(i)(r)},catch(i){return this}}}catch(r){return{then(i){return this},catch(i){return _(i)(r)}}}},ce=(e,t)=>(r,i,n)=>{let o={getStorage:()=>localStorage,serialize:JSON.stringify,deserialize:JSON.parse,partialize:u=>u,version:0,merge:(u,c)=>({...c,...u}),...t},p=!1;const d=new Set,S=new Set;let f;try{f=o.getStorage()}catch{}if(!f)return e((...u)=>{console.warn(`[zustand persist middleware] Unable to update item '${o.name}', the given storage is currently unavailable.`),r(...u)},i,n);const l=_(o.serialize),h=()=>{const u=o.partialize({...i()});let c;const a=l({state:u,version:o.version}).then(g=>f.setItem(o.name,g)).catch(g=>{c=g});if(c)throw c;return a},y=n.setState;n.setState=(u,c)=>{y(u,c),h()};const v=e((...u)=>{r(...u),h()},i,n);let m;const s=()=>{var u;if(!f)return;p=!1,d.forEach(a=>a(i()));const c=((u=o.onRehydrateStorage)==null?void 0:u.call(o,i()))||void 0;return _(f.getItem.bind(f))(o.name).then(a=>{if(a)return o.deserialize(a)}).then(a=>{if(a)if(typeof a.version=="number"&&a.version!==o.version){if(o.migrate)return o.migrate(a.state,a.version);console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}else return a.state}).then(a=>{var g;return m=o.merge(a,(g=i())!=null?g:v),r(m,!0),h()}).then(()=>{c==null||c(m,void 0),p=!0,S.forEach(a=>a(m))}).catch(a=>{c==null||c(void 0,a)})};return n.persist={setOptions:u=>{o={...o,...u},u.getStorage&&(f=u.getStorage())},clearStorage:()=>{f==null||f.removeItem(o.name)},getOptions:()=>o,rehydrate:()=>s(),hasHydrated:()=>p,onHydrate:u=>(d.add(u),()=>{d.delete(u)}),onFinishHydration:u=>(S.add(u),()=>{S.delete(u)})},s(),m||v},le=(e,t)=>(r,i,n)=>{let o={storage:ue(()=>localStorage),partialize:s=>s,version:0,merge:(s,u)=>({...u,...s}),...t},p=!1;const d=new Set,S=new Set;let f=o.storage;if(!f)return e((...s)=>{console.warn(`[zustand persist middleware] Unable to update item '${o.name}', the given storage is currently unavailable.`),r(...s)},i,n);const l=()=>{const s=o.partialize({...i()});return f.setItem(o.name,{state:s,version:o.version})},h=n.setState;n.setState=(s,u)=>{h(s,u),l()};const y=e((...s)=>{r(...s),l()},i,n);let v;const m=()=>{var s,u;if(!f)return;p=!1,d.forEach(a=>{var g;return a((g=i())!=null?g:y)});const c=((u=o.onRehydrateStorage)==null?void 0:u.call(o,(s=i())!=null?s:y))||void 0;return _(f.getItem.bind(f))(o.name).then(a=>{if(a)if(typeof a.version=="number"&&a.version!==o.version){if(o.migrate)return o.migrate(a.state,a.version);console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}else return a.state}).then(a=>{var g;return v=o.merge(a,(g=i())!=null?g:y),r(v,!0),l()}).then(()=>{c==null||c(v,void 0),v=i(),p=!0,S.forEach(a=>a(v))}).catch(a=>{c==null||c(void 0,a)})};return n.persist={setOptions:s=>{o={...o,...s},s.storage&&(f=s.storage)},clearStorage:()=>{f==null||f.removeItem(o.name)},getOptions:()=>o,rehydrate:()=>m(),hasHydrated:()=>p,onHydrate:s=>(d.add(s),()=>{d.delete(s)}),onFinishHydration:s=>(S.add(s),()=>{S.delete(s)})},o.skipHydration||m(),v||y},de=(e,t)=>"getStorage"in t||"serialize"in t||"deserialize"in t?(({VITE_API_URL:"https://buc.solucionfaas.com/api",BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0,SSR:!1}&&"production")!=="production"&&console.warn("[DEPRECATED] `getStorage`, `serialize` and `deserialize` options are deprecated. Use `storage` option instead."),ce(e,t)):le(e,t),fe=de,Se=oe()(ae(fe(e=>({snackbarOpen:!1,snackbarMessage:void 0,snackbarSeverity:void 0,showSnackbar:(t,r)=>{e({snackbarOpen:!0,snackbarMessage:t,snackbarSeverity:r},!1,"SHOW_SNACKBAR")},hideSnackbar:()=>{e({snackbarOpen:!1},!1,"HIDE_SNACKBAR")}}),{name:"common"})));export{Se as u};
