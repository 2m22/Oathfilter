/* Plain Node tests, no dependencies:  node tests/run.mjs
   Covers the 200 rule limit: encode / decode round trip, the limit warning, matching with a full rule list. */
import {MAX_RULES,encode,decode,matches,genItem,newRule,GAME_PRESETS,COPY} from "../js/filter-engine.js";

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

console.log(passed+" passed, "+failed+" failed");
process.exit(failed?1:0);
