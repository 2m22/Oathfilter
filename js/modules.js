/* Module library (no DOM, no Vue): built-in modules, auto-split to the Patch 87 list limits, pre-insert check, Sell caution, custom module helpers.
   Names (module, rule, author) live only in app storage and share files, never in the BOFILTER code. */
import {MAXL,MAX_RULES,NAME_MAX,ARM_N,BASE_BY_ID,BASEN,REDN,LINEN,RAR,LEVEL,T,newRule,mset,mval,mlist,msetList,mrng,hasRaw,encode,decode,uid,redIdOf} from "./filter-engine.js";

/* does an earlier active rule catch at least everything this rule catches? (same reading as the drop test) */
export const TYPE_KIDS={1:[18,19,20,21,22,23,24,25,26,27,28,29,30,31,32],2:[5,6,7,8],3:[10,11,12]};
/* true when every item that passes rule b's MORE options also passes rule a's (so a's options cannot exclude anything b would take) */
export function moreImplies(a,b){
  if(!a.m.length)return true;
  if(hasRaw(a)||hasRaw(b)||mval(a,"rt")||mval(b,"rt"))return false;
  const N=(r,k)=>+mval(r,k)||0;
  const ta=N(a,"t"),na=N(a,"n"),tb=N(b,"t"),nb=N(b,"n");
  if(ta||na){
    const need=Math.max(1,na);
    if(ta){if(!(tb&&tb<=ta&&Math.max(1,nb)>=need))return false;}
    else if(!(Math.max(1,nb)>=need||(!b.line&&!b.quality&&b.count+1>=need)))return false; /* any tier: b needs at least as many lines */
  }
  if(N(a,"s")&&N(b,"s")<N(a,"s"))return false;
  for(const k of ["i","q"]){
    const[al,ah]=mrng(a,k),[bl,bh]=mrng(b,k);
    if(al&&bl<al)return false;
    if(ah&&!(bh&&bh<=ah))return false;
  }
  if(N(a,"g")&&N(b,"g")<N(a,"g"))return false;
  if(N(a,"gx")&&!(N(b,"gx")&&N(b,"gx")<=N(a,"gx")))return false;
  const ra=N(a,"r"),rb=N(b,"r");if(ra===1&&rb<1)return false;if(ra===2&&rb!==2)return false;
  const ua=N(a,"u");if(ua&&N(b,"u")!==ua)return false;
  for(const k of ["b","rn"]){const A=mlist(a,k),B=mlist(b,k);if(A.length&&!(B.length&&B.every(x=>A.includes(x))))return false;}
  {const A=mlist(a,"a"),B=mlist(b,"a");
    if(A.length){
      const allA=mval(a,"all")==="1"||A.length===1,allB=mval(b,"all")==="1"||B.length===1;
      if(!B.length)return false;
      if(allA){if(!(allB&&A.every(x=>B.includes(x))))return false;}                 /* a needs every line: b must need at least those */
      else if(allB){if(!B.some(x=>A.includes(x)))return false;}                     /* a needs one of A: b needs all of B, one of them is in A */
      else if(!B.every(x=>A.includes(x)))return false;                              /* both "any": every line b accepts must be accepted by a */
    }}
  return true;
}
/* Patch 87 keys: a rule that uses d, k, na, nb, nr or an is never reported as covering another rule (not provable here) */
const NEWKEYS=["d","k","na","nb","nr","an"];
export function covers(a,b){
  if(!a.on||!b.on)return false;
  if(NEWKEYS.some(k=>mval(a,k)!==""))return false;if((mval(b,"nb")==="1"&&mlist(a,"b").length)||(mval(b,"nr")==="1"&&mlist(a,"rn").length))return false;if(!moreImplies(a,b))return false;
  const ra=RAR[a.rarity],rb=RAR[b.rarity];if(!ra||!rb||![...rb].every(c=>ra.includes(c)))return false;
  if(!((a.type===0&&b.type!==14)||a.type===b.type||(TYPE_KIDS[a.type]||[]).includes(b.type)))return false;
  const la=LEVEL[a.level],lb=LEVEL[b.level];if(!la||!lb||la[0]>lb[0]||la[1]<lb[1])return false;
  return (a.line===0||a.line===b.line)&&a.quality<=b.quality&&a.count<=b.count;
}

