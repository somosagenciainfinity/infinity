var At=Object.defineProperty;var ze=e=>{throw TypeError(e)};var Ot=(e,t,r)=>t in e?At(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var g=(e,t,r)=>Ot(e,typeof t!="symbol"?t+"":t,r),Ne=(e,t,r)=>t.has(e)||ze("Cannot "+r);var d=(e,t,r)=>(Ne(e,t,"read from private field"),r?r.call(e):t.get(e)),m=(e,t,r)=>t.has(e)?ze("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,r),f=(e,t,r,s)=>(Ne(e,t,"write to private field"),s?s.call(e,r):t.set(e,r),r),x=(e,t,r)=>(Ne(e,t,"access private method"),r);var Ue=(e,t,r,s)=>({set _(o){f(e,t,o,r)},get _(){return d(e,t,s)}});var Ge=(e,t,r)=>(s,o)=>{let a=-1;return i(0);async function i(l){if(l<=a)throw new Error("next() called multiple times");a=l;let n,c=!1,u;if(e[l]?(u=e[l][0][0],s.req.routeIndex=l):u=l===e.length&&o||void 0,u)try{n=await u(s,()=>i(l+1))}catch(p){if(p instanceof Error&&t)s.error=p,n=await t(p,s),c=!0;else throw p}else s.finalized===!1&&r&&(n=await r(s));return n&&(s.finalized===!1||c)&&(s.res=n),s}},Ct=Symbol(),Rt=async(e,t=Object.create(null))=>{const{all:r=!1,dot:s=!1}=t,a=(e instanceof ct?e.raw.headers:e.headers).get("Content-Type");return a!=null&&a.startsWith("multipart/form-data")||a!=null&&a.startsWith("application/x-www-form-urlencoded")?St(e,{all:r,dot:s}):{}};async function St(e,t){const r=await e.formData();return r?_t(r,t):{}}function _t(e,t){const r=Object.create(null);return e.forEach((s,o)=>{t.all||o.endsWith("[]")?$t(r,o,s):r[o]=s}),t.dot&&Object.entries(r).forEach(([s,o])=>{s.includes(".")&&(Nt(r,s,o),delete r[s])}),r}var $t=(e,t,r)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(r):e[t]=[e[t],r]:t.endsWith("[]")?e[t]=[r]:e[t]=r},Nt=(e,t,r)=>{let s=e;const o=t.split(".");o.forEach((a,i)=>{i===o.length-1?s[a]=r:((!s[a]||typeof s[a]!="object"||Array.isArray(s[a])||s[a]instanceof File)&&(s[a]=Object.create(null)),s=s[a])})},ot=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},It=e=>{const{groups:t,path:r}=Mt(e),s=ot(r);return Dt(s,t)},Mt=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(r,s)=>{const o=`@${s}`;return t.push([o,r]),o}),{groups:t,path:e}},Dt=(e,t)=>{for(let r=t.length-1;r>=0;r--){const[s]=t[r];for(let o=e.length-1;o>=0;o--)if(e[o].includes(s)){e[o]=e[o].replace(s,t[r][1]);break}}return e},Te={},Ht=(e,t)=>{if(e==="*")return"*";const r=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(r){const s=`${e}#${t}`;return Te[s]||(r[2]?Te[s]=t&&t[0]!==":"&&t[0]!=="*"?[s,r[1],new RegExp(`^${r[2]}(?=/${t})`)]:[e,r[1],new RegExp(`^${r[2]}$`)]:Te[s]=[e,r[1],!0]),Te[s]}return null},Le=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,r=>{try{return t(r)}catch{return r}})}},Lt=e=>Le(e,decodeURI),at=e=>{const t=e.url,r=t.indexOf("/",t.charCodeAt(9)===58?13:8);let s=r;for(;s<t.length;s++){const o=t.charCodeAt(s);if(o===37){const a=t.indexOf("?",s),i=t.slice(r,a===-1?void 0:a);return Lt(i.includes("%25")?i.replace(/%25/g,"%2525"):i)}else if(o===63)break}return t.slice(r,s)},Ft=e=>{const t=at(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},se=(e,t,...r)=>(r.length&&(t=se(t,...r)),`${(e==null?void 0:e[0])==="/"?"":"/"}${e}${t==="/"?"":`${(e==null?void 0:e.at(-1))==="/"?"":"/"}${(t==null?void 0:t[0])==="/"?t.slice(1):t}`}`),it=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),r=[];let s="";return t.forEach(o=>{if(o!==""&&!/\:/.test(o))s+="/"+o;else if(/\:/.test(o))if(/\?/.test(o)){r.length===0&&s===""?r.push("/"):r.push(s);const a=o.replace("?","");s+="/"+a,r.push(s)}else s+="/"+o}),r.filter((o,a,i)=>i.indexOf(o)===a)},Ie=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?Le(e,lt):e):e,nt=(e,t,r)=>{let s;if(!r&&t&&!/[%+]/.test(t)){let i=e.indexOf(`?${t}`,8);for(i===-1&&(i=e.indexOf(`&${t}`,8));i!==-1;){const l=e.charCodeAt(i+t.length+1);if(l===61){const n=i+t.length+2,c=e.indexOf("&",n);return Ie(e.slice(n,c===-1?void 0:c))}else if(l==38||isNaN(l))return"";i=e.indexOf(`&${t}`,i+1)}if(s=/[%+]/.test(e),!s)return}const o={};s??(s=/[%+]/.test(e));let a=e.indexOf("?",8);for(;a!==-1;){const i=e.indexOf("&",a+1);let l=e.indexOf("=",a);l>i&&i!==-1&&(l=-1);let n=e.slice(a+1,l===-1?i===-1?void 0:i:l);if(s&&(n=Ie(n)),a=i,n==="")continue;let c;l===-1?c="":(c=e.slice(l+1,i===-1?void 0:i),s&&(c=Ie(c))),r?(o[n]&&Array.isArray(o[n])||(o[n]=[]),o[n].push(c)):o[n]??(o[n]=c)}return t?o[t]:o},qt=nt,zt=(e,t)=>nt(e,t,!0),lt=decodeURIComponent,Ve=e=>Le(e,lt),ae,O,L,dt,ut,De,q,Xe,ct=(Xe=class{constructor(e,t="/",r=[[]]){m(this,L);g(this,"raw");m(this,ae);m(this,O);g(this,"routeIndex",0);g(this,"path");g(this,"bodyCache",{});m(this,q,e=>{const{bodyCache:t,raw:r}=this,s=t[e];if(s)return s;const o=Object.keys(t)[0];return o?t[o].then(a=>(o==="json"&&(a=JSON.stringify(a)),new Response(a)[e]())):t[e]=r[e]()});this.raw=e,this.path=t,f(this,O,r),f(this,ae,{})}param(e){return e?x(this,L,dt).call(this,e):x(this,L,ut).call(this)}query(e){return qt(this.url,e)}queries(e){return zt(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((r,s)=>{t[s]=r}),t}async parseBody(e){var t;return(t=this.bodyCache).parsedBody??(t.parsedBody=await Rt(this,e))}json(){return d(this,q).call(this,"text").then(e=>JSON.parse(e))}text(){return d(this,q).call(this,"text")}arrayBuffer(){return d(this,q).call(this,"arrayBuffer")}blob(){return d(this,q).call(this,"blob")}formData(){return d(this,q).call(this,"formData")}addValidatedData(e,t){d(this,ae)[e]=t}valid(e){return d(this,ae)[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[Ct](){return d(this,O)}get matchedRoutes(){return d(this,O)[0].map(([[,e]])=>e)}get routePath(){return d(this,O)[0].map(([[,e]])=>e)[this.routeIndex].path}},ae=new WeakMap,O=new WeakMap,L=new WeakSet,dt=function(e){const t=d(this,O)[0][this.routeIndex][1][e],r=x(this,L,De).call(this,t);return r?/\%/.test(r)?Ve(r):r:void 0},ut=function(){const e={},t=Object.keys(d(this,O)[0][this.routeIndex][1]);for(const r of t){const s=x(this,L,De).call(this,d(this,O)[0][this.routeIndex][1][r]);s&&typeof s=="string"&&(e[r]=/\%/.test(s)?Ve(s):s)}return e},De=function(e){return d(this,O)[1]?d(this,O)[1][e]:e},q=new WeakMap,Xe),Ut={Stringify:1},pt=async(e,t,r,s,o)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const a=e.callbacks;return a!=null&&a.length?(o?o[0]+=e:o=[e],Promise.all(a.map(l=>l({phase:t,buffer:o,context:s}))).then(l=>Promise.all(l.filter(Boolean).map(n=>pt(n,t,!1,s,o))).then(()=>o[0]))):Promise.resolve(e)},Gt="text/plain; charset=UTF-8",Me=(e,t)=>({"Content-Type":e,...t}),be,xe,I,ie,M,A,ve,ne,le,X,ye,we,z,re,Je,Vt=(Je=class{constructor(e,t){m(this,z);m(this,be);m(this,xe);g(this,"env",{});m(this,I);g(this,"finalized",!1);g(this,"error");m(this,ie);m(this,M);m(this,A);m(this,ve);m(this,ne);m(this,le);m(this,X);m(this,ye);m(this,we);g(this,"render",(...e)=>(d(this,ne)??f(this,ne,t=>this.html(t)),d(this,ne).call(this,...e)));g(this,"setLayout",e=>f(this,ve,e));g(this,"getLayout",()=>d(this,ve));g(this,"setRenderer",e=>{f(this,ne,e)});g(this,"header",(e,t,r)=>{this.finalized&&f(this,A,new Response(d(this,A).body,d(this,A)));const s=d(this,A)?d(this,A).headers:d(this,X)??f(this,X,new Headers);t===void 0?s.delete(e):r!=null&&r.append?s.append(e,t):s.set(e,t)});g(this,"status",e=>{f(this,ie,e)});g(this,"set",(e,t)=>{d(this,I)??f(this,I,new Map),d(this,I).set(e,t)});g(this,"get",e=>d(this,I)?d(this,I).get(e):void 0);g(this,"newResponse",(...e)=>x(this,z,re).call(this,...e));g(this,"body",(e,t,r)=>x(this,z,re).call(this,e,t,r));g(this,"text",(e,t,r)=>!d(this,X)&&!d(this,ie)&&!t&&!r&&!this.finalized?new Response(e):x(this,z,re).call(this,e,t,Me(Gt,r)));g(this,"json",(e,t,r)=>x(this,z,re).call(this,JSON.stringify(e),t,Me("application/json",r)));g(this,"html",(e,t,r)=>{const s=o=>x(this,z,re).call(this,o,t,Me("text/html; charset=UTF-8",r));return typeof e=="object"?pt(e,Ut.Stringify,!1,{}).then(s):s(e)});g(this,"redirect",(e,t)=>{const r=String(e);return this.header("Location",/[^\x00-\xFF]/.test(r)?encodeURI(r):r),this.newResponse(null,t??302)});g(this,"notFound",()=>(d(this,le)??f(this,le,()=>new Response),d(this,le).call(this,this)));f(this,be,e),t&&(f(this,M,t.executionCtx),this.env=t.env,f(this,le,t.notFoundHandler),f(this,we,t.path),f(this,ye,t.matchResult))}get req(){return d(this,xe)??f(this,xe,new ct(d(this,be),d(this,we),d(this,ye))),d(this,xe)}get event(){if(d(this,M)&&"respondWith"in d(this,M))return d(this,M);throw Error("This context has no FetchEvent")}get executionCtx(){if(d(this,M))return d(this,M);throw Error("This context has no ExecutionContext")}get res(){return d(this,A)||f(this,A,new Response(null,{headers:d(this,X)??f(this,X,new Headers)}))}set res(e){if(d(this,A)&&e){e=new Response(e.body,e);for(const[t,r]of d(this,A).headers.entries())if(t!=="content-type")if(t==="set-cookie"){const s=d(this,A).headers.getSetCookie();e.headers.delete("set-cookie");for(const o of s)e.headers.append("set-cookie",o)}else e.headers.set(t,r)}f(this,A,e),this.finalized=!0}get var(){return d(this,I)?Object.fromEntries(d(this,I)):{}}},be=new WeakMap,xe=new WeakMap,I=new WeakMap,ie=new WeakMap,M=new WeakMap,A=new WeakMap,ve=new WeakMap,ne=new WeakMap,le=new WeakMap,X=new WeakMap,ye=new WeakMap,we=new WeakMap,z=new WeakSet,re=function(e,t,r){const s=d(this,A)?new Headers(d(this,A).headers):d(this,X)??new Headers;if(typeof t=="object"&&"headers"in t){const a=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[i,l]of a)i.toLowerCase()==="set-cookie"?s.append(i,l):s.set(i,l)}if(r)for(const[a,i]of Object.entries(r))if(typeof i=="string")s.set(a,i);else{s.delete(a);for(const l of i)s.append(a,l)}const o=typeof t=="number"?t:(t==null?void 0:t.status)??d(this,ie);return new Response(e,{status:o,headers:s})},Je),E="ALL",Bt="all",Wt=["get","post","put","delete","options","patch"],ht="Can not add a route since the matcher is already built.",ft=class extends Error{},Kt="__COMPOSED_HANDLER",Xt=e=>e.text("404 Not Found",404),Be=(e,t)=>{if("getResponse"in e){const r=e.getResponse();return t.newResponse(r.body,r)}return console.error(e),t.text("Internal Server Error",500)},C,j,mt,R,W,ke,Ae,Ye,gt=(Ye=class{constructor(t={}){m(this,j);g(this,"get");g(this,"post");g(this,"put");g(this,"delete");g(this,"options");g(this,"patch");g(this,"all");g(this,"on");g(this,"use");g(this,"router");g(this,"getPath");g(this,"_basePath","/");m(this,C,"/");g(this,"routes",[]);m(this,R,Xt);g(this,"errorHandler",Be);g(this,"onError",t=>(this.errorHandler=t,this));g(this,"notFound",t=>(f(this,R,t),this));g(this,"fetch",(t,...r)=>x(this,j,Ae).call(this,t,r[1],r[0],t.method));g(this,"request",(t,r,s,o)=>t instanceof Request?this.fetch(r?new Request(t,r):t,s,o):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${se("/",t)}`,r),s,o)));g(this,"fire",()=>{addEventListener("fetch",t=>{t.respondWith(x(this,j,Ae).call(this,t.request,t,void 0,t.request.method))})});[...Wt,Bt].forEach(a=>{this[a]=(i,...l)=>(typeof i=="string"?f(this,C,i):x(this,j,W).call(this,a,d(this,C),i),l.forEach(n=>{x(this,j,W).call(this,a,d(this,C),n)}),this)}),this.on=(a,i,...l)=>{for(const n of[i].flat()){f(this,C,n);for(const c of[a].flat())l.map(u=>{x(this,j,W).call(this,c.toUpperCase(),d(this,C),u)})}return this},this.use=(a,...i)=>(typeof a=="string"?f(this,C,a):(f(this,C,"*"),i.unshift(a)),i.forEach(l=>{x(this,j,W).call(this,E,d(this,C),l)}),this);const{strict:s,...o}=t;Object.assign(this,o),this.getPath=s??!0?t.getPath??at:Ft}route(t,r){const s=this.basePath(t);return r.routes.map(o=>{var i;let a;r.errorHandler===Be?a=o.handler:(a=async(l,n)=>(await Ge([],r.errorHandler)(l,()=>o.handler(l,n))).res,a[Kt]=o.handler),x(i=s,j,W).call(i,o.method,o.path,a)}),this}basePath(t){const r=x(this,j,mt).call(this);return r._basePath=se(this._basePath,t),r}mount(t,r,s){let o,a;s&&(typeof s=="function"?a=s:(a=s.optionHandler,s.replaceRequest===!1?o=n=>n:o=s.replaceRequest));const i=a?n=>{const c=a(n);return Array.isArray(c)?c:[c]}:n=>{let c;try{c=n.executionCtx}catch{}return[n.env,c]};o||(o=(()=>{const n=se(this._basePath,t),c=n==="/"?0:n.length;return u=>{const p=new URL(u.url);return p.pathname=p.pathname.slice(c)||"/",new Request(p,u)}})());const l=async(n,c)=>{const u=await r(o(n.req.raw),...i(n));if(u)return u;await c()};return x(this,j,W).call(this,E,se(t,"*"),l),this}},C=new WeakMap,j=new WeakSet,mt=function(){const t=new gt({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,f(t,R,d(this,R)),t.routes=this.routes,t},R=new WeakMap,W=function(t,r,s){t=t.toUpperCase(),r=se(this._basePath,r);const o={basePath:this._basePath,path:r,method:t,handler:s};this.router.add(t,r,[s,o]),this.routes.push(o)},ke=function(t,r){if(t instanceof Error)return this.errorHandler(t,r);throw t},Ae=function(t,r,s,o){if(o==="HEAD")return(async()=>new Response(null,await x(this,j,Ae).call(this,t,r,s,"GET")))();const a=this.getPath(t,{env:s}),i=this.router.match(o,a),l=new Vt(t,{path:a,matchResult:i,env:s,executionCtx:r,notFoundHandler:d(this,R)});if(i[0].length===1){let c;try{c=i[0][0][0][0](l,async()=>{l.res=await d(this,R).call(this,l)})}catch(u){return x(this,j,ke).call(this,u,l)}return c instanceof Promise?c.then(u=>u||(l.finalized?l.res:d(this,R).call(this,l))).catch(u=>x(this,j,ke).call(this,u,l)):c??d(this,R).call(this,l)}const n=Ge(i[0],this.errorHandler,d(this,R));return(async()=>{try{const c=await n(l);if(!c.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return c.res}catch(c){return x(this,j,ke).call(this,c,l)}})()},Ye),Ce="[^/]+",fe=".*",ge="(?:|/.*)",oe=Symbol(),Jt=new Set(".\\+*[^]$()");function Yt(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===fe||e===ge?1:t===fe||t===ge?-1:e===Ce?1:t===Ce?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var J,Y,S,Qe,He=(Qe=class{constructor(){m(this,J);m(this,Y);m(this,S,Object.create(null))}insert(t,r,s,o,a){if(t.length===0){if(d(this,J)!==void 0)throw oe;if(a)return;f(this,J,r);return}const[i,...l]=t,n=i==="*"?l.length===0?["","",fe]:["","",Ce]:i==="/*"?["","",ge]:i.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let c;if(n){const u=n[1];let p=n[2]||Ce;if(u&&n[2]&&(p===".*"||(p=p.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(p))))throw oe;if(c=d(this,S)[p],!c){if(Object.keys(d(this,S)).some(h=>h!==fe&&h!==ge))throw oe;if(a)return;c=d(this,S)[p]=new He,u!==""&&f(c,Y,o.varIndex++)}!a&&u!==""&&s.push([u,d(c,Y)])}else if(c=d(this,S)[i],!c){if(Object.keys(d(this,S)).some(u=>u.length>1&&u!==fe&&u!==ge))throw oe;if(a)return;c=d(this,S)[i]=new He}c.insert(l,r,s,o,a)}buildRegExpStr(){const r=Object.keys(d(this,S)).sort(Yt).map(s=>{const o=d(this,S)[s];return(typeof d(o,Y)=="number"?`(${s})@${d(o,Y)}`:Jt.has(s)?`\\${s}`:s)+o.buildRegExpStr()});return typeof d(this,J)=="number"&&r.unshift(`#${d(this,J)}`),r.length===0?"":r.length===1?r[0]:"(?:"+r.join("|")+")"}},J=new WeakMap,Y=new WeakMap,S=new WeakMap,Qe),Re,Ee,Ze,Qt=(Ze=class{constructor(){m(this,Re,{varIndex:0});m(this,Ee,new He)}insert(e,t,r){const s=[],o=[];for(let i=0;;){let l=!1;if(e=e.replace(/\{[^}]+\}/g,n=>{const c=`@\\${i}`;return o[i]=[c,n],i++,l=!0,c}),!l)break}const a=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let i=o.length-1;i>=0;i--){const[l]=o[i];for(let n=a.length-1;n>=0;n--)if(a[n].indexOf(l)!==-1){a[n]=a[n].replace(l,o[i][1]);break}}return d(this,Ee).insert(a,t,s,d(this,Re),r),s}buildRegExp(){let e=d(this,Ee).buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const r=[],s=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(o,a,i)=>a!==void 0?(r[++t]=Number(a),"$()"):(i!==void 0&&(s[Number(i)]=++t),"")),[new RegExp(`^${e}`),r,s]}},Re=new WeakMap,Ee=new WeakMap,Ze),bt=[],Zt=[/^$/,[],Object.create(null)],Oe=Object.create(null);function xt(e){return Oe[e]??(Oe[e]=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,r)=>r?`\\${r}`:"(?:|/.*)")}$`))}function es(){Oe=Object.create(null)}function ts(e){var c;const t=new Qt,r=[];if(e.length===0)return Zt;const s=e.map(u=>[!/\*|\/:/.test(u[0]),...u]).sort(([u,p],[h,v])=>u?1:h?-1:p.length-v.length),o=Object.create(null);for(let u=0,p=-1,h=s.length;u<h;u++){const[v,w,b]=s[u];v?o[w]=[b.map(([k])=>[k,Object.create(null)]),bt]:p++;let y;try{y=t.insert(w,p,v)}catch(k){throw k===oe?new ft(w):k}v||(r[p]=b.map(([k,ee])=>{const ue=Object.create(null);for(ee-=1;ee>=0;ee--){const[_,_e]=y[ee];ue[_]=_e}return[k,ue]}))}const[a,i,l]=t.buildRegExp();for(let u=0,p=r.length;u<p;u++)for(let h=0,v=r[u].length;h<v;h++){const w=(c=r[u][h])==null?void 0:c[1];if(!w)continue;const b=Object.keys(w);for(let y=0,k=b.length;y<k;y++)w[b[y]]=l[w[b[y]]]}const n=[];for(const u in i)n[u]=r[i[u]];return[a,n,o]}function te(e,t){if(e){for(const r of Object.keys(e).sort((s,o)=>o.length-s.length))if(xt(r).test(t))return[...e[r]]}}var U,G,de,vt,yt,et,ss=(et=class{constructor(){m(this,de);g(this,"name","RegExpRouter");m(this,U);m(this,G);f(this,U,{[E]:Object.create(null)}),f(this,G,{[E]:Object.create(null)})}add(e,t,r){var l;const s=d(this,U),o=d(this,G);if(!s||!o)throw new Error(ht);s[e]||[s,o].forEach(n=>{n[e]=Object.create(null),Object.keys(n[E]).forEach(c=>{n[e][c]=[...n[E][c]]})}),t==="/*"&&(t="*");const a=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const n=xt(t);e===E?Object.keys(s).forEach(c=>{var u;(u=s[c])[t]||(u[t]=te(s[c],t)||te(s[E],t)||[])}):(l=s[e])[t]||(l[t]=te(s[e],t)||te(s[E],t)||[]),Object.keys(s).forEach(c=>{(e===E||e===c)&&Object.keys(s[c]).forEach(u=>{n.test(u)&&s[c][u].push([r,a])})}),Object.keys(o).forEach(c=>{(e===E||e===c)&&Object.keys(o[c]).forEach(u=>n.test(u)&&o[c][u].push([r,a]))});return}const i=it(t)||[t];for(let n=0,c=i.length;n<c;n++){const u=i[n];Object.keys(o).forEach(p=>{var h;(e===E||e===p)&&((h=o[p])[u]||(h[u]=[...te(s[p],u)||te(s[E],u)||[]]),o[p][u].push([r,a-c+n+1]))})}}match(e,t){es();const r=x(this,de,vt).call(this);return this.match=(s,o)=>{const a=r[s]||r[E],i=a[2][o];if(i)return i;const l=o.match(a[0]);if(!l)return[[],bt];const n=l.indexOf("",1);return[a[1][n],l]},this.match(e,t)}},U=new WeakMap,G=new WeakMap,de=new WeakSet,vt=function(){const e=Object.create(null);return Object.keys(d(this,G)).concat(Object.keys(d(this,U))).forEach(t=>{e[t]||(e[t]=x(this,de,yt).call(this,t))}),f(this,U,f(this,G,void 0)),e},yt=function(e){const t=[];let r=e===E;return[d(this,U),d(this,G)].forEach(s=>{const o=s[e]?Object.keys(s[e]).map(a=>[a,s[e][a]]):[];o.length!==0?(r||(r=!0),t.push(...o)):e!==E&&t.push(...Object.keys(s[E]).map(a=>[a,s[E][a]]))}),r?ts(t):null},et),V,D,tt,rs=(tt=class{constructor(e){g(this,"name","SmartRouter");m(this,V,[]);m(this,D,[]);f(this,V,e.routers)}add(e,t,r){if(!d(this,D))throw new Error(ht);d(this,D).push([e,t,r])}match(e,t){if(!d(this,D))throw new Error("Fatal error");const r=d(this,V),s=d(this,D),o=r.length;let a=0,i;for(;a<o;a++){const l=r[a];try{for(let n=0,c=s.length;n<c;n++)l.add(...s[n]);i=l.match(e,t)}catch(n){if(n instanceof ft)continue;throw n}this.match=l.match.bind(l),f(this,V,[l]),f(this,D,void 0);break}if(a===o)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,i}get activeRouter(){if(d(this,D)||d(this,V).length!==1)throw new Error("No active router has been determined yet.");return d(this,V)[0]}},V=new WeakMap,D=new WeakMap,tt),he=Object.create(null),B,P,Q,ce,T,H,K,st,wt=(st=class{constructor(e,t,r){m(this,H);m(this,B);m(this,P);m(this,Q);m(this,ce,0);m(this,T,he);if(f(this,P,r||Object.create(null)),f(this,B,[]),e&&t){const s=Object.create(null);s[e]={handler:t,possibleKeys:[],score:0},f(this,B,[s])}f(this,Q,[])}insert(e,t,r){f(this,ce,++Ue(this,ce)._);let s=this;const o=It(t),a=[];for(let i=0,l=o.length;i<l;i++){const n=o[i],c=o[i+1],u=Ht(n,c),p=Array.isArray(u)?u[0]:n;if(p in d(s,P)){s=d(s,P)[p],u&&a.push(u[1]);continue}d(s,P)[p]=new wt,u&&(d(s,Q).push(u),a.push(u[1])),s=d(s,P)[p]}return d(s,B).push({[e]:{handler:r,possibleKeys:a.filter((i,l,n)=>n.indexOf(i)===l),score:d(this,ce)}}),s}search(e,t){var l;const r=[];f(this,T,he);let o=[this];const a=ot(t),i=[];for(let n=0,c=a.length;n<c;n++){const u=a[n],p=n===c-1,h=[];for(let v=0,w=o.length;v<w;v++){const b=o[v],y=d(b,P)[u];y&&(f(y,T,d(b,T)),p?(d(y,P)["*"]&&r.push(...x(this,H,K).call(this,d(y,P)["*"],e,d(b,T))),r.push(...x(this,H,K).call(this,y,e,d(b,T)))):h.push(y));for(let k=0,ee=d(b,Q).length;k<ee;k++){const ue=d(b,Q)[k],_=d(b,T)===he?{}:{...d(b,T)};if(ue==="*"){const F=d(b,P)["*"];F&&(r.push(...x(this,H,K).call(this,F,e,d(b,T))),f(F,T,_),h.push(F));continue}const[_e,qe,pe]=ue;if(!u&&!(pe instanceof RegExp))continue;const N=d(b,P)[_e],kt=a.slice(n).join("/");if(pe instanceof RegExp){const F=pe.exec(kt);if(F){if(_[qe]=F[0],r.push(...x(this,H,K).call(this,N,e,d(b,T),_)),Object.keys(d(N,P)).length){f(N,T,_);const $e=((l=F[0].match(/\//))==null?void 0:l.length)??0;(i[$e]||(i[$e]=[])).push(N)}continue}}(pe===!0||pe.test(u))&&(_[qe]=u,p?(r.push(...x(this,H,K).call(this,N,e,_,d(b,T))),d(N,P)["*"]&&r.push(...x(this,H,K).call(this,d(N,P)["*"],e,_,d(b,T)))):(f(N,T,_),h.push(N)))}}o=h.concat(i.shift()??[])}return r.length>1&&r.sort((n,c)=>n.score-c.score),[r.map(({handler:n,params:c})=>[n,c])]}},B=new WeakMap,P=new WeakMap,Q=new WeakMap,ce=new WeakMap,T=new WeakMap,H=new WeakSet,K=function(e,t,r,s){const o=[];for(let a=0,i=d(e,B).length;a<i;a++){const l=d(e,B)[a],n=l[t]||l[E],c={};if(n!==void 0&&(n.params=Object.create(null),o.push(n),r!==he||s&&s!==he))for(let u=0,p=n.possibleKeys.length;u<p;u++){const h=n.possibleKeys[u],v=c[n.score];n.params[h]=s!=null&&s[h]&&!v?s[h]:r[h]??(s==null?void 0:s[h]),c[n.score]=!0}}return o},st),Z,rt,os=(rt=class{constructor(){g(this,"name","TrieRouter");m(this,Z);f(this,Z,new wt)}add(e,t,r){const s=it(t);if(s){for(let o=0,a=s.length;o<a;o++)d(this,Z).insert(e,s[o],r);return}d(this,Z).insert(e,t,r)}match(e,t){return d(this,Z).search(e,t)}},Z=new WeakMap,rt),Et=class extends gt{constructor(e={}){super(e),this.router=e.router??new rs({routers:[new ss,new os]})}},as=e=>{const r={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...e},s=(a=>typeof a=="string"?a==="*"?()=>a:i=>a===i?i:null:typeof a=="function"?a:i=>a.includes(i)?i:null)(r.origin),o=(a=>typeof a=="function"?a:Array.isArray(a)?()=>a:()=>[])(r.allowMethods);return async function(i,l){var u;function n(p,h){i.res.headers.set(p,h)}const c=s(i.req.header("origin")||"",i);if(c&&n("Access-Control-Allow-Origin",c),r.origin!=="*"){const p=i.req.header("Vary");p?n("Vary",p):n("Vary","Origin")}if(r.credentials&&n("Access-Control-Allow-Credentials","true"),(u=r.exposeHeaders)!=null&&u.length&&n("Access-Control-Expose-Headers",r.exposeHeaders.join(",")),i.req.method==="OPTIONS"){r.maxAge!=null&&n("Access-Control-Max-Age",r.maxAge.toString());const p=o(i.req.header("origin")||"",i);p.length&&n("Access-Control-Allow-Methods",p.join(","));let h=r.allowHeaders;if(!(h!=null&&h.length)){const v=i.req.header("Access-Control-Request-Headers");v&&(h=v.split(/\s*,\s*/))}return h!=null&&h.length&&(n("Access-Control-Allow-Headers",h.join(",")),i.res.headers.append("Vary","Access-Control-Request-Headers")),i.res.headers.delete("Content-Length"),i.res.headers.delete("Content-Type"),new Response(null,{headers:i.res.headers,status:204,statusText:"No Content"})}await l()}},is=/^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i,We=(e,t=ls)=>{const r=/\.([a-zA-Z0-9]+?)$/,s=e.match(r);if(!s)return;let o=t[s[1]];return o&&o.startsWith("text")&&(o+="; charset=utf-8"),o},ns={aac:"audio/aac",avi:"video/x-msvideo",avif:"image/avif",av1:"video/av1",bin:"application/octet-stream",bmp:"image/bmp",css:"text/css",csv:"text/csv",eot:"application/vnd.ms-fontobject",epub:"application/epub+zip",gif:"image/gif",gz:"application/gzip",htm:"text/html",html:"text/html",ico:"image/x-icon",ics:"text/calendar",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",jsonld:"application/ld+json",map:"application/json",mid:"audio/x-midi",midi:"audio/x-midi",mjs:"text/javascript",mp3:"audio/mpeg",mp4:"video/mp4",mpeg:"video/mpeg",oga:"audio/ogg",ogv:"video/ogg",ogx:"application/ogg",opus:"audio/opus",otf:"font/otf",pdf:"application/pdf",png:"image/png",rtf:"application/rtf",svg:"image/svg+xml",tif:"image/tiff",tiff:"image/tiff",ts:"video/mp2t",ttf:"font/ttf",txt:"text/plain",wasm:"application/wasm",webm:"video/webm",weba:"audio/webm",webmanifest:"application/manifest+json",webp:"image/webp",woff:"font/woff",woff2:"font/woff2",xhtml:"application/xhtml+xml",xml:"application/xml",zip:"application/zip","3gp":"video/3gpp","3g2":"video/3gpp2",gltf:"model/gltf+json",glb:"model/gltf-binary"},ls=ns,cs=(...e)=>{let t=e.filter(o=>o!=="").join("/");t=t.replace(new RegExp("(?<=\\/)\\/+","g"),"");const r=t.split("/"),s=[];for(const o of r)o===".."&&s.length>0&&s.at(-1)!==".."?s.pop():o!=="."&&s.push(o);return s.join("/")||"."},jt={br:".br",zstd:".zst",gzip:".gz"},ds=Object.keys(jt),us="index.html",ps=e=>{const t=e.root??"./",r=e.path,s=e.join??cs;return async(o,a)=>{var u,p,h,v;if(o.finalized)return a();let i;if(e.path)i=e.path;else try{if(i=decodeURIComponent(o.req.path),/(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(i))throw new Error}catch{return await((u=e.onNotFound)==null?void 0:u.call(e,o.req.path,o)),a()}let l=s(t,!r&&e.rewriteRequestPath?e.rewriteRequestPath(i):i);e.isDir&&await e.isDir(l)&&(l=s(l,us));const n=e.getContent;let c=await n(l,o);if(c instanceof Response)return o.newResponse(c.body,c);if(c){const w=e.mimes&&We(l,e.mimes)||We(l);if(o.header("Content-Type",w||"application/octet-stream"),e.precompressed&&(!w||is.test(w))){const b=new Set((p=o.req.header("Accept-Encoding"))==null?void 0:p.split(",").map(y=>y.trim()));for(const y of ds){if(!b.has(y))continue;const k=await n(l+jt[y],o);if(k){c=k,o.header("Content-Encoding",y),o.header("Vary","Accept-Encoding",{append:!0});break}}}return await((h=e.onFound)==null?void 0:h.call(e,l,o)),o.body(c)}await((v=e.onNotFound)==null?void 0:v.call(e,l,o)),await a()}},hs=async(e,t)=>{let r;t&&t.manifest?typeof t.manifest=="string"?r=JSON.parse(t.manifest):r=t.manifest:typeof __STATIC_CONTENT_MANIFEST=="string"?r=JSON.parse(__STATIC_CONTENT_MANIFEST):r=__STATIC_CONTENT_MANIFEST;let s;t&&t.namespace?s=t.namespace:s=__STATIC_CONTENT;const o=r[e]||e;if(!o)return null;const a=await s.get(o,{type:"stream"});return a||null},fs=e=>async function(r,s){return ps({...e,getContent:async a=>hs(a,{manifest:e.manifest,namespace:e.namespace?e.namespace:r.env?r.env.__STATIC_CONTENT:void 0})})(r,s)},gs=e=>fs(e);const $=new Et;$.use("/api/*",as());$.use("/static/*",gs({root:"./public"}));const Pe=new Map;function je(e,t=100,r=6e4){const s=Date.now(),o=s-r;Pe.has(e)||Pe.set(e,[]);const i=Pe.get(e).filter(l=>l>o);return i.length>=t?!1:(i.push(s),Pe.set(e,i),!0)}async function Se(e,t,r,s="GET",o){const a=`https://${e}.myshopify.com/admin/api/2024-01/${r}`,l={method:s,headers:{"X-Shopify-Access-Token":t,"Content-Type":"application/json"}};o&&(s==="POST"||s==="PUT")&&(l.body=JSON.stringify(o));const n=await fetch(a,l);if(!n.ok){const u=await n.text();throw new Error(`Shopify API error: ${n.status} - ${u}`)}return await n.json()}function Fe(e){if(!e)return"";const t=e.split(",");for(const r of t)if(r.includes('rel="next"')){const s=r.split(";")[0].trim();if(s.startsWith("<")&&s.endsWith(">"))return s.slice(1,-1)}return""}async function me(e,t,r){let s=[],o=`https://${e}.myshopify.com/admin/api/2024-01/products.json?limit=250&fields=id,title,body_html,vendor,product_type,created_at,updated_at,published_at,tags,status,variants,options,images,image`;for(console.log("🚀 USANDO LÓGICA DO SEU SCRIPT PYTHON - LINK HEADER PAGINATION");o;){console.log(`🔍 Fetching: ${o}`);try{const i=await fetch(o,{method:"GET",headers:{"X-Shopify-Access-Token":t,"Content-Type":"application/json"}});if(!i.ok){const u=await i.text();throw new Error(`Shopify API error: ${i.status} - ${u}`)}const n=(await i.json()).products||[];if(console.log(`📦 Received ${n.length} products... Total so far: ${s.length+n.length}`),n.length===0){console.log("🛑 No products in response, ending pagination");break}s=s.concat(n);const c=i.headers.get("Link")||"";o=Fe(c),console.log(o?`➡️ Next page found: ${o}`:"✅ No more pages, pagination complete")}catch(a){console.error("❌ Error in pagination:",a);break}}return console.log(`🎉 PAGINATION COMPLETE: ${s.length} total products found`),s}async function Tt(e,t){let r=[];const s=["custom_collections","smart_collections"];console.log("🚀 BUSCANDO COLEÇÕES - MESMA LÓGICA DO PYTHON");for(const o of s){let a=`https://${e}.myshopify.com/admin/api/2024-01/${o}.json?limit=250`;for(console.log(`🔍 Fetching ${o}...`);a;)try{const l=await fetch(a,{method:"GET",headers:{"X-Shopify-Access-Token":t,"Content-Type":"application/json"}});if(!l.ok){console.log(`Error fetching ${o}: ${l.status}`);break}const c=(await l.json())[o]||[];if(console.log(`📦 Found ${c.length} ${o}`),c.length===0)break;r=r.concat(c);const u=l.headers.get("Link")||"";a=Fe(u)}catch(i){console.error(`Error fetching ${o}:`,i);break}}return console.log(`🎉 TOTAL COLLECTIONS: ${r.length}`),r}async function ms(e,t,r){let s=[],o=`https://${e}.myshopify.com/admin/api/2024-01/collections/${r}/products.json?limit=250&fields=id`;for(;o;)try{const a=await fetch(o,{method:"GET",headers:{"X-Shopify-Access-Token":t,"Content-Type":"application/json"}});if(!a.ok)break;const l=(await a.json()).products||[];s=s.concat(l);const n=a.headers.get("Link")||"";o=Fe(n)}catch(a){console.log(`❌ Error in collection ${r} pagination:`,a);break}return s}async function bs(e,t,r){const s={};console.log("🔍 MAPEANDO PRODUTOS POR COLEÇÃO COM PAGINAÇÃO COMPLETA...");for(const o of r)try{console.log(`🔍 Buscando produtos da coleção "${o.title}"...`);const a=await ms(e,t,o.id);a.forEach(i=>{s[i.id]||(s[i.id]=[]),s[i.id].push(o.id.toString())}),console.log(`✅ Coleção "${o.title}": ${a.length} produtos (com paginação completa)`)}catch(a){console.log(`❌ Erro na coleção ${o.title}:`,a)}return console.log(`✅ Mapeamento completo: ${Object.keys(s).length} produtos mapeados`),s}async function xs(e,t,r,s){const o=[];for(let a=0;a<r.length;a++){const i=r[a];try{const l={id:i.id};s.title&&s.title!==i.title&&(l.title=s.title),s.description!==void 0&&s.description!==i.body_html&&(l.body_html=s.description),s.vendor&&s.vendor!==i.vendor&&(l.vendor=s.vendor),s.productType&&s.productType!==i.product_type&&(l.product_type=s.productType),s.tags!==void 0&&(l.tags=s.tags),s.status&&s.status!==i.status&&(l.status=s.status),(s.seoTitle||s.seoDescription)&&(l.metafields_global_title_tag=s.seoTitle||i.metafields_global_title_tag,l.metafields_global_description_tag=s.seoDescription||i.metafields_global_description_tag),(s.price||s.comparePrice)&&(l.variants=i.variants.map(c=>({id:c.id,price:s.price||c.price,compare_at_price:s.comparePrice||c.compare_at_price}))),s.inventory!==void 0&&(l.variants=i.variants.map(c=>({id:c.id,inventory_quantity:s.inventory})));const n=await Se(e,t,`products/${i.id}.json`,"PUT",{product:l});o.push({id:i.id,success:!0,data:n.product}),a<r.length-1&&await new Promise(c=>setTimeout(c,200))}catch(l){o.push({id:i.id,success:!1,error:l instanceof Error?l.message:"Unknown error"})}}return o}$.post("/api/test-connection",async e=>{try{const{shop:t,accessToken:r}=await e.req.json();if(!t||!r)return e.json({error:"Parâmetros obrigatórios: shop e accessToken"},400);const s=await Se(t,r,"shop.json");return e.json({success:!0,shop:s.shop.name,domain:s.shop.domain,plan:s.shop.plan_name})}catch(t){return e.json({error:"Falha na conexão: "+(t instanceof Error?t.message:"Erro desconhecido")},401)}});$.post("/api/products",async e=>{try{const{shop:t,accessToken:r}=await e.req.json();if(!t||!r)return e.json({error:"Parâmetros obrigatórios: shop e accessToken"},400);if(!je(`products:${t}`,50))return e.json({error:"Rate limit exceeded"},429);console.log("Loading ALL products with working pagination logic");const s=await me(t,r);console.log(`✅ Successfully loaded ${s.length} total products`),console.log("🔍 Loading collections for product mapping...");const o=await Tt(t,r);console.log(`✅ Loaded ${o.length} collections`);const a=await bs(t,r,o),i=s.map(l=>({...l,collection_ids:a[l.id]||[]}));return i.length>0&&console.log("✅ First product with collections:",{id:i[0].id,title:i[0].title,collection_ids:i[0].collection_ids}),e.json({products:i,total:i.length})}catch(t){return e.json({error:"Erro ao buscar produtos: "+(t instanceof Error?t.message:"Erro desconhecido")},500)}});$.post("/api/collections",async e=>{try{const{shop:t,accessToken:r}=await e.req.json();if(!t||!r)return e.json({error:"Parâmetros obrigatórios: shop e accessToken"},400);if(!je(`collections:${t}`,30))return e.json({error:"Rate limit exceeded"},429);const s=await Tt(t,r);return e.json({collections:s})}catch(t){return e.json({error:"Erro ao buscar coleções: "+(t instanceof Error?t.message:"Erro desconhecido")},500)}});$.post("/api/bulk-update",async e=>{try{const{shop:t,accessToken:r,productIds:s,updates:o}=await e.req.json();if(!t||!r||!s||!o)return e.json({error:"Parâmetros obrigatórios: shop, accessToken, productIds, updates"},400);if(!je(`bulk:${t}`,10,3e5))return e.json({error:"Rate limit exceeded for bulk operations"},429);const a=[];for(const l of s)try{const n=await Se(t,r,`products/${l}.json`);a.push(n.product)}catch(n){console.error(`Error fetching product ${l}:`,n)}const i=await xs(t,r,a,o);return e.json({results:i,successful:i.filter(l=>l.success).length,failed:i.filter(l=>!l.success).length})}catch(t){return e.json({error:"Erro na atualização em massa: "+(t instanceof Error?t.message:"Erro desconhecido")},500)}});$.post("/api/analyze-variants",async e=>{try{const{shop:t,accessToken:r,scope:s,selectedProductIds:o}=await e.req.json();if(!t||!r)return e.json({error:"Parâmetros obrigatórios: shop e accessToken"},400);if(s==="selected"&&(!o||o.length===0))return e.json({error:'Para escopo "selected", selectedProductIds é obrigatório'},400);if(!je(`analyze-variants:${t}`,10,6e4))return e.json({error:"Rate limit exceeded for variant analysis"},429);let a=[];s==="selected"?(a=(await me(t,r,250)).filter(c=>o.includes(c.id.toString())||o.includes(c.id)),console.log(`🎯 Analisando variantes de ${a.length} produtos selecionados`)):(a=await me(t,r,250),console.log(`🌐 Analisando variantes de todos os ${a.length} produtos`));const i={},l={};return a.forEach(n=>{n.options&&n.options.length>0&&(n.options.forEach(c=>{l[c.name]||(l[c.name]={name:c.name,values:new Set,productCount:0,products:[]}),l[c.name].productCount++,l[c.name].products.push({id:n.id,title:n.title}),c.values&&c.values.forEach(u=>{l[c.name].values.add(u)})}),n.variants&&n.variants.length>0&&n.variants.forEach(c=>{const u=`${n.id}_${c.id}`;i[u]={productId:n.id,productTitle:n.title,variantId:c.id,variantTitle:c.title,price:c.price,option1:c.option1,option2:c.option2,option3:c.option3,sku:c.sku}}))}),Object.keys(l).forEach(n=>{l[n].values=Array.from(l[n].values),l[n].products=l[n].products.slice(0,10)}),e.json({success:!0,totalProducts:a.length,optionStats:l,variantCount:Object.keys(i).length,sampleVariants:Object.values(i).slice(0,50)})}catch(t){return e.json({error:"Erro na análise de variantes: "+(t instanceof Error?t.message:"Erro desconhecido")},500)}});$.post("/api/bulk-update-variant-titles",async e=>{var t;try{const{shop:r,accessToken:s,titleMappings:o,scope:a,selectedProductIds:i}=await e.req.json();if(!r||!s||!o||o.length===0)return e.json({error:"Parâmetros obrigatórios: shop, accessToken, titleMappings"},400);if(a==="selected"&&(!i||i.length===0))return e.json({error:'Para escopo "selected", selectedProductIds é obrigatório'},400);if(!je(`bulk-variants:${r}`,5,3e5))return e.json({error:"Rate limit exceeded for bulk variant operations"},429);let l=[];a==="all"?l=await me(r,s,250):l=(await me(r,s,250)).filter(h=>i.includes(h.id.toString())||i.includes(h.id));let n=0,c=0;const u=[];console.log(`🎯 Processando ${l.length} produtos (escopo: ${a})`);for(const p of l)try{let h=!1;const v=((t=p.options)==null?void 0:t.map(w=>{const b=o.find(y=>y.currentTitle.toLowerCase()===w.name.toLowerCase());return b&&b.newTitle&&b.newTitle!==w.name?(h=!0,{...w,name:b.newTitle}):w}))||[];if(h&&v.length>0){const w=await Se(r,s,`products/${p.id}.json`,"PUT",{product:{id:p.id,options:v}});n++,u.push({productId:p.id,title:p.title,success:!0,changes:v.map(b=>b.name).join(", ")}),await new Promise(b=>setTimeout(b,500))}}catch(h){c++,u.push({productId:p.id,title:p.title,success:!1,error:h instanceof Error?h.message:"Erro desconhecido"})}return e.json({success:!0,totalProducts:allProducts.length,updatedCount:n,failedCount:c,results:u.slice(0,50)})}catch(r){return e.json({error:"Erro na atualização em massa de títulos de variantes: "+(r instanceof Error?r.message:"Erro desconhecido")},500)}});$.get("/",e=>e.html(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Infinity Bulk Manager - Gerenciamento em Massa de Produtos Shopify</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
            .checkbox-row:hover { background-color: #f3f4f6; }
            .checkbox-large { transform: scale(1.2); }
            .product-row { cursor: pointer; transition: all 0.2s; }
            .product-row.selected { background-color: #dbeafe; }
            .loading-spinner { animation: spin 1s linear infinite; }
            @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        </style>
    </head>
    <body class="bg-gray-100 min-h-screen">
        <div class="container mx-auto px-4 py-8">
            <!-- Header -->
            <div class="text-center py-8 mb-8">
                <div class="flex items-center justify-center mb-4">
                    <i class="fas fa-infinity text-green-600 text-4xl mr-3"></i>
                    <h1 class="text-4xl font-bold text-gray-800">Infinity Bulk Manager</h1>
                </div>
                <div class="text-gray-600 text-lg max-w-2xl mx-auto">
                    <p class="mb-2">Gerencie produtos da sua loja Shopify em massa com poder infinito.</p>
                    <p>Atualize preços, edite variantes e títulos de opções em milhares de produtos.</p>
                </div>
                <div id="connection-status" class="mt-4 hidden">
                    <span class="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                        <i class="fas fa-check-circle mr-2"></i>
                        Conectado
                    </span>
                </div>
            </div>

            <!-- Connection Form -->
            <div id="connection-form" class="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 class="text-xl font-bold text-gray-800 mb-4">
                    <i class="fas fa-plug mr-2"></i>
                    Conectar à sua loja Shopify
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Nome da Loja (sem .myshopify.com)</label>
                        <input type="text" id="shop-name" placeholder="exemplo: minhaloja" 
                               class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Access Token</label>
                        <input type="password" id="access-token" placeholder="shpat_..."
                               class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    </div>
                </div>
                <button id="connect-btn" class="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    <i class="fas fa-plug mr-2"></i>
                    Conectar
                </button>
                <div id="connection-error" class="mt-4 p-3 bg-red-100 border border-red-300 rounded-lg text-red-700 hidden"></div>
            </div>

            <!-- Main Interface (hidden until connected) -->
            <div id="main-interface" class="hidden">
                <!-- Main Controls -->
                <div class="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div class="flex flex-wrap items-center justify-center gap-2 mb-4">
                        <button id="load-products-btn" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                            <i class="fas fa-sync-alt mr-2"></i>
                            Carregar Todos os Produtos
                        </button>
                        <button id="select-all-btn" class="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                            <i class="fas fa-check-square mr-1"></i>
                            Selecionar Todos
                        </button>
                        <button id="clear-selection-btn" class="bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm">
                            <i class="fas fa-square mr-1"></i>
                            Limpar Seleção
                        </button>
                        <button id="bulk-edit-btn" class="bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm" disabled>
                            <i class="fas fa-edit mr-1"></i>
                            Edição em Massa
                        </button>
                        <button id="variant-titles-btn" class="bg-orange-600 text-white px-3 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm">
                            <i class="fas fa-cogs mr-1"></i>
                            Variantes e Opções
                        </button>
                    </div>
                    <div id="selection-info" class="text-sm text-gray-600"></div>
                </div>

                <!-- Products Table -->
                <div class="bg-white rounded-lg shadow-md overflow-hidden">
                    <div class="p-4 border-b border-gray-200">
                        <h3 class="text-lg font-bold text-gray-800">
                            <i class="fas fa-boxes mr-2"></i>
                            Todos os Produtos
                        </h3>
                        <div id="products-count" class="text-sm text-gray-600 mt-1"></div>
                    </div>
                    <div id="loading" class="p-8 text-center hidden">
                        <i class="fas fa-spinner loading-spinner text-blue-600 text-2xl"></i>
                        <p class="text-gray-600 mt-2">Carregando produtos...</p>
                    </div>
                    <div id="products-container" class="max-h-96 overflow-y-auto">
                        <table class="w-full">
                            <thead class="bg-gray-50 sticky top-0">
                                <tr>
                                    <th class="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                                        <input type="checkbox" id="select-all-checkbox" class="checkbox-large">
                                    </th>
                                    <th class="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                                    <th class="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
                                    <th class="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estoque</th>
                                    <th class="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th class="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Variantes</th>
                                </tr>
                            </thead>
                            <tbody id="products-list" class="divide-y divide-gray-200">
                                <!-- Products will be loaded here -->
                            </tbody>
                        </table>
                    </div>
                    
                    <!-- Filtro de Coleções - POSICIONADO EMBAIXO COMO COMBINADO -->
                    <div id="collections-filter-section" class="border-t border-gray-200 p-4 bg-gray-50 hidden">
                        <div class="flex items-center justify-between gap-4">
                            <div class="flex items-center gap-3">
                                <i class="fas fa-filter text-gray-600"></i>
                                <label class="text-sm font-medium text-gray-700">Filtrar por coleção:</label>
                                <select id="collection-filter" class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm min-w-64">
                                    <option value="">📦 Todas as coleções</option>
                                </select>
                            </div>
                            <div id="filter-info" class="text-xs text-gray-600"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Bulk Edit Modal -->
            <div id="bulk-modal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50">
                <div class="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-screen overflow-y-auto">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="text-2xl font-bold text-gray-800">
                            <i class="fas fa-edit mr-2"></i>
                            Edição em Massa
                        </h3>
                        <div class="flex items-center space-x-4">
                            <!-- Botões duplicados do rodapé (cópia exata) -->
                            <button type="button" id="cancel-bulk-top" class="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors">
                                Cancelar
                            </button>
                            <button type="submit" id="apply-bulk-top" class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                                <i class="fas fa-save mr-2"></i>
                                Aplicar Alterações
                            </button>
                            <button id="close-modal" class="text-gray-500 hover:text-gray-700 ml-2">
                                <i class="fas fa-times text-xl"></i>
                            </button>
                        </div>
                    </div>
                    
                    <form id="bulk-edit-form" class="space-y-6">
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <!-- Basic Information -->
                            <div class="space-y-4">
                                <h4 class="text-lg font-semibold text-gray-800 border-b pb-2">Informações Básicas</h4>
                                
                                <div>
                                    <label class="flex items-center mb-2">
                                        <input type="checkbox" id="enable-title" class="mr-2">
                                        <span class="font-medium text-gray-700">Título do Produto</span>
                                    </label>
                                    <input type="text" id="bulk-title" class="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-100" disabled>
                                </div>
                                
                                <div>
                                    <label class="flex items-center mb-2">
                                        <input type="checkbox" id="enable-description" class="mr-2">
                                        <span class="font-medium text-gray-700">Descrição</span>
                                    </label>
                                    <textarea id="bulk-description" rows="4" class="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-100" disabled></textarea>
                                </div>
                                
                                <div>
                                    <label class="flex items-center mb-2">
                                        <input type="checkbox" id="enable-vendor" class="mr-2">
                                        <span class="font-medium text-gray-700">Fornecedor</span>
                                    </label>
                                    <input type="text" id="bulk-vendor" class="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-100" disabled>
                                </div>
                                
                                <div>
                                    <label class="flex items-center mb-2">
                                        <input type="checkbox" id="enable-product-type" class="mr-2">
                                        <span class="font-medium text-gray-700">Tipo de Produto</span>
                                    </label>
                                    <input type="text" id="bulk-product-type" class="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-100" disabled>
                                </div>
                                
                                <div>
                                    <label class="flex items-center mb-2">
                                        <input type="checkbox" id="enable-tags" class="mr-2">
                                        <span class="font-medium text-gray-700">Tags (separadas por vírgula)</span>
                                    </label>
                                    <input type="text" id="bulk-tags" class="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-100" disabled>
                                </div>
                                
                                <div>
                                    <label class="flex items-center mb-2">
                                        <input type="checkbox" id="enable-status" class="mr-2">
                                        <span class="font-medium text-gray-700">Status</span>
                                    </label>
                                    <select id="bulk-status" class="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-100" disabled>
                                        <option value="active">Ativo</option>
                                        <option value="draft">Rascunho</option>
                                        <option value="archived">Arquivado</option>
                                    </select>
                                </div>
                            </div>
                            
                            <!-- Pricing and Inventory -->
                            <div class="space-y-4">
                                <h4 class="text-lg font-semibold text-gray-800 border-b pb-2">Preços e Estoque</h4>
                                
                                <div>
                                    <label class="flex items-center mb-2">
                                        <input type="checkbox" id="enable-price" class="mr-2">
                                        <span class="font-medium text-gray-700">Preço</span>
                                    </label>
                                    <input type="number" id="bulk-price" step="0.01" class="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-100" disabled>
                                </div>
                                
                                <div>
                                    <label class="flex items-center mb-2">
                                        <input type="checkbox" id="enable-compare-price" class="mr-2">
                                        <span class="font-medium text-gray-700">Preço de Comparação</span>
                                    </label>
                                    <input type="number" id="bulk-compare-price" step="0.01" class="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-100" disabled>
                                </div>
                                
                                <div>
                                    <label class="flex items-center mb-2">
                                        <input type="checkbox" id="enable-inventory" class="mr-2">
                                        <span class="font-medium text-gray-700">Quantidade em Estoque</span>
                                    </label>
                                    <input type="number" id="bulk-inventory" class="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-100" disabled>
                                </div>
                                
                                <div>
                                    <label class="flex items-center mb-2">
                                        <input type="checkbox" id="enable-sku" class="mr-2">
                                        <span class="font-medium text-gray-700">SKU</span>
                                    </label>
                                    <input type="text" id="bulk-sku" class="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-100" disabled>
                                </div>
                                
                                <div>
                                    <label class="flex items-center mb-2">
                                        <input type="checkbox" id="enable-weight" class="mr-2">
                                        <span class="font-medium text-gray-700">Peso (kg)</span>
                                    </label>
                                    <input type="number" id="bulk-weight" step="0.001" class="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-100" disabled>
                                </div>
                                
                                <div>
                                    <label class="flex items-center mb-2">
                                        <input type="checkbox" id="enable-track-inventory" class="mr-2">
                                        <span class="font-medium text-gray-700">Rastrear Estoque</span>
                                    </label>
                                    <select id="bulk-track-inventory" class="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-100" disabled>
                                        <option value="true">Sim</option>
                                        <option value="false">Não</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <!-- SEO Section -->
                        <div class="border-t pt-6">
                            <h4 class="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">SEO</h4>
                            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <div>
                                    <label class="flex items-center mb-2">
                                        <input type="checkbox" id="enable-seo-title" class="mr-2">
                                        <span class="font-medium text-gray-700">Título SEO</span>
                                    </label>
                                    <input type="text" id="bulk-seo-title" class="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-100" disabled>
                                </div>
                                
                                <div>
                                    <label class="flex items-center mb-2">
                                        <input type="checkbox" id="enable-seo-description" class="mr-2">
                                        <span class="font-medium text-gray-700">Descrição SEO</span>
                                    </label>
                                    <textarea id="bulk-seo-description" rows="3" class="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-100" disabled></textarea>
                                </div>
                            </div>
                        </div>
                        
                        <div class="flex justify-end space-x-4 border-t pt-6">
                            <button type="button" id="cancel-bulk" class="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors">
                                Cancelar
                            </button>
                            <button type="submit" id="apply-bulk" class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                                <i class="fas fa-save mr-2"></i>
                                Aplicar Alterações
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <!-- Advanced Variant Management Modal -->
            <div id="variant-titles-modal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50">
                <div class="bg-white rounded-lg p-6 w-full max-w-6xl mx-4 max-h-screen overflow-y-auto">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="text-2xl font-bold text-gray-800">
                            <i class="fas fa-cogs mr-2"></i>
                            Variantes e Opções - Gerenciamento Avançado
                        </h3>
                        <button id="close-variant-titles-modal" class="text-gray-500 hover:text-gray-700">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h4 class="font-bold text-blue-800 mb-2">
                                <i class="fas fa-edit mr-2"></i>Renomear Títulos de Opções
                            </h4>
                            <p class="text-blue-700 text-sm mb-3">
                                Altere os nomes das opções (ex: "Size" → "Tamanho") em todos os produtos.
                            </p>
                            
                            <!-- Seletor de Escopo para Carregamento -->
                            <div class="mb-4">
                                <h5 class="text-sm font-medium text-blue-800 mb-2">Carregar variantes de:</h5>
                                <div class="space-y-2">
                                    <label class="flex items-center text-sm">
                                        <input type="radio" name="load-scope" value="all" id="load-scope-all" class="mr-2" checked>
                                        <span>Todos os produtos da loja</span>
                                    </label>
                                    <label class="flex items-center text-sm">
                                        <input type="radio" name="load-scope" value="selected" id="load-scope-selected" class="mr-2">
                                        <span id="load-scope-selected-text">Apenas produtos selecionados (0 produtos)</span>
                                    </label>
                                </div>
                            </div>
                            
                            <button id="load-variant-data-btn" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
                                <i class="fas fa-search mr-2"></i>
                                Carregar Variantes Existentes
                            </button>
                        </div>
                        
                        <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                            <h4 class="font-bold text-green-800 mb-2">
                                <i class="fas fa-dollar-sign mr-2"></i>Editar Valores e Preços
                            </h4>
                            <p class="text-green-700 text-sm mb-3">
                                Altere valores das opções e adicione preços extras por variante.
                            </p>
                            <div class="text-xs text-green-600">
                                Disponível após carregar variantes existentes
                            </div>
                        </div>
                    </div>
                    
                    <div id="loading-variants" class="text-center py-8 hidden">
                        <i class="fas fa-spinner loading-spinner text-blue-600 text-2xl"></i>
                        <p class="text-gray-600 mt-2">Analisando variantes dos produtos...</p>
                    </div>
                    
                    <div id="variant-data-container" class="hidden">
                        <!-- Tab Navigation -->
                        <div class="flex border-b border-gray-200 mb-6">
                            <button id="tab-titles" class="px-4 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600 bg-blue-50">
                                <i class="fas fa-tags mr-2"></i>Títulos das Opções
                            </button>
                            <button id="tab-values" class="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                                <i class="fas fa-list mr-2"></i>Valores e Preços
                            </button>
                        </div>
                        
                        <!-- Titles Tab -->
                        <div id="content-titles" class="space-y-4">
                            <div id="existing-options-list" class="space-y-3">
                                <!-- Will be populated with existing options -->
                            </div>
                        </div>
                        
                        <!-- Values Tab -->
                        <div id="content-values" class="hidden space-y-4">
                            <div id="existing-values-list" class="space-y-4">
                                <!-- Will be populated with existing values and price options -->
                            </div>
                        </div>
                    </div>
                    
                    <div class="border-t pt-6 mt-6">
                        <!-- Seletor de Escopo das Alterações -->
                        <div class="mb-4">
                            <h4 class="text-md font-semibold text-gray-800 mb-3">
                                <i class="fas fa-target mr-2"></i>Escopo das Alterações
                            </h4>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <label class="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                    <input type="radio" name="variant-scope" value="all" id="scope-all" class="mr-3" checked>
                                    <div>
                                        <div class="font-medium text-gray-800">Todos os Produtos</div>
                                        <div class="text-sm text-gray-600">Aplicar a todos os produtos da loja que possuem as opções especificadas</div>
                                    </div>
                                </label>
                                <label class="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                    <input type="radio" name="variant-scope" value="selected" id="scope-selected" class="mr-3">
                                    <div>
                                        <div class="font-medium text-gray-800">Produtos Selecionados</div>
                                        <div class="text-sm text-gray-600" id="selected-count-display">Aplicar apenas aos produtos selecionados na tabela</div>
                                    </div>
                                </label>
                            </div>
                        </div>
                        
                        <div class="flex justify-between items-center">
                            <div class="text-sm text-gray-600" id="scope-info">
                                <i class="fas fa-info-circle text-blue-500 mr-2"></i>
                                <span id="scope-info-text">As alterações serão aplicadas a todos os produtos que possuem as opções especificadas</span>
                            </div>
                            <div class="flex space-x-4">
                                <button id="cancel-variant-titles" class="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors">
                                    Cancelar
                                </button>
                                <button id="apply-variant-changes" class="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors hidden">
                                    <i class="fas fa-magic mr-2"></i>
                                    Aplicar Alterações
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Results Modal -->
            <div id="results-modal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50">
                <div class="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-screen overflow-y-auto">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="text-xl font-bold text-gray-800">
                            <i class="fas fa-chart-bar mr-2"></i>
                            Resultados da Atualização em Massa
                        </h3>
                        <button id="close-results-modal" class="text-gray-500 hover:text-gray-700">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    <div id="results-content">
                        <!-- Results will be shown here -->
                    </div>
                </div>
            </div>
        </div>

        <script src="/static/app.js"><\/script>
    </body>
    </html>
  `));const Ke=new Et,vs=Object.assign({"/src/index.tsx":$});let Pt=!1;for(const[,e]of Object.entries(vs))e&&(Ke.route("/",e),Ke.notFound(e.notFoundHandler),Pt=!0);if(!Pt)throw new Error("Can't import modules from ['/src/index.tsx','/app/server.ts']");export{Ke as default};
