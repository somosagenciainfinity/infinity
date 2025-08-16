var U=(e,t,r)=>(s,o)=>{let a=-1;return i(0);async function i(n){if(n<=a)throw new Error("next() called multiple times");a=n;let l,c=!1,d;if(e[n]?(d=e[n][0][0],s.req.routeIndex=n):d=n===e.length&&o||void 0,d)try{l=await d(s,()=>i(n+1))}catch(u){if(u instanceof Error&&t)s.error=u,l=await t(u,s),c=!0;else throw u}else s.finalized===!1&&r&&(l=await r(s));return l&&(s.finalized===!1||c)&&(s.res=l),s}},be=Symbol(),ve=async(e,t=Object.create(null))=>{const{all:r=!1,dot:s=!1}=t,a=(e instanceof te?e.raw.headers:e.headers).get("Content-Type");return a?.startsWith("multipart/form-data")||a?.startsWith("application/x-www-form-urlencoded")?xe(e,{all:r,dot:s}):{}};async function xe(e,t){const r=await e.formData();return r?ye(r,t):{}}function ye(e,t){const r=Object.create(null);return e.forEach((s,o)=>{t.all||o.endsWith("[]")?we(r,o,s):r[o]=s}),t.dot&&Object.entries(r).forEach(([s,o])=>{s.includes(".")&&(Ee(r,s,o),delete r[s])}),r}var we=(e,t,r)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(r):e[t]=[e[t],r]:t.endsWith("[]")?e[t]=[r]:e[t]=r},Ee=(e,t,r)=>{let s=e;const o=t.split(".");o.forEach((a,i)=>{i===o.length-1?s[a]=r:((!s[a]||typeof s[a]!="object"||Array.isArray(s[a])||s[a]instanceof File)&&(s[a]=Object.create(null)),s=s[a])})},Y=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},Te=e=>{const{groups:t,path:r}=je(e),s=Y(r);return ke(s,t)},je=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(r,s)=>{const o=`@${s}`;return t.push([o,r]),o}),{groups:t,path:e}},ke=(e,t)=>{for(let r=t.length-1;r>=0;r--){const[s]=t[r];for(let o=e.length-1;o>=0;o--)if(e[o].includes(s)){e[o]=e[o].replace(s,t[r][1]);break}}return e},N={},Pe=(e,t)=>{if(e==="*")return"*";const r=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(r){const s=`${e}#${t}`;return N[s]||(r[2]?N[s]=t&&t[0]!==":"&&t[0]!=="*"?[s,r[1],new RegExp(`^${r[2]}(?=/${t})`)]:[e,r[1],new RegExp(`^${r[2]}$`)]:N[s]=[e,r[1],!0]),N[s]}return null},F=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,r=>{try{return t(r)}catch{return r}})}},Ae=e=>F(e,decodeURI),J=e=>{const t=e.url,r=t.indexOf("/",t.charCodeAt(9)===58?13:8);let s=r;for(;s<t.length;s++){const o=t.charCodeAt(s);if(o===37){const a=t.indexOf("?",s),i=t.slice(r,a===-1?void 0:a);return Ae(i.includes("%25")?i.replace(/%25/g,"%2525"):i)}else if(o===63)break}return t.slice(r,s)},Ce=e=>{const t=J(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},O=(e,t,...r)=>(r.length&&(t=O(t,...r)),`${e?.[0]==="/"?"":"/"}${e}${t==="/"?"":`${e?.at(-1)==="/"?"":"/"}${t?.[0]==="/"?t.slice(1):t}`}`),Q=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),r=[];let s="";return t.forEach(o=>{if(o!==""&&!/\:/.test(o))s+="/"+o;else if(/\:/.test(o))if(/\?/.test(o)){r.length===0&&s===""?r.push("/"):r.push(s);const a=o.replace("?","");s+="/"+a,r.push(s)}else s+="/"+o}),r.filter((o,a,i)=>i.indexOf(o)===a)},H=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?F(e,ee):e):e,Z=(e,t,r)=>{let s;if(!r&&t&&!/[%+]/.test(t)){let i=e.indexOf(`?${t}`,8);for(i===-1&&(i=e.indexOf(`&${t}`,8));i!==-1;){const n=e.charCodeAt(i+t.length+1);if(n===61){const l=i+t.length+2,c=e.indexOf("&",l);return H(e.slice(l,c===-1?void 0:c))}else if(n==38||isNaN(n))return"";i=e.indexOf(`&${t}`,i+1)}if(s=/[%+]/.test(e),!s)return}const o={};s??=/[%+]/.test(e);let a=e.indexOf("?",8);for(;a!==-1;){const i=e.indexOf("&",a+1);let n=e.indexOf("=",a);n>i&&i!==-1&&(n=-1);let l=e.slice(a+1,n===-1?i===-1?void 0:i:n);if(s&&(l=H(l)),a=i,l==="")continue;let c;n===-1?c="":(c=e.slice(n+1,i===-1?void 0:i),s&&(c=H(c))),r?(o[l]&&Array.isArray(o[l])||(o[l]=[]),o[l].push(c)):o[l]??=c}return t?o[t]:o},Oe=Z,Re=(e,t)=>Z(e,t,!0),ee=decodeURIComponent,B=e=>F(e,ee),te=class{raw;#t;#e;routeIndex=0;path;bodyCache={};constructor(e,t="/",r=[[]]){this.raw=e,this.path=t,this.#e=r,this.#t={}}param(e){return e?this.#s(e):this.#a()}#s(e){const t=this.#e[0][this.routeIndex][1][e],r=this.#o(t);return r?/\%/.test(r)?B(r):r:void 0}#a(){const e={},t=Object.keys(this.#e[0][this.routeIndex][1]);for(const r of t){const s=this.#o(this.#e[0][this.routeIndex][1][r]);s&&typeof s=="string"&&(e[r]=/\%/.test(s)?B(s):s)}return e}#o(e){return this.#e[1]?this.#e[1][e]:e}query(e){return Oe(this.url,e)}queries(e){return Re(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((r,s)=>{t[s]=r}),t}async parseBody(e){return this.bodyCache.parsedBody??=await ve(this,e)}#r=e=>{const{bodyCache:t,raw:r}=this,s=t[e];if(s)return s;const o=Object.keys(t)[0];return o?t[o].then(a=>(o==="json"&&(a=JSON.stringify(a)),new Response(a)[e]())):t[e]=r[e]()};json(){return this.#r("text").then(e=>JSON.parse(e))}text(){return this.#r("text")}arrayBuffer(){return this.#r("arrayBuffer")}blob(){return this.#r("blob")}formData(){return this.#r("formData")}addValidatedData(e,t){this.#t[e]=t}valid(e){return this.#t[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[be](){return this.#e}get matchedRoutes(){return this.#e[0].map(([[,e]])=>e)}get routePath(){return this.#e[0].map(([[,e]])=>e)[this.routeIndex].path}},Se={Stringify:1},se=async(e,t,r,s,o)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const a=e.callbacks;return a?.length?(o?o[0]+=e:o=[e],Promise.all(a.map(n=>n({phase:t,buffer:o,context:s}))).then(n=>Promise.all(n.filter(Boolean).map(l=>se(l,t,!1,s,o))).then(()=>o[0]))):Promise.resolve(e)},$e="text/plain; charset=UTF-8",V=(e,t)=>({"Content-Type":e,...t}),_e=class{#t;#e;env={};#s;finalized=!1;error;#a;#o;#r;#d;#l;#c;#n;#u;#p;constructor(e,t){this.#t=e,t&&(this.#o=t.executionCtx,this.env=t.env,this.#c=t.notFoundHandler,this.#p=t.path,this.#u=t.matchResult)}get req(){return this.#e??=new te(this.#t,this.#p,this.#u),this.#e}get event(){if(this.#o&&"respondWith"in this.#o)return this.#o;throw Error("This context has no FetchEvent")}get executionCtx(){if(this.#o)return this.#o;throw Error("This context has no ExecutionContext")}get res(){return this.#r||=new Response(null,{headers:this.#n??=new Headers})}set res(e){if(this.#r&&e){e=new Response(e.body,e);for(const[t,r]of this.#r.headers.entries())if(t!=="content-type")if(t==="set-cookie"){const s=this.#r.headers.getSetCookie();e.headers.delete("set-cookie");for(const o of s)e.headers.append("set-cookie",o)}else e.headers.set(t,r)}this.#r=e,this.finalized=!0}render=(...e)=>(this.#l??=t=>this.html(t),this.#l(...e));setLayout=e=>this.#d=e;getLayout=()=>this.#d;setRenderer=e=>{this.#l=e};header=(e,t,r)=>{this.finalized&&(this.#r=new Response(this.#r.body,this.#r));const s=this.#r?this.#r.headers:this.#n??=new Headers;t===void 0?s.delete(e):r?.append?s.append(e,t):s.set(e,t)};status=e=>{this.#a=e};set=(e,t)=>{this.#s??=new Map,this.#s.set(e,t)};get=e=>this.#s?this.#s.get(e):void 0;get var(){return this.#s?Object.fromEntries(this.#s):{}}#i(e,t,r){const s=this.#r?new Headers(this.#r.headers):this.#n??new Headers;if(typeof t=="object"&&"headers"in t){const a=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[i,n]of a)i.toLowerCase()==="set-cookie"?s.append(i,n):s.set(i,n)}if(r)for(const[a,i]of Object.entries(r))if(typeof i=="string")s.set(a,i);else{s.delete(a);for(const n of i)s.append(a,n)}const o=typeof t=="number"?t:t?.status??this.#a;return new Response(e,{status:o,headers:s})}newResponse=(...e)=>this.#i(...e);body=(e,t,r)=>this.#i(e,t,r);text=(e,t,r)=>!this.#n&&!this.#a&&!t&&!r&&!this.finalized?new Response(e):this.#i(e,t,V($e,r));json=(e,t,r)=>this.#i(JSON.stringify(e),t,V("application/json",r));html=(e,t,r)=>{const s=o=>this.#i(o,t,V("text/html; charset=UTF-8",r));return typeof e=="object"?se(e,Se.Stringify,!1,{}).then(s):s(e)};redirect=(e,t)=>{const r=String(e);return this.header("Location",/[^\x00-\xFF]/.test(r)?encodeURI(r):r),this.newResponse(null,t??302)};notFound=()=>(this.#c??=()=>new Response,this.#c(this))},m="ALL",Me="all",Ie=["get","post","put","delete","options","patch"],re="Can not add a route since the matcher is already built.",oe=class extends Error{},Ne="__COMPOSED_HANDLER",Le=e=>e.text("404 Not Found",404),G=(e,t)=>{if("getResponse"in e){const r=e.getResponse();return t.newResponse(r.body,r)}return console.error(e),t.text("Internal Server Error",500)},ae=class{get;post;put;delete;options;patch;all;on;use;router;getPath;_basePath="/";#t="/";routes=[];constructor(t={}){[...Ie,Me].forEach(a=>{this[a]=(i,...n)=>(typeof i=="string"?this.#t=i:this.#a(a,this.#t,i),n.forEach(l=>{this.#a(a,this.#t,l)}),this)}),this.on=(a,i,...n)=>{for(const l of[i].flat()){this.#t=l;for(const c of[a].flat())n.map(d=>{this.#a(c.toUpperCase(),this.#t,d)})}return this},this.use=(a,...i)=>(typeof a=="string"?this.#t=a:(this.#t="*",i.unshift(a)),i.forEach(n=>{this.#a(m,this.#t,n)}),this);const{strict:s,...o}=t;Object.assign(this,o),this.getPath=s??!0?t.getPath??J:Ce}#e(){const t=new ae({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,t.#s=this.#s,t.routes=this.routes,t}#s=Le;errorHandler=G;route(t,r){const s=this.basePath(t);return r.routes.map(o=>{let a;r.errorHandler===G?a=o.handler:(a=async(i,n)=>(await U([],r.errorHandler)(i,()=>o.handler(i,n))).res,a[Ne]=o.handler),s.#a(o.method,o.path,a)}),this}basePath(t){const r=this.#e();return r._basePath=O(this._basePath,t),r}onError=t=>(this.errorHandler=t,this);notFound=t=>(this.#s=t,this);mount(t,r,s){let o,a;s&&(typeof s=="function"?a=s:(a=s.optionHandler,s.replaceRequest===!1?o=l=>l:o=s.replaceRequest));const i=a?l=>{const c=a(l);return Array.isArray(c)?c:[c]}:l=>{let c;try{c=l.executionCtx}catch{}return[l.env,c]};o||=(()=>{const l=O(this._basePath,t),c=l==="/"?0:l.length;return d=>{const u=new URL(d.url);return u.pathname=u.pathname.slice(c)||"/",new Request(u,d)}})();const n=async(l,c)=>{const d=await r(o(l.req.raw),...i(l));if(d)return d;await c()};return this.#a(m,O(t,"*"),n),this}#a(t,r,s){t=t.toUpperCase(),r=O(this._basePath,r);const o={basePath:this._basePath,path:r,method:t,handler:s};this.router.add(t,r,[s,o]),this.routes.push(o)}#o(t,r){if(t instanceof Error)return this.errorHandler(t,r);throw t}#r(t,r,s,o){if(o==="HEAD")return(async()=>new Response(null,await this.#r(t,r,s,"GET")))();const a=this.getPath(t,{env:s}),i=this.router.match(o,a),n=new _e(t,{path:a,matchResult:i,env:s,executionCtx:r,notFoundHandler:this.#s});if(i[0].length===1){let c;try{c=i[0][0][0][0](n,async()=>{n.res=await this.#s(n)})}catch(d){return this.#o(d,n)}return c instanceof Promise?c.then(d=>d||(n.finalized?n.res:this.#s(n))).catch(d=>this.#o(d,n)):c??this.#s(n)}const l=U(i[0],this.errorHandler,this.#s);return(async()=>{try{const c=await l(n);if(!c.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return c.res}catch(c){return this.#o(c,n)}})()}fetch=(t,...r)=>this.#r(t,r[1],r[0],t.method);request=(t,r,s,o)=>t instanceof Request?this.fetch(r?new Request(t,r):t,s,o):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${O("/",t)}`,r),s,o));fire=()=>{addEventListener("fetch",t=>{t.respondWith(this.#r(t.request,t,void 0,t.request.method))})}},D="[^/]+",_=".*",M="(?:|/.*)",R=Symbol(),De=new Set(".\\+*[^]$()");function He(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===_||e===M?1:t===_||t===M?-1:e===D?1:t===D?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var q=class{#t;#e;#s=Object.create(null);insert(t,r,s,o,a){if(t.length===0){if(this.#t!==void 0)throw R;if(a)return;this.#t=r;return}const[i,...n]=t,l=i==="*"?n.length===0?["","",_]:["","",D]:i==="/*"?["","",M]:i.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let c;if(l){const d=l[1];let u=l[2]||D;if(d&&l[2]&&(u===".*"||(u=u.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(u))))throw R;if(c=this.#s[u],!c){if(Object.keys(this.#s).some(p=>p!==_&&p!==M))throw R;if(a)return;c=this.#s[u]=new q,d!==""&&(c.#e=o.varIndex++)}!a&&d!==""&&s.push([d,c.#e])}else if(c=this.#s[i],!c){if(Object.keys(this.#s).some(d=>d.length>1&&d!==_&&d!==M))throw R;if(a)return;c=this.#s[i]=new q}c.insert(n,r,s,o,a)}buildRegExpStr(){const r=Object.keys(this.#s).sort(He).map(s=>{const o=this.#s[s];return(typeof o.#e=="number"?`(${s})@${o.#e}`:De.has(s)?`\\${s}`:s)+o.buildRegExpStr()});return typeof this.#t=="number"&&r.unshift(`#${this.#t}`),r.length===0?"":r.length===1?r[0]:"(?:"+r.join("|")+")"}},Ve=class{#t={varIndex:0};#e=new q;insert(e,t,r){const s=[],o=[];for(let i=0;;){let n=!1;if(e=e.replace(/\{[^}]+\}/g,l=>{const c=`@\\${i}`;return o[i]=[c,l],i++,n=!0,c}),!n)break}const a=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let i=o.length-1;i>=0;i--){const[n]=o[i];for(let l=a.length-1;l>=0;l--)if(a[l].indexOf(n)!==-1){a[l]=a[l].replace(n,o[i][1]);break}}return this.#e.insert(a,t,s,this.#t,r),s}buildRegExp(){let e=this.#e.buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const r=[],s=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(o,a,i)=>a!==void 0?(r[++t]=Number(a),"$()"):(i!==void 0&&(s[Number(i)]=++t),"")),[new RegExp(`^${e}`),r,s]}},ie=[],qe=[/^$/,[],Object.create(null)],ne=Object.create(null);function le(e){return ne[e]??=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,r)=>r?`\\${r}`:"(?:|/.*)")}$`)}function Fe(){ne=Object.create(null)}function ze(e){const t=new Ve,r=[];if(e.length===0)return qe;const s=e.map(c=>[!/\*|\/:/.test(c[0]),...c]).sort(([c,d],[u,p])=>c?1:u?-1:d.length-p.length),o=Object.create(null);for(let c=0,d=-1,u=s.length;c<u;c++){const[p,h,f]=s[c];p?o[h]=[f.map(([x])=>[x,Object.create(null)]),ie]:d++;let v;try{v=t.insert(h,d,p)}catch(x){throw x===R?new oe(h):x}p||(r[d]=f.map(([x,y])=>{const j=Object.create(null);for(y-=1;y>=0;y--){const[g,T]=v[y];j[g]=T}return[x,j]}))}const[a,i,n]=t.buildRegExp();for(let c=0,d=r.length;c<d;c++)for(let u=0,p=r[c].length;u<p;u++){const h=r[c][u]?.[1];if(!h)continue;const f=Object.keys(h);for(let v=0,x=f.length;v<x;v++)h[f[v]]=n[h[f[v]]]}const l=[];for(const c in i)l[c]=r[i[c]];return[a,l,o]}function C(e,t){if(e){for(const r of Object.keys(e).sort((s,o)=>o.length-s.length))if(le(r).test(t))return[...e[r]]}}var Ue=class{name="RegExpRouter";#t;#e;constructor(){this.#t={[m]:Object.create(null)},this.#e={[m]:Object.create(null)}}add(e,t,r){const s=this.#t,o=this.#e;if(!s||!o)throw new Error(re);s[e]||[s,o].forEach(n=>{n[e]=Object.create(null),Object.keys(n[m]).forEach(l=>{n[e][l]=[...n[m][l]]})}),t==="/*"&&(t="*");const a=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const n=le(t);e===m?Object.keys(s).forEach(l=>{s[l][t]||=C(s[l],t)||C(s[m],t)||[]}):s[e][t]||=C(s[e],t)||C(s[m],t)||[],Object.keys(s).forEach(l=>{(e===m||e===l)&&Object.keys(s[l]).forEach(c=>{n.test(c)&&s[l][c].push([r,a])})}),Object.keys(o).forEach(l=>{(e===m||e===l)&&Object.keys(o[l]).forEach(c=>n.test(c)&&o[l][c].push([r,a]))});return}const i=Q(t)||[t];for(let n=0,l=i.length;n<l;n++){const c=i[n];Object.keys(o).forEach(d=>{(e===m||e===d)&&(o[d][c]||=[...C(s[d],c)||C(s[m],c)||[]],o[d][c].push([r,a-l+n+1]))})}}match(e,t){Fe();const r=this.#s();return this.match=(s,o)=>{const a=r[s]||r[m],i=a[2][o];if(i)return i;const n=o.match(a[0]);if(!n)return[[],ie];const l=n.indexOf("",1);return[a[1][l],n]},this.match(e,t)}#s(){const e=Object.create(null);return Object.keys(this.#e).concat(Object.keys(this.#t)).forEach(t=>{e[t]||=this.#a(t)}),this.#t=this.#e=void 0,e}#a(e){const t=[];let r=e===m;return[this.#t,this.#e].forEach(s=>{const o=s[e]?Object.keys(s[e]).map(a=>[a,s[e][a]]):[];o.length!==0?(r||=!0,t.push(...o)):e!==m&&t.push(...Object.keys(s[m]).map(a=>[a,s[m][a]]))}),r?ze(t):null}},Be=class{name="SmartRouter";#t=[];#e=[];constructor(e){this.#t=e.routers}add(e,t,r){if(!this.#e)throw new Error(re);this.#e.push([e,t,r])}match(e,t){if(!this.#e)throw new Error("Fatal error");const r=this.#t,s=this.#e,o=r.length;let a=0,i;for(;a<o;a++){const n=r[a];try{for(let l=0,c=s.length;l<c;l++)n.add(...s[l]);i=n.match(e,t)}catch(l){if(l instanceof oe)continue;throw l}this.match=n.match.bind(n),this.#t=[n],this.#e=void 0;break}if(a===o)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,i}get activeRouter(){if(this.#e||this.#t.length!==1)throw new Error("No active router has been determined yet.");return this.#t[0]}},$=Object.create(null),ce=class{#t;#e;#s;#a=0;#o=$;constructor(e,t,r){if(this.#e=r||Object.create(null),this.#t=[],e&&t){const s=Object.create(null);s[e]={handler:t,possibleKeys:[],score:0},this.#t=[s]}this.#s=[]}insert(e,t,r){this.#a=++this.#a;let s=this;const o=Te(t),a=[];for(let i=0,n=o.length;i<n;i++){const l=o[i],c=o[i+1],d=Pe(l,c),u=Array.isArray(d)?d[0]:l;if(u in s.#e){s=s.#e[u],d&&a.push(d[1]);continue}s.#e[u]=new ce,d&&(s.#s.push(d),a.push(d[1])),s=s.#e[u]}return s.#t.push({[e]:{handler:r,possibleKeys:a.filter((i,n,l)=>l.indexOf(i)===n),score:this.#a}}),s}#r(e,t,r,s){const o=[];for(let a=0,i=e.#t.length;a<i;a++){const n=e.#t[a],l=n[t]||n[m],c={};if(l!==void 0&&(l.params=Object.create(null),o.push(l),r!==$||s&&s!==$))for(let d=0,u=l.possibleKeys.length;d<u;d++){const p=l.possibleKeys[d],h=c[l.score];l.params[p]=s?.[p]&&!h?s[p]:r[p]??s?.[p],c[l.score]=!0}}return o}search(e,t){const r=[];this.#o=$;let o=[this];const a=Y(t),i=[];for(let n=0,l=a.length;n<l;n++){const c=a[n],d=n===l-1,u=[];for(let p=0,h=o.length;p<h;p++){const f=o[p],v=f.#e[c];v&&(v.#o=f.#o,d?(v.#e["*"]&&r.push(...this.#r(v.#e["*"],e,f.#o)),r.push(...this.#r(v,e,f.#o))):u.push(v));for(let x=0,y=f.#s.length;x<y;x++){const j=f.#s[x],g=f.#o===$?{}:{...f.#o};if(j==="*"){const k=f.#e["*"];k&&(r.push(...this.#r(k,e,f.#o)),k.#o=g,u.push(k));continue}const[T,A,b]=j;if(!c&&!(b instanceof RegExp))continue;const E=f.#e[T],ge=a.slice(n).join("/");if(b instanceof RegExp){const k=b.exec(ge);if(k){if(g[A]=k[0],r.push(...this.#r(E,e,f.#o,g)),Object.keys(E.#e).length){E.#o=g;const me=k[0].match(/\//)?.length??0;(i[me]||=[]).push(E)}continue}}(b===!0||b.test(c))&&(g[A]=c,d?(r.push(...this.#r(E,e,g,f.#o)),E.#e["*"]&&r.push(...this.#r(E.#e["*"],e,g,f.#o))):(E.#o=g,u.push(E)))}}o=u.concat(i.shift()??[])}return r.length>1&&r.sort((n,l)=>n.score-l.score),[r.map(({handler:n,params:l})=>[n,l])]}},Ge=class{name="TrieRouter";#t;constructor(){this.#t=new ce}add(e,t,r){const s=Q(t);if(s){for(let o=0,a=s.length;o<a;o++)this.#t.insert(e,s[o],r);return}this.#t.insert(e,t,r)}match(e,t){return this.#t.search(e,t)}},de=class extends ae{constructor(e={}){super(e),this.router=e.router??new Be({routers:[new Ue,new Ge]})}},We=e=>{const r={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...e},s=(a=>typeof a=="string"?a==="*"?()=>a:i=>a===i?i:null:typeof a=="function"?a:i=>a.includes(i)?i:null)(r.origin),o=(a=>typeof a=="function"?a:Array.isArray(a)?()=>a:()=>[])(r.allowMethods);return async function(i,n){function l(d,u){i.res.headers.set(d,u)}const c=s(i.req.header("origin")||"",i);if(c&&l("Access-Control-Allow-Origin",c),r.origin!=="*"){const d=i.req.header("Vary");d?l("Vary",d):l("Vary","Origin")}if(r.credentials&&l("Access-Control-Allow-Credentials","true"),r.exposeHeaders?.length&&l("Access-Control-Expose-Headers",r.exposeHeaders.join(",")),i.req.method==="OPTIONS"){r.maxAge!=null&&l("Access-Control-Max-Age",r.maxAge.toString());const d=o(i.req.header("origin")||"",i);d.length&&l("Access-Control-Allow-Methods",d.join(","));let u=r.allowHeaders;if(!u?.length){const p=i.req.header("Access-Control-Request-Headers");p&&(u=p.split(/\s*,\s*/))}return u?.length&&(l("Access-Control-Allow-Headers",u.join(",")),i.res.headers.append("Vary","Access-Control-Request-Headers")),i.res.headers.delete("Content-Length"),i.res.headers.delete("Content-Type"),new Response(null,{headers:i.res.headers,status:204,statusText:"No Content"})}await n()}},Ke=/^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i,W=(e,t=Ye)=>{const r=/\.([a-zA-Z0-9]+?)$/,s=e.match(r);if(!s)return;let o=t[s[1]];return o&&o.startsWith("text")&&(o+="; charset=utf-8"),o},Xe={aac:"audio/aac",avi:"video/x-msvideo",avif:"image/avif",av1:"video/av1",bin:"application/octet-stream",bmp:"image/bmp",css:"text/css",csv:"text/csv",eot:"application/vnd.ms-fontobject",epub:"application/epub+zip",gif:"image/gif",gz:"application/gzip",htm:"text/html",html:"text/html",ico:"image/x-icon",ics:"text/calendar",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",jsonld:"application/ld+json",map:"application/json",mid:"audio/x-midi",midi:"audio/x-midi",mjs:"text/javascript",mp3:"audio/mpeg",mp4:"video/mp4",mpeg:"video/mpeg",oga:"audio/ogg",ogv:"video/ogg",ogx:"application/ogg",opus:"audio/opus",otf:"font/otf",pdf:"application/pdf",png:"image/png",rtf:"application/rtf",svg:"image/svg+xml",tif:"image/tiff",tiff:"image/tiff",ts:"video/mp2t",ttf:"font/ttf",txt:"text/plain",wasm:"application/wasm",webm:"video/webm",weba:"audio/webm",webmanifest:"application/manifest+json",webp:"image/webp",woff:"font/woff",woff2:"font/woff2",xhtml:"application/xhtml+xml",xml:"application/xml",zip:"application/zip","3gp":"video/3gpp","3g2":"video/3gpp2",gltf:"model/gltf+json",glb:"model/gltf-binary"},Ye=Xe,Je=(...e)=>{let t=e.filter(o=>o!=="").join("/");t=t.replace(/(?<=\/)\/+/g,"");const r=t.split("/"),s=[];for(const o of r)o===".."&&s.length>0&&s.at(-1)!==".."?s.pop():o!=="."&&s.push(o);return s.join("/")||"."},ue={br:".br",zstd:".zst",gzip:".gz"},Qe=Object.keys(ue),Ze="index.html",et=e=>{const t=e.root??"./",r=e.path,s=e.join??Je;return async(o,a)=>{if(o.finalized)return a();let i;if(e.path)i=e.path;else try{if(i=decodeURIComponent(o.req.path),/(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(i))throw new Error}catch{return await e.onNotFound?.(o.req.path,o),a()}let n=s(t,!r&&e.rewriteRequestPath?e.rewriteRequestPath(i):i);e.isDir&&await e.isDir(n)&&(n=s(n,Ze));const l=e.getContent;let c=await l(n,o);if(c instanceof Response)return o.newResponse(c.body,c);if(c){const d=e.mimes&&W(n,e.mimes)||W(n);if(o.header("Content-Type",d||"application/octet-stream"),e.precompressed&&(!d||Ke.test(d))){const u=new Set(o.req.header("Accept-Encoding")?.split(",").map(p=>p.trim()));for(const p of Qe){if(!u.has(p))continue;const h=await l(n+ue[p],o);if(h){c=h,o.header("Content-Encoding",p),o.header("Vary","Accept-Encoding",{append:!0});break}}}return await e.onFound?.(n,o),o.body(c)}await e.onNotFound?.(n,o),await a()}},tt=async(e,t)=>{let r;t&&t.manifest?typeof t.manifest=="string"?r=JSON.parse(t.manifest):r=t.manifest:typeof __STATIC_CONTENT_MANIFEST=="string"?r=JSON.parse(__STATIC_CONTENT_MANIFEST):r=__STATIC_CONTENT_MANIFEST;let s;t&&t.namespace?s=t.namespace:s=__STATIC_CONTENT;const o=r[e]||e;if(!o)return null;const a=await s.get(o,{type:"stream"});return a||null},st=e=>async function(r,s){return et({...e,getContent:async a=>tt(a,{manifest:e.manifest,namespace:e.namespace?e.namespace:r.env?r.env.__STATIC_CONTENT:void 0})})(r,s)},rt=e=>st(e);const w=new de;w.use("/api/*",We());w.use("/static/*",rt({root:"./public"}));const L=new Map,K={products:{limit:200,windowMs:6e4},collections:{limit:100,windowMs:6e4},bulkUpdate:{limit:500,windowMs:6e4},bulkVariants:{limit:300,windowMs:6e4},analyzeVariants:{limit:50,windowMs:6e4},concurrent:{maxChunks:10,chunkSize:50,chunkDelay:200}};function S(e,t){const r=t?K[t]||K.products:{limit:100,windowMs:6e4},s=Date.now(),o=s-r.windowMs;L.has(e)||L.set(e,[]);const i=L.get(e).filter(n=>n>o);return i.length>=r.limit?!1:(i.push(s),L.set(e,i),!0)}function pe(e){return new Promise(t=>setTimeout(t,e))}async function ot(e,t=3,r=1e3){for(let s=1;s<=t;s++)try{return await e()}catch(o){if(s===t)throw o;const a=r*Math.pow(2,s-1);console.log(`🔄 Retry ${s}/${t} in ${a}ms...`),await pe(a)}throw new Error("Max retries exceeded")}async function I(e,t,r,s="GET",o,a=3e4){const i=`https://${e}.myshopify.com/admin/api/2024-01/${r}`,l={method:s,headers:{"X-Shopify-Access-Token":t,"Content-Type":"application/json"},signal:AbortSignal.timeout(a)};return o&&(s==="POST"||s==="PUT")&&(l.body=JSON.stringify(o)),await ot(async()=>{const c=await fetch(i,l);if(c.status===429){const u=c.headers.get("Retry-After")||"2",p=parseInt(u)*1e3;throw console.log(`⏳ Rate limited by Shopify, waiting ${p}ms...`),await pe(p),new Error("Rate limited, retrying...")}if(!c.ok){const u=await c.text();throw new Error(`Shopify API error: ${c.status} - ${u}`)}return await c.json()},3,1e3)}function z(e){if(!e)return"";const t=e.split(",");for(const r of t)if(r.includes('rel="next"')){const s=r.split(";")[0].trim();if(s.startsWith("<")&&s.endsWith(">"))return s.slice(1,-1)}return""}async function P(e,t,r){let s=[],o=`https://${e}.myshopify.com/admin/api/2024-01/products.json?limit=250&fields=id,title,body_html,vendor,product_type,created_at,updated_at,published_at,tags,status,variants,options,images,image`;for(console.log("🚀 USANDO LÓGICA DO SEU SCRIPT PYTHON - LINK HEADER PAGINATION");o;){console.log(`🔍 Fetching: ${o}`);try{const i=await fetch(o,{method:"GET",headers:{"X-Shopify-Access-Token":t,"Content-Type":"application/json"}});if(!i.ok){const d=await i.text();throw new Error(`Shopify API error: ${i.status} - ${d}`)}const l=(await i.json()).products||[];if(console.log(`📦 Received ${l.length} products... Total so far: ${s.length+l.length}`),l.length===0){console.log("🛑 No products in response, ending pagination");break}s=s.concat(l);const c=i.headers.get("Link")||"";o=z(c),console.log(o?`➡️ Next page found: ${o}`:"✅ No more pages, pagination complete")}catch(a){console.error("❌ Error in pagination:",a);break}}return console.log(`🎉 PAGINATION COMPLETE: ${s.length} total products found`),s}async function he(e,t){let r=[];const s=["custom_collections","smart_collections"];console.log("🚀 BUSCANDO COLEÇÕES - MESMA LÓGICA DO PYTHON");for(const o of s){let a=`https://${e}.myshopify.com/admin/api/2024-01/${o}.json?limit=250`;for(console.log(`🔍 Fetching ${o}...`);a;)try{const n=await fetch(a,{method:"GET",headers:{"X-Shopify-Access-Token":t,"Content-Type":"application/json"}});if(!n.ok){console.log(`Error fetching ${o}: ${n.status}`);break}const c=(await n.json())[o]||[];if(console.log(`📦 Found ${c.length} ${o}`),c.length===0)break;r=r.concat(c);const d=n.headers.get("Link")||"";a=z(d)}catch(i){console.error(`Error fetching ${o}:`,i);break}}return console.log(`🎉 TOTAL COLLECTIONS: ${r.length}`),r}async function at(e,t,r){let s=[],o=`https://${e}.myshopify.com/admin/api/2024-01/collections/${r}/products.json?limit=250&fields=id`;for(;o;)try{const a=await fetch(o,{method:"GET",headers:{"X-Shopify-Access-Token":t,"Content-Type":"application/json"}});if(!a.ok)break;const n=(await a.json()).products||[];s=s.concat(n);const l=a.headers.get("Link")||"";o=z(l)}catch(a){console.log(`❌ Error in collection ${r} pagination:`,a);break}return s}async function it(e,t,r){const s={};console.log("🔍 MAPEANDO PRODUTOS POR COLEÇÃO COM PAGINAÇÃO COMPLETA...");for(const o of r)try{console.log(`🔍 Buscando produtos da coleção "${o.title}"...`);const a=await at(e,t,o.id);a.forEach(i=>{s[i.id]||(s[i.id]=[]),s[i.id].push(o.id.toString())}),console.log(`✅ Coleção "${o.title}": ${a.length} produtos (com paginação completa)`)}catch(a){console.log(`❌ Erro na coleção ${o.title}:`,a)}return console.log(`✅ Mapeamento completo: ${Object.keys(s).length} produtos mapeados`),s}async function nt(e,t,r,s){const o=[];for(let a=0;a<r.length;a++){const i=r[a];try{const n={id:i.id};s.title&&s.title!==i.title&&(n.title=s.title),s.description!==void 0&&s.description!==i.body_html&&(n.body_html=s.description),s.vendor&&s.vendor!==i.vendor&&(n.vendor=s.vendor),s.productType&&s.productType!==i.product_type&&(n.product_type=s.productType),s.tags!==void 0&&(n.tags=s.tags),s.status&&s.status!==i.status&&(n.status=s.status),(s.seoTitle||s.seoDescription)&&(n.metafields_global_title_tag=s.seoTitle||i.metafields_global_title_tag,n.metafields_global_description_tag=s.seoDescription||i.metafields_global_description_tag),(s.price||s.comparePrice)&&(n.variants=i.variants.map(c=>({id:c.id,price:s.price||c.price,compare_at_price:s.comparePrice||c.compare_at_price}))),s.inventory!==void 0&&(n.variants=i.variants.map(c=>({id:c.id,inventory_quantity:s.inventory})));const l=await I(e,t,`products/${i.id}.json`,"PUT",{product:n});o.push({id:i.id,success:!0,data:l.product}),a<r.length-1&&await new Promise(c=>setTimeout(c,200))}catch(n){o.push({id:i.id,success:!1,error:n instanceof Error?n.message:"Unknown error"})}}return o}w.post("/api/test-connection",async e=>{try{const{shop:t,accessToken:r}=await e.req.json();if(!t||!r)return e.json({error:"Parâmetros obrigatórios: shop e accessToken"},400);const s=await I(t,r,"shop.json");return e.json({success:!0,shop:s.shop.name,domain:s.shop.domain,plan:s.shop.plan_name})}catch(t){return e.json({error:"Falha na conexão: "+(t instanceof Error?t.message:"Erro desconhecido")},401)}});w.get("/favicon.ico",e=>e.text("",204));w.get("/test-variant-fix",e=>e.html(`<!DOCTYPE html>
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
</html>`));w.post("/api/products",async e=>{try{const{shop:t,accessToken:r}=await e.req.json();if(!t||!r)return e.json({error:"Parâmetros obrigatórios: shop e accessToken"},400);if(!S(`products:${t}`,"products"))return e.json({error:"Rate limit exceeded"},429);console.log("Loading ALL products with working pagination logic");const s=await P(t,r);console.log(`✅ Successfully loaded ${s.length} total products`),console.log("🔍 Loading collections for product mapping...");const o=await he(t,r);console.log(`✅ Loaded ${o.length} collections`);const a=await it(t,r,o),i=s.map(n=>({...n,collection_ids:a[n.id]||[]}));return i.length>0&&console.log("✅ First product with collections:",{id:i[0].id,title:i[0].title,collection_ids:i[0].collection_ids}),e.json({products:i,total:i.length})}catch(t){return e.json({error:"Erro ao buscar produtos: "+(t instanceof Error?t.message:"Erro desconhecido")},500)}});w.post("/api/collections",async e=>{try{const{shop:t,accessToken:r}=await e.req.json();if(!t||!r)return e.json({error:"Parâmetros obrigatórios: shop e accessToken"},400);if(!S(`collections:${t}`,"collections"))return e.json({error:"Rate limit exceeded"},429);const s=await he(t,r);return e.json({collections:s})}catch(t){return e.json({error:"Erro ao buscar coleções: "+(t instanceof Error?t.message:"Erro desconhecido")},500)}});w.post("/api/bulk-update",async e=>{try{const{shop:t,accessToken:r,productIds:s,updates:o}=await e.req.json();if(!t||!r||!s||!o)return e.json({error:"Parâmetros obrigatórios: shop, accessToken, productIds, updates"},400);if(!S(`bulk:${t}`,"bulkUpdate"))return e.json({error:"Rate limit exceeded for bulk operations"},429);const a=[];for(const n of s)try{const l=await I(t,r,`products/${n}.json`);a.push(l.product)}catch(l){console.error(`Error fetching product ${n}:`,l)}const i=await nt(t,r,a,o);return e.json({results:i,successful:i.filter(n=>n.success).length,failed:i.filter(n=>!n.success).length})}catch(t){return e.json({error:"Erro na atualização em massa: "+(t instanceof Error?t.message:"Erro desconhecido")},500)}});w.post("/api/analyze-variants",async e=>{try{const{shop:t,accessToken:r,scope:s,selectedProductIds:o}=await e.req.json();if(!t||!r)return e.json({error:"Parâmetros obrigatórios: shop e accessToken"},400);if(s==="selected"&&(!o||o.length===0))return e.json({error:'Para escopo "selected", selectedProductIds é obrigatório'},400);if(!S(`analyze-variants:${t}`,"analyzeVariants"))return e.json({error:"Rate limit exceeded for variant analysis"},429);let a=[];s==="selected"?(a=(await P(t,r,250)).filter(c=>o.includes(c.id.toString())||o.includes(c.id)),console.log(`🎯 Analisando variantes de ${a.length} produtos selecionados`)):(a=await P(t,r,250),console.log(`🌐 Analisando variantes de todos os ${a.length} produtos`));const i={},n={};return a.forEach(l=>{l.options&&l.options.length>0&&(l.options.forEach(c=>{n[c.name]||(n[c.name]={name:c.name,values:new Set,productCount:0,products:[]}),n[c.name].productCount++,n[c.name].products.push({id:l.id,title:l.title}),c.values&&c.values.forEach(d=>{n[c.name].values.add(d)})}),l.variants&&l.variants.length>0&&l.variants.forEach(c=>{const d=`${l.id}_${c.id}`;i[d]={productId:l.id,productTitle:l.title,variantId:c.id,variantTitle:c.title,price:c.price,option1:c.option1,option2:c.option2,option3:c.option3,sku:c.sku}}))}),Object.keys(n).forEach(l=>{n[l].values=Array.from(n[l].values),n[l].products=n[l].products.slice(0,10)}),e.json({success:!0,totalProducts:a.length,optionStats:n,variantCount:Object.keys(i).length,sampleVariants:Object.values(i).slice(0,50)})}catch(t){return e.json({error:"Erro na análise de variantes: "+(t instanceof Error?t.message:"Erro desconhecido")},500)}});w.post("/api/bulk-update-variant-titles",async e=>{try{const{shop:t,accessToken:r,titleMappings:s,scope:o,selectedProductIds:a}=await e.req.json();if(!t||!r||!s||s.length===0)return e.json({error:"Parâmetros obrigatórios: shop, accessToken, titleMappings"},400);if(o==="selected"&&(!a||a.length===0))return e.json({error:'Para escopo "selected", selectedProductIds é obrigatório'},400);if(!S(`bulk-variants:${t}`,"bulkVariants"))return e.json({error:"Rate limit exceeded for bulk variant operations"},429);let i=[];o==="all"?i=await P(t,r,250):i=(await P(t,r,250)).filter(u=>a.includes(u.id.toString())||a.includes(u.id));let n=0,l=0;const c=[];console.log(`🎯 Processando ${i.length} produtos (escopo: ${o})`);for(const d of i)try{let u=!1;const p=d.options?.map(h=>{const f=s.find(v=>v.currentTitle.toLowerCase()===h.name.toLowerCase());return f&&f.newTitle&&f.newTitle!==h.name?(u=!0,{...h,name:f.newTitle}):h})||[];if(u&&p.length>0){const h=await I(t,r,`products/${d.id}.json`,"PUT",{product:{id:d.id,options:p}});n++,c.push({productId:d.id,title:d.title,success:!0,changes:p.map(f=>f.name).join(", ")}),await new Promise(f=>setTimeout(f,500))}}catch(u){l++,c.push({productId:d.id,title:d.title,success:!1,error:u instanceof Error?u.message:"Erro desconhecido"})}return e.json({success:!0,totalProducts:i.length,updatedCount:n,failedCount:l,results:c.slice(0,50)})}catch(t){return e.json({error:"Erro na atualização em massa de títulos de variantes: "+(t instanceof Error?t.message:"Erro desconhecido")},500)}});w.post("/api/bulk-update-variant-values",async e=>{try{const{shop:t,accessToken:r,valueMappings:s,scope:o,selectedProductIds:a}=await e.req.json();if(!t||!r||!s||s.length===0)return e.json({error:"Parâmetros obrigatórios: shop, accessToken, valueMappings"},400);if(o==="selected"&&(!a||a.length===0))return e.json({error:'Para escopo "selected", selectedProductIds é obrigatório'},400);if(!S(`bulk-variant-values:${t}`,"bulkVariants"))return e.json({error:"Rate limit exceeded for bulk variant value operations"},429);let i=[];o==="all"?i=await P(t,r,250):i=(await P(t,r,250)).filter(u=>a.includes(u.id.toString())||a.includes(u.id));let n=0,l=0;const c=[];console.log(`🎯 Processando valores de variantes em ${i.length} produtos (escopo: ${o})`);for(const d of i)try{let u=!1;const p=[];if(d.variants&&d.variants.length>0)for(const h of d.variants){let f=!1;const v=[];let x=0;if(h.option1||h.option2||h.option3){const y=[h.option1,h.option2,h.option3].filter(Boolean),j=d.options?.map(g=>g.name)||[];for(let g=0;g<y.length;g++){const T=y[g],A=j[g],b=s.find(E=>E.optionName===A&&E.currentValue.toLowerCase()===T.toLowerCase());b&&(b.newValue&&b.newValue!==T&&(g===0?h.option1=b.newValue:g===1?h.option2=b.newValue:g===2&&(h.option3=b.newValue),f=!0,u=!0,console.log(`🔄 ${d.title}: ${A} "${T}" → "${b.newValue}"`)),b.priceExtra&&b.priceExtra>0&&(x+=b.priceExtra,f=!0,u=!0,console.log(`💰 ${d.title}: Preço extra +R$ ${b.priceExtra} para ${A}="${b.newValue||T}"`)))}}if(f)try{const y={id:h.id,option1:h.option1,option2:h.option2||null,option3:h.option3||null};if(x>0){const T=((parseFloat(h.price)||0)+x).toFixed(2);y.price=T,console.log(`💰 ${d.title}: Preço atualizado de R$ ${h.price} para R$ ${T} (+R$ ${x.toFixed(2)})`)}const j=await I(t,r,`products/${d.id}/variants/${h.id}.json`,"PUT",{variant:y});p.push(h)}catch(y){console.error(`❌ Erro ao atualizar variante ${h.id}:`,y),l++}}u&&p.length>0&&(n++,c.push({success:!0,productId:d.id,title:d.title,changes:`${p.length} variantes atualizadas`}),console.log(`✅ ${d.title}: ${p.length} variantes atualizadas`))}catch(u){l++,c.push({success:!1,productId:d.id,title:d.title,error:u instanceof Error?u.message:"Erro desconhecido"}),console.error(`❌ Erro ao processar produto ${d.id}:`,u)}return console.log(`🎉 VALORES DE VARIANTES ATUALIZADOS: ${n} produtos, ${l} falhas`),e.json({success:!0,totalProducts:i.length,updatedCount:n,failedCount:l,results:c.slice(0,50)})}catch(t){return e.json({error:"Erro na atualização em massa de valores de variantes: "+(t instanceof Error?t.message:"Erro desconhecido")},500)}});w.get("/",e=>e.html(`
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
  `));const X=new de,lt=Object.assign({"/src/index.tsx":w});let fe=!1;for(const[,e]of Object.entries(lt))e&&(X.route("/",e),X.notFound(e.notFoundHandler),fe=!0);if(!fe)throw new Error("Can't import modules from ['/src/index.tsx','/app/server.ts']");export{X as default};
