var Nt=Object.create;var Y=Object.defineProperty,_t=Object.defineProperties,kt=Object.getOwnPropertyDescriptor,Ft=Object.getOwnPropertyDescriptors,At=Object.getOwnPropertyNames,_e=Object.getOwnPropertySymbols,It=Object.getPrototypeOf,Fe=Object.prototype.hasOwnProperty,Dt=Object.prototype.propertyIsEnumerable;var ke=(t,e,r)=>e in t?Y(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,S=(t,e)=>{for(var r in e||(e={}))Fe.call(e,r)&&ke(t,r,e[r]);if(_e)for(var r of _e(e))Dt.call(e,r)&&ke(t,r,e[r]);return t},N=(t,e)=>_t(t,Ft(e));var Vt=(t,e)=>{for(var r in e)Y(t,r,{get:e[r],enumerable:!0})},Ae=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of At(e))!Fe.call(t,o)&&o!==r&&Y(t,o,{get:()=>e[o],enumerable:!(n=kt(e,o))||n.enumerable});return t};var _=(t,e,r)=>(r=t!=null?Nt(It(t)):{},Ae(e||!t||!t.__esModule?Y(r,"default",{value:t,enumerable:!0}):r,t)),Et=t=>Ae(Y({},"__esModule",{value:!0}),t);var pr={};Vt(pr,{calFarmRewardAmount:()=>sr,calculateFarmPoolAprList:()=>mr,farmRewardInfoToConfig:()=>ar,fetchMultipleFarmInfoAndUpdate:()=>Bt,getAssociatedAuthority:()=>or,getAssociatedLedgerAccount:()=>xt,getAssociatedLedgerPoolAccount:()=>nr,getFarmLedgerLayout:()=>St,getFarmProgramId:()=>ir,getFarmStateLayout:()=>Lt,getFarmVersion:()=>Pt,judgeFarmType:()=>cr,mergeSdkFarmInfo:()=>ur,updateFarmPoolInfo:()=>Tt,whetherIsStakeFarmPool:()=>dr});module.exports=Et(pr);var h=_(require("bn.js"));var Ee=require("@solana/web3.js");function Ie(t,e=1,r=[]){let n=[...t];if(e<=0)return r;for(;n.length;)r.push(n.splice(0,e));return r}var $=require("lodash"),pe=_(require("dayjs")),Ve=_(require("dayjs/plugin/utc"));pe.default.extend(Ve.default);var me=class{constructor(e){this.logLevel=e.logLevel!==void 0?e.logLevel:3,this.name=e.name}set level(e){this.logLevel=e}get time(){return(0,pe.default)().utc().format("YYYY/MM/DD HH:mm:ss UTC")}get moduleName(){return this.name}isLogLevel(e){return e<=this.logLevel}error(...e){return this.isLogLevel(0)?(console.error(this.time,this.name,"sdk logger error",...e),this):this}logWithError(...e){let r=e.map(n=>typeof n=="object"?JSON.stringify(n):n).join(", ");throw new Error(r)}warning(...e){return this.isLogLevel(1)?(console.warn(this.time,this.name,"sdk logger warning",...e),this):this}info(...e){return this.isLogLevel(2)?(console.info(this.time,this.name,"sdk logger info",...e),this):this}debug(...e){return this.isLogLevel(3)?(console.debug(this.time,this.name,"sdk logger debug",...e),this):this}},De={},Wt={};function P(t){let e=(0,$.get)(De,t);if(!e){let r=(0,$.get)(Wt,t);e=new me({name:t,logLevel:r}),(0,$.set)(De,t,e)}return e}var le=P("Raydium_accountInfo_util");async function Kt(t,e,r){let{batchRequest:n,commitment:o}=S({batchRequest:!1},r),s=Ie(e,100),d=new Array(s.length).fill([]);if(n){let c=s.map(x=>{let R=t._buildArgs([x.map(F=>F.toBase58())],o,"base64");return{methodName:"getMultipleAccounts",args:R}});d=(await t._rpcBatchRequest(c)).map(x=>(x.error&&le.logWithError(`failed to get info for multiple accounts, RPC_ERROR, ${x.error.message}`),x.result.value.map(R=>{if(R){let{data:F,executable:K,lamports:L,owner:f,rentEpoch:D}=R;return F.length!==2&&F[1]!=="base64"&&le.logWithError("info must be base64 encoded, RPC_ERROR"),{data:Buffer.from(F[0],"base64"),executable:K,lamports:L,owner:new Ee.PublicKey(f),rentEpoch:D}}return null})))}else try{d=await Promise.all(s.map(c=>t.getMultipleAccountsInfo(c,o)))}catch(c){c instanceof Error&&le.logWithError(`failed to get info for multiple accounts, RPC_ERROR, ${c.message}`)}return d.flat()}async function We(t,e,r){let n=await Kt(t,e.map(o=>o.pubkey),r);return e.map((o,s)=>N(S({},o),{accountInfo:n[s]}))}var b=_(require("bn.js"));var Ue=_(require("big.js")),X=_(require("bn.js"));var Ke=_(require("toformat")),Ot=Ke.default,H=Ot;var z=_(require("big.js")),Oe=_(require("decimal.js-light"));var ne=P("module/fraction"),fe=H(z.default),J=H(Oe.default),vt={[0]:J.ROUND_DOWN,[1]:J.ROUND_HALF_UP,[2]:J.ROUND_UP},Ut={[0]:z.default.roundDown,[1]:z.default.roundHalfUp,[2]:z.default.roundUp},u=class{constructor(e,r=v){this.numerator=y(e),this.denominator=y(r)}get quotient(){return this.numerator.div(this.denominator)}invert(){return new u(this.denominator,this.numerator)}add(e){let r=e instanceof u?e:new u(y(e));return this.denominator.eq(r.denominator)?new u(this.numerator.add(r.numerator),this.denominator):new u(this.numerator.mul(r.denominator).add(r.numerator.mul(this.denominator)),this.denominator.mul(r.denominator))}sub(e){let r=e instanceof u?e:new u(y(e));return this.denominator.eq(r.denominator)?new u(this.numerator.sub(r.numerator),this.denominator):new u(this.numerator.mul(r.denominator).sub(r.numerator.mul(this.denominator)),this.denominator.mul(r.denominator))}mul(e){let r=e instanceof u?e:new u(y(e));return new u(this.numerator.mul(r.numerator),this.denominator.mul(r.denominator))}div(e){let r=e instanceof u?e:new u(y(e));return new u(this.numerator.mul(r.denominator),this.denominator.mul(r.numerator))}toSignificant(e,r={groupSeparator:""},n=1){Number.isInteger(e)||ne.logWithError(`${e} is not an integer.`),e<=0&&ne.logWithError(`${e} is not positive.`),J.set({precision:e+1,rounding:vt[n]});let o=new J(this.numerator.toString()).div(this.denominator.toString()).toSignificantDigits(e);return o.toFormat(o.decimalPlaces(),r)}toFixed(e,r={groupSeparator:""},n=1){return Number.isInteger(e)||ne.logWithError(`${e} is not an integer.`),e<0&&ne.logWithError(`${e} is negative.`),fe.DP=e,fe.RM=Ut[n]||1,new fe(this.numerator.toString()).div(this.denominator.toString()).toFormat(e,r)}isZero(){return this.numerator.isZero()}};var Ct=P("Raydium_amount"),ve=H(Ue.default);function qt(t,e){let r="0",n="0";if(t.includes(".")){let o=t.split(".");o.length===2?([r,n]=o,n=n.padEnd(e,"0")):Ct.logWithError(`invalid number string, num: ${t}`)}else r=t;return[r,n.slice(0,e)||n]}var k=class extends u{constructor(r,n,o=!0,s){let d=new X.default(0),c=U.pow(new X.default(r.decimals));if(o)d=y(n);else{let p=new X.default(0),x=new X.default(0);if(typeof n=="string"||typeof n=="number"||typeof n=="bigint"){let[R,F]=qt(n.toString(),r.decimals);p=y(R),x=y(F)}p=p.mul(c),d=p.add(x)}super(d,c);this.logger=P(s||"Amount"),this.token=r}get raw(){return this.numerator}isZero(){return this.raw.isZero()}gt(r){return this.token.equals(r.token)||this.logger.logWithError("gt token not equals"),this.raw.gt(r.raw)}lt(r){return this.token.equals(r.token)||this.logger.logWithError("lt token not equals"),this.raw.lt(r.raw)}add(r){return this.token.equals(r.token)||this.logger.logWithError("add token not equals"),new k(this.token,this.raw.add(r.raw))}subtract(r){return this.token.equals(r.token)||this.logger.logWithError("sub token not equals"),new k(this.token,this.raw.sub(r.raw))}toSignificant(r=this.token.decimals,n,o=0){return super.toSignificant(r,n,o)}toFixed(r=this.token.decimals,n,o=0){return r>this.token.decimals&&this.logger.logWithError("decimals overflow"),super.toFixed(r,n,o)}toExact(r={groupSeparator:""}){return ve.DP=this.token.decimals,new ve(this.numerator.toString()).div(this.denominator.toString()).toFormat(r)}};var Me=require("@solana/web3.js"),Ce={symbol:"SOL",name:"Solana",decimals:9},M={symbol:"WSOL",name:"Wrapped SOL",mint:"So11111111111111111111111111111111111111112",decimals:9,extensions:{coingeckoId:"solana"}},Or={isQuantumSOL:!0,isLp:!1,official:!0,mint:new Me.PublicKey(M.mint),decimals:9,symbol:"SOL",id:"sol",name:"solana",icon:"https://img.raydium.io/icon/So11111111111111111111111111111111111111112.png",extensions:{coingeckoId:"solana"}};var ie=require("@solana/web3.js");var Ge=require("@solana/spl-token"),g=require("@solana/web3.js");function ge({pubkey:t,isSigner:e=!1,isWritable:r=!0}){return{pubkey:t,isWritable:r,isSigner:e}}var Mr=[ge({pubkey:Ge.TOKEN_PROGRAM_ID,isWritable:!1}),ge({pubkey:g.SystemProgram.programId,isWritable:!1}),ge({pubkey:g.SYSVAR_RENT_PUBKEY,isWritable:!1})];function oe({publicKey:t,transformSol:e}){if(t instanceof g.PublicKey)return e&&t.equals(Z)?qe:t;if(e&&t===Z.toBase58())return qe;if(typeof t=="string")try{return new g.PublicKey(t)}catch{throw new Error("invalid public key")}throw new Error("invalid public key")}function je(t){try{return new g.PublicKey(t)}catch{return t}}var Ye=new g.PublicKey("4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R"),Cr=new g.PublicKey("Ea5SjE2Y6yvCeW5dYTn7PYMuW5ikXkvbGdcmSnXeaLjS"),qr=new g.PublicKey("SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt"),Gr=new g.PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"),jr=new g.PublicKey("Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"),Yr=new g.PublicKey("mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So"),$r=new g.PublicKey("7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj"),Hr=new g.PublicKey("USDH1SM1ojwWUga67PGrgFWUHibbjqMvuMaDkRJTgkX"),zr=new g.PublicKey("NRVwhjBQiUPYtfDT5zRBVJajzFQHaBUNtC7SNVvqRFa"),Jr=new g.PublicKey("ANAxByE6G2WjFp7A4NqtWYXb3mgruyzZYg3spfxe6Lbo"),Xr=new g.PublicKey("7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs"),qe=new g.PublicKey("So11111111111111111111111111111111111111112"),Z=g.PublicKey.default;var ye=class{constructor({mint:e,decimals:r,symbol:n="UNKNOWN",name:o="UNKNOWN",skipMint:s=!1}){if(e===Z.toBase58()||e instanceof ie.PublicKey&&Z.equals(e)){this.decimals=M.decimals,this.symbol=M.symbol,this.name=M.name,this.mint=new ie.PublicKey(M.mint);return}this.decimals=r,this.symbol=n,this.name=o,this.mint=s?ie.PublicKey.default:oe({publicKey:e})}equals(e){return this===e?!0:this.mint.equals(e.mint)}},W=ye;W.WSOL=new ye(M);var we=class{constructor({decimals:e,symbol:r="UNKNOWN",name:n="UNKNOWN"}){this.decimals=e,this.symbol=r,this.name=n}equals(e){return this===e}},be=we;be.SOL=new we(Ce);var $e=new u(He),C=class extends u{toSignificant(e=5,r,n){return this.mul($e).toSignificant(e,r,n)}toFixed(e=2,r,n){return this.mul($e).toFixed(e,r,n)}};var Gt=P("Raydium_price"),A=class extends u{constructor(r){let{baseToken:n,quoteToken:o,numerator:s,denominator:d}=r;super(s,d);this.baseToken=n,this.quoteToken=o,this.scalar=new u(he(n.decimals),he(o.decimals))}get raw(){return new u(this.numerator,this.denominator)}get adjusted(){return super.mul(this.scalar)}invert(){return new A({baseToken:this.quoteToken,quoteToken:this.baseToken,denominator:this.numerator,numerator:this.denominator})}mul(r){this.quoteToken!==r.baseToken&&Gt.logWithError("mul token not equals");let n=super.mul(r);return new A({baseToken:this.baseToken,quoteToken:r.quoteToken,denominator:n.denominator,numerator:n.numerator})}toSignificant(r=this.quoteToken.decimals,n,o){return this.adjusted.toSignificant(r,n,o)}toFixed(r=this.quoteToken.decimals,n,o){return this.adjusted.toFixed(r,n,o)}};var ae=P("Raydium_bignumber");var Xe=new b.default(0),v=new b.default(1),Nn=new b.default(2),_n=new b.default(3),kn=new b.default(5),U=new b.default(10),He=new b.default(100),Fn=new b.default(1e3),An=new b.default(1e4),ze=9007199254740991;function y(t){if(t instanceof b.default)return t;if(typeof t=="string"){if(t.match(/^-?[0-9]+$/))return new b.default(t);ae.logWithError(`invalid BigNumberish string: ${t}`)}return typeof t=="number"?(t%1&&ae.logWithError(`BigNumberish number underflow: ${t}`),(t>=ze||t<=-ze)&&ae.logWithError(`BigNumberish number overflow: ${t}`),new b.default(String(t))):typeof t=="bigint"?new b.default(t.toString()):(ae.logWithError(`invalid BigNumberish value: ${t}`),new b.default(0))}function he(t){return U.pow(y(t))}function Ze(t){var c;if(t===void 0)return{denominator:"1",numerator:"0"};if(t instanceof b.default)return{numerator:t.toString(),denominator:"1"};if(t instanceof u)return{denominator:t.denominator.toString(),numerator:t.numerator.toString()};let e=String(t),[,r="",n="",o=""]=(c=e.replace(",","").match(/(-?)(\d*)\.?(\d*)/))!=null?c:[],s="1"+"0".repeat(o.length),d=r+(n==="0"?"":n)+o||"0";return{denominator:s,numerator:d,sign:r,int:n,dec:o}}function jt(t){var n;let[,e="",r=""]=(n=t.toFixed(2).match(/(-?)(\d*)\.?(\d*)/))!=null?n:[];return`${e}${r}`}function Yt(t,e=0){return t instanceof b.default?t:new b.default(jt(q(t).mul(U.pow(new b.default(String(e))))))}function q(t){if(t instanceof C)return new u(t.numerator,t.denominator);if(t instanceof A)return t.adjusted;if(t instanceof k)try{return q(t.toExact())}catch{return new u(Xe)}if(t instanceof u)return t;let e=String(t),r=Ze(e);return new u(r.numerator,r.denominator)}function Qe(t,e){if(t==null||e==null)return;let r=q(t),n=q(e);return r.mul(n)}function Je(t){let e=new W({mint:"",decimals:6,symbol:"usd",name:"usd",skipMint:!0}),r=Yt(Qe(t,10**e.decimals));return new k(e,r)}function Pe(t,e){return Je(!e||!t?0:Qe(t,e))}var Q=require("@solana/web3.js");var vn=P("Raydium_txTool");async function se(t,e){let[r,n]=await Q.PublicKey.findProgramAddress(t,e);return{publicKey:r,nonce:n}}var et=t=>typeof t=="number";function xe(t,e,r){let n=et(e)?e*((r==null?void 0:r.unit)==="s"?1e3:1):e;return new Date(t).getTime()<=n}function Se(t,e,r){let n=et(e)?e*((r==null?void 0:r.unit)==="s"?1e3:1):e;return new Date(t).getTime()>n}var nt=require("@solana/web3.js"),G=_(require("bn.js"));var a=require("@solana/buffer-layout"),Le=a.Layout,tt=a.Structure;var Te=a.UInt;var rt=a.seq;var ee=a.blob;var ue=class extends Le{constructor(r,n,o){super(r,o);this.blob=ee(r),this.signed=n}decode(r,n=0){let o=new G.default(this.blob.decode(r,n),10,"le");return this.signed?o.fromTwos(this.span*8).clone():o}encode(r,n,o=0){return typeof r=="number"&&(r=new G.default(r)),this.signed&&(r=r.toTwos(this.span*8)),this.blob.encode(r.toArrayLike(Buffer,"le",this.span),n,o)}};function I(t){return new Te(1,t)}function ce(t){return new Te(4,t)}function i(t){return new ue(8,!1,t)}function V(t){return new ue(16,!1,t)}var Be=class extends Le{constructor(r,n,o,s){super(r.span,s);this.layout=r,this.decoder=n,this.encoder=o}decode(r,n){return this.decoder(this.layout.decode(r,n))}encode(r,n,o){return this.layout.encode(this.encoder(r),n,o)}getSpan(r,n){return this.layout.getSpan(r,n)}};function m(t){return new Be(ee(32),e=>new nt.PublicKey(e),e=>e.toBuffer(),t)}var Re=class extends tt{decode(e,r){return super.decode(e,r)}};function w(t,e,r){return new Re(t,e,r)}function B(t,e,r){let n,o=typeof e=="number"?e:(0,G.isBN)(e)?e.toNumber():new Proxy(e,{get(s,d){if(!n){let c=Reflect.get(s,"count");n=(0,G.isBN)(c)?c.toNumber():c,Reflect.set(s,"count",n)}return Reflect.get(s,d)},set(s,d,c){return d==="count"&&(n=c),Reflect.set(s,d,c)}});return rt(t,o,r)}var Ne=w([m("mint"),m("owner"),i("amount"),ce("delegateOption"),m("delegate"),I("state"),ce("isNativeOption"),i("isNative"),i("delegatedAmount"),ce("closeAuthorityOption"),m("closeAuthority")]);var j=require("@solana/web3.js");var ao=w([I("instruction")]),so=w([I("instruction")]),$t=w([i("rewardState"),i("rewardOpenTime"),i("rewardEndTime"),i("rewardLastUpdateTime"),i("totalReward"),i("totalRewardEmissioned"),i("rewardClaimed"),i("rewardPerSecond"),V("accRewardPerShare"),m("rewardVault"),m("rewardMint"),m("rewardSender"),i("rewardType"),B(i(),15,"padding")]),Ht=w([i("state"),i("nonce"),m("lpVault"),m("rewardVault"),m(),m(),i(),i(),i("totalReward"),V("perShareReward"),i("lastSlot"),i("perSlotReward")]),zt=w([i("state"),i("nonce"),m("lpVault"),m("rewardVaultA"),i("totalRewardA"),V("perShareRewardA"),i("perSlotRewardA"),I("option"),m("rewardVaultB"),ee(7),i("totalRewardB"),V("perShareRewardB"),i("perSlotRewardB"),i("lastSlot"),m()]),Jt=w([i(),i("state"),i("nonce"),i("validRewardTokenNum"),V("rewardMultiplier"),i("rewardPeriodMax"),i("rewardPeriodMin"),i("rewardPeriodExtend"),m("lpMint"),m("lpVault"),B($t,5,"rewardInfos"),m("creator"),m(),B(i(),32,"padding")]),ot=new Proxy(Ht,{get(t,e,r){return e==="decode"?(...n)=>{let o=t.decode(...n);return N(S({},o),{version:3,rewardInfos:[{rewardVault:o.rewardVault,totalReward:o.totalReward,perSlotReward:o.perSlotReward,perShareReward:o.perShareReward}]})}:Reflect.get(t,e,r)}}),it=new Proxy(zt,{get(t,e,r){return e==="decode"?(...n)=>{let o=t.decode(...n);return N(S({},o),{version:5,rewardInfos:[{rewardVault:o.rewardVaultA,totalReward:o.totalRewardA,perSlotReward:o.perSlotRewardA,perShareReward:o.perShareRewardA},{rewardVault:o.rewardVaultB,totalReward:o.totalRewardB,perSlotReward:o.perSlotRewardB,perShareReward:o.perShareRewardB}]})}:Reflect.get(t,e,r)}}),at=new Proxy(Jt,{get(t,e,r){return e==="decode"?(...n)=>{let o=t.decode(...n);return N(S({},o),{version:6,rewardInfos:o.rewardInfos.map(s=>{var d;return N(S({},s),{rewardType:((d=Object.entries(dt).find(c=>String(c[1])===s.rewardType.toString()))!=null?d:["Standard SPL"])[0]})})})}:Reflect.get(t,e,r)}}),Xt=w([i("isSet"),i("rewardPerSecond"),i("rewardOpenTime"),i("rewardEndTime"),i("rewardType")]),uo=w([I("instruction"),i("nonce"),B(Xt,5,"rewardTimeInfo")]),co=w([I("instruction"),i("rewardReopenTime"),i("rewardEndTime"),i("rewardPerSecond")]),mo=w([I("instruction"),i("isSet"),i("rewardPerSecond"),i("rewardOpenTime"),i("rewardEndTime")]),po=w([i("state"),m("id"),m("owner"),i("deposited"),B(i(),1,"rewardDebts")]),st=w([i("state"),m("id"),m("owner"),i("deposited"),B(V(),1,"rewardDebts"),B(i(),17)]),lo=w([i("state"),m("id"),m("owner"),i("deposited"),B(i(),2,"rewardDebts")]),ut=w([i("state"),m("id"),m("owner"),i("deposited"),B(V(),2,"rewardDebts"),B(i(),17)]),ct=w([i(),i("state"),m("id"),m("owner"),i("deposited"),B(V(),5,"rewardDebts"),B(i(),16)]),fo=w([I("instruction"),i("amount")]);var Po=P("Raydium_farm_config"),mt="EhhTKczWMGQt46ynNeRX1WfeagwwJd7ufHvCDjRxjo5Q",Zt=new j.PublicKey(mt),pt="9KEPoZmtHUrBbhWN1v1KWLMkkvwY6WLtAVUCPRtRjP4z",Qt=new j.PublicKey(pt),lt="FarmqiPv5eAj3j1GMdMCMUGXqPUvmquZtMy86QH6rzhG",er=new j.PublicKey(lt),ft={[mt]:3,[pt]:5,[lt]:6},gt={3:Zt,5:Qt,6:er},xo=new j.PublicKey("4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R"),So=new j.PublicKey("FrspKwj8i3pNmKwXreTveC4fu7KL5ZbGeXdZBe2XViu1"),yt={3:ot,5:it,6:at},bt={3:st,5:ut,6:ct};var dt={"Standard SPL":0,"Option tokens":1};var wt=require("@solana/web3.js"),ht=_(require("bn.js"));var tr=[W,k,wt.PublicKey,u,ht.default,A,C];function rr(t){return typeof t=="object"&&t!==null&&!tr.some(e=>typeof e=="object"&&t instanceof e)}function te(t){return typeof t=="string"?je(t):Array.isArray(t)?t.map(e=>te(e)):rr(t)?Object.fromEntries(Object.entries(t).map(([e,r])=>[e,te(r)])):t}var re=P("Raydium.farm.util");async function nr({programId:t,poolId:e,mint:r,type:n}){let{publicKey:o}=await se([e.toBuffer(),r.toBuffer(),Buffer.from(n==="lpVault"?"lp_vault_associated_seed":n==="rewardVault"?"reward_vault_associated_seed":"","utf-8")],t);return o}function Pt(t){let r=oe({publicKey:t}).toBase58();return ft[r]}async function xt({programId:t,poolId:e,owner:r}){let{publicKey:n}=await se([e.toBuffer(),r.toBuffer(),Buffer.from(Pt(t)===6?"farmer_info_associated_seed":"staker_info_v2_associated_seed","utf-8")],t);return n}var or=async({programId:t,poolId:e})=>await se([e.toBuffer()],t);function ir(t){return gt[t]}function ar(t){return{isSet:new h.default(1),rewardPerSecond:y(t.rewardPerSecond),rewardOpenTime:y(t.rewardOpenTime),rewardEndTime:y(t.rewardEndTime),rewardType:y(t.rewardType)}}function sr(t){return y(t.rewardEndTime).sub(y(t.rewardOpenTime)).mul(y(t.rewardPerSecond))}function St(t){let e=bt[t];return e||re.logWithError("invalid version",t),e}function Lt(t){let e=yt[t];return e||re.logWithError("invalid version",t),e}function Tt(t,e,r,n){if(t.version===3||t.version===5){if(t.lastSlot.gte(new h.default(r)))return t;let o=new h.default(r).sub(t.lastSlot);t.lastSlot=new h.default(r);for(let s of t.rewardInfos){if(e.amount.eq(new h.default(0)))continue;let d=s.perSlotReward.mul(o);s.perShareReward=s.perShareReward.add(d.mul(new h.default(10).pow(new h.default(t.version===3?9:15))).div(e.amount)),s.totalReward=s.totalReward.add(d)}}else if(t.version===6)for(let o of t.rewardInfos){if(o.rewardState.eq(new h.default(0)))continue;let s=h.default.min(new h.default(n),o.rewardEndTime);if(o.rewardOpenTime.gte(s))continue;let c=s.sub(o.rewardLastUpdateTime).mul(o.rewardPerSecond),p=o.totalReward.sub(o.totalRewardEmissioned);p.lt(c)?(c=p,o.rewardLastUpdateTime=o.rewardLastUpdateTime.add(p.div(o.rewardPerSecond))):o.rewardLastUpdateTime=s,!e.amount.eq(new h.default(0))&&(o.accRewardPerShare=o.accRewardPerShare.add(c.mul(t.rewardMultiplier).div(e.amount)),o.totalRewardEmissioned=o.totalRewardEmissioned.add(c))}return t}async function Bt({connection:t,farmPools:e,owner:r,config:n}){var K;let o=!1,s=!1,d=new h.default(10),c=[];for(let L of e){let f=te(L);f.version===6?s=!0:o=!0,c.push({pubkey:f.id,version:f.version,key:"state",poolId:f.id},{pubkey:f.lpVault,version:f.version,key:"lpVault",poolId:f.id}),r&&c.push({pubkey:await xt({programId:f.programId,poolId:f.id,owner:r}),version:f.version,key:"ledger",poolId:f.id})}let p={},x=await We(t,c,n);for(let{pubkey:L,version:f,key:D,poolId:de,accountInfo:T}of x){let E=de.toBase58();if(p[E]=S({},p[E]),D==="state"){let O=Lt(f);(!T||!T.data||T.data.length!==O.span)&&re.logWithError(`invalid farm state account info, pools.id, ${L}`),p[E].state=O.decode(T.data)}else if(D==="lpVault")(!T||!T.data||T.data.length!==Ne.span)&&re.logWithError(`invalid farm lp vault account info, pools.lpVault, ${L}`),p[E].lpVault=Ne.decode(T.data);else if(D==="ledger"){let O=St(f);T&&T.data&&(T.data.length!==O.span&&re.logWithError(`invalid farm ledger account info, ledger, ${L}`),p[E].ledger=O.decode(T.data))}}let R=s||o?await t.getSlot():0,F=s&&(K=await t.getBlockTime(R))!=null?K:0;for(let L of Object.keys(p))p[L].state=Tt(p[L].state,p[L].lpVault,R,F);for(let[L,{state:f,ledger:D}]of Object.entries(p))if(D){let de=f.version===6?f.rewardMultiplier:f.rewardInfos.length===1?d.pow(new h.default(9)):d.pow(new h.default(15)),T=f.rewardInfos.map((E,O)=>{let Rt=D.rewardDebts[O];return D.deposited.mul(f.version===6?E.accRewardPerShare:E.perShareReward).div(de).sub(Rt)});p[L].wrapped=N(S({},p[L].wrapped),{pendingRewards:T})}return p}async function ur(t){let{farmPools:e}=t,r=await Bt(t);return e.map((o,s)=>N(S(S(S({},e[s]),te(o)),r[o.id]),{jsonInfo:e[s]}))}function cr(t,e=Date.now()){if(t.version===6){let r=t.state.rewardInfos;if(r.every(({rewardOpenTime:n})=>xe(e,n.toNumber(),{unit:"s"})))return"upcoming pool";if(r.every(({rewardEndTime:n})=>Se(e,n.toNumber(),{unit:"s"})))return"closed pool"}else{let r=t.state.rewardInfos.map(({perSlotReward:n})=>n);if(r.length===2){if(String(r[0])==="0"&&String(r[1])!=="0")return"normal fusion pool";if(String(r[0])!=="0"&&String(r[1])!=="0")return"dual fusion pool";if(String(r[0])==="0"&&String(r[1])==="0")return"closed pool"}else if(r.length===1&&String(r[0])==="0")return"closed pool"}}function dr(t){return t.state.rewardInfos.length===1&&String(t.lpMint)===Ye.toBase58()}function mr(t,e){return t.version===6?t.state.rewardInfos.map(({rewardPerSecond:r,rewardOpenTime:n,rewardEndTime:o},s)=>{var K;let d=xe(e.currentBlockChainDate,n.toNumber(),{unit:"s"}),c=Se(e.currentBlockChainDate,o.toNumber(),{unit:"s"});if(d||c)return;let p=e.rewardTokens[s];if(!p)return;let x=e.rewardTokenPrices[s];if(!x)return;let R=Pe(new u(r,v).div(U.pow(new h.default(p.decimals||1))).mul(new h.default(60*60*24*365)),x);return e.tvl?e.tvl.isZero()?q(0):R.div((K=e.tvl)!=null?K:v):void 0}):t.state.rewardInfos.map(({perSlotReward:n},o)=>{var x;let s=e.rewardTokens[o];if(!s)return;let d=e.rewardTokenPrices[o];if(!d)return;let c=Pe(new u(n,v).div(U.pow(new h.default(s.decimals||1))).mul(new h.default(e.blockSlotCountForSecond*60*60*24*365)),d);return e.tvl?e.tvl.isZero()?q(0):c.div((x=e.tvl)!=null?x:v):void 0})}0&&(module.exports={calFarmRewardAmount,calculateFarmPoolAprList,farmRewardInfoToConfig,fetchMultipleFarmInfoAndUpdate,getAssociatedAuthority,getAssociatedLedgerAccount,getAssociatedLedgerPoolAccount,getFarmLedgerLayout,getFarmProgramId,getFarmStateLayout,getFarmVersion,judgeFarmType,mergeSdkFarmInfo,updateFarmPoolInfo,whetherIsStakeFarmPool});
//# sourceMappingURL=util.js.map