/* ---------- auto-split to the per-rule list limits ---------- */
/* Lists that are "any of them" (b, rn, a) can be cut into several rules with the same action: the first matching rule wins, so the result is the same.
   Not split (the cut would change the meaning, so the rule is kept as it is and reported): an=N and all=1 (a rule needs several lines of one list), nb / nr (none of these, the lists are AND-ed),
   and na (not these lines, every line must be absent from the same rule). */
const SPLIT_KEYS=["b","rn","a"];
const KEY_WORD={b:"bases",rn:"reds",a:"named lines",na:"not-these lines"};
export function ruleIssues(r){
  const out=[];
  if((mval(r,"nb")==="1"||mval(r,"nr")==="1")&&(mval(r,"all")==="1"||mval(r,"an")!==""))out.push({code:"neg-all",text:"None of these (nb / nr) cannot be combined with All of them or Any N of them."});
  Object.keys(MAXL).forEach(k=>{const n=mlist(r,k).length;if(n>MAXL[k])out.push({code:"limit-"+k,key:k,text:n+" "+KEY_WORD[k]+" in one rule, the limit is "+MAXL[k]+"."});});
  return out;
}
const chunk=(a,n)=>{const o=[];for(let i=0;i<a.length;i+=n)o.push(a.slice(i,i+n));return o;};
const cloneRule=r=>JSON.parse(JSON.stringify(r));
/* returns {rules, notes}: one rule in, one or more rules out (the same rule when nothing is over a limit or the rule cannot be cut) */
export function splitRule(r){
  const notes=[],over=Object.keys(MAXL).filter(k=>mlist(r,k).length>MAXL[k]);
  if(!over.length)return {rules:[r],notes};
  const label=r.name||"A rule";
  const blocked=mval(r,"an")!==""||mval(r,"all")==="1"||mval(r,"nb")==="1"||mval(r,"nr")==="1"||over.includes("na");
  if(blocked){
    notes.push(label+": "+over.map(k=>mlist(r,k).length+" "+KEY_WORD[k]+" (limit "+MAXL[k]+")").join(", ")+" cannot be split without changing what the rule does. Reduce the list or make several rules yourself.");
    return {rules:[r],notes};
  }
  let parts=[{}];
  SPLIT_KEYS.forEach(k=>{const l=mlist(r,k);if(l.length<=MAXL[k]){return;}const ch=chunk(l,MAXL[k]);parts=parts.flatMap(p=>ch.map(c=>Object.assign({},p,{[k]:c})));});
  if(parts.length>MAX_RULES){notes.push(label+": splitting would need "+parts.length+" rules.");return {rules:[r],notes};}
  const rules=parts.map((p,i)=>{const c=cloneRule(r);Object.keys(p).forEach(k=>msetList(c,k,p[k]));if(c.name)c.name=(c.name.slice(0,Math.max(0,NAME_MAX-6))+" "+(i+1)+"/"+parts.length).slice(0,NAME_MAX);if(c.id)c.id=uid();return c;});
  notes.push(label+" was split into "+rules.length+" rules to stay within the list limits.");
  return {rules,notes};
}
export function fitRules(rules){const out=[],notes=[];rules.forEach(r=>{const s=splitRule(r);out.push(...s.rules);notes.push(...s.notes);});return {rules:out,notes};}

/* ---------- Sell + Caution ---------- */
export const CAUTION={
  base:"Sell sells matching items automatically when they land. A broad or misordered rule can sell items, bases or rolls you wanted, and a sold item is gone.",
  normal:"Sell Normal gear: every Normal piece that reaches this rule is sold, including good bases for crafting.",
  magic:"Sell Magic gear: every Magic piece that reaches this rule is sold, including magic items with a good roll.",
  normalmagic:"Sell Normal and Magic gear: every Normal and Magic piece that reaches this rule is sold.",
  custom:"A custom Sell rule sells everything it matches. Put it below your Show and Highlight rules and check it in the Drop Test.",
  gems:"Sell gems: every gem is sold when it lands, also the ones you could still use."};
