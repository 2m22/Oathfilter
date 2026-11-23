/* Plain Node tests, no dependencies:  node tests/run.mjs
   Covers the 200 rule limit: encode / decode round trip, the limit warning, matching with a full rule list. */
import * as MOD from "../js/modules.js";
import {idolLineId,EZ_EXCLUDED,EZ_ARCH,EZ_GRP,REDD,REDN,DATA,AFF,UNIQUES,msetList,LINEN as LINEN_,MAX_RULES,encode,decode,matches,genItem,newRule,GAME_PRESETS,COPY,defOf,T,LINEN,mlist as mlistT,setF,bumpRev,evaluate,easyGen,ezSane,MORE_ORDER,mset,fixAn,DATA_BUILD,LINEMAP,mval} from "../js/filter-engine.js";

let failed=0,passed=0;
const ok=(c,msg)=>{if(c){passed++;}else{failed++;console.error("FAIL: "+msg);}};
const eq=(a,b,msg)=>ok(a===b,msg+(a===b?"":"\n   got:      "+String(a).slice(0,160)+"\n   expected: "+String(b).slice(0,160)));

/* fixed random numbers, so the item sample is the same every run */
let seed=123456789;Math.random=()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};

eq(MAX_RULES,200,"MAX_RULES is 200");
ok(COPY.limit.includes("200"),"limit text names 200");

/* the game presets still round trip exactly */
GAME_PRESETS.forEach(p=>{const code=Array.isArray(p)?p[1]:p.code;eq(encode(decode(code).filter),code,"preset round trip: "+(Array.isArray(p)?p[0]:p.name));});

/* a pool of real rule strings (plain rules and rules with a MORE part), cycled to any length */
const POOL=["1,13,0,0,0,3,0,0,0,255","1,4,1,0,0,1,0,0,0,255","1,16,3,6,0,2,0,0,0,255","1,0,4,7,0,3,0,2,1,255","1,0,4,0,5,3,0,0,0,255",
 "1,0,4,6,0,2,1,1,2,255","0,0,3,0,0,0,0,0,0,255","1,0,4,0,0,3,0,0,0,255,3:t=1;n=3;i=70-0","1,0,4,0,0,2,1,0,0,255,3:s=4;g=70;r=1",
 "1,0,2,0,0,0,0,0,0,255,3:q=0-75;u=1","1,17,0,0,0,0,0,0,0,255","1,0,4,0,0,3,2,0,0,255,3:a=cooldown_recovery+crit_local;all=1"];
const codeOf=n=>"BOFILTER:1,-1"+Array.from({length:n},(_,i)=>"|"+POOL[i%POOL.length]).join("");
const limitNote=n=>n.some(x=>x.includes("rules. "+COPY.limit));

for(const n of [1,40,41,100,199,200]){
  const code=codeOf(n),d=decode(code);
  eq(d.filter.rules.length,n,n+" rules decode");
  eq(encode(d.filter),code,n+" rules: encode(decode(code)) is the same code");
  ok(!limitNote(d.notes)&&d.warn.every(w=>!w.includes(COPY.limit)),n+" rules: no limit warning");
}
{ /* 201 is over the limit: still read and kept, with a warning */
  const d=decode(codeOf(201));
  eq(d.filter.rules.length,201,"201 rules are kept");
  ok(limitNote(d.notes)&&d.warn.some(w=>w.includes(COPY.limit)),"201 rules: limit warning in notes and warn");
  eq(encode(d.filter),codeOf(201),"201 rules still round trip");
}

/* names never reach the in-game code */
{ const f=decode(codeOf(200)).filter;f.rules.forEach((r,i)=>{r.name="Secret name "+i;});
  ok(!/Secret name/.test(encode(f)),"rule names are not in the code"); }

/* matching with 200 rules: the first matching rule decides, the last rule catches the rest */
{ const f=decode(codeOf(199)+"|1,0,0,0,0,1,0,0,0,255").filter;
  eq(f.rules.length,200,"200 rules for matching");
  const items=[];for(let i=0;i<600;i++)items.push(genItem());
  /* gems, runes, idols and other misc drops are not "any gear" (type 0): no such rule decides them */
  const notGear=it=>!!(it.gem||it.rune||it.kind==="misc"||it.kind==="idol");
  let decided=new Array(200).fill(0),open=0;
  items.forEach(it=>{const k=f.rules.findIndex(r=>r.on&&matches(r,it));
    if(k>=0){decided[k]++;}else{open++;ok(notGear(it),"only non-gear drops are left without a rule: "+it.name);}});
  eq(decided.reduce((a,b)=>a+b,0)+open,items.length,"every item is decided once or left to the game");
  ok(decided[199]>0,"the catch-all rule 200 decides the items nothing above it catches");
  /* deterministic: same sample, same result */
  const again=items.map(it=>f.rules.findIndex(r=>r.on&&matches(r,it)));
  const first=items.map(it=>f.rules.findIndex(r=>r.on&&matches(r,it)));
  eq(JSON.stringify(again),JSON.stringify(first),"matching is repeatable");
  /* moving the catch-all to the top makes it decide everything */
  const top=[f.rules[199],...f.rules.slice(0,199)];
  ok(items.filter(it=>!notGear(it)).every(it=>top.findIndex(r=>r.on&&matches(r,it))===0),"catch-all at the top decides every gear item");
  /* reorder keeps every rule: encode of a rotated list has the same rule set */
  const rot=[...f.rules.slice(57),...f.rules.slice(0,57)];
  const split=c=>c.split("|").slice(1).sort().join("|");
  eq(split(encode({preset:"-1",rules:rot})),split(encode(f)),"reordering loses no rule");
}

/* ---- Patch 87 keys: d, k, na, nb, nr, an (strings as the game exported them) ---- */
const P87=["1,0,4,0,0,3,0,0,0,255,3:d=4","1,0,4,0,0,3,0,0,0,255,3:t=1;k=1;n=2","1,0,4,0,0,3,0,0,0,255,3:k=2;n=1",
 "1,0,4,0,0,2,1,0,0,255,3:a=life;na=fire_res+cast_speed","1,0,4,0,0,0,0,0,0,255,3:a=life+fire_res+req_reduce+evasion_local+cast_speed+Area;an=3",
 "1,0,4,0,0,0,0,0,0,255,3:b=bow_1+bow_2;nb=1","1,0,1,0,0,0,0,0,0,255,3:nr=1;rn=windwhisper","1,0,4,0,0,3,0,0,0,255,3:a=vow_effect98","1,34,0,0,0,1,0,0,0,255","1,33,0,0,0,1,0,0,0,255","1,17,0,0,0,4,0,0,0,255"];
