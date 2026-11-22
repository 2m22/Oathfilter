/* Plain Node tests, no dependencies:  node tests/run.mjs
   Covers the 200 rule limit: encode / decode round trip, the limit warning, matching with a full rule list. */
import {MAX_RULES,encode,decode,matches,genItem,newRule,GAME_PRESETS,COPY,defOf,T,LINEN,mlist as mlistT,setF,bumpRev,evaluate,easyGen,ezSane,MORE_ORDER,mset,fixAn,DATA_BUILD,LINEMAP,mval} from "../js/filter-engine.js";

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
  ok(!matches(decode(base+"1,17,0,0,0,4,0,0,0,255,3:t=1").filter.rules[0],gem),"assumption: a Gems rule with extra conditions does not match gems");
  eq(encode(decode(base+"1,17,0,0,0,4,0,0,0,255").filter),base+"1,17,0,0,0,4,0,0,0,255","Gems + Sell with any rarity round trips (game export, 22.11.2026)");
  eq(encode(decode(base+"1,17,4,0,0,4,0,0,0,255").filter),base+"1,17,4,0,0,4,0,0,0,255","game export of a Gems Sell rule (22.11.2026, rarity field was 4 = Rare) round trips");
}
/* ---- Vow effect: group in the HAS A LINE names (exe order after Cooldown recovery); the number 27 is inferred, not seen in an export ---- */
{
  eq(T.line.find(o=>o[0]===27)[1],"Vow effect","line group 27 is Vow effect");eq(LINEMAP.VowEffect98.join(),"27","the Vow effect affix group maps to line group 27");
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
  const SEEN=[["b","a"],["a","all"],["a","an"],["an","na"],["na","t"],["a","nb"],["nr","rn"],["t","k"],["k","n"],["n","d"],["t","n"],["n","i"]];
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
eq(DATA_BUILD.build,87,"data build is 87");eq(DATA_BUILD.apiChecked,85,"public API was last checked at build 85");
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

console.log(passed+" passed, "+failed+" failed");
process.exit(failed?1:0);