/* what kind of Sell rule is this? null when the rule does not sell */
export function sellKind(r){
  if(!r||r.action!==4||r.on===0)return null;
  if(r.type===17)return "gems";
  const bare=!r.line&&!r.quality&&!r.count&&!r.level&&!(r.m&&r.m.length);
  if(r.type===0&&bare){if(r.rarity===1)return "normal";if(r.rarity===2)return "magic";if(r.rarity===3)return "normalmagic";}
  return "custom";
}
/* [{kind, rules:n, text}] for a list of rules (empty list = nothing to confirm) */
export function sellCaution(rules){
  const m=new Map();(rules||[]).forEach(r=>{const k=sellKind(r);if(k)m.set(k,(m.get(k)||0)+1);});
  return [...m.entries()].map(([kind,n])=>({kind,rules:n,text:CAUTION[kind]}));
}
export const needsSellConfirm=rules=>sellCaution(rules).length>0;

/* ---------- pre-insert check ---------- */
export function placeAt(existing,pos,curId){
  if(typeof pos==="number")return Math.max(0,Math.min(existing.length,Math.floor(pos)||0));
  if(pos==="top")return 0;
  if(pos==="after"){const i=existing.findIndex(r=>r.id===curId);if(i>=0)return i+1;}
  return existing.length;
}
export function insertCheck(existing,incoming,pos="end",curId=null){
  const at=placeAt(existing,pos,curId),total=existing.length+incoming.length;
  const combined=existing.slice(0,at).concat(incoming,existing.slice(at));
  const shadowed=[],shadows=[];
  incoming.forEach((r,i)=>{const idx=at+i;for(let k=0;k<idx;k++)if(covers(combined[k],r)){shadowed.push({rule:i,by:k,byNew:k>=at});break;}});
  existing.slice(at).forEach((r,j)=>{const idx=at+incoming.length+j;for(let k=at;k<at+incoming.length;k++)if(covers(combined[k],r)){shadows.push({rule:at+j,by:k-at});break;}});
  const issues=incoming.flatMap((r,i)=>ruleIssues(r).map(x=>Object.assign({rule:i},x)));
  return {added:incoming.length,total,max:MAX_RULES,over:total>MAX_RULES,at,shadowed,shadows,issues,sell:sellCaution(incoming)};
}

/* ---------- built-in modules ---------- */
const R=(o,more,name)=>{const r=newRule(o);r.name=(name||"").slice(0,NAME_MAX);Object.keys(more||{}).forEach(k=>{if(Array.isArray(more[k]))msetList(r,k,more[k]);else mset(r,k,String(more[k]));});return r;};
const SLOTS=[["chest","Body armour"],["helm","Helms"],["gloves","Gloves"],["boots","Boots"]];
const FAMS=[["plate","Armour"],["leather","Evasion"],["silk","Energy Shield"],["brigandine","Armour + Evasion"],["chain","Armour + Energy Shield"],["ritual","Evasion + Energy Shield"]];
const armIds=(tiers,slots,fams)=>{const o=[];fams.forEach(([f])=>slots.forEach(([s])=>tiers.forEach(t=>{const id=f+"_"+s+"_"+ARM_N[t];if(BASE_BY_ID[id])o.push(id);})));return o;};
const TIER_IDX={t1:[8],t2:[7],t12:[8,7]}; /* ARM_N index: 8 = highest base (item level 82), 7 = next (68) */
const TIER_TXT={t1:"T1 (highest, item level 82)",t2:"T2 (item level 68)",t12:"T1 + T2 (item level 68 and 82)"};
const mods=[];
const add=(m)=>mods.push(m);
[["t1","T1"],["t2","T2"],["t12","T1 + T2"]].forEach(([tk,tn])=>{
  add({id:"arm-"+tk+"-all",name:"Armour bases "+tn+": all slots",cat:"Armour bases",tags:["armour","base tier",tk],desc:"Highlights the "+TIER_TXT[tk]+" armour bases of every slot and defence type. The list is split into several rules when it is longer than 12 bases.",pos:"top",
    build:()=>[R({action:2,colour:4},{b:armIds(TIER_IDX[tk],SLOTS,FAMS)},"Armour bases "+tn)]});
});
SLOTS.forEach(([s,sn])=>add({id:"arm-t1-"+s,name:"Armour bases T1: "+sn,cat:"Armour bases",tags:["armour","base tier","t1",s],desc:"Highlights the highest "+sn.toLowerCase()+" bases (item level 82) of all six defence types.",pos:"top",
  build:()=>[R({action:2,colour:4},{b:armIds([8],[[s]],FAMS)},sn+" bases T1")]}));