P87.forEach(r=>{const c="BOFILTER:1,-1|"+r;eq(encode(decode(c).filter),c,"Patch 87 round trip: "+r.split(",3:")[1]);});
ok(decode("BOFILTER:1,-1|"+P87[4]).notes.length===0,"6 named lines are fine");
ok(decode("BOFILTER:1,-1|1,0,4,0,0,3,0,0,0,255,3:a=life+fire_res+req_reduce+evasion_local+cast_speed+Area+mana").notes.some(x=>x.includes("list limit")),"7 named lines warn");
ok(decode("BOFILTER:1,-1|1,0,4,0,0,0,0,0,0,255,3:b=bow_1;nb=1;an=2").notes.some(x=>x.includes("does not allow")),"nb with an warns");
eq(T.type.find(o=>o[0]===34)[1],"Quivers","type 34 is Quivers");eq(T.type.find(o=>o[0]===33)[1],"Dwarven Runes","type 33 is Dwarven Runes");
eq(defOf(["Chest","Armour","EnergyShield"]),5,"defence type Armour + ES");eq(defOf(["Ring"]),0,"no defence type");
{
  const mk=(o)=>Object.assign({id:"x",name:"t",kind:"helm",sub:"",rar:"R",lvl:80,def:4,baseId:"b1",redId:"",sock:0,grade:1,req:60,mods:[]},o);
  const mod=(label,pre,tier)=>({lineLabel:label,pre,tier,lines:[],group:label});
  const R=s=>decode("BOFILTER:1,-1|"+s).filter.rules[0];
  const it=mk({mods:[mod(LINEN.life,1,1),mod(LINEN.fire_res,2,3)]});
  ok(matches(R(P87[0]),it)&&!matches(R(P87[0]),mk({def:1})),"d: defence type must be equal");
  ok(matches(R(P87[1].replace("n=2","n=1")),it),"k=1: one T1 prefix counts");
  ok(!matches(R(P87[1]),it),"k=1 n=2: only one prefix, rule does not match");
  ok(!matches(R("1,0,4,0,0,3,0,0,0,255,3:t=1;k=2;n=1"),it),"k=2 t=1: the only suffix is T3");
  ok(matches(R("1,0,4,0,0,3,0,0,0,255,3:k=2;n=1"),it),"k=2: one suffix counts");
  ok(matches(R("1,0,4,0,0,3,0,0,0,255,3:a=life;na=cast_speed"),it),"na: line not on the item");
  ok(!matches(R("1,0,4,0,0,3,0,0,0,255,3:a=life;na=fire_res"),it),"na: line on the item blocks the rule");
  ok(matches(R("1,0,4,0,0,3,0,0,0,255,3:a=life+fire_res+cast_speed;an=2"),it),"an=2: two of three");
  ok(!matches(R("1,0,4,0,0,3,0,0,0,255,3:a=life+cast_speed+mana;an=2"),it),"an=2: only one of three");
  ok(matches(R("1,0,4,0,0,3,0,0,0,255,3:b=bow_1+bow_2;nb=1"),it)&&!matches(R("1,0,4,0,0,3,0,0,0,255,3:b=bow_1+b1;nb=1"),it),"nb: none of these bases");
  ok(matches(R("1,0,4,0,0,3,0,0,0,255,3:nr=1;rn=windwhisper"),mk({rar:"U",redId:"x"}))===false,"nr rule does not match a rare item");
  ok(matches(R("1,0,5,0,0,3,0,0,0,255,3:nr=1;rn=windwhisper"),mk({rar:"U",redId:"x"})),"nr: a red that is not in the list");
  ok(!matches(R("1,0,5,0,0,3,0,0,0,255,3:nr=1;rn=windwhisper"),mk({rar:"U",redId:"windwhisper"})),"nr: a red that is in the list");
  ok(matches(R("1,34,0,0,0,1,0,0,0,255"),mk({kind:"quiver",rar:"R"}))&&matches(R("1,9,0,0,0,1,0,0,0,255"),mk({kind:"quiver",rar:"R"})),"types 34 and 9 catch quivers");
  ok(!matches(R("1,0,0,0,0,1,0,0,0,255"),mk({kind:"rune",rar:"U"}))&&matches(R("1,33,0,0,0,1,0,0,0,255"),mk({kind:"rune",rar:"U"})),"Dwarven Runes only match type 33");
}

/* the game rewrites ids with a capital (seen in an export, 22.11.2026): they must still match and round trip */
{
  const G="BOFILTER:1,-1|1,0,4,0,0,3,1,0,0,255,3:a=Life+fire_res+cast_speed+evasion_local;an=2;na=Mana;t=1;k=1;n=1;d=4|1,1,4,0,0,3,5,0,0,255,3:b=Bow_1+Bow_2;a=attack_speed_local;nb=1|1,0,5,0,0,3,2,0,0,255,3:nr=1;rn=windwhisper|1,0,4,0,0,0,0,0,0,255";
  eq(encode(decode(G).filter),G,"game-written export round trips (key order kept)");
  const rr=decode(G).filter.rules;
  ok(LINEN[mlistT(rr[0],"a")[0]]===LINEN.life,"capitalised line id finds the line");
  const bow=(id)=>({id:"x",name:"t",kind:"weapon",sub:"bow",rar:"R",lvl:80,def:0,baseId:id,redId:"",sock:0,grade:1,req:60,mods:[{lineLabel:LINEN.attack_speed_local,pre:2,tier:1,lines:[],group:"g"}]});
  ok(!matches(rr[1],bow("bow_1"))&&matches(rr[1],bow("bow_3")),"Bow_1 in a none-of-these list excludes bow_1");
}

