var ne=(e,t,a)=>(s,r)=>{let n=-1;return o(0);async function o(i){if(i<=n)throw new Error("next() called multiple times");n=i;let l,d=!1,c;if(e[i]?(c=e[i][0][0],s.req.routeIndex=i):c=i===e.length&&r||void 0,c)try{l=await c(s,()=>o(i+1))}catch(u){if(u instanceof Error&&t)s.error=u,l=await t(u,s),d=!0;else throw u}else s.finalized===!1&&a&&(l=await a(s));return l&&(s.finalized===!1||d)&&(s.res=l),s}},Ie=Symbol(),Oe=async(e,t=Object.create(null))=>{const{all:a=!1,dot:s=!1}=t,n=(e instanceof be?e.raw.headers:e.headers).get("Content-Type");return n?.startsWith("multipart/form-data")||n?.startsWith("application/x-www-form-urlencoded")?Me(e,{all:a,dot:s}):{}};async function Me(e,t){const a=await e.formData();return a?De(a,t):{}}function De(e,t){const a=Object.create(null);return e.forEach((s,r)=>{t.all||r.endsWith("[]")?Le(a,r,s):a[r]=s}),t.dot&&Object.entries(a).forEach(([s,r])=>{s.includes(".")&&(ze(a,s,r),delete a[s])}),a}var Le=(e,t,a)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(a):e[t]=[e[t],a]:t.endsWith("[]")?e[t]=[a]:e[t]=a},ze=(e,t,a)=>{let s=e;const r=t.split(".");r.forEach((n,o)=>{o===r.length-1?s[n]=a:((!s[n]||typeof s[n]!="object"||Array.isArray(s[n])||s[n]instanceof File)&&(s[n]=Object.create(null)),s=s[n])})},pe=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},Ne=e=>{const{groups:t,path:a}=_e(e),s=pe(a);return He(s,t)},_e=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(a,s)=>{const r=`@${s}`;return t.push([r,a]),r}),{groups:t,path:e}},He=(e,t)=>{for(let a=t.length-1;a>=0;a--){const[s]=t[a];for(let r=e.length-1;r>=0;r--)if(e[r].includes(s)){e[r]=e[r].replace(s,t[a][1]);break}}return e},U={},Ve=(e,t)=>{if(e==="*")return"*";const a=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(a){const s=`${e}#${t}`;return U[s]||(a[2]?U[s]=t&&t[0]!==":"&&t[0]!=="*"?[s,a[1],new RegExp(`^${a[2]}(?=/${t})`)]:[e,a[1],new RegExp(`^${a[2]}$`)]:U[s]=[e,a[1],!0]),U[s]}return null},Z=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,a=>{try{return t(a)}catch{return a}})}},Be=e=>Z(e,decodeURI),he=e=>{const t=e.url,a=t.indexOf("/",t.charCodeAt(9)===58?13:8);let s=a;for(;s<t.length;s++){const r=t.charCodeAt(s);if(r===37){const n=t.indexOf("?",s),o=t.slice(a,n===-1?void 0:n);return Be(o.includes("%25")?o.replace(/%25/g,"%2525"):o)}else if(r===63)break}return t.slice(a,s)},Fe=e=>{const t=he(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},z=(e,t,...a)=>(a.length&&(t=z(t,...a)),`${e?.[0]==="/"?"":"/"}${e}${t==="/"?"":`${e?.at(-1)==="/"?"":"/"}${t?.[0]==="/"?t.slice(1):t}`}`),ge=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),a=[];let s="";return t.forEach(r=>{if(r!==""&&!/\:/.test(r))s+="/"+r;else if(/\:/.test(r))if(/\?/.test(r)){a.length===0&&s===""?a.push("/"):a.push(s);const n=r.replace("?","");s+="/"+n,a.push(s)}else s+="/"+r}),a.filter((r,n,o)=>o.indexOf(r)===n)},X=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?Z(e,fe):e):e,me=(e,t,a)=>{let s;if(!a&&t&&!/[%+]/.test(t)){let o=e.indexOf(`?${t}`,8);for(o===-1&&(o=e.indexOf(`&${t}`,8));o!==-1;){const i=e.charCodeAt(o+t.length+1);if(i===61){const l=o+t.length+2,d=e.indexOf("&",l);return X(e.slice(l,d===-1?void 0:d))}else if(i==38||isNaN(i))return"";o=e.indexOf(`&${t}`,o+1)}if(s=/[%+]/.test(e),!s)return}const r={};s??=/[%+]/.test(e);let n=e.indexOf("?",8);for(;n!==-1;){const o=e.indexOf("&",n+1);let i=e.indexOf("=",n);i>o&&o!==-1&&(i=-1);let l=e.slice(n+1,i===-1?o===-1?void 0:o:i);if(s&&(l=X(l)),n=o,l==="")continue;let d;i===-1?d="":(d=e.slice(i+1,o===-1?void 0:o),s&&(d=X(d))),a?(r[l]&&Array.isArray(r[l])||(r[l]=[]),r[l].push(d)):r[l]??=d}return t?r[t]:r},qe=me,Ue=(e,t)=>me(e,t,!0),fe=decodeURIComponent,ie=e=>Z(e,fe),be=class{raw;#t;#e;routeIndex=0;path;bodyCache={};constructor(e,t="/",a=[[]]){this.raw=e,this.path=t,this.#e=a,this.#t={}}param(e){return e?this.#s(e):this.#o()}#s(e){const t=this.#e[0][this.routeIndex][1][e],a=this.#r(t);return a?/\%/.test(a)?ie(a):a:void 0}#o(){const e={},t=Object.keys(this.#e[0][this.routeIndex][1]);for(const a of t){const s=this.#r(this.#e[0][this.routeIndex][1][a]);s&&typeof s=="string"&&(e[a]=/\%/.test(s)?ie(s):s)}return e}#r(e){return this.#e[1]?this.#e[1][e]:e}query(e){return qe(this.url,e)}queries(e){return Ue(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((a,s)=>{t[s]=a}),t}async parseBody(e){return this.bodyCache.parsedBody??=await Oe(this,e)}#a=e=>{const{bodyCache:t,raw:a}=this,s=t[e];if(s)return s;const r=Object.keys(t)[0];return r?t[r].then(n=>(r==="json"&&(n=JSON.stringify(n)),new Response(n)[e]())):t[e]=a[e]()};json(){return this.#a("text").then(e=>JSON.parse(e))}text(){return this.#a("text")}arrayBuffer(){return this.#a("arrayBuffer")}blob(){return this.#a("blob")}formData(){return this.#a("formData")}addValidatedData(e,t){this.#t[e]=t}valid(e){return this.#t[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[Ie](){return this.#e}get matchedRoutes(){return this.#e[0].map(([[,e]])=>e)}get routePath(){return this.#e[0].map(([[,e]])=>e)[this.routeIndex].path}},Ge={Stringify:1},ve=async(e,t,a,s,r)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const n=e.callbacks;return n?.length?(r?r[0]+=e:r=[e],Promise.all(n.map(i=>i({phase:t,buffer:r,context:s}))).then(i=>Promise.all(i.filter(Boolean).map(l=>ve(l,t,!1,s,r))).then(()=>r[0]))):Promise.resolve(e)},Ke="text/plain; charset=UTF-8",J=(e,t)=>({"Content-Type":e,...t}),We=class{#t;#e;env={};#s;finalized=!1;error;#o;#r;#a;#c;#l;#d;#i;#u;#p;constructor(e,t){this.#t=e,t&&(this.#r=t.executionCtx,this.env=t.env,this.#d=t.notFoundHandler,this.#p=t.path,this.#u=t.matchResult)}get req(){return this.#e??=new be(this.#t,this.#p,this.#u),this.#e}get event(){if(this.#r&&"respondWith"in this.#r)return this.#r;throw Error("This context has no FetchEvent")}get executionCtx(){if(this.#r)return this.#r;throw Error("This context has no ExecutionContext")}get res(){return this.#a||=new Response(null,{headers:this.#i??=new Headers})}set res(e){if(this.#a&&e){e=new Response(e.body,e);for(const[t,a]of this.#a.headers.entries())if(t!=="content-type")if(t==="set-cookie"){const s=this.#a.headers.getSetCookie();e.headers.delete("set-cookie");for(const r of s)e.headers.append("set-cookie",r)}else e.headers.set(t,a)}this.#a=e,this.finalized=!0}render=(...e)=>(this.#l??=t=>this.html(t),this.#l(...e));setLayout=e=>this.#c=e;getLayout=()=>this.#c;setRenderer=e=>{this.#l=e};header=(e,t,a)=>{this.finalized&&(this.#a=new Response(this.#a.body,this.#a));const s=this.#a?this.#a.headers:this.#i??=new Headers;t===void 0?s.delete(e):a?.append?s.append(e,t):s.set(e,t)};status=e=>{this.#o=e};set=(e,t)=>{this.#s??=new Map,this.#s.set(e,t)};get=e=>this.#s?this.#s.get(e):void 0;get var(){return this.#s?Object.fromEntries(this.#s):{}}#n(e,t,a){const s=this.#a?new Headers(this.#a.headers):this.#i??new Headers;if(typeof t=="object"&&"headers"in t){const n=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[o,i]of n)o.toLowerCase()==="set-cookie"?s.append(o,i):s.set(o,i)}if(a)for(const[n,o]of Object.entries(a))if(typeof o=="string")s.set(n,o);else{s.delete(n);for(const i of o)s.append(n,i)}const r=typeof t=="number"?t:t?.status??this.#o;return new Response(e,{status:r,headers:s})}newResponse=(...e)=>this.#n(...e);body=(e,t,a)=>this.#n(e,t,a);text=(e,t,a)=>!this.#i&&!this.#o&&!t&&!a&&!this.finalized?new Response(e):this.#n(e,t,J(Ke,a));json=(e,t,a)=>this.#n(JSON.stringify(e),t,J("application/json",a));html=(e,t,a)=>{const s=r=>this.#n(r,t,J("text/html; charset=UTF-8",a));return typeof e=="object"?ve(e,Ge.Stringify,!1,{}).then(s):s(e)};redirect=(e,t)=>{const a=String(e);return this.header("Location",/[^\x00-\xFF]/.test(a)?encodeURI(a):a),this.newResponse(null,t??302)};notFound=()=>(this.#d??=()=>new Response,this.#d(this))},T="ALL",Ye="all",Xe=["get","post","put","delete","options","patch"],xe="Can not add a route since the matcher is already built.",ye=class extends Error{},Je="__COMPOSED_HANDLER",Qe=e=>e.text("404 Not Found",404),le=(e,t)=>{if("getResponse"in e){const a=e.getResponse();return t.newResponse(a.body,a)}return console.error(e),t.text("Internal Server Error",500)},we=class{get;post;put;delete;options;patch;all;on;use;router;getPath;_basePath="/";#t="/";routes=[];constructor(t={}){[...Xe,Ye].forEach(n=>{this[n]=(o,...i)=>(typeof o=="string"?this.#t=o:this.#o(n,this.#t,o),i.forEach(l=>{this.#o(n,this.#t,l)}),this)}),this.on=(n,o,...i)=>{for(const l of[o].flat()){this.#t=l;for(const d of[n].flat())i.map(c=>{this.#o(d.toUpperCase(),this.#t,c)})}return this},this.use=(n,...o)=>(typeof n=="string"?this.#t=n:(this.#t="*",o.unshift(n)),o.forEach(i=>{this.#o(T,this.#t,i)}),this);const{strict:s,...r}=t;Object.assign(this,r),this.getPath=s??!0?t.getPath??he:Fe}#e(){const t=new we({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,t.#s=this.#s,t.routes=this.routes,t}#s=Qe;errorHandler=le;route(t,a){const s=this.basePath(t);return a.routes.map(r=>{let n;a.errorHandler===le?n=r.handler:(n=async(o,i)=>(await ne([],a.errorHandler)(o,()=>r.handler(o,i))).res,n[Je]=r.handler),s.#o(r.method,r.path,n)}),this}basePath(t){const a=this.#e();return a._basePath=z(this._basePath,t),a}onError=t=>(this.errorHandler=t,this);notFound=t=>(this.#s=t,this);mount(t,a,s){let r,n;s&&(typeof s=="function"?n=s:(n=s.optionHandler,s.replaceRequest===!1?r=l=>l:r=s.replaceRequest));const o=n?l=>{const d=n(l);return Array.isArray(d)?d:[d]}:l=>{let d;try{d=l.executionCtx}catch{}return[l.env,d]};r||=(()=>{const l=z(this._basePath,t),d=l==="/"?0:l.length;return c=>{const u=new URL(c.url);return u.pathname=u.pathname.slice(d)||"/",new Request(u,c)}})();const i=async(l,d)=>{const c=await a(r(l.req.raw),...o(l));if(c)return c;await d()};return this.#o(T,z(t,"*"),i),this}#o(t,a,s){t=t.toUpperCase(),a=z(this._basePath,a);const r={basePath:this._basePath,path:a,method:t,handler:s};this.router.add(t,a,[s,r]),this.routes.push(r)}#r(t,a){if(t instanceof Error)return this.errorHandler(t,a);throw t}#a(t,a,s,r){if(r==="HEAD")return(async()=>new Response(null,await this.#a(t,a,s,"GET")))();const n=this.getPath(t,{env:s}),o=this.router.match(r,n),i=new We(t,{path:n,matchResult:o,env:s,executionCtx:a,notFoundHandler:this.#s});if(o[0].length===1){let d;try{d=o[0][0][0][0](i,async()=>{i.res=await this.#s(i)})}catch(c){return this.#r(c,i)}return d instanceof Promise?d.then(c=>c||(i.finalized?i.res:this.#s(i))).catch(c=>this.#r(c,i)):d??this.#s(i)}const l=ne(o[0],this.errorHandler,this.#s);return(async()=>{try{const d=await l(i);if(!d.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return d.res}catch(d){return this.#r(d,i)}})()}fetch=(t,...a)=>this.#a(t,a[1],a[0],t.method);request=(t,a,s,r)=>t instanceof Request?this.fetch(a?new Request(t,a):t,s,r):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${z("/",t)}`,a),s,r));fire=()=>{addEventListener("fetch",t=>{t.respondWith(this.#a(t.request,t,void 0,t.request.method))})}},K="[^/]+",F=".*",q="(?:|/.*)",N=Symbol(),Ze=new Set(".\\+*[^]$()");function et(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===F||e===q?1:t===F||t===q?-1:e===K?1:t===K?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var Q=class{#t;#e;#s=Object.create(null);insert(t,a,s,r,n){if(t.length===0){if(this.#t!==void 0)throw N;if(n)return;this.#t=a;return}const[o,...i]=t,l=o==="*"?i.length===0?["","",F]:["","",K]:o==="/*"?["","",q]:o.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let d;if(l){const c=l[1];let u=l[2]||K;if(c&&l[2]&&(u===".*"||(u=u.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(u))))throw N;if(d=this.#s[u],!d){if(Object.keys(this.#s).some(p=>p!==F&&p!==q))throw N;if(n)return;d=this.#s[u]=new Q,c!==""&&(d.#e=r.varIndex++)}!n&&c!==""&&s.push([c,d.#e])}else if(d=this.#s[o],!d){if(Object.keys(this.#s).some(c=>c.length>1&&c!==F&&c!==q))throw N;if(n)return;d=this.#s[o]=new Q}d.insert(i,a,s,r,n)}buildRegExpStr(){const a=Object.keys(this.#s).sort(et).map(s=>{const r=this.#s[s];return(typeof r.#e=="number"?`(${s})@${r.#e}`:Ze.has(s)?`\\${s}`:s)+r.buildRegExpStr()});return typeof this.#t=="number"&&a.unshift(`#${this.#t}`),a.length===0?"":a.length===1?a[0]:"(?:"+a.join("|")+")"}},tt=class{#t={varIndex:0};#e=new Q;insert(e,t,a){const s=[],r=[];for(let o=0;;){let i=!1;if(e=e.replace(/\{[^}]+\}/g,l=>{const d=`@\\${o}`;return r[o]=[d,l],o++,i=!0,d}),!i)break}const n=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let o=r.length-1;o>=0;o--){const[i]=r[o];for(let l=n.length-1;l>=0;l--)if(n[l].indexOf(i)!==-1){n[l]=n[l].replace(i,r[o][1]);break}}return this.#e.insert(n,t,s,this.#t,a),s}buildRegExp(){let e=this.#e.buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const a=[],s=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(r,n,o)=>n!==void 0?(a[++t]=Number(n),"$()"):(o!==void 0&&(s[Number(o)]=++t),"")),[new RegExp(`^${e}`),a,s]}},Ee=[],st=[/^$/,[],Object.create(null)],Te=Object.create(null);function Pe(e){return Te[e]??=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,a)=>a?`\\${a}`:"(?:|/.*)")}$`)}function at(){Te=Object.create(null)}function rt(e){const t=new tt,a=[];if(e.length===0)return st;const s=e.map(d=>[!/\*|\/:/.test(d[0]),...d]).sort(([d,c],[u,p])=>d?1:u?-1:c.length-p.length),r=Object.create(null);for(let d=0,c=-1,u=s.length;d<u;d++){const[p,m,g]=s[d];p?r[m]=[g.map(([b])=>[b,Object.create(null)]),Ee]:c++;let h;try{h=t.insert(m,c,p)}catch(b){throw b===N?new ye(m):b}p||(a[c]=g.map(([b,f])=>{const E=Object.create(null);for(f-=1;f>=0;f--){const[w,I]=h[f];E[w]=I}return[b,E]}))}const[n,o,i]=t.buildRegExp();for(let d=0,c=a.length;d<c;d++)for(let u=0,p=a[d].length;u<p;u++){const m=a[d][u]?.[1];if(!m)continue;const g=Object.keys(m);for(let h=0,b=g.length;h<b;h++)m[g[h]]=i[m[g[h]]]}const l=[];for(const d in o)l[d]=a[o[d]];return[n,l,r]}function L(e,t){if(e){for(const a of Object.keys(e).sort((s,r)=>r.length-s.length))if(Pe(a).test(t))return[...e[a]]}}var ot=class{name="RegExpRouter";#t;#e;constructor(){this.#t={[T]:Object.create(null)},this.#e={[T]:Object.create(null)}}add(e,t,a){const s=this.#t,r=this.#e;if(!s||!r)throw new Error(xe);s[e]||[s,r].forEach(i=>{i[e]=Object.create(null),Object.keys(i[T]).forEach(l=>{i[e][l]=[...i[T][l]]})}),t==="/*"&&(t="*");const n=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const i=Pe(t);e===T?Object.keys(s).forEach(l=>{s[l][t]||=L(s[l],t)||L(s[T],t)||[]}):s[e][t]||=L(s[e],t)||L(s[T],t)||[],Object.keys(s).forEach(l=>{(e===T||e===l)&&Object.keys(s[l]).forEach(d=>{i.test(d)&&s[l][d].push([a,n])})}),Object.keys(r).forEach(l=>{(e===T||e===l)&&Object.keys(r[l]).forEach(d=>i.test(d)&&r[l][d].push([a,n]))});return}const o=ge(t)||[t];for(let i=0,l=o.length;i<l;i++){const d=o[i];Object.keys(r).forEach(c=>{(e===T||e===c)&&(r[c][d]||=[...L(s[c],d)||L(s[T],d)||[]],r[c][d].push([a,n-l+i+1]))})}}match(e,t){at();const a=this.#s();return this.match=(s,r)=>{const n=a[s]||a[T],o=n[2][r];if(o)return o;const i=r.match(n[0]);if(!i)return[[],Ee];const l=i.indexOf("",1);return[n[1][l],i]},this.match(e,t)}#s(){const e=Object.create(null);return Object.keys(this.#e).concat(Object.keys(this.#t)).forEach(t=>{e[t]||=this.#o(t)}),this.#t=this.#e=void 0,e}#o(e){const t=[];let a=e===T;return[this.#t,this.#e].forEach(s=>{const r=s[e]?Object.keys(s[e]).map(n=>[n,s[e][n]]):[];r.length!==0?(a||=!0,t.push(...r)):e!==T&&t.push(...Object.keys(s[T]).map(n=>[n,s[T][n]]))}),a?rt(t):null}},nt=class{name="SmartRouter";#t=[];#e=[];constructor(e){this.#t=e.routers}add(e,t,a){if(!this.#e)throw new Error(xe);this.#e.push([e,t,a])}match(e,t){if(!this.#e)throw new Error("Fatal error");const a=this.#t,s=this.#e,r=a.length;let n=0,o;for(;n<r;n++){const i=a[n];try{for(let l=0,d=s.length;l<d;l++)i.add(...s[l]);o=i.match(e,t)}catch(l){if(l instanceof ye)continue;throw l}this.match=i.match.bind(i),this.#t=[i],this.#e=void 0;break}if(n===r)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,o}get activeRouter(){if(this.#e||this.#t.length!==1)throw new Error("No active router has been determined yet.");return this.#t[0]}},V=Object.create(null),Ae=class{#t;#e;#s;#o=0;#r=V;constructor(e,t,a){if(this.#e=a||Object.create(null),this.#t=[],e&&t){const s=Object.create(null);s[e]={handler:t,possibleKeys:[],score:0},this.#t=[s]}this.#s=[]}insert(e,t,a){this.#o=++this.#o;let s=this;const r=Ne(t),n=[];for(let o=0,i=r.length;o<i;o++){const l=r[o],d=r[o+1],c=Ve(l,d),u=Array.isArray(c)?c[0]:l;if(u in s.#e){s=s.#e[u],c&&n.push(c[1]);continue}s.#e[u]=new Ae,c&&(s.#s.push(c),n.push(c[1])),s=s.#e[u]}return s.#t.push({[e]:{handler:a,possibleKeys:n.filter((o,i,l)=>l.indexOf(o)===i),score:this.#o}}),s}#a(e,t,a,s){const r=[];for(let n=0,o=e.#t.length;n<o;n++){const i=e.#t[n],l=i[t]||i[T],d={};if(l!==void 0&&(l.params=Object.create(null),r.push(l),a!==V||s&&s!==V))for(let c=0,u=l.possibleKeys.length;c<u;c++){const p=l.possibleKeys[c],m=d[l.score];l.params[p]=s?.[p]&&!m?s[p]:a[p]??s?.[p],d[l.score]=!0}}return r}search(e,t){const a=[];this.#r=V;let r=[this];const n=pe(t),o=[];for(let i=0,l=n.length;i<l;i++){const d=n[i],c=i===l-1,u=[];for(let p=0,m=r.length;p<m;p++){const g=r[p],h=g.#e[d];h&&(h.#r=g.#r,c?(h.#e["*"]&&a.push(...this.#a(h.#e["*"],e,g.#r)),a.push(...this.#a(h,e,g.#r))):u.push(h));for(let b=0,f=g.#s.length;b<f;b++){const E=g.#s[b],w=g.#r===V?{}:{...g.#r};if(E==="*"){const S=g.#e["*"];S&&(a.push(...this.#a(S,e,g.#r)),S.#r=w,u.push(S));continue}const[I,x,A]=E;if(!d&&!(A instanceof RegExp))continue;const v=g.#e[I],y=n.slice(i).join("/");if(A instanceof RegExp){const S=A.exec(y);if(S){if(w[x]=S[0],a.push(...this.#a(v,e,g.#r,w)),Object.keys(v.#e).length){v.#r=w;const R=S[0].match(/\//)?.length??0;(o[R]||=[]).push(v)}continue}}(A===!0||A.test(d))&&(w[x]=d,c?(a.push(...this.#a(v,e,w,g.#r)),v.#e["*"]&&a.push(...this.#a(v.#e["*"],e,w,g.#r))):(v.#r=w,u.push(v)))}}r=u.concat(o.shift()??[])}return a.length>1&&a.sort((i,l)=>i.score-l.score),[a.map(({handler:i,params:l})=>[i,l])]}},it=class{name="TrieRouter";#t;constructor(){this.#t=new Ae}add(e,t,a){const s=ge(t);if(s){for(let r=0,n=s.length;r<n;r++)this.#t.insert(e,s[r],a);return}this.#t.insert(e,t,a)}match(e,t){return this.#t.search(e,t)}},Se=class extends we{constructor(e={}){super(e),this.router=e.router??new nt({routers:[new ot,new it]})}},lt=e=>{const a={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...e},s=(n=>typeof n=="string"?n==="*"?()=>n:o=>n===o?o:null:typeof n=="function"?n:o=>n.includes(o)?o:null)(a.origin),r=(n=>typeof n=="function"?n:Array.isArray(n)?()=>n:()=>[])(a.allowMethods);return async function(o,i){function l(c,u){o.res.headers.set(c,u)}const d=s(o.req.header("origin")||"",o);if(d&&l("Access-Control-Allow-Origin",d),a.origin!=="*"){const c=o.req.header("Vary");c?l("Vary",c):l("Vary","Origin")}if(a.credentials&&l("Access-Control-Allow-Credentials","true"),a.exposeHeaders?.length&&l("Access-Control-Expose-Headers",a.exposeHeaders.join(",")),o.req.method==="OPTIONS"){a.maxAge!=null&&l("Access-Control-Max-Age",a.maxAge.toString());const c=r(o.req.header("origin")||"",o);c.length&&l("Access-Control-Allow-Methods",c.join(","));let u=a.allowHeaders;if(!u?.length){const p=o.req.header("Access-Control-Request-Headers");p&&(u=p.split(/\s*,\s*/))}return u?.length&&(l("Access-Control-Allow-Headers",u.join(",")),o.res.headers.append("Vary","Access-Control-Request-Headers")),o.res.headers.delete("Content-Length"),o.res.headers.delete("Content-Type"),new Response(null,{headers:o.res.headers,status:204,statusText:"No Content"})}await i()}},dt=/^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i,de=(e,t=ut)=>{const a=/\.([a-zA-Z0-9]+?)$/,s=e.match(a);if(!s)return;let r=t[s[1]];return r&&r.startsWith("text")&&(r+="; charset=utf-8"),r},ct={aac:"audio/aac",avi:"video/x-msvideo",avif:"image/avif",av1:"video/av1",bin:"application/octet-stream",bmp:"image/bmp",css:"text/css",csv:"text/csv",eot:"application/vnd.ms-fontobject",epub:"application/epub+zip",gif:"image/gif",gz:"application/gzip",htm:"text/html",html:"text/html",ico:"image/x-icon",ics:"text/calendar",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",jsonld:"application/ld+json",map:"application/json",mid:"audio/x-midi",midi:"audio/x-midi",mjs:"text/javascript",mp3:"audio/mpeg",mp4:"video/mp4",mpeg:"video/mpeg",oga:"audio/ogg",ogv:"video/ogg",ogx:"application/ogg",opus:"audio/opus",otf:"font/otf",pdf:"application/pdf",png:"image/png",rtf:"application/rtf",svg:"image/svg+xml",tif:"image/tiff",tiff:"image/tiff",ts:"video/mp2t",ttf:"font/ttf",txt:"text/plain",wasm:"application/wasm",webm:"video/webm",weba:"audio/webm",webmanifest:"application/manifest+json",webp:"image/webp",woff:"font/woff",woff2:"font/woff2",xhtml:"application/xhtml+xml",xml:"application/xml",zip:"application/zip","3gp":"video/3gpp","3g2":"video/3gpp2",gltf:"model/gltf+json",glb:"model/gltf-binary"},ut=ct,pt=(...e)=>{let t=e.filter(r=>r!=="").join("/");t=t.replace(/(?<=\/)\/+/g,"");const a=t.split("/"),s=[];for(const r of a)r===".."&&s.length>0&&s.at(-1)!==".."?s.pop():r!=="."&&s.push(r);return s.join("/")||"."},Ce={br:".br",zstd:".zst",gzip:".gz"},ht=Object.keys(Ce),gt="index.html",mt=e=>{const t=e.root??"./",a=e.path,s=e.join??pt;return async(r,n)=>{if(r.finalized)return n();let o;if(e.path)o=e.path;else try{if(o=decodeURIComponent(r.req.path),/(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(o))throw new Error}catch{return await e.onNotFound?.(r.req.path,r),n()}let i=s(t,!a&&e.rewriteRequestPath?e.rewriteRequestPath(o):o);e.isDir&&await e.isDir(i)&&(i=s(i,gt));const l=e.getContent;let d=await l(i,r);if(d instanceof Response)return r.newResponse(d.body,d);if(d){const c=e.mimes&&de(i,e.mimes)||de(i);if(r.header("Content-Type",c||"application/octet-stream"),e.precompressed&&(!c||dt.test(c))){const u=new Set(r.req.header("Accept-Encoding")?.split(",").map(p=>p.trim()));for(const p of ht){if(!u.has(p))continue;const m=await l(i+Ce[p],r);if(m){d=m,r.header("Content-Encoding",p),r.header("Vary","Accept-Encoding",{append:!0});break}}}return await e.onFound?.(i,r),r.body(d)}await e.onNotFound?.(i,r),await n()}},ft=async(e,t)=>{let a;t&&t.manifest?typeof t.manifest=="string"?a=JSON.parse(t.manifest):a=t.manifest:typeof __STATIC_CONTENT_MANIFEST=="string"?a=JSON.parse(__STATIC_CONTENT_MANIFEST):a=__STATIC_CONTENT_MANIFEST;let s;t&&t.namespace?s=t.namespace:s=__STATIC_CONTENT;const r=a[e]||e;if(!r)return null;const n=await s.get(r,{type:"stream"});return n||null},bt=e=>async function(a,s){return mt({...e,getContent:async n=>ft(n,{manifest:e.manifest,namespace:e.namespace?e.namespace:a.env?a.env.__STATIC_CONTENT:void 0})})(a,s)},vt=e=>bt(e);const P=new Se;P.use("/api/*",lt());P.use("/static/*",vt({root:"./public"}));const G=new Map,B=new Map,_=new Map;function $(e,t){const s={..._.get(e)||{operationId:e,analyzed:0,updated:0,failed:0,unchanged:0,total:0,startTime:Date.now(),lastUpdate:Date.now(),status:"starting",type:"unknown",details:[]},...t,lastUpdate:Date.now()};return _.set(e,s),console.log(`📊 Progress Update [${e}]:`,s),s}const ce={products:{limit:500,windowMs:6e4},collections:{limit:300,windowMs:6e4},bulkUpdate:{limit:1e3,windowMs:6e4},bulkVariants:{limit:800,windowMs:6e4},analyzeVariants:{limit:200,windowMs:6e4},concurrent:{maxChunks:20,chunkSize:25,chunkDelay:50}};function ee(e,t){return`${e}:${JSON.stringify(t)}`}function te(e,t=3e5){const a=B.get(e);return a&&Date.now()-a.timestamp<t?(console.log(`⚡ CACHE HIT: ${e}`),a.data):null}function se(e,t){if(B.set(e,{data:t,timestamp:Date.now()}),B.size>1e3){const a=B.keys().next().value;B.delete(a)}}function W(e,t){const a=t?ce[t]||ce.products:{limit:100,windowMs:6e4},s=Date.now(),r=s-a.windowMs;G.has(e)||G.set(e,[]);const o=G.get(e).filter(i=>i>r);return o.length>=a.limit?!1:(o.push(s),G.set(e,o),!0)}function $e(e){return new Promise(t=>setTimeout(t,e))}async function xt(e,t=3,a=1e3){for(let s=1;s<=t;s++)try{return await e()}catch(r){if(s===t)throw r;const n=a*Math.pow(2,s-1);console.log(`🔄 Retry ${s}/${t} in ${n}ms...`),await $e(n)}throw new Error("Max retries exceeded")}async function H(e,t,a,s="GET",r,n=3e4){const o=`https://${e}.myshopify.com/admin/api/2024-01/${a}`,l={method:s,headers:{"X-Shopify-Access-Token":t,"Content-Type":"application/json"},signal:AbortSignal.timeout(n)};return r&&(s==="POST"||s==="PUT")&&(l.body=JSON.stringify(r)),await xt(async()=>{const d=await fetch(o,l);if(d.status===429){const u=d.headers.get("Retry-After")||"2",p=parseInt(u)*1e3;throw console.log(`⏳ Rate limited by Shopify, waiting ${p}ms...`),await $e(p),new Error("Rate limited, retrying...")}if(!d.ok){const u=await d.text();throw new Error(`Shopify API error: ${d.status} - ${u}`)}return await d.json()},3,1e3)}async function je(e,t,a){try{const s=a.toISOString();console.log(`🔍 Querying Shopify for products updated since: ${s}`);const r=await H(e,t,`products.json?updated_at_min=${encodeURIComponent(s)}&fields=id,title,updated_at&limit=250`);return r.products?(console.log(`📊 Found ${r.products.length} recently updated products`),r.products):[]}catch(s){return console.error("❌ Error fetching recently updated products:",s),[]}}async function yt(e,t,a,s){try{const r=await je(e,t,a),n=Math.min(r.length,s),o=r.length,i=0,l=Math.max(0,s-o);return{analyzed:n,updated:o,failed:i,unchanged:l,total:s,recentlyUpdatedProducts:r}}catch(r){return console.error("❌ Error getting real progress from Shopify:",r),null}}function ae(e){if(!e)return"";const t=e.split(",");for(const a of t)if(a.includes('rel="next"')){const s=a.split(";")[0].trim();if(s.startsWith("<")&&s.endsWith(">"))return s.slice(1,-1)}return""}async function D(e,t,a){const s=ee("products",{shop:e,forceLimit:a}),r=te(s,18e4);if(r)return console.log(`⚡ PRODUCTS CACHE HIT - INSTANT LOAD: ${r.length} products`),r;let n=[],i=`https://${e}.myshopify.com/admin/api/2024-01/products.json?limit=250&fields=id,title,vendor,product_type,status,variants,options,image`;console.log("⚡ ULTRA-FAST PRODUCT LOADING - MINIMAL FIELDS ONLY");const l=Date.now();let d=0;for(;i&&d<20;){d++,console.log(`⚡ Speed loading page ${d}...`);try{const u={method:"GET",headers:{"X-Shopify-Access-Token":t,"Content-Type":"application/json"},signal:AbortSignal.timeout(1e4)},p=await fetch(i,u);if(!p.ok){console.error(`❌ Page ${d} failed: ${p.status}`);break}const g=(await p.json()).products||[];if(g.length===0){console.log(`✅ No more products at page ${d}`);break}n.push(...g),console.log(`⚡ Page ${d}: +${g.length} products (Total: ${n.length})`);const h=p.headers.get("Link")||"";if(i=ae(h),a&&n.length>=a){console.log(`⚡ SPEED LIMIT REACHED: ${a} products`),n=n.slice(0,a);break}}catch(u){console.error(`❌ Page ${d} error:`,u);break}}const c=Date.now()-l;return console.log(`⚡ ULTRA-FAST LOAD COMPLETE: ${n.length} products in ${c}ms`),se(s,n),n}async function Re(e,t){const a=ee("collections",{shop:e}),s=te(a,3e5);if(s)return console.log(`⚡ COLLECTIONS CACHE HIT - INSTANT LOAD: ${s.length} collections`),s;const r="id,title,handle",n=["custom_collections","smart_collections"];console.log("⚡ ULTRA-FAST COLLECTIONS LOADING - PARALLEL PROCESSING");const o=Date.now(),i=n.map(async u=>{const p=[];let m=`https://${e}.myshopify.com/admin/api/2024-01/${u}.json?limit=250&fields=${r}`,g=0;for(;m&&g<10;){g++;try{const h=await fetch(m,{method:"GET",headers:{"X-Shopify-Access-Token":t,"Content-Type":"application/json"},signal:AbortSignal.timeout(8e3)});if(!h.ok)break;const f=(await h.json())[u]||[];if(f.length===0)break;p.push(...f),console.log(`⚡ ${u} page ${g}: +${f.length}`);const E=h.headers.get("Link")||"";m=ae(E)}catch(h){console.error(`❌ ${u} error:`,h);break}}return p}),l=await Promise.allSettled(i);let d=[];l.forEach((u,p)=>{u.status==="fulfilled"&&(d.push(...u.value),console.log(`⚡ ${n[p]}: ${u.value.length} collections`))});const c=Date.now()-o;return console.log(`⚡ ULTRA-FAST COLLECTIONS COMPLETE: ${d.length} collections in ${c}ms`),se(a,d),d}async function wt(e,t,a){let s=[],r=`https://${e}.myshopify.com/admin/api/2024-01/collections/${a}/products.json?limit=250&fields=id`;for(;r;)try{const n=await fetch(r,{method:"GET",headers:{"X-Shopify-Access-Token":t,"Content-Type":"application/json"}});if(!n.ok)break;const i=(await n.json()).products||[];s=s.concat(i);const l=n.headers.get("Link")||"";r=ae(l)}catch(n){console.log(`❌ Error in collection ${a} pagination:`,n);break}return s}async function Et(e,t,a){const s={};console.log("🔍 MAPEANDO PRODUTOS POR COLEÇÃO COM PAGINAÇÃO COMPLETA...");for(const r of a)try{console.log(`🔍 Buscando produtos da coleção "${r.title}"...`);const n=await wt(e,t,r.id);n.forEach(o=>{s[o.id]||(s[o.id]=[]),s[o.id].push(r.id.toString())}),console.log(`✅ Coleção "${r.title}": ${n.length} produtos (com paginação completa)`)}catch(n){console.log(`❌ Erro na coleção ${r.title}:`,n)}return console.log(`✅ Mapeamento completo: ${Object.keys(s).length} produtos mapeados`),s}async function Tt(e,t,a,s){const r=[];for(let n=0;n<a.length;n++){const o=a[n];try{const i={id:o.id};s.title&&s.title!==o.title&&(i.title=s.title),s.description!==void 0&&s.description!==o.body_html&&(i.body_html=s.description),s.vendor&&s.vendor!==o.vendor&&(i.vendor=s.vendor),s.productType&&s.productType!==o.product_type&&(i.product_type=s.productType),s.tags!==void 0&&(i.tags=s.tags),s.status&&s.status!==o.status&&(i.status=s.status),(s.seoTitle||s.seoDescription)&&(i.metafields_global_title_tag=s.seoTitle||o.metafields_global_title_tag,i.metafields_global_description_tag=s.seoDescription||o.metafields_global_description_tag),(s.price||s.comparePrice)&&(i.variants=o.variants.map(d=>({id:d.id,price:s.price||d.price,compare_at_price:s.comparePrice||d.compare_at_price}))),s.inventory!==void 0&&(i.variants=o.variants.map(d=>({id:d.id,inventory_quantity:s.inventory})));const l=await H(e,t,`products/${o.id}.json`,"PUT",{product:i});r.push({id:o.id,success:!0,data:l.product}),n<a.length-1&&await new Promise(d=>setTimeout(d,200))}catch(i){r.push({id:o.id,success:!1,error:i instanceof Error?i.message:"Unknown error"})}}return r}P.post("/api/test-connection",async e=>{try{const{shop:t,accessToken:a}=await e.req.json();if(!t||!a)return e.json({error:"Parâmetros obrigatórios: shop e accessToken"},400);const s=await H(t,a,"shop.json");return e.json({success:!0,shop:s.shop.name,domain:s.shop.domain,plan:s.shop.plan_name})}catch(t){return e.json({error:"Falha na conexão: "+(t instanceof Error?t.message:"Erro desconhecido")},401)}});P.get("/favicon.ico",e=>e.text("",204));P.get("/test-modal-diagnostico",e=>e.html(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Teste - Modal de Diagnóstico Corrigido</title>
    <script src="https://cdn.tailwindcss.com"><\/script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        .loading-spinner { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    </style>
</head>
<body class="bg-gray-100 min-h-screen">
    <div class="container mx-auto px-4 py-8">
        <!-- Header -->
        <div class="text-center py-8 mb-8">
            <h1 class="text-4xl font-bold text-gray-800 mb-4">
                <i class="fas fa-bug mr-3 text-red-600"></i>
                Correção: Modal de Diagnóstico
            </h1>
            <p class="text-gray-600 text-lg">
                Demonstração da solução para os problemas identificados no modal de diagnóstico.
            </p>
        </div>

        <!-- Problemas Identificados -->
        <div class="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <h2 class="text-xl font-bold text-red-800 mb-4">
                <i class="fas fa-exclamation-triangle mr-2"></i>
                Problemas Identificados
            </h2>
            <div class="space-y-3 text-red-700">
                <div class="flex items-start">
                    <i class="fas fa-times-circle mt-1 mr-3"></i>
                    <div>
                        <strong>Botão "Ver Detalhes" funciona apenas uma vez:</strong>
                        <p class="text-sm mt-1">Após fechar o modal e tentar abrir novamente, o botão não responde.</p>
                    </div>
                </div>
                <div class="flex items-start">
                    <i class="fas fa-times-circle mt-1 mr-3"></i>
                    <div>
                        <strong>Números não atualizam automaticamente:</strong>
                        <p class="text-sm mt-1">Contadores coloridos não mostram progresso em tempo real.</p>
                    </div>
                </div>
                <div class="flex items-start">
                    <i class="fas fa-times-circle mt-1 mr-3"></i>
                    <div>
                        <strong>Barra de progresso não avança:</strong>
                        <p class="text-sm mt-1">Barra verde permanece estática durante o processamento.</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Soluções Implementadas -->
        <div class="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <h2 class="text-xl font-bold text-green-800 mb-4">
                <i class="fas fa-check-circle mr-2"></i>
                Soluções Implementadas
            </h2>
            <div class="space-y-3 text-green-700">
                <div class="flex items-start">
                    <i class="fas fa-check mt-1 mr-3"></i>
                    <div>
                        <strong>Event Listener Reutilizável:</strong>
                        <p class="text-sm mt-1">Modal pode ser aberto/fechado múltiplas vezes com event listeners limpos.</p>
                    </div>
                </div>
                <div class="flex items-start">
                    <i class="fas fa-check mt-1 mr-3"></i>
                    <div>
                        <strong>Atualização em Tempo Real:</strong>
                        <p class="text-sm mt-1">Contadores são atualizados a cada segundo durante o processamento.</p>
                    </div>
                </div>
                <div class="flex items-start">
                    <i class="fas fa-check mt-1 mr-3"></i>
                    <div>
                        <strong>Barra de Progresso Animada:</strong>
                        <p class="text-sm mt-1">Progresso visual com animações suaves e percentuais corretos.</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Teste Prático -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 class="text-xl font-bold text-gray-800 mb-4">
                <i class="fas fa-play-circle mr-2"></i>
                Teste Prático
            </h2>
            <p class="text-gray-600 mb-4">
                Clique nos botões abaixo para testar as funcionalidades corrigidas:
            </p>
            
            <div class="flex flex-wrap gap-4">
                <button id="test-processing-btn" class="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors">
                    <i class="fas fa-cogs mr-2"></i>
                    Simular Processamento
                </button>
                
                <button id="ver-detalhes-btn" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors" disabled>
                    <i class="fas fa-chart-line mr-2"></i>
                    Ver Detalhes
                </button>
                
                <button id="reset-test-btn" class="bg-gray-600 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors">
                    <i class="fas fa-redo mr-2"></i>
                    Resetar Teste
                </button>
            </div>
            
            <div id="test-status" class="mt-4 p-3 bg-gray-50 rounded text-sm text-gray-600">
                Status: Aguardando teste...
            </div>
        </div>

        <!-- Modal de Diagnóstico Corrigido -->
        <div id="diagnostico-modal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50">
            <div class="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-xl font-bold text-gray-800">
                        <i class="fas fa-cogs mr-2"></i>
                        <span id="diagnostic-title">Diagnóstico dos Títulos das Opções</span>
                    </h3>
                    <button id="close-diagnostic-modal" class="text-gray-500 hover:text-gray-700">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                
                <!-- Contadores Coloridos -->
                <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                        <div id="counter-analyzed" class="text-3xl font-bold text-blue-600 mb-1">0</div>
                        <div class="text-sm text-blue-600 font-medium">Produtos Analisados</div>
                    </div>
                    <div class="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                        <div id="counter-updated" class="text-3xl font-bold text-green-600 mb-1">0</div>
                        <div class="text-sm text-green-600 font-medium">Produtos Atualizados</div>
                    </div>
                    <div class="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                        <div id="counter-failed" class="text-3xl font-bold text-red-600 mb-1">0</div>
                        <div class="text-sm text-red-600 font-medium">Falhas</div>
                    </div>
                    <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                        <div id="counter-unchanged" class="text-3xl font-bold text-yellow-600 mb-1">0</div>
                        <div class="text-sm text-yellow-600 font-medium">Sem Alteração</div>
                    </div>
                </div>
                
                <!-- Barra de Progresso -->
                <div class="mb-6">
                    <div class="flex justify-between items-center mb-2">
                        <span class="text-sm font-medium text-gray-700">Progresso</span>
                        <span id="progress-text" class="text-sm text-gray-500">0/0</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-4">
                        <div id="progress-bar" class="bg-green-500 h-4 rounded-full transition-all duration-500 ease-out" style="width: 0%"></div>
                    </div>
                </div>
                
                <!-- Status Atual -->
                <div class="mb-6">
                    <div class="text-sm font-medium text-gray-700 mb-2">Status Atual:</div>
                    <div id="current-status" class="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                        <i class="fas fa-clock mr-2"></i>
                        <span id="status-text">Preparando processamento...</span>
                    </div>
                </div>
                
                <!-- Controles -->
                <div class="flex justify-end space-x-3">
                    <button id="cancel-processing" class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
                        Cancelar
                    </button>
                    <button id="hide-modal" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Ocultar (continua em background)
                    </button>
                </div>
            </div>
        </div>

        <!-- Instruções -->
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 class="text-lg font-bold text-blue-800 mb-3">
                <i class="fas fa-info-circle mr-2"></i>
                Como Testar
            </h2>
            <ol class="list-decimal ml-6 space-y-2 text-blue-700">
                <li><strong>Simular Processamento:</strong> Clique no botão laranja para iniciar uma simulação de processamento em massa.</li>
                <li><strong>Ver Detalhes:</strong> Clique no botão azul para abrir o modal de diagnóstico (disponível durante processamento).</li>
                <li><strong>Fechar e Reabrir:</strong> Feche o modal e clique novamente em "Ver Detalhes" - deve funcionar normalmente.</li>
                <li><strong>Observar Progresso:</strong> Veja os números e barra de progresso atualizando em tempo real.</li>
                <li><strong>Resetar:</strong> Use o botão cinza para resetar o teste e tentar novamente.</li>
            </ol>
        </div>
    </div>

    <script>
        class DiagnosticModalFix {
            constructor() {
                this.isProcessing = false;
                this.progressData = {
                    analyzed: 0,
                    updated: 0,
                    failed: 0,
                    unchanged: 0,
                    total: 100,
                    status: 'Preparando processamento...'
                };
                this.updateInterval = null;
                this.modalEventListeners = [];
                
                this.initializeEventListeners();
            }
            
            initializeEventListeners() {
                document.getElementById('test-processing-btn').addEventListener('click', () => this.startProcessing());
                document.getElementById('ver-detalhes-btn').addEventListener('click', () => this.openDiagnosticModal());
                document.getElementById('reset-test-btn').addEventListener('click', () => this.resetTest());
            }
            
            startProcessing() {
                if (this.isProcessing) return;
                
                this.isProcessing = true;
                this.progressData = {
                    analyzed: 0,
                    updated: 0,
                    failed: 0,
                    unchanged: 0,
                    total: 100,
                    status: 'Iniciando processamento...'
                };
                
                // Enable "Ver Detalhes" button
                document.getElementById('ver-detalhes-btn').disabled = false;
                document.getElementById('ver-detalhes-btn').classList.remove('opacity-50', 'cursor-not-allowed');
                
                // Update test status
                this.updateTestStatus('🔄 Processamento iniciado - Clique em "Ver Detalhes" para acompanhar');
                
                // Start progress simulation
                this.simulateProgress();
            }
            
            simulateProgress() {
                let processed = 0;
                const total = this.progressData.total;
                
                this.updateInterval = setInterval(() => {
                    if (processed >= total) {
                        this.finishProcessing();
                        return;
                    }
                    
                    // Simulate random progress
                    const increment = Math.floor(Math.random() * 3) + 1;
                    processed = Math.min(processed + increment, total);
                    
                    // Randomly distribute between success, failure, unchanged
                    const rand = Math.random();
                    if (rand < 0.7) {
                        this.progressData.updated += increment;
                    } else if (rand < 0.85) {
                        this.progressData.unchanged += increment;
                    } else {
                        this.progressData.failed += increment;
                    }
                    
                    this.progressData.analyzed = processed;
                    
                    // Update status messages
                    const statusMessages = [
                        'Analisando produtos...',
                        'Processando variantes...',
                        'Aplicando alterações...',
                        'Validando dados...',
                        'Atualizando preços...'
                    ];
                    this.progressData.status = statusMessages[Math.floor(Math.random() * statusMessages.length)];
                    
                    // Update display if modal is open
                    this.updateModalDisplay();
                    
                }, 1000); // Update every second
            }
            
            finishProcessing() {
                if (this.updateInterval) {
                    clearInterval(this.updateInterval);
                    this.updateInterval = null;
                }
                
                this.progressData.status = 'Processamento concluído!';
                this.updateModalDisplay();
                this.updateTestStatus('✅ Processamento concluído - Modal pode ser reaberto múltiplas vezes');
                
                // Keep "Ver Detalhes" button enabled for testing reopening
                setTimeout(() => {
                    this.isProcessing = false;
                }, 3000);
            }
            
            openDiagnosticModal() {
                // CORREÇÃO 1: Remove event listeners antigos antes de adicionar novos
                this.removeModalEventListeners();
                
                const modal = document.getElementById('diagnostico-modal');
                modal.classList.remove('hidden');
                modal.classList.add('flex');
                
                // CORREÇÃO 2: Adiciona event listeners frescos toda vez que abre
                this.addModalEventListeners();
                
                // CORREÇÃO 3: Atualiza display imediatamente ao abrir
                this.updateModalDisplay();
                
                this.updateTestStatus('📊 Modal aberto - Observe os números atualizando em tempo real');
            }
            
            addModalEventListeners() {
                const closeBtn = document.getElementById('close-diagnostic-modal');
                const cancelBtn = document.getElementById('cancel-processing');
                const hideBtn = document.getElementById('hide-modal');
                
                const closeHandler = () => this.closeDiagnosticModal();
                const cancelHandler = () => this.cancelProcessing();
                const hideHandler = () => this.hideDiagnosticModal();
                
                closeBtn.addEventListener('click', closeHandler);
                cancelBtn.addEventListener('click', cancelHandler);
                hideBtn.addEventListener('click', hideHandler);
                
                // CORREÇÃO: Armazena referências dos event listeners para remoção posterior
                this.modalEventListeners = [
                    { element: closeBtn, event: 'click', handler: closeHandler },
                    { element: cancelBtn, event: 'click', handler: cancelHandler },
                    { element: hideBtn, event: 'click', handler: hideHandler }
                ];
            }
            
            removeModalEventListeners() {
                // CORREÇÃO: Remove todos os event listeners antes de adicionar novos
                this.modalEventListeners.forEach(({ element, event, handler }) => {
                    element.removeEventListener(event, handler);
                });
                this.modalEventListeners = [];
            }
            
            closeDiagnosticModal() {
                const modal = document.getElementById('diagnostico-modal');
                modal.classList.add('hidden');
                modal.classList.remove('flex');
                
                // CORREÇÃO: Remove event listeners ao fechar
                this.removeModalEventListeners();
                
                this.updateTestStatus('❌ Modal fechado - Clique novamente em "Ver Detalhes" para testar reabertura');
            }
            
            hideDiagnosticModal() {
                this.closeDiagnosticModal();
                this.updateTestStatus('👁️ Modal ocultado (processamento continua) - Teste "Ver Detalhes" novamente');
            }
            
            cancelProcessing() {
                if (this.updateInterval) {
                    clearInterval(this.updateInterval);
                    this.updateInterval = null;
                }
                
                this.progressData.status = 'Processamento cancelado pelo usuário';
                this.updateModalDisplay();
                this.closeDiagnosticModal();
                
                this.isProcessing = false;
                this.updateTestStatus('🛑 Processamento cancelado');
            }
            
            updateModalDisplay() {
                // CORREÇÃO 4: Atualização em tempo real dos contadores
                document.getElementById('counter-analyzed').textContent = this.progressData.analyzed;
                document.getElementById('counter-updated').textContent = this.progressData.updated;
                document.getElementById('counter-failed').textContent = this.progressData.failed;
                document.getElementById('counter-unchanged').textContent = this.progressData.unchanged;
                
                // CORREÇÃO 5: Barra de progresso funcional
                const total = this.progressData.total;
                const processed = this.progressData.analyzed;
                const percentage = total > 0 ? Math.round((processed / total) * 100) : 0;
                
                document.getElementById('progress-bar').style.width = percentage + '%';
                document.getElementById('progress-text').textContent = processed + '/' + total;
                
                // CORREÇÃO 6: Status atualizado dinamicamente
                document.getElementById('status-text').textContent = this.progressData.status;
            }
            
            updateTestStatus(message) {
                document.getElementById('test-status').innerHTML = '<strong>Status:</strong> ' + message;
            }
            
            resetTest() {
                // Stop any running processes
                if (this.updateInterval) {
                    clearInterval(this.updateInterval);
                    this.updateInterval = null;
                }
                
                // Close modal if open
                this.closeDiagnosticModal();
                
                // Reset state
                this.isProcessing = false;
                this.progressData = {
                    analyzed: 0,
                    updated: 0,
                    failed: 0,
                    unchanged: 0,
                    total: 100,
                    status: 'Preparando processamento...'
                };
                
                // Disable "Ver Detalhes" button
                document.getElementById('ver-detalhes-btn').disabled = true;
                document.getElementById('ver-detalhes-btn').classList.add('opacity-50', 'cursor-not-allowed');
                
                this.updateTestStatus('🔄 Teste resetado - Clique em "Simular Processamento" para começar');
            }
        }
        
        // Initialize when page loads
        document.addEventListener('DOMContentLoaded', () => {
            new DiagnosticModalFix();
        });
    <\/script>
</body>
</html>`));P.get("/test-variant-fix",e=>e.html(`<!DOCTYPE html>
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
</html>`));P.post("/api/products",async e=>{try{const{shop:t,accessToken:a}=await e.req.json();if(!t||!a)return e.json({error:"Parâmetros obrigatórios: shop e accessToken"},400);if(!W(`products:${t}`,"products"))return e.json({error:"Rate limit exceeded"},429);console.log("Loading ALL products with working pagination logic");const s=await D(t,a);console.log(`✅ Successfully loaded ${s.length} total products`),console.log("🔍 Loading collections for product mapping...");const r=await Re(t,a);console.log(`✅ Loaded ${r.length} collections`);const n=await Et(t,a,r),o=s.map(i=>({...i,collection_ids:n[i.id]||[]}));return o.length>0&&console.log("✅ First product with collections:",{id:o[0].id,title:o[0].title,collection_ids:o[0].collection_ids}),e.json({products:o,total:o.length})}catch(t){return e.json({error:"Erro ao buscar produtos: "+(t instanceof Error?t.message:"Erro desconhecido")},500)}});P.post("/api/collections",async e=>{try{const{shop:t,accessToken:a}=await e.req.json();if(!t||!a)return e.json({error:"Parâmetros obrigatórios: shop e accessToken"},400);if(!W(`collections:${t}`,"collections"))return e.json({error:"Rate limit exceeded"},429);const s=await Re(t,a);return e.json({collections:s})}catch(t){return e.json({error:"Erro ao buscar coleções: "+(t instanceof Error?t.message:"Erro desconhecido")},500)}});P.post("/api/bulk-update",async e=>{try{const{shop:t,accessToken:a,productIds:s,updates:r}=await e.req.json();if(!t||!a||!s||!r)return e.json({error:"Parâmetros obrigatórios: shop, accessToken, productIds, updates"},400);if(!W(`bulk:${t}`,"bulkUpdate"))return e.json({error:"Rate limit exceeded for bulk operations"},429);const n=[];for(const i of s)try{const l=await H(t,a,`products/${i}.json`);n.push(l.product)}catch(l){console.error(`Error fetching product ${i}:`,l)}const o=await Tt(t,a,n,r);return e.json({results:o,successful:o.filter(i=>i.success).length,failed:o.filter(i=>!i.success).length})}catch(t){return e.json({error:"Erro na atualização em massa: "+(t instanceof Error?t.message:"Erro desconhecido")},500)}});P.post("/api/analyze-variants",async e=>{try{const{shop:t,accessToken:a,scope:s,selectedProductIds:r}=await e.req.json();if(!t||!a)return e.json({error:"Parâmetros obrigatórios: shop e accessToken"},400);if(s==="selected"&&(!r||r.length===0))return e.json({error:'Para escopo "selected", selectedProductIds é obrigatório'},400);const n=ee("analyze-variants",{shop:t,scope:s,selectedProductIds:r}),o=te(n,12e4);if(o)return console.log("⚡ VARIANT ANALYSIS CACHE HIT - INSTANT RESULTS"),e.json(o);console.log("⚡ ULTRA-FAST VARIANT ANALYSIS STARTING");const i=Date.now();let l=[];if(s==="selected"){const g=await D(t,a,500),h=new Set(r.map(b=>b.toString()));l=g.filter(b=>h.has(b.id.toString())),console.log(`⚡ Selected products filtered: ${l.length} products`)}else l=await D(t,a,1e3),console.log(`⚡ All products loaded: ${l.length} products`);const d={},c=[];let u=0;l.forEach(g=>{if(g.options?.length){if(g.options.forEach(h=>{const b=h.name;d[b]||(d[b]={name:b,values:new Set,productCount:0,products:[]});const f=d[b];f.productCount++,f.products.length<5&&f.products.push({id:g.id,title:g.title.substring(0,50)}),h.values?.length&&h.values.forEach(E=>f.values.add(E))}),c.length<20&&g.variants?.length){const h=g.variants[0];c.push({productId:g.id,productTitle:g.title.substring(0,50),variantId:h.id,price:h.price,option1:h.option1,option2:h.option2,option3:h.option3})}u+=g.variants?.length||0}}),Object.keys(d).forEach(g=>{const h=d[g];h.values=Array.from(h.values)});const p=Date.now()-i;console.log(`⚡ ULTRA-FAST ANALYSIS COMPLETE: ${Object.keys(d).length} options in ${p}ms`);const m={success:!0,totalProducts:l.length,optionStats:d,variantCount:u,sampleVariants:c,performanceMs:p};return se(n,m),e.json(m)}catch(t){return console.error("❌ Variant analysis error:",t),e.json({error:"Erro na análise de variantes: "+(t instanceof Error?t.message:"Erro desconhecido")},500)}});P.post("/api/bulk-update-variant-titles",async e=>{try{const{shop:t,accessToken:a,titleMappings:s,scope:r,selectedProductIds:n}=await e.req.json();if(!t||!a||!s||s.length===0)return e.json({error:"Parâmetros obrigatórios: shop, accessToken, titleMappings"},400);if(r==="selected"&&(!n||n.length===0))return e.json({error:'Para escopo "selected", selectedProductIds é obrigatório'},400);const o=`variant-titles-${Date.now()}-${Math.random().toString(36).substring(7)}`;console.log(`⚡ STARTING REAL-TIME TRACKED OPERATION: ${o}`);const i=Date.now();let l=[];if(r==="all")l=await D(t,a,500);else{const f=await D(t,a,1e3),E=new Set(n.map(w=>w.toString()));l=f.filter(w=>E.has(w.id.toString()))}console.log(`⚡ Processing ${l.length} products for title updates`);const d=new Map;s.forEach(f=>{d.set(f.currentTitle.toLowerCase(),f.newTitle)});const c=l.filter(f=>f.options?.length?f.options.some(E=>{const w=d.get(E.name.toLowerCase());return w&&w!==E.name}):!1);console.log(`⚡ Found ${c.length} products needing updates`),$(o,{type:"variant-titles",status:"processing",total:c.length,analyzed:0,updated:0,failed:0,unchanged:0,details:[`Iniciando processamento de ${c.length} produtos`]});const u=10,p=[];for(let f=0;f<c.length;f+=u)p.push(c.slice(f,f+u));let m=0,g=0;const h=[];for(let f=0;f<p.length;f++){const E=p[f];console.log(`⚡ Processing batch ${f+1}/${p.length} (${E.length} products)`),$(o,{status:`Processando lote ${f+1}/${p.length}`,details:[`Processando lote ${f+1} de ${p.length} (${E.length} produtos)`]});const w=E.map(async v=>{try{const y=v.options.map(R=>{const k=d.get(R.name.toLowerCase());return k&&k!==R.name?{...R,name:k}:R}),S=await H(t,a,`products/${v.id}.json`,"PUT",{product:{id:v.id,options:y}});return{productId:v.id,title:v.title.substring(0,50),success:!0,changes:y.map(R=>R.name).slice(0,3).join(", ")}}catch(y){return{productId:v.id,title:v.title.substring(0,50),success:!1,error:y instanceof Error?y.message.substring(0,100):"Erro desconhecido"}}});(await Promise.allSettled(w)).forEach(v=>{v.status==="fulfilled"?(h.push(v.value),v.value.success?m++:g++):(g++,h.push({productId:"unknown",title:"Erro no batch",success:!1,error:"Batch processing failed"}))});const x=(f+1)*u,A=Math.min(x,c.length);$(o,{analyzed:A,updated:m,failed:g,unchanged:Math.max(0,A-m-g),status:`Processados ${A}/${c.length} produtos`,details:[`Lote ${f+1}/${p.length} concluído`,`${m} atualizados, ${g} falhas`]}),f<p.length-1&&await new Promise(v=>setTimeout(v,100))}const b=Date.now()-i;return console.log(`⚡ ULTRA-FAST BULK UPDATE COMPLETE: ${m} updated, ${g} failed in ${b}ms`),$(o,{status:"completed",details:[`Operação concluída em ${Math.round(b/1e3)}s`,`${m} produtos atualizados com sucesso`,`${g} produtos com erro`]}),e.json({success:!0,operationId:o,totalProducts:l.length,updatedCount:m,failedCount:g,results:h.slice(0,20),performanceMs:b})}catch(t){return console.error("❌ Bulk variant titles error:",t),e.json({error:"Erro na atualização em massa de títulos de variantes: "+(t instanceof Error?t.message:"Erro desconhecido")},500)}});P.post("/api/bulk-update-variant-values",async e=>{try{const{shop:t,accessToken:a,valueMappings:s,scope:r,selectedProductIds:n}=await e.req.json();if(!t||!a||!s||s.length===0)return e.json({error:"Parâmetros obrigatórios: shop, accessToken, valueMappings"},400);if(r==="selected"&&(!n||n.length===0))return e.json({error:'Para escopo "selected", selectedProductIds é obrigatório'},400);const o=`variant-values-${Date.now()}-${Math.random().toString(36).substring(7)}`;console.log(`⚡ STARTING REAL-TIME TRACKED OPERATION: ${o}`);const i=Date.now();if(!W(`bulk-variant-values:${t}`,"bulkVariants"))return e.json({error:"Rate limit exceeded for bulk variant value operations"},429);let l=[];r==="all"?l=await D(t,a,250):l=(await D(t,a,250)).filter(b=>n.includes(b.id.toString())||n.includes(b.id));let d=0,c=0;const u=[];console.log(`🎯 Processando valores de variantes em ${l.length} produtos (escopo: ${r})`),$(o,{type:"variant-values",status:"processing",total:l.length,analyzed:0,updated:0,failed:0,unchanged:0,details:[`Iniciando processamento de ${l.length} produtos com valores de variantes`]});const p=8,m=[];for(let h=0;h<l.length;h+=p)m.push(l.slice(h,h+p));for(let h=0;h<m.length;h++){const b=m[h];console.log(`⚡ Processing batch ${h+1}/${m.length} (${b.length} products)`),$(o,{status:`Processando lote ${h+1}/${m.length}`,details:[`Processando lote ${h+1} de ${m.length} (${b.length} produtos)`]});const f=b.map(async x=>{try{let A=!1;const v=[];if(x.variants&&x.variants.length>0)for(const y of x.variants){let S=!1;const R=[];let k=0;if(y.option1||y.option2||y.option3){const O=[y.option1,y.option2,y.option3].filter(Boolean),re=x.options?.map(j=>j.name)||[];for(let j=0;j<O.length;j++){const M=O[j],Y=re[j],C=s.find(oe=>oe.optionName===Y&&oe.currentValue.toLowerCase()===M.toLowerCase());C&&(C.newValue&&C.newValue!==M&&(j===0?y.option1=C.newValue:j===1?y.option2=C.newValue:j===2&&(y.option3=C.newValue),S=!0,A=!0,console.log(`🔄 ${x.title}: ${Y} "${M}" → "${C.newValue}"`)),C.priceExtra&&C.priceExtra>0&&(k+=C.priceExtra,S=!0,A=!0,console.log(`💰 ${x.title}: Preço extra +R$ ${C.priceExtra} para ${Y}="${C.newValue||M}"`)))}}if(S)try{const O={id:y.id,option1:y.option1,option2:y.option2||null,option3:y.option3||null};if(k>0){const M=((parseFloat(y.price)||0)+k).toFixed(2);O.price=M,console.log(`💰 ${x.title}: Preço atualizado de R$ ${y.price} para R$ ${M} (+R$ ${k.toFixed(2)})`)}const re=await H(t,a,`products/${x.id}/variants/${y.id}.json`,"PUT",{variant:O});v.push(y)}catch(O){console.error(`❌ Erro ao atualizar variante ${y.id}:`,O),c++}}return A&&v.length>0&&(d++,u.push({success:!0,productId:x.id,title:x.title,changes:`${v.length} variantes atualizadas`}),console.log(`✅ ${x.title}: ${v.length} variantes atualizadas`)),{productId:x.id,title:x.title.substring(0,50),success:A&&v.length>0,changes:A?`${v.length} variantes atualizadas`:"Nenhuma alteração necessária"}}catch(A){return{productId:x.id,title:x.title.substring(0,50),success:!1,error:A instanceof Error?A.message.substring(0,100):"Erro desconhecido"}}});(await Promise.allSettled(f)).forEach(x=>{x.status==="fulfilled"?(u.push(x.value),x.value.success?d++:x.value.error&&c++):(c++,u.push({productId:"unknown",title:"Erro no batch",success:!1,error:"Batch processing failed"}))});const w=(h+1)*p,I=Math.min(w,l.length);$(o,{analyzed:I,updated:d,failed:c,unchanged:Math.max(0,I-d-c),status:`Processados ${I}/${l.length} produtos`,details:[`Lote ${h+1}/${m.length} concluído`,`${d} atualizados, ${c} falhas`]}),h<m.length-1&&await new Promise(x=>setTimeout(x,150))}const g=Date.now()-i;return console.log(`🎉 ULTRA-FAST VARIANT VALUES UPDATE COMPLETE: ${d} updated, ${c} failed in ${g}ms`),$(o,{status:"completed",details:[`Operação concluída em ${Math.round(g/1e3)}s`,`${d} produtos atualizados com sucesso`,`${c} produtos com erro`]}),e.json({success:!0,operationId:o,totalProducts:l.length,updatedCount:d,failedCount:c,results:u.slice(0,50),performanceMs:g})}catch(t){return e.json({error:"Erro na atualização em massa de valores de variantes: "+(t instanceof Error?t.message:"Erro desconhecido")},500)}});P.get("/api/operation-progress/:operationId",async e=>{try{const t=e.req.param("operationId");if(!t)return e.json({error:"Operation ID is required"},400);const a=_.get(t);if(!a)return e.json({error:"Operation not found",operationId:t},404);const s=a.total>0?Math.round(a.analyzed/a.total*100):0,r=Date.now()-a.startTime;return e.json({success:!0,operationId:t,progress:{...a,percentage:s,elapsedMs:r,isComplete:a.analyzed>=a.total&&a.total>0}})}catch(t){return e.json({error:"Error fetching progress: "+(t instanceof Error?t.message:"Unknown error")},500)}});P.delete("/api/operation-progress/:operationId",async e=>{const t=e.req.param("operationId");return _.delete(t),e.json({success:!0,message:"Operation progress cleared"})});P.get("/api/real-progress/:operationId",async e=>{try{const t=e.req.param("operationId"),{shop:a,accessToken:s}=e.req.query();if(!t||!a||!s)return e.json({error:"Operation ID, shop, and accessToken are required"},400);const r=_.get(t);if(!r)return e.json({error:"Operation not found",operationId:t},404);console.log(`🔍 Getting REAL progress from Shopify API for operation: ${t}`);const n=new Date(r.startTime),o=await yt(a,s,n,r.total);if(o){const i={...r,analyzed:o.analyzed,updated:o.updated,failed:o.failed,unchanged:o.unchanged,lastUpdate:Date.now(),status:o.updated>0?`${o.updated} produtos atualizados na Shopify (dados reais)`:"Consultando atualizações na API Shopify...",details:["Consultando API Shopify em tempo real",`${o.updated} produtos efetivamente atualizados`,"Dados obtidos diretamente da loja"]};_.set(t,i);const l=r.total>0?Math.round(o.analyzed/r.total*100):0,d=Date.now()-r.startTime;return e.json({success:!0,operationId:t,source:"shopify-api",progress:{...i,percentage:l,elapsedMs:d,isComplete:o.analyzed>=r.total,recentlyUpdatedProducts:o.recentlyUpdatedProducts?.slice(0,5)}})}else{const i=r.total>0?Math.round(r.analyzed/r.total*100):0,l=Date.now()-r.startTime;return e.json({success:!0,operationId:t,source:"fallback",progress:{...r,percentage:i,elapsedMs:l,isComplete:r.analyzed>=r.total,status:"Erro ao consultar API Shopify - usando dados de fallback"}})}}catch(t){return console.error("❌ Error getting real progress:",t),e.json({error:"Error fetching real progress: "+(t instanceof Error?t.message:"Unknown error")},500)}});P.post("/api/test-real-shopify-progress",async e=>{try{const{shop:t,accessToken:a,operationType:s}=await e.req.json();if(!t||!a)return e.json({error:"shop and accessToken are required for real testing"},400);const r=`test-real-${Date.now()}-${Math.random().toString(36).substring(7)}`,n=Date.now();return $(r,{type:s||"test-real-api",status:"testing-real-api",total:10,analyzed:0,updated:0,failed:0,unchanged:0,details:[`Testando integração real com API Shopify da loja: ${t}`]}),setTimeout(async()=>{try{console.log(`🧪 Testing real Shopify API integration for ${t}`);const o=await je(t,a,new Date(Date.now()-864e5));console.log(`📊 Found ${o.length} recently updated products in Shopify`),$(r,{analyzed:Math.min(o.length,10),updated:o.length,failed:0,unchanged:Math.max(0,10-o.length),status:`Teste concluído: ${o.length} produtos encontrados na API Shopify`,details:["Conexão com API Shopify: ✅ Sucesso",`Produtos encontrados: ${o.length}`,`Dados obtidos diretamente da loja ${t}`,`Produtos recentes: ${o.slice(0,3).map(i=>i.title).join(", ")}`]})}catch(o){console.error("❌ Real API test error:",o),$(r,{status:"Erro ao testar API Shopify",failed:1,details:[`Erro: ${o instanceof Error?o.message:"Erro desconhecido"}`]})}},2e3),e.json({success:!0,operationId:r,message:"Teste de API real iniciado - use /api/real-progress para acompanhar",testEndpoint:`/api/real-progress/${r}?shop=${t}&accessToken=${a}`})}catch(t){return e.json({error:"Erro no teste de API real: "+(t instanceof Error?t.message:"Erro desconhecido")},500)}});P.post("/api/test-diagnostic-progress",async e=>{try{const{stage:t}=await e.req.json(),a={start:{analyzed:0,updated:0,failed:0,unchanged:0,total:50,status:"Iniciando processamento...",percentage:0},progress1:{analyzed:15,updated:12,failed:1,unchanged:2,total:50,status:"Processando títulos das opções...",percentage:30},progress2:{analyzed:30,updated:24,failed:3,unchanged:3,total:50,status:"Aplicando alterações em massa...",percentage:60},progress3:{analyzed:45,updated:38,failed:4,unchanged:3,total:50,status:"Finalizando processamento...",percentage:90},complete:{analyzed:50,updated:42,failed:5,unchanged:3,total:50,status:"Processamento concluído!",percentage:100}},s=a[t]||a.start;return e.json({success:!0,data:s,timestamp:new Date().toISOString()})}catch(t){return e.json({error:"Erro no teste de diagnóstico: "+(t instanceof Error?t.message:"Erro desconhecido")},500)}});P.get("/",e=>e.html(`
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


        <!-- Progress Modal -->
        <div id="progress-modal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50">
            <div class="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-xl font-bold text-gray-800">
                        <i class="fas fa-cogs mr-2"></i>
                        <span id="progress-title">Resultados da Atualização em Massa</span>
                    </h3>
                    <button id="close-progress-modal" class="text-gray-500 hover:text-gray-700">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                        <div id="progress-analyzed" class="text-2xl font-bold text-blue-600 mb-1">0</div>
                        <div class="text-sm text-blue-600 font-medium">Produtos Analisados</div>
                    </div>
                    <div class="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                        <div id="progress-updated" class="text-2xl font-bold text-green-600 mb-1">0</div>
                        <div class="text-sm text-green-600 font-medium">Produtos Atualizados</div>
                    </div>
                    <div class="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                        <div id="progress-failed" class="text-2xl font-bold text-red-600 mb-1">0</div>
                        <div class="text-sm text-red-600 font-medium">Falhas</div>
                    </div>
                    <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                        <div id="progress-unchanged" class="text-2xl font-bold text-yellow-600 mb-1">0</div>
                        <div class="text-sm text-yellow-600 font-medium">Sem Alteração</div>
                    </div>
                </div>
                <div class="mb-4">
                    <div class="flex justify-between items-center mb-2">
                        <span class="text-sm font-medium text-gray-700">Progresso</span>
                        <span id="progress-text" class="text-sm text-gray-500">0/0</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-3">
                        <div id="progress-bar" class="bg-green-500 h-3 rounded-full transition-all duration-300" style="width: 0%"></div>
                    </div>
                </div>
                <div class="mb-4">
                    <div class="text-sm font-medium text-gray-700 mb-2">Status Atual:</div>
                    <div id="progress-status" class="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                        <i class="fas fa-clock mr-2"></i>Preparando processamento...
                    </div>
                </div>
                <div class="flex justify-end space-x-3">
                    <button id="cancel-progress" class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
                        Cancelar
                    </button>
                    <button id="hide-progress" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Ocultar (continua em background)
                    </button>
                </div>
            </div>
        </div>
        <script src="/static/app.js"><\/script>
    </body>
    </html>
  `));const ue=new Se,Pt=Object.assign({"/src/index.tsx":P});let ke=!1;for(const[,e]of Object.entries(Pt))e&&(ue.route("/",e),ue.notFound(e.notFoundHandler),ke=!0);if(!ke)throw new Error("Can't import modules from ['/src/index.tsx','/app/server.ts']");export{ue as default};
