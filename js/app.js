import {covers,fitRules,placeAt,sellKind,exportPlan,deadRules} from "./modules.js";
import {mountModuleUi,mountCaution} from "./module-ui.js";
import {fixAn,MAXL,AFF,ALPHA,BASED,BASEN,BASES,CLASSES,COLOURS,COND_LINE,COPY,DATA,DC_REV,EZ,EZ_ARCH,EZ_GRP,EZ_KEEP,EZ_RL,F,LANG,LANGS,LEVEL,LINED,LINEMAP,LINEN,LINE_HAY,LINE_IDS,LVSTEPS,LX,MAX_RULES,NAME_MAX,DATA_BUILD,ezHash,ezBadge,ezOwnedChanged,PRESETS,RAR,REDD,REDN,REV,SPECIAL,T,UNIQUES,VAR_IDS,cleanLineText,colOf,dItemName,decode,dl,easyGen,encode,evalC,ezHashF,ezLinked,ezRestore,ezSane,ezSave,ezSnap,genItem,hasRaw,matches,mlist,mrng,mset,msetList,msetRng,mval,nameOf,newRule,redIdOf,rngText,rollOk,simRules,typeMatch,uid,setF,bumpRev,setLangId,setDcRev} from "./filter-engine.js";
/* SortableJS instance for the rule list (null while the library is not loaded: the built-in pointer drag below then stays active) */
let rowSortable=null;
/* Lucide icons: <i data-lucide> placeholders are swapped for SVG by lucide.createIcons(). Without the library the same shapes come from this map, so no control ends up without an icon. */
const LI={x:'<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',save:'<path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"/><path d="M7 3v4a1 1 0 0 0 1 1h7"/>',trash:'<path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',"chevron-right":'<path d="m9 18 6-6-6-6"/>',"volume":'<path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/>',"volume-1":'<path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/><path d="M16 9a5 5 0 0 1 0 6"/>',"play":'<path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"/>',"arrow-up":'<path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>',"arrow-down":'<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>',check:'<path d="M20 6 9 17l-5-5"/>',info:'<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',"layers":'<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/>',"package":'<path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/><path d="M12 22V12"/><polyline points="3.29 7 12 12 20.71 7"/><path d="m7.5 4.27 9 5.15"/>',"flag":'<path d="M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528"/>',"sliders-horizontal":'<path d="M10 5H3"/><path d="M12 19H3"/><path d="M14 3v4"/><path d="M16 17v4"/><path d="M21 12h-9"/><path d="M21 19h-5"/><path d="M21 5h-7"/><path d="M8 10v4"/><path d="M8 12H3"/>',"zap":'<path d="M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z"/>',"gem":'<path d="M10.5 3 8 9l4 13 4-13-2.5-6"/><path d="M17 3a2 2 0 0 1 1.6.8l3 4a2 2 0 0 1 .013 2.382l-7.99 10.986a2 2 0 0 1-3.247 0l-7.99-10.986A2 2 0 0 1 2.4 7.8l2.998-3.997A2 2 0 0 1 7 3z"/><path d="M2 9h20"/>',"palette":'<path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>',"copy":'<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',"plus":'<path d="M5 12h14"/><path d="M12 5v14"/>'};
const li=(n,c="")=>window.lucide?`<i data-lucide="${n}" class="li ${c}" aria-hidden="true"></i>`:`<svg class="li ${c}" viewBox="0 0 24 24" aria-hidden="true">${LI[n]}</svg>`;
/* collapsible areas of the Advanced Mode (<details class="fold" data-fold="key">): the state is remembered in this browser, also across editor redraws */
const FOLD=(()=>{try{const o=JSON.parse(localStorage.getItem("oathfilter-fold")||"{}");return o&&typeof o==="object"?o:{};}catch(e){return {};}})();
const foldOpen=(k,title,icon)=>`<details class="fold" data-fold="${k}"${FOLD[k]?"":" open"}><summary>${icon?li(icon):""}<span>${title}</span>${li("chevron-right","fold-chev")}</summary><div class="foldb">`;
const foldClose="</div></details>";
document.addEventListener("toggle",e=>{const d=e.target,k=d&&d.dataset&&d.dataset.fold;if(!k)return;if(d.open)delete FOLD[k];else FOLD[k]=1;try{localStorage.setItem("oathfilter-fold",JSON.stringify(FOLD));}catch(x){}},true);
document.querySelectorAll("details.fold[data-fold]").forEach(d=>{d.open=!FOLD[d.dataset.fold];});
document.querySelectorAll("details.fold[data-fold]>summary,details.ezdet>summary").forEach(sm=>{if(!sm.querySelector(".fold-chev"))sm.insertAdjacentHTML("beforeend",li("chevron-right","fold-chev"));});
const HELP={"modules": ["Modules", "A module is a group of rules saved in this browser. You can save one rule, several rules or your whole filter. The Modules button opens the organizer: modules on the left, your rules on the right. Tick one or more modules and press the insert button, or drag them into the rule list. Several modules go in as one block in the order you ticked them, and you can drag rules to reorder them. Replace filter starts a new filter from one of your modules. Share makes a link, and whoever opens it can insert the rules into their own filter. If an insert would go over 200 rules, it is blocked. Ctrl+Z takes it back. Nothing is uploaded, and clearing the site data deletes them. For a backup or another device, use Copy filter code."], "ezMode": ["Easy Mode", "Builds the whole filter from a few choices. The result is a normal game filter code. Your choices stay in this browser. Use Advanced Mode to edit single rules."], "ezRL": ["Rupture Level", "The monster level you farm at, which is also the item drop level. Only affix tiers up to that item level can drop. Any means no tier limit."], "ezKeep": ["Tier strictness", "How many of the best droppable tiers still count as good for each line you pick (the T limit of a line). Gear without such a line is hidden. Idols are not limited."], "ezWant": ["What I want to see", "Each pick keeps gear with its lines and the matching Idols, and hides the other Idols. A damage type or ailment narrows Attacks and Spells: with Spells + Cold, only Cold spell lines stay. Items that also carry another picked line stay visible. Choose at least one."], "copyAdv": ["Copy filter code", "Copies the code for the game's loot filter window. In Easy Mode it copies the Easy preview, otherwise your active filter. Nothing changes until you paste it in the game."], "share": ["Share", "Makes a link to your active filter with its rule names. In Easy Mode it first replaces your filter with the Easy Mode rules (Ctrl+Z brings yours back). The game code never contains names."], "order": ["Rule order", "The game checks rules from top to bottom and the first match decides. Drag rules, or use Alt+Shift+Up/Down, to reorder. Check rule order runs sample items through your filter."], "hide": ["Hide", "Hide never works on uniques, runes, Dwarven Runes, the Cube, gems, currency, gold and flasks. The Drop Test marks them SHOW*."], "sell": ["Sell", "Sell exists in the game, but its exact behaviour is not confirmed. The Drop Test treats it like Hide and counts it as Sell."], "more": ["More conditions", "Extra conditions from the game's MORE window. All of them must fit together with the options above. Up to 6 named lines, 12 bases and 12 reds per rule (plus 6 not-these lines)."], "dcOcr": ["Screenshot reader", "The text is read on your device and your image is never uploaded. The first scan downloads the text reader (tesseract.js, about 10 MB) from a public CDN."], "dcTier": ["Tier marker", "The bar “│” separates the item text from its tier marker, for example “… Life │ T2 [21-28]”."], "dcSell": ["Sold samples", "Samples caught by a Sell rule. The game's Sell behaviour is not confirmed, so they are treated like hidden items."]};
const hb=k=>`<button type="button" class="hlp" data-help="${k}" aria-label="Help: ${HELP[k][0]}" aria-expanded="false">?</button>`;
(function(){
  const pop=document.createElement("div");pop.id="hlpPop";pop.setAttribute("role","tooltip");pop.hidden=true;document.body.appendChild(pop);
  let cur=null,sticky=false;
  function place(){if(!cur)return;if(!cur.isConnected){hide();return;}
    const r=cur.getBoundingClientRect(),w=pop.offsetWidth,h=pop.offsetHeight,vw=document.documentElement.clientWidth,vh=window.innerHeight;
    const x=Math.min(Math.max(8,r.left+r.width/2-w/2),Math.max(8,vw-w-8));
    let y=r.bottom+8;if(y+h>vh-8&&r.top-h-8>=8)y=r.top-h-8;y=Math.max(8,Math.min(y,vh-h-8));
    pop.style.left=x+"px";pop.style.top=y+"px";}
  function hide(){if(cur){cur.setAttribute("aria-expanded","false");cur.removeAttribute("aria-describedby");}cur=null;sticky=false;pop.hidden=true;}
  function show(b,st){const d=HELP[b.dataset.help];if(!d)return;if(cur&&cur!==b)hide();cur=b;sticky=!!st;
    pop.textContent="";const t=document.createElement("b");t.textContent=d[0];const p=document.createElement("span");p.textContent=d[1];pop.append(t,p);
    pop.hidden=false;b.setAttribute("aria-expanded","true");b.setAttribute("aria-describedby","hlpPop");place();}
  const hlp=t=>t&&t.closest?t.closest(".hlp"):null;
  document.addEventListener("click",e=>{const b=hlp(e.target);if(!b)return;e.preventDefault();e.stopPropagation();if(cur===b&&sticky)hide();else show(b,true);},true);
  document.addEventListener("mouseover",e=>{const b=hlp(e.target);if(b&&!sticky)show(b,false);});
  document.addEventListener("mouseout",e=>{const b=hlp(e.target);if(b&&cur===b&&!sticky&&!b.contains(e.relatedTarget))hide();});
  document.addEventListener("focusin",e=>{const b=hlp(e.target);if(b&&!sticky)show(b,false);});
  document.addEventListener("focusout",e=>{const b=hlp(e.target);if(b&&cur===b&&!sticky)hide();});
  document.addEventListener("pointerdown",e=>{if(cur&&sticky&&!hlp(e.target)&&!pop.contains(e.target))hide();});
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&cur){const b=cur;hide();b.focus({preventScroll:true});e.stopImmediatePropagation();}},true);
  window.addEventListener("resize",place);window.addEventListener("scroll",place,true);
  new MutationObserver(()=>{if(cur&&!cur.isConnected)hide();}).observe(document.body,{childList:true,subtree:true});
})();
document.querySelectorAll("[data-copy]").forEach(e=>{e.textContent=COPY[e.dataset.copy]||"";});
const S={hlOnly:false,cur:null,items:[],tab:"code"};
let timer=null;
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const curRule=()=>F.rules.find(r=>r.id===S.cur)||null;

function moreParts(r,noLists){
  const o=[],t=+mval(r,"t")||0,n=+mval(r,"n")||0,s=+mval(r,"s")||0,g=+mval(r,"g")||0,gx=+mval(r,"gx")||0,rd=+mval(r,"r")||0,u=+mval(r,"u")||0,rt=+mval(r,"rt")||0;
  if(rt)o.push("Runes up to T"+rt);
  {const kk=+mval(r,"k")||0,dd=+mval(r,"d")||0;
  if(t||n)o.push((n?n+"+ ":"A ")+(kk===1?"prefix ":kk===2?"suffix ":"")+(n?"lines":"line")+(t?" "+(t===1?"at T1":"at T"+t+" or better"):""));
  else if(kk)o.push(kk===1?"Prefix lines only":"Suffix lines only");
  if(dd)o.push(["","Armour","Evasion","Energy shield","Armour + Evasion","Armour + Energy shield","Evasion + Energy shield"][dd]||"defence "+dd);}
  if(s)o.push(s+"+ sockets");
  const i=rngText(...mrng(r,"i"),"item level"),q=rngText(...mrng(r,"q"),"needs level");
  if(i)o.push(i);if(q)o.push(q);
  if(g)o.push(g>=90?"Truesworn":"grade "+g+"+");if(gx)o.push("grade under "+gx);
  if(rd)o.push(["","Reds only","Chase reds"][rd]||"red "+rd);
  if(u)o.push(["","Not unsworn","Unsworn only"][u]||"unsworn "+u);
  const nm=(k,N,w)=>{const l=mlist(r,k);if(l.length&&!noLists)o.push(l.length===1?(N[l[0]]||l[0]):(k==="a"?(mval(r,"all")==="1"?"all of ":mval(r,"an")?"any "+mval(r,"an")+" of ":"any of "):k==="na"?"none of ":(k==="b"&&mval(r,"nb")==="1")||(k==="rn"&&mval(r,"nr")==="1")?"none of ":"")+l.length+" "+w);};
  nm("b",BASED,"bases");nm("a",LINED,"named lines");nm("na",LINED,"excluded lines");nm("rn",REDD,"named reds");
  return o;
}
function summary(r){
  const p=[];
  if(r.type)p.push(nameOf("type",r.type));
  if(r.rarity)p.push(nameOf("rarity",r.rarity));
  if(r.level)p.push("level "+nameOf("level",r.level).toLowerCase());
  if(r.line||r.quality||r.count){const n=r.count+1;p.push(n+"+ "+(r.line?nameOf("line",r.line)+" ":"")+"line"+(n>1?"s":"")+(r.quality?", "+nameOf("quality",r.quality).toLowerCase():""));}
  moreParts(r).forEach(x=>p.push(x));
  return p.length?p.join(" · "):"All items";
}
const actWord=a=>["Hide","Show","Highlight","Highlight + beam","Sell"][a]||"Action "+a;
const isHl=a=>a===2||a===3;

/* ---- view ---- */
/* ---- reactive UI state (Vue 3). The DOM that only mirrors this state (tabs, panels, rule filter, Active only, mode switch, rule counter) is driven by synchronous effects below, so it always follows the state and no render function has to remember to update it. If the Vue module cannot be loaded, a tiny stand-in with the same two functions keeps the page working. ---- */
let Vue=null;try{Vue=await import("vue");}catch(e){console.warn("Vue could not be loaded, using the built-in fallback.");}
/* Sell confirmation: a Vue dialog; without Vue the browser confirm is used. Resolves true only when the user confirms. */
let askCaution=kinds=>Promise.resolve(window.confirm("Caution: Sell sells matching items automatically when they land. A broad or misordered rule can sell items you wanted. Use Sell?"));
/* turn a rule on or off; switching a Sell rule on asks for the Caution confirmation first. Resolves true when the state changed. */
async function setRuleOn(r,want){
  if(!r||(!!r.on)===!!want)return false;
  if(want){const k=sellKind(Object.assign({},r,{on:1}));if(k&&!(await askCaution([k]))){renderRows();return false;}}
  r.on=want?1:0;if(r.id===S.cur&&$("#f-on"))$("#f-on").checked=!!r.on;touch();return true;
}
const _fx=new Set();
const {reactive,watchEffect}=Vue?{reactive:Vue.reactive,watchEffect:f=>Vue.watchEffect(f,{flush:"sync"})}
  :{reactive:o=>new Proxy(o,{set(t,k,v){const ch=t[k]!==v;t[k]=v;if(ch)_fx.forEach(f=>f());return true;}}),watchEffect:f=>{_fx.add(f);f();}};