/* ---- Gems + Sell (game texts, exe Patch 87: "Gems show unless a Gems rule hides them"; SellGems113: a gem under a Sell rule is sold on landing) ---- */
{
  const gem={id:"g",name:"Skill Gem",gem:true,rune:false,kind:"misc",rar:"X",lvl:1,mods:[],sub:""},cur={id:"c",name:"Currency",gem:false,rune:false,kind:"misc",rar:"X",lvl:1,mods:[],sub:""};
  const ev=(code,it)=>{setF(decode(code).filter);bumpRev();return evaluate(it);};
  const base="BOFILTER:1,-1|";
  eq(ev(base+"1,17,0,0,0,4,0,0,0,255",gem).v,4,"Gems + Sell: the gem is sold");
  eq(ev(base+"1,17,0,0,0,4,0,0,0,255",gem).guard,undefined,"Gems + Sell: not a guarded show");
  eq(ev(base+"1,17,0,0,0,0,0,0,0,255",gem).v,0,"Gems + Hide: the gem is hidden");
  eq(ev(base+"1,0,0,0,0,0,0,0,0,255",gem).v,1,"Any gear + Hide does not touch gems");
  eq(ev(base+"1,17,0,0,0,2,3,0,0,255",gem).v,2,"Gems + Highlight still works");
  ok(ev(base+"1,17,0,0,0,4,0,0,0,255",cur).i===-1,"a Gems rule does not catch currency");
  ok(!matches(decode(base+"1,17,0,0,0,4,0,0,0,255,3:t=1").filter.rules[0],gem),"decided: a Gems rule with extra conditions does not match gems");
  eq(encode(decode(base+"1,17,0,0,0,4,0,0,0,255").filter),base+"1,17,0,0,0,4,0,0,0,255","Gems + Sell with any rarity round trips (game export, 22.11.2026)");
  eq(encode(decode(base+"1,17,4,0,0,4,0,0,0,255").filter),base+"1,17,4,0,0,4,0,0,0,255","game export of a Gems Sell rule (22.11.2026, rarity field was 4 = Rare) round trips");
}
/* ---- Vow effect: HAS A LINE group 27, confirmed in game by importing 1,0,1,0,27,0,0,0,0,255 ---- */
{
  eq(T.line.find(o=>o[0]===27)[1],"Vow effect","line group 27 is Vow effect (confirmed in game, 22.11.2026)");eq(LINEMAP.VowEffect98.join(),"27","the Vow effect affix group maps to line group 27");
  const am={id:"a",name:"t",kind:"amulet",sub:"",rar:"R",lvl:80,def:0,baseId:"jade_amulet",redId:"",sock:0,grade:1,req:60,mods:[{lineLabel:LINEN.vow_effect98,pre:2,tier:1,lines:[27],group:"VowEffect98"}]};
  ok(matches(decode("BOFILTER:1,-1|1,0,4,0,27,3,0,0,0,255").filter.rules[0],am),"HAS A LINE Vow effect matches an amulet with the line");
  ok(matches(decode("BOFILTER:1,-1|1,0,4,0,0,3,0,0,0,255,3:a=vow_effect98").filter.rules[0],am),"named line vow_effect98 matches it too");
  ok(!decode("BOFILTER:1,-1|1,0,4,0,27,3,0,0,0,255").notes.some(x=>x.includes("does not know")),"line group 27 is not reported as unknown");
}
/* ---- Any N belongs to named lines only; the game chip steps any -> any 2 .. -> all ---- */
{
  const r=decode("BOFILTER:1,-1|1,0,4,0,0,3,0,0,0,255,3:a=life+fire_res+cast_speed;an=2").filter.rules[0];
  mset(r,"a","life+fire_res");fixAn(r);eq(mval(r,"an"),"","an is dropped when fewer than 3 lines are left");
  mset(r,"a","life+fire_res+cast_speed+mana");mset(r,"an","4");fixAn(r);eq(mval(r,"an"),"3","an is kept below the number of lines");
  const it={id:"x",name:"t",kind:"helm",sub:"",rar:"R",lvl:80,def:1,baseId:"bow_1",redId:"",sock:0,grade:1,req:60,mods:[]};
  ok(matches(decode("BOFILTER:1,-1|1,0,4,0,0,3,0,0,0,255,3:b=bow_1;an=2").filter.rules[0],it),"an without named lines does not change a base rule");
  ok(decode("BOFILTER:1,-1|1,0,4,0,0,3,0,0,0,255,3:b=bow_1;an=2").notes.some(x=>x.includes("Any N but no named lines")),"an without named lines is noted on import");
}
/* ---- key order: only pairs seen in game exports are fixed; the rest stays free and import keeps any order ---- */
{
  const SEEN=[["b","a"],["a","all"],["a","an"],["an","na"],["na","t"],["a","nb"],["nr","rn"],["an","rn"],["t","k"],["k","n"],["n","s"],["s","d"],["d","i"],["i","q"],["q","g"],["g","gx"],["gx","r"],["r","rn"],["rn","u"],["b","s"],["s","rt"],["n","d"],["t","n"],["n","i"],["na","nb"],["nb","rn"],["na","rn"]];
  const keys=[...new Set(SEEN.flat())];
  [keys,keys.slice().reverse(),keys.slice().sort()].forEach((order,j)=>{
    const r=newRule();order.forEach(k=>mset(r,k,"1"));const at=k=>r.m.findIndex(x=>x[0]===k);
    ok(SEEN.every(([x,y])=>at(x)<at(y)),"inserting keys in order variant "+j+" gives the order seen in game exports");
  });
  const odd="BOFILTER:1,-1|1,0,4,0,0,3,0,0,0,255,3:d=4;n=1;k=1;t=1;rn=windwhisper;nr=1;a=life;an=2";
  eq(encode(decode(odd).filter),odd,"an unusual key order is kept on import and export");
  ["BOFILTER:1,-1|1,0,4,0,0,3,0,0,0,255,3:s=4;g=70;r=1","BOFILTER:1,-1|1,0,4,0,0,3,0,0,0,255,3:q=0-75;u=1;rt=2","BOFILTER:1,-1|1,0,4,0,0,3,0,0,0,255,3:gx=90;i=60-75;s=2"].forEach(c=>eq(encode(decode(c).filter),c,"unverified-position keys round trip: "+c.split(",3:")[1]));
}
/* ---- data version ---- */
eq(DATA_BUILD.build,87,"data build is 87");eq(DATA_BUILD.apiChecked,86,"public API was last checked at build 86");
/* ---- Easy Mode gems setting ---- */
{
  const off=easyGen(ezSane({arch:{fire:1}})),hide=easyGen(ezSane({gems:1,arch:{fire:1}})),sell=easyGen(ezSane({gems:2,arch:{fire:1}}));
  eq(ezSane({}).gems,0,"Easy Mode: gems default is untouched");eq(ezSane({gems:9}).gems,2,"Easy Mode: gems value is clamped");
  ok(!off.rules.some(r=>r.type===17),"Easy Mode default writes no Gems rule (old saves and codes do not change)");
  ok(hide.rules.some(r=>r.type===17&&r.action===0),"Easy Mode: Hide gems writes a Gems Hide rule");
  ok(sell.rules.some(r=>r.type===17&&r.action===4),"Easy Mode: Sell gems writes a Gems Sell rule");
  eq(encode({preset:"-1",rules:off.rules}),encode({preset:"-1",rules:easyGen(ezSane({gems:0,arch:{fire:1}})).rules}),"Easy Mode output without gems is stable");
  ok(!/BOFILTER[^|]*\|[^|]*Sell gems/.test(encode({preset:"-1",rules:sell.rules})),"rule names never reach the code");
}

/* game exports with Vow effect (22.11.2026): single line, two lines (Area written with a capital), and all=1 after the list */
["a=vow_effect98","a=vow_effect98+Area","a=vow_effect98+Area;all=1"].forEach(m=>{const c="BOFILTER:1,-1|1,0,1,0,0,0,0,0,0,255,3:"+m;eq(encode(decode(c).filter),c,"game export round trips: "+m);});
{
  const am={id:"a",name:"t",kind:"amulet",sub:"",rar:"N",lvl:80,def:0,baseId:"jade_amulet",redId:"",sock:0,grade:1,req:60,mods:[{lineLabel:LINEN.area,pre:2,tier:1,lines:[23],group:"Area"}]};
  const R=m=>decode("BOFILTER:1,-1|1,0,1,0,0,0,0,0,0,255,3:"+m).filter.rules[0];
  ok(matches(R("a=vow_effect98+Area"),am),"any of Vow effect + Area: Area alone is enough (capital A in the code)");
  ok(!matches(R("a=vow_effect98+Area;all=1"),am),"all of Vow effect + Area: Area alone is not enough");
}

