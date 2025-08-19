var ie=(e,t,a)=>(s,o)=>{let r=-1;return n(0);async function n(i){if(i<=r)throw new Error("next() called multiple times");r=i;let c,l=!1,d;if(e[i]?(d=e[i][0][0],s.req.routeIndex=i):d=i===e.length&&o||void 0,d)try{c=await d(s,()=>n(i+1))}catch(u){if(u instanceof Error&&t)s.error=u,c=await t(u,s),l=!0;else throw u}else s.finalized===!1&&a&&(c=await a(s));return c&&(s.finalized===!1||l)&&(s.res=c),s}},Re=Symbol(),Oe=async(e,t=Object.create(null))=>{const{all:a=!1,dot:s=!1}=t,r=(e instanceof be?e.raw.headers:e.headers).get("Content-Type");return r?.startsWith("multipart/form-data")||r?.startsWith("application/x-www-form-urlencoded")?je(e,{all:a,dot:s}):{}};async function je(e,t){const a=await e.formData();return a?Ie(a,t):{}}function Ie(e,t){const a=Object.create(null);return e.forEach((s,o)=>{t.all||o.endsWith("[]")?Me(a,o,s):a[o]=s}),t.dot&&Object.entries(a).forEach(([s,o])=>{s.includes(".")&&(De(a,s,o),delete a[s])}),a}var Me=(e,t,a)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(a):e[t]=[e[t],a]:t.endsWith("[]")?e[t]=[a]:e[t]=a},De=(e,t,a)=>{let s=e;const o=t.split(".");o.forEach((r,n)=>{n===o.length-1?s[r]=a:((!s[r]||typeof s[r]!="object"||Array.isArray(s[r])||s[r]instanceof File)&&(s[r]=Object.create(null)),s=s[r])})},pe=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},Le=e=>{const{groups:t,path:a}=Ne(e),s=pe(a);return ze(s,t)},Ne=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(a,s)=>{const o=`@${s}`;return t.push([o,a]),o}),{groups:t,path:e}},ze=(e,t)=>{for(let a=t.length-1;a>=0;a--){const[s]=t[a];for(let o=e.length-1;o>=0;o--)if(e[o].includes(s)){e[o]=e[o].replace(s,t[a][1]);break}}return e},q={},_e=(e,t)=>{if(e==="*")return"*";const a=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(a){const s=`${e}#${t}`;return q[s]||(a[2]?q[s]=t&&t[0]!==":"&&t[0]!=="*"?[s,a[1],new RegExp(`^${a[2]}(?=/${t})`)]:[e,a[1],new RegExp(`^${a[2]}$`)]:q[s]=[e,a[1],!0]),q[s]}return null},te=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,a=>{try{return t(a)}catch{return a}})}},He=e=>te(e,decodeURI),he=e=>{const t=e.url,a=t.indexOf("/",t.charCodeAt(9)===58?13:8);let s=a;for(;s<t.length;s++){const o=t.charCodeAt(s);if(o===37){const r=t.indexOf("?",s),n=t.slice(a,r===-1?void 0:r);return He(n.includes("%25")?n.replace(/%25/g,"%2525"):n)}else if(o===63)break}return t.slice(a,s)},Fe=e=>{const t=he(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},N=(e,t,...a)=>(a.length&&(t=N(t,...a)),`${e?.[0]==="/"?"":"/"}${e}${t==="/"?"":`${e?.at(-1)==="/"?"":"/"}${t?.[0]==="/"?t.slice(1):t}`}`),ge=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),a=[];let s="";return t.forEach(o=>{if(o!==""&&!/\:/.test(o))s+="/"+o;else if(/\:/.test(o))if(/\?/.test(o)){a.length===0&&s===""?a.push("/"):a.push(s);const r=o.replace("?","");s+="/"+r,a.push(s)}else s+="/"+o}),a.filter((o,r,n)=>n.indexOf(o)===r)},J=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?te(e,fe):e):e,me=(e,t,a)=>{let s;if(!a&&t&&!/[%+]/.test(t)){let n=e.indexOf(`?${t}`,8);for(n===-1&&(n=e.indexOf(`&${t}`,8));n!==-1;){const i=e.charCodeAt(n+t.length+1);if(i===61){const c=n+t.length+2,l=e.indexOf("&",c);return J(e.slice(c,l===-1?void 0:l))}else if(i==38||isNaN(i))return"";n=e.indexOf(`&${t}`,n+1)}if(s=/[%+]/.test(e),!s)return}const o={};s??=/[%+]/.test(e);let r=e.indexOf("?",8);for(;r!==-1;){const n=e.indexOf("&",r+1);let i=e.indexOf("=",r);i>n&&n!==-1&&(i=-1);let c=e.slice(r+1,i===-1?n===-1?void 0:n:i);if(s&&(c=J(c)),r=n,c==="")continue;let l;i===-1?l="":(l=e.slice(i+1,n===-1?void 0:n),s&&(l=J(l))),a?(o[c]&&Array.isArray(o[c])||(o[c]=[]),o[c].push(l)):o[c]??=l}return t?o[t]:o},Be=me,Ve=(e,t)=>me(e,t,!0),fe=decodeURIComponent,le=e=>te(e,fe),be=class{raw;#t;#e;routeIndex=0;path;bodyCache={};constructor(e,t="/",a=[[]]){this.raw=e,this.path=t,this.#e=a,this.#t={}}param(e){return e?this.#s(e):this.#r()}#s(e){const t=this.#e[0][this.routeIndex][1][e],a=this.#o(t);return a?/\%/.test(a)?le(a):a:void 0}#r(){const e={},t=Object.keys(this.#e[0][this.routeIndex][1]);for(const a of t){const s=this.#o(this.#e[0][this.routeIndex][1][a]);s&&typeof s=="string"&&(e[a]=/\%/.test(s)?le(s):s)}return e}#o(e){return this.#e[1]?this.#e[1][e]:e}query(e){return Be(this.url,e)}queries(e){return Ve(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((a,s)=>{t[s]=a}),t}async parseBody(e){return this.bodyCache.parsedBody??=await Oe(this,e)}#a=e=>{const{bodyCache:t,raw:a}=this,s=t[e];if(s)return s;const o=Object.keys(t)[0];return o?t[o].then(r=>(o==="json"&&(r=JSON.stringify(r)),new Response(r)[e]())):t[e]=a[e]()};json(){return this.#a("text").then(e=>JSON.parse(e))}text(){return this.#a("text")}arrayBuffer(){return this.#a("arrayBuffer")}blob(){return this.#a("blob")}formData(){return this.#a("formData")}addValidatedData(e,t){this.#t[e]=t}valid(e){return this.#t[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[Re](){return this.#e}get matchedRoutes(){return this.#e[0].map(([[,e]])=>e)}get routePath(){return this.#e[0].map(([[,e]])=>e)[this.routeIndex].path}},Ue={Stringify:1},ve=async(e,t,a,s,o)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const r=e.callbacks;return r?.length?(o?o[0]+=e:o=[e],Promise.all(r.map(i=>i({phase:t,buffer:o,context:s}))).then(i=>Promise.all(i.filter(Boolean).map(c=>ve(c,t,!1,s,o))).then(()=>o[0]))):Promise.resolve(e)},qe="text/plain; charset=UTF-8",Q=(e,t)=>({"Content-Type":e,...t}),Ge=class{#t;#e;env={};#s;finalized=!1;error;#r;#o;#a;#d;#l;#c;#i;#u;#p;constructor(e,t){this.#t=e,t&&(this.#o=t.executionCtx,this.env=t.env,this.#c=t.notFoundHandler,this.#p=t.path,this.#u=t.matchResult)}get req(){return this.#e??=new be(this.#t,this.#p,this.#u),this.#e}get event(){if(this.#o&&"respondWith"in this.#o)return this.#o;throw Error("This context has no FetchEvent")}get executionCtx(){if(this.#o)return this.#o;throw Error("This context has no ExecutionContext")}get res(){return this.#a||=new Response(null,{headers:this.#i??=new Headers})}set res(e){if(this.#a&&e){e=new Response(e.body,e);for(const[t,a]of this.#a.headers.entries())if(t!=="content-type")if(t==="set-cookie"){const s=this.#a.headers.getSetCookie();e.headers.delete("set-cookie");for(const o of s)e.headers.append("set-cookie",o)}else e.headers.set(t,a)}this.#a=e,this.finalized=!0}render=(...e)=>(this.#l??=t=>this.html(t),this.#l(...e));setLayout=e=>this.#d=e;getLayout=()=>this.#d;setRenderer=e=>{this.#l=e};header=(e,t,a)=>{this.finalized&&(this.#a=new Response(this.#a.body,this.#a));const s=this.#a?this.#a.headers:this.#i??=new Headers;t===void 0?s.delete(e):a?.append?s.append(e,t):s.set(e,t)};status=e=>{this.#r=e};set=(e,t)=>{this.#s??=new Map,this.#s.set(e,t)};get=e=>this.#s?this.#s.get(e):void 0;get var(){return this.#s?Object.fromEntries(this.#s):{}}#n(e,t,a){const s=this.#a?new Headers(this.#a.headers):this.#i??new Headers;if(typeof t=="object"&&"headers"in t){const r=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[n,i]of r)n.toLowerCase()==="set-cookie"?s.append(n,i):s.set(n,i)}if(a)for(const[r,n]of Object.entries(a))if(typeof n=="string")s.set(r,n);else{s.delete(r);for(const i of n)s.append(r,i)}const o=typeof t=="number"?t:t?.status??this.#r;return new Response(e,{status:o,headers:s})}newResponse=(...e)=>this.#n(...e);body=(e,t,a)=>this.#n(e,t,a);text=(e,t,a)=>!this.#i&&!this.#r&&!t&&!a&&!this.finalized?new Response(e):this.#n(e,t,Q(qe,a));json=(e,t,a)=>this.#n(JSON.stringify(e),t,Q("application/json",a));html=(e,t,a)=>{const s=o=>this.#n(o,t,Q("text/html; charset=UTF-8",a));return typeof e=="object"?ve(e,Ue.Stringify,!1,{}).then(s):s(e)};redirect=(e,t)=>{const a=String(e);return this.header("Location",/[^\x00-\xFF]/.test(a)?encodeURI(a):a),this.newResponse(null,t??302)};notFound=()=>(this.#c??=()=>new Response,this.#c(this))},S="ALL",Ke="all",We=["get","post","put","delete","options","patch"],xe="Can not add a route since the matcher is already built.",ye=class extends Error{},Ye="__COMPOSED_HANDLER",Xe=e=>e.text("404 Not Found",404),ce=(e,t)=>{if("getResponse"in e){const a=e.getResponse();return t.newResponse(a.body,a)}return console.error(e),t.text("Internal Server Error",500)},we=class{get;post;put;delete;options;patch;all;on;use;router;getPath;_basePath="/";#t="/";routes=[];constructor(t={}){[...We,Ke].forEach(r=>{this[r]=(n,...i)=>(typeof n=="string"?this.#t=n:this.#r(r,this.#t,n),i.forEach(c=>{this.#r(r,this.#t,c)}),this)}),this.on=(r,n,...i)=>{for(const c of[n].flat()){this.#t=c;for(const l of[r].flat())i.map(d=>{this.#r(l.toUpperCase(),this.#t,d)})}return this},this.use=(r,...n)=>(typeof r=="string"?this.#t=r:(this.#t="*",n.unshift(r)),n.forEach(i=>{this.#r(S,this.#t,i)}),this);const{strict:s,...o}=t;Object.assign(this,o),this.getPath=s??!0?t.getPath??he:Fe}#e(){const t=new we({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,t.#s=this.#s,t.routes=this.routes,t}#s=Xe;errorHandler=ce;route(t,a){const s=this.basePath(t);return a.routes.map(o=>{let r;a.errorHandler===ce?r=o.handler:(r=async(n,i)=>(await ie([],a.errorHandler)(n,()=>o.handler(n,i))).res,r[Ye]=o.handler),s.#r(o.method,o.path,r)}),this}basePath(t){const a=this.#e();return a._basePath=N(this._basePath,t),a}onError=t=>(this.errorHandler=t,this);notFound=t=>(this.#s=t,this);mount(t,a,s){let o,r;s&&(typeof s=="function"?r=s:(r=s.optionHandler,s.replaceRequest===!1?o=c=>c:o=s.replaceRequest));const n=r?c=>{const l=r(c);return Array.isArray(l)?l:[l]}:c=>{let l;try{l=c.executionCtx}catch{}return[c.env,l]};o||=(()=>{const c=N(this._basePath,t),l=c==="/"?0:c.length;return d=>{const u=new URL(d.url);return u.pathname=u.pathname.slice(l)||"/",new Request(u,d)}})();const i=async(c,l)=>{const d=await a(o(c.req.raw),...n(c));if(d)return d;await l()};return this.#r(S,N(t,"*"),i),this}#r(t,a,s){t=t.toUpperCase(),a=N(this._basePath,a);const o={basePath:this._basePath,path:a,method:t,handler:s};this.router.add(t,a,[s,o]),this.routes.push(o)}#o(t,a){if(t instanceof Error)return this.errorHandler(t,a);throw t}#a(t,a,s,o){if(o==="HEAD")return(async()=>new Response(null,await this.#a(t,a,s,"GET")))();const r=this.getPath(t,{env:s}),n=this.router.match(o,r),i=new Ge(t,{path:r,matchResult:n,env:s,executionCtx:a,notFoundHandler:this.#s});if(n[0].length===1){let l;try{l=n[0][0][0][0](i,async()=>{i.res=await this.#s(i)})}catch(d){return this.#o(d,i)}return l instanceof Promise?l.then(d=>d||(i.finalized?i.res:this.#s(i))).catch(d=>this.#o(d,i)):l??this.#s(i)}const c=ie(n[0],this.errorHandler,this.#s);return(async()=>{try{const l=await c(i);if(!l.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return l.res}catch(l){return this.#o(l,i)}})()}fetch=(t,...a)=>this.#a(t,a[1],a[0],t.method);request=(t,a,s,o)=>t instanceof Request?this.fetch(a?new Request(t,a):t,s,o):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${N("/",t)}`,a),s,o));fire=()=>{addEventListener("fetch",t=>{t.respondWith(this.#a(t.request,t,void 0,t.request.method))})}},K="[^/]+",F=".*",B="(?:|/.*)",z=Symbol(),Je=new Set(".\\+*[^]$()");function Qe(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===F||e===B?1:t===F||t===B?-1:e===K?1:t===K?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var Z=class{#t;#e;#s=Object.create(null);insert(t,a,s,o,r){if(t.length===0){if(this.#t!==void 0)throw z;if(r)return;this.#t=a;return}const[n,...i]=t,c=n==="*"?i.length===0?["","",F]:["","",K]:n==="/*"?["","",B]:n.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let l;if(c){const d=c[1];let u=c[2]||K;if(d&&c[2]&&(u===".*"||(u=u.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(u))))throw z;if(l=this.#s[u],!l){if(Object.keys(this.#s).some(g=>g!==F&&g!==B))throw z;if(r)return;l=this.#s[u]=new Z,d!==""&&(l.#e=o.varIndex++)}!r&&d!==""&&s.push([d,l.#e])}else if(l=this.#s[n],!l){if(Object.keys(this.#s).some(d=>d.length>1&&d!==F&&d!==B))throw z;if(r)return;l=this.#s[n]=new Z}l.insert(i,a,s,o,r)}buildRegExpStr(){const a=Object.keys(this.#s).sort(Qe).map(s=>{const o=this.#s[s];return(typeof o.#e=="number"?`(${s})@${o.#e}`:Je.has(s)?`\\${s}`:s)+o.buildRegExpStr()});return typeof this.#t=="number"&&a.unshift(`#${this.#t}`),a.length===0?"":a.length===1?a[0]:"(?:"+a.join("|")+")"}},Ze=class{#t={varIndex:0};#e=new Z;insert(e,t,a){const s=[],o=[];for(let n=0;;){let i=!1;if(e=e.replace(/\{[^}]+\}/g,c=>{const l=`@\\${n}`;return o[n]=[l,c],n++,i=!0,l}),!i)break}const r=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let n=o.length-1;n>=0;n--){const[i]=o[n];for(let c=r.length-1;c>=0;c--)if(r[c].indexOf(i)!==-1){r[c]=r[c].replace(i,o[n][1]);break}}return this.#e.insert(r,t,s,this.#t,a),s}buildRegExp(){let e=this.#e.buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const a=[],s=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(o,r,n)=>r!==void 0?(a[++t]=Number(r),"$()"):(n!==void 0&&(s[Number(n)]=++t),"")),[new RegExp(`^${e}`),a,s]}},Ee=[],et=[/^$/,[],Object.create(null)],Te=Object.create(null);function Pe(e){return Te[e]??=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,a)=>a?`\\${a}`:"(?:|/.*)")}$`)}function tt(){Te=Object.create(null)}function st(e){const t=new Ze,a=[];if(e.length===0)return et;const s=e.map(l=>[!/\*|\/:/.test(l[0]),...l]).sort(([l,d],[u,g])=>l?1:u?-1:d.length-g.length),o=Object.create(null);for(let l=0,d=-1,u=s.length;l<u;l++){const[g,m,h]=s[l];g?o[m]=[h.map(([b])=>[b,Object.create(null)]),Ee]:d++;let p;try{p=t.insert(m,d,g)}catch(b){throw b===z?new ye(m):b}g||(a[d]=h.map(([b,f])=>{const v=Object.create(null);for(f-=1;f>=0;f--){const[x,j]=p[f];v[x]=j}return[b,v]}))}const[r,n,i]=t.buildRegExp();for(let l=0,d=a.length;l<d;l++)for(let u=0,g=a[l].length;u<g;u++){const m=a[l][u]?.[1];if(!m)continue;const h=Object.keys(m);for(let p=0,b=h.length;p<b;p++)m[h[p]]=i[m[h[p]]]}const c=[];for(const l in n)c[l]=a[n[l]];return[r,c,o]}function L(e,t){if(e){for(const a of Object.keys(e).sort((s,o)=>o.length-s.length))if(Pe(a).test(t))return[...e[a]]}}var at=class{name="RegExpRouter";#t;#e;constructor(){this.#t={[S]:Object.create(null)},this.#e={[S]:Object.create(null)}}add(e,t,a){const s=this.#t,o=this.#e;if(!s||!o)throw new Error(xe);s[e]||[s,o].forEach(i=>{i[e]=Object.create(null),Object.keys(i[S]).forEach(c=>{i[e][c]=[...i[S][c]]})}),t==="/*"&&(t="*");const r=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const i=Pe(t);e===S?Object.keys(s).forEach(c=>{s[c][t]||=L(s[c],t)||L(s[S],t)||[]}):s[e][t]||=L(s[e],t)||L(s[S],t)||[],Object.keys(s).forEach(c=>{(e===S||e===c)&&Object.keys(s[c]).forEach(l=>{i.test(l)&&s[c][l].push([a,r])})}),Object.keys(o).forEach(c=>{(e===S||e===c)&&Object.keys(o[c]).forEach(l=>i.test(l)&&o[c][l].push([a,r]))});return}const n=ge(t)||[t];for(let i=0,c=n.length;i<c;i++){const l=n[i];Object.keys(o).forEach(d=>{(e===S||e===d)&&(o[d][l]||=[...L(s[d],l)||L(s[S],l)||[]],o[d][l].push([a,r-c+i+1]))})}}match(e,t){tt();const a=this.#s();return this.match=(s,o)=>{const r=a[s]||a[S],n=r[2][o];if(n)return n;const i=o.match(r[0]);if(!i)return[[],Ee];const c=i.indexOf("",1);return[r[1][c],i]},this.match(e,t)}#s(){const e=Object.create(null);return Object.keys(this.#e).concat(Object.keys(this.#t)).forEach(t=>{e[t]||=this.#r(t)}),this.#t=this.#e=void 0,e}#r(e){const t=[];let a=e===S;return[this.#t,this.#e].forEach(s=>{const o=s[e]?Object.keys(s[e]).map(r=>[r,s[e][r]]):[];o.length!==0?(a||=!0,t.push(...o)):e!==S&&t.push(...Object.keys(s[S]).map(r=>[r,s[S][r]]))}),a?st(t):null}},ot=class{name="SmartRouter";#t=[];#e=[];constructor(e){this.#t=e.routers}add(e,t,a){if(!this.#e)throw new Error(xe);this.#e.push([e,t,a])}match(e,t){if(!this.#e)throw new Error("Fatal error");const a=this.#t,s=this.#e,o=a.length;let r=0,n;for(;r<o;r++){const i=a[r];try{for(let c=0,l=s.length;c<l;c++)i.add(...s[c]);n=i.match(e,t)}catch(c){if(c instanceof ye)continue;throw c}this.match=i.match.bind(i),this.#t=[i],this.#e=void 0;break}if(r===o)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,n}get activeRouter(){if(this.#e||this.#t.length!==1)throw new Error("No active router has been determined yet.");return this.#t[0]}},_=Object.create(null),Se=class{#t;#e;#s;#r=0;#o=_;constructor(e,t,a){if(this.#e=a||Object.create(null),this.#t=[],e&&t){const s=Object.create(null);s[e]={handler:t,possibleKeys:[],score:0},this.#t=[s]}this.#s=[]}insert(e,t,a){this.#r=++this.#r;let s=this;const o=Le(t),r=[];for(let n=0,i=o.length;n<i;n++){const c=o[n],l=o[n+1],d=_e(c,l),u=Array.isArray(d)?d[0]:c;if(u in s.#e){s=s.#e[u],d&&r.push(d[1]);continue}s.#e[u]=new Se,d&&(s.#s.push(d),r.push(d[1])),s=s.#e[u]}return s.#t.push({[e]:{handler:a,possibleKeys:r.filter((n,i,c)=>c.indexOf(n)===i),score:this.#r}}),s}#a(e,t,a,s){const o=[];for(let r=0,n=e.#t.length;r<n;r++){const i=e.#t[r],c=i[t]||i[S],l={};if(c!==void 0&&(c.params=Object.create(null),o.push(c),a!==_||s&&s!==_))for(let d=0,u=c.possibleKeys.length;d<u;d++){const g=c.possibleKeys[d],m=l[c.score];c.params[g]=s?.[g]&&!m?s[g]:a[g]??s?.[g],l[c.score]=!0}}return o}search(e,t){const a=[];this.#o=_;let o=[this];const r=pe(t),n=[];for(let i=0,c=r.length;i<c;i++){const l=r[i],d=i===c-1,u=[];for(let g=0,m=o.length;g<m;g++){const h=o[g],p=h.#e[l];p&&(p.#o=h.#o,d?(p.#e["*"]&&a.push(...this.#a(p.#e["*"],e,h.#o)),a.push(...this.#a(p,e,h.#o))):u.push(p));for(let b=0,f=h.#s.length;b<f;b++){const v=h.#s[b],x=h.#o===_?{}:{...h.#o};if(v==="*"){const P=h.#e["*"];P&&(a.push(...this.#a(P,e,h.#o)),P.#o=x,u.push(P));continue}const[j,w,A]=v;if(!l&&!(A instanceof RegExp))continue;const y=h.#e[j],C=r.slice(i).join("/");if(A instanceof RegExp){const P=A.exec(C);if(P){if(x[w]=P[0],a.push(...this.#a(y,e,h.#o,x)),Object.keys(y.#e).length){y.#o=x;const k=P[0].match(/\//)?.length??0;(n[k]||=[]).push(y)}continue}}(A===!0||A.test(l))&&(x[w]=l,d?(a.push(...this.#a(y,e,x,h.#o)),y.#e["*"]&&a.push(...this.#a(y.#e["*"],e,x,h.#o))):(y.#o=x,u.push(y)))}}o=u.concat(n.shift()??[])}return a.length>1&&a.sort((i,c)=>i.score-c.score),[a.map(({handler:i,params:c})=>[i,c])]}},rt=class{name="TrieRouter";#t;constructor(){this.#t=new Se}add(e,t,a){const s=ge(t);if(s){for(let o=0,r=s.length;o<r;o++)this.#t.insert(e,s[o],a);return}this.#t.insert(e,t,a)}match(e,t){return this.#t.search(e,t)}},$e=class extends we{constructor(e={}){super(e),this.router=e.router??new ot({routers:[new at,new rt]})}},nt=e=>{const a={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...e},s=(r=>typeof r=="string"?r==="*"?()=>r:n=>r===n?n:null:typeof r=="function"?r:n=>r.includes(n)?n:null)(a.origin),o=(r=>typeof r=="function"?r:Array.isArray(r)?()=>r:()=>[])(a.allowMethods);return async function(n,i){function c(d,u){n.res.headers.set(d,u)}const l=s(n.req.header("origin")||"",n);if(l&&c("Access-Control-Allow-Origin",l),a.origin!=="*"){const d=n.req.header("Vary");d?c("Vary",d):c("Vary","Origin")}if(a.credentials&&c("Access-Control-Allow-Credentials","true"),a.exposeHeaders?.length&&c("Access-Control-Expose-Headers",a.exposeHeaders.join(",")),n.req.method==="OPTIONS"){a.maxAge!=null&&c("Access-Control-Max-Age",a.maxAge.toString());const d=o(n.req.header("origin")||"",n);d.length&&c("Access-Control-Allow-Methods",d.join(","));let u=a.allowHeaders;if(!u?.length){const g=n.req.header("Access-Control-Request-Headers");g&&(u=g.split(/\s*,\s*/))}return u?.length&&(c("Access-Control-Allow-Headers",u.join(",")),n.res.headers.append("Vary","Access-Control-Request-Headers")),n.res.headers.delete("Content-Length"),n.res.headers.delete("Content-Type"),new Response(null,{headers:n.res.headers,status:204,statusText:"No Content"})}await i()}},it=/^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i,de=(e,t=ct)=>{const a=/\.([a-zA-Z0-9]+?)$/,s=e.match(a);if(!s)return;let o=t[s[1]];return o&&o.startsWith("text")&&(o+="; charset=utf-8"),o},lt={aac:"audio/aac",avi:"video/x-msvideo",avif:"image/avif",av1:"video/av1",bin:"application/octet-stream",bmp:"image/bmp",css:"text/css",csv:"text/csv",eot:"application/vnd.ms-fontobject",epub:"application/epub+zip",gif:"image/gif",gz:"application/gzip",htm:"text/html",html:"text/html",ico:"image/x-icon",ics:"text/calendar",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",jsonld:"application/ld+json",map:"application/json",mid:"audio/x-midi",midi:"audio/x-midi",mjs:"text/javascript",mp3:"audio/mpeg",mp4:"video/mp4",mpeg:"video/mpeg",oga:"audio/ogg",ogv:"video/ogg",ogx:"application/ogg",opus:"audio/opus",otf:"font/otf",pdf:"application/pdf",png:"image/png",rtf:"application/rtf",svg:"image/svg+xml",tif:"image/tiff",tiff:"image/tiff",ts:"video/mp2t",ttf:"font/ttf",txt:"text/plain",wasm:"application/wasm",webm:"video/webm",weba:"audio/webm",webmanifest:"application/manifest+json",webp:"image/webp",woff:"font/woff",woff2:"font/woff2",xhtml:"application/xhtml+xml",xml:"application/xml",zip:"application/zip","3gp":"video/3gpp","3g2":"video/3gpp2",gltf:"model/gltf+json",glb:"model/gltf-binary"},ct=lt,dt=(...e)=>{let t=e.filter(o=>o!=="").join("/");t=t.replace(/(?<=\/)\/+/g,"");const a=t.split("/"),s=[];for(const o of a)o===".."&&s.length>0&&s.at(-1)!==".."?s.pop():o!=="."&&s.push(o);return s.join("/")||"."},Ae={br:".br",zstd:".zst",gzip:".gz"},ut=Object.keys(Ae),pt="index.html",ht=e=>{const t=e.root??"./",a=e.path,s=e.join??dt;return async(o,r)=>{if(o.finalized)return r();let n;if(e.path)n=e.path;else try{if(n=decodeURIComponent(o.req.path),/(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(n))throw new Error}catch{return await e.onNotFound?.(o.req.path,o),r()}let i=s(t,!a&&e.rewriteRequestPath?e.rewriteRequestPath(n):n);e.isDir&&await e.isDir(i)&&(i=s(i,pt));const c=e.getContent;let l=await c(i,o);if(l instanceof Response)return o.newResponse(l.body,l);if(l){const d=e.mimes&&de(i,e.mimes)||de(i);if(o.header("Content-Type",d||"application/octet-stream"),e.precompressed&&(!d||it.test(d))){const u=new Set(o.req.header("Accept-Encoding")?.split(",").map(g=>g.trim()));for(const g of ut){if(!u.has(g))continue;const m=await c(i+Ae[g],o);if(m){l=m,o.header("Content-Encoding",g),o.header("Vary","Accept-Encoding",{append:!0});break}}}return await e.onFound?.(i,o),o.body(l)}await e.onNotFound?.(i,o),await r()}},gt=async(e,t)=>{let a;t&&t.manifest?typeof t.manifest=="string"?a=JSON.parse(t.manifest):a=t.manifest:typeof __STATIC_CONTENT_MANIFEST=="string"?a=JSON.parse(__STATIC_CONTENT_MANIFEST):a=__STATIC_CONTENT_MANIFEST;let s;t&&t.namespace?s=t.namespace:s=__STATIC_CONTENT;const o=a[e]||e;if(!o)return null;const r=await s.get(o,{type:"stream"});return r||null},mt=e=>async function(a,s){return ht({...e,getContent:async r=>gt(r,{manifest:e.manifest,namespace:e.namespace?e.namespace:a.env?a.env.__STATIC_CONTENT:void 0})})(a,s)},ft=e=>mt(e);const $=new $e;$.use("/api/*",nt());$.use("/static/*",ft({root:"./public"}));const G=new Map,H=new Map,V=new Map;function I(e,t){const s={...V.get(e)||{operationId:e,analyzed:0,updated:0,failed:0,unchanged:0,total:0,startTime:Date.now(),lastUpdate:Date.now(),status:"starting",type:"unknown",details:[]},...t,lastUpdate:Date.now()};return V.set(e,s),console.log(`📊 Progress Update [${e}]:`,s),s}const ee={products:{limit:500,windowMs:6e4},collections:{limit:300,windowMs:6e4},bulkUpdate:{limit:1e3,windowMs:6e4},bulkVariants:{limit:800,windowMs:6e4},analyzeVariants:{limit:200,windowMs:6e4},concurrent:{maxChunks:20,chunkSize:25,chunkDelay:50}};function se(e,t){return`${e}:${JSON.stringify(t)}`}function ae(e,t=3e5){const a=H.get(e);return a&&Date.now()-a.timestamp<t?(console.log(`⚡ CACHE HIT: ${e}`),a.data):null}function oe(e,t){if(H.set(e,{data:t,timestamp:Date.now()}),H.size>1e3){const a=H.keys().next().value;H.delete(a)}}function W(e,t){const a=t?ee[t]||ee.products:{limit:100,windowMs:6e4},s=Date.now(),o=s-a.windowMs;G.has(e)||G.set(e,[]);const n=G.get(e).filter(i=>i>o);return n.length>=a.limit?!1:(n.push(s),G.set(e,n),!0)}function bt(e,t){const a=[];for(let s=0;s<e.length;s+=t)a.push(e.slice(s,s+t));return a}function Y(e){return new Promise(t=>setTimeout(t,e))}async function vt(e,t=3,a=1e3){for(let s=1;s<=t;s++)try{return await e()}catch(o){if(s===t)throw o;const r=a*Math.pow(2,s-1);console.log(`🔄 Retry ${s}/${t} in ${r}ms...`),await Y(r)}throw new Error("Max retries exceeded")}async function U(e,t,a,s="GET",o,r=3e4){const n=`https://${e}.myshopify.com/admin/api/2024-01/${a}`,c={method:s,headers:{"X-Shopify-Access-Token":t,"Content-Type":"application/json"},signal:AbortSignal.timeout(r)};return o&&(s==="POST"||s==="PUT")&&(c.body=JSON.stringify(o)),await vt(async()=>{const l=await fetch(n,c);if(l.status===429){const u=l.headers.get("Retry-After")||"2",g=parseInt(u)*1e3;throw console.log(`⏳ Rate limited by Shopify, waiting ${g}ms...`),await Y(g),new Error("Rate limited, retrying...")}if(!l.ok){const u=await l.text();throw new Error(`Shopify API error: ${l.status} - ${u}`)}return await l.json()},3,1e3)}function re(e){if(!e)return"";const t=e.split(",");for(const a of t)if(a.includes('rel="next"')){const s=a.split(";")[0].trim();if(s.startsWith("<")&&s.endsWith(">"))return s.slice(1,-1)}return""}async function D(e,t,a){const s=se("products",{shop:e,forceLimit:a}),o=ae(s,18e4);if(o)return console.log(`⚡ PRODUCTS CACHE HIT - INSTANT LOAD: ${o.length} products`),o;let r=[],i=`https://${e}.myshopify.com/admin/api/2024-01/products.json?limit=250&fields=id,title,vendor,product_type,status,variants,options,image`;console.log("⚡ ULTRA-FAST PRODUCT LOADING - MINIMAL FIELDS ONLY");const c=Date.now();let l=0;for(;i&&l<20;){l++,console.log(`⚡ Speed loading page ${l}...`);try{const u={method:"GET",headers:{"X-Shopify-Access-Token":t,"Content-Type":"application/json"},signal:AbortSignal.timeout(1e4)},g=await fetch(i,u);if(!g.ok){console.error(`❌ Page ${l} failed: ${g.status}`);break}const h=(await g.json()).products||[];if(h.length===0){console.log(`✅ No more products at page ${l}`);break}r.push(...h),console.log(`⚡ Page ${l}: +${h.length} products (Total: ${r.length})`);const p=g.headers.get("Link")||"";if(i=re(p),a&&r.length>=a){console.log(`⚡ SPEED LIMIT REACHED: ${a} products`),r=r.slice(0,a);break}}catch(u){console.error(`❌ Page ${l} error:`,u);break}}const d=Date.now()-c;return console.log(`⚡ ULTRA-FAST LOAD COMPLETE: ${r.length} products in ${d}ms`),oe(s,r),r}async function Ce(e,t){const a=se("collections",{shop:e}),s=ae(a,3e5);if(s)return console.log(`⚡ COLLECTIONS CACHE HIT - INSTANT LOAD: ${s.length} collections`),s;const o="id,title,handle",r=["custom_collections","smart_collections"];console.log("⚡ ULTRA-FAST COLLECTIONS LOADING - PARALLEL PROCESSING");const n=Date.now(),i=r.map(async u=>{const g=[];let m=`https://${e}.myshopify.com/admin/api/2024-01/${u}.json?limit=250&fields=${o}`,h=0;for(;m&&h<10;){h++;try{const p=await fetch(m,{method:"GET",headers:{"X-Shopify-Access-Token":t,"Content-Type":"application/json"},signal:AbortSignal.timeout(8e3)});if(!p.ok)break;const f=(await p.json())[u]||[];if(f.length===0)break;g.push(...f),console.log(`⚡ ${u} page ${h}: +${f.length}`);const v=p.headers.get("Link")||"";m=re(v)}catch(p){console.error(`❌ ${u} error:`,p);break}}return g}),c=await Promise.allSettled(i);let l=[];c.forEach((u,g)=>{u.status==="fulfilled"&&(l.push(...u.value),console.log(`⚡ ${r[g]}: ${u.value.length} collections`))});const d=Date.now()-n;return console.log(`⚡ ULTRA-FAST COLLECTIONS COMPLETE: ${l.length} collections in ${d}ms`),oe(a,l),l}async function xt(e,t,a){let s=[],o=`https://${e}.myshopify.com/admin/api/2024-01/collections/${a}/products.json?limit=250&fields=id`;for(;o;)try{const r=await fetch(o,{method:"GET",headers:{"X-Shopify-Access-Token":t,"Content-Type":"application/json"}});if(!r.ok)break;const i=(await r.json()).products||[];s=s.concat(i);const c=r.headers.get("Link")||"";o=re(c)}catch(r){console.log(`❌ Error in collection ${a} pagination:`,r);break}return s}async function yt(e,t,a){const s={};console.log("🔍 MAPEANDO PRODUTOS POR COLEÇÃO COM PAGINAÇÃO COMPLETA...");for(const o of a)try{console.log(`🔍 Buscando produtos da coleção "${o.title}"...`);const r=await xt(e,t,o.id);r.forEach(n=>{s[n.id]||(s[n.id]=[]),s[n.id].push(o.id.toString())}),console.log(`✅ Coleção "${o.title}": ${r.length} produtos (com paginação completa)`)}catch(r){console.log(`❌ Erro na coleção ${o.title}:`,r)}return console.log(`✅ Mapeamento completo: ${Object.keys(s).length} produtos mapeados`),s}async function wt(e,t,a,s){const o=[];for(let r=0;r<a.length;r++){const n=a[r];try{const i={id:n.id};s.title&&s.title!==n.title&&(i.title=s.title),s.description!==void 0&&s.description!==n.body_html&&(i.body_html=s.description),s.vendor&&s.vendor!==n.vendor&&(i.vendor=s.vendor),s.productType&&s.productType!==n.product_type&&(i.product_type=s.productType),s.tags!==void 0&&(i.tags=s.tags),s.status&&s.status!==n.status&&(i.status=s.status),(s.seoTitle||s.seoDescription)&&(i.metafields_global_title_tag=s.seoTitle||n.metafields_global_title_tag,i.metafields_global_description_tag=s.seoDescription||n.metafields_global_description_tag),(s.price||s.comparePrice)&&(i.variants=n.variants.map(l=>({id:l.id,price:s.price||l.price,compare_at_price:s.comparePrice||l.compare_at_price}))),s.inventory!==void 0&&(i.variants=n.variants.map(l=>({id:l.id,inventory_quantity:s.inventory})));const c=await U(e,t,`products/${n.id}.json`,"PUT",{product:i});o.push({id:n.id,success:!0,data:c.product}),r<a.length-1&&await new Promise(l=>setTimeout(l,200))}catch(i){o.push({id:n.id,success:!1,error:i instanceof Error?i.message:"Unknown error"})}}return o}async function Et(e,t,a,s){const{chunkSize:o,maxChunks:r,chunkDelay:n}=ee.concurrent,i=bt(a,o),c=[];let l=0,d=0,u=0;const g=Date.now();console.log("🚀 ULTRA MASS PROCESSING STARTED"),console.log(`📊 Target: ${a.length} products`),console.log(`⚡ Strategy: ${i.length} chunks, ${o} products per chunk, ${r} chunks in parallel`),console.log(`⏱️ Expected time: ~${Math.ceil(i.length/r)*(n/1e3)} seconds`);for(let p=0;p<i.length;p+=r){const b=i.slice(p,p+r),f=Math.floor(p/r)+1,v=Math.ceil(i.length/r);console.log(`🔥 Processing batch ${f}/${v} (${b.length} chunks in parallel)`);const x=Date.now(),j=b.map(async(E,R)=>{const O=p+R+1;try{console.log(`⚡ Chunk ${O}/${i.length}: Processing ${E.length} products...`);const T=await s(E),M=T.filter(X=>X.success).length,ne=T.filter(X=>!X.success).length;return console.log(`✅ Chunk ${O}/${i.length}: ${M} successful, ${ne} failed`),{results:T,successful:M,failed:ne,chunkIndex:O}}catch(T){return console.error(`❌ Chunk ${O}/${i.length} FAILED:`,T),{results:E.map(M=>({id:M.id,success:!1,error:`Chunk processing failed: ${T instanceof Error?T.message:"Unknown error"}`})),successful:0,failed:E.length,chunkIndex:O}}}),w=await Promise.allSettled(j);let A=0,y=0,C=0;w.forEach(E=>{if(E.status==="fulfilled"){const{results:R,successful:O,failed:T}=E.value;c.push(...R),d+=O,u+=T,l+=R.length,A+=O,y+=T,C+=R.length}else console.error("❌ Batch promise rejected:",E.reason)});const P=Date.now()-x,k=((p+b.length)/i.length*100).toFixed(1);console.log(`🎯 Batch ${f}/${v} completed in ${P}ms`),console.log(`📊 Batch stats: ${C} processed, ${A} successful, ${y} failed`),console.log(`🚀 Overall progress: ${k}% (${l}/${a.length} products)`),p+r<i.length&&(console.log(`⏸️ Waiting ${n}ms before next batch...`),await Y(n))}const m=Date.now()-g,h=(d/l*100).toFixed(1);return console.log("🎉 ULTRA MASS PROCESSING COMPLETED!"),console.log(`⏱️ Total time: ${m}ms (${(m/1e3).toFixed(1)}s)`),console.log(`📊 Final results: ${l} processed, ${d} successful, ${u} failed`),console.log(`🎯 Success rate: ${h}%`),console.log(`⚡ Performance: ${(l/(m/1e3)).toFixed(1)} products/second`),{results:c,totalProcessed:l,totalSuccessful:d,totalFailed:u,processingTime:m,successRate:parseFloat(h),throughput:l/(m/1e3)}}$.get("/api/progress/:operationId",async e=>{const t=e.req.param("operationId");if(!t)return e.json({error:"Operation ID required"},400);const a=V.get(t);return a?e.json({progress:a,isActive:a.status!=="completed"&&a.status!=="failed"}):e.json({error:"Operation not found"},404)});$.post("/api/test-connection",async e=>{try{const{shop:t,accessToken:a}=await e.req.json();if(!t||!a)return e.json({error:"Parâmetros obrigatórios: shop e accessToken"},400);const s=await U(t,a,"shop.json");return e.json({success:!0,shop:s.shop.name,domain:s.shop.domain,plan:s.shop.plan_name})}catch(t){return e.json({error:"Falha na conexão: "+(t instanceof Error?t.message:"Erro desconhecido")},401)}});$.get("/favicon.ico",e=>e.text("",204));$.get("/test-modal-diagnostico",e=>e.html(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Teste - Modal de Diagnóstico Corrigido</title>
    <script src="https://cdn.tailwindcss.com"><\/script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/static/style.css">
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
</html>`));$.get("/test-variant-fix",e=>e.html(`<!DOCTYPE html>
<html>
<head>
    <title>Teste - Variant Values Fix</title>
    <script src="https://cdn.tailwindcss.com"><\/script>
    <link rel="stylesheet" href="/static/style.css">
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
</html>`));$.post("/api/products",async e=>{try{const{shop:t,accessToken:a}=await e.req.json();if(!t||!a)return e.json({error:"Parâmetros obrigatórios: shop e accessToken"},400);if(!W(`products:${t}`,"products"))return e.json({error:"Rate limit exceeded"},429);console.log("Loading ALL products with working pagination logic");const s=await D(t,a);console.log(`✅ Successfully loaded ${s.length} total products`),console.log("🔍 Loading collections for product mapping...");const o=await Ce(t,a);console.log(`✅ Loaded ${o.length} collections`);const r=await yt(t,a,o),n=s.map(i=>({...i,collection_ids:r[i.id]||[]}));return n.length>0&&console.log("✅ First product with collections:",{id:n[0].id,title:n[0].title,collection_ids:n[0].collection_ids}),e.json({products:n,total:n.length})}catch(t){return e.json({error:"Erro ao buscar produtos: "+(t instanceof Error?t.message:"Erro desconhecido")},500)}});$.post("/api/collections",async e=>{try{const{shop:t,accessToken:a}=await e.req.json();if(!t||!a)return e.json({error:"Parâmetros obrigatórios: shop e accessToken"},400);if(!W(`collections:${t}`,"collections"))return e.json({error:"Rate limit exceeded"},429);const s=await Ce(t,a);return e.json({collections:s})}catch(t){return e.json({error:"Erro ao buscar coleções: "+(t instanceof Error?t.message:"Erro desconhecido")},500)}});$.post("/api/bulk-update",async e=>{try{const{shop:t,accessToken:a,productIds:s,updates:o}=await e.req.json();if(!t||!a||!s||!o)return e.json({error:"Parâmetros obrigatórios: shop, accessToken, productIds, updates"},400);if(!W(`bulk:${t}`,"bulkUpdate"))return e.json({error:"Rate limit exceeded for bulk operations"},429);console.log(`🚀 MASS PROCESSING: Loading ${s.length} products...`);const r=[],n=[],i=50;for(let l=0;l<s.length;l+=i){const d=s.slice(l,l+i);console.log(`📦 Loading products chunk ${Math.floor(l/i)+1}/${Math.ceil(s.length/i)}`);const u=d.map(async m=>{try{return(await U(t,a,`products/${m}.json`)).product}catch(h){return console.error(`Error fetching product ${m}:`,h),n.push(m),null}});(await Promise.allSettled(u)).forEach(m=>{m.status==="fulfilled"&&m.value&&r.push(m.value)}),l+i<s.length&&await Y(100)}if(console.log(`✅ Successfully loaded ${r.length} products, ${n.length} failed`),r.length===0)return e.json({error:"Nenhum produto foi carregado com sucesso",failedToLoad:n},400);console.log(`🚀 Starting MASS PROCESSING for ${r.length} products...`);const c=await Et(t,a,r,async l=>await wt(t,a,l,o));return console.log(`🎉 MASS PROCESSING COMPLETE: ${c.totalProcessed} processed, ${c.totalSuccessful} successful, ${c.totalFailed} failed`),e.json({results:c.results,successful:c.totalSuccessful,failed:c.totalFailed,totalProcessed:c.totalProcessed,failedToLoad:n.length,massProcessingUsed:!0})}catch(t){return e.json({error:"Erro na atualização em massa: "+(t instanceof Error?t.message:"Erro desconhecido")},500)}});$.post("/api/analyze-variants",async e=>{try{const{shop:t,accessToken:a,scope:s,selectedProductIds:o}=await e.req.json();if(!t||!a)return e.json({error:"Parâmetros obrigatórios: shop e accessToken"},400);if(s==="selected"&&(!o||o.length===0))return e.json({error:'Para escopo "selected", selectedProductIds é obrigatório'},400);const r=se("analyze-variants",{shop:t,scope:s,selectedProductIds:o}),n=ae(r,12e4);if(n)return console.log("⚡ VARIANT ANALYSIS CACHE HIT - INSTANT RESULTS"),e.json(n);console.log("⚡ ULTRA-FAST VARIANT ANALYSIS STARTING");const i=Date.now();let c=[];if(s==="selected"){const h=await D(t,a),p=new Set(o.map(b=>b.toString()));c=h.filter(b=>p.has(b.id.toString())),console.log(`⚡ Selected products filtered: ${c.length} products from ${h.length} total`)}else c=await D(t,a),console.log(`⚡ All products loaded: ${c.length} products (COMPLETE SET)`);const l={},d=[];let u=0;c.forEach(h=>{if(h.options?.length){if(h.options.forEach(p=>{const b=p.name;l[b]||(l[b]={name:b,values:new Set,productCount:0,products:[]});const f=l[b];f.productCount++,f.products.length<5&&f.products.push({id:h.id,title:h.title.substring(0,50)}),p.values?.length&&p.values.forEach(v=>f.values.add(v))}),d.length<20&&h.variants?.length){const p=h.variants[0];d.push({productId:h.id,productTitle:h.title.substring(0,50),variantId:p.id,price:p.price,option1:p.option1,option2:p.option2,option3:p.option3})}u+=h.variants?.length||0}}),Object.keys(l).forEach(h=>{const p=l[h];p.values=Array.from(p.values)});const g=Date.now()-i;console.log(`⚡ ULTRA-FAST ANALYSIS COMPLETE: ${Object.keys(l).length} options in ${g}ms`);const m={success:!0,totalProducts:c.length,optionStats:l,variantCount:u,sampleVariants:d,performanceMs:g};return oe(r,m),e.json(m)}catch(t){return console.error("❌ Variant analysis error:",t),e.json({error:"Erro na análise de variantes: "+(t instanceof Error?t.message:"Erro desconhecido")},500)}});$.post("/api/bulk-update-variant-titles",async e=>{try{const{shop:t,accessToken:a,titleMappings:s,scope:o,selectedProductIds:r}=await e.req.json();if(!t||!a||!s||s.length===0)return e.json({error:"Parâmetros obrigatórios: shop, accessToken, titleMappings"},400);if(o==="selected"&&(!r||r.length===0))return e.json({error:'Para escopo "selected", selectedProductIds é obrigatório'},400);const n=`variant-titles-${Date.now()}-${Math.random().toString(36).substring(7)}`;console.log(`⚡ STARTING REAL-TIME TRACKED OPERATION: ${n}`);const i=Date.now();let c=[];if(o==="all")c=await D(t,a,500);else{const f=await D(t,a,1e3),v=new Set(r.map(x=>x.toString()));c=f.filter(x=>v.has(x.id.toString()))}console.log(`⚡ Processing ${c.length} products for title updates`);const l=new Map;s.forEach(f=>{l.set(f.currentTitle.toLowerCase(),f.newTitle)});const d=c.filter(f=>f.options?.length?f.options.some(v=>{const x=l.get(v.name.toLowerCase());return x&&x!==v.name}):!1);console.log(`⚡ Found ${d.length} products needing updates`),I(n,{type:"variant-titles",status:"processing",total:d.length,analyzed:0,updated:0,failed:0,unchanged:0,details:[`Iniciando processamento de ${d.length} produtos`]});const u=10,g=[];for(let f=0;f<d.length;f+=u)g.push(d.slice(f,f+u));let m=0,h=0;const p=[];for(let f=0;f<g.length;f++){const v=g[f];console.log(`⚡ Processing batch ${f+1}/${g.length} (${v.length} products)`),I(n,{status:`Processando lote ${f+1}/${g.length}`,details:[`Processando lote ${f+1} de ${g.length} (${v.length} produtos)`]});const x=v.map(async y=>{try{const C=y.options.map(k=>{const E=l.get(k.name.toLowerCase());return E&&E!==k.name?{...k,name:E}:k}),P=await U(t,a,`products/${y.id}.json`,"PUT",{product:{id:y.id,options:C}});return{productId:y.id,title:y.title.substring(0,50),success:!0,changes:C.map(k=>k.name).slice(0,3).join(", ")}}catch(C){return{productId:y.id,title:y.title.substring(0,50),success:!1,error:C instanceof Error?C.message.substring(0,100):"Erro desconhecido"}}});(await Promise.allSettled(x)).forEach(y=>{y.status==="fulfilled"?(p.push(y.value),y.value.success?m++:h++):(h++,p.push({productId:"unknown",title:"Erro no batch",success:!1,error:"Batch processing failed"}))});const w=(f+1)*u,A=Math.min(w,d.length);I(n,{analyzed:A,updated:m,failed:h,unchanged:Math.max(0,A-m-h),status:`Processados ${A}/${d.length} produtos`,details:[`Lote ${f+1}/${g.length} concluído`,`${m} atualizados, ${h} falhas`]}),f<g.length-1&&await new Promise(y=>setTimeout(y,100))}const b=Date.now()-i;return console.log(`⚡ ULTRA-FAST BULK UPDATE COMPLETE: ${m} updated, ${h} failed in ${b}ms`),I(n,{status:"completed",details:[`Operação concluída em ${Math.round(b/1e3)}s`,`${m} produtos atualizados com sucesso`,`${h} produtos com erro`]}),e.json({success:!0,operationId:n,totalProducts:c.length,updatedCount:m,failedCount:h,results:p.slice(0,20),performanceMs:b})}catch(t){return console.error("❌ Bulk variant titles error:",t),e.json({error:"Erro na atualização em massa de títulos de variantes: "+(t instanceof Error?t.message:"Erro desconhecido")},500)}});$.post("/api/bulk-update-variant-values",async e=>{try{const{shop:t,accessToken:a,valueMappings:s,scope:o,selectedProductIds:r}=await e.req.json();if(!t||!a||!s||s.length===0)return e.json({error:"Parâmetros obrigatórios: shop, accessToken, valueMappings"},400);if(o==="selected"&&(!r||r.length===0))return e.json({error:'Para escopo "selected", selectedProductIds é obrigatório'},400);const n=`variant-values-${Date.now()}-${Math.random().toString(36).substring(7)}`;console.log(`⚡ STARTING REAL-TIME TRACKED OPERATION: ${n}`);const i=Date.now();if(!W(`bulk-variant-values:${t}`,"bulkVariants"))return e.json({error:"Rate limit exceeded for bulk variant value operations"},429);let c=[];o==="all"?c=await D(t,a,250):c=(await D(t,a,250)).filter(b=>r.includes(b.id.toString())||r.includes(b.id));let l=0,d=0;const u=[];console.log(`🎯 Processando valores de variantes em ${c.length} produtos (escopo: ${o})`),I(n,{type:"variant-values",status:"processing",total:c.length,analyzed:0,updated:0,failed:0,unchanged:0,details:[`Iniciando processamento de ${c.length} produtos com valores de variantes`]});const g=8,m=[];for(let p=0;p<c.length;p+=g)m.push(c.slice(p,p+g));for(let p=0;p<m.length;p++){const b=m[p];console.log(`⚡ Processing batch ${p+1}/${m.length} (${b.length} products)`),I(n,{status:`Processando lote ${p+1}/${m.length}`,details:[`Processando lote ${p+1} de ${m.length} (${b.length} produtos)`]});const f=b.map(async v=>{try{let x=!1;const j=[];if(v.variants&&v.variants.length>0)for(const w of v.variants){let A=!1;const y=[];let C=0;if(w.option1||w.option2||w.option3){const P=[w.option1,w.option2,w.option3].filter(Boolean),k=v.options?.map(E=>E.name)||[];for(let E=0;E<P.length;E++){const R=P[E],O=k[E],T=s.find(M=>M.optionName===O&&M.currentValue.toLowerCase()===R.toLowerCase());T&&(T.newValue&&T.newValue!==R&&(E===0?w.option1=T.newValue:E===1?w.option2=T.newValue:E===2&&(w.option3=T.newValue),A=!0,x=!0,console.log(`🔄 ${v.title}: ${O} "${R}" → "${T.newValue}"`)),T.priceExtra&&T.priceExtra>0&&(C+=T.priceExtra,A=!0,x=!0,console.log(`💰 ${v.title}: Preço extra +R$ ${T.priceExtra} para ${O}="${T.newValue||R}"`)))}}if(A)try{const P={id:w.id,option1:w.option1,option2:w.option2||null,option3:w.option3||null};if(C>0){const R=((parseFloat(w.price)||0)+C).toFixed(2);P.price=R,console.log(`💰 ${v.title}: Preço atualizado de R$ ${w.price} para R$ ${R} (+R$ ${C.toFixed(2)})`)}const k=await U(t,a,`products/${v.id}/variants/${w.id}.json`,"PUT",{variant:P});j.push(w)}catch(P){console.error(`❌ Erro ao atualizar variante ${w.id}:`,P),d++}}x&&j.length>0&&(l++,u.push({success:!0,productId:v.id,title:v.title,changes:`${j.length} variantes atualizadas`}),console.log(`✅ ${v.title}: ${j.length} variantes atualizadas`))}catch(x){d++,u.push({success:!1,productId:v.id,title:v.title,error:x instanceof Error?x.message:"Erro desconhecido"}),console.error(`❌ Erro ao processar produto ${v.id}:`,x)}});await Promise.all(f),I(n,{analyzed:(p+1)*g,updated:l,failed:d,status:`Lote ${p+1}/${m.length} concluído`})}const h=Date.now()-i;return console.log(`🎉 ULTRA-FAST VARIANT VALUES UPDATE COMPLETE: ${l} updated, ${d} failed in ${h}ms`),I(n,{status:"completed",details:[`Operação concluída em ${Math.round(h/1e3)}s`,`${l} produtos atualizados com sucesso`,`${d} produtos com erro`]}),e.json({success:!0,operationId:n,totalProducts:c.length,updatedCount:l,failedCount:d,results:u.slice(0,50),performanceMs:h})}catch(t){return e.json({error:"Erro na atualização em massa de valores de variantes: "+(t instanceof Error?t.message:"Erro desconhecido")},500)}});$.get("/api/operation-progress/:operationId",async e=>{try{const t=e.req.param("operationId");if(!t)return e.json({error:"Operation ID is required"},400);const a=V.get(t);if(!a)return e.json({error:"Operation not found",operationId:t},404);const s=a.total>0?Math.round(a.analyzed/a.total*100):0,o=Date.now()-a.startTime;return e.json({success:!0,operationId:t,progress:{...a,percentage:s,elapsedMs:o,isComplete:a.analyzed>=a.total&&a.total>0}})}catch(t){return e.json({error:"Error fetching progress: "+(t instanceof Error?t.message:"Unknown error")},500)}});$.delete("/api/operation-progress/:operationId",async e=>{const t=e.req.param("operationId");return V.delete(t),e.json({success:!0,message:"Operation progress cleared"})});$.post("/api/test-diagnostic-progress",async e=>{try{const{stage:t}=await e.req.json(),a={start:{analyzed:0,updated:0,failed:0,unchanged:0,total:50,status:"Iniciando processamento...",percentage:0},progress1:{analyzed:15,updated:12,failed:1,unchanged:2,total:50,status:"Processando títulos das opções...",percentage:30},progress2:{analyzed:30,updated:24,failed:3,unchanged:3,total:50,status:"Aplicando alterações em massa...",percentage:60},progress3:{analyzed:45,updated:38,failed:4,unchanged:3,total:50,status:"Finalizando processamento...",percentage:90},complete:{analyzed:50,updated:42,failed:5,unchanged:3,total:50,status:"Processamento concluído!",percentage:100}},s=a[t]||a.start;return e.json({success:!0,data:s,timestamp:new Date().toISOString()})}catch(t){return e.json({error:"Erro no teste de diagnóstico: "+(t instanceof Error?t.message:"Erro desconhecido")},500)}});$.get("/",e=>e.html(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Infinity Bulk Manager - Gerenciamento em Massa de Produtos Shopify</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link rel="stylesheet" href="/static/style.css">
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
  `));const ue=new $e,Tt=Object.assign({"/src/index.tsx":$});let ke=!1;for(const[,e]of Object.entries(Tt))e&&(ue.route("/",e),ue.notFound(e.notFoundHandler),ke=!0);if(!ke)throw new Error("Can't import modules from ['/src/index.tsx','/app/server.ts']");export{ue as default};
