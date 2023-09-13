import{r as w,U as V}from"./index-d910b063.js";const x=t=>{let e;const o=new Set,s=(d,h)=>{const r=typeof d=="function"?d(e):d;if(!Object.is(r,e)){const f=e;e=h??typeof r!="object"?r:Object.assign({},e,r),o.forEach(S=>S(e,f))}},n=()=>e,i={setState:s,getState:n,subscribe:d=>(o.add(d),()=>o.delete(d)),destroy:()=>{({VITE_API_URL:"https://buc.solucionfaas.com/api",BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0,SSR:!1}&&"production")!=="production"&&console.warn("[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."),o.clear()}};return e=t(s,n,i),i},j=t=>t?x(t):x;var I={exports:{}},A={},P={exports:{}},U={};/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var m=w;function C(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var L=typeof Object.is=="function"?Object.is:C,M=m.useState,k=m.useEffect,N=m.useLayoutEffect,$=m.useDebugValue;function J(t,e){var o=e(),s=M({inst:{value:o,getSnapshot:e}}),n=s[0].inst,l=s[1];return N(function(){n.value=o,n.getSnapshot=e,R(n)&&l({inst:n})},[t,o,e]),k(function(){return R(n)&&l({inst:n}),t(function(){R(n)&&l({inst:n})})},[t]),$(o),o}function R(t){var e=t.getSnapshot;t=t.value;try{var o=e();return!L(t,o)}catch{return!0}}function B(t,e){return e()}var z=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?B:J;U.useSyncExternalStore=m.useSyncExternalStore!==void 0?m.useSyncExternalStore:z;P.exports=U;var F=P.exports;/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var O=w,W=F;function q(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var X=typeof Object.is=="function"?Object.is:q,G=W.useSyncExternalStore,H=O.useRef,K=O.useEffect,Q=O.useMemo,Y=O.useDebugValue;A.useSyncExternalStoreWithSelector=function(t,e,o,s,n){var l=H(null);if(l.current===null){var E={hasValue:!1,value:null};l.current=E}else E=l.current;l=Q(function(){function d(a){if(!h){if(h=!0,r=a,a=s(a),n!==void 0&&E.hasValue){var v=E.value;if(n(v,a))return f=v}return f=a}if(v=f,X(r,a))return v;var c=s(a);return n!==void 0&&n(v,c)?v:(r=a,f=c)}var h=!1,r,f,S=o===void 0?null:o;return[function(){return d(e())},S===null?void 0:function(){return d(S())}]},[e,o,s,n]);var i=G(t,l[0],l[1]);return K(function(){E.hasValue=!0,E.value=i},[i]),Y(i),i};I.exports=A;var Z=I.exports;const tt=V(Z),{useSyncExternalStoreWithSelector:et}=tt;function nt(t,e=t.getState,o){const s=et(t.subscribe,t.getState,t.getServerState||t.getState,e,o);return w.useDebugValue(s),s}const T=t=>{({VITE_API_URL:"https://buc.solucionfaas.com/api",BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0,SSR:!1}&&"production")!=="production"&&typeof t!="function"&&console.warn("[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.");const e=typeof t=="function"?j(t):t,o=(s,n)=>nt(e,s,n);return Object.assign(o,e),o},it=t=>t?T(t):T,D=new Map,_=t=>{const e=D.get(t);return e?Object.fromEntries(Object.entries(e.stores).map(([o,s])=>[o,s.getState()])):{}},ot=(t,e,o)=>{if(t===void 0)return{type:"untracked",connection:e.connect(o)};const s=D.get(o.name);if(s)return{type:"tracked",store:t,...s};const n={connection:e.connect(o),stores:{}};return D.set(o.name,n),{type:"tracked",store:t,...n}},rt=(t,e={})=>(o,s,n)=>{const{enabled:l,anonymousActionType:E,store:i,...d}=e;let h;try{h=(l??({VITE_API_URL:"https://buc.solucionfaas.com/api",BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0,SSR:!1}&&"production")!=="production")&&window.__REDUX_DEVTOOLS_EXTENSION__}catch{}if(!h)return({VITE_API_URL:"https://buc.solucionfaas.com/api",BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0,SSR:!1}&&"production")!=="production"&&l&&console.warn("[zustand devtools middleware] Please install/enable Redux devtools extension"),t(o,s,n);const{connection:r,...f}=ot(i,h,d);let S=!0;n.setState=(c,y,u)=>{const p=o(c,y);if(!S)return p;const g=u===void 0?{type:E||"anonymous"}:typeof u=="string"?{type:u}:u;return i===void 0?(r==null||r.send(g,s()),p):(r==null||r.send({...g,type:`${i}/${g.type}`},{..._(d.name),[i]:n.getState()}),p)};const a=(...c)=>{const y=S;S=!1,o(...c),S=y},v=t(n.setState,s,n);if(f.type==="untracked"?r==null||r.init(v):(f.stores[f.store]=n,r==null||r.init(Object.fromEntries(Object.entries(f.stores).map(([c,y])=>[c,c===f.store?v:y.getState()])))),n.dispatchFromDevtools&&typeof n.dispatch=="function"){let c=!1;const y=n.dispatch;n.dispatch=(...u)=>{({VITE_API_URL:"https://buc.solucionfaas.com/api",BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0,SSR:!1}&&"production")!=="production"&&u[0].type==="__setState"&&!c&&(console.warn('[zustand devtools middleware] "__setState" action type is reserved to set state from the devtools. Avoid using it.'),c=!0),y(...u)}}return r.subscribe(c=>{var y;switch(c.type){case"ACTION":if(typeof c.payload!="string"){console.error("[zustand devtools middleware] Unsupported action format");return}return b(c.payload,u=>{if(u.type==="__setState"){if(i===void 0){a(u.state);return}Object.keys(u.state).length!==1&&console.error(`
                    [zustand devtools middleware] Unsupported __setState action format. 
                    When using 'store' option in devtools(), the 'state' should have only one key, which is a value of 'store' that was passed in devtools(),
                    and value of this only key should be a state object. Example: { "type": "__setState", "state": { "abc123Store": { "foo": "bar" } } }
                    `);const p=u.state[i];if(p==null)return;JSON.stringify(n.getState())!==JSON.stringify(p)&&a(p);return}n.dispatchFromDevtools&&typeof n.dispatch=="function"&&n.dispatch(u)});case"DISPATCH":switch(c.payload.type){case"RESET":return a(v),i===void 0?r==null?void 0:r.init(n.getState()):r==null?void 0:r.init(_(d.name));case"COMMIT":if(i===void 0){r==null||r.init(n.getState());return}return r==null?void 0:r.init(_(d.name));case"ROLLBACK":return b(c.state,u=>{if(i===void 0){a(u),r==null||r.init(n.getState());return}a(u[i]),r==null||r.init(_(d.name))});case"JUMP_TO_STATE":case"JUMP_TO_ACTION":return b(c.state,u=>{if(i===void 0){a(u);return}JSON.stringify(n.getState())!==JSON.stringify(u[i])&&a(u[i])});case"IMPORT_STATE":{const{nextLiftedState:u}=c.payload,p=(y=u.computedStates.slice(-1)[0])==null?void 0:y.state;if(!p)return;a(i===void 0?p:p[i]),r==null||r.send(null,u);return}case"PAUSE_RECORDING":return S=!S}return}}),v},ut=rt,b=(t,e)=>{let o;try{o=JSON.parse(t)}catch(s){console.error("[zustand devtools middleware] Could not parse the received json",s)}o!==void 0&&e(o)};export{it as c,ut as d};