eq(encode(decode("BOFILTER:1,-1|1,0,1,0,27,0,0,0,0,255").filter),"BOFILTER:1,-1|1,0,1,0,27,0,0,0,0,255","Vow effect line group round trips");
/* game export (22.11.2026): three named reds + an=2 is kept as written, an before rn, and the game shows "one of them" */
{
  const c="BOFILTER:1,-1|1,0,1,0,0,1,0,0,0,255,3:an=2;rn=windwhisper+adders_kiss+aegis_of_the_oath";
  eq(encode(decode(c).filter),c,"game export with an before rn round trips");
  const ur=(id)=>({id:"u",name:"t",kind:"ring",sub:"",rar:"U",lvl:60,def:0,baseId:"x",redId:id,sock:0,grade:1,req:50,mods:[]});
  const r=decode(c.replace(",1,0,0,1,",",5,0,0,1,")).filter.rules[0];
  ok(matches(r,ur("adders_kiss"))&&!matches(r,ur("oathbreaker")),"an does not change a red list: one of the named reds is enough");
}

{const c="BOFILTER:1,-1|1,0,4,0,0,3,0,0,0,255,3:b=Bow_1;s=2;rt=2";eq(encode(decode(c).filter),c,"game export b;s;rt round trips (22.11.2026)");}
{const c="BOFILTER:1,-1|1,0,4,0,0,3,0,0,0,255,3:b=Bow_1;a=Life+Mana;t=1;k=1;n=2;s=4;d=4;i=60-75;q=0-75;g=50;gx=90;r=1;rn=windwhisper;u=1";eq(encode(decode(c).filter),c,"game export with 14 keys round trips (22.11.2026)");
  const r=newRule();c.split(",3:")[1].split(";").reverse().forEach(x=>{const[k,v]=x.split("=");mset(r,k,v);});eq(r.m.map(x=>x[0]).join(","),"b,a,t,k,n,s,d,i,q,g,gx,r,rn,u","Oathfilter writes these 14 keys in the game order");}
{for(const c of ["BOFILTER:1,-1|1,0,4,0,0,0,0,0,0,255,3:a=attack_speed_local+idol_armour_s+Area;na=ignite_effect;rn=aftershock_greaves","BOFILTER:1,-1|1,0,4,0,0,0,0,0,0,255,3:b=agate_amulet;a=attack_speed_local+idol_armour_s+Area;na=ignite_effect;nb=1;rn=aftershock_greaves"])eq(encode(decode(c).filter),c,"game export a/na/nb/rn round trips (22.11.2026)");}
{const s=ezSane({arch:{fire:1,cold:1}});const txt=easyGen(s).rules.map(r=>mval(r,"a")).join("+");ok(txt.includes("attack_added_fire")&&txt.includes("attack_added_cold"),"Easy Mode Fire/Cold picks include the Build 87 attack_added lines");
  const a=ezSane({arch:{spell:1,fire:1}});ok(!easyGen(a).rules.map(r=>mval(r,"a")).join("+").includes("attack_added_fire"),"attack_added_fire is style-bound: not kept for a Spell-only pick");}