const V=reactive({filter:"all",q:"",view:"edit",act:false});
const ui=reactive({mode:"adv",count:0,max:MAX_RULES});
watchEffect(()=>{const v=V.view;$$(".panel").forEach(p=>p.hidden=p.id!=="p-"+v);$$("#nav button").forEach(b=>{const on=b.dataset.view===v;b.setAttribute("aria-selected",on);b.tabIndex=on?0:-1;});});
watchEffect(()=>{const f=V.filter;$$("#rfilter button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.rf===f));});
watchEffect(()=>{const a=$("#rfAct");if(a)a.setAttribute("aria-pressed",V.act);});
watchEffect(()=>{const m=ui.mode;$$("#ezMode button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.ezm===m?"true":"false"));});
watchEffect(()=>{const n=ui.count,mx=ui.max;$("#cap").innerHTML=`<span class="hint">Active filter</span><b class="gold-t" style="font-size:17px;${n>mx?"color:var(--hide-fg)":""}">${n} / ${mx}</b>`;const mc=$("#mdCount");if(mc){mc.textContent=n+" / "+mx;mc.classList.toggle("bad",n>mx);}});
function setView(v){V.view=v;
  if(v==="test"){renderDrops();}if(v==="io"){renderOut();}if(v==="edit"&&EZ.m==="easy"){ezRefresh();}}
function shadowOf(i){for(let k=0;k<i;k++)if(covers(F.rules[k],F.rules[i]))return k;return -1;}
function badges(r){
  const b=[];if(r.type)b.push(["cls",nameOf("type",r.type)]);if(r.rarity)b.push(["rar",nameOf("rarity",r.rarity)]);if(r.level)b.push(["lvl","Level "+nameOf("level",r.level).toLowerCase()]);
  if(r.line||r.quality||r.count){const n=r.count+1;b.push(["afx",n+"+ "+(r.line?nameOf("line",r.line)+" ":"")+"line"+(n>1?"s":"")+(r.quality?" · "+nameOf("quality",r.quality).toLowerCase():"")]);}
  moreParts(r).forEach(x=>b.push(["more",x]));
  if(!b.length)b.push(["any","All items"]);
  if((r.extra&&r.extra.length)||hasRaw(r))b.push(["more","Unknown fields (ignored in Drop Test)"]);
  return b.map(x=>`<span class="b ${x[0]}">${esc(x[1])}</span>`).join("");
}
function sampleName(r){const t={31:"Hoarfrost Staff",32:"Ember Wand",18:"Gravewind Bow",10:"Serpent Ring",11:"Vow of Embers",4:"Rune Tablet",14:"Hollow Idol",20:"Ashen Dagger",23:"Cinder Greatsword",13:"Core-touched Relic"}[r.type];return t||(r.rarity===5?"Oathbound Relic":"Iron Visage");}
function labelHTML(r){
  if(r.action===0)return`<span class="hint"><i>Hidden: no label on the ground</i></span>`;
  if(r.action===4)return`<span class="hint"><i>Sold: no label on the ground</i></span>`;
  const c=colOf(r.colour)[2],col=isHl(r.action);
  return `${r.action===3?`<span class="beam" style="--c:${c}"></span>`:""}<span class="lbl" style="--c:${col?c:"#d9d2c0"}">${esc(sampleName(r))}</span>`;
}
const SPKI=on=>li(on?"volume-1":"volume");
function visibleRules(){const q=V.q.trim().toLowerCase();return F.rules.map((r,i)=>[r,i]).filter(([r])=>{
  if(V.act&&!r.on)return false;
  if(V.filter==="hide"&&r.action!==0)return false;if(V.filter==="show"&&r.action!==1)return false;if(V.filter==="mark"&&!isHl(r.action))return false;if(V.filter==="sell"&&r.action!==4)return false;
  if(q&&!(summary(r)+" "+actWord(r.action)+" "+(r.name||"")).toLowerCase().includes(q))return false;return true;});}
function renderRows(){const rw=$("#rows"),rst=rw?rw.scrollTop:0;renderRowsRaw();if(rw)rw.scrollTop=rst;}
function renderRowsRaw(){
  if(window.hideRuleTip)window.hideRuleTip();
  {const o=$("#chkOut");if(o)o.innerHTML="";}
  const list=visibleRules(),free=V.filter==="all"&&!V.q.trim()&&!V.act;$("#rows").classList.toggle("canmove",free&&F.rules.length>1);if(rowSortable)rowSortable.option("disabled",!(free&&F.rules.length>1));
  $("#rows").innerHTML=list.length?list.map(([r,i])=>{
    const sh=shadowOf(i),AC=["hide","show","highlight","beam","sell"][r.action]||"show",hex=colOf(r.colour)[2];
    return `<div class="rc ${r.id===S.cur?"sel":""} ${r.on?"":"off"}" data-rid="${r.id}">
     <button type="button" class="pickb" data-pick="${r.id}" aria-pressed="${r.id===S.cur}" aria-label="Edit rule ${i+1}${(r.name||"").trim()?" ("+esc(r.name.trim())+")":""}: ${esc(summary(r))}">
      <span class="nb">${i+1}</span><span class="conds">${(r.name||"").trim()?`<span class="rname">${esc(r.name.trim())}</span>`:""}<span class="bd">${badges(r)}</span>${sh>=0?(()=>{const e=F.rules[sh],same=e.action===r.action&&(!isHl(r.action)||e.colour===r.colour);return `<span class="shadow ${same?"":"conf"}" title="Rule ${sh+1} is active, comes first and matches at least these items, so this rule may never apply. ${same?"Both do the same, so this rule is redundant.":"The two rules do different things, so this one is probably not working as you intend."} Check the order.">${same?"Redundant: rule "+(sh+1)+" does the same":"Overridden by rule "+(sh+1)+" (different action)"}</span>`;})():""}</span></button>
     <button type="button" class="xb" data-rm="${r.id}" aria-label="Remove rule ${i+1}" title="Remove rule ${i+1} (Ctrl+Z brings it back)">${li("x")}</button>
     <div class="rr"><span class="act"><span class="action-badge action-badge--${r.on?AC:"off"}">${r.on?actWord(r.action):"Off"}</span>${r.action===3?`<span class="beam-ico" title="Light beam" style="--c:${hex}"></span>`:""}${isHl(r.action)?`<span class="color-dot" title="Highlight colour: ${colOf(r.colour)[1]}" style="background:${hex}"></span>`:""}${r.action>0&&r.sound!==0?`<span class="spk" title="Sound on">${SPKI(true)}</span>`:""}</span>
      <span class="ctl"><input class="sw sm" type="checkbox" data-on="${r.id}" ${r.on?"checked":""} aria-label="Rule ${i+1} active"></span></div></div>`;
  }).join(""):`<div class="hint" style="padding:18px;text-align:center">${F.rules.length?'No rules match. <div style="margin-top:12px"><button type="button" class="btn" data-clearf="1">Clear search and filters</button></div>':"No rules. The game shows everything."}</div>`;
  $("#actCount").textContent=F.rules.filter(r=>r.on).length+" of "+F.rules.length+" rules active";
  $("#rhint").textContent=free?"The numbers show the order the game checks the rules. The top matching rule decides.":"Filtered view. Clear the search and choose All to reorder rules.";
}
/* ---- rule hover preview: which named lines / mods / conditions one rule covers (fixed box, ignores the pointer, never moves the page) ---- */
const TIPMAX=8;
function tipList(r,k,N){const seen=new Set(),out=[];mlist(r,k).forEach(id=>{const t=String(N[id]||id);if(!seen.has(t)){seen.add(t);out.push(t);}});return out.sort((x,y)=>ALPHA([0,x],[0,y]));}
function condParts(r){
  const p=[];
  if(r.type)p.push(nameOf("type",r.type));
  if(r.rarity)p.push(nameOf("rarity",r.rarity));
  if(r.level)p.push("Level "+nameOf("level",r.level).toLowerCase());
  if(r.line||r.quality||r.count){const n=r.count+1;p.push(n+"+ "+(r.line?nameOf("line",r.line)+" ":"")+"line"+(n>1?"s":"")+(r.quality?" · "+nameOf("quality",r.quality).toLowerCase():""));}
  return p.concat(moreParts(r,true));
}
function ruleTipHTML(r,i){
  const nm=(r.name||"").trim(),all=mval(r,"all")==="1";
  const lst=(title,items,note)=>{const shown=items.slice(0,TIPMAX),more=items.length-shown.length;
    return `<div class="tg"><div class="th">${title}${note?`<span class="tn">${note}</span>`:""}</div><ul>${shown.map(t=>`<li>${esc(t)}</li>`).join("")}</ul>${more>0?`<div class="tm">+ ${more} more. Open the rule to see all.</div>`:""}</div>`;};
  const na=tipList(r,"a",LINED),nb=tipList(r,"b",BASED),nr=tipList(r,"rn",REDD),sec=[];
  if(na.length)sec.push(lst(na.length>1?"Named lines":"Named line",na,na.length>1?(all?"All of them":"Any of them"):""));
  if(nb.length)sec.push(lst(nb.length>1?"Bases":"Base",nb));
  if(nr.length)sec.push(lst(nr.length>1?"Named reds":"Named red",nr));
  if(!na.length&&!nb.length&&!nr.length)sec.push(`<div class="tg"><div class="th">Specific mods</div><div class="tm">None picked. No named line, base or red is required.</div></div>`);
  const c=condParts(r);
  sec.push(`<div class="tg"><div class="th">Conditions</div>${c.length?`<div class="tc">${c.map(x=>`<span>${esc(x)}</span>`).join("")}</div>`:`<div class="tm">None. The rule applies to all items.</div>`}</div>`);
  if((r.extra&&r.extra.length)||hasRaw(r))sec.push(`<div class="tm">This rule also has fields this page does not know. They stay in the export; the drop test ignores them.</div>`);
  return `<div class="tt"><b>Rule ${i+1}</b>${nm?`<span>${esc(nm)}</span>`:""}<span class="tact">${r.on?actWord(r.action):"Off"}</span></div>`+sec.join("");
}
(function(){
  let tip=null,card=null,timer=0,quiet=false,kb=null,hx=0,hy=0,desc=null;
  const el=()=>tip||(tip=Object.assign(document.createElement("div"),{id:"rtip"}),tip.setAttribute("role","tooltip"),document.body.appendChild(tip),tip);
  function place(c){
    const t=el(),R=c.getBoundingClientRect(),vw=document.documentElement.clientWidth,vh=window.innerHeight,w=t.offsetWidth,h=t.offsetHeight,cl=(v,a,b)=>Math.max(a,Math.min(v,b));
    let x,y;
    if(R.right+10+w<=vw-8){x=R.right+10;y=cl(R.top,8,vh-h-8);}
    else{x=cl(R.left,8,vw-w-8);y=R.bottom+6+h<=vh-8?R.bottom+6:Math.max(8,R.top-h-6);}
    t.style.transform="translate("+Math.round(x)+"px,"+Math.round(y)+"px)";
  }
  function show(c){
    if(!c.isConnected)return;const i=F.rules.findIndex(r=>r.id===c.dataset.rid);if(i<0)return;
    const t=el();t.innerHTML=ruleTipHTML(F.rules[i],i);t.classList.add("on");place(c);
    const b=c.querySelector(".pickb");if(b){b.setAttribute("aria-describedby","rtip");desc=b;}
  }
  function hide(){clearTimeout(timer);timer=0;card=null;if(tip)tip.classList.remove("on");if(desc){desc.removeAttribute("aria-describedby");desc=null;}}
  window.hideRuleTip=hide;
  const cardOf=e=>e.target&&e.target.closest?e.target.closest("#rows .rc"):null;
  function over(e){
    if(e.pointerType==="touch"||quiet||document.querySelector("#rows .rc.drag"))return;
    const c=cardOf(e);if(!c||c===card)return;
    hide();card=c;timer=setTimeout(()=>show(c),350);
  }
  document.addEventListener("pointerover",over);
  document.addEventListener("pointermove",e=>{
    if(!quiet||e.buttons||Math.abs(e.clientX-hx)+Math.abs(e.clientY-hy)<4)return;
    quiet=false;over(e);
  });
  document.addEventListener("pointerout",e=>{const c=cardOf(e);if(c&&!c.contains(e.relatedTarget))hide();});
  const calm=e=>{if(e&&e.clientX!==undefined){hx=e.clientX;hy=e.clientY;}hide();quiet=true;};
  document.addEventListener("pointerdown",calm,true);
  document.addEventListener("wheel",()=>{if(card||(tip&&tip.classList.contains("on")))calm();},{passive:true,capture:true});
  document.addEventListener("scroll",()=>{if(kb&&tip&&tip.classList.contains("on"))place(kb);else if(card||(tip&&tip.classList.contains("on")))calm();},true);
  document.addEventListener("keydown",e=>{if(!kb&&(card||(tip&&tip.classList.contains("on"))))calm();});
  document.addEventListener("focusin",e=>{
    const c=e.target.closest?e.target.closest("#rows .rc"):null;
    let fv=true;try{fv=e.target.matches(":focus-visible");}catch(_){}
    if(!c||!fv)return;
    hide();kb=c;timer=setTimeout(()=>show(c),120);
  });
  document.addEventListener("focusout",e=>{if(kb){kb=null;hide();}});
  window.addEventListener("blur",hide);window.addEventListener("resize",hide);
})();
/* order check: runs sample drops (random ones plus every quick-spawn class) through the rules and reports rules that never decide anything */
function checkOrder(){
  const items=[];for(let k=0;k<1500;k++)items.push(genItem());
  Object.keys(CLASSES).forEach(c=>{for(let k=0;k<60;k++)items.push(genItem({cls:c,n:1+k%6,size:1+k%4}));});
  const R=F.rules,N=items.length,m=R.map(()=>0),w=R.map(()=>0),by=R.map(()=>({}));
  items.forEach(it=>{let win=-1;R.forEach((r,i)=>{if(!r.on||!matches(r,it))return;m[i]++;if(win<0)win=i;else by[i][win]=(by[i][win]||0)+1;});if(win>=0)w[win]++;});
  const out=[];
  R.forEach((r,i)=>{if(!r.on)return;
    if(!m[i])out.push([i,"matches none of "+N+" sample items"]);
    else if(!w[i]){const k=Object.keys(by[i]).sort((a,b)=>by[i][b]-by[i][a])[0];out.push([i,"never decides: its "+m[i]+" matching items are caught by rule "+(+k+1)+" first"]);}
  });
  const o=$("#chkOut");
  o.innerHTML=out.length?`<div class="chk">${out.map(([i,t])=>`<button type="button" class="chkb" data-pick="${R[i].id}"><b>Rule ${i+1}</b> ${esc(t)}</button>`).join("")}</div><p class="hint" style="margin:8px 0 0">Based on ${N} sample items. A rare item can be missed. Click a rule to open it.</p>`:`<p class="hint" style="margin:8px 0 0">Every active rule decides at least one of ${N} sample items.</p>`;
}
function renderAdvExport(){
  const b=$("#copyAdv");if(!b)return;
  const em=typeof EZ!=="undefined"&&!!EZ&&EZ.m==="easy",n=em?(simRules().n||F.rules.length):F.rules.length,over=n>MAX_RULES;
  b.textContent=over?"Copy filter code ("+n+" / "+MAX_RULES+")":"Copy filter code";b.classList.toggle("over",over);
  b.title=over?(em?"The Easy Mode preview has ":"Your active filter has ")+n+" rules, but the game takes "+MAX_RULES+". It will not be copied from Easy Mode.":"Copies your active filter ("+n+" rule"+(n===1?"":"s")+"). In Easy Mode it copies the Easy Mode preview.";
}
function renderHead(){renderAdvExport();if(typeof renderMD==="function")renderMD();ui.count=F.rules.length;}

/* ---- editor ---- */
const chipRow=(k,r)=>`<div class="chips">${T[k].map(o=>`<button type="button" class="cb2" data-set="${k},${o[0]}" aria-pressed="${r[k]===o[0]}">${esc(o[1])}</button>`).join("")}</div>`;
const segRow=(k,r,lab)=>`<div><span class="lab">${lab}</span><div class="seg" role="group" aria-label="${lab}">${T[k].map(o=>`<button type="button" data-set="${k},${o[0]}" aria-pressed="${r[k]===o[0]}">${esc(o[1])}</button>`).join("")}</div></div>`;
function sel(k,r){return `<div class="selwrap"><select id="f-${k}" data-f="${k}">${T[k].map(o=>`<option value="${o[0]}" ${r[k]===o[0]?"selected":""}>${esc(o[1])}</option>`).join("")}${T[k].some(o=>o[0]===r[k])?"":`<option value="${r[k]}" selected>value ${r[k]}</option>`}</select></div>`;}
const msel=(id,key,val,opts)=>{const has=opts.some(o=>String(o[0])===String(val));return `<div class="selwrap${val===""||String(val)==="0"?"":" chg"}"><select id="${id}" ${key}>${opts.map(o=>`<option value="${o[0]}" ${String(o[0])===String(val)?"selected":""}>${esc(o[1])}</option>`).join("")}${has?"":`<option value="${esc(val)}" selected>value ${esc(val)}</option>`}</select></div>`;};
const chgMark=t=>{const w=t.closest(".selwrap");if(w)w.classList.toggle("chg",!(t.value===""||t.value==="0"));};
const nOpts=(any,f)=>[["",any]].concat([1,2,3,4,5,6].map(n=>[n,f(n)]));
const lvOpts=(any,f)=>[["0",any]].concat(LVSTEPS.map(v=>[v,f(v)]));
/* "local" lines roll on the weapon itself; the Attack-Damage variants roll on gloves, quivers, rings, amulets and boots. The picker says so (label suffix and a "?"), the code and the names in rules do not change. */
const LOCAL_LINE=id=>/(_added_local|^phys_inc_local)$/.test(id);
const ATTACK_LINE=id=>/^attack_added_(phys|fire|cold|lightning)$/.test(id);
const lineExtra=id=>LOCAL_LINE(id)?" (local)":"";
const lineWhere=id=>{if(LOCAL_LINE(id))return "Local: rolls on the weapon itself, e.g. on a bow (not on quivers).";if(ATTACK_LINE(id)){const a=AFF.find(x=>x.id===id);const w=a?a.tags.filter(t=>/^(Gloves|Quiver|Ring|Amulet|Boots)$/.test(t)).map(t=>t.toLowerCase()+(t==="Boots"?"":"s")).join(", "):"gloves, quivers, rings, amulets";return "Applies to "+w+" (e.g. quivers for bows), not to the weapon itself.";}return "";};
const PK={b:{title:"Base",list:()=>DATA.bases,name:BASEN,disp:BASED,ph:"Type a base name"},a:{title:"Named line",list:()=>DATA.lines.map(x=>[x[1],x[0]]),name:LINEN,disp:LINED,ph:"Type a line, like life or fire"},na:{title:"Not these lines",list:()=>DATA.lines.map(x=>[x[1],x[0]]),name:LINEN,disp:LINED,ph:"Type a line that must NOT be on the item"},rn:{title:"Named red",list:()=>DATA.reds,name:REDN,disp:REDD,ph:"Type a red name"}};
S.pk={b:"",a:"",na:"",rn:""};S.moreOpen=true;
/* what the sample drops can produce: other bases and reds still go into the code, but the drop test never shows them */
const SAMPLE={b:new Set(BASES.map(b=>b.id).concat(VAR_IDS,SPECIAL.map(b=>b.id),["dwarven_rune"])),rn:new Set(UNIQUES.map(u=>u.id||redIdOf(u.name)))};
/* saved pick lists: only in this browser, not part of the filter code; applying one copies its ids into the rule (max 6 lines, 12 bases, 12 reds) */
const PL={load(){try{return JSON.parse(localStorage.getItem("oathfilter-lists")||"{}");}catch(e){return {};}},save(o){try{localStorage.setItem("oathfilter-lists",JSON.stringify(o));}catch(e){}}};
/* Patch 87: "Any of them / All of them / Any N of them" for named lines; "In this list / None of these" for bases and reds (nb, nr). nb/nr cannot be combined with All or Any N (game rule). */
function anyAllHTML(r){
  const all=mval(r,"all")==="1",an=+mval(r,"an")||0,n=mlist(r,"a").length,mode=all?"all":an?"an":"any";
  return `<div class="seg sm" role="group" aria-label="Named lines: any, all or any N"><button type="button" data-allm="" aria-pressed="${mode==="any"}">Any of them</button><button type="button" data-allm="1" aria-pressed="${mode==="all"}">All of them</button><button type="button" data-allm="n" aria-pressed="${mode==="an"}" ${n<3&&mode!=="an"?'disabled title="Needs at least 3 named lines"':'title="Any N of the named lines, for example any 2 of 5"'}>Any N</button></div>${mode==="an"?msel("m-an","data-m=\"an\" aria-label=\"How many of the named lines\"",String(an),[2,3,4,5].filter(x=>x<Math.max(n,an+1)).map(x=>[x,"Any "+x+" of them"])):""}${mval(r,"nb")==="1"||mval(r,"nr")==="1"?'<small class="hint">Not available together with “None of these” bases or reds.</small>':""}`;
}
function invHTML(r,k){
  const key=k==="b"?"nb":"nr",on=mval(r,key)==="1",blocked=!!(mval(r,"all")==="1"||mval(r,"an"));
  return `<div class="seg sm" role="group" aria-label="${k==="b"?"Bases":"Reds"}: in this list or none of these"><button type="button" data-invm="${key},0" aria-pressed="${!on}">One of these</button><button type="button" data-invm="${key},1" aria-pressed="${on}" ${blocked?'disabled title="Not available together with All of them or Any N"':""}>None of these</button></div>`;
}
function pickHTML(r,k){
  const P=PK[k],ids=mlist(r,k),lists=(PL.load()[k]||[]);
  return `<div class="pk" data-pkbox="${k}"><div class="pkhead"><label class="lab" for="pk-${k}">${P.title} · ${ids.length} of ${MAXL[k]} picked</label>${k==="a"?anyAllHTML(r):k==="b"||k==="rn"?invHTML(r,k):""}${ids.length?`<button type="button" class="lnk" data-pclr="${k}">Clear</button>`:""}</div>
   <div class="chosen">${ids.slice().sort((x,y)=>ALPHA([0,P.disp[x]||x],[0,P.disp[y]||y])).map(id=>`<span class="b more" title="${esc(P.disp[id]||id)}"><span class="bt">${esc((P.disp[id]||id)+((k==="a"||k==="na")?lineExtra(id):""))}${(k==="a"||k==="na")&&ATTACK_LINE(id)?`<span class="qm" title="${esc(lineWhere(id))}" aria-label="${esc(lineWhere(id))}">?</span>`:""}</span><button type="button" data-prm="${k},${esc(id)}" aria-label="Remove ${esc(P.name[id]||id)}">${li("x")}</button></span>`).join("")}</div>
   <div class="plrow"><select id="pls-${k}" data-pls="${k}" aria-label="Saved ${P.title.toLowerCase()} lists"><option value="">Saved lists${lists.length?"":" (none yet)"}</option>${lists.map((l,i)=>[i,l.n,l]).sort(ALPHA).map(([i,n,l])=>`<option value="${i}">${esc(n)} · ${l.ids.length}</option>`).join("")}</select><button type="button" class="btn" data-plsave="${k}" ${ids.length?"":"disabled"}>${li("save")}Save as list</button><button type="button" class="btn" data-pldel="${k}" ${lists.length?"":"disabled"}>${li("trash")}Delete list</button></div>
   <input class="field" id="pk-${k}" data-pk="${k}" type="search" placeholder="${P.ph}" value="${esc(S.pk[k])}" autocomplete="off">
   <div class="pklist" id="pl-${k}"></div></div>`;
}
function renderPickList(k){
  const r=curRule(),box=$("#pl-"+k);if(!r||!box)return;
  const P=PK[k],ids=mlist(r,k),q=S.pk[k].trim().toLowerCase(),full=ids.length>=MAXL[k];
  const lineSel=new Set(ids.map(i=>P.name[i]));
  const words=q.split(/\s+/).filter(Boolean);
  const shw=x=>(k==="a"||k==="na")?dl(x[1])+lineExtra(x[0]):k==="b"?(LX.bases[x[0]]||x[1]):REDD[x[0]];
  const hayOf=x=>((k==="a"||k==="na")?LINE_HAY[x[0]]:(String(x[1])+" "+String(x[0])).toLowerCase())+(LANG==="en"?"":" "+shw(x).toLowerCase());
  const res=P.list().filter(x=>{if(!words.length)return true;const h=hayOf(x);return words.every(w=>h.includes(w));});
  const tag=x=>{const on=(k==="a"||k==="na")?lineSel.has(x[1]):ids.includes(x[0]);
    if(on)return "<small>picked</small>";
    if((k==="a"||k==="na")&&ATTACK_LINE(x[0]))return `<small class="qm" title="${esc(lineWhere(x[0]))}" aria-label="${esc(lineWhere(x[0]))}">?</small>`;
    if(k==="a"||k==="na"){const li=LINE_IDS[x[1]]||[];if(li.length&&li.every(i=>COND_LINE.has(i)))return '<small title="This line comes from game data that loads only while a game switch is on. It may not be live yet.">switch-dependent</small>';return "";}
    return SAMPLE[k]&&!SAMPLE[k].has(x[0])?"<small>no test drop</small>":"";};
  const tip=x=>{if(k!=="a"&&k!=="na")return shw(x)+(shw(x)!==String(x[1])?"\n"+x[1]:"");const li=LINE_IDS[x[1]]||[x[0]];const wh=lineWhere(x[0]);return (wh?wh+"\n":"")+(shw(x)!==x[1]?shw(x)+"\n":"")+x[1]+"\nGame ids ("+li.length+"): "+li.slice(0,10).join(", ")+(li.length>10?", …":"");};
  box.innerHTML=res.length?res.map(x=>{const on=(k==="a"||k==="na")?lineSel.has(x[1]):ids.includes(x[0]);return `<button type="button" data-padd="${k},${esc(x[0])}" title="${esc(tip(x))}" ${on||full?"disabled":""}><span>${esc(shw(x))}</span>${tag(x)}</button>`;}).join(""):`<div class="hint" style="padding:12px">Nothing reads like that</div>`;
}
function moreHTML(r){
  const [il,ih]=mrng(r,"i"),[ql,qh]=mrng(r,"q"),rt=mval(r,"rt");
  const open=S.moreOpen,act=moreParts(r);
  const head=`<div class="hrow"><button type="button" class="moreb" data-moretoggle="1" aria-expanded="${open}">${li("sliders-horizontal")}<span class="mtxt">More conditions (the game's MORE window)</span>${act.length?`<span class="mbadge" title="${act.length} condition${act.length>1?"s":""} set here">${act.length}</span>`:""}${li("chevron-right","fold-chev")}</button>${hb("more")}</div>`;
  if(!open)return head+`<p class="hint" style="margin:8px 0 0">${act.length?esc(act.join(" · ")):"No more conditions set."}</p>`;
  return head+`<p class="hint" style="margin:0 0 14px">All of them must fit, together with the options above.${rt?" Runes up to a tier turns this rule into a rune rule.":""}</p>
   <div class="mgroups">
   <div class="mgrp"><h4 class="mgh">${li("layers")}Level &amp; tier</h4><div class="mgrid">
    <div><label class="lab" for="m-t">Tier</label>${msel("m-t","data-m=\"t\"",mval(r,"t"),[["","Any tier"],[1,"T1 lines"]].concat([2,3,4,5,6,7,8].map(n=>[n,"T"+n+" or better"])))}</div>
    <div><label class="lab" for="m-k">Count lines of type</label>${msel("m-k","data-m=\"k\"",mval(r,"k"),[["","Prefixes and suffixes"],[1,"Prefix lines only"],[2,"Suffix lines only"]])}</div>
    <div><label class="lab" for="m-n">Lines of that tier</label>${msel("m-n","data-m=\"n\"",mval(r,"n"),nOpts("Any lines",n=>n+"+ lines"))}</div>
    <div><label class="lab" for="m-i0">Item level from</label>${msel("m-i0","data-mr=\"i,0\"",il,lvOpts("Any item level",v=>"Item level "+v+"+"))}</div>
    <div><label class="lab" for="m-i1">Item level to</label>${msel("m-i1","data-mr=\"i,1\"",ih,lvOpts("No max item level",v=>"Item level "+v+" or lower"))}</div>
    <div><label class="lab" for="m-q0">Required level from</label>${msel("m-q0","data-mr=\"q,0\"",ql,lvOpts("Any required level",v=>"Requires level "+v+"+"))}</div>
    <div><label class="lab" for="m-q1">Required level to</label>${msel("m-q1","data-mr=\"q,1\"",qh,lvOpts("No max required level",v=>"Requires level "+v+" or lower"))}</div>
   </div></div>
   <div class="mgrp"><h4 class="mgh">${li("package")}Item properties</h4><div class="mgrid">
    <div><label class="lab" for="m-d">Defence type</label>${msel("m-d","data-m=\"d\"",mval(r,"d"),[["","Any defence type"],[1,"Armour"],[2,"Evasion"],[3,"Energy shield"],[4,"Armour + Evasion"],[5,"Armour + Energy shield"],[6,"Evasion + Energy shield"]])}</div>
    <div><label class="lab" for="m-s">Sockets</label>${msel("m-s","data-m=\"s\"",mval(r,"s"),nOpts("Any sockets",n=>n+"+ sockets"))}</div>
    <div><label class="lab" for="m-g">Grade</label>${msel("m-g","data-m=\"g\"",mval(r,"g"),[["","Any grade"],[50,"Grade 50+"],[70,"Grade 70+"],[90,"Truesworn"]])}</div>
    <div><label class="lab" for="m-gx">Top grade</label>${msel("m-gx","data-m=\"gx\"",mval(r,"gx"),[["","Any top grade"],[50,"Under grade 50"],[70,"Under grade 70"],[90,"Under grade 90"]])}</div>
   </div></div>
   <div class="mgrp"><h4 class="mgh">${li("flag")}Special flags</h4><div class="mgrid">
    <div><label class="lab" for="m-r">Red</label>${msel("m-r","data-m=\"r\"",mval(r,"r")==="0"?"":mval(r,"r"),[["","Red or not"],[1,"Reds only"],[2,"Chase reds"]])}</div>
    <div><label class="lab" for="m-u">Unsworn</label>${msel("m-u","data-m=\"u\"",mval(r,"u")==="0"?"":mval(r,"u"),[["","Unsworn or not"],[1,"Not unsworn"],[2,"Unsworn only"]])}</div>
    <div><label class="lab" for="m-rt">Gear or runes</label>${msel("m-rt","data-m=\"rt\"",rt,[["","Gear row"]].concat([1,2,3,4,5,6].map(n=>[n,"Runes up to T"+n])))}</div>
   </div></div>
   </div>
   <div class="grid2" style="margin-top:12px">${pickHTML(r,"b")}${pickHTML(r,"a")}${pickHTML(r,"na")}${pickHTML(r,"rn")}</div>`;
}
/* keep every list, and the page, exactly where the user is across a re-render; anchor = a list whose on-screen position must not move */
function keepScroll(fn,anchor){
  const wx=window.scrollX,wy=window.scrollY,ae=document.activeElement,fid=ae&&ae.id&&ae.closest&&ae.closest("#editor")?ae.id:"",
    ss=fid&&ae.selectionStart!=null?[ae.selectionStart,ae.selectionEnd]:null,
    lists=$$(".pklist,#rows,#drops").map(l=>[l.id,l.scrollTop]),a=anchor?$(anchor):null,top=a?a.getBoundingClientRect().top:0;
  fn();
  lists.forEach(([id,st])=>{const l=id&&document.getElementById(id);if(l)l.scrollTop=st;});
  if(window.scrollX!==wx||window.scrollY!==wy)window.scrollTo({left:wx,top:wy,behavior:"instant"});
  if(a){const b=$(anchor);if(b){const dy=b.getBoundingClientRect().top-top;if(dy)window.scrollBy({left:0,top:dy,behavior:"instant"});}}
  if(fid){const f=document.getElementById(fid);if(f&&f!==document.activeElement){f.focus({preventScroll:true});if(ss&&f.setSelectionRange)try{f.setSelectionRange(ss[0],ss[1]);}catch(e){}}}
}
function renderEditor(anchor){keepScroll(renderEditorRaw,typeof anchor==="string"?anchor:null);}
function renderEditorRaw(){
  const r=curRule(),ed=$("#editor"),i=F.rules.indexOf(r);
  $("#edTitle").textContent=r?"Rule editor · rule "+(i+1):"Rule editor";
  if(!r){ed.innerHTML=`<p class="hint">No rule selected. The game shows everything while there are no rules.</p><div style="margin-top:16px"><button type="button" class="btn gold" id="addRule">Add new rule</button></div>`;return;}
  ed.innerHTML=`
   <div style="display:flex;flex-wrap:wrap;align-items:center;gap:12px 28px;margin-bottom:12px"><label style="display:flex;align-items:center;gap:12px"><input id="f-on" class="sw" type="checkbox" ${r.on?"checked":""}> Rule is active</label><span class="hint" id="posInfo"></span><span style="display:flex;flex-wrap:wrap;gap:8px;margin-left:auto"><button type="button" class="btn gold" id="addRule" style="min-height:34px">${li("plus")}Add new rule</button><button type="button" class="btn" id="dupRule" style="min-height:34px">${li("copy")}Duplicate</button><button type="button" class="btn danger" id="delRule" style="min-height:34px">${li("trash")}Remove rule</button></span></div>
   <div style="margin-bottom:12px"><label class="lab" for="f-name">Rule name (optional)</label><input id="f-name" class="field" type="text" maxlength="${NAME_MAX}" placeholder="e.g. Good rares" value="${esc(r.name||"")}" autocomplete="off"><div class="hint" style="margin-top:4px">Only for you. Names stay in this browser and in saved local filters. They are never part of the game code.</div></div>
   ${foldOpen("act","What happens","zap")}<div class="hrow" style="margin-bottom:6px;justify-content:flex-end">${hb("hide")}${hb("sell")}</div><div class="seg" role="group" aria-label="Action">${T.action.map(o=>`<button type="button" data-set="action,${o[0]}" aria-pressed="${r.action===o[0]}">${o[1]}</button>`).join("")}</div>
   <div class="hint" id="actHint" style="margin-top:6px"></div>
   <p class="rsum" id="rsum" aria-live="polite"></p>${foldClose}
   <div class="divider"></div>
   ${foldOpen("cond","Item conditions","gem")}<span class="lab">Rarity</span>${chipRow("rarity",r)}
   <div class="grid3" style="margin-top:12px"><div><label class="lab" for="f-type">Item type</label>${sel("type",r)}</div><div><label class="lab" for="f-level">Item level</label>${sel("level",r)}</div><div><label class="lab" for="f-line">Line group</label>${sel("line",r)}</div></div>
   <div id="qcWrap" style="margin-top:12px"><p class="hint lknote" id="qcNote" hidden>${li("info")}Normal items have no affix lines, so Roll quality and Lines needed do not apply to them. Your settings stay saved.</p><div class="grid2" id="qcGrid">${segRow("quality",r,"Roll quality")}${segRow("count",r,"Lines needed")}</div></div>
   ${foldClose}
   <div class="divider"></div>
   ${moreHTML(r)}
   <div class="divider"></div>
   ${foldOpen("look","Look and sound","palette")}
   <p class="hint lknote" id="lkNote" hidden>Not used: hidden and sold items show no label and play no sound.</p>
   <div class="grid2" id="lookWrap" style="align-items:start"><div><div id="lookBox"><span class="lab">Highlight colour</span><div class="swatches">${COLOURS.map(c=>`<button type="button" class="swc" style="--c:${c[2]}" data-col="${c[0]}" aria-pressed="${r.colour===c[0]}" aria-label="${c[1]}" title="${c[1]}"></button>`).join("")}</div></div>
   <div style="margin-top:10px"><label class="lab" for="f-sound">Sound</label><div style="display:flex;gap:8px;align-items:center"><div style="flex:1 1 auto">${sel("sound",r)}</div><button type="button" class="btn" id="sndPlay" title="Play this sound">${li("play")}Play</button></div><p class="hint" id="sndMsg" role="status" aria-live="polite" style="margin:4px 0 0"></p></div></div>
   <div><span class="lab">Ground preview</span><div class="ground" id="ground"></div></div></div>
   ${foldClose}
   ${(r.extra&&r.extra.length)||hasRaw(r)?`<div class="flag">This rule has fields this page does not know. They stay in the export as they are.</div>`:""}`;
  syncEditor();
  ["b","a","na","rn"].forEach(renderPickList);
}
function syncEditor(){
  const r=curRule();if(!r||!$("#f-on"))return;
  $("#posInfo").textContent="Rule "+(F.rules.indexOf(r)+1)+" of "+F.rules.length;
  $$("#editor [data-set]").forEach(b=>{const[k,v]=b.dataset.set.split(",");b.setAttribute("aria-pressed",r[k]===+v);});
  $$("#editor [data-col]").forEach(b=>b.setAttribute("aria-pressed",+b.dataset.col===r.colour));
  {const nm=r.rarity===1;$("#qcGrid").classList.toggle("dim",nm);$("#qcNote").hidden=!nm;}
  $("#lookBox").hidden=r.action===1;const dim=r.action===0||r.action===4;$("#lookWrap").classList.toggle("dim",dim);$("#lkNote").hidden=!dim;
  {const c=condParts(r),sm=$("#rsum");if(sm)sm.textContent=actWord(r.action)+": "+(c.length?c.join(" · "):"all items")+(r.on?"":" (rule is off)");}
  $("#actHint").textContent=["Matching items are hidden, except the always-visible items (see ?).","Matching items are shown as normal.","The item name is drawn in the chosen colour.","Colour plus a light beam on the ground.",COPY.sell][r.action]||"";
  $("#addRule").disabled=F.rules.length>=MAX_RULES;$("#dupRule").disabled=F.rules.length>=MAX_RULES;
  $("#ground").innerHTML=`<div style="display:flex;align-items:center;gap:14px">${labelHTML(r)}</div>`;
}

/* ---- test ---- */
/* random test flags are shown only when an active rule looks at them, and are marked as test flags */
let _uf=null,_ufr=-1;
function usedFlags(){
  if(_ufr===REV&&_uf)return _uf;const u=new Set();
  F.rules.forEach(r=>{if(!r.on)return;const m=k=>+mval(r,k)||0;
    if(r.type===13)u.add("core");if(r.type===15||m("s"))u.add("sock");if(r.type===16||m("g")||m("gx"))u.add("grade"),r.type===16&&u.add("truesworn");
    if(m("u"))u.add("unsworn");if(m("r"))u.add("chase");if(r.type===4)u.add("runebase");});
  _uf=u;_ufr=REV;return u;
}
let DROPR=[];
function dropHTML(it,e,anim){
  const hc=colOf(e.col)[2];
  const mods=it.label?it.label:it.mods.length?it.mods.map(m=>`${m.group} T${m.tier}`).join(" · "):it.rar==="U"?"fixed mods":"no mods";
  const uf=usedFlags(),fa=[];
  if(it.core&&uf.has("core"))fa.push("core-touched");if(it.sock&&uf.has("sock"))fa.push(it.sock+" sockets");if(it.kind!=="misc"&&it.grade&&uf.has("grade"))fa.push("grade "+it.grade);
  if(it.unsworn&&uf.has("unsworn"))fa.push("unsworn");if(it.chase&&uf.has("chase"))fa.push("chase red");if(it.truesworn&&uf.has("truesworn"))fa.push("truesworn");if(it.runebase&&uf.has("runebase"))fa.push("rune base");
  const fl=fa.length?` · <span class="tf" title="Random test flags. Real drops may differ.">test flags: ${fa.join(", ")}</span>`:"";
  const WD=["hid it","showed it","highlighted it","highlighted it with a beam","sold it (unconfirmed)"];
  const rule=e.i>=0?`<span class="rn"><b>Rule #${e.i+1}</b>${(DROPR[e.i].name||"").trim()?` “${esc(DROPR[e.i].name.trim())}”`:""} ${e.guard?"matched, but the game never hides this item, so it is shown":WD[DROPR[e.i].action]} · ${esc(summary(DROPR[e.i]))}</span>`:`<span class="rn">No matching rule, so it is shown normally</span>`;
  return `<li class="drop ${anim?"in":""}" data-r="${it.rar}" data-v="${e.v}" style="--hc:${hc}"><span class="rar"></span>
   <div style="min-width:0"><div class="nm">${esc(dItemName(it))}</div><div class="meta">${it.cls?`<b class="gold-t">${esc(it.cls)}</b> · `:""}${it.kind==="misc"?"":"item level "+it.lvl+" · "}${esc(mods)}${fl}</div>${rule}</div>
   <span class="vd" title="${e.guard?"never hidden":e.v===4?COPY.sell:""}">${e.guard?"SHOW*":["HIDE","SHOW","HIGHLIGHT","HIGHLIGHT + BEAM","SELL"][e.v]}</span></li>`;
}
const sellRel=n=>n>0||DROPR.some(r=>r.on&&r.action===4);
function renderSimNote(sr){
  const el=$("#simNote");if(!el)return;
  let m;
  if(sr.easy)m=ezLinked()?"Simulating: your active filter, which Easy Mode controls ("+sr.rules.length+" rules).":"Simulating: the Easy Mode preview ("+sr.rules.length+" rules), not applied to your active filter yet.";
  else if(sr.n>MAX_RULES)m="Simulating: your active filter ("+F.rules.length+" rules). The Easy Mode preview has "+sr.n+" rules, over the limit of "+MAX_RULES+", so it cannot be simulated.";
  else m="Simulating: your active filter ("+F.rules.length+" rule"+(F.rules.length===1?"":"s")+").";
  el.textContent=m;el.classList.toggle("easysim",!!sr.easy&&!ezLinked());
}
function renderDrops(animId){
  const sr=simRules();DROPR=sr.rules;renderSimNote(sr);
  const t={all:S.items.length,hl:0,show:0,hide:0,sell:0},ev=S.items.map(it=>evalC(it));
  ev.forEach(e=>{if(e.v===0)t.hide++;else if(e.v===4)t.sell++;else if(isHl(e.v))t.hl++;else t.show++;});
  $("#drops").innerHTML=S.items.map((it,k)=>dropHTML(it,ev[k],it.id===animId)).join("");
  const dps=S.items.slice(0,15).map((it,k)=>({it,e:ev[k]})).filter(o=>o.e.v!==0&&o.e.v!==4&&(!S.hlOnly||isHl(o.e.v))).reverse().map(({it,e})=>{const c=colOf(e.col)[2],col=isHl(e.v);
    return `<div class="dp">${e.v===3?`<span class="beam" style="--c:${c}"></span>`:""}<span class="lbl" style="--c:${col?c:"#d9d2c0"}">${esc(dItemName(it))}</span></div>`;}).join("");
  $("#scene").innerHTML=dps||`<p class="empty">${S.items.length?"No highlights or beams in the latest drops.":"Press “Drop 1”, “Drop 25” or a Quick spawn button."}</p>`;
  $$("#sceneMode button").forEach(b=>b.setAttribute("aria-pressed",(b.dataset.sm==="hl")===S.hlOnly));
  const n=t.all||1;
  $("#nAll").textContent=t.all;$("#nHl").textContent=t.hl;$("#nShow").textContent=t.show;$("#nHide").textContent=t.hide;$("#nSell").textContent=t.sell;$("#stSell").classList.toggle("zero",!t.sell);{const g=$("#guardNote");if(g)g.hidden=!ev.some(e=>e.guard);}{const sr=sellRel(t.sell);$("#stSell").hidden=!sr;$("#stats").classList.toggle("has-sell",sr);}
  $("#bHl").style.width=t.hl/n*100+"%";$("#bShow").style.width=t.show/n*100+"%";$("#bHide").style.width=t.hide/n*100+"%";$("#bSell").style.width=t.sell/n*100+"%";
}
function addDrops(n,f){let last=null;for(let k=0;k<n;k++){last=f?genItem(f):genItem();const sl=(S.slot=(S.slot||0)+1)*7%15;last.x=10+(sl%5)*20+(Math.random()*6-3);last.y=6+Math.floor(sl/5)*30+(Math.random()*6-3);S.items.unshift(last);}S.items=S.items.slice(0,60);renderDrops(n===1?last.id:null);}

/* ---- export ---- */
function renderOut(){$("#out").textContent=encode(F);if(window.shSync)window.shSync();}
function toast(m,bad){const e=$("#gt");e.hidden=false;e.textContent=m;e.className="gt"+(bad?" bad":"");clearTimeout(toast.t);toast.t=setTimeout(()=>e.hidden=true,3600);}
async function copyCode(arg,adv){
  const own=typeof arg==="string",txt=own?arg:encode(F);
  const done=()=>{if(!own&&F.rules.length>MAX_RULES)toast("Copied, but this filter has "+F.rules.length+" rules. "+COPY.limit,true);else toast("Copied.");};
  try{await navigator.clipboard.writeText(txt);done();return;}catch(e){}
  try{const ta=document.createElement("textarea");ta.value=txt;ta.style.position="fixed";ta.style.opacity="0";document.body.appendChild(ta);ta.select();const ok=document.execCommand("copy");ta.remove();if(ok){done();return;}}catch(e){}
  if(own&&!adv){ezShowCode(txt);toast(COPY.blocked+" The code is selected below: press Ctrl+C.",true);return;}
  if(V.view!=="edit")setView("edit");$("#shPanel").hidden=false;const o=$("#out");o.hidden=false;o.textContent=txt;const rg=document.createRange();rg.selectNodeContents($("#out"));const s=getSelection();s.removeAllRanges();s.addRange(rg);toast(COPY.blocked+" The code is selected below: press Ctrl+C.",true);
}
const H=[];

const packState=f=>JSON.stringify({c:encode(f),n:f.rules.map(r=>r.name||""),e:ezSnap()});
function unpackState(str){let o=null;try{o=JSON.parse(str);}catch(e){}
  const f=decode(o&&typeof o.c==="string"?o.c:str).filter;
  if(o&&Array.isArray(o.n))f.rules.forEach((r,i)=>{r.name=String(o.n[i]||"").slice(0,NAME_MAX);});
  if(o&&o.e&&typeof o.e==="object")f.e=o.e;
  return f;}
function snap(){const c=packState(F);if(H[H.length-1]!==c){H.push(c);if(H.length>60)H.shift();}$("#undo").disabled=H.length<2;}
function undo(){
  if(H.length<2)return;H.pop();const at=Math.max(0,F.rules.findIndex(r=>r.id===S.cur));
  setF(unpackState(H[H.length-1]));ezRestore(F);F.rules.forEach(r=>{r.id=uid();if(!r.extra)r.extra=[];if(!r.m)r.m=[];});
  S.cur=F.rules.length?F.rules[Math.min(at,F.rules.length-1)].id:null;fullRender();toast("Undone.");
}
function save(){snap();try{const c=encode(F);localStorage.setItem("oathfilter4",c);
    if(F.rules.some(r=>r.name))localStorage.setItem("oathfilter-names",JSON.stringify({c,n:F.rules.map(r=>r.name||"")}));else localStorage.removeItem("oathfilter-names");}catch(e){if(!save.warned){save.warned=1;toast(COPY.storage+" Copy the filter code to keep it.",true);}}}

/* ---- orchestration ---- */
function setFilter(f){setF(f);F.rules.forEach(r=>{r.id=uid();if(!r.extra)r.extra=[];if(!r.m)r.m=[];});S.cur=F.rules[0]?F.rules[0].id:null;fullRender();}
function fullRender(){bumpRev();renderHead();renderRows();renderEditor();if(V.view==="test")renderDrops();if(V.view==="io")renderOut();if(V.view==="edit"&&EZ.m==="easy")ezRefresh();save();if(window.shSync)window.shSync();}
function touch(){bumpRev();F.preset="-1";renderHead();renderRows();syncEditor();if(V.view==="test")renderDrops();if(V.view==="io")renderOut();if(V.view==="edit"&&EZ.m==="easy")ezRefresh();save();if(window.shSync)window.shSync();}

/* ---- events ---- */
document.addEventListener("click",e=>{
  const rc=e.target.closest(".rc");if(rc&&!e.target.closest("button,input,label")){S.cur=rc.dataset.rid;renderRows();renderEditor();return;}
  const t=e.target.closest("button");if(!t)return;const d=t.dataset;
  if(d.view){setView(d.view);return;}
  if(t.id==="undo"){undo();return;}
  if(d.rfact){V.act=!V.act;renderRows();return;}
  if(d.clearf){V.q="";V.filter="all";V.act=false;$("#rq").value="";renderRows();return;}
  if(d.sm){S.hlOnly=d.sm==="hl";renderDrops();return;}
  if(d.rf){V.filter=d.rf;renderRows();return;}
  if(d.moretoggle){S.moreOpen=!S.moreOpen;renderEditor();return;}
  if(d.pick){S.cur=d.pick;renderRows();renderEditor();return;}
  if(d.rm){const i=F.rules.findIndex(x=>x.id===d.rm);if(i>=0){F.preset="-1";F.rules.splice(i,1);if(S.cur===d.rm){const n=F.rules[Math.min(i,F.rules.length-1)];S.cur=n?n.id:null;}fullRender();toast("Rule removed. "+COPY.undo);}return;}
  if(t.id==="newRule"||t.id==="addRule"){if(F.rules.length<MAX_RULES){F.preset="-1";const r=newRule();r.id=uid();F.rules.push(r);S.cur=r.id;V.filter="all";V.q="";$("#rq").value="";V.view==="edit"||setView("edit");fullRender();}else toast(COPY.limit,true);return;}
  const r=curRule();
  if(t.id==="sndPlay"&&r){playRuleSound(r.sound);return;}
  if(t.id==="dupRule"&&r){if(F.rules.length<MAX_RULES){F.preset="-1";const c=JSON.parse(JSON.stringify(r));c.id=uid();F.rules.splice(F.rules.indexOf(r)+1,0,c);S.cur=c.id;fullRender();toast("Rule duplicated.");}return;}
  if(t.id==="delRule"&&r){F.preset="-1";const i=F.rules.indexOf(r);F.rules.splice(i,1);const n=F.rules[Math.min(i,F.rules.length-1)];S.cur=n?n.id:null;fullRender();toast("Rule removed. "+COPY.undo);return;}
  if(!r)return;
  if(d.plsave){const k=d.plsave,ids=mlist(r,k);if(!ids.length)return;const n=(prompt("Name for this list",PK[k].title+" list")||"").trim();if(!n)return;const o=PL.load();(o[k]=o[k]||[]).push({n:n.slice(0,40),ids:ids.slice()});PL.save(o);renderEditor();toast("List saved in this browser.");return;}
  if(d.pldel){const k=d.pldel,sel=$("#pls-"+k),o=PL.load();if(!sel||sel.value===""||!(o[k]||[])[+sel.value]){toast("Pick a saved list first.",true);return;}const n=o[k][+sel.value].n;o[k].splice(+sel.value,1);PL.save(o);renderEditor();toast("List \""+n+"\" deleted.");return;}
  if(d.allm!==undefined){
    if(d.allm==="n"){mset(r,"all","");if(!mval(r,"an"))mset(r,"an",2);}
    else{mset(r,"all",d.allm);mset(r,"an","");}
    if(d.allm!==""){mset(r,"nb","");mset(r,"nr","");}
    touch();renderEditor();return;}
  if(d.invm){const[key,v]=d.invm.split(",");if(v==="1"){mset(r,"all","");mset(r,"an","");}mset(r,key,v==="1"?"1":"");touch();renderEditor();return;}
  if(d.padd){const[k,id]=d.padd.split(/,(.+)/);const l=mlist(r,k);if(l.length<MAXL[k]&&!l.includes(id)){l.push(id);msetList(r,k,l);fixAn(r);touch();renderEditor("#pl-"+k);if(window.matchMedia&&matchMedia("(pointer:fine)").matches){const i=$("#pk-"+k);if(i)i.focus({preventScroll:true});}}return;}
  if(d.pclr){const k=d.pclr;msetList(r,k,[]);fixAn(r);touch();renderEditor("#pl-"+k);return;}
  if(d.prm){const[k,id]=d.prm.split(/,(.+)/);msetList(r,k,mlist(r,k).filter(x=>x!==id));fixAn(r);touch();renderEditor("#pl-"+k);return;}
  if(d.set){const[k,v]=d.set.split(",");
    if(k==="action"&&+v===4&&r.action!==4){askCaution([sellKind(Object.assign({},r,{action:4,on:1}))]).then(ok=>{if(ok){r.action=4;touch();}});return;}
    r[k]=+v;touch();return;}
  if(d.col){r.colour=+d.col;touch();return;}
});
document.addEventListener("keydown",e=>{
  if((e.ctrlKey||e.metaKey)&&!e.shiftKey&&e.key.toLowerCase()==="d"&&V.view==="edit"&&EZ.m!=="easy"){e.preventDefault();const b=$("#dupRule");if(b&&!b.disabled)b.click();return;}
  if(e.altKey&&!e.shiftKey&&/^Arrow(Up|Down)$/.test(e.key)&&V.view==="edit"&&EZ.m!=="easy"&&F.rules.length){e.preventDefault();const i=Math.max(0,F.rules.findIndex(r=>r.id===S.cur)),j=Math.min(F.rules.length-1,Math.max(0,i+(e.key==="ArrowDown"?1:-1)));S.cur=F.rules[j].id;renderRows();renderEditor();return;}
  if(e.key==="Escape"&&e.target.matches&&e.target.matches("input[data-pk]")&&e.target.value){const k=e.target.dataset.pk;S.pk[k]="";e.target.value="";renderPickList(k);e.preventDefault();return;}
  if(e.key==="Escape"&&V.q){V.q="";$("#rq").value="";renderRows();return;}
  if((e.ctrlKey||e.metaKey)&&!e.shiftKey&&e.key.toLowerCase()==="z"&&V.view==="edit"&&!e.target.matches("textarea,select,[contenteditable],input:not([type=checkbox]):not([type=radio]):not([type=range]):not([type=button])")){e.preventDefault();undo();return;}
  if(!e.target.matches("#nav button")||!/^Arrow(Left|Right)$/.test(e.key))return;
  const bs=$$("#nav button"),i=bs.indexOf(e.target),n=bs[(i+(e.key==="ArrowRight"?1:bs.length-1))%bs.length];setView(n.dataset.view);n.focus();e.preventDefault();
});
document.addEventListener("change",e=>{
  const t=e.target;
  if(t.dataset.on){const r=F.rules.find(x=>x.id===t.dataset.on);if(r){const want=t.checked;t.checked=!!r.on;setRuleOn(r,want);}return;}
  if(t.id==="f-on"){const r=curRule();if(r){r.on=t.checked?1:0;touch();}return;}
  if(t.id==="preset"){const p=PRESETS[+t.value];if(p){setFilter(p.build());toast("Loaded preset: "+p.label+".");}t.value="";return;}
  if(t.dataset.m&&t.tagName==="SELECT"){const r=curRule();if(r){mset(r,t.dataset.m,t.value);chgMark(t);touch();if(t.dataset.m==="rt")renderEditor();}return;}
  if(t.dataset.mr&&t.tagName==="SELECT"){const r=curRule(),k=t.dataset.mr.split(",")[0];if(r){msetRng(r,k,+$("#m-"+k+"0").value||0,+$("#m-"+k+"1").value||0);chgMark(t);touch();}return;}
  if(t.dataset.f&&t.tagName==="SELECT"){const r=curRule();if(r){r[t.dataset.f]=+t.value;touch();}return;}
});
document.addEventListener("change",e=>{
  const t=e.target,k=t.dataset&&t.dataset.pls;if(!k||t.value==="")return;
  const r=curRule(),l=(PL.load()[k]||[])[+t.value];if(!r||!l)return;
  msetList(r,k,l.ids.slice(0,MAXL[k]));fixAn(r);touch();renderEditor();toast("List applied: "+l.n);
});
let nameT=null,rqT=null;
document.addEventListener("input",e=>{
  const t=e.target;
  if(t.id==="f-name"){const r=curRule();if(r){r.name=t.value.slice(0,NAME_MAX);renderRows();clearTimeout(nameT);nameT=setTimeout(save,500);}return;}
  if(t.id==="rq"){V.q=t.value;clearTimeout(rqT);rqT=setTimeout(renderRows,100);return;}
  if(t.dataset.pk){S.pk[t.dataset.pk]=t.value;renderPickList(t.dataset.pk);}
});
$("#clearF").onclick=()=>{if(!F.rules.length){toast("The filter is already empty.");return;}F.preset="-1";F.rules=[];S.cur=null;fullRender();toast("Filter cleared. "+COPY.undo);};
/* the 200 rule limit is checked only when the filter leaves the page (Copy / Share), never while editing. The game cuts a pasted filter silently at rule 200. */
async function copyFilter(rules,preset,adv){const out=await exportGate(rules,"copy");if(!out)return;copyCode(encode({preset,rules:out}),adv);}
$("#copyAdv").onclick=()=>{if(EZ.m==="easy"&&V.view==="edit")ezCopy();else copyFilter(F.rules,F.preset,true);};
/* Sound preview: plays the file assets/sounds/<name>.ogg (or .mp3 / .wav) for the chosen sound. The game's own audio is not part of this repository; copy the files there to hear them. */
const SND_FILE={1:"chime",2:"soft",3:"jewel",4:"wind"};
function playRuleSound(v){
  const msg=$("#sndMsg"),say=t=>{if(msg)msg.textContent=t;};
  if(v===255){say("Auto uses the game's default sound for the action. Pick a named sound to hear it here.");return;}
  if(v===0){say("Silent plays nothing.");return;}
  const n=SND_FILE[v];if(!n){say("No preview for this sound.");return;}
  const ex=["ogg","mp3","wav"];let i=0;
  const next=()=>{if(i>=ex.length){say("No sound file found. Put the game's “"+n+"” sound at assets/sounds/"+n+".ogg to hear it here.");return;}
    const a=new Audio("assets/sounds/"+n+"."+ex[i++]);a.onerror=next;a.oncanplaythrough=()=>{say("");a.play().catch(()=>say("The browser blocked playback. Click Play again."));};a.load();};
  next();
}
/* ---- modules: reusable groups of rules (localStorage only, same code format as local filters) ---- */
const MD={key:"oathfilter-modules",max:50,
  all(){try{const a=JSON.parse(localStorage.getItem(this.key)||"[]");return Array.isArray(a)?a.filter(x=>x&&typeof x.id==="string"&&typeof x.name==="string"&&typeof x.c==="string"):[];}catch(e){return [];}},
  put(a){try{localStorage.setItem(this.key,JSON.stringify(a));return true;}catch(e){return false;}}};
let mdUi=null;
function renderMD(){if(mdUi)mdUi.refresh();}
/* insert rules into the filter at top / after the selected rule / end (the list and the pre-insert check are in module-ui.js; shared links use this too) */
function mdPlace(rs,name,pos="after"){ /* pos: "top" | "after" | "end" | a rule index (0 = before the first rule) */
  if(typeof EZ!=="undefined"&&EZ.m==="easy")return false;
  const n=rs.length,tot=F.rules.length+n;
  if(tot>MAX_RULES){toast(F.rules.length+" + "+n+" = "+tot+" / "+MAX_RULES+". Delete "+(tot-MAX_RULES)+" rule"+(tot-MAX_RULES===1?"":"s")+" first.",true);return false;}
  const fit=fitRules(rs);rs=fit.rules;
  const at=placeAt(F.rules,pos,S.cur);
  rs.forEach(r=>{r.id=uid();if(!r.extra)r.extra=[];if(!r.m)r.m=[];});
  F.preset="-1";F.rules.splice(at,0,...rs);S.cur=rs[0].id;V.filter="all";V.q="";$("#rq").value="";
  fullRender();toast("Inserted "+rs.length+" rule"+(rs.length===1?"":"s")+(name?" from “"+name+"”":"")+". "+COPY.undo);
  if(fit.notes.length)toast(fit.notes[0],true);
  return true;
}
/* move one rule to a new position (the organizer's drag and drop and arrow buttons) */
function mdMove(from,to){
  if(typeof EZ!=="undefined"&&EZ.m==="easy")return false;
  const n=F.rules.length;if(!(from>=0&&from<n&&to>=0&&to<n)||from===to)return false;
  F.preset="-1";const[r]=F.rules.splice(from,1);F.rules.splice(to,0,r);touch();return true;
}
/* one line per rule for the organizer: name or summary, plus the action word */
function mdDescribe(r){
  const nm=(r.name||"").trim(),sm=summary(r),AC=["hide","show","highlight","beam","sell"][r.action]||"show";
  return {title:nm||sm,sub:nm?sm:"",act:r.on?actWord(r.action):"Off",cls:"action-badge action-badge--"+(r.on?AC:"off")};
}
/* share a module: same link service and offline fallback as the filter share. Returns {url,offline} or null. */
async function mdShare(x){
  const pl={bofilter:x.c,ruleNames:(x.n||[]).map(v=>String(v||"").slice(0,NAME_MAX))};
  try{const key=await shKey(pl),old=shCache.get(key,shBase());
    if(old)return {url:old,offline:old.indexOf("#s=")>0};
    try{const url=shBase()+"#f="+await shPost(pl);shCache.put(key,url);return {url,offline:false};}catch(e){const url=shBase()+"#s="+await shPack(pl);return {url,offline:true};}}
  catch(e){return null;}
}
if(Vue){
  mdUi=mountModuleUi(Vue,{F:()=>F,curId:()=>S.cur,easy:()=>typeof EZ!=="undefined"&&EZ.m==="easy",insert:(rs,pos,name)=>mdPlace(rs,name,pos),
    move:mdMove,describe:mdDescribe,setOn:(id,on)=>setRuleOn(F.rules.find(x=>x.id===id),on),caution:kinds=>askCaution(kinds),icon:n=>li(n),opener:()=>$("#mdOpen"),
    replace:(rs,name)=>{setFilter({preset:"-1",rules:fitRules(rs).rules});toast("Started from “"+name+"” ("+rs.length+" rule"+(rs.length===1?"":"s")+"). "+COPY.undo);},
    toast,share:mdShare,store:MD,storageMsg:COPY.storage,copyBlocked:COPY.blocked+" Select the text and press Ctrl+C."},$("#mdHost"));
  askCaution=mountCaution(Vue,$("#cautionHost"));
  $("#mdOpen").onclick=()=>mdUi.open();
}else{
  $("#mdOpen").onclick=()=>toast("The module organizer needs the Vue library, which could not be loaded. Check your connection and reload the page.",true);
}
$("#mdOpen .mdm-ei").innerHTML=li("layers");
/* ---- old local filters: read-only, copied into modules once ---- */
const LF={key:"oathfilter-saved",max:50,
  all(){try{const a=JSON.parse(localStorage.getItem(this.key)||"[]");return Array.isArray(a)?a.filter(x=>x&&typeof x.id==="string"&&typeof x.name==="string"&&typeof x.c==="string"):[];}catch(e){return [];}},
  put(a){try{localStorage.setItem(this.key,JSON.stringify(a));return true;}catch(e){return false;}}};
(function(){try{if(localStorage.getItem("oathfilter-lf-moved"))return;const old=LF.all();if(old.length){const a=MD.all();old.slice().reverse().forEach(x=>{if(a.length>=MD.max)return;let n=x.name,k=2;while(a.some(y=>y.name.toLowerCase()===n.toLowerCase()))n=x.name.slice(0,34)+" ("+k++ +")";a.unshift({id:"m"+x.id,name:n,c:x.c,n:x.n,t:x.t||Date.now()});});if(!MD.put(a))return;}localStorage.setItem("oathfilter-lf-moved","1");renderMD();}catch(e){}})();
let pendingImport=null;
const doLoad=g=>{const m=$("#loadMsg");setFilter(g.filter);m.className="toast";m.textContent="Loaded "+g.filter.rules.length+" rules. "+g.notes.join(" ")+" Undo is in the Editor.";$("#loadConf").hidden=true;pendingImport=null;};
$("#load").onclick=()=>{const m=$("#loadMsg");try{const g=decode($("#codeIn").value);
  if(F.rules.length){pendingImport=g;$("#loadConfT").textContent="This replaces your current filter ("+F.rules.length+" rule"+(F.rules.length>1?"s":"")+") with "+g.filter.rules.length+" imported rule"+(g.filter.rules.length===1?"":"s")+". Copy its filter code first if you want to keep it.";$("#loadConf").hidden=false;m.textContent="";m.className="toast";}
  else doLoad(g);}catch(err){$("#loadConf").hidden=true;m.className="toast bad";m.textContent=err.message;}};
$("#loadYes").onclick=()=>{if(pendingImport)doLoad(pendingImport);};
$("#loadNo").onclick=()=>{$("#loadConf").hidden=true;pendingImport=null;};
$("#codeIn").addEventListener("input",()=>{$("#loadConf").hidden=true;pendingImport=null;});
(function(){const sp={n:3,sz:1,c:1,lv:0};
  const upd=()=>{$("#oN").textContent=sp.n;$("#oI").textContent=sp.sz;$("#oC").textContent=sp.c;$("#oL").textContent=sp.lv||"auto";$("#qVal").textContent="Rare valuable "+sp.n+"×T1";$("#qIdol").textContent="Idol size "+sp.sz;};
  $("#sN").oninput=e=>{sp.n=+e.target.value;upd();};$("#sI").oninput=e=>{sp.sz=+e.target.value;upd();};$("#sC").oninput=e=>{sp.c=+e.target.value;upd();};$("#sL").oninput=e=>{sp.lv=+e.target.value;upd();};
  $("#qs").addEventListener("click",e=>{const b=e.target.closest("[data-q]");if(b)addDrops(sp.c,{cls:b.dataset.q,n:sp.n,size:sp.sz,lvl:sp.lv});});
})();
$("#chkOrder").onclick=checkOrder;
$("#roll1").onclick=()=>addDrops(1);$("#roll25").onclick=()=>addDrops(25);$("#clear").onclick=()=>{S.items=[];renderDrops();};
$("#auto").onclick=()=>{const b=$("#auto");if(timer){clearInterval(timer);timer=null;b.textContent="Auto-drop: off";b.setAttribute("aria-pressed","false");}else{timer=setInterval(()=>{if(!document.hidden&&V.view==="test")addDrops(1);},1100);b.textContent="Auto-drop: on";b.setAttribute("aria-pressed","true");}};
$("#preset").innerHTML=`<option value="" disabled selected>Game presets…</option>`+PRESETS.map((p,i)=>[i,p.label]).sort(ALPHA).map(o=>`<option value="${o[0]}">${o[1]}</option>`).join("");
/* update check: the build step writes the commit id into BUILD and into version.json next to this page */
const BUILD=window.__OF.build;
/* what is new: the build step writes the newest CHANGELOG.md heading into REL. Each merge adds a new heading on top, so everything above REL is new to this page. */
const REL=window.__OF.rel;
const relOk=/^\d{4}-\d{2}-\d{2}/.test(REL);
const topRelOf=md=>((md.match(/^## (.+)$/m)||[])[1]||"").trim();
function newSince(md,rel){
  const secs=md.split(/^## /m).slice(1);let n=secs.findIndex(x=>x.split("\n")[0].trim()===rel);
  if(n<0)n=1; /* release not found: show the newest section only */
  const out=[];
  secs.slice(0,n).forEach(sec=>{let tag="";sec.split("\n").slice(1).forEach(l=>{
    const h=l.match(/^### (.+)/);if(h){tag=h[1].trim();return;}
    const m=l.match(/^- (.+)/);if(!m)return;
    let t=m[1].replace(/\[([^\]]+)\]\([^)]*\)/g,"$1").replace(/[*`_]/g,"").trim(),r="";
    (t.match(/[^.!?]+[.!?]?(\s|$)/g)||[t]).some(x=>{r+=x;return r.length>=40;});
    r=r.trim();if(r.length>130)r=r.slice(0,127).trim()+"…";
    out.push([tag,r]);});});
  return out;
}
function fillLog(ul,all){
  if(!all.length)return false;const MAXN=8;
  ul.innerHTML=all.slice(0,MAXN).map(([t,x])=>`<li><i>${esc(t)}</i>${esc(x)}</li>`).join("")+(all.length>MAXN?`<li class="hint">…and ${all.length-MAXN} more.</li>`:"");
  return true;
}
(function(){
  if(!/^[0-9a-f]{7,40}$/.test(BUILD))return; /* local copy, no build id */
  const MIN=5*60*1000;let outdated=false,until=0,tm=null;
  const box=$("#upd");
  let prevFocus=null;
  const show=()=>{if(outdated&&Date.now()>=until&&box.hidden){prevFocus=document.activeElement;box.hidden=false;$("#updNow").focus();}};
  const later=()=>{box.hidden=true;until=Date.now()+MIN;clearTimeout(tm);tm=setTimeout(show,MIN);if(prevFocus&&prevFocus.focus&&document.contains(prevFocus))prevFocus.focus();};
  box.addEventListener("keydown",e=>{
    if(e.key==="Escape"){e.preventDefault();later();return;}
    if(e.key==="Tab"){const b=[$("#updNow"),$("#updLater")];if(!$("#updLog").hidden)b.push($("#updAll"));const i=b.indexOf(document.activeElement);e.preventDefault();b[(i+(e.shiftKey?-1:1)+b.length)%b.length].focus();}
  });
  /* compact "what is new" in the update prompt: only what is newer than the release this page runs (REL) */
  let logDone=false,topRel="";
  async function loadLog(){
    if(logDone)return;logDone=true;
    try{
      const r=await fetch("CHANGELOG.md?t="+Date.now(),{cache:"no-store"});if(!r.ok)return;
      const md=await r.text();topRel=topRelOf(md);
      if(fillLog($("#updList"),newSince(md,REL)))$("#updLog").hidden=false;
    }catch(e){}
  }
  async function check(){
    try{const r=await fetch("version.json?t="+Date.now(),{cache:"no-store"});if(!r.ok)return;
      const v=(await r.json()).version;if(v&&v!==BUILD){outdated=true;await loadLog();show();}}catch(e){}
  }
  setInterval(check,MIN);
  document.addEventListener("visibilitychange",()=>{if(!document.hidden)check();});
  $("#updNow").onclick=()=>{try{save();}catch(e){}try{if(topRel)localStorage.setItem("oathfilter-seen",topRel);}catch(e){}fetch(location.href,{cache:"reload"}).catch(()=>{}).then(()=>location.reload());}; /* refresh the cached page first, or the host cache may serve the old one again */
  $("#updLater").onclick=later;
  window.__updCheck=check;
})();
/* after a reload: if the changes were never shown (the prompt was dismissed), show them once, only what is newer than the last release this browser has seen */
(function(){
  if(!relOk)return;
  const K="oathfilter-seen";let seen=null;
  try{seen=localStorage.getItem(K);}catch(e){}
  const mark=()=>{try{localStorage.setItem(K,REL);}catch(e){}};
  if(!seen||seen===REL){mark();return;}
  const box=$("#upd");let prev=null;const T0=$("#updT").textContent,D0=$("#updD").textContent;
  const done=()=>{$("#updT").textContent=T0;$("#updD").textContent=D0;$("#updLog").hidden=true;box.hidden=true;box.classList.remove("done");["#updNow","#updLater"].forEach(q=>$(q).hidden=false);$("#updOk").hidden=true;mark();if(prev&&prev.focus&&document.contains(prev))prev.focus();};
  box.addEventListener("keydown",e=>{if(!box.classList.contains("done"))return;e.stopImmediatePropagation();if(e.key==="Escape"){e.preventDefault();done();}else if(e.key==="Tab"){const b=[$("#updOk"),$("#updAll")],i=b.indexOf(document.activeElement);e.preventDefault();b[(i+(e.shiftKey?-1:1)+b.length)%b.length].focus();}},true);
  $("#updOk").onclick=done;
  fetch("CHANGELOG.md?t="+Date.now(),{cache:"no-store"}).then(r=>r.ok?r.text():"").then(md=>{
    if(!md)return;
    if(!box.hidden||!fillLog($("#updList"),newSince(md,seen))){mark();return;}
    $("#updLog").hidden=false;box.classList.add("done");
    $("#updT").textContent="Oathfilter was updated";$("#updD").textContent="This is what changed since you were last here.";
    $("#updNow").hidden=true;$("#updLater").hidden=true;$("#updOk").hidden=false;
    prev=document.activeElement;box.hidden=false;$("#updOk").focus();
  }).catch(()=>{});
})();
/* ---- share links: short link through the Oathfilter share worker (POST /s, GET /s/<id>); offline fallback #s=... ---- */
const SHARE_URL="https://oathfilter-share.mathiesjng.workers.dev",SH_NAME_MAX=40,SH_BY_MAX=30,SH_ID=/^[A-Za-z0-9_-]{3,40}$/;
const shBase=()=>location.href.split("#")[0];
const shClean=(v,n)=>String(v==null?"":v).replace(/[\u0000-\u001f]/g," ").trim().slice(0,n);
async function shFetch(url,opt){const ac=new AbortController(),t=setTimeout(()=>ac.abort(),8000);try{return await fetch(url,Object.assign({signal:ac.signal},opt||{}));}finally{clearTimeout(t);}}
function b64uEnc(u8){let s="";for(let i=0;i<u8.length;i+=0x8000)s+=String.fromCharCode.apply(null,u8.subarray(i,i+0x8000));return btoa(s).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");}
function b64uDec(t){const b=atob(t.replace(/-/g,"+").replace(/_/g,"/")+"===".slice((t.length+3)%4));const u=new Uint8Array(b.length);for(let i=0;i<b.length;i++)u[i]=b.charCodeAt(i);return u;}
/* offline link: JSON, deflate-raw when the browser can, base64url; first character says which (z = packed, p = plain) */
async function shPack(pl){
  const j=JSON.stringify(Object.assign({v:1,c:pl.bofilter,n:pl.ruleNames,sv:DATA_BUILD.build,d:ezHash(pl.bofilter)},pl.pre?{pm:pl.pre}:{},pl.e?{e:pl.e}:{}));let u=new TextEncoder().encode(j),m="p";
  try{if(typeof CompressionStream==="function"){const z=new Uint8Array(await new Response(new Blob([u]).stream().pipeThrough(new CompressionStream("deflate-raw"))).arrayBuffer());if(z.length<u.length){u=z;m="z";}}}catch(e){u=new TextEncoder().encode(j);m="p";}
  return m+b64uEnc(u);}
const SH_MAXZ=262144; /* decompressed cap in bytes: a 200 rule filter with names is about 30 KB */
async function shUnpack(str){
  if(str.length>400000)throw new Error("size");
  const m=str[0],u=b64uDec(str.slice(1));let t;
  if(m==="z"){
    const rd=new Blob([u]).stream().pipeThrough(new DecompressionStream("deflate-raw")).getReader(),parts=[];let n=0;
    for(;;){const r=await rd.read();if(r.done)break;n+=r.value.length;if(n>SH_MAXZ){try{await rd.cancel();}catch(e){}throw new Error("size");}parts.push(r.value);}
    const all=new Uint8Array(n);let o=0;parts.forEach(x=>{all.set(x,o);o+=x.length;});t=new TextDecoder().decode(all);}
  else if(m==="p"){if(u.length>SH_MAXZ)throw new Error("size");t=new TextDecoder().decode(u);}else throw new Error("format");
  const o=JSON.parse(t);return{bofilter:o.c,filterName:o.f,authorName:o.a,ruleNames:o.n,sv:o.sv,d:o.d,pm:o.pm};}
/* offline links also carry: the data build, a hash of the compiled code (a drift check only), and when rules were merged the code of your filter before the merge, plus the Easy Mode state (preset, build buttons, toggles). The share service stores only the code and the rule names. */
function shPayload(rules){rules=rules||F.rules;return{bofilter:encode({preset:F.preset,rules}),ruleNames:rules.map(r=>String(r.name||"").slice(0,NAME_MAX)),pre:rules!==F.rules?encode(F):"",e:EZ.m==="easy"&&ezLinked()?ezSnap():null};}
async function shPost(pl){
  const nm={};(pl.ruleNames||[]).forEach((x,i)=>{if(x)nm[i]=x;}); /* the service stores rule names as an object keyed by rule position */
  const body=JSON.stringify({bofilter:pl.bofilter,ruleNames:nm});let r;
  try{r=await shFetch(SHARE_URL+"/s",{method:"POST",headers:{"Content-Type":"application/json"},body});}
  catch(e){if(e&&e.name==="AbortError")throw e;r=await shFetch(SHARE_URL+"/s",{method:"POST",headers:{"Content-Type":"text/plain;charset=UTF-8"},body});} /* second try without a preflight */
  if(!r.ok)throw new Error("HTTP "+r.status);
  const j=await r.json(),id=j&&(j.id||(j.data&&j.data.id));
  if(typeof id!=="string"||!SH_ID.test(id))throw new Error("no id");
  return id;}
let shLast={code:"",url:"",busy:false};
/* same filter + same rule names = same link: remembered in this browser (newest 30), so repeated clicks do not create new entries on the service */
const shCache={key:"oathfilter-share-cache",
  all(){try{const o=JSON.parse(localStorage.getItem(this.key)||"[]");return Array.isArray(o)?o.filter(x=>x&&typeof x.k==="string"&&typeof x.u==="string"):[];}catch(e){return [];}},
  get(k,base){const x=this.all().find(y=>y.k===k&&y.u.indexOf(base+"#f=")===0);return x?x.u:"";},
  put(k,u){try{localStorage.setItem(this.key,JSON.stringify([{k,u}].concat(this.all().filter(y=>y.k!==k)).slice(0,30)));}catch(e){}}};
async function shKey(pl){const t=JSON.stringify([pl.bofilter,pl.ruleNames]);
  try{const h=new Uint8Array(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(t)));return Array.from(h,b=>b.toString(16).padStart(2,"0")).join("");}catch(e){let x=5381;for(let i=0;i<t.length;i++)x=((x<<5)+x+t.charCodeAt(i))|0;return "d"+(x>>>0).toString(16)+"-"+t.length;}}
const shMsg=(m,bad)=>{const e=$("#shMsg");e.textContent=m;e.style.color=bad?"var(--hide-fg)":"";};
async function shCopyText(txt,ok){
  try{await navigator.clipboard.writeText(txt);shMsg(ok);return;}catch(e){}
  try{const ta=document.createElement("textarea");ta.value=txt;ta.style.position="fixed";ta.style.opacity="0";document.body.appendChild(ta);ta.select();const done=document.execCommand("copy");ta.remove();if(done){shMsg(ok);return;}}catch(e){}
  const u=$("#shUrl");u.focus();u.select();shMsg(COPY.blocked+" The link is selected: press Ctrl+C.",true);}
window.shSync=()=>{const r=$("#shRes");if(r&&!r.hidden&&shLast.src!==encode(F)){r.hidden=true;shMsg("The filter changed. Create a new link to share the latest version.");}};
$("#shClose").onclick=()=>{$("#shPanel").hidden=true;};
$("#shMake").onclick=()=>{ /* Easy Mode: the Easy filter replaces the active filter first, then it is shared */
  if(EZ.m==="easy"&&V.view==="edit"&&!ezApply())return;
  $("#shPanel").hidden=false;shRun();};
const shRun=async()=>{
  if(shLast.busy)return;
  if(!F.rules.length){shMsg("Add at least one rule first.",true);return;}
  const btn=$("#shMake");
  shLast.busy=true;btn.disabled=true;
  const src=encode(F),rules=await exportGate(F.rules,"share");
  if(!rules){shLast.busy=false;btn.disabled=false;shMsg("Not shared. Nothing was changed.");return;}
  const pl=shPayload(rules);
  $("#shRes").hidden=true;shMsg("Creating link…");
  let url="",offline=false,reused=false;const key=await shKey(pl),old=shCache.get(key,shBase());
  if(old){url=old;reused=true;}
  else try{url=shBase()+"#f="+await shPost(pl);shCache.put(key,url);}
  catch(e){try{url=shBase()+"#s="+await shPack(pl);offline=true;}catch(e2){shLast.busy=false;btn.disabled=false;shMsg("The link could not be created. Copy the game code instead.",true);return;}}
  shLast={code:pl.bofilter,src,url,busy:false};btn.disabled=false;
  $("#shUrl").value=url;$("#shRes").hidden=false;
  setTimeout(()=>{if(window.shSync)window.shSync();},0); /* the filter may have changed while the link was created */
  shMsg(reused?"This exact filter was shared before. Here is the same link, nothing new was stored.":offline?"The share service could not be reached, so this is an offline link. It works without the service"+(url.length>1800?", but it is long and Discord may cut it.":"."):"Link created.",offline&&url.length>1800);};
$("#shCopy").onclick=()=>shCopyText($("#shUrl").value,"Link copied.");
$("#shDisc").onclick=()=>shCopyText("[Oathfilter filter]("+$("#shUrl").value+")","Discord link copied.");
$("#shUrl").addEventListener("focus",e=>e.target.select());

/* opening a share link: preview first, nothing changes until the person says so */
let shTok=0,shPrev=null;
const shr=$("#shr");
/* Copy / Share gate: nothing leaves the page with more than 200 rules or a broken order without a clear yes. Resolves to the rules to export, or null. The filter on the page is never changed. */
function exportGate(rules,what){
  const plan=exportPlan(rules);
  if(plan.ok&&!plan.errors.length)return Promise.resolve(rules);
  return new Promise(res=>{
    let done=false;const fin=v=>{if(done)return;done=true;res(v);};
    const errs=plan.errors.slice(0,6).map(e=>"<li>"+esc(e.text)+"</li>").join("")+(plan.errors.length>6?"<li>+ "+(plan.errors.length-6)+" more</li>":"");
    const buttons=[];let body="",title="";
    if(!plan.ok){
      title="Too many rules to "+what;
      body=`<p class="shw">Your filter has ${plan.n} rules. The game takes ${MAX_RULES} and silently cuts everything after rule ${MAX_RULES}, so the Hide and Sell rules at the end would be lost.</p>`;
      if(plan.canMerge){
        body+=`<p class="shw" style="margin-top:8px">Safe merge: neighbouring rules that differ only in one any-of list (named lines, bases or reds) become one rule. ${plan.n} rules become ${plan.after}, and every item is decided the same way. Your filter on this page is not changed; only the ${what==="share"?"shared":"copied"} filter is merged.</p>`;
        buttons.push({id:"gateGo",text:"Merge and "+what,cls:"gold",fn:()=>{fin(plan.rules);shrClose();}});
      }else body+=`<p class="shw" style="margin-top:8px">Merging neighbouring rules only gets it to ${plan.after} rules, still ${plan.after-MAX_RULES} too many. Remove or combine rules, then try again. Nothing was ${what==="share"?"shared":"copied"}.</p>`;
    }else{
      title="Check before you "+what;
      body=`<p class="shw">These problems are in the filter you are about to ${what}.</p>`;
      buttons.push({id:"gateGo",text:(what==="share"?"Share":"Copy")+" anyway",cls:"gold",fn:()=>{fin(rules);shrClose();}});
    }
    if(errs)body+=`<p class="shw" style="margin-top:8px">Problems in the ${what==="share"?"shared":"copied"} filter:</p><ul class="shn">${errs}</ul>`;
    buttons.push({id:"gateNo",text:"Cancel",fn:()=>shrClose()});
    shrShow({title,desc:"Nothing is "+(what==="share"?"shared":"copied")+" until you choose.",body,focus:buttons[0].id,buttons});
    shrCb=()=>fin(null);
  });
}
let shrCb=null; /* called once when the dialog closes or another dialog replaces it (the export gate waits on it) */
function shrShow(o){
  if(shrCb){const f=shrCb;shrCb=null;f();}
  if(shr.hidden)shPrev=document.activeElement;
  $("#shrT").textContent=o.title||"";$("#shrD").textContent=o.desc||"";$("#shrBody").innerHTML=o.body||"";
  const bt=$("#shrBt");bt.innerHTML="";
  (o.buttons||[]).forEach(b=>{const e=document.createElement("button");e.type="button";e.className="btn"+(b.cls?" "+b.cls:"");e.textContent=b.text;e.id=b.id||"";e.onclick=b.fn;bt.appendChild(e);});
  shr.hidden=false;const f=(o.focus&&bt.querySelector("#"+o.focus))||bt.querySelector("button");if(f)f.focus();}
function shrClose(){
  shTok++;shr.hidden=true;
  if(/^#(f|s)=/.test(location.hash)){try{history.replaceState(null,"",shBase());}catch(e){}}
  if(shPrev&&shPrev.focus&&shPrev.isConnected){try{shPrev.focus({preventScroll:true});}catch(e){}}shPrev=null;
  if(shrCb){const f=shrCb;shrCb=null;f();}}
shr.addEventListener("keydown",e=>{
  if(e.key==="Escape"){e.preventDefault();e.stopPropagation();shrClose();return;}
  if(e.key==="Tab"){const b=[...shr.querySelectorAll("button:not([disabled])")];if(!b.length)return;const i=b.indexOf(document.activeElement);e.preventDefault();b[(i+(e.shiftKey?-1:1)+b.length)%b.length].focus();}});
shr.addEventListener("pointerdown",e=>{if(e.target===shr)shrClose();});
function shBuild(pl){
  const bad=()=>({kind:"bad"});
  if(!pl||typeof pl.bofilter!=="string"||pl.bofilter.length>60000)throw bad();
  let d;try{d=decode(pl.bofilter);}catch(e){throw bad();}
  const f=d.filter;if(!f||!Array.isArray(f.rules))throw bad();
  if(pl.ruleNames&&typeof pl.ruleNames==="object")f.rules.forEach((r,i)=>{r.name=shClean(pl.ruleNames[i],NAME_MAX);});
  const nt=(d.notes||[]).slice();
  if(typeof pl.d==="string"&&pl.d!==ezHash(pl.bofilter))nt.push("This link's code does not match the check hash it was shared with, so it may have been changed after it was shared.");
  if(Number.isFinite(+pl.sv)&&+pl.sv&&+pl.sv!==DATA_BUILD.build)nt.push("It was made with game data build "+(+pl.sv)+"; this page has build "+DATA_BUILD.build+". Lines or bases may differ.");
  return{f,notes:nt,filterName:shClean(pl.filterName,SH_NAME_MAX),authorName:shClean(pl.authorName,SH_BY_MAX)};}
const shErr={
  nf:["Share link not found","This link does not exist (any more). Check that it was copied completely."],
  net:["Share service not reachable","The filter could not be loaded. Check your connection and try again."],
  srv:["Share service problem","The share service answered with an error. Try again later."],
  bad:["Share link cannot be opened","This link does not contain a valid filter."]};
function shLfSave(b){
  const a=MD.all();if(a.length>=MD.max)return {err:"You can keep up to "+MD.max+" modules. Delete one first."};
  let name=b.filterName||("Shared filter"+(b.authorName?" by "+b.authorName:""));name=name.slice(0,36);
  let n=name,k=2;while(a.some(x=>x.name.toLowerCase()===n.toLowerCase()))n=name+" ("+k++ +")";
  a.unshift({id:"m"+Date.now().toString(36)+uid().slice(0,3),name:n,c:encode(b.f),n:b.f.rules.map(r=>r.name||""),t:Date.now()});
  if(!MD.put(a))return {err:COPY.storage};
  renderMD();return {name:n};}
function shPreview(b,views){
  const named=b.f.rules.map(r=>r.name).filter(Boolean),cur=F.rules.length;
  const rows=[];if(b.filterName)rows.push(["Filter",b.filterName]);if(b.authorName)rows.push(["Created by",b.authorName]);rows.push(["Rules",String(b.f.rules.length)]);
  if(views!=null)rows.push(["Opened",views+(views===1?" time":" times")]);
  const lst=named.slice(0,8).map(n=>"<li>"+esc(n)+"</li>").join("")+(named.length>8?"<li>+ "+(named.length-8)+" more</li>":"");
  const body=`<dl class="shl">${rows.map(r=>`<dt>${r[0]}</dt><dd>${esc(r[1])}</dd>`).join("")}<dt>Rule names</dt><dd>${named.length?named.length+" included":"none"}</dd></dl>${named.length?`<ul class="shn">${lst}</ul>`:""}`
    +(b.notes.length?`<p class="shw" style="margin-top:8px">${b.notes.map(esc).join(" ")}</p>`:"")
    +`<p class="shw" id="shrNote" style="margin-top:8px" role="status">${cur?"Loading it replaces your current filter ("+cur+" rule"+(cur===1?"":"s")+"). "+COPY.undo+" (Editor)":"Your current filter is empty."}</p>`;
  shrShow({title:"Open this shared filter?",desc:"Nothing changes until you choose.",body,focus:"shrNo",buttons:[
    {id:"shrLoad",text:"Replace my filter",cls:"gold",fn:()=>{setFilter(b.f);setView("edit");shrClose();toast("Loaded shared filter"+(b.filterName?" “"+b.filterName+"”":"")+" ("+b.f.rules.length+" rules).");}},
    {id:"shrIns",text:"Insert into my filter",fn:()=>{const n=$("#shrNote");
      if(EZ.m==="easy"){n.textContent="Switch to Advanced Mode first, then open the link again.";n.style.color="var(--hide-fg)";return;}
      const rs=JSON.parse(JSON.stringify(b.f.rules));
      if(F.rules.length+rs.length>MAX_RULES){n.textContent=F.rules.length+" + "+rs.length+" = "+(F.rules.length+rs.length)+" / "+MAX_RULES+". Delete "+(F.rules.length+rs.length-MAX_RULES)+" rule"+(F.rules.length+rs.length-MAX_RULES===1?"":"s")+" first, or use Replace my filter.";n.style.color="var(--hide-fg)";return;}
      if(mdPlace(rs,b.filterName||"")){setView("edit");shrClose();}}},
    {id:"shrSave",text:"Save as module",fn:()=>{const r=shLfSave(b),n=$("#shrNote");if(r.err){n.textContent=r.err;n.style.color="var(--hide-fg)";return;}n.style.color="";n.textContent="Saved as “"+r.name+"” as a module. Your current filter is unchanged.";$("#shrSave").disabled=true;}},
    {id:"shrNo",text:"Cancel",fn:shrClose}]});}
async function shOpenFromHash(){
  const m=location.hash.match(/^#(f|s)=([A-Za-z0-9_-]+)$/);if(!m)return;
  const tok=++shTok,retry=()=>shOpenFromHash();
  shrShow({title:"Opening shared filter…",desc:"",body:"",buttons:[{id:"shrNo",text:"Cancel",fn:shrClose}]});
  let b,views=null;
  try{
    let pl;
    if(m[1]==="f"){
      if(!SH_ID.test(m[2]))throw {kind:"bad"};
      let r;try{r=await shFetch(SHARE_URL+"/s/"+encodeURIComponent(m[2]));}catch(e){throw {kind:"net"};}
      if(r.status===404||r.status===410)throw {kind:"nf"};if(!r.ok)throw {kind:"srv",status:r.status};
      let j;try{j=await r.json();}catch(e){throw {kind:"bad"};}
      if(j&&j.data&&typeof j.data==="object"&&!j.bofilter)j=j.data;
      pl={bofilter:j&&(j.bofilter||j.code),filterName:j&&j.filterName,authorName:j&&j.authorName,ruleNames:j&&j.ruleNames};
      if(j&&j.views!=null&&Number.isFinite(+j.views))views=Math.max(0,Math.round(+j.views));
    }else{try{pl=await shUnpack(m[2]);}catch(e){throw {kind:"bad"};}}
    b=shBuild(pl);
  }catch(e){
    if(tok!==shTok)return;const k=(e&&shErr[e.kind])?e.kind:"bad";
    shrShow({title:shErr[k][0],desc:shErr[k][1]+(k==="srv"&&e.status?" (HTTP "+e.status+")":""),body:"",buttons:(k==="net"||k==="srv"?[{id:"shrRetry",text:"Try again",cls:"gold",fn:retry}]:[]).concat([{id:"shrNo",text:"Close",fn:shrClose}])});return;}
  if(tok!==shTok)return;shPreview(b,views);}
window.addEventListener("hashchange",shOpenFromHash);
/* ---- drop screenshot checker (Drop Test tab): local OCR, text parser, top-to-bottom rule check ---- */
const DC={job:0,tess:null,text:"",busy:false};
const DC_RAR={normal:"N",magic:"M",rare:"R",unique:"U",red:"U"};
const DC_KW=[[/\b(?:rings?)\b/i,"ring",""],[/\bamulets?\b/i,"amulet",""],[/\bbelts?\b/i,"belt",""],[/\b(?:gloves|gauntlets|mitts)\b/i,"gloves",""],[/\b(?:boots|greaves|sandals|shoes)\b/i,"boots",""],[/\b(?:helm|helmet|circlet|crown|cap|hood|diadem)\b/i,"helm",""],[/\b(?:shield|ward|buckler|aegis)\b/i,"shield",""],[/\btomes?\b/i,"tome",""],[/\b(?:vest|robe|cuirass|plate|jerkin|vestment|hauberk|garb|coat|brigandine)\b/i,"chest",""],[/\bbows?\b/i,"weapon","bow"],[/\bwands?\b/i,"weapon","wand"],[/\bstaff|staves\b/i,"weapon","staff"],[/\bscythes?\b/i,"weapon","scythe"],[/\bdaggers?\b/i,"weapon","dagger"],[/\bclaws?\b/i,"weapon","claw"]];
const dcNorm=s=>String(s||"").replace(/[‘’´`]/g,"'").replace(/[×]/g,"x").replace(/\s+/g," ").trim().toLowerCase();
let DC_LR=null;
/* per-tier value ranges of every affix (game data), used to check or derive the tier shown as "T3 [7-8]" */
const TIERR_SRC=`life_large|120-139;100-119;80-99;60-79;45-59;30-44;15-29;5-14
life|75-89;60-74;45-59;35-44;25-34;15-24;5-14
mana|70-79;60-69;50-59;40-49;30-39;20-29;10-19
es_global|41-49;33-40;25-32;18-24;12-17;7-11;3-6
armour_local|261-306;216-260;171-215;128-170;89-127;60-86;33-46;8-12
armour_local_small|118-137;98-117;78-97;58-77;40-57;27-39;15-21;4-5
evasion_local|261-306;216-260;171-215;128-170;89-127;60-86;33-46;8-12
evasion_local_small|118-137;98-117;78-97;58-77;40-57;27-39;15-21;4-5
es_local|71-82;60-70;48-59;37-47;26-36;18-25;10-15;4-6
es_local_small|33-37;27-32;22-26;17-21;12-16;8-11;5-7;2-3
defence_inc|101-110;92-100;80-91;68-79;56-67;43-55;27-42;11-26
phys_inc_local|155-179;130-154;110-129;90-109;70-89;50-69;30-49;15-29
phys_added_local|37-45~67-82;29-36~53-66;22-28~40-52;16-21~29-39;11-15~20-28;7-10~13-19;4-6~8-12;2-3~5-7
fire_added_local|36-44~72-88;28-35~56-70;21-27~42-54;15-20~30-40;10-14~20-28;6-9~12-18;3-5~7-10;1-2~3-5
fire_spell_added|29-37~59-74;22-29~45-58;16-22~33-44;11-16~23-32;7-11~15-22;4-7~9-14;2-4~5-8;1-2~3-4
fire_dmg_inc|60-69;50-59;40-49;31-39;23-30;16-22;10-15;5-9
fire_spell_added_2h|67-85~136-170;51-67~103-133;37-51~76-101;25-37~53-74;16-25~34-51;9-16~21-32;5-9~12-18;2-5~7-9
fire_dmg_inc_2h|138-159;115-136;92-113;71-90;53-69;37-51;23-34;12-21
cold_added_local|36-44~72-88;28-35~56-70;21-27~42-54;15-20~30-40;10-14~20-28;6-9~12-18;3-5~7-10;1-2~3-5
cold_spell_added|29-37~59-74;22-29~45-58;16-22~33-44;11-16~23-32;7-11~15-22;4-7~9-14;2-4~5-8;1-2~3-4
cold_dmg_inc|60-69;50-59;40-49;31-39;23-30;16-22;10-15;5-9
cold_spell_added_2h|67-85~136-170;51-67~103-133;37-51~76-101;25-37~53-74;16-25~34-51;9-16~21-32;5-9~12-18;2-5~7-9
cold_dmg_inc_2h|138-159;115-136;92-113;71-90;53-69;37-51;23-34;12-21
lightning_added_local|36-44~72-88;28-35~56-70;21-27~42-54;15-20~30-40;10-14~20-28;6-9~12-18;3-5~7-10;1-2~3-5
lightning_spell_added|29-37~59-74;22-29~45-58;16-22~33-44;11-16~23-32;7-11~15-22;4-7~9-14;2-4~5-8;1-2~3-4
lightning_dmg_inc|60-69;50-59;40-49;31-39;23-30;16-22;10-15;5-9
lightning_spell_added_2h|67-85~136-170;51-67~103-133;37-51~76-101;25-37~53-74;16-25~34-51;9-16~21-32;5-9~12-18;2-5~7-9
lightning_dmg_inc_2h|138-159;115-136;92-113;71-90;53-69;37-51;23-34;12-21
poison_spell_added|29-37~59-74;22-29~45-58;16-22~33-44;11-16~23-32;7-11~15-22;4-7~9-14;2-4~5-8;1-2~3-4
poison_dmg_inc|60-69;50-59;40-49;31-39;23-30;16-22;10-15;5-9
poison_spell_added_2h|67-85~136-170;51-67~103-133;37-51~76-101;25-37~53-74;16-25~34-51;9-16~21-32;5-9~12-18;2-5~7-9
poison_dmg_inc_2h|138-159;115-136;92-113;71-90;53-69;37-51;23-34;12-21
spell_inc|110-124;95-109;80-94;65-79;50-64;35-49;20-34;10-19
spell_inc_2h|253-285;218-251;184-216;150-182;115-147;80-113;46-78;23-44
skill_level|2-2;1-1
skill_level_bow|2-2;1-1
skill_level_2h|3-3;2-2;1-1
attack_added_phys|9-13~14-21;7-11~12-18;6-9~10-15;4-7~8-12;3-5~6-9;2-3~4-6;1-2~3-4
attack_added_lightning|3-7~57-70;3-6~45-56;2-5~33-44;2-4~23-32;1-3~15-22;1-2~9-14;1-1~5-8
fire_res|41-45;36-40;31-35;26-30;21-25;16-20;11-15;6-10
cold_res|41-45;36-40;31-35;26-30;21-25;16-20;11-15;6-10
lightning_res|41-45;36-40;31-35;26-30;21-25;16-20;11-15;6-10
poison_res|41-45;36-40;31-35;26-30;21-25;16-20;11-15;6-10
all_res|17-18;15-16;12-14;9-11;6-8;3-5
phys_as_elem|9-10;7-8;5-6;3-4
str_flat|43-50;38-42;33-37;28-32;23-27;18-22;13-17;8-12
dex_flat|43-50;38-42;33-37;28-32;23-27;18-22;13-17;8-12
int_flat|43-50;38-42;33-37;28-32;23-27;18-22;13-17;8-12
all_attr|25-28;21-24;17-20;13-16;9-12;5-8;1-4
attack_speed_local|26-28;23-25;20-22;17-19;14-16;11-13;8-10;5-7
attack_speed|14-16;11-13;8-10;5-7
cast_speed|29-32;26-28;23-25;20-22;17-19;14-16;11-13;8-10
cast_speed_2h|67-74;60-64;53-57;46-51;39-44;32-37;25-30;18-23
cast_speed_jewel|14-16;11-13;8-10;5-7
cooldown_recovery|12-14;9-11;7-8
crit_local|35-38;30-34;25-29;20-24;15-19;10-14
crit_global|35-38;30-34;25-29;20-24;15-19;10-14
crit_multi|35-38;30-34;25-29;20-24;13-19;8-12
move_speed|35-35;30-30;25-25;20-20;15-15;10-10
life_regen|29-37;22-29;16-22;11-16;7-11;4-7;2-4;1-2
mana_regen|62-67;56-61;50-55;40-49;30-39;20-29;10-19
life_on_kill|29-38;21-28;14-20;9-13;5-8;2-4
ring_life_on_kill|29-38;21-28;14-20;9-13;5-8;2-4
mana_on_kill|8-10;6-8;4-6;3-4;2-3;1-2
ring_mana_on_kill|8-10;6-8;4-6;3-4;2-3;1-2
mana_leech|0.6-0.7;0.4-0.5;0.2-0.3
ring_mana_leech|0.6-0.7;0.4-0.5;0.2-0.3
es_leech|0.9-1;0.7-0.8;0.5-0.6;0.3-0.4
ring_es_leech|0.9-1;0.7-0.8;0.5-0.6;0.3-0.4
life_leech|0.9-1;0.7-0.8;0.5-0.6;0.2-0.4
ring_life_leech|0.9-1;0.7-0.8;0.5-0.6;0.2-0.4
area|17-20;14-16;11-13;8-10;5-7
ignite_chance|16-20;11-15;7-10;4-6
shock_chance|16-20;11-15;7-10;4-6
ignite_effect|21-25;16-20;11-15;6-10
poison_effect|21-25;16-20;11-15;6-10
shock_effect|18-22;13-17;9-12;5-8
freeze_duration|21-25;16-20;11-15;6-10
bleed_chance|16-20;11-15;7-10;4-6
bleed_effect|21-25;16-20;11-15;6-10
dot_multi|15-18;11-14;7-10;4-6
chill_effect|21-25;16-20;11-15;6-10
minion_dmg|63-72;53-62;43-52;34-42;26-33;19-25;13-18;8-12
minion_dmg_2h|113-130;95-112;77-94;61-76;47-59;34-45;23-32;14-22
minion_dmg_jewel|32-37;26-31;21-25;16-20;12-15;8-11;5-7
minion_life|35-40;30-34;25-29;20-24;16-19;12-15;8-11
minion_speed|13-15;10-12;7-9;4-6
minion_crit|35-38;30-34;25-29;20-24;15-19;10-14
minion_crit_multi|30-34;25-29;20-24;13-19;8-12
curse_effect|17-20;13-16;9-12;5-8
curse_limit|1-1
max_fire_res91|2-2;1-1
max_cold_res91|2-2;1-1
max_lightning_res91|2-2;1-1
max_poison_res91|2-2;1-1
req_reduce|20-24;17-19;14-16;11-13;8-10;5-7
idol_life_s|16-19;12-14;7-10;5-6
idol_life_m|29-33;20-26;13-19;10-12
idol_life_l|41-46;29-36;17-26;13-16
idol_life_x|51-61;38-46;23-32;17-22
idol_mana_s|14-17;10-13;6-9;4-5
idol_mana_m|26-32;19-23;10-16;8-9
idol_mana_l|36-44;26-32;14-22;10-13
idol_mana_x|46-55;32-42;19-28;14-18
idol_es_s|10-12;7-9;4-6;3-3
idol_es_m|19-20;13-16;7-10;5-6
idol_es_l|26-29;17-22;12-14;9-10
idol_es_x|32-38;23-28;14-19;10-13
idol_armour_s|7-8;5-6;3-4;2-2
idol_armour_m|13-14;9-11;5-7;4-4
idol_armour_l|18-20;12-15;8-10;6-7
idol_armour_x|22-26;16-19;10-13;8-9
idol_evasion_s|7-8;5-6;3-4;2-2
idol_evasion_m|13-14;9-11;5-7;4-4
idol_evasion_l|18-20;12-15;8-10;6-7
idol_evasion_x|22-26;16-19;10-13;8-9
idol_phys_s|7-8;5-6;3-4;2-2
idol_phys_m|13-14;9-11;5-7;4-4
idol_phys_l|18-20;12-15;8-10;6-7
idol_phys_x|22-26;16-19;10-13;8-9
idol_elemental_s|7-8;5-6;3-4;2-2
idol_elemental_m|13-14;9-11;5-7;4-4
idol_elemental_l|18-20;12-15;8-10;6-7
idol_elemental_x|22-26;16-19;10-13;8-9
idol_spell_s|7-8;5-6;3-4;2-2
idol_spell_m|13-14;9-11;5-7;4-4
idol_spell_l|18-20;12-15;8-10;6-7
idol_spell_x|22-26;16-19;10-13;8-9
idol_melee_s|7-8;5-6;3-4;2-2
idol_melee_m|13-14;9-11;5-7;4-4
idol_melee_l|18-20;12-15;8-10;6-7
idol_melee_x|22-26;16-19;10-13;8-9
idol_minion_s|7-8;5-6;3-4;2-2
idol_minion_m|13-14;9-11;5-7;4-4
idol_minion_l|18-20;12-15;8-10;6-7
idol_minion_x|22-26;16-19;10-13;8-9
idol_fire_res_s|7-8;5-6;3-4;2-2
idol_fire_res_m|13-14;9-11;5-7;4-4
idol_fire_res_l|18-20;12-15;8-10;6-7
idol_fire_res_x|22-26;16-19;10-13;8-9
idol_cold_res_s|7-8;5-6;3-4;2-2
idol_cold_res_m|13-14;9-11;5-7;4-4
idol_cold_res_l|18-20;12-15;8-10;6-7
idol_cold_res_x|22-26;16-19;10-13;8-9
idol_lightning_res_s|7-8;5-6;3-4;2-2
idol_lightning_res_m|13-14;9-11;5-7;4-4
idol_lightning_res_l|18-20;12-15;8-10;6-7
idol_lightning_res_x|22-26;16-19;10-13;8-9
idol_poison_res_s|7-8;5-6;3-4;2-2
idol_poison_res_m|13-14;9-11;5-7;4-4
idol_poison_res_l|18-20;12-15;8-10;6-7
idol_poison_res_x|22-26;16-19;10-13;8-9
idol_move_s|3-3;2-2;1-1
idol_move_m|5-5;4-4;2-2;1-1
idol_move_l|8-8;5-5;2-2;1-1
idol_move_x|10-10;6-6;3-3;2-2
idol_regen_s|5-6;3-4;1-2
idol_regen_m|9-11;5-7;2-4;1-1
idol_regen_l|12-15;8-10;2-5;1-1
idol_regen_x|16-19;10-13;3-6;2-2
idol_attack_speed_s|3-3;2-2;1-1
idol_attack_speed_m|5-5;4-4;2-2;1-1
idol_attack_speed_l|8-8;5-5;2-2;1-1
idol_attack_speed_x|10-10;6-6;3-3;2-2
idol_cast_speed_s|3-3;2-2;1-1
idol_cast_speed_m|5-5;4-4;2-2;1-1
idol_cast_speed_l|8-8;5-5;2-2;1-1
idol_cast_speed_x|10-10;6-6;3-3;2-2
idol_crit_s|10-12;7-9;4-6;3-3
idol_crit_m|18-22;13-16;7-11;5-6
idol_crit_l|25-30;18-22;10-15;8-9
idol_crit_x|32-38;22-29;13-19;10-12
idol_crit_multi_s|6-7;4-5;2-3;1-1
idol_crit_multi_m|11-13;7-9;4-5;3-3
idol_crit_multi_l|15-18;10-12;5-8;4-4
idol_crit_multi_x|19-22;13-16;6-10;4-5
idol_life_kill_s|5-6;3-4;1-2
idol_life_kill_m|9-11;5-7;2-4;1-1
idol_life_kill_l|12-15;8-10;2-5;1-1
idol_life_kill_x|16-19;10-13;3-6;2-2
idol_mana_regen_s|10-12;7-9;4-6;3-3
idol_mana_regen_m|18-22;13-16;7-11;5-6
idol_mana_regen_l|25-30;18-22;10-15;8-9
idol_mana_regen_x|32-38;22-29;13-19;10-12
idol_area_s|4-5;3-3;1-2
idol_area_m|7-9;5-5;2-4;1-1
idol_area_l|10-12;8-8;2-5;1-1
idol_area_x|13-16;10-10;3-6;2-2
idol_str_s|6-7;4-5;2-3;1-1
idol_str_m|11-13;7-9;4-5;3-3
idol_str_l|15-18;10-12;5-8;4-4
idol_str_x|19-22;13-16;6-10;4-5
idol_dex_s|6-7;4-5;2-3;1-1
idol_dex_m|11-13;7-9;4-5;3-3
idol_dex_l|15-18;10-12;5-8;4-4
idol_dex_x|19-22;13-16;6-10;4-5
idol_int_s|6-7;4-5;2-3;1-1
idol_int_m|11-13;7-9;4-5;3-3
idol_int_l|15-18;10-12;5-8;4-4
idol_int_x|19-22;13-16;6-10;4-5
idol_ballista_speed_m|6-7;5-5;3-4;2-2
idol_ballista_speed_l|9-10;7-8;5-6;4-4
idol_ballista_speed_x|12-13;9-10;6-8;4-5
idol_ballista_life_m|10-11;8-9;5-7;4-4
idol_ballista_life_l|14-16;11-13;8-10;6-7
idol_ballista_life_x|18-21;14-17;10-13;8-9
idol_minion_life_m|6-7;5-5;3-4;2-2
idol_minion_life_l|9-10;7-8;5-6;4-4
idol_minion_life_x|12-13;9-10;6-8;4-5
idol_minion_speed_m|4-4;3-3;2-2;1-1
idol_minion_speed_l|5-5;4-4;3-3;2-2
idol_minion_speed_x|6-6;5-5;4-4;3-3
idol_channel_area_m|6-7;5-5;3-4;2-2
idol_channel_area_l|9-10;7-8;5-6;4-4
idol_channel_area_x|12-13;9-10;6-8;4-5
idol_channel_cost_m|4-4;3-3;2-2;1-1
idol_channel_cost_l|5-5;4-4;3-3;2-2
idol_channel_cost_x|6-6;5-5;4-4;3-3
idol_slam_damage_m|9-10;7-8;5-6;4-4
idol_slam_damage_l|13-15;10-12;7-9;5-6
idol_slam_damage_x|17-20;13-16;9-12;7-8
idol_slam_area_m|6-6;4-5;3-3;2-2
idol_slam_area_l|8-9;6-7;4-5;3-3
idol_slam_area_x|10-12;8-9;5-6;4-4
idol_chain_damage_m|9-10;7-8;5-6;4-4
idol_chain_damage_l|13-15;10-12;7-9;5-6
idol_chain_damage_x|17-20;13-16;9-12;7-8
idol_orbit_damage_m|9-10;7-8;5-6;4-4
idol_orbit_damage_l|13-15;10-12;7-9;5-6
idol_orbit_damage_x|17-20;13-16;9-12;7-8
idol_bow_area_m|6-6;4-5;3-3;2-2
idol_bow_area_l|8-9;6-7;4-5;3-3
idol_bow_area_x|10-12;8-9;5-6;4-4
idol_projectile_damage_m|7-8;6-6;4-5;3-3
idol_projectile_damage_l|10-12;8-9;6-7;4-5
idol_projectile_damage_x|13-16;10-12;8-9;6-7
idol_holy_damage_m|9-10;7-8;5-6;4-4
idol_holy_damage_l|13-15;10-12;7-9;5-6
idol_holy_damage_x|17-20;13-16;9-12;7-8
idol_poison_damage_m|7-8;6-6;4-5;3-3
idol_poison_damage_l|10-12;8-9;6-7;4-5
idol_poison_damage_x|13-16;10-12;8-9;6-7
idol_fire_damage_m|7-8;6-6;4-5;3-3
idol_fire_damage_l|10-12;8-9;6-7;4-5
idol_fire_damage_x|13-16;10-12;8-9;6-7
idol_cold_damage_m|7-8;6-6;4-5;3-3
idol_cold_damage_l|10-12;8-9;6-7;4-5
idol_cold_damage_x|13-16;10-12;8-9;6-7
idol_lightning_damage_m|7-8;6-6;4-5;3-3
idol_lightning_damage_l|10-12;8-9;6-7;4-5
idol_lightning_damage_x|13-16;10-12;8-9;6-7
idol_movement_damage_m|6-6;4-5;3-3;2-2
idol_movement_damage_l|8-9;6-7;4-5;3-3
idol_movement_damage_x|10-12;8-9;5-6;4-4
idol_trap_damage_m|9-10;7-8;5-6;4-4
idol_trap_damage_l|13-15;10-12;7-9;5-6
idol_trap_damage_x|17-20;13-16;9-12;7-8
idol_shield_damage_m|9-10;7-8;5-6;4-4
idol_shield_damage_l|13-15;10-12;7-9;5-6
idol_shield_damage_x|17-20;13-16;9-12;7-8
idol_bleed_damage_m|9-10;7-8;5-6;4-4
idol_bleed_damage_l|13-15;10-12;7-9;5-6
idol_bleed_damage_x|17-20;13-16;9-12;7-8
idol_mana_leech_l|0.18-0.22;0.14-0.17;0.1-0.12;0.08-0.09
idol_mana_leech_x|0.23-0.29;0.18-0.22;0.13-0.16;0.1-0.12
idol_grand_chain_plus|1-1
idol_grand_ballista_plus|1-1
idol_grand_orbit_plus|1-1
idol_grand_skeleton_plus|1-1
idol_grand_slam_spike|1-1
idol_grand_bow_projectile|1-1
idol_grand_channel_ramp|4-5;3-4
idol_grand_phys_as_fire|6-7;4-5
idol_grand_phys_as_cold|6-7;4-5
idol_grand_phys_as_lightning|6-7;4-5
idol_grand_elemental_pen|4-5;3-3
idol_grand_life_inc|6-7;4-5
idol_grand_max_res|1-1
idol_grand_max_poison_res|1-1
idol_grand_melee_afterimage|1-1
idol_grand_skeleton_wizard_plus|1-1
idol_grand_eng_totem|28-36;20-26
idol_grand_eng_afterimage|8-10;5-7
idol_grand_eng_orbit|3-4;3-3
idol_grand_eng_trap|6-8;4-5
idol_grand_eng_minion|4-5;3-3
idol_grand_eng_brand|28-36;20-26
idol_grand_eng_slam|9-12;6-8
idol_grand_trap_plus|1-1
idol_grand_spark_plus|1-1
drune_life|16-20
drune_mana|15-18
drune_es|10-12
drune_armour|10-12
drune_evasion|10-12
drune_phys|10-12
drune_elemental|10-12
drune_spell|10-12
drune_melee|10-12
drune_projectile|10-12
drune_minion|10-12
drune_fire_res|10-12
drune_cold_res|10-12
drune_lightning_res|10-12
drune_poison_res|10-12
drune_attack_speed|3-3
drune_cast_speed|3-3
drune_crit|15-18
drune_crit_multi|9-10
drune_move|3-3
drune_regen|8-9
drune_area|6-8
drune_str|9-10
drune_dex|9-10
drune_int|9-10
ring_move_speed|4-5;3-4;2-3
gloves_cast_speed|14-16;11-13;8-10;5-7
ring_attack_speed|6-7;4-5;2-3
ring_cast_speed|6-7;4-5;2-3
poison_pen85_2h|10-12;8-9;6-7;4-5
poison_pen85_1h|5-6;4-5;3-4;2-3
riven95_life_large|146-167
riven95_armour_local|321-367
riven95_armour_local_small|144-164
riven95_evasion_local|321-367
riven95_evasion_local_small|144-164
riven95_es_local|86-98
riven95_es_local_small|39-44
riven95_defence_inc|116-132
riven95_phys_inc_local|188-215
riven95_phys_added_local|47-54~86-98
riven95_fire_added_local|46-53~92-106
riven95_fire_spell_added|39-44~78-89
riven95_fire_dmg_inc|72-83
riven95_fire_spell_added_2h|89-102~178-204
riven95_fire_dmg_inc_2h|167-191
riven95_cold_added_local|46-53~92-106
riven95_cold_spell_added|39-44~78-89
riven95_cold_dmg_inc|72-83
riven95_cold_spell_added_2h|89-102~178-204
riven95_cold_dmg_inc_2h|167-191
riven95_lightning_added_local|46-53~92-106
riven95_lightning_spell_added|39-44~78-89
riven95_lightning_dmg_inc|72-83
riven95_lightning_spell_added_2h|89-102~178-204
riven95_lightning_dmg_inc_2h|167-191
riven95_poison_spell_added|39-44~78-89
riven95_poison_dmg_inc|72-83
riven95_poison_spell_added_2h|89-102~178-204
riven95_poison_dmg_inc_2h|167-191
riven95_spell_inc|130-149
riven95_spell_inc_2h|299-342
riven95_fire_res|47-54
riven95_cold_res|47-54
riven95_lightning_res|47-54
riven95_poison_res|47-54
riven95_phys_as_elem|11-12
riven95_str_flat|52-60
riven95_dex_flat|52-60
riven95_int_flat|52-60
riven95_attack_speed_local|29-34
riven95_cast_speed|34-38
riven95_cast_speed_2h|78-89
riven95_crit_local|40-46
riven95_crit_global|40-46
riven95_crit_multi|40-46
riven95_life_regen|39-44
riven95_area|21-24
riven95_minion_dmg|76-86
riven95_minion_dmg_2h|136-156
riven95_minion_dmg_jewel|39-44
riven95_max_fire_res91|3-3
riven95_max_cold_res91|3-3
riven95_max_lightning_res91|3-3
riven95_max_poison_res91|3-3
riven95_skill_level|3-3
riven95_skill_level_bow|3-3
riven95_skill_level_2h|4-4
riven95_cooldown_recovery|16-18
riven95_dot_multi|20-23
fire_pen95_2h|10-12;8-9;6-7;4-5
fire_pen95_1h|5-6;4-5;3-4;2-3
cold_pen95_2h|10-12;8-9;6-7;4-5
cold_pen95_1h|5-6;4-5;3-4;2-3
lightning_pen95_2h|10-12;8-9;6-7;4-5
lightning_pen95_1h|5-6;4-5;3-4;2-3
elemental_pen95_amulet|5-6;4-5;3-4;2-3
vow_effect98|17-20;13-16;9-12;5-8`;
let DC_TR=null;
function dcTR(){ /* range key -> [{id,t}] ; riven affixes are tier 0 */
  if(DC_TR)return DC_TR;DC_TR={};TR_BY_ID={};
  TIERR_SRC.split("\n").forEach(l=>{const i=l.indexOf("|");if(i<0)return;const id=l.slice(0,i),riv=/^riven/.test(id);
    TR_BY_ID[id]=l.slice(i+1).split(";");
    TR_BY_ID[id].forEach((k,j)=>{(DC_TR[k]=DC_TR[k]||[]).push({id,t:riv?0:j+1});});});
  return DC_TR;
}
let TR_BY_ID={};
const dcRngKey=str=>{const m=String(str).match(/\[\s*(\d+)\s*(?:-\s*(\d+))?\s*(?:to\s*(\d+)\s*-\s*(\d+))?/i);if(!m)return null;
  return m[1]+"-"+(m[2]||m[1])+(m[3]?"~"+m[3]+"-"+m[4]:"");};
/* Tier check. ids: affix ids the line can belong to (null = unknown line). Returns {tier,unsure,src}. */
function dcResolveTier(ocrTier,key,ids){
  if(!key)return{tier:ocrTier,unsure:false,src:"text"};
  const all=dcTR()[key]||[],pref=ids?all.filter(h=>ids.includes(h.id)):all,hits=pref.length?pref:all,ts=[...new Set(hits.map(h=>h.t))]; /* idol and riven ids are not in the line list, so fall back to every affix with this range */
  if(ts.length===1){
    if(ocrTier!==null&&ocrTier!==ts[0]&&ids){ /* the digit and the range disagree: if the digit's own range also half-fits, we cannot tell which one is misread */
      const half=(a,b)=>{const x=a.split(/[-~]/),y=b.split(/[-~]/);return x.length===y.length&&x.length>=2&&x.some((v,i)=>v===y[i]);};
      for(const id of ids){const r=(TR_BY_ID[id]||[])[ocrTier===0?0:ocrTier-1];if(r&&half(r,key))return{tier:null,unsure:true,src:"conflict",guess:ocrTier};}
    }
    return{tier:ts[0],unsure:false,src:ocrTier===ts[0]||ocrTier===null?"range":"range-fix",was:ocrTier};}
  if(ts.length>1){return ocrTier!==null&&ts.includes(ocrTier)?{tier:ocrTier,unsure:false,src:"text+range"}:{tier:null,unsure:true,src:"ambiguous",guess:ocrTier};}
  /* the range is not in the table: a digit may be misread. Accept the OCR tier only if its range is one digit away. */
  if(ocrTier!==null&&ids){
    const near=(a,b)=>{const x=a.split(/[-~]/),y=b.split(/[-~]/);if(x.length!==y.length)return false;let d=0;for(let i=0;i<x.length;i++){if(x[i]!==y[i]){if(Math.abs(+x[i]-+y[i])>1)return false;d++;}}return d<=1;};
    for(const id of ids){const r=(TR_BY_ID[id]||[])[ocrTier===0?0:ocrTier-1];if(r&&near(r,key))return{tier:ocrTier,unsure:false,src:"text+near"};}
    /* half the range still matches this tier's range (one number misread): the tier digit is corroborated */
    const half=(a,b)=>{const x=a.split(/[-~]/),y=b.split(/[-~]/);return x.length===y.length&&x.length>=2&&x.filter((v,i)=>v===y[i]).length>=Math.ceil(x.length/2)&&x.some((v,i)=>v===y[i]);};
    for(const id of ids){const r=(TR_BY_ID[id]||[])[ocrTier===0?0:ocrTier-1];if(r&&half(r,key))return{tier:ocrTier,unsure:false,src:"text+half"};}
  }
  return{tier:null,unsure:true,src:"no-match",guess:ocrTier};
}
/* fuzzy line match: numbers become #, then a similarity score against every line template */
const dcFzN=t=>t.toLowerCase().replace(/\s*[\u00b7\u2022]\s*(adds|multiplies)\b.*$/,"").replace(/\s+-\s*adds\b.*$/,"").replace(/[+\-]?\d[\d.,]*(?:\s*-\s*\d[\d.,]*)?/g,"#").replace(/[^a-z#%\s]/g," ").replace(/\s+/g," ").trim();
const dcLev=(a,b)=>{const m=a.length,n=b.length;let p=Array.from({length:n+1},(_,j)=>j);for(let i=1;i<=m;i++){const c=[i];for(let j=1;j<=n;j++)c[j]=Math.min(p[j]+1,c[j-1]+1,p[j-1]+(a[i-1]===b[j-1]?0:1));p=c;}return p[n];};
const DC_FZ_MIN=.86,DC_FZ_GAP=.04;
let DC_FZL=null;const DC_FZC={};
const dcTri=t=>{const o=new Set();for(let i=0;i<t.length-2;i++)o.add(t.slice(i,i+3));return o;};
function dcFuzzy(text){
  const a=dcFzN(text);if((a.match(/[a-z]/g)||[]).length<10)return"";
  if(a in DC_FZC)return DC_FZC[a];
  if(!DC_FZL)DC_FZL=Object.keys(LINE_IDS).map(l=>{const n=dcFzN(l.replace(/\(local\)/i,"").replace(/\b[XY]\b/g,"#"));return{label:l,n,tri:dcTri(n)};});
  const ta=dcTri(a),sc=[];
  for(const x of DC_FZL){ /* cheap trigram filter first, edit distance only for plausible templates */
    let hit=0;for(const g of x.tri)if(ta.has(g))hit++;if(!x.tri.size||hit/x.tri.size<.5)continue;
    let best=0;for(let L=Math.max(3,x.n.length-3);L<=x.n.length+3;L++){const pre=a.slice(0,L),v=1-dcLev(pre,x.n)/Math.max(pre.length,x.n.length);if(v>best)best=v;}
    sc.push([best,x.label]);}
  sc.sort((u,v)=>v[0]-u[0]);
  return DC_FZC[a]=sc.length&&sc[0][0]>=DC_FZ_MIN&&sc[0][0]-(sc[1]?sc[1][0]:0)>=DC_FZ_GAP?sc[0][1]:"";
}
/* Word boxes -> text lines. Right-aligned "T3 [7-8]" markers are split from the text by position and joined with a TAB. */
function dcFromWords(words,W){
  const ws=(words||[]).filter(w=>w&&String(w.t).trim()).map(w=>({t:String(w.t).trim(),x0:w.x0,y0:w.y0,x1:w.x1,y1:w.y1}));
  if(!ws.length)return"";
  W=W||Math.max(...ws.map(w=>w.x1));
  const hs=ws.map(w=>w.y1-w.y0).sort((a,b)=>a-b),mh=hs[hs.length>>1]||10;
  ws.sort((a,b)=>(a.y0+a.y1)-(b.y0+b.y1));
  const rows=[];
  for(const w of ws){const yc=(w.y0+w.y1)/2,r=rows[rows.length-1];if(r&&Math.abs(yc-r.yc)<mh*.5){r.w.push(w);r.yc=(r.yc*(r.w.length-1)+yc)/r.w.length;}else rows.push({yc,w:[w]});}
  return rows.map(r=>{
    const a=r.w.sort((p,q)=>p.x0-q.x0);let k=a.findIndex(w=>/^\[\s*\d/.test(w.t)&&w.x0>=W*.3);
    if(k>0&&/^[_\u2014\u2013-]*(?:[Tt])?[0-9OoIl|]{1,2}$/.test(a[k-1].t)&&a[k-1].x0>=W*.3)k--;
    const left=(k<0?a:a.slice(0,k)).map(w=>w.t).join(" "),tail=k<0?[]:a.slice(k).map(w=>w.t).filter(t=>/[A-Za-z0-9]/.test(t));
    return tail.length?left+"\t"+tail.join(" "):left;
  }).join("\n");
}
function dcTextOf(data){ /* tesseract.js result -> text with a column split when word boxes exist */
  try{
    let ws=data.words;
    if(!ws&&data.blocks)ws=data.blocks.flatMap(b=>b.paragraphs.flatMap(p=>p.lines.flatMap(l=>l.words)));
    if(ws&&ws.length){const m=ws.map(w=>({t:w.text,x0:w.bbox.x0,y0:w.bbox.y0,x1:w.bbox.x1,y1:w.bbox.y1}));const t=dcFromWords(m);if(t.trim())return t;}
  }catch(e){}
  return data.text||"";
}
function dcLineRes(){
  if(DC_LR)return DC_LR;
  DC_LR=Object.keys(LINE_IDS).map(label=>{
    const src=label.replace(/\(local\)/i,"").trim().replace(/[.*+?^${}()|[\]\\]/g,m=>m==="|"||m==="("||m===")"?m:"\\"+m);
    let p=src.replace(/\b[XY]\b/g,"#").replace(/#\|plural\\?\(one=([^,]+),other=([^)]+)\\?\)/g,"(?:$1|$2)").replace(/#/g,"[+\\-]?[\\d.,]+").replace(/\s+/g,"\\s*");
    try{return{label,re:new RegExp("^\\W{0,3}"+p,"i"),len:label.length};}catch(e){return null;}
  }).filter(Boolean).sort((a,b)=>b.len-a.len);
  return DC_LR;
}
const dcLblOf=a=>LINEN[a.id]||LINEN[a.id.replace(/^Idol(.+?)_/,(m,x)=>"idol_"+x.replace(/([a-z])([A-Z])/g,"$1_$2").toLowerCase()+"_")]||"";
const dcAff=label=>AFF.find(a=>dcLblOf(a)===label);
/* Screenshot reader in other game languages: the text is translated back to English (affix lines, base and unique names, tooltip words) and then read by the English parser below. */
const DC_OCR={bg:"bul",cs:"ces",da:"dan",de:"deu",el:"ell","es-ES":"spa","es-419":"spa",fi:"fin",fr:"fra",hu:"hun",id:"ind",it:"ita",ja:"jpn",ko:"kor",ms:"msa",nb:"nor",nl:"nld",pl:"pol","pt-BR":"por","pt-PT":"por",ro:"ron",ru:"rus",sv:"swe",th:"tha",tr:"tur",uk:"ukr",vi:"vie","zh-Hans":"chi_sim","zh-Hant":"chi_tra"};
const dcOcrLang=()=>DC_OCR[LANG]?DC_OCR[LANG]+"+eng":"eng";
const dcEsc=s=>String(s).replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
const dcCjk=s=>/[぀-ヿ㐀-鿿가-힯฀-๿]/.test(s);
function dcRev(){
  if(DC_REV)return DC_REV;
  const R={lines:[],names:[],terms:[],tier:null};
  Object.keys(LX.raw).forEach(en=>{
    const loc=LX.raw[en];if(!loc||loc===en)return;
    const parts=String(loc).split("#");if(parts.length>4)return;
    const src=parts.map(p=>dcEsc(p).replace(/\s+/g,"\\s*")).join("([+\\-]?[\\d.,]+)");
    let re;try{re=new RegExp("^(\\W{0,3})"+src,"i");}catch(e){return;}
    R.lines.push({re,en:en.replace(/#\|plural\(one=[^,]*,other=([^)]*)\)/g,"#$1"),len:String(loc).length});
  });
  R.lines.sort((a,b)=>b.len-a.len);
  const add=(arr,loc,en)=>{loc=String(loc||"");if(!loc||(loc.length<2&&!dcCjk(loc)))return;if(loc.toLowerCase()===String(en).toLowerCase())return;arr.push({loc,en,len:loc.length});};
  Object.keys(LX.bases).forEach(id=>add(R.names,LX.bases[id],BASEN[id]));
  Object.keys(LX.reds).forEach(id=>add(R.names,LX.reds[id],REDN[id]));
  Object.keys(LX.ui2).forEach(k=>{if(k==="tier")R.tier=LX.ui2[k];else add(R.terms,LX.ui2[k],k);});
  [R.names,R.terms].forEach(a=>a.sort((x,y)=>y.len-x.len));
  const wr=loc=>{const e=dcEsc(loc);return dcCjk(loc)?new RegExp(e,"giu"):new RegExp("(?<![\\p{L}\\d])"+e+"(?![\\p{L}])","giu");};
  [R.names,R.terms].forEach(a=>a.forEach(x=>{try{x.re=wr(x.loc);}catch(e){}}));
  return setDcRev(R);
}
function dcLocalize(text){
  if(LANG==="en"||!LX.raw)return text;
  const R=dcRev();let t=String(text||"");
  if(R.tier&&R.tier!=="T")try{t=t.replace(new RegExp("(^|[^\\p{L}\\d])"+dcEsc(R.tier)+"(?=\\s?[0-9OoIl|]\\s*\\[)","gmu"),"$1T");}catch(e){}
  t=t.split(/\r?\n/).map(ln=>{
    for(const x of R.lines){const m=ln.match(x.re);if(!m)continue;const nums=m.slice(2);let k=0;
      const eng=x.en.replace(/#/g,()=>nums.length?nums[Math.min(k++,nums.length-1)]:"0");
      return m[1]+eng+ln.slice(m[0].length);}
    return ln;
  }).join("\n");
  R.names.forEach(x=>{if(x.re)t=t.replace(x.re,x.en);});
  R.terms.forEach(x=>{if(x.re)t=t.replace(x.re,x.en);});
  return t;
}
function dcParse(text){
  text=dcLocalize(text);
  const raw=String(text||""),lines=raw.split(/\r?\n/).map(s=>s.replace(/\s*\u2502\s*/g,"\t").replace(/[^\S\t]+/g," ").replace(/ ?\t ?/g,"\t").trim()).filter(Boolean),all=dcNorm(raw);
  const d={rar:null,kind:null,sub:"",rune:false,rtier:null,gem:false,core:false,truesworn:false,unsworn:null,ilvl:null,req:null,sock:null,grade:null,mods:[],baseId:"",baseName:"",redId:"",redName:"",ruleNo:null,ruleName:"",alt:false,nameHit:[],seen:[]};
  let m;
  for(const ln of lines){ /* rarity + type line, e.g. "Magic Idol 2x1" */
    m=ln.match(/^(normal|magic|rare|unique|red)\b\s+(.+)$/i);
    if(m&&!/^requires/i.test(ln)){d.rar=DC_RAR[m[1].toLowerCase()];break;}
  }
  if(!d.rar){m=raw.match(/\b(Normal|Magic|Rare|Unique|Red)(?=[A-Z\s]|$)/);if(m)d.rar=DC_RAR[m[1].toLowerCase()];}
  if(/\bidols?\b/i.test(raw)&&(/\b\d\s*x\s*\d\b/i.test(raw)||d.rar))d.kind="idol";
  if(/\bdwarven rune\b/i.test(raw)){d.dwarven=true;}
  else if(!/item\s*level/i.test(raw)&&(/\brune\s+\d+\s*of\s*\d+/i.test(raw)||lines.some(l=>/\brune\s*$/i.test(l)&&l.split(/\s+/).length<=3))){d.rune=true;m=raw.match(/\btier\s*([1-6])\b/i)||raw.match(/\bT\s*([1-6])\b/);if(m)d.rtier=+m[1];}
  if(!d.kind&&!d.rune&&/\b(?:skill|support)\s+gem\b|\bgem\b/i.test(raw)&&!/item level/i.test(raw))d.gem=true;
  d.core=/core[- ]?touched/i.test(raw);d.truesworn=/truesworn/i.test(raw);
  if(/\bunsworn\b/i.test(raw))d.unsworn=!/not unsworn/i.test(raw);
  m=raw.match(/[Il1\[|]tem\s*Lev[eo]l\s*[:\-!]?\s*(\d{1,3})/i);if(m)d.ilvl=+m[1];
  m=raw.match(/requires?\s*(?:hero\s*)?level\s*[:\-]?\s*(\d{1,3})/i);if(m)d.req=+m[1];
  m=raw.match(/^\W*sockets?\s*:\s*(.+)$/im);if(m){const t=m[1].split(/[\u00b7\-:|,]+/).map(x=>x.trim()).filter(x=>/[a-z]/i.test(x));if(t.length&&t.length<=6)d.sock=t.length;}else{m=raw.match(/(\d)\s*sockets?\b/i);if(m)d.sock=+m[1];}
  m=raw.match(/grade\s*[:\-]?\s*(\d{2,3})/i);if(m)d.grade=+m[1];
  d.alt=/\balt\s*:/i.test(raw);d.jewel=!/item\s*level/i.test(raw)&&(/^\W*Jewel\s*[\u00b7\-]\s*\S/im.test(raw)||/\bCut\s+[A-Za-z]+\s+Jewel\b/i.test(raw)||/\bFaceted\b.*\bJewel\b/i.test(raw));d.runeBase=d.rar==="N"&&/oathword\s+base/i.test(raw);
  m=raw.match(/(?:loot\s*filter\s*)?\brule\s*(?:#|no\.?|number)?\s*(\d{1,2})\b\s*(?::\s*([^\n]+))?/i);
  if(m){d.ruleNo=+m[1];d.ruleName=(m[2]||"").trim();}
  /* base / unique names: longest name that appears in the text */
  let best=null;BASES.forEach(b=>{const n=dcNorm(b.name);if(n.length>=4&&all.includes(n)&&(!best||n.length>dcNorm(best.name).length))best=b;});
  if(best){d.baseId=best.id;d.baseName=best.name;if(!d.kind||d.kind!=="idol"){d.kind=best.kind;d.sub=best.sub||"";}}
  let ub=null;UNIQUES.forEach(u=>{const n=dcNorm(u.name);if(n.length>=4&&all.includes(n)&&(!ub||n.length>dcNorm(ub.name).length))ub=u;});
  if(ub&&(!d.rar||d.rar==="U")){d.redName=ub.name;d.redId=ub.id||(DATA.reds.find(x=>x[1]===ub.name)||[])[0]||"";d.rar="U";if(!d.baseId){d.baseId=ub.base.id;d.baseName=ub.base.name;}if(!d.kind){d.kind=ub.base.kind;d.sub=ub.base.sub||"";}}
  if(!d.kind&&!d.rune&&!d.gem)for(const k of DC_KW)if(k[0].test(raw)){d.kind=k[1];d.sub=k[2];break;}
  /* lines and tiers. The game puts "T3 [7-8]" right of the affix text or on the next line (uniques: only "[160-190]").
     Long affixes wrap onto a second line. Lines before the first marker (and diamond lines) are implicits. */
  const LR=dcLineRes(),nz=t=>t.replace(/\b(Physical|Fire|Cold|Lightning|Poison|Chaos|Elemental)\s+Damage\s+to\s+(Spells|Attacks)\b/gi,(m,e,k)=>e+(/^s/i.test(k)?" Spell":" Attack")+" Damage"),
    fnd=t=>{t=nz(t);for(const v of [t,t.replace(/^\W{0,3}Damage\s+(?=Penetrates)/i,"")])for(const x of LR)if(x.re.test(v))return x.label;return dcFuzzy(t);};
  const TIERC=s=>{const m=s.match(/^\W{0,2}(?:T|t)?\s?([0-9OoIl|])(?=\s|\[|$)/);if(!m)return null;const v=/[OoQ]/.test(m[1])?0:/[Il|]/.test(m[1])?1:+m[1];return v<=9?v:null;};
  const TIER=s=>{const m=s.match(/(?:^|[^A-Za-z0-9])(?:T|[1Il|])\s?([0-9OoQIl|])\s*\[\s*\d/);if(!m)return null;const v=/[OoQ]/.test(m[1])?0:/[Il|]/.test(m[1])?1:+m[1];return v<=9?v:null;};
  const ents=[];let last=null,prevText=false,pend="";
  for(let ln of lines){
    if(/^if equipped\b/i.test(ln))break;
    let bul=false;const ln2=ln.replace(/^[*\u2022\u00b7\u00a2\u2666\u25c6\u2756]\s*/,"");if(ln2!==ln){bul=true;ln=ln2;}
    let text,mkStr="",hasMk;
    if(ln.includes("\t")){const ti=ln.indexOf("\t");text=ln.slice(0,ti).trim();mkStr=ln.slice(ti+1);hasMk=/\d/.test(mkStr);}
    else{const bi=ln.search(/\[\s*\d/);hasMk=bi>=0;if(hasMk)mkStr=ln.slice(Math.max(0,bi-6));
      text=(hasMk?ln.slice(0,bi).replace(/(?:^|[\s_\u2014\u2013-])(?:T|[1Il|])\s?[0-9OoQIl|]\s*$/,""):ln).trim();}
    const tier=hasMk?TIER(mkStr)??TIERC(mkStr):null,rng=hasMk?dcRngKey(mkStr):null,riven=hasMk&&/riven/i.test(mkStr);
    if(hasMk&&!/[A-Za-z]{3}/.test(text)){ /* marker-only line belongs to the entry above */
      if(last&&!last.mk){last.mk=true;last.tier=tier;last.rng=rng;last.riven=riven;}
      prevText=false;continue;
    }
    const lab=fnd(text);
    if(lab){last={label:lab,text,tier,rng,riven,mk:hasMk,bul};ents.push(last);prevText=true;pend="";continue;}
    if(last&&prevText){ /* wrapped second line: join only if it gives a better label */
      const j=fnd(last.text+" "+text);
      if(j&&j!==last.label){last.label=j;last.text+=" "+text;if(hasMk&&!last.mk){last.mk=true;last.tier=tier;last.rng=rng;last.riven=riven;}pend="";continue;}
    }
    if(pend){const j=fnd(pend+" "+text);if(j){last={label:j,text:pend+" "+text,tier,rng,riven,mk:hasMk,bul};ents.push(last);prevText=true;pend="";continue;}}
    if(hasMk){last={label:"",text,tier,rng,riven,mk:true,bul};ents.push(last);prevText=true;pend="";continue;}
    pend=/[A-Za-z]{3}/.test(text)?text:"";prevText=false;
  }
  const first=ents.findIndex(e=>e.mk);
  d.implicit=ents.filter((e,i)=>e.bul||(first>0&&i<first)).map(e=>e.label);
  ents.forEach((e,i)=>{if(e.bul||(first>0&&i<first))return;
    const ids=e.label?(LINE_IDS[e.label]||null):null,
      r=d.rar==="U"||d.kind==="idol"?{tier:e.tier,unsure:false,src:"text"}  /* uniques have no tiers; idol ranges in the tooltip are scaled and do not match the table */
       :e.riven?{tier:0,unsure:false,src:"riven"}:dcResolveTier(e.tier,e.rng,ids);
    d.mods.push({label:e.label,tier:r.tier,unsure:!!r.unsure,src:r.src,rng:e.rng||null,fixed:r.src==="range-fix"});});
  d.riven=d.mods.some(x=>x.tier===0);
  d.mods.forEach(x=>{const a=x.label?dcAff(x.label):null;x.tiers=a?a.n:0;x.lines=a?(LINEMAP[a.group]||[]):[];});
  for(let i=0;i<F.rules.length;i++){const n=(F.rules[i].name||"").trim();if(n.length>=3&&all.includes(dcNorm(n)))d.nameHit.push(i);}
  return d;
}
/* three-way check of one rule: yes / no / maybe (a needed detail is not visible in the screenshot) */
function dcRule(r,d){
  const why=[],soft=[];let no=false;
  const need=(c,msg)=>{if(c===null)why.push(msg);else if(!c)no=true;};
  const rt=+mval(r,"rt")||0;
  if(d.rune){need(rt?(d.rtier===null?null:d.rtier<=rt):false,"Rune tier not visible");return dcOut(no,why,soft);}
  if(rt){return{s:"no",why:[],soft:[]};}
  if(d.gem){return{s:r.type===17&&r.rarity===0&&r.level===0&&!r.line&&!r.quality&&!r.count&&!r.m.length?"yes":"no",why:[],soft:[]};}
  need(d.rar===null?null:!!(RAR[r.rarity]&&RAR[r.rarity].includes(d.rar)),"Rarity not detected");
  const t=r.type,kinds={5:"helm",6:"chest",7:"gloves",8:"boots",10:"ring",11:"amulet",12:"belt",14:"idol"};
  if(t===0)need(d.kind==="idol"?false:true,"");
  else if(t===13)need(d.core,"Core-touched not detected");
  else if(t===15)need(d.sock===null?null:d.sock>=4,"Sockets not visible");
  else if(t===16)need(d.grade===null?(d.truesworn?true:null):d.grade>=90,"Grade not visible (Truesworn = grade 90+)");
  else if(t===17)need(false,"");
  else if(t===4)need(d.runeBase?true:(d.rar&&d.kind?false:null),"Rune base not detectable");
  else if(d.kind===null)why.push("Item type not detected");
  else need(typeMatch(t,{kind:d.kind,sub:d.sub,runebase:!!d.runeBase,core:d.core,sockets4Plus:d.sock>=4,truesworn:d.truesworn}),"");
  const lv=LEVEL[r.level]||LEVEL[0];
  if(r.level)need(d.ilvl===null?null:(d.ilvl>=lv[0]&&d.ilvl<=lv[1]),"Item Level not visible");
  const labelled=d.mods.filter(x=>x.label),unl=d.mods.filter(x=>!x.label).length;
  if(r.line||r.quality||r.count){
    if(!d.mods.length)why.push("No lines read from the screenshot");
    else{
      const n=d.mods.filter(x=>(!r.line||x.lines.includes(r.line))&&(!r.quality||(x.tier!==null&&x.tiers&&rollOk(r.quality,{tier:x.tier,tiers:x.tiers})))).length;
      if(n<r.count+1){if(unl||d.mods.some(x=>x.tier===null&&r.quality))why.push("Some lines were not recognised");else no=true;}
    }
  }
  const tt=+mval(r,"t")||0,nn=+mval(r,"n")||0;
  if(tt||nn){
    if(!d.mods.length)why.push("No lines/tiers read from the screenshot");
    else{const unk=d.mods.some(x=>x.tier===null),c=d.mods.filter(x=>x.tier!==null&&(!tt||x.tier<=tt)).length;if(c<Math.max(1,nn)){if(unk)why.push("Some tiers not readable");else no=true;}}
  }
  const s=+mval(r,"s")||0;if(s)need(d.sock===null?null:d.sock>=s,"Sockets not visible");
  const g=+mval(r,"g")||0,gx=+mval(r,"gx")||0;
  if(g)need(d.grade===null?null:d.grade>=g,"Grade not visible");if(gx)need(d.grade===null?null:d.grade<gx,"Grade not visible");
  const rd=+mval(r,"r")||0;if(rd===1)need(d.rar===null?null:d.rar==="U","");if(rd===2)need(d.rar&&d.rar!=="U"?false:null,"Chase red cannot be told from the screenshot");
  const u=+mval(r,"u")||0;if(u===1)need(d.unsworn===null?null:!d.unsworn,"Unsworn state not visible");if(u===2)need(d.unsworn===null?null:d.unsworn,"Unsworn state not visible");
  const[il,ih]=mrng(r,"i");if(il||ih)need(d.ilvl===null?null:!((il&&d.ilvl<il)||(ih&&d.ilvl>ih)),"Item Level not visible");
  const[ql,qh]=mrng(r,"q");if(ql||qh)need(d.req===null?null:!((ql&&d.req<ql)||(qh&&d.req>qh)),"Required Level not visible");
  const bs=mlist(r,"b");if(bs.length)need(d.baseId?bs.includes(d.baseId):null,"Base not recognised");
  const rs=mlist(r,"rn");if(rs.length)need(d.rar&&d.rar!=="U"?false:(d.redId?rs.includes(d.redId):null),"Red not recognised");
  const as=mlist(r,"a");
  if(as.length){
    const has=id=>labelled.some(x=>x.label===LINEN[id]),ok=mval(r,"all")==="1"?as.every(has):as.some(has);
    if(!ok){if(unl||!labelled.length)why.push("Some lines were not recognised");else no=true;}
  }
  return dcOut(no,why,soft);
}
const dcOut=(no,why,soft)=>({s:no?"no":(why.filter(Boolean).length?"maybe":"yes"),why:[...new Set(why.filter(Boolean))],soft});
function dcCheck(d){
  const res={d,win:null,maybe:[],stated:null,notes:[],none:false};
  if(d.rune||d.dwarven||d.jewel){res.notes.push((d.jewel?"Jewels":"Runes")+" are not checked here. Only gear, idols and rune bases (Normal items with an Oathword line) are.");return res;}
  F.rules.forEach((r,i)=>{if(!r.on)return;const c=dcRule(r,d);if(res.win)return;if(c.s==="yes"){res.win={i,c};}else if(c.s==="maybe")res.maybe.push({i,c});});
  const guard=i=>(F.rules[i].action===0||F.rules[i].action===4)&&(d.rar==="U"||d.dwarven);
  if(res.win){res.win.guard=guard(res.win.i);}
  if(d.ruleNo!==null){
    const i=d.ruleNo-1;
    if(i>=0&&i<F.rules.length){const c=dcRule(F.rules[i],d);res.stated={i,c,name:d.ruleName,agree:res.win?res.win.i===i:null};}
    else res.notes.push("The tooltip names rule "+d.ruleNo+", but your filter has only "+F.rules.length+" rules. Paste the filter you used in the game.");
  }else if(d.nameHit.length){const i=d.nameHit[0];res.stated={i,c:dcRule(F.rules[i],d),byName:true};}
  if(!res.win&&!res.maybe.length&&!res.stated)res.none=true;
  const uns=d.mods.map((x,i)=>x.unsure?i+1:0).filter(Boolean);
  if(uns.length)res.notes.push("The tier of line"+(uns.length>1?"s ":" ")+uns.join(", ")+" does not fit the affix table (a digit may be misread), so it is treated as unknown. Fix the text and check again.");
  if(d.mods.some(x=>x.fixed))res.notes.push("A tier was corrected from its value range in brackets.");
  if(d.alt)res.notes.push("The tooltip is not expanded (Alt: compare, rules). Hold Alt in the game and scan again to see the rule details.");
  if(d.rar&&d.rar==="U")res.notes.push("Uniques and Reds are never hidden.");
  if(d.dwarven)res.notes.push("Dwarven Runes are never hidden.");
  return res;
}
const DC_DET=d=>{
  const p=[];
  p.push(d.rar?{N:"Normal",M:"Magic",R:"Rare",U:"Unique / Red"}[d.rar]:"Rarity ?");
  p.push(d.jewel?"Jewel":d.rune?"Rune"+(d.rtier?" T"+d.rtier:""):d.gem?"Gem":d.kind==="idol"?"Idol":d.kind?(d.baseName||d.kind):"Type ?");
  p.push(d.ilvl!==null?"Item Level "+d.ilvl:"Item Level ?");
  if(d.req!==null)p.push("Requires "+d.req);
  if(d.sock!==null)p.push(d.sock+" sockets");
  if(d.grade!==null)p.push("Grade "+d.grade);
  if(d.core)p.push("Core-touched");if(d.truesworn)p.push("Truesworn");
  const tiers=d.mods.map(x=>x.tier!==null?"T"+x.tier:"T?");
  p.push(d.mods.length?d.mods.length+" line"+(d.mods.length>1?"s":"")+" ("+tiers.join(", ")+")":"No lines read");
  return p;
};
function dcRender(res){
  const box=$("#dcRes");if(!box)return;
  const d=res.d,det=DC_DET(d).map(x=>`<span class="dcchip">${esc(x)}</span>`).join("");
  const ruleLine=(i,c,tag)=>{const r=F.rules[i];return `<div class="dcrule"><b>Rule #${i+1}${(r.name||"").trim()?` “${esc(r.name.trim())}”`:""}</b> · <span class="dcact a${r.action}">${esc(actWord(r.action))}</span><div class="dcsum">${esc(summary(r))}</div>${tag?`<div class="dcsrc">${tag}</div>`:""}<button type="button" class="btn" data-dcshow="${esc(r.id)}">Show rule in list</button></div>`;};
  let h=`<div class="dcdet" aria-label="Detected">${det}</div>`;
  if(res.stated){
    const s=res.stated,r=F.rules[s.i];
    h+=ruleLine(s.i,s.c,s.byName?"Named in the screenshot text.":"Named by the game in the tooltip (rule "+(s.i+1)+(s.name?": "+esc(s.name):"")+").");
    if(res.win&&res.win.i!==s.i)h+=`<p class="dcwarn">Our top-to-bottom check picks rule #${res.win.i+1} (${esc(actWord(F.rules[res.win.i].action))}) instead. Either the screenshot does not show everything, or the Drop Test treats something differently from the game.</p>`;
    else if(res.win)h+=`<p class="dcok">Our top-to-bottom check agrees.</p>`;
    else if(s.c.s==="no")h+=`<p class="dcwarn">By what the screenshot shows, rule #${s.i+1} should not match. Check that the filter in the Editor is the one you used in the game.</p>`;
    else if(s.c.s==="maybe")h+=`<p class="dcnote">Cannot confirm: ${esc(s.c.why.join("; "))}.</p>`;
  }else if(res.win){
    const w=res.win;h+=ruleLine(w.i,w.c,"First rule that fits, top to bottom."+(w.guard?" It would hide this item, but the game never hides it, so it is shown.":""));
  }else if(res.maybe.length){
    h+=`<p class="dcnote">No rule matches for sure. These could match if the missing details fit:</p>`;
  }else if(!(d.rune||d.dwarven||d.jewel))h+=`<div class="dcrule"><b>No rule matches</b><div class="dcsum">The item is shown as normal (“Everything else: shown”).</div></div>`;
  const mb=res.maybe.filter(x=>!res.win||x.i<res.win.i);
  if(mb.length)h+=`<div class="dcmay"><b>${res.win||res.stated?"Earlier rules that might also catch it":"Possible rules"}</b><ul>${mb.slice(0,8).map(x=>`<li><button type="button" class="linkbtn" data-dcshow="${esc(F.rules[x.i].id)}">Rule #${x.i+1}</button> (${esc(actWord(F.rules[x.i].action))}): ${esc(x.c.why.join("; "))}</li>`).join("")}${mb.length>8?`<li>…and ${mb.length-8} more</li>`:""}</ul></div>`;
  const soft=[...new Set([...(res.win?res.win.c.soft:[]),...(res.stated?res.stated.c.soft:[])])];
  const notes=[...res.notes,...soft];
  if(res.win&&res.win.c.s==="yes"&&!res.stated&&F.rules[res.win.i]&&Object.keys(F.rules[res.win.i].m||[]).length)notes.push("MORE conditions are checked only where the screenshot shows the value (item level, tiers, lines, base).");
  if(notes.length)h+=`<ul class="dcnotes">${notes.map(n=>`<li>${esc(n)}</li>`).join("")}</ul>`;
  box.innerHTML=h;box.hidden=false;
}
function dcRun(){
  const t=($("#dcTxt").value||"").trim();
  if(!t){$("#dcRes").hidden=true;return;}
  if(!F.rules.length){const b=$("#dcRes");b.hidden=false;b.innerHTML='<p class="dcnote">Your filter has no rules yet. Add rules in the Editor first.</p>';return;}
  try{dcRender(dcCheck(dcParse(t)));}catch(e){const b=$("#dcRes");b.hidden=false;b.innerHTML='<p class="dcwarn">The text could not be checked.</p>';}
}
function dcShowRule(id){
  if(!F.rules.some(r=>r.id===id))return;
  V.filter="all";V.q="";const q=$("#rq");if(q)q.value="";S.cur=id;
  ezMode("adv");setView("edit");renderRows();renderEditor();
  requestAnimationFrame(()=>{const el=document.querySelector('.rc[data-rid="'+id+'"]');if(!el)return;
    el.scrollIntoView({block:"center",behavior:(window.matchMedia&&matchMedia("(prefers-reduced-motion:reduce)").matches)?"auto":"smooth"});
    el.classList.remove("flash");void el.offsetWidth;el.classList.add("flash");setTimeout(()=>el.classList.remove("flash"),1800);});
}
const DC_TESS="https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js";
const dcLoad=()=>window.Tesseract?Promise.resolve():new Promise((ok,no)=>{const s=document.createElement("script");s.src=DC_TESS;s.async=true;s.onload=ok;s.onerror=()=>no(new Error("load"));document.head.appendChild(s);});
function dcPrep(file){ /* bigger, grayscale, dark background inverted: helps the OCR with light text on dark tooltips */
  return new Promise(res0=>{
    let done=false;const res=v=>{if(!done){done=true;res0(v);}};setTimeout(()=>res(file),5000); /* never hang if the image cannot be decoded */
    try{const img=new Image(),url=URL.createObjectURL(file);
      img.onload=()=>{try{const sc=Math.min(3,Math.max(1,1600/Math.max(img.width,1))),c=document.createElement("canvas");c.width=Math.round(img.width*sc);c.height=Math.round(img.height*sc);
        const x=c.getContext("2d");x.imageSmoothingQuality="high";x.drawImage(img,0,0,c.width,c.height);const im=x.getImageData(0,0,c.width,c.height),p=im.data;let sum=0;
        for(let i=0;i<p.length;i+=4){const g=.299*p[i]+.587*p[i+1]+.114*p[i+2];p[i]=p[i+1]=p[i+2]=g;sum+=g;}
        const inv=sum/(p.length/4)<128;if(inv)for(let i=0;i<p.length;i+=4){p[i]=p[i+1]=p[i+2]=255-p[i];}
        x.putImageData(im,0,0);URL.revokeObjectURL(url);c.toBlob(b=>res(b||file),"image/png");}catch(e){URL.revokeObjectURL(url);res(file);}};
      img.onerror=()=>{URL.revokeObjectURL(url);res(file);};img.src=url;}catch(e){res(file);}
  });
}
const dcStatus=(m,bad)=>{const e=$("#dcSt");if(e){e.textContent=m;e.style.color=bad?"var(--hide-fg)":"";}};
const dcProg=v=>{const p=$("#dcPg");if(!p)return;p.hidden=v===null;if(v!==null)p.value=v;};
async function dcFile(file){
  if(!file||!/^image\//.test(file.type||"")){dcStatus("That file is not an image.",true);return;}
  if(file.size>15*1048576){dcStatus("The image is larger than 15 MB.",true);return;}
  const job=++DC.job;DC.busy=true;
  const pv=$("#dcPv");if(pv){try{if(pv.dataset.u)URL.revokeObjectURL(pv.dataset.u);pv.dataset.u=URL.createObjectURL(file);pv.src=pv.dataset.u;pv.hidden=false;}catch(e){}}
  dcStatus("Loading the text reader… (first time only, about 10 MB)");dcProg(0);
  try{
    await dcLoad();
    if(job!==DC.job)return;
    dcStatus("Preparing the image…");const blob=await dcPrep(file);
    const r=await Tesseract.recognize(blob,dcOcrLang(),{logger:m=>{if(job!==DC.job)return;if(m.status==="recognizing text"){dcProg(m.progress);dcStatus("Reading the text… "+Math.round(m.progress*100)+"%");}else if(/loading|initializ/i.test(m.status||"")){dcStatus("Loading the text reader…");}}});
    if(job!==DC.job)return;
    $("#dcTxt").value=dcTextOf(r.data).replace(/[ \t]*\t[ \t]*/g," \u2502 ").trim(); /* show the column split as │ */dcProg(null);
    dcStatus($("#dcTxt").value?"Done. Fix the text below if a word was misread, then press Check text.":"No text found in this image. Try a sharper screenshot of the tooltip.",!$("#dcTxt").value);
    dcRun();
  }catch(e){
    if(job!==DC.job)return;dcProg(null);
    dcStatus("The text reader could not be loaded. Check your connection, or type or paste the tooltip text below.",true);
  }finally{if(job===DC.job)DC.busy=false;}
}
(function dcInit(){
  const z=$("#dcZone");if(!z)return;
  const pick=files=>{const f=[...files||[]].find(x=>/^image\//.test(x.type));if(f)dcFile(f);else if(files&&files.length)dcStatus("That file is not an image.",true);};
  $("#dcFile").onchange=e=>{pick(e.target.files);e.target.value="";};
  $("#dcPick").onclick=()=>$("#dcFile").click();
  ["dragenter","dragover"].forEach(ev=>z.addEventListener(ev,e=>{e.preventDefault();z.classList.add("over");}));
  ["dragleave","drop"].forEach(ev=>z.addEventListener(ev,e=>{e.preventDefault();z.classList.remove("over");}));
  z.addEventListener("drop",e=>pick(e.dataTransfer&&e.dataTransfer.files));
  z.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();$("#dcFile").click();}});
  document.addEventListener("paste",e=>{
    const cd=e.clipboardData;if(!cd)return;
    const f=[...(cd.files||[])].find(x=>/^image\//.test(x.type))||[...(cd.items||[])].map(i=>i.kind==="file"&&/^image\//.test(i.type)?i.getAsFile():null).find(Boolean);
    if(!f)return;
    e.preventDefault();if(V.view!=="test")setView("test");dcFile(f);
  });
  $("#dcCheck").onclick=dcRun;
  let tm=0;$("#dcTxt").addEventListener("input",()=>{clearTimeout(tm);tm=setTimeout(dcRun,450);});
  $("#dcClear").onclick=()=>{DC.job++;$("#dcTxt").value="";$("#dcRes").hidden=true;dcProg(null);dcStatus("");const pv=$("#dcPv");if(pv){pv.hidden=true;pv.removeAttribute("src");}};
  $("#dcRes").addEventListener("click",e=>{const b=e.target.closest("[data-dcshow]");if(b)dcShowRule(b.dataset.dcshow);});
  window.dcParse=dcParse;window.dcCheck=dcCheck;window.dcRun=dcRun;
})();

let ezT=null,ezAsk=false,ezCode="";
function ezShowCode(t){ezCode=t;ezPreview();const x=$("#ez-code");if(x){x.focus();x.select();}}
function ezCopy(){const g=easyGen(EZ.s);copyFilter(g.rules,"-1",false);}
function ezApply(){
  const g=easyGen(EZ.s);
  if(g.rules.length>MAX_RULES){ezAsk=false;ezPreview(g);toast("Not applied. "+COPY.over(g.rules.length),true);return false;}
  F.preset="-1";F.rules=g.rules;F.rules.forEach(r=>{r.id=uid();});
  EZ.h=ezHashF(F);ezSave();S.cur=F.rules[0]?F.rules[0].id:null;ezAsk=false;fullRender();return true;
}
function ezMode(m,quiet){
  EZ.m=m==="easy"?"easy":"adv";
  $("#clearF").style.display=EZ.m==="easy"?"none":"";$("#ezBox").hidden=EZ.m!=="easy";$("#edCols").hidden=EZ.m==="easy";
  ui.mode=EZ.m;
  bumpRev();renderAdvExport();renderMD(); /* the module list reads the mode, so it needs a refresh when the mode flips */
  if(EZ.m==="easy"&&!quiet)ezRefresh();
}
/* ---- controls ---- */
const EZ_CI={attack:'<path d="M4 20 15 9M13 5l6 6M15 9l5-5"/>',spell:'<path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/>',minion:'<path d="M12 3a7 7 0 0 0-5 12v4h10v-4a7 7 0 0 0-5-12z"/><path d="M9.500 11h.01M14.500 11h.01M10 19v-3M14 19v-3"/>',melee:'<path d="M5 5l9 9M19 5l-9 9M4 20l4-4M20 20l-4-4"/>',slam:'<path d="M12 3v11M7 9l5 5 5-5M4 20h16"/>',bow:'<path d="M6 4c8 2 8 14 0 16M6 12h14M16 8l4 4-4 4"/>',chain:'<circle cx="5" cy="12" r="2"/><circle cx="19" cy="5.500" r="2"/><circle cx="19" cy="18.500" r="2"/><path d="M7 11l10-4.500M7 13l10 4.500"/>',trap:'<path d="M12 4l8 14H4z"/><path d="M12 10v3"/>',totem:'<path d="M8 3h8v18H8z"/><path d="M8 9h8M8 15h8M11 6h2"/>',channel:'<circle cx="5" cy="12" r="2.500"/><path d="M10 12h11M10 8l10-3M10 16l10 3"/>',orbit:'<circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(-35 12 12)"/><circle cx="19" cy="7" r="1.500"/>',phys:'<path d="M12 3l8 5v8l-8 5-8-5V8z"/>',fire:'<path d="M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-3 2-4 3-6 .5 1.500 1.500 2 2 3 0-3-1-4 0-7z"/>',cold:'<path d="M12 3v18M4 7.500l16 9M20 7.500l-16 9"/>',light:'<path d="M13 2 5 14h6l-1 8 8-12h-6z"/>',pois:'<path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11z"/>',holy:'<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>',bleed:'<path d="M12 3c3 4 6 7 6 11a6 6 0 0 1-12 0c0-4 3-7 6-11z"/>',ign:'<path d="M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-3 2-4 3-6"/><path d="M12 14v4"/>',life:'<path d="M12 20s-8-5-8-11a4.500 4.500 0 0 1 8-2 4.500 4.500 0 0 1 8 2c0 6-8 11-8 11z"/>',armour:'<path d="M12 3l7 3v6c0 4.500-3 7.500-7 9-4-1.500-7-4.500-7-9V6z"/>',evasion:'<path d="M3 8h9M3 16h9M5 12h8"/><path d="M15 5l6 7-6 7"/>',es:'<path d="M12 3l7 3v6c0 4.500-3 7.500-7 9-4-1.500-7-4.500-7-9V6z"/><path d="M13 8l-3 5h3l-1 3"/>',res:'<path d="M12 3l8 4v5c0 5-4 8-8 9-4-1-8-4-8-9V7z"/><path d="M9 12h6M12 9v6"/>',aoe:'<circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="8"/>',curse:'<path d="M12 3a8 8 0 0 0-5 14v3h10v-3a8 8 0 0 0-5-14z"/><path d="M9 11l2 2M15 11l-2 2"/>',move:'<path d="M4 15l5-5 4 4 7-8M15 6h5v5"/>',mana:'<path d="M12 3l6 9-6 9-6-9z"/><path d="M12 8v8"/>',leech:'<path d="M12 3c3 4 6 7 6 11a6 6 0 0 1-12 0c0-4 3-7 6-11z"/><path d="M12 11v5M9.500 13.500 12 16l2.500-2.500"/>'};
const EZ_IC={attack:"#cbd5e1",spell:"#a78bfa",minion:"#a3e635",melee:"#fb923c",slam:"#fbbf24",bow:"#4ade80",chain:"#facc15",trap:"#f97316",totem:"#d6a35c",channel:"#38bdf8",orbit:"#818cf8",phys:"#cbd5e1",fire:"#ff7a2f",cold:"#5cd6ff",light:"#ffd21f",pois:"#34d399",holy:"#fde68a",bleed:"#fb4b6a",ign:"#ff9f43",life:"#ff5470",armour:"#7aa7ff",evasion:"#2dd4bf",es:"#60a5fa",res:"#5eead4",aoe:"#a78bfa",curse:"#c084fc",move:"#4ade80",mana:"#818cf8",leech:"#f43f5e"};
const ezBtn=(d,label,ic)=>`<button type="button" class="cb2" data-ez="${d}" aria-pressed="false"${ic&&EZ_IC[ic]?` style="--ic:${EZ_IC[ic]}"`:""}>${ic?ezIco(ic):""}<span>${esc(label)}</span></button>`;
const ezSeg=(k,list,lab)=>`<div class="seg" role="group" aria-label="${esc(lab)}">${list.map(([v,l])=>`<button type="button" data-ez="${k},${v}" aria-pressed="false">${esc(l)}</button>`).join("")}</div>`;
const EZ_ICO={play:'<path d="M5 19 19 5M14 5h5v5M7 17l-3 3"/>',dmg:'<path d="M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-3 2-4 3-6 .5 1.5 1.5 2 2 3 0-3-1-4 0-7z"/>',def:'<path d="M12 3l7 3v6c0 4.500-3 7.500-7 9-4-1.500-7-4.500-7-9V6z"/>',util:'<path d="M13 2 5 14h6l-1 8 8-12h-6z"/>'};
const ezIco=k=>`<svg class="ezico" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${EZ_ICO[k]||EZ_CI[k]||""}</svg>`;
const ezChip=k=>{const a=EZ_ARCH.find(x=>x.k===k);return ezBtn("arch,"+a.k,a.n,a.k);};
function ezBuild(){
  $("#ezCtl").innerHTML=`
  <div class="ez2">
  <div class="sub"><div class="hrow"><label class="lab" for="ez-rl">Rupture Level <output id="ez-rlo" aria-live="polite" style="color:var(--accent-gold);margin-left:6px"></output></label>${hb("ezRL")}</div>
    <p class="hint" style="margin:2px 0 4px">The monster level you farm at. It decides which affix tiers can drop.</p>
    <input id="ez-rl" class="ezsl" type="range" min="0" max="${EZ_RL.length-1}" step="1" value="0" list="ez-rlt" aria-valuetext="Any">
    <datalist id="ez-rlt">${EZ_RL.map((x,i)=>`<option value="${i}"></option>`).join("")}</datalist>
    <div class="eztk" aria-hidden="true">${EZ_RL.map((x,i)=>`<span style="left:calc(8px + (100% - 16px) * ${i/(EZ_RL.length-1)})">${x[1]}</span>`).join("")}</div></div>
  <div class="sub"><div class="hrow"><span class="lab">Tier strictness</span>${hb("ezKeep")}</div><p class="hint" style="margin:2px 0 6px">How many of the best droppable tiers count as good.</p>${ezSeg("tk",EZ_KEEP,"Tier strictness")}
    <p class="hint" id="ez-ilv" style="margin:8px 0 0"></p></div>
  </div>
  <div class="sub"><div class="hrow ezwant"><span class="lab">What I want to see</span>${hb("ezWant")}<span class="ezpk" id="ezPicked" aria-live="polite"></span><button type="button" class="btn ezclr" data-ez="clear,all" title="Unpick every chip. Ctrl+Z brings them back.">${li("x")}Clear all</button></div>
    <div class="ezgrid">${EZ_GRP.map(([t,ic,blocks])=>`<div class="ezg" role="group" aria-label="${esc(t)}"><div class="ezgt">${ezIco(ic)}<span>${esc(t)}</span></div>${blocks.map(([bt,ks])=>`${bt?`<span class="lab ezgl">${esc(bt)}</span>`:""}<div class="chips">${ks.map(ezChip).join("")}</div>`).join("")}</div>`).join("")}</div>
    <p class="hint" style="margin:8px 0 0">Picks also decide which Idols stay.</p>
    <span class="lab" style="margin-top:10px;display:block">Matches</span>${ezSeg("hl",[[0,"Show"],[1,"Highlight"]],"Matches")}</div>
  <div class="ez2">
  <div class="sub"><span class="lab">Hide</span><div class="chips">${ezBtn("hn","Normal gear")}${ezBtn("hm","Magic gear")}</div><span class="lab" style="margin-top:10px;display:block">How</span><div class="chips">${ezBtn("hs","Sell instead of hide")}</div><p class="hint" style="margin:6px 0 0">Sell sells Normal and Magic gear when it lands. Caution: sold items are gone.</p><span class="lab" style="margin-top:10px;display:block">Gems</span><div class="chips">${ezBtn("gems,1","Hide gems")}${ezBtn("gems,2","Sell gems")}</div><p class="hint" style="margin:6px 0 0">Neither: gems are not touched. A gem under a Sell rule is sold when it lands.</p><span class="lab" style="margin-top:10px;display:block">Dwarven Runes</span><div class="chips">${ezBtn("hr","Hide Normal and Magic Dwarven Runes")}</div><p class="hint" style="margin:6px 0 0">Sell does not work on Dwarven Runes, so this hides them. Dwarven Carving uses Normal and Magic runes, so hidden ones are lost for it. Off: runes are not touched.</p></div>
  <div class="sub"><span class="lab">Always keep</span><div class="chips">${[["core","Core-touched"],["runes","Rune bases"],["tsw","Truesworn bases"]].map(k=>ezBtn("keep,"+k[0],k[1])).join("")}</div><span class="lab" style="margin-top:10px;display:block">Ashen and Gnome-made</span><div class="chips">${ezBtn("ga","Highlight Rare Ashen and Gnome-made")}</div><p class="hint" style="margin:6px 0 0">9 rules keep every Rare Ashen or Gnome-made base, below your tier highlights and above every hide. Normal and Magic ones follow your other rules.</p></div>
  </div>`;
}
function ezSync(){
  const s=EZ.s;
  const sl=$("#ez-rl");if(sl){const i=Math.max(0,EZ_RL.findIndex(x=>+x[0]===s.rl));sl.value=i;sl.setAttribute("aria-valuetext",s.rl?"Rupture Level "+s.rl:"Any");$("#ez-rlo").textContent=s.rl?String(s.rl):"Any";}
  const pk=EZ_ARCH.filter(a=>s.arch[a.k]).length,pe=$("#ezPicked"),ce=$("#ezCtl .ezclr");
  if(pe)pe.textContent=pk?pk+" picked":"None picked";if(ce)ce.disabled=!pk;
  $$("#ezCtl button[data-ez]").forEach(b=>{
    const[k,v]=b.dataset.ez.split(",");
    if(k==="clear")return;
    const on=k==="arch"?s.arch[v]:k==="keep"?s.keep[v]:(k==="hn"||k==="hm"||k==="hs"||k==="ga"||k==="hr")?s[k]:k==="gems"?s.gems===+v:k==="idol"?s.idol===v:String(s[k])===v;
    b.setAttribute("aria-pressed",on?"true":"false");
  });
  $("#ez-ilv").textContent=s.rl?"Rupture Level "+s.rl+": only tiers up to item level "+s.rl+" can drop. Gear needs a picked line within the "+(s.tk===1?"best tier":"best "+s.tk+" tiers")+" that can drop; weaker lines are hidden. Pick at least one.":"Any: no tier limit. Set your Rupture Level to hide gear whose picked lines are too weak for what drops there.";
}
function ezPreview(g){
  g=g||easyGen(EZ.s);
  const n=g.rules.length,over=n>MAX_RULES,linked=ezLinked(),div=!!EZ.h&&!linked,act=F.rules.length;
  const sh=deadRules(g.rules).map(d=>"Rule "+(d.i+1)+" ("+g.rules[d.i].name+") "+d.why+"."); /* flagged, never removed */
  const bg=ezBadge(EZ.s,linked,!!EZ.h);
  let alerts="",msg="",btn="";
  if(over)alerts+=`<div class="ezerr" role="alert"><b>${COPY.over(n)}</b><p class="hint" style="margin:6px 0 0">Nothing was applied. Your filter keeps its ${act} rule${act===1?"":"s"}.</p></div>`;
  if(div)alerts+=`<div class="ezbanner" role="alert"><b>Your filter was changed outside Easy Mode.</b><p class="hint" style="margin:6px 0 8px">Easy Mode stopped controlling it, so your work is safe. Replace it with the Easy Mode rules (Ctrl+Z brings yours back) or keep it and carry on in Advanced.</p><div class="ezrow"><button type="button" class="btn danger" data-ezact="replace"${over?" disabled":""}>Replace with Easy Mode rules</button><button type="button" class="btn" data-ezact="keep">Keep my filter, go to Advanced</button></div></div>`;
  else if(linked)msg="Applied. Easy Mode controls your filter; changes apply when you let go of a control.";
  else if(ezAsk&&!over)alerts+=`<div class="ezbanner" role="alert"><b>Replace your current ${act} rule${act===1?"":"s"}?</b><p class="hint" style="margin:6px 0 8px">Easy Mode builds the whole filter. Ctrl+Z brings your rules back.</p><div class="ezrow"><button type="button" class="btn gold" data-ezact="replace">Replace</button><button type="button" class="btn" data-ezact="cancel">Cancel</button></div></div>`;
  else{msg="Not applied yet. Your filter stays as it is until you apply it.";btn=`<button type="button" class="btn gold" data-ezact="apply"${over?" disabled":""}>${li("check")}Apply to my filter</button>`;}
  const mn={black:"Hide only",white:"Show and highlight first, then hide the rest"}[g.mode];
  const w=g.notes.concat(sh);
  const top=alerts+`<div class="ezbrow">${bg?`<span class="ezbadge${bg.custom?" custom":""}">${esc(bg.label)}</span>${bg.chip?`<span class="ezbadge chip">${esc(bg.chip)}</span>`:""}`:""}<span class="ezcnt${over?" bad":""}"><b>${n} / ${MAX_RULES}</b> rules</span>${msg?`<span class="hint ezmsg">${esc(msg)}</span>`:""}${btn}</div>`+
  (ezCode?`<div class="sub"><textarea id="ez-code" class="field" readonly rows="4" aria-label="Filter code" style="width:100%">${esc(ezCode)}</textarea></div>`:"");
  const bot=`<div class="sub"><span class="lab">Rule count</span>
    <div class="ezcount"><span>Active filter (badge, top right)</span><b>${act} / ${MAX_RULES}</b></div>
    <div class="ezcount${over?" bad":""}"><span>Easy Mode ${linked?"rules (applied)":"preview (not applied)"}</span><b>${n} / ${MAX_RULES}</b></div></div>
  <div class="sub"><span class="lab">Strategy</span><b>${esc(mn)}</b><p class="hint" style="margin:4px 0 0">${esc(g.why)}</p></div>
  <div class="sub"><span class="lab">Rules in the preview</span>
    <ol class="ezol">${g.rules.map(r=>`<li><span class="hint">${esc(actWord(r.action))}</span> ${esc(r.name)}</li>`).join("")||"<li class=\"hint\">No rules: everything is shown.</li>"}</ol></div>
  ${w.length?`<div class="sub"><span class="lab">Warnings</span>${w.map(t=>`<p class="hint ezw" style="margin:4px 0 0">${esc(t)}</p>`).join("")}</div>`:""}
`;
  $("#ezOut").innerHTML=top;$("#ezOut2").innerHTML=bot;
  $("#ezDetT").textContent="Details · "+n+" / "+MAX_RULES+" rules"+(w.length?" · "+w.length+" note"+(w.length>1?"s":""):"");$("#ezDetS").classList.toggle("bad",over);
}
const ezRefresh=()=>{ezSync();ezPreview();};
function ezTouched(){
  bumpRev();ezSave();ezCode="";ezSync();ezPreview();renderAdvExport();if(!ezLinked())snap();if(V.view==="test")renderDrops();
  clearTimeout(ezT);ezT=setTimeout(()=>{if(ezLinked())ezApply();},250);
}
(function ezInit(){
  ezBuild();
  const bx=$("#ezBox");
  $("#ezMode").addEventListener("click",e=>{const b=e.target.closest("button[data-ezm]");if(b)ezMode(b.dataset.ezm);});
  const rlv=e=>+EZ_RL[+e.target.value][0];
  bx.addEventListener("input",e=>{if(e.target.id!=="ez-rl")return;const v=rlv(e);$("#ez-rlo").textContent=v?String(v):"Any";}); /* live value while dragging */
  bx.addEventListener("change",e=>{if(e.target.id!=="ez-rl")return;EZ.s=ezSane(Object.assign({},EZ.s,{rl:rlv(e),pre:""}));ezTouched();}); /* the filter updates on release */
  bx.addEventListener("click",e=>{
    const b=e.target.closest("button");if(!b||b.disabled)return;
    if(b.dataset.ezact){
      const a=b.dataset.ezact;
      if(a==="apply"){if(F.rules.length&&!ezLinked()){ezAsk=true;ezPreview();}else if(ezApply())toast("Easy Mode rules applied. Ctrl+Z undoes it.");}
      else if(a==="replace"){if(ezApply())toast("Easy Mode rules applied. Ctrl+Z undoes it.");}
      else if(a==="cancel"){ezAsk=false;ezPreview();}
      else if(a==="keep"){EZ.h="";ezSave();ezAsk=false;ezMode("adv");}
      else if(a==="adv")ezMode("adv");
      else if(a==="copy")ezCopy();
      return;
    }
    if(!b.dataset.ez)return;
    const[k,v]=b.dataset.ez.split(","),s=EZ.s,before=JSON.parse(JSON.stringify(s));
    /* Sell needs a confirmation first (Caution); turning it off needs none */
    if((k==="hs"&&!s.hs)||(k==="gems"&&+v===2&&s.gems!==2)){
      const kind=k==="gems"?"gems":s.hn&&!s.hm?"normal":s.hm&&!s.hn?"magic":"normalmagic";
      askCaution([kind]).then(ok=>{if(ok){if(k==="hs")s.hs=1;else s.gems=2;s.pre="";EZ.s=ezSane(s);ezTouched();}});return;}
    if(k==="clear")EZ_ARCH.forEach(a=>{s.arch[a.k]=0;});
    else if(k==="arch")s.arch[v]=s.arch[v]?0:1;
    else if(k==="keep")s.keep[v]=s.keep[v]?0:1;
    else if(k==="hn"||k==="hm")s[k]=s[k]?0:1;
    else if(k==="hs")s.hs=s.hs?0:1;
    else if(k==="ga"||k==="hr")s[k]=s[k]?0:1;
    else if(k==="gems")s.gems=s.gems===+v?0:+v;
    else if(k==="rl"||k==="tk"||k==="hl")s[k]=+v;
    else if(k==="idol")s.idol=v;
    if(ezOwnedChanged(before,s))s.pre=""; /* the preset owns these: Custom from here. Build buttons (arch) do not count. */
    EZ.s=ezSane(s);ezTouched();
  });
  const dt=$("#ezDet");dt.open=!!EZ.r;dt.addEventListener("toggle",()=>{EZ.r=dt.open?1:0;ezSave();});
  ezMode(EZ.m,true);
})();

async function setLang(code,quiet){
  if(!LANGS.some(x=>x[0]===code))code="en";
  let d={lines:{},bases:{},reds:{}};
  if(code!=="en"){try{const r=await fetch("lang/"+code+".json");if(!r.ok)throw new Error(r.status);d=await r.json();}catch(e){if(!quiet)toast("Could not load that language. Showing English.",true);code="en";}}
  setLangId(code);LX.ui=d.ui||{};LX.ui2=d.ui2||{};LX.raw=d.lines||{};setDcRev(null);const ll=$("#langLbl");if(ll)ll.textContent=LX.ui.lang||"Language";LX.lines={};Object.keys(d.lines||{}).forEach(k=>{LX.lines[cleanLineText(k)]=cleanLineText(d.lines[k]);});LX.bases=d.bases||{};LX.reds=d.reds||{};
  const sel=$("#langSel");if(sel)sel.value=code;
  try{localStorage.setItem("oathfilter-lang",code);}catch(e){}
  document.documentElement.setAttribute("data-gamelang",code);
  fullRender();
}
(function langInit(){
  const sel=$("#langSel");if(!sel)return;
  sel.innerHTML=LANGS.map(x=>`<option value="${x[0]}">${esc(x[1])}</option>`).join("");
  sel.addEventListener("change",()=>setLang(sel.value));
  let c="en";try{c=localStorage.getItem("oathfilter-lang")||"en";}catch(e){}
  if(c!=="en")setTimeout(()=>setLang(c,true),0);
})();
(function init(){
  let start=null;
  let initWarn="";
  try{const c=localStorage.getItem("oathfilter4");if(c){const d=decode(c);start=d.filter;initWarn=d.warn.join(" ");}}catch(e){initWarn="Your saved filter could not be read, so the default preset was loaded.";}
  setF(start||PRESETS[4].build());F.rules.forEach(r=>{r.id=uid();if(!r.extra)r.extra=[];if(!r.m)r.m=[];});
  try{const nm=JSON.parse(localStorage.getItem("oathfilter-names")||"null");if(nm&&Array.isArray(nm.n)&&nm.c===localStorage.getItem("oathfilter4"))F.rules.forEach((r,i)=>{r.name=String(nm.n[i]||"").slice(0,NAME_MAX);});}catch(e){}
  S.cur=F.rules[0]?F.rules[0].id:null;
  for(let k=0;k<14;k++){const it=genItem();it.x=8+Math.random()*84;it.y=12+Math.random()*230;S.items.push(it);}
  fullRender();setView("edit");
  if(initWarn)toast(initWarn,true);
  setTimeout(shOpenFromHash,0);
})();

/* collapsible cards in Guide and About */
(function(){
  document.querySelectorAll("#p-info .plate,#p-about .plate").forEach(function(sec,n,all){
    const h=sec.querySelector(":scope>.coltitle");if(!h)return;
    const first=sec===sec.parentNode.querySelector(".plate");
    sec.classList.add("fold");if(!first)sec.classList.add("shut");
    h.insertAdjacentHTML("beforeend",li("chevron-right","fold-chev"));h.setAttribute("role","button");h.tabIndex=0;h.setAttribute("aria-expanded",first?"true":"false");
    function tog(){const shut=sec.classList.toggle("shut");h.setAttribute("aria-expanded",shut?"false":"true");}
    h.addEventListener("click",tog);
    h.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();tog();}});
  });
})();

/* drag and drop reordering: the whole rule row follows the pointer and the other rows make room (mouse, pen; touch needs a short press and hold). Alt+Shift+Up/Down moves the focused rule. */
(function(){
  const rows=document.getElementById("rows");let dr=null,suppress=false;
  const sy=()=>window.pageYOffset||0;
  function reset(){rows.querySelectorAll(".rc").forEach(e=>{e.classList.remove("drag","shift");e.style.transform="";});document.body.classList.remove("dragging");}
  function begin(){
    if(!dr||dr.on)return;
    const els=[...rows.querySelectorAll(".rc")];if(els.length<2){end(false);return;}
    dr.rects=els.map(el=>{const b=el.getBoundingClientRect();return{el,id:el.dataset.rid,top:b.top+sy(),h:b.height};});
    dr.from=dr.rects.findIndex(r=>r.id===dr.id);if(dr.from<0){end(false);return;}
    const g=dr.rects.length>1?dr.rects[1].top-dr.rects[0].top-dr.rects[0].h:8;dr.step=dr.rects[dr.from].h+Math.max(0,g);
    dr.s0=sy();dr.on=true;dr.to=dr.from;
    document.body.classList.add("dragging");
    dr.rects.forEach((r,i)=>{r.el.classList.add(i===dr.from?"drag":"shift");});
    dr.scroll=setInterval(function(){if(!dr||!dr.on)return;const h=window.innerHeight,y=dr.lastY;if(y<70)window.scrollBy(0,-14);else if(y>h-70)window.scrollBy(0,14);place();},40);
  }
  function place(){
    if(!dr||!dr.on)return;
    const dy=(dr.lastY-dr.y0)+(sy()-dr.s0),f=dr.rects[dr.from];
    f.el.style.transform="translateY("+dy+"px)";
    const c=f.top+f.h/2+dy;let to=0;
    dr.rects.forEach((r,i)=>{if(i!==dr.from&&r.top+r.h/2<c)to++;});
    dr.to=to;
    dr.rects.forEach((r,i)=>{if(i===dr.from)return;const o=i<dr.from?i:i-1;let m=0;
      if(i<dr.from&&o>=to)m=dr.step;else if(i>dr.from&&o<to)m=-dr.step;
      r.el.style.transform=m?"translateY("+m+"px)":"";});
  }
  function stop(){window.removeEventListener("pointermove",move);window.removeEventListener("pointerup",up);window.removeEventListener("pointercancel",cancel);window.removeEventListener("keydown",key,true);window.removeEventListener("touchmove",tm);}
  function end(save){
    if(!dr)return;const d=dr;dr=null;stop();clearTimeout(d.hold);clearInterval(d.scroll);
    if(!d.on){reset();return;}
    suppress=true;setTimeout(()=>{suppress=false;},0);
    const from=F.rules.findIndex(r=>r.id===d.id);
    if(!save||from<0||d.to===d.from||d.to>=F.rules.length){reset();return;}
    reset();const[r]=F.rules.splice(from,1);F.rules.splice(d.to,0,r);touch();
  }
  function move(e){
    if(!dr)return;dr.lastY=e.clientY;
    if(!dr.on){const dy=Math.abs(e.clientY-dr.y0),dx=Math.abs(e.clientX-dr.x0);
      if(dr.touch){if(dy>8||dx>8){end(false);}return;}   /* finger moved before the hold: it is a scroll */
      if(dy<5)return;begin();}
    place();
  }
  function tm(e){if(dr&&dr.on)e.preventDefault();}
  function up(){end(true);}function cancel(){end(false);}
  function key(e){if(e.key==="Escape"){e.preventDefault();e.stopPropagation();end(false);}}
  if(!window.Sortable)rows.addEventListener("pointerdown",function(e){
    if(!rows.classList.contains("canmove")||(e.button!==undefined&&e.button>0))return;
    if(e.target.closest&&e.target.closest("input,.xb,.sw,label,a"))return;
    const row=e.target.closest&&e.target.closest(".rc");if(!row)return;
    dr={id:row.dataset.rid,x0:e.clientX,y0:e.clientY,lastY:e.clientY,on:false,touch:e.pointerType==="touch"};
    window.addEventListener("pointermove",move);window.addEventListener("pointerup",up);window.addEventListener("pointercancel",cancel);window.addEventListener("keydown",key,true);
    window.addEventListener("touchmove",tm,{passive:false});
    if(dr.touch)dr.hold=setTimeout(function(){if(dr){begin();place();}},320);
  });
  /* a drag must not also select the rule */
  rows.addEventListener("click",function(e){if(suppress){e.stopPropagation();e.preventDefault();}},true);
  /* keyboard: Alt+Shift+Up / Alt+Shift+Down on a focused rule */
  rows.addEventListener("keydown",function(e){
    if(!e.altKey||!e.shiftKey||(e.key!=="ArrowUp"&&e.key!=="ArrowDown")||!rows.classList.contains("canmove"))return;
    const row=e.target.closest&&e.target.closest(".rc");if(!row)return;
    const i=F.rules.findIndex(r=>r.id===row.dataset.rid),j=i+(e.key==="ArrowUp"?-1:1);if(i<0||j<0||j>=F.rules.length)return;
    e.preventDefault();const id=row.dataset.rid;const[r]=F.rules.splice(i,1);F.rules.splice(j,0,r);touch();
    const b=rows.querySelector('.rc[data-rid="'+id+'"] .pickb');if(b)b.focus();
  });
  /* SortableJS: mouse, pen and touch (short press and hold). The DOM order after a drop is read back by rule id, so the rule list in the state is always rebuilt from what the user sees: no lost rules, no index drift. */
  if(window.Sortable){
    let swallow=false;
    rowSortable=Sortable.create(rows,{
      draggable:".rc",animation:150,forceFallback:true,fallbackTolerance:5,
      delay:320,delayOnTouchOnly:true,touchStartThreshold:8,
      filter:"input,.xb,.sw,label,a",preventOnFilter:false,
      chosenClass:"sort-chosen",ghostClass:"sort-ghost",dragClass:"sort-drag",fallbackClass:"sort-fallback",
      disabled:!rows.classList.contains("canmove"),
      onStart(){document.body.classList.add("dragging");},
      onEnd(){
        document.body.classList.remove("dragging");swallow=true;setTimeout(()=>{swallow=false;},0);
        const ids=[...rows.querySelectorAll(".rc")].map(e=>e.dataset.rid),cur=F.rules.map(r=>r.id);
        const same=ids.length===cur.length&&ids.every((id,i)=>id===cur[i]);
        if(same)return;
        const by=new Map(F.rules.map(r=>[r.id,r]));
        if(ids.length!==cur.length||ids.some(id=>!by.has(id))||new Set(ids).size!==ids.length){renderRows();return;}   /* anything unexpected: redraw from the state, change nothing */
        F.rules.splice(0,F.rules.length,...ids.map(id=>by.get(id)));touch();
      }
    });
    rows.addEventListener("click",function(e){if(swallow){e.stopPropagation();e.preventDefault();}},true);
  }
  window.__dragEnd=end;
  /* Lucide: swap the placeholders after every render */
  if(window.lucide){let q=0;
    /* If Lucide throws, the placeholders that are left get the built-in SVG, so an icon library error never leaves a control without an icon or stops later updates. */
    const go=()=>{q=0;if(!document.querySelector("i[data-lucide]"))return;
      try{lucide.createIcons();}catch(e){console.warn("Lucide could not draw the icons, using the built-in ones.",e);
        document.querySelectorAll("i[data-lucide]").forEach(i=>{const n=i.getAttribute("data-lucide");if(LI[n])i.outerHTML=`<svg class="${i.getAttribute("class")||"li"}" viewBox="0 0 24 24" aria-hidden="true">${LI[n]}</svg>`;});}};
    new MutationObserver(()=>{if(!q)q=requestAnimationFrame(go);}).observe(document.body,{childList:true,subtree:true});go();}
})();
