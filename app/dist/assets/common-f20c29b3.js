import{r as D,C as L}from"./index-b42bb106.js";const T=t=>{let e;const r=new Set,i=(S,f)=>{const l=typeof S=="function"?S(e):S;if(!Object.is(l,e)){const m=e;e=f??typeof l!="object"?l:Object.assign({},e,l),r.forEach(y=>y(e,m))}},n=()=>e,d={setState:i,getState:n,subscribe:S=>(r.add(S),()=>r.delete(S)),destroy:()=>{({VITE_API_URL:"http://localhost:3000/api",BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0,SSR:!1}&&"production")!=="production"&&console.warn("[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."),r.clear()}};return e=t(i,n,d),d},U=t=>t?T(t):T;var A={exports:{}},P={},C={exports:{}},k={};/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var E=D;function j(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var N=typeof Object.is=="function"?Object.is:j,M=E.useState,H=E.useEffect,J=E.useLayoutEffect,z=E.useDebugValue;function $(t,e){var r=e(),i=M({inst:{value:r,getSnapshot:e}}),n=i[0].inst,o=i[1];return J(function(){n.value=r,n.getSnapshot=e,b(n)&&o({inst:n})},[t,r,e]),H(function(){return b(n)&&o({inst:n}),t(function(){b(n)&&o({inst:n})})},[t]),z(r),r}function b(t){var e=t.getSnapshot;t=t.value;try{var r=e();return!N(t,r)}catch{return!0}}function B(t,e){return e()}var F=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?B:$;k.useSyncExternalStore=E.useSyncExternalStore!==void 0?E.useSyncExternalStore:F;C.exports=k;var V=C.exports;/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var I=D,W=V;function K(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var q=typeof Object.is=="function"?Object.is:K,X=W.useSyncExternalStore,G=I.useRef,Q=I.useEffect,Y=I.useMemo,Z=I.useDebugValue;P.useSyncExternalStoreWithSelector=function(t,e,r,i,n){var o=G(null);if(o.current===null){var p={hasValue:!1,value:null};o.current=p}else p=o.current;o=Y(function(){function S(v){if(!f){if(f=!0,l=v,v=i(v),n!==void 0&&p.hasValue){var h=p.value;if(n(h,v))return m=h}return m=v}if(h=m,q(l,v))return h;var s=i(v);return n!==void 0&&n(h,s)?h:(l=v,m=s)}var f=!1,l,m,y=r===void 0?null:r;return[function(){return S(e())},y===null?void 0:function(){return S(y())}]},[e,r,i,n]);var d=X(t,o[0],o[1]);return Q(function(){p.hasValue=!0,p.value=d},[d]),Z(d),d};A.exports=P;var tt=A.exports;const et=L(tt),{useSyncExternalStoreWithSelector:nt}=et;function rt(t,e=t.getState,r){const i=nt(t.subscribe,t.getState,t.getServerState||t.getState,e,r);return D.useDebugValue(i),i}const x=t=>{({VITE_API_URL:"http://localhost:3000/api",BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0,SSR:!1}&&"production")!=="production"&&typeof t!="function"&&console.warn("[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.");const e=typeof t=="function"?U(t):t,r=(i,n)=>rt(e,i,n);return Object.assign(r,e),r},ot=t=>t?x(t):x,w=new Map,R=t=>{const e=w.get(t);return e?Object.fromEntries(Object.entries(e.stores).map(([r,i])=>[r,i.getState()])):{}},st=(t,e,r)=>{if(t===void 0)return{type:"untracked",connection:e.connect(r)};const i=w.get(r.name);if(i)return{type:"tracked",store:t,...i};const n={connection:e.connect(r),stores:{}};return w.set(r.name,n),{type:"tracked",store:t,...n}},it=(t,e={})=>(r,i,n)=>{const{enabled:o,anonymousActionType:p,store:d,...S}=e;let f;try{f=(o??({VITE_API_URL:"http://localhost:3000/api",BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0,SSR:!1}&&"production")!=="production")&&window.__REDUX_DEVTOOLS_EXTENSION__}catch{}if(!f)return({VITE_API_URL:"http://localhost:3000/api",BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0,SSR:!1}&&"production")!=="production"&&o&&console.warn("[zustand devtools middleware] Please install/enable Redux devtools extension"),t(r,i,n);const{connection:l,...m}=st(d,f,S);let y=!0;n.setState=(s,u,c)=>{const a=r(s,u);if(!y)return a;const g=c===void 0?{type:p||"anonymous"}:typeof c=="string"?{type:c}:c;return d===void 0?(l==null||l.send(g,i()),a):(l==null||l.send({...g,type:`${d}/${g.type}`},{...R(S.name),[d]:n.getState()}),a)};const v=(...s)=>{const u=y;y=!1,r(...s),y=u},h=t(n.setState,i,n);if(m.type==="untracked"?l==null||l.init(h):(m.stores[m.store]=n,l==null||l.init(Object.fromEntries(Object.entries(m.stores).map(([s,u])=>[s,s===m.store?h:u.getState()])))),n.dispatchFromDevtools&&typeof n.dispatch=="function"){let s=!1;const u=n.dispatch;n.dispatch=(...c)=>{({VITE_API_URL:"http://localhost:3000/api",BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0,SSR:!1}&&"production")!=="production"&&c[0].type==="__setState"&&!s&&(console.warn('[zustand devtools middleware] "__setState" action type is reserved to set state from the devtools. Avoid using it.'),s=!0),u(...c)}}return l.subscribe(s=>{var u;switch(s.type){case"ACTION":if(typeof s.payload!="string"){console.error("[zustand devtools middleware] Unsupported action format");return}return O(s.payload,c=>{if(c.type==="__setState"){if(d===void 0){v(c.state);return}Object.keys(c.state).length!==1&&console.error(`
                    [zustand devtools middleware] Unsupported __setState action format. 
                    When using 'store' option in devtools(), the 'state' should have only one key, which is a value of 'store' that was passed in devtools(),
                    and value of this only key should be a state object. Example: { "type": "__setState", "state": { "abc123Store": { "foo": "bar" } } }
                    `);const a=c.state[d];if(a==null)return;JSON.stringify(n.getState())!==JSON.stringify(a)&&v(a);return}n.dispatchFromDevtools&&typeof n.dispatch=="function"&&n.dispatch(c)});case"DISPATCH":switch(s.payload.type){case"RESET":return v(h),d===void 0?l==null?void 0:l.init(n.getState()):l==null?void 0:l.init(R(S.name));case"COMMIT":if(d===void 0){l==null||l.init(n.getState());return}return l==null?void 0:l.init(R(S.name));case"ROLLBACK":return O(s.state,c=>{if(d===void 0){v(c),l==null||l.init(n.getState());return}v(c[d]),l==null||l.init(R(S.name))});case"JUMP_TO_STATE":case"JUMP_TO_ACTION":return O(s.state,c=>{if(d===void 0){v(c);return}JSON.stringify(n.getState())!==JSON.stringify(c[d])&&v(c[d])});case"IMPORT_STATE":{const{nextLiftedState:c}=s.payload,a=(u=c.computedStates.slice(-1)[0])==null?void 0:u.state;if(!a)return;v(d===void 0?a:a[d]),l==null||l.send(null,c);return}case"PAUSE_RECORDING":return y=!y}return}}),h},at=it,O=(t,e)=>{let r;try{r=JSON.parse(t)}catch(i){console.error("[zustand devtools middleware] Could not parse the received json",i)}r!==void 0&&e(r)};function ut(t,e){let r;try{r=t()}catch{return}return{getItem:n=>{var o;const p=S=>S===null?null:JSON.parse(S,e==null?void 0:e.reviver),d=(o=r.getItem(n))!=null?o:null;return d instanceof Promise?d.then(p):p(d)},setItem:(n,o)=>r.setItem(n,JSON.stringify(o,e==null?void 0:e.replacer)),removeItem:n=>r.removeItem(n)}}const _=t=>e=>{try{const r=t(e);return r instanceof Promise?r:{then(i){return _(i)(r)},catch(i){return this}}}catch(r){return{then(i){return this},catch(i){return _(i)(r)}}}},ct=(t,e)=>(r,i,n)=>{let o={getStorage:()=>localStorage,serialize:JSON.stringify,deserialize:JSON.parse,partialize:u=>u,version:0,merge:(u,c)=>({...c,...u}),...e},p=!1;const d=new Set,S=new Set;let f;try{f=o.getStorage()}catch{}if(!f)return t((...u)=>{console.warn(`[zustand persist middleware] Unable to update item '${o.name}', the given storage is currently unavailable.`),r(...u)},i,n);const l=_(o.serialize),m=()=>{const u=o.partialize({...i()});let c;const a=l({state:u,version:o.version}).then(g=>f.setItem(o.name,g)).catch(g=>{c=g});if(c)throw c;return a},y=n.setState;n.setState=(u,c)=>{y(u,c),m()};const v=t((...u)=>{r(...u),m()},i,n);let h;const s=()=>{var u;if(!f)return;p=!1,d.forEach(a=>a(i()));const c=((u=o.onRehydrateStorage)==null?void 0:u.call(o,i()))||void 0;return _(f.getItem.bind(f))(o.name).then(a=>{if(a)return o.deserialize(a)}).then(a=>{if(a)if(typeof a.version=="number"&&a.version!==o.version){if(o.migrate)return o.migrate(a.state,a.version);console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}else return a.state}).then(a=>{var g;return h=o.merge(a,(g=i())!=null?g:v),r(h,!0),m()}).then(()=>{c==null||c(h,void 0),p=!0,S.forEach(a=>a(h))}).catch(a=>{c==null||c(void 0,a)})};return n.persist={setOptions:u=>{o={...o,...u},u.getStorage&&(f=u.getStorage())},clearStorage:()=>{f==null||f.removeItem(o.name)},getOptions:()=>o,rehydrate:()=>s(),hasHydrated:()=>p,onHydrate:u=>(d.add(u),()=>{d.delete(u)}),onFinishHydration:u=>(S.add(u),()=>{S.delete(u)})},s(),h||v},lt=(t,e)=>(r,i,n)=>{let o={storage:ut(()=>localStorage),partialize:s=>s,version:0,merge:(s,u)=>({...u,...s}),...e},p=!1;const d=new Set,S=new Set;let f=o.storage;if(!f)return t((...s)=>{console.warn(`[zustand persist middleware] Unable to update item '${o.name}', the given storage is currently unavailable.`),r(...s)},i,n);const l=()=>{const s=o.partialize({...i()});return f.setItem(o.name,{state:s,version:o.version})},m=n.setState;n.setState=(s,u)=>{m(s,u),l()};const y=t((...s)=>{r(...s),l()},i,n);let v;const h=()=>{var s,u;if(!f)return;p=!1,d.forEach(a=>{var g;return a((g=i())!=null?g:y)});const c=((u=o.onRehydrateStorage)==null?void 0:u.call(o,(s=i())!=null?s:y))||void 0;return _(f.getItem.bind(f))(o.name).then(a=>{if(a)if(typeof a.version=="number"&&a.version!==o.version){if(o.migrate)return o.migrate(a.state,a.version);console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}else return a.state}).then(a=>{var g;return v=o.merge(a,(g=i())!=null?g:y),r(v,!0),l()}).then(()=>{c==null||c(v,void 0),v=i(),p=!0,S.forEach(a=>a(v))}).catch(a=>{c==null||c(void 0,a)})};return n.persist={setOptions:s=>{o={...o,...s},s.storage&&(f=s.storage)},clearStorage:()=>{f==null||f.removeItem(o.name)},getOptions:()=>o,rehydrate:()=>h(),hasHydrated:()=>p,onHydrate:s=>(d.add(s),()=>{d.delete(s)}),onFinishHydration:s=>(S.add(s),()=>{S.delete(s)})},o.skipHydration||h(),v||y},dt=(t,e)=>"getStorage"in e||"serialize"in e||"deserialize"in e?(({VITE_API_URL:"http://localhost:3000/api",BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0,SSR:!1}&&"production")!=="production"&&console.warn("[DEPRECATED] `getStorage`, `serialize` and `deserialize` options are deprecated. Use `storage` option instead."),ct(t,e)):lt(t,e),ft=dt,St=ot()(at(ft(t=>({snackbarOpen:!1,snackbarMessage:void 0,snackbarSeverity:void 0,showSnackbar:(e,r)=>{t({snackbarOpen:!0,snackbarMessage:e,snackbarSeverity:r},!1,"SHOW_SNACKBAR")},hideSnackbar:()=>{t({snackbarOpen:!1},!1,"HIDE_SNACKBAR")}}),{name:"common"})));export{St as u};