FAMS.forEach(([f,fn])=>add({id:"arm-t1-"+f,name:"Armour bases T1: "+fn,cat:"Armour bases",tags:["armour","base tier","t1",f],desc:"Highlights the highest "+fn+" bases (item level 82) of every slot.",pos:"top",
  build:()=>[R({action:2,colour:4},{b:armIds([8],SLOTS,[[f]])},fn+" bases T1")]}));
FAMS.forEach(([f,fn],i)=>add({id:"def-"+f,name:"Defence type: "+fn,cat:"Defence types",tags:["armour","defence",fn.toLowerCase()],desc:"Highlights Rare armour with the defence type "+fn+" (Defence type filter, value "+(({plate:1,leather:2,silk:3,brigandine:4,chain:5,ritual:6})[f])+").",pos:"top",
  build:()=>[R({type:2,rarity:4,action:2,colour:2},{d:({plate:1,leather:2,silk:3,brigandine:4,chain:5,ritual:6})[f]},fn+" armour")]}));
const CHASE_NEW=["u200_shard_of_the_fourth_spark","u200_mardoths_last_pebble"];
add({id:"chase-beam",name:"Chase reds: beam",cat:"Chase",tags:["chase","red","beam"],desc:"Every Chase red gets the beam and a red colour. Uses the game's Chase flag, so new Chase reds are covered without a list.",pos:"top",
  build:()=>[R({rarity:5,action:3,colour:5,sound:1},{r:2},"Chase reds")]});
add({id:"chase-gold",name:"Chase reds: gold beam + chime",cat:"Chase",tags:["chase","red","beam","sound"],desc:"Chase reds with a gold beam and the Chime sound.",pos:"top",
  build:()=>[R({rarity:5,action:3,colour:4,sound:1},{r:2},"Chase reds gold")]});
add({id:"chase-p87",name:"Chase reds: Patch 87 additions",cat:"Chase",tags:["chase","red","patch 87","shard of the fourth spark","mardoth's last pebble"],desc:"Shard of the Fourth Spark and Mardoth's Last Pebble, named in the rule, with a white beam and the Jewel sound.",pos:"top",
  build:()=>[R({rarity:5,action:3,colour:7,sound:3},{rn:CHASE_NEW.filter(id=>REDN[id])},"Patch 87 chase reds")]});
add({id:"red-all",name:"All reds: highlight",cat:"Chase",tags:["red","highlight"],desc:"Highlights every red (named unique) that is not Chase. Put it below the Chase module.",pos:"end",
  build:()=>[R({rarity:5,action:2,colour:5},{r:1},"Reds")]});
const SPELL=["spell_inc","cast_speed","skill_level","fire_spell_added","cold_spell_added","lightning_spell_added"];
const ATKFLAT=["fire_added_local","cold_added_local","lightning_added_local","attack_added_fire","attack_added_cold","attack_added_lightning"];
add({id:"caster-hide-attack",name:"Caster: hide attack flat damage",cat:"Caster & affixes",tags:["caster","spell","affix control","hide"],pos:"top",
  desc:"First rule keeps and highlights Rare gear with a spell line (Spell damage, Cast speed, Skill levels, Fire, Cold and Lightning Damage to Spells). The second rule hides the Rare gear that is left and has an attack flat damage line (Adds X to Y Fire, Cold, Lightning Damage, Adds Fire / Cold Attack Damage). Order matters: keep the pair together, highlight first.",
  build:()=>[R({rarity:4,action:2,colour:2},{a:SPELL},"Caster: keep spell lines"),R({rarity:4,action:0},{a:ATKFLAT},"Caster: hide attack flat")]});
