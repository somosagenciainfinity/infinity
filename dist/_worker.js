var kt=Object.defineProperty;var Fe=e=>{throw TypeError(e)};var Ct=(e,t,r)=>t in e?kt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var g=(e,t,r)=>Ct(e,typeof t!="symbol"?t+"":t,r),Me=(e,t,r)=>t.has(e)||Fe("Cannot "+r);var d=(e,t,r)=>(Me(e,t,"read from private field"),r?r.call(e):t.get(e)),b=(e,t,r)=>t.has(e)?Fe("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,r),f=(e,t,r,s)=>(Me(e,t,"write to private field"),s?s.call(e,r):t.set(e,r),r),x=(e,t,r)=>(Me(e,t,"access private method"),r);var ze=(e,t,r,s)=>({set _(o){f(e,t,o,r)},get _(){return d(e,t,s)}});var Ue=(e,t,r)=>(s,o)=>{let a=-1;return i(0);async function i(l){if(l<=a)throw new Error("next() called multiple times");a=l;let n,c=!1,u;if(e[l]?(u=e[l][0][0],s.req.routeIndex=l):u=l===e.length&&o||void 0,u)try{n=await u(s,()=>i(l+1))}catch(p){if(p instanceof Error&&t)s.error=p,n=await t(p,s),c=!0;else throw p}else s.finalized===!1&&r&&(n=await r(s));return n&&(s.finalized===!1||c)&&(s.res=n),s}},Ot=Symbol(),Rt=async(e,t=Object.create(null))=>{const{all:r=!1,dot:s=!1}=t,a=(e instanceof ct?e.raw.headers:e.headers).get("Content-Type");return a!=null&&a.startsWith("multipart/form-data")||a!=null&&a.startsWith("application/x-www-form-urlencoded")?St(e,{all:r,dot:s}):{}};async function St(e,t){const r=await e.formData();return r?$t(r,t):{}}function $t(e,t){const r=Object.create(null);return e.forEach((s,o)=>{t.all||o.endsWith("[]")?_t(r,o,s):r[o]=s}),t.dot&&Object.entries(r).forEach(([s,o])=>{s.includes(".")&&(It(r,s,o),delete r[s])}),r}var _t=(e,t,r)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(r):e[t]=[e[t],r]:t.endsWith("[]")?e[t]=[r]:e[t]=r},It=(e,t,r)=>{let s=e;const o=t.split(".");o.forEach((a,i)=>{i===o.length-1?s[a]=r:((!s[a]||typeof s[a]!="object"||Array.isArray(s[a])||s[a]instanceof File)&&(s[a]=Object.create(null)),s=s[a])})},ot=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},Mt=e=>{const{groups:t,path:r}=Nt(e),s=ot(r);return Lt(s,t)},Nt=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(r,s)=>{const o=`@${s}`;return t.push([o,r]),o}),{groups:t,path:e}},Lt=(e,t)=>{for(let r=t.length-1;r>=0;r--){const[s]=t[r];for(let o=e.length-1;o>=0;o--)if(e[o].includes(s)){e[o]=e[o].replace(s,t[r][1]);break}}return e},ke={},Dt=(e,t)=>{if(e==="*")return"*";const r=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(r){const s=`${e}#${t}`;return ke[s]||(r[2]?ke[s]=t&&t[0]!==":"&&t[0]!=="*"?[s,r[1],new RegExp(`^${r[2]}(?=/${t})`)]:[e,r[1],new RegExp(`^${r[2]}$`)]:ke[s]=[e,r[1],!0]),ke[s]}return null},Ve=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,r=>{try{return t(r)}catch{return r}})}},Ht=e=>Ve(e,decodeURI),at=e=>{const t=e.url,r=t.indexOf("/",t.charCodeAt(9)===58?13:8);let s=r;for(;s<t.length;s++){const o=t.charCodeAt(s);if(o===37){const a=t.indexOf("?",s),i=t.slice(r,a===-1?void 0:a);return Ht(i.includes("%25")?i.replace(/%25/g,"%2525"):i)}else if(o===63)break}return t.slice(r,s)},Vt=e=>{const t=at(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},ne=(e,t,...r)=>(r.length&&(t=ne(t,...r)),`${(e==null?void 0:e[0])==="/"?"":"/"}${e}${t==="/"?"":`${(e==null?void 0:e.at(-1))==="/"?"":"/"}${(t==null?void 0:t[0])==="/"?t.slice(1):t}`}`),it=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),r=[];let s="";return t.forEach(o=>{if(o!==""&&!/\:/.test(o))s+="/"+o;else if(/\:/.test(o))if(/\?/.test(o)){r.length===0&&s===""?r.push("/"):r.push(s);const a=o.replace("?","");s+="/"+a,r.push(s)}else s+="/"+o}),r.filter((o,a,i)=>i.indexOf(o)===a)},Ne=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?Ve(e,lt):e):e,nt=(e,t,r)=>{let s;if(!r&&t&&!/[%+]/.test(t)){let i=e.indexOf(`?${t}`,8);for(i===-1&&(i=e.indexOf(`&${t}`,8));i!==-1;){const l=e.charCodeAt(i+t.length+1);if(l===61){const n=i+t.length+2,c=e.indexOf("&",n);return Ne(e.slice(n,c===-1?void 0:c))}else if(l==38||isNaN(l))return"";i=e.indexOf(`&${t}`,i+1)}if(s=/[%+]/.test(e),!s)return}const o={};s??(s=/[%+]/.test(e));let a=e.indexOf("?",8);for(;a!==-1;){const i=e.indexOf("&",a+1);let l=e.indexOf("=",a);l>i&&i!==-1&&(l=-1);let n=e.slice(a+1,l===-1?i===-1?void 0:i:l);if(s&&(n=Ne(n)),a=i,n==="")continue;let c;l===-1?c="":(c=e.slice(l+1,i===-1?void 0:i),s&&(c=Ne(c))),r?(o[n]&&Array.isArray(o[n])||(o[n]=[]),o[n].push(c)):o[n]??(o[n]=c)}return t?o[t]:o},qt=nt,Ft=(e,t)=>nt(e,t,!0),lt=decodeURIComponent,Be=e=>Ve(e,lt),de,_,F,dt,ut,De,B,Xe,ct=(Xe=class{constructor(e,t="/",r=[[]]){b(this,F);g(this,"raw");b(this,de);b(this,_);g(this,"routeIndex",0);g(this,"path");g(this,"bodyCache",{});b(this,B,e=>{const{bodyCache:t,raw:r}=this,s=t[e];if(s)return s;const o=Object.keys(t)[0];return o?t[o].then(a=>(o==="json"&&(a=JSON.stringify(a)),new Response(a)[e]())):t[e]=r[e]()});this.raw=e,this.path=t,f(this,_,r),f(this,de,{})}param(e){return e?x(this,F,dt).call(this,e):x(this,F,ut).call(this)}query(e){return qt(this.url,e)}queries(e){return Ft(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((r,s)=>{t[s]=r}),t}async parseBody(e){var t;return(t=this.bodyCache).parsedBody??(t.parsedBody=await Rt(this,e))}json(){return d(this,B).call(this,"text").then(e=>JSON.parse(e))}text(){return d(this,B).call(this,"text")}arrayBuffer(){return d(this,B).call(this,"arrayBuffer")}blob(){return d(this,B).call(this,"blob")}formData(){return d(this,B).call(this,"formData")}addValidatedData(e,t){d(this,de)[e]=t}valid(e){return d(this,de)[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[Ot](){return d(this,_)}get matchedRoutes(){return d(this,_)[0].map(([[,e]])=>e)}get routePath(){return d(this,_)[0].map(([[,e]])=>e)[this.routeIndex].path}},de=new WeakMap,_=new WeakMap,F=new WeakSet,dt=function(e){const t=d(this,_)[0][this.routeIndex][1][e],r=x(this,F,De).call(this,t);return r?/\%/.test(r)?Be(r):r:void 0},ut=function(){const e={},t=Object.keys(d(this,_)[0][this.routeIndex][1]);for(const r of t){const s=x(this,F,De).call(this,d(this,_)[0][this.routeIndex][1][r]);s&&typeof s=="string"&&(e[r]=/\%/.test(s)?Be(s):s)}return e},De=function(e){return d(this,_)[1]?d(this,_)[1][e]:e},B=new WeakMap,Xe),zt={Stringify:1},pt=async(e,t,r,s,o)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const a=e.callbacks;return a!=null&&a.length?(o?o[0]+=e:o=[e],Promise.all(a.map(l=>l({phase:t,buffer:o,context:s}))).then(l=>Promise.all(l.filter(Boolean).map(n=>pt(n,t,!1,s,o))).then(()=>o[0]))):Promise.resolve(e)},Ut="text/plain; charset=UTF-8",Le=(e,t)=>({"Content-Type":e,...t}),ye,we,D,ue,H,O,Ee,pe,he,Z,je,Te,G,le,Ye,Bt=(Ye=class{constructor(e,t){b(this,G);b(this,ye);b(this,we);g(this,"env",{});b(this,D);g(this,"finalized",!1);g(this,"error");b(this,ue);b(this,H);b(this,O);b(this,Ee);b(this,pe);b(this,he);b(this,Z);b(this,je);b(this,Te);g(this,"render",(...e)=>(d(this,pe)??f(this,pe,t=>this.html(t)),d(this,pe).call(this,...e)));g(this,"setLayout",e=>f(this,Ee,e));g(this,"getLayout",()=>d(this,Ee));g(this,"setRenderer",e=>{f(this,pe,e)});g(this,"header",(e,t,r)=>{this.finalized&&f(this,O,new Response(d(this,O).body,d(this,O)));const s=d(this,O)?d(this,O).headers:d(this,Z)??f(this,Z,new Headers);t===void 0?s.delete(e):r!=null&&r.append?s.append(e,t):s.set(e,t)});g(this,"status",e=>{f(this,ue,e)});g(this,"set",(e,t)=>{d(this,D)??f(this,D,new Map),d(this,D).set(e,t)});g(this,"get",e=>d(this,D)?d(this,D).get(e):void 0);g(this,"newResponse",(...e)=>x(this,G,le).call(this,...e));g(this,"body",(e,t,r)=>x(this,G,le).call(this,e,t,r));g(this,"text",(e,t,r)=>!d(this,Z)&&!d(this,ue)&&!t&&!r&&!this.finalized?new Response(e):x(this,G,le).call(this,e,t,Le(Ut,r)));g(this,"json",(e,t,r)=>x(this,G,le).call(this,JSON.stringify(e),t,Le("application/json",r)));g(this,"html",(e,t,r)=>{const s=o=>x(this,G,le).call(this,o,t,Le("text/html; charset=UTF-8",r));return typeof e=="object"?pt(e,zt.Stringify,!1,{}).then(s):s(e)});g(this,"redirect",(e,t)=>{const r=String(e);return this.header("Location",/[^\x00-\xFF]/.test(r)?encodeURI(r):r),this.newResponse(null,t??302)});g(this,"notFound",()=>(d(this,he)??f(this,he,()=>new Response),d(this,he).call(this,this)));f(this,ye,e),t&&(f(this,H,t.executionCtx),this.env=t.env,f(this,he,t.notFoundHandler),f(this,Te,t.path),f(this,je,t.matchResult))}get req(){return d(this,we)??f(this,we,new ct(d(this,ye),d(this,Te),d(this,je))),d(this,we)}get event(){if(d(this,H)&&"respondWith"in d(this,H))return d(this,H);throw Error("This context has no FetchEvent")}get executionCtx(){if(d(this,H))return d(this,H);throw Error("This context has no ExecutionContext")}get res(){return d(this,O)||f(this,O,new Response(null,{headers:d(this,Z)??f(this,Z,new Headers)}))}set res(e){if(d(this,O)&&e){e=new Response(e.body,e);for(const[t,r]of d(this,O).headers.entries())if(t!=="content-type")if(t==="set-cookie"){const s=d(this,O).headers.getSetCookie();e.headers.delete("set-cookie");for(const o of s)e.headers.append("set-cookie",o)}else e.headers.set(t,r)}f(this,O,e),this.finalized=!0}get var(){return d(this,D)?Object.fromEntries(d(this,D)):{}}},ye=new WeakMap,we=new WeakMap,D=new WeakMap,ue=new WeakMap,H=new WeakMap,O=new WeakMap,Ee=new WeakMap,pe=new WeakMap,he=new WeakMap,Z=new WeakMap,je=new WeakMap,Te=new WeakMap,G=new WeakSet,le=function(e,t,r){const s=d(this,O)?new Headers(d(this,O).headers):d(this,Z)??new Headers;if(typeof t=="object"&&"headers"in t){const a=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[i,l]of a)i.toLowerCase()==="set-cookie"?s.append(i,l):s.set(i,l)}if(r)for(const[a,i]of Object.entries(r))if(typeof i=="string")s.set(a,i);else{s.delete(a);for(const l of i)s.append(a,l)}const o=typeof t=="number"?t:(t==null?void 0:t.status)??d(this,ue);return new Response(e,{status:o,headers:s})},Ye),T="ALL",Gt="all",Wt=["get","post","put","delete","options","patch"],ht="Can not add a route since the matcher is already built.",ft=class extends Error{},Kt="__COMPOSED_HANDLER",Xt=e=>e.text("404 Not Found",404),Ge=(e,t)=>{if("getResponse"in e){const r=e.getResponse();return t.newResponse(r.body,r)}return console.error(e),t.text("Internal Server Error",500)},M,P,mt,N,J,Oe,Re,Je,gt=(Je=class{constructor(t={}){b(this,P);g(this,"get");g(this,"post");g(this,"put");g(this,"delete");g(this,"options");g(this,"patch");g(this,"all");g(this,"on");g(this,"use");g(this,"router");g(this,"getPath");g(this,"_basePath","/");b(this,M,"/");g(this,"routes",[]);b(this,N,Xt);g(this,"errorHandler",Ge);g(this,"onError",t=>(this.errorHandler=t,this));g(this,"notFound",t=>(f(this,N,t),this));g(this,"fetch",(t,...r)=>x(this,P,Re).call(this,t,r[1],r[0],t.method));g(this,"request",(t,r,s,o)=>t instanceof Request?this.fetch(r?new Request(t,r):t,s,o):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${ne("/",t)}`,r),s,o)));g(this,"fire",()=>{addEventListener("fetch",t=>{t.respondWith(x(this,P,Re).call(this,t.request,t,void 0,t.request.method))})});[...Wt,Gt].forEach(a=>{this[a]=(i,...l)=>(typeof i=="string"?f(this,M,i):x(this,P,J).call(this,a,d(this,M),i),l.forEach(n=>{x(this,P,J).call(this,a,d(this,M),n)}),this)}),this.on=(a,i,...l)=>{for(const n of[i].flat()){f(this,M,n);for(const c of[a].flat())l.map(u=>{x(this,P,J).call(this,c.toUpperCase(),d(this,M),u)})}return this},this.use=(a,...i)=>(typeof a=="string"?f(this,M,a):(f(this,M,"*"),i.unshift(a)),i.forEach(l=>{x(this,P,J).call(this,T,d(this,M),l)}),this);const{strict:s,...o}=t;Object.assign(this,o),this.getPath=s??!0?t.getPath??at:Vt}route(t,r){const s=this.basePath(t);return r.routes.map(o=>{var i;let a;r.errorHandler===Ge?a=o.handler:(a=async(l,n)=>(await Ue([],r.errorHandler)(l,()=>o.handler(l,n))).res,a[Kt]=o.handler),x(i=s,P,J).call(i,o.method,o.path,a)}),this}basePath(t){const r=x(this,P,mt).call(this);return r._basePath=ne(this._basePath,t),r}mount(t,r,s){let o,a;s&&(typeof s=="function"?a=s:(a=s.optionHandler,s.replaceRequest===!1?o=n=>n:o=s.replaceRequest));const i=a?n=>{const c=a(n);return Array.isArray(c)?c:[c]}:n=>{let c;try{c=n.executionCtx}catch{}return[n.env,c]};o||(o=(()=>{const n=ne(this._basePath,t),c=n==="/"?0:n.length;return u=>{const p=new URL(u.url);return p.pathname=p.pathname.slice(c)||"/",new Request(p,u)}})());const l=async(n,c)=>{const u=await r(o(n.req.raw),...i(n));if(u)return u;await c()};return x(this,P,J).call(this,T,ne(t,"*"),l),this}},M=new WeakMap,P=new WeakSet,mt=function(){const t=new gt({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,f(t,N,d(this,N)),t.routes=this.routes,t},N=new WeakMap,J=function(t,r,s){t=t.toUpperCase(),r=ne(this._basePath,r);const o={basePath:this._basePath,path:r,method:t,handler:s};this.router.add(t,r,[s,o]),this.routes.push(o)},Oe=function(t,r){if(t instanceof Error)return this.errorHandler(t,r);throw t},Re=function(t,r,s,o){if(o==="HEAD")return(async()=>new Response(null,await x(this,P,Re).call(this,t,r,s,"GET")))();const a=this.getPath(t,{env:s}),i=this.router.match(o,a),l=new Bt(t,{path:a,matchResult:i,env:s,executionCtx:r,notFoundHandler:d(this,N)});if(i[0].length===1){let c;try{c=i[0][0][0][0](l,async()=>{l.res=await d(this,N).call(this,l)})}catch(u){return x(this,P,Oe).call(this,u,l)}return c instanceof Promise?c.then(u=>u||(l.finalized?l.res:d(this,N).call(this,l))).catch(u=>x(this,P,Oe).call(this,u,l)):c??d(this,N).call(this,l)}const n=Ue(i[0],this.errorHandler,d(this,N));return(async()=>{try{const c=await n(l);if(!c.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return c.res}catch(c){return x(this,P,Oe).call(this,c,l)}})()},Je),$e="[^/]+",ve=".*",xe="(?:|/.*)",ce=Symbol(),Yt=new Set(".\\+*[^]$()");function Jt(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===ve||e===xe?1:t===ve||t===xe?-1:e===$e?1:t===$e?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var ee,te,L,Qe,He=(Qe=class{constructor(){b(this,ee);b(this,te);b(this,L,Object.create(null))}insert(t,r,s,o,a){if(t.length===0){if(d(this,ee)!==void 0)throw ce;if(a)return;f(this,ee,r);return}const[i,...l]=t,n=i==="*"?l.length===0?["","",ve]:["","",$e]:i==="/*"?["","",xe]:i.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let c;if(n){const u=n[1];let p=n[2]||$e;if(u&&n[2]&&(p===".*"||(p=p.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(p))))throw ce;if(c=d(this,L)[p],!c){if(Object.keys(d(this,L)).some(h=>h!==ve&&h!==xe))throw ce;if(a)return;c=d(this,L)[p]=new He,u!==""&&f(c,te,o.varIndex++)}!a&&u!==""&&s.push([u,d(c,te)])}else if(c=d(this,L)[i],!c){if(Object.keys(d(this,L)).some(u=>u.length>1&&u!==ve&&u!==xe))throw ce;if(a)return;c=d(this,L)[i]=new He}c.insert(l,r,s,o,a)}buildRegExpStr(){const r=Object.keys(d(this,L)).sort(Jt).map(s=>{const o=d(this,L)[s];return(typeof d(o,te)=="number"?`(${s})@${d(o,te)}`:Yt.has(s)?`\\${s}`:s)+o.buildRegExpStr()});return typeof d(this,ee)=="number"&&r.unshift(`#${d(this,ee)}`),r.length===0?"":r.length===1?r[0]:"(?:"+r.join("|")+")"}},ee=new WeakMap,te=new WeakMap,L=new WeakMap,Qe),_e,Pe,Ze,Qt=(Ze=class{constructor(){b(this,_e,{varIndex:0});b(this,Pe,new He)}insert(e,t,r){const s=[],o=[];for(let i=0;;){let l=!1;if(e=e.replace(/\{[^}]+\}/g,n=>{const c=`@\\${i}`;return o[i]=[c,n],i++,l=!0,c}),!l)break}const a=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let i=o.length-1;i>=0;i--){const[l]=o[i];for(let n=a.length-1;n>=0;n--)if(a[n].indexOf(l)!==-1){a[n]=a[n].replace(l,o[i][1]);break}}return d(this,Pe).insert(a,t,s,d(this,_e),r),s}buildRegExp(){let e=d(this,Pe).buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const r=[],s=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(o,a,i)=>a!==void 0?(r[++t]=Number(a),"$()"):(i!==void 0&&(s[Number(i)]=++t),"")),[new RegExp(`^${e}`),r,s]}},_e=new WeakMap,Pe=new WeakMap,Ze),bt=[],Zt=[/^$/,[],Object.create(null)],Se=Object.create(null);function vt(e){return Se[e]??(Se[e]=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,r)=>r?`\\${r}`:"(?:|/.*)")}$`))}function es(){Se=Object.create(null)}function ts(e){var c;const t=new Qt,r=[];if(e.length===0)return Zt;const s=e.map(u=>[!/\*|\/:/.test(u[0]),...u]).sort(([u,p],[h,y])=>u?1:h?-1:p.length-y.length),o=Object.create(null);for(let u=0,p=-1,h=s.length;u<h;u++){const[y,m,v]=s[u];y?o[m]=[v.map(([j])=>[j,Object.create(null)]),bt]:p++;let w;try{w=t.insert(m,p,y)}catch(j){throw j===ce?new ft(m):j}y||(r[p]=v.map(([j,R])=>{const z=Object.create(null);for(R-=1;R>=0;R--){const[E,I]=w[R];z[E]=I}return[j,z]}))}const[a,i,l]=t.buildRegExp();for(let u=0,p=r.length;u<p;u++)for(let h=0,y=r[u].length;h<y;h++){const m=(c=r[u][h])==null?void 0:c[1];if(!m)continue;const v=Object.keys(m);for(let w=0,j=v.length;w<j;w++)m[v[w]]=l[m[v[w]]]}const n=[];for(const u in i)n[u]=r[i[u]];return[a,n,o]}function ie(e,t){if(e){for(const r of Object.keys(e).sort((s,o)=>o.length-s.length))if(vt(r).test(t))return[...e[r]]}}var W,K,ge,xt,yt,et,ss=(et=class{constructor(){b(this,ge);g(this,"name","RegExpRouter");b(this,W);b(this,K);f(this,W,{[T]:Object.create(null)}),f(this,K,{[T]:Object.create(null)})}add(e,t,r){var l;const s=d(this,W),o=d(this,K);if(!s||!o)throw new Error(ht);s[e]||[s,o].forEach(n=>{n[e]=Object.create(null),Object.keys(n[T]).forEach(c=>{n[e][c]=[...n[T][c]]})}),t==="/*"&&(t="*");const a=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const n=vt(t);e===T?Object.keys(s).forEach(c=>{var u;(u=s[c])[t]||(u[t]=ie(s[c],t)||ie(s[T],t)||[])}):(l=s[e])[t]||(l[t]=ie(s[e],t)||ie(s[T],t)||[]),Object.keys(s).forEach(c=>{(e===T||e===c)&&Object.keys(s[c]).forEach(u=>{n.test(u)&&s[c][u].push([r,a])})}),Object.keys(o).forEach(c=>{(e===T||e===c)&&Object.keys(o[c]).forEach(u=>n.test(u)&&o[c][u].push([r,a]))});return}const i=it(t)||[t];for(let n=0,c=i.length;n<c;n++){const u=i[n];Object.keys(o).forEach(p=>{var h;(e===T||e===p)&&((h=o[p])[u]||(h[u]=[...ie(s[p],u)||ie(s[T],u)||[]]),o[p][u].push([r,a-c+n+1]))})}}match(e,t){es();const r=x(this,ge,xt).call(this);return this.match=(s,o)=>{const a=r[s]||r[T],i=a[2][o];if(i)return i;const l=o.match(a[0]);if(!l)return[[],bt];const n=l.indexOf("",1);return[a[1][n],l]},this.match(e,t)}},W=new WeakMap,K=new WeakMap,ge=new WeakSet,xt=function(){const e=Object.create(null);return Object.keys(d(this,K)).concat(Object.keys(d(this,W))).forEach(t=>{e[t]||(e[t]=x(this,ge,yt).call(this,t))}),f(this,W,f(this,K,void 0)),e},yt=function(e){const t=[];let r=e===T;return[d(this,W),d(this,K)].forEach(s=>{const o=s[e]?Object.keys(s[e]).map(a=>[a,s[e][a]]):[];o.length!==0?(r||(r=!0),t.push(...o)):e!==T&&t.push(...Object.keys(s[T]).map(a=>[a,s[T][a]]))}),r?ts(t):null},et),X,V,tt,rs=(tt=class{constructor(e){g(this,"name","SmartRouter");b(this,X,[]);b(this,V,[]);f(this,X,e.routers)}add(e,t,r){if(!d(this,V))throw new Error(ht);d(this,V).push([e,t,r])}match(e,t){if(!d(this,V))throw new Error("Fatal error");const r=d(this,X),s=d(this,V),o=r.length;let a=0,i;for(;a<o;a++){const l=r[a];try{for(let n=0,c=s.length;n<c;n++)l.add(...s[n]);i=l.match(e,t)}catch(n){if(n instanceof ft)continue;throw n}this.match=l.match.bind(l),f(this,X,[l]),f(this,V,void 0);break}if(a===o)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,i}get activeRouter(){if(d(this,V)||d(this,X).length!==1)throw new Error("No active router has been determined yet.");return d(this,X)[0]}},X=new WeakMap,V=new WeakMap,tt),be=Object.create(null),Y,C,se,fe,k,q,Q,st,wt=(st=class{constructor(e,t,r){b(this,q);b(this,Y);b(this,C);b(this,se);b(this,fe,0);b(this,k,be);if(f(this,C,r||Object.create(null)),f(this,Y,[]),e&&t){const s=Object.create(null);s[e]={handler:t,possibleKeys:[],score:0},f(this,Y,[s])}f(this,se,[])}insert(e,t,r){f(this,fe,++ze(this,fe)._);let s=this;const o=Mt(t),a=[];for(let i=0,l=o.length;i<l;i++){const n=o[i],c=o[i+1],u=Dt(n,c),p=Array.isArray(u)?u[0]:n;if(p in d(s,C)){s=d(s,C)[p],u&&a.push(u[1]);continue}d(s,C)[p]=new wt,u&&(d(s,se).push(u),a.push(u[1])),s=d(s,C)[p]}return d(s,Y).push({[e]:{handler:r,possibleKeys:a.filter((i,l,n)=>n.indexOf(i)===l),score:d(this,fe)}}),s}search(e,t){var l;const r=[];f(this,k,be);let o=[this];const a=ot(t),i=[];for(let n=0,c=a.length;n<c;n++){const u=a[n],p=n===c-1,h=[];for(let y=0,m=o.length;y<m;y++){const v=o[y],w=d(v,C)[u];w&&(f(w,k,d(v,k)),p?(d(w,C)["*"]&&r.push(...x(this,q,Q).call(this,d(w,C)["*"],e,d(v,k))),r.push(...x(this,q,Q).call(this,w,e,d(v,k)))):h.push(w));for(let j=0,R=d(v,se).length;j<R;j++){const z=d(v,se)[j],E=d(v,k)===be?{}:{...d(v,k)};if(z==="*"){const U=d(v,C)["*"];U&&(r.push(...x(this,q,Q).call(this,U,e,d(v,k))),f(U,k,E),h.push(U));continue}const[I,ae,A]=z;if(!u&&!(A instanceof RegExp))continue;const $=d(v,C)[I],At=a.slice(n).join("/");if(A instanceof RegExp){const U=A.exec(At);if(U){if(E[ae]=U[0],r.push(...x(this,q,Q).call(this,$,e,d(v,k),E)),Object.keys(d($,C)).length){f($,k,E);const Ie=((l=U[0].match(/\//))==null?void 0:l.length)??0;(i[Ie]||(i[Ie]=[])).push($)}continue}}(A===!0||A.test(u))&&(E[ae]=u,p?(r.push(...x(this,q,Q).call(this,$,e,E,d(v,k))),d($,C)["*"]&&r.push(...x(this,q,Q).call(this,d($,C)["*"],e,E,d(v,k)))):(f($,k,E),h.push($)))}}o=h.concat(i.shift()??[])}return r.length>1&&r.sort((n,c)=>n.score-c.score),[r.map(({handler:n,params:c})=>[n,c])]}},Y=new WeakMap,C=new WeakMap,se=new WeakMap,fe=new WeakMap,k=new WeakMap,q=new WeakSet,Q=function(e,t,r,s){const o=[];for(let a=0,i=d(e,Y).length;a<i;a++){const l=d(e,Y)[a],n=l[t]||l[T],c={};if(n!==void 0&&(n.params=Object.create(null),o.push(n),r!==be||s&&s!==be))for(let u=0,p=n.possibleKeys.length;u<p;u++){const h=n.possibleKeys[u],y=c[n.score];n.params[h]=s!=null&&s[h]&&!y?s[h]:r[h]??(s==null?void 0:s[h]),c[n.score]=!0}}return o},st),re,rt,os=(rt=class{constructor(){g(this,"name","TrieRouter");b(this,re);f(this,re,new wt)}add(e,t,r){const s=it(t);if(s){for(let o=0,a=s.length;o<a;o++)d(this,re).insert(e,s[o],r);return}d(this,re).insert(e,t,r)}match(e,t){return d(this,re).search(e,t)}},re=new WeakMap,rt),Et=class extends gt{constructor(e={}){super(e),this.router=e.router??new rs({routers:[new ss,new os]})}},as=e=>{const r={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...e},s=(a=>typeof a=="string"?a==="*"?()=>a:i=>a===i?i:null:typeof a=="function"?a:i=>a.includes(i)?i:null)(r.origin),o=(a=>typeof a=="function"?a:Array.isArray(a)?()=>a:()=>[])(r.allowMethods);return async function(i,l){var u;function n(p,h){i.res.headers.set(p,h)}const c=s(i.req.header("origin")||"",i);if(c&&n("Access-Control-Allow-Origin",c),r.origin!=="*"){const p=i.req.header("Vary");p?n("Vary",p):n("Vary","Origin")}if(r.credentials&&n("Access-Control-Allow-Credentials","true"),(u=r.exposeHeaders)!=null&&u.length&&n("Access-Control-Expose-Headers",r.exposeHeaders.join(",")),i.req.method==="OPTIONS"){r.maxAge!=null&&n("Access-Control-Max-Age",r.maxAge.toString());const p=o(i.req.header("origin")||"",i);p.length&&n("Access-Control-Allow-Methods",p.join(","));let h=r.allowHeaders;if(!(h!=null&&h.length)){const y=i.req.header("Access-Control-Request-Headers");y&&(h=y.split(/\s*,\s*/))}return h!=null&&h.length&&(n("Access-Control-Allow-Headers",h.join(",")),i.res.headers.append("Vary","Access-Control-Request-Headers")),i.res.headers.delete("Content-Length"),i.res.headers.delete("Content-Type"),new Response(null,{headers:i.res.headers,status:204,statusText:"No Content"})}await l()}},is=/^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i,We=(e,t=ls)=>{const r=/\.([a-zA-Z0-9]+?)$/,s=e.match(r);if(!s)return;let o=t[s[1]];return o&&o.startsWith("text")&&(o+="; charset=utf-8"),o},ns={aac:"audio/aac",avi:"video/x-msvideo",avif:"image/avif",av1:"video/av1",bin:"application/octet-stream",bmp:"image/bmp",css:"text/css",csv:"text/csv",eot:"application/vnd.ms-fontobject",epub:"application/epub+zip",gif:"image/gif",gz:"application/gzip",htm:"text/html",html:"text/html",ico:"image/x-icon",ics:"text/calendar",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",jsonld:"application/ld+json",map:"application/json",mid:"audio/x-midi",midi:"audio/x-midi",mjs:"text/javascript",mp3:"audio/mpeg",mp4:"video/mp4",mpeg:"video/mpeg",oga:"audio/ogg",ogv:"video/ogg",ogx:"application/ogg",opus:"audio/opus",otf:"font/otf",pdf:"application/pdf",png:"image/png",rtf:"application/rtf",svg:"image/svg+xml",tif:"image/tiff",tiff:"image/tiff",ts:"video/mp2t",ttf:"font/ttf",txt:"text/plain",wasm:"application/wasm",webm:"video/webm",weba:"audio/webm",webmanifest:"application/manifest+json",webp:"image/webp",woff:"font/woff",woff2:"font/woff2",xhtml:"application/xhtml+xml",xml:"application/xml",zip:"application/zip","3gp":"video/3gpp","3g2":"video/3gpp2",gltf:"model/gltf+json",glb:"model/gltf-binary"},ls=ns,cs=(...e)=>{let t=e.filter(o=>o!=="").join("/");t=t.replace(new RegExp("(?<=\\/)\\/+","g"),"");const r=t.split("/"),s=[];for(const o of r)o===".."&&s.length>0&&s.at(-1)!==".."?s.pop():o!=="."&&s.push(o);return s.join("/")||"."},jt={br:".br",zstd:".zst",gzip:".gz"},ds=Object.keys(jt),us="index.html",ps=e=>{const t=e.root??"./",r=e.path,s=e.join??cs;return async(o,a)=>{var u,p,h,y;if(o.finalized)return a();let i;if(e.path)i=e.path;else try{if(i=decodeURIComponent(o.req.path),/(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(i))throw new Error}catch{return await((u=e.onNotFound)==null?void 0:u.call(e,o.req.path,o)),a()}let l=s(t,!r&&e.rewriteRequestPath?e.rewriteRequestPath(i):i);e.isDir&&await e.isDir(l)&&(l=s(l,us));const n=e.getContent;let c=await n(l,o);if(c instanceof Response)return o.newResponse(c.body,c);if(c){const m=e.mimes&&We(l,e.mimes)||We(l);if(o.header("Content-Type",m||"application/octet-stream"),e.precompressed&&(!m||is.test(m))){const v=new Set((p=o.req.header("Accept-Encoding"))==null?void 0:p.split(",").map(w=>w.trim()));for(const w of ds){if(!v.has(w))continue;const j=await n(l+jt[w],o);if(j){c=j,o.header("Content-Encoding",w),o.header("Vary","Accept-Encoding",{append:!0});break}}}return await((h=e.onFound)==null?void 0:h.call(e,l,o)),o.body(c)}await((y=e.onNotFound)==null?void 0:y.call(e,l,o)),await a()}},hs=async(e,t)=>{let r;t&&t.manifest?typeof t.manifest=="string"?r=JSON.parse(t.manifest):r=t.manifest:typeof __STATIC_CONTENT_MANIFEST=="string"?r=JSON.parse(__STATIC_CONTENT_MANIFEST):r=__STATIC_CONTENT_MANIFEST;let s;t&&t.namespace?s=t.namespace:s=__STATIC_CONTENT;const o=r[e]||e;if(!o)return null;const a=await s.get(o,{type:"stream"});return a||null},fs=e=>async function(r,s){return ps({...e,getContent:async a=>hs(a,{manifest:e.manifest,namespace:e.namespace?e.namespace:r.env?r.env.__STATIC_CONTENT:void 0})})(r,s)},gs=e=>fs(e);const S=new Et;S.use("/api/*",as());S.use("/static/*",gs({root:"./public"}));const Ce=new Map;function me(e,t=100,r=6e4){const s=Date.now(),o=s-r;Ce.has(e)||Ce.set(e,[]);const i=Ce.get(e).filter(l=>l>o);return i.length>=t?!1:(i.push(s),Ce.set(e,i),!0)}async function Ae(e,t,r,s="GET",o){const a=`https://${e}.myshopify.com/admin/api/2024-01/${r}`,l={method:s,headers:{"X-Shopify-Access-Token":t,"Content-Type":"application/json"}};o&&(s==="POST"||s==="PUT")&&(l.body=JSON.stringify(o));const n=await fetch(a,l);if(!n.ok){const u=await n.text();throw new Error(`Shopify API error: ${n.status} - ${u}`)}return await n.json()}function qe(e){if(!e)return"";const t=e.split(",");for(const r of t)if(r.includes('rel="next"')){const s=r.split(";")[0].trim();if(s.startsWith("<")&&s.endsWith(">"))return s.slice(1,-1)}return""}async function oe(e,t,r){let s=[],o=`https://${e}.myshopify.com/admin/api/2024-01/products.json?limit=250&fields=id,title,body_html,vendor,product_type,created_at,updated_at,published_at,tags,status,variants,options,images,image`;for(console.log("🚀 USANDO LÓGICA DO SEU SCRIPT PYTHON - LINK HEADER PAGINATION");o;){console.log(`🔍 Fetching: ${o}`);try{const i=await fetch(o,{method:"GET",headers:{"X-Shopify-Access-Token":t,"Content-Type":"application/json"}});if(!i.ok){const u=await i.text();throw new Error(`Shopify API error: ${i.status} - ${u}`)}const n=(await i.json()).products||[];if(console.log(`📦 Received ${n.length} products... Total so far: ${s.length+n.length}`),n.length===0){console.log("🛑 No products in response, ending pagination");break}s=s.concat(n);const c=i.headers.get("Link")||"";o=qe(c),console.log(o?`➡️ Next page found: ${o}`:"✅ No more pages, pagination complete")}catch(a){console.error("❌ Error in pagination:",a);break}}return console.log(`🎉 PAGINATION COMPLETE: ${s.length} total products found`),s}async function Tt(e,t){let r=[];const s=["custom_collections","smart_collections"];console.log("🚀 BUSCANDO COLEÇÕES - MESMA LÓGICA DO PYTHON");for(const o of s){let a=`https://${e}.myshopify.com/admin/api/2024-01/${o}.json?limit=250`;for(console.log(`🔍 Fetching ${o}...`);a;)try{const l=await fetch(a,{method:"GET",headers:{"X-Shopify-Access-Token":t,"Content-Type":"application/json"}});if(!l.ok){console.log(`Error fetching ${o}: ${l.status}`);break}const c=(await l.json())[o]||[];if(console.log(`📦 Found ${c.length} ${o}`),c.length===0)break;r=r.concat(c);const u=l.headers.get("Link")||"";a=qe(u)}catch(i){console.error(`Error fetching ${o}:`,i);break}}return console.log(`🎉 TOTAL COLLECTIONS: ${r.length}`),r}async function ms(e,t,r){let s=[],o=`https://${e}.myshopify.com/admin/api/2024-01/collections/${r}/products.json?limit=250&fields=id`;for(;o;)try{const a=await fetch(o,{method:"GET",headers:{"X-Shopify-Access-Token":t,"Content-Type":"application/json"}});if(!a.ok)break;const l=(await a.json()).products||[];s=s.concat(l);const n=a.headers.get("Link")||"";o=qe(n)}catch(a){console.log(`❌ Error in collection ${r} pagination:`,a);break}return s}async function bs(e,t,r){const s={};console.log("🔍 MAPEANDO PRODUTOS POR COLEÇÃO COM PAGINAÇÃO COMPLETA...");for(const o of r)try{console.log(`🔍 Buscando produtos da coleção "${o.title}"...`);const a=await ms(e,t,o.id);a.forEach(i=>{s[i.id]||(s[i.id]=[]),s[i.id].push(o.id.toString())}),console.log(`✅ Coleção "${o.title}": ${a.length} produtos (com paginação completa)`)}catch(a){console.log(`❌ Erro na coleção ${o.title}:`,a)}return console.log(`✅ Mapeamento completo: ${Object.keys(s).length} produtos mapeados`),s}async function vs(e,t,r,s){const o=[];for(let a=0;a<r.length;a++){const i=r[a];try{const l={id:i.id};s.title&&s.title!==i.title&&(l.title=s.title),s.description!==void 0&&s.description!==i.body_html&&(l.body_html=s.description),s.vendor&&s.vendor!==i.vendor&&(l.vendor=s.vendor),s.productType&&s.productType!==i.product_type&&(l.product_type=s.productType),s.tags!==void 0&&(l.tags=s.tags),s.status&&s.status!==i.status&&(l.status=s.status),(s.seoTitle||s.seoDescription)&&(l.metafields_global_title_tag=s.seoTitle||i.metafields_global_title_tag,l.metafields_global_description_tag=s.seoDescription||i.metafields_global_description_tag),(s.price||s.comparePrice)&&(l.variants=i.variants.map(c=>({id:c.id,price:s.price||c.price,compare_at_price:s.comparePrice||c.compare_at_price}))),s.inventory!==void 0&&(l.variants=i.variants.map(c=>({id:c.id,inventory_quantity:s.inventory})));const n=await Ae(e,t,`products/${i.id}.json`,"PUT",{product:l});o.push({id:i.id,success:!0,data:n.product}),a<r.length-1&&await new Promise(c=>setTimeout(c,200))}catch(l){o.push({id:i.id,success:!1,error:l instanceof Error?l.message:"Unknown error"})}}return o}S.post("/api/test-connection",async e=>{try{const{shop:t,accessToken:r}=await e.req.json();if(!t||!r)return e.json({error:"Parâmetros obrigatórios: shop e accessToken"},400);const s=await Ae(t,r,"shop.json");return e.json({success:!0,shop:s.shop.name,domain:s.shop.domain,plan:s.shop.plan_name})}catch(t){return e.json({error:"Falha na conexão: "+(t instanceof Error?t.message:"Erro desconhecido")},401)}});S.get("/favicon.ico",e=>e.text("",204));S.get("/test-variant-fix",e=>e.html(`<!DOCTYPE html>
<html>
<head>
    <title>Teste - Variant Values Fix</title>
    <script src="https://cdn.tailwindcss.com"><\/script>
</head>
<body class="p-8">
    <h1 class="text-2xl font-bold mb-4">🧪 Teste da Correção de Valores de Variantes</h1>
    
    <div class="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
        <h2 class="text-lg font-bold text-green-800 mb-2">✅ Correção Aplicada</h2>
        <p class="text-green-700">Quando o usuário tenta alterar apenas valores de variantes:</p>
        <ul class="list-disc ml-6 mt-2 text-green-700">
            <li><strong>ANTES:</strong> Modal fechava + mensagem vermelha de erro + voltava para página principal</li>
            <li><strong>AGORA:</strong> Modal permanece aberto + mensagem azul informativa dentro do modal + usuário pode tentar novamente</li>
        </ul>
    </div>

    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <h2 class="text-lg font-bold text-blue-800 mb-2">🔧 Mudanças Técnicas</h2>
        <ul class="list-disc ml-6 text-blue-700">
            <li>Função <code>applyVariantChanges()</code> não fecha mais o modal quando apenas valores são alterados</li>
            <li>Nova função <code>showVariantMessage()</code> exibe mensagens dentro do próprio modal</li>
            <li>Mensagem informativa em azul em vez de erro vermelho</li>
            <li>Usuário pode fechar a mensagem ou tentar outras alterações</li>
        </ul>
    </div>

    <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
        <h2 class="text-lg font-bold text-yellow-800 mb-2">🧪 Simulação da Correção</h2>
        <p class="text-yellow-700 mb-3">Clique no botão abaixo para simular o comportamento corrigido:</p>
        <button onclick="testVariantMessage()" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Simular Alteração de Valores
        </button>
        <div id="test-modal" class="hidden fixed inset-0 bg-black bg-opacity-50 items-center justify-center z-50">
            <div class="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-bold">Variantes e Opções (Simulação)</h3>
                    <button onclick="closeTestModal()" class="text-gray-500 hover:text-gray-700">✕</button>
                </div>
                <div class="mb-4 p-4 bg-gray-50 rounded">
                    <p>Simulando: Usuário alterou valores de variantes e clicou em "Aplicar Alterações"</p>
                </div>
                <div id="test-message-area"></div>
            </div>
        </div>
    </div>

    <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h2 class="text-lg font-bold text-gray-800 mb-2">🚀 Como Testar no App Real</h2>
        <ol class="list-decimal ml-6 text-gray-700">
            <li>Conecte-se com suas credenciais Shopify</li>
            <li>Carregue produtos</li>
            <li>Clique em "Variantes e Opções"</li>
            <li>Carregue variantes existentes</li>
            <li>Vá para a aba "Valores e Preços"</li>
            <li>Marque algumas alterações de valores</li>
            <li>Clique em "Aplicar Alterações"</li>
            <li><strong>Resultado:</strong> Mensagem azul informativa, modal permanece aberto</li>
        </ol>
    </div>

    <div class="mt-6 flex gap-4">
        <a href="/" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            🔗 Voltar ao Infinity Bulk Manager
        </a>
    </div>

    <script>
        function testVariantMessage() {
            document.getElementById('test-modal').classList.remove('hidden');
            document.getElementById('test-modal').classList.add('flex');
            
            // Simular a mensagem que apareceria
            setTimeout(() => {
                const messageArea = document.getElementById('test-message-area');
                messageArea.innerHTML = \`
                    <div class="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-700">
                        <div class="flex items-start">
                            <i class="fas fa-info-circle mt-0.5 mr-3"></i>
                            <div class="flex-1">ℹ️ A edição de valores de variantes será implementada em breve. Por enquanto, você pode alterar apenas os títulos das opções (ex: "SIZE" → "Tamanho").</div>
                            <button onclick="this.parentElement.parentElement.remove()" class="ml-2 text-gray-400 hover:text-gray-600">
                                ✕
                            </button>
                        </div>
                    </div>
                \`;
            }, 500);
        }
        
        function closeTestModal() {
            document.getElementById('test-modal').classList.add('hidden');
            document.getElementById('test-modal').classList.remove('flex');
            document.getElementById('test-message-area').innerHTML = '';
        }
    <\/script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
</body>
</html>`));S.post("/api/products",async e=>{try{const{shop:t,accessToken:r}=await e.req.json();if(!t||!r)return e.json({error:"Parâmetros obrigatórios: shop e accessToken"},400);if(!me(`products:${t}`,50))return e.json({error:"Rate limit exceeded"},429);console.log("Loading ALL products with working pagination logic");const s=await oe(t,r);console.log(`✅ Successfully loaded ${s.length} total products`),console.log("🔍 Loading collections for product mapping...");const o=await Tt(t,r);console.log(`✅ Loaded ${o.length} collections`);const a=await bs(t,r,o),i=s.map(l=>({...l,collection_ids:a[l.id]||[]}));return i.length>0&&console.log("✅ First product with collections:",{id:i[0].id,title:i[0].title,collection_ids:i[0].collection_ids}),e.json({products:i,total:i.length})}catch(t){return e.json({error:"Erro ao buscar produtos: "+(t instanceof Error?t.message:"Erro desconhecido")},500)}});S.post("/api/collections",async e=>{try{const{shop:t,accessToken:r}=await e.req.json();if(!t||!r)return e.json({error:"Parâmetros obrigatórios: shop e accessToken"},400);if(!me(`collections:${t}`,30))return e.json({error:"Rate limit exceeded"},429);const s=await Tt(t,r);return e.json({collections:s})}catch(t){return e.json({error:"Erro ao buscar coleções: "+(t instanceof Error?t.message:"Erro desconhecido")},500)}});S.post("/api/bulk-update",async e=>{try{const{shop:t,accessToken:r,productIds:s,updates:o}=await e.req.json();if(!t||!r||!s||!o)return e.json({error:"Parâmetros obrigatórios: shop, accessToken, productIds, updates"},400);if(!me(`bulk:${t}`,10,3e5))return e.json({error:"Rate limit exceeded for bulk operations"},429);const a=[];for(const l of s)try{const n=await Ae(t,r,`products/${l}.json`);a.push(n.product)}catch(n){console.error(`Error fetching product ${l}:`,n)}const i=await vs(t,r,a,o);return e.json({results:i,successful:i.filter(l=>l.success).length,failed:i.filter(l=>!l.success).length})}catch(t){return e.json({error:"Erro na atualização em massa: "+(t instanceof Error?t.message:"Erro desconhecido")},500)}});S.post("/api/analyze-variants",async e=>{try{const{shop:t,accessToken:r,scope:s,selectedProductIds:o}=await e.req.json();if(!t||!r)return e.json({error:"Parâmetros obrigatórios: shop e accessToken"},400);if(s==="selected"&&(!o||o.length===0))return e.json({error:'Para escopo "selected", selectedProductIds é obrigatório'},400);if(!me(`analyze-variants:${t}`,10,6e4))return e.json({error:"Rate limit exceeded for variant analysis"},429);let a=[];s==="selected"?(a=(await oe(t,r,250)).filter(c=>o.includes(c.id.toString())||o.includes(c.id)),console.log(`🎯 Analisando variantes de ${a.length} produtos selecionados`)):(a=await oe(t,r,250),console.log(`🌐 Analisando variantes de todos os ${a.length} produtos`));const i={},l={};return a.forEach(n=>{n.options&&n.options.length>0&&(n.options.forEach(c=>{l[c.name]||(l[c.name]={name:c.name,values:new Set,productCount:0,products:[]}),l[c.name].productCount++,l[c.name].products.push({id:n.id,title:n.title}),c.values&&c.values.forEach(u=>{l[c.name].values.add(u)})}),n.variants&&n.variants.length>0&&n.variants.forEach(c=>{const u=`${n.id}_${c.id}`;i[u]={productId:n.id,productTitle:n.title,variantId:c.id,variantTitle:c.title,price:c.price,option1:c.option1,option2:c.option2,option3:c.option3,sku:c.sku}}))}),Object.keys(l).forEach(n=>{l[n].values=Array.from(l[n].values),l[n].products=l[n].products.slice(0,10)}),e.json({success:!0,totalProducts:a.length,optionStats:l,variantCount:Object.keys(i).length,sampleVariants:Object.values(i).slice(0,50)})}catch(t){return e.json({error:"Erro na análise de variantes: "+(t instanceof Error?t.message:"Erro desconhecido")},500)}});S.post("/api/bulk-update-variant-titles",async e=>{var t;try{const{shop:r,accessToken:s,titleMappings:o,scope:a,selectedProductIds:i}=await e.req.json();if(!r||!s||!o||o.length===0)return e.json({error:"Parâmetros obrigatórios: shop, accessToken, titleMappings"},400);if(a==="selected"&&(!i||i.length===0))return e.json({error:'Para escopo "selected", selectedProductIds é obrigatório'},400);if(!me(`bulk-variants:${r}`,5,3e5))return e.json({error:"Rate limit exceeded for bulk variant operations"},429);let l=[];a==="all"?l=await oe(r,s,250):l=(await oe(r,s,250)).filter(h=>i.includes(h.id.toString())||i.includes(h.id));let n=0,c=0;const u=[];console.log(`🎯 Processando ${l.length} produtos (escopo: ${a})`);for(const p of l)try{let h=!1;const y=((t=p.options)==null?void 0:t.map(m=>{const v=o.find(w=>w.currentTitle.toLowerCase()===m.name.toLowerCase());return v&&v.newTitle&&v.newTitle!==m.name?(h=!0,{...m,name:v.newTitle}):m}))||[];if(h&&y.length>0){const m=await Ae(r,s,`products/${p.id}.json`,"PUT",{product:{id:p.id,options:y}});n++,u.push({productId:p.id,title:p.title,success:!0,changes:y.map(v=>v.name).join(", ")}),await new Promise(v=>setTimeout(v,500))}}catch(h){c++,u.push({productId:p.id,title:p.title,success:!1,error:h instanceof Error?h.message:"Erro desconhecido"})}return e.json({success:!0,totalProducts:l.length,updatedCount:n,failedCount:c,results:u.slice(0,50)})}catch(r){return e.json({error:"Erro na atualização em massa de títulos de variantes: "+(r instanceof Error?r.message:"Erro desconhecido")},500)}});S.post("/api/bulk-update-variant-values",async e=>{var t;try{const{shop:r,accessToken:s,valueMappings:o,scope:a,selectedProductIds:i}=await e.req.json();if(!r||!s||!o||o.length===0)return e.json({error:"Parâmetros obrigatórios: shop, accessToken, valueMappings"},400);if(a==="selected"&&(!i||i.length===0))return e.json({error:'Para escopo "selected", selectedProductIds é obrigatório'},400);if(!me(`bulk-variant-values:${r}`,5,3e5))return e.json({error:"Rate limit exceeded for bulk variant value operations"},429);let l=[];a==="all"?l=await oe(r,s,250):l=(await oe(r,s,250)).filter(h=>i.includes(h.id.toString())||i.includes(h.id));let n=0,c=0;const u=[];console.log(`🎯 Processando valores de variantes em ${l.length} produtos (escopo: ${a})`);for(const p of l)try{let h=!1;const y=[];if(p.variants&&p.variants.length>0)for(const m of p.variants){let v=!1;const w=[];let j=0;if(m.option1||m.option2||m.option3){const R=[m.option1,m.option2,m.option3].filter(Boolean),z=((t=p.options)==null?void 0:t.map(E=>E.name))||[];for(let E=0;E<R.length;E++){const I=R[E],ae=z[E],A=o.find($=>$.optionName===ae&&$.currentValue.toLowerCase()===I.toLowerCase());A&&(A.newValue&&A.newValue!==I&&(E===0?m.option1=A.newValue:E===1?m.option2=A.newValue:E===2&&(m.option3=A.newValue),v=!0,h=!0,console.log(`🔄 ${p.title}: ${ae} "${I}" → "${A.newValue}"`)),A.priceExtra&&A.priceExtra>0&&(j+=A.priceExtra,v=!0,h=!0,console.log(`💰 ${p.title}: Preço extra +R$ ${A.priceExtra} para ${ae}="${A.newValue||I}"`)))}}if(v)try{const R={id:m.id,option1:m.option1,option2:m.option2||null,option3:m.option3||null};if(j>0){const I=((parseFloat(m.price)||0)+j).toFixed(2);R.price=I,console.log(`💰 ${p.title}: Preço atualizado de R$ ${m.price} para R$ ${I} (+R$ ${j.toFixed(2)})`)}const z=await Ae(r,s,`products/${p.id}/variants/${m.id}.json`,"PUT",{variant:R});y.push(m)}catch(R){console.error(`❌ Erro ao atualizar variante ${m.id}:`,R),c++}}h&&y.length>0&&(n++,u.push({success:!0,productId:p.id,title:p.title,changes:`${y.length} variantes atualizadas`}),console.log(`✅ ${p.title}: ${y.length} variantes atualizadas`))}catch(h){c++,u.push({success:!1,productId:p.id,title:p.title,error:h instanceof Error?h.message:"Erro desconhecido"}),console.error(`❌ Erro ao processar produto ${p.id}:`,h)}return console.log(`🎉 VALORES DE VARIANTES ATUALIZADOS: ${n} produtos, ${c} falhas`),e.json({success:!0,totalProducts:l.length,updatedCount:n,failedCount:c,results:u.slice(0,50)})}catch(r){return e.json({error:"Erro na atualização em massa de valores de variantes: "+(r instanceof Error?r.message:"Erro desconhecido")},500)}});S.get("/",e=>e.html(`
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
                        <button id="close-modal" class="text-gray-500 hover:text-gray-700">
                            <i class="fas fa-times text-xl"></i>
                        </button>
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
                        <div class="flex justify-end space-x-4">
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
  `));const Ke=new Et,xs=Object.assign({"/src/index.tsx":S});let Pt=!1;for(const[,e]of Object.entries(xs))e&&(Ke.route("/",e),Ke.notFound(e.notFoundHandler),Pt=!0);if(!Pt)throw new Error("Can't import modules from ['/src/index.tsx','/app/server.ts']");export{Ke as default};
