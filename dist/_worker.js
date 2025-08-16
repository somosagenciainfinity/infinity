var At=Object.defineProperty;var Ue=e=>{throw TypeError(e)};var Ot=(e,t,r)=>t in e?At(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var g=(e,t,r)=>Ot(e,typeof t!="symbol"?t+"":t,r),Ne=(e,t,r)=>t.has(e)||Ue("Cannot "+r);var c=(e,t,r)=>(Ne(e,t,"read from private field"),r?r.call(e):t.get(e)),m=(e,t,r)=>t.has(e)?Ue("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,r),f=(e,t,r,s)=>(Ne(e,t,"write to private field"),s?s.call(e,r):t.set(e,r),r),x=(e,t,r)=>(Ne(e,t,"access private method"),r);var ze=(e,t,r,s)=>({set _(o){f(e,t,o,r)},get _(){return c(e,t,s)}});var Ge=(e,t,r)=>(s,o)=>{let i=-1;return a(0);async function a(n){if(n<=i)throw new Error("next() called multiple times");i=n;let l,d=!1,u;if(e[n]?(u=e[n][0][0],s.req.routeIndex=n):u=n===e.length&&o||void 0,u)try{l=await u(s,()=>a(n+1))}catch(h){if(h instanceof Error&&t)s.error=h,l=await t(h,s),d=!0;else throw h}else s.finalized===!1&&r&&(l=await r(s));return l&&(s.finalized===!1||d)&&(s.res=l),s}},Ct=Symbol(),Rt=async(e,t=Object.create(null))=>{const{all:r=!1,dot:s=!1}=t,i=(e instanceof ct?e.raw.headers:e.headers).get("Content-Type");return i!=null&&i.startsWith("multipart/form-data")||i!=null&&i.startsWith("application/x-www-form-urlencoded")?St(e,{all:r,dot:s}):{}};async function St(e,t){const r=await e.formData();return r?_t(r,t):{}}function _t(e,t){const r=Object.create(null);return e.forEach((s,o)=>{t.all||o.endsWith("[]")?$t(r,o,s):r[o]=s}),t.dot&&Object.entries(r).forEach(([s,o])=>{s.includes(".")&&(Nt(r,s,o),delete r[s])}),r}var $t=(e,t,r)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(r):e[t]=[e[t],r]:t.endsWith("[]")?e[t]=[r]:e[t]=r},Nt=(e,t,r)=>{let s=e;const o=t.split(".");o.forEach((i,a)=>{a===o.length-1?s[i]=r:((!s[i]||typeof s[i]!="object"||Array.isArray(s[i])||s[i]instanceof File)&&(s[i]=Object.create(null)),s=s[i])})},ot=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},It=e=>{const{groups:t,path:r}=Mt(e),s=ot(r);return Dt(s,t)},Mt=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(r,s)=>{const o=`@${s}`;return t.push([o,r]),o}),{groups:t,path:e}},Dt=(e,t)=>{for(let r=t.length-1;r>=0;r--){const[s]=t[r];for(let o=e.length-1;o>=0;o--)if(e[o].includes(s)){e[o]=e[o].replace(s,t[r][1]);break}}return e},je={},Ht=(e,t)=>{if(e==="*")return"*";const r=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(r){const s=`${e}#${t}`;return je[s]||(r[2]?je[s]=t&&t[0]!==":"&&t[0]!=="*"?[s,r[1],new RegExp(`^${r[2]}(?=/${t})`)]:[e,r[1],new RegExp(`^${r[2]}$`)]:je[s]=[e,r[1],!0]),je[s]}return null},Le=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,r=>{try{return t(r)}catch{return r}})}},Lt=e=>Le(e,decodeURI),it=e=>{const t=e.url,r=t.indexOf("/",t.charCodeAt(9)===58?13:8);let s=r;for(;s<t.length;s++){const o=t.charCodeAt(s);if(o===37){const i=t.indexOf("?",s),a=t.slice(r,i===-1?void 0:i);return Lt(a.includes("%25")?a.replace(/%25/g,"%2525"):a)}else if(o===63)break}return t.slice(r,s)},Ft=e=>{const t=it(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},se=(e,t,...r)=>(r.length&&(t=se(t,...r)),`${(e==null?void 0:e[0])==="/"?"":"/"}${e}${t==="/"?"":`${(e==null?void 0:e.at(-1))==="/"?"":"/"}${(t==null?void 0:t[0])==="/"?t.slice(1):t}`}`),at=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),r=[];let s="";return t.forEach(o=>{if(o!==""&&!/\:/.test(o))s+="/"+o;else if(/\:/.test(o))if(/\?/.test(o)){r.length===0&&s===""?r.push("/"):r.push(s);const i=o.replace("?","");s+="/"+i,r.push(s)}else s+="/"+o}),r.filter((o,i,a)=>a.indexOf(o)===i)},Ie=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?Le(e,lt):e):e,nt=(e,t,r)=>{let s;if(!r&&t&&!/[%+]/.test(t)){let a=e.indexOf(`?${t}`,8);for(a===-1&&(a=e.indexOf(`&${t}`,8));a!==-1;){const n=e.charCodeAt(a+t.length+1);if(n===61){const l=a+t.length+2,d=e.indexOf("&",l);return Ie(e.slice(l,d===-1?void 0:d))}else if(n==38||isNaN(n))return"";a=e.indexOf(`&${t}`,a+1)}if(s=/[%+]/.test(e),!s)return}const o={};s??(s=/[%+]/.test(e));let i=e.indexOf("?",8);for(;i!==-1;){const a=e.indexOf("&",i+1);let n=e.indexOf("=",i);n>a&&a!==-1&&(n=-1);let l=e.slice(i+1,n===-1?a===-1?void 0:a:n);if(s&&(l=Ie(l)),i=a,l==="")continue;let d;n===-1?d="":(d=e.slice(n+1,a===-1?void 0:a),s&&(d=Ie(d))),r?(o[l]&&Array.isArray(o[l])||(o[l]=[]),o[l].push(d)):o[l]??(o[l]=d)}return t?o[t]:o},qt=nt,Ut=(e,t)=>nt(e,t,!0),lt=decodeURIComponent,Ve=e=>Le(e,lt),ie,O,L,dt,ut,De,q,Xe,ct=(Xe=class{constructor(e,t="/",r=[[]]){m(this,L);g(this,"raw");m(this,ie);m(this,O);g(this,"routeIndex",0);g(this,"path");g(this,"bodyCache",{});m(this,q,e=>{const{bodyCache:t,raw:r}=this,s=t[e];if(s)return s;const o=Object.keys(t)[0];return o?t[o].then(i=>(o==="json"&&(i=JSON.stringify(i)),new Response(i)[e]())):t[e]=r[e]()});this.raw=e,this.path=t,f(this,O,r),f(this,ie,{})}param(e){return e?x(this,L,dt).call(this,e):x(this,L,ut).call(this)}query(e){return qt(this.url,e)}queries(e){return Ut(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((r,s)=>{t[s]=r}),t}async parseBody(e){var t;return(t=this.bodyCache).parsedBody??(t.parsedBody=await Rt(this,e))}json(){return c(this,q).call(this,"text").then(e=>JSON.parse(e))}text(){return c(this,q).call(this,"text")}arrayBuffer(){return c(this,q).call(this,"arrayBuffer")}blob(){return c(this,q).call(this,"blob")}formData(){return c(this,q).call(this,"formData")}addValidatedData(e,t){c(this,ie)[e]=t}valid(e){return c(this,ie)[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[Ct](){return c(this,O)}get matchedRoutes(){return c(this,O)[0].map(([[,e]])=>e)}get routePath(){return c(this,O)[0].map(([[,e]])=>e)[this.routeIndex].path}},ie=new WeakMap,O=new WeakMap,L=new WeakSet,dt=function(e){const t=c(this,O)[0][this.routeIndex][1][e],r=x(this,L,De).call(this,t);return r?/\%/.test(r)?Ve(r):r:void 0},ut=function(){const e={},t=Object.keys(c(this,O)[0][this.routeIndex][1]);for(const r of t){const s=x(this,L,De).call(this,c(this,O)[0][this.routeIndex][1][r]);s&&typeof s=="string"&&(e[r]=/\%/.test(s)?Ve(s):s)}return e},De=function(e){return c(this,O)[1]?c(this,O)[1][e]:e},q=new WeakMap,Xe),zt={Stringify:1},ht=async(e,t,r,s,o)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const i=e.callbacks;return i!=null&&i.length?(o?o[0]+=e:o=[e],Promise.all(i.map(n=>n({phase:t,buffer:o,context:s}))).then(n=>Promise.all(n.filter(Boolean).map(l=>ht(l,t,!1,s,o))).then(()=>o[0]))):Promise.resolve(e)},Gt="text/plain; charset=UTF-8",Me=(e,t)=>({"Content-Type":e,...t}),me,be,I,ae,M,A,xe,ne,le,X,ve,ye,U,re,Je,Vt=(Je=class{constructor(e,t){m(this,U);m(this,me);m(this,be);g(this,"env",{});m(this,I);g(this,"finalized",!1);g(this,"error");m(this,ae);m(this,M);m(this,A);m(this,xe);m(this,ne);m(this,le);m(this,X);m(this,ve);m(this,ye);g(this,"render",(...e)=>(c(this,ne)??f(this,ne,t=>this.html(t)),c(this,ne).call(this,...e)));g(this,"setLayout",e=>f(this,xe,e));g(this,"getLayout",()=>c(this,xe));g(this,"setRenderer",e=>{f(this,ne,e)});g(this,"header",(e,t,r)=>{this.finalized&&f(this,A,new Response(c(this,A).body,c(this,A)));const s=c(this,A)?c(this,A).headers:c(this,X)??f(this,X,new Headers);t===void 0?s.delete(e):r!=null&&r.append?s.append(e,t):s.set(e,t)});g(this,"status",e=>{f(this,ae,e)});g(this,"set",(e,t)=>{c(this,I)??f(this,I,new Map),c(this,I).set(e,t)});g(this,"get",e=>c(this,I)?c(this,I).get(e):void 0);g(this,"newResponse",(...e)=>x(this,U,re).call(this,...e));g(this,"body",(e,t,r)=>x(this,U,re).call(this,e,t,r));g(this,"text",(e,t,r)=>!c(this,X)&&!c(this,ae)&&!t&&!r&&!this.finalized?new Response(e):x(this,U,re).call(this,e,t,Me(Gt,r)));g(this,"json",(e,t,r)=>x(this,U,re).call(this,JSON.stringify(e),t,Me("application/json",r)));g(this,"html",(e,t,r)=>{const s=o=>x(this,U,re).call(this,o,t,Me("text/html; charset=UTF-8",r));return typeof e=="object"?ht(e,zt.Stringify,!1,{}).then(s):s(e)});g(this,"redirect",(e,t)=>{const r=String(e);return this.header("Location",/[^\x00-\xFF]/.test(r)?encodeURI(r):r),this.newResponse(null,t??302)});g(this,"notFound",()=>(c(this,le)??f(this,le,()=>new Response),c(this,le).call(this,this)));f(this,me,e),t&&(f(this,M,t.executionCtx),this.env=t.env,f(this,le,t.notFoundHandler),f(this,ye,t.path),f(this,ve,t.matchResult))}get req(){return c(this,be)??f(this,be,new ct(c(this,me),c(this,ye),c(this,ve))),c(this,be)}get event(){if(c(this,M)&&"respondWith"in c(this,M))return c(this,M);throw Error("This context has no FetchEvent")}get executionCtx(){if(c(this,M))return c(this,M);throw Error("This context has no ExecutionContext")}get res(){return c(this,A)||f(this,A,new Response(null,{headers:c(this,X)??f(this,X,new Headers)}))}set res(e){if(c(this,A)&&e){e=new Response(e.body,e);for(const[t,r]of c(this,A).headers.entries())if(t!=="content-type")if(t==="set-cookie"){const s=c(this,A).headers.getSetCookie();e.headers.delete("set-cookie");for(const o of s)e.headers.append("set-cookie",o)}else e.headers.set(t,r)}f(this,A,e),this.finalized=!0}get var(){return c(this,I)?Object.fromEntries(c(this,I)):{}}},me=new WeakMap,be=new WeakMap,I=new WeakMap,ae=new WeakMap,M=new WeakMap,A=new WeakMap,xe=new WeakMap,ne=new WeakMap,le=new WeakMap,X=new WeakMap,ve=new WeakMap,ye=new WeakMap,U=new WeakSet,re=function(e,t,r){const s=c(this,A)?new Headers(c(this,A).headers):c(this,X)??new Headers;if(typeof t=="object"&&"headers"in t){const i=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[a,n]of i)a.toLowerCase()==="set-cookie"?s.append(a,n):s.set(a,n)}if(r)for(const[i,a]of Object.entries(r))if(typeof a=="string")s.set(i,a);else{s.delete(i);for(const n of a)s.append(i,n)}const o=typeof t=="number"?t:(t==null?void 0:t.status)??c(this,ae);return new Response(e,{status:o,headers:s})},Je),E="ALL",Bt="all",Wt=["get","post","put","delete","options","patch"],pt="Can not add a route since the matcher is already built.",ft=class extends Error{},Kt="__COMPOSED_HANDLER",Xt=e=>e.text("404 Not Found",404),Be=(e,t)=>{if("getResponse"in e){const r=e.getResponse();return t.newResponse(r.body,r)}return console.error(e),t.text("Internal Server Error",500)},C,j,mt,R,W,ke,Pe,Ye,gt=(Ye=class{constructor(t={}){m(this,j);g(this,"get");g(this,"post");g(this,"put");g(this,"delete");g(this,"options");g(this,"patch");g(this,"all");g(this,"on");g(this,"use");g(this,"router");g(this,"getPath");g(this,"_basePath","/");m(this,C,"/");g(this,"routes",[]);m(this,R,Xt);g(this,"errorHandler",Be);g(this,"onError",t=>(this.errorHandler=t,this));g(this,"notFound",t=>(f(this,R,t),this));g(this,"fetch",(t,...r)=>x(this,j,Pe).call(this,t,r[1],r[0],t.method));g(this,"request",(t,r,s,o)=>t instanceof Request?this.fetch(r?new Request(t,r):t,s,o):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${se("/",t)}`,r),s,o)));g(this,"fire",()=>{addEventListener("fetch",t=>{t.respondWith(x(this,j,Pe).call(this,t.request,t,void 0,t.request.method))})});[...Wt,Bt].forEach(i=>{this[i]=(a,...n)=>(typeof a=="string"?f(this,C,a):x(this,j,W).call(this,i,c(this,C),a),n.forEach(l=>{x(this,j,W).call(this,i,c(this,C),l)}),this)}),this.on=(i,a,...n)=>{for(const l of[a].flat()){f(this,C,l);for(const d of[i].flat())n.map(u=>{x(this,j,W).call(this,d.toUpperCase(),c(this,C),u)})}return this},this.use=(i,...a)=>(typeof i=="string"?f(this,C,i):(f(this,C,"*"),a.unshift(i)),a.forEach(n=>{x(this,j,W).call(this,E,c(this,C),n)}),this);const{strict:s,...o}=t;Object.assign(this,o),this.getPath=s??!0?t.getPath??it:Ft}route(t,r){const s=this.basePath(t);return r.routes.map(o=>{var a;let i;r.errorHandler===Be?i=o.handler:(i=async(n,l)=>(await Ge([],r.errorHandler)(n,()=>o.handler(n,l))).res,i[Kt]=o.handler),x(a=s,j,W).call(a,o.method,o.path,i)}),this}basePath(t){const r=x(this,j,mt).call(this);return r._basePath=se(this._basePath,t),r}mount(t,r,s){let o,i;s&&(typeof s=="function"?i=s:(i=s.optionHandler,s.replaceRequest===!1?o=l=>l:o=s.replaceRequest));const a=i?l=>{const d=i(l);return Array.isArray(d)?d:[d]}:l=>{let d;try{d=l.executionCtx}catch{}return[l.env,d]};o||(o=(()=>{const l=se(this._basePath,t),d=l==="/"?0:l.length;return u=>{const h=new URL(u.url);return h.pathname=h.pathname.slice(d)||"/",new Request(h,u)}})());const n=async(l,d)=>{const u=await r(o(l.req.raw),...a(l));if(u)return u;await d()};return x(this,j,W).call(this,E,se(t,"*"),n),this}},C=new WeakMap,j=new WeakSet,mt=function(){const t=new gt({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,f(t,R,c(this,R)),t.routes=this.routes,t},R=new WeakMap,W=function(t,r,s){t=t.toUpperCase(),r=se(this._basePath,r);const o={basePath:this._basePath,path:r,method:t,handler:s};this.router.add(t,r,[s,o]),this.routes.push(o)},ke=function(t,r){if(t instanceof Error)return this.errorHandler(t,r);throw t},Pe=function(t,r,s,o){if(o==="HEAD")return(async()=>new Response(null,await x(this,j,Pe).call(this,t,r,s,"GET")))();const i=this.getPath(t,{env:s}),a=this.router.match(o,i),n=new Vt(t,{path:i,matchResult:a,env:s,executionCtx:r,notFoundHandler:c(this,R)});if(a[0].length===1){let d;try{d=a[0][0][0][0](n,async()=>{n.res=await c(this,R).call(this,n)})}catch(u){return x(this,j,ke).call(this,u,n)}return d instanceof Promise?d.then(u=>u||(n.finalized?n.res:c(this,R).call(this,n))).catch(u=>x(this,j,ke).call(this,u,n)):d??c(this,R).call(this,n)}const l=Ge(a[0],this.errorHandler,c(this,R));return(async()=>{try{const d=await l(n);if(!d.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return d.res}catch(d){return x(this,j,ke).call(this,d,n)}})()},Ye),Oe="[^/]+",fe=".*",ge="(?:|/.*)",oe=Symbol(),Jt=new Set(".\\+*[^]$()");function Yt(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===fe||e===ge?1:t===fe||t===ge?-1:e===Oe?1:t===Oe?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var J,Y,S,Qe,He=(Qe=class{constructor(){m(this,J);m(this,Y);m(this,S,Object.create(null))}insert(t,r,s,o,i){if(t.length===0){if(c(this,J)!==void 0)throw oe;if(i)return;f(this,J,r);return}const[a,...n]=t,l=a==="*"?n.length===0?["","",fe]:["","",Oe]:a==="/*"?["","",ge]:a.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let d;if(l){const u=l[1];let h=l[2]||Oe;if(u&&l[2]&&(h===".*"||(h=h.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(h))))throw oe;if(d=c(this,S)[h],!d){if(Object.keys(c(this,S)).some(p=>p!==fe&&p!==ge))throw oe;if(i)return;d=c(this,S)[h]=new He,u!==""&&f(d,Y,o.varIndex++)}!i&&u!==""&&s.push([u,c(d,Y)])}else if(d=c(this,S)[a],!d){if(Object.keys(c(this,S)).some(u=>u.length>1&&u!==fe&&u!==ge))throw oe;if(i)return;d=c(this,S)[a]=new He}d.insert(n,r,s,o,i)}buildRegExpStr(){const r=Object.keys(c(this,S)).sort(Yt).map(s=>{const o=c(this,S)[s];return(typeof c(o,Y)=="number"?`(${s})@${c(o,Y)}`:Jt.has(s)?`\\${s}`:s)+o.buildRegExpStr()});return typeof c(this,J)=="number"&&r.unshift(`#${c(this,J)}`),r.length===0?"":r.length===1?r[0]:"(?:"+r.join("|")+")"}},J=new WeakMap,Y=new WeakMap,S=new WeakMap,Qe),Re,we,Ze,Qt=(Ze=class{constructor(){m(this,Re,{varIndex:0});m(this,we,new He)}insert(e,t,r){const s=[],o=[];for(let a=0;;){let n=!1;if(e=e.replace(/\{[^}]+\}/g,l=>{const d=`@\\${a}`;return o[a]=[d,l],a++,n=!0,d}),!n)break}const i=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let a=o.length-1;a>=0;a--){const[n]=o[a];for(let l=i.length-1;l>=0;l--)if(i[l].indexOf(n)!==-1){i[l]=i[l].replace(n,o[a][1]);break}}return c(this,we).insert(i,t,s,c(this,Re),r),s}buildRegExp(){let e=c(this,we).buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const r=[],s=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(o,i,a)=>i!==void 0?(r[++t]=Number(i),"$()"):(a!==void 0&&(s[Number(a)]=++t),"")),[new RegExp(`^${e}`),r,s]}},Re=new WeakMap,we=new WeakMap,Ze),bt=[],Zt=[/^$/,[],Object.create(null)],Ae=Object.create(null);function xt(e){return Ae[e]??(Ae[e]=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,r)=>r?`\\${r}`:"(?:|/.*)")}$`))}function es(){Ae=Object.create(null)}function ts(e){var d;const t=new Qt,r=[];if(e.length===0)return Zt;const s=e.map(u=>[!/\*|\/:/.test(u[0]),...u]).sort(([u,h],[p,v])=>u?1:p?-1:h.length-v.length),o=Object.create(null);for(let u=0,h=-1,p=s.length;u<p;u++){const[v,w,b]=s[u];v?o[w]=[b.map(([P])=>[P,Object.create(null)]),bt]:h++;let y;try{y=t.insert(w,h,v)}catch(P){throw P===oe?new ft(w):P}v||(r[h]=b.map(([P,ee])=>{const ue=Object.create(null);for(ee-=1;ee>=0;ee--){const[_,_e]=y[ee];ue[_]=_e}return[P,ue]}))}const[i,a,n]=t.buildRegExp();for(let u=0,h=r.length;u<h;u++)for(let p=0,v=r[u].length;p<v;p++){const w=(d=r[u][p])==null?void 0:d[1];if(!w)continue;const b=Object.keys(w);for(let y=0,P=b.length;y<P;y++)w[b[y]]=n[w[b[y]]]}const l=[];for(const u in a)l[u]=r[a[u]];return[i,l,o]}function te(e,t){if(e){for(const r of Object.keys(e).sort((s,o)=>o.length-s.length))if(xt(r).test(t))return[...e[r]]}}var z,G,de,vt,yt,et,ss=(et=class{constructor(){m(this,de);g(this,"name","RegExpRouter");m(this,z);m(this,G);f(this,z,{[E]:Object.create(null)}),f(this,G,{[E]:Object.create(null)})}add(e,t,r){var n;const s=c(this,z),o=c(this,G);if(!s||!o)throw new Error(pt);s[e]||[s,o].forEach(l=>{l[e]=Object.create(null),Object.keys(l[E]).forEach(d=>{l[e][d]=[...l[E][d]]})}),t==="/*"&&(t="*");const i=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const l=xt(t);e===E?Object.keys(s).forEach(d=>{var u;(u=s[d])[t]||(u[t]=te(s[d],t)||te(s[E],t)||[])}):(n=s[e])[t]||(n[t]=te(s[e],t)||te(s[E],t)||[]),Object.keys(s).forEach(d=>{(e===E||e===d)&&Object.keys(s[d]).forEach(u=>{l.test(u)&&s[d][u].push([r,i])})}),Object.keys(o).forEach(d=>{(e===E||e===d)&&Object.keys(o[d]).forEach(u=>l.test(u)&&o[d][u].push([r,i]))});return}const a=at(t)||[t];for(let l=0,d=a.length;l<d;l++){const u=a[l];Object.keys(o).forEach(h=>{var p;(e===E||e===h)&&((p=o[h])[u]||(p[u]=[...te(s[h],u)||te(s[E],u)||[]]),o[h][u].push([r,i-d+l+1]))})}}match(e,t){es();const r=x(this,de,vt).call(this);return this.match=(s,o)=>{const i=r[s]||r[E],a=i[2][o];if(a)return a;const n=o.match(i[0]);if(!n)return[[],bt];const l=n.indexOf("",1);return[i[1][l],n]},this.match(e,t)}},z=new WeakMap,G=new WeakMap,de=new WeakSet,vt=function(){const e=Object.create(null);return Object.keys(c(this,G)).concat(Object.keys(c(this,z))).forEach(t=>{e[t]||(e[t]=x(this,de,yt).call(this,t))}),f(this,z,f(this,G,void 0)),e},yt=function(e){const t=[];let r=e===E;return[c(this,z),c(this,G)].forEach(s=>{const o=s[e]?Object.keys(s[e]).map(i=>[i,s[e][i]]):[];o.length!==0?(r||(r=!0),t.push(...o)):e!==E&&t.push(...Object.keys(s[E]).map(i=>[i,s[E][i]]))}),r?ts(t):null},et),V,D,tt,rs=(tt=class{constructor(e){g(this,"name","SmartRouter");m(this,V,[]);m(this,D,[]);f(this,V,e.routers)}add(e,t,r){if(!c(this,D))throw new Error(pt);c(this,D).push([e,t,r])}match(e,t){if(!c(this,D))throw new Error("Fatal error");const r=c(this,V),s=c(this,D),o=r.length;let i=0,a;for(;i<o;i++){const n=r[i];try{for(let l=0,d=s.length;l<d;l++)n.add(...s[l]);a=n.match(e,t)}catch(l){if(l instanceof ft)continue;throw l}this.match=n.match.bind(n),f(this,V,[n]),f(this,D,void 0);break}if(i===o)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,a}get activeRouter(){if(c(this,D)||c(this,V).length!==1)throw new Error("No active router has been determined yet.");return c(this,V)[0]}},V=new WeakMap,D=new WeakMap,tt),pe=Object.create(null),B,k,Q,ce,T,H,K,st,wt=(st=class{constructor(e,t,r){m(this,H);m(this,B);m(this,k);m(this,Q);m(this,ce,0);m(this,T,pe);if(f(this,k,r||Object.create(null)),f(this,B,[]),e&&t){const s=Object.create(null);s[e]={handler:t,possibleKeys:[],score:0},f(this,B,[s])}f(this,Q,[])}insert(e,t,r){f(this,ce,++ze(this,ce)._);let s=this;const o=It(t),i=[];for(let a=0,n=o.length;a<n;a++){const l=o[a],d=o[a+1],u=Ht(l,d),h=Array.isArray(u)?u[0]:l;if(h in c(s,k)){s=c(s,k)[h],u&&i.push(u[1]);continue}c(s,k)[h]=new wt,u&&(c(s,Q).push(u),i.push(u[1])),s=c(s,k)[h]}return c(s,B).push({[e]:{handler:r,possibleKeys:i.filter((a,n,l)=>l.indexOf(a)===n),score:c(this,ce)}}),s}search(e,t){var n;const r=[];f(this,T,pe);let o=[this];const i=ot(t),a=[];for(let l=0,d=i.length;l<d;l++){const u=i[l],h=l===d-1,p=[];for(let v=0,w=o.length;v<w;v++){const b=o[v],y=c(b,k)[u];y&&(f(y,T,c(b,T)),h?(c(y,k)["*"]&&r.push(...x(this,H,K).call(this,c(y,k)["*"],e,c(b,T))),r.push(...x(this,H,K).call(this,y,e,c(b,T)))):p.push(y));for(let P=0,ee=c(b,Q).length;P<ee;P++){const ue=c(b,Q)[P],_=c(b,T)===pe?{}:{...c(b,T)};if(ue==="*"){const F=c(b,k)["*"];F&&(r.push(...x(this,H,K).call(this,F,e,c(b,T))),f(F,T,_),p.push(F));continue}const[_e,qe,he]=ue;if(!u&&!(he instanceof RegExp))continue;const N=c(b,k)[_e],Pt=i.slice(l).join("/");if(he instanceof RegExp){const F=he.exec(Pt);if(F){if(_[qe]=F[0],r.push(...x(this,H,K).call(this,N,e,c(b,T),_)),Object.keys(c(N,k)).length){f(N,T,_);const $e=((n=F[0].match(/\//))==null?void 0:n.length)??0;(a[$e]||(a[$e]=[])).push(N)}continue}}(he===!0||he.test(u))&&(_[qe]=u,h?(r.push(...x(this,H,K).call(this,N,e,_,c(b,T))),c(N,k)["*"]&&r.push(...x(this,H,K).call(this,c(N,k)["*"],e,_,c(b,T)))):(f(N,T,_),p.push(N)))}}o=p.concat(a.shift()??[])}return r.length>1&&r.sort((l,d)=>l.score-d.score),[r.map(({handler:l,params:d})=>[l,d])]}},B=new WeakMap,k=new WeakMap,Q=new WeakMap,ce=new WeakMap,T=new WeakMap,H=new WeakSet,K=function(e,t,r,s){const o=[];for(let i=0,a=c(e,B).length;i<a;i++){const n=c(e,B)[i],l=n[t]||n[E],d={};if(l!==void 0&&(l.params=Object.create(null),o.push(l),r!==pe||s&&s!==pe))for(let u=0,h=l.possibleKeys.length;u<h;u++){const p=l.possibleKeys[u],v=d[l.score];l.params[p]=s!=null&&s[p]&&!v?s[p]:r[p]??(s==null?void 0:s[p]),d[l.score]=!0}}return o},st),Z,rt,os=(rt=class{constructor(){g(this,"name","TrieRouter");m(this,Z);f(this,Z,new wt)}add(e,t,r){const s=at(t);if(s){for(let o=0,i=s.length;o<i;o++)c(this,Z).insert(e,s[o],r);return}c(this,Z).insert(e,t,r)}match(e,t){return c(this,Z).search(e,t)}},Z=new WeakMap,rt),Et=class extends gt{constructor(e={}){super(e),this.router=e.router??new rs({routers:[new ss,new os]})}},is=e=>{const r={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...e},s=(i=>typeof i=="string"?i==="*"?()=>i:a=>i===a?a:null:typeof i=="function"?i:a=>i.includes(a)?a:null)(r.origin),o=(i=>typeof i=="function"?i:Array.isArray(i)?()=>i:()=>[])(r.allowMethods);return async function(a,n){var u;function l(h,p){a.res.headers.set(h,p)}const d=s(a.req.header("origin")||"",a);if(d&&l("Access-Control-Allow-Origin",d),r.origin!=="*"){const h=a.req.header("Vary");h?l("Vary",h):l("Vary","Origin")}if(r.credentials&&l("Access-Control-Allow-Credentials","true"),(u=r.exposeHeaders)!=null&&u.length&&l("Access-Control-Expose-Headers",r.exposeHeaders.join(",")),a.req.method==="OPTIONS"){r.maxAge!=null&&l("Access-Control-Max-Age",r.maxAge.toString());const h=o(a.req.header("origin")||"",a);h.length&&l("Access-Control-Allow-Methods",h.join(","));let p=r.allowHeaders;if(!(p!=null&&p.length)){const v=a.req.header("Access-Control-Request-Headers");v&&(p=v.split(/\s*,\s*/))}return p!=null&&p.length&&(l("Access-Control-Allow-Headers",p.join(",")),a.res.headers.append("Vary","Access-Control-Request-Headers")),a.res.headers.delete("Content-Length"),a.res.headers.delete("Content-Type"),new Response(null,{headers:a.res.headers,status:204,statusText:"No Content"})}await n()}},as=/^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i,We=(e,t=ls)=>{const r=/\.([a-zA-Z0-9]+?)$/,s=e.match(r);if(!s)return;let o=t[s[1]];return o&&o.startsWith("text")&&(o+="; charset=utf-8"),o},ns={aac:"audio/aac",avi:"video/x-msvideo",avif:"image/avif",av1:"video/av1",bin:"application/octet-stream",bmp:"image/bmp",css:"text/css",csv:"text/csv",eot:"application/vnd.ms-fontobject",epub:"application/epub+zip",gif:"image/gif",gz:"application/gzip",htm:"text/html",html:"text/html",ico:"image/x-icon",ics:"text/calendar",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",jsonld:"application/ld+json",map:"application/json",mid:"audio/x-midi",midi:"audio/x-midi",mjs:"text/javascript",mp3:"audio/mpeg",mp4:"video/mp4",mpeg:"video/mpeg",oga:"audio/ogg",ogv:"video/ogg",ogx:"application/ogg",opus:"audio/opus",otf:"font/otf",pdf:"application/pdf",png:"image/png",rtf:"application/rtf",svg:"image/svg+xml",tif:"image/tiff",tiff:"image/tiff",ts:"video/mp2t",ttf:"font/ttf",txt:"text/plain",wasm:"application/wasm",webm:"video/webm",weba:"audio/webm",webmanifest:"application/manifest+json",webp:"image/webp",woff:"font/woff",woff2:"font/woff2",xhtml:"application/xhtml+xml",xml:"application/xml",zip:"application/zip","3gp":"video/3gpp","3g2":"video/3gpp2",gltf:"model/gltf+json",glb:"model/gltf-binary"},ls=ns,cs=(...e)=>{let t=e.filter(o=>o!=="").join("/");t=t.replace(new RegExp("(?<=\\/)\\/+","g"),"");const r=t.split("/"),s=[];for(const o of r)o===".."&&s.length>0&&s.at(-1)!==".."?s.pop():o!=="."&&s.push(o);return s.join("/")||"."},jt={br:".br",zstd:".zst",gzip:".gz"},ds=Object.keys(jt),us="index.html",hs=e=>{const t=e.root??"./",r=e.path,s=e.join??cs;return async(o,i)=>{var u,h,p,v;if(o.finalized)return i();let a;if(e.path)a=e.path;else try{if(a=decodeURIComponent(o.req.path),/(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(a))throw new Error}catch{return await((u=e.onNotFound)==null?void 0:u.call(e,o.req.path,o)),i()}let n=s(t,!r&&e.rewriteRequestPath?e.rewriteRequestPath(a):a);e.isDir&&await e.isDir(n)&&(n=s(n,us));const l=e.getContent;let d=await l(n,o);if(d instanceof Response)return o.newResponse(d.body,d);if(d){const w=e.mimes&&We(n,e.mimes)||We(n);if(o.header("Content-Type",w||"application/octet-stream"),e.precompressed&&(!w||as.test(w))){const b=new Set((h=o.req.header("Accept-Encoding"))==null?void 0:h.split(",").map(y=>y.trim()));for(const y of ds){if(!b.has(y))continue;const P=await l(n+jt[y],o);if(P){d=P,o.header("Content-Encoding",y),o.header("Vary","Accept-Encoding",{append:!0});break}}}return await((p=e.onFound)==null?void 0:p.call(e,n,o)),o.body(d)}await((v=e.onNotFound)==null?void 0:v.call(e,n,o)),await i()}},ps=async(e,t)=>{let r;t&&t.manifest?typeof t.manifest=="string"?r=JSON.parse(t.manifest):r=t.manifest:typeof __STATIC_CONTENT_MANIFEST=="string"?r=JSON.parse(__STATIC_CONTENT_MANIFEST):r=__STATIC_CONTENT_MANIFEST;let s;t&&t.namespace?s=t.namespace:s=__STATIC_CONTENT;const o=r[e]||e;if(!o)return null;const i=await s.get(o,{type:"stream"});return i||null},fs=e=>async function(r,s){return hs({...e,getContent:async i=>ps(i,{manifest:e.manifest,namespace:e.namespace?e.namespace:r.env?r.env.__STATIC_CONTENT:void 0})})(r,s)},gs=e=>fs(e);const $=new Et;$.use("/api/*",is());$.use("/static/*",gs({root:"./public"}));const Te=new Map;function Ee(e,t=100,r=6e4){const s=Date.now(),o=s-r;Te.has(e)||Te.set(e,[]);const a=Te.get(e).filter(n=>n>o);return a.length>=t?!1:(a.push(s),Te.set(e,a),!0)}async function Se(e,t,r,s="GET",o){const i=`https://${e}.myshopify.com/admin/api/2024-01/${r}`,n={method:s,headers:{"X-Shopify-Access-Token":t,"Content-Type":"application/json"}};o&&(s==="POST"||s==="PUT")&&(n.body=JSON.stringify(o));const l=await fetch(i,n);if(!l.ok){const u=await l.text();throw new Error(`Shopify API error: ${l.status} - ${u}`)}return await l.json()}function Fe(e){if(!e)return"";const t=e.split(",");for(const r of t)if(r.includes('rel="next"')){const s=r.split(";")[0].trim();if(s.startsWith("<")&&s.endsWith(">"))return s.slice(1,-1)}return""}async function Ce(e,t,r){let s=[],o=`https://${e}.myshopify.com/admin/api/2024-01/products.json?limit=250&fields=id,title,body_html,vendor,product_type,created_at,updated_at,published_at,tags,status,variants,options,images,image`;for(console.log("🚀 USANDO LÓGICA DO SEU SCRIPT PYTHON - LINK HEADER PAGINATION");o;){console.log(`🔍 Fetching: ${o}`);try{const a=await fetch(o,{method:"GET",headers:{"X-Shopify-Access-Token":t,"Content-Type":"application/json"}});if(!a.ok){const u=await a.text();throw new Error(`Shopify API error: ${a.status} - ${u}`)}const l=(await a.json()).products||[];if(console.log(`📦 Received ${l.length} products... Total so far: ${s.length+l.length}`),l.length===0){console.log("🛑 No products in response, ending pagination");break}s=s.concat(l);const d=a.headers.get("Link")||"";o=Fe(d),console.log(o?`➡️ Next page found: ${o}`:"✅ No more pages, pagination complete")}catch(i){console.error("❌ Error in pagination:",i);break}}return console.log(`🎉 PAGINATION COMPLETE: ${s.length} total products found`),s}async function Tt(e,t){let r=[];const s=["custom_collections","smart_collections"];console.log("🚀 BUSCANDO COLEÇÕES - MESMA LÓGICA DO PYTHON");for(const o of s){let i=`https://${e}.myshopify.com/admin/api/2024-01/${o}.json?limit=250`;for(console.log(`🔍 Fetching ${o}...`);i;)try{const n=await fetch(i,{method:"GET",headers:{"X-Shopify-Access-Token":t,"Content-Type":"application/json"}});if(!n.ok){console.log(`Error fetching ${o}: ${n.status}`);break}const d=(await n.json())[o]||[];if(console.log(`📦 Found ${d.length} ${o}`),d.length===0)break;r=r.concat(d);const u=n.headers.get("Link")||"";i=Fe(u)}catch(a){console.error(`Error fetching ${o}:`,a);break}}return console.log(`🎉 TOTAL COLLECTIONS: ${r.length}`),r}async function ms(e,t,r){let s=[],o=`https://${e}.myshopify.com/admin/api/2024-01/collections/${r}/products.json?limit=250&fields=id`;for(;o;)try{const i=await fetch(o,{method:"GET",headers:{"X-Shopify-Access-Token":t,"Content-Type":"application/json"}});if(!i.ok)break;const n=(await i.json()).products||[];s=s.concat(n);const l=i.headers.get("Link")||"";o=Fe(l)}catch(i){console.log(`❌ Error in collection ${r} pagination:`,i);break}return s}async function bs(e,t,r){const s={};console.log("🔍 MAPEANDO PRODUTOS POR COLEÇÃO COM PAGINAÇÃO COMPLETA...");for(const o of r)try{console.log(`🔍 Buscando produtos da coleção "${o.title}"...`);const i=await ms(e,t,o.id);i.forEach(a=>{s[a.id]||(s[a.id]=[]),s[a.id].push(o.id.toString())}),console.log(`✅ Coleção "${o.title}": ${i.length} produtos (com paginação completa)`)}catch(i){console.log(`❌ Erro na coleção ${o.title}:`,i)}return console.log(`✅ Mapeamento completo: ${Object.keys(s).length} produtos mapeados`),s}async function xs(e,t,r,s){const o=[];for(let i=0;i<r.length;i++){const a=r[i];try{const n={id:a.id};s.title&&s.title!==a.title&&(n.title=s.title),s.description!==void 0&&s.description!==a.body_html&&(n.body_html=s.description),s.vendor&&s.vendor!==a.vendor&&(n.vendor=s.vendor),s.productType&&s.productType!==a.product_type&&(n.product_type=s.productType),s.tags!==void 0&&(n.tags=s.tags),s.status&&s.status!==a.status&&(n.status=s.status),(s.seoTitle||s.seoDescription)&&(n.metafields_global_title_tag=s.seoTitle||a.metafields_global_title_tag,n.metafields_global_description_tag=s.seoDescription||a.metafields_global_description_tag),(s.price||s.comparePrice)&&(n.variants=a.variants.map(d=>({id:d.id,price:s.price||d.price,compare_at_price:s.comparePrice||d.compare_at_price}))),s.inventory!==void 0&&(n.variants=a.variants.map(d=>({id:d.id,inventory_quantity:s.inventory})));const l=await Se(e,t,`products/${a.id}.json`,"PUT",{product:n});o.push({id:a.id,success:!0,data:l.product}),i<r.length-1&&await new Promise(d=>setTimeout(d,200))}catch(n){o.push({id:a.id,success:!1,error:n instanceof Error?n.message:"Unknown error"})}}return o}$.post("/api/test-connection",async e=>{try{const{shop:t,accessToken:r}=await e.req.json();if(!t||!r)return e.json({error:"Parâmetros obrigatórios: shop e accessToken"},400);const s=await Se(t,r,"shop.json");return e.json({success:!0,shop:s.shop.name,domain:s.shop.domain,plan:s.shop.plan_name})}catch(t){return e.json({error:"Falha na conexão: "+(t instanceof Error?t.message:"Erro desconhecido")},401)}});$.post("/api/products",async e=>{try{const{shop:t,accessToken:r}=await e.req.json();if(!t||!r)return e.json({error:"Parâmetros obrigatórios: shop e accessToken"},400);if(!Ee(`products:${t}`,50))return e.json({error:"Rate limit exceeded"},429);console.log("Loading ALL products with working pagination logic");const s=await Ce(t,r);console.log(`✅ Successfully loaded ${s.length} total products`),console.log("🔍 Loading collections for product mapping...");const o=await Tt(t,r);console.log(`✅ Loaded ${o.length} collections`);const i=await bs(t,r,o),a=s.map(n=>({...n,collection_ids:i[n.id]||[]}));return a.length>0&&console.log("✅ First product with collections:",{id:a[0].id,title:a[0].title,collection_ids:a[0].collection_ids}),e.json({products:a,total:a.length})}catch(t){return e.json({error:"Erro ao buscar produtos: "+(t instanceof Error?t.message:"Erro desconhecido")},500)}});$.post("/api/collections",async e=>{try{const{shop:t,accessToken:r}=await e.req.json();if(!t||!r)return e.json({error:"Parâmetros obrigatórios: shop e accessToken"},400);if(!Ee(`collections:${t}`,30))return e.json({error:"Rate limit exceeded"},429);const s=await Tt(t,r);return e.json({collections:s})}catch(t){return e.json({error:"Erro ao buscar coleções: "+(t instanceof Error?t.message:"Erro desconhecido")},500)}});$.post("/api/bulk-update",async e=>{try{const{shop:t,accessToken:r,productIds:s,updates:o}=await e.req.json();if(!t||!r||!s||!o)return e.json({error:"Parâmetros obrigatórios: shop, accessToken, productIds, updates"},400);if(!Ee(`bulk:${t}`,10,3e5))return e.json({error:"Rate limit exceeded for bulk operations"},429);const i=[];for(const n of s)try{const l=await Se(t,r,`products/${n}.json`);i.push(l.product)}catch(l){console.error(`Error fetching product ${n}:`,l)}const a=await xs(t,r,i,o);return e.json({results:a,successful:a.filter(n=>n.success).length,failed:a.filter(n=>!n.success).length})}catch(t){return e.json({error:"Erro na atualização em massa: "+(t instanceof Error?t.message:"Erro desconhecido")},500)}});$.post("/api/analyze-variants",async e=>{try{const{shop:t,accessToken:r}=await e.req.json();if(!t||!r)return e.json({error:"Parâmetros obrigatórios: shop e accessToken"},400);if(!Ee(`analyze-variants:${t}`,10,6e4))return e.json({error:"Rate limit exceeded for variant analysis"},429);const s=await Ce(t,r,250),o={},i={};return s.forEach(a=>{a.options&&a.options.length>0&&(a.options.forEach(n=>{i[n.name]||(i[n.name]={name:n.name,values:new Set,productCount:0,products:[]}),i[n.name].productCount++,i[n.name].products.push({id:a.id,title:a.title}),n.values&&n.values.forEach(l=>{i[n.name].values.add(l)})}),a.variants&&a.variants.length>0&&a.variants.forEach(n=>{const l=`${a.id}_${n.id}`;o[l]={productId:a.id,productTitle:a.title,variantId:n.id,variantTitle:n.title,price:n.price,option1:n.option1,option2:n.option2,option3:n.option3,sku:n.sku}}))}),Object.keys(i).forEach(a=>{i[a].values=Array.from(i[a].values),i[a].products=i[a].products.slice(0,10)}),e.json({success:!0,totalProducts:s.length,optionStats:i,variantCount:Object.keys(o).length,sampleVariants:Object.values(o).slice(0,50)})}catch(t){return e.json({error:"Erro na análise de variantes: "+(t instanceof Error?t.message:"Erro desconhecido")},500)}});$.post("/api/bulk-update-variant-titles",async e=>{var t;try{const{shop:r,accessToken:s,titleMappings:o,scope:i,selectedProductIds:a}=await e.req.json();if(!r||!s||!o||o.length===0)return e.json({error:"Parâmetros obrigatórios: shop, accessToken, titleMappings"},400);if(i==="selected"&&(!a||a.length===0))return e.json({error:'Para escopo "selected", selectedProductIds é obrigatório'},400);if(!Ee(`bulk-variants:${r}`,5,3e5))return e.json({error:"Rate limit exceeded for bulk variant operations"},429);let n=[];i==="all"?n=await Ce(r,s,250):n=(await Ce(r,s,250)).filter(p=>a.includes(p.id.toString())||a.includes(p.id));let l=0,d=0;const u=[];console.log(`🎯 Processando ${n.length} produtos (escopo: ${i})`);for(const h of n)try{let p=!1;const v=((t=h.options)==null?void 0:t.map(w=>{const b=o.find(y=>y.currentTitle.toLowerCase()===w.name.toLowerCase());return b&&b.newTitle&&b.newTitle!==w.name?(p=!0,{...w,name:b.newTitle}):w}))||[];if(p&&v.length>0){const w=await Se(r,s,`products/${h.id}.json`,"PUT",{product:{id:h.id,options:v}});l++,u.push({productId:h.id,title:h.title,success:!0,changes:v.map(b=>b.name).join(", ")}),await new Promise(b=>setTimeout(b,500))}}catch(p){d++,u.push({productId:h.id,title:h.title,success:!1,error:p instanceof Error?p.message:"Erro desconhecido"})}return e.json({success:!0,totalProducts:allProducts.length,updatedCount:l,failedCount:d,results:u.slice(0,50)})}catch(r){return e.json({error:"Erro na atualização em massa de títulos de variantes: "+(r instanceof Error?r.message:"Erro desconhecido")},500)}});$.get("/",e=>e.html(`
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
  `));const Ke=new Et,vs=Object.assign({"/src/index.tsx":$});let kt=!1;for(const[,e]of Object.entries(vs))e&&(Ke.route("/",e),Ke.notFound(e.notFoundHandler),kt=!0);if(!kt)throw new Error("Can't import modules from ['/src/index.tsx','/app/server.ts']");export{Ke as default};
