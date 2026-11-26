/* Build import measurement (not part of run.mjs): current bzRules vs. the B+ draft (Build pill in the Easy generator, prototyped here by adding a group to EZ_ARCH). Run: node tests/bz-measure.mjs. Ground truth: a rare of a type the build wears with at least 2 of that type's core lines good enough (Leveling: best droppable tier at its item level +1, Endgame: item level 75+ and build tier +1, Uber: item level 82+ and T1). Random samples, numbers move by a few percent per run. */
import * as m from "../js/filter-engine.js";
import fs from "fs";
const {LINEN,LINE_IDS,bzType,bzRules,easyGen,ezPreset,matches,genItem,mval,mset,mlist,msetList,newRule,rulesIssues,ezThr,bzPicks}=m;
const DIR=new URL("./fixtures/builds/",import.meta.url).pathname;
const filler=id=>/\b(strength|dexterity|intelligence|attributes?|resistances?|regenerat)/i.test(LINEN[id]||"");
const lab=raw=>LINEN[raw]||LINEN[raw.replace(/^riven95_/,"")];
function parse(bd){const byT=new Map(),best=new Map(),freq=new Map();
 bd.items.forEach(it=>{if(it.unique)return;const t=bzType(it.base);(it.affixes||[]).forEach(a=>{const l=lab(a.id);if(!l)return;const id=(LINE_IDS[l]||[])[0]||a.id;
  if(!byT.has(t))byT.set(t,new Map());byT.get(t).set(l,Math.min(byT.get(t).get(l)||9,a.tier));best.set(id,Math.min(best.get(id)||9,a.tier));freq.set(id,(freq.get(id)||0)+1);});});
 return{byT,best,freq};}
/* ground truth: rare of a build item type with >=2 of that type's core lines (by text) good enough */
function gt(p,mode,it){if(it.rar!=="R")return false;const t=bzType(it.baseId),want=p.byT.get(t);if(!want)return false;
 if(mode==="endgame"&&it.lvl<75)return false;if(mode==="uber"&&it.lvl<82)return false;
 let n=0;for(const md of it.mods){const l=md.lineLabel;if(!want.has(l))continue;const id=(LINE_IDS[l]||[])[0];if(filler(id))continue;
  const cap=mode==="leveling"?ezThr(id,it.lvl,2)||8:mode==="endgame"?want.get(l)+1:1;if(md.tier<=cap)n++;}
 return n>=2;}
/* pools */
const rr=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const gen=(lo,hi,cls)=>genItem({cls,lvl:rr(lo,hi)});
/* noise pools: unbiased rares (Leveling all item levels, Endgame 75-84, Uber 82-84) */
const NZ={leveling:[],endgame:[],uber:[]};
while(NZ.leveling.length<12000){const it=genItem();if(it.rar==="R"&&it.kind!=="idol")NZ.leveling.push(it);}
while(NZ.endgame.length<8000){const it=gen(75,84,"raremid");if(it.kind!=="idol")NZ.endgame.push(it);}
while(NZ.uber.length<8000){const it=gen(82,84,"raremid");if(it.kind!=="idol")NZ.uber.push(it);}
const LV={leveling:[1,84],endgame:[75,84],uber:[82,84]};
function recallPool(p,mode){const out=[],ts=new Set(p.byT.keys());let g=0;
 while(out.length<4000&&g<400000){g++;const it=gen(LV[mode][0],LV[mode][1],Math.random()<.6?"raremid":Math.random()<.7?"raredecent":"rarevaluable");if(it.kind!=="idol"&&ts.has(bzType(it.baseId)))out.push(it);}
 return out;}
