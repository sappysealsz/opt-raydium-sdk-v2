var W=Object.create;var c=Object.defineProperty,q=Object.defineProperties,D=Object.getOwnPropertyDescriptor,j=Object.getOwnPropertyDescriptors,J=Object.getOwnPropertyNames,b=Object.getOwnPropertySymbols,O=Object.getPrototypeOf,v=Object.prototype.hasOwnProperty,Y=Object.prototype.propertyIsEnumerable;var d=(t,e,o)=>e in t?c(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,m=(t,e)=>{for(var o in e||(e={}))v.call(e,o)&&d(t,o,e[o]);if(b)for(var o of b(e))Y.call(e,o)&&d(t,o,e[o]);return t},R=(t,e)=>q(t,j(e));var G=(t,e)=>{for(var o in e)c(t,o,{get:e[o],enumerable:!0})},A=(t,e,o,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of J(e))!v.call(t,n)&&n!==o&&c(t,n,{get:()=>e[n],enumerable:!(r=D(e,n))||r.enumerable});return t};var y=(t,e,o)=>(o=t!=null?W(O(t)):{},A(e||!t||!t.__esModule?c(o,"default",{value:t,enumerable:!0}):o,t)),K=t=>A(c({},"__esModule",{value:!0}),t);var $={};G($,{getMultipleAccountsInfo:()=>E,getMultipleAccountsInfoWithCustomFlags:()=>N});module.exports=K($);var C=require("@solana/web3.js");function x(t,e=1,o=[]){let r=[...t];if(e<=0)return o;for(;r.length;)o.push(r.splice(0,e));return o}var g=require("lodash"),h=y(require("dayjs")),I=y(require("dayjs/plugin/utc"));h.default.extend(I.default);var p=class{constructor(e){this.logLevel=e.logLevel!==void 0?e.logLevel:3,this.name=e.name}set level(e){this.logLevel=e}get time(){return(0,h.default)().utc().format("YYYY/MM/DD HH:mm:ss UTC")}get moduleName(){return this.name}isLogLevel(e){return e<=this.logLevel}error(...e){return this.isLogLevel(0)?(console.error(this.time,this.name,"sdk logger error",...e),this):this}logWithError(...e){let o=e.map(r=>typeof r=="object"?JSON.stringify(r):r).join(", ");throw new Error(o)}warning(...e){return this.isLogLevel(1)?(console.warn(this.time,this.name,"sdk logger warning",...e),this):this}info(...e){return this.isLogLevel(2)?(console.info(this.time,this.name,"sdk logger info",...e),this):this}debug(...e){return this.isLogLevel(3)?(console.debug(this.time,this.name,"sdk logger debug",...e),this):this}},w={},H={};function M(t){let e=(0,g.get)(w,t);if(!e){let o=(0,g.get)(H,t);e=new p({name:t,logLevel:o}),(0,g.set)(w,t,e)}return e}var L=M("Raydium_accountInfo_util");async function E(t,e,o){let{batchRequest:r,commitment:n}=m({batchRequest:!1},o),s=x(e,100),f=new Array(s.length).fill([]);if(r){let i=s.map(l=>{let a=t._buildArgs([l.map(u=>u.toBase58())],n,"base64");return{methodName:"getMultipleAccounts",args:a}});f=(await t._rpcBatchRequest(i)).map(l=>(l.error&&L.logWithError(`failed to get info for multiple accounts, RPC_ERROR, ${l.error.message}`),l.result.value.map(a=>{if(a){let{data:u,executable:k,lamports:P,owner:B,rentEpoch:_}=a;return u.length!==2&&u[1]!=="base64"&&L.logWithError("info must be base64 encoded, RPC_ERROR"),{data:Buffer.from(u[0],"base64"),executable:k,lamports:P,owner:new C.PublicKey(B),rentEpoch:_}}return null})))}else try{f=await Promise.all(s.map(i=>t.getMultipleAccountsInfo(i,n)))}catch(i){i instanceof Error&&L.logWithError(`failed to get info for multiple accounts, RPC_ERROR, ${i.message}`)}return f.flat()}async function N(t,e,o){let r=await E(t,e.map(n=>n.pubkey),o);return e.map((n,s)=>R(m({},n),{accountInfo:r[s]}))}0&&(module.exports={getMultipleAccountsInfo,getMultipleAccountsInfoWithCustomFlags});
//# sourceMappingURL=accountInfo.js.map