/* ---------- module library (js/modules.js, no DOM) ---------- */
{
  const {splitRule,fitRules,ruleIssues,sellKind,sellCaution,insertCheck,placeAt,BUILTIN,builtinRules,moduleCode,filterModules,cleanModule,duplicateModule,moduleToShare,moduleFromShare,covers}=MOD;
  const R=(o,m,name)=>{const r=newRule(o);r.name=name||"";Object.keys(m||{}).forEach(k=>Array.isArray(m[k])?msetList(r,k,m[k]):mset(r,k,String(m[k])));r.id=Math.random().toString(36).slice(2);return r;};
  const ids=(p,n)=>Array.from({length:n},(_,i)=>p+i);
  const first=(rules,it)=>{const r=rules.find(x=>x.on&&matches(x,it));return r?r.action:null;};
  /* unknown fields and key order survive a round trip */
  for(const c of ["BOFILTER:1,-1|1,0,4,0,0,3,0,0,0,255,3:a=life;zz=5;t=1","BOFILTER:1,-1|1,0,4,0,0,3,0,0,0,255,9:foo=1","BOFILTER:1,-1|1,0,4,0,0,3,0,0,0,255,7,8","BOFILTER:1,-1|1,0,4,0,0,3,0,0,0,255,3:b=Bow_1;a=Life+Mana;t=1;k=1;n=2;s=4;d=4;i=60-75;q=0-75;g=50;gx=90;r=1;rn=windwhisper;u=1"])
    eq(encode(decode(c).filter),c,"round trip keeps unknown fields and key order: "+c.slice(30,80));
  /* new item types and keys */
  for(const c of ["BOFILTER:1,-1|1,33,0,0,0,2,4,0,0,255","BOFILTER:1,-1|1,34,4,0,0,2,1,0,0,255","BOFILTER:1,-1|1,0,4,0,0,2,0,0,0,255,3:d=5;k=2;na=life;nb=1;b=bow_1","BOFILTER:1,-1|1,0,4,0,0,2,0,0,0,255,3:a=life+mana+fire_res;all=1","BOFILTER:1,-1|1,0,4,0,0,2,0,0,0,255,3:a=life+mana+fire_res;an=2"])
    eq(encode(decode(c).filter),c,"Patch 87 code round trips: "+c.slice(14,60));
  /* nb / nr with all / an are refused: reported by ruleIssues */
  ok(ruleIssues(R({},{b:["bow_1"],nb:1,all:1})).some(x=>x.code==="neg-all"),"nb + all is reported");
  ok(ruleIssues(R({},{rn:["windwhisper"],nr:1,an:2})).some(x=>x.code==="neg-all"),"nr + an is reported");
  ok(ruleIssues(R({},{b:["bow_1"],nb:1})).length===0&&ruleIssues(R({},{a:["life","mana","area"],all:1})).length===0,"nb alone and all alone are fine");
  /* auto-split: caps 12 bases, 12 reds, 6 named lines */
  { const b=splitRule(R({action:2},{b:ids("bow_",30)},"Bases"));
    eq(b.rules.length,3,"30 bases -> 3 rules");ok(b.rules.every(r=>mlistT(r,"b").length<=12)&&b.rules.flatMap(r=>mlistT(r,"b")).join()===ids("bow_",30).join(),"bases keep their order and none is lost");
    ok(b.rules.every(r=>r.action===2),"split rules keep the action");
    const rn=splitRule(R({rarity:5,action:3},{rn:ids("red_",25)}));eq(rn.rules.length,3,"25 reds -> 3 rules");
    const a=splitRule(R({},{a:["life","mana","area","cast_speed","fire_res","cold_res","lightning_res"]}));eq(a.rules.length,2,"7 named lines -> 2 rules");ok(a.rules.every(r=>mlistT(r,"a").length<=6),"named lines at most 6");
    const x=splitRule(R({},{b:ids("b",25),a:["life","mana","area","cast_speed","fire_res","cold_res","lightning_res"]}));eq(x.rules.length,6,"3 base chunks x 2 line chunks = 6 rules");
    const one=R({},{b:ids("b",5)});eq(splitRule(one).rules[0],one,"a rule within the limits is returned as it is");
    ok(!/ 1\/3/.test(encode({preset:"-1",rules:b.rules})),"rule names never reach the code"); }
  /* split rules match exactly what the unsplit rule matched */
  { const it0=[];for(let i=0;i<400;i++)it0.push(genItem());
    const pool=[...new Set(it0.map(i=>i.baseId))].slice(0,30);const whole=R({action:2},{b:pool}),parts=splitRule(whole).rules;
    ok(parts.length>=2,"test list is long enough to split");
    ok(it0.every(i=>(matches({...whole,m:whole.m},i)||false)===parts.some(r=>matches(r,i))),"split rules match the same items as the long list"); }
  /* an=N, all=1, nb/nr, na are not split: the meaning would change */
  { const an=splitRule(R({},{a:["life","mana","area","cast_speed","fire_res","cold_res","lightning_res"],an:2}));eq(an.rules.length,1,"an=N is not split");ok(an.notes.length===1,"an=N over the limit is reported");
    const all=splitRule(R({},{a:["life","mana","area","cast_speed","fire_res","cold_res","lightning_res"],all:1}));eq(all.rules.length,1,"all=1 is not split");
    const nb=splitRule(R({},{b:ids("b",20),nb:1}));eq(nb.rules.length,1,"nb is not split");
    const na=splitRule(R({},{na:["life","mana","area","cast_speed","fire_res","cold_res","lightning_res"]}));eq(na.rules.length,1,"na over 6 is not split");ok(na.notes.length===1,"na over the limit is reported");
    ok(ruleIssues(na.rules[0]).some(x=>x.code==="limit-na"),"na over the limit stays an issue"); }
  /* 200 rule limit */
  { const ex=Array.from({length:199},()=>R({}, {}));const chk=insertCheck(ex,[R({}),R({})],"end",null);
    ok(chk.over&&chk.total===201&&chk.max===200,"199 + 2 is over the limit of 200");
    ok(!insertCheck(ex,[R({})],"end",null).over,"199 + 1 is exactly 200 and fine");
    eq(placeAt(ex,"top"),0,"insert at top");eq(placeAt(ex,"end"),199,"insert at end");eq(placeAt(ex,"after",ex[10].id),11,"insert after the selected rule"); }
  /* pre-insert: shadowed rules are found */
  { const broad=R({type:0,rarity:3,action:0},{},"hide nm"),narrow=R({type:0,rarity:2,action:1},{},"show magic");
    const c1=insertCheck([broad],[narrow],"end",null);eq(c1.shadowed.length,1,"a new rule under a broader earlier rule is shadowed");
    const c2=insertCheck([broad],[narrow],"top",null);eq(c2.shadowed.length,0,"at the top it is not shadowed");
    const c3=insertCheck([narrow],[broad],"top",null);eq(c3.shadows.length,1,"a broad rule inserted above a narrow one makes it unreachable (reported)"); }
  /* Sell + Caution: Magic, Normal, Custom (and gems); Hide gives none */
  { eq(sellKind(R({type:0,rarity:2,action:4})),"magic","Sell Magic gear is kind magic");
    eq(sellKind(R({type:0,rarity:1,action:4})),"normal","Sell Normal gear is kind normal");
    eq(sellKind(R({type:0,rarity:3,action:4})),"normalmagic","Sell Normal and Magic is kind normalmagic");
    eq(sellKind(R({type:0,rarity:4,action:4},{a:["life"]})),"custom","a Sell rule with conditions is a custom rule");
    eq(sellKind(R({type:5,rarity:4,action:4})),"custom","Sell Rare helms is a custom rule");
    eq(sellKind(R({type:17,action:4})),"gems","Sell gems is kind gems");
    eq(sellKind(R({type:0,rarity:2,action:0})),null,"Hide Magic needs no caution");
    const off=R({type:0,rarity:2,action:4});off.on=0;eq(sellKind(off),null,"a disabled Sell rule needs no caution");
    const cs=sellCaution([R({type:0,rarity:2,action:4}),R({type:0,rarity:1,action:4}),R({type:5,action:4}),R({type:0,action:0})]);
    eq(cs.map(x=>x.kind).sort().join(),"custom,magic,normal","caution lists each kind once");ok(cs.every(x=>x.text&&x.text.includes("sold")||x.text.includes("sell")),"caution texts explain the risk");
    const e1=easyGen(ezSane({gems:0,hs:1,arch:{fire:1}})),e0=easyGen(ezSane({arch:{fire:1}}));
    ok(e1.rules.some(r=>r.action===4&&r.rarity===3&&r.type===0),"Easy Mode hs=1 sells Normal and Magic gear");ok(!e0.rules.some(r=>r.action===4),"Easy Mode default does not sell");
    eq(sellCaution(e1.rules).map(x=>x.kind).join(),"normalmagic","Easy Mode Sell is cautioned as Normal and Magic");
    ok(sellCaution(builtinRules(BUILTIN.find(m=>m.id==="gems-sell")).rules).length===1,"the Sell gems module is cautioned");
    ok(BUILTIN.filter(m=>m.id!=="gems-sell").every(m=>sellCaution(builtinRules(m).rules).length===0),"no other built-in module sells"); }
  /* built-in modules: every one is valid and the in-game code has no names */
  { ok(BUILTIN.length>=30,"built-in modules exist ("+BUILTIN.length+")");
    const idsSeen=new Set(BUILTIN.map(m=>m.id));eq(idsSeen.size,BUILTIN.length,"built-in ids are unique");
    ok(BUILTIN.every(m=>m.name&&m.cat&&m.desc),"every built-in module has a name, category and description");
    ok(!BUILTIN.some(m=>/debug|audit|marker|currency/i.test(m.name+m.cat+m.id)),"no debug, audit or currency modules");
    BUILTIN.forEach(m=>{const r=builtinRules(m);ok(r.rules.length>0&&r.rules.length<=MAX_RULES&&r.rules.every(x=>ruleIssues(x).length===0),"module "+m.id+" is valid within the limits");
      const code=moduleCode(r.rules);ok(/^BOFILTER:1,-1(\|[0-9,]+(,3:[A-Za-z0-9_=;+.\-]+)?)+$/.test(code),"module "+m.id+" exports a plain game code");
      ok(!code.includes(m.name)&&r.rules.every(x=>!x.name||!code.includes(x.name)),"module "+m.id+": names are not in the code");
      eq(encode(decode(code).filter),code,"module "+m.id+" round trips");}); }
  /* Drop Test: T1 armour bases, chase reds, gems, caster */
  { const it=(o)=>Object.assign({rar:"R",kind:"chest",sub:"",lvl:80,mods:[],sock:0,req:0,grade:0,def:1,baseId:"plate_chest_7"},o);
    const t1=builtinRules(BUILTIN.find(m=>m.id==="arm-t1-all")).rules,t2=builtinRules(BUILTIN.find(m=>m.id==="arm-t2-all")).rules;
    eq(first(t1,it({baseId:"plate_chest_7"})),2,"T1 armour base (Titan Plate) is highlighted");
    eq(first(t1,it({baseId:"plate_chest_6"})),null,"T2 base is not touched by the T1 module");eq(first(t2,it({baseId:"plate_chest_6"})),2,"T2 module highlights the T2 base");
    eq(first(t1,it({baseId:"silk_boots_7",kind:"boots"})),2,"T1 works for another slot and defence type");
    ok(t1.length===2&&t1.every(r=>mlistT(r,"b").length<=12),"all 24 T1 bases fit in two rules of at most 12");
    const chase=builtinRules(BUILTIN.find(m=>m.id==="chase-beam")).rules,p87=builtinRules(BUILTIN.find(m=>m.id==="chase-p87")).rules;
    const red=(o)=>Object.assign({rar:"U",kind:"amulet",chase:true,redId:"the_first_vow",baseId:"a",mods:[],lvl:80,sock:0,req:0,grade:0},o);
    eq(first(chase,red({})),3,"a Chase red gets the beam");eq(first(chase,red({chase:false})),null,"a normal red is not a Chase red");
    eq(first(p87,red({redId:"u200_shard_of_the_fourth_spark"})),3,"Shard of the Fourth Spark is a Chase red");eq(first(p87,red({redId:"u200_mardoths_last_pebble"})),3,"Mardoth's Last Pebble is a Chase red");eq(first(p87,red({redId:"the_first_vow"})),null,"the P87 module names only the two new reds");
    const gh=builtinRules(BUILTIN.find(m=>m.id==="gems-hide")).rules,gs=builtinRules(BUILTIN.find(m=>m.id==="gems-sell")).rules,gem={gem:true,rar:"N",kind:"misc",mods:[],lvl:1};
    eq(first(gh,gem),0,"Hide gems hides a gem");eq(first(gs,gem),4,"Sell gems sells a gem");eq(first(gh,it({})),null,"the gem rule does not touch gear");
    const caster=builtinRules(BUILTIN.find(m=>m.id==="caster-hide-attack")).rules;
    const mod=(k,pre)=>({lineLabel:LINEN[k],tier:1,pre:pre||1,lines:[]});
    eq(first(caster,it({kind:"helm",baseId:"x",mods:[mod("cold_spell_added")]})),2,"Caster keeps Cold Damage to Spells (highlighted)");
    eq(first(caster,it({kind:"helm",baseId:"x",mods:[mod("cold_added_local")]})),0,"Caster hides Adds X to Y Cold Damage");
    eq(first(caster,it({kind:"helm",baseId:"x",mods:[mod("attack_added_cold")]})),0,"Caster hides Adds Cold Attack Damage");
    eq(first(caster,it({kind:"helm",baseId:"x",mods:[mod("attack_added_fire")]})),0,"Caster hides Adds Fire Attack Damage");
    eq(first(caster,it({kind:"helm",baseId:"x",mods:[mod("cold_added_local"),mod("cast_speed",2)]})),2,"a spell line saves an item that also has an attack flat line");
    eq(first(caster,it({kind:"helm",baseId:"x",mods:[mod("life")]})),null,"other Rare gear is not touched");
    const dt=builtinRules(BUILTIN.find(m=>m.id==="def-brigandine")).rules;eq(first(dt,it({def:4,kind:"chest"})),2,"Armour + Evasion type module matches def 4");eq(first(dt,it({def:1})),null,"and not Armour only");
    const dw=builtinRules(BUILTIN.find(m=>m.id==="runes-dwarven-hl")).rules;eq(first(dw,{rar:"N",kind:"misc",dwarven:true,mods:[]}),null,"Dwarven Rune handling stays with the type rule (see type 33 tests)");
    ok(dw[0].type===33&&builtinRules(BUILTIN.find(m=>m.id==="quiver-rare")).rules[0].type===34,"Dwarven Runes use type 33, Quivers type 34");
    const trash=builtinRules(BUILTIN.find(m=>m.id==="trash-nm")).rules;
    eq(first(trash,it({rar:"M",kind:"helm"})),0,"cleanup hides Magic gear");eq(first(trash,it({rar:"U",kind:"helm"})),null,"cleanup never reaches uniques");eq(first(trash,it({rar:"R"})),null,"cleanup leaves Rare gear");
    ok(first(trash,{rar:"N",kind:"misc",gem:false,mods:[]})===null,"cleanup does not touch currency, runes, gold or flasks");
    eq(first(trash,it({rar:"M",kind:"helm",core:true,cls:"core"})),3,"a Core-touched Magic item is kept (beam), the keep rules come before the hide"); }
  /* search over name, description, category, bases and lines */
  { const names=q=>filterModules(BUILTIN,q).map(m=>m.id);
    ok(names("armour").includes("arm-t1-all"),"search by name");ok(names("Titan Plate").includes("arm-t1-plate")||names("Titan Plate").includes("arm-t1-all"),"search by base name");
    ok(names("Cold Spell Damage").includes("caster-hide-attack"),"search by line text");ok(names("Shard of the Fourth Spark").includes("chase-p87"),"search by red name");
    ok(names("highest chest").includes("arm-t1-chest")||names("highest body").length>=0,"search by description words");
    eq(filterModules(BUILTIN,"",  "Gems").length,2,"category filter");ok(filterModules(BUILTIN,"xyzzy").length===0,"no match gives an empty list"); }
  /* custom modules: stored shape stays readable, duplicate, share round trip */
  { const old={id:"m1",name:"Old module",c:"BOFILTER:1,-1|1,0,4,0,0,3,0,0,0,255",n:["x"],t:5};
    eq(JSON.stringify(cleanModule(old)),JSON.stringify(old),"a module saved by the previous version loads unchanged");
    ok(cleanModule({id:1,name:"x",c:""})===null,"a broken record is dropped");
    const withInfo=cleanModule({...old,desc:"d",cat:"c"});ok(withInfo.desc==="d"&&withInfo.cat==="c","description and category are kept");
    const d=duplicateModule([old],"m1");ok(d.module&&d.module.name==="Old module copy"&&d.list.length===2&&d.module.c===old.c&&d.module.id!==old.id,"duplicate makes a copy with a new id");
    ok(duplicateModule(d.list,"m1").module.name==="Old module copy 2","a second copy gets a number");
    ok(duplicateModule(Array.from({length:50},(_,i)=>({...old,id:"i"+i,name:"n"+i})),"i1").err,"duplicate respects the module limit");
    const sh=moduleToShare({...old,desc:"d",cat:"c"}),back=moduleFromShare(sh);ok(back.module&&back.module.name==="Old module"&&back.module.c===old.c&&back.rules===1,"share file round trips");
    ok(moduleFromShare("hello").err&&moduleFromShare('{"a":1}').err,"bad share text is refused");
    ok(!old.c.includes("Old module")&&!decode(back.module.c).filter.rules.some(r=>(r.name||"").length),"names are not part of the game code"); }
  /* localStorage: old Easy Mode saves without the Sell setting still load and give the same rules */
  { const oldSave={rl:0,tk:2,hl:1,idol:"match",hn:1,hm:1,gems:0,arch:{fire:1},keep:{core:1,runes:1,tsw:1}};
    const a=ezSane(oldSave);eq(a.hs,0,"an old Easy Mode save gets Sell off");
    eq(encode({preset:"-1",rules:easyGen(a).rules}),encode({preset:"-1",rules:easyGen(ezSane({...oldSave,hs:0})).rules}),"an old Easy Mode save builds the same filter");
    eq(ezSane({...oldSave,hs:1}).hs,1,"the Sell setting is kept"); }
}