[["cold","Cold","cold_dmg_inc","cold_spell_added","chill_effect","freeze_duration",2],["fire","Fire","fire_dmg_inc","fire_spell_added","fire_pen95_2h","",0],["lightning","Lightning","lightning_dmg_inc","lightning_spell_added","shock_chance","shock_effect",4]].forEach(([k,n,inc,sp,x1,x2,col])=>
  add({id:"caster-"+k,name:"Caster "+n+": highlight",cat:"Caster & affixes",tags:["caster","spell",k,"elemental"],pos:"top",desc:"Highlights Rare gear with "+n+" damage lines and the shared spell lines.",
    build:()=>[R({rarity:4,action:2,colour:col},{a:[inc,sp,"spell_inc","cast_speed","skill_level",x1].filter(Boolean)},"Caster "+n)]}));
add({id:"focus-t1-prefix",name:"Focus: two T1 prefixes",cat:"Caster & affixes",tags:["prefix","tier","affix control"],pos:"top",desc:"Highlights Rare gear with at least two prefix lines at T1 (Tier T1, Count lines of type Prefix, Lines 2+).",
  build:()=>[R({rarity:4,action:2,colour:4},{t:1,k:1,n:2},"Two T1 prefixes")]});
add({id:"focus-t1-suffix",name:"Focus: two T1 suffixes",cat:"Caster & affixes",tags:["suffix","tier","affix control"],pos:"top",desc:"Highlights Rare gear with at least two suffix lines at T1.",
  build:()=>[R({rarity:4,action:2,colour:4},{t:1,k:2,n:2},"Two T1 suffixes")]});
add({id:"focus-high-tier",name:"Focus: three lines T1-T2",cat:"Caster & affixes",tags:["tier","high tier","affix control"],pos:"top",desc:"Highlights Rare gear with at least three lines at T1 or T2 and adds the beam.",
  build:()=>[R({rarity:4,action:3,colour:4},{t:2,n:3},"Three lines T1-T2")]});
add({id:"bow-lines",name:"Bow & quiver: attack lines",cat:"Caster & affixes",tags:["bow","quiver","attack"],pos:"top",desc:"Highlights Rare bows and Rare quivers with attack speed, crit or physical lines.",
  build:()=>[R({type:18,rarity:4,action:2,colour:1},{a:["attack_speed_local","crit_local","crit_multi","phys_inc_local","phys_added_local","attack_added_phys"]},"Bow lines"),R({type:34,rarity:4,action:2,colour:1},{a:["attack_speed_local","crit_local","crit_multi","phys_added_local","attack_added_phys","attack_added_lightning"]},"Quiver lines")]});
add({id:"melee-lines",name:"Melee weapons: attack lines",cat:"Caster & affixes",tags:["melee","weapon","attack"],pos:"top",desc:"Highlights Rare weapons with physical, attack speed or crit lines.",
  build:()=>[R({type:1,rarity:4,action:2,colour:3},{a:["phys_inc_local","phys_added_local","attack_speed_local","crit_local","crit_multi","attack_added_phys"]},"Melee lines")]});
