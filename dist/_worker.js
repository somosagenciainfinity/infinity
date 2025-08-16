var ne=(e,t,a)=>(s,r)=>{let o=-1;return n(0);async function n(i){if(i<=o)throw new Error("next() called multiple times");o=i;let l,c=!1,d;if(e[i]?(d=e[i][0][0],s.req.routeIndex=i):d=i===e.length&&r||void 0,d)try{l=await d(s,()=>n(i+1))}catch(u){if(u instanceof Error&&t)s.error=u,l=await t(u,s),c=!0;else throw u}else s.finalized===!1&&a&&(l=await a(s));return l&&(s.finalized===!1||c)&&(s.res=l),s}},ke=Symbol(),$e=async(e,t=Object.create(null))=>{const{all:a=!1,dot:s=!1}=t,o=(e instanceof be?e.raw.headers:e.headers).get("Content-Type");return o?.startsWith("multipart/form-data")||o?.startsWith("application/x-www-form-urlencoded")?Ie(e,{all:a,dot:s}):{}};async function Ie(e,t){const a=await e.formData();return a?Me(a,t):{}}function Me(e,t){const a=Object.create(null);return e.forEach((s,r)=>{t.all||r.endsWith("[]")?De(a,r,s):a[r]=s}),t.dot&&Object.entries(a).forEach(([s,r])=>{s.includes(".")&&(Le(a,s,r),delete a[s])}),a}var De=(e,t,a)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(a):e[t]=[e[t],a]:t.endsWith("[]")?e[t]=[a]:e[t]=a},Le=(e,t,a)=>{let s=e;const r=t.split(".");r.forEach((o,n)=>{n===r.length-1?s[o]=a:((!s[o]||typeof s[o]!="object"||Array.isArray(s[o])||s[o]instanceof File)&&(s[o]=Object.create(null)),s=s[o])})},pe=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},ze=e=>{const{groups:t,path:a}=Ne(e),s=pe(a);return _e(s,t)},Ne=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(a,s)=>{const r=`@${s}`;return t.push([r,a]),r}),{groups:t,path:e}},_e=(e,t)=>{for(let a=t.length-1;a>=0;a--){const[s]=t[a];for(let r=e.length-1;r>=0;r--)if(e[r].includes(s)){e[r]=e[r].replace(s,t[a][1]);break}}return e},q={},He=(e,t)=>{if(e==="*")return"*";const a=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(a){const s=`${e}#${t}`;return q[s]||(a[2]?q[s]=t&&t[0]!==":"&&t[0]!=="*"?[s,a[1],new RegExp(`^${a[2]}(?=/${t})`)]:[e,a[1],new RegExp(`^${a[2]}$`)]:q[s]=[e,a[1],!0]),q[s]}return null},Z=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,a=>{try{return t(a)}catch{return a}})}},Ve=e=>Z(e,decodeURI),he=e=>{const t=e.url,a=t.indexOf("/",t.charCodeAt(9)===58?13:8);let s=a;for(;s<t.length;s++){const r=t.charCodeAt(s);if(r===37){const o=t.indexOf("?",s),n=t.slice(a,o===-1?void 0:o);return Ve(n.includes("%25")?n.replace(/%25/g,"%2525"):n)}else if(r===63)break}return t.slice(a,s)},Be=e=>{const t=he(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},z=(e,t,...a)=>(a.length&&(t=z(t,...a)),`${e?.[0]==="/"?"":"/"}${e}${t==="/"?"":`${e?.at(-1)==="/"?"":"/"}${t?.[0]==="/"?t.slice(1):t}`}`),ge=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),a=[];let s="";return t.forEach(r=>{if(r!==""&&!/\:/.test(r))s+="/"+r;else if(/\:/.test(r))if(/\?/.test(r)){a.length===0&&s===""?a.push("/"):a.push(s);const o=r.replace("?","");s+="/"+o,a.push(s)}else s+="/"+r}),a.filter((r,o,n)=>n.indexOf(r)===o)},X=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?Z(e,fe):e):e,me=(e,t,a)=>{let s;if(!a&&t&&!/[%+]/.test(t)){let n=e.indexOf(`?${t}`,8);for(n===-1&&(n=e.indexOf(`&${t}`,8));n!==-1;){const i=e.charCodeAt(n+t.length+1);if(i===61){const l=n+t.length+2,c=e.indexOf("&",l);return X(e.slice(l,c===-1?void 0:c))}else if(i==38||isNaN(i))return"";n=e.indexOf(`&${t}`,n+1)}if(s=/[%+]/.test(e),!s)return}const r={};s??=/[%+]/.test(e);let o=e.indexOf("?",8);for(;o!==-1;){const n=e.indexOf("&",o+1);let i=e.indexOf("=",o);i>n&&n!==-1&&(i=-1);let l=e.slice(o+1,i===-1?n===-1?void 0:n:i);if(s&&(l=X(l)),o=n,l==="")continue;let c;i===-1?c="":(c=e.slice(i+1,n===-1?void 0:n),s&&(c=X(c))),a?(r[l]&&Array.isArray(r[l])||(r[l]=[]),r[l].push(c)):r[l]??=c}return t?r[t]:r},Fe=me,qe=(e,t)=>me(e,t,!0),fe=decodeURIComponent,ie=e=>Z(e,fe),be=class{raw;#t;#e;routeIndex=0;path;bodyCache={};constructor(e,t="/",a=[[]]){this.raw=e,this.path=t,this.#e=a,this.#t={}}param(e){return e?this.#s(e):this.#o()}#s(e){const t=this.#e[0][this.routeIndex][1][e],a=this.#r(t);return a?/\%/.test(a)?ie(a):a:void 0}#o(){const e={},t=Object.keys(this.#e[0][this.routeIndex][1]);for(const a of t){const s=this.#r(this.#e[0][this.routeIndex][1][a]);s&&typeof s=="string"&&(e[a]=/\%/.test(s)?ie(s):s)}return e}#r(e){return this.#e[1]?this.#e[1][e]:e}query(e){return Fe(this.url,e)}queries(e){return qe(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((a,s)=>{t[s]=a}),t}async parseBody(e){return this.bodyCache.parsedBody??=await $e(this,e)}#a=e=>{const{bodyCache:t,raw:a}=this,s=t[e];if(s)return s;const r=Object.keys(t)[0];return r?t[r].then(o=>(r==="json"&&(o=JSON.stringify(o)),new Response(o)[e]())):t[e]=a[e]()};json(){return this.#a("text").then(e=>JSON.parse(e))}text(){return this.#a("text")}arrayBuffer(){return this.#a("arrayBuffer")}blob(){return this.#a("blob")}formData(){return this.#a("formData")}addValidatedData(e,t){this.#t[e]=t}valid(e){return this.#t[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[ke](){return this.#e}get matchedRoutes(){return this.#e[0].map(([[,e]])=>e)}get routePath(){return this.#e[0].map(([[,e]])=>e)[this.routeIndex].path}},Ue={Stringify:1},ve=async(e,t,a,s,r)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const o=e.callbacks;return o?.length?(r?r[0]+=e:r=[e],Promise.all(o.map(i=>i({phase:t,buffer:r,context:s}))).then(i=>Promise.all(i.filter(Boolean).map(l=>ve(l,t,!1,s,r))).then(()=>r[0]))):Promise.resolve(e)},Ge="text/plain; charset=UTF-8",J=(e,t)=>({"Content-Type":e,...t}),Ke=class{#t;#e;env={};#s;finalized=!1;error;#o;#r;#a;#d;#l;#c;#i;#u;#p;constructor(e,t){this.#t=e,t&&(this.#r=t.executionCtx,this.env=t.env,this.#c=t.notFoundHandler,this.#p=t.path,this.#u=t.matchResult)}get req(){return this.#e??=new be(this.#t,this.#p,this.#u),this.#e}get event(){if(this.#r&&"respondWith"in this.#r)return this.#r;throw Error("This context has no FetchEvent")}get executionCtx(){if(this.#r)return this.#r;throw Error("This context has no ExecutionContext")}get res(){return this.#a||=new Response(null,{headers:this.#i??=new Headers})}set res(e){if(this.#a&&e){e=new Response(e.body,e);for(const[t,a]of this.#a.headers.entries())if(t!=="content-type")if(t==="set-cookie"){const s=this.#a.headers.getSetCookie();e.headers.delete("set-cookie");for(const r of s)e.headers.append("set-cookie",r)}else e.headers.set(t,a)}this.#a=e,this.finalized=!0}render=(...e)=>(this.#l??=t=>this.html(t),this.#l(...e));setLayout=e=>this.#d=e;getLayout=()=>this.#d;setRenderer=e=>{this.#l=e};header=(e,t,a)=>{this.finalized&&(this.#a=new Response(this.#a.body,this.#a));const s=this.#a?this.#a.headers:this.#i??=new Headers;t===void 0?s.delete(e):a?.append?s.append(e,t):s.set(e,t)};status=e=>{this.#o=e};set=(e,t)=>{this.#s??=new Map,this.#s.set(e,t)};get=e=>this.#s?this.#s.get(e):void 0;get var(){return this.#s?Object.fromEntries(this.#s):{}}#n(e,t,a){const s=this.#a?new Headers(this.#a.headers):this.#i??new Headers;if(typeof t=="object"&&"headers"in t){const o=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[n,i]of o)n.toLowerCase()==="set-cookie"?s.append(n,i):s.set(n,i)}if(a)for(const[o,n]of Object.entries(a))if(typeof n=="string")s.set(o,n);else{s.delete(o);for(const i of n)s.append(o,i)}const r=typeof t=="number"?t:t?.status??this.#o;return new Response(e,{status:r,headers:s})}newResponse=(...e)=>this.#n(...e);body=(e,t,a)=>this.#n(e,t,a);text=(e,t,a)=>!this.#i&&!this.#o&&!t&&!a&&!this.finalized?new Response(e):this.#n(e,t,J(Ge,a));json=(e,t,a)=>this.#n(JSON.stringify(e),t,J("application/json",a));html=(e,t,a)=>{const s=r=>this.#n(r,t,J("text/html; charset=UTF-8",a));return typeof e=="object"?ve(e,Ue.Stringify,!1,{}).then(s):s(e)};redirect=(e,t)=>{const a=String(e);return this.header("Location",/[^\x00-\xFF]/.test(a)?encodeURI(a):a),this.newResponse(null,t??302)};notFound=()=>(this.#c??=()=>new Response,this.#c(this))},T="ALL",We="all",Ye=["get","post","put","delete","options","patch"],xe="Can not add a route since the matcher is already built.",ye=class extends Error{},Xe="__COMPOSED_HANDLER",Je=e=>e.text("404 Not Found",404),le=(e,t)=>{if("getResponse"in e){const a=e.getResponse();return t.newResponse(a.body,a)}return console.error(e),t.text("Internal Server Error",500)},we=class{get;post;put;delete;options;patch;all;on;use;router;getPath;_basePath="/";#t="/";routes=[];constructor(t={}){[...Ye,We].forEach(o=>{this[o]=(n,...i)=>(typeof n=="string"?this.#t=n:this.#o(o,this.#t,n),i.forEach(l=>{this.#o(o,this.#t,l)}),this)}),this.on=(o,n,...i)=>{for(const l of[n].flat()){this.#t=l;for(const c of[o].flat())i.map(d=>{this.#o(c.toUpperCase(),this.#t,d)})}return this},this.use=(o,...n)=>(typeof o=="string"?this.#t=o:(this.#t="*",n.unshift(o)),n.forEach(i=>{this.#o(T,this.#t,i)}),this);const{strict:s,...r}=t;Object.assign(this,r),this.getPath=s??!0?t.getPath??he:Be}#e(){const t=new we({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,t.#s=this.#s,t.routes=this.routes,t}#s=Je;errorHandler=le;route(t,a){const s=this.basePath(t);return a.routes.map(r=>{let o;a.errorHandler===le?o=r.handler:(o=async(n,i)=>(await ne([],a.errorHandler)(n,()=>r.handler(n,i))).res,o[Xe]=r.handler),s.#o(r.method,r.path,o)}),this}basePath(t){const a=this.#e();return a._basePath=z(this._basePath,t),a}onError=t=>(this.errorHandler=t,this);notFound=t=>(this.#s=t,this);mount(t,a,s){let r,o;s&&(typeof s=="function"?o=s:(o=s.optionHandler,s.replaceRequest===!1?r=l=>l:r=s.replaceRequest));const n=o?l=>{const c=o(l);return Array.isArray(c)?c:[c]}:l=>{let c;try{c=l.executionCtx}catch{}return[l.env,c]};r||=(()=>{const l=z(this._basePath,t),c=l==="/"?0:l.length;return d=>{const u=new URL(d.url);return u.pathname=u.pathname.slice(c)||"/",new Request(u,d)}})();const i=async(l,c)=>{const d=await a(r(l.req.raw),...n(l));if(d)return d;await c()};return this.#o(T,z(t,"*"),i),this}#o(t,a,s){t=t.toUpperCase(),a=z(this._basePath,a);const r={basePath:this._basePath,path:a,method:t,handler:s};this.router.add(t,a,[s,r]),this.routes.push(r)}#r(t,a){if(t instanceof Error)return this.errorHandler(t,a);throw t}#a(t,a,s,r){if(r==="HEAD")return(async()=>new Response(null,await this.#a(t,a,s,"GET")))();const o=this.getPath(t,{env:s}),n=this.router.match(r,o),i=new Ke(t,{path:o,matchResult:n,env:s,executionCtx:a,notFoundHandler:this.#s});if(n[0].length===1){let c;try{c=n[0][0][0][0](i,async()=>{i.res=await this.#s(i)})}catch(d){return this.#r(d,i)}return c instanceof Promise?c.then(d=>d||(i.finalized?i.res:this.#s(i))).catch(d=>this.#r(d,i)):c??this.#s(i)}const l=ne(n[0],this.errorHandler,this.#s);return(async()=>{try{const c=await l(i);if(!c.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return c.res}catch(c){return this.#r(c,i)}})()}fetch=(t,...a)=>this.#a(t,a[1],a[0],t.method);request=(t,a,s,r)=>t instanceof Request?this.fetch(a?new Request(t,a):t,s,r):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${z("/",t)}`,a),s,r));fire=()=>{addEventListener("fetch",t=>{t.respondWith(this.#a(t.request,t,void 0,t.request.method))})}},G="[^/]+",V=".*",B="(?:|/.*)",N=Symbol(),Qe=new Set(".\\+*[^]$()");function Ze(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===V||e===B?1:t===V||t===B?-1:e===G?1:t===G?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var Q=class{#t;#e;#s=Object.create(null);insert(t,a,s,r,o){if(t.length===0){if(this.#t!==void 0)throw N;if(o)return;this.#t=a;return}const[n,...i]=t,l=n==="*"?i.length===0?["","",V]:["","",G]:n==="/*"?["","",B]:n.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let c;if(l){const d=l[1];let u=l[2]||G;if(d&&l[2]&&(u===".*"||(u=u.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(u))))throw N;if(c=this.#s[u],!c){if(Object.keys(this.#s).some(p=>p!==V&&p!==B))throw N;if(o)return;c=this.#s[u]=new Q,d!==""&&(c.#e=r.varIndex++)}!o&&d!==""&&s.push([d,c.#e])}else if(c=this.#s[n],!c){if(Object.keys(this.#s).some(d=>d.length>1&&d!==V&&d!==B))throw N;if(o)return;c=this.#s[n]=new Q}c.insert(i,a,s,r,o)}buildRegExpStr(){const a=Object.keys(this.#s).sort(Ze).map(s=>{const r=this.#s[s];return(typeof r.#e=="number"?`(${s})@${r.#e}`:Qe.has(s)?`\\${s}`:s)+r.buildRegExpStr()});return typeof this.#t=="number"&&a.unshift(`#${this.#t}`),a.length===0?"":a.length===1?a[0]:"(?:"+a.join("|")+")"}},et=class{#t={varIndex:0};#e=new Q;insert(e,t,a){const s=[],r=[];for(let n=0;;){let i=!1;if(e=e.replace(/\{[^}]+\}/g,l=>{const c=`@\\${n}`;return r[n]=[c,l],n++,i=!0,c}),!i)break}const o=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let n=r.length-1;n>=0;n--){const[i]=r[n];for(let l=o.length-1;l>=0;l--)if(o[l].indexOf(i)!==-1){o[l]=o[l].replace(i,r[n][1]);break}}return this.#e.insert(o,t,s,this.#t,a),s}buildRegExp(){let e=this.#e.buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const a=[],s=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(r,o,n)=>o!==void 0?(a[++t]=Number(o),"$()"):(n!==void 0&&(s[Number(n)]=++t),"")),[new RegExp(`^${e}`),a,s]}},Ee=[],tt=[/^$/,[],Object.create(null)],Te=Object.create(null);function Pe(e){return Te[e]??=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,a)=>a?`\\${a}`:"(?:|/.*)")}$`)}function st(){Te=Object.create(null)}function at(e){const t=new et,a=[];if(e.length===0)return tt;const s=e.map(c=>[!/\*|\/:/.test(c[0]),...c]).sort(([c,d],[u,p])=>c?1:u?-1:d.length-p.length),r=Object.create(null);for(let c=0,d=-1,u=s.length;c<u;c++){const[p,m,g]=s[c];p?r[m]=[g.map(([b])=>[b,Object.create(null)]),Ee]:d++;let h;try{h=t.insert(m,d,p)}catch(b){throw b===N?new ye(m):b}p||(a[d]=g.map(([b,f])=>{const E=Object.create(null);for(f-=1;f>=0;f--){const[w,k]=h[f];E[w]=k}return[b,E]}))}const[o,n,i]=t.buildRegExp();for(let c=0,d=a.length;c<d;c++)for(let u=0,p=a[c].length;u<p;u++){const m=a[c][u]?.[1];if(!m)continue;const g=Object.keys(m);for(let h=0,b=g.length;h<b;h++)m[g[h]]=i[m[g[h]]]}const l=[];for(const c in n)l[c]=a[n[c]];return[o,l,r]}function L(e,t){if(e){for(const a of Object.keys(e).sort((s,r)=>r.length-s.length))if(Pe(a).test(t))return[...e[a]]}}var rt=class{name="RegExpRouter";#t;#e;constructor(){this.#t={[T]:Object.create(null)},this.#e={[T]:Object.create(null)}}add(e,t,a){const s=this.#t,r=this.#e;if(!s||!r)throw new Error(xe);s[e]||[s,r].forEach(i=>{i[e]=Object.create(null),Object.keys(i[T]).forEach(l=>{i[e][l]=[...i[T][l]]})}),t==="/*"&&(t="*");const o=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const i=Pe(t);e===T?Object.keys(s).forEach(l=>{s[l][t]||=L(s[l],t)||L(s[T],t)||[]}):s[e][t]||=L(s[e],t)||L(s[T],t)||[],Object.keys(s).forEach(l=>{(e===T||e===l)&&Object.keys(s[l]).forEach(c=>{i.test(c)&&s[l][c].push([a,o])})}),Object.keys(r).forEach(l=>{(e===T||e===l)&&Object.keys(r[l]).forEach(c=>i.test(c)&&r[l][c].push([a,o]))});return}const n=ge(t)||[t];for(let i=0,l=n.length;i<l;i++){const c=n[i];Object.keys(r).forEach(d=>{(e===T||e===d)&&(r[d][c]||=[...L(s[d],c)||L(s[T],c)||[]],r[d][c].push([a,o-l+i+1]))})}}match(e,t){st();const a=this.#s();return this.match=(s,r)=>{const o=a[s]||a[T],n=o[2][r];if(n)return n;const i=r.match(o[0]);if(!i)return[[],Ee];const l=i.indexOf("",1);return[o[1][l],i]},this.match(e,t)}#s(){const e=Object.create(null);return Object.keys(this.#e).concat(Object.keys(this.#t)).forEach(t=>{e[t]||=this.#o(t)}),this.#t=this.#e=void 0,e}#o(e){const t=[];let a=e===T;return[this.#t,this.#e].forEach(s=>{const r=s[e]?Object.keys(s[e]).map(o=>[o,s[e][o]]):[];r.length!==0?(a||=!0,t.push(...r)):e!==T&&t.push(...Object.keys(s[T]).map(o=>[o,s[T][o]]))}),a?at(t):null}},ot=class{name="SmartRouter";#t=[];#e=[];constructor(e){this.#t=e.routers}add(e,t,a){if(!this.#e)throw new Error(xe);this.#e.push([e,t,a])}match(e,t){if(!this.#e)throw new Error("Fatal error");const a=this.#t,s=this.#e,r=a.length;let o=0,n;for(;o<r;o++){const i=a[o];try{for(let l=0,c=s.length;l<c;l++)i.add(...s[l]);n=i.match(e,t)}catch(l){if(l instanceof ye)continue;throw l}this.match=i.match.bind(i),this.#t=[i],this.#e=void 0;break}if(o===r)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,n}get activeRouter(){if(this.#e||this.#t.length!==1)throw new Error("No active router has been determined yet.");return this.#t[0]}},_=Object.create(null),Ae=class{#t;#e;#s;#o=0;#r=_;constructor(e,t,a){if(this.#e=a||Object.create(null),this.#t=[],e&&t){const s=Object.create(null);s[e]={handler:t,possibleKeys:[],score:0},this.#t=[s]}this.#s=[]}insert(e,t,a){this.#o=++this.#o;let s=this;const r=ze(t),o=[];for(let n=0,i=r.length;n<i;n++){const l=r[n],c=r[n+1],d=He(l,c),u=Array.isArray(d)?d[0]:l;if(u in s.#e){s=s.#e[u],d&&o.push(d[1]);continue}s.#e[u]=new Ae,d&&(s.#s.push(d),o.push(d[1])),s=s.#e[u]}return s.#t.push({[e]:{handler:a,possibleKeys:o.filter((n,i,l)=>l.indexOf(n)===i),score:this.#o}}),s}#a(e,t,a,s){const r=[];for(let o=0,n=e.#t.length;o<n;o++){const i=e.#t[o],l=i[t]||i[T],c={};if(l!==void 0&&(l.params=Object.create(null),r.push(l),a!==_||s&&s!==_))for(let d=0,u=l.possibleKeys.length;d<u;d++){const p=l.possibleKeys[d],m=c[l.score];l.params[p]=s?.[p]&&!m?s[p]:a[p]??s?.[p],c[l.score]=!0}}return r}search(e,t){const a=[];this.#r=_;let r=[this];const o=pe(t),n=[];for(let i=0,l=o.length;i<l;i++){const c=o[i],d=i===l-1,u=[];for(let p=0,m=r.length;p<m;p++){const g=r[p],h=g.#e[c];h&&(h.#r=g.#r,d?(h.#e["*"]&&a.push(...this.#a(h.#e["*"],e,g.#r)),a.push(...this.#a(h,e,g.#r))):u.push(h));for(let b=0,f=g.#s.length;b<f;b++){const E=g.#s[b],w=g.#r===_?{}:{...g.#r};if(E==="*"){const C=g.#e["*"];C&&(a.push(...this.#a(C,e,g.#r)),C.#r=w,u.push(C));continue}const[k,x,P]=E;if(!c&&!(P instanceof RegExp))continue;const v=g.#e[k],y=o.slice(i).join("/");if(P instanceof RegExp){const C=P.exec(y);if(C){if(w[x]=C[0],a.push(...this.#a(v,e,g.#r,w)),Object.keys(v.#e).length){v.#r=w;const j=C[0].match(/\//)?.length??0;(n[j]||=[]).push(v)}continue}}(P===!0||P.test(c))&&(w[x]=c,d?(a.push(...this.#a(v,e,w,g.#r)),v.#e["*"]&&a.push(...this.#a(v.#e["*"],e,w,g.#r))):(v.#r=w,u.push(v)))}}r=u.concat(n.shift()??[])}return a.length>1&&a.sort((i,l)=>i.score-l.score),[a.map(({handler:i,params:l})=>[i,l])]}},nt=class{name="TrieRouter";#t;constructor(){this.#t=new Ae}add(e,t,a){const s=ge(t);if(s){for(let r=0,o=s.length;r<o;r++)this.#t.insert(e,s[r],a);return}this.#t.insert(e,t,a)}match(e,t){return this.#t.search(e,t)}},Ce=class extends we{constructor(e={}){super(e),this.router=e.router??new ot({routers:[new rt,new nt]})}},it=e=>{const a={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...e},s=(o=>typeof o=="string"?o==="*"?()=>o:n=>o===n?n:null:typeof o=="function"?o:n=>o.includes(n)?n:null)(a.origin),r=(o=>typeof o=="function"?o:Array.isArray(o)?()=>o:()=>[])(a.allowMethods);return async function(n,i){function l(d,u){n.res.headers.set(d,u)}const c=s(n.req.header("origin")||"",n);if(c&&l("Access-Control-Allow-Origin",c),a.origin!=="*"){const d=n.req.header("Vary");d?l("Vary",d):l("Vary","Origin")}if(a.credentials&&l("Access-Control-Allow-Credentials","true"),a.exposeHeaders?.length&&l("Access-Control-Expose-Headers",a.exposeHeaders.join(",")),n.req.method==="OPTIONS"){a.maxAge!=null&&l("Access-Control-Max-Age",a.maxAge.toString());const d=r(n.req.header("origin")||"",n);d.length&&l("Access-Control-Allow-Methods",d.join(","));let u=a.allowHeaders;if(!u?.length){const p=n.req.header("Access-Control-Request-Headers");p&&(u=p.split(/\s*,\s*/))}return u?.length&&(l("Access-Control-Allow-Headers",u.join(",")),n.res.headers.append("Vary","Access-Control-Request-Headers")),n.res.headers.delete("Content-Length"),n.res.headers.delete("Content-Type"),new Response(null,{headers:n.res.headers,status:204,statusText:"No Content"})}await i()}},lt=/^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i,ce=(e,t=dt)=>{const a=/\.([a-zA-Z0-9]+?)$/,s=e.match(a);if(!s)return;let r=t[s[1]];return r&&r.startsWith("text")&&(r+="; charset=utf-8"),r},ct={aac:"audio/aac",avi:"video/x-msvideo",avif:"image/avif",av1:"video/av1",bin:"application/octet-stream",bmp:"image/bmp",css:"text/css",csv:"text/csv",eot:"application/vnd.ms-fontobject",epub:"application/epub+zip",gif:"image/gif",gz:"application/gzip",htm:"text/html",html:"text/html",ico:"image/x-icon",ics:"text/calendar",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",jsonld:"application/ld+json",map:"application/json",mid:"audio/x-midi",midi:"audio/x-midi",mjs:"text/javascript",mp3:"audio/mpeg",mp4:"video/mp4",mpeg:"video/mpeg",oga:"audio/ogg",ogv:"video/ogg",ogx:"application/ogg",opus:"audio/opus",otf:"font/otf",pdf:"application/pdf",png:"image/png",rtf:"application/rtf",svg:"image/svg+xml",tif:"image/tiff",tiff:"image/tiff",ts:"video/mp2t",ttf:"font/ttf",txt:"text/plain",wasm:"application/wasm",webm:"video/webm",weba:"audio/webm",webmanifest:"application/manifest+json",webp:"image/webp",woff:"font/woff",woff2:"font/woff2",xhtml:"application/xhtml+xml",xml:"application/xml",zip:"application/zip","3gp":"video/3gpp","3g2":"video/3gpp2",gltf:"model/gltf+json",glb:"model/gltf-binary"},dt=ct,ut=(...e)=>{let t=e.filter(r=>r!=="").join("/");t=t.replace(/(?<=\/)\/+/g,"");const a=t.split("/"),s=[];for(const r of a)r===".."&&s.length>0&&s.at(-1)!==".."?s.pop():r!=="."&&s.push(r);return s.join("/")||"."},Se={br:".br",zstd:".zst",gzip:".gz"},pt=Object.keys(Se),ht="index.html",gt=e=>{const t=e.root??"./",a=e.path,s=e.join??ut;return async(r,o)=>{if(r.finalized)return o();let n;if(e.path)n=e.path;else try{if(n=decodeURIComponent(r.req.path),/(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(n))throw new Error}catch{return await e.onNotFound?.(r.req.path,r),o()}let i=s(t,!a&&e.rewriteRequestPath?e.rewriteRequestPath(n):n);e.isDir&&await e.isDir(i)&&(i=s(i,ht));const l=e.getContent;let c=await l(i,r);if(c instanceof Response)return r.newResponse(c.body,c);if(c){const d=e.mimes&&ce(i,e.mimes)||ce(i);if(r.header("Content-Type",d||"application/octet-stream"),e.precompressed&&(!d||lt.test(d))){const u=new Set(r.req.header("Accept-Encoding")?.split(",").map(p=>p.trim()));for(const p of pt){if(!u.has(p))continue;const m=await l(i+Se[p],r);if(m){c=m,r.header("Content-Encoding",p),r.header("Vary","Accept-Encoding",{append:!0});break}}}return await e.onFound?.(i,r),r.body(c)}await e.onNotFound?.(i,r),await o()}},mt=async(e,t)=>{let a;t&&t.manifest?typeof t.manifest=="string"?a=JSON.parse(t.manifest):a=t.manifest:typeof __STATIC_CONTENT_MANIFEST=="string"?a=JSON.parse(__STATIC_CONTENT_MANIFEST):a=__STATIC_CONTENT_MANIFEST;let s;t&&t.namespace?s=t.namespace:s=__STATIC_CONTENT;const r=a[e]||e;if(!r)return null;const o=await s.get(r,{type:"stream"});return o||null},ft=e=>async function(a,s){return gt({...e,getContent:async o=>mt(o,{manifest:e.manifest,namespace:e.namespace?e.namespace:a.env?a.env.__STATIC_CONTENT:void 0})})(a,s)},bt=e=>ft(e);const A=new Ce;A.use("/api/*",it());A.use("/static/*",bt({root:"./public"}));const U=new Map,H=new Map,K=new Map;function $(e,t){const s={...K.get(e)||{operationId:e,analyzed:0,updated:0,failed:0,unchanged:0,total:0,startTime:Date.now(),lastUpdate:Date.now(),status:"starting",type:"unknown",details:[]},...t,lastUpdate:Date.now()};return K.set(e,s),console.log(`📊 Progress Update [${e}]:`,s),s}const de={products:{limit:500,windowMs:6e4},collections:{limit:300,windowMs:6e4},bulkUpdate:{limit:1e3,windowMs:6e4},bulkVariants:{limit:800,windowMs:6e4},analyzeVariants:{limit:200,windowMs:6e4},concurrent:{maxChunks:20,chunkSize:25,chunkDelay:50}};function ee(e,t){return`${e}:${JSON.stringify(t)}`}function te(e,t=3e5){const a=H.get(e);return a&&Date.now()-a.timestamp<t?(console.log(`⚡ CACHE HIT: ${e}`),a.data):null}function se(e,t){if(H.set(e,{data:t,timestamp:Date.now()}),H.size>1e3){const a=H.keys().next().value;H.delete(a)}}function W(e,t){const a=t?de[t]||de.products:{limit:100,windowMs:6e4},s=Date.now(),r=s-a.windowMs;U.has(e)||U.set(e,[]);const n=U.get(e).filter(i=>i>r);return n.length>=a.limit?!1:(n.push(s),U.set(e,n),!0)}function Re(e){return new Promise(t=>setTimeout(t,e))}async function vt(e,t=3,a=1e3){for(let s=1;s<=t;s++)try{return await e()}catch(r){if(s===t)throw r;const o=a*Math.pow(2,s-1);console.log(`🔄 Retry ${s}/${t} in ${o}ms...`),await Re(o)}throw new Error("Max retries exceeded")}async function F(e,t,a,s="GET",r,o=3e4){const n=`https://${e}.myshopify.com/admin/api/2024-01/${a}`,l={method:s,headers:{"X-Shopify-Access-Token":t,"Content-Type":"application/json"},signal:AbortSignal.timeout(o)};return r&&(s==="POST"||s==="PUT")&&(l.body=JSON.stringify(r)),await vt(async()=>{const c=await fetch(n,l);if(c.status===429){const u=c.headers.get("Retry-After")||"2",p=parseInt(u)*1e3;throw console.log(`⏳ Rate limited by Shopify, waiting ${p}ms...`),await Re(p),new Error("Rate limited, retrying...")}if(!c.ok){const u=await c.text();throw new Error(`Shopify API error: ${c.status} - ${u}`)}return await c.json()},3,1e3)}function ae(e){if(!e)return"";const t=e.split(",");for(const a of t)if(a.includes('rel="next"')){const s=a.split(";")[0].trim();if(s.startsWith("<")&&s.endsWith(">"))return s.slice(1,-1)}return""}async function D(e,t,a){const s=ee("products",{shop:e,forceLimit:a}),r=te(s,18e4);if(r)return console.log(`⚡ PRODUCTS CACHE HIT - INSTANT LOAD: ${r.length} products`),r;let o=[],i=`https://${e}.myshopify.com/admin/api/2024-01/products.json?limit=250&fields=id,title,vendor,product_type,status,variants,options,image`;console.log("⚡ ULTRA-FAST PRODUCT LOADING - MINIMAL FIELDS ONLY");const l=Date.now();let c=0;for(;i&&c<20;){c++,console.log(`⚡ Speed loading page ${c}...`);try{const u={method:"GET",headers:{"X-Shopify-Access-Token":t,"Content-Type":"application/json"},signal:AbortSignal.timeout(1e4)},p=await fetch(i,u);if(!p.ok){console.error(`❌ Page ${c} failed: ${p.status}`);break}const g=(await p.json()).products||[];if(g.length===0){console.log(`✅ No more products at page ${c}`);break}o.push(...g),console.log(`⚡ Page ${c}: +${g.length} products (Total: ${o.length})`);const h=p.headers.get("Link")||"";if(i=ae(h),a&&o.length>=a){console.log(`⚡ SPEED LIMIT REACHED: ${a} products`),o=o.slice(0,a);break}}catch(u){console.error(`❌ Page ${c} error:`,u);break}}const d=Date.now()-l;return console.log(`⚡ ULTRA-FAST LOAD COMPLETE: ${o.length} products in ${d}ms`),se(s,o),o}async function je(e,t){const a=ee("collections",{shop:e}),s=te(a,3e5);if(s)return console.log(`⚡ COLLECTIONS CACHE HIT - INSTANT LOAD: ${s.length} collections`),s;const r="id,title,handle",o=["custom_collections","smart_collections"];console.log("⚡ ULTRA-FAST COLLECTIONS LOADING - PARALLEL PROCESSING");const n=Date.now(),i=o.map(async u=>{const p=[];let m=`https://${e}.myshopify.com/admin/api/2024-01/${u}.json?limit=250&fields=${r}`,g=0;for(;m&&g<10;){g++;try{const h=await fetch(m,{method:"GET",headers:{"X-Shopify-Access-Token":t,"Content-Type":"application/json"},signal:AbortSignal.timeout(8e3)});if(!h.ok)break;const f=(await h.json())[u]||[];if(f.length===0)break;p.push(...f),console.log(`⚡ ${u} page ${g}: +${f.length}`);const E=h.headers.get("Link")||"";m=ae(E)}catch(h){console.error(`❌ ${u} error:`,h);break}}return p}),l=await Promise.allSettled(i);let c=[];l.forEach((u,p)=>{u.status==="fulfilled"&&(c.push(...u.value),console.log(`⚡ ${o[p]}: ${u.value.length} collections`))});const d=Date.now()-n;return console.log(`⚡ ULTRA-FAST COLLECTIONS COMPLETE: ${c.length} collections in ${d}ms`),se(a,c),c}async function xt(e,t,a){let s=[],r=`https://${e}.myshopify.com/admin/api/2024-01/collections/${a}/products.json?limit=250&fields=id`;for(;r;)try{const o=await fetch(r,{method:"GET",headers:{"X-Shopify-Access-Token":t,"Content-Type":"application/json"}});if(!o.ok)break;const i=(await o.json()).products||[];s=s.concat(i);const l=o.headers.get("Link")||"";r=ae(l)}catch(o){console.log(`❌ Error in collection ${a} pagination:`,o);break}return s}async function yt(e,t,a){const s={};console.log("🔍 MAPEANDO PRODUTOS POR COLEÇÃO COM PAGINAÇÃO COMPLETA...");for(const r of a)try{console.log(`🔍 Buscando produtos da coleção "${r.title}"...`);const o=await xt(e,t,r.id);o.forEach(n=>{s[n.id]||(s[n.id]=[]),s[n.id].push(r.id.toString())}),console.log(`✅ Coleção "${r.title}": ${o.length} produtos (com paginação completa)`)}catch(o){console.log(`❌ Erro na coleção ${r.title}:`,o)}return console.log(`✅ Mapeamento completo: ${Object.keys(s).length} produtos mapeados`),s}async function wt(e,t,a,s){const r=[];for(let o=0;o<a.length;o++){const n=a[o];try{const i={id:n.id};s.title&&s.title!==n.title&&(i.title=s.title),s.description!==void 0&&s.description!==n.body_html&&(i.body_html=s.description),s.vendor&&s.vendor!==n.vendor&&(i.vendor=s.vendor),s.productType&&s.productType!==n.product_type&&(i.product_type=s.productType),s.tags!==void 0&&(i.tags=s.tags),s.status&&s.status!==n.status&&(i.status=s.status),(s.seoTitle||s.seoDescription)&&(i.metafields_global_title_tag=s.seoTitle||n.metafields_global_title_tag,i.metafields_global_description_tag=s.seoDescription||n.metafields_global_description_tag),(s.price||s.comparePrice)&&(i.variants=n.variants.map(c=>({id:c.id,price:s.price||c.price,compare_at_price:s.comparePrice||c.compare_at_price}))),s.inventory!==void 0&&(i.variants=n.variants.map(c=>({id:c.id,inventory_quantity:s.inventory})));const l=await F(e,t,`products/${n.id}.json`,"PUT",{product:i});r.push({id:n.id,success:!0,data:l.product}),o<a.length-1&&await new Promise(c=>setTimeout(c,200))}catch(i){r.push({id:n.id,success:!1,error:i instanceof Error?i.message:"Unknown error"})}}return r}A.post("/api/test-connection",async e=>{try{const{shop:t,accessToken:a}=await e.req.json();if(!t||!a)return e.json({error:"Parâmetros obrigatórios: shop e accessToken"},400);const s=await F(t,a,"shop.json");return e.json({success:!0,shop:s.shop.name,domain:s.shop.domain,plan:s.shop.plan_name})}catch(t){return e.json({error:"Falha na conexão: "+(t instanceof Error?t.message:"Erro desconhecido")},401)}});A.get("/favicon.ico",e=>e.text("",204));A.get("/test-modal-diagnostico",e=>e.html(`<!DOCTYPE html>
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
</html>`));A.get("/test-variant-fix",e=>e.html(`<!DOCTYPE html>
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
</html>`));A.post("/api/products",async e=>{try{const{shop:t,accessToken:a}=await e.req.json();if(!t||!a)return e.json({error:"Parâmetros obrigatórios: shop e accessToken"},400);if(!W(`products:${t}`,"products"))return e.json({error:"Rate limit exceeded"},429);console.log("Loading ALL products with working pagination logic");const s=await D(t,a);console.log(`✅ Successfully loaded ${s.length} total products`),console.log("🔍 Loading collections for product mapping...");const r=await je(t,a);console.log(`✅ Loaded ${r.length} collections`);const o=await yt(t,a,r),n=s.map(i=>({...i,collection_ids:o[i.id]||[]}));return n.length>0&&console.log("✅ First product with collections:",{id:n[0].id,title:n[0].title,collection_ids:n[0].collection_ids}),e.json({products:n,total:n.length})}catch(t){return e.json({error:"Erro ao buscar produtos: "+(t instanceof Error?t.message:"Erro desconhecido")},500)}});A.post("/api/collections",async e=>{try{const{shop:t,accessToken:a}=await e.req.json();if(!t||!a)return e.json({error:"Parâmetros obrigatórios: shop e accessToken"},400);if(!W(`collections:${t}`,"collections"))return e.json({error:"Rate limit exceeded"},429);const s=await je(t,a);return e.json({collections:s})}catch(t){return e.json({error:"Erro ao buscar coleções: "+(t instanceof Error?t.message:"Erro desconhecido")},500)}});A.post("/api/bulk-update",async e=>{try{const{shop:t,accessToken:a,productIds:s,updates:r}=await e.req.json();if(!t||!a||!s||!r)return e.json({error:"Parâmetros obrigatórios: shop, accessToken, productIds, updates"},400);if(!W(`bulk:${t}`,"bulkUpdate"))return e.json({error:"Rate limit exceeded for bulk operations"},429);const o=[];for(const i of s)try{const l=await F(t,a,`products/${i}.json`);o.push(l.product)}catch(l){console.error(`Error fetching product ${i}:`,l)}const n=await wt(t,a,o,r);return e.json({results:n,successful:n.filter(i=>i.success).length,failed:n.filter(i=>!i.success).length})}catch(t){return e.json({error:"Erro na atualização em massa: "+(t instanceof Error?t.message:"Erro desconhecido")},500)}});A.post("/api/analyze-variants",async e=>{try{const{shop:t,accessToken:a,scope:s,selectedProductIds:r}=await e.req.json();if(!t||!a)return e.json({error:"Parâmetros obrigatórios: shop e accessToken"},400);if(s==="selected"&&(!r||r.length===0))return e.json({error:'Para escopo "selected", selectedProductIds é obrigatório'},400);const o=ee("analyze-variants",{shop:t,scope:s,selectedProductIds:r}),n=te(o,12e4);if(n)return console.log("⚡ VARIANT ANALYSIS CACHE HIT - INSTANT RESULTS"),e.json(n);console.log("⚡ ULTRA-FAST VARIANT ANALYSIS STARTING");const i=Date.now();let l=[];if(s==="selected"){const g=await D(t,a,500),h=new Set(r.map(b=>b.toString()));l=g.filter(b=>h.has(b.id.toString())),console.log(`⚡ Selected products filtered: ${l.length} products`)}else l=await D(t,a,1e3),console.log(`⚡ All products loaded: ${l.length} products`);const c={},d=[];let u=0;l.forEach(g=>{if(g.options?.length){if(g.options.forEach(h=>{const b=h.name;c[b]||(c[b]={name:b,values:new Set,productCount:0,products:[]});const f=c[b];f.productCount++,f.products.length<5&&f.products.push({id:g.id,title:g.title.substring(0,50)}),h.values?.length&&h.values.forEach(E=>f.values.add(E))}),d.length<20&&g.variants?.length){const h=g.variants[0];d.push({productId:g.id,productTitle:g.title.substring(0,50),variantId:h.id,price:h.price,option1:h.option1,option2:h.option2,option3:h.option3})}u+=g.variants?.length||0}}),Object.keys(c).forEach(g=>{const h=c[g];h.values=Array.from(h.values)});const p=Date.now()-i;console.log(`⚡ ULTRA-FAST ANALYSIS COMPLETE: ${Object.keys(c).length} options in ${p}ms`);const m={success:!0,totalProducts:l.length,optionStats:c,variantCount:u,sampleVariants:d,performanceMs:p};return se(o,m),e.json(m)}catch(t){return console.error("❌ Variant analysis error:",t),e.json({error:"Erro na análise de variantes: "+(t instanceof Error?t.message:"Erro desconhecido")},500)}});A.post("/api/bulk-update-variant-titles",async e=>{try{const{shop:t,accessToken:a,titleMappings:s,scope:r,selectedProductIds:o}=await e.req.json();if(!t||!a||!s||s.length===0)return e.json({error:"Parâmetros obrigatórios: shop, accessToken, titleMappings"},400);if(r==="selected"&&(!o||o.length===0))return e.json({error:'Para escopo "selected", selectedProductIds é obrigatório'},400);const n=`variant-titles-${Date.now()}-${Math.random().toString(36).substring(7)}`;console.log(`⚡ STARTING REAL-TIME TRACKED OPERATION: ${n}`);const i=Date.now();let l=[];if(r==="all")l=await D(t,a,500);else{const f=await D(t,a,1e3),E=new Set(o.map(w=>w.toString()));l=f.filter(w=>E.has(w.id.toString()))}console.log(`⚡ Processing ${l.length} products for title updates`);const c=new Map;s.forEach(f=>{c.set(f.currentTitle.toLowerCase(),f.newTitle)});const d=l.filter(f=>f.options?.length?f.options.some(E=>{const w=c.get(E.name.toLowerCase());return w&&w!==E.name}):!1);console.log(`⚡ Found ${d.length} products needing updates`),$(n,{type:"variant-titles",status:"processing",total:d.length,analyzed:0,updated:0,failed:0,unchanged:0,details:[`Iniciando processamento de ${d.length} produtos`]});const u=10,p=[];for(let f=0;f<d.length;f+=u)p.push(d.slice(f,f+u));let m=0,g=0;const h=[];for(let f=0;f<p.length;f++){const E=p[f];console.log(`⚡ Processing batch ${f+1}/${p.length} (${E.length} products)`),$(n,{status:`Processando lote ${f+1}/${p.length}`,details:[`Processando lote ${f+1} de ${p.length} (${E.length} produtos)`]});const w=E.map(async v=>{try{const y=v.options.map(j=>{const O=c.get(j.name.toLowerCase());return O&&O!==j.name?{...j,name:O}:j}),C=await F(t,a,`products/${v.id}.json`,"PUT",{product:{id:v.id,options:y}});return{productId:v.id,title:v.title.substring(0,50),success:!0,changes:y.map(j=>j.name).slice(0,3).join(", ")}}catch(y){return{productId:v.id,title:v.title.substring(0,50),success:!1,error:y instanceof Error?y.message.substring(0,100):"Erro desconhecido"}}});(await Promise.allSettled(w)).forEach(v=>{v.status==="fulfilled"?(h.push(v.value),v.value.success?m++:g++):(g++,h.push({productId:"unknown",title:"Erro no batch",success:!1,error:"Batch processing failed"}))});const x=(f+1)*u,P=Math.min(x,d.length);$(n,{analyzed:P,updated:m,failed:g,unchanged:Math.max(0,P-m-g),status:`Processados ${P}/${d.length} produtos`,details:[`Lote ${f+1}/${p.length} concluído`,`${m} atualizados, ${g} falhas`]}),f<p.length-1&&await new Promise(v=>setTimeout(v,100))}const b=Date.now()-i;return console.log(`⚡ ULTRA-FAST BULK UPDATE COMPLETE: ${m} updated, ${g} failed in ${b}ms`),$(n,{status:"completed",details:[`Operação concluída em ${Math.round(b/1e3)}s`,`${m} produtos atualizados com sucesso`,`${g} produtos com erro`]}),e.json({success:!0,operationId:n,totalProducts:l.length,updatedCount:m,failedCount:g,results:h.slice(0,20),performanceMs:b})}catch(t){return console.error("❌ Bulk variant titles error:",t),e.json({error:"Erro na atualização em massa de títulos de variantes: "+(t instanceof Error?t.message:"Erro desconhecido")},500)}});A.post("/api/bulk-update-variant-values",async e=>{try{const{shop:t,accessToken:a,valueMappings:s,scope:r,selectedProductIds:o}=await e.req.json();if(!t||!a||!s||s.length===0)return e.json({error:"Parâmetros obrigatórios: shop, accessToken, valueMappings"},400);if(r==="selected"&&(!o||o.length===0))return e.json({error:'Para escopo "selected", selectedProductIds é obrigatório'},400);const n=`variant-values-${Date.now()}-${Math.random().toString(36).substring(7)}`;console.log(`⚡ STARTING REAL-TIME TRACKED OPERATION: ${n}`);const i=Date.now();if(!W(`bulk-variant-values:${t}`,"bulkVariants"))return e.json({error:"Rate limit exceeded for bulk variant value operations"},429);let l=[];r==="all"?l=await D(t,a,250):l=(await D(t,a,250)).filter(b=>o.includes(b.id.toString())||o.includes(b.id));let c=0,d=0;const u=[];console.log(`🎯 Processando valores de variantes em ${l.length} produtos (escopo: ${r})`),$(n,{type:"variant-values",status:"processing",total:l.length,analyzed:0,updated:0,failed:0,unchanged:0,details:[`Iniciando processamento de ${l.length} produtos com valores de variantes`]});const p=8,m=[];for(let h=0;h<l.length;h+=p)m.push(l.slice(h,h+p));for(let h=0;h<m.length;h++){const b=m[h];console.log(`⚡ Processing batch ${h+1}/${m.length} (${b.length} products)`),$(n,{status:`Processando lote ${h+1}/${m.length}`,details:[`Processando lote ${h+1} de ${m.length} (${b.length} produtos)`]});const f=b.map(async x=>{try{let P=!1;const v=[];if(x.variants&&x.variants.length>0)for(const y of x.variants){let C=!1;const j=[];let O=0;if(y.option1||y.option2||y.option3){const I=[y.option1,y.option2,y.option3].filter(Boolean),re=x.options?.map(R=>R.name)||[];for(let R=0;R<I.length;R++){const M=I[R],Y=re[R],S=s.find(oe=>oe.optionName===Y&&oe.currentValue.toLowerCase()===M.toLowerCase());S&&(S.newValue&&S.newValue!==M&&(R===0?y.option1=S.newValue:R===1?y.option2=S.newValue:R===2&&(y.option3=S.newValue),C=!0,P=!0,console.log(`🔄 ${x.title}: ${Y} "${M}" → "${S.newValue}"`)),S.priceExtra&&S.priceExtra>0&&(O+=S.priceExtra,C=!0,P=!0,console.log(`💰 ${x.title}: Preço extra +R$ ${S.priceExtra} para ${Y}="${S.newValue||M}"`)))}}if(C)try{const I={id:y.id,option1:y.option1,option2:y.option2||null,option3:y.option3||null};if(O>0){const M=((parseFloat(y.price)||0)+O).toFixed(2);I.price=M,console.log(`💰 ${x.title}: Preço atualizado de R$ ${y.price} para R$ ${M} (+R$ ${O.toFixed(2)})`)}const re=await F(t,a,`products/${x.id}/variants/${y.id}.json`,"PUT",{variant:I});v.push(y)}catch(I){console.error(`❌ Erro ao atualizar variante ${y.id}:`,I),d++}}return P&&v.length>0&&(c++,u.push({success:!0,productId:x.id,title:x.title,changes:`${v.length} variantes atualizadas`}),console.log(`✅ ${x.title}: ${v.length} variantes atualizadas`)),{productId:x.id,title:x.title.substring(0,50),success:P&&v.length>0,changes:P?`${v.length} variantes atualizadas`:"Nenhuma alteração necessária"}}catch(P){return{productId:x.id,title:x.title.substring(0,50),success:!1,error:P instanceof Error?P.message.substring(0,100):"Erro desconhecido"}}});(await Promise.allSettled(f)).forEach(x=>{x.status==="fulfilled"?(u.push(x.value),x.value.success?c++:x.value.error&&d++):(d++,u.push({productId:"unknown",title:"Erro no batch",success:!1,error:"Batch processing failed"}))});const w=(h+1)*p,k=Math.min(w,l.length);$(n,{analyzed:k,updated:c,failed:d,unchanged:Math.max(0,k-c-d),status:`Processados ${k}/${l.length} produtos`,details:[`Lote ${h+1}/${m.length} concluído`,`${c} atualizados, ${d} falhas`]}),h<m.length-1&&await new Promise(x=>setTimeout(x,150))}const g=Date.now()-i;return console.log(`🎉 ULTRA-FAST VARIANT VALUES UPDATE COMPLETE: ${c} updated, ${d} failed in ${g}ms`),$(n,{status:"completed",details:[`Operação concluída em ${Math.round(g/1e3)}s`,`${c} produtos atualizados com sucesso`,`${d} produtos com erro`]}),e.json({success:!0,operationId:n,totalProducts:l.length,updatedCount:c,failedCount:d,results:u.slice(0,50),performanceMs:g})}catch(t){return e.json({error:"Erro na atualização em massa de valores de variantes: "+(t instanceof Error?t.message:"Erro desconhecido")},500)}});A.get("/api/operation-progress/:operationId",async e=>{try{const t=e.req.param("operationId");if(!t)return e.json({error:"Operation ID is required"},400);const a=K.get(t);if(!a)return e.json({error:"Operation not found",operationId:t},404);const s=a.total>0?Math.round(a.analyzed/a.total*100):0,r=Date.now()-a.startTime;return e.json({success:!0,operationId:t,progress:{...a,percentage:s,elapsedMs:r,isComplete:a.analyzed>=a.total&&a.total>0}})}catch(t){return e.json({error:"Error fetching progress: "+(t instanceof Error?t.message:"Unknown error")},500)}});A.delete("/api/operation-progress/:operationId",async e=>{const t=e.req.param("operationId");return K.delete(t),e.json({success:!0,message:"Operation progress cleared"})});A.post("/api/test-diagnostic-progress",async e=>{try{const{stage:t}=await e.req.json(),a={start:{analyzed:0,updated:0,failed:0,unchanged:0,total:50,status:"Iniciando processamento...",percentage:0},progress1:{analyzed:15,updated:12,failed:1,unchanged:2,total:50,status:"Processando títulos das opções...",percentage:30},progress2:{analyzed:30,updated:24,failed:3,unchanged:3,total:50,status:"Aplicando alterações em massa...",percentage:60},progress3:{analyzed:45,updated:38,failed:4,unchanged:3,total:50,status:"Finalizando processamento...",percentage:90},complete:{analyzed:50,updated:42,failed:5,unchanged:3,total:50,status:"Processamento concluído!",percentage:100}},s=a[t]||a.start;return e.json({success:!0,data:s,timestamp:new Date().toISOString()})}catch(t){return e.json({error:"Erro no teste de diagnóstico: "+(t instanceof Error?t.message:"Erro desconhecido")},500)}});A.get("/",e=>e.html(`
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
  `));const ue=new Ce,Et=Object.assign({"/src/index.tsx":A});let Oe=!1;for(const[,e]of Object.entries(Et))e&&(ue.route("/",e),ue.notFound(e.notFoundHandler),Oe=!0);if(!Oe)throw new Error("Can't import modules from ['/src/index.tsx','/app/server.ts']");export{ue as default};
