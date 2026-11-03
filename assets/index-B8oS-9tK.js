(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(n){if(n.ep)return;n.ep=!0;const r=t(n);fetch(n.href,r)}})();var mg=["0","1","2","3","4","5","6","7","8","9"],ua=new Map,gg=/[\u0590-\u08ff\u200e\u200f\u202a-\u202e\u2066-\u2069\ufb1d-\ufeff]/u;function _g(s={}){let e=Intl.getCanonicalLocales(s.locales),t=Object.fromEntries(Object.entries(s.format??{}).sort(([r],[a])=>r.localeCompare(a))),i=JSON.stringify([e,t]),n=ua.get(i);if(!n){n=new Intl.NumberFormat(e,t);let r=ua.keys().next().value;ua.size>=64&&r!==void 0&&ua.delete(r),ua.set(i,n)}return n}function vg(s,e={}){let t=_g(e),i=t.formatToParts(s),n=i.map(p=>p.value).join(""),r=t.resolvedOptions(),a=r.numberingSystem==="latn"&&r.notation==="standard"&&!gg.test(n)&&!i.some(p=>p.type==="nan"||p.type==="infinity"),o=JSON.stringify(r);if(!a)return{text:n,tokens:[],rollable:a,signature:o,magnitude:""};let l=i.filter(p=>p.type==="integer").reduce((p,g)=>p+g.value.length,0),c=-1,h=new Map,d=[],u="",f="";for(let p of i)if(p.type==="integer"||p.type==="fraction"){p.type==="integer"?u+=p.value:f+=p.value;for(let g of p.value){let m=`digit:${p.type==="integer"?--l:c--}`;d.push({key:m,identity:m,text:g,wheel:mg,index:Number(g)})}}else if(p.type==="group"){let g=`group:${l}`;d.push({key:`${g}:${p.value}`,identity:g,text:p.value})}else{let g=h.get(p.type)??0;h.set(p.type,g+1);let m=p.type==="plusSign"||p.type==="minusSign"?"sign":p.type;d.push({key:`${p.type}:${g}:${p.value}`,identity:`${m}:${g}`,text:p.value})}return{text:n,tokens:d,rollable:a,signature:o,magnitude:`${u.replace(/^0+(?=\d)/u,"")}.${f}`}}function xg(s,e){let[t="",i=""]=s.magnitude.split("."),[n="",r=""]=e.magnitude.split(".");if(t.length!==n.length)return n.length>t.length?1:-1;if(t!==n)return n>t?1:-1;let a=Math.max(i.length,r.length),o=i.padEnd(a,"0"),l=r.padEnd(a,"0");return l===o?0:l>o?1:-1}function yg(s,e,t=.14){return{target:0,duration:e,points:Array.from({length:49},(i,n)=>{if(n===48)return 0;let r=Math.max(0,Math.min(1,(n/48-t)/(1-t)));return s*(1+10*r)*Math.exp(-10*r)})}}function ao(s,e){if(e<=0||s.duration<=0)return s;let t=s.duration+e,i=Math.round((s.points.length-1)*t/s.duration)+1,n=s.points[0]??s.target;return{target:s.target,duration:t,points:Array.from({length:i},(r,a)=>{if(a===i-1)return s.target;let o=a/(i-1)*t-e;return o<=0?n:Wp(s,o).position})}}function ts(s,e,t,i){if(i<=0)return{points:[e,e],duration:0,target:e};let n=i/1e3,r=s-e,a=Math.max(Math.abs(r),1)*12/n,o=Math.max(-a,Math.min(a,t))*n;return{points:Array.from({length:49},(l,c)=>{if(c===48)return e;let h=c/48;return e+(r+(o+10*r)*h)*Math.exp(-10*h)}),duration:i,target:e}}function Mg(s,e=0,t=24){if(s.duration<=0)return{points:[0,0],duration:0,target:0};let i=s.duration/(s.points.length-1)/1e3;return{duration:s.duration,target:0,points:s.points.map((n,r,a)=>{if(r===0)return Math.max(0,Math.min(1,e));if(r===a.length-1)return 0;let o=Math.abs((a[r+1]-a[r-1])/(2*i)),l=t/6;return Math.max(0,Math.min(1,(o-l)/(t-l)))})}}function Wp(s,e){if(e>=s.duration||s.duration===0)return{position:s.target,velocity:0};let t=Math.max(0,e)/s.duration*(s.points.length-1),i=Math.min(Math.floor(t),s.points.length-2),n=s.points[i]??s.target,r=s.points[i+1]??s.target;return{position:n+(r-n)*(t-i),velocity:(r-n)*(s.points.length-1)*1e3/s.duration}}function Ld(s,e,t,i=10){let n=Math.floor(s/i)*i+e;return t>0&&n<s-.001?n+=i:t<0&&n>s+.001?n-=i:t===0&&(n+=Math.round((s-n)/i)*i),n}var ll=(s,e)=>s[(e%s.length+s.length)%s.length];function bg(s,e,t){let i=Math.floor(e),n=e-i,r=[ll(s,i)];return n>1e-5&&r.push(ll(s,i+1)),r.at(-1)!==t&&r.push(t),{wheel:r,from:n,target:r.length-1}}function Sg(s,e="outward"){if(e!=="outward"){let n=s.map((a,o)=>a?-1:o).filter(a=>a>=0);e==="end"&&n.reverse();let r=s.map(a=>a?0:1);return e!=="none"&&n.forEach((a,o)=>{r[a]=o+1}),r}let t=s.map((n,r)=>n?0:r+1);if(!s.includes(!0))return t;let i=-1/0;for(let n=0;n<s.length;n++)s[n]?i=n:t[n]=n-i;i=1/0;for(let n=s.length-1;n>=0;n--)s[n]?i=n:t[n]=Math.min(t[n],i-n);return t}function Nd(s,e){let t=new Map,i=[],n=0;for(let r of s){let a=e.get(r);if(!a){i.push(r);continue}for(let o of i)t.set(o,a.x);i.length=0,n=a.x+a.width}for(let r of i)t.set(r,n);return t}var Yl=new WeakMap;class Mu{view;media;members=new Set;pending=new Set;sizes=new WeakMap;intersections=new WeakMap;resize;intersection;frame=0;static for(e){let t=Yl.get(e);return t||(t=new Mu(e),Yl.set(e,t)),t}constructor(e){this.view=e,this.media=e.matchMedia("(prefers-reduced-motion: reduce)"),this.media.addEventListener("change",this.refresh),e.document.addEventListener("visibilitychange",this.refresh),e.document.fonts?.addEventListener("loadingdone",this.refresh),e.document.fonts?.ready.then(this.refresh),e.ResizeObserver&&(this.resize=new e.ResizeObserver(t=>{for(let i of t){let n=this.sizes.get(i.target);n?.sizeChanged(i.target,i.contentRect.width,i.contentRect.height)&&n.refresh()}})),e.IntersectionObserver&&(this.intersection=new e.IntersectionObserver(t=>{for(let i of t)this.intersections.get(i.target)?.visibility(i.isIntersecting)},{rootMargin:"64px"}))}refresh=()=>{for(let e of this.members)e.refresh()};add(e,t){this.members.add(e),this.intersections.set(t,e),this.intersection?.observe(t)}watch(e,t){this.sizes.set(e,t),this.resize?.observe(e)}unwatch(e){this.resize?.unobserve(e),this.sizes.delete(e)}enqueue(e){this.pending.add(e),!this.frame&&(this.frame=this.view.requestAnimationFrame(()=>{this.frame=0;let t=[...this.pending];this.pending.clear();let i=t.map(r=>r.stage());for(let r of i)r?.();let n=t.map(r=>r.measure());for(let r of n)r?.()}))}remove(e,t){this.pending.delete(e),this.members.delete(e),this.intersection?.unobserve(t),this.intersections.delete(t),!this.members.size&&(this.view.cancelAnimationFrame(this.frame),this.resize?.disconnect(),this.intersection?.disconnect(),this.media.removeEventListener("change",this.refresh),this.view.document.removeEventListener("visibilitychange",this.refresh),this.view.document.fonts?.removeEventListener("loadingdone",this.refresh),Yl.delete(this.view))}}var Od=new WeakMap;function wr(s,e,t){let i=s.animate(e,t),n=s.ownerDocument.timeline?.currentTime;return typeof n=="number"&&i.playState==="running"&&(i.startTime=n),i}function Ud(s){let e=s.ownerDocument.defaultView;if(!e)return!1;let t=Od.get(e);return t===void 0&&(t=e.CSS?.supports("animation-timing-function","linear(0, 1)")??!1,Od.set(e,t)),t}class Ar{element;property;animation;motion;value=0;constructor(e,t){this.element=e,this.property=t}read(){let e=this.animation?.currentTime;return this.animation&&this.motion?Wp(this.motion,typeof e=="number"?e:0):{position:this.value,velocity:0}}set(e,t){this.cancel(),this.value=e,this.element.style.setProperty(this.property,t(e))}play(e,t,i){if(this.cancel(),this.value=e.target,this.element.style.setProperty(this.property,t(e.target)),!e.duration||e.points.every(d=>d===e.target)){i?.();return}let n=e.points[0]??e.target,r=e.target-n,a=this.property==="opacity"&&Ud(this.element),o=this.property==="transform"&&Math.abs(r)>1e-5&&Ud(this.element),l=a?[{opacity:0},{opacity:1}]:o?[{[this.property]:t(n)},{[this.property]:t(e.target)}]:e.points.map(d=>({[this.property]:t(d)})),c=a?`linear(${e.points.map(t).join(",")})`:o?`linear(${e.points.map(d=>Number(((d-n)/r).toFixed(6))).join(",")})`:"linear",h=wr(this.element,l,{duration:e.duration,easing:c});this.animation=h,this.motion=e,h.onfinish=()=>{this.animation===h&&(this.animation=void 0,this.motion=void 0,h.onfinish=null,h.cancel(),i?.())}}cancel(){this.animation&&(this.animation.onfinish=null,this.animation.cancel(),this.animation=void 0),this.motion=void 0}}var ql="http://www.w3.org/2000/svg",Eg=0;class $l{host;layers=new Map;filter;intensity=1;constructor(e){this.host=e}filterUrl(e){if(!this.filter){let i=this.host.ownerDocument,n=i.createElementNS(ql,"svg");n.classList.add("rn-blur-defs"),n.setAttribute("aria-hidden","true"),n.setAttribute("focusable","false");let r=i.createElementNS(ql,"filter"),a;do a=`rn-vertical-blur-${++Eg}`;while(i.getElementById(a));r.id=a,r.setAttribute("x","-15%"),r.setAttribute("width","130%"),r.setAttribute("color-interpolation-filters","sRGB");let o=i.createElementNS(ql,"feGaussianBlur");r.append(o),n.append(r),this.host.append(n),this.filter={svg:n,blur:o,id:a,height:0}}let t=e*.035*this.intensity;return this.filter.height!==t&&(this.filter.blur.setAttribute("stdDeviation",`0 ${t}`),this.filter.height=t),`url("#${this.filter.id}")`}apply(e,t,i,n,r="roll"){let a=Mg(t,n,r==="entry"?6:24);if(a.points.every(d=>d===0))return!1;let o=this.host.ownerDocument.createElement("span");o.className="rn-sharp",o.append(...e.childNodes);let l=o.cloneNode(!0);l.className="rn-smear",l.style.filter=this.filterUrl(i),e.append(o,l);let c=new Ar(o,"opacity"),h=new Ar(l,"opacity");return this.layers.set(e,{sharp:o,sharpOpacity:c,smearOpacity:h}),c.play(a,d=>String(1-d)),h.play(a,String),!0}remove(e){let t=this.layers.get(e);if(!t)return 0;let i=t.smearOpacity.read().position;return t.sharpOpacity.cancel(),t.smearOpacity.cancel(),e.replaceChildren(...t.sharp.childNodes),this.layers.delete(e),i}destroy(){for(let e of this.layers.keys())this.remove(e);this.filter?.svg.remove(),this.filter=void 0}}function Tg(s){return Math.max(45,Math.min(110,s/7))}function wg(s,e,t){let i=Math.abs(e-s);return{points:[s,e],target:e,duration:i*t}}function Ag(s){let e=Array.from({length:s+1},(n,r)=>({"--rn-flap-step":String(r),offset:r/s,easing:"steps(1, end)"})),t=[],i=[];for(let n=0;n<s;n++){let r=n/s,a=(n+.5)/s,o=(n+1)/s;t.push({transform:"perspective(5em) rotateX(0deg)",filter:"brightness(1)",offset:r,easing:"cubic-bezier(.6, 0, 1, .5)"},{transform:"perspective(5em) rotateX(-90deg)",filter:"brightness(.45)",offset:a},{transform:"perspective(5em) rotateX(-90deg)",filter:"brightness(.45)",offset:o}),i.push({transform:"perspective(5em) rotateX(90deg)",filter:"brightness(.45)",offset:r},{transform:"perspective(5em) rotateX(90deg)",filter:"brightness(.45)",offset:a,easing:"linear(0, 0.58, 0.9, 1, 1.045 78%, 1)"},{transform:"perspective(5em) rotateX(0deg)",filter:"brightness(1)",offset:o})}return{index:e,falls:t,lands:i}}function Cg(s){for(let e of s.querySelectorAll(".rn-flap-smear")){for(let t of e.getAnimations())t.cancel();e.remove()}for(let e of s.querySelectorAll(".rn-flap-sharp")){for(let t of e.getAnimations())t.cancel();e.classList.remove("rn-flap-sharp")}}function Rg(s,e,t,i,n,r,a,o){let l=s.ownerDocument,c=Math.abs(i-t),h=i>=t?1:-1;if(!c){s.replaceChildren();return}let d=Ag(c),u=Array.from({length:c+1},(M,w)=>ll(e,t+w*h)),f=[...u.slice(1),u.at(-1)],p=u.some(M=>/[\r\n\f\u2028\u2029]/u.test(M)),g=l.createElement("span");g.style.cssText=`display:block;position:relative;height:${n}px`,wr(g,d.index,{delay:a,duration:c*r,fill:"both"});let m=(M,w)=>{let A=l.createElement("span");A.className=`rn-face rn-flap rn-flap-${M}`,A.style.height=`${n}px`,A.style.overflow="hidden";let v=l.createElement("span");v.style.cssText=`display:block;white-space:pre;line-height:${n}px`;let S=w?f:u;if(p)for(let P of S){let C=l.createElement("span");C.style.cssText=`display:block;height:${n}px`,C.textContent=P,v.append(C)}else v.textContent=S.join(`
`);return A.append(v),v.style.transform=`translateY(calc(var(--rn-flap-step) * ${-n}px))`,A},_=m("bottom",!1),x=m("top",!0),E=m("top",!1),y=m("bottom",!0);if(o){let M=(w,A)=>{let v=w.firstElementChild,S=v.cloneNode(!0);v.classList.add("rn-flap-sharp");let P=l.createElement("span");P.className="rn-flap-smear",P.style.cssText="display:block;position:absolute;inset:0;overflow:hidden",P.style.filter=o,P.append(S),w.append(P);let C=A.map(O=>({offset:O.offset,easing:O.easing??"linear",opacity:O.filter==="brightness(1)"?0:1})),N={delay:a,duration:c*r,fill:"both"};wr(P,C,N),wr(v,C.map(O=>({...O,opacity:1-O.opacity})),N)};M(E,d.falls),M(y,d.lands)}E.style.transform="perspective(5em) rotateX(-90deg)",wr(E,d.falls,{delay:a,duration:c*r,fill:"backwards"}),y.style.transform="perspective(5em) rotateX(90deg)",wr(y,d.lands,{delay:a,duration:c*r,fill:"forwards"}),s.style.height=`${n}px`,g.append(_,x,y,E),s.replaceChildren(g)}var Pg=new WeakMap,th=new WeakSet,jl=s=>`translateX(${s}px)`,Kl=s=>`scale(${s})`,Zl=s=>String(Math.max(0,Math.min(1,s))),Jl=s=>"transition"in s&&s.transition==="direct";function Dg(s){if(s.duration!==void 0&&(!Number.isFinite(s.duration)||s.duration<0||s.duration>1e4))throw RangeError("duration must be between 0 and 10000 milliseconds");if(s.flipDuration!==void 0&&(!Number.isFinite(s.flipDuration)||s.flipDuration<1||s.flipDuration>1e4))throw RangeError("flipDuration must be between 1 and 10000 milliseconds")}var Ig={validate(s){if(typeof s.value!="number"&&typeof s.value!="bigint")throw TypeError("value must be a number or bigint");Dg(s)},model:s=>vg(s.value,s),direction:xg};class Lg{host;source;options;target;displayed;semantic;measurement;visual;measures=new Map;columns=new Map;sizes=new Map;scheduler;enhanced=!1;destroyed=!1;visible=!0;reset=!0;measurementPending=!1;hadClass;previousLeft;blur;blurIntensity=1;constructor(e,t,i){this.host=e,this.source=i,i.validate(t),this.options={...t},this.target=this.displayed=i.model(t);let n=e.ownerDocument,r=o=>{let l=n.createElement("span");return l.className=o,l};this.semantic=r("rn-value"),this.measurement=r("rn-measure"),this.visual=r("rn-visual"),this.measurement.setAttribute("aria-hidden","true"),this.visual.setAttribute("aria-hidden","true"),this.semantic.textContent=this.target.text,this.hadClass=e.classList.contains("rn-root"),e.classList.add("rn-root"),e.replaceChildren(this.semantic,this.measurement,this.visual);let a=n.defaultView;a&&typeof a.matchMedia=="function"&&typeof a.requestAnimationFrame=="function"&&typeof e.animate=="function"&&(this.scheduler=Mu.for(a),this.scheduler.add(this,e),this.scheduler.watch(this.measurement,this)),this.prepare()}canAnimate(){return!!this.scheduler&&this.options.animated!==!1&&(this.options.duration??500)>0&&!this.scheduler.media.matches&&!this.host.ownerDocument.hidden&&(this.visible||this.options.pauseOffscreen===!1)&&this.target.rollable&&this.host.isConnected}update(e){if(this.destroyed)return;let t={...this.options,...e};this.source.validate(t);let i=this.source.model(t),n=i.text===this.target.text&&i.signature===this.target.signature;if(this.options.motionBlur&&!t.motionBlur&&(this.blur?.destroy(),this.blur=void 0,Cg(this.visual)),Jl(this.options)!==Jl(t)&&(this.reset=!0),this.options=t,this.target=i,!this.canAnimate()){this.finish();return}n&&this.enhanced&&!this.reset||(this.semantic.textContent=i.text,this.prepare())}prepare(){if(!this.canAnimate()){this.finish();return}this.measurementPending=!0,this.scheduler?.enqueue(this)}stage(){if(!this.destroyed)return this.canAnimate()?(this.previousLeft=this.enhanced&&!this.reset?this.measurement.getBoundingClientRect().left:void 0,()=>this.stageMeasurement()):()=>this.finish()}stageMeasurement(){let e=new Set(this.target.tokens.map(i=>i.key));for(let[i,n]of this.measures)e.has(i)||(this.scheduler?.unwatch(n),this.sizes.delete(n),n.remove(),this.measures.delete(i));let t=null;for(let i of this.target.tokens){let n=this.measures.get(i.key);n||(n=this.host.ownerDocument.createElement("span"),n.className="rn-token",this.measures.set(i.key,n),this.scheduler?.watch(n,this)),n.textContent!==i.text&&(n.textContent=i.text);let r=t?t.nextSibling:this.measurement.firstChild;n!==r&&this.measurement.insertBefore(n,r),t=n}this.host.dataset.rnMeasuring=""}measure(){if(this.destroyed)return;if(!this.canAnimate())return()=>this.finish();let e=this.measurement.getBoundingClientRect(),t=this.host.ownerDocument.defaultView;if(!t)return()=>this.finish();let i=t.getComputedStyle(this.measurement);if(i.direction==="rtl")return()=>this.finish();let n=parseFloat(i.width),r=parseFloat(i.height);if(!n||!r||!e.width||!e.height)return()=>this.finish();let a=e.width/n,o=e.height/r,l=parseFloat(i.getPropertyValue("--rn-blur"));this.blurIntensity=Number.isFinite(l)?Math.max(0,l):1,this.sizes.set(this.measurement,{width:n,height:r});let c=new Map;for(let[d,u]of this.measures){let f=u.getBoundingClientRect(),p={width:f.width/a,height:f.height/o};this.sizes.set(u,p),c.set(d,{...p,x:(f.left-e.left)/a,y:(f.top-e.top)/o})}let h=this.previousLeft===void 0?0:(this.previousLeft-e.left)/a;return()=>this.commit(c,h)}makeColumn(e){let t=this.host.ownerDocument.createElement("span");t.className="rn-slot",t.dataset.rnKey=e.key,e.index!==void 0&&(t.dataset.rnWheel=""),this.options.mode==="flap"&&(t.dataset.rnFlap="");let i=this.host.ownerDocument.createElement("span");return i.className="rn-reel",t.append(i),this.visual.append(t),{token:e,element:t,reel:i,x:new Ar(t,"transform"),opacity:new Ar(t,"opacity"),roll:new Ar(i,"transform"),exiting:!1,height:0,width:0}}face(e,t){let i=this.host.ownerDocument.createElement("span");i.className="rn-face",i.textContent=t,i.style.height=`${e.height}px`;let n=e.reel.children.length;i.style.position="absolute",i.style.top="0",i.style.left="0",i.style.width="100%",i.style.transform=`translateY(${n*e.height}px)`,e.reel.style.height=`${(n+1)*e.height}px`,e.reel.append(i)}rest(e){this.blur?.remove(e.reel),e.reel.replaceChildren(),e.reel.style.removeProperty("height"),this.face(e,e.token.text),this.wrapInk(e),e.token.index===void 0?e.roll.set(1,Kl):e.roll.set(e.token.index,()=>"translateY(0px)")}wrapInk(e){if(this.options.mode==="flap")return;let t=this.host.ownerDocument.createElement("span");t.className="rn-ink",t.append(...e.reel.childNodes),e.reel.append(t)}finishEntry(e){e.entry&&(e.entry.blurred&&this.blur?.remove(e.reel),e.entry.track.cancel(),e.entry.element.replaceWith(e.reel),e.entry=void 0)}enter(e,t,i,n){let r=this.host.ownerDocument.createElement("span");r.className="rn-enter",e.reel.replaceWith(r),r.append(e.reel);let a=new Ar(r,"transform");e.entry={element:r,track:a,blurred:!1};let o=ao(yg(e.height*(n?.entryDistance??1),n?.entryDuration??t,n?.entryHold),i);if(this.options.motionBlur&&e.token.text.trim()){this.blur??=new $l(this.host),this.blur.intensity=this.blurIntensity;let l={...o,points:o.points.map(c=>c/e.height)};e.entry.blurred=this.blur.apply(e.reel,l,e.height,0,"entry")}a.play(o,l=>`translateY(${l}px)`,()=>this.finishEntry(e))}commit(e,t){if(this.destroyed)return;this.measurementPending=!1;let i=this.enhanced&&!this.reset,n=i?this.options.duration??500:0,r=Pg.get(this.host),a=n?r?.widthDuration??n:0,o=this.options.mode==="flap",l=this.options.direction==="up"?1:this.options.direction==="down"?-1:this.source.direction(this.displayed,this.target);this.target.text!==this.displayed.text&&(this.host.dataset.rnTrend=l>0?"up":l<0?"down":"none");let c=new Map([...this.columns].map(([y,M])=>{let w=M.x.read();return[y,{...w,x:w.position,width:M.width}]})),h=Nd(this.target.tokens.map(y=>y.key),c),d=[...c.keys()].sort((y,M)=>c.get(y).x-c.get(M).x),u=Nd(d,e),f=new Map(this.displayed.tokens.filter(y=>y.index===void 0).map(y=>[y.identity,y.key])),p=new Map(this.target.tokens.filter(y=>y.index===void 0).map(y=>[y.identity,y.key])),g=this.options.stagger==="start"||this.options.stagger==="end",m=this.target.tokens.map(y=>{let M=this.columns.get(y.key);return!M||M.exiting||g&&y.index!==void 0&&M.token.text!==y.text}),_=Sg(this.target.tokens.map((y,M)=>y.index!==void 0&&!m[M]),this.options.stagger),x=Math.max(0,...this.target.tokens.map((y,M)=>m[M]?_[M]-1:0)),E=Math.min(n*.045,n*.3/Math.max(1,x));for(let[y,M]of this.target.tokens.entries()){let w=e.get(M.key);if(!w)continue;let A=Math.max(0,_[y]-1)*E,v=f.get(M.identity),S=v!==void 0&&v!==M.key?c.get(v):void 0,P=this.columns.get(M.key),C=!P;if(!P){P=this.makeColumn(M),this.columns.set(M.key,P);let F=(S?.x??h.get(M.key)??w.x)+t;P.x.set(i?F+(w.x-F)*(S?0:r?.entryOrigin??0):w.x,jl),P.opacity.set(i?0:1,Zl)}let N=P.token.text!==M.text,O=Math.abs(P.height-w.height)>.1,V=P.exiting;P.exiting=!1,P.element.style.width=`${w.width}px`,P.element.style.height=`${w.height}px`,P.element.style.top=`${w.y}px`;let B=c.get(M.key);if(P.x.play(ts(B?B.position+t:P.x.read().position,w.x,B?.velocity??0,a),jl),C||V||!i){let F=P.opacity.read(),L=ts(F.position,1,F.velocity,M.index===void 0?Math.min(n,180):n?r?.fadeDuration??n:0),K=!o&&M.identity.startsWith("group:")&&!S?(r?.entryDuration??n)*(r?.entryHold??.14):0;P.opacity.play(C?ao(L,A+K):L,Zl)}if(P.height=w.height,P.width=w.width,(!i||O)&&this.finishEntry(P),C&&o&&M.wheel&&n&&P.roll.set(Math.max(0,M.wheel.indexOf(" ")),()=>"translateY(0px)"),o&&!O&&(N||C)&&M.index!==void 0&&M.wheel&&n&&P.roll.read().position!==M.index){let F=P.roll.read(),L=Math.round(F.position),K=Ld(L,M.index,l,M.wheel.length),q=this.options.flipDuration??Tg(n);this.blur?.remove(P.reel);let ie;this.options.motionBlur&&this.blurIntensity>0&&(this.blur??=new $l(this.host),this.blur.intensity=this.blurIntensity,ie=this.blur.filterUrl(w.height)),Rg(P.reel,M.wheel,L,K,w.height,q,A,ie),P.token=M;let ue=P;P.roll.play(ao(wg(L,K,q),A),()=>"translateY(0px)",()=>this.rest(ue))}else if(!C&&!O&&N&&M.index!==void 0&&M.wheel&&P.token.index!==void 0&&n){let F=P.roll.read(),L=Jl(this.options)?bg(P.token.wheel,F.position,M.text):void 0,K=L?.from??F.position,q=L?.target??Ld(F.position,M.index,l,M.wheel.length),ie=L?.wheel??M.wheel,ue=L?Math.min(Math.max(0,F.velocity),(q-K)*1e4/n):F.velocity,ne=g?ao(ts(K,q,ue,n),A):ts(K,q,ue,n),Z=Math.floor(Math.min(...ne.points)),ae=Math.ceil(Math.max(...ne.points));P.entry&&(P.entry.blurred=!1);let ve=this.blur?.remove(P.reel)??0;P.reel.replaceChildren();for(let J=Z;J<=ae;J++)this.face(P,ll(ie,J));this.wrapInk(P),this.options.motionBlur&&(this.blur??=new $l(this.host),this.blur.intensity=this.blurIntensity,this.blur.apply(P.reel,ne,w.height,ve)),P.token=L?{...M,wheel:ie,index:q}:M;let W=P;P.roll.play(ne,J=>`translateY(${(Z-J)*w.height}px)`,()=>this.rest(W))}else(C||O||N||!i)&&(P.token=M,this.rest(P));if(C&&n&&M.index!==void 0&&!o&&this.enter(P,n,A,r),S&&n&&(C||V)){let F=P.roll.read(),L=P;P.roll.play(ts(C?.96:F.position,1,F.velocity,Math.min(n,180)),Kl,()=>this.rest(L))}}for(let[y,M]of this.columns){if(e.has(y))continue;let w=c.get(y),A=p.get(M.token.identity),v=A?e.get(A):void 0;if(M.x.play(ts(w.position+t,v?.x??u.get(y)??w.position,w.velocity,a),jl),M.exiting)continue;if(M.exiting=!0,v&&n){let P=M.roll.read();M.roll.play(ts(P.position,1.04,P.velocity,Math.min(n,180)),Kl)}let S=M.opacity.read();M.opacity.play(ts(S.position,0,S.velocity,M.token.index===void 0?Math.min(n,180):n*.65),Zl,()=>{M.exiting&&(this.removeColumn(M),this.columns.delete(y))})}this.enhanced=!0,this.reset=!1,this.displayed=this.target,this.host.dataset.rnReady=""}removeColumn(e){this.blur?.remove(e.reel),this.finishEntry(e),e.x.cancel(),e.roll.cancel(),e.opacity.cancel(),e.element.remove()}refresh(){this.destroyed||(this.reset=!0,this.prepare())}sizeChanged(e,t,i){if(this.measurementPending||!this.host.hasAttribute("data-rn-measuring"))return!1;let n=this.sizes.get(e);return!n||Math.abs(n.width-t)>.2||Math.abs(n.height-i)>.2}visibility(e){this.visible!==e&&(this.visible=e,(e||this.options.pauseOffscreen!==!1)&&this.refresh())}finish(){if(!this.destroyed){this.measurementPending=!1;for(let e of this.columns.values())this.removeColumn(e);this.columns.clear(),this.blur?.destroy(),this.blur=void 0,this.semantic.textContent=this.target.text,delete this.host.dataset.rnReady,delete this.host.dataset.rnMeasuring,delete this.host.dataset.rnTrend,this.enhanced=!1,this.reset=!0,this.displayed=this.target}}destroy(){if(!this.destroyed){this.finish(),this.destroyed=!0;for(let e of this.measures.values())this.scheduler?.unwatch(e);this.scheduler?.unwatch(this.measurement),this.scheduler?.remove(this,this.host),this.host.replaceChildren(this.host.ownerDocument.createTextNode(this.target.text)),!this.hadClass&&this.host.classList.remove("rn-root"),th.delete(this.host)}}}function Rl(s,e){if(th.has(s))throw Error("A rolling number is already mounted on this element");let t=new Lg(s,e,Ig);return th.add(s),t}const bu="183",Dr={ROTATE:0,DOLLY:1,PAN:2},Cr={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Ng=0,Fd=1,Og=2,qo=1,Xp=2,Ea=3,$n=0,vi=1,rn=2,ai=0,Ir=1,kd=2,Bd=3,zd=4,Yp=5,Vn=100,Ug=101,Fg=102,kg=103,Bg=104,ih=200,zg=201,Vg=202,Hg=203,nh=204,sh=205,qp=206,Gg=207,$p=208,Wg=209,Xg=210,Yg=211,qg=212,$g=213,jg=214,rh=0,ah=1,oh=2,Hr=3,lh=4,ch=5,hh=6,uh=7,Su=0,Kg=1,Zg=2,An=0,Eu=1,Tu=2,wu=3,eo=4,Au=5,Cu=6,Ru=7,Vd="attached",Jg="detached",jp=300,$s=301,Gr=302,Ql=303,ec=304,Pl=306,bs=1e3,bn=1001,cl=1002,Ot=1003,Kp=1004,Ta=1005,Kt=1006,$o=1007,Hn=1008,Oi=1009,Zp=1010,Jp=1011,ka=1012,Pu=1013,Cn=1014,Fi=1015,Gi=1016,Du=1017,Iu=1018,Wr=1020,Qp=35902,em=35899,tm=1021,im=1022,Ki=1023,jn=1026,fs=1027,Dl=1028,Lu=1029,Xr=1030,Nu=1031,Ou=1033,jo=33776,Ko=33777,Zo=33778,Jo=33779,dh=35840,fh=35841,ph=35842,mh=35843,gh=36196,_h=37492,vh=37496,xh=37488,yh=37489,Mh=37490,bh=37491,Sh=37808,Eh=37809,Th=37810,wh=37811,Ah=37812,Ch=37813,Rh=37814,Ph=37815,Dh=37816,Ih=37817,Lh=37818,Nh=37819,Oh=37820,Uh=37821,Fh=36492,kh=36494,Bh=36495,zh=36283,Vh=36284,Hh=36285,Gh=36286,Ba=2300,za=2301,tc=2302,Hd=2303,Gd=2400,Wd=2401,Xd=2402,Qg=2500,e_=0,nm=1,Wh=2,t_=3200,i_=3201,Il=0,n_=1,us="",Gt="srgb",yi="srgb-linear",hl="linear",lt="srgb",rr=7680,Yd=519,s_=512,r_=513,a_=514,Uu=515,o_=516,l_=517,Fu=518,c_=519,Xh=35044,h_=35048,qd="300 es",Sn=2e3,Va=2001;function u_(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function d_(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function Ha(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function f_(){const s=Ha("canvas");return s.style.display="block",s}const $d={};function ul(...s){const e="THREE."+s.shift();console.log(e,...s)}function sm(s){const e=s[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=s[1];t&&t.isStackTrace?s[0]+=" "+t.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function Pe(...s){s=sm(s);const e="THREE."+s.shift();{const t=s[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...s)}}function Ue(...s){s=sm(s);const e="THREE."+s.shift();{const t=s[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...s)}}function dl(...s){const e=s.join(" ");e in $d||($d[e]=!0,Pe(...s))}function p_(s,e,t){return new Promise(function(i,n){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:n();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}const m_={[rh]:ah,[oh]:hh,[lh]:uh,[Hr]:ch,[ah]:rh,[hh]:oh,[uh]:lh,[ch]:Hr};class Js{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const n=i[e];if(n!==void 0){const r=n.indexOf(t);r!==-1&&n.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const n=i.slice(0);for(let r=0,a=n.length;r<a;r++)n[r].call(this,e);e.target=null}}}const ci=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let jd=1234567;const Da=Math.PI/180,Yr=180/Math.PI;function ln(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(ci[s&255]+ci[s>>8&255]+ci[s>>16&255]+ci[s>>24&255]+"-"+ci[e&255]+ci[e>>8&255]+"-"+ci[e>>16&15|64]+ci[e>>24&255]+"-"+ci[t&63|128]+ci[t>>8&255]+"-"+ci[t>>16&255]+ci[t>>24&255]+ci[i&255]+ci[i>>8&255]+ci[i>>16&255]+ci[i>>24&255]).toLowerCase()}function qe(s,e,t){return Math.max(e,Math.min(t,s))}function ku(s,e){return(s%e+e)%e}function g_(s,e,t,i,n){return i+(s-e)*(n-i)/(t-e)}function __(s,e,t){return s!==e?(t-s)/(e-s):0}function Ia(s,e,t){return(1-t)*s+t*e}function v_(s,e,t,i){return Ia(s,e,1-Math.exp(-t*i))}function x_(s,e=1){return e-Math.abs(ku(s,e*2)-e)}function y_(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function M_(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function b_(s,e){return s+Math.floor(Math.random()*(e-s+1))}function S_(s,e){return s+Math.random()*(e-s)}function E_(s){return s*(.5-Math.random())}function T_(s){s!==void 0&&(jd=s);let e=jd+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function w_(s){return s*Da}function A_(s){return s*Yr}function C_(s){return(s&s-1)===0&&s!==0}function R_(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function P_(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function D_(s,e,t,i,n){const r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+i)/2),h=a((e+i)/2),d=r((e-i)/2),u=a((e-i)/2),f=r((i-e)/2),p=a((i-e)/2);switch(n){case"XYX":s.set(o*h,l*d,l*u,o*c);break;case"YZY":s.set(l*u,o*h,l*d,o*c);break;case"ZXZ":s.set(l*d,l*u,o*h,o*c);break;case"XZX":s.set(o*h,l*p,l*f,o*c);break;case"YXY":s.set(l*f,o*h,l*p,o*c);break;case"ZYZ":s.set(l*p,l*f,o*h,o*c);break;default:Pe("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+n)}}function an(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function ht(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const $e={DEG2RAD:Da,RAD2DEG:Yr,generateUUID:ln,clamp:qe,euclideanModulo:ku,mapLinear:g_,inverseLerp:__,lerp:Ia,damp:v_,pingpong:x_,smoothstep:y_,smootherstep:M_,randInt:b_,randFloat:S_,randFloatSpread:E_,seededRandom:T_,degToRad:w_,radToDeg:A_,isPowerOfTwo:C_,ceilPowerOfTwo:R_,floorPowerOfTwo:P_,setQuaternionFromProperEuler:D_,normalize:ht,denormalize:an};class De{constructor(e=0,t=0){De.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,n=e.elements;return this.x=n[0]*t+n[3]*i+n[6],this.y=n[1]*t+n[4]*i+n[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(qe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(qe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),n=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*n+e.x,this.y=r*n+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class cn{constructor(e=0,t=0,i=0,n=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=n}static slerpFlat(e,t,i,n,r,a,o){let l=i[n+0],c=i[n+1],h=i[n+2],d=i[n+3],u=r[a+0],f=r[a+1],p=r[a+2],g=r[a+3];if(d!==g||l!==u||c!==f||h!==p){let m=l*u+c*f+h*p+d*g;m<0&&(u=-u,f=-f,p=-p,g=-g,m=-m);let _=1-o;if(m<.9995){const x=Math.acos(m),E=Math.sin(x);_=Math.sin(_*x)/E,o=Math.sin(o*x)/E,l=l*_+u*o,c=c*_+f*o,h=h*_+p*o,d=d*_+g*o}else{l=l*_+u*o,c=c*_+f*o,h=h*_+p*o,d=d*_+g*o;const x=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=x,c*=x,h*=x,d*=x}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,n,r,a){const o=i[n],l=i[n+1],c=i[n+2],h=i[n+3],d=r[a],u=r[a+1],f=r[a+2],p=r[a+3];return e[t]=o*p+h*d+l*f-c*u,e[t+1]=l*p+h*u+c*d-o*f,e[t+2]=c*p+h*f+o*u-l*d,e[t+3]=h*p-o*d-l*u-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,n){return this._x=e,this._y=t,this._z=i,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,n=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(n/2),d=o(r/2),u=l(i/2),f=l(n/2),p=l(r/2);switch(a){case"XYZ":this._x=u*h*d+c*f*p,this._y=c*f*d-u*h*p,this._z=c*h*p+u*f*d,this._w=c*h*d-u*f*p;break;case"YXZ":this._x=u*h*d+c*f*p,this._y=c*f*d-u*h*p,this._z=c*h*p-u*f*d,this._w=c*h*d+u*f*p;break;case"ZXY":this._x=u*h*d-c*f*p,this._y=c*f*d+u*h*p,this._z=c*h*p+u*f*d,this._w=c*h*d-u*f*p;break;case"ZYX":this._x=u*h*d-c*f*p,this._y=c*f*d+u*h*p,this._z=c*h*p-u*f*d,this._w=c*h*d+u*f*p;break;case"YZX":this._x=u*h*d+c*f*p,this._y=c*f*d+u*h*p,this._z=c*h*p-u*f*d,this._w=c*h*d-u*f*p;break;case"XZY":this._x=u*h*d-c*f*p,this._y=c*f*d-u*h*p,this._z=c*h*p+u*f*d,this._w=c*h*d+u*f*p;break;default:Pe("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,n=Math.sin(i);return this._x=e.x*n,this._y=e.y*n,this._z=e.z*n,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],n=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],d=t[10],u=i+o+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-n)*f}else if(i>o&&i>d){const f=2*Math.sqrt(1+i-o-d);this._w=(h-l)/f,this._x=.25*f,this._y=(n+a)/f,this._z=(r+c)/f}else if(o>d){const f=2*Math.sqrt(1+o-i-d);this._w=(r-c)/f,this._x=(n+a)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+d-i-o);this._w=(a-n)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(qe(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const n=Math.min(1,t/i);return this.slerp(e,n),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,n=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=i*h+a*o+n*c-r*l,this._y=n*h+a*l+r*o-i*c,this._z=r*h+a*c+i*l-n*o,this._w=a*h-i*o-n*l-r*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,n=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,n=-n,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+i*t,this._y=this._y*l+n*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+n*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),n=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(n*Math.sin(e),n*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class D{constructor(e=0,t=0,i=0){D.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Kd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Kd.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,n=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*n,this.y=r[1]*t+r[4]*i+r[7]*n,this.z=r[2]*t+r[5]*i+r[8]*n,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,n=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*n+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*n+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*n+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*n+r[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,n=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*n-o*i),h=2*(o*t-r*n),d=2*(r*i-a*t);return this.x=t+l*c+a*d-o*h,this.y=i+l*h+o*c-r*d,this.z=n+l*d+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,n=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*n,this.y=r[1]*t+r[5]*i+r[9]*n,this.z=r[2]*t+r[6]*i+r[10]*n,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this.z=qe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this.z=qe(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(qe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,n=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=n*l-r*o,this.y=r*a-i*l,this.z=i*o-n*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return ic.copy(this).projectOnVector(e),this.sub(ic)}reflect(e){return this.sub(ic.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(qe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,n=this.z-e.z;return t*t+i*i+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const n=Math.sin(t)*e;return this.x=n*Math.sin(i),this.y=Math.cos(t)*e,this.z=n*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),n=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=n,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ic=new D,Kd=new cn;class We{constructor(e,t,i,n,r,a,o,l,c){We.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,n,r,a,o,l,c)}set(e,t,i,n,r,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=n,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,n=t.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],h=i[4],d=i[7],u=i[2],f=i[5],p=i[8],g=n[0],m=n[3],_=n[6],x=n[1],E=n[4],y=n[7],M=n[2],w=n[5],A=n[8];return r[0]=a*g+o*x+l*M,r[3]=a*m+o*E+l*w,r[6]=a*_+o*y+l*A,r[1]=c*g+h*x+d*M,r[4]=c*m+h*E+d*w,r[7]=c*_+h*y+d*A,r[2]=u*g+f*x+p*M,r[5]=u*m+f*E+p*w,r[8]=u*_+f*y+p*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],n=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-i*r*h+i*o*l+n*r*c-n*a*l}invert(){const e=this.elements,t=e[0],i=e[1],n=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=h*a-o*c,u=o*l-h*r,f=c*r-a*l,p=t*d+i*u+n*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/p;return e[0]=d*g,e[1]=(n*c-h*i)*g,e[2]=(o*i-n*a)*g,e[3]=u*g,e[4]=(h*t-n*l)*g,e[5]=(n*r-o*t)*g,e[6]=f*g,e[7]=(i*l-c*t)*g,e[8]=(a*t-i*r)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,n,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-n*c,n*l,-n*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(nc.makeScale(e,t)),this}rotate(e){return this.premultiply(nc.makeRotation(-e)),this}translate(e,t){return this.premultiply(nc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let n=0;n<9;n++)if(t[n]!==i[n])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const nc=new We,Zd=new We().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Jd=new We().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function I_(){const s={enabled:!0,workingColorSpace:yi,spaces:{},convert:function(n,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===lt&&(n.r=Xn(n.r),n.g=Xn(n.g),n.b=Xn(n.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(n.applyMatrix3(this.spaces[r].toXYZ),n.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===lt&&(n.r=Lr(n.r),n.g=Lr(n.g),n.b=Lr(n.b))),n},workingToColorSpace:function(n,r){return this.convert(n,this.workingColorSpace,r)},colorSpaceToWorking:function(n,r){return this.convert(n,r,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===us?hl:this.spaces[n].transfer},getToneMappingMode:function(n){return this.spaces[n].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(n,r=this.workingColorSpace){return n.fromArray(this.spaces[r].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,r,a){return n.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(n,r){return dl("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(n,r)},toWorkingColorSpace:function(n,r){return dl("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(n,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return s.define({[yi]:{primaries:e,whitePoint:i,transfer:hl,toXYZ:Zd,fromXYZ:Jd,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Gt},outputColorSpaceConfig:{drawingBufferColorSpace:Gt}},[Gt]:{primaries:e,whitePoint:i,transfer:lt,toXYZ:Zd,fromXYZ:Jd,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Gt}}}),s}const Ze=I_();function Xn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Lr(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let ar;class L_{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{ar===void 0&&(ar=Ha("canvas")),ar.width=e.width,ar.height=e.height;const n=ar.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),i=ar}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ha("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const n=i.getImageData(0,0,e.width,e.height),r=n.data;for(let a=0;a<r.length;a++)r[a]=Xn(r[a]/255)*255;return i.putImageData(n,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Xn(t[i]/255)*255):t[i]=Xn(t[i]);return{data:t,width:e.width,height:e.height}}else return Pe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let N_=0;class Bu{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:N_++}),this.uuid=ln(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},n=this.data;if(n!==null){let r;if(Array.isArray(n)){r=[];for(let a=0,o=n.length;a<o;a++)n[a].isDataTexture?r.push(sc(n[a].image)):r.push(sc(n[a]))}else r=sc(n);i.url=r}return t||(e.images[this.uuid]=i),i}}function sc(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?L_.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(Pe("Texture: Unable to serialize Texture."),{})}let O_=0;const rc=new D;class Zt extends Js{constructor(e=Zt.DEFAULT_IMAGE,t=Zt.DEFAULT_MAPPING,i=bn,n=bn,r=Kt,a=Hn,o=Ki,l=Oi,c=Zt.DEFAULT_ANISOTROPY,h=us){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:O_++}),this.uuid=ln(),this.name="",this.source=new Bu(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=n,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new De(0,0),this.repeat=new De(1,1),this.center=new De(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new We,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(rc).x}get height(){return this.source.getSize(rc).y}get depth(){return this.source.getSize(rc).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Pe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const n=this[t];if(n===void 0){Pe(`Texture.setValues(): property '${t}' does not exist.`);continue}n&&i&&n.isVector2&&i.isVector2||n&&i&&n.isVector3&&i.isVector3||n&&i&&n.isMatrix3&&i.isMatrix3?n.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==jp)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case bs:e.x=e.x-Math.floor(e.x);break;case bn:e.x=e.x<0?0:1;break;case cl:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case bs:e.y=e.y-Math.floor(e.y);break;case bn:e.y=e.y<0?0:1;break;case cl:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Zt.DEFAULT_IMAGE=null;Zt.DEFAULT_MAPPING=jp;Zt.DEFAULT_ANISOTROPY=1;class Tt{constructor(e=0,t=0,i=0,n=1){Tt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=n}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,n){return this.x=e,this.y=t,this.z=i,this.w=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,n=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*n+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*n+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*n+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*n+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,n,r;const l=e.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],p=l[9],g=l[2],m=l[6],_=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-g)<.01&&Math.abs(p-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+g)<.1&&Math.abs(p+m)<.1&&Math.abs(c+f+_-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const E=(c+1)/2,y=(f+1)/2,M=(_+1)/2,w=(h+u)/4,A=(d+g)/4,v=(p+m)/4;return E>y&&E>M?E<.01?(i=0,n=.707106781,r=.707106781):(i=Math.sqrt(E),n=w/i,r=A/i):y>M?y<.01?(i=.707106781,n=0,r=.707106781):(n=Math.sqrt(y),i=w/n,r=v/n):M<.01?(i=.707106781,n=.707106781,r=0):(r=Math.sqrt(M),i=A/r,n=v/r),this.set(i,n,r,t),this}let x=Math.sqrt((m-p)*(m-p)+(d-g)*(d-g)+(u-h)*(u-h));return Math.abs(x)<.001&&(x=1),this.x=(m-p)/x,this.y=(d-g)/x,this.z=(u-h)/x,this.w=Math.acos((c+f+_-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this.z=qe(this.z,e.z,t.z),this.w=qe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this.z=qe(this.z,e,t),this.w=qe(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(qe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class U_ extends Js{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Kt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new Tt(0,0,e,t),this.scissorTest=!1,this.viewport=new Tt(0,0,e,t),this.textures=[];const n={width:e,height:t,depth:i.depth},r=new Zt(n),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:Kt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let n=0,r=this.textures.length;n<r;n++)this.textures[n].image.width=e,this.textures[n].image.height=t,this.textures[n].image.depth=i,this.textures[n].isData3DTexture!==!0&&(this.textures[n].isArrayTexture=this.textures[n].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const n=Object.assign({},e.textures[t].image);this.textures[t].source=new Bu(n)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ei extends U_{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class rm extends Zt{constructor(e=null,t=1,i=1,n=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:n},this.magFilter=Ot,this.minFilter=Ot,this.wrapR=bn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class F_ extends Zt{constructor(e=null,t=1,i=1,n=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:n},this.magFilter=Ot,this.minFilter=Ot,this.wrapR=bn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class He{constructor(e,t,i,n,r,a,o,l,c,h,d,u,f,p,g,m){He.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,n,r,a,o,l,c,h,d,u,f,p,g,m)}set(e,t,i,n,r,a,o,l,c,h,d,u,f,p,g,m){const _=this.elements;return _[0]=e,_[4]=t,_[8]=i,_[12]=n,_[1]=r,_[5]=a,_[9]=o,_[13]=l,_[2]=c,_[6]=h,_[10]=d,_[14]=u,_[3]=f,_[7]=p,_[11]=g,_[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new He().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,i=e.elements,n=1/or.setFromMatrixColumn(e,0).length(),r=1/or.setFromMatrixColumn(e,1).length(),a=1/or.setFromMatrixColumn(e,2).length();return t[0]=i[0]*n,t[1]=i[1]*n,t[2]=i[2]*n,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,n=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(n),c=Math.sin(n),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){const u=a*h,f=a*d,p=o*h,g=o*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=f+p*c,t[5]=u-g*c,t[9]=-o*l,t[2]=g-u*c,t[6]=p+f*c,t[10]=a*l}else if(e.order==="YXZ"){const u=l*h,f=l*d,p=c*h,g=c*d;t[0]=u+g*o,t[4]=p*o-f,t[8]=a*c,t[1]=a*d,t[5]=a*h,t[9]=-o,t[2]=f*o-p,t[6]=g+u*o,t[10]=a*l}else if(e.order==="ZXY"){const u=l*h,f=l*d,p=c*h,g=c*d;t[0]=u-g*o,t[4]=-a*d,t[8]=p+f*o,t[1]=f+p*o,t[5]=a*h,t[9]=g-u*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const u=a*h,f=a*d,p=o*h,g=o*d;t[0]=l*h,t[4]=p*c-f,t[8]=u*c+g,t[1]=l*d,t[5]=g*c+u,t[9]=f*c-p,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const u=a*l,f=a*c,p=o*l,g=o*c;t[0]=l*h,t[4]=g-u*d,t[8]=p*d+f,t[1]=d,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*d+p,t[10]=u-g*d}else if(e.order==="XZY"){const u=a*l,f=a*c,p=o*l,g=o*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=u*d+g,t[5]=a*h,t[9]=f*d-p,t[2]=p*d-f,t[6]=o*h,t[10]=g*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(k_,e,B_)}lookAt(e,t,i){const n=this.elements;return Di.subVectors(e,t),Di.lengthSq()===0&&(Di.z=1),Di.normalize(),is.crossVectors(i,Di),is.lengthSq()===0&&(Math.abs(i.z)===1?Di.x+=1e-4:Di.z+=1e-4,Di.normalize(),is.crossVectors(i,Di)),is.normalize(),oo.crossVectors(Di,is),n[0]=is.x,n[4]=oo.x,n[8]=Di.x,n[1]=is.y,n[5]=oo.y,n[9]=Di.y,n[2]=is.z,n[6]=oo.z,n[10]=Di.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,n=t.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],h=i[1],d=i[5],u=i[9],f=i[13],p=i[2],g=i[6],m=i[10],_=i[14],x=i[3],E=i[7],y=i[11],M=i[15],w=n[0],A=n[4],v=n[8],S=n[12],P=n[1],C=n[5],N=n[9],O=n[13],V=n[2],B=n[6],F=n[10],L=n[14],K=n[3],q=n[7],ie=n[11],ue=n[15];return r[0]=a*w+o*P+l*V+c*K,r[4]=a*A+o*C+l*B+c*q,r[8]=a*v+o*N+l*F+c*ie,r[12]=a*S+o*O+l*L+c*ue,r[1]=h*w+d*P+u*V+f*K,r[5]=h*A+d*C+u*B+f*q,r[9]=h*v+d*N+u*F+f*ie,r[13]=h*S+d*O+u*L+f*ue,r[2]=p*w+g*P+m*V+_*K,r[6]=p*A+g*C+m*B+_*q,r[10]=p*v+g*N+m*F+_*ie,r[14]=p*S+g*O+m*L+_*ue,r[3]=x*w+E*P+y*V+M*K,r[7]=x*A+E*C+y*B+M*q,r[11]=x*v+E*N+y*F+M*ie,r[15]=x*S+E*O+y*L+M*ue,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],n=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],d=e[6],u=e[10],f=e[14],p=e[3],g=e[7],m=e[11],_=e[15],x=l*f-c*u,E=o*f-c*d,y=o*u-l*d,M=a*f-c*h,w=a*u-l*h,A=a*d-o*h;return t*(g*x-m*E+_*y)-i*(p*x-m*M+_*w)+n*(p*E-g*M+_*A)-r*(p*y-g*w+m*A)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const n=this.elements;return e.isVector3?(n[12]=e.x,n[13]=e.y,n[14]=e.z):(n[12]=e,n[13]=t,n[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],n=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=e[9],u=e[10],f=e[11],p=e[12],g=e[13],m=e[14],_=e[15],x=t*o-i*a,E=t*l-n*a,y=t*c-r*a,M=i*l-n*o,w=i*c-r*o,A=n*c-r*l,v=h*g-d*p,S=h*m-u*p,P=h*_-f*p,C=d*m-u*g,N=d*_-f*g,O=u*_-f*m,V=x*O-E*N+y*C+M*P-w*S+A*v;if(V===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const B=1/V;return e[0]=(o*O-l*N+c*C)*B,e[1]=(n*N-i*O-r*C)*B,e[2]=(g*A-m*w+_*M)*B,e[3]=(u*w-d*A-f*M)*B,e[4]=(l*P-a*O-c*S)*B,e[5]=(t*O-n*P+r*S)*B,e[6]=(m*y-p*A-_*E)*B,e[7]=(h*A-u*y+f*E)*B,e[8]=(a*N-o*P+c*v)*B,e[9]=(i*P-t*N-r*v)*B,e[10]=(p*w-g*y+_*x)*B,e[11]=(d*y-h*w-f*x)*B,e[12]=(o*S-a*C-l*v)*B,e[13]=(t*C-i*S+n*v)*B,e[14]=(g*E-p*M-m*x)*B,e[15]=(h*M-d*E+u*x)*B,this}scale(e){const t=this.elements,i=e.x,n=e.y,r=e.z;return t[0]*=i,t[4]*=n,t[8]*=r,t[1]*=i,t[5]*=n,t[9]*=r,t[2]*=i,t[6]*=n,t[10]*=r,t[3]*=i,t[7]*=n,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],n=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,n))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),n=Math.sin(t),r=1-i,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+i,c*o-n*l,c*l+n*o,0,c*o+n*l,h*o+i,h*l-n*a,0,c*l-n*o,h*l+n*a,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,n,r,a){return this.set(1,i,r,0,e,1,a,0,t,n,1,0,0,0,0,1),this}compose(e,t,i){const n=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,d=o+o,u=r*c,f=r*h,p=r*d,g=a*h,m=a*d,_=o*d,x=l*c,E=l*h,y=l*d,M=i.x,w=i.y,A=i.z;return n[0]=(1-(g+_))*M,n[1]=(f+y)*M,n[2]=(p-E)*M,n[3]=0,n[4]=(f-y)*w,n[5]=(1-(u+_))*w,n[6]=(m+x)*w,n[7]=0,n[8]=(p+E)*A,n[9]=(m-x)*A,n[10]=(1-(u+g))*A,n[11]=0,n[12]=e.x,n[13]=e.y,n[14]=e.z,n[15]=1,this}decompose(e,t,i){const n=this.elements;e.x=n[12],e.y=n[13],e.z=n[14];const r=this.determinant();if(r===0)return i.set(1,1,1),t.identity(),this;let a=or.set(n[0],n[1],n[2]).length();const o=or.set(n[4],n[5],n[6]).length(),l=or.set(n[8],n[9],n[10]).length();r<0&&(a=-a),tn.copy(this);const c=1/a,h=1/o,d=1/l;return tn.elements[0]*=c,tn.elements[1]*=c,tn.elements[2]*=c,tn.elements[4]*=h,tn.elements[5]*=h,tn.elements[6]*=h,tn.elements[8]*=d,tn.elements[9]*=d,tn.elements[10]*=d,t.setFromRotationMatrix(tn),i.x=a,i.y=o,i.z=l,this}makePerspective(e,t,i,n,r,a,o=Sn,l=!1){const c=this.elements,h=2*r/(t-e),d=2*r/(i-n),u=(t+e)/(t-e),f=(i+n)/(i-n);let p,g;if(l)p=r/(a-r),g=a*r/(a-r);else if(o===Sn)p=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===Va)p=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,n,r,a,o=Sn,l=!1){const c=this.elements,h=2/(t-e),d=2/(i-n),u=-(t+e)/(t-e),f=-(i+n)/(i-n);let p,g;if(l)p=1/(a-r),g=a/(a-r);else if(o===Sn)p=-2/(a-r),g=-(a+r)/(a-r);else if(o===Va)p=-1/(a-r),g=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let n=0;n<16;n++)if(t[n]!==i[n])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const or=new D,tn=new He,k_=new D(0,0,0),B_=new D(1,1,1),is=new D,oo=new D,Di=new D,Qd=new He,ef=new cn;class hn{constructor(e=0,t=0,i=0,n=hn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=n}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,n=this._order){return this._x=e,this._y=t,this._z=i,this._order=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const n=e.elements,r=n[0],a=n[4],o=n[8],l=n[1],c=n[5],h=n[9],d=n[2],u=n[6],f=n[10];switch(t){case"XYZ":this._y=Math.asin(qe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-qe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(qe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-qe(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(qe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-qe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Pe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Qd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Qd,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ef.setFromEuler(this),this.setFromQuaternion(ef,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}hn.DEFAULT_ORDER="XYZ";class zu{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let z_=0;const tf=new D,lr=new cn,Ln=new He,lo=new D,da=new D,V_=new D,H_=new cn,nf=new D(1,0,0),sf=new D(0,1,0),rf=new D(0,0,1),af={type:"added"},G_={type:"removed"},cr={type:"childadded",child:null},ac={type:"childremoved",child:null};class bt extends Js{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:z_++}),this.uuid=ln(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=bt.DEFAULT_UP.clone();const e=new D,t=new hn,i=new cn,n=new D(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new He},normalMatrix:{value:new We}}),this.matrix=new He,this.matrixWorld=new He,this.matrixAutoUpdate=bt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new zu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return lr.setFromAxisAngle(e,t),this.quaternion.multiply(lr),this}rotateOnWorldAxis(e,t){return lr.setFromAxisAngle(e,t),this.quaternion.premultiply(lr),this}rotateX(e){return this.rotateOnAxis(nf,e)}rotateY(e){return this.rotateOnAxis(sf,e)}rotateZ(e){return this.rotateOnAxis(rf,e)}translateOnAxis(e,t){return tf.copy(e).applyQuaternion(this.quaternion),this.position.add(tf.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(nf,e)}translateY(e){return this.translateOnAxis(sf,e)}translateZ(e){return this.translateOnAxis(rf,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ln.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?lo.copy(e):lo.set(e,t,i);const n=this.parent;this.updateWorldMatrix(!0,!1),da.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ln.lookAt(da,lo,this.up):Ln.lookAt(lo,da,this.up),this.quaternion.setFromRotationMatrix(Ln),n&&(Ln.extractRotation(n.matrixWorld),lr.setFromRotationMatrix(Ln),this.quaternion.premultiply(lr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ue("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(af),cr.child=e,this.dispatchEvent(cr),cr.child=null):Ue("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(G_),ac.child=e,this.dispatchEvent(ac),ac.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ln.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ln.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ln),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(af),cr.child=e,this.dispatchEvent(cr),cr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,n=this.children.length;i<n;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const n=this.children;for(let r=0,a=n.length;r<a;r++)n[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(da,e,V_),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(da,H_,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,n=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*n,r[13]+=i-r[1]*t-r[5]*i-r[9]*n,r[14]+=n-r[2]*t-r[6]*i-r[10]*n}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const n=this.children;for(let r=0,a=n.length;r<a;r++)n[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const n={};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.castShadow===!0&&(n.castShadow=!0),this.receiveShadow===!0&&(n.receiveShadow=!0),this.visible===!1&&(n.visible=!1),this.frustumCulled===!1&&(n.frustumCulled=!1),this.renderOrder!==0&&(n.renderOrder=this.renderOrder),this.static!==!1&&(n.static=this.static),Object.keys(this.userData).length>0&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),n.up=this.up.toArray(),this.pivot!==null&&(n.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(n.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(n.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(n.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(n.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(n.type="BatchedMesh",n.perObjectFrustumCulled=this.perObjectFrustumCulled,n.sortObjects=this.sortObjects,n.drawRanges=this._drawRanges,n.reservedRanges=this._reservedRanges,n.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),n.instanceInfo=this._instanceInfo.map(o=>({...o})),n.availableInstanceIds=this._availableInstanceIds.slice(),n.availableGeometryIds=this._availableGeometryIds.slice(),n.nextIndexStart=this._nextIndexStart,n.nextVertexStart=this._nextVertexStart,n.geometryCount=this._geometryCount,n.maxInstanceCount=this._maxInstanceCount,n.maxVertexCount=this._maxVertexCount,n.maxIndexCount=this._maxIndexCount,n.geometryInitialized=this._geometryInitialized,n.matricesTexture=this._matricesTexture.toJSON(e),n.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(n.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(n.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(n.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?n.background=this.background.toJSON():this.background.isTexture&&(n.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(n.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){n.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(n.bindMode=this.bindMode,n.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),n.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));n.material=o}else n.material=r(e.materials,this.material);if(this.children.length>0){n.children=[];for(let o=0;o<this.children.length;o++)n.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){n.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];n.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),d=a(e.shapes),u=a(e.skeletons),f=a(e.animations),p=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),d.length>0&&(i.shapes=d),u.length>0&&(i.skeletons=u),f.length>0&&(i.animations=f),p.length>0&&(i.nodes=p)}return i.object=n,i;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),e.pivot!==null&&(this.pivot=e.pivot.clone()),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const n=e.children[i];this.add(n.clone())}return this}}bt.DEFAULT_UP=new D(0,1,0);bt.DEFAULT_MATRIX_AUTO_UPDATE=!0;bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class ki extends bt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const W_={type:"move"};class oc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ki,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ki,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ki,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let n=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const g of e.hand.values()){const m=t.getJointPose(g,i),_=this._getHandJoint(c,g);m!==null&&(_.matrix.fromArray(m.transform.matrix),_.matrix.decompose(_.position,_.rotation,_.scale),_.matrixWorldNeedsUpdate=!0,_.jointRadius=m.radius),_.visible=m!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,p=.005;c.inputState.pinching&&u>f+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=f-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(n=t.getPose(e.targetRaySpace,i),n===null&&r!==null&&(n=r),n!==null&&(o.matrix.fromArray(n.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,n.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(n.linearVelocity)):o.hasLinearVelocity=!1,n.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(n.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(W_)))}return o!==null&&(o.visible=n!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new ki;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const am={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ns={h:0,s:0,l:0},co={h:0,s:0,l:0};function lc(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class Le{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const n=e;n&&n.isColor?this.copy(n):typeof n=="number"?this.setHex(n):typeof n=="string"&&this.setStyle(n)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Gt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ze.colorSpaceToWorking(this,t),this}setRGB(e,t,i,n=Ze.workingColorSpace){return this.r=e,this.g=t,this.b=i,Ze.colorSpaceToWorking(this,n),this}setHSL(e,t,i,n=Ze.workingColorSpace){if(e=ku(e,1),t=qe(t,0,1),i=qe(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=lc(a,r,e+1/3),this.g=lc(a,r,e),this.b=lc(a,r,e-1/3)}return Ze.colorSpaceToWorking(this,n),this}setStyle(e,t=Gt){function i(r){r!==void 0&&parseFloat(r)<1&&Pe("Color: Alpha component of "+e+" will be ignored.")}let n;if(n=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=n[1],o=n[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Pe("Color: Unknown color model "+e)}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=n[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Pe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Gt){const i=am[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Pe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Xn(e.r),this.g=Xn(e.g),this.b=Xn(e.b),this}copyLinearToSRGB(e){return this.r=Lr(e.r),this.g=Lr(e.g),this.b=Lr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Gt){return Ze.workingToColorSpace(hi.copy(this),e),Math.round(qe(hi.r*255,0,255))*65536+Math.round(qe(hi.g*255,0,255))*256+Math.round(qe(hi.b*255,0,255))}getHexString(e=Gt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ze.workingColorSpace){Ze.workingToColorSpace(hi.copy(this),t);const i=hi.r,n=hi.g,r=hi.b,a=Math.max(i,n,r),o=Math.min(i,n,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case i:l=(n-r)/d+(n<r?6:0);break;case n:l=(r-i)/d+2;break;case r:l=(i-n)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Ze.workingColorSpace){return Ze.workingToColorSpace(hi.copy(this),t),e.r=hi.r,e.g=hi.g,e.b=hi.b,e}getStyle(e=Gt){Ze.workingToColorSpace(hi.copy(this),e);const t=hi.r,i=hi.g,n=hi.b;return e!==Gt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${n.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(n*255)})`}offsetHSL(e,t,i){return this.getHSL(ns),this.setHSL(ns.h+e,ns.s+t,ns.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(ns),e.getHSL(co);const i=Ia(ns.h,co.h,t),n=Ia(ns.s,co.s,t),r=Ia(ns.l,co.l,t);return this.setHSL(i,n,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,n=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*n,this.g=r[1]*t+r[4]*i+r[7]*n,this.b=r[2]*t+r[5]*i+r[8]*n,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const hi=new Le;Le.NAMES=am;class Ll{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new Le(e),this.near=t,this.far=i}clone(){return new Ll(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Vu extends bt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new hn,this.environmentIntensity=1,this.environmentRotation=new hn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const nn=new D,Nn=new D,cc=new D,On=new D,hr=new D,ur=new D,of=new D,hc=new D,uc=new D,dc=new D,fc=new Tt,pc=new Tt,mc=new Tt;class ji{constructor(e=new D,t=new D,i=new D){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,n){n.subVectors(i,t),nn.subVectors(e,t),n.cross(nn);const r=n.lengthSq();return r>0?n.multiplyScalar(1/Math.sqrt(r)):n.set(0,0,0)}static getBarycoord(e,t,i,n,r){nn.subVectors(n,t),Nn.subVectors(i,t),cc.subVectors(e,t);const a=nn.dot(nn),o=nn.dot(Nn),l=nn.dot(cc),c=Nn.dot(Nn),h=Nn.dot(cc),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;const u=1/d,f=(c*l-o*h)*u,p=(a*h-o*l)*u;return r.set(1-f-p,p,f)}static containsPoint(e,t,i,n){return this.getBarycoord(e,t,i,n,On)===null?!1:On.x>=0&&On.y>=0&&On.x+On.y<=1}static getInterpolation(e,t,i,n,r,a,o,l){return this.getBarycoord(e,t,i,n,On)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,On.x),l.addScaledVector(a,On.y),l.addScaledVector(o,On.z),l)}static getInterpolatedAttribute(e,t,i,n,r,a){return fc.setScalar(0),pc.setScalar(0),mc.setScalar(0),fc.fromBufferAttribute(e,t),pc.fromBufferAttribute(e,i),mc.fromBufferAttribute(e,n),a.setScalar(0),a.addScaledVector(fc,r.x),a.addScaledVector(pc,r.y),a.addScaledVector(mc,r.z),a}static isFrontFacing(e,t,i,n){return nn.subVectors(i,t),Nn.subVectors(e,t),nn.cross(Nn).dot(n)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,n){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[n]),this}setFromAttributeAndIndices(e,t,i,n){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return nn.subVectors(this.c,this.b),Nn.subVectors(this.a,this.b),nn.cross(Nn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ji.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return ji.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,n,r){return ji.getInterpolation(e,this.a,this.b,this.c,t,i,n,r)}containsPoint(e){return ji.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ji.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,n=this.b,r=this.c;let a,o;hr.subVectors(n,i),ur.subVectors(r,i),hc.subVectors(e,i);const l=hr.dot(hc),c=ur.dot(hc);if(l<=0&&c<=0)return t.copy(i);uc.subVectors(e,n);const h=hr.dot(uc),d=ur.dot(uc);if(h>=0&&d<=h)return t.copy(n);const u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(i).addScaledVector(hr,a);dc.subVectors(e,r);const f=hr.dot(dc),p=ur.dot(dc);if(p>=0&&f<=p)return t.copy(r);const g=f*c-l*p;if(g<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(i).addScaledVector(ur,o);const m=h*p-f*d;if(m<=0&&d-h>=0&&f-p>=0)return of.subVectors(r,n),o=(d-h)/(d-h+(f-p)),t.copy(n).addScaledVector(of,o);const _=1/(m+g+u);return a=g*_,o=u*_,t.copy(i).addScaledVector(hr,a).addScaledVector(ur,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Jn{constructor(e=new D(1/0,1/0,1/0),t=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(sn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(sn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=sn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,sn):sn.fromBufferAttribute(r,a),sn.applyMatrix4(e.matrixWorld),this.expandByPoint(sn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ho.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ho.copy(i.boundingBox)),ho.applyMatrix4(e.matrixWorld),this.union(ho)}const n=e.children;for(let r=0,a=n.length;r<a;r++)this.expandByObject(n[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,sn),sn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(fa),uo.subVectors(this.max,fa),dr.subVectors(e.a,fa),fr.subVectors(e.b,fa),pr.subVectors(e.c,fa),ss.subVectors(fr,dr),rs.subVectors(pr,fr),Rs.subVectors(dr,pr);let t=[0,-ss.z,ss.y,0,-rs.z,rs.y,0,-Rs.z,Rs.y,ss.z,0,-ss.x,rs.z,0,-rs.x,Rs.z,0,-Rs.x,-ss.y,ss.x,0,-rs.y,rs.x,0,-Rs.y,Rs.x,0];return!gc(t,dr,fr,pr,uo)||(t=[1,0,0,0,1,0,0,0,1],!gc(t,dr,fr,pr,uo))?!1:(fo.crossVectors(ss,rs),t=[fo.x,fo.y,fo.z],gc(t,dr,fr,pr,uo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,sn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(sn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Un[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Un[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Un[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Un[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Un[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Un[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Un[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Un[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Un),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Un=[new D,new D,new D,new D,new D,new D,new D,new D],sn=new D,ho=new Jn,dr=new D,fr=new D,pr=new D,ss=new D,rs=new D,Rs=new D,fa=new D,uo=new D,fo=new D,Ps=new D;function gc(s,e,t,i,n){for(let r=0,a=s.length-3;r<=a;r+=3){Ps.fromArray(s,r);const o=n.x*Math.abs(Ps.x)+n.y*Math.abs(Ps.y)+n.z*Math.abs(Ps.z),l=e.dot(Ps),c=t.dot(Ps),h=i.dot(Ps);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Yt=new D,po=new De;let X_=0;class xi{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:X_++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Xh,this.updateRanges=[],this.gpuType=Fi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let n=0,r=this.itemSize;n<r;n++)this.array[e+n]=t.array[i+n];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)po.fromBufferAttribute(this,t),po.applyMatrix3(e),this.setXY(t,po.x,po.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Yt.fromBufferAttribute(this,t),Yt.applyMatrix3(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Yt.fromBufferAttribute(this,t),Yt.applyMatrix4(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Yt.fromBufferAttribute(this,t),Yt.applyNormalMatrix(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Yt.fromBufferAttribute(this,t),Yt.transformDirection(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=an(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=ht(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=an(t,this.array)),t}setX(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=an(t,this.array)),t}setY(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=an(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=an(t,this.array)),t}setW(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=ht(t,this.array),i=ht(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,n){return e*=this.itemSize,this.normalized&&(t=ht(t,this.array),i=ht(i,this.array),n=ht(n,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=n,this}setXYZW(e,t,i,n,r){return e*=this.itemSize,this.normalized&&(t=ht(t,this.array),i=ht(i,this.array),n=ht(n,this.array),r=ht(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=n,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Xh&&(e.usage=this.usage),e}}class om extends xi{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class lm extends xi{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class zt extends xi{constructor(e,t,i){super(new Float32Array(e),t,i)}}const Y_=new Jn,pa=new D,_c=new D;class Pn{constructor(e=new D,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Y_.setFromPoints(e).getCenter(i);let n=0;for(let r=0,a=e.length;r<a;r++)n=Math.max(n,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(n),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;pa.subVectors(e,this.center);const t=pa.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),n=(i-this.radius)*.5;this.center.addScaledVector(pa,n/i),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(_c.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(pa.copy(e.center).add(_c)),this.expandByPoint(pa.copy(e.center).sub(_c))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let q_=0;const Yi=new He,vc=new bt,mr=new D,Ii=new Jn,ma=new Jn,ti=new D;class mi extends Js{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:q_++}),this.uuid=ln(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(u_(e)?lm:om)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new We().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const n=this.attributes.tangent;return n!==void 0&&(n.transformDirection(e),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Yi.makeRotationFromQuaternion(e),this.applyMatrix4(Yi),this}rotateX(e){return Yi.makeRotationX(e),this.applyMatrix4(Yi),this}rotateY(e){return Yi.makeRotationY(e),this.applyMatrix4(Yi),this}rotateZ(e){return Yi.makeRotationZ(e),this.applyMatrix4(Yi),this}translate(e,t,i){return Yi.makeTranslation(e,t,i),this.applyMatrix4(Yi),this}scale(e,t,i){return Yi.makeScale(e,t,i),this.applyMatrix4(Yi),this}lookAt(e){return vc.lookAt(e),vc.updateMatrix(),this.applyMatrix4(vc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(mr).negate(),this.translate(mr.x,mr.y,mr.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let n=0,r=e.length;n<r;n++){const a=e[n];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new zt(i,3))}else{const i=Math.min(e.length,t.count);for(let n=0;n<i;n++){const r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&Pe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Jn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ue("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,n=t.length;i<n;i++){const r=t[i];Ii.setFromBufferAttribute(r),this.morphTargetsRelative?(ti.addVectors(this.boundingBox.min,Ii.min),this.boundingBox.expandByPoint(ti),ti.addVectors(this.boundingBox.max,Ii.max),this.boundingBox.expandByPoint(ti)):(this.boundingBox.expandByPoint(Ii.min),this.boundingBox.expandByPoint(Ii.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ue('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Pn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ue("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(e){const i=this.boundingSphere.center;if(Ii.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];ma.setFromBufferAttribute(o),this.morphTargetsRelative?(ti.addVectors(Ii.min,ma.min),Ii.expandByPoint(ti),ti.addVectors(Ii.max,ma.max),Ii.expandByPoint(ti)):(Ii.expandByPoint(ma.min),Ii.expandByPoint(ma.max))}Ii.getCenter(i);let n=0;for(let r=0,a=e.count;r<a;r++)ti.fromBufferAttribute(e,r),n=Math.max(n,i.distanceToSquared(ti));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)ti.fromBufferAttribute(o,c),l&&(mr.fromBufferAttribute(e,c),ti.add(mr)),n=Math.max(n,i.distanceToSquared(ti))}this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&Ue('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ue("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,n=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new xi(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let v=0;v<i.count;v++)o[v]=new D,l[v]=new D;const c=new D,h=new D,d=new D,u=new De,f=new De,p=new De,g=new D,m=new D;function _(v,S,P){c.fromBufferAttribute(i,v),h.fromBufferAttribute(i,S),d.fromBufferAttribute(i,P),u.fromBufferAttribute(r,v),f.fromBufferAttribute(r,S),p.fromBufferAttribute(r,P),h.sub(c),d.sub(c),f.sub(u),p.sub(u);const C=1/(f.x*p.y-p.x*f.y);isFinite(C)&&(g.copy(h).multiplyScalar(p.y).addScaledVector(d,-f.y).multiplyScalar(C),m.copy(d).multiplyScalar(f.x).addScaledVector(h,-p.x).multiplyScalar(C),o[v].add(g),o[S].add(g),o[P].add(g),l[v].add(m),l[S].add(m),l[P].add(m))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let v=0,S=x.length;v<S;++v){const P=x[v],C=P.start,N=P.count;for(let O=C,V=C+N;O<V;O+=3)_(e.getX(O+0),e.getX(O+1),e.getX(O+2))}const E=new D,y=new D,M=new D,w=new D;function A(v){M.fromBufferAttribute(n,v),w.copy(M);const S=o[v];E.copy(S),E.sub(M.multiplyScalar(M.dot(S))).normalize(),y.crossVectors(w,S);const C=y.dot(l[v])<0?-1:1;a.setXYZW(v,E.x,E.y,E.z,C)}for(let v=0,S=x.length;v<S;++v){const P=x[v],C=P.start,N=P.count;for(let O=C,V=C+N;O<V;O+=3)A(e.getX(O+0)),A(e.getX(O+1)),A(e.getX(O+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new xi(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let u=0,f=i.count;u<f;u++)i.setXYZ(u,0,0,0);const n=new D,r=new D,a=new D,o=new D,l=new D,c=new D,h=new D,d=new D;if(e)for(let u=0,f=e.count;u<f;u+=3){const p=e.getX(u+0),g=e.getX(u+1),m=e.getX(u+2);n.fromBufferAttribute(t,p),r.fromBufferAttribute(t,g),a.fromBufferAttribute(t,m),h.subVectors(a,r),d.subVectors(n,r),h.cross(d),o.fromBufferAttribute(i,p),l.fromBufferAttribute(i,g),c.fromBufferAttribute(i,m),o.add(h),l.add(h),c.add(h),i.setXYZ(p,o.x,o.y,o.z),i.setXYZ(g,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,f=t.count;u<f;u+=3)n.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,r),d.subVectors(n,r),h.cross(d),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)ti.fromBufferAttribute(e,t),ti.normalize(),e.setXYZ(t,ti.x,ti.y,ti.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h);let f=0,p=0;for(let g=0,m=l.length;g<m;g++){o.isInterleavedBufferAttribute?f=l[g]*o.data.stride+o.offset:f=l[g]*h;for(let _=0;_<h;_++)u[p++]=c[f++]}return new xi(u,h,d)}if(this.index===null)return Pe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new mi,i=this.index.array,n=this.attributes;for(const o in n){const l=n[o],c=e(l,i);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){const u=c[h],f=e(u,i);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const n={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){const f=c[d];h.push(f.toJSON(e.data))}h.length>0&&(n[l]=h,r=!0)}r&&(e.data.morphAttributes=n,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const n=e.attributes;for(const c in n){const h=n[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}class $_{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Xh,this.updateRanges=[],this.version=0,this.uuid=ln()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let n=0,r=this.stride;n<r;n++)this.array[e+n]=t.array[i+n];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ln()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ln()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const gi=new D;class Hu{constructor(e,t,i,n=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=n}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)gi.fromBufferAttribute(this,t),gi.applyMatrix4(e),this.setXYZ(t,gi.x,gi.y,gi.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)gi.fromBufferAttribute(this,t),gi.applyNormalMatrix(e),this.setXYZ(t,gi.x,gi.y,gi.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)gi.fromBufferAttribute(this,t),gi.transformDirection(e),this.setXYZ(t,gi.x,gi.y,gi.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=an(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=ht(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=ht(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ht(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ht(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ht(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=an(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=an(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=an(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=an(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=ht(t,this.array),i=ht(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=ht(t,this.array),i=ht(i,this.array),n=ht(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=n,this}setXYZW(e,t,i,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=ht(t,this.array),i=ht(i,this.array),n=ht(n,this.array),r=ht(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=n,this.data.array[e+3]=r,this}clone(e){if(e===void 0){ul("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const n=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[n+r])}return new xi(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Hu(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){ul("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const n=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[n+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}let j_=0;class Qi extends Js{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:j_++}),this.uuid=ln(),this.name="",this.type="Material",this.blending=Ir,this.side=$n,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=nh,this.blendDst=sh,this.blendEquation=Vn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Le(0,0,0),this.blendAlpha=0,this.depthFunc=Hr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Yd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=rr,this.stencilZFail=rr,this.stencilZPass=rr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Pe(`Material: parameter '${t}' has value of undefined.`);continue}const n=this[t];if(n===void 0){Pe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}n&&n.isColor?n.set(i):n&&n.isVector3&&i&&i.isVector3?n.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ir&&(i.blending=this.blending),this.side!==$n&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==nh&&(i.blendSrc=this.blendSrc),this.blendDst!==sh&&(i.blendDst=this.blendDst),this.blendEquation!==Vn&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Hr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Yd&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==rr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==rr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==rr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function n(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=n(e.textures),a=n(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const n=t.length;i=new Array(n);for(let r=0;r!==n;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Fn=new D,xc=new D,mo=new D,as=new D,yc=new D,go=new D,Mc=new D;class sa{constructor(e=new D,t=new D(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Fn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Fn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Fn.copy(this.origin).addScaledVector(this.direction,t),Fn.distanceToSquared(e))}distanceSqToSegment(e,t,i,n){xc.copy(e).add(t).multiplyScalar(.5),mo.copy(t).sub(e).normalize(),as.copy(this.origin).sub(xc);const r=e.distanceTo(t)*.5,a=-this.direction.dot(mo),o=as.dot(this.direction),l=-as.dot(mo),c=as.lengthSq(),h=Math.abs(1-a*a);let d,u,f,p;if(h>0)if(d=a*l-o,u=a*o-l,p=r*h,d>=0)if(u>=-p)if(u<=p){const g=1/h;d*=g,u*=g,f=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u<=-p?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=p?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),n&&n.copy(xc).addScaledVector(mo,u),f}intersectSphere(e,t){Fn.subVectors(e.center,this.origin);const i=Fn.dot(this.direction),n=Fn.dot(Fn)-i*i,r=e.radius*e.radius;if(n>r)return null;const a=Math.sqrt(r-n),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,n,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(i=(e.min.x-u.x)*c,n=(e.max.x-u.x)*c):(i=(e.max.x-u.x)*c,n=(e.min.x-u.x)*c),h>=0?(r=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),i>a||r>n||((r>i||isNaN(i))&&(i=r),(a<n||isNaN(n))&&(n=a),d>=0?(o=(e.min.z-u.z)*d,l=(e.max.z-u.z)*d):(o=(e.max.z-u.z)*d,l=(e.min.z-u.z)*d),i>l||o>n)||((o>i||i!==i)&&(i=o),(l<n||n!==n)&&(n=l),n<0)?null:this.at(i>=0?i:n,t)}intersectsBox(e){return this.intersectBox(e,Fn)!==null}intersectTriangle(e,t,i,n,r){yc.subVectors(t,e),go.subVectors(i,e),Mc.crossVectors(yc,go);let a=this.direction.dot(Mc),o;if(a>0){if(n)return null;o=1}else if(a<0)o=-1,a=-a;else return null;as.subVectors(this.origin,e);const l=o*this.direction.dot(go.crossVectors(as,go));if(l<0)return null;const c=o*this.direction.dot(yc.cross(as));if(c<0||l+c>a)return null;const h=-o*as.dot(Mc);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class En extends Qi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Le(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hn,this.combine=Su,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const lf=new He,Ds=new sa,_o=new Pn,cf=new D,vo=new D,xo=new D,yo=new D,bc=new D,Mo=new D,hf=new D,bo=new D;class at extends bt{constructor(e=new mi,t=new En){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){const o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const i=this.geometry,n=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(n,e);const o=this.morphTargetInfluences;if(r&&o){Mo.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],d=r[l];h!==0&&(bc.fromBufferAttribute(d,e),a?Mo.addScaledVector(bc,h):Mo.addScaledVector(bc.sub(t),h))}t.add(Mo)}return t}raycast(e,t){const i=this.geometry,n=this.material,r=this.matrixWorld;n!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),_o.copy(i.boundingSphere),_o.applyMatrix4(r),Ds.copy(e.ray).recast(e.near),!(_o.containsPoint(Ds.origin)===!1&&(Ds.intersectSphere(_o,cf)===null||Ds.origin.distanceToSquared(cf)>(e.far-e.near)**2))&&(lf.copy(r).invert(),Ds.copy(e.ray).applyMatrix4(lf),!(i.boundingBox!==null&&Ds.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Ds)))}_computeIntersections(e,t,i){let n;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,g=u.length;p<g;p++){const m=u[p],_=a[m.materialIndex],x=Math.max(m.start,f.start),E=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let y=x,M=E;y<M;y+=3){const w=o.getX(y),A=o.getX(y+1),v=o.getX(y+2);n=So(this,_,e,i,c,h,d,w,A,v),n&&(n.faceIndex=Math.floor(y/3),n.face.materialIndex=m.materialIndex,t.push(n))}}else{const p=Math.max(0,f.start),g=Math.min(o.count,f.start+f.count);for(let m=p,_=g;m<_;m+=3){const x=o.getX(m),E=o.getX(m+1),y=o.getX(m+2);n=So(this,a,e,i,c,h,d,x,E,y),n&&(n.faceIndex=Math.floor(m/3),t.push(n))}}else if(l!==void 0)if(Array.isArray(a))for(let p=0,g=u.length;p<g;p++){const m=u[p],_=a[m.materialIndex],x=Math.max(m.start,f.start),E=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let y=x,M=E;y<M;y+=3){const w=y,A=y+1,v=y+2;n=So(this,_,e,i,c,h,d,w,A,v),n&&(n.faceIndex=Math.floor(y/3),n.face.materialIndex=m.materialIndex,t.push(n))}}else{const p=Math.max(0,f.start),g=Math.min(l.count,f.start+f.count);for(let m=p,_=g;m<_;m+=3){const x=m,E=m+1,y=m+2;n=So(this,a,e,i,c,h,d,x,E,y),n&&(n.faceIndex=Math.floor(m/3),t.push(n))}}}}function K_(s,e,t,i,n,r,a,o){let l;if(e.side===vi?l=i.intersectTriangle(a,r,n,!0,o):l=i.intersectTriangle(n,r,a,e.side===$n,o),l===null)return null;bo.copy(o),bo.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo(bo);return c<t.near||c>t.far?null:{distance:c,point:bo.clone(),object:s}}function So(s,e,t,i,n,r,a,o,l,c){s.getVertexPosition(o,vo),s.getVertexPosition(l,xo),s.getVertexPosition(c,yo);const h=K_(s,e,t,i,vo,xo,yo,hf);if(h){const d=new D;ji.getBarycoord(hf,vo,xo,yo,d),n&&(h.uv=ji.getInterpolatedAttribute(n,o,l,c,d,new De)),r&&(h.uv1=ji.getInterpolatedAttribute(r,o,l,c,d,new De)),a&&(h.normal=ji.getInterpolatedAttribute(a,o,l,c,d,new D),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new D,materialIndex:0};ji.getNormal(vo,xo,yo,u.normal),h.face=u,h.barycoord=d}return h}const uf=new D,df=new Tt,ff=new Tt,Z_=new D,pf=new He,Eo=new D,Sc=new Pn,mf=new He,Ec=new sa;class J_ extends at{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Vd,this.bindMatrix=new He,this.bindMatrixInverse=new He,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Jn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,Eo),this.boundingBox.expandByPoint(Eo)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Pn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let i=0;i<t.count;i++)this.getVertexPosition(i,Eo),this.boundingSphere.expandByPoint(Eo)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const i=this.material,n=this.matrixWorld;i!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Sc.copy(this.boundingSphere),Sc.applyMatrix4(n),e.ray.intersectsSphere(Sc)!==!1&&(mf.copy(n).invert(),Ec.copy(e.ray).applyMatrix4(mf),!(this.boundingBox!==null&&Ec.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Ec)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new Tt,t=this.geometry.attributes.skinWeight;for(let i=0,n=t.count;i<n;i++){e.fromBufferAttribute(t,i);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(i,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Vd?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Jg?this.bindMatrixInverse.copy(this.bindMatrix).invert():Pe("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const i=this.skeleton,n=this.geometry;df.fromBufferAttribute(n.attributes.skinIndex,e),ff.fromBufferAttribute(n.attributes.skinWeight,e),uf.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const a=ff.getComponent(r);if(a!==0){const o=df.getComponent(r);pf.multiplyMatrices(i.bones[o].matrixWorld,i.boneInverses[o]),t.addScaledVector(Z_.copy(uf).applyMatrix4(pf),a)}}return t.applyMatrix4(this.bindMatrixInverse)}}class cm extends bt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Nl extends Zt{constructor(e=null,t=1,i=1,n,r,a,o,l,c=Ot,h=Ot,d,u){super(null,a,o,l,c,h,n,r,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const gf=new He,Q_=new He;class Gu{constructor(e=[],t=[]){this.uuid=ln(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Pe("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let i=0,n=this.bones.length;i<n;i++)this.boneInverses.push(new He)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const i=new He;this.bones[e]&&i.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(i)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const i=this.bones[e];i&&i.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const i=this.bones[e];i&&(i.parent&&i.parent.isBone?(i.matrix.copy(i.parent.matrixWorld).invert(),i.matrix.multiply(i.matrixWorld)):i.matrix.copy(i.matrixWorld),i.matrix.decompose(i.position,i.quaternion,i.scale))}}update(){const e=this.bones,t=this.boneInverses,i=this.boneMatrices,n=this.boneTexture;for(let r=0,a=e.length;r<a;r++){const o=e[r]?e[r].matrixWorld:Q_;gf.multiplyMatrices(o,t[r]),gf.toArray(i,r*16)}n!==null&&(n.needsUpdate=!0)}clone(){return new Gu(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const i=new Nl(t,e,e,Ki,Fi);return i.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=i,this}getBoneByName(e){for(let t=0,i=this.bones.length;t<i;t++){const n=this.bones[t];if(n.name===e)return n}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let i=0,n=e.bones.length;i<n;i++){const r=e.bones[i];let a=t[r];a===void 0&&(Pe("Skeleton: No bone found with UUID:",r),a=new cm),this.bones.push(a),this.boneInverses.push(new He().fromArray(e.boneInverses[i]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,i=this.boneInverses;for(let n=0,r=t.length;n<r;n++){const a=t[n];e.bones.push(a.uuid);const o=i[n];e.boneInverses.push(o.toArray())}return e}}class Yh extends xi{constructor(e,t,i,n=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const gr=new He,_f=new He,To=[],vf=new Jn,ev=new He,ga=new at,_a=new Pn;class Wu extends at{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Yh(new Float32Array(i*16),16),this.previousInstanceMatrix=null,this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let n=0;n<i;n++)this.setMatrixAt(n,ev)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Jn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,gr),vf.copy(e.boundingBox).applyMatrix4(gr),this.boundingBox.union(vf)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Pn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,gr),_a.copy(e.boundingSphere).applyMatrix4(gr),this.boundingSphere.union(_a)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.previousInstanceMatrix!==null&&(this.previousInstanceMatrix=e.previousInstanceMatrix.clone()),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,n=this.morphTexture.source.data.data,r=i.length+1,a=e*r+1;for(let o=0;o<i.length;o++)i[o]=n[a+o]}raycast(e,t){const i=this.matrixWorld,n=this.count;if(ga.geometry=this.geometry,ga.material=this.material,ga.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),_a.copy(this.boundingSphere),_a.applyMatrix4(i),e.ray.intersectsSphere(_a)!==!1))for(let r=0;r<n;r++){this.getMatrixAt(r,gr),_f.multiplyMatrices(i,gr),ga.matrixWorld=_f,ga.raycast(e,To);for(let a=0,o=To.length;a<o;a++){const l=To[a];l.instanceId=r,l.object=this,t.push(l)}To.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Yh(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const i=t.morphTargetInfluences,n=i.length+1;this.morphTexture===null&&(this.morphTexture=new Nl(new Float32Array(n*this.count),n,this.count,Dl,Fi));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<i.length;c++)a+=i[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=n*e;r[l]=o,r.set(i,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Tc=new D,tv=new D,iv=new We;class hs{constructor(e=new D(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,n){return this.normal.set(e,t,i),this.constant=n,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const n=Tc.subVectors(i,t).cross(tv.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(n,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Tc),n=this.normal.dot(i);if(n===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/n;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||iv.getNormalMatrix(e),n=this.coplanarPoint(Tc).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-n.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Is=new Pn,nv=new De(.5,.5),wo=new D;class Xu{constructor(e=new hs,t=new hs,i=new hs,n=new hs,r=new hs,a=new hs){this.planes=[e,t,i,n,r,a]}set(e,t,i,n,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(n),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Sn,i=!1){const n=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],d=r[5],u=r[6],f=r[7],p=r[8],g=r[9],m=r[10],_=r[11],x=r[12],E=r[13],y=r[14],M=r[15];if(n[0].setComponents(c-a,f-h,_-p,M-x).normalize(),n[1].setComponents(c+a,f+h,_+p,M+x).normalize(),n[2].setComponents(c+o,f+d,_+g,M+E).normalize(),n[3].setComponents(c-o,f-d,_-g,M-E).normalize(),i)n[4].setComponents(l,u,m,y).normalize(),n[5].setComponents(c-l,f-u,_-m,M-y).normalize();else if(n[4].setComponents(c-l,f-u,_-m,M-y).normalize(),t===Sn)n[5].setComponents(c+l,f+u,_+m,M+y).normalize();else if(t===Va)n[5].setComponents(l,u,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Is.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Is.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Is)}intersectsSprite(e){Is.center.set(0,0,0);const t=nv.distanceTo(e.center);return Is.radius=.7071067811865476+t,Is.applyMatrix4(e.matrixWorld),this.intersectsSphere(Is)}intersectsSphere(e){const t=this.planes,i=e.center,n=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<n)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const n=t[i];if(wo.x=n.normal.x>0?e.max.x:e.min.x,wo.y=n.normal.y>0?e.max.y:e.min.y,wo.z=n.normal.z>0?e.max.z:e.min.z,n.distanceToPoint(wo)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class hm extends Qi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Le(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const fl=new D,pl=new D,xf=new He,va=new sa,Ao=new Pn,wc=new D,yf=new D;class Yu extends bt{constructor(e=new mi,t=new hm){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let n=1,r=t.count;n<r;n++)fl.fromBufferAttribute(t,n-1),pl.fromBufferAttribute(t,n),i[n]=i[n-1],i[n]+=fl.distanceTo(pl);e.setAttribute("lineDistance",new zt(i,1))}else Pe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,n=this.matrixWorld,r=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ao.copy(i.boundingSphere),Ao.applyMatrix4(n),Ao.radius+=r,e.ray.intersectsSphere(Ao)===!1)return;xf.copy(n).invert(),va.copy(e.ray).applyMatrix4(xf);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=i.index,u=i.attributes.position;if(h!==null){const f=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let g=f,m=p-1;g<m;g+=c){const _=h.getX(g),x=h.getX(g+1),E=Co(this,e,va,l,_,x,g);E&&t.push(E)}if(this.isLineLoop){const g=h.getX(p-1),m=h.getX(f),_=Co(this,e,va,l,g,m,p-1);_&&t.push(_)}}else{const f=Math.max(0,a.start),p=Math.min(u.count,a.start+a.count);for(let g=f,m=p-1;g<m;g+=c){const _=Co(this,e,va,l,g,g+1,g);_&&t.push(_)}if(this.isLineLoop){const g=Co(this,e,va,l,p-1,f,p-1);g&&t.push(g)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){const o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Co(s,e,t,i,n,r,a){const o=s.geometry.attributes.position;if(fl.fromBufferAttribute(o,n),pl.fromBufferAttribute(o,r),t.distanceSqToSegment(fl,pl,wc,yf)>i)return;wc.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(wc);if(!(c<e.near||c>e.far))return{distance:c,point:yf.clone().applyMatrix4(s.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:s}}const Mf=new D,bf=new D;class sv extends Yu{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let n=0,r=t.count;n<r;n+=2)Mf.fromBufferAttribute(t,n),bf.fromBufferAttribute(t,n+1),i[n]=n===0?0:i[n-1],i[n+1]=i[n]+Mf.distanceTo(bf);e.setAttribute("lineDistance",new zt(i,1))}else Pe("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class rv extends Yu{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class um extends Qi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Le(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Sf=new He,qh=new sa,Ro=new Pn,Po=new D;class dm extends bt{constructor(e=new mi,t=new um){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,n=this.matrixWorld,r=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ro.copy(i.boundingSphere),Ro.applyMatrix4(n),Ro.radius+=r,e.ray.intersectsSphere(Ro)===!1)return;Sf.copy(n).invert(),qh.copy(e.ray).applyMatrix4(Sf);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,d=i.attributes.position;if(c!==null){const u=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let p=u,g=f;p<g;p++){const m=c.getX(p);Po.fromBufferAttribute(d,m),Ef(Po,m,l,n,e,t,this)}}else{const u=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let p=u,g=f;p<g;p++)Po.fromBufferAttribute(d,p),Ef(Po,p,l,n,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){const o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Ef(s,e,t,i,n,r,a){const o=qh.distanceSqToPoint(s);if(o<t){const l=new D;qh.closestPointToPoint(s,l),l.applyMatrix4(i);const c=n.ray.origin.distanceTo(l);if(c<n.near||c>n.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class fm extends Zt{constructor(e=[],t=$s,i,n,r,a,o,l,c,h){super(e,t,i,n,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Qo extends Zt{constructor(e,t,i,n,r,a,o,l,c){super(e,t,i,n,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class qr extends Zt{constructor(e,t,i=Cn,n,r,a,o=Ot,l=Ot,c,h=jn,d=1){if(h!==jn&&h!==fs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:d};super(u,n,r,a,o,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Bu(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class av extends qr{constructor(e,t=Cn,i=$s,n,r,a=Ot,o=Ot,l,c=jn){const h={width:e,height:e,depth:1},d=[h,h,h,h,h,h];super(e,e,t,i,n,r,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class pm extends Zt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class ra extends mi{constructor(e=1,t=1,i=1,n=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:n,heightSegments:r,depthSegments:a};const o=this;n=Math.floor(n),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],d=[];let u=0,f=0;p("z","y","x",-1,-1,i,t,e,a,r,0),p("z","y","x",1,-1,i,t,-e,a,r,1),p("x","z","y",1,1,e,i,t,n,a,2),p("x","z","y",1,-1,e,i,-t,n,a,3),p("x","y","z",1,-1,e,t,i,n,r,4),p("x","y","z",-1,-1,e,t,-i,n,r,5),this.setIndex(l),this.setAttribute("position",new zt(c,3)),this.setAttribute("normal",new zt(h,3)),this.setAttribute("uv",new zt(d,2));function p(g,m,_,x,E,y,M,w,A,v,S){const P=y/A,C=M/v,N=y/2,O=M/2,V=w/2,B=A+1,F=v+1;let L=0,K=0;const q=new D;for(let ie=0;ie<F;ie++){const ue=ie*C-O;for(let ne=0;ne<B;ne++){const Z=ne*P-N;q[g]=Z*x,q[m]=ue*E,q[_]=V,c.push(q.x,q.y,q.z),q[g]=0,q[m]=0,q[_]=w>0?1:-1,h.push(q.x,q.y,q.z),d.push(ne/A),d.push(1-ie/v),L+=1}}for(let ie=0;ie<v;ie++)for(let ue=0;ue<A;ue++){const ne=u+ue+B*ie,Z=u+ue+B*(ie+1),ae=u+(ue+1)+B*(ie+1),ve=u+(ue+1)+B*ie;l.push(ne,Z,ve),l.push(Z,ae,ve),K+=6}o.addGroup(f,K,S),f+=K,u+=L}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ra(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Gs extends mi{constructor(e=1,t=1,i=1,n=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:n};const r=e/2,a=t/2,o=Math.floor(i),l=Math.floor(n),c=o+1,h=l+1,d=e/o,u=t/l,f=[],p=[],g=[],m=[];for(let _=0;_<h;_++){const x=_*u-a;for(let E=0;E<c;E++){const y=E*d-r;p.push(y,-x,0),g.push(0,0,1),m.push(E/o),m.push(1-_/l)}}for(let _=0;_<l;_++)for(let x=0;x<o;x++){const E=x+c*_,y=x+c*(_+1),M=x+1+c*(_+1),w=x+1+c*_;f.push(E,y,w),f.push(y,M,w)}this.setIndex(f),this.setAttribute("position",new zt(p,3)),this.setAttribute("normal",new zt(g,3)),this.setAttribute("uv",new zt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gs(e.width,e.height,e.widthSegments,e.heightSegments)}}class qu extends mi{constructor(e=.5,t=1,i=32,n=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:n,thetaStart:r,thetaLength:a},i=Math.max(3,i),n=Math.max(1,n);const o=[],l=[],c=[],h=[];let d=e;const u=(t-e)/n,f=new D,p=new De;for(let g=0;g<=n;g++){for(let m=0;m<=i;m++){const _=r+m/i*a;f.x=d*Math.cos(_),f.y=d*Math.sin(_),l.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,h.push(p.x,p.y)}d+=u}for(let g=0;g<n;g++){const m=g*(i+1);for(let _=0;_<i;_++){const x=_+m,E=x,y=x+i+1,M=x+i+2,w=x+1;o.push(E,y,w),o.push(y,M,w)}}this.setIndex(o),this.setAttribute("position",new zt(l,3)),this.setAttribute("normal",new zt(c,3)),this.setAttribute("uv",new zt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qu(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class $u extends mi{constructor(e=1,t=.4,i=12,n=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:n,arc:r,thetaStart:a,thetaLength:o},i=Math.floor(i),n=Math.floor(n);const l=[],c=[],h=[],d=[],u=new D,f=new D,p=new D;for(let g=0;g<=i;g++){const m=a+g/i*o;for(let _=0;_<=n;_++){const x=_/n*r;f.x=(e+t*Math.cos(m))*Math.cos(x),f.y=(e+t*Math.cos(m))*Math.sin(x),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),u.x=e*Math.cos(x),u.y=e*Math.sin(x),p.subVectors(f,u).normalize(),h.push(p.x,p.y,p.z),d.push(_/n),d.push(g/i)}}for(let g=1;g<=i;g++)for(let m=1;m<=n;m++){const _=(n+1)*g+m-1,x=(n+1)*(g-1)+m-1,E=(n+1)*(g-1)+m,y=(n+1)*g+m;l.push(_,x,y),l.push(x,E,y)}this.setIndex(l),this.setAttribute("position",new zt(c,3)),this.setAttribute("normal",new zt(h,3)),this.setAttribute("uv",new zt(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $u(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}function $r(s){const e={};for(const t in s){e[t]={};for(const i in s[t]){const n=s[t][i];n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)?n.isRenderTargetTexture?(Pe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=n.clone():Array.isArray(n)?e[t][i]=n.slice():e[t][i]=n}}return e}function _i(s){const e={};for(let t=0;t<s.length;t++){const i=$r(s[t]);for(const n in i)e[n]=i[n]}return e}function ov(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function mm(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ze.workingColorSpace}const ps={clone:$r,merge:_i};var lv=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,cv=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ii extends Qi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=lv,this.fragmentShader=cv,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=$r(e.uniforms),this.uniformsGroups=ov(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const n in this.uniforms){const a=this.uniforms[n].value;a&&a.isTexture?t.uniforms[n]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[n]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[n]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[n]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[n]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[n]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[n]={type:"m4",value:a.toArray()}:t.uniforms[n]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const n in this.extensions)this.extensions[n]===!0&&(i[n]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class gm extends ii{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class js extends Qi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Le(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Le(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Il,this.normalScale=new De(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class un extends js{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new De(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return qe(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Le(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Le(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Le(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class hv extends Qi{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Il,this.normalScale=new De(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}}class uv extends Qi{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Le(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Le(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Il,this.normalScale=new De(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hn,this.combine=Su,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class _m extends Qi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=t_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class dv extends Qi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function Do(s,e){return!s||s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function fv(s){function e(n,r){return s[n]-s[r]}const t=s.length,i=new Array(t);for(let n=0;n!==t;++n)i[n]=n;return i.sort(e),i}function Tf(s,e,t){const i=s.length,n=new s.constructor(i);for(let r=0,a=0;a!==i;++r){const o=t[r]*e;for(let l=0;l!==e;++l)n[a++]=s[o+l]}return n}function vm(s,e,t,i){let n=1,r=s[0];for(;r!==void 0&&r[i]===void 0;)r=s[n++];if(r===void 0)return;let a=r[i];if(a!==void 0)if(Array.isArray(a))do a=r[i],a!==void 0&&(e.push(r.time),t.push(...a)),r=s[n++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[i],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=s[n++];while(r!==void 0);else do a=r[i],a!==void 0&&(e.push(r.time),t.push(a)),r=s[n++];while(r!==void 0)}class aa{constructor(e,t,i,n){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=n!==void 0?n:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let i=this._cachedIndex,n=t[i],r=t[i-1];i:{e:{let a;t:{n:if(!(e<n)){for(let o=i+2;;){if(n===void 0){if(e<r)break n;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(r=n,n=t[++i],e<n)break e}a=t.length;break t}if(!(e>=r)){const o=t[1];e<o&&(i=2,r=o);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(n=r,r=t[--i-1],e>=r)break e}a=i,i=0;break t}break i}for(;i<a;){const o=i+a>>>1;e<t[o]?a=o:i=o+1}if(n=t[i],r=t[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,n)}return this.interpolate_(i,r,e,n)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,i=this.sampleValues,n=this.valueSize,r=e*n;for(let a=0;a!==n;++a)t[a]=i[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class pv extends aa{constructor(e,t,i,n){super(e,t,i,n),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Gd,endingEnd:Gd}}intervalChanged_(e,t,i){const n=this.parameterPositions;let r=e-2,a=e+1,o=n[r],l=n[a];if(o===void 0)switch(this.getSettings_().endingStart){case Wd:r=e,o=2*t-i;break;case Xd:r=n.length-2,o=t+n[r]-n[r+1];break;default:r=e,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case Wd:a=e,l=2*i-t;break;case Xd:a=1,l=i+n[1]-n[0];break;default:a=e-1,l=t}const c=(i-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-i),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,i,n){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,p=(i-t)/(n-t),g=p*p,m=g*p,_=-u*m+2*u*g-u*p,x=(1+u)*m+(-1.5-2*u)*g+(-.5+u)*p+1,E=(-1-f)*m+(1.5+f)*g+.5*p,y=f*m-f*g;for(let M=0;M!==o;++M)r[M]=_*a[h+M]+x*a[c+M]+E*a[l+M]+y*a[d+M];return r}}class mv extends aa{constructor(e,t,i,n){super(e,t,i,n)}interpolate_(e,t,i,n){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(i-t)/(n-t),d=1-h;for(let u=0;u!==o;++u)r[u]=a[c+u]*d+a[l+u]*h;return r}}class gv extends aa{constructor(e,t,i,n){super(e,t,i,n)}interpolate_(e){return this.copySampleValue_(e-1)}}class _v extends aa{interpolate_(e,t,i,n){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this.settings||this.DefaultSettings_,d=h.inTangents,u=h.outTangents;if(!d||!u){const g=(i-t)/(n-t),m=1-g;for(let _=0;_!==o;++_)r[_]=a[c+_]*m+a[l+_]*g;return r}const f=o*2,p=e-1;for(let g=0;g!==o;++g){const m=a[c+g],_=a[l+g],x=p*f+g*2,E=u[x],y=u[x+1],M=e*f+g*2,w=d[M],A=d[M+1];let v=(i-t)/(n-t),S,P,C,N,O;for(let V=0;V<8;V++){S=v*v,P=S*v,C=1-v,N=C*C,O=N*C;const F=O*t+3*N*v*E+3*C*S*w+P*n-i;if(Math.abs(F)<1e-10)break;const L=3*N*(E-t)+6*C*v*(w-E)+3*S*(n-w);if(Math.abs(L)<1e-10)break;v=v-F/L,v=Math.max(0,Math.min(1,v))}r[g]=O*m+3*N*v*y+3*C*S*A+P*_}return r}}class dn{constructor(e,t,i,n){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Do(t,this.TimeBufferType),this.values=Do(i,this.ValueBufferType),this.setInterpolation(n||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:Do(e.times,Array),values:Do(e.values,Array)};const n=e.getInterpolation();n!==e.DefaultInterpolation&&(i.interpolation=n)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new gv(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new mv(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new pv(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){const t=new _v(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.settings=this.settings),t}setInterpolation(e){let t;switch(e){case Ba:t=this.InterpolantFactoryMethodDiscrete;break;case za:t=this.InterpolantFactoryMethodLinear;break;case tc:t=this.InterpolantFactoryMethodSmooth;break;case Hd:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){const i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Pe("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ba;case this.InterpolantFactoryMethodLinear:return za;case this.InterpolantFactoryMethodSmooth:return tc;case this.InterpolantFactoryMethodBezier:return Hd}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let i=0,n=t.length;i!==n;++i)t[i]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let i=0,n=t.length;i!==n;++i)t[i]*=e}return this}trim(e,t){const i=this.times,n=i.length;let r=0,a=n-1;for(;r!==n&&i[r]<e;)++r;for(;a!==-1&&i[a]>t;)--a;if(++a,r!==0||a!==n){r>=a&&(a=Math.max(a,1),r=a-1);const o=this.getValueSize();this.times=i.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(Ue("KeyframeTrack: Invalid value size in track.",this),e=!1);const i=this.times,n=this.values,r=i.length;r===0&&(Ue("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){const l=i[o];if(typeof l=="number"&&isNaN(l)){Ue("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){Ue("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(n!==void 0&&d_(n))for(let o=0,l=n.length;o!==l;++o){const c=n[o];if(isNaN(c)){Ue("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),n=this.getInterpolation()===tc,r=e.length-1;let a=1;for(let o=1;o<r;++o){let l=!1;const c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(n)l=!0;else{const d=o*i,u=d-i,f=d+i;for(let p=0;p!==i;++p){const g=t[d+p];if(g!==t[u+p]||g!==t[f+p]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];const d=o*i,u=a*i;for(let f=0;f!==i;++f)t[u+f]=t[d+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*i,l=a*i,c=0;c!==i;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*i)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),i=this.constructor,n=new i(this.name,e,t);return n.createInterpolant=this.createInterpolant,n}}dn.prototype.ValueTypeName="";dn.prototype.TimeBufferType=Float32Array;dn.prototype.ValueBufferType=Float32Array;dn.prototype.DefaultInterpolation=za;class oa extends dn{constructor(e,t,i){super(e,t,i)}}oa.prototype.ValueTypeName="bool";oa.prototype.ValueBufferType=Array;oa.prototype.DefaultInterpolation=Ba;oa.prototype.InterpolantFactoryMethodLinear=void 0;oa.prototype.InterpolantFactoryMethodSmooth=void 0;class xm extends dn{constructor(e,t,i,n){super(e,t,i,n)}}xm.prototype.ValueTypeName="color";class jr extends dn{constructor(e,t,i,n){super(e,t,i,n)}}jr.prototype.ValueTypeName="number";class vv extends aa{constructor(e,t,i,n){super(e,t,i,n)}interpolate_(e,t,i,n){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(i-t)/(n-t);let c=e*o;for(let h=c+o;c!==h;c+=4)cn.slerpFlat(r,0,a,c-o,a,c,l);return r}}class Kr extends dn{constructor(e,t,i,n){super(e,t,i,n)}InterpolantFactoryMethodLinear(e){return new vv(this.times,this.values,this.getValueSize(),e)}}Kr.prototype.ValueTypeName="quaternion";Kr.prototype.InterpolantFactoryMethodSmooth=void 0;class la extends dn{constructor(e,t,i){super(e,t,i)}}la.prototype.ValueTypeName="string";la.prototype.ValueBufferType=Array;la.prototype.DefaultInterpolation=Ba;la.prototype.InterpolantFactoryMethodLinear=void 0;la.prototype.InterpolantFactoryMethodSmooth=void 0;class Zr extends dn{constructor(e,t,i,n){super(e,t,i,n)}}Zr.prototype.ValueTypeName="vector";class xv{constructor(e="",t=-1,i=[],n=Qg){this.name=e,this.tracks=i,this.duration=t,this.blendMode=n,this.uuid=ln(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],i=e.tracks,n=1/(e.fps||1);for(let a=0,o=i.length;a!==o;++a)t.push(Mv(i[a]).scale(n));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){const t=[],i=e.tracks,n={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,a=i.length;r!==a;++r)t.push(dn.toJSON(i[r]));return n}static CreateFromMorphTargetSequence(e,t,i,n){const r=t.length,a=[];for(let o=0;o<r;o++){let l=[],c=[];l.push((o+r-1)%r,o,(o+1)%r),c.push(0,1,0);const h=fv(l);l=Tf(l,1,h),c=Tf(c,1,h),!n&&l[0]===0&&(l.push(r),c.push(c[0])),a.push(new jr(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/i))}return new this(e,-1,a)}static findByName(e,t){let i=e;if(!Array.isArray(e)){const n=e;i=n.geometry&&n.geometry.animations||n.animations}for(let n=0;n<i.length;n++)if(i[n].name===t)return i[n];return null}static CreateClipsFromMorphTargetSequences(e,t,i){const n={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){const c=e[o],h=c.name.match(r);if(h&&h.length>1){const d=h[1];let u=n[d];u||(n[d]=u=[]),u.push(c)}}const a=[];for(const o in n)a.push(this.CreateFromMorphTargetSequence(o,n[o],t,i));return a}static parseAnimation(e,t){if(Pe("AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return Ue("AnimationClip: No animation in JSONLoader data."),null;const i=function(d,u,f,p,g){if(f.length!==0){const m=[],_=[];vm(f,m,_,p),m.length!==0&&g.push(new d(u,m,_))}},n=[],r=e.name||"default",a=e.fps||30,o=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let d=0;d<c.length;d++){const u=c[d].keys;if(!(!u||u.length===0))if(u[0].morphTargets){const f={};let p;for(p=0;p<u.length;p++)if(u[p].morphTargets)for(let g=0;g<u[p].morphTargets.length;g++)f[u[p].morphTargets[g]]=-1;for(const g in f){const m=[],_=[];for(let x=0;x!==u[p].morphTargets.length;++x){const E=u[p];m.push(E.time),_.push(E.morphTarget===g?1:0)}n.push(new jr(".morphTargetInfluence["+g+"]",m,_))}l=f.length*a}else{const f=".bones["+t[d].name+"]";i(Zr,f+".position",u,"pos",n),i(Kr,f+".quaternion",u,"rot",n),i(Zr,f+".scale",u,"scl",n)}}return n.length===0?null:new this(r,l,n,o)}resetDuration(){const e=this.tracks;let t=0;for(let i=0,n=e.length;i!==n;++i){const r=this.tracks[i];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let i=0;i<this.tracks.length;i++)e.push(this.tracks[i].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function yv(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return jr;case"vector":case"vector2":case"vector3":case"vector4":return Zr;case"color":return xm;case"quaternion":return Kr;case"bool":case"boolean":return oa;case"string":return la}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function Mv(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=yv(s.type);if(s.times===void 0){const t=[],i=[];vm(s.keys,t,i,"value"),s.times=t,s.values=i}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}const Gn={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(wf(s)||(this.files[s]=e))},get:function(s){if(this.enabled!==!1&&!wf(s))return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};function wf(s){try{const e=s.slice(s.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class bv{constructor(e,t,i){const n=this;let r=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(h){o++,r===!1&&n.onStart!==void 0&&n.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,n.onProgress!==void 0&&n.onProgress(h,a,o),a===o&&(r=!1,n.onLoad!==void 0&&n.onLoad())},this.itemError=function(h){n.onError!==void 0&&n.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){const d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){const f=c[d],p=c[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const Sv=new bv;class ca{constructor(e){this.manager=e!==void 0?e:Sv,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const i=this;return new Promise(function(n,r){i.load(e,n,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}ca.DEFAULT_MATERIAL_NAME="__DEFAULT";const kn={};class Ev extends Error{constructor(e,t){super(e),this.response=t}}class ym extends ca{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,i,n){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=Gn.get(`file:${e}`);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(kn[e]!==void 0){kn[e].push({onLoad:t,onProgress:i,onError:n});return}kn[e]=[],kn[e].push({onLoad:t,onProgress:i,onError:n});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&Pe("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=kn[e],d=c.body.getReader(),u=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=u?parseInt(u):0,p=f!==0;let g=0;const m=new ReadableStream({start(_){x();function x(){d.read().then(({done:E,value:y})=>{if(E)_.close();else{g+=y.byteLength;const M=new ProgressEvent("progress",{lengthComputable:p,loaded:g,total:f});for(let w=0,A=h.length;w<A;w++){const v=h[w];v.onProgress&&v.onProgress(M)}_.enqueue(y),x()}},E=>{_.error(E)})}}});return new Response(m)}else throw new Ev(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return c.json();default:if(o==="")return c.text();{const d=/charset="?([^;"\s]*)"?/i.exec(o),u=d&&d[1]?d[1].toLowerCase():void 0,f=new TextDecoder(u);return c.arrayBuffer().then(p=>f.decode(p))}}}).then(c=>{Gn.add(`file:${e}`,c);const h=kn[e];delete kn[e];for(let d=0,u=h.length;d<u;d++){const f=h[d];f.onLoad&&f.onLoad(c)}}).catch(c=>{const h=kn[e];if(h===void 0)throw this.manager.itemError(e),c;delete kn[e];for(let d=0,u=h.length;d<u;d++){const f=h[d];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const _r=new WeakMap;class Tv extends ca{constructor(e){super(e)}load(e,t,i,n){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Gn.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let d=_r.get(a);d===void 0&&(d=[],_r.set(a,d)),d.push({onLoad:t,onError:n})}return a}const o=Ha("img");function l(){h(),t&&t(this);const d=_r.get(this)||[];for(let u=0;u<d.length;u++){const f=d[u];f.onLoad&&f.onLoad(this)}_r.delete(this),r.manager.itemEnd(e)}function c(d){h(),n&&n(d),Gn.remove(`image:${e}`);const u=_r.get(this)||[];for(let f=0;f<u.length;f++){const p=u[f];p.onError&&p.onError(d)}_r.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Gn.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}}class wv extends ca{constructor(e){super(e)}load(e,t,i,n){const r=new Zt,a=new Tv(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},i,n),r}}class Ol extends bt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Le(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class Av extends Ol{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(bt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Le(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const Ac=new He,Af=new D,Cf=new D;class ju{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new De(512,512),this.mapType=Oi,this.map=null,this.mapPass=null,this.matrix=new He,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Xu,this._frameExtents=new De(1,1),this._viewportCount=1,this._viewports=[new Tt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Af.setFromMatrixPosition(e.matrixWorld),t.position.copy(Af),Cf.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Cf),t.updateMatrixWorld(),Ac.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ac,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Va||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Ac)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Io=new D,Lo=new cn,pn=new D;class Mm extends bt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new He,this.projectionMatrix=new He,this.projectionMatrixInverse=new He,this.coordinateSystem=Sn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Io,Lo,pn),pn.x===1&&pn.y===1&&pn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Io,Lo,pn.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(Io,Lo,pn),pn.x===1&&pn.y===1&&pn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Io,Lo,pn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const os=new D,Rf=new De,Pf=new De;class ui extends Mm{constructor(e=50,t=1,i=.1,n=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=n,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Yr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Da*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Yr*2*Math.atan(Math.tan(Da*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){os.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(os.x,os.y).multiplyScalar(-e/os.z),os.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(os.x,os.y).multiplyScalar(-e/os.z)}getViewSize(e,t){return this.getViewBounds(e,Rf,Pf),t.subVectors(Pf,Rf)}setViewOffset(e,t,i,n,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Da*.5*this.fov)/this.zoom,i=2*t,n=this.aspect*i,r=-.5*n;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*n/l,t-=a.offsetY*i/c,n*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+n,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Cv extends ju{constructor(){super(new ui(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,i=Yr*2*e.angle*this.focus,n=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(i!==t.fov||n!==t.aspect||r!==t.far)&&(t.fov=i,t.aspect=n,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Rv extends Ol{constructor(e,t,i=0,n=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(bt.DEFAULT_UP),this.updateMatrix(),this.target=new bt,this.distance=i,this.angle=n,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new Cv}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}}class Pv extends ju{constructor(){super(new ui(90,1,.5,500)),this.isPointLightShadow=!0}}class bm extends Ol{constructor(e,t,i=0,n=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=n,this.shadow=new Pv}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class to extends Mm{constructor(e=-1,t=1,i=1,n=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=n,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,n,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,n=(this.top+this.bottom)/2;let r=i-e,a=i+e,o=n+t,l=n-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Dv extends ju{constructor(){super(new to(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class $h extends Ol{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(bt.DEFAULT_UP),this.updateMatrix(),this.target=new bt,this.shadow=new Dv}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class La{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const Cc=new WeakMap;class Iv extends ca{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Pe("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Pe("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,i,n){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Gn.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(c=>{if(Cc.has(a)===!0)n&&n(Cc.get(a)),r.manager.itemError(e),r.manager.itemEnd(e);else return t&&t(c),r.manager.itemEnd(e),c});return}return setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return Gn.add(`image-bitmap:${e}`,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){n&&n(c),Cc.set(l,c),Gn.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});Gn.add(`image-bitmap:${e}`,l),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const vr=-90,xr=1;class Lv extends bt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const n=new ui(vr,xr,e,t);n.layers=this.layers,this.add(n);const r=new ui(vr,xr,e,t);r.layers=this.layers,this.add(r);const a=new ui(vr,xr,e,t);a.layers=this.layers,this.add(a);const o=new ui(vr,xr,e,t);o.layers=this.layers,this.add(o);const l=new ui(vr,xr,e,t);l.layers=this.layers,this.add(l);const c=new ui(vr,xr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,n,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===Sn)i.up.set(0,1,0),i.lookAt(1,0,0),n.up.set(0,1,0),n.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Va)i.up.set(0,-1,0),i.lookAt(-1,0,0),n.up.set(0,-1,0),n.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:n}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;const g=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(i,0,n),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,n),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,n),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,n),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,n),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=g,e.setRenderTarget(i,5,n),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(d,u,f),e.xr.enabled=p,i.texture.needsPMREMUpdate=!0}}class Nv extends ui{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Ov{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=Uv.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function Uv(){this._document.hidden===!1&&this.reset()}const Ku="\\[\\]\\.:\\/",Fv=new RegExp("["+Ku+"]","g"),Zu="[^"+Ku+"]",kv="[^"+Ku.replace("\\.","")+"]",Bv=/((?:WC+[\/:])*)/.source.replace("WC",Zu),zv=/(WCOD+)?/.source.replace("WCOD",kv),Vv=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Zu),Hv=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Zu),Gv=new RegExp("^"+Bv+zv+Vv+Hv+"$"),Wv=["material","materials","bones","map"];class Xv{constructor(e,t,i){const n=i||ut.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,n)}getValue(e,t){this.bind();const i=this._targetGroup.nCachedObjects_,n=this._bindings[i];n!==void 0&&n.getValue(e,t)}setValue(e,t){const i=this._bindings;for(let n=this._targetGroup.nCachedObjects_,r=i.length;n!==r;++n)i[n].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}}class ut{constructor(e,t,i){this.path=t,this.parsedPath=i||ut.parseTrackName(t),this.node=ut.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new ut.Composite(e,t,i):new ut(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Fv,"")}static parseTrackName(e){const t=Gv.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},n=i.nodeName&&i.nodeName.lastIndexOf(".");if(n!==void 0&&n!==-1){const r=i.nodeName.substring(n+1);Wv.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,n),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){const i=function(r){for(let a=0;a<r.length;a++){const o=r[a];if(o.name===t||o.uuid===t)return o;const l=i(o.children);if(l)return l}return null},n=i(e.children);if(n)return n}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)e[t++]=i[n]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)i[n]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)i[n]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const i=this.resolvedProperty;for(let n=0,r=i.length;n!==r;++n)i[n]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,i=t.objectName,n=t.propertyName;let r=t.propertyIndex;if(e||(e=ut.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Pe("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=t.objectIndex;switch(i){case"materials":if(!e.material){Ue("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Ue("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Ue("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Ue("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Ue("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){Ue("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(c!==void 0){if(e[c]===void 0){Ue("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const a=e[n];if(a===void 0){const c=t.nodeName;Ue("PropertyBinding: Trying to update property for track: "+c+"."+n+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(n==="morphTargetInfluences"){if(!e.geometry){Ue("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Ue("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=n;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}ut.Composite=Xv;ut.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ut.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ut.prototype.GetterByBindingType=[ut.prototype._getValue_direct,ut.prototype._getValue_array,ut.prototype._getValue_arrayElement,ut.prototype._getValue_toArray];ut.prototype.SetterByBindingTypeAndVersioning=[[ut.prototype._setValue_direct,ut.prototype._setValue_direct_setNeedsUpdate,ut.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ut.prototype._setValue_array,ut.prototype._setValue_array_setNeedsUpdate,ut.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ut.prototype._setValue_arrayElement,ut.prototype._setValue_arrayElement_setNeedsUpdate,ut.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ut.prototype._setValue_fromArray,ut.prototype._setValue_fromArray_setNeedsUpdate,ut.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];const Df=new He;class Yv{constructor(e,t,i=0,n=1/0){this.ray=new sa(e,t),this.near=i,this.far=n,this.camera=null,this.layers=new zu,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Ue("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Df.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Df),this}intersectObject(e,t=!0,i=[]){return jh(e,this,i,t),i.sort(If),i}intersectObjects(e,t=!0,i=[]){for(let n=0,r=e.length;n<r;n++)jh(e[n],this,i,t);return i.sort(If),i}}function If(s,e){return s.distance-e.distance}function jh(s,e,t,i){let n=!0;if(s.layers.test(e.layers)&&s.raycast(e,t)===!1&&(n=!1),n===!0&&i===!0){const r=s.children;for(let a=0,o=r.length;a<o;a++)jh(r[a],e,t,!0)}}class Lf{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=qe(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(qe(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class qv extends Js{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){Pe("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function Nf(s,e,t,i){const n=$v(i);switch(t){case tm:return s*e;case Dl:return s*e/n.components*n.byteLength;case Lu:return s*e/n.components*n.byteLength;case Xr:return s*e*2/n.components*n.byteLength;case Nu:return s*e*2/n.components*n.byteLength;case im:return s*e*3/n.components*n.byteLength;case Ki:return s*e*4/n.components*n.byteLength;case Ou:return s*e*4/n.components*n.byteLength;case jo:case Ko:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Zo:case Jo:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case fh:case mh:return Math.max(s,16)*Math.max(e,8)/4;case dh:case ph:return Math.max(s,8)*Math.max(e,8)/2;case gh:case _h:case xh:case yh:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case vh:case Mh:case bh:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Sh:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Eh:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case Th:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case wh:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case Ah:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case Ch:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case Rh:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case Ph:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case Dh:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case Ih:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case Lh:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case Nh:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case Oh:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case Uh:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case Fh:case kh:case Bh:return Math.ceil(s/4)*Math.ceil(e/4)*16;case zh:case Vh:return Math.ceil(s/4)*Math.ceil(e/4)*8;case Hh:case Gh:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function $v(s){switch(s){case Oi:case Zp:return{byteLength:1,components:1};case ka:case Jp:case Gi:return{byteLength:2,components:1};case Du:case Iu:return{byteLength:2,components:4};case Cn:case Pu:case Fi:return{byteLength:4,components:1};case Qp:case em:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:bu}}));typeof window<"u"&&(window.__THREE__?Pe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=bu);function Sm(){let s=null,e=!1,t=null,i=null;function n(r,a){t(r,a),i=s.requestAnimationFrame(n)}return{start:function(){e!==!0&&t!==null&&(i=s.requestAnimationFrame(n),e=!0)},stop:function(){s.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function jv(s){const e=new WeakMap;function t(o,l){const c=o.array,h=o.usage,d=c.byteLength,u=s.createBuffer();s.bindBuffer(l,u),s.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=s.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,l,c){const h=l.array,d=l.updateRanges;if(s.bindBuffer(c,o),d.length===0)s.bufferSubData(c,0,h);else{d.sort((f,p)=>f.start-p.start);let u=0;for(let f=1;f<d.length;f++){const p=d[u],g=d[f];g.start<=p.start+p.count+1?p.count=Math.max(p.count,g.start+g.count-p.start):(++u,d[u]=g)}d.length=u+1;for(let f=0,p=d.length;f<p;f++){const g=d[f];s.bufferSubData(c,g.start*h.BYTES_PER_ELEMENT,h,g.start,g.count)}l.clearUpdateRanges()}l.onUploadCallback()}function n(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(s.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:n,remove:r,update:a}}var Kv=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Zv=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Jv=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Qv=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ex=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,tx=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ix=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,nx=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,sx=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,rx=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,ax=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ox=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,lx=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,cx=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,hx=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,ux=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,dx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,fx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,px=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,mx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,gx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,_x=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,vx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,xx=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,yx=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Mx=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,bx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Sx=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ex=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Tx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,wx="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ax=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Cx=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Rx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Px=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Dx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ix=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Lx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Nx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ox=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ux=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Fx=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,kx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Bx=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,zx=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Vx=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Hx=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Gx=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Wx=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Xx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Yx=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,qx=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,$x=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return v;
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,jx=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Kx=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Zx=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Jx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Qx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ey=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ty=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,iy=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ny=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,sy=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,ry=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ay=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,oy=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ly=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,cy=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,hy=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,uy=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,dy=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,fy=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,py=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,my=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_y=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,vy=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,xy=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,yy=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,My=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,by=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Sy=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ey=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Ty=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,wy=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ay=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Cy=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ry=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Py=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Dy=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Iy=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Ly=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Ny=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Oy=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Uy=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Fy=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ky=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,By=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,zy=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Vy=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Hy=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Gy=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Wy=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Xy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Yy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,qy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,$y=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const jy=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ky=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Jy=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,eM=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,tM=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,iM=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,nM=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,sM=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,rM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,aM=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,oM=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,lM=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,cM=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,hM=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,uM=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,dM=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fM=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,pM=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,mM=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,gM=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,_M=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,vM=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xM=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,yM=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,MM=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,bM=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,SM=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,EM=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,TM=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,wM=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,AM=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,CM=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Xe={alphahash_fragment:Kv,alphahash_pars_fragment:Zv,alphamap_fragment:Jv,alphamap_pars_fragment:Qv,alphatest_fragment:ex,alphatest_pars_fragment:tx,aomap_fragment:ix,aomap_pars_fragment:nx,batching_pars_vertex:sx,batching_vertex:rx,begin_vertex:ax,beginnormal_vertex:ox,bsdfs:lx,iridescence_fragment:cx,bumpmap_pars_fragment:hx,clipping_planes_fragment:ux,clipping_planes_pars_fragment:dx,clipping_planes_pars_vertex:fx,clipping_planes_vertex:px,color_fragment:mx,color_pars_fragment:gx,color_pars_vertex:_x,color_vertex:vx,common:xx,cube_uv_reflection_fragment:yx,defaultnormal_vertex:Mx,displacementmap_pars_vertex:bx,displacementmap_vertex:Sx,emissivemap_fragment:Ex,emissivemap_pars_fragment:Tx,colorspace_fragment:wx,colorspace_pars_fragment:Ax,envmap_fragment:Cx,envmap_common_pars_fragment:Rx,envmap_pars_fragment:Px,envmap_pars_vertex:Dx,envmap_physical_pars_fragment:Hx,envmap_vertex:Ix,fog_vertex:Lx,fog_pars_vertex:Nx,fog_fragment:Ox,fog_pars_fragment:Ux,gradientmap_pars_fragment:Fx,lightmap_pars_fragment:kx,lights_lambert_fragment:Bx,lights_lambert_pars_fragment:zx,lights_pars_begin:Vx,lights_toon_fragment:Gx,lights_toon_pars_fragment:Wx,lights_phong_fragment:Xx,lights_phong_pars_fragment:Yx,lights_physical_fragment:qx,lights_physical_pars_fragment:$x,lights_fragment_begin:jx,lights_fragment_maps:Kx,lights_fragment_end:Zx,logdepthbuf_fragment:Jx,logdepthbuf_pars_fragment:Qx,logdepthbuf_pars_vertex:ey,logdepthbuf_vertex:ty,map_fragment:iy,map_pars_fragment:ny,map_particle_fragment:sy,map_particle_pars_fragment:ry,metalnessmap_fragment:ay,metalnessmap_pars_fragment:oy,morphinstance_vertex:ly,morphcolor_vertex:cy,morphnormal_vertex:hy,morphtarget_pars_vertex:uy,morphtarget_vertex:dy,normal_fragment_begin:fy,normal_fragment_maps:py,normal_pars_fragment:my,normal_pars_vertex:gy,normal_vertex:_y,normalmap_pars_fragment:vy,clearcoat_normal_fragment_begin:xy,clearcoat_normal_fragment_maps:yy,clearcoat_pars_fragment:My,iridescence_pars_fragment:by,opaque_fragment:Sy,packing:Ey,premultiplied_alpha_fragment:Ty,project_vertex:wy,dithering_fragment:Ay,dithering_pars_fragment:Cy,roughnessmap_fragment:Ry,roughnessmap_pars_fragment:Py,shadowmap_pars_fragment:Dy,shadowmap_pars_vertex:Iy,shadowmap_vertex:Ly,shadowmask_pars_fragment:Ny,skinbase_vertex:Oy,skinning_pars_vertex:Uy,skinning_vertex:Fy,skinnormal_vertex:ky,specularmap_fragment:By,specularmap_pars_fragment:zy,tonemapping_fragment:Vy,tonemapping_pars_fragment:Hy,transmission_fragment:Gy,transmission_pars_fragment:Wy,uv_pars_fragment:Xy,uv_pars_vertex:Yy,uv_vertex:qy,worldpos_vertex:$y,background_vert:jy,background_frag:Ky,backgroundCube_vert:Zy,backgroundCube_frag:Jy,cube_vert:Qy,cube_frag:eM,depth_vert:tM,depth_frag:iM,distance_vert:nM,distance_frag:sM,equirect_vert:rM,equirect_frag:aM,linedashed_vert:oM,linedashed_frag:lM,meshbasic_vert:cM,meshbasic_frag:hM,meshlambert_vert:uM,meshlambert_frag:dM,meshmatcap_vert:fM,meshmatcap_frag:pM,meshnormal_vert:mM,meshnormal_frag:gM,meshphong_vert:_M,meshphong_frag:vM,meshphysical_vert:xM,meshphysical_frag:yM,meshtoon_vert:MM,meshtoon_frag:bM,points_vert:SM,points_frag:EM,shadow_vert:TM,shadow_frag:wM,sprite_vert:AM,sprite_frag:CM},de={common:{diffuse:{value:new Le(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new We}},envmap:{envMap:{value:null},envMapRotation:{value:new We},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new We}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new We}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new We},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new We},normalScale:{value:new De(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new We},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new We}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new We}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new We}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Le(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Le(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0},uvTransform:{value:new We}},sprite:{diffuse:{value:new Le(16777215)},opacity:{value:1},center:{value:new De(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}}},vn={basic:{uniforms:_i([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.fog]),vertexShader:Xe.meshbasic_vert,fragmentShader:Xe.meshbasic_frag},lambert:{uniforms:_i([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new Le(0)},envMapIntensity:{value:1}}]),vertexShader:Xe.meshlambert_vert,fragmentShader:Xe.meshlambert_frag},phong:{uniforms:_i([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new Le(0)},specular:{value:new Le(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphong_vert,fragmentShader:Xe.meshphong_frag},standard:{uniforms:_i([de.common,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.roughnessmap,de.metalnessmap,de.fog,de.lights,{emissive:{value:new Le(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag},toon:{uniforms:_i([de.common,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.gradientmap,de.fog,de.lights,{emissive:{value:new Le(0)}}]),vertexShader:Xe.meshtoon_vert,fragmentShader:Xe.meshtoon_frag},matcap:{uniforms:_i([de.common,de.bumpmap,de.normalmap,de.displacementmap,de.fog,{matcap:{value:null}}]),vertexShader:Xe.meshmatcap_vert,fragmentShader:Xe.meshmatcap_frag},points:{uniforms:_i([de.points,de.fog]),vertexShader:Xe.points_vert,fragmentShader:Xe.points_frag},dashed:{uniforms:_i([de.common,de.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xe.linedashed_vert,fragmentShader:Xe.linedashed_frag},depth:{uniforms:_i([de.common,de.displacementmap]),vertexShader:Xe.depth_vert,fragmentShader:Xe.depth_frag},normal:{uniforms:_i([de.common,de.bumpmap,de.normalmap,de.displacementmap,{opacity:{value:1}}]),vertexShader:Xe.meshnormal_vert,fragmentShader:Xe.meshnormal_frag},sprite:{uniforms:_i([de.sprite,de.fog]),vertexShader:Xe.sprite_vert,fragmentShader:Xe.sprite_frag},background:{uniforms:{uvTransform:{value:new We},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xe.background_vert,fragmentShader:Xe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new We}},vertexShader:Xe.backgroundCube_vert,fragmentShader:Xe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xe.cube_vert,fragmentShader:Xe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xe.equirect_vert,fragmentShader:Xe.equirect_frag},distance:{uniforms:_i([de.common,de.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xe.distance_vert,fragmentShader:Xe.distance_frag},shadow:{uniforms:_i([de.lights,de.fog,{color:{value:new Le(0)},opacity:{value:1}}]),vertexShader:Xe.shadow_vert,fragmentShader:Xe.shadow_frag}};vn.physical={uniforms:_i([vn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new We},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new We},clearcoatNormalScale:{value:new De(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new We},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new We},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new We},sheen:{value:0},sheenColor:{value:new Le(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new We},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new We},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new We},transmissionSamplerSize:{value:new De},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new We},attenuationDistance:{value:0},attenuationColor:{value:new Le(0)},specularColor:{value:new Le(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new We},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new We},anisotropyVector:{value:new De},anisotropyMap:{value:null},anisotropyMapTransform:{value:new We}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag};const No={r:0,b:0,g:0},Ls=new hn,RM=new He;function PM(s,e,t,i,n,r){const a=new Le(0);let o=n===!0?0:1,l,c,h=null,d=0,u=null;function f(x){let E=x.isScene===!0?x.background:null;if(E&&E.isTexture){const y=x.backgroundBlurriness>0;E=e.get(E,y)}return E}function p(x){let E=!1;const y=f(x);y===null?m(a,o):y&&y.isColor&&(m(y,1),E=!0);const M=s.xr.getEnvironmentBlendMode();M==="additive"?t.buffers.color.setClear(0,0,0,1,r):M==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(s.autoClear||E)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function g(x,E){const y=f(E);y&&(y.isCubeTexture||y.mapping===Pl)?(c===void 0&&(c=new at(new ra(1,1,1),new ii({name:"BackgroundCubeMaterial",uniforms:$r(vn.backgroundCube.uniforms),vertexShader:vn.backgroundCube.vertexShader,fragmentShader:vn.backgroundCube.fragmentShader,side:vi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(M,w,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),Ls.copy(E.backgroundRotation),Ls.x*=-1,Ls.y*=-1,Ls.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Ls.y*=-1,Ls.z*=-1),c.material.uniforms.envMap.value=y,c.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(RM.makeRotationFromEuler(Ls)),c.material.toneMapped=Ze.getTransfer(y.colorSpace)!==lt,(h!==y||d!==y.version||u!==s.toneMapping)&&(c.material.needsUpdate=!0,h=y,d=y.version,u=s.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new at(new Gs(2,2),new ii({name:"BackgroundMaterial",uniforms:$r(vn.background.uniforms),vertexShader:vn.background.vertexShader,fragmentShader:vn.background.fragmentShader,side:$n,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=Ze.getTransfer(y.colorSpace)!==lt,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||d!==y.version||u!==s.toneMapping)&&(l.material.needsUpdate=!0,h=y,d=y.version,u=s.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null))}function m(x,E){x.getRGB(No,mm(s)),t.buffers.color.setClear(No.r,No.g,No.b,E,r)}function _(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(x,E=1){a.set(x),o=E,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(x){o=x,m(a,o)},render:p,addToRenderList:g,dispose:_}}function DM(s,e){const t=s.getParameter(s.MAX_VERTEX_ATTRIBS),i={},n=u(null);let r=n,a=!1;function o(C,N,O,V,B){let F=!1;const L=d(C,V,O,N);r!==L&&(r=L,c(r.object)),F=f(C,V,O,B),F&&p(C,V,O,B),B!==null&&e.update(B,s.ELEMENT_ARRAY_BUFFER),(F||a)&&(a=!1,y(C,N,O,V),B!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function l(){return s.createVertexArray()}function c(C){return s.bindVertexArray(C)}function h(C){return s.deleteVertexArray(C)}function d(C,N,O,V){const B=V.wireframe===!0;let F=i[N.id];F===void 0&&(F={},i[N.id]=F);const L=C.isInstancedMesh===!0?C.id:0;let K=F[L];K===void 0&&(K={},F[L]=K);let q=K[O.id];q===void 0&&(q={},K[O.id]=q);let ie=q[B];return ie===void 0&&(ie=u(l()),q[B]=ie),ie}function u(C){const N=[],O=[],V=[];for(let B=0;B<t;B++)N[B]=0,O[B]=0,V[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:O,attributeDivisors:V,object:C,attributes:{},index:null}}function f(C,N,O,V){const B=r.attributes,F=N.attributes;let L=0;const K=O.getAttributes();for(const q in K)if(K[q].location>=0){const ue=B[q];let ne=F[q];if(ne===void 0&&(q==="instanceMatrix"&&C.instanceMatrix&&(ne=C.instanceMatrix),q==="instanceColor"&&C.instanceColor&&(ne=C.instanceColor)),ue===void 0||ue.attribute!==ne||ne&&ue.data!==ne.data)return!0;L++}return r.attributesNum!==L||r.index!==V}function p(C,N,O,V){const B={},F=N.attributes;let L=0;const K=O.getAttributes();for(const q in K)if(K[q].location>=0){let ue=F[q];ue===void 0&&(q==="instanceMatrix"&&C.instanceMatrix&&(ue=C.instanceMatrix),q==="instanceColor"&&C.instanceColor&&(ue=C.instanceColor));const ne={};ne.attribute=ue,ue&&ue.data&&(ne.data=ue.data),B[q]=ne,L++}r.attributes=B,r.attributesNum=L,r.index=V}function g(){const C=r.newAttributes;for(let N=0,O=C.length;N<O;N++)C[N]=0}function m(C){_(C,0)}function _(C,N){const O=r.newAttributes,V=r.enabledAttributes,B=r.attributeDivisors;O[C]=1,V[C]===0&&(s.enableVertexAttribArray(C),V[C]=1),B[C]!==N&&(s.vertexAttribDivisor(C,N),B[C]=N)}function x(){const C=r.newAttributes,N=r.enabledAttributes;for(let O=0,V=N.length;O<V;O++)N[O]!==C[O]&&(s.disableVertexAttribArray(O),N[O]=0)}function E(C,N,O,V,B,F,L){L===!0?s.vertexAttribIPointer(C,N,O,B,F):s.vertexAttribPointer(C,N,O,V,B,F)}function y(C,N,O,V){g();const B=V.attributes,F=O.getAttributes(),L=N.defaultAttributeValues;for(const K in F){const q=F[K];if(q.location>=0){let ie=B[K];if(ie===void 0&&(K==="instanceMatrix"&&C.instanceMatrix&&(ie=C.instanceMatrix),K==="instanceColor"&&C.instanceColor&&(ie=C.instanceColor)),ie!==void 0){const ue=ie.normalized,ne=ie.itemSize,Z=e.get(ie);if(Z===void 0)continue;const ae=Z.buffer,ve=Z.type,W=Z.bytesPerElement,J=ve===s.INT||ve===s.UNSIGNED_INT||ie.gpuType===Pu;if(ie.isInterleavedBufferAttribute){const ee=ie.data,Ce=ee.stride,xe=ie.offset;if(ee.isInstancedInterleavedBuffer){for(let Fe=0;Fe<q.locationSize;Fe++)_(q.location+Fe,ee.meshPerAttribute);C.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let Fe=0;Fe<q.locationSize;Fe++)m(q.location+Fe);s.bindBuffer(s.ARRAY_BUFFER,ae);for(let Fe=0;Fe<q.locationSize;Fe++)E(q.location+Fe,ne/q.locationSize,ve,ue,Ce*W,(xe+ne/q.locationSize*Fe)*W,J)}else{if(ie.isInstancedBufferAttribute){for(let ee=0;ee<q.locationSize;ee++)_(q.location+ee,ie.meshPerAttribute);C.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let ee=0;ee<q.locationSize;ee++)m(q.location+ee);s.bindBuffer(s.ARRAY_BUFFER,ae);for(let ee=0;ee<q.locationSize;ee++)E(q.location+ee,ne/q.locationSize,ve,ue,ne*W,ne/q.locationSize*ee*W,J)}}else if(L!==void 0){const ue=L[K];if(ue!==void 0)switch(ue.length){case 2:s.vertexAttrib2fv(q.location,ue);break;case 3:s.vertexAttrib3fv(q.location,ue);break;case 4:s.vertexAttrib4fv(q.location,ue);break;default:s.vertexAttrib1fv(q.location,ue)}}}}x()}function M(){S();for(const C in i){const N=i[C];for(const O in N){const V=N[O];for(const B in V){const F=V[B];for(const L in F)h(F[L].object),delete F[L];delete V[B]}}delete i[C]}}function w(C){if(i[C.id]===void 0)return;const N=i[C.id];for(const O in N){const V=N[O];for(const B in V){const F=V[B];for(const L in F)h(F[L].object),delete F[L];delete V[B]}}delete i[C.id]}function A(C){for(const N in i){const O=i[N];for(const V in O){const B=O[V];if(B[C.id]===void 0)continue;const F=B[C.id];for(const L in F)h(F[L].object),delete F[L];delete B[C.id]}}}function v(C){for(const N in i){const O=i[N],V=C.isInstancedMesh===!0?C.id:0,B=O[V];if(B!==void 0){for(const F in B){const L=B[F];for(const K in L)h(L[K].object),delete L[K];delete B[F]}delete O[V],Object.keys(O).length===0&&delete i[N]}}}function S(){P(),a=!0,r!==n&&(r=n,c(r.object))}function P(){n.geometry=null,n.program=null,n.wireframe=!1}return{setup:o,reset:S,resetDefaultState:P,dispose:M,releaseStatesOfGeometry:w,releaseStatesOfObject:v,releaseStatesOfProgram:A,initAttributes:g,enableAttribute:m,disableUnusedAttributes:x}}function IM(s,e,t){let i;function n(c){i=c}function r(c,h){s.drawArrays(i,c,h),t.update(h,i,1)}function a(c,h,d){d!==0&&(s.drawArraysInstanced(i,c,h,d),t.update(h,i,d))}function o(c,h,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,d);let f=0;for(let p=0;p<d;p++)f+=h[p];t.update(f,i,1)}function l(c,h,d,u){if(d===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let p=0;p<c.length;p++)a(c[p],h[p],u[p]);else{f.multiDrawArraysInstancedWEBGL(i,c,0,h,0,u,0,d);let p=0;for(let g=0;g<d;g++)p+=h[g]*u[g];t.update(p,i,1)}}this.setMode=n,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function LM(s,e,t,i){let n;function r(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");n=s.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function a(A){return!(A!==Ki&&i.convert(A)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const v=A===Gi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==Oi&&i.convert(A)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Fi&&!v)}function l(A){if(A==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(Pe("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const d=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),p=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),_=s.getParameter(s.MAX_VERTEX_ATTRIBS),x=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),E=s.getParameter(s.MAX_VARYING_VECTORS),y=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),M=s.getParameter(s.MAX_SAMPLES),w=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:p,maxTextureSize:g,maxCubemapSize:m,maxAttributes:_,maxVertexUniforms:x,maxVaryings:E,maxFragmentUniforms:y,maxSamples:M,samples:w}}function NM(s){const e=this;let t=null,i=0,n=!1,r=!1;const a=new hs,o=new We,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||i!==0||n;return n=u,i=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,f){const p=d.clippingPlanes,g=d.clipIntersection,m=d.clipShadows,_=s.get(d);if(!n||p===null||p.length===0||r&&!m)r?h(null):c();else{const x=r?0:i,E=x*4;let y=_.clippingState||null;l.value=y,y=h(p,u,E,f);for(let M=0;M!==E;++M)y[M]=t[M];_.clippingState=y,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(d,u,f,p){const g=d!==null?d.length:0;let m=null;if(g!==0){if(m=l.value,p!==!0||m===null){const _=f+g*4,x=u.matrixWorldInverse;o.getNormalMatrix(x),(m===null||m.length<_)&&(m=new Float32Array(_));for(let E=0,y=f;E!==g;++E,y+=4)a.copy(d[E]).applyMatrix4(x,o),a.normal.toArray(m,y),m[y+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,m}}const ms=4,Of=[.125,.215,.35,.446,.526,.582],Vs=20,OM=256,xa=new to,Uf=new Le;let Rc=null,Pc=0,Dc=0,Ic=!1;const UM=new D;class Kh{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,n=100,r={}){const{size:a=256,position:o=UM}=r;Rc=this._renderer.getRenderTarget(),Pc=this._renderer.getActiveCubeFace(),Dc=this._renderer.getActiveMipmapLevel(),Ic=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,n,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Bf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=kf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Rc,Pc,Dc),this._renderer.xr.enabled=Ic,e.scissorTest=!1,yr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===$s||e.mapping===Gr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Rc=this._renderer.getRenderTarget(),Pc=this._renderer.getActiveCubeFace(),Dc=this._renderer.getActiveMipmapLevel(),Ic=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Kt,minFilter:Kt,generateMipmaps:!1,type:Gi,format:Ki,colorSpace:yi,depthBuffer:!1},n=Ff(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ff(e,t,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=FM(r)),this._blurMaterial=BM(r,e,t),this._ggxMaterial=kM(r,e,t)}return n}_compileMaterial(e){const t=new at(new mi,e);this._renderer.compile(t,xa)}_sceneToCubeUV(e,t,i,n,r){const l=new ui(90,1,t,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(Uf),d.toneMapping=An,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(n),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new at(new ra,new En({name:"PMREM.Background",side:vi,depthWrite:!1,depthTest:!1})));const g=this._backgroundBox,m=g.material;let _=!1;const x=e.background;x?x.isColor&&(m.color.copy(x),e.background=null,_=!0):(m.color.copy(Uf),_=!0);for(let E=0;E<6;E++){const y=E%3;y===0?(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[E],r.y,r.z)):y===1?(l.up.set(0,0,c[E]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[E],r.z)):(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[E]));const M=this._cubeSize;yr(n,y*M,E>2?M:0,M,M),d.setRenderTarget(n),_&&d.render(g,l),d.render(e,l)}d.toneMapping=f,d.autoClear=u,e.background=x}_textureToCubeUV(e,t){const i=this._renderer,n=e.mapping===$s||e.mapping===Gr;n?(this._cubemapMaterial===null&&(this._cubemapMaterial=Bf()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=kf());const r=n?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;yr(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,xa)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const n=this._lodMeshes.length;for(let r=1;r<n;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){const n=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const l=a.uniforms,c=i/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-h*h),u=0+c*1.25,f=d*u,{_lodMax:p}=this,g=this._sizeLods[i],m=3*g*(i>p-ms?i-p+ms:0),_=4*(this._cubeSize-g);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=p-t,yr(r,m,_,3*g,2*g),n.setRenderTarget(r),n.render(o,xa),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=p-i,yr(e,m,_,3*g,2*g),n.setRenderTarget(e),n.render(o,xa)}_blur(e,t,i,n,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,n,"latitudinal",r),this._halfBlur(a,e,i,i,n,"longitudinal",r)}_halfBlur(e,t,i,n,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Ue("blur direction must be either latitudinal or longitudinal!");const h=3,d=this._lodMeshes[n];d.material=c;const u=c.uniforms,f=this._sizeLods[i]-1,p=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Vs-1),g=r/p,m=isFinite(r)?1+Math.floor(h*g):Vs;m>Vs&&Pe(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Vs}`);const _=[];let x=0;for(let A=0;A<Vs;++A){const v=A/g,S=Math.exp(-v*v/2);_.push(S),A===0?x+=S:A<m&&(x+=2*S)}for(let A=0;A<_.length;A++)_[A]=_[A]/x;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=_,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:E}=this;u.dTheta.value=p,u.mipInt.value=E-i;const y=this._sizeLods[n],M=3*y*(n>E-ms?n-E+ms:0),w=4*(this._cubeSize-y);yr(t,M,w,3*y,2*y),l.setRenderTarget(t),l.render(d,xa)}}function FM(s){const e=[],t=[],i=[];let n=s;const r=s-ms+1+Of.length;for(let a=0;a<r;a++){const o=Math.pow(2,n);e.push(o);let l=1/o;a>s-ms?l=Of[a-s+ms-1]:a===0&&(l=0),t.push(l);const c=1/(o-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,p=6,g=3,m=2,_=1,x=new Float32Array(g*p*f),E=new Float32Array(m*p*f),y=new Float32Array(_*p*f);for(let w=0;w<f;w++){const A=w%3*2/3-1,v=w>2?0:-1,S=[A,v,0,A+2/3,v,0,A+2/3,v+1,0,A,v,0,A+2/3,v+1,0,A,v+1,0];x.set(S,g*p*w),E.set(u,m*p*w);const P=[w,w,w,w,w,w];y.set(P,_*p*w)}const M=new mi;M.setAttribute("position",new xi(x,g)),M.setAttribute("uv",new xi(E,m)),M.setAttribute("faceIndex",new xi(y,_)),i.push(new at(M,null)),n>ms&&n--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function Ff(s,e,t){const i=new Ei(s,e,t);return i.texture.mapping=Pl,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function yr(s,e,t,i,n){s.viewport.set(e,t,i,n),s.scissor.set(e,t,i,n)}function kM(s,e,t){return new ii({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:OM,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ul(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:ai,depthTest:!1,depthWrite:!1})}function BM(s,e,t){const i=new Float32Array(Vs),n=new D(0,1,0);return new ii({name:"SphericalGaussianBlur",defines:{n:Vs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:n}},vertexShader:Ul(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ai,depthTest:!1,depthWrite:!1})}function kf(){return new ii({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ul(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ai,depthTest:!1,depthWrite:!1})}function Bf(){return new ii({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ul(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ai,depthTest:!1,depthWrite:!1})}function Ul(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class Em extends Ei{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},n=[i,i,i,i,i,i];this.texture=new fm(n),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},n=new ra(5,5,5),r=new ii({name:"CubemapFromEquirect",uniforms:$r(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:vi,blending:ai});r.uniforms.tEquirect.value=t;const a=new at(n,r),o=t.minFilter;return t.minFilter===Hn&&(t.minFilter=Kt),new Lv(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,n=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,n);e.setRenderTarget(r)}}function zM(s){let e=new WeakMap,t=new WeakMap,i=null;function n(u,f=!1){return u==null?null:f?a(u):r(u)}function r(u){if(u&&u.isTexture){const f=u.mapping;if(f===Ql||f===ec)if(e.has(u)){const p=e.get(u).texture;return o(p,u.mapping)}else{const p=u.image;if(p&&p.height>0){const g=new Em(p.height);return g.fromEquirectangularTexture(s,u),e.set(u,g),u.addEventListener("dispose",c),o(g.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const f=u.mapping,p=f===Ql||f===ec,g=f===$s||f===Gr;if(p||g){let m=t.get(u);const _=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==_)return i===null&&(i=new Kh(s)),m=p?i.fromEquirectangular(u,m):i.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),m.texture;if(m!==void 0)return m.texture;{const x=u.image;return p&&x&&x.height>0||g&&x&&l(x)?(i===null&&(i=new Kh(s)),m=p?i.fromEquirectangular(u):i.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function o(u,f){return f===Ql?u.mapping=$s:f===ec&&(u.mapping=Gr),u}function l(u){let f=0;const p=6;for(let g=0;g<p;g++)u[g]!==void 0&&f++;return f===p}function c(u){const f=u.target;f.removeEventListener("dispose",c);const p=e.get(f);p!==void 0&&(e.delete(f),p.dispose())}function h(u){const f=u.target;f.removeEventListener("dispose",h);const p=t.get(f);p!==void 0&&(t.delete(f),p.dispose())}function d(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:n,dispose:d}}function VM(s){const e={};function t(i){if(e[i]!==void 0)return e[i];const n=s.getExtension(i);return e[i]=n,n}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const n=t(i);return n===null&&dl("WebGLRenderer: "+i+" extension not supported."),n}}}function HM(s,e,t,i){const n={},r=new WeakMap;function a(d){const u=d.target;u.index!==null&&e.remove(u.index);for(const p in u.attributes)e.remove(u.attributes[p]);u.removeEventListener("dispose",a),delete n[u.id];const f=r.get(u);f&&(e.remove(f),r.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(d,u){return n[u.id]===!0||(u.addEventListener("dispose",a),n[u.id]=!0,t.memory.geometries++),u}function l(d){const u=d.attributes;for(const f in u)e.update(u[f],s.ARRAY_BUFFER)}function c(d){const u=[],f=d.index,p=d.attributes.position;let g=0;if(p===void 0)return;if(f!==null){const x=f.array;g=f.version;for(let E=0,y=x.length;E<y;E+=3){const M=x[E+0],w=x[E+1],A=x[E+2];u.push(M,w,w,A,A,M)}}else{const x=p.array;g=p.version;for(let E=0,y=x.length/3-1;E<y;E+=3){const M=E+0,w=E+1,A=E+2;u.push(M,w,w,A,A,M)}}const m=new(p.count>=65535?lm:om)(u,1);m.version=g;const _=r.get(d);_&&e.remove(_),r.set(d,m)}function h(d){const u=r.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function GM(s,e,t){let i;function n(u){i=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function l(u,f){s.drawElements(i,f,r,u*a),t.update(f,i,1)}function c(u,f,p){p!==0&&(s.drawElementsInstanced(i,f,r,u*a,p),t.update(f,i,p))}function h(u,f,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,r,u,0,p);let m=0;for(let _=0;_<p;_++)m+=f[_];t.update(m,i,1)}function d(u,f,p,g){if(p===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let _=0;_<u.length;_++)c(u[_]/a,f[_],g[_]);else{m.multiDrawElementsInstancedWEBGL(i,f,0,r,u,0,g,0,p);let _=0;for(let x=0;x<p;x++)_+=f[x]*g[x];t.update(_,i,1)}}this.setMode=n,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function WM(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case s.TRIANGLES:t.triangles+=o*(r/3);break;case s.LINES:t.lines+=o*(r/2);break;case s.LINE_STRIP:t.lines+=o*(r-1);break;case s.LINE_LOOP:t.lines+=o*r;break;case s.POINTS:t.points+=o*r;break;default:Ue("WebGLInfo: Unknown draw mode:",a);break}}function n(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:n,update:i}}function XM(s,e,t){const i=new WeakMap,n=new Tt;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0;let u=i.get(o);if(u===void 0||u.count!==d){let P=function(){v.dispose(),i.delete(o),o.removeEventListener("dispose",P)};var f=P;u!==void 0&&u.texture.dispose();const p=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,_=o.morphAttributes.position||[],x=o.morphAttributes.normal||[],E=o.morphAttributes.color||[];let y=0;p===!0&&(y=1),g===!0&&(y=2),m===!0&&(y=3);let M=o.attributes.position.count*y,w=1;M>e.maxTextureSize&&(w=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);const A=new Float32Array(M*w*4*d),v=new rm(A,M,w,d);v.type=Fi,v.needsUpdate=!0;const S=y*4;for(let C=0;C<d;C++){const N=_[C],O=x[C],V=E[C],B=M*w*4*C;for(let F=0;F<N.count;F++){const L=F*S;p===!0&&(n.fromBufferAttribute(N,F),A[B+L+0]=n.x,A[B+L+1]=n.y,A[B+L+2]=n.z,A[B+L+3]=0),g===!0&&(n.fromBufferAttribute(O,F),A[B+L+4]=n.x,A[B+L+5]=n.y,A[B+L+6]=n.z,A[B+L+7]=0),m===!0&&(n.fromBufferAttribute(V,F),A[B+L+8]=n.x,A[B+L+9]=n.y,A[B+L+10]=n.z,A[B+L+11]=V.itemSize===4?n.w:1)}}u={count:d,texture:v,size:new De(M,w)},i.set(o,u),o.addEventListener("dispose",P)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,t);else{let p=0;for(let m=0;m<c.length;m++)p+=c[m];const g=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(s,"morphTargetBaseInfluence",g),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(s,"morphTargetsTextureSize",u.size)}return{update:r}}function YM(s,e,t,i,n){let r=new WeakMap;function a(c){const h=n.render.frame,d=c.geometry,u=e.get(c,d);if(r.get(u)!==h&&(e.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(t.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,s.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){const f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return u}function o(){r=new WeakMap}function l(c){const h=c.target;h.removeEventListener("dispose",l),i.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}const qM={[Eu]:"LINEAR_TONE_MAPPING",[Tu]:"REINHARD_TONE_MAPPING",[wu]:"CINEON_TONE_MAPPING",[eo]:"ACES_FILMIC_TONE_MAPPING",[Cu]:"AGX_TONE_MAPPING",[Ru]:"NEUTRAL_TONE_MAPPING",[Au]:"CUSTOM_TONE_MAPPING"};function $M(s,e,t,i,n){const r=new Ei(e,t,{type:s,depthBuffer:i,stencilBuffer:n}),a=new Ei(e,t,{type:Gi,depthBuffer:!1,stencilBuffer:!1}),o=new mi;o.setAttribute("position",new zt([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new zt([0,2,0,0,2,0],2));const l=new gm({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),c=new at(o,l),h=new to(-1,1,1,-1,0,1);let d=null,u=null,f=!1,p,g=null,m=[],_=!1;this.setSize=function(x,E){r.setSize(x,E),a.setSize(x,E);for(let y=0;y<m.length;y++){const M=m[y];M.setSize&&M.setSize(x,E)}},this.setEffects=function(x){m=x,_=m.length>0&&m[0].isRenderPass===!0;const E=r.width,y=r.height;for(let M=0;M<m.length;M++){const w=m[M];w.setSize&&w.setSize(E,y)}},this.begin=function(x,E){if(f||x.toneMapping===An&&m.length===0)return!1;if(g=E,E!==null){const y=E.width,M=E.height;(r.width!==y||r.height!==M)&&this.setSize(y,M)}return _===!1&&x.setRenderTarget(r),p=x.toneMapping,x.toneMapping=An,!0},this.hasRenderPass=function(){return _},this.end=function(x,E){x.toneMapping=p,f=!0;let y=r,M=a;for(let w=0;w<m.length;w++){const A=m[w];if(A.enabled!==!1&&(A.render(x,M,y,E),A.needsSwap!==!1)){const v=y;y=M,M=v}}if(d!==x.outputColorSpace||u!==x.toneMapping){d=x.outputColorSpace,u=x.toneMapping,l.defines={},Ze.getTransfer(d)===lt&&(l.defines.SRGB_TRANSFER="");const w=qM[u];w&&(l.defines[w]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=y.texture,x.setRenderTarget(g),x.render(c,h),g=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){r.dispose(),a.dispose(),o.dispose(),l.dispose()}}const Tm=new Zt,Zh=new qr(1,1),wm=new rm,Am=new F_,Cm=new fm,zf=[],Vf=[],Hf=new Float32Array(16),Gf=new Float32Array(9),Wf=new Float32Array(4);function ha(s,e,t){const i=s[0];if(i<=0||i>0)return s;const n=e*t;let r=zf[n];if(r===void 0&&(r=new Float32Array(n),zf[n]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,s[a].toArray(r,o)}return r}function Jt(s,e){if(s.length!==e.length)return!1;for(let t=0,i=s.length;t<i;t++)if(s[t]!==e[t])return!1;return!0}function Qt(s,e){for(let t=0,i=e.length;t<i;t++)s[t]=e[t]}function Fl(s,e){let t=Vf[e];t===void 0&&(t=new Int32Array(e),Vf[e]=t);for(let i=0;i!==e;++i)t[i]=s.allocateTextureUnit();return t}function jM(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function KM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Jt(t,e))return;s.uniform2fv(this.addr,e),Qt(t,e)}}function ZM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Jt(t,e))return;s.uniform3fv(this.addr,e),Qt(t,e)}}function JM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Jt(t,e))return;s.uniform4fv(this.addr,e),Qt(t,e)}}function QM(s,e){const t=this.cache,i=e.elements;if(i===void 0){if(Jt(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),Qt(t,e)}else{if(Jt(t,i))return;Wf.set(i),s.uniformMatrix2fv(this.addr,!1,Wf),Qt(t,i)}}function eb(s,e){const t=this.cache,i=e.elements;if(i===void 0){if(Jt(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),Qt(t,e)}else{if(Jt(t,i))return;Gf.set(i),s.uniformMatrix3fv(this.addr,!1,Gf),Qt(t,i)}}function tb(s,e){const t=this.cache,i=e.elements;if(i===void 0){if(Jt(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),Qt(t,e)}else{if(Jt(t,i))return;Hf.set(i),s.uniformMatrix4fv(this.addr,!1,Hf),Qt(t,i)}}function ib(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function nb(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Jt(t,e))return;s.uniform2iv(this.addr,e),Qt(t,e)}}function sb(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Jt(t,e))return;s.uniform3iv(this.addr,e),Qt(t,e)}}function rb(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Jt(t,e))return;s.uniform4iv(this.addr,e),Qt(t,e)}}function ab(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function ob(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Jt(t,e))return;s.uniform2uiv(this.addr,e),Qt(t,e)}}function lb(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Jt(t,e))return;s.uniform3uiv(this.addr,e),Qt(t,e)}}function cb(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Jt(t,e))return;s.uniform4uiv(this.addr,e),Qt(t,e)}}function hb(s,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n);let r;this.type===s.SAMPLER_2D_SHADOW?(Zh.compareFunction=t.isReversedDepthBuffer()?Fu:Uu,r=Zh):r=Tm,t.setTexture2D(e||r,n)}function ub(s,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),t.setTexture3D(e||Am,n)}function db(s,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),t.setTextureCube(e||Cm,n)}function fb(s,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),t.setTexture2DArray(e||wm,n)}function pb(s){switch(s){case 5126:return jM;case 35664:return KM;case 35665:return ZM;case 35666:return JM;case 35674:return QM;case 35675:return eb;case 35676:return tb;case 5124:case 35670:return ib;case 35667:case 35671:return nb;case 35668:case 35672:return sb;case 35669:case 35673:return rb;case 5125:return ab;case 36294:return ob;case 36295:return lb;case 36296:return cb;case 35678:case 36198:case 36298:case 36306:case 35682:return hb;case 35679:case 36299:case 36307:return ub;case 35680:case 36300:case 36308:case 36293:return db;case 36289:case 36303:case 36311:case 36292:return fb}}function mb(s,e){s.uniform1fv(this.addr,e)}function gb(s,e){const t=ha(e,this.size,2);s.uniform2fv(this.addr,t)}function _b(s,e){const t=ha(e,this.size,3);s.uniform3fv(this.addr,t)}function vb(s,e){const t=ha(e,this.size,4);s.uniform4fv(this.addr,t)}function xb(s,e){const t=ha(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function yb(s,e){const t=ha(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function Mb(s,e){const t=ha(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function bb(s,e){s.uniform1iv(this.addr,e)}function Sb(s,e){s.uniform2iv(this.addr,e)}function Eb(s,e){s.uniform3iv(this.addr,e)}function Tb(s,e){s.uniform4iv(this.addr,e)}function wb(s,e){s.uniform1uiv(this.addr,e)}function Ab(s,e){s.uniform2uiv(this.addr,e)}function Cb(s,e){s.uniform3uiv(this.addr,e)}function Rb(s,e){s.uniform4uiv(this.addr,e)}function Pb(s,e,t){const i=this.cache,n=e.length,r=Fl(t,n);Jt(i,r)||(s.uniform1iv(this.addr,r),Qt(i,r));let a;this.type===s.SAMPLER_2D_SHADOW?a=Zh:a=Tm;for(let o=0;o!==n;++o)t.setTexture2D(e[o]||a,r[o])}function Db(s,e,t){const i=this.cache,n=e.length,r=Fl(t,n);Jt(i,r)||(s.uniform1iv(this.addr,r),Qt(i,r));for(let a=0;a!==n;++a)t.setTexture3D(e[a]||Am,r[a])}function Ib(s,e,t){const i=this.cache,n=e.length,r=Fl(t,n);Jt(i,r)||(s.uniform1iv(this.addr,r),Qt(i,r));for(let a=0;a!==n;++a)t.setTextureCube(e[a]||Cm,r[a])}function Lb(s,e,t){const i=this.cache,n=e.length,r=Fl(t,n);Jt(i,r)||(s.uniform1iv(this.addr,r),Qt(i,r));for(let a=0;a!==n;++a)t.setTexture2DArray(e[a]||wm,r[a])}function Nb(s){switch(s){case 5126:return mb;case 35664:return gb;case 35665:return _b;case 35666:return vb;case 35674:return xb;case 35675:return yb;case 35676:return Mb;case 5124:case 35670:return bb;case 35667:case 35671:return Sb;case 35668:case 35672:return Eb;case 35669:case 35673:return Tb;case 5125:return wb;case 36294:return Ab;case 36295:return Cb;case 36296:return Rb;case 35678:case 36198:case 36298:case 36306:case 35682:return Pb;case 35679:case 36299:case 36307:return Db;case 35680:case 36300:case 36308:case 36293:return Ib;case 36289:case 36303:case 36311:case 36292:return Lb}}class Ob{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=pb(t.type)}}class Ub{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Nb(t.type)}}class Fb{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const n=this.seq;for(let r=0,a=n.length;r!==a;++r){const o=n[r];o.setValue(e,t[o.id],i)}}}const Lc=/(\w+)(\])?(\[|\.)?/g;function Xf(s,e){s.seq.push(e),s.map[e.id]=e}function kb(s,e,t){const i=s.name,n=i.length;for(Lc.lastIndex=0;;){const r=Lc.exec(i),a=Lc.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===n){Xf(t,c===void 0?new Ob(o,s,e):new Ub(o,s,e));break}else{let d=t.map[o];d===void 0&&(d=new Fb(o),Xf(t,d)),t=d}}}class el{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);kb(o,l,this)}const n=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?n.push(a):r.push(a);n.length>0&&(this.seq=n.concat(r))}setValue(e,t,i,n){const r=this.map[t];r!==void 0&&r.setValue(e,i,n)}setOptional(e,t,i){const n=t[i];n!==void 0&&this.setValue(e,i,n)}static upload(e,t,i,n){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,n)}}static seqWithValue(e,t){const i=[];for(let n=0,r=e.length;n!==r;++n){const a=e[n];a.id in t&&i.push(a)}return i}}function Yf(s,e,t){const i=s.createShader(e);return s.shaderSource(i,t),s.compileShader(i),i}const Bb=37297;let zb=0;function Vb(s,e){const t=s.split(`
`),i=[],n=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=n;a<r;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const qf=new We;function Hb(s){Ze._getMatrix(qf,Ze.workingColorSpace,s);const e=`mat3( ${qf.elements.map(t=>t.toFixed(4))} )`;switch(Ze.getTransfer(s)){case hl:return[e,"LinearTransferOETF"];case lt:return[e,"sRGBTransferOETF"];default:return Pe("WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function $f(s,e,t){const i=s.getShaderParameter(e,s.COMPILE_STATUS),r=(s.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Vb(s.getShaderSource(e),o)}else return r}function Gb(s,e){const t=Hb(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const Wb={[Eu]:"Linear",[Tu]:"Reinhard",[wu]:"Cineon",[eo]:"ACESFilmic",[Cu]:"AgX",[Ru]:"Neutral",[Au]:"Custom"};function Xb(s,e){const t=Wb[e];return t===void 0?(Pe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Oo=new D;function Yb(){Ze.getLuminanceCoefficients(Oo);const s=Oo.x.toFixed(4),e=Oo.y.toFixed(4),t=Oo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function qb(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(wa).join(`
`)}function $b(s){const e=[];for(const t in s){const i=s[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function jb(s,e){const t={},i=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let n=0;n<i;n++){const r=s.getActiveAttrib(e,n),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:s.getAttribLocation(e,a),locationSize:o}}return t}function wa(s){return s!==""}function jf(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Kf(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Kb=/^[ \t]*#include +<([\w\d./]+)>/gm;function Jh(s){return s.replace(Kb,Jb)}const Zb=new Map;function Jb(s,e){let t=Xe[e];if(t===void 0){const i=Zb.get(e);if(i!==void 0)t=Xe[i],Pe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Jh(t)}const Qb=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Zf(s){return s.replace(Qb,eS)}function eS(s,e,t,i){let n="";for(let r=parseInt(e);r<parseInt(t);r++)n+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return n}function Jf(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const tS={[qo]:"SHADOWMAP_TYPE_PCF",[Ea]:"SHADOWMAP_TYPE_VSM"};function iS(s){return tS[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const nS={[$s]:"ENVMAP_TYPE_CUBE",[Gr]:"ENVMAP_TYPE_CUBE",[Pl]:"ENVMAP_TYPE_CUBE_UV"};function sS(s){return s.envMap===!1?"ENVMAP_TYPE_CUBE":nS[s.envMapMode]||"ENVMAP_TYPE_CUBE"}const rS={[Gr]:"ENVMAP_MODE_REFRACTION"};function aS(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":rS[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}const oS={[Su]:"ENVMAP_BLENDING_MULTIPLY",[Kg]:"ENVMAP_BLENDING_MIX",[Zg]:"ENVMAP_BLENDING_ADD"};function lS(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":oS[s.combine]||"ENVMAP_BLENDING_NONE"}function cS(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function hS(s,e,t,i){const n=s.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=iS(t),c=sS(t),h=aS(t),d=lS(t),u=cS(t),f=qb(t),p=$b(r),g=n.createProgram();let m,_,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(wa).join(`
`),m.length>0&&(m+=`
`),_=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(wa).join(`
`),_.length>0&&(_+=`
`)):(m=[Jf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(wa).join(`
`),_=[Jf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==An?"#define TONE_MAPPING":"",t.toneMapping!==An?Xe.tonemapping_pars_fragment:"",t.toneMapping!==An?Xb("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Xe.colorspace_pars_fragment,Gb("linearToOutputTexel",t.outputColorSpace),Yb(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(wa).join(`
`)),a=Jh(a),a=jf(a,t),a=Kf(a,t),o=Jh(o),o=jf(o,t),o=Kf(o,t),a=Zf(a),o=Zf(o),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,_=["#define varying in",t.glslVersion===qd?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===qd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);const E=x+m+a,y=x+_+o,M=Yf(n,n.VERTEX_SHADER,E),w=Yf(n,n.FRAGMENT_SHADER,y);n.attachShader(g,M),n.attachShader(g,w),t.index0AttributeName!==void 0?n.bindAttribLocation(g,0,t.index0AttributeName):t.morphTargets===!0&&n.bindAttribLocation(g,0,"position"),n.linkProgram(g);function A(C){if(s.debug.checkShaderErrors){const N=n.getProgramInfoLog(g)||"",O=n.getShaderInfoLog(M)||"",V=n.getShaderInfoLog(w)||"",B=N.trim(),F=O.trim(),L=V.trim();let K=!0,q=!0;if(n.getProgramParameter(g,n.LINK_STATUS)===!1)if(K=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(n,g,M,w);else{const ie=$f(n,M,"vertex"),ue=$f(n,w,"fragment");Ue("THREE.WebGLProgram: Shader Error "+n.getError()+" - VALIDATE_STATUS "+n.getProgramParameter(g,n.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+B+`
`+ie+`
`+ue)}else B!==""?Pe("WebGLProgram: Program Info Log:",B):(F===""||L==="")&&(q=!1);q&&(C.diagnostics={runnable:K,programLog:B,vertexShader:{log:F,prefix:m},fragmentShader:{log:L,prefix:_}})}n.deleteShader(M),n.deleteShader(w),v=new el(n,g),S=jb(n,g)}let v;this.getUniforms=function(){return v===void 0&&A(this),v};let S;this.getAttributes=function(){return S===void 0&&A(this),S};let P=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=n.getProgramParameter(g,Bb)),P},this.destroy=function(){i.releaseStatesOfProgram(this),n.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=zb++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=M,this.fragmentShader=w,this}let uS=0;class dS{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,n=this._getShaderStage(t),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(n)===!1&&(a.add(n),n.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new fS(e),t.set(e,i)),i}}class fS{constructor(e){this.id=uS++,this.code=e,this.usedTimes=0}}function pS(s,e,t,i,n,r){const a=new zu,o=new dS,l=new Set,c=[],h=new Map,d=i.logarithmicDepthBuffer;let u=i.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(v){return l.add(v),v===0?"uv":`uv${v}`}function g(v,S,P,C,N){const O=C.fog,V=N.geometry,B=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?C.environment:null,F=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,L=e.get(v.envMap||B,F),K=L&&L.mapping===Pl?L.image.height:null,q=f[v.type];v.precision!==null&&(u=i.getMaxPrecision(v.precision),u!==v.precision&&Pe("WebGLProgram.getParameters:",v.precision,"not supported, using",u,"instead."));const ie=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,ue=ie!==void 0?ie.length:0;let ne=0;V.morphAttributes.position!==void 0&&(ne=1),V.morphAttributes.normal!==void 0&&(ne=2),V.morphAttributes.color!==void 0&&(ne=3);let Z,ae,ve,W;if(q){const ct=vn[q];Z=ct.vertexShader,ae=ct.fragmentShader}else Z=v.vertexShader,ae=v.fragmentShader,o.update(v),ve=o.getVertexShaderID(v),W=o.getFragmentShaderID(v);const J=s.getRenderTarget(),ee=s.state.buffers.depth.getReversed(),Ce=N.isInstancedMesh===!0,xe=N.isBatchedMesh===!0,Fe=!!v.map,Ut=!!v.matcap,Ke=!!L,tt=!!v.aoMap,rt=!!v.lightMap,Ve=!!v.bumpMap,St=!!v.normalMap,I=!!v.displacementMap,wt=!!v.emissiveMap,Qe=!!v.metalnessMap,ot=!!v.roughnessMap,Me=v.anisotropy>0,R=v.clearcoat>0,b=v.dispersion>0,k=v.iridescence>0,j=v.sheen>0,Q=v.transmission>0,Y=Me&&!!v.anisotropyMap,ge=R&&!!v.clearcoatMap,oe=R&&!!v.clearcoatNormalMap,Te=R&&!!v.clearcoatRoughnessMap,Oe=k&&!!v.iridescenceMap,te=k&&!!v.iridescenceThicknessMap,le=j&&!!v.sheenColorMap,be=j&&!!v.sheenRoughnessMap,Se=!!v.specularMap,fe=!!v.specularColorMap,Be=!!v.specularIntensityMap,U=Q&&!!v.transmissionMap,ce=Q&&!!v.thicknessMap,se=!!v.gradientMap,ye=!!v.alphaMap,re=v.alphaTest>0,$=!!v.alphaHash,Ee=!!v.extensions;let ze=An;v.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(ze=s.toneMapping);const yt={shaderID:q,shaderType:v.type,shaderName:v.name,vertexShader:Z,fragmentShader:ae,defines:v.defines,customVertexShaderID:ve,customFragmentShaderID:W,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:u,batching:xe,batchingColor:xe&&N._colorsTexture!==null,instancing:Ce,instancingColor:Ce&&N.instanceColor!==null,instancingMorph:Ce&&N.morphTexture!==null,outputColorSpace:J===null?s.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:yi,alphaToCoverage:!!v.alphaToCoverage,map:Fe,matcap:Ut,envMap:Ke,envMapMode:Ke&&L.mapping,envMapCubeUVHeight:K,aoMap:tt,lightMap:rt,bumpMap:Ve,normalMap:St,displacementMap:I,emissiveMap:wt,normalMapObjectSpace:St&&v.normalMapType===n_,normalMapTangentSpace:St&&v.normalMapType===Il,metalnessMap:Qe,roughnessMap:ot,anisotropy:Me,anisotropyMap:Y,clearcoat:R,clearcoatMap:ge,clearcoatNormalMap:oe,clearcoatRoughnessMap:Te,dispersion:b,iridescence:k,iridescenceMap:Oe,iridescenceThicknessMap:te,sheen:j,sheenColorMap:le,sheenRoughnessMap:be,specularMap:Se,specularColorMap:fe,specularIntensityMap:Be,transmission:Q,transmissionMap:U,thicknessMap:ce,gradientMap:se,opaque:v.transparent===!1&&v.blending===Ir&&v.alphaToCoverage===!1,alphaMap:ye,alphaTest:re,alphaHash:$,combine:v.combine,mapUv:Fe&&p(v.map.channel),aoMapUv:tt&&p(v.aoMap.channel),lightMapUv:rt&&p(v.lightMap.channel),bumpMapUv:Ve&&p(v.bumpMap.channel),normalMapUv:St&&p(v.normalMap.channel),displacementMapUv:I&&p(v.displacementMap.channel),emissiveMapUv:wt&&p(v.emissiveMap.channel),metalnessMapUv:Qe&&p(v.metalnessMap.channel),roughnessMapUv:ot&&p(v.roughnessMap.channel),anisotropyMapUv:Y&&p(v.anisotropyMap.channel),clearcoatMapUv:ge&&p(v.clearcoatMap.channel),clearcoatNormalMapUv:oe&&p(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Te&&p(v.clearcoatRoughnessMap.channel),iridescenceMapUv:Oe&&p(v.iridescenceMap.channel),iridescenceThicknessMapUv:te&&p(v.iridescenceThicknessMap.channel),sheenColorMapUv:le&&p(v.sheenColorMap.channel),sheenRoughnessMapUv:be&&p(v.sheenRoughnessMap.channel),specularMapUv:Se&&p(v.specularMap.channel),specularColorMapUv:fe&&p(v.specularColorMap.channel),specularIntensityMapUv:Be&&p(v.specularIntensityMap.channel),transmissionMapUv:U&&p(v.transmissionMap.channel),thicknessMapUv:ce&&p(v.thicknessMap.channel),alphaMapUv:ye&&p(v.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(St||Me),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!V.attributes.uv&&(Fe||ye),fog:!!O,useFog:v.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||V.attributes.normal===void 0&&St===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ee,skinning:N.isSkinnedMesh===!0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:ue,morphTextureStride:ne,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:s.shadowMap.enabled&&P.length>0,shadowMapType:s.shadowMap.type,toneMapping:ze,decodeVideoTexture:Fe&&v.map.isVideoTexture===!0&&Ze.getTransfer(v.map.colorSpace)===lt,decodeVideoTextureEmissive:wt&&v.emissiveMap.isVideoTexture===!0&&Ze.getTransfer(v.emissiveMap.colorSpace)===lt,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===rn,flipSided:v.side===vi,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:Ee&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ee&&v.extensions.multiDraw===!0||xe)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return yt.vertexUv1s=l.has(1),yt.vertexUv2s=l.has(2),yt.vertexUv3s=l.has(3),l.clear(),yt}function m(v){const S=[];if(v.shaderID?S.push(v.shaderID):(S.push(v.customVertexShaderID),S.push(v.customFragmentShaderID)),v.defines!==void 0)for(const P in v.defines)S.push(P),S.push(v.defines[P]);return v.isRawShaderMaterial===!1&&(_(S,v),x(S,v),S.push(s.outputColorSpace)),S.push(v.customProgramCacheKey),S.join()}function _(v,S){v.push(S.precision),v.push(S.outputColorSpace),v.push(S.envMapMode),v.push(S.envMapCubeUVHeight),v.push(S.mapUv),v.push(S.alphaMapUv),v.push(S.lightMapUv),v.push(S.aoMapUv),v.push(S.bumpMapUv),v.push(S.normalMapUv),v.push(S.displacementMapUv),v.push(S.emissiveMapUv),v.push(S.metalnessMapUv),v.push(S.roughnessMapUv),v.push(S.anisotropyMapUv),v.push(S.clearcoatMapUv),v.push(S.clearcoatNormalMapUv),v.push(S.clearcoatRoughnessMapUv),v.push(S.iridescenceMapUv),v.push(S.iridescenceThicknessMapUv),v.push(S.sheenColorMapUv),v.push(S.sheenRoughnessMapUv),v.push(S.specularMapUv),v.push(S.specularColorMapUv),v.push(S.specularIntensityMapUv),v.push(S.transmissionMapUv),v.push(S.thicknessMapUv),v.push(S.combine),v.push(S.fogExp2),v.push(S.sizeAttenuation),v.push(S.morphTargetsCount),v.push(S.morphAttributeCount),v.push(S.numDirLights),v.push(S.numPointLights),v.push(S.numSpotLights),v.push(S.numSpotLightMaps),v.push(S.numHemiLights),v.push(S.numRectAreaLights),v.push(S.numDirLightShadows),v.push(S.numPointLightShadows),v.push(S.numSpotLightShadows),v.push(S.numSpotLightShadowsWithMaps),v.push(S.numLightProbes),v.push(S.shadowMapType),v.push(S.toneMapping),v.push(S.numClippingPlanes),v.push(S.numClipIntersection),v.push(S.depthPacking)}function x(v,S){a.disableAll(),S.instancing&&a.enable(0),S.instancingColor&&a.enable(1),S.instancingMorph&&a.enable(2),S.matcap&&a.enable(3),S.envMap&&a.enable(4),S.normalMapObjectSpace&&a.enable(5),S.normalMapTangentSpace&&a.enable(6),S.clearcoat&&a.enable(7),S.iridescence&&a.enable(8),S.alphaTest&&a.enable(9),S.vertexColors&&a.enable(10),S.vertexAlphas&&a.enable(11),S.vertexUv1s&&a.enable(12),S.vertexUv2s&&a.enable(13),S.vertexUv3s&&a.enable(14),S.vertexTangents&&a.enable(15),S.anisotropy&&a.enable(16),S.alphaHash&&a.enable(17),S.batching&&a.enable(18),S.dispersion&&a.enable(19),S.batchingColor&&a.enable(20),S.gradientMap&&a.enable(21),v.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reversedDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),v.push(a.mask)}function E(v){const S=f[v.type];let P;if(S){const C=vn[S];P=ps.clone(C.uniforms)}else P=v.uniforms;return P}function y(v,S){let P=h.get(S);return P!==void 0?++P.usedTimes:(P=new hS(s,S,v,n),c.push(P),h.set(S,P)),P}function M(v){if(--v.usedTimes===0){const S=c.indexOf(v);c[S]=c[c.length-1],c.pop(),h.delete(v.cacheKey),v.destroy()}}function w(v){o.remove(v)}function A(){o.dispose()}return{getParameters:g,getProgramCacheKey:m,getUniforms:E,acquireProgram:y,releaseProgram:M,releaseShaderCache:w,programs:c,dispose:A}}function mS(){let s=new WeakMap;function e(a){return s.has(a)}function t(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function i(a){s.delete(a)}function n(a,o,l){s.get(a)[o]=l}function r(){s=new WeakMap}return{has:e,get:t,remove:i,update:n,dispose:r}}function gS(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.materialVariant!==e.materialVariant?s.materialVariant-e.materialVariant:s.z!==e.z?s.z-e.z:s.id-e.id}function Qf(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function ep(){const s=[];let e=0;const t=[],i=[],n=[];function r(){e=0,t.length=0,i.length=0,n.length=0}function a(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function o(u,f,p,g,m,_){let x=s[e];return x===void 0?(x={id:u.id,object:u,geometry:f,material:p,materialVariant:a(u),groupOrder:g,renderOrder:u.renderOrder,z:m,group:_},s[e]=x):(x.id=u.id,x.object=u,x.geometry=f,x.material=p,x.materialVariant=a(u),x.groupOrder=g,x.renderOrder=u.renderOrder,x.z=m,x.group=_),e++,x}function l(u,f,p,g,m,_){const x=o(u,f,p,g,m,_);p.transmission>0?i.push(x):p.transparent===!0?n.push(x):t.push(x)}function c(u,f,p,g,m,_){const x=o(u,f,p,g,m,_);p.transmission>0?i.unshift(x):p.transparent===!0?n.unshift(x):t.unshift(x)}function h(u,f){t.length>1&&t.sort(u||gS),i.length>1&&i.sort(f||Qf),n.length>1&&n.sort(f||Qf)}function d(){for(let u=e,f=s.length;u<f;u++){const p=s[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:n,init:r,push:l,unshift:c,finish:d,sort:h}}function _S(){let s=new WeakMap;function e(i,n){const r=s.get(i);let a;return r===void 0?(a=new ep,s.set(i,[a])):n>=r.length?(a=new ep,r.push(a)):a=r[n],a}function t(){s=new WeakMap}return{get:e,dispose:t}}function vS(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new D,color:new Le};break;case"SpotLight":t={position:new D,direction:new D,color:new Le,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new D,color:new Le,distance:0,decay:0};break;case"HemisphereLight":t={direction:new D,skyColor:new Le,groundColor:new Le};break;case"RectAreaLight":t={color:new Le,position:new D,halfWidth:new D,halfHeight:new D};break}return s[e.id]=t,t}}}function xS(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new De};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new De};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new De,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let yS=0;function MS(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function bS(s){const e=new vS,t=xS(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new D);const n=new D,r=new He,a=new He;function o(c){let h=0,d=0,u=0;for(let S=0;S<9;S++)i.probe[S].set(0,0,0);let f=0,p=0,g=0,m=0,_=0,x=0,E=0,y=0,M=0,w=0,A=0;c.sort(MS);for(let S=0,P=c.length;S<P;S++){const C=c[S],N=C.color,O=C.intensity,V=C.distance;let B=null;if(C.shadow&&C.shadow.map&&(C.shadow.map.texture.format===Xr?B=C.shadow.map.texture:B=C.shadow.map.depthTexture||C.shadow.map.texture),C.isAmbientLight)h+=N.r*O,d+=N.g*O,u+=N.b*O;else if(C.isLightProbe){for(let F=0;F<9;F++)i.probe[F].addScaledVector(C.sh.coefficients[F],O);A++}else if(C.isDirectionalLight){const F=e.get(C);if(F.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const L=C.shadow,K=t.get(C);K.shadowIntensity=L.intensity,K.shadowBias=L.bias,K.shadowNormalBias=L.normalBias,K.shadowRadius=L.radius,K.shadowMapSize=L.mapSize,i.directionalShadow[f]=K,i.directionalShadowMap[f]=B,i.directionalShadowMatrix[f]=C.shadow.matrix,x++}i.directional[f]=F,f++}else if(C.isSpotLight){const F=e.get(C);F.position.setFromMatrixPosition(C.matrixWorld),F.color.copy(N).multiplyScalar(O),F.distance=V,F.coneCos=Math.cos(C.angle),F.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),F.decay=C.decay,i.spot[g]=F;const L=C.shadow;if(C.map&&(i.spotLightMap[M]=C.map,M++,L.updateMatrices(C),C.castShadow&&w++),i.spotLightMatrix[g]=L.matrix,C.castShadow){const K=t.get(C);K.shadowIntensity=L.intensity,K.shadowBias=L.bias,K.shadowNormalBias=L.normalBias,K.shadowRadius=L.radius,K.shadowMapSize=L.mapSize,i.spotShadow[g]=K,i.spotShadowMap[g]=B,y++}g++}else if(C.isRectAreaLight){const F=e.get(C);F.color.copy(N).multiplyScalar(O),F.halfWidth.set(C.width*.5,0,0),F.halfHeight.set(0,C.height*.5,0),i.rectArea[m]=F,m++}else if(C.isPointLight){const F=e.get(C);if(F.color.copy(C.color).multiplyScalar(C.intensity),F.distance=C.distance,F.decay=C.decay,C.castShadow){const L=C.shadow,K=t.get(C);K.shadowIntensity=L.intensity,K.shadowBias=L.bias,K.shadowNormalBias=L.normalBias,K.shadowRadius=L.radius,K.shadowMapSize=L.mapSize,K.shadowCameraNear=L.camera.near,K.shadowCameraFar=L.camera.far,i.pointShadow[p]=K,i.pointShadowMap[p]=B,i.pointShadowMatrix[p]=C.shadow.matrix,E++}i.point[p]=F,p++}else if(C.isHemisphereLight){const F=e.get(C);F.skyColor.copy(C.color).multiplyScalar(O),F.groundColor.copy(C.groundColor).multiplyScalar(O),i.hemi[_]=F,_++}}m>0&&(s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=de.LTC_FLOAT_1,i.rectAreaLTC2=de.LTC_FLOAT_2):(i.rectAreaLTC1=de.LTC_HALF_1,i.rectAreaLTC2=de.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=d,i.ambient[2]=u;const v=i.hash;(v.directionalLength!==f||v.pointLength!==p||v.spotLength!==g||v.rectAreaLength!==m||v.hemiLength!==_||v.numDirectionalShadows!==x||v.numPointShadows!==E||v.numSpotShadows!==y||v.numSpotMaps!==M||v.numLightProbes!==A)&&(i.directional.length=f,i.spot.length=g,i.rectArea.length=m,i.point.length=p,i.hemi.length=_,i.directionalShadow.length=x,i.directionalShadowMap.length=x,i.pointShadow.length=E,i.pointShadowMap.length=E,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=x,i.pointShadowMatrix.length=E,i.spotLightMatrix.length=y+M-w,i.spotLightMap.length=M,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=A,v.directionalLength=f,v.pointLength=p,v.spotLength=g,v.rectAreaLength=m,v.hemiLength=_,v.numDirectionalShadows=x,v.numPointShadows=E,v.numSpotShadows=y,v.numSpotMaps=M,v.numLightProbes=A,i.version=yS++)}function l(c,h){let d=0,u=0,f=0,p=0,g=0;const m=h.matrixWorldInverse;for(let _=0,x=c.length;_<x;_++){const E=c[_];if(E.isDirectionalLight){const y=i.directional[d];y.direction.setFromMatrixPosition(E.matrixWorld),n.setFromMatrixPosition(E.target.matrixWorld),y.direction.sub(n),y.direction.transformDirection(m),d++}else if(E.isSpotLight){const y=i.spot[f];y.position.setFromMatrixPosition(E.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(E.matrixWorld),n.setFromMatrixPosition(E.target.matrixWorld),y.direction.sub(n),y.direction.transformDirection(m),f++}else if(E.isRectAreaLight){const y=i.rectArea[p];y.position.setFromMatrixPosition(E.matrixWorld),y.position.applyMatrix4(m),a.identity(),r.copy(E.matrixWorld),r.premultiply(m),a.extractRotation(r),y.halfWidth.set(E.width*.5,0,0),y.halfHeight.set(0,E.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),p++}else if(E.isPointLight){const y=i.point[u];y.position.setFromMatrixPosition(E.matrixWorld),y.position.applyMatrix4(m),u++}else if(E.isHemisphereLight){const y=i.hemi[g];y.direction.setFromMatrixPosition(E.matrixWorld),y.direction.transformDirection(m),g++}}}return{setup:o,setupView:l,state:i}}function tp(s){const e=new bS(s),t=[],i=[];function n(h){c.camera=h,t.length=0,i.length=0}function r(h){t.push(h)}function a(h){i.push(h)}function o(){e.setup(t)}function l(h){e.setupView(t,h)}const c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:n,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function SS(s){let e=new WeakMap;function t(n,r=0){const a=e.get(n);let o;return a===void 0?(o=new tp(s),e.set(n,[o])):r>=a.length?(o=new tp(s),a.push(o)):o=a[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const ES=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,TS=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,wS=[new D(1,0,0),new D(-1,0,0),new D(0,1,0),new D(0,-1,0),new D(0,0,1),new D(0,0,-1)],AS=[new D(0,-1,0),new D(0,-1,0),new D(0,0,1),new D(0,0,-1),new D(0,-1,0),new D(0,-1,0)],ip=new He,ya=new D,Nc=new D;function CS(s,e,t){let i=new Xu;const n=new De,r=new De,a=new Tt,o=new _m,l=new dv,c={},h=t.maxTextureSize,d={[$n]:vi,[vi]:$n,[rn]:rn},u=new ii({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new De},radius:{value:4}},vertexShader:ES,fragmentShader:TS}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const p=new mi;p.setAttribute("position",new xi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new at(p,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=qo;let _=this.type;this.render=function(w,A,v){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;this.type===Xp&&(Pe("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=qo);const S=s.getRenderTarget(),P=s.getActiveCubeFace(),C=s.getActiveMipmapLevel(),N=s.state;N.setBlending(ai),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const O=_!==this.type;O&&A.traverse(function(V){V.material&&(Array.isArray(V.material)?V.material.forEach(B=>B.needsUpdate=!0):V.material.needsUpdate=!0)});for(let V=0,B=w.length;V<B;V++){const F=w[V],L=F.shadow;if(L===void 0){Pe("WebGLShadowMap:",F,"has no shadow.");continue}if(L.autoUpdate===!1&&L.needsUpdate===!1)continue;n.copy(L.mapSize);const K=L.getFrameExtents();n.multiply(K),r.copy(L.mapSize),(n.x>h||n.y>h)&&(n.x>h&&(r.x=Math.floor(h/K.x),n.x=r.x*K.x,L.mapSize.x=r.x),n.y>h&&(r.y=Math.floor(h/K.y),n.y=r.y*K.y,L.mapSize.y=r.y));const q=s.state.buffers.depth.getReversed();if(L.camera._reversedDepth=q,L.map===null||O===!0){if(L.map!==null&&(L.map.depthTexture!==null&&(L.map.depthTexture.dispose(),L.map.depthTexture=null),L.map.dispose()),this.type===Ea){if(F.isPointLight){Pe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}L.map=new Ei(n.x,n.y,{format:Xr,type:Gi,minFilter:Kt,magFilter:Kt,generateMipmaps:!1}),L.map.texture.name=F.name+".shadowMap",L.map.depthTexture=new qr(n.x,n.y,Fi),L.map.depthTexture.name=F.name+".shadowMapDepth",L.map.depthTexture.format=jn,L.map.depthTexture.compareFunction=null,L.map.depthTexture.minFilter=Ot,L.map.depthTexture.magFilter=Ot}else F.isPointLight?(L.map=new Em(n.x),L.map.depthTexture=new av(n.x,Cn)):(L.map=new Ei(n.x,n.y),L.map.depthTexture=new qr(n.x,n.y,Cn)),L.map.depthTexture.name=F.name+".shadowMap",L.map.depthTexture.format=jn,this.type===qo?(L.map.depthTexture.compareFunction=q?Fu:Uu,L.map.depthTexture.minFilter=Kt,L.map.depthTexture.magFilter=Kt):(L.map.depthTexture.compareFunction=null,L.map.depthTexture.minFilter=Ot,L.map.depthTexture.magFilter=Ot);L.camera.updateProjectionMatrix()}const ie=L.map.isWebGLCubeRenderTarget?6:1;for(let ue=0;ue<ie;ue++){if(L.map.isWebGLCubeRenderTarget)s.setRenderTarget(L.map,ue),s.clear();else{ue===0&&(s.setRenderTarget(L.map),s.clear());const ne=L.getViewport(ue);a.set(r.x*ne.x,r.y*ne.y,r.x*ne.z,r.y*ne.w),N.viewport(a)}if(F.isPointLight){const ne=L.camera,Z=L.matrix,ae=F.distance||ne.far;ae!==ne.far&&(ne.far=ae,ne.updateProjectionMatrix()),ya.setFromMatrixPosition(F.matrixWorld),ne.position.copy(ya),Nc.copy(ne.position),Nc.add(wS[ue]),ne.up.copy(AS[ue]),ne.lookAt(Nc),ne.updateMatrixWorld(),Z.makeTranslation(-ya.x,-ya.y,-ya.z),ip.multiplyMatrices(ne.projectionMatrix,ne.matrixWorldInverse),L._frustum.setFromProjectionMatrix(ip,ne.coordinateSystem,ne.reversedDepth)}else L.updateMatrices(F);i=L.getFrustum(),y(A,v,L.camera,F,this.type)}L.isPointLightShadow!==!0&&this.type===Ea&&x(L,v),L.needsUpdate=!1}_=this.type,m.needsUpdate=!1,s.setRenderTarget(S,P,C)};function x(w,A){const v=e.update(g);u.defines.VSM_SAMPLES!==w.blurSamples&&(u.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Ei(n.x,n.y,{format:Xr,type:Gi})),u.uniforms.shadow_pass.value=w.map.depthTexture,u.uniforms.resolution.value=w.mapSize,u.uniforms.radius.value=w.radius,s.setRenderTarget(w.mapPass),s.clear(),s.renderBufferDirect(A,null,v,u,g,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,s.setRenderTarget(w.map),s.clear(),s.renderBufferDirect(A,null,v,f,g,null)}function E(w,A,v,S){let P=null;const C=v.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(C!==void 0)P=C;else if(P=v.isPointLight===!0?l:o,s.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const N=P.uuid,O=A.uuid;let V=c[N];V===void 0&&(V={},c[N]=V);let B=V[O];B===void 0&&(B=P.clone(),V[O]=B,A.addEventListener("dispose",M)),P=B}if(P.visible=A.visible,P.wireframe=A.wireframe,S===Ea?P.side=A.shadowSide!==null?A.shadowSide:A.side:P.side=A.shadowSide!==null?A.shadowSide:d[A.side],P.alphaMap=A.alphaMap,P.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,P.map=A.map,P.clipShadows=A.clipShadows,P.clippingPlanes=A.clippingPlanes,P.clipIntersection=A.clipIntersection,P.displacementMap=A.displacementMap,P.displacementScale=A.displacementScale,P.displacementBias=A.displacementBias,P.wireframeLinewidth=A.wireframeLinewidth,P.linewidth=A.linewidth,v.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const N=s.properties.get(P);N.light=v}return P}function y(w,A,v,S,P){if(w.visible===!1)return;if(w.layers.test(A.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&P===Ea)&&(!w.frustumCulled||i.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,w.matrixWorld);const O=e.update(w),V=w.material;if(Array.isArray(V)){const B=O.groups;for(let F=0,L=B.length;F<L;F++){const K=B[F],q=V[K.materialIndex];if(q&&q.visible){const ie=E(w,q,S,P);w.onBeforeShadow(s,w,A,v,O,ie,K),s.renderBufferDirect(v,null,O,ie,w,K),w.onAfterShadow(s,w,A,v,O,ie,K)}}}else if(V.visible){const B=E(w,V,S,P);w.onBeforeShadow(s,w,A,v,O,B,null),s.renderBufferDirect(v,null,O,B,w,null),w.onAfterShadow(s,w,A,v,O,B,null)}}const N=w.children;for(let O=0,V=N.length;O<V;O++)y(N[O],A,v,S,P)}function M(w){w.target.removeEventListener("dispose",M);for(const v in c){const S=c[v],P=w.target.uuid;P in S&&(S[P].dispose(),delete S[P])}}}function RS(s,e){function t(){let U=!1;const ce=new Tt;let se=null;const ye=new Tt(0,0,0,0);return{setMask:function(re){se!==re&&!U&&(s.colorMask(re,re,re,re),se=re)},setLocked:function(re){U=re},setClear:function(re,$,Ee,ze,yt){yt===!0&&(re*=ze,$*=ze,Ee*=ze),ce.set(re,$,Ee,ze),ye.equals(ce)===!1&&(s.clearColor(re,$,Ee,ze),ye.copy(ce))},reset:function(){U=!1,se=null,ye.set(-1,0,0,0)}}}function i(){let U=!1,ce=!1,se=null,ye=null,re=null;return{setReversed:function($){if(ce!==$){const Ee=e.get("EXT_clip_control");$?Ee.clipControlEXT(Ee.LOWER_LEFT_EXT,Ee.ZERO_TO_ONE_EXT):Ee.clipControlEXT(Ee.LOWER_LEFT_EXT,Ee.NEGATIVE_ONE_TO_ONE_EXT),ce=$;const ze=re;re=null,this.setClear(ze)}},getReversed:function(){return ce},setTest:function($){$?J(s.DEPTH_TEST):ee(s.DEPTH_TEST)},setMask:function($){se!==$&&!U&&(s.depthMask($),se=$)},setFunc:function($){if(ce&&($=m_[$]),ye!==$){switch($){case rh:s.depthFunc(s.NEVER);break;case ah:s.depthFunc(s.ALWAYS);break;case oh:s.depthFunc(s.LESS);break;case Hr:s.depthFunc(s.LEQUAL);break;case lh:s.depthFunc(s.EQUAL);break;case ch:s.depthFunc(s.GEQUAL);break;case hh:s.depthFunc(s.GREATER);break;case uh:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}ye=$}},setLocked:function($){U=$},setClear:function($){re!==$&&(re=$,ce&&($=1-$),s.clearDepth($))},reset:function(){U=!1,se=null,ye=null,re=null,ce=!1}}}function n(){let U=!1,ce=null,se=null,ye=null,re=null,$=null,Ee=null,ze=null,yt=null;return{setTest:function(ct){U||(ct?J(s.STENCIL_TEST):ee(s.STENCIL_TEST))},setMask:function(ct){ce!==ct&&!U&&(s.stencilMask(ct),ce=ct)},setFunc:function(ct,Dn,In){(se!==ct||ye!==Dn||re!==In)&&(s.stencilFunc(ct,Dn,In),se=ct,ye=Dn,re=In)},setOp:function(ct,Dn,In){($!==ct||Ee!==Dn||ze!==In)&&(s.stencilOp(ct,Dn,In),$=ct,Ee=Dn,ze=In)},setLocked:function(ct){U=ct},setClear:function(ct){yt!==ct&&(s.clearStencil(ct),yt=ct)},reset:function(){U=!1,ce=null,se=null,ye=null,re=null,$=null,Ee=null,ze=null,yt=null}}}const r=new t,a=new i,o=new n,l=new WeakMap,c=new WeakMap;let h={},d={},u=new WeakMap,f=[],p=null,g=!1,m=null,_=null,x=null,E=null,y=null,M=null,w=null,A=new Le(0,0,0),v=0,S=!1,P=null,C=null,N=null,O=null,V=null;const B=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let F=!1,L=0;const K=s.getParameter(s.VERSION);K.indexOf("WebGL")!==-1?(L=parseFloat(/^WebGL (\d)/.exec(K)[1]),F=L>=1):K.indexOf("OpenGL ES")!==-1&&(L=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),F=L>=2);let q=null,ie={};const ue=s.getParameter(s.SCISSOR_BOX),ne=s.getParameter(s.VIEWPORT),Z=new Tt().fromArray(ue),ae=new Tt().fromArray(ne);function ve(U,ce,se,ye){const re=new Uint8Array(4),$=s.createTexture();s.bindTexture(U,$),s.texParameteri(U,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(U,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Ee=0;Ee<se;Ee++)U===s.TEXTURE_3D||U===s.TEXTURE_2D_ARRAY?s.texImage3D(ce,0,s.RGBA,1,1,ye,0,s.RGBA,s.UNSIGNED_BYTE,re):s.texImage2D(ce+Ee,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,re);return $}const W={};W[s.TEXTURE_2D]=ve(s.TEXTURE_2D,s.TEXTURE_2D,1),W[s.TEXTURE_CUBE_MAP]=ve(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),W[s.TEXTURE_2D_ARRAY]=ve(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),W[s.TEXTURE_3D]=ve(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),J(s.DEPTH_TEST),a.setFunc(Hr),Ve(!1),St(Fd),J(s.CULL_FACE),tt(ai);function J(U){h[U]!==!0&&(s.enable(U),h[U]=!0)}function ee(U){h[U]!==!1&&(s.disable(U),h[U]=!1)}function Ce(U,ce){return d[U]!==ce?(s.bindFramebuffer(U,ce),d[U]=ce,U===s.DRAW_FRAMEBUFFER&&(d[s.FRAMEBUFFER]=ce),U===s.FRAMEBUFFER&&(d[s.DRAW_FRAMEBUFFER]=ce),!0):!1}function xe(U,ce){let se=f,ye=!1;if(U){se=u.get(ce),se===void 0&&(se=[],u.set(ce,se));const re=U.textures;if(se.length!==re.length||se[0]!==s.COLOR_ATTACHMENT0){for(let $=0,Ee=re.length;$<Ee;$++)se[$]=s.COLOR_ATTACHMENT0+$;se.length=re.length,ye=!0}}else se[0]!==s.BACK&&(se[0]=s.BACK,ye=!0);ye&&s.drawBuffers(se)}function Fe(U){return p!==U?(s.useProgram(U),p=U,!0):!1}const Ut={[Vn]:s.FUNC_ADD,[Ug]:s.FUNC_SUBTRACT,[Fg]:s.FUNC_REVERSE_SUBTRACT};Ut[kg]=s.MIN,Ut[Bg]=s.MAX;const Ke={[ih]:s.ZERO,[zg]:s.ONE,[Vg]:s.SRC_COLOR,[nh]:s.SRC_ALPHA,[Xg]:s.SRC_ALPHA_SATURATE,[$p]:s.DST_COLOR,[qp]:s.DST_ALPHA,[Hg]:s.ONE_MINUS_SRC_COLOR,[sh]:s.ONE_MINUS_SRC_ALPHA,[Wg]:s.ONE_MINUS_DST_COLOR,[Gg]:s.ONE_MINUS_DST_ALPHA,[Yg]:s.CONSTANT_COLOR,[qg]:s.ONE_MINUS_CONSTANT_COLOR,[$g]:s.CONSTANT_ALPHA,[jg]:s.ONE_MINUS_CONSTANT_ALPHA};function tt(U,ce,se,ye,re,$,Ee,ze,yt,ct){if(U===ai){g===!0&&(ee(s.BLEND),g=!1);return}if(g===!1&&(J(s.BLEND),g=!0),U!==Yp){if(U!==m||ct!==S){if((_!==Vn||y!==Vn)&&(s.blendEquation(s.FUNC_ADD),_=Vn,y=Vn),ct)switch(U){case Ir:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case kd:s.blendFunc(s.ONE,s.ONE);break;case Bd:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case zd:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:Ue("WebGLState: Invalid blending: ",U);break}else switch(U){case Ir:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case kd:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case Bd:Ue("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case zd:Ue("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ue("WebGLState: Invalid blending: ",U);break}x=null,E=null,M=null,w=null,A.set(0,0,0),v=0,m=U,S=ct}return}re=re||ce,$=$||se,Ee=Ee||ye,(ce!==_||re!==y)&&(s.blendEquationSeparate(Ut[ce],Ut[re]),_=ce,y=re),(se!==x||ye!==E||$!==M||Ee!==w)&&(s.blendFuncSeparate(Ke[se],Ke[ye],Ke[$],Ke[Ee]),x=se,E=ye,M=$,w=Ee),(ze.equals(A)===!1||yt!==v)&&(s.blendColor(ze.r,ze.g,ze.b,yt),A.copy(ze),v=yt),m=U,S=!1}function rt(U,ce){U.side===rn?ee(s.CULL_FACE):J(s.CULL_FACE);let se=U.side===vi;ce&&(se=!se),Ve(se),U.blending===Ir&&U.transparent===!1?tt(ai):tt(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),a.setFunc(U.depthFunc),a.setTest(U.depthTest),a.setMask(U.depthWrite),r.setMask(U.colorWrite);const ye=U.stencilWrite;o.setTest(ye),ye&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),wt(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?J(s.SAMPLE_ALPHA_TO_COVERAGE):ee(s.SAMPLE_ALPHA_TO_COVERAGE)}function Ve(U){P!==U&&(U?s.frontFace(s.CW):s.frontFace(s.CCW),P=U)}function St(U){U!==Ng?(J(s.CULL_FACE),U!==C&&(U===Fd?s.cullFace(s.BACK):U===Og?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):ee(s.CULL_FACE),C=U}function I(U){U!==N&&(F&&s.lineWidth(U),N=U)}function wt(U,ce,se){U?(J(s.POLYGON_OFFSET_FILL),(O!==ce||V!==se)&&(O=ce,V=se,a.getReversed()&&(ce=-ce),s.polygonOffset(ce,se))):ee(s.POLYGON_OFFSET_FILL)}function Qe(U){U?J(s.SCISSOR_TEST):ee(s.SCISSOR_TEST)}function ot(U){U===void 0&&(U=s.TEXTURE0+B-1),q!==U&&(s.activeTexture(U),q=U)}function Me(U,ce,se){se===void 0&&(q===null?se=s.TEXTURE0+B-1:se=q);let ye=ie[se];ye===void 0&&(ye={type:void 0,texture:void 0},ie[se]=ye),(ye.type!==U||ye.texture!==ce)&&(q!==se&&(s.activeTexture(se),q=se),s.bindTexture(U,ce||W[U]),ye.type=U,ye.texture=ce)}function R(){const U=ie[q];U!==void 0&&U.type!==void 0&&(s.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function b(){try{s.compressedTexImage2D(...arguments)}catch(U){Ue("WebGLState:",U)}}function k(){try{s.compressedTexImage3D(...arguments)}catch(U){Ue("WebGLState:",U)}}function j(){try{s.texSubImage2D(...arguments)}catch(U){Ue("WebGLState:",U)}}function Q(){try{s.texSubImage3D(...arguments)}catch(U){Ue("WebGLState:",U)}}function Y(){try{s.compressedTexSubImage2D(...arguments)}catch(U){Ue("WebGLState:",U)}}function ge(){try{s.compressedTexSubImage3D(...arguments)}catch(U){Ue("WebGLState:",U)}}function oe(){try{s.texStorage2D(...arguments)}catch(U){Ue("WebGLState:",U)}}function Te(){try{s.texStorage3D(...arguments)}catch(U){Ue("WebGLState:",U)}}function Oe(){try{s.texImage2D(...arguments)}catch(U){Ue("WebGLState:",U)}}function te(){try{s.texImage3D(...arguments)}catch(U){Ue("WebGLState:",U)}}function le(U){Z.equals(U)===!1&&(s.scissor(U.x,U.y,U.z,U.w),Z.copy(U))}function be(U){ae.equals(U)===!1&&(s.viewport(U.x,U.y,U.z,U.w),ae.copy(U))}function Se(U,ce){let se=c.get(ce);se===void 0&&(se=new WeakMap,c.set(ce,se));let ye=se.get(U);ye===void 0&&(ye=s.getUniformBlockIndex(ce,U.name),se.set(U,ye))}function fe(U,ce){const ye=c.get(ce).get(U);l.get(ce)!==ye&&(s.uniformBlockBinding(ce,ye,U.__bindingPointIndex),l.set(ce,ye))}function Be(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},q=null,ie={},d={},u=new WeakMap,f=[],p=null,g=!1,m=null,_=null,x=null,E=null,y=null,M=null,w=null,A=new Le(0,0,0),v=0,S=!1,P=null,C=null,N=null,O=null,V=null,Z.set(0,0,s.canvas.width,s.canvas.height),ae.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:J,disable:ee,bindFramebuffer:Ce,drawBuffers:xe,useProgram:Fe,setBlending:tt,setMaterial:rt,setFlipSided:Ve,setCullFace:St,setLineWidth:I,setPolygonOffset:wt,setScissorTest:Qe,activeTexture:ot,bindTexture:Me,unbindTexture:R,compressedTexImage2D:b,compressedTexImage3D:k,texImage2D:Oe,texImage3D:te,updateUBOMapping:Se,uniformBlockBinding:fe,texStorage2D:oe,texStorage3D:Te,texSubImage2D:j,texSubImage3D:Q,compressedTexSubImage2D:Y,compressedTexSubImage3D:ge,scissor:le,viewport:be,reset:Be}}function PS(s,e,t,i,n,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new De,h=new WeakMap;let d;const u=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(R,b){return f?new OffscreenCanvas(R,b):Ha("canvas")}function g(R,b,k){let j=1;const Q=Me(R);if((Q.width>k||Q.height>k)&&(j=k/Math.max(Q.width,Q.height)),j<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const Y=Math.floor(j*Q.width),ge=Math.floor(j*Q.height);d===void 0&&(d=p(Y,ge));const oe=b?p(Y,ge):d;return oe.width=Y,oe.height=ge,oe.getContext("2d").drawImage(R,0,0,Y,ge),Pe("WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+Y+"x"+ge+")."),oe}else return"data"in R&&Pe("WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),R;return R}function m(R){return R.generateMipmaps}function _(R){s.generateMipmap(R)}function x(R){return R.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?s.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function E(R,b,k,j,Q=!1){if(R!==null){if(s[R]!==void 0)return s[R];Pe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let Y=b;if(b===s.RED&&(k===s.FLOAT&&(Y=s.R32F),k===s.HALF_FLOAT&&(Y=s.R16F),k===s.UNSIGNED_BYTE&&(Y=s.R8)),b===s.RED_INTEGER&&(k===s.UNSIGNED_BYTE&&(Y=s.R8UI),k===s.UNSIGNED_SHORT&&(Y=s.R16UI),k===s.UNSIGNED_INT&&(Y=s.R32UI),k===s.BYTE&&(Y=s.R8I),k===s.SHORT&&(Y=s.R16I),k===s.INT&&(Y=s.R32I)),b===s.RG&&(k===s.FLOAT&&(Y=s.RG32F),k===s.HALF_FLOAT&&(Y=s.RG16F),k===s.UNSIGNED_BYTE&&(Y=s.RG8)),b===s.RG_INTEGER&&(k===s.UNSIGNED_BYTE&&(Y=s.RG8UI),k===s.UNSIGNED_SHORT&&(Y=s.RG16UI),k===s.UNSIGNED_INT&&(Y=s.RG32UI),k===s.BYTE&&(Y=s.RG8I),k===s.SHORT&&(Y=s.RG16I),k===s.INT&&(Y=s.RG32I)),b===s.RGB_INTEGER&&(k===s.UNSIGNED_BYTE&&(Y=s.RGB8UI),k===s.UNSIGNED_SHORT&&(Y=s.RGB16UI),k===s.UNSIGNED_INT&&(Y=s.RGB32UI),k===s.BYTE&&(Y=s.RGB8I),k===s.SHORT&&(Y=s.RGB16I),k===s.INT&&(Y=s.RGB32I)),b===s.RGBA_INTEGER&&(k===s.UNSIGNED_BYTE&&(Y=s.RGBA8UI),k===s.UNSIGNED_SHORT&&(Y=s.RGBA16UI),k===s.UNSIGNED_INT&&(Y=s.RGBA32UI),k===s.BYTE&&(Y=s.RGBA8I),k===s.SHORT&&(Y=s.RGBA16I),k===s.INT&&(Y=s.RGBA32I)),b===s.RGB&&(k===s.UNSIGNED_INT_5_9_9_9_REV&&(Y=s.RGB9_E5),k===s.UNSIGNED_INT_10F_11F_11F_REV&&(Y=s.R11F_G11F_B10F)),b===s.RGBA){const ge=Q?hl:Ze.getTransfer(j);k===s.FLOAT&&(Y=s.RGBA32F),k===s.HALF_FLOAT&&(Y=s.RGBA16F),k===s.UNSIGNED_BYTE&&(Y=ge===lt?s.SRGB8_ALPHA8:s.RGBA8),k===s.UNSIGNED_SHORT_4_4_4_4&&(Y=s.RGBA4),k===s.UNSIGNED_SHORT_5_5_5_1&&(Y=s.RGB5_A1)}return(Y===s.R16F||Y===s.R32F||Y===s.RG16F||Y===s.RG32F||Y===s.RGBA16F||Y===s.RGBA32F)&&e.get("EXT_color_buffer_float"),Y}function y(R,b){let k;return R?b===null||b===Cn||b===Wr?k=s.DEPTH24_STENCIL8:b===Fi?k=s.DEPTH32F_STENCIL8:b===ka&&(k=s.DEPTH24_STENCIL8,Pe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===Cn||b===Wr?k=s.DEPTH_COMPONENT24:b===Fi?k=s.DEPTH_COMPONENT32F:b===ka&&(k=s.DEPTH_COMPONENT16),k}function M(R,b){return m(R)===!0||R.isFramebufferTexture&&R.minFilter!==Ot&&R.minFilter!==Kt?Math.log2(Math.max(b.width,b.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?b.mipmaps.length:1}function w(R){const b=R.target;b.removeEventListener("dispose",w),v(b),b.isVideoTexture&&h.delete(b)}function A(R){const b=R.target;b.removeEventListener("dispose",A),P(b)}function v(R){const b=i.get(R);if(b.__webglInit===void 0)return;const k=R.source,j=u.get(k);if(j){const Q=j[b.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&S(R),Object.keys(j).length===0&&u.delete(k)}i.remove(R)}function S(R){const b=i.get(R);s.deleteTexture(b.__webglTexture);const k=R.source,j=u.get(k);delete j[b.__cacheKey],a.memory.textures--}function P(R){const b=i.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),i.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(b.__webglFramebuffer[j]))for(let Q=0;Q<b.__webglFramebuffer[j].length;Q++)s.deleteFramebuffer(b.__webglFramebuffer[j][Q]);else s.deleteFramebuffer(b.__webglFramebuffer[j]);b.__webglDepthbuffer&&s.deleteRenderbuffer(b.__webglDepthbuffer[j])}else{if(Array.isArray(b.__webglFramebuffer))for(let j=0;j<b.__webglFramebuffer.length;j++)s.deleteFramebuffer(b.__webglFramebuffer[j]);else s.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&s.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&s.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let j=0;j<b.__webglColorRenderbuffer.length;j++)b.__webglColorRenderbuffer[j]&&s.deleteRenderbuffer(b.__webglColorRenderbuffer[j]);b.__webglDepthRenderbuffer&&s.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const k=R.textures;for(let j=0,Q=k.length;j<Q;j++){const Y=i.get(k[j]);Y.__webglTexture&&(s.deleteTexture(Y.__webglTexture),a.memory.textures--),i.remove(k[j])}i.remove(R)}let C=0;function N(){C=0}function O(){const R=C;return R>=n.maxTextures&&Pe("WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+n.maxTextures),C+=1,R}function V(R){const b=[];return b.push(R.wrapS),b.push(R.wrapT),b.push(R.wrapR||0),b.push(R.magFilter),b.push(R.minFilter),b.push(R.anisotropy),b.push(R.internalFormat),b.push(R.format),b.push(R.type),b.push(R.generateMipmaps),b.push(R.premultiplyAlpha),b.push(R.flipY),b.push(R.unpackAlignment),b.push(R.colorSpace),b.join()}function B(R,b){const k=i.get(R);if(R.isVideoTexture&&Qe(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&k.__version!==R.version){const j=R.image;if(j===null)Pe("WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)Pe("WebGLRenderer: Texture marked for update but image is incomplete");else{W(k,R,b);return}}else R.isExternalTexture&&(k.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(s.TEXTURE_2D,k.__webglTexture,s.TEXTURE0+b)}function F(R,b){const k=i.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&k.__version!==R.version){W(k,R,b);return}else R.isExternalTexture&&(k.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(s.TEXTURE_2D_ARRAY,k.__webglTexture,s.TEXTURE0+b)}function L(R,b){const k=i.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&k.__version!==R.version){W(k,R,b);return}t.bindTexture(s.TEXTURE_3D,k.__webglTexture,s.TEXTURE0+b)}function K(R,b){const k=i.get(R);if(R.isCubeDepthTexture!==!0&&R.version>0&&k.__version!==R.version){J(k,R,b);return}t.bindTexture(s.TEXTURE_CUBE_MAP,k.__webglTexture,s.TEXTURE0+b)}const q={[bs]:s.REPEAT,[bn]:s.CLAMP_TO_EDGE,[cl]:s.MIRRORED_REPEAT},ie={[Ot]:s.NEAREST,[Kp]:s.NEAREST_MIPMAP_NEAREST,[Ta]:s.NEAREST_MIPMAP_LINEAR,[Kt]:s.LINEAR,[$o]:s.LINEAR_MIPMAP_NEAREST,[Hn]:s.LINEAR_MIPMAP_LINEAR},ue={[s_]:s.NEVER,[c_]:s.ALWAYS,[r_]:s.LESS,[Uu]:s.LEQUAL,[a_]:s.EQUAL,[Fu]:s.GEQUAL,[o_]:s.GREATER,[l_]:s.NOTEQUAL};function ne(R,b){if(b.type===Fi&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===Kt||b.magFilter===$o||b.magFilter===Ta||b.magFilter===Hn||b.minFilter===Kt||b.minFilter===$o||b.minFilter===Ta||b.minFilter===Hn)&&Pe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(R,s.TEXTURE_WRAP_S,q[b.wrapS]),s.texParameteri(R,s.TEXTURE_WRAP_T,q[b.wrapT]),(R===s.TEXTURE_3D||R===s.TEXTURE_2D_ARRAY)&&s.texParameteri(R,s.TEXTURE_WRAP_R,q[b.wrapR]),s.texParameteri(R,s.TEXTURE_MAG_FILTER,ie[b.magFilter]),s.texParameteri(R,s.TEXTURE_MIN_FILTER,ie[b.minFilter]),b.compareFunction&&(s.texParameteri(R,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(R,s.TEXTURE_COMPARE_FUNC,ue[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===Ot||b.minFilter!==Ta&&b.minFilter!==Hn||b.type===Fi&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||i.get(b).__currentAnisotropy){const k=e.get("EXT_texture_filter_anisotropic");s.texParameterf(R,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,n.getMaxAnisotropy())),i.get(b).__currentAnisotropy=b.anisotropy}}}function Z(R,b){let k=!1;R.__webglInit===void 0&&(R.__webglInit=!0,b.addEventListener("dispose",w));const j=b.source;let Q=u.get(j);Q===void 0&&(Q={},u.set(j,Q));const Y=V(b);if(Y!==R.__cacheKey){Q[Y]===void 0&&(Q[Y]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,k=!0),Q[Y].usedTimes++;const ge=Q[R.__cacheKey];ge!==void 0&&(Q[R.__cacheKey].usedTimes--,ge.usedTimes===0&&S(b)),R.__cacheKey=Y,R.__webglTexture=Q[Y].texture}return k}function ae(R,b,k){return Math.floor(Math.floor(R/k)/b)}function ve(R,b,k,j){const Y=R.updateRanges;if(Y.length===0)t.texSubImage2D(s.TEXTURE_2D,0,0,0,b.width,b.height,k,j,b.data);else{Y.sort((te,le)=>te.start-le.start);let ge=0;for(let te=1;te<Y.length;te++){const le=Y[ge],be=Y[te],Se=le.start+le.count,fe=ae(be.start,b.width,4),Be=ae(le.start,b.width,4);be.start<=Se+1&&fe===Be&&ae(be.start+be.count-1,b.width,4)===fe?le.count=Math.max(le.count,be.start+be.count-le.start):(++ge,Y[ge]=be)}Y.length=ge+1;const oe=s.getParameter(s.UNPACK_ROW_LENGTH),Te=s.getParameter(s.UNPACK_SKIP_PIXELS),Oe=s.getParameter(s.UNPACK_SKIP_ROWS);s.pixelStorei(s.UNPACK_ROW_LENGTH,b.width);for(let te=0,le=Y.length;te<le;te++){const be=Y[te],Se=Math.floor(be.start/4),fe=Math.ceil(be.count/4),Be=Se%b.width,U=Math.floor(Se/b.width),ce=fe,se=1;s.pixelStorei(s.UNPACK_SKIP_PIXELS,Be),s.pixelStorei(s.UNPACK_SKIP_ROWS,U),t.texSubImage2D(s.TEXTURE_2D,0,Be,U,ce,se,k,j,b.data)}R.clearUpdateRanges(),s.pixelStorei(s.UNPACK_ROW_LENGTH,oe),s.pixelStorei(s.UNPACK_SKIP_PIXELS,Te),s.pixelStorei(s.UNPACK_SKIP_ROWS,Oe)}}function W(R,b,k){let j=s.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(j=s.TEXTURE_2D_ARRAY),b.isData3DTexture&&(j=s.TEXTURE_3D);const Q=Z(R,b),Y=b.source;t.bindTexture(j,R.__webglTexture,s.TEXTURE0+k);const ge=i.get(Y);if(Y.version!==ge.__version||Q===!0){t.activeTexture(s.TEXTURE0+k);const oe=Ze.getPrimaries(Ze.workingColorSpace),Te=b.colorSpace===us?null:Ze.getPrimaries(b.colorSpace),Oe=b.colorSpace===us||oe===Te?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,b.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,b.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Oe);let te=g(b.image,!1,n.maxTextureSize);te=ot(b,te);const le=r.convert(b.format,b.colorSpace),be=r.convert(b.type);let Se=E(b.internalFormat,le,be,b.colorSpace,b.isVideoTexture);ne(j,b);let fe;const Be=b.mipmaps,U=b.isVideoTexture!==!0,ce=ge.__version===void 0||Q===!0,se=Y.dataReady,ye=M(b,te);if(b.isDepthTexture)Se=y(b.format===fs,b.type),ce&&(U?t.texStorage2D(s.TEXTURE_2D,1,Se,te.width,te.height):t.texImage2D(s.TEXTURE_2D,0,Se,te.width,te.height,0,le,be,null));else if(b.isDataTexture)if(Be.length>0){U&&ce&&t.texStorage2D(s.TEXTURE_2D,ye,Se,Be[0].width,Be[0].height);for(let re=0,$=Be.length;re<$;re++)fe=Be[re],U?se&&t.texSubImage2D(s.TEXTURE_2D,re,0,0,fe.width,fe.height,le,be,fe.data):t.texImage2D(s.TEXTURE_2D,re,Se,fe.width,fe.height,0,le,be,fe.data);b.generateMipmaps=!1}else U?(ce&&t.texStorage2D(s.TEXTURE_2D,ye,Se,te.width,te.height),se&&ve(b,te,le,be)):t.texImage2D(s.TEXTURE_2D,0,Se,te.width,te.height,0,le,be,te.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){U&&ce&&t.texStorage3D(s.TEXTURE_2D_ARRAY,ye,Se,Be[0].width,Be[0].height,te.depth);for(let re=0,$=Be.length;re<$;re++)if(fe=Be[re],b.format!==Ki)if(le!==null)if(U){if(se)if(b.layerUpdates.size>0){const Ee=Nf(fe.width,fe.height,b.format,b.type);for(const ze of b.layerUpdates){const yt=fe.data.subarray(ze*Ee/fe.data.BYTES_PER_ELEMENT,(ze+1)*Ee/fe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,re,0,0,ze,fe.width,fe.height,1,le,yt)}b.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,re,0,0,0,fe.width,fe.height,te.depth,le,fe.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,re,Se,fe.width,fe.height,te.depth,0,fe.data,0,0);else Pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else U?se&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,re,0,0,0,fe.width,fe.height,te.depth,le,be,fe.data):t.texImage3D(s.TEXTURE_2D_ARRAY,re,Se,fe.width,fe.height,te.depth,0,le,be,fe.data)}else{U&&ce&&t.texStorage2D(s.TEXTURE_2D,ye,Se,Be[0].width,Be[0].height);for(let re=0,$=Be.length;re<$;re++)fe=Be[re],b.format!==Ki?le!==null?U?se&&t.compressedTexSubImage2D(s.TEXTURE_2D,re,0,0,fe.width,fe.height,le,fe.data):t.compressedTexImage2D(s.TEXTURE_2D,re,Se,fe.width,fe.height,0,fe.data):Pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):U?se&&t.texSubImage2D(s.TEXTURE_2D,re,0,0,fe.width,fe.height,le,be,fe.data):t.texImage2D(s.TEXTURE_2D,re,Se,fe.width,fe.height,0,le,be,fe.data)}else if(b.isDataArrayTexture)if(U){if(ce&&t.texStorage3D(s.TEXTURE_2D_ARRAY,ye,Se,te.width,te.height,te.depth),se)if(b.layerUpdates.size>0){const re=Nf(te.width,te.height,b.format,b.type);for(const $ of b.layerUpdates){const Ee=te.data.subarray($*re/te.data.BYTES_PER_ELEMENT,($+1)*re/te.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,$,te.width,te.height,1,le,be,Ee)}b.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,le,be,te.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,Se,te.width,te.height,te.depth,0,le,be,te.data);else if(b.isData3DTexture)U?(ce&&t.texStorage3D(s.TEXTURE_3D,ye,Se,te.width,te.height,te.depth),se&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,le,be,te.data)):t.texImage3D(s.TEXTURE_3D,0,Se,te.width,te.height,te.depth,0,le,be,te.data);else if(b.isFramebufferTexture){if(ce)if(U)t.texStorage2D(s.TEXTURE_2D,ye,Se,te.width,te.height);else{let re=te.width,$=te.height;for(let Ee=0;Ee<ye;Ee++)t.texImage2D(s.TEXTURE_2D,Ee,Se,re,$,0,le,be,null),re>>=1,$>>=1}}else if(Be.length>0){if(U&&ce){const re=Me(Be[0]);t.texStorage2D(s.TEXTURE_2D,ye,Se,re.width,re.height)}for(let re=0,$=Be.length;re<$;re++)fe=Be[re],U?se&&t.texSubImage2D(s.TEXTURE_2D,re,0,0,le,be,fe):t.texImage2D(s.TEXTURE_2D,re,Se,le,be,fe);b.generateMipmaps=!1}else if(U){if(ce){const re=Me(te);t.texStorage2D(s.TEXTURE_2D,ye,Se,re.width,re.height)}se&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,le,be,te)}else t.texImage2D(s.TEXTURE_2D,0,Se,le,be,te);m(b)&&_(j),ge.__version=Y.version,b.onUpdate&&b.onUpdate(b)}R.__version=b.version}function J(R,b,k){if(b.image.length!==6)return;const j=Z(R,b),Q=b.source;t.bindTexture(s.TEXTURE_CUBE_MAP,R.__webglTexture,s.TEXTURE0+k);const Y=i.get(Q);if(Q.version!==Y.__version||j===!0){t.activeTexture(s.TEXTURE0+k);const ge=Ze.getPrimaries(Ze.workingColorSpace),oe=b.colorSpace===us?null:Ze.getPrimaries(b.colorSpace),Te=b.colorSpace===us||ge===oe?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,b.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,b.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Te);const Oe=b.isCompressedTexture||b.image[0].isCompressedTexture,te=b.image[0]&&b.image[0].isDataTexture,le=[];for(let $=0;$<6;$++)!Oe&&!te?le[$]=g(b.image[$],!0,n.maxCubemapSize):le[$]=te?b.image[$].image:b.image[$],le[$]=ot(b,le[$]);const be=le[0],Se=r.convert(b.format,b.colorSpace),fe=r.convert(b.type),Be=E(b.internalFormat,Se,fe,b.colorSpace),U=b.isVideoTexture!==!0,ce=Y.__version===void 0||j===!0,se=Q.dataReady;let ye=M(b,be);ne(s.TEXTURE_CUBE_MAP,b);let re;if(Oe){U&&ce&&t.texStorage2D(s.TEXTURE_CUBE_MAP,ye,Be,be.width,be.height);for(let $=0;$<6;$++){re=le[$].mipmaps;for(let Ee=0;Ee<re.length;Ee++){const ze=re[Ee];b.format!==Ki?Se!==null?U?se&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,Ee,0,0,ze.width,ze.height,Se,ze.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,Ee,Be,ze.width,ze.height,0,ze.data):Pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?se&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,Ee,0,0,ze.width,ze.height,Se,fe,ze.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,Ee,Be,ze.width,ze.height,0,Se,fe,ze.data)}}}else{if(re=b.mipmaps,U&&ce){re.length>0&&ye++;const $=Me(le[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,ye,Be,$.width,$.height)}for(let $=0;$<6;$++)if(te){U?se&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,le[$].width,le[$].height,Se,fe,le[$].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Be,le[$].width,le[$].height,0,Se,fe,le[$].data);for(let Ee=0;Ee<re.length;Ee++){const yt=re[Ee].image[$].image;U?se&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,Ee+1,0,0,yt.width,yt.height,Se,fe,yt.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,Ee+1,Be,yt.width,yt.height,0,Se,fe,yt.data)}}else{U?se&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,Se,fe,le[$]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Be,Se,fe,le[$]);for(let Ee=0;Ee<re.length;Ee++){const ze=re[Ee];U?se&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,Ee+1,0,0,Se,fe,ze.image[$]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,Ee+1,Be,Se,fe,ze.image[$])}}}m(b)&&_(s.TEXTURE_CUBE_MAP),Y.__version=Q.version,b.onUpdate&&b.onUpdate(b)}R.__version=b.version}function ee(R,b,k,j,Q,Y){const ge=r.convert(k.format,k.colorSpace),oe=r.convert(k.type),Te=E(k.internalFormat,ge,oe,k.colorSpace),Oe=i.get(b),te=i.get(k);if(te.__renderTarget=b,!Oe.__hasExternalTextures){const le=Math.max(1,b.width>>Y),be=Math.max(1,b.height>>Y);Q===s.TEXTURE_3D||Q===s.TEXTURE_2D_ARRAY?t.texImage3D(Q,Y,Te,le,be,b.depth,0,ge,oe,null):t.texImage2D(Q,Y,Te,le,be,0,ge,oe,null)}t.bindFramebuffer(s.FRAMEBUFFER,R),wt(b)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,j,Q,te.__webglTexture,0,I(b)):(Q===s.TEXTURE_2D||Q>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,j,Q,te.__webglTexture,Y),t.bindFramebuffer(s.FRAMEBUFFER,null)}function Ce(R,b,k){if(s.bindRenderbuffer(s.RENDERBUFFER,R),b.depthBuffer){const j=b.depthTexture,Q=j&&j.isDepthTexture?j.type:null,Y=y(b.stencilBuffer,Q),ge=b.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;wt(b)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,I(b),Y,b.width,b.height):k?s.renderbufferStorageMultisample(s.RENDERBUFFER,I(b),Y,b.width,b.height):s.renderbufferStorage(s.RENDERBUFFER,Y,b.width,b.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,ge,s.RENDERBUFFER,R)}else{const j=b.textures;for(let Q=0;Q<j.length;Q++){const Y=j[Q],ge=r.convert(Y.format,Y.colorSpace),oe=r.convert(Y.type),Te=E(Y.internalFormat,ge,oe,Y.colorSpace);wt(b)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,I(b),Te,b.width,b.height):k?s.renderbufferStorageMultisample(s.RENDERBUFFER,I(b),Te,b.width,b.height):s.renderbufferStorage(s.RENDERBUFFER,Te,b.width,b.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function xe(R,b,k){const j=b.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(s.FRAMEBUFFER,R),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Q=i.get(b.depthTexture);if(Q.__renderTarget=b,(!Q.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),j){if(Q.__webglInit===void 0&&(Q.__webglInit=!0,b.depthTexture.addEventListener("dispose",w)),Q.__webglTexture===void 0){Q.__webglTexture=s.createTexture(),t.bindTexture(s.TEXTURE_CUBE_MAP,Q.__webglTexture),ne(s.TEXTURE_CUBE_MAP,b.depthTexture);const Oe=r.convert(b.depthTexture.format),te=r.convert(b.depthTexture.type);let le;b.depthTexture.format===jn?le=s.DEPTH_COMPONENT24:b.depthTexture.format===fs&&(le=s.DEPTH24_STENCIL8);for(let be=0;be<6;be++)s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,le,b.width,b.height,0,Oe,te,null)}}else B(b.depthTexture,0);const Y=Q.__webglTexture,ge=I(b),oe=j?s.TEXTURE_CUBE_MAP_POSITIVE_X+k:s.TEXTURE_2D,Te=b.depthTexture.format===fs?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(b.depthTexture.format===jn)wt(b)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,Te,oe,Y,0,ge):s.framebufferTexture2D(s.FRAMEBUFFER,Te,oe,Y,0);else if(b.depthTexture.format===fs)wt(b)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,Te,oe,Y,0,ge):s.framebufferTexture2D(s.FRAMEBUFFER,Te,oe,Y,0);else throw new Error("Unknown depthTexture format")}function Fe(R){const b=i.get(R),k=R.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==R.depthTexture){const j=R.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),j){const Q=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,j.removeEventListener("dispose",Q)};j.addEventListener("dispose",Q),b.__depthDisposeCallback=Q}b.__boundDepthTexture=j}if(R.depthTexture&&!b.__autoAllocateDepthBuffer)if(k)for(let j=0;j<6;j++)xe(b.__webglFramebuffer[j],R,j);else{const j=R.texture.mipmaps;j&&j.length>0?xe(b.__webglFramebuffer[0],R,0):xe(b.__webglFramebuffer,R,0)}else if(k){b.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(t.bindFramebuffer(s.FRAMEBUFFER,b.__webglFramebuffer[j]),b.__webglDepthbuffer[j]===void 0)b.__webglDepthbuffer[j]=s.createRenderbuffer(),Ce(b.__webglDepthbuffer[j],R,!1);else{const Q=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Y=b.__webglDepthbuffer[j];s.bindRenderbuffer(s.RENDERBUFFER,Y),s.framebufferRenderbuffer(s.FRAMEBUFFER,Q,s.RENDERBUFFER,Y)}}else{const j=R.texture.mipmaps;if(j&&j.length>0?t.bindFramebuffer(s.FRAMEBUFFER,b.__webglFramebuffer[0]):t.bindFramebuffer(s.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=s.createRenderbuffer(),Ce(b.__webglDepthbuffer,R,!1);else{const Q=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Y=b.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,Y),s.framebufferRenderbuffer(s.FRAMEBUFFER,Q,s.RENDERBUFFER,Y)}}t.bindFramebuffer(s.FRAMEBUFFER,null)}function Ut(R,b,k){const j=i.get(R);b!==void 0&&ee(j.__webglFramebuffer,R,R.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),k!==void 0&&Fe(R)}function Ke(R){const b=R.texture,k=i.get(R),j=i.get(b);R.addEventListener("dispose",A);const Q=R.textures,Y=R.isWebGLCubeRenderTarget===!0,ge=Q.length>1;if(ge||(j.__webglTexture===void 0&&(j.__webglTexture=s.createTexture()),j.__version=b.version,a.memory.textures++),Y){k.__webglFramebuffer=[];for(let oe=0;oe<6;oe++)if(b.mipmaps&&b.mipmaps.length>0){k.__webglFramebuffer[oe]=[];for(let Te=0;Te<b.mipmaps.length;Te++)k.__webglFramebuffer[oe][Te]=s.createFramebuffer()}else k.__webglFramebuffer[oe]=s.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){k.__webglFramebuffer=[];for(let oe=0;oe<b.mipmaps.length;oe++)k.__webglFramebuffer[oe]=s.createFramebuffer()}else k.__webglFramebuffer=s.createFramebuffer();if(ge)for(let oe=0,Te=Q.length;oe<Te;oe++){const Oe=i.get(Q[oe]);Oe.__webglTexture===void 0&&(Oe.__webglTexture=s.createTexture(),a.memory.textures++)}if(R.samples>0&&wt(R)===!1){k.__webglMultisampledFramebuffer=s.createFramebuffer(),k.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let oe=0;oe<Q.length;oe++){const Te=Q[oe];k.__webglColorRenderbuffer[oe]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,k.__webglColorRenderbuffer[oe]);const Oe=r.convert(Te.format,Te.colorSpace),te=r.convert(Te.type),le=E(Te.internalFormat,Oe,te,Te.colorSpace,R.isXRRenderTarget===!0),be=I(R);s.renderbufferStorageMultisample(s.RENDERBUFFER,be,le,R.width,R.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+oe,s.RENDERBUFFER,k.__webglColorRenderbuffer[oe])}s.bindRenderbuffer(s.RENDERBUFFER,null),R.depthBuffer&&(k.__webglDepthRenderbuffer=s.createRenderbuffer(),Ce(k.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(Y){t.bindTexture(s.TEXTURE_CUBE_MAP,j.__webglTexture),ne(s.TEXTURE_CUBE_MAP,b);for(let oe=0;oe<6;oe++)if(b.mipmaps&&b.mipmaps.length>0)for(let Te=0;Te<b.mipmaps.length;Te++)ee(k.__webglFramebuffer[oe][Te],R,b,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Te);else ee(k.__webglFramebuffer[oe],R,b,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0);m(b)&&_(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ge){for(let oe=0,Te=Q.length;oe<Te;oe++){const Oe=Q[oe],te=i.get(Oe);let le=s.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(le=R.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(le,te.__webglTexture),ne(le,Oe),ee(k.__webglFramebuffer,R,Oe,s.COLOR_ATTACHMENT0+oe,le,0),m(Oe)&&_(le)}t.unbindTexture()}else{let oe=s.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(oe=R.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(oe,j.__webglTexture),ne(oe,b),b.mipmaps&&b.mipmaps.length>0)for(let Te=0;Te<b.mipmaps.length;Te++)ee(k.__webglFramebuffer[Te],R,b,s.COLOR_ATTACHMENT0,oe,Te);else ee(k.__webglFramebuffer,R,b,s.COLOR_ATTACHMENT0,oe,0);m(b)&&_(oe),t.unbindTexture()}R.depthBuffer&&Fe(R)}function tt(R){const b=R.textures;for(let k=0,j=b.length;k<j;k++){const Q=b[k];if(m(Q)){const Y=x(R),ge=i.get(Q).__webglTexture;t.bindTexture(Y,ge),_(Y),t.unbindTexture()}}}const rt=[],Ve=[];function St(R){if(R.samples>0){if(wt(R)===!1){const b=R.textures,k=R.width,j=R.height;let Q=s.COLOR_BUFFER_BIT;const Y=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ge=i.get(R),oe=b.length>1;if(oe)for(let Oe=0;Oe<b.length;Oe++)t.bindFramebuffer(s.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Oe,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,ge.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Oe,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,ge.__webglMultisampledFramebuffer);const Te=R.texture.mipmaps;Te&&Te.length>0?t.bindFramebuffer(s.DRAW_FRAMEBUFFER,ge.__webglFramebuffer[0]):t.bindFramebuffer(s.DRAW_FRAMEBUFFER,ge.__webglFramebuffer);for(let Oe=0;Oe<b.length;Oe++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(Q|=s.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(Q|=s.STENCIL_BUFFER_BIT)),oe){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,ge.__webglColorRenderbuffer[Oe]);const te=i.get(b[Oe]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,te,0)}s.blitFramebuffer(0,0,k,j,0,0,k,j,Q,s.NEAREST),l===!0&&(rt.length=0,Ve.length=0,rt.push(s.COLOR_ATTACHMENT0+Oe),R.depthBuffer&&R.resolveDepthBuffer===!1&&(rt.push(Y),Ve.push(Y),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,Ve)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,rt))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),oe)for(let Oe=0;Oe<b.length;Oe++){t.bindFramebuffer(s.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Oe,s.RENDERBUFFER,ge.__webglColorRenderbuffer[Oe]);const te=i.get(b[Oe]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,ge.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Oe,s.TEXTURE_2D,te,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,ge.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){const b=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[b])}}}function I(R){return Math.min(n.maxSamples,R.samples)}function wt(R){const b=i.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function Qe(R){const b=a.render.frame;h.get(R)!==b&&(h.set(R,b),R.update())}function ot(R,b){const k=R.colorSpace,j=R.format,Q=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||k!==yi&&k!==us&&(Ze.getTransfer(k)===lt?(j!==Ki||Q!==Oi)&&Pe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ue("WebGLTextures: Unsupported texture color space:",k)),b}function Me(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=O,this.resetTextureUnits=N,this.setTexture2D=B,this.setTexture2DArray=F,this.setTexture3D=L,this.setTextureCube=K,this.rebindTextures=Ut,this.setupRenderTarget=Ke,this.updateRenderTargetMipmap=tt,this.updateMultisampleRenderTarget=St,this.setupDepthRenderbuffer=Fe,this.setupFrameBufferTexture=ee,this.useMultisampledRTT=wt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function DS(s,e){function t(i,n=us){let r;const a=Ze.getTransfer(n);if(i===Oi)return s.UNSIGNED_BYTE;if(i===Du)return s.UNSIGNED_SHORT_4_4_4_4;if(i===Iu)return s.UNSIGNED_SHORT_5_5_5_1;if(i===Qp)return s.UNSIGNED_INT_5_9_9_9_REV;if(i===em)return s.UNSIGNED_INT_10F_11F_11F_REV;if(i===Zp)return s.BYTE;if(i===Jp)return s.SHORT;if(i===ka)return s.UNSIGNED_SHORT;if(i===Pu)return s.INT;if(i===Cn)return s.UNSIGNED_INT;if(i===Fi)return s.FLOAT;if(i===Gi)return s.HALF_FLOAT;if(i===tm)return s.ALPHA;if(i===im)return s.RGB;if(i===Ki)return s.RGBA;if(i===jn)return s.DEPTH_COMPONENT;if(i===fs)return s.DEPTH_STENCIL;if(i===Dl)return s.RED;if(i===Lu)return s.RED_INTEGER;if(i===Xr)return s.RG;if(i===Nu)return s.RG_INTEGER;if(i===Ou)return s.RGBA_INTEGER;if(i===jo||i===Ko||i===Zo||i===Jo)if(a===lt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===jo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ko)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Zo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Jo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===jo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ko)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Zo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Jo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===dh||i===fh||i===ph||i===mh)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===dh)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===fh)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ph)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===mh)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===gh||i===_h||i===vh||i===xh||i===yh||i===Mh||i===bh)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===gh||i===_h)return a===lt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===vh)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===xh)return r.COMPRESSED_R11_EAC;if(i===yh)return r.COMPRESSED_SIGNED_R11_EAC;if(i===Mh)return r.COMPRESSED_RG11_EAC;if(i===bh)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Sh||i===Eh||i===Th||i===wh||i===Ah||i===Ch||i===Rh||i===Ph||i===Dh||i===Ih||i===Lh||i===Nh||i===Oh||i===Uh)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Sh)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Eh)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Th)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===wh)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Ah)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Ch)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Rh)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Ph)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Dh)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Ih)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Lh)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Nh)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Oh)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Uh)return a===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Fh||i===kh||i===Bh)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===Fh)return a===lt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===kh)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Bh)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===zh||i===Vh||i===Hh||i===Gh)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===zh)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Vh)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Hh)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Gh)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Wr?s.UNSIGNED_INT_24_8:s[i]!==void 0?s[i]:null}return{convert:t}}const IS=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,LS=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class NS{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new pm(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new ii({vertexShader:IS,fragmentShader:LS,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new at(new Gs(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class OS extends Js{constructor(e,t){super();const i=this;let n=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,p=null;const g=typeof XRWebGLBinding<"u",m=new NS,_={},x=t.getContextAttributes();let E=null,y=null;const M=[],w=[],A=new De;let v=null;const S=new ui;S.viewport=new Tt;const P=new ui;P.viewport=new Tt;const C=[S,P],N=new Nv;let O=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let J=M[W];return J===void 0&&(J=new oc,M[W]=J),J.getTargetRaySpace()},this.getControllerGrip=function(W){let J=M[W];return J===void 0&&(J=new oc,M[W]=J),J.getGripSpace()},this.getHand=function(W){let J=M[W];return J===void 0&&(J=new oc,M[W]=J),J.getHandSpace()};function B(W){const J=w.indexOf(W.inputSource);if(J===-1)return;const ee=M[J];ee!==void 0&&(ee.update(W.inputSource,W.frame,c||a),ee.dispatchEvent({type:W.type,data:W.inputSource}))}function F(){n.removeEventListener("select",B),n.removeEventListener("selectstart",B),n.removeEventListener("selectend",B),n.removeEventListener("squeeze",B),n.removeEventListener("squeezestart",B),n.removeEventListener("squeezeend",B),n.removeEventListener("end",F),n.removeEventListener("inputsourceschange",L);for(let W=0;W<M.length;W++){const J=w[W];J!==null&&(w[W]=null,M[W].disconnect(J))}O=null,V=null,m.reset();for(const W in _)delete _[W];e.setRenderTarget(E),f=null,u=null,d=null,n=null,y=null,ve.stop(),i.isPresenting=!1,e.setPixelRatio(v),e.setSize(A.width,A.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){r=W,i.isPresenting===!0&&Pe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){o=W,i.isPresenting===!0&&Pe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(W){c=W},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&g&&(d=new XRWebGLBinding(n,t)),d},this.getFrame=function(){return p},this.getSession=function(){return n},this.setSession=async function(W){if(n=W,n!==null){if(E=e.getRenderTarget(),n.addEventListener("select",B),n.addEventListener("selectstart",B),n.addEventListener("selectend",B),n.addEventListener("squeeze",B),n.addEventListener("squeezestart",B),n.addEventListener("squeezeend",B),n.addEventListener("end",F),n.addEventListener("inputsourceschange",L),x.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(A),g&&"createProjectionLayer"in XRWebGLBinding.prototype){let ee=null,Ce=null,xe=null;x.depth&&(xe=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ee=x.stencil?fs:jn,Ce=x.stencil?Wr:Cn);const Fe={colorFormat:t.RGBA8,depthFormat:xe,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(Fe),n.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),y=new Ei(u.textureWidth,u.textureHeight,{format:Ki,type:Oi,depthTexture:new qr(u.textureWidth,u.textureHeight,Ce,void 0,void 0,void 0,void 0,void 0,void 0,ee),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const ee={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(n,t,ee),n.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Ei(f.framebufferWidth,f.framebufferHeight,{format:Ki,type:Oi,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await n.requestReferenceSpace(o),ve.setContext(n),ve.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(n!==null)return n.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function L(W){for(let J=0;J<W.removed.length;J++){const ee=W.removed[J],Ce=w.indexOf(ee);Ce>=0&&(w[Ce]=null,M[Ce].disconnect(ee))}for(let J=0;J<W.added.length;J++){const ee=W.added[J];let Ce=w.indexOf(ee);if(Ce===-1){for(let Fe=0;Fe<M.length;Fe++)if(Fe>=w.length){w.push(ee),Ce=Fe;break}else if(w[Fe]===null){w[Fe]=ee,Ce=Fe;break}if(Ce===-1)break}const xe=M[Ce];xe&&xe.connect(ee)}}const K=new D,q=new D;function ie(W,J,ee){K.setFromMatrixPosition(J.matrixWorld),q.setFromMatrixPosition(ee.matrixWorld);const Ce=K.distanceTo(q),xe=J.projectionMatrix.elements,Fe=ee.projectionMatrix.elements,Ut=xe[14]/(xe[10]-1),Ke=xe[14]/(xe[10]+1),tt=(xe[9]+1)/xe[5],rt=(xe[9]-1)/xe[5],Ve=(xe[8]-1)/xe[0],St=(Fe[8]+1)/Fe[0],I=Ut*Ve,wt=Ut*St,Qe=Ce/(-Ve+St),ot=Qe*-Ve;if(J.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(ot),W.translateZ(Qe),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert(),xe[10]===-1)W.projectionMatrix.copy(J.projectionMatrix),W.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{const Me=Ut+Qe,R=Ke+Qe,b=I-ot,k=wt+(Ce-ot),j=tt*Ke/R*Me,Q=rt*Ke/R*Me;W.projectionMatrix.makePerspective(b,k,j,Q,Me,R),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}}function ue(W,J){J===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(J.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(n===null)return;let J=W.near,ee=W.far;m.texture!==null&&(m.depthNear>0&&(J=m.depthNear),m.depthFar>0&&(ee=m.depthFar)),N.near=P.near=S.near=J,N.far=P.far=S.far=ee,(O!==N.near||V!==N.far)&&(n.updateRenderState({depthNear:N.near,depthFar:N.far}),O=N.near,V=N.far),N.layers.mask=W.layers.mask|6,S.layers.mask=N.layers.mask&-5,P.layers.mask=N.layers.mask&-3;const Ce=W.parent,xe=N.cameras;ue(N,Ce);for(let Fe=0;Fe<xe.length;Fe++)ue(xe[Fe],Ce);xe.length===2?ie(N,S,P):N.projectionMatrix.copy(S.projectionMatrix),ne(W,N,Ce)};function ne(W,J,ee){ee===null?W.matrix.copy(J.matrixWorld):(W.matrix.copy(ee.matrixWorld),W.matrix.invert(),W.matrix.multiply(J.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(J.projectionMatrix),W.projectionMatrixInverse.copy(J.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=Yr*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(W){l=W,u!==null&&(u.fixedFoveation=W),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=W)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(N)},this.getCameraTexture=function(W){return _[W]};let Z=null;function ae(W,J){if(h=J.getViewerPose(c||a),p=J,h!==null){const ee=h.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let Ce=!1;ee.length!==N.cameras.length&&(N.cameras.length=0,Ce=!0);for(let Ke=0;Ke<ee.length;Ke++){const tt=ee[Ke];let rt=null;if(f!==null)rt=f.getViewport(tt);else{const St=d.getViewSubImage(u,tt);rt=St.viewport,Ke===0&&(e.setRenderTargetTextures(y,St.colorTexture,St.depthStencilTexture),e.setRenderTarget(y))}let Ve=C[Ke];Ve===void 0&&(Ve=new ui,Ve.layers.enable(Ke),Ve.viewport=new Tt,C[Ke]=Ve),Ve.matrix.fromArray(tt.transform.matrix),Ve.matrix.decompose(Ve.position,Ve.quaternion,Ve.scale),Ve.projectionMatrix.fromArray(tt.projectionMatrix),Ve.projectionMatrixInverse.copy(Ve.projectionMatrix).invert(),Ve.viewport.set(rt.x,rt.y,rt.width,rt.height),Ke===0&&(N.matrix.copy(Ve.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),Ce===!0&&N.cameras.push(Ve)}const xe=n.enabledFeatures;if(xe&&xe.includes("depth-sensing")&&n.depthUsage=="gpu-optimized"&&g){d=i.getBinding();const Ke=d.getDepthInformation(ee[0]);Ke&&Ke.isValid&&Ke.texture&&m.init(Ke,n.renderState)}if(xe&&xe.includes("camera-access")&&g){e.state.unbindTexture(),d=i.getBinding();for(let Ke=0;Ke<ee.length;Ke++){const tt=ee[Ke].camera;if(tt){let rt=_[tt];rt||(rt=new pm,_[tt]=rt);const Ve=d.getCameraImage(tt);rt.sourceTexture=Ve}}}}for(let ee=0;ee<M.length;ee++){const Ce=w[ee],xe=M[ee];Ce!==null&&xe!==void 0&&xe.update(Ce,J,c||a)}Z&&Z(W,J),J.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:J}),p=null}const ve=new Sm;ve.setAnimationLoop(ae),this.setAnimationLoop=function(W){Z=W},this.dispose=function(){}}}const Ns=new hn,US=new He;function FS(s,e){function t(m,_){m.matrixAutoUpdate===!0&&m.updateMatrix(),_.value.copy(m.matrix)}function i(m,_){_.color.getRGB(m.fogColor.value,mm(s)),_.isFog?(m.fogNear.value=_.near,m.fogFar.value=_.far):_.isFogExp2&&(m.fogDensity.value=_.density)}function n(m,_,x,E,y){_.isMeshBasicMaterial?r(m,_):_.isMeshLambertMaterial?(r(m,_),_.envMap&&(m.envMapIntensity.value=_.envMapIntensity)):_.isMeshToonMaterial?(r(m,_),d(m,_)):_.isMeshPhongMaterial?(r(m,_),h(m,_),_.envMap&&(m.envMapIntensity.value=_.envMapIntensity)):_.isMeshStandardMaterial?(r(m,_),u(m,_),_.isMeshPhysicalMaterial&&f(m,_,y)):_.isMeshMatcapMaterial?(r(m,_),p(m,_)):_.isMeshDepthMaterial?r(m,_):_.isMeshDistanceMaterial?(r(m,_),g(m,_)):_.isMeshNormalMaterial?r(m,_):_.isLineBasicMaterial?(a(m,_),_.isLineDashedMaterial&&o(m,_)):_.isPointsMaterial?l(m,_,x,E):_.isSpriteMaterial?c(m,_):_.isShadowMaterial?(m.color.value.copy(_.color),m.opacity.value=_.opacity):_.isShaderMaterial&&(_.uniformsNeedUpdate=!1)}function r(m,_){m.opacity.value=_.opacity,_.color&&m.diffuse.value.copy(_.color),_.emissive&&m.emissive.value.copy(_.emissive).multiplyScalar(_.emissiveIntensity),_.map&&(m.map.value=_.map,t(_.map,m.mapTransform)),_.alphaMap&&(m.alphaMap.value=_.alphaMap,t(_.alphaMap,m.alphaMapTransform)),_.bumpMap&&(m.bumpMap.value=_.bumpMap,t(_.bumpMap,m.bumpMapTransform),m.bumpScale.value=_.bumpScale,_.side===vi&&(m.bumpScale.value*=-1)),_.normalMap&&(m.normalMap.value=_.normalMap,t(_.normalMap,m.normalMapTransform),m.normalScale.value.copy(_.normalScale),_.side===vi&&m.normalScale.value.negate()),_.displacementMap&&(m.displacementMap.value=_.displacementMap,t(_.displacementMap,m.displacementMapTransform),m.displacementScale.value=_.displacementScale,m.displacementBias.value=_.displacementBias),_.emissiveMap&&(m.emissiveMap.value=_.emissiveMap,t(_.emissiveMap,m.emissiveMapTransform)),_.specularMap&&(m.specularMap.value=_.specularMap,t(_.specularMap,m.specularMapTransform)),_.alphaTest>0&&(m.alphaTest.value=_.alphaTest);const x=e.get(_),E=x.envMap,y=x.envMapRotation;E&&(m.envMap.value=E,Ns.copy(y),Ns.x*=-1,Ns.y*=-1,Ns.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(Ns.y*=-1,Ns.z*=-1),m.envMapRotation.value.setFromMatrix4(US.makeRotationFromEuler(Ns)),m.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=_.reflectivity,m.ior.value=_.ior,m.refractionRatio.value=_.refractionRatio),_.lightMap&&(m.lightMap.value=_.lightMap,m.lightMapIntensity.value=_.lightMapIntensity,t(_.lightMap,m.lightMapTransform)),_.aoMap&&(m.aoMap.value=_.aoMap,m.aoMapIntensity.value=_.aoMapIntensity,t(_.aoMap,m.aoMapTransform))}function a(m,_){m.diffuse.value.copy(_.color),m.opacity.value=_.opacity,_.map&&(m.map.value=_.map,t(_.map,m.mapTransform))}function o(m,_){m.dashSize.value=_.dashSize,m.totalSize.value=_.dashSize+_.gapSize,m.scale.value=_.scale}function l(m,_,x,E){m.diffuse.value.copy(_.color),m.opacity.value=_.opacity,m.size.value=_.size*x,m.scale.value=E*.5,_.map&&(m.map.value=_.map,t(_.map,m.uvTransform)),_.alphaMap&&(m.alphaMap.value=_.alphaMap,t(_.alphaMap,m.alphaMapTransform)),_.alphaTest>0&&(m.alphaTest.value=_.alphaTest)}function c(m,_){m.diffuse.value.copy(_.color),m.opacity.value=_.opacity,m.rotation.value=_.rotation,_.map&&(m.map.value=_.map,t(_.map,m.mapTransform)),_.alphaMap&&(m.alphaMap.value=_.alphaMap,t(_.alphaMap,m.alphaMapTransform)),_.alphaTest>0&&(m.alphaTest.value=_.alphaTest)}function h(m,_){m.specular.value.copy(_.specular),m.shininess.value=Math.max(_.shininess,1e-4)}function d(m,_){_.gradientMap&&(m.gradientMap.value=_.gradientMap)}function u(m,_){m.metalness.value=_.metalness,_.metalnessMap&&(m.metalnessMap.value=_.metalnessMap,t(_.metalnessMap,m.metalnessMapTransform)),m.roughness.value=_.roughness,_.roughnessMap&&(m.roughnessMap.value=_.roughnessMap,t(_.roughnessMap,m.roughnessMapTransform)),_.envMap&&(m.envMapIntensity.value=_.envMapIntensity)}function f(m,_,x){m.ior.value=_.ior,_.sheen>0&&(m.sheenColor.value.copy(_.sheenColor).multiplyScalar(_.sheen),m.sheenRoughness.value=_.sheenRoughness,_.sheenColorMap&&(m.sheenColorMap.value=_.sheenColorMap,t(_.sheenColorMap,m.sheenColorMapTransform)),_.sheenRoughnessMap&&(m.sheenRoughnessMap.value=_.sheenRoughnessMap,t(_.sheenRoughnessMap,m.sheenRoughnessMapTransform))),_.clearcoat>0&&(m.clearcoat.value=_.clearcoat,m.clearcoatRoughness.value=_.clearcoatRoughness,_.clearcoatMap&&(m.clearcoatMap.value=_.clearcoatMap,t(_.clearcoatMap,m.clearcoatMapTransform)),_.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=_.clearcoatRoughnessMap,t(_.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),_.clearcoatNormalMap&&(m.clearcoatNormalMap.value=_.clearcoatNormalMap,t(_.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(_.clearcoatNormalScale),_.side===vi&&m.clearcoatNormalScale.value.negate())),_.dispersion>0&&(m.dispersion.value=_.dispersion),_.iridescence>0&&(m.iridescence.value=_.iridescence,m.iridescenceIOR.value=_.iridescenceIOR,m.iridescenceThicknessMinimum.value=_.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=_.iridescenceThicknessRange[1],_.iridescenceMap&&(m.iridescenceMap.value=_.iridescenceMap,t(_.iridescenceMap,m.iridescenceMapTransform)),_.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=_.iridescenceThicknessMap,t(_.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),_.transmission>0&&(m.transmission.value=_.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),_.transmissionMap&&(m.transmissionMap.value=_.transmissionMap,t(_.transmissionMap,m.transmissionMapTransform)),m.thickness.value=_.thickness,_.thicknessMap&&(m.thicknessMap.value=_.thicknessMap,t(_.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=_.attenuationDistance,m.attenuationColor.value.copy(_.attenuationColor)),_.anisotropy>0&&(m.anisotropyVector.value.set(_.anisotropy*Math.cos(_.anisotropyRotation),_.anisotropy*Math.sin(_.anisotropyRotation)),_.anisotropyMap&&(m.anisotropyMap.value=_.anisotropyMap,t(_.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=_.specularIntensity,m.specularColor.value.copy(_.specularColor),_.specularColorMap&&(m.specularColorMap.value=_.specularColorMap,t(_.specularColorMap,m.specularColorMapTransform)),_.specularIntensityMap&&(m.specularIntensityMap.value=_.specularIntensityMap,t(_.specularIntensityMap,m.specularIntensityMapTransform))}function p(m,_){_.matcap&&(m.matcap.value=_.matcap)}function g(m,_){const x=e.get(_).light;m.referencePosition.value.setFromMatrixPosition(x.matrixWorld),m.nearDistance.value=x.shadow.camera.near,m.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:n}}function kS(s,e,t,i){let n={},r={},a=[];const o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,E){const y=E.program;i.uniformBlockBinding(x,y)}function c(x,E){let y=n[x.id];y===void 0&&(p(x),y=h(x),n[x.id]=y,x.addEventListener("dispose",m));const M=E.program;i.updateUBOMapping(x,M);const w=e.render.frame;r[x.id]!==w&&(u(x),r[x.id]=w)}function h(x){const E=d();x.__bindingPointIndex=E;const y=s.createBuffer(),M=x.__size,w=x.usage;return s.bindBuffer(s.UNIFORM_BUFFER,y),s.bufferData(s.UNIFORM_BUFFER,M,w),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,E,y),y}function d(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return Ue("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(x){const E=n[x.id],y=x.uniforms,M=x.__cache;s.bindBuffer(s.UNIFORM_BUFFER,E);for(let w=0,A=y.length;w<A;w++){const v=Array.isArray(y[w])?y[w]:[y[w]];for(let S=0,P=v.length;S<P;S++){const C=v[S];if(f(C,w,S,M)===!0){const N=C.__offset,O=Array.isArray(C.value)?C.value:[C.value];let V=0;for(let B=0;B<O.length;B++){const F=O[B],L=g(F);typeof F=="number"||typeof F=="boolean"?(C.__data[0]=F,s.bufferSubData(s.UNIFORM_BUFFER,N+V,C.__data)):F.isMatrix3?(C.__data[0]=F.elements[0],C.__data[1]=F.elements[1],C.__data[2]=F.elements[2],C.__data[3]=0,C.__data[4]=F.elements[3],C.__data[5]=F.elements[4],C.__data[6]=F.elements[5],C.__data[7]=0,C.__data[8]=F.elements[6],C.__data[9]=F.elements[7],C.__data[10]=F.elements[8],C.__data[11]=0):(F.toArray(C.__data,V),V+=L.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,N,C.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(x,E,y,M){const w=x.value,A=E+"_"+y;if(M[A]===void 0)return typeof w=="number"||typeof w=="boolean"?M[A]=w:M[A]=w.clone(),!0;{const v=M[A];if(typeof w=="number"||typeof w=="boolean"){if(v!==w)return M[A]=w,!0}else if(v.equals(w)===!1)return v.copy(w),!0}return!1}function p(x){const E=x.uniforms;let y=0;const M=16;for(let A=0,v=E.length;A<v;A++){const S=Array.isArray(E[A])?E[A]:[E[A]];for(let P=0,C=S.length;P<C;P++){const N=S[P],O=Array.isArray(N.value)?N.value:[N.value];for(let V=0,B=O.length;V<B;V++){const F=O[V],L=g(F),K=y%M,q=K%L.boundary,ie=K+q;y+=q,ie!==0&&M-ie<L.storage&&(y+=M-ie),N.__data=new Float32Array(L.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=y,y+=L.storage}}}const w=y%M;return w>0&&(y+=M-w),x.__size=y,x.__cache={},this}function g(x){const E={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(E.boundary=4,E.storage=4):x.isVector2?(E.boundary=8,E.storage=8):x.isVector3||x.isColor?(E.boundary=16,E.storage=12):x.isVector4?(E.boundary=16,E.storage=16):x.isMatrix3?(E.boundary=48,E.storage=48):x.isMatrix4?(E.boundary=64,E.storage=64):x.isTexture?Pe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Pe("WebGLRenderer: Unsupported uniform value type.",x),E}function m(x){const E=x.target;E.removeEventListener("dispose",m);const y=a.indexOf(E.__bindingPointIndex);a.splice(y,1),s.deleteBuffer(n[E.id]),delete n[E.id],delete r[E.id]}function _(){for(const x in n)s.deleteBuffer(n[x]);a=[],n={},r={}}return{bind:l,update:c,dispose:_}}const BS=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let mn=null;function zS(){return mn===null&&(mn=new Nl(BS,16,16,Xr,Gi),mn.name="DFG_LUT",mn.minFilter=Kt,mn.magFilter=Kt,mn.wrapS=bn,mn.wrapT=bn,mn.generateMipmaps=!1,mn.needsUpdate=!0),mn}class Rm{constructor(e={}){const{canvas:t=f_(),context:i=null,depth:n=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=Oi}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=a;const g=f,m=new Set([Ou,Nu,Lu]),_=new Set([Oi,Cn,ka,Wr,Du,Iu]),x=new Uint32Array(4),E=new Int32Array(4);let y=null,M=null;const w=[],A=[];let v=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=An,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const S=this;let P=!1;this._outputColorSpace=Gt;let C=0,N=0,O=null,V=-1,B=null;const F=new Tt,L=new Tt;let K=null;const q=new Le(0);let ie=0,ue=t.width,ne=t.height,Z=1,ae=null,ve=null;const W=new Tt(0,0,ue,ne),J=new Tt(0,0,ue,ne);let ee=!1;const Ce=new Xu;let xe=!1,Fe=!1;const Ut=new He,Ke=new D,tt=new Tt,rt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ve=!1;function St(){return O===null?Z:1}let I=i;function wt(T,z){return t.getContext(T,z)}try{const T={alpha:!0,depth:n,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${bu}`),t.addEventListener("webglcontextlost",Ee,!1),t.addEventListener("webglcontextrestored",ze,!1),t.addEventListener("webglcontextcreationerror",yt,!1),I===null){const z="webgl2";if(I=wt(z,T),I===null)throw wt(z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw Ue("WebGLRenderer: "+T.message),T}let Qe,ot,Me,R,b,k,j,Q,Y,ge,oe,Te,Oe,te,le,be,Se,fe,Be,U,ce,se,ye;function re(){Qe=new VM(I),Qe.init(),ce=new DS(I,Qe),ot=new LM(I,Qe,e,ce),Me=new RS(I,Qe),ot.reversedDepthBuffer&&u&&Me.buffers.depth.setReversed(!0),R=new WM(I),b=new mS,k=new PS(I,Qe,Me,b,ot,ce,R),j=new zM(S),Q=new jv(I),se=new DM(I,Q),Y=new HM(I,Q,R,se),ge=new YM(I,Y,Q,se,R),fe=new XM(I,ot,k),le=new NM(b),oe=new pS(S,j,Qe,ot,se,le),Te=new FS(S,b),Oe=new _S,te=new SS(Qe),Se=new PM(S,j,Me,ge,p,l),be=new CS(S,ge,ot),ye=new kS(I,R,ot,Me),Be=new IM(I,Qe,R),U=new GM(I,Qe,R),R.programs=oe.programs,S.capabilities=ot,S.extensions=Qe,S.properties=b,S.renderLists=Oe,S.shadowMap=be,S.state=Me,S.info=R}re(),g!==Oi&&(v=new $M(g,t.width,t.height,n,r));const $=new OS(S,I);this.xr=$,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const T=Qe.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=Qe.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return Z},this.setPixelRatio=function(T){T!==void 0&&(Z=T,this.setSize(ue,ne,!1))},this.getSize=function(T){return T.set(ue,ne)},this.setSize=function(T,z,X=!0){if($.isPresenting){Pe("WebGLRenderer: Can't change size while VR device is presenting.");return}ue=T,ne=z,t.width=Math.floor(T*Z),t.height=Math.floor(z*Z),X===!0&&(t.style.width=T+"px",t.style.height=z+"px"),v!==null&&v.setSize(t.width,t.height),this.setViewport(0,0,T,z)},this.getDrawingBufferSize=function(T){return T.set(ue*Z,ne*Z).floor()},this.setDrawingBufferSize=function(T,z,X){ue=T,ne=z,Z=X,t.width=Math.floor(T*X),t.height=Math.floor(z*X),this.setViewport(0,0,T,z)},this.setEffects=function(T){if(g===Oi){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let z=0;z<T.length;z++)if(T[z].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}v.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(F)},this.getViewport=function(T){return T.copy(W)},this.setViewport=function(T,z,X,G){T.isVector4?W.set(T.x,T.y,T.z,T.w):W.set(T,z,X,G),Me.viewport(F.copy(W).multiplyScalar(Z).round())},this.getScissor=function(T){return T.copy(J)},this.setScissor=function(T,z,X,G){T.isVector4?J.set(T.x,T.y,T.z,T.w):J.set(T,z,X,G),Me.scissor(L.copy(J).multiplyScalar(Z).round())},this.getScissorTest=function(){return ee},this.setScissorTest=function(T){Me.setScissorTest(ee=T)},this.setOpaqueSort=function(T){ae=T},this.setTransparentSort=function(T){ve=T},this.getClearColor=function(T){return T.copy(Se.getClearColor())},this.setClearColor=function(){Se.setClearColor(...arguments)},this.getClearAlpha=function(){return Se.getClearAlpha()},this.setClearAlpha=function(){Se.setClearAlpha(...arguments)},this.clear=function(T=!0,z=!0,X=!0){let G=0;if(T){let H=!1;if(O!==null){const pe=O.texture.format;H=m.has(pe)}if(H){const pe=O.texture.type,_e=_.has(pe),me=Se.getClearColor(),we=Se.getClearAlpha(),Re=me.r,Ge=me.g,Ye=me.b;_e?(x[0]=Re,x[1]=Ge,x[2]=Ye,x[3]=we,I.clearBufferuiv(I.COLOR,0,x)):(E[0]=Re,E[1]=Ge,E[2]=Ye,E[3]=we,I.clearBufferiv(I.COLOR,0,E))}else G|=I.COLOR_BUFFER_BIT}z&&(G|=I.DEPTH_BUFFER_BIT),X&&(G|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G!==0&&I.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Ee,!1),t.removeEventListener("webglcontextrestored",ze,!1),t.removeEventListener("webglcontextcreationerror",yt,!1),Se.dispose(),Oe.dispose(),te.dispose(),b.dispose(),j.dispose(),ge.dispose(),se.dispose(),ye.dispose(),oe.dispose(),$.dispose(),$.removeEventListener("sessionstart",Td),$.removeEventListener("sessionend",wd),As.stop()};function Ee(T){T.preventDefault(),ul("WebGLRenderer: Context Lost."),P=!0}function ze(){ul("WebGLRenderer: Context Restored."),P=!1;const T=R.autoReset,z=be.enabled,X=be.autoUpdate,G=be.needsUpdate,H=be.type;re(),R.autoReset=T,be.enabled=z,be.autoUpdate=X,be.needsUpdate=G,be.type=H}function yt(T){Ue("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function ct(T){const z=T.target;z.removeEventListener("dispose",ct),Dn(z)}function Dn(T){In(T),b.remove(T)}function In(T){const z=b.get(T).programs;z!==void 0&&(z.forEach(function(X){oe.releaseProgram(X)}),T.isShaderMaterial&&oe.releaseShaderCache(T))}this.renderBufferDirect=function(T,z,X,G,H,pe){z===null&&(z=rt);const _e=H.isMesh&&H.matrixWorld.determinant()<0,me=cg(T,z,X,G,H);Me.setMaterial(G,_e);let we=X.index,Re=1;if(G.wireframe===!0){if(we=Y.getWireframeAttribute(X),we===void 0)return;Re=2}const Ge=X.drawRange,Ye=X.attributes.position;let Ie=Ge.start*Re,ft=(Ge.start+Ge.count)*Re;pe!==null&&(Ie=Math.max(Ie,pe.start*Re),ft=Math.min(ft,(pe.start+pe.count)*Re)),we!==null?(Ie=Math.max(Ie,0),ft=Math.min(ft,we.count)):Ye!=null&&(Ie=Math.max(Ie,0),ft=Math.min(ft,Ye.count));const Vt=ft-Ie;if(Vt<0||Vt===1/0)return;se.setup(H,G,me,X,we);let Ft,pt=Be;if(we!==null&&(Ft=Q.get(we),pt=U,pt.setIndex(Ft)),H.isMesh)G.wireframe===!0?(Me.setLineWidth(G.wireframeLinewidth*St()),pt.setMode(I.LINES)):pt.setMode(I.TRIANGLES);else if(H.isLine){let li=G.linewidth;li===void 0&&(li=1),Me.setLineWidth(li*St()),H.isLineSegments?pt.setMode(I.LINES):H.isLineLoop?pt.setMode(I.LINE_LOOP):pt.setMode(I.LINE_STRIP)}else H.isPoints?pt.setMode(I.POINTS):H.isSprite&&pt.setMode(I.TRIANGLES);if(H.isBatchedMesh)if(H._multiDrawInstances!==null)dl("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),pt.renderMultiDrawInstances(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount,H._multiDrawInstances);else if(Qe.get("WEBGL_multi_draw"))pt.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{const li=H._multiDrawStarts,Ae=H._multiDrawCounts,Pi=H._multiDrawCount,st=we?Q.get(we).bytesPerElement:1,en=b.get(G).currentProgram.getUniforms();for(let fn=0;fn<Pi;fn++)en.setValue(I,"_gl_DrawID",fn),pt.render(li[fn]/st,Ae[fn])}else if(H.isInstancedMesh)pt.renderInstances(Ie,Vt,H.count);else if(X.isInstancedBufferGeometry){const li=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,Ae=Math.min(X.instanceCount,li);pt.renderInstances(Ie,Vt,Ae)}else pt.render(Ie,Vt)};function Ed(T,z,X){T.transparent===!0&&T.side===rn&&T.forceSinglePass===!1?(T.side=vi,T.needsUpdate=!0,ro(T,z,X),T.side=$n,T.needsUpdate=!0,ro(T,z,X),T.side=rn):ro(T,z,X)}this.compile=function(T,z,X=null){X===null&&(X=T),M=te.get(X),M.init(z),A.push(M),X.traverseVisible(function(H){H.isLight&&H.layers.test(z.layers)&&(M.pushLight(H),H.castShadow&&M.pushShadow(H))}),T!==X&&T.traverseVisible(function(H){H.isLight&&H.layers.test(z.layers)&&(M.pushLight(H),H.castShadow&&M.pushShadow(H))}),M.setupLights();const G=new Set;return T.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;const pe=H.material;if(pe)if(Array.isArray(pe))for(let _e=0;_e<pe.length;_e++){const me=pe[_e];Ed(me,X,H),G.add(me)}else Ed(pe,X,H),G.add(pe)}),M=A.pop(),G},this.compileAsync=function(T,z,X=null){const G=this.compile(T,z,X);return new Promise(H=>{function pe(){if(G.forEach(function(_e){b.get(_e).currentProgram.isReady()&&G.delete(_e)}),G.size===0){H(T);return}setTimeout(pe,10)}Qe.get("KHR_parallel_shader_compile")!==null?pe():setTimeout(pe,10)})};let Wl=null;function lg(T){Wl&&Wl(T)}function Td(){As.stop()}function wd(){As.start()}const As=new Sm;As.setAnimationLoop(lg),typeof self<"u"&&As.setContext(self),this.setAnimationLoop=function(T){Wl=T,$.setAnimationLoop(T),T===null?As.stop():As.start()},$.addEventListener("sessionstart",Td),$.addEventListener("sessionend",wd),this.render=function(T,z){if(z!==void 0&&z.isCamera!==!0){Ue("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;const X=$.enabled===!0&&$.isPresenting===!0,G=v!==null&&(O===null||X)&&v.begin(S,O);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),$.enabled===!0&&$.isPresenting===!0&&(v===null||v.isCompositing()===!1)&&($.cameraAutoUpdate===!0&&$.updateCamera(z),z=$.getCamera()),T.isScene===!0&&T.onBeforeRender(S,T,z,O),M=te.get(T,A.length),M.init(z),A.push(M),Ut.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),Ce.setFromProjectionMatrix(Ut,Sn,z.reversedDepth),Fe=this.localClippingEnabled,xe=le.init(this.clippingPlanes,Fe),y=Oe.get(T,w.length),y.init(),w.push(y),$.enabled===!0&&$.isPresenting===!0){const _e=S.xr.getDepthSensingMesh();_e!==null&&Xl(_e,z,-1/0,S.sortObjects)}Xl(T,z,0,S.sortObjects),y.finish(),S.sortObjects===!0&&y.sort(ae,ve),Ve=$.enabled===!1||$.isPresenting===!1||$.hasDepthSensing()===!1,Ve&&Se.addToRenderList(y,T),this.info.render.frame++,xe===!0&&le.beginShadows();const H=M.state.shadowsArray;if(be.render(H,T,z),xe===!0&&le.endShadows(),this.info.autoReset===!0&&this.info.reset(),(G&&v.hasRenderPass())===!1){const _e=y.opaque,me=y.transmissive;if(M.setupLights(),z.isArrayCamera){const we=z.cameras;if(me.length>0)for(let Re=0,Ge=we.length;Re<Ge;Re++){const Ye=we[Re];Cd(_e,me,T,Ye)}Ve&&Se.render(T);for(let Re=0,Ge=we.length;Re<Ge;Re++){const Ye=we[Re];Ad(y,T,Ye,Ye.viewport)}}else me.length>0&&Cd(_e,me,T,z),Ve&&Se.render(T),Ad(y,T,z)}O!==null&&N===0&&(k.updateMultisampleRenderTarget(O),k.updateRenderTargetMipmap(O)),G&&v.end(S),T.isScene===!0&&T.onAfterRender(S,T,z),se.resetDefaultState(),V=-1,B=null,A.pop(),A.length>0?(M=A[A.length-1],xe===!0&&le.setGlobalState(S.clippingPlanes,M.state.camera)):M=null,w.pop(),w.length>0?y=w[w.length-1]:y=null};function Xl(T,z,X,G){if(T.visible===!1)return;if(T.layers.test(z.layers)){if(T.isGroup)X=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(z);else if(T.isLight)M.pushLight(T),T.castShadow&&M.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||Ce.intersectsSprite(T)){G&&tt.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Ut);const _e=ge.update(T),me=T.material;me.visible&&y.push(T,_e,me,X,tt.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||Ce.intersectsObject(T))){const _e=ge.update(T),me=T.material;if(G&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),tt.copy(T.boundingSphere.center)):(_e.boundingSphere===null&&_e.computeBoundingSphere(),tt.copy(_e.boundingSphere.center)),tt.applyMatrix4(T.matrixWorld).applyMatrix4(Ut)),Array.isArray(me)){const we=_e.groups;for(let Re=0,Ge=we.length;Re<Ge;Re++){const Ye=we[Re],Ie=me[Ye.materialIndex];Ie&&Ie.visible&&y.push(T,_e,Ie,X,tt.z,Ye)}}else me.visible&&y.push(T,_e,me,X,tt.z,null)}}const pe=T.children;for(let _e=0,me=pe.length;_e<me;_e++)Xl(pe[_e],z,X,G)}function Ad(T,z,X,G){const{opaque:H,transmissive:pe,transparent:_e}=T;M.setupLightsView(X),xe===!0&&le.setGlobalState(S.clippingPlanes,X),G&&Me.viewport(F.copy(G)),H.length>0&&so(H,z,X),pe.length>0&&so(pe,z,X),_e.length>0&&so(_e,z,X),Me.buffers.depth.setTest(!0),Me.buffers.depth.setMask(!0),Me.buffers.color.setMask(!0),Me.setPolygonOffset(!1)}function Cd(T,z,X,G){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;if(M.state.transmissionRenderTarget[G.id]===void 0){const Ie=Qe.has("EXT_color_buffer_half_float")||Qe.has("EXT_color_buffer_float");M.state.transmissionRenderTarget[G.id]=new Ei(1,1,{generateMipmaps:!0,type:Ie?Gi:Oi,minFilter:Hn,samples:Math.max(4,ot.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ze.workingColorSpace})}const pe=M.state.transmissionRenderTarget[G.id],_e=G.viewport||F;pe.setSize(_e.z*S.transmissionResolutionScale,_e.w*S.transmissionResolutionScale);const me=S.getRenderTarget(),we=S.getActiveCubeFace(),Re=S.getActiveMipmapLevel();S.setRenderTarget(pe),S.getClearColor(q),ie=S.getClearAlpha(),ie<1&&S.setClearColor(16777215,.5),S.clear(),Ve&&Se.render(X);const Ge=S.toneMapping;S.toneMapping=An;const Ye=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),M.setupLightsView(G),xe===!0&&le.setGlobalState(S.clippingPlanes,G),so(T,X,G),k.updateMultisampleRenderTarget(pe),k.updateRenderTargetMipmap(pe),Qe.has("WEBGL_multisampled_render_to_texture")===!1){let Ie=!1;for(let ft=0,Vt=z.length;ft<Vt;ft++){const Ft=z[ft],{object:pt,geometry:li,material:Ae,group:Pi}=Ft;if(Ae.side===rn&&pt.layers.test(G.layers)){const st=Ae.side;Ae.side=vi,Ae.needsUpdate=!0,Rd(pt,X,G,li,Ae,Pi),Ae.side=st,Ae.needsUpdate=!0,Ie=!0}}Ie===!0&&(k.updateMultisampleRenderTarget(pe),k.updateRenderTargetMipmap(pe))}S.setRenderTarget(me,we,Re),S.setClearColor(q,ie),Ye!==void 0&&(G.viewport=Ye),S.toneMapping=Ge}function so(T,z,X){const G=z.isScene===!0?z.overrideMaterial:null;for(let H=0,pe=T.length;H<pe;H++){const _e=T[H],{object:me,geometry:we,group:Re}=_e;let Ge=_e.material;Ge.allowOverride===!0&&G!==null&&(Ge=G),me.layers.test(X.layers)&&Rd(me,z,X,we,Ge,Re)}}function Rd(T,z,X,G,H,pe){T.onBeforeRender(S,z,X,G,H,pe),T.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),H.onBeforeRender(S,z,X,G,T,pe),H.transparent===!0&&H.side===rn&&H.forceSinglePass===!1?(H.side=vi,H.needsUpdate=!0,S.renderBufferDirect(X,z,G,H,T,pe),H.side=$n,H.needsUpdate=!0,S.renderBufferDirect(X,z,G,H,T,pe),H.side=rn):S.renderBufferDirect(X,z,G,H,T,pe),T.onAfterRender(S,z,X,G,H,pe)}function ro(T,z,X){z.isScene!==!0&&(z=rt);const G=b.get(T),H=M.state.lights,pe=M.state.shadowsArray,_e=H.state.version,me=oe.getParameters(T,H.state,pe,z,X),we=oe.getProgramCacheKey(me);let Re=G.programs;G.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?z.environment:null,G.fog=z.fog;const Ge=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;G.envMap=j.get(T.envMap||G.environment,Ge),G.envMapRotation=G.environment!==null&&T.envMap===null?z.environmentRotation:T.envMapRotation,Re===void 0&&(T.addEventListener("dispose",ct),Re=new Map,G.programs=Re);let Ye=Re.get(we);if(Ye!==void 0){if(G.currentProgram===Ye&&G.lightsStateVersion===_e)return Dd(T,me),Ye}else me.uniforms=oe.getUniforms(T),T.onBeforeCompile(me,S),Ye=oe.acquireProgram(me,we),Re.set(we,Ye),G.uniforms=me.uniforms;const Ie=G.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Ie.clippingPlanes=le.uniform),Dd(T,me),G.needsLights=ug(T),G.lightsStateVersion=_e,G.needsLights&&(Ie.ambientLightColor.value=H.state.ambient,Ie.lightProbe.value=H.state.probe,Ie.directionalLights.value=H.state.directional,Ie.directionalLightShadows.value=H.state.directionalShadow,Ie.spotLights.value=H.state.spot,Ie.spotLightShadows.value=H.state.spotShadow,Ie.rectAreaLights.value=H.state.rectArea,Ie.ltc_1.value=H.state.rectAreaLTC1,Ie.ltc_2.value=H.state.rectAreaLTC2,Ie.pointLights.value=H.state.point,Ie.pointLightShadows.value=H.state.pointShadow,Ie.hemisphereLights.value=H.state.hemi,Ie.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Ie.spotLightMatrix.value=H.state.spotLightMatrix,Ie.spotLightMap.value=H.state.spotLightMap,Ie.pointShadowMatrix.value=H.state.pointShadowMatrix),G.currentProgram=Ye,G.uniformsList=null,Ye}function Pd(T){if(T.uniformsList===null){const z=T.currentProgram.getUniforms();T.uniformsList=el.seqWithValue(z.seq,T.uniforms)}return T.uniformsList}function Dd(T,z){const X=b.get(T);X.outputColorSpace=z.outputColorSpace,X.batching=z.batching,X.batchingColor=z.batchingColor,X.instancing=z.instancing,X.instancingColor=z.instancingColor,X.instancingMorph=z.instancingMorph,X.skinning=z.skinning,X.morphTargets=z.morphTargets,X.morphNormals=z.morphNormals,X.morphColors=z.morphColors,X.morphTargetsCount=z.morphTargetsCount,X.numClippingPlanes=z.numClippingPlanes,X.numIntersection=z.numClipIntersection,X.vertexAlphas=z.vertexAlphas,X.vertexTangents=z.vertexTangents,X.toneMapping=z.toneMapping}function cg(T,z,X,G,H){z.isScene!==!0&&(z=rt),k.resetTextureUnits();const pe=z.fog,_e=G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial?z.environment:null,me=O===null?S.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:yi,we=G.isMeshStandardMaterial||G.isMeshLambertMaterial&&!G.envMap||G.isMeshPhongMaterial&&!G.envMap,Re=j.get(G.envMap||_e,we),Ge=G.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,Ye=!!X.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Ie=!!X.morphAttributes.position,ft=!!X.morphAttributes.normal,Vt=!!X.morphAttributes.color;let Ft=An;G.toneMapped&&(O===null||O.isXRRenderTarget===!0)&&(Ft=S.toneMapping);const pt=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,li=pt!==void 0?pt.length:0,Ae=b.get(G),Pi=M.state.lights;if(xe===!0&&(Fe===!0||T!==B)){const ei=T===B&&G.id===V;le.setState(G,T,ei)}let st=!1;G.version===Ae.__version?(Ae.needsLights&&Ae.lightsStateVersion!==Pi.state.version||Ae.outputColorSpace!==me||H.isBatchedMesh&&Ae.batching===!1||!H.isBatchedMesh&&Ae.batching===!0||H.isBatchedMesh&&Ae.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&Ae.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&Ae.instancing===!1||!H.isInstancedMesh&&Ae.instancing===!0||H.isSkinnedMesh&&Ae.skinning===!1||!H.isSkinnedMesh&&Ae.skinning===!0||H.isInstancedMesh&&Ae.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&Ae.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&Ae.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&Ae.instancingMorph===!1&&H.morphTexture!==null||Ae.envMap!==Re||G.fog===!0&&Ae.fog!==pe||Ae.numClippingPlanes!==void 0&&(Ae.numClippingPlanes!==le.numPlanes||Ae.numIntersection!==le.numIntersection)||Ae.vertexAlphas!==Ge||Ae.vertexTangents!==Ye||Ae.morphTargets!==Ie||Ae.morphNormals!==ft||Ae.morphColors!==Vt||Ae.toneMapping!==Ft||Ae.morphTargetsCount!==li)&&(st=!0):(st=!0,Ae.__version=G.version);let en=Ae.currentProgram;st===!0&&(en=ro(G,z,H));let fn=!1,Cs=!1,nr=!1;const _t=en.getUniforms(),si=Ae.uniforms;if(Me.useProgram(en.program)&&(fn=!0,Cs=!0,nr=!0),G.id!==V&&(V=G.id,Cs=!0),fn||B!==T){Me.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),_t.setValue(I,"projectionMatrix",T.projectionMatrix),_t.setValue(I,"viewMatrix",T.matrixWorldInverse);const es=_t.map.cameraPosition;es!==void 0&&es.setValue(I,Ke.setFromMatrixPosition(T.matrixWorld)),ot.logarithmicDepthBuffer&&_t.setValue(I,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&_t.setValue(I,"isOrthographic",T.isOrthographicCamera===!0),B!==T&&(B=T,Cs=!0,nr=!0)}if(Ae.needsLights&&(Pi.state.directionalShadowMap.length>0&&_t.setValue(I,"directionalShadowMap",Pi.state.directionalShadowMap,k),Pi.state.spotShadowMap.length>0&&_t.setValue(I,"spotShadowMap",Pi.state.spotShadowMap,k),Pi.state.pointShadowMap.length>0&&_t.setValue(I,"pointShadowMap",Pi.state.pointShadowMap,k)),H.isSkinnedMesh){_t.setOptional(I,H,"bindMatrix"),_t.setOptional(I,H,"bindMatrixInverse");const ei=H.skeleton;ei&&(ei.boneTexture===null&&ei.computeBoneTexture(),_t.setValue(I,"boneTexture",ei.boneTexture,k))}H.isBatchedMesh&&(_t.setOptional(I,H,"batchingTexture"),_t.setValue(I,"batchingTexture",H._matricesTexture,k),_t.setOptional(I,H,"batchingIdTexture"),_t.setValue(I,"batchingIdTexture",H._indirectTexture,k),_t.setOptional(I,H,"batchingColorTexture"),H._colorsTexture!==null&&_t.setValue(I,"batchingColorTexture",H._colorsTexture,k));const Qn=X.morphAttributes;if((Qn.position!==void 0||Qn.normal!==void 0||Qn.color!==void 0)&&fe.update(H,X,en),(Cs||Ae.receiveShadow!==H.receiveShadow)&&(Ae.receiveShadow=H.receiveShadow,_t.setValue(I,"receiveShadow",H.receiveShadow)),(G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial)&&G.envMap===null&&z.environment!==null&&(si.envMapIntensity.value=z.environmentIntensity),si.dfgLUT!==void 0&&(si.dfgLUT.value=zS()),Cs&&(_t.setValue(I,"toneMappingExposure",S.toneMappingExposure),Ae.needsLights&&hg(si,nr),pe&&G.fog===!0&&Te.refreshFogUniforms(si,pe),Te.refreshMaterialUniforms(si,G,Z,ne,M.state.transmissionRenderTarget[T.id]),el.upload(I,Pd(Ae),si,k)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(el.upload(I,Pd(Ae),si,k),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&_t.setValue(I,"center",H.center),_t.setValue(I,"modelViewMatrix",H.modelViewMatrix),_t.setValue(I,"normalMatrix",H.normalMatrix),_t.setValue(I,"modelMatrix",H.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const ei=G.uniformsGroups;for(let es=0,sr=ei.length;es<sr;es++){const Id=ei[es];ye.update(Id,en),ye.bind(Id,en)}}return en}function hg(T,z){T.ambientLightColor.needsUpdate=z,T.lightProbe.needsUpdate=z,T.directionalLights.needsUpdate=z,T.directionalLightShadows.needsUpdate=z,T.pointLights.needsUpdate=z,T.pointLightShadows.needsUpdate=z,T.spotLights.needsUpdate=z,T.spotLightShadows.needsUpdate=z,T.rectAreaLights.needsUpdate=z,T.hemisphereLights.needsUpdate=z}function ug(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return N},this.getRenderTarget=function(){return O},this.setRenderTargetTextures=function(T,z,X){const G=b.get(T);G.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),b.get(T.texture).__webglTexture=z,b.get(T.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:X,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,z){const X=b.get(T);X.__webglFramebuffer=z,X.__useDefaultFramebuffer=z===void 0};const dg=I.createFramebuffer();this.setRenderTarget=function(T,z=0,X=0){O=T,C=z,N=X;let G=null,H=!1,pe=!1;if(T){const me=b.get(T);if(me.__useDefaultFramebuffer!==void 0){Me.bindFramebuffer(I.FRAMEBUFFER,me.__webglFramebuffer),F.copy(T.viewport),L.copy(T.scissor),K=T.scissorTest,Me.viewport(F),Me.scissor(L),Me.setScissorTest(K),V=-1;return}else if(me.__webglFramebuffer===void 0)k.setupRenderTarget(T);else if(me.__hasExternalTextures)k.rebindTextures(T,b.get(T.texture).__webglTexture,b.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Ge=T.depthTexture;if(me.__boundDepthTexture!==Ge){if(Ge!==null&&b.has(Ge)&&(T.width!==Ge.image.width||T.height!==Ge.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");k.setupDepthRenderbuffer(T)}}const we=T.texture;(we.isData3DTexture||we.isDataArrayTexture||we.isCompressedArrayTexture)&&(pe=!0);const Re=b.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Re[z])?G=Re[z][X]:G=Re[z],H=!0):T.samples>0&&k.useMultisampledRTT(T)===!1?G=b.get(T).__webglMultisampledFramebuffer:Array.isArray(Re)?G=Re[X]:G=Re,F.copy(T.viewport),L.copy(T.scissor),K=T.scissorTest}else F.copy(W).multiplyScalar(Z).floor(),L.copy(J).multiplyScalar(Z).floor(),K=ee;if(X!==0&&(G=dg),Me.bindFramebuffer(I.FRAMEBUFFER,G)&&Me.drawBuffers(T,G),Me.viewport(F),Me.scissor(L),Me.setScissorTest(K),H){const me=b.get(T.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+z,me.__webglTexture,X)}else if(pe){const me=z;for(let we=0;we<T.textures.length;we++){const Re=b.get(T.textures[we]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+we,Re.__webglTexture,X,me)}}else if(T!==null&&X!==0){const me=b.get(T.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,me.__webglTexture,X)}V=-1},this.readRenderTargetPixels=function(T,z,X,G,H,pe,_e,me=0){if(!(T&&T.isWebGLRenderTarget)){Ue("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let we=b.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&_e!==void 0&&(we=we[_e]),we){Me.bindFramebuffer(I.FRAMEBUFFER,we);try{const Re=T.textures[me],Ge=Re.format,Ye=Re.type;if(T.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+me),!ot.textureFormatReadable(Ge)){Ue("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ot.textureTypeReadable(Ye)){Ue("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=T.width-G&&X>=0&&X<=T.height-H&&I.readPixels(z,X,G,H,ce.convert(Ge),ce.convert(Ye),pe)}finally{const Re=O!==null?b.get(O).__webglFramebuffer:null;Me.bindFramebuffer(I.FRAMEBUFFER,Re)}}},this.readRenderTargetPixelsAsync=async function(T,z,X,G,H,pe,_e,me=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let we=b.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&_e!==void 0&&(we=we[_e]),we)if(z>=0&&z<=T.width-G&&X>=0&&X<=T.height-H){Me.bindFramebuffer(I.FRAMEBUFFER,we);const Re=T.textures[me],Ge=Re.format,Ye=Re.type;if(T.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+me),!ot.textureFormatReadable(Ge))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ot.textureTypeReadable(Ye))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ie=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,Ie),I.bufferData(I.PIXEL_PACK_BUFFER,pe.byteLength,I.STREAM_READ),I.readPixels(z,X,G,H,ce.convert(Ge),ce.convert(Ye),0);const ft=O!==null?b.get(O).__webglFramebuffer:null;Me.bindFramebuffer(I.FRAMEBUFFER,ft);const Vt=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await p_(I,Vt,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,Ie),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,pe),I.deleteBuffer(Ie),I.deleteSync(Vt),pe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,z=null,X=0){const G=Math.pow(2,-X),H=Math.floor(T.image.width*G),pe=Math.floor(T.image.height*G),_e=z!==null?z.x:0,me=z!==null?z.y:0;k.setTexture2D(T,0),I.copyTexSubImage2D(I.TEXTURE_2D,X,0,0,_e,me,H,pe),Me.unbindTexture()};const fg=I.createFramebuffer(),pg=I.createFramebuffer();this.copyTextureToTexture=function(T,z,X=null,G=null,H=0,pe=0){let _e,me,we,Re,Ge,Ye,Ie,ft,Vt;const Ft=T.isCompressedTexture?T.mipmaps[pe]:T.image;if(X!==null)_e=X.max.x-X.min.x,me=X.max.y-X.min.y,we=X.isBox3?X.max.z-X.min.z:1,Re=X.min.x,Ge=X.min.y,Ye=X.isBox3?X.min.z:0;else{const si=Math.pow(2,-H);_e=Math.floor(Ft.width*si),me=Math.floor(Ft.height*si),T.isDataArrayTexture?we=Ft.depth:T.isData3DTexture?we=Math.floor(Ft.depth*si):we=1,Re=0,Ge=0,Ye=0}G!==null?(Ie=G.x,ft=G.y,Vt=G.z):(Ie=0,ft=0,Vt=0);const pt=ce.convert(z.format),li=ce.convert(z.type);let Ae;z.isData3DTexture?(k.setTexture3D(z,0),Ae=I.TEXTURE_3D):z.isDataArrayTexture||z.isCompressedArrayTexture?(k.setTexture2DArray(z,0),Ae=I.TEXTURE_2D_ARRAY):(k.setTexture2D(z,0),Ae=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,z.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,z.unpackAlignment);const Pi=I.getParameter(I.UNPACK_ROW_LENGTH),st=I.getParameter(I.UNPACK_IMAGE_HEIGHT),en=I.getParameter(I.UNPACK_SKIP_PIXELS),fn=I.getParameter(I.UNPACK_SKIP_ROWS),Cs=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,Ft.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Ft.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Re),I.pixelStorei(I.UNPACK_SKIP_ROWS,Ge),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Ye);const nr=T.isDataArrayTexture||T.isData3DTexture,_t=z.isDataArrayTexture||z.isData3DTexture;if(T.isDepthTexture){const si=b.get(T),Qn=b.get(z),ei=b.get(si.__renderTarget),es=b.get(Qn.__renderTarget);Me.bindFramebuffer(I.READ_FRAMEBUFFER,ei.__webglFramebuffer),Me.bindFramebuffer(I.DRAW_FRAMEBUFFER,es.__webglFramebuffer);for(let sr=0;sr<we;sr++)nr&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,b.get(T).__webglTexture,H,Ye+sr),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,b.get(z).__webglTexture,pe,Vt+sr)),I.blitFramebuffer(Re,Ge,_e,me,Ie,ft,_e,me,I.DEPTH_BUFFER_BIT,I.NEAREST);Me.bindFramebuffer(I.READ_FRAMEBUFFER,null),Me.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(H!==0||T.isRenderTargetTexture||b.has(T)){const si=b.get(T),Qn=b.get(z);Me.bindFramebuffer(I.READ_FRAMEBUFFER,fg),Me.bindFramebuffer(I.DRAW_FRAMEBUFFER,pg);for(let ei=0;ei<we;ei++)nr?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,si.__webglTexture,H,Ye+ei):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,si.__webglTexture,H),_t?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Qn.__webglTexture,pe,Vt+ei):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Qn.__webglTexture,pe),H!==0?I.blitFramebuffer(Re,Ge,_e,me,Ie,ft,_e,me,I.COLOR_BUFFER_BIT,I.NEAREST):_t?I.copyTexSubImage3D(Ae,pe,Ie,ft,Vt+ei,Re,Ge,_e,me):I.copyTexSubImage2D(Ae,pe,Ie,ft,Re,Ge,_e,me);Me.bindFramebuffer(I.READ_FRAMEBUFFER,null),Me.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else _t?T.isDataTexture||T.isData3DTexture?I.texSubImage3D(Ae,pe,Ie,ft,Vt,_e,me,we,pt,li,Ft.data):z.isCompressedArrayTexture?I.compressedTexSubImage3D(Ae,pe,Ie,ft,Vt,_e,me,we,pt,Ft.data):I.texSubImage3D(Ae,pe,Ie,ft,Vt,_e,me,we,pt,li,Ft):T.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,pe,Ie,ft,_e,me,pt,li,Ft.data):T.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,pe,Ie,ft,Ft.width,Ft.height,pt,Ft.data):I.texSubImage2D(I.TEXTURE_2D,pe,Ie,ft,_e,me,pt,li,Ft);I.pixelStorei(I.UNPACK_ROW_LENGTH,Pi),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,st),I.pixelStorei(I.UNPACK_SKIP_PIXELS,en),I.pixelStorei(I.UNPACK_SKIP_ROWS,fn),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Cs),pe===0&&z.generateMipmaps&&I.generateMipmap(Ae),Me.unbindTexture()},this.initRenderTarget=function(T){b.get(T).__webglFramebuffer===void 0&&k.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?k.setTextureCube(T,0):T.isData3DTexture?k.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?k.setTexture2DArray(T,0):k.setTexture2D(T,0),Me.unbindTexture()},this.resetState=function(){C=0,N=0,O=null,Me.reset(),se.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Sn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Ze._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ze._getUnpackColorSpace()}}function np(s,e){if(e===e_)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===Wh||e===nm){let t=s.getIndex();if(t===null){const a=[],o=s.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)a.push(l);s.setIndex(a),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}const i=t.count-2,n=[];if(e===Wh)for(let a=1;a<=i;a++)n.push(t.getX(0)),n.push(t.getX(a)),n.push(t.getX(a+1));else for(let a=0;a<i;a++)a%2===0?(n.push(t.getX(a)),n.push(t.getX(a+1)),n.push(t.getX(a+2))):(n.push(t.getX(a+2)),n.push(t.getX(a+1)),n.push(t.getX(a)));n.length/3!==i&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=s.clone();return r.setIndex(n),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}function VS(s){const e=new Map,t=new Map,i=s.clone();return Pm(s,i,function(n,r){e.set(r,n),t.set(n,r)}),i.traverse(function(n){if(!n.isSkinnedMesh)return;const r=n,a=e.get(n),o=a.skeleton.bones;r.skeleton=a.skeleton.clone(),r.bindMatrix.copy(a.bindMatrix),r.skeleton.bones=o.map(function(l){return t.get(l)}),r.bind(r.skeleton,r.bindMatrix)}),i}function Pm(s,e,t){t(s,e);for(let i=0;i<s.children.length;i++)Pm(s.children[i],e.children[i],t)}class sp extends ca{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new YS(t)}),this.register(function(t){return new qS(t)}),this.register(function(t){return new i1(t)}),this.register(function(t){return new n1(t)}),this.register(function(t){return new s1(t)}),this.register(function(t){return new jS(t)}),this.register(function(t){return new KS(t)}),this.register(function(t){return new ZS(t)}),this.register(function(t){return new JS(t)}),this.register(function(t){return new XS(t)}),this.register(function(t){return new QS(t)}),this.register(function(t){return new $S(t)}),this.register(function(t){return new t1(t)}),this.register(function(t){return new e1(t)}),this.register(function(t){return new GS(t)}),this.register(function(t){return new rp(t,je.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new rp(t,je.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new r1(t)})}load(e,t,i,n){const r=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const c=La.extractUrlBase(e);a=La.resolveURL(c,this.path)}else a=La.extractUrlBase(e);this.manager.itemStart(e);const o=function(c){n?n(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new ym(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,a,function(h){t(h),r.manager.itemEnd(e)},o)}catch(h){o(h)}},i,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,i,n){let r;const a={},o={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Dm){try{a[je.KHR_BINARY_GLTF]=new a1(e)}catch(d){n&&n(d);return}r=JSON.parse(a[je.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){n&&n(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new x1(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const d=this.pluginCallbacks[h](c);d.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[d.name]=d,a[d.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){const d=r.extensionsUsed[h],u=r.extensionsRequired||[];switch(d){case je.KHR_MATERIALS_UNLIT:a[d]=new WS;break;case je.KHR_DRACO_MESH_COMPRESSION:a[d]=new o1(r,this.dracoLoader);break;case je.KHR_TEXTURE_TRANSFORM:a[d]=new l1;break;case je.KHR_MESH_QUANTIZATION:a[d]=new c1;break;default:u.indexOf(d)>=0&&o[d]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+d+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(i,n)}parseAsync(e,t){const i=this;return new Promise(function(n,r){i.parse(e,t,n,r)})}}function HS(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}function Xt(s,e,t){const i=s.json.materials[e];return i.extensions&&i.extensions[t]?i.extensions[t]:null}const je={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class GS{constructor(e){this.parser=e,this.name=je.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let i=0,n=t.length;i<n;i++){const r=t[i];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,i="light:"+e;let n=t.cache.get(i);if(n)return n;const r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let c;const h=new Le(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],yi);const d=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new $h(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new bm(h),c.distance=d;break;case"spot":c=new Rv(h),c.distance=d,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),gn(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),n=Promise.resolve(c),t.cache.add(i,n),n}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,i=this.parser,r=i.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return i._getNodeRef(t.cache,o,l)})}}class WS{constructor(){this.name=je.KHR_MATERIALS_UNLIT}getMaterialType(){return En}extendParams(e,t,i){const n=[];e.color=new Le(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],yi),e.opacity=a[3]}r.baseColorTexture!==void 0&&n.push(i.assignTexture(e,"map",r.baseColorTexture,Gt))}return Promise.all(n)}}class XS{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=Xt(this.parser,e,this.name);return i===null||i.emissiveStrength!==void 0&&(t.emissiveIntensity=i.emissiveStrength),Promise.resolve()}}class YS{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return Xt(this.parser,e,this.name)!==null?un:null}extendMaterialParams(e,t){const i=Xt(this.parser,e,this.name);if(i===null)return Promise.resolve();const n=[];if(i.clearcoatFactor!==void 0&&(t.clearcoat=i.clearcoatFactor),i.clearcoatTexture!==void 0&&n.push(this.parser.assignTexture(t,"clearcoatMap",i.clearcoatTexture)),i.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=i.clearcoatRoughnessFactor),i.clearcoatRoughnessTexture!==void 0&&n.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",i.clearcoatRoughnessTexture)),i.clearcoatNormalTexture!==void 0&&(n.push(this.parser.assignTexture(t,"clearcoatNormalMap",i.clearcoatNormalTexture)),i.clearcoatNormalTexture.scale!==void 0)){const r=i.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new De(r,r)}return Promise.all(n)}}class qS{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_DISPERSION}getMaterialType(e){return Xt(this.parser,e,this.name)!==null?un:null}extendMaterialParams(e,t){const i=Xt(this.parser,e,this.name);return i===null||(t.dispersion=i.dispersion!==void 0?i.dispersion:0),Promise.resolve()}}class $S{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return Xt(this.parser,e,this.name)!==null?un:null}extendMaterialParams(e,t){const i=Xt(this.parser,e,this.name);if(i===null)return Promise.resolve();const n=[];return i.iridescenceFactor!==void 0&&(t.iridescence=i.iridescenceFactor),i.iridescenceTexture!==void 0&&n.push(this.parser.assignTexture(t,"iridescenceMap",i.iridescenceTexture)),i.iridescenceIor!==void 0&&(t.iridescenceIOR=i.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),i.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=i.iridescenceThicknessMinimum),i.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=i.iridescenceThicknessMaximum),i.iridescenceThicknessTexture!==void 0&&n.push(this.parser.assignTexture(t,"iridescenceThicknessMap",i.iridescenceThicknessTexture)),Promise.all(n)}}class jS{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_SHEEN}getMaterialType(e){return Xt(this.parser,e,this.name)!==null?un:null}extendMaterialParams(e,t){const i=Xt(this.parser,e,this.name);if(i===null)return Promise.resolve();const n=[];if(t.sheenColor=new Le(0,0,0),t.sheenRoughness=0,t.sheen=1,i.sheenColorFactor!==void 0){const r=i.sheenColorFactor;t.sheenColor.setRGB(r[0],r[1],r[2],yi)}return i.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=i.sheenRoughnessFactor),i.sheenColorTexture!==void 0&&n.push(this.parser.assignTexture(t,"sheenColorMap",i.sheenColorTexture,Gt)),i.sheenRoughnessTexture!==void 0&&n.push(this.parser.assignTexture(t,"sheenRoughnessMap",i.sheenRoughnessTexture)),Promise.all(n)}}class KS{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return Xt(this.parser,e,this.name)!==null?un:null}extendMaterialParams(e,t){const i=Xt(this.parser,e,this.name);if(i===null)return Promise.resolve();const n=[];return i.transmissionFactor!==void 0&&(t.transmission=i.transmissionFactor),i.transmissionTexture!==void 0&&n.push(this.parser.assignTexture(t,"transmissionMap",i.transmissionTexture)),Promise.all(n)}}class ZS{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_VOLUME}getMaterialType(e){return Xt(this.parser,e,this.name)!==null?un:null}extendMaterialParams(e,t){const i=Xt(this.parser,e,this.name);if(i===null)return Promise.resolve();const n=[];t.thickness=i.thicknessFactor!==void 0?i.thicknessFactor:0,i.thicknessTexture!==void 0&&n.push(this.parser.assignTexture(t,"thicknessMap",i.thicknessTexture)),t.attenuationDistance=i.attenuationDistance||1/0;const r=i.attenuationColor||[1,1,1];return t.attenuationColor=new Le().setRGB(r[0],r[1],r[2],yi),Promise.all(n)}}class JS{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_IOR}getMaterialType(e){return Xt(this.parser,e,this.name)!==null?un:null}extendMaterialParams(e,t){const i=Xt(this.parser,e,this.name);return i===null||(t.ior=i.ior!==void 0?i.ior:1.5),Promise.resolve()}}class QS{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_SPECULAR}getMaterialType(e){return Xt(this.parser,e,this.name)!==null?un:null}extendMaterialParams(e,t){const i=Xt(this.parser,e,this.name);if(i===null)return Promise.resolve();const n=[];t.specularIntensity=i.specularFactor!==void 0?i.specularFactor:1,i.specularTexture!==void 0&&n.push(this.parser.assignTexture(t,"specularIntensityMap",i.specularTexture));const r=i.specularColorFactor||[1,1,1];return t.specularColor=new Le().setRGB(r[0],r[1],r[2],yi),i.specularColorTexture!==void 0&&n.push(this.parser.assignTexture(t,"specularColorMap",i.specularColorTexture,Gt)),Promise.all(n)}}class e1{constructor(e){this.parser=e,this.name=je.EXT_MATERIALS_BUMP}getMaterialType(e){return Xt(this.parser,e,this.name)!==null?un:null}extendMaterialParams(e,t){const i=Xt(this.parser,e,this.name);if(i===null)return Promise.resolve();const n=[];return t.bumpScale=i.bumpFactor!==void 0?i.bumpFactor:1,i.bumpTexture!==void 0&&n.push(this.parser.assignTexture(t,"bumpMap",i.bumpTexture)),Promise.all(n)}}class t1{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return Xt(this.parser,e,this.name)!==null?un:null}extendMaterialParams(e,t){const i=Xt(this.parser,e,this.name);if(i===null)return Promise.resolve();const n=[];return i.anisotropyStrength!==void 0&&(t.anisotropy=i.anisotropyStrength),i.anisotropyRotation!==void 0&&(t.anisotropyRotation=i.anisotropyRotation),i.anisotropyTexture!==void 0&&n.push(this.parser.assignTexture(t,"anisotropyMap",i.anisotropyTexture)),Promise.all(n)}}class i1{constructor(e){this.parser=e,this.name=je.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,i=t.json,n=i.textures[e];if(!n.extensions||!n.extensions[this.name])return null;const r=n.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(i.extensionsRequired&&i.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}}class n1{constructor(e){this.parser=e,this.name=je.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,i=this.parser,n=i.json,r=n.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=n.images[a.source];let l=i.textureLoader;if(o.uri){const c=i.options.manager.getHandler(o.uri);c!==null&&(l=c)}return i.loadTextureImage(e,a.source,l)}}class s1{constructor(e){this.parser=e,this.name=je.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,i=this.parser,n=i.json,r=n.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=n.images[a.source];let l=i.textureLoader;if(o.uri){const c=i.options.manager.getHandler(o.uri);c!==null&&(l=c)}return i.loadTextureImage(e,a.source,l)}}class rp{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){const t=this.parser.json,i=t.bufferViews[e];if(i.extensions&&i.extensions[this.name]){const n=i.extensions[this.name],r=this.parser.getDependency("buffer",n.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){const l=n.byteOffset||0,c=n.byteLength||0,h=n.count,d=n.byteStride,u=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,d,u,n.mode,n.filter).then(function(f){return f.buffer}):a.ready.then(function(){const f=new ArrayBuffer(h*d);return a.decodeGltfBuffer(new Uint8Array(f),h,d,u,n.mode,n.filter),f})})}else return null}}class r1{constructor(e){this.name=je.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,i=t.nodes[e];if(!i.extensions||!i.extensions[this.name]||i.mesh===void 0)return null;const n=t.meshes[i.mesh];for(const c of n.primitives)if(c.mode!==$i.TRIANGLES&&c.mode!==$i.TRIANGLE_STRIP&&c.mode!==$i.TRIANGLE_FAN&&c.mode!==void 0)return null;const a=i.extensions[this.name].attributes,o=[],l={};for(const c in a)o.push(this.parser.getDependency("accessor",a[c]).then(h=>(l[c]=h,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{const h=c.pop(),d=h.isGroup?h.children:[h],u=c[0].count,f=[];for(const p of d){const g=new He,m=new D,_=new cn,x=new D(1,1,1),E=new Wu(p.geometry,p.material,u);for(let y=0;y<u;y++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,y),l.ROTATION&&_.fromBufferAttribute(l.ROTATION,y),l.SCALE&&x.fromBufferAttribute(l.SCALE,y),E.setMatrixAt(y,g.compose(m,_,x));for(const y in l)if(y==="_COLOR_0"){const M=l[y];E.instanceColor=new Yh(M.array,M.itemSize,M.normalized)}else y!=="TRANSLATION"&&y!=="ROTATION"&&y!=="SCALE"&&p.geometry.setAttribute(y,l[y]);bt.prototype.copy.call(E,p),this.parser.assignFinalMaterial(E),f.push(E)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const Dm="glTF",Ma=12,ap={JSON:1313821514,BIN:5130562};class a1{constructor(e){this.name=je.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Ma),i=new TextDecoder;if(this.header={magic:i.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Dm)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const n=this.header.length-Ma,r=new DataView(e,Ma);let a=0;for(;a<n;){const o=r.getUint32(a,!0);a+=4;const l=r.getUint32(a,!0);if(a+=4,l===ap.JSON){const c=new Uint8Array(e,Ma+a,o);this.content=i.decode(c)}else if(l===ap.BIN){const c=Ma+a;this.body=e.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class o1{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=je.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const i=this.json,n=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(const h in a){const d=Qh[h]||h.toLowerCase();o[d]=a[h]}for(const h in e.attributes){const d=Qh[h]||h.toLowerCase();if(a[h]!==void 0){const u=i.accessors[e.attributes[h]],f=Nr[u.componentType];c[d]=f.name,l[d]=u.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(d,u){n.decodeDracoFile(h,function(f){for(const p in f.attributes){const g=f.attributes[p],m=l[p];m!==void 0&&(g.normalized=m)}d(f)},o,c,yi,u)})})}}class l1{constructor(){this.name=je.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class c1{constructor(){this.name=je.KHR_MESH_QUANTIZATION}}class Im extends aa{constructor(e,t,i,n){super(e,t,i,n)}copySampleValue_(e){const t=this.resultBuffer,i=this.sampleValues,n=this.valueSize,r=e*n*3+n;for(let a=0;a!==n;a++)t[a]=i[r+a];return t}interpolate_(e,t,i,n){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,h=n-t,d=(i-t)/h,u=d*d,f=u*d,p=e*c,g=p-c,m=-2*f+3*u,_=f-u,x=1-m,E=_-u+d;for(let y=0;y!==o;y++){const M=a[g+y+o],w=a[g+y+l]*h,A=a[p+y+o],v=a[p+y]*h;r[y]=x*M+E*w+m*A+_*v}return r}}const h1=new cn;class u1 extends Im{interpolate_(e,t,i,n){const r=super.interpolate_(e,t,i,n);return h1.fromArray(r).normalize().toArray(r),r}}const $i={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Nr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},op={9728:Ot,9729:Kt,9984:Kp,9985:$o,9986:Ta,9987:Hn},lp={33071:bn,33648:cl,10497:bs},Oc={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Qh={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},ls={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},d1={CUBICSPLINE:void 0,LINEAR:za,STEP:Ba},Uc={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function f1(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new js({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:$n})),s.DefaultMaterial}function Os(s,e,t){for(const i in t.extensions)s[i]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[i]=t.extensions[i])}function gn(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function p1(s,e,t){let i=!1,n=!1,r=!1;for(let c=0,h=e.length;c<h;c++){const d=e[c];if(d.POSITION!==void 0&&(i=!0),d.NORMAL!==void 0&&(n=!0),d.COLOR_0!==void 0&&(r=!0),i&&n&&r)break}if(!i&&!n&&!r)return Promise.resolve(s);const a=[],o=[],l=[];for(let c=0,h=e.length;c<h;c++){const d=e[c];if(i){const u=d.POSITION!==void 0?t.getDependency("accessor",d.POSITION):s.attributes.position;a.push(u)}if(n){const u=d.NORMAL!==void 0?t.getDependency("accessor",d.NORMAL):s.attributes.normal;o.push(u)}if(r){const u=d.COLOR_0!==void 0?t.getDependency("accessor",d.COLOR_0):s.attributes.color;l.push(u)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){const h=c[0],d=c[1],u=c[2];return i&&(s.morphAttributes.position=h),n&&(s.morphAttributes.normal=d),r&&(s.morphAttributes.color=u),s.morphTargetsRelative=!0,s})}function m1(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,i=e.weights.length;t<i;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let i=0,n=t.length;i<n;i++)s.morphTargetDictionary[t[i]]=i}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function g1(s){let e;const t=s.extensions&&s.extensions[je.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Fc(t.attributes):e=s.indices+":"+Fc(s.attributes)+":"+s.mode,s.targets!==void 0)for(let i=0,n=s.targets.length;i<n;i++)e+=":"+Fc(s.targets[i]);return e}function Fc(s){let e="";const t=Object.keys(s).sort();for(let i=0,n=t.length;i<n;i++)e+=t[i]+":"+s[t[i]]+";";return e}function eu(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function _1(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":s.search(/\.ktx2($|\?)/i)>0||s.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const v1=new He;class x1{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new HS,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let i=!1,n=-1,r=!1,a=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){const o=navigator.userAgent;i=/^((?!chrome|android).)*safari/i.test(o)===!0;const l=o.match(/Version\/(\d+)/);n=i&&l?parseInt(l[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||i&&n<17||r&&a<98?this.textureLoader=new wv(this.options.manager):this.textureLoader=new Iv(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new ym(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const i=this,n=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([i.getDependencies("scene"),i.getDependencies("animation"),i.getDependencies("camera")])}).then(function(a){const o={scene:a[0][n.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:n.asset,parser:i,userData:{}};return Os(r,o,n),gn(o,n),Promise.all(i._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){for(const l of o.scenes)l.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],i=this.json.meshes||[];for(let n=0,r=t.length;n<r;n++){const a=t[n].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let n=0,r=e.length;n<r;n++){const a=e[n];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(i[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,i){if(e.refs[t]<=1)return i;const n=i.clone(),r=(a,o)=>{const l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(const[c,h]of a.children.entries())r(h,o.children[c])};return r(i,n),n.name+="_instance_"+e.uses[t]++,n}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let i=0;i<t.length;i++){const n=e(t[i]);if(n)return n}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const i=[];for(let n=0;n<t.length;n++){const r=e(t[n]);r&&i.push(r)}return i}getDependency(e,t){const i=e+":"+t;let n=this.cache.get(i);if(!n){switch(e){case"scene":n=this.loadScene(t);break;case"node":n=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":n=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":n=this.loadAccessor(t);break;case"bufferView":n=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":n=this.loadBuffer(t);break;case"material":n=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":n=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":n=this.loadSkin(t);break;case"animation":n=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":n=this.loadCamera(t);break;default:if(n=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!n)throw new Error("Unknown type: "+e);break}this.cache.add(i,n)}return n}getDependencies(e){let t=this.cache.get(e);if(!t){const i=this,n=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(n.map(function(r,a){return i.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],i=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[je.KHR_BINARY_GLTF].body);const n=this.options;return new Promise(function(r,a){i.load(La.resolveURL(t.uri,n.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(i){const n=t.byteLength||0,r=t.byteOffset||0;return i.slice(r,r+n)})}loadAccessor(e){const t=this,i=this.json,n=this.json.accessors[e];if(n.bufferView===void 0&&n.sparse===void 0){const a=Oc[n.type],o=Nr[n.componentType],l=n.normalized===!0,c=new o(n.count*a);return Promise.resolve(new xi(c,a,l))}const r=[];return n.bufferView!==void 0?r.push(this.getDependency("bufferView",n.bufferView)):r.push(null),n.sparse!==void 0&&(r.push(this.getDependency("bufferView",n.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",n.sparse.values.bufferView))),Promise.all(r).then(function(a){const o=a[0],l=Oc[n.type],c=Nr[n.componentType],h=c.BYTES_PER_ELEMENT,d=h*l,u=n.byteOffset||0,f=n.bufferView!==void 0?i.bufferViews[n.bufferView].byteStride:void 0,p=n.normalized===!0;let g,m;if(f&&f!==d){const _=Math.floor(u/f),x="InterleavedBuffer:"+n.bufferView+":"+n.componentType+":"+_+":"+n.count;let E=t.cache.get(x);E||(g=new c(o,_*f,n.count*f/h),E=new $_(g,f/h),t.cache.add(x,E)),m=new Hu(E,l,u%f/h,p)}else o===null?g=new c(n.count*l):g=new c(o,u,n.count*l),m=new xi(g,l,p);if(n.sparse!==void 0){const _=Oc.SCALAR,x=Nr[n.sparse.indices.componentType],E=n.sparse.indices.byteOffset||0,y=n.sparse.values.byteOffset||0,M=new x(a[1],E,n.sparse.count*_),w=new c(a[2],y,n.sparse.count*l);o!==null&&(m=new xi(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let A=0,v=M.length;A<v;A++){const S=M[A];if(m.setX(S,w[A*l]),l>=2&&m.setY(S,w[A*l+1]),l>=3&&m.setZ(S,w[A*l+2]),l>=4&&m.setW(S,w[A*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=p}return m})}loadTexture(e){const t=this.json,i=this.options,r=t.textures[e].source,a=t.images[r];let o=this.textureLoader;if(a.uri){const l=i.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,i){const n=this,r=this.json,a=r.textures[e],o=r.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,i).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);const u=(r.samplers||{})[a.sampler]||{};return h.magFilter=op[u.magFilter]||Kt,h.minFilter=op[u.minFilter]||Hn,h.wrapS=lp[u.wrapS]||bs,h.wrapT=lp[u.wrapT]||bs,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==Ot&&h.minFilter!==Kt,n.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const i=this,n=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(d=>d.clone());const a=n.images[e],o=self.URL||self.webkitURL;let l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=i.getDependency("bufferView",a.bufferView).then(function(d){c=!0;const u=new Blob([d],{type:a.mimeType});return l=o.createObjectURL(u),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(l).then(function(d){return new Promise(function(u,f){let p=u;t.isImageBitmapLoader===!0&&(p=function(g){const m=new Zt(g);m.needsUpdate=!0,u(m)}),t.load(La.resolveURL(d,r.path),p,void 0,f)})}).then(function(d){return c===!0&&o.revokeObjectURL(l),gn(d,a),d.userData.mimeType=a.mimeType||_1(a.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),d});return this.sourceCache[e]=h,h}assignTexture(e,t,i,n){const r=this;return this.getDependency("texture",i.index).then(function(a){if(!a)return null;if(i.texCoord!==void 0&&i.texCoord>0&&(a=a.clone(),a.channel=i.texCoord),r.extensions[je.KHR_TEXTURE_TRANSFORM]){const o=i.extensions!==void 0?i.extensions[je.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const l=r.associations.get(a);a=r.extensions[je.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,l)}}return n!==void 0&&(a.colorSpace=n),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let i=e.material;const n=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+i.uuid;let l=this.cache.get(o);l||(l=new um,Qi.prototype.copy.call(l,i),l.color.copy(i.color),l.map=i.map,l.sizeAttenuation=!1,this.cache.add(o,l)),i=l}else if(e.isLine){const o="LineBasicMaterial:"+i.uuid;let l=this.cache.get(o);l||(l=new hm,Qi.prototype.copy.call(l,i),l.color.copy(i.color),l.map=i.map,this.cache.add(o,l)),i=l}if(n||r||a){let o="ClonedMaterial:"+i.uuid+":";n&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=i.clone(),r&&(l.vertexColors=!0),a&&(l.flatShading=!0),n&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(i))),i=l}e.material=i}getMaterialType(){return js}loadMaterial(e){const t=this,i=this.json,n=this.extensions,r=i.materials[e];let a;const o={},l=r.extensions||{},c=[];if(l[je.KHR_MATERIALS_UNLIT]){const d=n[je.KHR_MATERIALS_UNLIT];a=d.getMaterialType(),c.push(d.extendParams(o,r,t))}else{const d=r.pbrMetallicRoughness||{};if(o.color=new Le(1,1,1),o.opacity=1,Array.isArray(d.baseColorFactor)){const u=d.baseColorFactor;o.color.setRGB(u[0],u[1],u[2],yi),o.opacity=u[3]}d.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",d.baseColorTexture,Gt)),o.metalness=d.metallicFactor!==void 0?d.metallicFactor:1,o.roughness=d.roughnessFactor!==void 0?d.roughnessFactor:1,d.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",d.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",d.metallicRoughnessTexture))),a=this._invokeOne(function(u){return u.getMaterialType&&u.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(u){return u.extendMaterialParams&&u.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=rn);const h=r.alphaMode||Uc.OPAQUE;if(h===Uc.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===Uc.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==En&&(c.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new De(1,1),r.normalTexture.scale!==void 0)){const d=r.normalTexture.scale;o.normalScale.set(d,d)}if(r.occlusionTexture!==void 0&&a!==En&&(c.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==En){const d=r.emissiveFactor;o.emissive=new Le().setRGB(d[0],d[1],d[2],yi)}return r.emissiveTexture!==void 0&&a!==En&&c.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,Gt)),Promise.all(c).then(function(){const d=new a(o);return r.name&&(d.name=r.name),gn(d,r),t.associations.set(d,{materials:e}),r.extensions&&Os(n,d,r),d})}createUniqueName(e){const t=ut.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,i=this.extensions,n=this.primitiveCache;function r(o){return i[je.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return cp(l,o,t)})}const a=[];for(let o=0,l=e.length;o<l;o++){const c=e[o],h=g1(c),d=n[h];if(d)a.push(d.promise);else{let u;c.extensions&&c.extensions[je.KHR_DRACO_MESH_COMPRESSION]?u=r(c):u=cp(new mi,c,t),n[h]={primitive:c,promise:u},a.push(u)}}return Promise.all(a)}loadMesh(e){const t=this,i=this.json,n=this.extensions,r=i.meshes[e],a=r.primitives,o=[];for(let l=0,c=a.length;l<c;l++){const h=a[l].material===void 0?f1(this.cache):this.getDependency("material",a[l].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(l){const c=l.slice(0,l.length-1),h=l[l.length-1],d=[];for(let f=0,p=h.length;f<p;f++){const g=h[f],m=a[f];let _;const x=c[f];if(m.mode===$i.TRIANGLES||m.mode===$i.TRIANGLE_STRIP||m.mode===$i.TRIANGLE_FAN||m.mode===void 0)_=r.isSkinnedMesh===!0?new J_(g,x):new at(g,x),_.isSkinnedMesh===!0&&_.normalizeSkinWeights(),m.mode===$i.TRIANGLE_STRIP?_.geometry=np(_.geometry,nm):m.mode===$i.TRIANGLE_FAN&&(_.geometry=np(_.geometry,Wh));else if(m.mode===$i.LINES)_=new sv(g,x);else if(m.mode===$i.LINE_STRIP)_=new Yu(g,x);else if(m.mode===$i.LINE_LOOP)_=new rv(g,x);else if(m.mode===$i.POINTS)_=new dm(g,x);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(_.geometry.morphAttributes).length>0&&m1(_,r),_.name=t.createUniqueName(r.name||"mesh_"+e),gn(_,r),m.extensions&&Os(n,_,m),t.assignFinalMaterial(_),d.push(_)}for(let f=0,p=d.length;f<p;f++)t.associations.set(d[f],{meshes:e,primitives:f});if(d.length===1)return r.extensions&&Os(n,d[0],r),d[0];const u=new ki;r.extensions&&Os(n,u,r),t.associations.set(u,{meshes:e});for(let f=0,p=d.length;f<p;f++)u.add(d[f]);return u})}loadCamera(e){let t;const i=this.json.cameras[e],n=i[i.type];if(!n){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return i.type==="perspective"?t=new ui($e.radToDeg(n.yfov),n.aspectRatio||1,n.znear||1,n.zfar||2e6):i.type==="orthographic"&&(t=new to(-n.xmag,n.xmag,n.ymag,-n.ymag,n.znear,n.zfar)),i.name&&(t.name=this.createUniqueName(i.name)),gn(t,i),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],i=[];for(let n=0,r=t.joints.length;n<r;n++)i.push(this._loadNodeShallow(t.joints[n]));return t.inverseBindMatrices!==void 0?i.push(this.getDependency("accessor",t.inverseBindMatrices)):i.push(null),Promise.all(i).then(function(n){const r=n.pop(),a=n,o=[],l=[];for(let c=0,h=a.length;c<h;c++){const d=a[c];if(d){o.push(d);const u=new He;r!==null&&u.fromArray(r.array,c*16),l.push(u)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Gu(o,l)})}loadAnimation(e){const t=this.json,i=this,n=t.animations[e],r=n.name?n.name:"animation_"+e,a=[],o=[],l=[],c=[],h=[];for(let d=0,u=n.channels.length;d<u;d++){const f=n.channels[d],p=n.samplers[f.sampler],g=f.target,m=g.node,_=n.parameters!==void 0?n.parameters[p.input]:p.input,x=n.parameters!==void 0?n.parameters[p.output]:p.output;g.node!==void 0&&(a.push(this.getDependency("node",m)),o.push(this.getDependency("accessor",_)),l.push(this.getDependency("accessor",x)),c.push(p),h.push(g))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(d){const u=d[0],f=d[1],p=d[2],g=d[3],m=d[4],_=[];for(let E=0,y=u.length;E<y;E++){const M=u[E],w=f[E],A=p[E],v=g[E],S=m[E];if(M===void 0)continue;M.updateMatrix&&M.updateMatrix();const P=i._createAnimationTracks(M,w,A,v,S);if(P)for(let C=0;C<P.length;C++)_.push(P[C])}const x=new xv(r,void 0,_);return gn(x,n),x})}createNodeMesh(e){const t=this.json,i=this,n=t.nodes[e];return n.mesh===void 0?null:i.getDependency("mesh",n.mesh).then(function(r){const a=i._getNodeRef(i.meshCache,n.mesh,r);return n.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=n.weights.length;l<c;l++)o.morphTargetInfluences[l]=n.weights[l]}),a})}loadNode(e){const t=this.json,i=this,n=t.nodes[e],r=i._loadNodeShallow(e),a=[],o=n.children||[];for(let c=0,h=o.length;c<h;c++)a.push(i.getDependency("node",o[c]));const l=n.skin===void 0?Promise.resolve(null):i.getDependency("skin",n.skin);return Promise.all([r,Promise.all(a),l]).then(function(c){const h=c[0],d=c[1],u=c[2];u!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(u,v1)});for(let f=0,p=d.length;f<p;f++)h.add(d[f]);if(h.userData.pivot!==void 0&&d.length>0){const f=h.userData.pivot,p=d[0];h.pivot=new D().fromArray(f),h.position.x-=f[0],h.position.y-=f[1],h.position.z-=f[2],p.position.set(0,0,0),delete h.userData.pivot}return h})}_loadNodeShallow(e){const t=this.json,i=this.extensions,n=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],a=r.name?n.createUniqueName(r.name):"",o=[],l=n._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),r.camera!==void 0&&o.push(n.getDependency("camera",r.camera).then(function(c){return n._getNodeRef(n.cameraCache,r.camera,c)})),n._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let h;if(r.isBone===!0?h=new cm:c.length>1?h=new ki:c.length===1?h=c[0]:h=new bt,h!==c[0])for(let d=0,u=c.length;d<u;d++)h.add(c[d]);if(r.name&&(h.userData.name=r.name,h.name=a),gn(h,r),r.extensions&&Os(i,h,r),r.matrix!==void 0){const d=new He;d.fromArray(r.matrix),h.applyMatrix4(d)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);if(!n.associations.has(h))n.associations.set(h,{});else if(r.mesh!==void 0&&n.meshCache.refs[r.mesh]>1){const d=n.associations.get(h);n.associations.set(h,{...d})}return n.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,i=this.json.scenes[e],n=this,r=new ki;i.name&&(r.name=n.createUniqueName(i.name)),gn(r,i),i.extensions&&Os(t,r,i);const a=i.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(n.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let h=0,d=l.length;h<d;h++){const u=l[h];u.parent!==null?r.add(VS(u)):r.add(u)}const c=h=>{const d=new Map;for(const[u,f]of n.associations)(u instanceof Qi||u instanceof Zt)&&d.set(u,f);return h.traverse(u=>{const f=n.associations.get(u);f!=null&&d.set(u,f)}),d};return n.associations=c(r),r})}_createAnimationTracks(e,t,i,n,r){const a=[],o=e.name?e.name:e.uuid,l=[];ls[r.path]===ls.weights?e.traverse(function(u){u.morphTargetInfluences&&l.push(u.name?u.name:u.uuid)}):l.push(o);let c;switch(ls[r.path]){case ls.weights:c=jr;break;case ls.rotation:c=Kr;break;case ls.translation:case ls.scale:c=Zr;break;default:i.itemSize===1?c=jr:c=Zr;break}const h=n.interpolation!==void 0?d1[n.interpolation]:za,d=this._getArrayFromAccessor(i);for(let u=0,f=l.length;u<f;u++){const p=new c(l[u]+"."+ls[r.path],t.array,d,h);n.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(p),a.push(p)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const i=eu(t.constructor),n=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)n[r]=t[r]*i;t=n}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(i){const n=this instanceof Kr?u1:Im;return new n(this.times,this.values,this.getValueSize()/3,i)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function y1(s,e,t){const i=e.attributes,n=new Jn;if(i.POSITION!==void 0){const o=t.json.accessors[i.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(n.set(new D(l[0],l[1],l[2]),new D(c[0],c[1],c[2])),o.normalized){const h=eu(Nr[o.componentType]);n.min.multiplyScalar(h),n.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const o=new D,l=new D;for(let c=0,h=r.length;c<h;c++){const d=r[c];if(d.POSITION!==void 0){const u=t.json.accessors[d.POSITION],f=u.min,p=u.max;if(f!==void 0&&p!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(p[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(p[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(p[2]))),u.normalized){const g=eu(Nr[u.componentType]);l.multiplyScalar(g)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}n.expandByVector(o)}s.boundingBox=n;const a=new Pn;n.getCenter(a.center),a.radius=n.min.distanceTo(n.max)/2,s.boundingSphere=a}function cp(s,e,t){const i=e.attributes,n=[];function r(a,o){return t.getDependency("accessor",a).then(function(l){s.setAttribute(o,l)})}for(const a in i){const o=Qh[a]||a.toLowerCase();o in s.attributes||n.push(r(i[a],o))}if(e.indices!==void 0&&!s.index){const a=t.getDependency("accessor",e.indices).then(function(o){s.setIndex(o)});n.push(a)}return Ze.workingColorSpace!==yi&&"COLOR_0"in i&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ze.workingColorSpace}" not supported.`),gn(s,e),y1(s,e,t),Promise.all(n).then(function(){return e.targets!==void 0?p1(s,e.targets,t):s})}class M1 extends Vu{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;const e=new ra;e.deleteAttribute("uv");const t=new js({side:vi}),i=new js,n=new bm(16777215,900,28,2);n.position.set(.418,16.199,.3),this.add(n);const r=new at(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const a=new Wu(e,i,6),o=new bt;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);const l=new at(e,Mr(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);const c=new at(e,Mr(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);const h=new at(e,Mr(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);const d=new at(e,Mr(43));d.position.set(-.462,8.89,14.52),d.scale.set(4.38,5.441,.088),this.add(d);const u=new at(e,Mr(20));u.position.set(3.235,11.486,-12.541),u.scale.set(2.5,2,.1),this.add(u);const f=new at(e,Mr(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function Mr(s){return new uv({color:0,emissive:16777215,emissiveIntensity:s})}function Lm(s,e,t="baseline"){const i=t==="refined";s.toneMappingExposure=i?1:1.05;const n=new Kh(s),r=new M1;e.environment=n.fromScene(r,.04).texture,r.dispose(),n.dispose(),e.environmentIntensity=i?.52:.48,e.add(new Av("#fffaf5",i?"#b49b80":"#b4a18c",i?.5:.65));const a=new $h(i?"#fff4e5":"#fff7ed",i?1.7:1.4);a.position.set(...i?[-8,14,4]:[-6,14,-5]);const o=new $h("#ffffff",i?.3:.6);return o.position.set(7,8,-10),e.add(a,o),a}const tl={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Qs{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const b1=new to(-1,1,1,-1,0,1);class S1 extends mi{constructor(){super(),this.setAttribute("position",new zt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new zt([0,2,0,0,2,0],2))}}const E1=new S1;class kl{constructor(e){this._mesh=new at(E1,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,b1)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class T1 extends Qs{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof ii?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=ps.clone(e.uniforms),this.material=new ii({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new kl(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class hp extends Qs{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){const n=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(n.REPLACE,n.REPLACE,n.REPLACE),r.buffers.stencil.setFunc(n.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(n.EQUAL,1,4294967295),r.buffers.stencil.setOp(n.KEEP,n.KEEP,n.KEEP),r.buffers.stencil.setLocked(!0)}}class w1 extends Qs{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class A1{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const i=e.getSize(new De);this._width=i.width,this._height=i.height,t=new Ei(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Gi}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new T1(tl),this.copyPass.material.blending=ai,this.timer=new Ov}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());const t=this.renderer.getRenderTarget();let i=!1;for(let n=0,r=this.passes.length;n<r;n++){const a=this.passes[n];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(n),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),a.needsSwap){if(i){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}hp!==void 0&&(a instanceof hp?i=!0:a instanceof w1&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new De);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const i=this._width*this._pixelRatio,n=this._height*this._pixelRatio;this.renderTarget1.setSize(i,n),this.renderTarget2.setSize(i,n);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,n)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class C1 extends Qs{constructor(e,t,i=null,n=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=n,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Le}render(e,t,i){const n=e.autoClear;e.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=n}}class R1{constructor(e=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let t=0;t<256;t++)this.p[t]=Math.floor(e.random()*256);this.perm=[];for(let t=0;t<512;t++)this.perm[t]=this.p[t&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}noise(e,t){let i,n,r;const a=.5*(Math.sqrt(3)-1),o=(e+t)*a,l=Math.floor(e+o),c=Math.floor(t+o),h=(3-Math.sqrt(3))/6,d=(l+c)*h,u=l-d,f=c-d,p=e-u,g=t-f;let m,_;p>g?(m=1,_=0):(m=0,_=1);const x=p-m+h,E=g-_+h,y=p-1+2*h,M=g-1+2*h,w=l&255,A=c&255,v=this.perm[w+this.perm[A]]%12,S=this.perm[w+m+this.perm[A+_]]%12,P=this.perm[w+1+this.perm[A+1]]%12;let C=.5-p*p-g*g;C<0?i=0:(C*=C,i=C*C*this._dot(this.grad3[v],p,g));let N=.5-x*x-E*E;N<0?n=0:(N*=N,n=N*N*this._dot(this.grad3[S],x,E));let O=.5-y*y-M*M;return O<0?r=0:(O*=O,r=O*O*this._dot(this.grad3[P],y,M)),70*(i+n+r)}noise3d(e,t,i){let n,r,a,o;const c=(e+t+i)*.3333333333333333,h=Math.floor(e+c),d=Math.floor(t+c),u=Math.floor(i+c),f=1/6,p=(h+d+u)*f,g=h-p,m=d-p,_=u-p,x=e-g,E=t-m,y=i-_;let M,w,A,v,S,P;x>=E?E>=y?(M=1,w=0,A=0,v=1,S=1,P=0):x>=y?(M=1,w=0,A=0,v=1,S=0,P=1):(M=0,w=0,A=1,v=1,S=0,P=1):E<y?(M=0,w=0,A=1,v=0,S=1,P=1):x<y?(M=0,w=1,A=0,v=0,S=1,P=1):(M=0,w=1,A=0,v=1,S=1,P=0);const C=x-M+f,N=E-w+f,O=y-A+f,V=x-v+2*f,B=E-S+2*f,F=y-P+2*f,L=x-1+3*f,K=E-1+3*f,q=y-1+3*f,ie=h&255,ue=d&255,ne=u&255,Z=this.perm[ie+this.perm[ue+this.perm[ne]]]%12,ae=this.perm[ie+M+this.perm[ue+w+this.perm[ne+A]]]%12,ve=this.perm[ie+v+this.perm[ue+S+this.perm[ne+P]]]%12,W=this.perm[ie+1+this.perm[ue+1+this.perm[ne+1]]]%12;let J=.6-x*x-E*E-y*y;J<0?n=0:(J*=J,n=J*J*this._dot3(this.grad3[Z],x,E,y));let ee=.6-C*C-N*N-O*O;ee<0?r=0:(ee*=ee,r=ee*ee*this._dot3(this.grad3[ae],C,N,O));let Ce=.6-V*V-B*B-F*F;Ce<0?a=0:(Ce*=Ce,a=Ce*Ce*this._dot3(this.grad3[ve],V,B,F));let xe=.6-L*L-K*K-q*q;return xe<0?o=0:(xe*=xe,o=xe*xe*this._dot3(this.grad3[W],L,K,q)),32*(n+r+a+o)}noise4d(e,t,i,n){const r=this.grad4,a=this.simplex,o=this.perm,l=(Math.sqrt(5)-1)/4,c=(5-Math.sqrt(5))/20;let h,d,u,f,p;const g=(e+t+i+n)*l,m=Math.floor(e+g),_=Math.floor(t+g),x=Math.floor(i+g),E=Math.floor(n+g),y=(m+_+x+E)*c,M=m-y,w=_-y,A=x-y,v=E-y,S=e-M,P=t-w,C=i-A,N=n-v,O=S>P?32:0,V=S>C?16:0,B=P>C?8:0,F=S>N?4:0,L=P>N?2:0,K=C>N?1:0,q=O+V+B+F+L+K,ie=a[q][0]>=3?1:0,ue=a[q][1]>=3?1:0,ne=a[q][2]>=3?1:0,Z=a[q][3]>=3?1:0,ae=a[q][0]>=2?1:0,ve=a[q][1]>=2?1:0,W=a[q][2]>=2?1:0,J=a[q][3]>=2?1:0,ee=a[q][0]>=1?1:0,Ce=a[q][1]>=1?1:0,xe=a[q][2]>=1?1:0,Fe=a[q][3]>=1?1:0,Ut=S-ie+c,Ke=P-ue+c,tt=C-ne+c,rt=N-Z+c,Ve=S-ae+2*c,St=P-ve+2*c,I=C-W+2*c,wt=N-J+2*c,Qe=S-ee+3*c,ot=P-Ce+3*c,Me=C-xe+3*c,R=N-Fe+3*c,b=S-1+4*c,k=P-1+4*c,j=C-1+4*c,Q=N-1+4*c,Y=m&255,ge=_&255,oe=x&255,Te=E&255,Oe=o[Y+o[ge+o[oe+o[Te]]]]%32,te=o[Y+ie+o[ge+ue+o[oe+ne+o[Te+Z]]]]%32,le=o[Y+ae+o[ge+ve+o[oe+W+o[Te+J]]]]%32,be=o[Y+ee+o[ge+Ce+o[oe+xe+o[Te+Fe]]]]%32,Se=o[Y+1+o[ge+1+o[oe+1+o[Te+1]]]]%32;let fe=.6-S*S-P*P-C*C-N*N;fe<0?h=0:(fe*=fe,h=fe*fe*this._dot4(r[Oe],S,P,C,N));let Be=.6-Ut*Ut-Ke*Ke-tt*tt-rt*rt;Be<0?d=0:(Be*=Be,d=Be*Be*this._dot4(r[te],Ut,Ke,tt,rt));let U=.6-Ve*Ve-St*St-I*I-wt*wt;U<0?u=0:(U*=U,u=U*U*this._dot4(r[le],Ve,St,I,wt));let ce=.6-Qe*Qe-ot*ot-Me*Me-R*R;ce<0?f=0:(ce*=ce,f=ce*ce*this._dot4(r[be],Qe,ot,Me,R));let se=.6-b*b-k*k-j*j-Q*Q;return se<0?p=0:(se*=se,p=se*se*this._dot4(r[Se],b,k,j,Q)),27*(h+d+u+f+p)}_dot(e,t,i){return e[0]*t+e[1]*i}_dot3(e,t,i,n){return e[0]*t+e[1]*i+e[2]*n}_dot4(e,t,i,n,r){return e[0]*t+e[1]*i+e[2]*n+e[3]*r}}const Uo={defines:{PERSPECTIVE_CAMERA:1,KERNEL_SIZE:32},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},kernel:{value:null},cameraNear:{value:null},cameraFar:{value:null},resolution:{value:new De},cameraProjectionMatrix:{value:new He},cameraInverseProjectionMatrix:{value:new He},kernelRadius:{value:8},minDistance:{value:.005},maxDistance:{value:.05}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
		uniform highp sampler2D tNormal;
		uniform highp sampler2D tDepth;
		uniform sampler2D tNoise;

		uniform vec3 kernel[ KERNEL_SIZE ];

		uniform vec2 resolution;

		uniform float cameraNear;
		uniform float cameraFar;
		uniform mat4 cameraProjectionMatrix;
		uniform mat4 cameraInverseProjectionMatrix;

		uniform float kernelRadius;
		uniform float minDistance; // avoid artifacts caused by neighbour fragments with minimal depth difference
		uniform float maxDistance; // avoid the influence of fragments which are too far away

		varying vec2 vUv;

		#include <packing>

		#ifdef USE_REVERSED_DEPTH_BUFFER

			const float depthThreshold = 0.0;

		#else

			const float depthThreshold = 1.0;

		#endif

		float getDepth( const in vec2 screenPosition ) {

			return texture2D( tDepth, screenPosition ).x;

		}

		float getLinearDepth( const in vec2 screenPosition ) {

			#if PERSPECTIVE_CAMERA == 1

				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );

			#else

				return texture2D( tDepth, screenPosition ).x;

			#endif

		}

		float getViewZ( const in float depth ) {

			#if PERSPECTIVE_CAMERA == 1

				return perspectiveDepthToViewZ( depth, cameraNear, cameraFar );

			#else

				return orthographicDepthToViewZ( depth, cameraNear, cameraFar );

			#endif

		}

		vec3 getViewPosition( const in vec2 screenPosition, const in float depth, const in float viewZ ) {

			float clipW = cameraProjectionMatrix[2][3] * viewZ + cameraProjectionMatrix[3][3];

			vec4 clipPosition = vec4( ( vec3( screenPosition, depth ) - 0.5 ) * 2.0, 1.0 );

			clipPosition *= clipW; // unprojection.

			return ( cameraInverseProjectionMatrix * clipPosition ).xyz;

		}

		vec3 getViewNormal( const in vec2 screenPosition ) {

			return unpackRGBToNormal( texture2D( tNormal, screenPosition ).xyz );

		}

		void main() {

			float depth = getDepth( vUv );

			if ( depth == depthThreshold ) {

				gl_FragColor = vec4( 1.0 ); // don't influence background

			} else {

				float viewZ = getViewZ( depth );

				vec3 viewPosition = getViewPosition( vUv, depth, viewZ );
				vec3 viewNormal = getViewNormal( vUv );

				vec2 noiseScale = vec2( resolution.x / 4.0, resolution.y / 4.0 );
				vec3 random = vec3( texture2D( tNoise, vUv * noiseScale ).r );

				// compute matrix used to reorient a kernel vector

				vec3 tangent = normalize( random - viewNormal * dot( random, viewNormal ) );
				vec3 bitangent = cross( viewNormal, tangent );
				mat3 kernelMatrix = mat3( tangent, bitangent, viewNormal );

				float occlusion = 0.0;

				for ( int i = 0; i < KERNEL_SIZE; i ++ ) {

					vec3 sampleVector = kernelMatrix * kernel[ i ]; // reorient sample vector in view space
					vec3 samplePoint = viewPosition + ( sampleVector * kernelRadius ); // calculate sample point

					vec4 samplePointNDC = cameraProjectionMatrix * vec4( samplePoint, 1.0 ); // project point and calculate NDC
					samplePointNDC /= samplePointNDC.w;

					vec2 samplePointUv = samplePointNDC.xy * 0.5 + 0.5; // compute uv coordinates

					float realDepth = getLinearDepth( samplePointUv ); // get linear depth from depth texture
					float sampleDepth = viewZToOrthographicDepth( samplePoint.z, cameraNear, cameraFar ); // compute linear depth of the sample view Z value
					float delta = sampleDepth - realDepth;

					if ( delta > minDistance && delta < maxDistance ) { // if fragment is before sample point, increase occlusion

						occlusion += 1.0;

					}

				}

				occlusion = clamp( occlusion / float( KERNEL_SIZE ), 0.0, 1.0 );

				gl_FragColor = vec4( vec3( 1.0 - occlusion ), 1.0 );

			}

		}`},Fo={defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`uniform sampler2D tDepth;

		uniform float cameraNear;
		uniform float cameraFar;

		varying vec2 vUv;

		#include <packing>

		float getLinearDepth( const in vec2 screenPosition ) {

			#if PERSPECTIVE_CAMERA == 1

				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );

			#else

				return texture2D( tDepth, screenPosition ).x;

			#endif

		}

		void main() {

			float depth = getLinearDepth( vUv );
			gl_FragColor = vec4( vec3( 1.0 - depth ), 1.0 );

		}`},ko={uniforms:{tDiffuse:{value:null},resolution:{value:new De}},vertexShader:`varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`uniform sampler2D tDiffuse;

		uniform vec2 resolution;

		varying vec2 vUv;

		void main() {

			vec2 texelSize = ( 1.0 / resolution );
			float result = 0.0;

			for ( int i = - 2; i <= 2; i ++ ) {

				for ( int j = - 2; j <= 2; j ++ ) {

					vec2 offset = ( vec2( float( i ), float( j ) ) ) * texelSize;
					result += texture2D( tDiffuse, vUv + offset ).r;

				}

			}

			gl_FragColor = vec4( vec3( result / ( 5.0 * 5.0 ) ), 1.0 );

		}`};class ds extends Qs{constructor(e,t,i=512,n=512,r=32){super(),this.width=i,this.height=n,this.clear=!0,this.needsSwap=!1,this.camera=t,this.scene=e,this.kernelRadius=8,this.kernel=[],this.noiseTexture=null,this.output=0,this.minDistance=.005,this.maxDistance=.1,this._visibilityCache=[],this._generateSampleKernel(r),this._generateRandomKernelRotations();const a=new qr;a.format=fs,a.type=Wr,this.normalRenderTarget=new Ei(this.width,this.height,{minFilter:Ot,magFilter:Ot,type:Gi,depthTexture:a}),this.ssaoRenderTarget=new Ei(this.width,this.height,{type:Gi}),this.blurRenderTarget=this.ssaoRenderTarget.clone(),this.ssaoMaterial=new ii({defines:Object.assign({},Uo.defines),uniforms:ps.clone(Uo.uniforms),vertexShader:Uo.vertexShader,fragmentShader:Uo.fragmentShader,blending:ai}),this.ssaoMaterial.defines.KERNEL_SIZE=r,this.ssaoMaterial.uniforms.tNormal.value=this.normalRenderTarget.texture,this.ssaoMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture,this.ssaoMaterial.uniforms.tNoise.value=this.noiseTexture,this.ssaoMaterial.uniforms.kernel.value=this.kernel,this.ssaoMaterial.uniforms.cameraNear.value=this.camera.near,this.ssaoMaterial.uniforms.cameraFar.value=this.camera.far,this.ssaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.ssaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.ssaoMaterial.uniforms.cameraInverseProjectionMatrix.value.copy(this.camera.projectionMatrixInverse),this.normalMaterial=new hv,this.normalMaterial.blending=ai,this.blurMaterial=new ii({defines:Object.assign({},ko.defines),uniforms:ps.clone(ko.uniforms),vertexShader:ko.vertexShader,fragmentShader:ko.fragmentShader}),this.blurMaterial.uniforms.tDiffuse.value=this.ssaoRenderTarget.texture,this.blurMaterial.uniforms.resolution.value.set(this.width,this.height),this.depthRenderMaterial=new ii({defines:Object.assign({},Fo.defines),uniforms:ps.clone(Fo.uniforms),vertexShader:Fo.vertexShader,fragmentShader:Fo.fragmentShader,blending:ai}),this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture,this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new ii({uniforms:ps.clone(tl.uniforms),vertexShader:tl.vertexShader,fragmentShader:tl.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:$p,blendDst:ih,blendEquation:Vn,blendSrcAlpha:qp,blendDstAlpha:ih,blendEquationAlpha:Vn}),this._fsQuad=new kl(null),this._originalClearColor=new Le}dispose(){this.normalRenderTarget.dispose(),this.ssaoRenderTarget.dispose(),this.blurRenderTarget.dispose(),this.normalMaterial.dispose(),this.blurMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this._fsQuad.dispose()}render(e,t,i){switch(this._overrideVisibility(),this._renderOverride(e,this.normalMaterial,this.normalRenderTarget,7829503,1),this._restoreVisibility(),this.ssaoMaterial.uniforms.kernelRadius.value=this.kernelRadius,this.ssaoMaterial.uniforms.minDistance.value=this.minDistance,this.ssaoMaterial.uniforms.maxDistance.value=this.maxDistance,this._renderPass(e,this.ssaoMaterial,this.ssaoRenderTarget),this._renderPass(e,this.blurMaterial,this.blurRenderTarget),this.output){case ds.OUTPUT.SSAO:this.copyMaterial.uniforms.tDiffuse.value=this.ssaoRenderTarget.texture,this.copyMaterial.blending=ai,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:i);break;case ds.OUTPUT.Blur:this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget.texture,this.copyMaterial.blending=ai,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:i);break;case ds.OUTPUT.Depth:this._renderPass(e,this.depthRenderMaterial,this.renderToScreen?null:i);break;case ds.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=ai,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:i);break;case ds.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=this.blurRenderTarget.texture,this.copyMaterial.blending=Yp,this._renderPass(e,this.copyMaterial,this.renderToScreen?null:i);break;default:console.warn("THREE.SSAOPass: Unknown output type.")}}setSize(e,t){this.width=e,this.height=t,this.ssaoRenderTarget.setSize(e,t),this.normalRenderTarget.setSize(e,t),this.blurRenderTarget.setSize(e,t),this.ssaoMaterial.uniforms.resolution.value.set(e,t),this.ssaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.ssaoMaterial.uniforms.cameraInverseProjectionMatrix.value.copy(this.camera.projectionMatrixInverse),this.blurMaterial.uniforms.resolution.value.set(e,t)}_renderPass(e,t,i,n,r){e.getClearColor(this._originalClearColor);const a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(i),e.autoClear=!1,n!=null&&(e.setClearColor(n),e.setClearAlpha(r||0),e.clear()),this._fsQuad.material=t,this._fsQuad.render(e),e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_renderOverride(e,t,i,n,r){e.getClearColor(this._originalClearColor);const a=e.getClearAlpha(),o=e.autoClear;e.setRenderTarget(i),e.autoClear=!1,n=t.clearColor||n,r=t.clearAlpha||r,n!=null&&(e.setClearColor(n),e.setClearAlpha(r||0),e.clear()),this.scene.overrideMaterial=t,e.render(this.scene,this.camera),this.scene.overrideMaterial=null,e.autoClear=o,e.setClearColor(this._originalClearColor),e.setClearAlpha(a)}_generateSampleKernel(e){const t=this.kernel;for(let i=0;i<e;i++){const n=new D;n.x=Math.random()*2-1,n.y=Math.random()*2-1,n.z=Math.random(),n.normalize();let r=i/e;r=$e.lerp(.1,1,r*r),n.multiplyScalar(r),t.push(n)}}_generateRandomKernelRotations(){const i=new R1,n=16,r=new Float32Array(n);for(let a=0;a<n;a++){const o=Math.random()*2-1,l=Math.random()*2-1,c=0;r[a]=i.noise3d(o,l,c)}this.noiseTexture=new Nl(r,4,4,Dl,Fi),this.noiseTexture.wrapS=bs,this.noiseTexture.wrapT=bs,this.noiseTexture.needsUpdate=!0}_overrideVisibility(){const e=this.scene,t=this._visibilityCache;e.traverse(function(i){(i.isPoints||i.isLine||i.isLine2)&&i.visible&&(i.visible=!1,t.push(i))})}_restoreVisibility(){const e=this._visibilityCache;for(let t=0;t<e.length;t++)e[t].visible=!0;e.length=0}}ds.OUTPUT={Default:0,SSAO:1,Blur:2,Depth:3,Normal:4};const Bo={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class P1 extends Qs{constructor(){super(),this.isOutputPass=!0,this.uniforms=ps.clone(Bo.uniforms),this.material=new gm({name:Bo.name,uniforms:this.uniforms,vertexShader:Bo.vertexShader,fragmentShader:Bo.fragmentShader}),this._fsQuad=new kl(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Ze.getTransfer(this._outputColorSpace)===lt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Eu?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Tu?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===wu?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===eo?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Cu?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Ru?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Au&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}const zo={defines:{DEPTH_PACKING:1,PERSPECTIVE_CAMERA:1},uniforms:{tColor:{value:null},tDepth:{value:null},focus:{value:1},aspect:{value:1},aperture:{value:.025},maxblur:{value:.01},nearClip:{value:1},farClip:{value:1e3}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		#include <common>

		varying vec2 vUv;

		uniform sampler2D tColor;
		uniform sampler2D tDepth;

		uniform float maxblur; // max blur amount
		uniform float aperture; // aperture - bigger values for shallower depth of field

		uniform float nearClip;
		uniform float farClip;

		uniform float focus;
		uniform float aspect;

		#include <packing>

		float getDepth( const in vec2 screenPosition ) {
			#if DEPTH_PACKING == 1
			return unpackRGBAToDepth( texture2D( tDepth, screenPosition ) );
			#else
			return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		float getViewZ( const in float depth ) {
			#if PERSPECTIVE_CAMERA == 1
			return perspectiveDepthToViewZ( depth, nearClip, farClip );
			#else
			return orthographicDepthToViewZ( depth, nearClip, farClip );
			#endif
		}


		void main() {

			vec2 aspectcorrect = vec2( 1.0, aspect );

			float viewZ = getViewZ( getDepth( vUv ) );

			float factor = ( focus + viewZ ); // viewZ is <= 0, so this is a difference equation

			vec2 dofblur = vec2 ( clamp( factor * aperture, -maxblur, maxblur ) );

			vec2 dofblur9 = dofblur * 0.9;
			vec2 dofblur7 = dofblur * 0.7;
			vec2 dofblur4 = dofblur * 0.4;

			vec4 col = vec4( 0.0 );

			col += texture2D( tColor, vUv.xy );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15,  0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37,  0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.40,  0.0  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37, -0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15, -0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15,  0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37,  0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37, -0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15, -0.37 ) * aspectcorrect ) * dofblur );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.15,  0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37,  0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37, -0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15, -0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15,  0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37,  0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37, -0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15, -0.37 ) * aspectcorrect ) * dofblur9 );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.40,  0.0  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur7 );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.4,   0.0  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur4 );

			gl_FragColor = col / 41.0;
			gl_FragColor.a = 1.0;

		}`};class D1 extends Qs{constructor(e,t,i){super(),this.scene=e,this.camera=t;const n=i.focus!==void 0?i.focus:1,r=i.aperture!==void 0?i.aperture:.025,a=i.maxblur!==void 0?i.maxblur:1;this._renderTargetDepth=new Ei(1,1,{minFilter:Ot,magFilter:Ot,type:Gi}),this._renderTargetDepth.texture.name="BokehPass.depth",this._materialDepth=new _m,this._materialDepth.depthPacking=i_,this._materialDepth.blending=ai;const o=ps.clone(zo.uniforms);o.tDepth.value=this._renderTargetDepth.texture,o.focus.value=n,o.aspect.value=t.aspect,o.aperture.value=r,o.maxblur.value=a,o.nearClip.value=t.near,o.farClip.value=t.far,this.materialBokeh=new ii({defines:Object.assign({},zo.defines),uniforms:o,vertexShader:zo.vertexShader,fragmentShader:zo.fragmentShader}),this.uniforms=o,this._fsQuad=new kl(this.materialBokeh),this._oldClearColor=new Le}render(e,t,i){this.scene.overrideMaterial=this._materialDepth,e.getClearColor(this._oldClearColor);const n=e.getClearAlpha(),r=e.autoClear;e.autoClear=!1,e.setClearColor(16777215),e.setClearAlpha(1),e.setRenderTarget(this._renderTargetDepth),e.clear(),e.render(this.scene,this.camera),this.uniforms.tColor.value=i.texture,this.uniforms.nearClip.value=this.camera.near,this.uniforms.farClip.value=this.camera.far,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),e.clear(),this._fsQuad.render(e)),this.scene.overrideMaterial=null,e.setClearColor(this._oldClearColor),e.setClearAlpha(n),e.autoClear=r}setSize(e,t){this.materialBokeh.uniforms.aspect.value=e/t,this._renderTargetDepth.setSize(e,t)}dispose(){this._renderTargetDepth.dispose(),this._materialDepth.dispose(),this.materialBokeh.dispose(),this._fsQuad.dispose()}}class I1{palettes=new Map;register(e,t,i){this.palettes.set(e,{high:t,low:i})}prepare(e){for(const t of e.children){const i=t,n=i.userData.surface,r=this.palettes.get(n);if(!r)continue;const a=r.high.clone(),o={value:0};i.material=a,i.userData.appearance=o,a.onBeforeCompile=l=>{l.uniforms.archiveQuality=o,l.fragmentShader=`uniform float archiveQuality;
`+l.fragmentShader,n==="Frosted_Polymer"?(l.vertexShader=`varying float vArchiveHeight;
`+l.vertexShader,l.vertexShader=l.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vArchiveHeight = position.y / 3.7;`),l.fragmentShader=`varying float vArchiveHeight;
`+l.fragmentShader,l.fragmentShader=l.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
diffuseColor.rgb *= mix(mix(vec3(0.40, 0.30, 0.20), vec3(1.0, 0.98, 0.94), smoothstep(0.1, 1.0, vArchiveHeight)), vec3(1.0), archiveQuality);`),l.fragmentShader=l.fragmentShader.replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>
roughnessFactor = mix(0.28, mix(0.48, 0.035, smoothstep(0.36, 0.68, vArchiveHeight)), archiveQuality);`)):r.low||(l.fragmentShader=l.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
float coverage = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))));
if (archiveQuality <= coverage) discard;`))},a.customProgramCacheKey=()=>`archive-surface-${n}-${!!r.low}`}}apply(e,t){for(const i of e.children){const n=i,r=this.palettes.get(n.userData.surface);if(!r){n.material.opacity=t;continue}n.userData.appearance.value=t;const{high:a,low:o}=r;if(!o)continue;const l=n.material;l.color.copy(o.color).lerp(a.color,t),l.attenuationColor&&o.attenuationColor&&a.attenuationColor&&(l.attenuationColor.copy(o.attenuationColor).lerp(a.attenuationColor,t),l.attenuationDistance=Number.isFinite(o.attenuationDistance)&&Number.isFinite(a.attenuationDistance)?$e.lerp(o.attenuationDistance,a.attenuationDistance,t):a.attenuationDistance);for(const c of["roughness","metalness","transmission","thickness","clearcoat","clearcoatRoughness"])l[c]=$e.lerp(o[c]??0,a[c]??0,t);a.transmission>0&&(l.transmission=Math.max(1e-6,l.transmission))}}dispose(e){for(const t of e.children){const i=t,n=i.material;i.userData.surface||n.map?.dispose(),n.dispose()}}}const Pt=new ji,Vo=new D,up=new De,dp=new De,fp=new De;class L1{constructor(e){this.geometry=e.geometry,this.randomFunction=Math.random,this.indexAttribute=this.geometry.index,this.positionAttribute=this.geometry.getAttribute("position"),this.normalAttribute=this.geometry.getAttribute("normal"),this.colorAttribute=this.geometry.getAttribute("color"),this.uvAttribute=this.geometry.getAttribute("uv"),this.weightAttribute=null,this.distribution=null}setWeightAttribute(e){return this.weightAttribute=e?this.geometry.getAttribute(e):null,this}build(){const e=this.indexAttribute,t=this.positionAttribute,i=this.weightAttribute,n=e?e.count/3:t.count/3,r=new Float32Array(n);for(let l=0;l<n;l++){let c=1,h=3*l,d=3*l+1,u=3*l+2;e&&(h=e.getX(h),d=e.getX(d),u=e.getX(u)),i&&(c=i.getX(h)+i.getX(d)+i.getX(u)),Pt.a.fromBufferAttribute(t,h),Pt.b.fromBufferAttribute(t,d),Pt.c.fromBufferAttribute(t,u),c*=Pt.getArea(),r[l]=c}const a=new Float32Array(n);let o=0;for(let l=0;l<n;l++)o+=r[l],a[l]=o;return this.distribution=a,this}setRandomGenerator(e){return this.randomFunction=e,this}sample(e,t,i,n){const r=this._sampleFaceIndex();return this._sampleFace(r,e,t,i,n)}_sampleFaceIndex(){const e=this.distribution[this.distribution.length-1];return this._binarySearch(this.randomFunction()*e)}_binarySearch(e){const t=this.distribution;let i=0,n=t.length-1,r=-1;for(;i<=n;){const a=Math.ceil((i+n)/2);if(a===0||t[a-1]<=e&&t[a]>e){r=a;break}else e<t[a]?n=a-1:i=a+1}return r}_sampleFace(e,t,i,n,r){let a=this.randomFunction(),o=this.randomFunction();a+o>1&&(a=1-a,o=1-o);const l=this.indexAttribute;let c=e*3,h=e*3+1,d=e*3+2;return l&&(c=l.getX(c),h=l.getX(h),d=l.getX(d)),Pt.a.fromBufferAttribute(this.positionAttribute,c),Pt.b.fromBufferAttribute(this.positionAttribute,h),Pt.c.fromBufferAttribute(this.positionAttribute,d),t.set(0,0,0).addScaledVector(Pt.a,a).addScaledVector(Pt.b,o).addScaledVector(Pt.c,1-(a+o)),i!==void 0&&(this.normalAttribute!==void 0?(Pt.a.fromBufferAttribute(this.normalAttribute,c),Pt.b.fromBufferAttribute(this.normalAttribute,h),Pt.c.fromBufferAttribute(this.normalAttribute,d),i.set(0,0,0).addScaledVector(Pt.a,a).addScaledVector(Pt.b,o).addScaledVector(Pt.c,1-(a+o)).normalize()):Pt.getNormal(i)),n!==void 0&&this.colorAttribute!==void 0&&(Pt.a.fromBufferAttribute(this.colorAttribute,c),Pt.b.fromBufferAttribute(this.colorAttribute,h),Pt.c.fromBufferAttribute(this.colorAttribute,d),Vo.set(0,0,0).addScaledVector(Pt.a,a).addScaledVector(Pt.b,o).addScaledVector(Pt.c,1-(a+o)),n.r=Vo.x,n.g=Vo.y,n.b=Vo.z),r!==void 0&&this.uvAttribute!==void 0&&(up.fromBufferAttribute(this.uvAttribute,c),dp.fromBufferAttribute(this.uvAttribute,h),fp.fromBufferAttribute(this.uvAttribute,d),r.set(0,0).addScaledVector(up,a).addScaledVector(dp,o).addScaledVector(fp,1-(a+o))),this}}const Nm=$e.clamp,kc=s=>(s=Nm(s,0,1),s*s*(3-2*s)),Ho=3.8,pp=12;class N1{root=new ki;original=[];amount={value:0};particleUniforms={uScatter:{value:0},uTime:{value:0},uPixelRatio:{value:1}};particles;disc=new ki;spindle=new ki;texture;label=document.createElement("canvas");elapsed=0;last=null;active=!1;paused=!1;suspended=!1;record="";reduced=!1;rotation=0;constructor(e,t){this.original=e.children.filter(p=>p instanceof at);for(const p of this.original){const g=p.material,m=g.onBeforeCompile,_=g.customProgramCacheKey();g.onBeforeCompile=(x,E)=>{m.call(g,x,E),x.uniforms.memoryDissolve=this.amount,x.vertexShader=`varying vec3 vMemoryPosition;
`+x.vertexShader,x.vertexShader=x.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vMemoryPosition=position;`),x.fragmentShader=`uniform float memoryDissolve;
varying vec3 vMemoryPosition;
`+x.fragmentShader,x.fragmentShader=x.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
          float dust=fract(sin(dot(floor(vMemoryPosition*56.0),vec3(12.9898,78.233,39.425)))*43758.5453);
          float front=0.52*clamp(vMemoryPosition.y/3.8,0.0,1.0)+0.48*dust;
          if(memoryDissolve>0.0001 && front<memoryDissolve) discard;
          if(memoryDissolve>0.001) diffuseColor.rgb=mix(diffuseColor.rgb,vec3(1.0,0.72,0.38),0.24*(1.0-smoothstep(0.0,0.055,front-memoryDissolve)));`)},g.customProgramCacheKey=()=>_+"-memory-dust-v1",g.needsUpdate=!0}const i=[],n=[],r=[];let a=7151;const o=()=>(a=Math.imul(a,1664525)+1013904223>>>0,a/4294967296),l=this.original.filter(p=>["Frosted_Polymer","Ivory_Edges","Optical_Diffuser","Printed_Label"].includes(p.userData.surface)),c=new D,h=new D;for(const p of l){const g=new L1(p);g.setRandomGenerator(o).build();const m=p.userData.surface==="Frosted_Polymer"?2800:450;for(let _=0;_<m;_++)g.sample(c,h),i.push(c.x,c.y,c.z),n.push(h.x,h.y,h.z),r.push(o())}const d=new mi;d.setAttribute("position",new zt(i,3)),d.setAttribute("aNormal",new zt(n,3)),d.setAttribute("aSeed",new zt(r,1));const u=new ii({uniforms:this.particleUniforms,transparent:!0,depthWrite:!1,vertexShader:`attribute vec3 aNormal;attribute float aSeed;uniform float uScatter;uniform float uTime;uniform float uPixelRatio;varying float vAlpha;varying float vSeed;
        void main(){float delay=0.32*position.y/3.8+0.2*aSeed;float travel=smoothstep(delay,1.0,uScatter);vec3 curl=vec3(sin(aSeed*93.0+uTime*.6),cos(aSeed*59.0+uTime*.5),sin(aSeed*37.0));vec3 p=position+(aNormal*.55+curl*.75+vec3(-.25,.65,.45))*travel*(.5+aSeed*2.7);vec4 mv=modelViewMatrix*vec4(p,1.0);gl_Position=projectionMatrix*mv;gl_PointSize=(1.25+aSeed*2.2)*uPixelRatio;vAlpha=smoothstep(0.0,.13,uScatter)*(1.0-smoothstep(.45,1.0,travel))*.85;vSeed=aSeed;}`,fragmentShader:"varying float vAlpha;varying float vSeed;void main(){float r=length(gl_PointCoord-.5);if(r>.5)discard;vec3 c=mix(vec3(.56,.63,.62),vec3(.9,.61,.29),step(.86,vSeed));gl_FragColor=vec4(c,vAlpha*smoothstep(.5,.12,r));}"});this.particles=new dm(d,u),this.particles.frustumCulled=!1,this.root.add(this.particles),this.label.width=1024,this.label.height=1024,this.texture=new Qo(this.label),this.texture.colorSpace=Gt;const f=new un({map:this.texture,metalness:.78,roughness:.28,clearcoat:1,clearcoatRoughness:.18,side:rn,envMapIntensity:1.45});this.spindle.add(new at(new qu(.22,1.4,160,1),f));for(const p of[.22,.37,1.385]){const g=new at(new $u(p,.012,8,128),new js({color:"#c9baa1",metalness:.8,roughness:.2}));this.spindle.add(g)}this.disc.add(this.spindle),this.root.add(this.disc),t.add(this.root),this.root.visible=!1}start(e,t=!1){this.stop(),this.active=!0,this.record=e.id,this.elapsed=t?Ho:0,this.reduced=t;const i=this.label.getContext("2d"),n=i.createRadialGradient(420,330,40,512,512,700);n.addColorStop(0,"#eee8d9"),n.addColorStop(.28,"#acb6ae"),n.addColorStop(.49,"#e8d7b9"),n.addColorStop(.66,"#b3c4c4"),n.addColorStop(.85,"#e0c9ba"),n.addColorStop(1,"#a4a8a3"),i.fillStyle=n,i.fillRect(0,0,1024,1024),i.save(),i.translate(512,512);for(let a=146;a<508;a+=2.2)i.strokeStyle=`rgba(255,255,255,${.08+.12*Math.sin(a*.37)**2})`,i.lineWidth=.65,i.beginPath(),i.arc(0,0,a,0,Math.PI*2),i.stroke();const r=i.createConicGradient(0,0,0);for(const[a,o]of["#c8c6dc","#afd0d1","#f1dc9c","#e6c1c4","#c8c6dc"].entries())r.addColorStop(a/4,o);i.strokeStyle=r,i.globalAlpha=.7,i.lineWidth=45,i.beginPath(),i.arc(0,0,423,0,Math.PI*2),i.stroke(),i.globalAlpha=1,i.fillStyle="#7c5732",i.fillRect(240,-18,192,36),i.fillStyle="#484c47",i.font="500 25px MiSans, sans-serif",i.fillText("MEMORY MARKET",-116,-255),i.font="600 36px MiSans, sans-serif",i.fillText(e.id,-63,252),i.font="400 20px MiSans, sans-serif",i.fillText(e.en.slice(0,27),-135,290),i.restore(),this.texture.needsUpdate=!0,this.root.visible=!0}stop(){this.active=!1,this.amount.value=0,this.elapsed=0,this.last=null,this.paused=!1,this.rotation=0,this.root.visible=!1;for(const e of this.original)e.visible=!0}togglePause(){this.paused=!this.paused,this.last=null}suspend(e){this.suspended!==e&&(this.suspended=e,this.last=null)}setReduced(e){this.reduced=e,e&&this.active&&(this.elapsed=Math.max(this.elapsed,Ho))}update(e,t,i,n=!0){const r=this.last===null?0:Math.min(Math.max(0,e-this.last),.2);if(this.last=e,!this.active)return;!this.paused&&!this.suspended&&!document.hidden&&(n||this.elapsed>0)&&(this.elapsed+=r);const a=this.reduced?1:kc((this.elapsed-.7)/2.3),o=this.reduced?1:kc((this.elapsed-1.55)/2.25);this.amount.value=a,this.particleUniforms.uScatter.value=a,this.particleUniforms.uTime.value=this.elapsed,this.particleUniforms.uPixelRatio.value=i,this.root.position.copy(t.position),this.root.quaternion.copy(t.quaternion),this.particles.visible=!this.reduced&&a>0&&a<1;for(const l of this.original)l.visible=a<.999;this.disc.visible=this.elapsed>1.4||this.reduced,this.disc.position.set(.15-.45*o,1.72+.13*o,.04+1.5*o),this.disc.scale.setScalar(.83+.17*o),this.disc.rotation.set(-.12*o,-.18*o,0),this.rotation=this.reduced?0:Math.max(0,this.elapsed-2.6)*.65,this.spindle.rotation.z=-this.rotation}state(){const e=Nm(this.elapsed-Ho,0,pp);return{active:this.active,elapsed:this.elapsed,playhead:e,paused:this.paused||this.suspended,finished:e>=pp,phase:this.elapsed<.7?"正在抽取记忆匣":this.elapsed<3?"外壳正在散为微粒":this.elapsed<Ho?"碟片抽出 · 开始旋转":e>=12?"记忆片段已播放完成":"记忆正在播放",dissolve:this.amount.value,extraction:kc((this.elapsed-1.55)/2.25),rotation:this.rotation,record:this.record,reduced:this.reduced}}}const Mt=[{id:"M-001",title:"雨停之前",en:"BEFORE THE RAIN",department:"情感保存部",category:"温暖记忆",date:"2030.01.01",lead:"匿名持有人 071",clearance:"ECHO LICENSE",abstract:"如果你从未拥有稳定家庭陪伴，可以通过一位愿意分享童年片段的人自愿授权的记忆，感受有人喊你回家的安心。你将进入分享者的视角，感受其中的细节与情绪，并可随时退出。",findings:["雨突然大了起来，白色球鞋溅上了泥点。","二楼的窗被推开，有人喊了一个快要忘记的小名。","灯亮着。那时候回家不需要导航，只需要循着一个人的声音。"],source:"/world.html",price:680,integrity:88,intensity:71,duration:"01:12",personal:!1,experience:"感受有人喊你回家的安心",tags:["人与陪伴","人生境遇"],sensory:"雨声、熟悉的呼唤、亮着的窗",intention:"我想知道，被家人等着回家是什么感觉"},{id:"M-002",title:"第一次看见海",en:"THE FIRST SEA",department:"体验交易部",category:"快乐记忆",date:"2031.02.02",lead:"匿名持有人 084",clearance:"ECHO LICENSE",abstract:"如果你因行动受限无法到达沙滩，可以通过一位沿海岸散步的旅行者自愿授权的记忆，借着他人的脚步，感受海水漫过脚背。你将进入分享者的视角，感受其中的细节与情绪，并可随时退出。",findings:["天还没有亮，海浪的声音先抵达。","风从耳侧吹过，湿沙接住了脚印。","一条金线浮上海面。那个人忽然笑了，像终于抵达了很远的地方。"],source:"/world.html",price:420,integrity:89,intensity:72,duration:"02:19",personal:!1,experience:"借着他人的脚步，感受海水漫过脚背",tags:["自然旅行","身体条件"],sensory:"潮声、湿沙、迎面吹来的风",intention:"我无法走到海边，想感受潮水与湿沙"},{id:"M-003",title:"没有说出口",en:"WORDS UNSAID",department:"原片评估部",category:"遗憾记忆",date:"2032.03.03",lead:"匿名持有人 097",clearance:"ECHO LICENSE",abstract:"如果你因身处异国未能当面送别朋友，可以通过一位在车站送别挚友的人自愿授权的记忆，接近面对面告别时的不舍。你将进入分享者的视角，感受其中的细节与情绪，并可随时退出。",findings:["站台上的钟快了两分钟。","隔着玻璃，对方笑了一下。","那句话停在喉咙里，列车已经变成一个光点。"],source:"/world.html",price:1120,integrity:90,intensity:73,duration:"03:26",personal:!1,experience:"接近面对面告别时的不舍",tags:["人与陪伴","距离阻隔"],sensory:"站台、玻璃、停在喉咙的话",intention:"我没能赶到车站，想理解最后挥手的感受"},{id:"M-004",title:"城市还没醒",en:"BEFORE THE CITY",department:"情绪寄存部",category:"孤独记忆",date:"2033.04.04",lead:"匿名持有人 110",clearance:"ECHO LICENSE",abstract:"如果你因长期住院无法在清晨自由出门，可以通过一位习惯晨行的城市居民自愿授权的记忆，感受独自走进街道的自在。你将进入分享者的视角，感受其中的细节与情绪，并可随时退出。",findings:["自动门轻轻响了一声。","绿灯亮起，没有人过马路。","天快亮了，这也算有什么在等我吧。"],source:"/world.html",price:360,integrity:91,intensity:74,duration:"04:33",personal:!1,experience:"感受独自走进街道的自在",tags:["城市日常","身体条件"],sensory:"自动门、红绿灯、渐亮的天",intention:"我暂时不能离开病房，想走进天亮前的城市"},{id:"M-005",title:"七秒的语音",en:"SEVEN SECONDS",department:"原片评估部",category:"遗憾记忆",date:"2034.05.05",lead:"匿名持有人 123",clearance:"ECHO LICENSE",abstract:"如果你从未经历亲密关系中的相互牵挂，可以通过一位自愿分享私人语音片段的人自愿授权的记忆，感受一句问候被反复珍惜的亲密。你将进入分享者的视角，感受其中的细节与情绪，并可随时退出。",findings:["拇指停在播放按钮上。","听到一半时，我又把音量调高。","最后一秒只有呼吸。我已经听过很多遍。"],source:"/world.html",price:980,integrity:92,intensity:75,duration:"05:40",personal:!0,experience:"感受一句问候被反复珍惜的亲密",tags:["往日片刻","人生境遇"],sensory:"音量、停顿、最后一秒的呼吸",intention:"我想知道，一句普通问候为何能让人牵挂"},{id:"M-006",title:"下午三点",en:"SUMMER AT THREE",department:"情感保存部",category:"温暖记忆",date:"2035.06.06",lead:"匿名持有人 136",clearance:"ECHO LICENSE",abstract:"如果你成长中没有与祖辈相处的机会，可以通过一位分享暑假午后的人自愿授权的记忆，体验被长辈照顾的缓慢日常。你将进入分享者的视角，感受其中的细节与情绪，并可随时退出。",findings:["玻璃瓶上的水珠沾湿了手心。","她在厨房里喊我的名字，电风扇把声音吹得很慢。","汽水空了，蝉鸣还没有停。"],source:"/world.html",price:520,integrity:93,intensity:76,duration:"01:47",personal:!1,experience:"体验被长辈照顾的缓慢日常",tags:["人与陪伴","人生境遇"],sensory:"冰汽水、水珠、翻动的日历",intention:"我没有与祖母共同生活过，想接近那种陪伴"},{id:"M-007",title:"终于跑到终点",en:"THE FINISH LINE",department:"体验交易部",category:"快乐记忆",date:"2036.07.07",lead:"匿名持有人 149",clearance:"ECHO LICENSE",abstract:"如果你因身体条件无法参与长距离奔跑，可以通过一位完成首次长跑的跑者自愿授权的记忆，感受迈过终点时身体与心情一起释放。你将进入分享者的视角，感受其中的细节与情绪，并可随时退出。",findings:["呼吸一下一下撞着胸口，终点线就在前方。","鞋底擦过跑道，我听见同伴喊出我的名字。","越过白线后慢慢停下，汗水落下来，我笑得说不出话。"],source:"/world.html",price:280,integrity:94,intensity:77,duration:"02:54",personal:!1,experience:"感受迈过终点时身体与心情一起释放",tags:["舞台时刻","身体条件"],sensory:"呼吸一下一下撞着胸口；鞋底擦过跑道；越过白线后慢慢停下",intention:"我无法跑完全程，想体验冲线的一刻"},{id:"M-008",title:"记忆售卖所",en:"MEMORY MARKET",department:"记忆管理局",category:"系统档案",date:"2048.09 / 世界观设定",lead:"MEMORY ADMINISTRATION",clearance:"SYSTEM REFERENCE",abstract:"让因身体条件、时间、距离或人生境遇而无法亲历某些事情的人，通过他人自愿分享的记忆，体验那些未曾拥有的感受。2048 年，记忆售卖所为这些愿望提供另一种入口。",findings:["身体条件：无法亲赴海边，也能借分享者的视角接近海浪、湿沙与迎面而来的风。","时间与距离：错过花期、去不了远方，可以走进他人自愿保存的那一刻。","人生境遇：未曾拥有的校园、舞台与陪伴，也可以成为自主选择的体验。"],source:"/world.html",price:0,integrity:100,intensity:0,duration:"—",personal:!1,experience:"了解记忆售卖所",tags:["世界规则"],sensory:"制度、授权与体验边界",intention:"我想了解这间售卖所如何运作"},{id:"M-009",title:"雪落下来了",en:"THE FIRST SNOW",department:"体验交易部",category:"快乐记忆",date:"2038.09.09",lead:"匿名持有人 175",clearance:"ECHO LICENSE",abstract:"如果你一直生活在热带且无力负担远行，可以通过一位初冬在北方生活的分享者自愿授权的记忆，接住一片从未亲见的雪。你将进入分享者的视角，感受其中的细节与情绪，并可随时退出。",findings:["第一片雪落在袖口。","街角的小孩叫起来，大人也跟着笑。","我伸出手，好像接住了一封远方的信。"],source:"/world.html",price:350,integrity:96,intensity:79,duration:"04:20",personal:!1,experience:"接住一片从未亲见的雪",tags:["自然旅行","距离阻隔"],sensory:"袖口、寒意、一起仰望的人",intention:"我去不了遥远的北方，想知道雪落在手心的感觉"},{id:"M-010",title:"旧街的最后一天",en:"THE OLD STREET",department:"原片评估部",category:"遗憾记忆",date:"2039.10.10",lead:"匿名持有人 188",clearance:"ECHO LICENSE",abstract:"如果你出生时故乡老街已被改建，可以通过一位保留旧街最后一天记忆的居民自愿授权的记忆，走进自己未曾见过的故乡。你将进入分享者的视角，感受其中的细节与情绪，并可随时退出。",findings:["巷口有人拖长声音卖早餐，青石路还湿着。","理发店的收音机唱到一半，熟悉的人向我点了点头。","卷帘门慢慢落下。我转过身，把整条街又看了一遍。"],source:"/world.html",price:840,integrity:97,intensity:80,duration:"05:27",personal:!1,experience:"走进自己未曾见过的故乡",tags:["往日片刻","时间错过"],sensory:"叫卖、青石、落下的卷帘门",intention:"我来不及见到老街，想听听它曾经的声音"},{id:"M-011",title:"说好一起逃课",en:"A STOLEN DAY",department:"体验交易部",category:"快乐记忆",date:"2040.11.11",lead:"匿名持有人 201",clearance:"ECHO LICENSE",abstract:"如果你少年时因承担家庭责任而过早离开校园，可以通过一位分享放学后时光的人自愿授权的记忆，体验不必赶去工作的放学午后。你将进入分享者的视角，感受其中的细节与情绪，并可随时退出。",findings:["围墙边的树叶一直在响。","我们搭上了没有目的地的公交车。","直到天黑，都没想起要看时间。"],source:"/world.html",price:560,integrity:98,intensity:81,duration:"01:34",personal:!1,experience:"体验不必赶去工作的放学午后",tags:["往日片刻","人生境遇"],sensory:"阳光、笑声、没有计划的路",intention:"我没拥有过轻松的校园生活，想和朋友闲逛一次"},{id:"M-012",title:"分享协议",en:"SHARING PROTOCOL",department:"记忆管理局",category:"系统档案",date:"2048.09 / 世界观设定",lead:"MEMORY ADMINISTRATION",clearance:"SYSTEM REFERENCE",abstract:"每份回声都保留匿名来源与分享边界。你进入的是他人的一个片刻，并不会获得他的人格或技能。",findings:["只有持有人自愿授权的片段才进入回声目录。","当前授权为个人回看，不包含转售与再次传播。","所有记忆和人物均为虚构，网页通过文字节选呈现感官体验。"],source:"/world.html",price:0,integrity:100,intensity:0,duration:"—",personal:!1,experience:"了解分享协议",tags:["世界规则"],sensory:"制度、授权与体验边界",intention:"我想了解这间售卖所如何运作"},{id:"M-013",title:"松开的手",en:"THE HAND LET GO",department:"情感保存部",category:"温暖记忆",date:"2042.01.13",lead:"匿名持有人 227",clearance:"ECHO LICENSE",abstract:"如果你未曾拥有可安心依靠的亲密关系，可以通过一位分享与亲友分别片段的人自愿授权的记忆，体验曾被紧紧牵住又认真告别的感受。你将进入分享者的视角，感受其中的细节与情绪，并可随时退出。",findings:["旧车铃响了一声，车把晃得很厉害。","我一直喊着不要松手，却没有听到回应。","回头时，他已经很远了，但还在笑着。"],source:"/world.html",price:760,integrity:88,intensity:83,duration:"03:48",personal:!0,experience:"体验曾被紧紧牵住又认真告别的感受",tags:["人与陪伴","人生境遇"],sensory:"掌心、温度、逐渐远去的脚步",intention:"我想理解，被人珍惜过的告别是什么感觉"},{id:"M-014",title:"冬日的围巾",en:"WINTER SCARF",department:"情感保存部",category:"温暖记忆",date:"2043.02.14",lead:"匿名持有人 240",clearance:"ECHO LICENSE",abstract:"如果你常年异地生活而难与伴侣相聚，可以通过一位分享冬日相处片段的人自愿授权的记忆，感受有人亲手替你围好围巾。你将进入分享者的视角，感受其中的细节与情绪，并可随时退出。",findings:["毛线轻轻擦过耳朵。","对方把最末端塞进外套里，说这样就不会冷。","很久以后，仍记得那个结的样子。"],source:"/world.html",price:460,integrity:89,intensity:84,duration:"04:55",personal:!1,experience:"感受有人亲手替你围好围巾",tags:["人与陪伴","距离阻隔"],sensory:"羊毛、呼气、还留着体温的围巾",intention:"我们隔着很远，想接近一次面对面的关心"},{id:"M-015",title:"等你吃饭",en:"DINNER IS READY",department:"情感保存部",category:"温暖记忆",date:"2044.03.15",lead:"匿名持有人 253",clearance:"ECHO LICENSE",abstract:"如果你长期夜班与家人吃饭时间总是错开，可以通过一位分享普通家庭晚餐的人自愿授权的记忆，坐进一顿能慢慢吃完的团圆饭。你将进入分享者的视角，感受其中的细节与情绪，并可随时退出。",findings:["钥匙转动的时候，厨房里有人抬起头。","汤已经热过两遍。","那句“快坐下”，让所有疲惫都有了去处。"],source:"/world.html",price:840,integrity:90,intensity:85,duration:"05:14",personal:!1,experience:"坐进一顿能慢慢吃完的团圆饭",tags:["人与陪伴","时间错过"],sensory:"热汤、餐具、门锁转动的声音",intention:"我总在家人睡后回来，想体验一起吃晚饭"},{id:"M-016",title:"小狗的名字",en:"A NAME FOR YOU",department:"情感保存部",category:"温暖记忆",date:"2045.04.16",lead:"匿名持有人 266",clearance:"ECHO LICENSE",abstract:"如果你因严重动物过敏无法亲近小狗，可以通过一位自愿分享领养日记忆的人自愿授权的记忆，体验小狗靠近掌心时的信任。你将进入分享者的视角，感受其中的细节与情绪，并可随时退出。",findings:["钥匙串轻轻响了。","门后有急促的小脚步。","我蹲下去，世界被一个毛茸茸的拥抱填满。"],source:"/world.html",price:380,integrity:91,intensity:86,duration:"01:21",personal:!1,experience:"体验小狗靠近掌心时的信任",tags:["人与陪伴","身体条件"],sensory:"爪声、尾巴、轻轻靠近的鼻尖",intention:"我不能近距离接触小狗，想感受被它认出的快乐"},{id:"M-017",title:"借来的伞",en:"UNDER ONE ROOF",department:"情感保存部",category:"温暖记忆",date:"2046.05.17",lead:"匿名持有人 279",clearance:"ECHO LICENSE",abstract:"如果你受迁居与出行条件限制从未独自远行，可以通过一位初到陌生城市的旅行者自愿授权的记忆，体验陌生人递来半边雨伞的善意。你将进入分享者的视角，感受其中的细节与情绪，并可随时退出。",findings:["我们一起站在公交站牌下面。","他说顺路，虽然后来走向了另一边。","我没有记住他的脸，只记住了那一小块干燥。"],source:"/world.html",price:320,integrity:92,intensity:87,duration:"02:28",personal:!1,experience:"体验陌生人递来半边雨伞的善意",tags:["人与陪伴","距离阻隔"],sensory:"雨沿、伞柄、并肩的步子",intention:"我走不远，想知道陌生城市也会怎样接住一个人"},{id:"M-018",title:"一盏留灯",en:"A LIGHT LEFT ON",department:"情感保存部",category:"温暖记忆",date:"2047.06.18",lead:"匿名持有人 292",clearance:"ECHO LICENSE",abstract:"如果你辗转临时住处而未曾有过稳定的家，可以通过一位分享深夜归家记忆的人自愿授权的记忆，感受一盏专门为自己留下的灯。你将进入分享者的视角，感受其中的细节与情绪，并可随时退出。",findings:["楼道里只有一格橙色的光。","推门时，地板发出熟悉的声音。","有人在睡梦里问，是你回来了吗。"],source:"/world.html",price:620,integrity:93,intensity:88,duration:"03:35",personal:!1,experience:"感受一盏专门为自己留下的灯",tags:["人与陪伴","人生境遇"],sensory:"走廊、门缝、暖色的灯",intention:"我想接近不用担心明天搬走的安心"},{id:"M-019",title:"云上的一步",en:"ABOVE THE CLOUDS",department:"体验交易部",category:"快乐记忆",date:"2030.07.19",lead:"匿名持有人 305",clearance:"ECHO LICENSE",abstract:"如果你因心肺条件无法攀登高山，可以通过一位抵达山顶的徒步者自愿授权的记忆，借他人的记忆体验登顶后的辽阔。你将进入分享者的视角，感受其中的细节与情绪，并可随时退出。",findings:["最后一段石阶很陡，我握紧扶手慢慢向上。","山脊后的云海突然展开，风吹干了额头的汗。","我坐在石头上，第一次看见云在脚下流动。"],source:"/world.html",price:740,integrity:94,intensity:89,duration:"04:42",personal:!1,experience:"借他人的记忆体验登顶后的辽阔",tags:["自然旅行","身体条件"],sensory:"最后一段石阶很陡；山脊后的云海突然展开；我坐在石头上",intention:"我不能承受高海拔徒步，想感受山顶的风"},{id:"M-020",title:"第一次谢幕",en:"THE FIRST CURTAIN CALL",department:"体验交易部",category:"快乐记忆",date:"2031.08.20",lead:"匿名持有人 318",clearance:"ECHO LICENSE",abstract:"如果你因生计放弃表演训练而未能登台，可以通过一位完成首次演出的演员自愿授权的记忆，体验站在舞台中央被掌声回应。你将进入分享者的视角，感受其中的细节与情绪，并可随时退出。",findings:["追光打下来，台下暂时只看得见一片暗。","掌声突然涌过来。我把发抖的手放在身侧。","和同伴一起弯腰时，终于敢抬起头看一眼。我真的站在这里。"],source:"/world.html",price:650,integrity:95,intensity:90,duration:"05:49",personal:!1,experience:"体验站在舞台中央被掌声回应",tags:["舞台时刻","人生境遇"],sensory:"追光、掌声、手心里的温度",intention:"我曾为生活放下舞台，想体验一次谢幕"},{id:"M-021",title:"晴天的屋顶",en:"ABOVE THE CITY",department:"体验交易部",category:"快乐记忆",date:"2032.09.21",lead:"匿名持有人 331",clearance:"ECHO LICENSE",abstract:"如果你因行动受限无法登上没有电梯的老楼屋顶，可以通过一位分享屋顶黄昏的住户自愿授权的记忆，从未能抵达的屋顶看城市亮起。你将进入分享者的视角，感受其中的细节与情绪，并可随时退出。",findings:["梯子有些摇晃。","朋友把一罐汽水推过来。","云走得很慢，我们什么都没说。"],source:"/world.html",price:480,integrity:96,intensity:91,duration:"01:56",personal:!1,experience:"从未能抵达的屋顶看城市亮起",tags:["城市日常","身体条件"],sensory:"风、远处的车声、脚下的街区",intention:"我上不了那段楼梯，想看看屋顶外的城市"},{id:"M-022",title:"名字被念到",en:"GRADUATION DAY",department:"体验交易部",category:"快乐记忆",date:"2033.10.22",lead:"匿名持有人 344",clearance:"ECHO LICENSE",abstract:"如果你因家庭经济压力中断学业，可以通过一位分享毕业典礼记忆的人自愿授权的记忆，体验被叫到名字、走上毕业礼台的骄傲。你将进入分享者的视角，感受其中的细节与情绪，并可随时退出。",findings:["礼堂里响起我的名字，我握着衣角站起来。","证书递到手里，台下的同学向我用力挥手。","快门响起时，我突然意识到，这段路终于走完了。"],source:"/world.html",price:900,integrity:97,intensity:92,duration:"02:15",personal:!1,experience:"体验被叫到名字、走上毕业礼台的骄傲",tags:["舞台时刻","人生境遇"],sensory:"礼堂里响起我的名字；证书递到手里；快门响起时",intention:"我没能完成学业，想感受一次毕业典礼"},{id:"M-023",title:"电话那端的欢呼",en:"JOY ON THE LINE",department:"原片评估部",category:"遗憾记忆",date:"2034.11.23",lead:"匿名持有人 357",clearance:"ECHO LICENSE",abstract:"如果你因异地工作无法在亲友重要时刻到场，可以通过一位分享与家人通话片段的人自愿授权的记忆，感受好消息第一时间被家人接住。你将进入分享者的视角，感受其中的细节与情绪，并可随时退出。",findings:["我拨通号码，第一句话说得有些结巴。","那头先安静了一秒，随后传来几个人的欢呼。","我把手机贴紧耳朵，仿佛和他们坐在同一张桌旁。"],source:"/world.html",price:760,integrity:98,intensity:93,duration:"03:22",personal:!1,experience:"感受好消息第一时间被家人接住",tags:["人与陪伴","距离阻隔"],sensory:"我拨通号码；那头先安静了一秒；我把手机贴紧耳朵",intention:"我赶不回去，想接近家人一起分享喜悦的时刻"},{id:"M-024",title:"折回的车票",en:"THE UNUSED TICKET",department:"原片评估部",category:"遗憾记忆",date:"2035.12.24",lead:"匿名持有人 370",clearance:"ECHO LICENSE",abstract:"如果你因工作安排多次错过节日返乡，可以通过一位搭上归乡列车的分享者自愿授权的记忆，体验终于踏上回家路的松弛。你将进入分享者的视角，感受其中的细节与情绪，并可随时退出。",findings:["我已经收好了行李。","消息来得很短，短到不需要再追问。","车票被折了两次，日期仍然看得很清楚。"],source:"/world.html",price:570,integrity:99,intensity:94,duration:"04:29",personal:!1,experience:"体验终于踏上回家路的松弛",tags:["往日片刻","时间错过"],sensory:"票根、广播、反方向的脚步",intention:"我总错过团聚，想感受赶上归乡列车的一刻"},{id:"M-025",title:"最后的合影",en:"THE LAST PICTURE",department:"原片评估部",category:"遗憾记忆",date:"2036.01.25",lead:"匿名持有人 383",clearance:"ECHO LICENSE",abstract:"如果你因生病错过毕业合影，可以通过一位自愿分享合影当天记忆的同学自愿授权的记忆，体验站在人群中一起喊出倒数。你将进入分享者的视角，感受其中的细节与情绪，并可随时退出。",findings:["我站在最边上，笑得有些模糊。","有人说光线不好，要不要重拍。","我们还是散开了，因为相信还有很多机会。"],source:"/world.html",price:1260,integrity:88,intensity:95,duration:"05:36",personal:!1,experience:"体验站在人群中一起喊出倒数",tags:["往日片刻","时间错过"],sensory:"快门、靠拢的肩、来不及的笑",intention:"我的毕业日留白了，想接近大家并肩的那一刻"},{id:"M-026",title:"赶上花开的那天",en:"IN FULL BLOOM",department:"原片评估部",category:"遗憾记忆",date:"2037.02.26",lead:"匿名持有人 396",clearance:"ECHO LICENSE",abstract:"如果你照护工作与短暂花期重叠而无法出行，可以通过一位在盛花时节到访的分享者自愿授权的记忆，借一段盛放的记忆赶上错过的春天。你将进入分享者的视角，感受其中的细节与情绪，并可随时退出。",findings:["转过街角，整排树的花都开了。","风一吹，花瓣落在肩上，我没有急着拍掉。","树下的人放慢脚步，我也第一次不再看时间。"],source:"/world.html",price:440,integrity:89,intensity:96,duration:"01:43",personal:!1,experience:"借一段盛放的记忆赶上错过的春天",tags:["自然旅行","时间错过"],sensory:"转过街角；风一吹；树下的人放慢脚步",intention:"我抽不开身去看花，想体验一次漫天落樱"},{id:"M-027",title:"第一把钥匙",en:"A KEY OF MY OWN",department:"原片评估部",category:"遗憾记忆",date:"2038.03.01",lead:"匿名持有人 409",clearance:"ECHO LICENSE",abstract:"如果你因早早承担照护责任而没有独立生活的机会，可以通过一位第一次搬入独居住所的人自愿授权的记忆，体验拿到自己家钥匙的自主与忐忑。你将进入分享者的视角，感受其中的细节与情绪，并可随时退出。",findings:["钥匙转动时有点涩，门后是一间空房。","我把纸箱放下，听见脚步在屋里轻轻回响。","窗帘还没挂好，但今晚几点睡可以由我决定。"],source:"/world.html",price:1080,integrity:90,intensity:97,duration:"02:50",personal:!1,experience:"体验拿到自己家钥匙的自主与忐忑",tags:["往日片刻","人生境遇"],sensory:"钥匙转动时有点涩；我把纸箱放下；窗帘还没挂好",intention:"我一直为别人安排生活，想感受一次为自己作主"},{id:"M-028",title:"一人份蛋糕",en:"ONE CANDLE",department:"情绪寄存部",category:"孤独记忆",date:"2039.04.02",lead:"匿名持有人 422",clearance:"ECHO LICENSE",abstract:"如果你习惯照顾他人而很少为自己庆祝，可以通过一位分享独自过生日记忆的人自愿授权的记忆，体验不必得到允许就为自己庆祝。你将进入分享者的视角，感受其中的细节与情绪，并可随时退出。",findings:["蛋糕店问要几副餐具。","我说一副就够了。","蜡烛只照亮一个人的脸，但愿望依然很认真。"],source:"/world.html",price:320,integrity:91,intensity:98,duration:"03:57",personal:!0,experience:"体验不必得到允许就为自己庆祝",tags:["独处感受","人生境遇"],sensory:"火苗、奶油、独自许下的愿望",intention:"我想知道，认真庆祝自己的存在是什么感觉"},{id:"M-029",title:"星空没有边缘",en:"UNDER THE MILKY WAY",department:"情绪寄存部",category:"孤独记忆",date:"2040.05.03",lead:"匿名持有人 435",clearance:"ECHO LICENSE",abstract:"如果你生活在光污染严重的城市且无法远行，可以通过一位在旷野露营的观星者自愿授权的记忆，体验整片星空铺满视野的震撼。你将进入分享者的视角，感受其中的细节与情绪，并可随时退出。",findings:["营地的灯熄灭后，眼睛慢慢适应黑暗。","银河从山脊的一侧延伸到另一侧，我一时找不到该看哪里。","身旁的人也没有说话，只有风贴着帐篷经过。"],source:"/world.html",price:240,integrity:92,intensity:71,duration:"04:16",personal:!1,experience:"体验整片星空铺满视野的震撼",tags:["独处感受","距离阻隔"],sensory:"营地的灯熄灭后；银河从山脊的一侧延伸到另一侧；身旁的人也没有说话",intention:"我从未见过没有灯光遮住的星空"},{id:"M-030",title:"最后一班车",en:"LAST BUS HOME",department:"情绪寄存部",category:"孤独记忆",date:"2041.06.04",lead:"匿名持有人 448",clearance:"ECHO LICENSE",abstract:"如果你因身体状况需要他人陪护而难以独自乘车，可以通过一位分享夜班公交旅程的乘客自愿授权的记忆，体验独自决定在哪一站下车的自由。你将进入分享者的视角，感受其中的细节与情绪，并可随时退出。",findings:["座椅有一点凉。","窗上的倒影比外面的路更清楚。","司机提醒到站了，那是今晚听见的第一句对我说的话。"],source:"/world.html",price:400,integrity:93,intensity:72,duration:"05:23",personal:!1,experience:"体验独自决定在哪一站下车的自由",tags:["城市日常","身体条件"],sensory:"发动机、空座、窗外流动的灯",intention:"我很少能独自出门，想体验一次自主的归途"},{id:"M-031",title:"没有收件人",en:"NO RECIPIENT",department:"情绪寄存部",category:"孤独记忆",date:"2042.07.05",lead:"匿名持有人 461",clearance:"ECHO LICENSE",abstract:"如果你成长中很少被允许表达自己的愿望，可以通过一位自愿分享写信片段的人自愿授权的记忆，体验不必迎合任何人的自我表达。你将进入分享者的视角，感受其中的细节与情绪，并可随时退出。",findings:["最后一个句号停在纸上。","我翻开通讯录，从头看到尾。","邮票贴得很正，地址栏却始终没有落笔。"],source:"/world.html",price:530,integrity:94,intensity:73,duration:"01:30",personal:!1,experience:"体验不必迎合任何人的自我表达",tags:["独处感受","人生境遇"],sensory:"纸面、笔尖、折好的信封",intention:"我想接近把自己的愿望认真写下的勇气"},{id:"M-032",title:"异乡的雨",en:"RAIN ELSEWHERE",department:"情绪寄存部",category:"孤独记忆",date:"2043.08.06",lead:"匿名持有人 474",clearance:"ECHO LICENSE",abstract:"如果你因经济与出行条件未曾离开家乡，可以通过一位在异乡第一天生活的分享者自愿授权的记忆，体验走进陌生街道的紧张与新鲜。你将进入分享者的视角，感受其中的细节与情绪，并可随时退出。",findings:["行李箱的轮子沾满泥水。","导航提示已经到达。","我站在楼下，抬头找那扇还不属于自己的窗。"],source:"/world.html",price:680,integrity:95,intensity:74,duration:"02:37",personal:!1,experience:"体验走进陌生街道的紧张与新鲜",tags:["城市日常","距离阻隔"],sensory:"屋檐、鞋底、陌生的街名",intention:"我还去不了远方，想感受初到异乡的第一场雨"},{id:"M-033",title:"不用赶的午饭",en:"AN UNHURRIED LUNCH",department:"情绪寄存部",category:"孤独记忆",date:"2044.09.07",lead:"匿名持有人 487",clearance:"ECHO LICENSE",abstract:"如果你忙于照护而长期没有属于自己的完整休息日，可以通过一位分享安静休息日的人自愿授权的记忆，体验一顿不被任务打断的午饭。你将进入分享者的视角，感受其中的细节与情绪，并可随时退出。",findings:["汤还很热，我把勺子搁下，看窗边的影子慢慢移动。","手机没有响，下一件事也不急着开始。","最后一口饭吃完时，我才发现肩膀已经放松了。"],source:"/world.html",price:460,integrity:96,intensity:75,duration:"03:44",personal:!1,experience:"体验一顿不被任务打断的午饭",tags:["独处感受","时间错过"],sensory:"汤还很热；手机没有响；最后一口饭吃完时",intention:"我总要随时回应别人，想感受慢慢吃完一顿饭"},{id:"M-034",title:"有人说你可以",en:"SOMEONE BELIEVES",department:"情绪寄存部",category:"孤独记忆",date:"2045.10.08",lead:"匿名持有人 500",clearance:"ECHO LICENSE",abstract:"如果你从小缺少对自己选择的支持，可以通过一位分享重要决定获支持片段的人自愿授权的记忆，体验说出愿望后被认真支持。你将进入分享者的视角，感受其中的细节与情绪，并可随时退出。",findings:["我把那个想了很久的决定说完，低头等着回答。","对面的人没有追问值不值得，只说：我相信你。","原先准备好的解释忽然用不上了，我慢慢抬起头。"],source:"/world.html",price:720,integrity:97,intensity:76,duration:"04:51",personal:!1,experience:"体验说出愿望后被认真支持",tags:["独处感受","人生境遇"],sensory:"我把那个想了很久的决定说完；对面的人没有追问值不值得；原先准备好的解释忽然用不上了",intention:"我想知道，当我说出想走的路，有人支持是什么感觉"},{id:"M-035",title:"回声授权",en:"ECHO LICENSE",department:"记忆管理局",category:"系统档案",date:"2048.09 / 世界观设定",lead:"MEMORY ADMINISTRATION",clearance:"SYSTEM REFERENCE",abstract:"一个人熟悉的一刻，可能是另一个人未曾抵达的地方。回声授权让记忆被分享，同时保留持有人的原片。",findings:["购入一份回声后，可在我的体验中再次回看。","分享者保留记忆，并获得虚构MC信用；本演示每份原片可授权一次。","分享应当出于自愿，不需要转让唯一原片才能参与。"],source:"/world.html",price:0,integrity:100,intensity:0,duration:"—",personal:!1,experience:"了解回声授权",tags:["世界规则"],sensory:"制度、授权与体验边界",intention:"我想了解这间售卖所如何运作"},{id:"M-036",title:"原片转让",en:"ORIGINAL TRANSFER",department:"记忆管理局",category:"系统档案",date:"2048.09 / 世界观设定",lead:"MEMORY ADMINISTRATION",clearance:"SYSTEM REFERENCE",abstract:"原片转让是一种另行确认的选择：持有人仍知道事件发生过，却失去第一人称感受。它不是获得体验的必要步骤。",findings:["回声授权与原片转让分开选择。","原片转让后，个人目录留下不可读取的空位。","系统保存凭证，让这次选择的后果仍然可见。"],source:"/world.html",price:0,integrity:100,intensity:0,duration:"—",personal:!1,experience:"了解原片转让",tags:["世界规则"],sensory:"制度、授权与体验边界",intention:"我想了解这间售卖所如何运作"},{id:"M-037",title:"体验与价格",en:"ACCESS AND PRICE",department:"记忆管理局",category:"系统档案",date:"2048.09 / 世界观设定",lead:"MEMORY ADMINISTRATION",clearance:"SYSTEM REFERENCE",abstract:"体验拥有价格以后，谁有机会接近它？价格是这个虚构社会的规则，也是一项留给观众讨论的问题。",findings:["每份体验均可先查看文字预览。","MC、完整度和情绪浓度属于作品设定，并非现实科学量表。","拥有更多信用不意味着一个人的经历更有价值。"],source:"/world.html",price:0,integrity:100,intensity:0,duration:"—",personal:!1,experience:"了解体验与价格",tags:["世界规则"],sensory:"制度、授权与体验边界",intention:"我想了解这间售卖所如何运作"},{id:"M-038",title:"退出与回看",en:"PAUSE AND RETURN",department:"记忆管理局",category:"系统档案",date:"2048.09 / 世界观设定",lead:"MEMORY ADMINISTRATION",clearance:"SYSTEM REFERENCE",abstract:"体验者保有主动权。回放中可以暂停、继续、重看或退出；购入的回声可以在个人体验库中移除。",findings:["暂停会停留在当前片段，继续时从原位置播放。","关闭回放立即结束当前体验，不会自动购入。","删除已购回声不退款、不影响分享者原记忆；体验留言仅存于此浏览器。"],source:"/world.html",price:0,integrity:100,intensity:0,duration:"—",personal:!1,experience:"了解退出与回看",tags:["世界规则"],sensory:"制度、授权与体验边界",intention:"我想了解这间售卖所如何运作"},{id:"M-039",title:"视角边界",en:"PERSPECTIVE BOUNDARY",department:"记忆管理局",category:"系统档案",date:"2048.09 / 世界观设定",lead:"MEMORY ADMINISTRATION",clearance:"SYSTEM REFERENCE",abstract:"你接近的是记忆者的感受，不是自己的真实过去。相同的一刻，可以在不同人心中留下不同的意义。",findings:["来源标记始终保留，外源回声与原生记忆分开呈现。","体验后可以留下自己的感受，也可以不作回答。","一次回放不能保证共情、消除遗憾或替代亲身经历。"],source:"/world.html",price:0,integrity:100,intensity:0,duration:"—",personal:!1,experience:"了解视角边界",tags:["世界规则"],sensory:"制度、授权与体验边界",intention:"我想了解这间售卖所如何运作"},{id:"M-040",title:"未曾抵达的人生",en:"LIVES BEYOND OUR OWN",department:"记忆管理局",category:"系统档案",date:"2048.09 / 世界观设定",lead:"MEMORY ADMINISTRATION",clearance:"SYSTEM REFERENCE",abstract:"当身体、时间、距离或人生境遇限制了亲历，记忆能否成为接近那些感受的另一条路？这是本作品的提问。",findings:["由体验者自己定义愿望，不替任何群体决定他们缺少什么。","世界观属于2048年虚构设想，不代表记忆植入技术已实现。","让愿望成为入口，让体验保有边界。"],source:"/world.html",price:0,integrity:100,intensity:0,duration:"—",personal:!1,experience:"了解未曾抵达的人生",tags:["世界规则"],sensory:"制度、授权与体验边界",intention:"我想了解这间售卖所如何运作"}],er=["快乐记忆","遗憾记忆","温暖记忆","孤独记忆","系统档案"];function tr(s){return Mt.map((e,t)=>({record:e,index:t})).filter(({record:e})=>e.category===er[s]).map(({index:e})=>e)}function xs(s){const e=er.indexOf(Mt[s].category),t=12+tr(e).indexOf(s);return{lane:e,row:t,slot:e*32+t}}function Bc(s){const e=tr(Math.floor(s/32));return e[Math.max(0,Math.min(e.length-1,s%32-12))]}const Om=9,Or=32,Go=5.2,Wo=.62,Um=[0,1,2,3,4,-2,-1,5,6];function tu(s,e){return(s%e+e)%e}function ml(s,e,t){return s+Math.floor((e-s+t/2)/t)*t}function mp({lane:s,row:e}){const t=tr(tu(s,er.length));return t[tu(e-12,t.length)]}function O1(s,e,t){if(t&&"cell"in t)return{...t.cell};const i=xs(s),n=ml(i.row,e.row,tr(i.lane).length);return t?.axis==="row"?{lane:e.lane,row:e.row+t.direction}:{lane:t?.axis==="lane"?e.lane+t.direction:ml(i.lane,e.lane,er.length),row:n}}function gp(s){return{lane:Um[Math.floor(s/Or)],row:s%Or}}function U1(s,e){return{lane:ml(Um[Math.floor(s/Or)],e.lane,Om),row:ml(s%Or,e.row,Or)}}function zc(s){return`${s.lane}:${s.row}`}function _p(s,e){return s.lane===e.lane&&s.row===e.row}const Fm='<path d="M156 75C127 48 103 15 70 15C37 15 15 39 15 70S38 128 70 128C103 128 127 96 176 52M155 75C182 99 208 128 240 128C273 128 295 105 295 73S273 15 240 15C221 15 207 23 192 38" fill="none" stroke="currentColor" stroke-width="26"/><path d="M44 70h50M69 45v50M219 70h44" fill="none" stroke="currentColor" stroke-width="15"/>',F1=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 310 145" color="#171713">${Fm}</svg>`,Vc=`<svg viewBox="0 0 310 185" aria-label="记忆售卖所 Memory Market" role="img">${Fm}<text x="165" y="174" text-anchor="middle" font-family="MiSans,sans-serif" font-size="16" font-weight="700" letter-spacing="22">MEMORY·MM</text></svg>`,k1=["M295 73C295 41 273 15 240 15C221 15 207 23 192 38","M176 52C127 96 103 128 70 128C38 128 15 101 15 70C15 39 37 15 70 15C103 15 127 48 156 75","M155 75C182 99 208 128 240 128C273 128 295 105 295 73"],Bi=s=>(s=Math.max(0,Math.min(1,s)),s*s*s*(10+s*(-15+6*s))),gl=(s,e)=>Math.exp(-.5*(s/e)**2);function km(s,e,t){const i=t-22,n=s+(e-2)*.65,r=Bi(i/.32),a=3+i*19,o=32-(i-2.3)*24,l=c=>2.5*gl(c,3.8)-.58*gl(c-6,3.5);return r*(l(n-a)*(1-Bi((i-2.15)/.65))+l(n-o)*Bi((i-2.17)/.32)*(1-Bi((i-3.5)/.85)))}function B1(s){return .4*Bi((s-25.58)/.82)+2.95*Bi((s-27.55)/1.3)}function Bm(s,e){const t=e-25.05-Math.abs(s)*.065,i=Math.max(-.42,2.15-.17*(Math.sqrt(s*s+1)-1)),n=Bi(t/.62),r=t>0?Math.sin(t*5.1)*Math.exp(-t*1.3):0;return i*(n+.18*r*Bi(t/.16))}function z1(s,e){return e<0||e>3.2?0:.8*Bi(e/.2)*Math.exp(-e*1.15)*Math.cos((s-e*8)*.58)*gl(s-e*8,3.4)}function V1(s,e){return Bi(s/2.5)*Math.max(0,Math.cos((s-e*8)*.58))}function zm(s,e,t=1){return 1+(.25+.75*gl(s-e,.55)-1)*Bi(t)}function H1(s,e,t){return .075*Math.sin(t*Math.PI*2/8+s*.3-e*.45)+.027*Math.sin(t*Math.PI*2/13-s*.17+e*.3)}function G1(s,e,t,i=12,n=2){const r=Bi((t-24.95)/.45),a=Bi((t-25.4)/.95),o=t+.3*r*(1-a);return km(s,e,t)*(1-r)+Bm(s-i,o)*zm(e,n,(t-25.4)/.95)}const vp=4.05,W1=.001;function xp(s,e,t=!1){const i=s*Math.exp(-e*(t?35:7));return Math.abs(i)<=W1?0:i}function Bs(s,e,t,i){const n=s.value-e,r=s.velocity+t*n,a=Math.exp(-t*i);s.value=e+(n+r*i)*a,s.velocity=(s.velocity-t*r*i)*a}const kt=s=>(s=$e.clamp(s,0,1),s*s*s*(s*(s*6-15)+10));class X1{constructor(e,t=z1,i=!1,n="baseline"){this.container=e,this.selectionPulse=t,this.deferSelectionPulse=i,this.lightingLook=n,this.renderer=new Rm({antialias:this.highQuality,alpha:!1,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,this.highQuality?1.5:1)*Math.min(innerWidth/1920,innerHeight/1080)),this.renderer.setSize(e.clientWidth,e.clientHeight),this.renderer.info.autoReset=!1,this.renderer.shadowMap.enabled=this.highQuality,this.renderer.shadowMap.type=Xp,this.renderer.toneMapping=eo,this.renderer.toneMappingExposure=1.05,this.renderer.domElement.setAttribute("aria-label","三维记忆匣阵列，可点击选择记忆"),e.appendChild(this.renderer.domElement),this.scene.background=new Le("#eae5e1"),this.scene.fog=new Ll("#eae5e1",22,47),this.light=Lm(this.renderer,this.scene,n),this.light.castShadow=this.highQuality,Object.assign(this.light.shadow.camera,{left:-16,right:16,top:15,bottom:-15,near:.1,far:45}),this.light.shadow.mapSize.set(this.highQuality?2048:512,this.highQuality?2048:512),this.light.shadow.normalBias=n==="refined"?.018:.035,this.light.shadow.bias=n==="refined"?-12e-5:-3e-4,this.light.shadow.radius=4;const r=new at(new Gs(200,200),new js({color:"#d8c9b9",roughness:.95}));r.rotation.x=-Math.PI/2,r.position.y=-4.63,r.receiveShadow=!0,this.scene.add(r),this.camera.position.set(-62.26,35.98,43.28),this.cameraAim.set(-.5,1.1,.4),this.camera.fov=6.15,this.camera.lookAt(this.cameraAim),this.composer=new A1(this.renderer),this.composer.addPass(new C1(this.scene,this.camera)),this.ao=new ds(this.scene,this.camera,e.clientWidth,e.clientHeight),this.ao.kernelRadius=n==="refined"?.44:.38,this.ao.minDistance=.001,this.ao.maxDistance=.09,this.composer.addPass(this.ao),this.bokeh=new D1(this.scene,this.camera,{focus:25,aperture:.0018,maxblur:.011}),this.composer.addPass(this.bokeh),this.composer.addPass(new P1),this.bindPointer()}container;selectionPulse;deferSelectionPulse;lightingLook;renderer;scene=new Vu;camera=new ui(34,16/9,.1,300);composer;ao;bokeh;instances=[];model=new ki;appearance=new I1;discFx;cursor=new De;raycaster=new Yv;dummy=new bt;positions=[];cells=[];selectedCell={lane:2,row:12};looping=!1;coordinateOrigin={lane:0,row:0};lift={value:0,velocity:0};rail={value:0,velocity:0};shoulder={value:12,velocity:0};laneFocus={value:2,velocity:0};columnCamera={value:0,velocity:0};returnY=null;canInspect=!1;clearance=0;pulseGain=1;idleGain=0;lastInteraction=0;scanTime=29.1;scanBlend=0;cameraAim=new D;outgoing=[];pulses=[];pendingPulse=null;selectedSlot=76;detail=0;targetDetail=0;reveal=0;targetReveal=0;last=0;pointer=new De;dragging=!1;rotation=0;targetRotation=0;light;clock=0;loaded=!1;labelCanvas=document.createElement("canvas");labelTexture;labelMark=new Image;reduced=!1;highQuality=!1;onSelect;onHover;async load(){this.labelMark.src=`data:image/svg+xml;charset=utf-8,${encodeURIComponent(F1)}`,await this.labelMark.decode();const e=await new sp().loadAsync("/assets/archive-cassette.glb");e.scene.updateMatrixWorld(!0);const t=[];e.scene.traverse(r=>{r instanceof at&&t.push(r)});const i=Om*Or;for(let r=0;r<i;r++){const a=gp(r);this.cells.push(a),this.positions.push(this.cellPosition(a))}for(const r of t){const a=r.geometry.clone().applyMatrix4(r.matrixWorld).scale(1,1,1),o=r.material,l=o.name.replace(/\.\d+$/,""),c=o.clone();if(c.envMapIntensity=.6,l==="Frosted_Polymer"&&(c.color.set("#fffdfa"),c.transmission=.9,c.thickness=.12,c.roughness=.21,c.ior=1.46,c.attenuationColor=new Le("#eee6df"),c.attenuationDistance=2,c.onBeforeCompile=f=>{f.vertexShader=`varying float vArchiveHeight;
`+f.vertexShader,f.vertexShader=f.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vArchiveHeight = position.y / 3.7;`),f.fragmentShader=`varying float vArchiveHeight;
`+f.fragmentShader,f.fragmentShader=f.fragmentShader.replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>
roughnessFactor = mix(0.48, 0.035, smoothstep(0.36, 0.68, vArchiveHeight));`)}),l==="Internal_Ceramic"&&(c.color.set(this.lightingLook==="refined"?"#c4baae":"#c7beb6"),c.roughness=.6),l==="Printed_Label"&&c.color.set("#eae5dc"),l==="Ivory_Edges"&&(c.color.set("#f0e7df"),c.roughness=.31,c.transmission=.65,c.thickness=.04),l==="Optical_Diffuser"&&(c.color.set("#e2dad4"),c.transmission=0,c.roughness=.7),l==="Subsurface_Optics"&&(c.color.set(this.lightingLook==="refined"?"#b9a796":"#b9aba1"),c.roughness=.48,c.metalness=.05),l==="Optical_Edges"&&(c.transmission=0,c.color.set(this.lightingLook==="refined"?"#d8c7b5":"#d4c7be"),c.roughness=.26,c.metalness=.08),l==="Amber_Lightguide"&&(c.polygonOffset=!0,c.polygonOffsetFactor=-1,c.polygonOffsetUnits=-2),l==="Carbon_Ink")continue;const h=new at(a,c);if(h.userData.surface=l,h.castShadow=l==="Optical_Diffuser",h.receiveShadow=!0,this.model.add(h),!["Frosted_Polymer","Ivory_Edges","Titanium_Fasteners","Champagne_Index","Optical_Diffuser"].includes(l)){this.appearance.register(l,c);continue}const d=c.clone();l==="Frosted_Polymer"&&(d.transmission=.78,this.lightingLook==="refined"&&(d.thickness=.28,d.attenuationColor.set("#d4c7b4"),d.attenuationDistance=1.2),d.transparent=!1,d.color.set("#fff7ed"),d.onBeforeCompile=f=>{f.vertexShader=`varying float vPanelHeight;
`+f.vertexShader,f.vertexShader=f.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vPanelHeight = position.y / 3.7;`),f.fragmentShader=`varying float vPanelHeight;
`+f.fragmentShader,f.fragmentShader=f.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
diffuseColor.rgb *= mix(vec3(0.40, 0.30, 0.20), vec3(1.0, 0.98, 0.94), smoothstep(0.1, 1.0, vPanelHeight));`)},d.roughness=.28,d.clearcoat=.3,d.clearcoatRoughness=.25),l==="Optical_Diffuser"&&d.color.set("#806447"),l==="Ivory_Edges"&&(d.transmission=0,d.color.set(this.lightingLook==="refined"?"#dcc9b0":"#fff5e9"),d.roughness=.38),l==="Champagne_Index"&&(d.color.set("#e4d6c5"),d.metalness=.05),this.appearance.register(l,c,d);const u=new Wu(a,d,i);u.instanceMatrix.setUsage(h_),u.castShadow=l==="Optical_Diffuser",u.receiveShadow=!0,u.frustumCulled=!1,this.instances.push(u),this.scene.add(u)}this.labelCanvas.width=1024,this.labelCanvas.height=440,this.labelTexture=new Qo(this.labelCanvas),this.labelTexture.colorSpace=Gt,this.labelTexture.anisotropy=this.renderer.capabilities.getMaxAnisotropy();const n=new at(new Gs(.99,.46),new En({map:this.labelTexture,toneMapped:!1,transparent:!0,depthWrite:!1}));n.position.set(-1.36,3.04,.255),this.model.add(n),this.appearance.prepare(this.model),this.appearance.apply(this.model,0),this.drawLabel(0),this.scene.add(this.model),this.model.position.copy(this.positions[this.selectedSlot]),this.discFx=new N1(this.model,this.scene),this.loaded=!0}assemblyTemplate;async createAssemblyModel(){this.assemblyTemplate??=new sp().loadAsync("/assets/archive-assembly.glb").then(o=>(o.scene.updateMatrixWorld(!0),o.scene)).catch(o=>{throw this.assemblyTemplate=void 0,o});const e=await this.assemblyTemplate,t=new ki,i=[];e.traverse(o=>{if(!(o instanceof at))return;const l=o.material.name.replace(/\.\d+$/,""),c=new at(o.geometry.clone().applyMatrix4(o.matrixWorld),o.material);c.userData.surface=l,c.userData.assemblyPart=o.userData.assemblyPart,t.add(c),i.push(c)}),this.appearance.prepare(t),this.appearance.apply(t,1);const n=document.createElement("canvas");n.width=this.labelCanvas.width,n.height=this.labelCanvas.height,n.getContext("2d").drawImage(this.labelCanvas,0,0);const r=new Qo(n);r.colorSpace=Gt,r.anisotropy=this.renderer.capabilities.getMaxAnisotropy();const a=new at(new Gs(.99,.46),new En({map:r,toneMapped:!1,transparent:!0,depthWrite:!1}));return a.position.set(-1.36,3.04,.255),a.userData.assemblyPart="cover",t.add(a),i.push(a),{model:t,dispose:()=>{for(const o of i)o.geometry.dispose(),o.material.dispose();r.dispose()}}}setMode(e){if(e!=="detail"&&this.discFx?.stop(),e!=="archive"&&(this.pendingPulse=null),this.looping=e!=="hidden",!this.looping){const t=xs(Bc(this.selectedSlot));this.selectedCell={lane:t.lane,row:t.row},this.coordinateOrigin={lane:0,row:0};for(const i of this.outgoing)this.scene.remove(i.group),this.appearance.dispose(i.group);this.outgoing=[]}this.lastInteraction=this.clock,this.targetReveal=e==="hidden"?0:1,this.targetDetail=e==="detail"?1:0,this.dragging=!1,e!=="detail"?(this.targetRotation=0,this.rotation!==0&&(this.returnY=this.model.position.y)):this.returnY=null}setReduced(e){this.reduced=e,this.discFx?.setReduced(e)}playDisc(e){this.discFx?.start(e,this.reduced)}pauseDisc(){this.discFx?.togglePause()}suspendDisc(e){this.discFx?.suspend(e)}get discPlayback(){return this.discFx?.state()}stopDisc(){this.discFx?.stop()}setQuality(e){this.highQuality=e,this.ao.enabled=e,this.bokeh.enabled=e,this.renderer.shadowMap.enabled=e,this.light.castShadow=e;const t=e?2048:512;this.light.shadow.mapSize.x!==t&&(this.light.shadow.map?.dispose(),this.light.shadow.map=null,this.light.shadow.mapSize.set(t,t)),this.resize()}cellPosition(e){return new D((e.lane-2)*Go,-4.6,(e.row-15.5)*Wo)}rebaseCoordinates(){const e={lane:Math.abs(this.selectedCell.lane)>2048?Math.round((this.selectedCell.lane-2)/5)*5:0,row:Math.abs(this.selectedCell.row)>2048?Math.floor((this.selectedCell.row-12)/8)*8:0};if(!(!e.lane&&!e.row)){this.selectedCell.lane-=e.lane,this.selectedCell.row-=e.row,this.coordinateOrigin.lane+=e.lane,this.coordinateOrigin.row+=e.row,this.laneFocus.value-=e.lane,this.shoulder.value-=e.row,this.columnCamera.value-=e.lane*Go,this.rail.value+=e.row*Wo;for(const t of this.outgoing)t.cell.lane-=e.lane,t.cell.row-=e.row;for(const t of this.pulses)t.lane-=e.lane,t.row-=e.row;this.pendingPulse&&(this.pendingPulse.lane-=e.lane,this.pendingPulse.row-=e.row)}}select(e,t){this.lastInteraction=this.clock;const i=xs(e).slot,n=xs(e),r=this.looping?O1(e,this.selectedCell,t):{lane:n.lane,row:n.row},a=!_p(r,this.selectedCell);if(this.looping&&a&&this.loaded&&this.lift.value>1e-4){const l=this.model.clone(!0);this.appearance.prepare(l);const c=l.children[l.children.length-1],h=document.createElement("canvas");h.width=1024,h.height=440,h.getContext("2d").drawImage(this.labelCanvas,0,0);const d=new Qo(h);d.colorSpace=Gt,c.material=new En({map:d,toneMapped:!1,transparent:!0,depthWrite:!1}),this.appearance.apply(l,kt(this.lift.value/.4)),this.scene.add(l),this.outgoing.push({group:l,slot:this.selectedSlot,cell:{...this.selectedCell},lift:{...this.lift},returnY:l.rotation.y!==0?l.position.y:null}),this.lift.value=0,this.lift.velocity=0}this.selectedSlot=i,this.selectedCell=r,a&&(this.rotation=0,this.returnY=null);const o=this.outgoing.findIndex(l=>_p(l.cell,r));if(o>=0){const l=this.outgoing[o];this.lift={...l.lift},this.rotation=l.group.rotation.y,this.returnY=l.returnY,this.scene.remove(l.group),this.appearance.dispose(l.group),this.outgoing.splice(o,1)}this.deferSelectionPulse?this.pendingPulse=this.looping?{...r}:null:this.emitPulse(r),this.targetRotation=0,this.drawLabel(e)}emitPulse(e){this.pulses.push({...e,time:this.clock}),this.pulses=this.pulses.slice(-6)}drawLabel(e){if(!this.labelTexture)return;const t=this.labelCanvas.getContext("2d");t.fillStyle="#e6e2d9",t.fillRect(0,0,1024,440),t.fillStyle="#171713",t.fillRect(12,12,1e3,6),t.fillRect(12,419,1e3,3),t.font="bold 81px MiSans",t.fillText("MEMORY MARKET",22,116),t.font="32px MiSans",t.fillStyle="#878476",t.fillText("MEMORY DATABASE",25,174),t.fillStyle="#171713",t.font="bold 130px MiSans",t.fillText("NO."+String(e+1).padStart(3,"0"),22,360),t.fillRect(782,32,221,39),t.fillStyle="#eee9de",t.font="24px MiSans",t.fillText("M M / 48",809,61),t.fillStyle="#171713",t.font="bold 64px MiSans",t.fillText("INFO",830,143),t.drawImage(this.labelMark,790,242,210,98),this.labelTexture.needsUpdate=!0}resize(){const e=this.container.clientWidth,t=this.container.clientHeight;this.renderer.setPixelRatio(Math.min(devicePixelRatio,this.highQuality?1.5:1)*Math.min(innerWidth/1920,innerHeight/1080)),this.composer.setPixelRatio(this.renderer.getPixelRatio()),this.renderer.setSize(e,t),this.composer.setSize(e,t),this.camera.aspect=e/t,this.camera.updateProjectionMatrix()}bindPointer(){const e=this.renderer.domElement;let t=0,i=0;e.addEventListener("pointerdown",n=>{t=n.clientX,i=n.clientY,this.canInspect&&(this.dragging=!0,e.setPointerCapture(n.pointerId))}),e.addEventListener("pointermove",n=>{const r=e.getBoundingClientRect();if(this.pointer.set((n.clientX-r.left)/r.width-.5,(n.clientY-r.top)/r.height-.5),this.dragging){if(!this.canInspect){this.dragging=!1;return}this.targetRotation=$e.clamp(this.targetRotation+n.movementX*.004,-.8,.8);return}if(this.reveal<.8||this.detail>.2||!this.loaded)return;this.cursor.set((n.clientX-r.left)/r.width*2-1,-(n.clientY-r.top)/r.height*2+1),this.raycaster.setFromCamera(this.cursor,this.camera);const a=this.raycaster.intersectObjects([this.instances[0],this.model],!0)[0];e.style.cursor=a?"pointer":"default",this.onHover?.(a?a.instanceId!==void 0?mp(this.cells[a.instanceId]):Bc(this.selectedSlot):null)}),e.addEventListener("pointerup",n=>{if(this.dragging=!1,Math.hypot(n.clientX-t,n.clientY-i)>6||this.detail>.2||this.reveal<.8||!this.loaded)return;const r=e.getBoundingClientRect();this.cursor.set((n.clientX-r.left)/r.width*2-1,-(n.clientY-r.top)/r.height*2+1),this.raycaster.setFromCamera(this.cursor,this.camera);const a=this.raycaster.intersectObjects([this.instances[0],this.model],!0)[0];a&&this.onSelect?.(a.instanceId!==void 0?mp(this.cells[a.instanceId]):Bc(this.selectedSlot),a.instanceId!==void 0?{...this.cells[a.instanceId]}:{...this.selectedCell})}),e.addEventListener("pointercancel",()=>this.dragging=!1),e.addEventListener("pointerleave",()=>{this.pointer.set(0,0),this.onHover?.(null)})}update(e,t){const i=Math.min(e-this.last||.016,.05);if(this.last=e,this.clock=e,!this.loaded)return;const n=1-Math.exp(-i*(this.reduced?35:2.8));this.reveal=t?t.reveal:$e.lerp(this.reveal,this.targetReveal,n),this.rotation=this.targetDetail?$e.lerp(this.rotation,this.targetRotation,n):xp(this.rotation,i,this.reduced);const r=t?.time??29.1;t?(this.scanTime=r,this.scanBlend=1):(this.scanTime+=i,this.scanBlend*=Math.exp(-i*3)),this.looping&&!t&&this.rebaseCoordinates();const a=this.cellPosition(this.selectedCell),o=this.selectedCell.row,l=this.selectedCell.lane;Bs(this.shoulder,o,this.reduced?35:5,i),Bs(this.laneFocus,l,this.reduced?35:4,i),Bs(this.columnCamera,a.x,this.reduced?35:3.7,i),Bs(this.rail,t?0:-2.17-a.z,this.reduced?35:3.7,i),t&&(this.rail.value=0,this.rail.velocity=0,this.lift.value=B1(r),this.lift.velocity=0,this.shoulder.value=o,this.laneFocus.value=l,this.laneFocus.velocity=0,this.columnCamera.value=a.x,this.columnCamera.velocity=0);const c=t?0:this.columnCamera.value,h={lane:this.columnCamera.value/Go+2,row:(-this.rail.value-2.17)/Wo+15.5};for(let Z=0;Z<this.positions.length;Z++)this.cells[Z]=t||!this.looping?gp(Z):U1(Z,h),this.positions[Z].set((this.cells[Z].lane-2)*Go,-4.6,(this.cells[Z].row-15.5)*Wo);this.pulses=this.pulses.filter(Z=>e-Z.time<3.2);const d=this.outgoing.some(Z=>Z.returnY!==null),u=!t&&!this.reduced&&this.targetReveal>0&&!this.targetDetail&&this.detail<.01&&this.returnY===null&&!d&&e-this.lastInteraction>2.5;this.idleGain=t?0:$e.lerp(this.idleGain,u?1:0,1-Math.exp(-i*(u?.8:4))),this.pulseGain=$e.lerp(this.pulseGain,this.targetDetail||this.returnY!==null||d?0:1,1-Math.exp(-i*8));const f=(Z,ae)=>{if(t)return G1(Z,ae,r,this.shoulder.value,this.laneFocus.value);let ve=km(Z+this.coordinateOrigin.row,ae+this.coordinateOrigin.lane,this.scanTime)*this.scanBlend+H1(Z+this.coordinateOrigin.row,ae+this.coordinateOrigin.lane,e)*this.idleGain;if(!t&&!this.reduced){let J=0;for(const ee of this.pulses){const Ce=Math.hypot(Z-ee.row,(ae-ee.lane)*2.2),xe=e-ee.time;J+=this.selectionPulse(Ce,xe)*(this.deferSelectionPulse?V1(Ce,xe):1)}ve+=$e.clamp(J,-.6,.6)*this.pulseGain}const W=Z-this.shoulder.value;return ve+Bm(W,26.56)*zm(ae,this.laneFocus.value)},p=a.y+f(o,l);t||(this.returnY!==null&&this.rotation!==0?(this.lift.value=this.returnY-p,this.lift.velocity=0):(this.returnY=null,Bs(this.lift,this.targetDetail?vp:this.outgoing.some(Z=>Z.returnY!==null&&Z.cell.lane===l&&Math.abs(Z.cell.row-o)<5)?0:.4*this.targetReveal,this.reduced?35:this.deferSelectionPulse&&!this.targetDetail&&this.lift.value<.4?7.6:4.2,i)));const g=this.targetDetail?kt((this.lift.value-.8)/2.4):this.returnY!==null?this.detail:kt((this.lift.value-.4)/(vp-.4));this.detail=t?t.zoom:$e.lerp(this.detail,g,n);const m=this.detail;this.appearance.apply(this.model,kt(this.lift.value/.4));const _=t?kt((r-21.9)/.86):this.reveal,x=$e.clamp((r-21.92)/.75,0,1),E=t?-23*(1-x)**2:-28*(1-_);for(let Z=this.outgoing.length-1;Z>=0;Z--){const ae=this.outgoing[Z],ve=this.cellPosition(ae.cell),W=ve.y+f(ae.cell.row,ae.cell.lane);ae.group.rotation.y=xp(ae.group.rotation.y,i,this.reduced),ae.returnY!==null?(ae.lift.value=ae.returnY-W,ae.lift.velocity=0,ae.group.rotation.y===0&&(ae.returnY=null)):Bs(ae.lift,0,this.reduced?35:4.5,i),ae.group.position.set(ve.x-c,W+ae.lift.value,ve.z+E+this.rail.value);const J=kt(ae.lift.value/.4);this.appearance.apply(ae.group,J);const{row:ee,lane:Ce}=ae.cell;ae.group.rotation.x=(f(ee+.5,Ce)-f(ee-.5,Ce))*.024*(1-m)*(1-J),ae.lift.value<1e-4&&Math.abs(ae.group.rotation.y)<1e-4&&(this.scene.remove(ae.group),this.appearance.dispose(ae.group),this.outgoing.splice(Z,1))}if(this.pendingPulse&&!t&&!this.targetDetail&&this.targetReveal){const Z=p+this.lift.value,ae=this.outgoing.every(ve=>ve.cell.lane!==l||Math.abs(ve.cell.row-o)>4||ve.group.position.y+.015<Z);this.lift.value>=.35&&this.returnY===null&&ae&&(this.reduced||this.emitPulse(this.pendingPulse),this.pendingPulse=null)}const y=new Set(this.outgoing.map(Z=>zc(Z.cell)));y.add(zc(this.selectedCell));for(let Z=0;Z<this.positions.length;Z++){const ae=this.positions[Z],{row:ve,lane:W}=this.cells[Z],J=f(ve+.5,W)-f(ve-.5,W);this.dummy.position.set(ae.x-c,ae.y+f(ve,W),ae.z+E+this.rail.value),this.dummy.rotation.set(J*.024*(1-m),0,0),this.dummy.scale.setScalar(y.has(zc(this.cells[Z]))||(t||!this.looping)&&Z>=160?0:1),this.dummy.updateMatrix();for(const ee of this.instances)ee.setMatrixAt(Z,this.dummy.matrix)}for(const Z of this.instances)Z.instanceMatrix.needsUpdate=!0;this.model.position.set(a.x-c,a.y+f(o,l)+this.lift.value,a.z+E+this.rail.value),this.model.rotation.set((f(o+.5,l)-f(o-.5,l))*.024*(1-m)*(1-kt(this.lift.value/.4)),t?0:this.rotation,0);const M=kt((r-22.6)/1.6),w=kt((r-24.25)/2.25),A=$e.degToRad(89-22*M-8*w),v=$e.degToRad(3+40*kt((r-21.96)/.22)-8*M-16*w),S=$e.lerp($e.lerp(10.8,10.3,M),7.33,w),P=$e.lerp($e.lerp(28+7*M,140,w),72,m),N=new D(-1.091,$e.lerp(-2.55+.4*M,-.045,w),$e.lerp(2.48,.481,w)).clone(),O=new D(-Math.sin(A)*Math.cos(v),Math.sin(v),Math.cos(A)*Math.cos(v));if(t){const Z=kt((r-27.3)/1.3),ae=kt((r-28.6)/5.4),ve=A-$e.degToRad(9*Z+32*ae),W=v-$e.degToRad(1.5*Z+3.7*ae);O.set(-Math.sin(ve)*Math.cos(W),Math.sin(W),Math.cos(ve)*Math.cos(W))}else O.lerp(new D(-.277,.238,.931),m).normalize();if(t){const Z=kt((r-25.4)/.95),ae=new D().crossVectors(new D(0,1,0),O).normalize();N.addScaledVector(ae,-2.05*(1-Z)*kt((r-24.2)/.8))}if(t&&r>=25.05&&r<=27.3){const Z=kt((r-25.4)/1.05),ae=new D().crossVectors(new D(0,1,0),O).normalize(),ve=new D().crossVectors(O,ae).normalize(),W=1080/S,J=this.model.position.clone().add(new D(-2.5,3.7,0));J.addScaledVector(ae,-($e.lerp(840,518,Z)-960)/W),J.addScaledVector(ve,-(540-$e.lerp(340,288,Z))/W),N.lerp(J,kt((r-25.05)/.35))}if(t&&r>27.3){const Z=kt((r-27.3)/6.7),ae=kt((r-27.3)/1.25),ve=$e.lerp(518-98*ae,618,Z),W=$e.lerp(296+34*ae,287,Z),J=1080/$e.lerp(S,5.9,m),ee=new D().crossVectors(new D(0,1,0),O).normalize(),Ce=new D().crossVectors(O,ee).normalize(),xe=this.model.position.clone().add(new D(-2.5,3.7,0));xe.addScaledVector(ee,-(ve-960)/J),xe.addScaledVector(Ce,-(540-W)/J),N.lerp(xe,kt((r-27.3)/.5))}if(!t){const Z=new D().crossVectors(new D(0,1,0),O).normalize(),ae=new D().crossVectors(O,Z).normalize(),ve=1080/$e.lerp(S,5.9,m),W=this.model.position.clone().add(new D(0,1.85,0));W.addScaledVector(Z,410/ve),W.addScaledVector(ae,20/ve),N.lerp(W,m)}const V=N.clone().addScaledVector(O,P);!t&&!this.reduced&&(V.x+=this.pointer.x*.12,V.y-=this.pointer.y*.12);const B=t?1:1-Math.exp(-i*5);this.camera.position.lerp(V,B),this.cameraAim.lerp(N,B),this.camera.lookAt(this.cameraAim),this.camera.fov=$e.lerp(this.camera.fov,$e.radToDeg(2*Math.atan($e.lerp(S,5.9,m)/(2*P))),B);const F=this.scene.fog,L=this.camera.position.distanceTo(this.cameraAim);F.near=L+$e.lerp(5,-1,m),F.far=L+$e.lerp(25,12,m),this.camera.updateProjectionMatrix(),this.camera.updateMatrixWorld();let K=-1/0;const q=l,ie=o;for(let Z=ie-5;Z<=ie+5;Z++)Z!==ie&&(K=Math.max(K,-4.6+f(Z,q)+3.76));for(const Z of this.outgoing)Z.cell.lane===q&&Math.abs(Z.cell.row-ie)<=5&&(K=Math.max(K,Z.group.position.y+3.76));this.clearance=this.model.position.y-K,this.canInspect=!t&&!!this.targetDetail&&m>.9&&this.pulseGain<.01&&this.clearance>.3,this.container.dataset.inspection=this.returnY!==null?"aligning":this.canInspect?"ready":this.targetDetail?"lifting":"preview";const ue=this.model.position.clone().add(new D(0,2,0)).applyMatrix4(this.camera.matrixWorldInverse),ne=this.bokeh.uniforms;ne.focus.value=-ue.z,ne.aperture.value=$e.lerp(3e-4,8e-4,m),this.renderer.info.reset(),this.discFx?.update(e,this.model,this.renderer.getPixelRatio(),this.canInspect),this.composer.render()}projectCard(e,t){this.model.updateMatrixWorld(!0);const i=this.model.localToWorld(new D(e,t,.255)).project(this.camera);return[(i.x+1)*960,(1-i.y)*540]}get detailVisibility(){return kt((this.detail-.25)/.55)}getStats(){this.model.updateMatrixWorld(!0);const e=(t,i,n)=>{const r=this.model.localToWorld(new D(t,i,n)).project(this.camera);return[Math.round((r.x+1)*960),Math.round((1-r.y)*540)]};return{topLeft:e(-2.5,3.7,0),center:e(0,1.8,.255),topRight:e(2.5,3.7,0),labelTopLeft:e(-1.855,3.27,.255),labelBottomLeft:e(-1.855,2.81,.255),modelPosition:this.model.position.toArray().map(t=>Math.round(t*1e4)/1e4),cameraPosition:this.camera.position.toArray().map(t=>Math.round(t*1e4)/1e4),fieldOfView:this.camera.fov,loaded:this.loaded,discPlayback:this.discPlayback,drawCalls:this.renderer.info.render.calls,triangles:this.renderer.info.render.triangles,archiveCount:this.positions.length,returningFiles:this.outgoing.length,selectionPhase:this.pendingPulse?"lifting":this.pulses.length?"wave":"settled",pendingPulse:this.pendingPulse?{...this.pendingPulse}:null,pulses:this.pulses.map(t=>({...t})),referenceTime:Math.round((this.scanTime+5)*100)/100,selectedSlot:this.selectedSlot,selectedLane:Math.floor(this.selectedSlot/32),selectedCell:{...this.selectedCell},coordinateOrigin:{...this.coordinateOrigin},poolBounds:{minLane:Math.min(...this.cells.map(t=>t.lane)),maxLane:Math.max(...this.cells.map(t=>t.lane)),minRow:Math.min(...this.cells.map(t=>t.row)),maxRow:Math.max(...this.cells.map(t=>t.row))},laneFocus:this.laneFocus.value,columnCamera:this.columnCamera.value,rotation:this.rotation,clearance:this.clearance,canInspect:this.canInspect,returnPhase:this.returnY!==null?"aligning":"lowering",extraction:Math.round(this.lift.value*1e3)/1e3,appearance:Math.round(kt(this.lift.value/.4)*1e3)/1e3,cameraDetail:Math.round(this.detail*1e3)/1e3,idleGain:this.idleGain,cameraDistance:this.camera.position.distanceTo(this.cameraAim),fogNear:this.scene.fog.near,fogFar:this.scene.fog.far,returningAppearance:this.outgoing.map(t=>({slot:t.slot,cell:{...t.cell},lift:t.lift.value,quality:kt(t.lift.value/.4),rotation:t.group.rotation.y,worldY:t.group.position.y,phase:t.returnY!==null?"aligning":"lowering"})),rail:Math.round(this.rail.value*1e3)/1e3}}}const yp={type:"change"},Ju={type:"start"},Vm={type:"end"},Xo=new sa,Mp=new hs,Y1=Math.cos(70*$e.DEG2RAD),$t=new D,Mi=2*Math.PI,mt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Hc=1e-6;class q1 extends qv{constructor(e,t=null){super(e,t),this.state=mt.NONE,this.target=new D,this.cursor=new D,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Dr.ROTATE,MIDDLE:Dr.DOLLY,RIGHT:Dr.PAN},this.touches={ONE:Cr.ROTATE,TWO:Cr.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new D,this._lastQuaternion=new cn,this._lastTargetPosition=new D,this._quat=new cn().setFromUnitVectors(e.up,new D(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Lf,this._sphericalDelta=new Lf,this._scale=1,this._panOffset=new D,this._rotateStart=new De,this._rotateEnd=new De,this._rotateDelta=new De,this._panStart=new De,this._panEnd=new De,this._panDelta=new De,this._dollyStart=new De,this._dollyEnd=new De,this._dollyDelta=new De,this._dollyDirection=new D,this._mouse=new De,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=j1.bind(this),this._onPointerDown=$1.bind(this),this._onPointerUp=K1.bind(this),this._onContextMenu=nE.bind(this),this._onMouseWheel=Q1.bind(this),this._onKeyDown=eE.bind(this),this._onTouchStart=tE.bind(this),this._onTouchMove=iE.bind(this),this._onMouseDown=Z1.bind(this),this._onMouseMove=J1.bind(this),this._interceptControlDown=sE.bind(this),this._interceptControlUp=rE.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(yp),this.update(),this.state=mt.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const t=this.object.position;$t.copy(t).sub(this.target),$t.applyQuaternion(this._quat),this._spherical.setFromVector3($t),this.autoRotate&&this.state===mt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,n=this.maxAzimuthAngle;isFinite(i)&&isFinite(n)&&(i<-Math.PI?i+=Mi:i>Math.PI&&(i-=Mi),n<-Math.PI?n+=Mi:n>Math.PI&&(n-=Mi),i<=n?this._spherical.theta=Math.max(i,Math.min(n,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+n)/2?Math.max(i,this._spherical.theta):Math.min(n,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if($t.setFromSpherical(this._spherical),$t.applyQuaternion(this._quatInverse),t.copy(this.target).add($t),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=$t.length();a=this._clampDistance(o*this._scale);const l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const o=new D(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new D(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=$t.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Xo.origin.copy(this.object.position),Xo.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Xo.direction))<Y1?this.object.lookAt(this.target):(Mp.setFromNormalAndCoplanarPoint(this.object.up,this.target),Xo.intersectPlane(Mp,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Hc||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Hc||this._lastTargetPosition.distanceToSquared(this.target)>Hc?(this.dispatchEvent(yp),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Mi/60*this.autoRotateSpeed*e:Mi/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){$t.setFromMatrixColumn(t,0),$t.multiplyScalar(-e),this._panOffset.add($t)}_panUp(e,t){this.screenSpacePanning===!0?$t.setFromMatrixColumn(t,1):($t.setFromMatrixColumn(t,0),$t.crossVectors(this.object.up,$t)),$t.multiplyScalar(e),this._panOffset.add($t)}_pan(e,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const n=this.object.position;$t.copy(n).sub(this.target);let r=$t.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/i.clientHeight,this.object.matrix),this._panUp(2*t*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),n=e-i.left,r=t-i.top,a=i.width,o=i.height;this._mouse.x=n/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Mi*this._rotateDelta.x/t.clientHeight),this._rotateUp(Mi*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Mi*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Mi*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Mi*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Mi*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),n=.5*(e.pageY+t.y);this._rotateStart.set(i,n)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),n=.5*(e.pageY+t.y);this._panStart.set(i,n)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,n=e.pageY-t.y,r=Math.sqrt(i*i+n*n);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),n=.5*(e.pageX+i.x),r=.5*(e.pageY+i.y);this._rotateEnd.set(n,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Mi*this._rotateDelta.x/t.clientHeight),this._rotateUp(Mi*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),n=.5*(e.pageY+t.y);this._panEnd.set(i,n)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,n=e.pageY-t.y,r=Math.sqrt(i*i+n*n);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new De,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function $1(s){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(s.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(s)&&(this._addPointer(s),s.pointerType==="touch"?this._onTouchStart(s):this._onMouseDown(s),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function j1(s){this.enabled!==!1&&(s.pointerType==="touch"?this._onTouchMove(s):this._onMouseMove(s))}function K1(s){switch(this._removePointer(s),this._pointers.length){case 0:this.domElement.releasePointerCapture(s.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Vm),this.state=mt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function Z1(s){let e;switch(s.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Dr.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(s),this.state=mt.DOLLY;break;case Dr.ROTATE:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=mt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=mt.ROTATE}break;case Dr.PAN:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=mt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=mt.PAN}break;default:this.state=mt.NONE}this.state!==mt.NONE&&this.dispatchEvent(Ju)}function J1(s){switch(this.state){case mt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(s);break;case mt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(s);break;case mt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(s);break}}function Q1(s){this.enabled===!1||this.enableZoom===!1||this.state!==mt.NONE||(s.preventDefault(),this.dispatchEvent(Ju),this._handleMouseWheel(this._customWheelEvent(s)),this.dispatchEvent(Vm))}function eE(s){this.enabled!==!1&&this._handleKeyDown(s)}function tE(s){switch(this._trackPointer(s),this._pointers.length){case 1:switch(this.touches.ONE){case Cr.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(s),this.state=mt.TOUCH_ROTATE;break;case Cr.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(s),this.state=mt.TOUCH_PAN;break;default:this.state=mt.NONE}break;case 2:switch(this.touches.TWO){case Cr.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(s),this.state=mt.TOUCH_DOLLY_PAN;break;case Cr.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(s),this.state=mt.TOUCH_DOLLY_ROTATE;break;default:this.state=mt.NONE}break;default:this.state=mt.NONE}this.state!==mt.NONE&&this.dispatchEvent(Ju)}function iE(s){switch(this._trackPointer(s),this.state){case mt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(s),this.update();break;case mt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(s),this.update();break;case mt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(s),this.update();break;case mt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(s),this.update();break;default:this.state=mt.NONE}}function nE(s){this.enabled!==!1&&s.preventDefault()}function sE(s){s.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function rE(s){s.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Gc=[{id:"fasteners",label:"紧固件",en:"FASTENERS",depth:2.75},{id:"cover",label:"透明盖板",en:"OPTICAL COVER",depth:1.85},{id:"optical-lenses",label:"折射环组",en:"REFRACTIVE RINGS",depth:.75},{id:"optical-core",label:"记忆核心",en:"OPTICAL CORE",depth:-.15},{id:"substrate",label:"感官基板",en:"SUBSTRATE",depth:-1.1},{id:"carrier",label:"背板与框架",en:"CARRIER",depth:-2.05}];class aE{root;canvasHost;renderer;scene=new Vu;camera=new ui(34,16/9,.3,120);controls;source;groups=new Map;spread={value:0,velocity:0};targetSpread=0;lastTime=0;request=0;reduced=!1;loading=!1;closing=!1;transitions=[];transitionId=0;status="";opener=null;siblings=[];initialCamera=new D(7.2,3.8,12);onClose;provider;isOpen=!1;constructor(e,t){this.onClose=t,this.root=document.createElement("section"),this.root.className="model-viewer",this.root.hidden=!0,this.root.setAttribute("role","dialog"),this.root.setAttribute("aria-modal","true"),this.root.setAttribute("aria-labelledby","viewer-title"),this.root.innerHTML=`
      <div class="viewer-canvas"></div>
      <div class="scene-atmosphere viewer-atmosphere" aria-hidden="true"></div>
      <header class="viewer-header">
        <button class="viewer-back" data-viewer="close">← <span>返回记忆</span><kbd>ESC</kbd></button>
        <div class="viewer-heading"><span>MEMORY MARKET / OBJECT STUDY</span><h2 id="viewer-title">记忆匣模型</h2><p id="viewer-file"></p></div>
        <span class="viewer-index">360<span>°</span></span>
      </header>
      <aside class="viewer-parts" aria-label="模型装配结构"><div>ASSEMBLY / 装配结构</div>${Gc.map((i,n)=>`<p><span>${String(n+1).padStart(2,"0")}</span><strong>${i.label}</strong><small>${i.en}</small></p>`).join("")}</aside>
      <div class="viewer-loading" role="status"><span>正在载入模型…</span><button data-viewer="retry" hidden>重新载入 ↗</button></div>
      <footer class="viewer-footer">
        <div class="viewer-help"><span>拖动旋转</span><span>↑ ↓ ← → 平移</span><span>滚轮缩放</span></div>
        <div class="viewer-actions"><button data-viewer="explode" aria-pressed="false"><span>＋</span> 拆解记忆匣</button><button data-viewer="assemble" aria-pressed="true"><span>−</span> 一键重组</button></div>
        <button class="viewer-reset" data-viewer="reset">复位视角 <span>↗</span></button>
      </footer>
      <div class="viewer-state" aria-live="polite">已组装</div>`,e.appendChild(this.root),this.canvasHost=this.root.querySelector(".viewer-canvas"),this.renderer=new Rm({antialias:!0,powerPreference:"high-performance"}),this.renderer.toneMapping=eo,this.renderer.toneMappingExposure=1.05,this.renderer.domElement.tabIndex=0,this.renderer.domElement.setAttribute("aria-label","记忆匣三维模型：拖动旋转，方向键平移，滚轮或加减键缩放，Home 复位"),this.canvasHost.appendChild(this.renderer.domElement),this.scene.background=new Le("#eae5e1"),this.scene.fog=new Ll("#eae5e1",13.5,26.5),Lm(this.renderer,this.scene),this.camera.position.copy(this.initialCamera),this.controls=new q1(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=.085,this.controls.rotateSpeed=.65,this.controls.zoomSpeed=.7,this.controls.panSpeed=.7,this.controls.minDistance=5,this.controls.maxDistance=28,this.controls.maxTargetRadius=5,this.controls.screenSpacePanning=!0,this.controls.enabled=!1,this.controls.update(),this.root.addEventListener("click",i=>{if(this.closing)return;const n=i.target.closest("[data-viewer]")?.dataset.viewer;n==="close"&&this.close(),n==="retry"&&this.load(),!(this.loading||!this.source)&&(n==="explode"&&this.setExploded(!0),n==="assemble"&&this.setExploded(!1),n==="reset"&&this.resetView())}),this.root.addEventListener("keydown",i=>this.keydown(i))}open(e,t,i,n){this.isOpen||(this.isOpen=!0,this.closing=!1,this.reduced=n,this.provider=i,this.opener=document.activeElement,this.siblings=[...this.root.parentElement.children].filter(r=>r instanceof HTMLElement&&r!==this.root).map(r=>({node:r,inert:r.inert})),this.siblings.forEach(({node:r})=>r.inert=!0),this.root.hidden=!1,this.root.dataset.transition="opening",this.root.querySelector("#viewer-title").textContent=t,this.root.querySelector("#viewer-file").textContent="FILE "+e+" / MEMORY DATABASE",this.spread={value:0,velocity:0},this.targetSpread=0,this.lastTime=0,this.root.dataset.exploded="false",this.resetView(),this.resize(),this.renderer.domElement.focus({preventScroll:!0}),this.enter(),this.load())}async load(){if(!this.provider||this.loading)return;const e=++this.request;this.loading=!0,this.controls.enabled=!1;const t=this.root.querySelector(".viewer-loading");t.hidden=!1,t.querySelector("span").textContent="正在载入模型…",t.querySelector("button").hidden=!0,this.setButtonsDisabled(!0);try{const i=await this.provider();if(!this.isOpen||this.closing||e!==this.request){i.dispose();return}this.source=i;for(const n of Gc){const r=new ki;r.name=n.id,this.groups.set(n.id,r)}for(const n of[...i.model.children])this.groups.get(n.userData.assemblyPart??"cover")?.add(n);for(const n of this.groups.values())i.model.add(n);i.model.position.set(0,-1.85,0),this.scene.add(i.model),this.loading=!1,t.hidden=!0,this.controls.enabled=!0,this.setButtonsDisabled(!1),this.setExploded(!1),this.setStatus("已组装"),this.update(this.lastTime),this.reduced||this.transitions.push(this.canvasHost.animate([{opacity:0,transform:"scale(0.97)"},{opacity:1,transform:"scale(1)"}],{duration:380,easing:"cubic-bezier(0.22, 1, 0.36, 1)"}))}catch(i){if(!this.isOpen||this.closing||e!==this.request)return;this.loading=!1,t.querySelector("span").textContent="模型载入失败，请重试",t.querySelector("button").hidden=!1,console.error("Model viewer failed to load",i)}}enter(){const e=++this.transitionId;if(this.transitions.forEach(i=>i.cancel()),this.transitions=[],this.reduced){this.root.dataset.transition="open";return}const t=this.root.animate([{opacity:0},{opacity:1}],{duration:320,easing:"cubic-bezier(0.22, 1, 0.36, 1)"});this.transitions.push(t);for(const i of[".viewer-header",".viewer-footer",".viewer-state"]){const n=this.root.querySelector(i);this.transitions.push(n.animate([{opacity:0,translate:"0 10px"},{opacity:1,translate:"0 0"}],{duration:300,delay:60,fill:"backwards",easing:"cubic-bezier(0.22, 1, 0.36, 1)"}))}t.finished.then(()=>{e===this.transitionId&&(this.root.dataset.transition="open")}).catch(()=>{})}close(){if(!this.isOpen||this.closing)return;this.closing=!0,this.request++,this.loading=!1,this.controls.enabled=!1,this.setButtonsDisabled(!0);const e=++this.transitionId,t=getComputedStyle(this.root).opacity,i=getComputedStyle(this.canvasHost),n=i.opacity,r=i.transform;if(this.transitions.forEach(o=>o.cancel()),this.transitions=[],this.root.dataset.transition="closing",this.reduced){this.finishClose();return}const a=this.root.animate([{opacity:t},{opacity:0}],{duration:220,easing:"cubic-bezier(0.4, 0, 1, 1)",fill:"forwards"});this.transitions.push(a,this.canvasHost.animate([{transform:r,opacity:n},{transform:"scale(0.97)",opacity:0}],{duration:220,easing:"cubic-bezier(0.4, 0, 1, 1)",fill:"forwards"})),a.finished.then(()=>{e===this.transitionId&&this.finishClose()}).catch(()=>{})}finishClose(){this.isOpen=!1,this.closing=!1,this.root.hidden=!0,this.transitions.forEach(e=>e.cancel()),this.transitions=[],this.source&&(this.scene.remove(this.source.model),this.source.dispose(),this.source=void 0),this.groups.clear(),this.siblings.forEach(({node:e,inert:t})=>e.inert=t),this.siblings=[],this.opener?.focus({preventScroll:!0}),this.onClose()}setButtonsDisabled(e){for(const t of["explode","assemble","reset"])this.root.querySelector(`[data-viewer="${t}"]`).disabled=e}setExploded(e){this.targetSpread=e?1:0,this.root.dataset.exploded=String(e),this.root.querySelector('[data-viewer="explode"]').setAttribute("aria-pressed",String(e)),this.root.querySelector('[data-viewer="assemble"]').setAttribute("aria-pressed",String(!e)),this.setStatus(e?"正在拆解":this.spread.value>.001?"正在重组":"已组装"),this.reduced&&(this.spread={value:this.targetSpread,velocity:0})}setStatus(e){e!==this.status&&(this.status=e,this.root.querySelector(".viewer-state").textContent=e)}resetView(){this.controls.enabled=!1,this.controls.enableDamping=!1,this.controls.update(),this.controls.target.set(0,0,0),this.camera.position.copy(this.initialCamera),this.controls.enableDamping=!1,this.controls.update(),this.controls.enableDamping=!this.reduced,this.controls.enabled=this.isOpen&&!this.loading&&!!this.source}keydown(e){if(e.stopPropagation(),e.key==="Escape"){e.preventDefault(),this.close();return}if(this.closing){e.preventDefault();return}if(e.key==="Tab"){const t=[...this.root.querySelectorAll('button:not([disabled]):not([hidden]),canvas[tabindex="0"]')],i=t[0],n=t.at(-1);e.shiftKey&&document.activeElement===i&&(e.preventDefault(),n?.focus()),!e.shiftKey&&document.activeElement===n&&(e.preventDefault(),i?.focus());return}if(!(!this.source||this.loading)){if(e.key==="Home"){e.preventDefault(),this.resetView();return}if(["+","=","-"].includes(e.key)){e.preventDefault();const t=this.camera.position.distanceTo(this.controls.target),i=$e.clamp(t*(e.key==="-"?1.12:1/1.12),5,28);this.camera.position.sub(this.controls.target).multiplyScalar(i/t).add(this.controls.target),this.controls.update();return}if(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(e.key)){e.preventDefault();const t=new D().setFromMatrixColumn(this.camera.matrix,0),i=new D().setFromMatrixColumn(this.camera.matrix,1),n=new D,r=this.camera.position.distanceTo(this.controls.target)*.025;e.key==="ArrowLeft"&&n.addScaledVector(t,-r),e.key==="ArrowRight"&&n.addScaledVector(t,r),e.key==="ArrowUp"&&n.addScaledVector(i,r),e.key==="ArrowDown"&&n.addScaledVector(i,-r),this.camera.position.add(n),this.controls.target.add(n),this.controls.update()}}}resize(){if(!this.isOpen)return;const e=this.canvasHost.clientWidth,t=this.canvasHost.clientHeight;this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.5)*Math.min(innerWidth/1920,innerHeight/1080)),this.renderer.setSize(e,t),this.camera.aspect=e/t,this.camera.updateProjectionMatrix()}update(e){if(!this.isOpen)return;const t=Math.min(this.lastTime?e-this.lastTime:1/60,.05);if(this.lastTime=e,this.source){Bs(this.spread,this.targetSpread,this.reduced?45:5.5,t),Math.abs(this.spread.value-this.targetSpread)<1e-4&&Math.abs(this.spread.velocity)<.001&&(this.spread={value:this.targetSpread,velocity:0},this.setStatus(this.targetSpread?"已拆解":"已组装"));for(const r of Gc)this.groups.get(r.id).position.z=r.depth*this.spread.value}this.controls.update();const i=this.scene.fog,n=this.camera.position.length();i.near=Math.max(0,n-1),i.far=n+12,this.renderer.render(this.scene,this.camera),this.root.dataset.stats=JSON.stringify({ready:!!this.source,spread:this.spread.value,target:this.targetSpread,distance:this.camera.position.distanceTo(this.controls.target),targetPosition:this.controls.target.toArray(),azimuth:this.controls.getAzimuthalAngle(),polar:this.controls.getPolarAngle(),parts:[...this.groups].map(([r,a])=>({id:r,z:a.position.z,meshes:a.children.length}))})}}class oE{constructor(e){this.host=e,this.value=e.textContent??"",this.text=document.createElement("span"),this.text.textContent=this.value,e.replaceChildren(this.text),e.classList.add("scrub-title")}host;text;value;lastChange=-1/0;timer;animation;obscured=!1;update(e,t){if(!t){this.reset(),this.value=this.text.textContent=e,this.lastChange=-1/0;return}if(e===this.value)return;const i=performance.now(),n=i-this.lastChange<240;if(this.lastChange=i,this.value=e,clearTimeout(this.timer),!this.obscured&&!n){this.text.textContent=e;return}this.obscured||(this.host.style.width=`${Math.max(88,this.host.offsetWidth)}px`,this.obscured=!0,this.host.dataset.scrubbing="true",this.text.style.opacity="0",this.animation?.cancel(),this.animation=this.text.animate([{opacity:1},{opacity:.28,offset:.35},{opacity:1,offset:.7},{opacity:0}],{duration:140,easing:"steps(1, end)"})),this.text.textContent=e,this.timer=setTimeout(()=>this.reveal(),260)}reveal(){this.animation?.cancel(),this.obscured=!1,delete this.host.dataset.scrubbing,this.host.style.width="",this.text.style.opacity="",this.animation=this.host.animate([{opacity:.2},{opacity:1,offset:.35},{opacity:.5,offset:.6},{opacity:1}],{duration:180,easing:"steps(1, end)"})}reset(){clearTimeout(this.timer),this.animation?.cancel(),this.animation=void 0,this.obscured=!1,delete this.host.dataset.scrubbing,this.host.style.width="",this.text.style.opacity="",this.lastChange=-1/0}}const ri=(s,e,t)=>Math.max(0,Math.min(1,(s-e)/(t-e))),Aa=s=>s*s*(3-2*s),br=(s,e,t,i)=>s.slice(0,e<t?0:Math.min(s.length,1+Math.floor((e-t)*(s.length-1)/(i-t)))),cs=(s,e)=>e.includes(s),lE=[1,1,3,4,5,6,9,11,12,14,17,18,19,20,22,23,25,26];function cE(s){const e=s+5,t=Math.floor(e*25+1e-5),i=e<9.12?"access":e<11.12?"logo":e<19.48?"auth":e<22.76?"scan":"welcome";let n="";t<363?(n=br("ID CONFIRMED",t,282,295),t>=320&&(n+=" : "+br("VISITOR 049",t,321,339))):t<421?n=br("REQUEST RECEIVED",t,367,389):(n=br("START PROCESSING",t,423,440),t>=449&&(n+=".".repeat(Math.min(3,1+Math.floor((t-449)/4)))),cs(t,[479,485,486])&&(n="              SING..."));const r=248+652*Math.exp(-Math.max(0,e-20)*2.8),a=cs(t,[525,526,528,529]),o=[1,0,.28,0,1,0,0],l=t-569,c=Aa(ri(e,26.56,26.92));return{t:e,f:t,step:i,auth:n,access:"ACCESS PERMISSION REQUIRED".slice(0,t<170?0:lE[Math.min(17,t-170)]),accessOpacity:t>=170&&t<227?t===226?.25:1:0,logoOpacity:e>=9.16&&e<19.48?cs(t,[461,471,475])?.55:1:0,logoLeft:1-Math.pow(1-ri(e,10.6,11.84),3),drawTop:Aa(ri(e,9.16,9.4)),drawLeft:ri(e,9.36,9.64),drawRight:ri(e,9.58,10.04),logoLetters:br("MEMORY·MM",t,232,255),plus:ri(e,9.88,10),minus:ri(e,10.08,10.24),plusAngle:90*Aa(ri(e,10.24,10.72)),authOpacity:t>=281&&t<487?1:0,brand:[11.12,11.2,11.28].map(h=>ri(e,h,h+.2)),brandX:205*Math.pow(1-ri(e,11.12,11.84),3),poweredLetters:br("POWERED BY RHINE LAB",t,279,295).length,scanVisible:e>=19.48&&e<22.76,scanRadius:r,ringScale:a?1.94:1,ringOpacity:a?.32:ri(e,19.68,19.96),scanTracking:31*(1-ri(e,19.48,20.44)),scanFont:22+14*(1-ri(e,19.48,20.44)),permissionOpacity:e<21.84?ri(e,19.48,19.88):cs(t,[547,550])?.05:0,ornament:e>=21.84,coreRadius:cs(t,[546,547,549,550])?42:5,welcomeVisible:e>=22.76&&e<26.92,welcomePanel:l>=0&&l<7?o[l]:0,welcomeInk:l>=0&&l<7?[0,0,.2,1,0,0,.25][l]:1,companyVisible:t>=588&&!cs(t,[590,591]),companyMask:cs(t,[594,595]),highlight:ri(e,23.52,24.04),databaseOpacity:t<626||cs(t,[628,629,631,634])?0:1,welcomeLogo:t>=588,welcomeScale:1-.46*c,welcomeOpacity:1-Math.pow(c,3),exitBlur:8*c,exit:c,backgroundOpacity:e<26.92?1:0,white:Aa(ri(e,26.16,26.88))}}const bp="http://www.w3.org/2000/svg",Sr=(s,e,t,i=960,n=540)=>{const r=a=>`${i+Math.cos(a)*s},${n+Math.sin(a)*s}`;return`M${r(e)}A${s},${s} 0 ${t>Math.PI?1:0} 1 ${r(e+Math.min(t,Math.PI*1.999))}`};class hE{constructor(e){this.stage=e,[".access-text",".boot-logo",".auth-status","#auth-message",".scan",".scan > span",".welcome",".welcome-heading",".welcome-panel",".welcome-company",".welcome-highlight",".welcome-database",".welcome-logo",".brand",".powered","#boot-background",".boot-background svg",".boot-white"].forEach(r=>this.nodes.set(r,e.querySelector(r)));const t=e.querySelector(".boot-logo svg"),i=t.querySelector("path");this.strokes=k1.map(r=>{const a=i.cloneNode();return a.setAttribute("d",r),a.setAttribute("pathLength","1"),a.style.strokeDasharray="1",t.insertBefore(a,i),a}),i.remove();const n=t.querySelector("path:not([pathLength])");this.plus=document.createElementNS(bp,"path"),this.plus.setAttribute("d","M44 70h50M69 45v50"),this.minus=document.createElementNS(bp,"path"),this.minus.setAttribute("d","M219 70h44"),[this.plus,this.minus].forEach(r=>{r.setAttribute("stroke","currentColor"),r.setAttribute("stroke-width","15"),t.insertBefore(r,n)}),n.remove(),this.letters=t.querySelector("text"),this.letters.setAttribute("text-anchor","start"),this.letters.setAttribute("x","20"),this.brandLines=Array.from(e.querySelector(".brand").children),this.scanPaths=Array.from(e.querySelectorAll(".scan path")),this.orbitDots=Array.from(e.querySelectorAll(".scan .orbit-dot")),this.core=e.querySelector(".scan .scan-core"),this.poweredHTML=this.el(".powered").innerHTML}stage;nodes=new Map;strokes;letters;plus;minus;brandLines;scanPaths;orbitDots;core;poweredHTML;el(e){return this.nodes.get(e)}opacity(e,t){this.el(e).style.opacity=String(Number(t))}update(e){const t=cE(e),i=t.t;return this.stage.dataset.bootFrame=String(t.f),this.el(".access-text").textContent=t.access,this.opacity(".access-text",t.accessOpacity),this.opacity(".boot-logo",t.logoOpacity),this.el(".boot-logo").style.transform=`translateX(${294*(1-t.logoLeft)}px)`,this.strokes.forEach((n,r)=>n.style.strokeDashoffset=String(1-[t.drawTop,t.drawLeft,t.drawRight][r])),this.letters.textContent=t.logoLetters,this.plus.style.opacity=String(t.plus),this.minus.style.opacity=String(t.minus),this.plus.setAttribute("transform",`rotate(${t.plusAngle} 69 70)`),this.opacity(".auth-status",t.authOpacity),this.el("#auth-message").textContent=t.auth,this.opacity(".brand",1),this.el(".brand").style.transform=`translateX(${t.brandX}px)`,this.brandLines.forEach((n,r)=>n.style.opacity=String(t.brand[r])),this.opacity(".powered",t.poweredLetters>0),this.el(".powered").style.clipPath=`inset(0 ${100*(1-t.poweredLetters/19)}% 0 0)`,this.opacity(".scan",t.scanVisible),t.scanVisible&&this.renderScan(t),this.opacity(".welcome",t.welcomeVisible?t.welcomeOpacity:0),this.el(".welcome").style.transform=`scale(${t.welcomeScale})`,this.el(".welcome").style.filter=`blur(${t.exitBlur}px) invert(${t.exit*.22}) sepia(${t.exit}) saturate(${1+t.exit*5}) hue-rotate(${t.exit*115}deg)`,this.opacity(".welcome-panel",t.welcomePanel),this.opacity(".welcome-heading",1),this.el(".welcome-heading").style.color=`rgb(${255*(1-t.welcomeInk)} ${255*(1-t.welcomeInk)} ${255*(1-t.welcomeInk)})`,this.opacity(".welcome-company",t.companyVisible),this.el(".welcome-company").style.visibility=t.companyMask?"hidden":"visible",this.el(".welcome-highlight").style.clipPath=`inset(0 ${100*(1-t.highlight)}% 0 0)`,this.opacity(".welcome-database",t.databaseOpacity),this.opacity(".welcome-logo",t.welcomeLogo),this.opacity("#boot-background",t.backgroundOpacity),this.opacity(".boot-white",t.white),this.el(".boot-background svg").style.transform=`translate(${Math.sin(i*.16)*18}px, ${-(i-6)*5}px) scale(1.08)`,t}renderScan(e){const t=e.t,i=Aa(ri(t,19.76,21.8)),n=e.scanRadius,r=this.scanPaths[0].parentElement;r.setAttribute("transform",`translate(960 540) scale(${e.ringScale}) translate(-960 -540)`),r.style.opacity=String(e.ringOpacity);const a=-Math.PI/2+(1-i)*5;this.scanPaths[0].setAttribute("d",Sr(n,a,Math.PI*(1.35+.64*i))),this.scanPaths[0].setAttribute("stroke-width",String(2.4*n/256)),this.scanPaths[1].setAttribute("d",Sr(n*(.68+.23*i),-Math.PI/2-(1-i)*6,Math.PI*(1.15+.84*i))),this.scanPaths[1].setAttribute("stroke-width",String(3.6*n/256));const o=(t-19.64)*4;this.scanPaths[2].setAttribute("d",Sr(92+28*(1-i),o,2.9)),this.scanPaths[3].setAttribute("d",Sr(92+28*(1-i),o+Math.PI,1.8)),this.scanPaths[4].setAttribute("d",Sr(38,-o,4.2,830,552)),this.scanPaths[5].setAttribute("d",Sr(38,Math.PI-o,4.2,1090,528)),this.scanPaths.slice(4).forEach(c=>c.style.opacity=e.ornament?"1":"0"),this.core.style.opacity=e.ornament?"1":"0",this.core.setAttribute("r",String(e.coreRadius));const l=-Math.PI/2+(1-i)*7+.1*Math.sin(t*2);this.orbitDots.forEach((c,h)=>{c.setAttribute("cx",String(960+Math.cos(l+h*Math.PI)*(175+50*(1-i)))),c.setAttribute("cy",String(540+Math.sin(l+h*Math.PI)*(175+50*(1-i))))}),this.opacity(".scan > span",e.permissionOpacity),this.el(".scan > span").style.letterSpacing=`${e.scanTracking}px`,this.el(".scan > span").style.fontSize=`${e.scanFont}px`}reset(){[".brand",".powered"].forEach(e=>this.el(e).removeAttribute("style")),this.brandLines.forEach(e=>e.removeAttribute("style")),this.el(".powered").innerHTML=this.poweredHTML,this.opacity("#boot-background",0)}}function Bn(s){if(s===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return s}function Hm(s,e){s.prototype=Object.create(e.prototype),s.prototype.constructor=s,s.__proto__=e}var Hi={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Ga={duration:.5,overwrite:!1,delay:0},Qu,oi,Rt,Zi=1e8,xt=1/Zi,iu=Math.PI*2,uE=iu/4,dE=0,Gm=Math.sqrt,fE=Math.cos,pE=Math.sin,ni=function(e){return typeof e=="string"},Bt=function(e){return typeof e=="function"},Kn=function(e){return typeof e=="number"},ed=function(e){return typeof e>"u"},Rn=function(e){return typeof e=="object"},Ti=function(e){return e!==!1},td=function(){return typeof window<"u"},Yo=function(e){return Bt(e)||ni(e)},Wm=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},pi=Array.isArray,mE=/random\([^)]+\)/g,gE=/,\s*/g,Sp=/(?:-?\.?\d|\.)+/gi,Xm=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Rr=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Wc=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Ym=/[+-]=-?[.\d]+/,_E=/[^,'"\[\]\s]+/gi,vE=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Lt,_n,nu,id,Wi={},_l={},qm,$m=function(e){return(_l=Jr(e,Wi))&&Ri},nd=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},Wa=function(e,t){return!t&&console.warn(e)},jm=function(e,t){return e&&(Wi[e]=t)&&_l&&(_l[e]=t)||Wi},Xa=function(){return 0},xE={suppressEvents:!0,isStart:!0,kill:!1},il={suppressEvents:!0,kill:!1},yE={suppressEvents:!0},sd={},ys=[],su={},Km,Ni={},Xc={},Ep=30,nl=[],rd="",ad=function(e){var t=e[0],i,n;if(Rn(t)||Bt(t)||(e=[e]),!(i=(t._gsap||{}).harness)){for(n=nl.length;n--&&!nl[n].targetTest(t););i=nl[n]}for(n=e.length;n--;)e[n]&&(e[n]._gsap||(e[n]._gsap=new v0(e[n],i)))||e.splice(n,1);return e},Ws=function(e){return e._gsap||ad(Ji(e))[0]._gsap},Zm=function(e,t,i){return(i=e[t])&&Bt(i)?e[t]():ed(i)&&e.getAttribute&&e.getAttribute(t)||i},wi=function(e,t){return(e=e.split(",")).forEach(t)||e},Ht=function(e){return Math.round(e*1e5)/1e5||0},Dt=function(e){return Math.round(e*1e7)/1e7||0},Ur=function(e,t){var i=t.charAt(0),n=parseFloat(t.substr(2));return e=parseFloat(e),i==="+"?e+n:i==="-"?e-n:i==="*"?e*n:e/n},ME=function(e,t){for(var i=t.length,n=0;e.indexOf(t[n])<0&&++n<i;);return n<i},vl=function(){var e=ys.length,t=ys.slice(0),i,n;for(su={},ys.length=0,i=0;i<e;i++)n=t[i],n&&n._lazy&&(n.render(n._lazy[0],n._lazy[1],!0)._lazy=0)},od=function(e){return!!(e._initted||e._startAt||e.add)},Jm=function(e,t,i,n){ys.length&&!oi&&vl(),e.render(t,i,!!(oi&&t<0&&od(e))),ys.length&&!oi&&vl()},Qm=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(_E).length<2?t:ni(e)?e.trim():e},e0=function(e){return e},Xi=function(e,t){for(var i in t)i in e||(e[i]=t[i]);return e},bE=function(e){return function(t,i){for(var n in i)n in t||n==="duration"&&e||n==="ease"||(t[n]=i[n])}},Jr=function(e,t){for(var i in t)e[i]=t[i];return e},Tp=function s(e,t){for(var i in t)i!=="__proto__"&&i!=="constructor"&&i!=="prototype"&&(e[i]=Rn(t[i])?s(e[i]||(e[i]={}),t[i]):t[i]);return e},xl=function(e,t){var i={},n;for(n in e)n in t||(i[n]=e[n]);return i},Na=function(e){var t=e.parent||Lt,i=e.keyframes?bE(pi(e.keyframes)):Xi;if(Ti(e.inherit))for(;t;)i(e,t.vars.defaults),t=t.parent||t._dp;return e},SE=function(e,t){for(var i=e.length,n=i===t.length;n&&i--&&e[i]===t[i];);return i<0},t0=function(e,t,i,n,r){var a=e[n],o;if(r)for(o=t[r];a&&a[r]>o;)a=a._prev;return a?(t._next=a._next,a._next=t):(t._next=e[i],e[i]=t),t._next?t._next._prev=t:e[n]=t,t._prev=a,t.parent=t._dp=e,t},Bl=function(e,t,i,n){i===void 0&&(i="_first"),n===void 0&&(n="_last");var r=t._prev,a=t._next;r?r._next=a:e[i]===t&&(e[i]=a),a?a._prev=r:e[n]===t&&(e[n]=r),t._next=t._prev=t.parent=null},Ss=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},Xs=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var i=e;i;)i._dirty=1,i=i.parent;return e},EE=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},ru=function(e,t,i,n){return e._startAt&&(oi?e._startAt.revert(il):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,n))},TE=function s(e){return!e||e._ts&&s(e.parent)},wp=function(e){return e._repeat?Qr(e._tTime,e=e.duration()+e._rDelay)*e:0},Qr=function(e,t){var i=Math.floor(e=Dt(e/t));return e&&i===e?i-1:i},yl=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},zl=function(e){return e._end=Dt(e._start+(e._tDur/Math.abs(e._ts||e._rts||xt)||0))},Vl=function(e,t){var i=e._dp;return i&&i.smoothChildTiming&&e._ts&&(e._start=Dt(i._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),zl(e),i._dirty||Xs(i,e)),e},i0=function(e,t){var i;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(i=yl(e.rawTime(),t),(!t._dur||io(0,t.totalDuration(),i)-t._tTime>xt)&&t.render(i,!0)),Xs(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(i=e;i._dp;)i.rawTime()>=0&&i.totalTime(i._tTime),i=i._dp;e._zTime=-xt}},yn=function(e,t,i,n){return t.parent&&Ss(t),t._start=Dt((Kn(i)?i:i||e!==Lt?qi(e,i,t):e._time)+t._delay),t._end=Dt(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),t0(e,t,"_first","_last",e._sort?"_start":0),au(t)||(e._recent=t),n||i0(e,t),e._ts<0&&Vl(e,e._tTime),e},n0=function(e,t){return(Wi.ScrollTrigger||nd("scrollTrigger",t))&&Wi.ScrollTrigger.create(t,e)},s0=function(e,t,i,n,r){if(cd(e,t,r),!e._initted)return 1;if(!i&&e._pt&&!oi&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&Km!==Ui.frame)return ys.push(e),e._lazy=[r,n],1},wE=function s(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||s(t))},au=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},AE=function(e,t,i,n){var r=e.ratio,a=t<0||!t&&(!e._start&&wE(e)&&!(!e._initted&&au(e))||(e._ts<0||e._dp._ts<0)&&!au(e))?0:1,o=e._rDelay,l=0,c,h,d;if(o&&e._repeat&&(l=io(0,e._tDur,t),h=Qr(l,o),e._yoyo&&h&1&&(a=1-a),h!==Qr(e._tTime,o)&&(r=1-a,e.vars.repeatRefresh&&e._initted&&e.invalidate())),a!==r||oi||n||e._zTime===xt||!t&&e._zTime){if(!e._initted&&s0(e,t,n,i,l))return;for(d=e._zTime,e._zTime=t||(i?xt:0),i||(i=t&&!d),e.ratio=a,e._from&&(a=1-a),e._time=0,e._tTime=l,c=e._pt;c;)c.r(a,c.d),c=c._next;t<0&&ru(e,t,i,!0),e._onUpdate&&!i&&zi(e,"onUpdate"),l&&e._repeat&&!i&&e.parent&&zi(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===a&&(a&&Ss(e,1),!i&&!oi&&(zi(e,a?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},CE=function(e,t,i){var n;if(i>t)for(n=e._first;n&&n._start<=i;){if(n.data==="isPause"&&n._start>t)return n;n=n._next}else for(n=e._last;n&&n._start>=i;){if(n.data==="isPause"&&n._start<t)return n;n=n._prev}},ea=function(e,t,i,n){var r=e._repeat,a=Dt(t)||0,o=e._tTime/e._tDur;return o&&!n&&(e._time*=a/e._dur),e._dur=a,e._tDur=r?r<0?1e10:Dt(a*(r+1)+e._rDelay*r):a,o>0&&!n&&Vl(e,e._tTime=e._tDur*o),e.parent&&zl(e),i||Xs(e.parent,e),e},Ap=function(e){return e instanceof bi?Xs(e):ea(e,e._dur)},RE={_start:0,endTime:Xa,totalDuration:Xa},qi=function s(e,t,i){var n=e.labels,r=e._recent||RE,a=e.duration()>=Zi?r.endTime(!1):e._dur,o,l,c;return ni(t)&&(isNaN(t)||t in n)?(l=t.charAt(0),c=t.substr(-1)==="%",o=t.indexOf("="),l==="<"||l===">"?(o>=0&&(t=t.replace(/=/,"")),(l==="<"?r._start:r.endTime(r._repeat>=0))+(parseFloat(t.substr(1))||0)*(c?(o<0?r:i).totalDuration()/100:1)):o<0?(t in n||(n[t]=a),n[t]):(l=parseFloat(t.charAt(o-1)+t.substr(o+1)),c&&i&&(l=l/100*(pi(i)?i[0]:i).totalDuration()),o>1?s(e,t.substr(0,o-1),i)+l:a+l)):t==null?a:+t},Oa=function(e,t,i){var n=Kn(t[1]),r=(n?2:1)+(e<2?0:1),a=t[r],o,l;if(n&&(a.duration=t[1]),a.parent=i,e){for(o=a,l=i;l&&!("immediateRender"in o);)o=l.vars.defaults||{},l=Ti(l.vars.inherit)&&l.parent;a.immediateRender=Ti(o.immediateRender),e<2?a.runBackwards=1:a.startAt=t[r-1]}return new qt(t[0],a,t[r+1])},ws=function(e,t){return e||e===0?t(e):t},io=function(e,t,i){return i<e?e:i>t?t:i},di=function(e,t){return!ni(e)||!(t=vE.exec(e))?"":t[1]},PE=function(e,t,i){return ws(i,function(n){return io(e,t,n)})},ou=[].slice,r0=function(e,t){return e&&Rn(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&Rn(e[0]))&&!e.nodeType&&e!==_n},DE=function(e,t,i){return i===void 0&&(i=[]),e.forEach(function(n){var r;return ni(n)&&!t||r0(n,1)?(r=i).push.apply(r,Ji(n)):i.push(n)})||i},Ji=function(e,t,i){return Rt&&!t&&Rt.selector?Rt.selector(e):ni(e)&&!i&&(nu||!ta())?ou.call((t||id).querySelectorAll(e),0):pi(e)?DE(e,i):r0(e)?ou.call(e,0):e?[e]:[]},lu=function(e){return e=Ji(e)[0]||Wa("Invalid scope")||{},function(t){var i=e.current||e.nativeElement||e;return Ji(t,i.querySelectorAll?i:i===e?Wa("Invalid scope")||id.createElement("div"):e)}},a0=function(e){return e.sort(function(){return .5-Math.random()})},o0=function(e){if(Bt(e))return e;var t=Rn(e)?e:{each:e},i=Ys(t.ease),n=t.from||0,r=parseFloat(t.base)||0,a={},o=n>0&&n<1,l=isNaN(n)||o,c=t.axis,h=n,d=n;return ni(n)?h=d={center:.5,edges:.5,end:1}[n]||0:!o&&l&&(h=n[0],d=n[1]),function(u,f,p){var g=(p||t).length,m=a[g],_,x,E,y,M,w,A,v,S;if(!m){if(S=t.grid==="auto"?0:(t.grid||[1,Zi])[1],!S){for(A=-Zi;A<(A=p[S++].getBoundingClientRect().left)&&S<g;);S<g&&S--}for(m=a[g]=[],_=l?Math.min(S,g)*h-.5:n%S,x=S===Zi?0:l?g*d/S-.5:n/S|0,A=0,v=Zi,w=0;w<g;w++)E=w%S-_,y=x-(w/S|0),m[w]=M=c?Math.abs(c==="y"?y:E):Gm(E*E+y*y),M>A&&(A=M),M<v&&(v=M);n==="random"&&a0(m),m.max=A-v,m.min=v,m.v=g=(parseFloat(t.amount)||parseFloat(t.each)*(S>g?g-1:c?c==="y"?g/S:S:Math.max(S,g/S))||0)*(n==="edges"?-1:1),m.b=g<0?r-g:r,m.u=di(t.amount||t.each)||0,i=i&&g<0?WE(i):i}return g=(m[u]-m.min)/m.max||0,Dt(m.b+(i?i(g):g)*m.v)+m.u}},cu=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(i){var n=Dt(Math.round(parseFloat(i)/e)*e*t);return(n-n%1)/t+(Kn(i)?0:di(i))}},l0=function(e,t){var i=pi(e),n,r;return!i&&Rn(e)&&(n=i=e.radius||Zi,e.values?(e=Ji(e.values),(r=!Kn(e[0]))&&(n*=n)):e=cu(e.increment)),ws(t,i?Bt(e)?function(a){return r=e(a),Math.abs(r-a)<=n?r:a}:function(a){for(var o=parseFloat(r?a.x:a),l=parseFloat(r?a.y:0),c=Zi,h=0,d=e.length,u,f;d--;)r?(u=e[d].x-o,f=e[d].y-l,u=u*u+f*f):u=Math.abs(e[d]-o),u<c&&(c=u,h=d);return h=!n||c<=n?e[h]:a,r||h===a||Kn(a)?h:h+di(a)}:cu(e))},c0=function(e,t,i,n){return ws(pi(e)?!t:i===!0?!!(i=0):!n,function(){return pi(e)?e[~~(Math.random()*e.length)]:(i=i||1e-5)&&(n=i<1?Math.pow(10,(i+"").length-2):1)&&Math.floor(Math.round((e-i/2+Math.random()*(t-e+i*.99))/i)*i*n)/n})},IE=function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];return function(n){return t.reduce(function(r,a){return a(r)},n)}},LE=function(e,t){return function(i){return e(parseFloat(i))+(t||di(i))}},NE=function(e,t,i){return u0(e,t,0,1,i)},h0=function(e,t,i){return ws(i,function(n){return e[~~t(n)]})},OE=function s(e,t,i){var n=t-e;return pi(e)?h0(e,s(0,e.length),t):ws(i,function(r){return(n+(r-e)%n)%n+e})},UE=function s(e,t,i){var n=t-e,r=n*2;return pi(e)?h0(e,s(0,e.length-1),t):ws(i,function(a){return a=(r+(a-e)%r)%r||0,e+(a>n?r-a:a)})},Ya=function(e){return e.replace(mE,function(t){var i=t.indexOf("[")+1,n=t.substring(i||7,i?t.indexOf("]"):t.length-1).split(gE);return c0(i?n:+n[0],i?0:+n[1],+n[2]||1e-5)})},u0=function(e,t,i,n,r){var a=t-e,o=n-i;return ws(r,function(l){return i+((l-e)/a*o||0)})},FE=function s(e,t,i,n){var r=isNaN(e+t)?0:function(f){return(1-f)*e+f*t};if(!r){var a=ni(e),o={},l,c,h,d,u;if(i===!0&&(n=1)&&(i=null),a)e={p:e},t={p:t};else if(pi(e)&&!pi(t)){for(h=[],d=e.length,u=d-2,c=1;c<d;c++)h.push(s(e[c-1],e[c]));d--,r=function(p){p*=d;var g=Math.min(u,~~p);return h[g](p-g)},i=t}else n||(e=Jr(pi(e)?[]:{},e));if(!h){for(l in t)ld.call(o,e,l,"get",t[l]);r=function(p){return dd(p,o)||(a?e.p:e)}}}return ws(i,r)},Cp=function(e,t,i){var n=e.labels,r=Zi,a,o,l;for(a in n)o=n[a]-t,o<0==!!i&&o&&r>(o=Math.abs(o))&&(l=a,r=o);return l},zi=function(e,t,i){var n=e.vars,r=n[t],a=Rt,o=e._ctx,l,c,h;if(r)return l=n[t+"Params"],c=n.callbackScope||e,i&&ys.length&&vl(),o&&(Rt=o),h=l?r.apply(c,l):r.call(c),Rt=a,h},Ca=function(e){return Ss(e),e.scrollTrigger&&e.scrollTrigger.kill(!!oi),e.progress()<1&&zi(e,"onInterrupt"),e},Pr,d0=[],f0=function(e){if(e)if(e=!e.name&&e.default||e,td()||e.headless){var t=e.name,i=Bt(e),n=t&&!i&&e.init?function(){this._props=[]}:e,r={init:Xa,render:dd,add:ld,kill:eT,modifier:QE,rawVars:0},a={targetTest:0,get:0,getSetter:ud,aliases:{},register:0};if(ta(),e!==n){if(Ni[t])return;Xi(n,Xi(xl(e,r),a)),Jr(n.prototype,Jr(r,xl(e,a))),Ni[n.prop=t]=n,e.targetTest&&(nl.push(n),sd[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}jm(t,n),e.register&&e.register(Ri,n,Ai)}else d0.push(e)},vt=255,Ra={aqua:[0,vt,vt],lime:[0,vt,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,vt],navy:[0,0,128],white:[vt,vt,vt],olive:[128,128,0],yellow:[vt,vt,0],orange:[vt,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[vt,0,0],pink:[vt,192,203],cyan:[0,vt,vt],transparent:[vt,vt,vt,0]},Yc=function(e,t,i){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(i-t)*e*6:e<.5?i:e*3<2?t+(i-t)*(2/3-e)*6:t)*vt+.5|0},p0=function(e,t,i){var n=e?Kn(e)?[e>>16,e>>8&vt,e&vt]:0:Ra.black,r,a,o,l,c,h,d,u,f,p;if(!n){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),Ra[e])n=Ra[e];else if(e.charAt(0)==="#"){if(e.length<6&&(r=e.charAt(1),a=e.charAt(2),o=e.charAt(3),e="#"+r+r+a+a+o+o+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return n=parseInt(e.substr(1,6),16),[n>>16,n>>8&vt,n&vt,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),n=[e>>16,e>>8&vt,e&vt]}else if(e.substr(0,3)==="hsl"){if(n=p=e.match(Sp),!t)l=+n[0]%360/360,c=+n[1]/100,h=+n[2]/100,a=h<=.5?h*(c+1):h+c-h*c,r=h*2-a,n.length>3&&(n[3]*=1),n[0]=Yc(l+1/3,r,a),n[1]=Yc(l,r,a),n[2]=Yc(l-1/3,r,a);else if(~e.indexOf("="))return n=e.match(Xm),i&&n.length<4&&(n[3]=1),n}else n=e.match(Sp)||Ra.transparent;n=n.map(Number)}return t&&!p&&(r=n[0]/vt,a=n[1]/vt,o=n[2]/vt,d=Math.max(r,a,o),u=Math.min(r,a,o),h=(d+u)/2,d===u?l=c=0:(f=d-u,c=h>.5?f/(2-d-u):f/(d+u),l=d===r?(a-o)/f+(a<o?6:0):d===a?(o-r)/f+2:(r-a)/f+4,l*=60),n[0]=~~(l+.5),n[1]=~~(c*100+.5),n[2]=~~(h*100+.5)),i&&n.length<4&&(n[3]=1),n},m0=function(e){var t=[],i=[],n=-1;return e.split(Ms).forEach(function(r){var a=r.match(Rr)||[];t.push.apply(t,a),i.push(n+=a.length+1)}),t.c=i,t},Rp=function(e,t,i){var n="",r=(e+n).match(Ms),a=t?"hsla(":"rgba(",o=0,l,c,h,d;if(!r)return e;if(r=r.map(function(u){return(u=p0(u,t,1))&&a+(t?u[0]+","+u[1]+"%,"+u[2]+"%,"+u[3]:u.join(","))+")"}),i&&(h=m0(e),l=i.c,l.join(n)!==h.c.join(n)))for(c=e.replace(Ms,"1").split(Rr),d=c.length-1;o<d;o++)n+=c[o]+(~l.indexOf(o)?r.shift()||a+"0,0,0,0)":(h.length?h:r.length?r:i).shift());if(!c)for(c=e.split(Ms),d=c.length-1;o<d;o++)n+=c[o]+r[o];return n+c[d]},Ms=(function(){var s="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in Ra)s+="|"+e+"\\b";return new RegExp(s+")","gi")})(),kE=/hsl[a]?\(/,g0=function(e){var t=e.join(" "),i;if(Ms.lastIndex=0,Ms.test(t))return i=kE.test(t),e[1]=Rp(e[1],i),e[0]=Rp(e[0],i,m0(e[1])),!0},qa,Ui=(function(){var s=Date.now,e=500,t=33,i=s(),n=i,r=1e3/240,a=r,o=[],l,c,h,d,u,f,p=function g(m){var _=s()-n,x=m===!0,E,y,M,w;if((_>e||_<0)&&(i+=_-t),n+=_,M=n-i,E=M-a,(E>0||x)&&(w=++d.frame,u=M-d.time*1e3,d.time=M=M/1e3,a+=E+(E>=r?4:r-E),y=1),x||(l=c(g)),y)for(f=0;f<o.length;f++)o[f](M,u,w,m)};return d={time:0,frame:0,tick:function(){p(!0)},deltaRatio:function(m){return u/(1e3/(m||60))},wake:function(){qm&&(!nu&&td()&&(_n=nu=window,id=_n.document||{},Wi.gsap=Ri,(_n.gsapVersions||(_n.gsapVersions=[])).push(Ri.version),$m(_l||_n.GreenSockGlobals||!_n.gsap&&_n||{}),d0.forEach(f0)),h=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&d.sleep(),c=h||function(m){return setTimeout(m,a-d.time*1e3+1|0)},qa=1,p(2))},sleep:function(){(h?cancelAnimationFrame:clearTimeout)(l),qa=0,c=Xa},lagSmoothing:function(m,_){e=m||1/0,t=Math.min(_||33,e)},fps:function(m){r=1e3/(m||240),a=d.time*1e3+r},add:function(m,_,x){var E=_?function(y,M,w,A){m(y,M,w,A),d.remove(E)}:m;return d.remove(m),o[x?"unshift":"push"](E),ta(),E},remove:function(m,_){~(_=o.indexOf(m))&&o.splice(_,1)&&f>=_&&f--},_listeners:o},d})(),ta=function(){return!qa&&Ui.wake()},Je={},BE=/^[\d.\-M][\d.\-,\s]/,zE=/["']/g,VE=function(e){for(var t={},i=e.substr(1,e.length-3).split(":"),n=i[0],r=1,a=i.length,o,l,c;r<a;r++)l=i[r],o=r!==a-1?l.lastIndexOf(","):l.length,c=l.substr(0,o),t[n]=isNaN(c)?c.replace(zE,"").trim():+c,n=l.substr(o+1).trim();return t},HE=function(e){var t=e.indexOf("(")+1,i=e.indexOf(")"),n=e.indexOf("(",t);return e.substring(t,~n&&n<i?e.indexOf(")",i+1):i)},GE=function(e){var t=(e+"").split("("),i=Je[t[0]];return i&&t.length>1&&i.config?i.config.apply(null,~e.indexOf("{")?[VE(t[1])]:HE(e).split(",").map(Qm)):Je._CE&&BE.test(e)?Je._CE("",e):i},WE=function(e){return function(t){return 1-e(1-t)}},Ys=function(e,t){return e&&(Bt(e)?e:Je[e]||GE(e))||t},ir=function(e,t,i,n){i===void 0&&(i=function(l){return 1-t(1-l)}),n===void 0&&(n=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var r={easeIn:t,easeOut:i,easeInOut:n},a;return wi(e,function(o){Je[o]=Wi[o]=r,Je[a=o.toLowerCase()]=i;for(var l in r)Je[a+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=Je[o+"."+l]=r[l]}),r},_0=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},qc=function s(e,t,i){var n=t>=1?t:1,r=(i||(e?.3:.45))/(t<1?t:1),a=r/iu*(Math.asin(1/n)||0),o=function(h){return h===1?1:n*Math.pow(2,-10*h)*pE((h-a)*r)+1},l=e==="out"?o:e==="in"?function(c){return 1-o(1-c)}:_0(o);return r=iu/r,l.config=function(c,h){return s(e,c,h)},l},$c=function s(e,t){t===void 0&&(t=1.70158);var i=function(a){return a?--a*a*((t+1)*a+t)+1:0},n=e==="out"?i:e==="in"?function(r){return 1-i(1-r)}:_0(i);return n.config=function(r){return s(e,r)},n};wi("Linear,Quad,Cubic,Quart,Quint,Strong",function(s,e){var t=e<5?e+1:e;ir(s+",Power"+(t-1),e?function(i){return Math.pow(i,t)}:function(i){return i},function(i){return 1-Math.pow(1-i,t)},function(i){return i<.5?Math.pow(i*2,t)/2:1-Math.pow((1-i)*2,t)/2})});Je.Linear.easeNone=Je.none=Je.Linear.easeIn;ir("Elastic",qc("in"),qc("out"),qc());(function(s,e){var t=1/e,i=2*t,n=2.5*t,r=function(o){return o<t?s*o*o:o<i?s*Math.pow(o-1.5/e,2)+.75:o<n?s*(o-=2.25/e)*o+.9375:s*Math.pow(o-2.625/e,2)+.984375};ir("Bounce",function(a){return 1-r(1-a)},r)})(7.5625,2.75);ir("Expo",function(s){return Math.pow(2,10*(s-1))*s+s*s*s*s*s*s*(1-s)});ir("Circ",function(s){return-(Gm(1-s*s)-1)});ir("Sine",function(s){return s===1?1:-fE(s*uE)+1});ir("Back",$c("in"),$c("out"),$c());Je.SteppedEase=Je.steps=Wi.SteppedEase={config:function(e,t){e===void 0&&(e=1);var i=1/e,n=e+(t?0:1),r=t?1:0,a=1-xt;return function(o){return((n*io(0,a,o)|0)+r)*i}}};Ga.ease=Je["quad.out"];wi("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(s){return rd+=s+","+s+"Params,"});var v0=function(e,t){this.id=dE++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:Zm,this.set=t?t.getSetter:ud},$a=(function(){function s(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,ea(this,+t.duration,1,1),this.data=t.data,Rt&&(this._ctx=Rt,Rt.data.push(this)),qa||Ui.wake()}var e=s.prototype;return e.delay=function(i){return i||i===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+i-this._delay),this._delay=i,this):this._delay},e.duration=function(i){return arguments.length?this.totalDuration(this._repeat>0?i+(i+this._rDelay)*this._repeat:i):this.totalDuration()&&this._dur},e.totalDuration=function(i){return arguments.length?(this._dirty=0,ea(this,this._repeat<0?i:(i-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(i,n){if(ta(),!arguments.length)return this._tTime;var r=this._dp;if(r&&r.smoothChildTiming&&this._ts){for(Vl(this,i),!r._dp||r.parent||i0(r,this);r&&r.parent;)r.parent._time!==r._start+(r._ts>=0?r._tTime/r._ts:(r.totalDuration()-r._tTime)/-r._ts)&&r.totalTime(r._tTime,!0),r=r.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&i<this._tDur||this._ts<0&&i>0||!this._tDur&&!i)&&yn(this._dp,this,this._start-this._delay)}return(this._tTime!==i||!this._dur&&!n||this._initted&&Math.abs(this._zTime)===xt||!this._initted&&this._dur&&i||!i&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=i),Jm(this,i,n)),this},e.time=function(i,n){return arguments.length?this.totalTime(Math.min(this.totalDuration(),i+wp(this))%(this._dur+this._rDelay)||(i?this._dur:0),n):this._time},e.totalProgress=function(i,n){return arguments.length?this.totalTime(this.totalDuration()*i,n):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(i,n){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-i:i)+wp(this),n):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(i,n){var r=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(i-1)*r,n):this._repeat?Qr(this._tTime,r)+1:1},e.timeScale=function(i,n){if(!arguments.length)return this._rts===-xt?0:this._rts;if(this._rts===i)return this;var r=this.parent&&this._ts?yl(this.parent._time,this):this._tTime;return this._rts=+i||0,this._ts=this._ps||i===-xt?0:this._rts,this.totalTime(io(-Math.abs(this._delay),this.totalDuration(),r),n!==!1),zl(this),EE(this)},e.paused=function(i){return arguments.length?(this._ps!==i&&(this._ps=i,i?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(ta(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==xt&&(this._tTime-=xt)))),this):this._ps},e.startTime=function(i){if(arguments.length){this._start=Dt(i);var n=this.parent||this._dp;return n&&(n._sort||!this.parent)&&yn(n,this,this._start-this._delay),this}return this._start},e.endTime=function(i){return this._start+(Ti(i)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(i){var n=this.parent||this._dp;return n?i&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?yl(n.rawTime(i),this):this._tTime:this._tTime},e.revert=function(i){i===void 0&&(i=yE);var n=oi;return oi=i,od(this)&&(this.timeline&&this.timeline.revert(i),this.totalTime(-.01,i.suppressEvents)),this.data!=="nested"&&i.kill!==!1&&this.kill(),oi=n,this},e.globalTime=function(i){for(var n=this,r=arguments.length?i:n.rawTime();n;)r=n._start+r/(Math.abs(n._ts)||1),n=n._dp;return!this.parent&&this._sat?this._sat.globalTime(i):r},e.repeat=function(i){return arguments.length?(this._repeat=i===1/0?-2:i,Ap(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(i){if(arguments.length){var n=this._time;return this._rDelay=i,Ap(this),n?this.time(n):this}return this._rDelay},e.yoyo=function(i){return arguments.length?(this._yoyo=i,this):this._yoyo},e.seek=function(i,n){return this.totalTime(qi(this,i),Ti(n))},e.restart=function(i,n){return this.play().totalTime(i?-this._delay:0,Ti(n)),this._dur||(this._zTime=-xt),this},e.play=function(i,n){return i!=null&&this.seek(i,n),this.reversed(!1).paused(!1)},e.reverse=function(i,n){return i!=null&&this.seek(i||this.totalDuration(),n),this.reversed(!0).paused(!1)},e.pause=function(i,n){return i!=null&&this.seek(i,n),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(i){return arguments.length?(!!i!==this.reversed()&&this.timeScale(-this._rts||(i?-xt:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-xt,this},e.isActive=function(){var i=this.parent||this._dp,n=this._start,r;return!!(!i||this._ts&&this._initted&&i.isActive()&&(r=i.rawTime(!0))>=n&&r<this.endTime(!0)-xt)},e.eventCallback=function(i,n,r){var a=this.vars;return arguments.length>1?(n?(a[i]=n,r&&(a[i+"Params"]=r),i==="onUpdate"&&(this._onUpdate=n)):delete a[i],this):a[i]},e.then=function(i){var n=this,r=n._prom;return new Promise(function(a){var o=Bt(i)?i:e0,l=function(){var h=n.then;n.then=null,r&&r(),Bt(o)&&(o=o(n))&&(o.then||o===n)&&(n.then=h),a(o),n.then=h};n._initted&&n.totalProgress()===1&&n._ts>=0||!n._tTime&&n._ts<0?l():n._prom=l})},e.kill=function(){Ca(this)},s})();Xi($a.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-xt,_prom:0,_ps:!1,_rts:1});var bi=(function(s){Hm(e,s);function e(i,n){var r;return i===void 0&&(i={}),r=s.call(this,i)||this,r.labels={},r.smoothChildTiming=!!i.smoothChildTiming,r.autoRemoveChildren=!!i.autoRemoveChildren,r._sort=Ti(i.sortChildren),Lt&&yn(i.parent||Lt,Bn(r),n),i.reversed&&r.reverse(),i.paused&&r.paused(!0),i.scrollTrigger&&n0(Bn(r),i.scrollTrigger),r}var t=e.prototype;return t.to=function(n,r,a){return Oa(0,arguments,this),this},t.from=function(n,r,a){return Oa(1,arguments,this),this},t.fromTo=function(n,r,a,o){return Oa(2,arguments,this),this},t.set=function(n,r,a){return r.duration=0,r.parent=this,Na(r).repeatDelay||(r.repeat=0),r.immediateRender=!!r.immediateRender,new qt(n,r,qi(this,a),1),this},t.call=function(n,r,a){return yn(this,qt.delayedCall(0,n,r),a)},t.staggerTo=function(n,r,a,o,l,c,h){return a.duration=r,a.stagger=a.stagger||o,a.onComplete=c,a.onCompleteParams=h,a.parent=this,new qt(n,a,qi(this,l)),this},t.staggerFrom=function(n,r,a,o,l,c,h){return a.runBackwards=1,Na(a).immediateRender=Ti(a.immediateRender),this.staggerTo(n,r,a,o,l,c,h)},t.staggerFromTo=function(n,r,a,o,l,c,h,d){return o.startAt=a,Na(o).immediateRender=Ti(o.immediateRender),this.staggerTo(n,r,o,l,c,h,d)},t.render=function(n,r,a){var o=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,h=n<=0?0:Dt(n),d=this._zTime<0!=n<0&&(this._initted||!c),u,f,p,g,m,_,x,E,y,M,w,A;if(this!==Lt&&h>l&&n>=0&&(h=l),h!==this._tTime||a||d){if(o!==this._time&&c&&(h+=this._time-o,n+=this._time-o),u=h,y=this._start,E=this._ts,_=!E,d&&(c||(o=this._zTime),(n||!r)&&(this._zTime=n)),this._repeat){if(w=this._yoyo,m=c+this._rDelay,this._repeat<-1&&n<0)return this.totalTime(m*100+n,r,a);if(u=Dt(h%m),h===l?(g=this._repeat,u=c):(M=Dt(h/m),g=~~M,g&&g===M&&(u=c,g--),u>c&&(u=c)),M=Qr(this._tTime,m),!o&&this._tTime&&M!==g&&this._tTime-M*m-this._dur<=0&&(M=g),w&&g&1&&(u=c-u,A=1),g!==M&&!this._lock){var v=w&&M&1,S=v===(w&&g&1);if(g<M&&(v=!v),o=v?0:h%c?c:h,this._lock=1,this.render(o||(A?0:Dt(g*m)),r,!c)._lock=0,this._tTime=h,!r&&this.parent&&zi(this,"onRepeat"),this.vars.repeatRefresh&&!A&&(this.invalidate()._lock=1,M=g),o&&o!==this._time||_!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,S&&(this._lock=2,o=v?c:-1e-4,this.render(o,!0),this.vars.repeatRefresh&&!A&&this.invalidate()),this._lock=0,!this._ts&&!_)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(x=CE(this,Dt(o),Dt(u)),x&&(h-=u-(u=x._start))),this._tTime=h,this._time=u,this._act=!!E,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=n,o=0),!o&&h&&c&&!r&&!M&&(zi(this,"onStart"),this._tTime!==h))return this;if(u>=o&&n>=0)for(f=this._first;f;){if(p=f._next,(f._act||u>=f._start)&&f._ts&&x!==f){if(f.parent!==this)return this.render(n,r,a);if(f.render(f._ts>0?(u-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(u-f._start)*f._ts,r,a),u!==this._time||!this._ts&&!_){x=0,p&&(h+=this._zTime=-xt);break}}f=p}else{f=this._last;for(var P=n<0?n:u;f;){if(p=f._prev,(f._act||P<=f._end)&&f._ts&&x!==f){if(f.parent!==this)return this.render(n,r,a);if(f.render(f._ts>0?(P-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(P-f._start)*f._ts,r,a||oi&&od(f)),u!==this._time||!this._ts&&!_){x=0,p&&(h+=this._zTime=P?-xt:xt);break}}f=p}}if(x&&!r&&(this.pause(),x.render(u>=o?0:-xt)._zTime=u>=o?1:-1,this._ts))return this._start=y,zl(this),this.render(n,r,a);this._onUpdate&&!r&&zi(this,"onUpdate",!0),(h===l&&this._tTime>=this.totalDuration()||!h&&o)&&(y===this._start||Math.abs(E)!==Math.abs(this._ts))&&(this._lock||((n||!c)&&(h===l&&this._ts>0||!h&&this._ts<0)&&Ss(this,1),!r&&!(n<0&&!o)&&(h||o||!l)&&(zi(this,h===l&&n>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(h<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(n,r){var a=this;if(Kn(r)||(r=qi(this,r,n)),!(n instanceof $a)){if(pi(n))return n.forEach(function(o){return a.add(o,r)}),this;if(ni(n))return this.addLabel(n,r);if(Bt(n))n=qt.delayedCall(0,n);else return this}return this!==n?yn(this,n,r):this},t.getChildren=function(n,r,a,o){n===void 0&&(n=!0),r===void 0&&(r=!0),a===void 0&&(a=!0),o===void 0&&(o=-Zi);for(var l=[],c=this._first;c;)c._start>=o&&(c instanceof qt?r&&l.push(c):(a&&l.push(c),n&&l.push.apply(l,c.getChildren(!0,r,a)))),c=c._next;return l},t.getById=function(n){for(var r=this.getChildren(1,1,1),a=r.length;a--;)if(r[a].vars.id===n)return r[a]},t.remove=function(n){return ni(n)?this.removeLabel(n):Bt(n)?this.killTweensOf(n):(n.parent===this&&Bl(this,n),n===this._recent&&(this._recent=this._last),Xs(this))},t.totalTime=function(n,r){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Dt(Ui.time-(this._ts>0?n/this._ts:(this.totalDuration()-n)/-this._ts))),s.prototype.totalTime.call(this,n,r),this._forcing=0,this):this._tTime},t.addLabel=function(n,r){return this.labels[n]=qi(this,r),this},t.removeLabel=function(n){return delete this.labels[n],this},t.addPause=function(n,r,a){var o=qt.delayedCall(0,r||Xa,a);return o.data="isPause",this._hasPause=1,yn(this,o,qi(this,n))},t.removePause=function(n){var r=this._first;for(n=qi(this,n);r;)r._start===n&&r.data==="isPause"&&Ss(r),r=r._next},t.killTweensOf=function(n,r,a){for(var o=this.getTweensOf(n,a),l=o.length;l--;)gs!==o[l]&&o[l].kill(n,r);return this},t.getTweensOf=function(n,r){for(var a=[],o=Ji(n),l=this._first,c=Kn(r),h;l;)l instanceof qt?ME(l._targets,o)&&(c?(!gs||l._initted&&l._ts)&&l.globalTime(0)<=r&&l.globalTime(l.totalDuration())>r:!r||l.isActive())&&a.push(l):(h=l.getTweensOf(o,r)).length&&a.push.apply(a,h),l=l._next;return a},t.tweenTo=function(n,r){r=r||{};var a=this,o=qi(a,n),l=r,c=l.startAt,h=l.onStart,d=l.onStartParams,u=l.immediateRender,f,p=qt.to(a,Xi({ease:r.ease||"none",lazy:!1,immediateRender:!1,time:o,overwrite:"auto",duration:r.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale())||xt,onStart:function(){if(a.pause(),!f){var m=r.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale());p._dur!==m&&ea(p,m,0,1).render(p._time,!0,!0),f=1}h&&h.apply(p,d||[])}},r));return u?p.render(0):p},t.tweenFromTo=function(n,r,a){return this.tweenTo(r,Xi({startAt:{time:qi(this,n)}},a))},t.recent=function(){return this._recent},t.nextLabel=function(n){return n===void 0&&(n=this._time),Cp(this,qi(this,n))},t.previousLabel=function(n){return n===void 0&&(n=this._time),Cp(this,qi(this,n),1)},t.currentLabel=function(n){return arguments.length?this.seek(n,!0):this.previousLabel(this._time+xt)},t.shiftChildren=function(n,r,a){a===void 0&&(a=0);var o=this._first,l=this.labels,c;for(n=Dt(n);o;)o._start>=a&&(o._start+=n,o._end+=n),o=o._next;if(r)for(c in l)l[c]>=a&&(l[c]+=n);return Xs(this)},t.invalidate=function(n){var r=this._first;for(this._lock=0;r;)r.invalidate(n),r=r._next;return s.prototype.invalidate.call(this,n)},t.clear=function(n){n===void 0&&(n=!0);for(var r=this._first,a;r;)a=r._next,this.remove(r),r=a;return this._dp&&(this._time=this._tTime=this._pTime=0),n&&(this.labels={}),Xs(this)},t.totalDuration=function(n){var r=0,a=this,o=a._last,l=Zi,c,h,d;if(arguments.length)return a.timeScale((a._repeat<0?a.duration():a.totalDuration())/(a.reversed()?-n:n));if(a._dirty){for(d=a.parent;o;)c=o._prev,o._dirty&&o.totalDuration(),h=o._start,h>l&&a._sort&&o._ts&&!a._lock?(a._lock=1,yn(a,o,h-o._delay,1)._lock=0):l=h,h<0&&o._ts&&(r-=h,(!d&&!a._dp||d&&d.smoothChildTiming)&&(a._start+=Dt(h/a._ts),a._time-=h,a._tTime-=h),a.shiftChildren(-h,!1,-1/0),l=0),o._end>r&&o._ts&&(r=o._end),o=c;ea(a,a===Lt&&a._time>r?a._time:r,1,1),a._dirty=0}return a._tDur},e.updateRoot=function(n){if(Lt._ts&&(Jm(Lt,yl(n,Lt)),Km=Ui.frame),Ui.frame>=Ep){Ep+=Hi.autoSleep||120;var r=Lt._first;if((!r||!r._ts)&&Hi.autoSleep&&Ui._listeners.length<2){for(;r&&!r._ts;)r=r._next;r||Ui.sleep()}}},e})($a);Xi(bi.prototype,{_lock:0,_hasPause:0,_forcing:0});var XE=function(e,t,i,n,r,a,o){var l=new Ai(this._pt,e,t,0,1,E0,null,r),c=0,h=0,d,u,f,p,g,m,_,x;for(l.b=i,l.e=n,i+="",n+="",(_=~n.indexOf("random("))&&(n=Ya(n)),a&&(x=[i,n],a(x,e,t),i=x[0],n=x[1]),u=i.match(Wc)||[];d=Wc.exec(n);)p=d[0],g=n.substring(c,d.index),f?f=(f+1)%5:g.substr(-5)==="rgba("&&(f=1),p!==u[h++]&&(m=parseFloat(u[h-1])||0,l._pt={_next:l._pt,p:g||h===1?g:",",s:m,c:p.charAt(1)==="="?Ur(m,p)-m:parseFloat(p)-m,m:f&&f<4?Math.round:0},c=Wc.lastIndex);return l.c=c<n.length?n.substring(c,n.length):"",l.fp=o,(Ym.test(n)||_)&&(l.e=0),this._pt=l,l},ld=function(e,t,i,n,r,a,o,l,c,h){Bt(n)&&(n=n(r||0,e,a));var d=e[t],u=i!=="get"?i:Bt(d)?c?e[t.indexOf("set")||!Bt(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():d,f=Bt(d)?c?KE:b0:hd,p;if(ni(n)&&(~n.indexOf("random(")&&(n=Ya(n)),n.charAt(1)==="="&&(p=Ur(u,n)+(di(u)||0),(p||p===0)&&(n=p))),!h||u!==n||hu)return!isNaN(u*n)&&n!==""?(p=new Ai(this._pt,e,t,+u||0,n-(u||0),typeof d=="boolean"?JE:S0,0,f),c&&(p.fp=c),o&&p.modifier(o,this,e),this._pt=p):(!d&&!(t in e)&&nd(t,n),XE.call(this,e,t,u,n,f,l||Hi.stringFilter,c))},YE=function(e,t,i,n,r){if(Bt(e)&&(e=Ua(e,r,t,i,n)),!Rn(e)||e.style&&e.nodeType||pi(e)||Wm(e))return ni(e)?Ua(e,r,t,i,n):e;var a={},o;for(o in e)a[o]=Ua(e[o],r,t,i,n);return a},x0=function(e,t,i,n,r,a){var o,l,c,h;if(Ni[e]&&(o=new Ni[e]).init(r,o.rawVars?t[e]:YE(t[e],n,r,a,i),i,n,a)!==!1&&(i._pt=l=new Ai(i._pt,r,e,0,1,o.render,o,0,o.priority),i!==Pr))for(c=i._ptLookup[i._targets.indexOf(r)],h=o._props.length;h--;)c[o._props[h]]=l;return o},gs,hu,cd=function s(e,t,i){var n=e.vars,r=n.ease,a=n.startAt,o=n.immediateRender,l=n.lazy,c=n.onUpdate,h=n.runBackwards,d=n.yoyoEase,u=n.keyframes,f=n.autoRevert,p=e._dur,g=e._startAt,m=e._targets,_=e.parent,x=_&&_.data==="nested"?_.vars.targets:m,E=e._overwrite==="auto"&&!Qu,y=e.timeline,M=n.easeReverse||d,w,A,v,S,P,C,N,O,V,B,F,L,K;if(y&&(!u||!r)&&(r="none"),e._ease=Ys(r,Ga.ease),e._rEase=M&&(Ys(M)||e._ease),e._from=!y&&!!n.runBackwards,e._from&&(e.ratio=1),!y||u&&!n.stagger){if(O=m[0]?Ws(m[0]).harness:0,L=O&&n[O.prop],w=xl(n,sd),g&&(g._zTime<0&&g.progress(1),t<0&&h&&o&&!f?g.render(-1,!0):g.revert(h&&p?il:xE),g._lazy=0),a){if(Ss(e._startAt=qt.set(m,Xi({data:"isStart",overwrite:!1,parent:_,immediateRender:!0,lazy:!g&&Ti(l),startAt:null,delay:0,onUpdate:c&&function(){return zi(e,"onUpdate")},stagger:0},a))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(oi||!o&&!f)&&e._startAt.revert(il),o&&p&&t<=0&&i<=0){t&&(e._zTime=t);return}}else if(h&&p&&!g){if(t&&(o=!1),v=Xi({overwrite:!1,data:"isFromStart",lazy:o&&!g&&Ti(l),immediateRender:o,stagger:0,parent:_},w),L&&(v[O.prop]=L),Ss(e._startAt=qt.set(m,v)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(oi?e._startAt.revert(il):e._startAt.render(-1,!0)),e._zTime=t,!o)s(e._startAt,xt,xt);else if(!t)return}for(e._pt=e._ptCache=0,l=p&&Ti(l)||l&&!p,A=0;A<m.length;A++){if(P=m[A],N=P._gsap||ad(m)[A]._gsap,e._ptLookup[A]=B={},su[N.id]&&ys.length&&vl(),F=x===m?A:x.indexOf(P),O&&(V=new O).init(P,L||w,e,F,x)!==!1&&(e._pt=S=new Ai(e._pt,P,V.name,0,1,V.render,V,0,V.priority),V._props.forEach(function(q){B[q]=S}),V.priority&&(C=1)),!O||L)for(v in w)Ni[v]&&(V=x0(v,w,e,F,P,x))?V.priority&&(C=1):B[v]=S=ld.call(e,P,v,"get",w[v],F,x,0,n.stringFilter);e._op&&e._op[A]&&e.kill(P,e._op[A]),E&&e._pt&&(gs=e,Lt.killTweensOf(P,B,e.globalTime(t)),K=!e.parent,gs=0),e._pt&&l&&(su[N.id]=1)}C&&T0(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!K,u&&t<=0&&y.render(Zi,!0,!0)},qE=function(e,t,i,n,r,a,o,l){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],h,d,u,f;if(!c)for(c=e._ptCache[t]=[],u=e._ptLookup,f=e._targets.length;f--;){if(h=u[f][t],h&&h.d&&h.d._pt)for(h=h.d._pt;h&&h.p!==t&&h.fp!==t;)h=h._next;if(!h)return hu=1,e.vars[t]="+=0",cd(e,o),hu=0,l?Wa(t+" not eligible for reset. Try splitting into individual properties"):1;c.push(h)}for(f=c.length;f--;)d=c[f],h=d._pt||d,h.s=(n||n===0)&&!r?n:h.s+(n||0)+a*h.c,h.c=i-h.s,d.e&&(d.e=Ht(i)+di(d.e)),d.b&&(d.b=h.s+di(d.b))},$E=function(e,t){var i=e[0]?Ws(e[0]).harness:0,n=i&&i.aliases,r,a,o,l;if(!n)return t;r=Jr({},t);for(a in n)if(a in r)for(l=n[a].split(","),o=l.length;o--;)r[l[o]]=r[a];return r},jE=function(e,t,i,n){var r=t.ease||n||"power1.inOut",a,o;if(pi(t))o=i[e]||(i[e]=[]),t.forEach(function(l,c){return o.push({t:c/(t.length-1)*100,v:l,e:r})});else for(a in t)o=i[a]||(i[a]=[]),a==="ease"||o.push({t:parseFloat(e),v:t[a],e:r})},Ua=function(e,t,i,n,r){return Bt(e)?e.call(t,i,n,r):ni(e)&&~e.indexOf("random(")?Ya(e):e},y0=rd+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",M0={};wi(y0+",id,stagger,delay,duration,paused,scrollTrigger",function(s){return M0[s]=1});var qt=(function(s){Hm(e,s);function e(i,n,r,a){var o;typeof n=="number"&&(r.duration=n,n=r,r=null),o=s.call(this,a?n:Na(n))||this;var l=o.vars,c=l.duration,h=l.delay,d=l.immediateRender,u=l.stagger,f=l.overwrite,p=l.keyframes,g=l.defaults,m=l.scrollTrigger,_=n.parent||Lt,x=(pi(i)||Wm(i)?Kn(i[0]):"length"in n)?[i]:Ji(i),E,y,M,w,A,v,S,P;if(o._targets=x.length?ad(x):Wa("GSAP target "+i+" not found. https://gsap.com",!Hi.nullTargetWarn)||[],o._ptLookup=[],o._overwrite=f,p||u||Yo(c)||Yo(h)){n=o.vars;var C=n.easeReverse||n.yoyoEase;if(E=o.timeline=new bi({data:"nested",defaults:g||{},targets:_&&_.data==="nested"?_.vars.targets:x}),E.kill(),E.parent=E._dp=Bn(o),E._start=0,u||Yo(c)||Yo(h)){if(w=x.length,S=u&&o0(u),Rn(u))for(A in u)~y0.indexOf(A)&&(P||(P={}),P[A]=u[A]);for(y=0;y<w;y++)M=xl(n,M0),M.stagger=0,C&&(M.easeReverse=C),P&&Jr(M,P),v=x[y],M.duration=+Ua(c,Bn(o),y,v,x),M.delay=(+Ua(h,Bn(o),y,v,x)||0)-o._delay,!u&&w===1&&M.delay&&(o._delay=h=M.delay,o._start+=h,M.delay=0),E.to(v,M,S?S(y,v,x):0),E._ease=Je.none;E.duration()?c=h=0:o.timeline=0}else if(p){Na(Xi(E.vars.defaults,{ease:"none"})),E._ease=Ys(p.ease||n.ease||"none");var N=0,O,V,B;if(pi(p))p.forEach(function(F){return E.to(x,F,">")}),E.duration();else{M={};for(A in p)A==="ease"||A==="easeEach"||jE(A,p[A],M,p.easeEach);for(A in M)for(O=M[A].sort(function(F,L){return F.t-L.t}),N=0,y=0;y<O.length;y++)V=O[y],B={ease:V.e,duration:(V.t-(y?O[y-1].t:0))/100*c},B[A]=V.v,E.to(x,B,N),N+=B.duration;E.duration()<c&&E.to({},{duration:c-E.duration()})}}c||o.duration(c=E.duration())}else o.timeline=0;return f===!0&&!Qu&&(gs=Bn(o),Lt.killTweensOf(x),gs=0),yn(_,Bn(o),r),n.reversed&&o.reverse(),n.paused&&o.paused(!0),(d||!c&&!p&&o._start===Dt(_._time)&&Ti(d)&&TE(Bn(o))&&_.data!=="nested")&&(o._tTime=-xt,o.render(Math.max(0,-h)||0)),m&&n0(Bn(o),m),o}var t=e.prototype;return t.render=function(n,r,a){var o=this._time,l=this._tDur,c=this._dur,h=n<0,d=n>l-xt&&!h?l:n<xt?0:n,u,f,p,g,m,_,x,E;if(!c)AE(this,n,r,a);else if(d!==this._tTime||!n||a||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==h||this._lazy){if(u=d,E=this.timeline,this._repeat){if(g=c+this._rDelay,this._repeat<-1&&h)return this.totalTime(g*100+n,r,a);if(u=Dt(d%g),d===l?(p=this._repeat,u=c):(m=Dt(d/g),p=~~m,p&&p===m?(u=c,p--):u>c&&(u=c)),_=this._yoyo&&p&1,_&&(u=c-u),m=Qr(this._tTime,g),u===o&&!a&&this._initted&&p===m)return this._tTime=d,this;p!==m&&this.vars.repeatRefresh&&!_&&!this._lock&&u!==g&&this._initted&&(this._lock=a=1,this.render(Dt(g*p),!0).invalidate()._lock=0)}if(!this._initted){if(s0(this,h?n:u,a,r,d))return this._tTime=0,this;if(o!==this._time&&!(a&&this.vars.repeatRefresh&&p!==m))return this;if(c!==this._dur)return this.render(n,r,a)}if(this._rEase){var y=u<o;if(y!==this._inv){var M=y?o:c-o;this._inv=y,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=o,this._invRecip=M?(y?-1:1)/M:0,this._invScale=y?-this.ratio:1-this.ratio,this._invEase=y?this._rEase:this._ease}this.ratio=x=this._invRatio+this._invScale*this._invEase((u-this._invTime)*this._invRecip)}else this.ratio=x=this._ease(u/c);if(this._from&&(this.ratio=x=1-x),this._tTime=d,this._time=u,!this._act&&this._ts&&(this._act=1,this._lazy=0),!o&&d&&!r&&!m&&(zi(this,"onStart"),this._tTime!==d))return this;for(f=this._pt;f;)f.r(x,f.d),f=f._next;E&&E.render(n<0?n:E._dur*E._ease(u/this._dur),r,a)||this._startAt&&(this._zTime=n),this._onUpdate&&!r&&(h&&ru(this,n,r,a),zi(this,"onUpdate")),this._repeat&&p!==m&&this.vars.onRepeat&&!r&&this.parent&&zi(this,"onRepeat"),(d===this._tDur||!d)&&this._tTime===d&&(h&&!this._onUpdate&&ru(this,n,!0,!0),(n||!c)&&(d===this._tDur&&this._ts>0||!d&&this._ts<0)&&Ss(this,1),!r&&!(h&&!o)&&(d||o||_)&&(zi(this,d===l?"onComplete":"onReverseComplete",!0),this._prom&&!(d<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(n){return(!n||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(n),s.prototype.invalidate.call(this,n)},t.resetTo=function(n,r,a,o,l){qa||Ui.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),h;return this._initted||cd(this,c),h=this._ease(c/this._dur),qE(this,n,r,a,o,h,c,l)?this.resetTo(n,r,a,o,1):(Vl(this,0),this.parent||t0(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(n,r){if(r===void 0&&(r="all"),!n&&(!r||r==="all"))return this._lazy=this._pt=0,this.parent?Ca(this):this.scrollTrigger&&this.scrollTrigger.kill(!!oi),this;if(this.timeline){var a=this.timeline.totalDuration();return this.timeline.killTweensOf(n,r,gs&&gs.vars.overwrite!==!0)._first||Ca(this),this.parent&&a!==this.timeline.totalDuration()&&ea(this,this._dur*this.timeline._tDur/a,0,1),this}var o=this._targets,l=n?Ji(n):o,c=this._ptLookup,h=this._pt,d,u,f,p,g,m,_;if((!r||r==="all")&&SE(o,l))return r==="all"&&(this._pt=0),Ca(this);for(d=this._op=this._op||[],r!=="all"&&(ni(r)&&(g={},wi(r,function(x){return g[x]=1}),r=g),r=$E(o,r)),_=o.length;_--;)if(~l.indexOf(o[_])){u=c[_],r==="all"?(d[_]=r,p=u,f={}):(f=d[_]=d[_]||{},p=r);for(g in p)m=u&&u[g],m&&((!("kill"in m.d)||m.d.kill(g)===!0)&&Bl(this,m,"_pt"),delete u[g]),f!=="all"&&(f[g]=1)}return this._initted&&!this._pt&&h&&Ca(this),this},e.to=function(n,r){return new e(n,r,arguments[2])},e.from=function(n,r){return Oa(1,arguments)},e.delayedCall=function(n,r,a,o){return new e(r,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:n,onComplete:r,onReverseComplete:r,onCompleteParams:a,onReverseCompleteParams:a,callbackScope:o})},e.fromTo=function(n,r,a){return Oa(2,arguments)},e.set=function(n,r){return r.duration=0,r.repeatDelay||(r.repeat=0),new e(n,r)},e.killTweensOf=function(n,r,a){return Lt.killTweensOf(n,r,a)},e})($a);Xi(qt.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});wi("staggerTo,staggerFrom,staggerFromTo",function(s){qt[s]=function(){var e=new bi,t=ou.call(arguments,0);return t.splice(s==="staggerFromTo"?5:4,0,0),e[s].apply(e,t)}});var hd=function(e,t,i){return e[t]=i},b0=function(e,t,i){return e[t](i)},KE=function(e,t,i,n){return e[t](n.fp,i)},ZE=function(e,t,i){return e.setAttribute(t,i)},ud=function(e,t){return Bt(e[t])?b0:ed(e[t])&&e.setAttribute?ZE:hd},S0=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},JE=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},E0=function(e,t){var i=t._pt,n="";if(!e&&t.b)n=t.b;else if(e===1&&t.e)n=t.e;else{for(;i;)n=i.p+(i.m?i.m(i.s+i.c*e):Math.round((i.s+i.c*e)*1e4)/1e4)+n,i=i._next;n+=t.c}t.set(t.t,t.p,n,t)},dd=function(e,t){for(var i=t._pt;i;)i.r(e,i.d),i=i._next},QE=function(e,t,i,n){for(var r=this._pt,a;r;)a=r._next,r.p===n&&r.modifier(e,t,i),r=a},eT=function(e){for(var t=this._pt,i,n;t;)n=t._next,t.p===e&&!t.op||t.op===e?Bl(this,t,"_pt"):t.dep||(i=1),t=n;return!i},tT=function(e,t,i,n){n.mSet(e,t,n.m.call(n.tween,i,n.mt),n)},T0=function(e){for(var t=e._pt,i,n,r,a;t;){for(i=t._next,n=r;n&&n.pr>t.pr;)n=n._next;(t._prev=n?n._prev:a)?t._prev._next=t:r=t,(t._next=n)?n._prev=t:a=t,t=i}e._pt=r},Ai=(function(){function s(t,i,n,r,a,o,l,c,h){this.t=i,this.s=r,this.c=a,this.p=n,this.r=o||S0,this.d=l||this,this.set=c||hd,this.pr=h||0,this._next=t,t&&(t._prev=this)}var e=s.prototype;return e.modifier=function(i,n,r){this.mSet=this.mSet||this.set,this.set=tT,this.m=i,this.mt=r,this.tween=n},s})();wi(rd+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(s){return sd[s]=1});Wi.TweenMax=Wi.TweenLite=qt;Wi.TimelineLite=Wi.TimelineMax=bi;Lt=new bi({sortChildren:!1,defaults:Ga,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});Hi.stringFilter=g0;var qs=[],sl={},iT=[],Pp=0,nT=0,jc=function(e){return(sl[e]||iT).map(function(t){return t()})},uu=function(){var e=Date.now(),t=[];e-Pp>2&&(jc("matchMediaInit"),qs.forEach(function(i){var n=i.queries,r=i.conditions,a,o,l,c;for(o in n)a=_n.matchMedia(n[o]).matches,a&&(l=1),a!==r[o]&&(r[o]=a,c=1);c&&(i.revert(),l&&t.push(i))}),jc("matchMediaRevert"),t.forEach(function(i){return i.onMatch(i,function(n){return i.add(null,n)})}),Pp=e,jc("matchMedia"))},w0=(function(){function s(t,i){this.selector=i&&lu(i),this.data=[],this._r=[],this.isReverted=!1,this.id=nT++,t&&this.add(t)}var e=s.prototype;return e.add=function(i,n,r){Bt(i)&&(r=n,n=i,i=Bt);var a=this,o=function(){var c=Rt,h=a.selector,d;return c&&c!==a&&c.data.push(a),r&&(a.selector=lu(r)),Rt=a,d=n.apply(a,arguments),Bt(d)&&a._r.push(d),Rt=c,a.selector=h,a.isReverted=!1,d};return a.last=o,i===Bt?o(a,function(l){return a.add(null,l)}):i?a[i]=o:o},e.ignore=function(i){var n=Rt;Rt=null,i(this),Rt=n},e.getTweens=function(){var i=[];return this.data.forEach(function(n){return n instanceof s?i.push.apply(i,n.getTweens()):n instanceof qt&&!(n.parent&&n.parent.data==="nested")&&i.push(n)}),i},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(i,n){var r=this;if(i?(function(){for(var o=r.getTweens(),l=r.data.length,c;l--;)c=r.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(h){return o.splice(o.indexOf(h),1)}));for(o.map(function(h){return{g:h._dur||h._delay||h._sat&&!h._sat.vars.immediateRender?h.globalTime(0):-1/0,t:h}}).sort(function(h,d){return d.g-h.g||-1/0}).forEach(function(h){return h.t.revert(i)}),l=r.data.length;l--;)c=r.data[l],c instanceof bi?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof qt)&&c.revert&&c.revert(i);r._r.forEach(function(h){return h(i,r)}),r.isReverted=!0})():this.data.forEach(function(o){return o.kill&&o.kill()}),this.clear(),n)for(var a=qs.length;a--;)qs[a].id===this.id&&qs.splice(a,1)},e.revert=function(i){this.kill(i||{})},s})(),sT=(function(){function s(t){this.contexts=[],this.scope=t,Rt&&Rt.data.push(this)}var e=s.prototype;return e.add=function(i,n,r){Rn(i)||(i={matches:i});var a=new w0(0,r||this.scope),o=a.conditions={},l,c,h;Rt&&!a.selector&&(a.selector=Rt.selector),this.contexts.push(a),n=a.add("onMatch",n),a.queries=i;for(c in i)c==="all"?h=1:(l=_n.matchMedia(i[c]),l&&(qs.indexOf(a)<0&&qs.push(a),(o[c]=l.matches)&&(h=1),l.addListener?l.addListener(uu):l.addEventListener("change",uu)));return h&&n(a,function(d){return a.add(null,d)}),this},e.revert=function(i){this.kill(i||{})},e.kill=function(i){this.contexts.forEach(function(n){return n.kill(i,!0)})},s})(),Ml={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];t.forEach(function(n){return f0(n)})},timeline:function(e){return new bi(e)},getTweensOf:function(e,t){return Lt.getTweensOf(e,t)},getProperty:function(e,t,i,n){ni(e)&&(e=Ji(e)[0]);var r=Ws(e||{}).get,a=i?e0:Qm;return i==="native"&&(i=""),e&&(t?a((Ni[t]&&Ni[t].get||r)(e,t,i,n)):function(o,l,c){return a((Ni[o]&&Ni[o].get||r)(e,o,l,c))})},quickSetter:function(e,t,i){if(e=Ji(e),e.length>1){var n=e.map(function(h){return Ri.quickSetter(h,t,i)}),r=n.length;return function(h){for(var d=r;d--;)n[d](h)}}e=e[0]||{};var a=Ni[t],o=Ws(e),l=o.harness&&(o.harness.aliases||{})[t]||t,c=a?function(h){var d=new a;Pr._pt=0,d.init(e,i?h+i:h,Pr,0,[e]),d.render(1,d),Pr._pt&&dd(1,Pr)}:o.set(e,l);return a?c:function(h){return c(e,l,i?h+i:h,o,1)}},quickTo:function(e,t,i){var n,r=Ri.to(e,Xi((n={},n[t]="+=0.1",n.paused=!0,n.stagger=0,n),i||{})),a=function(l,c,h){return r.resetTo(t,l,c,h)};return a.tween=r,a},isTweening:function(e){return Lt.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=Ys(e.ease,Ga.ease)),Tp(Ga,e||{})},config:function(e){return Tp(Hi,e||{})},registerEffect:function(e){var t=e.name,i=e.effect,n=e.plugins,r=e.defaults,a=e.extendTimeline;(n||"").split(",").forEach(function(o){return o&&!Ni[o]&&!Wi[o]&&Wa(t+" effect requires "+o+" plugin.")}),Xc[t]=function(o,l,c){return i(Ji(o),Xi(l||{},r),c)},a&&(bi.prototype[t]=function(o,l,c){return this.add(Xc[t](o,Rn(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,t){Je[e]=Ys(t)},parseEase:function(e,t){return arguments.length?Ys(e,t):Je},getById:function(e){return Lt.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var i=new bi(e),n,r;for(i.smoothChildTiming=Ti(e.smoothChildTiming),Lt.remove(i),i._dp=0,i._time=i._tTime=Lt._time,n=Lt._first;n;)r=n._next,(t||!(!n._dur&&n instanceof qt&&n.vars.onComplete===n._targets[0]))&&yn(i,n,n._start-n._delay),n=r;return yn(Lt,i,0),i},context:function(e,t){return e?new w0(e,t):Rt},matchMedia:function(e){return new sT(e)},matchMediaRefresh:function(){return qs.forEach(function(e){var t=e.conditions,i,n;for(n in t)t[n]&&(t[n]=!1,i=1);i&&e.revert()})||uu()},addEventListener:function(e,t){var i=sl[e]||(sl[e]=[]);~i.indexOf(t)||i.push(t)},removeEventListener:function(e,t){var i=sl[e],n=i&&i.indexOf(t);n>=0&&i.splice(n,1)},utils:{wrap:OE,wrapYoyo:UE,distribute:o0,random:c0,snap:l0,normalize:NE,getUnit:di,clamp:PE,splitColor:p0,toArray:Ji,selector:lu,mapRange:u0,pipe:IE,unitize:LE,interpolate:FE,shuffle:a0},install:$m,effects:Xc,ticker:Ui,updateRoot:bi.updateRoot,plugins:Ni,globalTimeline:Lt,core:{PropTween:Ai,globals:jm,Tween:qt,Timeline:bi,Animation:$a,getCache:Ws,_removeLinkedListItem:Bl,reverting:function(){return oi},context:function(e){return e&&Rt&&(Rt.data.push(e),e._ctx=Rt),Rt},suppressOverwrites:function(e){return Qu=e}}};wi("to,from,fromTo,delayedCall,set,killTweensOf",function(s){return Ml[s]=qt[s]});Ui.add(bi.updateRoot);Pr=Ml.to({},{duration:0});var rT=function(e,t){for(var i=e._pt;i&&i.p!==t&&i.op!==t&&i.fp!==t;)i=i._next;return i},aT=function(e,t){var i=e._targets,n,r,a;for(n in t)for(r=i.length;r--;)a=e._ptLookup[r][n],a&&(a=a.d)&&(a._pt&&(a=rT(a,n)),a&&a.modifier&&a.modifier(t[n],e,i[r],n))},Kc=function(e,t){return{name:e,headless:1,rawVars:1,init:function(n,r,a){a._onInit=function(o){var l,c;if(ni(r)&&(l={},wi(r,function(h){return l[h]=1}),r=l),t){l={};for(c in r)l[c]=t(r[c]);r=l}aT(o,r)}}}},Ri=Ml.registerPlugin({name:"attr",init:function(e,t,i,n,r){var a,o,l;this.tween=i;for(a in t)l=e.getAttribute(a)||"",o=this.add(e,"setAttribute",(l||0)+"",t[a],n,r,0,0,a),o.op=a,o.b=l,this._props.push(a)},render:function(e,t){for(var i=t._pt;i;)oi?i.set(i.t,i.p,i.b,i):i.r(e,i.d),i=i._next}},{name:"endArray",headless:1,init:function(e,t){for(var i=t.length;i--;)this.add(e,i,e[i]||0,t[i],0,0,0,0,0,1)}},Kc("roundProps",cu),Kc("modifiers"),Kc("snap",l0))||Ml;qt.version=bi.version=Ri.version="3.15.0";qm=1;td()&&ta();Je.Power0;Je.Power1;Je.Power2;Je.Power3;Je.Power4;Je.Linear;Je.Quad;Je.Cubic;Je.Quart;Je.Quint;Je.Strong;Je.Elastic;Je.Back;Je.SteppedEase;Je.Bounce;Je.Sine;Je.Expo;Je.Circ;var Dp,_s,Fr,fd,Hs,Ip,pd,oT=function(){return typeof window<"u"},Zn={},zs=180/Math.PI,kr=Math.PI/180,Er=Math.atan2,Lp=1e8,md=/([A-Z])/g,lT=/(left|right|width|margin|padding|x)/i,cT=/[\s,\(]\S/,Tn={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},du=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},hT=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},uT=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},dT=function(e,t){return t.set(t.t,t.p,e===1?t.e:e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},fT=function(e,t){var i=t.s+t.c*e;t.set(t.t,t.p,~~(i+(i<0?-.5:.5))+t.u,t)},A0=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},C0=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},pT=function(e,t,i){return e.style[t]=i},mT=function(e,t,i){return e.style.setProperty(t,i)},gT=function(e,t,i){return e._gsap[t]=i},_T=function(e,t,i){return e._gsap.scaleX=e._gsap.scaleY=i},vT=function(e,t,i,n,r){var a=e._gsap;a.scaleX=a.scaleY=i,a.renderTransform(r,a)},xT=function(e,t,i,n,r){var a=e._gsap;a[t]=i,a.renderTransform(r,a)},Nt="transform",Ci=Nt+"Origin",yT=function s(e,t){var i=this,n=this.target,r=n.style,a=n._gsap;if(e in Zn&&r){if(this.tfm=this.tfm||{},e!=="transform")e=Tn[e]||e,~e.indexOf(",")?e.split(",").forEach(function(o){return i.tfm[o]=zn(n,o)}):this.tfm[e]=a.x?a[e]:zn(n,e),e===Ci&&(this.tfm.zOrigin=a.zOrigin);else return Tn.transform.split(",").forEach(function(o){return s.call(i,o,t)});if(this.props.indexOf(Nt)>=0)return;a.svg&&(this.svgo=n.getAttribute("data-svg-origin"),this.props.push(Ci,t,"")),e=Nt}(r||t)&&this.props.push(e,t,r[e])},R0=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},MT=function(){var e=this.props,t=this.target,i=t.style,n=t._gsap,r,a;for(r=0;r<e.length;r+=3)e[r+1]?e[r+1]===2?t[e[r]](e[r+2]):t[e[r]]=e[r+2]:e[r+2]?i[e[r]]=e[r+2]:i.removeProperty(e[r].substr(0,2)==="--"?e[r]:e[r].replace(md,"-$1").toLowerCase());if(this.tfm){for(a in this.tfm)n[a]=this.tfm[a];n.svg&&(n.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),r=pd(),(!r||!r.isStart)&&!i[Nt]&&(R0(i),n.zOrigin&&i[Ci]&&(i[Ci]+=" "+n.zOrigin+"px",n.zOrigin=0,n.renderTransform()),n.uncache=1)}},P0=function(e,t){var i={target:e,props:[],revert:MT,save:yT};return e._gsap||Ri.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(n){return i.save(n)}),i},D0,fu=function(e,t){var i=_s.createElementNS?_s.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):_s.createElement(e);return i&&i.style?i:_s.createElement(e)},Vi=function s(e,t,i){var n=getComputedStyle(e);return n[t]||n.getPropertyValue(t.replace(md,"-$1").toLowerCase())||n.getPropertyValue(t)||!i&&s(e,ia(t)||t,1)||""},Np="O,Moz,ms,Ms,Webkit".split(","),ia=function(e,t,i){var n=t||Hs,r=n.style,a=5;if(e in r&&!i)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);a--&&!(Np[a]+e in r););return a<0?null:(a===3?"ms":a>=0?Np[a]:"")+e},pu=function(){oT()&&window.document&&(Dp=window,_s=Dp.document,Fr=_s.documentElement,Hs=fu("div")||{style:{}},fu("div"),Nt=ia(Nt),Ci=Nt+"Origin",Hs.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",D0=!!ia("perspective"),pd=Ri.core.reverting,fd=1)},Op=function(e){var t=e.ownerSVGElement,i=fu("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),n=e.cloneNode(!0),r;n.style.display="block",i.appendChild(n),Fr.appendChild(i);try{r=n.getBBox()}catch{}return i.removeChild(n),Fr.removeChild(i),r},Up=function(e,t){for(var i=t.length;i--;)if(e.hasAttribute(t[i]))return e.getAttribute(t[i])},I0=function(e){var t,i;try{t=e.getBBox()}catch{t=Op(e),i=1}return t&&(t.width||t.height)||i||(t=Op(e)),t&&!t.width&&!t.x&&!t.y?{x:+Up(e,["x","cx","x1"])||0,y:+Up(e,["y","cy","y1"])||0,width:0,height:0}:t},L0=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&I0(e))},Es=function(e,t){if(t){var i=e.style,n;t in Zn&&t!==Ci&&(t=Nt),i.removeProperty?(n=t.substr(0,2),(n==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),i.removeProperty(n==="--"?t:t.replace(md,"-$1").toLowerCase())):i.removeAttribute(t)}},vs=function(e,t,i,n,r,a){var o=new Ai(e._pt,t,i,0,1,a?C0:A0);return e._pt=o,o.b=n,o.e=r,e._props.push(i),o},Fp={deg:1,rad:1,turn:1},bT={grid:1,flex:1},Ts=function s(e,t,i,n){var r=parseFloat(i)||0,a=(i+"").trim().substr((r+"").length)||"px",o=Hs.style,l=lT.test(t),c=e.tagName.toLowerCase()==="svg",h=(c?"client":"offset")+(l?"Width":"Height"),d=100,u=n==="px",f=n==="%",p,g,m,_;if(n===a||!r||Fp[n]||Fp[a])return r;if(a!=="px"&&!u&&(r=s(e,t,i,"px")),_=e.getCTM&&L0(e),(f||a==="%")&&(Zn[t]||~t.indexOf("adius")))return p=_?e.getBBox()[l?"width":"height"]:e[h],Ht(f?r/p*d:r/100*p);if(o[l?"width":"height"]=d+(u?a:n),g=n!=="rem"&&~t.indexOf("adius")||n==="em"&&e.appendChild&&!c?e:e.parentNode,_&&(g=(e.ownerSVGElement||{}).parentNode),(!g||g===_s||!g.appendChild)&&(g=_s.body),m=g._gsap,m&&f&&m.width&&l&&m.time===Ui.time&&!m.uncache)return Ht(r/m.width*d);if(f&&(t==="height"||t==="width")){var x=e.style[t];e.style[t]=d+n,p=e[h],x?e.style[t]=x:Es(e,t)}else(f||a==="%")&&!bT[Vi(g,"display")]&&(o.position=Vi(e,"position")),g===e&&(o.position="static"),g.appendChild(Hs),p=Hs[h],g.removeChild(Hs),o.position="absolute";return l&&f&&(m=Ws(g),m.time=Ui.time,m.width=g[h]),Ht(u?p*r/d:p&&r?d/p*r:0)},zn=function(e,t,i,n){var r;return fd||pu(),t in Tn&&t!=="transform"&&(t=Tn[t],~t.indexOf(",")&&(t=t.split(",")[0])),Zn[t]&&t!=="transform"?(r=Ka(e,n),r=t!=="transformOrigin"?r[t]:r.svg?r.origin:Sl(Vi(e,Ci))+" "+r.zOrigin+"px"):(r=e.style[t],(!r||r==="auto"||n||~(r+"").indexOf("calc("))&&(r=bl[t]&&bl[t](e,t,i)||Vi(e,t)||Zm(e,t)||(t==="opacity"?1:0))),i&&!~(r+"").trim().indexOf(" ")?Ts(e,t,r,i)+i:r},ST=function(e,t,i,n){if(!i||i==="none"){var r=ia(t,e,1),a=r&&Vi(e,r,1);a&&a!==i?(t=r,i=a):t==="borderColor"&&(i=Vi(e,"borderTopColor"))}var o=new Ai(this._pt,e.style,t,0,1,E0),l=0,c=0,h,d,u,f,p,g,m,_,x,E,y,M;if(o.b=i,o.e=n,i+="",n+="",n.substring(0,6)==="var(--"&&(n=Vi(e,n.substring(4,n.indexOf(")")))),n==="auto"&&(g=e.style[t],e.style[t]=n,n=Vi(e,t)||n,g?e.style[t]=g:Es(e,t)),h=[i,n],g0(h),i=h[0],n=h[1],u=i.match(Rr)||[],M=n.match(Rr)||[],M.length){for(;d=Rr.exec(n);)m=d[0],x=n.substring(l,d.index),p?p=(p+1)%5:(x.substr(-5)==="rgba("||x.substr(-5)==="hsla(")&&(p=1),m!==(g=u[c++]||"")&&(f=parseFloat(g)||0,y=g.substr((f+"").length),m.charAt(1)==="="&&(m=Ur(f,m)+y),_=parseFloat(m),E=m.substr((_+"").length),l=Rr.lastIndex-E.length,E||(E=E||Hi.units[t]||y,l===n.length&&(n+=E,o.e+=E)),y!==E&&(f=Ts(e,t,g,E)||0),o._pt={_next:o._pt,p:x||c===1?x:",",s:f,c:_-f,m:p&&p<4||t==="zIndex"?Math.round:0});o.c=l<n.length?n.substring(l,n.length):""}else o.r=t==="display"&&n==="none"?C0:A0;return Ym.test(n)&&(o.e=0),this._pt=o,o},kp={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},ET=function(e){var t=e.split(" "),i=t[0],n=t[1]||"50%";return(i==="top"||i==="bottom"||n==="left"||n==="right")&&(e=i,i=n,n=e),t[0]=kp[i]||i,t[1]=kp[n]||n,t.join(" ")},TT=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var i=t.t,n=i.style,r=t.u,a=i._gsap,o,l,c;if(r==="all"||r===!0)n.cssText="",l=1;else for(r=r.split(","),c=r.length;--c>-1;)o=r[c],Zn[o]&&(l=1,o=o==="transformOrigin"?Ci:Nt),Es(i,o);l&&(Es(i,Nt),a&&(a.svg&&i.removeAttribute("transform"),n.scale=n.rotate=n.translate="none",Ka(i,1),a.uncache=1,R0(n)))}},bl={clearProps:function(e,t,i,n,r){if(r.data!=="isFromStart"){var a=e._pt=new Ai(e._pt,t,i,0,0,TT);return a.u=n,a.pr=-10,a.tween=r,e._props.push(i),1}}},ja=[1,0,0,1,0,0],N0={},O0=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},Bp=function(e){var t=Vi(e,Nt);return O0(t)?ja:t.substr(7).match(Xm).map(Ht)},gd=function(e,t){var i=e._gsap||Ws(e),n=e.style,r=Bp(e),a,o,l,c;return i.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,r=[l.a,l.b,l.c,l.d,l.e,l.f],r.join(",")==="1,0,0,1,0,0"?ja:r):(r===ja&&!e.offsetParent&&e!==Fr&&!i.svg&&(l=n.display,n.display="block",a=e.parentNode,(!a||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,o=e.nextElementSibling,Fr.appendChild(e)),r=Bp(e),l?n.display=l:Es(e,"display"),c&&(o?a.insertBefore(e,o):a?a.appendChild(e):Fr.removeChild(e))),t&&r.length>6?[r[0],r[1],r[4],r[5],r[12],r[13]]:r)},mu=function(e,t,i,n,r,a){var o=e._gsap,l=r||gd(e,!0),c=o.xOrigin||0,h=o.yOrigin||0,d=o.xOffset||0,u=o.yOffset||0,f=l[0],p=l[1],g=l[2],m=l[3],_=l[4],x=l[5],E=t.split(" "),y=parseFloat(E[0])||0,M=parseFloat(E[1])||0,w,A,v,S;i?l!==ja&&(A=f*m-p*g)&&(v=y*(m/A)+M*(-g/A)+(g*x-m*_)/A,S=y*(-p/A)+M*(f/A)-(f*x-p*_)/A,y=v,M=S):(w=I0(e),y=w.x+(~E[0].indexOf("%")?y/100*w.width:y),M=w.y+(~(E[1]||E[0]).indexOf("%")?M/100*w.height:M)),n||n!==!1&&o.smooth?(_=y-c,x=M-h,o.xOffset=d+(_*f+x*g)-_,o.yOffset=u+(_*p+x*m)-x):o.xOffset=o.yOffset=0,o.xOrigin=y,o.yOrigin=M,o.smooth=!!n,o.origin=t,o.originIsAbsolute=!!i,e.style[Ci]="0px 0px",a&&(vs(a,o,"xOrigin",c,y),vs(a,o,"yOrigin",h,M),vs(a,o,"xOffset",d,o.xOffset),vs(a,o,"yOffset",u,o.yOffset)),e.setAttribute("data-svg-origin",y+" "+M)},Ka=function(e,t){var i=e._gsap||new v0(e);if("x"in i&&!t&&!i.uncache)return i;var n=e.style,r=i.scaleX<0,a="px",o="deg",l=getComputedStyle(e),c=Vi(e,Ci)||"0",h,d,u,f,p,g,m,_,x,E,y,M,w,A,v,S,P,C,N,O,V,B,F,L,K,q,ie,ue,ne,Z,ae,ve;return h=d=u=g=m=_=x=E=y=0,f=p=1,i.svg=!!(e.getCTM&&L0(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(n[Nt]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[Nt]!=="none"?l[Nt]:"")),n.scale=n.rotate=n.translate="none"),A=gd(e,i.svg),i.svg&&(i.uncache?(K=e.getBBox(),c=i.xOrigin-K.x+"px "+(i.yOrigin-K.y)+"px",L=""):L=!t&&e.getAttribute("data-svg-origin"),mu(e,L||c,!!L||i.originIsAbsolute,i.smooth!==!1,A)),M=i.xOrigin||0,w=i.yOrigin||0,A!==ja&&(C=A[0],N=A[1],O=A[2],V=A[3],h=B=A[4],d=F=A[5],A.length===6?(f=Math.sqrt(C*C+N*N),p=Math.sqrt(V*V+O*O),g=C||N?Er(N,C)*zs:0,x=O||V?Er(O,V)*zs+g:0,x&&(p*=Math.abs(Math.cos(x*kr))),i.svg&&(h-=M-(M*C+w*O),d-=w-(M*N+w*V))):(ve=A[6],Z=A[7],ie=A[8],ue=A[9],ne=A[10],ae=A[11],h=A[12],d=A[13],u=A[14],v=Er(ve,ne),m=v*zs,v&&(S=Math.cos(-v),P=Math.sin(-v),L=B*S+ie*P,K=F*S+ue*P,q=ve*S+ne*P,ie=B*-P+ie*S,ue=F*-P+ue*S,ne=ve*-P+ne*S,ae=Z*-P+ae*S,B=L,F=K,ve=q),v=Er(-O,ne),_=v*zs,v&&(S=Math.cos(-v),P=Math.sin(-v),L=C*S-ie*P,K=N*S-ue*P,q=O*S-ne*P,ae=V*P+ae*S,C=L,N=K,O=q),v=Er(N,C),g=v*zs,v&&(S=Math.cos(v),P=Math.sin(v),L=C*S+N*P,K=B*S+F*P,N=N*S-C*P,F=F*S-B*P,C=L,B=K),m&&Math.abs(m)+Math.abs(g)>359.9&&(m=g=0,_=180-_),f=Ht(Math.sqrt(C*C+N*N+O*O)),p=Ht(Math.sqrt(F*F+ve*ve)),v=Er(B,F),x=Math.abs(v)>2e-4?v*zs:0,y=ae?1/(ae<0?-ae:ae):0),i.svg&&(L=e.getAttribute("transform"),i.forceCSS=e.setAttribute("transform","")||!O0(Vi(e,Nt)),L&&e.setAttribute("transform",L))),Math.abs(x)>90&&Math.abs(x)<270&&(r?(f*=-1,x+=g<=0?180:-180,g+=g<=0?180:-180):(p*=-1,x+=x<=0?180:-180)),t=t||i.uncache,i.x=h-((i.xPercent=h&&(!t&&i.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-h)?-50:0)))?e.offsetWidth*i.xPercent/100:0)+a,i.y=d-((i.yPercent=d&&(!t&&i.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-d)?-50:0)))?e.offsetHeight*i.yPercent/100:0)+a,i.z=u+a,i.scaleX=Ht(f),i.scaleY=Ht(p),i.rotation=Ht(g)+o,i.rotationX=Ht(m)+o,i.rotationY=Ht(_)+o,i.skewX=x+o,i.skewY=E+o,i.transformPerspective=y+a,(i.zOrigin=parseFloat(c.split(" ")[2])||!t&&i.zOrigin||0)&&(n[Ci]=Sl(c)),i.xOffset=i.yOffset=0,i.force3D=Hi.force3D,i.renderTransform=i.svg?AT:D0?U0:wT,i.uncache=0,i},Sl=function(e){return(e=e.split(" "))[0]+" "+e[1]},Zc=function(e,t,i){var n=di(t);return Ht(parseFloat(t)+parseFloat(Ts(e,"x",i+"px",n)))+n},wT=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,U0(e,t)},Us="0deg",ba="0px",Fs=") ",U0=function(e,t){var i=t||this,n=i.xPercent,r=i.yPercent,a=i.x,o=i.y,l=i.z,c=i.rotation,h=i.rotationY,d=i.rotationX,u=i.skewX,f=i.skewY,p=i.scaleX,g=i.scaleY,m=i.transformPerspective,_=i.force3D,x=i.target,E=i.zOrigin,y="",M=_==="auto"&&e&&e!==1||_===!0;if(E&&(d!==Us||h!==Us)){var w=parseFloat(h)*kr,A=Math.sin(w),v=Math.cos(w),S;w=parseFloat(d)*kr,S=Math.cos(w),a=Zc(x,a,A*S*-E),o=Zc(x,o,-Math.sin(w)*-E),l=Zc(x,l,v*S*-E+E)}m!==ba&&(y+="perspective("+m+Fs),(n||r)&&(y+="translate("+n+"%, "+r+"%) "),(M||a!==ba||o!==ba||l!==ba)&&(y+=l!==ba||M?"translate3d("+a+", "+o+", "+l+") ":"translate("+a+", "+o+Fs),c!==Us&&(y+="rotate("+c+Fs),h!==Us&&(y+="rotateY("+h+Fs),d!==Us&&(y+="rotateX("+d+Fs),(u!==Us||f!==Us)&&(y+="skew("+u+", "+f+Fs),(p!==1||g!==1)&&(y+="scale("+p+", "+g+Fs),x.style[Nt]=y||"translate(0, 0)"},AT=function(e,t){var i=t||this,n=i.xPercent,r=i.yPercent,a=i.x,o=i.y,l=i.rotation,c=i.skewX,h=i.skewY,d=i.scaleX,u=i.scaleY,f=i.target,p=i.xOrigin,g=i.yOrigin,m=i.xOffset,_=i.yOffset,x=i.forceCSS,E=parseFloat(a),y=parseFloat(o),M,w,A,v,S;l=parseFloat(l),c=parseFloat(c),h=parseFloat(h),h&&(h=parseFloat(h),c+=h,l+=h),l||c?(l*=kr,c*=kr,M=Math.cos(l)*d,w=Math.sin(l)*d,A=Math.sin(l-c)*-u,v=Math.cos(l-c)*u,c&&(h*=kr,S=Math.tan(c-h),S=Math.sqrt(1+S*S),A*=S,v*=S,h&&(S=Math.tan(h),S=Math.sqrt(1+S*S),M*=S,w*=S)),M=Ht(M),w=Ht(w),A=Ht(A),v=Ht(v)):(M=d,v=u,w=A=0),(E&&!~(a+"").indexOf("px")||y&&!~(o+"").indexOf("px"))&&(E=Ts(f,"x",a,"px"),y=Ts(f,"y",o,"px")),(p||g||m||_)&&(E=Ht(E+p-(p*M+g*A)+m),y=Ht(y+g-(p*w+g*v)+_)),(n||r)&&(S=f.getBBox(),E=Ht(E+n/100*S.width),y=Ht(y+r/100*S.height)),S="matrix("+M+","+w+","+A+","+v+","+E+","+y+")",f.setAttribute("transform",S),x&&(f.style[Nt]=S)},CT=function(e,t,i,n,r){var a=360,o=ni(r),l=parseFloat(r)*(o&&~r.indexOf("rad")?zs:1),c=l-n,h=n+c+"deg",d,u;return o&&(d=r.split("_")[1],d==="short"&&(c%=a,c!==c%(a/2)&&(c+=c<0?a:-a)),d==="cw"&&c<0?c=(c+a*Lp)%a-~~(c/a)*a:d==="ccw"&&c>0&&(c=(c-a*Lp)%a-~~(c/a)*a)),e._pt=u=new Ai(e._pt,t,i,n,c,hT),u.e=h,u.u="deg",e._props.push(i),u},zp=function(e,t){for(var i in t)e[i]=t[i];return e},RT=function(e,t,i){var n=zp({},i._gsap),r="perspective,force3D,transformOrigin,svgOrigin",a=i.style,o,l,c,h,d,u,f,p;n.svg?(c=i.getAttribute("transform"),i.setAttribute("transform",""),a[Nt]=t,o=Ka(i,1),Es(i,Nt),i.setAttribute("transform",c)):(c=getComputedStyle(i)[Nt],a[Nt]=t,o=Ka(i,1),a[Nt]=c);for(l in Zn)c=n[l],h=o[l],c!==h&&r.indexOf(l)<0&&(f=di(c),p=di(h),d=f!==p?Ts(i,l,c,p):parseFloat(c),u=parseFloat(h),e._pt=new Ai(e._pt,o,l,d,u-d,du),e._pt.u=p||0,e._props.push(l));zp(o,n)};wi("padding,margin,Width,Radius",function(s,e){var t="Top",i="Right",n="Bottom",r="Left",a=(e<3?[t,i,n,r]:[t+r,t+i,n+i,n+r]).map(function(o){return e<2?s+o:"border"+o+s});bl[e>1?"border"+s:s]=function(o,l,c,h,d){var u,f;if(arguments.length<4)return u=a.map(function(p){return zn(o,p,c)}),f=u.join(" "),f.split(u[0]).length===5?u[0]:f;u=(h+"").split(" "),f={},a.forEach(function(p,g){return f[p]=u[g]=u[g]||u[(g-1)/2|0]}),o.init(l,f,d)}});var F0={name:"css",register:pu,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,i,n,r){var a=this._props,o=e.style,l=i.vars.startAt,c,h,d,u,f,p,g,m,_,x,E,y,M,w,A,v,S;fd||pu(),this.styles=this.styles||P0(e),v=this.styles.props,this.tween=i;for(g in t)if(g!=="autoRound"&&(h=t[g],!(Ni[g]&&x0(g,t,i,n,e,r)))){if(f=typeof h,p=bl[g],f==="function"&&(h=h.call(i,n,e,r),f=typeof h),f==="string"&&~h.indexOf("random(")&&(h=Ya(h)),p)p(this,e,g,h,i)&&(A=1);else if(g.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(g)+"").trim(),h+="",Ms.lastIndex=0,Ms.test(c)||(m=di(c),_=di(h),_?m!==_&&(c=Ts(e,g,c,_)+_):m&&(h+=m)),this.add(o,"setProperty",c,h,n,r,0,0,g),a.push(g),v.push(g,0,o[g]);else if(f!=="undefined"){if(l&&g in l?(c=typeof l[g]=="function"?l[g].call(i,n,e,r):l[g],ni(c)&&~c.indexOf("random(")&&(c=Ya(c)),di(c+"")||c==="auto"||(c+=Hi.units[g]||di(zn(e,g))||""),(c+"").charAt(1)==="="&&(c=zn(e,g))):c=zn(e,g),u=parseFloat(c),x=f==="string"&&h.charAt(1)==="="&&h.substr(0,2),x&&(h=h.substr(2)),d=parseFloat(h),g in Tn&&(g==="autoAlpha"&&(u===1&&zn(e,"visibility")==="hidden"&&d&&(u=0),v.push("visibility",0,o.visibility),vs(this,o,"visibility",u?"inherit":"hidden",d?"inherit":"hidden",!d)),g!=="scale"&&g!=="transform"&&(g=Tn[g],~g.indexOf(",")&&(g=g.split(",")[0]))),E=g in Zn,E){if(this.styles.save(g),S=h,f==="string"&&h.substring(0,6)==="var(--"){if(h=Vi(e,h.substring(4,h.indexOf(")"))),h.substring(0,5)==="calc("){var P=e.style.perspective;e.style.perspective=h,h=Vi(e,"perspective"),P?e.style.perspective=P:Es(e,"perspective")}d=parseFloat(h)}if(y||(M=e._gsap,M.renderTransform&&!t.parseTransform||Ka(e,t.parseTransform),w=t.smoothOrigin!==!1&&M.smooth,y=this._pt=new Ai(this._pt,o,Nt,0,1,M.renderTransform,M,0,-1),y.dep=1),g==="scale")this._pt=new Ai(this._pt,M,"scaleY",M.scaleY,(x?Ur(M.scaleY,x+d):d)-M.scaleY||0,du),this._pt.u=0,a.push("scaleY",g),g+="X";else if(g==="transformOrigin"){v.push(Ci,0,o[Ci]),h=ET(h),M.svg?mu(e,h,0,w,0,this):(_=parseFloat(h.split(" ")[2])||0,_!==M.zOrigin&&vs(this,M,"zOrigin",M.zOrigin,_),vs(this,o,g,Sl(c),Sl(h)));continue}else if(g==="svgOrigin"){mu(e,h,1,w,0,this);continue}else if(g in N0){CT(this,M,g,u,x?Ur(u,x+h):h);continue}else if(g==="smoothOrigin"){vs(this,M,"smooth",M.smooth,h);continue}else if(g==="force3D"){M[g]=h;continue}else if(g==="transform"){RT(this,h,e);continue}}else g in o||(g=ia(g)||g);if(E||(d||d===0)&&(u||u===0)&&!cT.test(h)&&g in o)m=(c+"").substr((u+"").length),d||(d=0),_=di(h)||(g in Hi.units?Hi.units[g]:m),m!==_&&(u=Ts(e,g,c,_)),this._pt=new Ai(this._pt,E?M:o,g,u,(x?Ur(u,x+d):d)-u,!E&&(_==="px"||g==="zIndex")&&t.autoRound!==!1?fT:du),this._pt.u=_||0,E&&S!==h?(this._pt.b=c,this._pt.e=S,this._pt.r=dT):m!==_&&_!=="%"&&(this._pt.b=c,this._pt.r=uT);else if(g in o)ST.call(this,e,g,c,x?x+h:h);else if(g in e)this.add(e,g,c||e[g],x?x+h:h,n,r);else if(g!=="parseTransform"){nd(g,h);continue}E||(g in o?v.push(g,0,o[g]):typeof e[g]=="function"?v.push(g,2,e[g]()):v.push(g,1,c||e[g])),a.push(g)}}A&&T0(this)},render:function(e,t){if(t.tween._time||!pd())for(var i=t._pt;i;)i.r(e,i.d),i=i._next;else t.styles.revert()},get:zn,aliases:Tn,getSetter:function(e,t,i){var n=Tn[t];return n&&n.indexOf(",")<0&&(t=n),t in Zn&&t!==Ci&&(e._gsap.x||zn(e,"x"))?i&&Ip===i?t==="scale"?_T:gT:(Ip=i||{})&&(t==="scale"?vT:xT):e.style&&!ed(e.style[t])?pT:~t.indexOf("-")?mT:ud(e,t)},core:{_removeProperty:Es,_getMatrix:gd}};Ri.utils.checkPrefix=ia;Ri.core.getStyleSaver=P0;(function(s,e,t,i){var n=wi(s+","+e+","+t,function(r){Zn[r]=1});wi(e,function(r){Hi.units[r]="deg",N0[r]=1}),Tn[n[13]]=s+","+e,wi(i,function(r){var a=r.split(":");Tn[a[1]]=n[a[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");wi("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(s){Hi.units[s]="px"});Ri.registerPlugin(F0);var jt=Ri.registerPlugin(F0)||Ri;jt.core.Tween;const Tr=[{start:0,end:3.25,label:"未曾抵达",kicker:"A LIFE BEYOND YOUR OWN",lines:["有些地方，","你还没能抵达。"],note:"有些感受，却一直想知道。"},{start:3.8,end:6.15,label:"身体条件",kicker:"01 / 身体条件",lines:["我走不到","海边。"],note:"借一位旅行者的记忆，感受海水漫过脚背。",word:"THE SEA"},{start:6.7,end:9.05,label:"时间",kicker:"02 / 时间",lines:["我错过了","毕业那天。"],note:"走进同学分享的合影，听见倒数后共同的笑。",word:"THAT DAY"},{start:9.6,end:11.95,label:"距离",kicker:"03 / 距离",lines:["我去不了","遥远的北方。"],note:"在另一人的冬天里，接住第一片雪。",word:"FAR AWAY"},{start:12.5,end:15.05,label:"人生境遇",kicker:"04 / 人生境遇",lines:["我曾为生活","放下舞台。"],note:"跟随第一次登台的人，感受谢幕时涌来的掌声。",word:"THE STAGE"},{start:15.6,end:18.45,label:"记忆成为入口",kicker:"A MOMENT, SHARED",lines:["他人亲历的一刻，","可以成为你的入口。"],note:"身体、时间、距离与境遇之外，还有另一种抵达。"},{start:19,end:26,label:"记忆售卖所",kicker:"MEMORY MARKET / 2048",lines:["未曾拥有，","也能感受。"],note:`通过他人自愿分享的记忆，
接近那些未能亲历的感受。`}];class PT{constructor(e,t){this.enter=e,this.afterExit=t,this.root=document.createElement("section"),this.root.id="memory-intro",this.root.hidden=!0,this.root.setAttribute("role","dialog"),this.root.setAttribute("aria-modal","true"),this.root.setAttribute("aria-label","记忆售卖所文字序幕"),this.root.innerHTML=`
      <header class="intro-header"><span class="intro-wordmark">MEMORY<br>MARKET<span class="intro-year">2048</span></span><button class="intro-skip" data-intro="enter">跳过序幕 <span aria-hidden="true">↗</span></button></header>
      <div class="intro-acts">${Tr.map((i,n)=>`
        <article class="intro-act ${n>0&&n<5?"intro-wish":"intro-statement"} ${n===6?"intro-final":""}" data-chapter="${n}" aria-hidden="true">
          ${i.word?`<div class="intro-ghost" aria-hidden="true">${i.word}</div>`:""}
          <div class="intro-copy"><p class="intro-kicker">${i.kicker}</p>
            ${n===6?"<h1":"<h2"} class="intro-heading">${i.lines.map((r,a)=>`<span class="intro-line-mask"><span class="intro-line ${a===1?"intro-accent":""}">${r}</span></span>`).join("")}${n===6?"</h1>":"</h2>"}
            <p class="intro-note">${i.note}</p>
            ${n===6?'<div class="intro-enter-wrap"><button class="intro-enter" data-intro="enter">进入记忆售卖所 <span aria-hidden="true">↗</span></button><span>EXPERIENCE BEYOND YOUR OWN</span></div>':""}
          </div>
        </article>`).join("")}</div>
      <footer class="intro-footer"><span class="intro-chapter"><b id="intro-index">01</b><i>/ 07</i><span id="intro-chapter-name">未曾抵达</span></span><span class="intro-controls"><span class="intro-keyhint">ENTER 跳过 · SPACE 暂停</span><button data-intro="pause" aria-label="暂停文字序幕" aria-pressed="false">暂停 <span aria-hidden="true">Ⅱ</span></button></span></footer>
      <div class="intro-progress" aria-hidden="true"><i></i></div>
      <p class="intro-sr" id="intro-status" aria-live="polite" aria-atomic="true"></p>`,document.body.append(this.root),this.root.querySelectorAll('[data-intro="enter"]').forEach(i=>i.addEventListener("click",()=>this.leave())),this.root.querySelector('[data-intro="pause"]').addEventListener("click",()=>this.togglePause()),document.addEventListener("keydown",this.onKey,!0),document.addEventListener("visibilitychange",()=>{!this.active||this.exiting||this.reduced||(this.visibilityPause=document.hidden,this.syncPause())})}enter;afterExit;root;context;timeline;active=!1;exiting=!1;reduced=!1;manualPause=!1;visibilityPause=!1;chapter=-1;duration=26;get isActive(){return this.active}get isExiting(){return this.exiting}play(e=!1){this.hide(),this.active=!0,this.exiting=!1,this.reduced=e,this.manualPause=!1,this.visibilityPause=document.hidden,this.chapter=-1,this.root.hidden=!1,this.root.dataset.static=String(e),document.body.dataset.intro="true",this.root.querySelectorAll("button").forEach(n=>{n.disabled=!1});const t=this.root.querySelector('[data-intro="pause"]');t.hidden=e,this.root.querySelector(".intro-keyhint").textContent=e?"ENTER 进入":"ENTER 跳过 · SPACE 暂停";const i=jt.utils.selector(this.root);this.context=jt.context(()=>{if(jt.set(this.root,{autoAlpha:1}),jt.set(i(".intro-act"),{autoAlpha:0}),jt.set(i(".intro-progress i"),{scaleX:0,transformOrigin:"left center"}),e){const r=this.root.querySelector('[data-chapter="6"]');jt.set(r,{autoAlpha:1}),jt.set(i(".intro-progress i"),{scaleX:1}),this.updateChapter(6);return}const n=jt.timeline({paused:!0,defaults:{ease:"power3.out"},onUpdate:()=>this.update(),onComplete:()=>this.leave()});this.timeline=n,Tr.forEach((r,a)=>{const o=this.root.querySelector(`[data-chapter="${a}"]`),l=o.querySelectorAll(".intro-line"),c=o.querySelectorAll(".intro-kicker, .intro-note, .intro-enter-wrap");n.set(o,{autoAlpha:1},r.start).fromTo(l,{yPercent:110,autoAlpha:0},{yPercent:0,autoAlpha:1,duration:a===6?1.1:.88,stagger:.11},r.start+.1).fromTo(c,{autoAlpha:0,y:10},{autoAlpha:1,y:0,duration:.7,stagger:.12},r.start+.42);const h=o.querySelector(".intro-ghost");h&&n.fromTo(h,{autoAlpha:0,xPercent:4},{autoAlpha:1,xPercent:0,duration:1.5},r.start+.15),a<6&&n.to(o,{autoAlpha:0,duration:.4,ease:"power2.inOut"},r.end)}),n.to(i(".intro-progress i"),{scaleX:1,duration:this.duration,ease:"none"},0)},this.root),this.syncPause(),this.root.querySelector('[data-intro="enter"]').focus({preventScroll:!0})}update(){const e=this.timeline?.time()??0;let t=0;Tr.forEach((i,n)=>{e>=i.start&&(t=n)}),this.updateChapter(t)}updateChapter(e){e!==this.chapter&&(this.chapter=e,this.root.querySelector("#intro-index").textContent=String(e+1).padStart(2,"0"),this.root.querySelector("#intro-chapter-name").textContent=Tr[e].label,this.root.querySelector("#intro-status").textContent=Tr[e].lines.join("")+" "+Tr[e].note,this.root.querySelectorAll(".intro-act").forEach((t,i)=>{t.setAttribute("aria-hidden",String(i!==e)),t.inert=i!==e}))}togglePause(){!this.active||this.exiting||this.reduced||(this.manualPause=!this.manualPause,this.syncPause())}syncPause(){const e=this.manualPause||this.visibilityPause;this.timeline?.paused(e);const t=this.root.querySelector('[data-intro="pause"]');t.innerHTML=e?'继续 <span aria-hidden="true">▷</span>':'暂停 <span aria-hidden="true">Ⅱ</span>',t.setAttribute("aria-label",e?"继续文字序幕":"暂停文字序幕"),t.setAttribute("aria-pressed",String(e))}leave(){if(!(!this.active||this.exiting)){if(this.exiting=!0,this.timeline?.kill(),this.root.querySelectorAll("button").forEach(e=>{e.disabled=!0}),this.reduced){this.enter(),this.hide(),this.afterExit();return}this.context.add(()=>{jt.timeline().to(this.root.querySelector(".intro-acts"),{opacity:0,duration:.35}).call(this.enter).to(this.root,{autoAlpha:0,duration:.9,ease:"power2.inOut"},"+=0.12").call(()=>{this.hide(),this.afterExit()})})}}hide(){this.context?.revert(),this.context=void 0,this.timeline=void 0,this.active=!1,this.exiting=!1,this.root.hidden=!0,document.body.dataset.intro="false"}seek(e){!this.timeline||this.exiting||(this.manualPause=!0,this.timeline.pause().time(Math.max(0,Math.min(this.duration-.01,e)),!0),this.update(),this.syncPause())}stats(){return{active:this.active,exiting:this.exiting,paused:this.timeline?.paused()??!0,time:this.timeline?.time()??0,duration:this.duration,chapter:this.chapter,reduced:this.reduced}}onKey=e=>{if(!(!this.active||e.key==="/")){if(e.key==="Tab"){const t=[...this.root.querySelectorAll("button:not(:disabled)")].filter(r=>!r.hidden&&!r.closest("[inert]")&&r.getClientRects().length>0&&getComputedStyle(r).visibility!=="hidden"),i=t[0],n=t.at(-1);e.shiftKey&&document.activeElement===i?(e.preventDefault(),n?.focus()):!e.shiftKey&&document.activeElement===n&&(e.preventDefault(),i?.focus()),e.stopImmediatePropagation();return}e.key==="Escape"||e.key==="Enter"?(e.preventDefault(),this.leave()):e.key===" "?(e.preventDefault(),this.togglePause()):e.key.startsWith("Arrow")&&e.preventDefault(),e.stopImmediatePropagation()}}}const Sa=[{start:2,end:5.05,label:"回到此刻",lines:["海浪退去了。","掌声也慢慢安静下来。"]},{start:5.5,end:8.95,label:"你的感受",lines:["这段记忆，来自另一个人。","这一刻，你有了自己的感受。"]},{start:9.4,end:12.95,label:"另一种抵达",lines:["你习以为常的一天，","也许，是另一个人","未曾抵达的地方。"]},{start:13.4,end:15.5,label:"记忆售卖所",lines:["记忆售卖所"]}];class DT{constructor(e,t,i){this.stage=e,this.explore=t,this.share=i,this.root=document.createElement("section"),this.root.id="memory-ending",this.root.hidden=!0,this.root.setAttribute("role","dialog"),this.root.setAttribute("aria-modal","true"),this.root.setAttribute("aria-label","记忆售卖所体验尾声"),this.root.innerHTML=`
      <header class="ending-header"><span class="ending-wordmark">MEMORY<br>MARKET<span>2048</span></span><button data-ending="skip">跳至结语 <span aria-hidden="true">↓</span></button></header>
      <div class="ending-acts">${Sa.map((n,r)=>`
        <article class="ending-act ${r===3?"ending-final":""}" data-ending-act="${r}" aria-hidden="true" inert>
          <div class="ending-copy"><p class="ending-kicker">${r===3?"MEMORY MARKET / A MOMENT, SHARED":`AFTER THE EXPERIENCE / 0${r+1}`}</p>
            <h2 class="ending-heading">${n.lines.map((a,o)=>`<span class="ending-line-mask"><span class="ending-line ${o===n.lines.length-1&&r!==3?"ending-accent":""}">${a}</span></span>`).join("")}</h2>
            ${r===3?'<p class="ending-tagline">让未曾抵达的人生，<span>被体验到。</span></p><p class="ending-note">你愿意分享的日常，也可以成为另一人的入口。</p><div class="ending-actions"><button class="ending-primary" data-ending="explore">再体验一段 <span aria-hidden="true">↗</span></button><button class="ending-share" data-ending="share">分享我的记忆 <span aria-hidden="true">→</span></button></div>':""}
          </div>
        </article>`).join("")}</div>
      <footer class="ending-footer"><span class="ending-chapter"><b id="ending-index">01</b><i>/ 04</i><span id="ending-chapter-name">回到此刻</span></span><span class="ending-controls"><span class="ending-keyhint">SPACE 暂停 · ESC 返回阵列</span><button data-ending="pause" aria-label="暂停体验尾声" aria-pressed="false">暂停 <span aria-hidden="true">Ⅱ</span></button></span></footer>
      <div class="ending-progress" aria-hidden="true"><i></i></div><p class="ending-sr" aria-live="polite" aria-atomic="true"></p>`,document.body.append(this.root),this.button("skip").addEventListener("click",()=>this.showFinal()),this.button("pause").addEventListener("click",()=>this.togglePause()),this.button("explore").addEventListener("click",()=>this.leave("explore")),this.button("share").addEventListener("click",()=>this.leave("share")),document.addEventListener("keydown",this.onKey,!0),document.addEventListener("visibilitychange",()=>{!this.active||this.exiting||this.reduced||this.finalReady||(this.visibilityPause=document.hidden,this.syncPause())})}stage;explore;share;root;context;timeline;active=!1;exiting=!1;reduced=!1;manualPause=!1;visibilityPause=!1;finalReady=!1;chapter=-1;previousInert=!1;duration=15.5;get isActive(){return this.active}button(e){return this.root.querySelector(`[data-ending="${e}"]`)}play(e=!1){this.hide(),this.previousInert=this.stage.inert,this.stage.inert=!0,this.active=!0,this.reduced=e,this.manualPause=!1,this.visibilityPause=document.hidden,this.finalReady=!1,this.chapter=-1,this.root.hidden=!1,document.body.dataset.ending="true",this.root.querySelectorAll("button").forEach(i=>{i.disabled=!1}),this.button("skip").hidden=!1,this.button("pause").hidden=!1,this.root.querySelector(".ending-keyhint").textContent="SPACE 暂停 · ESC 返回阵列",this.root.querySelectorAll(".ending-act").forEach(i=>{i.inert=!0,i.setAttribute("aria-hidden","true")});const t=jt.utils.selector(this.root);this.context=jt.context(()=>{if(jt.set(this.root,{opacity:e?1:0,visibility:"visible"}),jt.set(t(".ending-act"),{autoAlpha:0}),jt.set(t(".ending-progress i"),{scaleX:0,transformOrigin:"left center"}),e){jt.set(t('[data-ending-act="3"]'),{autoAlpha:1}),jt.set(t(".ending-progress i"),{scaleX:1}),this.updateChapter(3);return}const i=jt.timeline({paused:!0,defaults:{ease:"power3.out"},onUpdate:()=>this.update(),onComplete:()=>this.finish()});this.timeline=i,i.to(this.root,{opacity:1,duration:1.15,ease:"power2.inOut"},.85),Sa.forEach((n,r)=>{const a=this.root.querySelector(`[data-ending-act="${r}"]`);i.set(a,{autoAlpha:1},n.start).fromTo(a.querySelectorAll(".ending-line"),{yPercent:105,autoAlpha:0},{yPercent:0,autoAlpha:1,duration:.85,stagger:.12},n.start+.08).fromTo(a.querySelectorAll(".ending-kicker"),{autoAlpha:0},{autoAlpha:1,duration:.6},n.start+.2),r<3?i.to(a,{autoAlpha:0,duration:.4,ease:"power2.inOut"},n.end):i.fromTo(a.querySelectorAll(".ending-tagline, .ending-note, .ending-actions"),{autoAlpha:0,y:10},{autoAlpha:1,y:0,duration:.7,stagger:.15},n.start+.65)}),i.to(t(".ending-progress i"),{scaleX:1,duration:this.duration,ease:"none"},0)},this.root),e?this.finish():(this.syncPause(),this.button("skip").focus({preventScroll:!0}))}update(){const e=this.timeline?.time()??0;let t=0;Sa.forEach((i,n)=>{e>=i.start&&(t=n)}),this.updateChapter(t)}updateChapter(e){this.chapter!==e&&(this.chapter=e,this.root.querySelector("#ending-index").textContent=String(e+1).padStart(2,"0"),this.root.querySelector("#ending-chapter-name").textContent=Sa[e].label,this.root.querySelector(".ending-sr").textContent=Sa[e].lines.join("")+(e===3?"。让未曾抵达的人生，被体验到。":""),this.root.querySelectorAll(".ending-act").forEach((t,i)=>{t.inert=i!==e,t.setAttribute("aria-hidden",String(i!==e))}))}finish(){this.finalReady=!0,this.updateChapter(3);const e=this.root.contains(document.activeElement)&&!document.activeElement?.closest(".ending-actions");this.button("skip").hidden=!0,this.button("pause").hidden=!0,this.root.querySelector(".ending-keyhint").textContent="ESC 返回阵列",(e||this.reduced)&&this.button("explore").focus({preventScroll:!0})}showFinal(){!this.active||this.exiting||(this.timeline?.pause().time(this.duration,!0),this.finish())}togglePause(){!this.active||this.exiting||this.reduced||this.finalReady||(this.manualPause=!this.manualPause,this.syncPause())}syncPause(){const e=this.manualPause||this.visibilityPause;this.timeline?.paused(e),this.button("pause").innerHTML=e?'继续 <span aria-hidden="true">▷</span>':'暂停 <span aria-hidden="true">Ⅱ</span>',this.button("pause").setAttribute("aria-label",e?"继续体验尾声":"暂停体验尾声"),this.button("pause").setAttribute("aria-pressed",String(e))}leave(e){if(!this.active||this.exiting)return;this.exiting=!0,this.timeline?.kill(),this.root.querySelectorAll("button").forEach(i=>{i.disabled=!0});const t=()=>{this.hide(),(e==="share"?this.share:this.explore)()};this.reduced?t():this.context.add(()=>{jt.to(this.root,{autoAlpha:0,duration:.65,ease:"power2.inOut",onComplete:t})})}hide(){this.context?.revert(),this.context=void 0,this.timeline=void 0,this.active&&(this.stage.inert=this.previousInert),this.active=!1,this.exiting=!1,this.root.hidden=!0,document.body.dataset.ending="false"}seek(e){!this.timeline||this.exiting||(this.manualPause=!0,this.timeline.pause().time(Math.max(0,Math.min(this.duration,e)),!0),this.update(),e>=this.duration?this.finish():(this.finalReady=!1,this.button("skip").hidden=!1,this.button("pause").hidden=!1,this.root.querySelector(".ending-keyhint").textContent="SPACE 暂停 · ESC 返回阵列",this.syncPause(),document.activeElement?.closest("[inert]")&&this.button("skip").focus({preventScroll:!0})))}stats(){return{active:this.active,exiting:this.exiting,time:this.timeline?.time()??0,duration:this.duration,paused:this.timeline?.paused()??!0,chapter:this.chapter,final:this.finalReady,reduced:this.reduced}}onKey=e=>{if(this.active){if(e.stopImmediatePropagation(),this.exiting){["Tab","Enter"," "].includes(e.key)&&e.preventDefault();return}if(e.key==="Tab"){const t=[...this.root.querySelectorAll("button:not(:disabled)")].filter(r=>!r.hidden&&!r.closest("[inert]")&&r.getClientRects().length>0&&getComputedStyle(r).visibility!=="hidden"),i=t[0],n=t.at(-1);e.shiftKey&&document.activeElement===i?(e.preventDefault(),n?.focus()):!e.shiftKey&&document.activeElement===n&&(e.preventDefault(),i?.focus())}else e.key==="Escape"?(e.preventDefault(),this.leave("explore")):e.key===" "&&!this.finalReady?(e.preventDefault(),this.togglePause()):(e.key==="/"||e.key.startsWith("Arrow"))&&e.preventDefault()}}}class IT{enabled=!1;context;play(e="tick"){if(this.enabled)try{this.context??=new AudioContext;const t=this.context;t.state==="suspended"&&t.resume();const i=t.createOscillator(),n=t.createGain();i.type="sine";const r={tick:760,open:420,confirm:960,back:320}[e];i.frequency.setValueAtTime(r,t.currentTime),i.frequency.exponentialRampToValueAtTime(r*(e==="open"?1.8:.7),t.currentTime+.13),n.gain.setValueAtTime(1e-4,t.currentTime),n.gain.exponentialRampToValueAtTime(.035,t.currentTime+.008),n.gain.exponentialRampToValueAtTime(1e-4,t.currentTime+.18),i.connect(n),n.connect(t.destination),i.start(),i.stop(t.currentTime+.2)}catch{}}}const Ne=1280,ke=720,Li=Math.PI*2,LT=s=>Math.max(0,Math.min(1,s)),ks=s=>(s=LT(s),s*s*(3-2*s)),it=s=>{const e=Math.sin(s*127.1+311.7)*43758.5453;return e-Math.floor(e)},NT={1:"雨中的归途",2:"海面日出",3:"站台告别",4:"天亮前的城市",5:"声纹与呼吸",6:"夏日午后",7:"跑向终点",9:"街角初雪",10:"旧街关门",11:"驶向黄昏的公交",13:"学会骑车",14:"围巾的温度",15:"为你留的热汤",16:"门后的小狗",17:"雨中共伞",18:"门缝里的灯",19:"山脊与云海",20:"舞台谢幕",21:"屋顶与慢云",22:"毕业礼堂",23:"电话那端的欢呼",24:"折起的车票",25:"最后一张合影",26:"街角花开",27:"空房与第一把钥匙",28:"一个人的烛光",29:"山野银河",30:"夜班车窗",31:"没有地址的信",32:"异乡雨窗",33:"不必赶时间的午饭",34:"被相信的一刻"};function Vp(s){return NT[Number(s.id.slice(2))]||"记忆档案 · "+s.title}class OT{constructor(e,t,i){this.c=e,this.t=t,this.beat=i}c;t;beat;rect(e,t,i,n,r,a=0){const o=this.c;o.fillStyle=r,o.beginPath(),o.roundRect(e,t,i,n,a),o.fill()}path(e,t,i=!1,n=2){const r=this.c;r.beginPath(),e.forEach(([a,o],l)=>l?r.lineTo(a,o):r.moveTo(a,o)),i?(r.strokeStyle=t,r.lineWidth=n,r.lineCap="round",r.lineJoin="round",r.stroke()):(r.closePath(),r.fillStyle=t,r.fill())}circle(e,t,i,n){const r=this.c;r.beginPath(),r.arc(e,t,i,0,Li),r.fillStyle=n,r.fill()}line(e,t,i,n,r,a=2){this.path([[e,t],[i,n]],r,!0,a)}glow(e,t,i,n){const r=this.c,a=r.createRadialGradient(e,t,0,e,t,i);a.addColorStop(0,n),a.addColorStop(1,"transparent"),r.fillStyle=a,r.fillRect(e-i,t-i,i*2,i*2)}sky(e,t){const i=this.c.createLinearGradient(0,0,0,ke);i.addColorStop(0,e),i.addColorStop(1,t),this.c.fillStyle=i,this.c.fillRect(0,0,Ne,ke)}text(e,t,i,n=22,r="#efe8d5",a="left"){const o=this.c;o.fillStyle=r,o.font=`400 ${n}px MiSans, sans-serif`,o.textAlign=a,o.fillText(e,t,i)}rain(e=120,t=!1){for(let i=0;i<e;i++){const n=(it(i)*1420-this.t*(t?12:70)+14200)%1420-60,r=(it(i+70)*850+this.t*(t?28:390))%850-60,a=.15+it(i+9)*.38;t?this.circle(n+Math.sin(this.t*.5+i)*12,r,1.3+it(i)*4,`rgba(244,244,233,${a})`):this.line(n,r,n-8,r+24,`rgba(204,227,224,${a})`,1)}}dust(e=45,t="#f4d19e"){this.c.save();for(let i=0;i<e;i++)this.c.globalAlpha=.13+Math.sin(this.t*.8+i)**2*.25,this.circle(it(i)*Ne+Math.sin(i+this.t*.3)*12,(it(i+22)*ke-this.t*5+ke)%ke,1+it(i+2)*2,t);this.c.restore()}cloud(e,t,i=1,n="#e5dace"){const r=this.c;r.save(),r.translate(e,t),r.scale(i,i);for(let a=0;a<7;a++)r.beginPath(),r.ellipse(a*50-150,Math.sin(a)*10,70,20+it(a)*13,0,0,Li),r.fillStyle=n,r.fill();r.restore()}hills(e,t,i=0){const n=[[0,ke],[0,t]];for(let r=0;r<=Ne;r+=100)n.push([r,t+Math.sin(r*.008+i)*60+Math.cos(r*.017+i)*25]);n.push([Ne,ke]),this.path(n,e)}city(e,t,i=!1,n=0){for(let r=-1;r<16;r++){const a=r*95-n%95,o=70+it(r+50)*180;if(this.rect(a,e-o,80,o,t),i)for(let l=0;l<5;l++)for(let c=0;c<3;c++)it(r*55+l*7+c)>.57&&this.rect(a+12+c*22,e-o+18+l*30,8,12,"#ccac75")}}person(e,t,i=1,n="#273b41",r=0){const a=this.c;a.save(),a.translate(e,t),a.scale(i,i),a.rotate(r),this.circle(0,-97,14,n),this.path([[-15,-77],[13,-77],[24,-21],[-22,-21]],n),this.line(-10,-26,-16,20,n,10),this.line(10,-26,17,20,n,10),this.line(-10,-65,-33,-28,n,8),this.line(11,-64,29,-29,n,8),a.restore()}steam(e,t){for(let i=0;i<5;i++){const n=this.c;n.save(),n.globalAlpha=.1+.1*Math.sin(this.t+i)**2,n.strokeStyle="#fff0d8",n.lineWidth=3,n.beginPath();for(let r=0;r<30;r++){const a=r*4,o=e+(i-2)*20+Math.sin(r*.11+this.t+i)*13;r?n.lineTo(o,t-a):n.moveTo(o,t-a)}n.stroke(),n.restore()}}bowl(e,t,i=1){const n=this.c;n.save(),n.translate(e,t),n.scale(i,i),this.glow(0,-40,190,"#ddb57548"),n.beginPath(),n.ellipse(0,0,100,30,0,0,Li),n.fillStyle="#b9aca0",n.fill(),this.path([[-100,0],[-66,70],[63,70],[100,0]],"#d6cbb7"),n.beginPath(),n.ellipse(0,0,85,23,0,0,Li),n.fillStyle="#ad7543",n.fill(),this.steam(0,-20),n.restore()}window(e,t,i,n,r="#e9c987"){this.glow(e+i/2,t+n/2,i,r+"55"),this.rect(e-12,t-12,i+24,n+24,"#394b50",3),this.rect(e,t,i,n,r),this.line(e+i/2,t,e+i/2,t+n,"#4d5049",9),this.line(e,t+n*.45,e+i,t+n*.45,"#4d5049",8)}phone(e,t,i=!1){if(this.glow(e,t,280,"#e1bd7040"),this.rect(e-120,t-190,240,390,"#162a31",28),this.rect(e-107,t-173,214,346,"#30494a",20),this.rect(e-30,t-158,60,6,"#84978b",3),this.circle(e,t+185,7,"#78877b"),i){for(let n=0;n<40;n++){const r=10+Math.sin(this.t*3-n*.6)**2*50*Math.sin(n/39*Math.PI);this.line(e-84+n*4.4,t-r,e-84+n*4.4,t+r,"#e8c59c",2.5)}this.circle(e,t+106,20,"#b99d72"),this.path([[e-4,t+98],[e+9,t+106],[e-4,t+114]],"#263d3e")}else{this.circle(e,t-72,35,"#aaad95"),this.person(e,t-25,.45,"#30494a");for(let n=0;n<3;n++)this.circle(e+(n-1)*42,t+110,13,n===1?"#d3c39d":"#6c827c")}}}const Jc=new Map;function gu(s,e,t,i=!1){(s.width!==Ne||s.height!==ke)&&(s.width=Ne,s.height=ke);const n=s.getContext("2d");if(!n)return;const r=i?7:Math.max(0,Math.min(t,12)),a=Math.min(2,Math.floor(r/4)),o=Number(e.id.slice(2)),l=new OT(n,r,a);n.save(),n.clearRect(0,0,Ne,ke),n.translate(Ne/2,ke/2);const c=1.015+Math.min(r,12)*.002;switch(n.scale(c,c),n.translate(-Ne/2+Math.sin(r*.18)*5,-ke/2),o){case 1:case 18:case 32:{l.sky("#263c45","#89918a"),l.city(650,"#35474b"),l.rect(400,90,440,600,"#5a6460");for(let u=0;u<4;u++)for(let f=0;f<3;f++)l.window(450+f*120,135+u*126,70,82,o===18&&u!==2?"#65746c":"#d6b779");o===18&&(l.sky("#17272e","#414c49"),l.path([[0,ke],[400,180],[880,180],[Ne,ke]],"#203337"),l.rect(544,155,190,420,"#b49465"),l.rect(564,160,170,410,"#293737"),l.path([[550,560],[735,560],[1030,ke],[300,ke]],"#d0a96b49"),l.glow(550,400,180,"#eac88b58")),o===32&&(l.rect(145,455,98,142,"#866d5b",12),l.rect(174,422,37,38,"#36464a",4),l.circle(165,601,8,"#263840"),l.circle(224,601,8,"#263840"),l.text("NORTH ST.  /  04",80,105,22,"#b3bdb4")),o!==18?l.rain():l.dust(16),o===1&&a>0&&(l.person(726,295,.48,"#7e583d"),l.rect(710,209,39,45,"#d2b37f"));break}case 2:{const u=ks((r-5)/6);l.sky("#233e50",`rgb(${170+u*52},${165+u*27},${155+u*8})`),l.glow(780,315,270,"#ffdca256"),l.circle(780,350-u*75,39,"#f7dbac"),l.rect(0,358,Ne,362,"#497779");for(let f=0;f<38;f++){const p=360+f*9;for(let g=0;g<4;g++){const m=(it(f*7+g)*1450+r*(g%2?9:-9)+1450)%1450-80;l.line(m,p,m+25+f*2,p,`rgba(226,216,173,${.12+u*.18})`,.8+f*.05)}}l.path([[0,575],[Ne,540],[Ne,ke],[0,ke]],"#bbaf97");for(let f=0;f<5;f++){const p=545+f*17+Math.sin(r*.7+f)*9;l.path([[0,p],[230,p+18],[650,p-9],[Ne,p+4]],"#e3ded0",!0,2.5)}for(let f=0;f<6;f++)n.save(),n.translate(455+f*35,661-f*18),n.rotate(-.3),n.scale(1,.5),l.circle(0,0,7,"#8f9284"),n.restore();break}case 3:case 24:{l.sky("#30464e","#89948c"),l.path([[0,0],[Ne,0],[Ne,130],[0,270]],"#1b2e37"),l.path([[0,680],[Ne,460],[Ne,ke],[0,ke]],"#6e7870"),l.line(0,625,Ne,446,"#dbcda4",9),l.line(0,675,Ne,473,"#2d4047",8);const u=o===3?ks((r-5)/7)*1600:80;l.rect(160+u,200,1090,285,"#acb6a8",14),l.rect(160+u,415,1090,35,"#6b847e");for(let f=0;f<7;f++)l.rect(210+f*145+u,245,110,120,"#324f59",12);l.person(510+u,371,.55,"#c6b992"),l.circle(280,125,48,"#d2ccb5"),l.circle(280,125,42,"#344c50"),l.line(280,125,280,95,"#d8cbb2",3),l.line(280,125,301,135,"#d8cbb2",3),o===24&&(n.save(),n.translate(710,420),n.rotate(-.12+Math.sin(r*.3)*.025),l.rect(-235,-90,470,180,"#ded5b9",9),l.line(70,-80,70,80,"#9c9177",2),l.text("ONE WAY",-206,-37,22,"#64756b"),l.text("2031 / 09 / 15",-206,14,26,"#43534d"),l.line(-200,42,35,42,"#9d967a",2),l.line(-25,-84,-25,84,"#a99c7c44",4),n.restore());break}case 4:case 10:{l.sky("#394b60",a===2?"#d5bea0":"#8c9c9e"),l.city(390,"#5b6a6a"),l.path([[0,720],[485,360],[790,360],[Ne,ke]],"#445353");for(let u=0;u<7;u++)l.path([[560-u*40,520+u*25],[690-u*20,512+u*25],[710-u*20,526+u*25],[565-u*44,541+u*25]],"#d0c6ad");if(o===4){l.line(945,160,945,630,"#263d40",15),l.rect(894,160,100,240,"#253b3b",23);for(let u=0;u<3;u++)l.circle(944,207+u*70,22,u===(a?2:0)?a?"#9cb891":"#d6a177":"#435754");l.glow(944,a?347:207,70,a?"#bbdb9340":"#f3b58730")}else for(let u=0;u<4;u++){const f=40+u*315;l.rect(f,240,265,300,"#8f8d76"),l.rect(f+10,280,245,200,"#3e5554"),l.rect(f+10,280,245,Math.min(200,30+ks(r/12)*170),"#7e8272");for(let p=0;p<9;p++)l.line(f+10,285+p*20,f+255,285+p*20,"#5a6b61",2);l.text(["早点","理发","旧书","杂货"][u],f+130,270,25,"#e8d1a4","center")}break}case 5:case 23:{if(l.sky("#243b40","#8b8973"),l.hills("#485950",565),l.phone(640,365,!0),o===23){l.phone(640,365);for(let u=0;u<4;u++){n.save(),n.globalAlpha=.4;const f=165+(r*30+u*45)%160;n.strokeStyle="#d4cba5",n.lineWidth=2,n.beginPath(),n.arc(640,345,f,-.8,.8),n.stroke(),n.beginPath(),n.arc(640,345,f,Math.PI-.8,Math.PI+.8),n.stroke(),n.restore()}}l.dust();break}case 6:case 21:{if(l.sky("#a5b6b0","#dfcda7"),l.cloud(600+r*3,145,1.5,"#e5ddc7"),o===21){l.city(460,"#8d9b91"),l.rect(0,500,Ne,220,"#b19d7d"),l.line(0,480,Ne,480,"#6c8178",9);for(let u=0;u<12;u++)l.line(u*115,480,u*115,565,"#6c8178",5)}else l.rect(0,530,Ne,190,"#927b5e"),l.window(70,100,360,360,"#d9d3ac");l.rect(780,380,70,190,"#80a796",18),l.rect(792,355,46,30,"#567a6d",7),l.rect(785,445,60,70,"#d9cfac",4);for(let u=0;u<12;u++)l.circle(789+it(u)*50,405+it(u+9)*140,2+it(u+1)*3,"#d6e5cd88");if(o===6){l.circle(1080,280,100,"#879888");for(let u=0;u<3;u++){const f=r*2+u*Li/3;l.path([[1080,280],[1080+Math.cos(f)*80,280+Math.sin(f)*80],[1080+Math.cos(f+.6)*65,280+Math.sin(f+.6)*65]],"#aab29c")}l.line(1080,290,1080,535,"#6c8377",10),l.rect(1030,530,100,10,"#6c8377",5)}l.dust();break}case 7:{l.sky("#6b8c94","#e6c89c"),l.city(340,"#8a9d92"),l.path([[0,ke],[510,310],[765,310],[Ne,ke]],"#b3755d");for(let f=0;f<5;f++)l.line(550+f*45,320,-200+f*410,ke,"#e1cbb0",4);const u=360+r*80%350;if(l.line(0,u,Ne,u,"#eee5cd",10),a===2){l.rect(0,450,Ne,12,"#f1dfb8");for(let f=0;f<90;f++){const p=it(f)*Ne,g=(it(f+6)*900+r*40)%900;l.rect(p,g,5,9,f%2?"#e9c990":"#c28a63")}}break}case 9:{l.sky("#526b7b","#c6ceca"),l.city(600,"#6b807f",!0),l.rect(0,600,Ne,120,"#b8c6c0"),l.path([[100,710],[230,535],[400,575],[310,720]],"#9b9185"),l.rain(95,!0),l.person(840,565,1.2,"#4e696d"),l.glow(1050,310,180,"#ffe0a330");break}case 11:case 30:{l.sky(o===30?"#132d3c":"#718f9b",o===30?"#817967":"#dfbe8e"),l.city(500,o===30?"#243f49":"#627e7e",!0,r*45),l.rect(0,0,58,ke,"#233b42"),l.rect(0,0,Ne,65,"#233b42"),l.rect(0,550,Ne,170,"#33464a");for(let u=0;u<3;u++)l.rect(125+u*445,58,13,495,"#324b50"),l.line(75+u*445,105,390+u*445,420,"#d7ddbd20",3);if(l.path([[770,720],[735,455],[1010,425],[1120,720]],"#293d41"),l.line(770,665,1090,645,"#718075",5),o===11)l.person(425,630,1.5,"#52635a"),l.person(570,625,1.3,"#576457"),l.cloud(620+r*5,190,1.8,"#edd6ad");else{l.person(635,540,1.9,"#70837a33");for(let u=0;u<11;u++)l.glow((it(u)*1500-r*80+2e3)%1500,280+it(u+2)*230,15+it(u)*20,"#e8c78866")}break}case 13:{l.sky("#839d9b","#e3d0ab"),l.hills("#a7b39a",390),l.path([[0,ke],[480,340],[780,340],[Ne,ke]],"#a99c7e");for(let f=0;f<12;f++){const p=f*130-r*25;l.line(p,380,p+30,0,"#526f5d",16)}const u=640+Math.sin(r*2)*15;for(const f of[u-120,u+120]){n.strokeStyle="#405754",n.lineWidth=6,n.beginPath(),n.arc(f,500,87,0,Li),n.stroke();for(let p=0;p<10;p++){const g=p*Li/10+r*2;l.line(f,500,f+Math.cos(g)*85,500+Math.sin(g)*85,"#728b76",2)}}l.path([[u-120,500],[u-18,368],[u+40,500],[u-120,500],[u+120,500],[u+60,345],[u-18,368]],"#5b776e",!0,8),l.person(940-ks(r/12)*200,410,.85,"#7d8970");break}case 14:{l.sky("#64777c","#c0b8a2"),l.rain(45,!0),n.save(),n.translate(650,340),n.rotate(Math.sin(r*.4)*.035),l.path([[-170,-130],[80,-120],[160,80],[50,160],[-145,135],[-190,-60]],"#b59276"),l.path([[-20,50],[60,70],[110,310],[10,300]],"#bb9979");for(let u=0;u<15;u++)l.line(-160+u*20,-115,-140+u*20,125,"#e8c9a344",3);l.glow(0,80,170,"#e9c18c30"),n.restore();break}case 15:case 33:{l.sky("#5d756f","#d7c6a2"),l.window(850,70,300,320,"#d3c4a0"),l.rect(0,520,Ne,200,"#9e8361"),l.bowl(590,485,1.45),l.line(815,473,945,520,"#b8bca4",9),o===15?(l.rect(80,120,230,420,"#405a53"),l.path([[270,145],[330,160],[330,555],[270,535]],"#d2b480"),l.glow(306,350,220,"#e1bb7545")):(l.rect(145,505,110,170,"#53685c",10),l.rect(160,520,80,130,"#273d3a",7),l.path([[820,720],[Ne,565],[Ne,615],[990,ke]],"#4b604933")),l.dust(20);break}case 16:{l.sky("#455c55","#b5ad8c"),l.path([[0,ke],[300,300],[970,300],[Ne,ke]],"#9c896c"),l.rect(440,25,440,490,"#3c514b"),l.path([[475,70],[810,120],[810,510],[475,485]],"#c4a67c");const u=Math.sin(r*3)*8;l.path([[500,565],[510,470+u],[545,425+u],[675,425+u],[710,565]],"#baa382"),l.circle(604,422+u,65,"#c5ac87"),l.path([[550,390+u],[510,350+u],[535,450+u]],"#9b836b"),l.path([[655,390+u],[700,350+u],[680,450+u]],"#9b836b"),l.circle(582,415+u,6,"#384b43"),l.circle(628,415+u,6,"#384b43"),l.circle(604,448+u,12,"#48554a"),l.line(700,490,750+Math.sin(r*8)*25,450,"#bda27a",18);break}case 17:{l.sky("#334e5b","#a7b4ae"),l.city(580,"#4c686c"),l.rect(0,590,Ne,130,"#7c9590"),l.rain(150),l.line(660,240,660,500,"#dfcfaa",6),n.beginPath(),n.arc(660,310,215,Math.PI,Li),n.closePath(),n.fillStyle="#baa17b",n.fill(),l.path([[450,310],[525,282],[595,310],[665,282],[735,310],[805,282],[875,310]],"#e2d0a8",!0,3),l.person(580,575,1.65,"#354f54"),l.person(725,575,1.5,"#4e625c"),l.glow(650,430,230,"#dfcc9b16");break}case 19:case 29:{if(l.sky(o===29?"#102d42":"#608c9c",o===29?"#405767":"#e6d3ae"),l.hills(o===29?"#1a3541":"#789897",380,2),l.hills(o===29?"#172f39":"#547e81",470,5),o===29){for(let u=0;u<230;u++){const f=it(u)*Ne,p=it(u+500)*450;l.circle(f,p,.7+it(u+8)*1.5,`rgba(226,232,214,${.2+.6*Math.sin(r*.3+u)**2})`)}for(let u=0;u<100;u++){const f=it(u+5)*Ne;l.glow(f,130+Math.sin(f*.004)*90,12,"#b9cccf08")}l.path([[820,620],[960,437],[1150,620]],"#967e5b"),l.path([[960,437],[1040,620],[1150,620]],"#5d6654"),l.glow(1040,580,90,"#e7bf7144")}else{for(let u=0;u<9;u++)l.cloud(u*180+r*3,420+Math.sin(u)*70,1.3,"#e7d9bd");l.path([[0,ke],[360,530],[590,570],[760,ke]],"#4a6561");for(let u=0;u<9;u++)l.path([[80+u*42,680-u*15],[250+u*30,680-u*15]],"#bdbaa0",!0,5);l.glow(960,240,230,"#f8db9c44")}break}case 20:case 22:{if(l.sky("#152c37","#42504f"),l.rect(0,0,130,ke,"#5a4e48"),l.rect(Ne-130,0,130,ke,"#5a4e48"),l.path([[490,-20],[260,600],[820,600],[620,-20]],"#e9d9ac24"),l.path([[1040,-20],[630,600],[1140,600],[1100,-20]],"#d4c49b20"),l.glow(600,360,290,"#d8c29022"),l.rect(0,565,Ne,155,"#847963"),o===20){for(let u=0;u<4;u++)l.person(420+u*135,555,1.1,"#b9b9a1",a===2?.25:0);for(let u=0;u<32;u++)l.circle(u*44+Math.sin(r)*2,670+Math.sin(u)*15,15,"#263d42")}else l.person(480,560,1.5,"#b3b6a0"),l.person(790,560,1.5,"#9caa99"),l.rect(550,390,170,105,"#dacdaa",5),l.line(570,430,698,430,"#9c977d",3),l.circle(635,465,11,"#b09460"),a===2&&l.glow(640,310,650,`rgba(255,245,210,${.3*Math.exp(-(((r-8.15)*9)**2))})`);l.dust();break}case 25:{l.sky("#839991","#d4c4a0"),l.hills("#94a18a",500),l.rect(230,90,820,520,"#e6ddc2",7),l.rect(260,120,760,400,"#97a69b",2);for(let u=0;u<6;u++)l.person(375+u*100,425,.95+it(u)*.35,["#5c746a","#8c856e","#797961"][u%3]);l.text("2031.06.18",285,565,24,"#6d7767"),a===1&&l.glow(640,340,850,`rgba(255,250,225,${.55*Math.exp(-(((r-4.2)*5)**2))})`);break}case 26:{l.sky("#7f9a9c","#dfc4b1"),l.path([[100,ke],[570,330],[720,330],[1180,ke]],"#b2a58e");for(let u=0;u<2;u++)for(let f=0;f<5;f++){const p=u?900+f*80:380-f*80,g=100+f*60;l.line(p,g+450,p-30,g,"#726a5d",15-f*2);for(let m=0;m<38;m++){const _=it(m)*Li,x=it(m+33)*110;l.circle(p+Math.cos(_)*x,g+Math.sin(_)*x,8+it(m)*10,m%3?"#d9b7ad":"#efd8bf")}}for(let u=0;u<90;u++){const f=(it(u)*1400+r*15)%1400,p=(it(u+18)*900+r*25)%900;n.save(),n.translate(f,p),n.rotate(r+it(u)*5),n.scale(1,.5),l.circle(0,0,3+it(u+5)*4,"#ecd2c2"),n.restore()}break}case 27:{l.sky("#737f70","#d5c8a7"),l.path([[0,0],[Ne,0],[940,520],[340,520]],"#acb49c"),l.path([[0,ke],[340,520],[940,520],[Ne,ke]],"#a38b68"),l.window(840,130,280,260,"#e2d7ab"),l.rect(450,450,170,160,"#b0966a"),l.path([[450,450],[535,410],[705,418],[620,450]],"#d0b889"),n.save(),n.translate(550,345),n.rotate(Math.sin(r*.45)*.18),n.strokeStyle="#d7c18b",n.lineWidth=13,n.beginPath(),n.arc(0,0,32,0,Li),n.stroke(),l.line(24,24,100,110,"#d9c58d",15),l.line(74,87,90,70,"#d9c58d",12),n.restore();break}case 28:{l.sky("#1c343c","#615b49"),l.rect(0,555,Ne,165,"#665b46"),l.glow(640,340,230,"#e6b4654a"),l.rect(455,465,370,105,"#d0baa0",22),n.beginPath(),n.ellipse(640,465,185,45,0,0,Li),n.fillStyle="#e8d6b9",n.fill(),l.line(640,465,640,330,"#b59b76",13),n.save(),n.translate(640,307),n.scale(.8+Math.sin(r*9)*.05,1),l.path([[0,-34],[13,3],[0,24],[-13,4]],"#f2d593"),n.restore(),l.glow(640,306,70,"#f0be6950");break}case 31:{l.sky("#596b67","#b4a78b"),l.rect(0,120,Ne,600,"#8a795e"),n.save(),n.translate(600,370),n.rotate(-.1),l.rect(-280,-180,560,360,"#e2d6b7",6);for(let u=0;u<7;u++)l.line(-220,-110+u*35,-220+ks((r-u*.6)/3)*(290+it(u)*100),-110+u*35,"#8c8a70",2);l.path([[-240,85],[240,85],[240,260],[-240,260]],"#cfbea0"),l.path([[-240,85],[0,215],[240,85]],"#b5a98a",!0,2),l.rect(172,105,45,60,"#89947c"),l.line(25,235,180,235,"#a29577",2),n.restore();break}case 34:{l.sky("#526e6c","#d9c29d"),l.window(50,60,360,390,"#dad1a7"),l.rect(0,540,Ne,180,"#968468"),l.person(510,560,1.7,"#657b6b",-.07+ks(r/12)*.07),l.person(870,545,1.6,"#929b7b"),l.line(675,460,770-ks(r/12)*30,434,"#c5b697",11),l.glow(685,460,200,"#eed6a626"),l.bowl(660,540,.55),l.dust(25);break}default:{l.sky("#203a41","#74867b");const u=Number(e.id.slice(2));for(let f=0;f<6;f++)n.strokeStyle=`rgba(223,215,180,${.08+f*.025})`,n.lineWidth=1,n.beginPath(),n.ellipse(640,350,130+f*43,130+f*43,.2,0,Li),n.stroke();for(let f=0;f<70;f++){const p=f*Li/70+r*.08,g=160+Math.sin(f+u)*65,m=640+Math.cos(p)*g,_=350+Math.sin(p)*g;l.circle(m,_,f%9===0?4:1.5,"#d5c4a1"),f%7===0&&l.line(m,_,640,350,"#c6c7a224")}l.text(e.id,640,335,42,"#eee2c4","center"),l.text(e.title,640,390,30,"#d7d3b7","center"),l.dust(35);break}}n.restore();const h=n.createRadialGradient(Ne/2,ke*.43,160,Ne/2,ke/2,760);h.addColorStop(0,"transparent"),h.addColorStop(1,"#071c30a6"),n.fillStyle=h,n.fillRect(0,0,Ne,ke);const d=n.createLinearGradient(0,ke*.6,0,ke);if(d.addColorStop(0,"transparent"),d.addColorStop(1,"#0e242ba6"),n.fillStyle=d,n.fillRect(0,ke*.6,Ne,ke*.4),!Jc.has(e.id)){const u=document.createElement("canvas");u.width=128,u.height=128;const f=u.getContext("2d"),p=f.createImageData(128,128);for(let g=0;g<p.data.length;g+=4)p.data[g]=p.data[g+1]=p.data[g+2]=it(g)*255,p.data[g+3]=12;f.putImageData(p,0,0),Jc.set(e.id,n.createPattern(u,"repeat"))}n.fillStyle=Jc.get(e.id),n.fillRect(0,0,Ne,ke)}const k0="memory-replica-trades-v1",B0=()=>({balance:2400,owned:[],echoes:[],sold:[],receipts:[]});let dt=B0(),z0=()=>{},V0=()=>{},wn,Ct,rl=null,_u=0;function H0(){cancelAnimationFrame(_u),_u=0}const on=s=>s.replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]);try{const s=JSON.parse(localStorage.getItem(k0)||"null");s&&Number.isFinite(s.balance)&&s.balance>=0&&["owned","echoes","sold","receipts"].every(e=>Array.isArray(s[e]))&&(dt=s)}catch{}const At=s=>Ct.querySelector(s),fi=s=>s.personal&&dt.sold.includes(s.id),Wn=s=>s.personal?!fi(s):dt.owned.includes(s.id),El=s=>!fi(s);function G0(s){return s.price===0?"世界规则 · 可查阅":fi(s)?"原片已转让 · 体验缺失":s.personal?"原生记忆 · 私人所有":Wn(s)?"外源回声 · 已购入":`可先预览 · ${s.price} MC`}function W0(s){return`<div class="panel-label">${fi(s)?"MISSING MEMORY / 体验缺失":"A MOMENT TO EXPERIENCE / 这段体验"}${s.price&&!fi(s)?`<button class="fragment-listen" data-memory-action="listen" data-id="${s.id}">进入感官预览 ↗</button>`:""}</div><p>${fi(s)?"［ 这一段记忆，已经不在这里。 ］<br>你知道这件事曾经发生，却再也无法回到当时的感受。系统保留了编号与转让记录。":`<strong>${on(s.experience)}</strong><br>${on(s.abstract)}<br><small>感官线索：${on(s.sensory)}</small>`}</p>`}function UT(s){const e=s.price===0?"<span>系统文档不参与交易。</span>":fi(s)?"<span>原片已离开，留下的是记录。</span>":s.personal?`<button data-memory-action="echo" data-id="${s.id}" ${dt.echoes.includes(s.id)?"disabled":""}>${dt.echoes.includes(s.id)?"回声已授权":`分享回声 · ${Math.round(s.price*.35)} MC`}</button><button data-memory-action="sell" data-id="${s.id}">转让原片 · ${s.price} MC</button>`:Wn(s)?`<button data-memory-action="listen" data-id="${s.id}">体验回声 ↗</button><button data-memory-action="delete" data-id="${s.id}">删除回声</button>`:`<button data-memory-action="listen" data-id="${s.id}">预览体验 ↗</button><button data-memory-action="buy" data-id="${s.id}">购入回声 · ${s.price} MC</button>`;return`<div class="panel-label">EXPERIENCE ACCESS / 获得与分享</div><div class="memory-trade-line"><span>${G0(s)}</span><strong>余额 ${dt.balance.toLocaleString()} MC</strong></div><div class="memory-trade-actions">${e}</div><div class="memory-trade-tail"><span>${s.price===0?"2048 / 虚构世界档案":`${s.duration} / 完整度 ${s.integrity}% / 情绪浓度 ${s.intensity}%`}</span><button data-memory-action="vault">我的体验与凭证 ↗</button></div>`}function FT(s){return fi(s)?W0(s):`<div class="panel-label">SENSORY FRAGMENTS / 感官片段${s.price?`<button class="fragment-listen" data-memory-action="listen" data-id="${s.id}">预览这段体验 ↗</button>`:""}</div><ol class="research-notes">${s.findings.map((e,t)=>`<li><span>${String(t+1).padStart(2,"0")}</span>${on(e)}</li>`).join("")}</ol>`}function X0(){try{localStorage.setItem(k0,JSON.stringify(dt))}catch{}z0()}function Pa(){H0(),wn&&clearInterval(wn),wn=void 0,Ct.close(),Ct.classList.remove("is-experience"),Ct.innerHTML="",rl?.isConnected&&!rl.closest("[inert]")?rl.focus({preventScroll:!0}):document.querySelector("[data-tab].active")?.focus({preventScroll:!0})}function no(s){H0(),wn&&clearInterval(wn),wn=void 0,Ct.open||(rl=document.activeElement),Ct.classList.remove("is-experience"),Ct.innerHTML=`<div class="modal-top"><span>MEMORY MARKET / EXPERIENCE TERMINAL</span><button data-memory-action="close" aria-label="关闭体验终端（Esc）">关闭 <span>×</span></button></div><p class="memory-dialog-hint">Esc 关闭 · 内容可滚动</p>${s}`,Ct.open||Ct.showModal(),Ct.scrollTop=0,Ct.querySelector('[data-memory-action="close"]')?.focus({preventScroll:!0})}function kT(s,e,t){const i={number:`MM-2048-${String(dt.receipts.length+1).padStart(4,"0")}`,id:s.id,title:s.title,kind:e,amount:t,time:"2048.09.15 / "+new Date().toLocaleTimeString("en-GB")};return dt.receipts.unshift(i),X0(),i}function BT(s){const e=`MEMORY MARKET / 记忆交易凭证
${s.number}

记忆：${s.id} / ${s.title}
操作：${s.kind}
金额：${s.amount>0?"+":""}${s.amount} MC
日期：${s.time}

让未曾抵达的人生，被体验到。
本凭证来自课题 02 的虚构交互作品，不代表真实交易。`,t=document.createElement("a"),i=URL.createObjectURL(new Blob(["\uFEFF",e],{type:"text/plain;charset=utf-8"}));t.href=i,t.download=s.number+".txt",t.click(),setTimeout(()=>URL.revokeObjectURL(i),500)}function zT(s){no(`<h2>TRANSFER COMPLETE<small>${s.kind}完成</small></h2><div class="memory-receipt"><span>${s.number}</span><h3>${s.title}</h3><div><span>${s.id}</span><strong>${s.amount>0?"+":""}${s.amount} MC</strong></div><p>${s.time}</p><div class="memory-barcode" aria-hidden="true"></div><p>${s.kind==="原片转让"?"你获得了信用，也留下了一处无法回到的空白。":s.kind==="副本出售"?"回声已分享，你获得了信用，原生记忆仍由你保留。":s.kind==="回声删除"?"这份外源回声已从体验库移除，分享者的记忆不受影响。":"你获得了回看这段经历的权限。感受来自分享者，体验由你自己理解。"}</p></div><div class="memory-modal-actions"><button class="solid-button" data-memory-action="download" data-number="${s.number}">保存凭证 <span>下载文本 ↓</span></button><button class="export-button" data-memory-action="vault">我的体验与凭证 ↗</button></div>`)}function VT(s,e){const t=e==="buy"&&!s.personal&&s.price>0&&!Wn(s),i=(e==="echo"||e==="sell")&&s.personal&&!fi(s)&&(e!=="echo"||!dt.echoes.includes(s.id)),n=e==="delete"&&!s.personal&&Wn(s);if(!t&&!i&&!n)return;const r=e==="buy"?-s.price:e==="echo"?Math.round(s.price*.35):e==="sell"?s.price:0,a=e==="buy"?"ECHO ACQUISITION":e==="echo"?"ECHO LICENSE":e==="sell"?"ORIGINAL TRANSFER":"RELEASE ECHO",o=e==="buy"?"购入这段回声":e==="echo"?"分享一份回声副本":e==="sell"?"转让唯一原片":"删除外源回声",l=e==="buy"?"你将获得这段经历的个人回看权限。分享者保留原记忆，授权不包含转售或再次传播。体验中可暂停与退出，关闭不会自动购入。":e==="echo"?"你保留原生记忆，授权一份感官体验副本。同一记忆在本次演示中仅能出售一份回声。":e==="sell"?"你将失去这段第一人称感受，仍知道事情曾经发生。记忆目录会留下空位。这是关于自我的一次取舍。":"删除后不再访问这份外源回声，不退还 MC，也不影响原持有人的过去。";no(`<h2>${a}<small>${o}</small></h2><div class="memory-confirm-record"><span>${s.id} / ${s.category}</span><h3>${s.title}</h3><p>${l}</p></div><div class="memory-trade-line"><span>本次变动</span><strong>${r>0?"+":""}${r} MC</strong></div><div class="memory-trade-line"><span>当前余额</span><strong>${dt.balance.toLocaleString()} MC</strong></div><label class="memory-consent"><input id="memory-consent" type="checkbox"/><span>我理解并接受此次模拟交易的结果。</span></label><p class="memory-disclaimer">${dt.balance+r<0?"记忆信用不足。可在「我的体验与凭证」中查看个人记忆并分享回声。":"所有记忆、价格、身份与交易均为虚构，只保存在此浏览器。"}</p><div class="memory-modal-actions"><button data-memory-action="close" class="export-button">返回详情 ←</button><button id="memory-confirm" class="solid-button" disabled>确认${o} <span>→</span></button></div>`),At("#memory-consent").onchange=c=>{At("#memory-confirm").disabled=!c.target.checked||dt.balance+r<0},At("#memory-confirm").onclick=()=>{if(!At("#memory-consent").checked||dt.balance+r<0)return;if(e==="buy"){if(Wn(s))return;dt.owned.push(s.id)}if(e==="echo"){if(dt.echoes.includes(s.id)||fi(s))return;dt.echoes.push(s.id)}if(e==="sell"){if(fi(s))return;dt.sold.push(s.id)}if(e==="delete"){if(!Wn(s))return;dt.owned=dt.owned.filter(h=>h!==s.id)}dt.balance+=r;const c=kT(s,e==="buy"?"回声购入":e==="echo"?"副本出售":e==="sell"?"原片转让":"回声删除",r);zT(c)}}const Tl="memory-replica-reflections-v1";let Yn={};try{const s=JSON.parse(localStorage.getItem(Tl)||"{}");if(s&&typeof s=="object"&&!Array.isArray(s))for(const[e,t]of Object.entries(s))typeof t=="string"&&(Yn[e]=t.slice(0,240))}catch{}function HT(s){if(fi(s)||!s.price)return;no(`<div class="memory-experience-body"><h2>EXPERIENCE A MOMENT<small>${on(s.title)} / 12 秒动画预览</small></h2><p class="memory-intention">${on(s.intention)}</p><canvas id="memory-modal-film" class="memory-modal-film" aria-label="记忆动画预览"></canvas><div class="memory-playback"><span>${s.id} / ${on(s.lead)} · 个人体验授权</span><div class="memory-scan-lines" aria-hidden="true"></div><p id="memory-fragment" aria-live="polite"></p><small>${on(s.sensory)}</small></div><div class="memory-play-progress"><i id="memory-progress"></i></div><div class="memory-trade-line"><span id="memory-play-status"></span><span id="memory-play-time"></span></div><div class="experience-controls"><button id="memory-pause" type="button">暂停体验 Ⅱ</button><button data-memory-action="listen" data-id="${s.id}">重新体验 ↻</button><button data-memory-action="close">退出体验 ×</button></div><p class="memory-disclaimer">你正在接近他人的视角。画面以动画演绎感官片段，可随时暂停或退出。预览不会扣除信用。</p><div id="experience-reflection" hidden><label for="memory-reflection">这一刻让你想到了什么？<small>选填 · 最多 240 字 · 仅保存于此浏览器</small></label><textarea id="memory-reflection" maxlength="240" rows="2" placeholder="一种感受、一个细节，或留白。">${on(Yn[s.id]||"")}</textarea><button id="save-reflection">保存感受</button><span id="reflection-status" role="status"></span></div><div class="memory-modal-actions"><button class="export-button" data-memory-action="vault">我的体验 ↗</button><button class="solid-button" data-memory-action="${Wn(s)?"vault":"buy"}" data-id="${s.id}">${Wn(s)?"回到体验库":"获得回看权限"} <span>${Wn(s)?"查看已购回声":s.price+" MC · 下一步确认"} ↗</span></button></div></div><div class="experience-finish"><p id="experience-finish-hint" role="status">预览结束后开启尾声。<small>也可先留下感受，进入尾声时会一并保存。</small></p><button id="complete-experience" type="button" disabled>完成体验 · 观看尾声 ↗</button></div>`),Ct.classList.add("is-experience");let e=0,t=performance.now(),i=!1,n=-1;const r=()=>{const d=performance.now();!i&&!document.hidden&&(e=Math.min(12e3,e+Math.min(250,d-t))),t=d;const u=e/1e3,f=Math.min(2,Math.floor(u/4));f!==n&&(n=f,At("#memory-fragment").textContent=s.findings[f],document.querySelector("#stage")?.classList.contains("reduce-motion")||At("#memory-fragment").animate([{opacity:0},{opacity:1}],{duration:350})),At("#memory-progress").style.width=u/12*100+"%",At("#memory-play-time").textContent=`00:${String(Math.floor(u)).padStart(2,"0")} / 00:12`,At("#memory-play-status").textContent=u>=12?"体验结束 · 留下一点自己的感受":i?"已暂停 · 按继续回到这一刻":`感官片段 0${f+1} / 03`,u>=12&&(wn&&clearInterval(wn),wn=void 0,At("#memory-pause").disabled=!0,At("#memory-pause").textContent="体验已结束",At("#experience-reflection").hidden=!1,At("#complete-experience").disabled=!1,At("#experience-finish-hint").innerHTML="体验已结束，可以观看尾声。<small>填写的感受会一并保存，也可以留白。</small>")};At("#memory-pause").setAttribute("aria-pressed","false"),At("#memory-pause").onclick=()=>{r(),!(e>=12e3)&&(i=!i,t=performance.now(),At("#memory-pause").textContent=i?"继续体验 ▷":"暂停体验 Ⅱ",At("#memory-pause").setAttribute("aria-pressed",String(i)),r())};const a=()=>{const d=At("#memory-reflection").value.trim(),u={...Yn};d?u[s.id]=d:delete u[s.id];try{return localStorage.setItem(Tl,JSON.stringify(u)),Yn=u,At("#reflection-status").textContent=d?"已保存，可在我的体验中回看。":"已清除这条感受。",!0}catch{return At("#reflection-status").textContent="浏览器未允许保存，请复制保留，或清空后进入尾声。",!d}};At("#save-reflection").onclick=a,At("#complete-experience").onclick=()=>{e<12e3||!a()||(Pa(),V0())},r(),wn=setInterval(r,100);const o=At("#memory-modal-film"),l=()=>!!document.querySelector("#stage")?.classList.contains("reduce-motion");let c=-1;const h=()=>{if(!Ct.open||!o.isConnected)return;const d=Math.min(12,(e+(!i&&!document.hidden?Math.min(250,performance.now()-t):0))/1e3),u=Math.floor(d*24);u!==c&&(gu(o,s,d,l()),c=u),d<12&&(_u=requestAnimationFrame(h))};h()}function GT(){const s=Mt.filter(e=>Yn[e.id]);return s.length?`<div class="panel-label memory-vault-subtitle">REFLECTIONS / 我的体验回记</div>${s.map(e=>`<div class="experience-note"><strong>${on(e.title)}</strong><p>${on(Yn[e.id])}</p><button data-memory-action="forget-note" data-id="${e.id}">移除回记</button></div>`).join("")}`:""}function al(s=!1){const e=Mt.filter(i=>i.personal),t=Mt.filter(i=>dt.owned.includes(i.id));no(`<h2>MY EXPERIENCES<small>我的体验与凭证 / 可用信用 ${dt.balance.toLocaleString()} MC</small></h2><div class="memory-vault"><div class="panel-label">NATIVE / 原生记忆</div>${e.map(i=>`<div class="memory-vault-row"><div><span>${i.id} / ${fi(i)?"MISSING":"NATIVE"}</span><h3>${fi(i)?"［ 这一段记忆，已经不在这里 ］":i.title}</h3><p>${fi(i)?"只剩下发生过的知识，亲历的感受已被转让。":dt.echoes.includes(i.id)?"一份回声已授权，原片仍保留。":"仅属于你，尚未授权。"}</p></div><div>${fi(i)?"—":`<button data-memory-action="echo" data-id="${i.id}" ${dt.echoes.includes(i.id)?"disabled":""}>分享回声</button><button data-memory-action="sell" data-id="${i.id}">转让原片</button>`}</div></div>`).join("")}<div class="panel-label memory-vault-subtitle">EXTERNAL / 外源回声</div>${t.length?t.map(i=>`<div class="memory-vault-row"><div><span>${i.id} / EXTERNAL ECHO</span><h3>${i.title}</h3></div><div><button data-memory-action="listen" data-id="${i.id}">体验回声</button><button data-memory-action="delete" data-id="${i.id}">删除回声</button></div></div>`).join(""):'<p class="memory-vault-empty">尚未购入外源记忆。可以先寻找想体验的一刻，免费查看感官预览。</p>'}${GT()}<div class="panel-label memory-vault-subtitle">LEDGER / 授权与交易凭证</div>${dt.receipts.length?dt.receipts.map(i=>`<div class="memory-ledger"><span>${i.number}<small>${i.title} / ${i.kind}</small></span><strong>${i.amount>0?"+":""}${i.amount} MC</strong><button data-memory-action="download" data-number="${i.number}">保存 ↓</button></div>`).join(""):'<p class="memory-vault-empty">尚无交易记录。</p>'}</div><div class="modal-bottom"><span>2048 / 虚构交互作品 · 本地存档</span><button data-memory-action="reset">重新开始体验 ↻</button></div>`),s&&(Ct.querySelector("h2").insertAdjacentHTML("afterend",'<p class="memory-sharing-note">你习以为常的一天，也许是另一个人未曾抵达的地方。<br>选择一段原生记忆，分享回声副本，让别人接近你的感受；你的原生记忆仍然保留。</p>'),Ct.querySelector('[data-memory-action="echo"]:not(:disabled)')?.focus({preventScroll:!0}))}function WT(){al(!0)}function XT(s,e=()=>{}){z0=s,V0=e,Ct=document.createElement("dialog"),Ct.className="terminal-modal memory-modal",Ct.setAttribute("aria-label","记忆体验终端"),document.body.append(Ct),Ct.addEventListener("cancel",t=>{t.preventDefault(),Pa()}),Ct.addEventListener("click",t=>{if(t.target===Ct){const i=Ct.getBoundingClientRect();(t.clientX<i.left||t.clientX>i.right||t.clientY<i.top||t.clientY>i.bottom)&&Pa()}}),document.addEventListener("keydown",t=>{Ct.open&&(t.key==="Escape"&&(t.preventDefault(),Pa()),t.stopImmediatePropagation())},!0),document.addEventListener("click",t=>{const i=t.target.closest("[data-memory-action]");if(!i||i.hasAttribute("disabled"))return;const n=i.dataset.memoryAction,r=Mt.find(a=>a.id===i.dataset.id);if(n==="close")Pa();else if(n==="vault")al();else if(n==="download"){const a=dt.receipts.find(o=>o.number===i.dataset.number);a&&BT(a)}else if(n==="reset")no('<h2>NEW SESSION<small>重新开始体验？</small></h2><p class="memory-disclaimer">将清除当前浏览器中的体验回记和模拟交易，恢复三份原生记忆与 2,400 MC。寄存收藏和显示偏好保持不变。</p><div class="memory-modal-actions"><button class="export-button" data-memory-action="vault">保留当前记录 ←</button><button class="solid-button" data-memory-action="confirm-reset">RESET <span>确认重置</span></button></div>');else if(n==="confirm-reset"){dt=B0(),Yn={};try{localStorage.removeItem(Tl)}catch{}X0(),al()}else if(r)if(n==="listen")HT(r);else if(n==="forget-note"){delete Yn[r.id];try{localStorage.setItem(Tl,JSON.stringify(Yn))}catch{}al()}else VT(r,n)})}class YT{host=null;record=null;canvas=null;lastFrame=-1;lastMessage="";mount(e,t,i){if(this.host=e,this.record=t,this.lastFrame=-1,this.lastMessage="",!i){e.innerHTML='<div class="memory-cinema-missing"><span>MEMORY UNAVAILABLE</span><p>原片已离开，留下的是记录。</p></div>',this.canvas=null;return}e.innerHTML=`<div class="memory-cinema-heading"><span>MEMORY IN MOTION</span><span>${t.id} / <b>${t.price===0?"档案影像":"感官预览"}</b></span></div><div class="memory-cinema-screen"><canvas aria-label="${Vp(t)}动态画面"></canvas><div class="memory-cinema-gate"><i></i><span>正在展开这段记忆</span></div><div class="memory-cinema-film-label"><span>${Vp(t)}</span><span>01 — 03</span></div></div><div class="memory-cinema-progress" role="progressbar" aria-label="记忆播放进度" aria-valuemin="0" aria-valuemax="12" aria-valuenow="0"><i></i></div><p class="memory-cinema-subtitle"></p><div class="memory-cinema-toolbar"><span class="memory-cinema-state" role="status"></span><span class="memory-cinema-time">00:00 / 00:12</span><button type="button" data-action="disc-pause" aria-pressed="false">暂停 Ⅱ</button><button type="button" data-action="disc-replay">重播 ↻</button></div>`,this.canvas=e.querySelector("canvas"),gu(this.canvas,t,0)}update(e){const t=this.host,i=this.record,n=this.canvas;if(!t?.isConnected||!i||!n||!e.active||e.record!==i.id)return;const r=e.elapsed>=3.8,a=Math.min(2,Math.floor(e.playhead/4));t.classList.toggle("is-playing",r),t.classList.toggle("is-paused",e.paused);const o=Math.floor(e.playhead*24),l=t.getBoundingClientRect();o!==this.lastFrame&&!document.hidden&&l.bottom>0&&l.top<innerHeight&&(gu(n,i,e.playhead,e.reduced),this.lastFrame=o);const c=r?i.findings[a]:"外壳散开后，碟片将为你播放这段记忆。",h=e.paused?"已暂停":e.phase;c+h!==this.lastMessage&&(t.querySelector(".memory-cinema-subtitle").textContent=c,t.querySelector(".memory-cinema-state").textContent=h,t.querySelector(".memory-cinema-gate span").textContent=e.phase,this.lastMessage=c+h);const d=t.querySelector(".memory-cinema-progress");d.setAttribute("aria-valuenow",e.playhead.toFixed(1)),d.querySelector("i").style.transform=`scaleX(${e.playhead/12})`,t.querySelector(".memory-cinema-time").textContent=`00:${String(Math.floor(e.playhead)).padStart(2,"0")} / 00:12`,t.querySelector(".memory-cinema-film-label span:last-child").textContent=`0${a+1} — 03`;const u=t.querySelector('[data-action="disc-pause"]');u.textContent=e.paused?"继续 ▷":"暂停 Ⅱ",u.setAttribute("aria-pressed",String(e.paused))}}const Y0=new YT,qT=["全部记忆","身体条件","时间错过","距离阻隔","人生境遇","自然旅行","舞台时刻","城市日常","人与陪伴","往日片刻","独处感受","世界规则"],he=s=>document.querySelector(s);he("#stage").innerHTML=`
  <div id="three-scene" class="three-scene"></div>
  <div class="scene-atmosphere"></div>
  <div id="boot-background" class="boot-background"><svg viewBox="0 0 1920 1080" preserveAspectRatio="none"><g fill="none" stroke="#fff" stroke-width="3"><path d="M-210 705C-45 705 182 704 247 567C337 377 99 306 4 435S27 680 169 631C309 584 227 314 279 111S568-113 568-113"/><path d="M1560-80C1374 114 1671 168 1601 323S1371 367 1431 480S1692 666 1559 787S1329 886 1498 1130"/><circle cx="1450" cy="648" r="346"/><circle cx="1450" cy="648" r="348"/></g></svg></div>
  <header class="brand"><h1><span class="brand-cn">记忆售卖所</span><span class="brand-en">MEMORY MARKET</span></h1><div>EXPERIENCE BEYOND YOUR OWN</div><p>MEMORY <b>OS</b></p></header>
  <nav class="system-nav" aria-label="系统导航">
    <button data-action="search" aria-keyshortcuts="/" title="寻找体验（/）"><span class="nav-glyph" aria-hidden="true">⌕</span> 寻找体验 <span class="key">/</span></button>
    <button data-action="saved" aria-label="查看寄存记忆" title="寄存记忆">＋ 寄存记忆 <span id="saved-count">00</span></button>
    <button data-action="settings" aria-label="系统设置" title="系统设置"><span class="settings-glyph" aria-hidden="true">⚙</span> 设置</button>
  </nav>
  <button id="skip" class="skip" data-action="skip">ENTER SYSTEM <span>↗</span></button>
  <section id="boot" class="boot" aria-label="系统启动">
    <div class="access-text">ACCESS</div>
    <div class="boot-logo">${Vc}</div>
    <div class="auth-status"><span>▪</span> <span id="auth-message"></span><i></i></div>
    <div class="scan"><svg viewBox="0 0 1920 1080" aria-hidden="true"><g fill="none" stroke="#080a08" stroke-width="2" stroke-linecap="round"><path/><path stroke="#fff"/><path/><path/><path/><path/><circle class="orbit-dot" r="8" fill="#ed821b" stroke="none"/><circle class="orbit-dot" r="8" fill="#ed821b" stroke="none"/><circle class="scan-core" cx="960" cy="540" r="5" fill="#080a08" stroke="none"/></g></svg><span>PERMISSION AUTHORIZED</span></div>
    <div class="welcome"><div class="welcome-panel"></div><div class="welcome-heading">WELCOME TO</div><div class="welcome-company"><strong>MEMORY MARKET</strong><strong class="welcome-highlight" aria-hidden="true">MEMORY MARKET</strong></div><div class="welcome-database">让未曾抵达的人生，被体验到。</div><div class="welcome-logo">${Vc}</div></div>
  </section>
  <div id="cinema-caption" class="cinema-caption"></div>
  <svg id="inspection-marks" viewBox="0 0 1920 1080" aria-hidden="true"><path id="inspection-lines"/><g id="inspection-corners"></g></svg>
  <div id="inspection-text" aria-hidden="true">MEMORY LICENSE:<strong>PERSONAL MEMORY USE</strong></div>
  <section id="archive-ui" class="archive-ui" aria-label="记忆选择">
    <div class="archive-callout"><div class="eyebrow">MEMORY DATABASE <span>／</span> <span id="archive-category">温暖记忆</span></div><button class="file-title" data-action="open">MEMORY ID: <span id="selected-id">M-<span id="selected-code">001</span></span><span class="file-open">↗</span></button><div class="callout-rule"><i></i></div><div class="file-summary"><span id="selected-title">雨停之前</span><span id="selected-clearance">ECHO LICENSE</span></div><button class="read-file" data-action="open">查看这段记忆 <span>→</span></button></div>
    <div id="hover-label" class="hover-label" hidden>M-<span id="hover-code">001</span><span id="hover-title"></span></div>
    <div class="archive-counter"><span class="tiny-label">MEMORY / SELECT</span><div><span id="selected-number">01</span><i>/</i><span class="count-total">12</span></div></div>
    <div class="archive-navigation"><button data-action="prev" aria-label="上一个记忆">↑</button><div id="file-ticks" class="file-ticks"></div><button data-action="next" aria-label="下一个记忆">↓</button></div>
    <div class="column-navigation"><button data-action="column-prev" aria-label="上一列">←</button><div><span id="column-number">COLUMN <span id="column-index">03</span> / 05</span><strong id="column-name">温暖记忆</strong></div><button data-action="column-next" aria-label="下一列">→</button></div>
    <div class="archive-hint"><kbd>← →</kbd> 切换列 <span>／</span> <kbd>↑ ↓</kbd> 切换记忆 <span>／</span> <kbd>Enter</kbd> 查看 <span>／</span> 可点选记忆匣</div>
  </section>
  <section id="detail-ui" class="detail-ui" aria-label="记忆内容" hidden>
    <button class="back-button" data-action="back">← <span>返回记忆阵列</span><small>Esc</small></button>
    <div class="object-caption"><span id="object-id">NO.001</span><div>MEMORY DATABASE</div><small>拖动碟片改变角度 <span>↔</span></small><button class="viewer-open" data-action="model-viewer">360° 查看记忆匣 <span>↗</span></button></div>
    <article id="detail-content" class="detail-content"></article>
  </section>
  <div class="powered">POWERED BY <b>MEMORY MARKET</b><i></i></div>
  <footer class="system-footer"><span><i class="status-light"></i> SESSION AUTHORIZED</span><span>VISITOR 049 <i>／</i> <span id="clock">00:00:00</span></span><button data-action="ending" title="播放全屏文字尾声">观看尾声 ↗</button><button data-action="replay" title="重播文字开场">重播开场 ↻</button></footer>
  <div id="modal-root"></div><div id="toast" class="toast" role="status"></div>
  <div id="loading" class="loading"><div class="loading-mark">${Vc}</div><span>CONNECTING TO MEMORY DATABASE</span><i></i></div>
`;he("#boot-background").insertAdjacentHTML("beforeend",'<div class="boot-white"></div>');const q0=new hE(he("#stage"));let et="boot",gt=0,Fa=0,wl="",Ks=!1,It=null,Br="",zr="全部记忆",Za="overview";const vu=new URLSearchParams(location.search);let Hl=vu.get("freeze")==="1"?Number(vu.get("time")??0):null;vu.get("review")==="1"&&(he("#stage").dataset.review="true",window.addEventListener("message",s=>{if(s.origin!==location.origin||s.source!==window.parent||s.data?.type!=="rhine-review-frame")return;const e=Number(s.data.time);!Number.isFinite(e)||e<0||e>=35||(Hl=e,Ks&&et!=="boot"&&Wt("boot"))}));let Hp,ol=null,Al=[];function $0(s,e){try{return JSON.parse(localStorage.getItem(s)??"null")??e}catch{return e}}const Mn=new Set($0("memory-replica-saved",[])),Et=$0("memory-replica-settings",{sound:!1,reduced:matchMedia("(prefers-reduced-motion: reduce)").matches,quality:!1}),Vr=new PT(()=>Wt("archive"),()=>{et==="archive"&&!It&&he(".read-file").focus({preventScroll:!0})}),Ja=new DT(he("#stage"),()=>{Wt("archive"),he(".read-file").focus({preventScroll:!0})},()=>{Wt("archive"),he(".read-file").focus({preventScroll:!0}),WT()}),_d={locales:"en-US",format:{minimumIntegerDigits:2,useGrouping:!1},duration:460,motionBlur:!0,animated:!Et.reduced},j0=Rl(he("#selected-number"),{..._d,value:1}),K0=Rl(he("#column-index"),{..._d,value:3}),Z0={..._d,format:{minimumIntegerDigits:3,useGrouping:!1},value:1},vd=new oE(he("#selected-title")),J0=Rl(he("#selected-code"),Z0),Q0=Rl(he("#hover-code"),Z0),Si=new IT;Si.enabled=Et.sound;let nt,qn;const $T=[],eg=er.map((s,e)=>tr(e)[0]);function jT(){$T.unshift({id:Mt[gt].id,time:new Date().toLocaleTimeString("en-GB")})}function tg(){try{localStorage.setItem("memory-replica-settings",JSON.stringify(Et))}catch{}Si.enabled=Et.sound,Et.reduced&&vd.reset(),nt?.setReduced(Et.reduced),nt?.setQuality(Et.quality),j0.update({animated:!Et.reduced&&et==="archive"}),K0.update({animated:!Et.reduced&&et==="archive"}),J0.update({animated:!Et.reduced&&et==="archive"}),Q0.update({animated:!Et.reduced&&et==="archive"}),he("#stage").classList.toggle("reduce-motion",Et.reduced)}function ig(){const s=Math.min(innerWidth/1920,innerHeight/1080);he("#stage").style.transform=`translate(-50%, -50%) scale(${s})`,he("#viewport").style.setProperty("--scale",String(s)),nt?.resize(),qn?.resize()}window.addEventListener("resize",ig);ig();he("#file-ticks").innerHTML=Mt.map((s,e)=>`<button data-select="${e}" aria-label="选择记忆 ${s.id} ${s.title}" title="${s.id} · ${s.title}"></button>`).join("");function Wt(s){const e=s==="detail"&&et!=="detail";Ja.isActive&&Ja.hide(),s!=="intro"&&Vr.isActive&&!Vr.isExiting&&Vr.hide(),he("#stage").inert=s==="intro",s!=="archive"&&vd.reset(),s==="detail"&&et!=="detail"&&jT(),et=s,he("#stage").dataset.mode=s,he("#boot").inert=s!=="boot",he("#boot").setAttribute("aria-hidden",String(s!=="boot")),he("#archive-ui").inert=s!=="archive",he("#archive-ui").setAttribute("aria-hidden",String(s!=="archive")),he(".system-nav").inert=s==="boot"||s==="intro",he(".system-footer").inert=s==="boot"||s==="intro",he("#detail-ui").hidden=s!=="detail",nt?.setMode(s==="boot"||s==="intro"?"hidden":s),s!=="boot"&&(q0.reset(),he(".file-title").firstChild.textContent="MEMORY ID: ",he("#stage").dataset.boot="done",he("#cinema-caption").textContent=""),e&&El(Mt[gt])&&nt?.playDisc(Mt[gt]),s==="detail"&&Md()}function xd(){Hl=null,wl="",Wt("intro"),Vr.play(Et.reduced)}function yd(){na(),qn?.close(),Hl=null,Wt("archive"),Ja.play(Et.reduced)}function Zs(s,e){gt=(s+Mt.length)%Mt.length,eg[xs(gt).lane]=gt,et==="detail"&&Wt("archive"),Za="overview",nt?.select(gt,e),Gl(e),Si.play("tick")}function xu(s){const e=tr(xs(gt).lane);e.length<2||Zs(e[(e.indexOf(gt)+s+e.length)%e.length],{axis:"row",direction:s})}function Cl(s){const e=xs(gt).lane,t=tu(e+s,er.length);Zs(eg[t],{axis:"lane",direction:s})}function Gl(s){const e=Mt[gt],{lane:t}=xs(gt),i=tr(t);vd.update(e.title,!Et.reduced&&et==="archive"),he("#selected-clearance").textContent=e.price===0?"世界规则":e.tags[0],he("#archive-category").textContent=e.category;const n=s&&"axis"in s?s.direction>0?"up":"down":"auto";J0.update({value:Number(e.id.slice(2)),animated:!Et.reduced&&et==="archive",direction:n}),j0.update({value:i.indexOf(gt)+1,animated:!Et.reduced&&et==="archive",direction:s&&"axis"in s&&s.axis==="row"?n:"auto"}),he(".count-total").textContent=String(i.length).padStart(2,"0"),K0.update({value:t+1,animated:!Et.reduced&&et==="archive",direction:s&&"axis"in s&&s.axis==="lane"?n:"auto"}),he("#column-name").textContent=er[t],he('[data-action="column-prev"]').disabled=!1,he('[data-action="column-next"]').disabled=!1,document.querySelectorAll("[data-select]").forEach(r=>{r.hidden=!i.includes(Number(r.dataset.select)),r.classList.toggle("selected",Number(r.dataset.select)===gt),r.setAttribute("aria-pressed",String(Number(r.dataset.select)===gt))}),he("#saved-count").textContent=String(Mn.size).padStart(2,"0"),et==="detail"&&Md()}function Qa(){Ks&&(na(),Wt("detail"),Si.play("open"),he("#detail-content").focus({preventScroll:!0}))}function KT(){const s=Mt[gt].id;Mn.has(s)?Mn.delete(s):Mn.add(s);try{localStorage.setItem("memory-replica-saved",JSON.stringify([...Mn]))}catch{}Gl(),he('[data-action="bookmark"]').focus({preventScroll:!0}),Si.play("confirm"),sg(Mn.has(s)?"记忆已加入寄存":"已取消收藏")}function Md(){const s=Mt[gt];he("#object-id").textContent="NO."+String(gt+1).padStart(3,"0"),he("#detail-content").innerHTML=`
  <div class="detail-kicker"><span>FILE ${s.id}</span><span>${s.clearance}</span></div>
  <h2>${s.en}</h2><div class="detail-title-cn">${s.title}<span>${s.category}</span></div>
  <div class="detail-rule"></div>
  <section id="memory-cinema" aria-label="记忆动画播放器"></section>
  <dl class="metadata"><div><dt>EXPERIENCE / 体验主题</dt><dd>${s.tags.join(" / ")}</dd></div><div><dt>COLLECTION / 记忆日期</dt><dd>${s.date}</dd></div><div><dt>RELATED / 原持有人</dt><dd>${s.lead}</dd></div><div><dt>STATUS / 状态</dt><dd><i></i>${G0(s)}</dd></div></dl>
  <p class="detail-reading-hint">右侧内容可滚动 · 先预览，再决定是否获得回声</p>
  <div class="detail-tabs" role="tablist" aria-label="记忆详情"><button id="tab-overview" class="active" role="tab" aria-selected="true" aria-controls="tab-panel" data-tab="overview">01 <span>这段体验</span></button><button id="tab-notes" role="tab" aria-selected="false" aria-controls="tab-panel" data-tab="notes">02 <span>感官预览</span></button><button id="tab-history" role="tab" aria-selected="false" aria-controls="tab-panel" data-tab="history">03 <span>获得与分享</span></button></div>
  <div id="tab-panel" class="tab-panel" role="tabpanel" aria-labelledby="tab-overview">${ng()}</div>
  <div class="detail-actions"><button class="solid-button" data-action="bookmark">${Mn.has(s.id)?"− 取消寄存":"＋ 寄存记忆"}<span>保存索引 · 不会购买</span></button><a class="export-button" href="/archives/MEMORY-MARKET-${s.id}.txt" download="MEMORY-MARKET-${s.id}.txt" aria-label="导出 ${s.id} 记忆">导出档案 <span>↓</span></a></div>
  <div class="detail-footnote"><a href="${s.source}" target="_blank" rel="noopener">世界档案 ↗</a><span>${String(gt+1).padStart(3,"0")} / ${String(Mt.length).padStart(3,"0")}</span></div>`,he("#detail-content").setAttribute("tabindex","-1"),El(s)||nt?.stopDisc(),Y0.mount(he("#memory-cinema"),s,El(s)),bd(Za,!1)}function ng(){return W0(Mt[gt])}function bd(s,e=!0){Za=s,document.querySelectorAll("[data-tab]").forEach(i=>{const n=i.dataset.tab===s;i.classList.toggle("active",n),i.setAttribute("aria-selected",String(n)),i.setAttribute("tabindex",n?"0":"-1")});const t=Mt[gt];he("#tab-panel").setAttribute("aria-labelledby",`tab-${s}`),he("#tab-panel").innerHTML=s==="overview"?ng():s==="notes"?FT(t):UT(t),e&&Si.play("tick")}function sg(s){clearTimeout(Hp),he("#toast").textContent=s,he("#toast").classList.add("visible"),Hp=setTimeout(()=>he("#toast").classList.remove("visible"),2600)}function rg(s){Ks&&(It||(ol=document.activeElement,Al=[...he("#stage").children].filter(e=>e instanceof HTMLElement&&e.id!=="modal-root").map(e=>({node:e,inert:e.inert})),Al.forEach(({node:e})=>{e.inert=!0})),It=s,Br="",zr="全部记忆",Si.play("open"),ag())}function na(){It&&(It=null,he("#modal-root").innerHTML="",Al.forEach(({node:s,inert:e})=>{s.inert=e}),Al=[],ol?.isConnected&&!ol.closest("[inert]")?ol.focus({preventScroll:!0}):et==="archive"&&he(".read-file").focus({preventScroll:!0}))}function ag(){It&&(he("#modal-root").innerHTML=`<div class="modal-backdrop"><section class="terminal-modal ${It==="settings"?"settings-modal":""}" role="dialog" aria-modal="true" aria-label="${It==="settings"?"系统设置":It==="saved"?"寄存记忆":"记忆检索"}"><div class="modal-top"><span>MEMORY MARKET / ${It==="settings"?"SYSTEM PREFERENCES":"MEMORY DIRECTORY"}</span><button data-action="close-modal" aria-label="关闭窗口">关闭 <span>×</span></button></div>${It==="settings"?ZT():`<h2>${It==="saved"?"SAVED MEMORIES":"MEMORY INDEX"}<small>${It==="saved"?"寄存记忆":"你想体验怎样的一刻？"}</small></h2><div class="search-field"><span>⌕</span><input id="archive-search" type="search" autocomplete="off" placeholder="试试：无法远行、毕业、看海、陪伴" aria-label="检索记忆"/><span class="key" title="Esc 关闭搜索">Esc</span></div><div class="category-filters">${qT.map((s,e)=>`<button data-filter="${s}" aria-pressed="${e===0}" class="${e===0?"active":""}">${s}</button>`).join("")}</div><div class="result-header"><span>FILE / 记忆</span><span>EXPERIENCE / 你将接近</span><span>操作</span></div><div id="search-results" class="search-results"></div><div class="modal-bottom"><span id="result-count"></span><span>滚动查看列表 · Esc 关闭</span></div>`}</section></div>`,It!=="settings"?(Sd(),requestAnimationFrame(()=>he("#archive-search").focus())):requestAnimationFrame(()=>he('[data-action="close-modal"]').focus()),he("#modal-root").querySelector(".modal-backdrop")?.addEventListener("click",s=>{s.target===s.currentTarget&&na()}))}function Sd(){const s=Mt.map((e,t)=>({r:e,i:t})).filter(({r:e})=>(It!=="saved"||Mn.has(e.id))&&(zr==="全部记忆"||e.tags.includes(zr))&&`${e.id} ${e.title} ${e.en} ${e.department} ${e.lead} ${e.experience} ${e.intention} ${e.abstract} ${e.sensory} ${e.tags.join(" ")}`.toLowerCase().includes(Br.toLowerCase()));he("#search-results").innerHTML=s.length?s.map(({r:e,i:t})=>`<button class="result-row" data-result="${t}"><span class="result-name"><b>${e.id}</b><span>${e.title}<small>${e.tags.join(" / ")} · ${e.category}</small></span>${Mn.has(e.id)?"<i>＋</i>":""}</span><span>${e.experience}</span><span>${e.price===0?"了解规则":"查看详情"} <i>↗</i></span></button>`).join(""):`<div class="empty-results"><span>∅</span><strong>${It==="saved"&&!Br?"尚无寄存记忆":"没有匹配的记忆"}</strong><p>${It==="saved"&&!Br?"读取记忆时，选择 寄存记忆将其保存在此处。":"试试一种经历或感受，或选择其他体验主题。"}</p><button data-action="reset-search">${It==="saved"?"查看全部记忆 →":"重置检索 →"}</button></div>`,he("#result-count").textContent=`${String(s.length).padStart(2,"0")} RECORDS FOUND`}function ZT(){return`<h2>SYSTEM SETTINGS<small>终端偏好设置</small></h2><p class="settings-intro">VISITOR 049 <span>·</span> SESSION AUTHORIZED</p><div class="settings-list"><label><div><strong>INTERFACE SOUND</strong><span>界面反馈音</span></div><input type="checkbox" data-pref="sound" ${Et.sound?"checked":""}/><i class="toggle"></i></label><label><div><strong>REDUCED MOTION</strong><span>减少镜头移动和过渡动效</span></div><input type="checkbox" data-pref="reduced" ${Et.reduced?"checked":""}/><i class="toggle"></i></label><label><div><strong>HIGH QUALITY RENDERING</strong><span>环境遮蔽与高分辨率渲染</span></div><input type="checkbox" data-pref="quality" ${Et.quality?"checked":""}/><i class="toggle"></i></label></div><div class="settings-shortcuts"><span>键盘操作 / 随当前页面变化</span><p><span><kbd>← →</kbd> 阵列切列</span><span><kbd>↑ ↓</kbd> 阵列切记忆</span><span><kbd>Enter</kbd> 激活焦点按钮</span><span><kbd>/</kbd> 寻找体验</span><span><kbd>Esc</kbd> 关闭或返回</span><span><kbd>Space</kbd> 开场暂停 / 继续</span><span>详情标签获得焦点时，左右键切换标签</span></p></div><div class="settings-bottom"><button data-action="fullscreen">切换全屏 <span>↗</span></button><button data-action="restart">重播文字开场 <span>↻</span></button></div><div class="modal-bottom"><span>MEMORY OS / 1.0 · 使用 MiSans 字体（小米） <a href="/fonts/MiSans-license.pdf" target="_blank" rel="noopener">字体许可</a></span><span>POWERED BY MEMORY MARKET</span></div>`}document.addEventListener("input",s=>{s.target.id==="archive-search"&&(Br=s.target.value,Sd())});document.addEventListener("change",s=>{const e=s.target;e.dataset.pref&&(Et[e.dataset.pref]=e.checked,tg(),Si.play("confirm"))});document.addEventListener("click",s=>{const e=s.target.closest("button");if(!e)return;if(e.dataset.select){Zs(Number(e.dataset.select));return}if(e.dataset.result){Zs(Number(e.dataset.result)),Qa();return}if(e.dataset.filter){zr=e.dataset.filter,document.querySelectorAll("[data-filter]").forEach(i=>{const n=i.dataset.filter===zr;i.classList.toggle("active",n),i.setAttribute("aria-pressed",String(n))}),Sd();return}if(e.dataset.tab){bd(e.dataset.tab);return}const t=e.dataset.action;t==="disc-pause"&&nt?.pauseDisc(),t==="disc-replay"&&El(Mt[gt])&&nt?.playDisc(Mt[gt]),t==="skip"&&(Wt("archive"),Si.play("confirm")),t==="prev"&&xu(-1),t==="next"&&xu(1),t==="column-prev"&&Cl(-1),t==="column-next"&&Cl(1),t==="open"&&Qa(),t==="model-viewer"&&et==="detail"&&(qn??=new aE(he("#stage"),()=>Si.play("back")),qn.open(Mt[gt].id,Mt[gt].title,()=>nt.createAssemblyModel(),Et.reduced),Si.play("open")),t==="back"&&(Wt("archive"),he(".read-file").focus({preventScroll:!0}),Si.play("back")),(t==="search"||t==="saved"||t==="settings")&&rg(t),t==="close-modal"&&na(),t==="ending"&&yd(),t==="bookmark"&&KT(),t==="reset-search"&&(It="search",Br="",zr="全部记忆",ag()),(t==="replay"||t==="restart")&&(na(),qn?.close(),nt.select(0),gt=0,xd(),Gl(),Si.play("back")),t==="fullscreen"&&(document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen().catch(()=>sg("请使用浏览器的全屏快捷键 F11")))});document.addEventListener("keydown",s=>{if(qn?.isOpen)return;const e=s.target instanceof HTMLInputElement||s.target instanceof HTMLTextAreaElement||s.target instanceof HTMLElement&&s.target.isContentEditable;if(s.key==="Escape"){It?na():et==="detail"?(Wt("archive"),he(".read-file").focus({preventScroll:!0})):et==="boot"&&Ks&&Wt("archive");return}if(It&&s.key==="Tab"){const t=[...he("#modal-root").querySelectorAll('button:not(:disabled),input:not(:disabled),a[href],select,textarea,[tabindex="0"]')].filter(r=>!r.closest("[inert]")&&r.getClientRects().length>0&&getComputedStyle(r).visibility!=="hidden"),i=t[0],n=t.at(-1);s.shiftKey&&document.activeElement===i?(s.preventDefault(),n?.focus()):!s.shiftKey&&document.activeElement===n&&(s.preventDefault(),i?.focus());return}if(!(e||It||!Ks||s.ctrlKey||s.metaKey||s.altKey||s.isComposing)&&!(et==="intro"&&s.key!=="/")){if(s.target.dataset.tab&&["ArrowLeft","ArrowRight","Home","End"].includes(s.key)){s.preventDefault();const t=["overview","notes","history"];bd(s.key==="Home"?t[0]:s.key==="End"?t[2]:t[(t.indexOf(Za)+(s.key==="ArrowRight"?1:2))%3]),he(`[data-tab="${Za}"]`).focus();return}s.key==="/"&&(s.preventDefault(),(et==="boot"||et==="intro")&&Wt("archive"),rg("search")),s.key==="ArrowLeft"&&et==="archive"&&(s.preventDefault(),Cl(-1)),s.key==="ArrowRight"&&et==="archive"&&(s.preventDefault(),Cl(1)),["ArrowUp","ArrowDown"].includes(s.key)&&et==="archive"&&(s.preventDefault(),xu(s.key==="ArrowUp"?-1:1)),s.key==="Enter"&&document.activeElement===document.body&&(s.preventDefault(),et==="boot"?Wt("archive"):et==="archive"&&Qa())}});const xn=s=>(s=Math.max(0,Math.min(1,s)),s*s*(3-2*s));function JT(s){const e=q0.update(s);let t=e.step,i=e.step==="auth"?s<9.52?"身份信息确认：VISITOR 049":s<11.84?"请求已接收":"开始处理":e.step==="scan"?"权限验证通过":e.step==="welcome"?"让未曾抵达的人生，被体验到。":"";s>=22&&(t="array",i="选择记忆"),s>=25.68&&(t="select",i="编号：M-001"),s>=28.3&&(t="inspect",i=s>=29.3?"授权范围：个人回声体验":"编号：M-001"),t!==wl&&(he("#stage").dataset.boot=t,wl=t,["auth","scan","select"].includes(t)&&Si.play(t==="scan"?"confirm":"tick")),he("#cinema-caption").textContent=i,he(".file-title").firstChild.textContent=t==="array"?"SELECTING MEMORY..".slice(0,Math.max(0,Math.floor((s-21.94)*18))):"MEMORY ID: ",he("#stage").style.setProperty("--entry-opacity",String(xn((s-21.9)/.13))),he(".callout-rule").style.transform=`scaleX(${xn((s-22.08)/.9)})`;const n=xn((s-22)/.4),r=xn((s-26)/1.8),a=.55*xn((s-27.3)/1.65)+.45*xn((s-29)/5);if(s>=35){Wt("detail");return}return{reveal:n,lift:r,zoom:a,time:s}}let Gp=0,Qc=0,eh=performance.now(),yu=0;function og(s){const e=s/1e3;nt?.suspendDisc(!!(qn?.isOpen||It||document.querySelector("dialog.memory-modal[open]")||document.hidden));const t=et==="boot"&&Ks?JT(Hl??e-Fa):void 0;if(!document.hidden&&!qn?.isOpen&&nt?.update(e,t),qn?.update(e),nt&&et==="detail"){const r=nt.discPlayback;r&&Y0.update(r),he("#detail-content").style.opacity=String(nt.detailVisibility),he("#detail-content").style.transform=`translateY(${(1-nt.detailVisibility)*18}px)`,he("#detail-content").inert=nt.detailVisibility<.1}const i=t?.time??-1,n=xn((i-29.15)/.35)*(1-xn((i-31.4)/.5));if(he("#inspection-marks").style.opacity=String(n),he("#inspection-text").style.opacity=String(n),he("#inspection-text strong").style.opacity=String(xn((i-30.25)/.5)),nt&&n>0){const r=[[-2.05,3.04],[2.05,3.04],[-2.05,.35],[2.05,.35]].map(([h,d])=>nt.projectCard(h,d));he("#inspection-corners").innerHTML=r.map(([h,d])=>`<rect x="${h-4}" y="${d-4}" width="8" height="8"/>`).join("");const a=nt.projectCard(-1.88,.5),o=nt.projectCard(-.36,1.7),l=nt.projectCard(.36,2.04),c=nt.projectCard(1.9,2.9);he("#inspection-lines").setAttribute("d",`M${a}L${o}M${l}L${c}`)}if(nt&&i>32.5){const[r,a]=nt.projectCard(.15,1.9);he("#inspection-marks").style.opacity=String(xn((i-32.5)/.5)),he("#inspection-corners").innerHTML="",he("#inspection-lines").setAttribute("d",`M${r-2},${a}h4M${r},${a-2}v4`)}Math.floor(e)!==Gp&&(Gp=Math.floor(e),he("#clock").textContent=new Date().toLocaleTimeString("en-GB")),Qc++,s-eh>1e3&&(yu=Qc*1e3/(s-eh),eh=s,Qc=0,he("#three-scene").dataset.fps=String(Math.round(yu)),he("#three-scene").dataset.renderStats=JSON.stringify(nt?.getStats())),requestAnimationFrame(og)}async function QT(){try{nt=new X1(he("#three-scene")),await Promise.all([nt.load(),document.fonts.load("400 20px MiSans"),document.fonts.load("700 20px MiSans")]),nt.select(gt),nt.onSelect=(e,t)=>{et==="boot"||et==="intro"||(Zs(e,t?{cell:t}:void 0),Qa())},nt.onHover=e=>{const t=he("#hover-label");if(e===null){t.hidden=!0;return}Q0.update({value:Number(Mt[e].id.slice(2)),animated:!t.hidden&&!Et.reduced&&et==="archive"}),he("#hover-title").textContent=" / "+Mt[e].title,t.hidden=!1},tg(),Ks=!0,Fa=performance.now()/1e3,Wt("boot"),Zs(0),he("#loading").classList.add("loaded"),setTimeout(()=>he("#loading").remove(),600);const s=new URLSearchParams(location.search);s.get("scene")==="archive"&&Wt("archive"),s.get("scene")==="detail"&&Wt("detail"),Fa-=s.has("time")?Number(s.get("time")):1.76,s.has("time")||(Fa+=.6),!s.has("scene")&&!s.has("time")&&s.get("review")!=="1"?xd():Et.reduced&&!s.has("scene")&&!s.has("time")&&s.get("review")!=="1"&&Wt("archive"),requestAnimationFrame(og)}catch(s){console.error(s),he("#loading").innerHTML='<div class="error-state"><strong>CONNECTION INTERRUPTED</strong><p>三维记忆资源未能载入。请确认浏览器已启用硬件加速，然后重新连接。</p><button onclick="location.reload()">RECONNECT →</button></div>'}}XT(()=>{et==="detail"&&Md()},yd);Gl();QT();Object.assign(window,{rhine:{seek:s=>{Wt("boot"),Fa=performance.now()/1e3-s,wl=""},archive:()=>Wt("archive"),intro:()=>xd(),introSeek:s=>Vr.seek(s),ending:()=>yd(),endingSeek:s=>Ja.seek(s),detail:()=>Qa(),select:s=>Zs(s),stats:()=>({...nt?.getStats(),fps:Math.round(yu),mode:et,intro:Vr.stats(),ending:Ja.stats(),selected:Mt[gt].id,saved:[...Mn]})}});