add({id:"runes-dwarven-hl",name:"Dwarven Runes: highlight",cat:"Runes & quivers",tags:["dwarven rune","rune"],pos:"top",desc:"Highlights every Dwarven Rune.",build:()=>[R({type:33,action:2,colour:4},{},"Dwarven Runes")]});
add({id:"runes-dwarven-beam",name:"Dwarven Runes: beam",cat:"Runes & quivers",tags:["dwarven rune","rune","beam"],pos:"top",desc:"Dwarven Runes with the beam and the Soft sound.",build:()=>[R({type:33,action:3,colour:4,sound:2},{},"Dwarven Runes beam")]});
add({id:"quiver-rare",name:"Quivers: highlight Rare",cat:"Runes & quivers",tags:["quiver"],pos:"top",desc:"Highlights Rare quivers.",build:()=>[R({type:34,rarity:4,action:2,colour:1},{},"Rare quivers")]});
add({id:"quiver-hide-nm",name:"Quivers: hide Normal and Magic",cat:"Runes & quivers",tags:["quiver","hide"],pos:"end",desc:"Hides Normal and Magic quivers. Put it below the quiver highlights.",build:()=>[R({type:34,rarity:3,action:0},{},"Hide weak quivers")]});
add({id:"gems-hide",name:"Gems: hide all",cat:"Gems",tags:["gem","hide"],pos:"end",desc:"Hides every gem (Type Gems, Rarity Any). The game only allows Gems rules with Rarity Any and no other condition.",build:()=>[R({type:17,action:0},{},"Hide gems")]});
add({id:"gems-sell",name:"Gems: sell all",cat:"Gems",tags:["gem","sell"],pos:"end",desc:"Sells every gem when it lands. Caution: a sold gem is gone.",build:()=>[R({type:17,action:4},{},"Sell gems")]});
const KEEP=()=>[R({type:13,action:3,colour:0},{},"Core-touched"),R({type:4,rarity:1,action:1},{},"Rune bases"),R({type:16,rarity:3,level:6,action:2,colour:0},{},"Truesworn bases")];
add({id:"trash-normal",name:"Cleanup: hide Normal gear",cat:"Cleanup",tags:["trash","hide","normal","strictness"],pos:"end",desc:"Light cleanup. Keeps Core-touched, Rune bases and Truesworn bases visible, then hides Normal gear. Currency, runes, gold, flasks and uniques are never hidden by the game.",build:()=>[...KEEP(),R({type:0,rarity:1,action:0},{},"Hide Normal gear")]});
add({id:"trash-nm",name:"Cleanup: hide Normal and Magic gear",cat:"Cleanup",tags:["trash","hide","magic","normal","strictness"],pos:"end",desc:"Keeps Core-touched, Rune bases and Truesworn bases, then hides Normal and Magic gear.",build:()=>[...KEEP(),R({type:0,rarity:3,action:0},{},"Hide Normal and Magic gear")]});
add({id:"trash-leveling",name:"Cleanup: leveling (below level 40)",cat:"Cleanup",tags:["trash","leveling","hide"],pos:"end",desc:"Hides Normal and Magic gear that dropped below item level 40, so early gear stays visible while you level.",build:()=>[...KEEP(),R({type:0,rarity:3,level:2,action:0},{},"Hide weak low-level gear")]});
add({id:"trash-mid",name:"Cleanup: mapping (hide Rare below 60)",cat:"Cleanup",tags:["trash","midgame","hide","rare"],pos:"end",desc:"Hides Normal and Magic gear and Rare gear below item level 60.",build:()=>[...KEEP(),R({type:0,rarity:3,action:0},{},"Hide Normal and Magic gear"),R({type:0,rarity:4,level:3,action:0},{},"Hide Rare below 60")]});
add({id:"trash-endgame",name:"Cleanup: endgame (hide Rare below 75)",cat:"Cleanup",tags:["trash","endgame","strict","hide","rare"],pos:"end",desc:"Hides Normal and Magic gear and Rare gear below item level 75. Strict: check the Drop Test first.",build:()=>[...KEEP(),R({type:0,rarity:3,action:0},{},"Hide Normal and Magic gear"),R({type:0,rarity:4,level:4,action:0},{},"Hide Rare below 75")]});
export const BUILTIN_CATS=["Armour bases","Defence types","Chase","Caster & affixes","Runes & quivers","Gems","Cleanup"];
export const BUILTIN=mods.map(m=>Object.assign({builtin:true},m));
export const builtinRules=m=>{const r=fitRules(m.build());r.rules.forEach(x=>{x.id=uid();});return r;};
export const moduleCode=rules=>encode({preset:"-1",rules});