const nArch=m.EZ_ARCH.length;
function bplus(p,mode,opt){
 m.EZ_ARCH.splice(0,m.EZ_ARCH.length-nArch);
 const core=[...p.best.keys()].filter(id=>!filler(id)&&m.EZ_LINEIDS.has(id));
 const arch={};
 if(opt.loose&&mode==="endgame"){const by=new Map();core.forEach(id=>{const k=p.best.get(id);if(!by.has(k))by.set(k,[]);by.get(k).push(id);});
   [...by.entries()].sort((a,b)=>a[0]-b[0]).forEach(([k,ids],i)=>{m.EZ_ARCH.splice(i,0,{k:"build"+k,n:"Build T"+k,col:4,ids,idol:[],_tk:k});arch["build"+k]=1;});}
 else{m.EZ_ARCH.unshift({k:"build",n:"Build",col:4,ids:core,idol:[]});arch.build=1;}
 const g=easyGen(ezPreset(mode,{arch}));let R=g.rules;
 const isB=r=>/^Build/.test(r.name)&&mlist(r,"a").length;
 if(opt.loose&&mode==="endgame")R.forEach(r=>{const mt=/^Build T(\d)/.exec(r.name);if(mt&&mlist(r,"a").length){const k=+mt[1],t=+mval(r,"t")||0;if(t&&t<k+1)mset(r,"t",String(Math.min(8,k+1)));}});
 if(opt.n2)R.forEach(r=>{if(isB(r)&&mlist(r,"a").length>=2)mset(r,"n","2");});
 if(opt.combo){const ids=[...p.freq.entries()].filter(([id])=>m.EZ_LINEIDS.has(id)).sort((a,b)=>b[1]-a[1]).slice(0,6).map(x=>x[0]);
   const c=newRule({type:0,rarity:4,action:1,colour:4});c.name="Build good";msetList(c,"a",ids);mset(c,"n","3");
   const gi=R.findIndex(r=>/^(Gnome-made|Ashen) Rares/.test(r.name));R.splice(gi<0?R.length:gi,0,c);}
 m.EZ_ARCH.splice(0,m.EZ_ARCH.length-nArch);
 return{rules:R,notes:g.notes};}
const first=(rules,it)=>{for(const r of rules)if(r.on!==0&&matches(r,it))return r;return null;};
function run(p,mode,rules,RP){let G=0,gv=0,gh=0,N=0,nv=0,nh=0,ga=0,gas=0;
 for(const it of RP){if(!gt(p,mode,it))continue;G++;const r=first(rules,it),a=r?r.action:1;if(a!==0&&a!==4)gv++;if((a===2||a===3)&&/^Build/.test(r.name))gh++;}
 for(const it of NZ[mode]){if(gt(p,mode,it))continue;N++;const r=first(rules,it),a=r?r.action:1;if(a!==0&&a!==4)nv++;if((a===2||a===3)&&r&&/^Build/.test(r.name))nh++;
  if(/^(ash_|gm_)/i.test(it.baseId)){ga++;if(a!==0&&a!==4)gas++;}}
 const pc=(a,b)=>b?Math.round(a*1000/b)/10:"-";
 return{G,recVis:pc(gv,G),recHl:pc(gh,G),noiseVis:pc(nv,N),noiseHl:pc(nh,N),ashen:ga?pc(gas,ga):"-"};}
const out=[];
for(const f of fs.readdirSync(DIR).sort()){const bd=JSON.parse(fs.readFileSync(DIR+f));const p=parse(bd);
 const cur={};for(const mode of ["leveling","endgame","uber"])cur[mode]=bzRules(bd,{mode,hide:true});
 const picks=bzPicks(bd).map(x=>x.k+":"+x.score).join(" ");
 const nb=new Set(bd.items.filter(i=>!i.unique).map(i=>i.base)).size;
 console.log("\n## "+f.replace(".json","")+"  rare items "+bd.items.filter(i=>!i.unique).length+", types "+p.byT.size+", distinct bases "+nb+", notes: "+cur.leveling.notes.join(" ")+"\n   bzPicks: "+picks);
 for(const mode of ["leveling","endgame","uber"]){
  const RP=recallPool(p,mode);
  const V={"CUR bzRules":cur[mode],"B+":bplus(p,mode,{}),"B+ n=2":bplus(p,mode,{n2:1}),"B+ combo":bplus(p,mode,{combo:1})};
  if(mode==="endgame"){V["B+ loose"]=bplus(p,mode,{loose:1});V["B+ loose n2"]=bplus(p,mode,{loose:1,n2:1});}
  for(const [k,v] of Object.entries(V)){const iss=rulesIssues(v.rules).filter(x=>x.level==="error").length,fb=(v.notes||[]).some(x=>/share rules|Too many/i.test(x));
   const r=run(p,mode,v.rules,RP);out.push({b:f,mode,k,rules:v.rules.length,iss,fb,...r});
   console.log("  "+mode.padEnd(8)+k.padEnd(12)+" rules "+String(v.rules.length).padStart(3)+(iss?" ERR"+iss:"")+(fb?" FALLBACK":"")+" | GT "+String(r.G).padStart(4)+" vis "+String(r.recVis).padStart(5)+"% hl "+String(r.recHl).padStart(5)+"% | noise vis "+String(r.noiseVis).padStart(5)+"% build-hl "+String(r.noiseHl).padStart(5)+"%"+(r.ashen!==100?" ASHEN "+r.ashen:""));}}}