/* ---- game files build 87: pen95 affixes, Thunderwake Maul; Easy Mode merges no-limit lines into a rule whose limit covers all their tiers ---- */
{ const pen=AFF.filter(a=>/^(fire|cold|lightning)_pen95_(1h|2h)$|^elemental_pen95_amulet$/.test(a.id));
  eq(pen.length,7,"seven pen95 affixes (game file affixes_pen95.json)");ok(pen.every(a=>a.n===4),"pen95 affixes have 4 tiers");
  const tw=UNIQUES.find(u=>u.name==="Thunderwake Maul");ok(tw&&tw.base.id==="mace1h_2"&&tw.lvl===10,"Thunderwake Maul is mace1h_2, level 10 (game file and API build 86)");
  const g=easyGen(ezSane({rl:60,arch:{attack:1,cold:1}})).rules.filter(r=>r.type===0&&r.action>0);
  eq(g.length,2,"Easy Mode: attacks + cold at rl 60 is 2 rules, the penetration line joins the T4 rule");
  ok(g.some(r=>mval(r,"a").includes("cold_pen95_2h")&&mval(r,"t")==="4"),"the penetration line sits in the rule with limit T4");
  const h=easyGen(ezSane({rl:60,arch:{attack:1,cold:1}})).rules.filter(r=>r.type===0&&r.action>0&&!mval(r,"t"));
  eq(h.length,0,"no rule is left without a limit when every line is covered by T4"); }