/* ---------- search over modules (built-in and custom) ---------- */
const TXT=(k,v)=>{const o=(T[k]||[]).find(x=>x[0]===v);return o?o[1]:"";};
export function rulesText(rules){
  const o=[];(rules||[]).forEach(r=>{
    o.push(r.name||"",TXT("type",r.type),TXT("rarity",r.rarity),TXT("action",r.action));
    mlist(r,"b").forEach(id=>o.push(id,BASEN[id]||""));mlist(r,"rn").forEach(id=>o.push(id,REDN[id]||""));mlist(r,"a").forEach(id=>o.push(id,LINEN[id]||""));mlist(r,"na").forEach(id=>o.push(id,LINEN[id]||""));
    if(r.line)o.push(TXT("line",r.line));});
  return o.join(" ");
}
const cache=new Map();
export function moduleRules(m){
  if(m.builtin){if(!cache.has(m.id))cache.set(m.id,builtinRules(m).rules);return cache.get(m.id);}
  try{return decode(m.c).filter.rules;}catch(e){return [];}
}
export function moduleHay(m){
  const names=(m.n||[]).join(" ");
  return [m.name,m.desc,m.cat,(m.tags||[]).join(" "),names,rulesText(moduleRules(m))].join(" ").toLowerCase();
}
export function filterModules(list,query,cat,tag){
  const q=String(query||"").toLowerCase().split(/\s+/).filter(Boolean);
  return list.filter(m=>(!cat||m.cat===cat)&&(!tag||(m.tags||[]).includes(tag))&&q.every(w=>moduleHay(m).includes(w)));
}

/* ---------- custom modules ---------- */
export const CUSTOM_MAX=50;
/* optional free tags of a custom module: up to 8, lower case, 20 characters each */
export function cleanTags(v){
  const a=Array.isArray(v)?v:typeof v==="string"?v.split(","):[];
  return [...new Set(a.map(t=>String(t||"").trim().toLowerCase().slice(0,20)).filter(Boolean))].slice(0,8);
}
export function cleanModule(x){
  if(!x||typeof x.id!=="string"||typeof x.name!=="string"||typeof x.c!=="string")return null;
  const o={id:x.id,name:x.name.slice(0,40),c:x.c,n:Array.isArray(x.n)?x.n.map(v=>String(v||"").slice(0,NAME_MAX)):[],t:+x.t||0};
  if(typeof x.desc==="string"&&x.desc)o.desc=x.desc.slice(0,200);
  if(typeof x.cat==="string"&&x.cat)o.cat=x.cat.slice(0,30);
  const tg=cleanTags(x.tags);if(tg.length)o.tags=tg;
  return o;
}
export function uniqueName(list,base){
  const has=n=>list.some(x=>x.name.toLowerCase()===n.toLowerCase());
  let n=base.slice(0,40),i=2;while(has(n)){const suf=" "+i++;n=base.slice(0,40-suf.length)+suf;}return n;
}
export function duplicateModule(list,id){
  const x=list.find(y=>y.id===id);if(!x)return {err:"Module not found."};
  if(list.length>=CUSTOM_MAX)return {err:"You can keep up to "+CUSTOM_MAX+" modules. Delete one first."};
  const c=cleanModule(Object.assign({},x,{id:"m"+Date.now().toString(36)+uid().slice(0,3),name:uniqueName(list,x.name+" copy"),t:Date.now()}));
  return {list:[c].concat(list),module:c};
}
/* share file: names live here and in storage, never in the in-game code */
export const SHARE_TAG="oathfilter-module";
export const moduleToShare=x=>JSON.stringify({[SHARE_TAG]:1,name:x.name,desc:x.desc||"",cat:x.cat||"",tags:x.tags||[],c:x.c,n:x.n||[]});
export function moduleFromShare(text){
  let o;try{o=JSON.parse(String(text).trim());}catch(e){return {err:"This is not a module file."};}
  if(!o||o[SHARE_TAG]!==1||typeof o.c!=="string"||typeof o.name!=="string")return {err:"This is not a module file."};
  let d;try{d=decode(o.c);}catch(e){return {err:"The module code could not be read."};}
  if(!d.filter.rules.length)return {err:"The module has no rules."};
  return {module:cleanModule({id:"m"+Date.now().toString(36)+uid().slice(0,3),name:o.name,desc:o.desc,cat:o.cat,tags:o.tags,c:o.c,n:o.n,t:Date.now()}),rules:d.filter.rules.length};
}