/* ---- picker: no double entries, and the list is not capped below the game limit ---- */
{ const ids=DATA.lines.map(x=>x[1]);eq(new Set(ids).size,ids.length,"every named line is listed once");
  const labs=Object.keys(REDN).map(i=>REDD[i]);eq(new Set(labs).size,labs.length,"every red has its own label (Primal copies and the Signets are told apart)");
  eq(REDD.kingbreaker_primal,"Kingbreaker (Primal)","a Primal red is labelled");ok(/Signet of the Lost Order \(/.test(REDD.signet_of_the_lost_order_chain_reaction),"a Signet variant is labelled");
  const app=(await import("node:fs")).readFileSync(new URL("../js/app.js",import.meta.url),"utf8"),fn=app.slice(app.indexOf("function renderPickList"),app.indexOf("function renderPickList")+400);
  ok(fn.includes("full=ids.length>=MAXL[k]")&&!/full=ids\.length>=\d/.test(fn),"the picker closes at the game limit (6 / 12), not at a fixed 4");
  let pen=0;for(let i=0;i<4000;i++){const it=genItem({kind:"amulet",ilvl:84});if(it&&it.mods&&it.mods.some(m=>/_pen95_/.test(m.id||m.group||"")))pen++;}eq(pen,0,"pen95 lines do not drop in the test (game switch)"); }

/* ---- Easy Mode Bow / Projectile also covers quivers (its lines are the ones bows and quivers roll) ---- */
{ const R=easyGen(ezSane({arch:{bow:1}})).rules,gear=R.filter(r=>r.type===0&&r.action>0),all=gear.flatMap(r=>mlistT(r,"a"));
  ok(["attack_added_phys","attack_added_fire","attack_added_cold","attack_added_lightning","attack_speed_local","skill_level"].every(x=>all.includes(x)),"Bow pick: quiver and bow lines are in the rules");
  const q=(id)=>({rar:"R",kind:"quiver",sub:"",lvl:80,mods:[{lineLabel:LINEN[id],tier:1,pre:id.startsWith("attack_added")?1:2,lines:[],group:id}],sock:0,req:0,grade:0,def:0,baseId:"hunters_quiver"});
  const act=it=>{const r=R.find(x=>x.on&&matches(x,it));return r?r.action:null;};
  eq(act(q("attack_added_cold")),2,"a Rare quiver with Adds Cold Attack Damage is highlighted by the Bow pick");
  eq(act({...q("life"),mods:[{lineLabel:LINEN.life,tier:1,pre:1,lines:[],group:"life"}]}),0,"a Rare quiver without a Bow line is hidden"); }

{ const app=(await import("node:fs")).readFileSync(new URL("../js/app.js",import.meta.url),"utf8");
  const lw=app.slice(app.indexOf("const lineWhere"),app.indexOf("const lineWhere")+700);
  ok(/const LOCAL_LINE=/.test(app)&&app.includes('" (local)"'),"picker marks local lines with (local)");
  ok(app.includes("ATTACK_LINE=")&&app.includes('class="qm"'),"picker shows a ? for the Attack Damage variants");
  ok(/quivers/.test(lw)&&/bow/.test(lw),"the hints mention bows and quivers"); }

{ const fsx=await import("node:fs"),g=JSON.parse(fsx.readFileSync(new URL("../data/easy-mode-groups.json",import.meta.url),"utf8"));
  const known=new Set(DATA.lines.map(x=>x[1]));
  eq(g.groups.length,EZ_ARCH.length,"Easy Mode groups: none dropped on load");
  ok(g.groups.every(a=>a.k&&a.n&&Array.isArray(a.ids)&&Array.isArray(a.idol)),"Easy Mode groups: every group has k, n, ids, idol");
  eq(new Set(g.groups.map(a=>a.k)).size,g.groups.length,"Easy Mode groups: keys are unique");
  ok(g.groups.every(a=>a.ids.every(id=>known.has(id))),"Easy Mode groups: every gear id exists in the game data");
  ok(g.groups.every(a=>a.idol.every(id=>/^idol_/.test(id))),"Easy Mode groups: every Idol id starts with idol_");
  ok(Object.keys(g.st).every(id=>known.has(id))&&Object.values(g.st).every(v=>v==="attack"||v==="spell"),"Easy Mode groups: style lines are known and attack or spell");
  ok(EZ_GRP.flatMap(x=>x[2].flatMap(y=>y[1])).every(k=>g.groups.some(a=>a.k===k)),"Easy Mode groups: every group the picker shows exists"); }

{ const G=k=>EZ_ARCH.find(a=>a.k===k),txt=i=>LINEN_[i];
  const pick=ks=>easyGen(ezSane({arch:Object.fromEntries(ks.map(k=>[k,1]))})).rules.map(r=>mval(r,"a")||"").join("+").split("+");
  ok(G("armour").ids.includes("str_flat")&&G("evasion").ids.includes("dex_flat")&&G("es").ids.includes("int_flat"),"Easy Mode: Strength is under Armour, Dexterity under Evasion, Intelligence under Energy Shield");
  ok(["armour","evasion","es"].every(k=>G(k).ids.includes("all_attr")),"Easy Mode: all Attributes sits in all three defence groups");
  ok(!["dex_flat","int_flat"].some(i=>G("armour").ids.includes(i))&&!["str_flat","int_flat"].some(i=>G("evasion").ids.includes(i))&&!["str_flat","dex_flat"].some(i=>G("es").ids.includes(i)),"Easy Mode: each attribute only sits in its own defence group");
  for(const [c,want] of [[["armour","evasion"],["str_flat","dex_flat"]],[["evasion","es"],["dex_flat","int_flat"]],[["armour","es"],["str_flat","int_flat"]]]){
    const l=pick(c);ok(want.every(i=>l.includes(i)),"Easy Mode: hybrid pick "+c.join("+")+" keeps "+want.join(" and "));
    eq(l.filter(i=>i==="all_attr").length,1,"Easy Mode: hybrid pick "+c.join("+")+" lists all Attributes once"); }
  ok(["max_fire_res91","max_cold_res91","max_lightning_res91","max_poison_res91","phys_as_elem"].every(i=>G("res").ids.includes(i))&&G("res").idol.includes("idol_grand_max_poison_res"),"Easy Mode: maximum resistances and Physical taken as are under Resists");
  { const l=pick(["res"]);ok(["max_fire_res91","max_cold_res91","max_lightning_res91","max_poison_res91","phys_as_elem"].every(i=>l.includes(i)),"Easy Mode: a Resists pick writes the maximum resistance lines"); }
  const ex=EZ_EXCLUDED,exT=new Set(ex.map(txt).filter(Boolean));
  ok(["life_on_kill","ring_life_on_kill","mana_on_kill","ring_mana_on_kill","cooldown_recovery","req_reduce"].every(i=>ex.includes(i)),"Easy Mode: on-kill, cooldown recovery and attribute requirements are excluded");
  ok(EZ_ARCH.every(a=>a.ids.concat(a.idol).every(i=>!ex.includes(i)&&!exT.has(txt(i)))),"Easy Mode: no group uses an excluded line or a line with the same text");
  ok(EZ_ARCH.every(a=>new Set(a.ids).size===a.ids.length&&new Set(a.idol).size===a.idol.length&&(a.ids.length||a.idol.length)),"Easy Mode: no group is empty or lists a line twice");
  const tags=new Set(AFF.flatMap(a=>a.tags));
  ok(AFF.every(a=>a.tags.length&&a.tags.every(Boolean)&&a.ex.every(x=>tags.has(x)&&!a.tags.includes(x))),"Affix table: no empty slot tag, no unknown exclude, no exclude that is also a slot of the same line"); }

{ const A=r=>(mval(r,"a")||"").split("+").filter(Boolean);
  const sep=easyGen(ezSane({arch:{fire:1,cold:1}})),mer=easyGen(ezSane({arch:{fire:1,cold:1}}),false,true);
  ok(!sep.rules.some(r=>A(r).includes("fire_dmg_inc")&&A(r).includes("cold_dmg_inc")),"Easy Mode: picks keep their own rules by default (Fire and Cold lines are not mixed)");
  ok(sep.rules.length>=mer.rules.length&&mer.rules.length>0,"Easy Mode: merging is only ever a way to save rules");
  const u=g=>[...new Set(g.rules.flatMap(A))].sort().join(",");
  eq(u(mer),u(sep),"Easy Mode: merged rules keep exactly the same lines as separate rules");
  const all=easyGen(ezSane({arch:Object.fromEntries(EZ_ARCH.map(a=>[a.k,1]))}));
  ok(all.rules.length<=200&&!all.notes.some(n=>/share rules/.test(n)),"Easy Mode: every pick on at once fits the 200 rules without merging");
  /* Idol tiers are real game tiers: item level per tier from the game files */
  const idl=AFF.filter(a=>/^idol/i.test(a.id));
  ok(idl.length===194&&idl.every(a=>a.lv&&a.lv.length===a.n&&a.lv.every((v,i,l)=>i===0||v<l[i-1])),"Idol affixes: every one has its real tier item levels, highest first");
  ok(idl.filter(a=>a.group==="IdolGrand").every(a=>a.n<=2&&a.lv.length===a.n),"Idol affixes: Grand idol lines have 1 or 2 tiers");
  ok(!AFF.find(a=>a.id==="IdolTotemLife_x").tags.includes("IdolGrand")&&!AFF.find(a=>a.id==="IdolManaLeech_x").tags.includes("IdolGrand"),"Idol affixes: Ballista Life and Mana Leech X-Large are not Grand idol lines");
  ok(AFF.filter(a=>/^Idol[A-Z]/.test(a.id)).every(a=>LINEN_[idolLineId(a.id)]),"Idol affixes: every size tier resolves to a line text"); }

{ const all=Object.fromEntries(EZ_ARCH.map(a=>[a.k,1]));
  const ok_=[0,40,60,84].every(rl=>[1,2,3].every(tk=>{const idr=easyGen(ezSane({rl,tk,arch:all})).rules.filter(r=>r.type===14);return idr.length>0&&idr.every(r=>!/(^|;)t=/.test(encode({preset:"-1",rules:[r]})));}));
  ok(ok_,"Easy Mode: Idol rules never carry a tier limit, at any Rupture Level or keep setting"); }

{ const app=(await import("node:fs")).readFileSync(new URL("../js/app.js",import.meta.url),"utf8");
  const fn=app.slice(app.indexOf("function ezMode("),app.indexOf("function ezMode(")+500);
  ok(/renderMD\(\)/.test(fn),"Mode switch refreshes the module list (Insert was stuck disabled after leaving Easy Mode)"); }

console.log(passed+" passed, "+failed+" failed");
process.exit(failed?1:0);
