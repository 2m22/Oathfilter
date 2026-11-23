/* Module & Rule Organizer (Vue 3): a dark two-pane modal opened by the Modules button.
   Left pane = module library (built-in + own), right pane = the filter's rules in priority order.
   All logic lives in modules.js and filter-engine.js; this file only shows it and calls back into app.js through ctx.
   ctx: {F(), curId(), easy(), insert(rules,pos,name) pos = "top"|"after"|"end"|index, move(from,to), setOn(id,on) -> Promise, describe(rule) -> {title,sub,act,cls},
         replace(rules,name), caution(kinds) -> Promise<boolean>, toast(msg,bad), share(module), store:{all(),put(list),max}, storageMsg, copyBlocked,
         icon(name) -> html, opener() -> element to focus after closing}
   The styles are plain classes (.mdm*) in css/theme.css, so the modal also works when the Tailwind CDN is not reachable. */
import {encode,uid,MAX_RULES,mlist} from "./filter-engine.js";
import {BUILTIN,BUILTIN_CATS,builtinRules,moduleRules,fitRules,filterModules,insertCheck,sellCaution,CAUTION,cleanModule,cleanTags,uniqueName,duplicateModule,moduleToShare,moduleFromShare,CUSTOM_MAX} from "./modules.js";

const FOCUSABLE='a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
const focusables=root=>[...root.querySelectorAll(FOCUSABLE)].filter(e=>e.offsetParent!==null||e===document.activeElement);
const deep=o=>JSON.parse(JSON.stringify(o));
/* number of list entries (bases, lines, runes) a rule set names: the "how big is this module" number next to the rule count */
const entriesOf=rules=>rules.reduce((n,r)=>n+["b","rn","a","na"].reduce((m,k)=>m+mlist(r,k).length,0),0);

const TPL=`
<div v-if="open" class="mdm-back" data-mdui @mousedown.self="close">
 <div class="mdm" role="dialog" aria-modal="true" aria-labelledby="mdmT" tabindex="-1" ref="dlg" @keydown="onKey">
  <header class="mdm-head">
   <h2 id="mdmT" class="mdm-title">Module &amp; Rule Organizer</h2>
   <span class="mdm-count" :class="over?'bad':''" aria-label="Rules in your filter">{{ rules.length }} / {{ max }} rules</span>
   <button type="button" class="btn mdm-x" @click="close" aria-label="Close organizer (Escape)"><span v-html="icon('x')"></span><span>Close</span></button>
  </header>
  <p v-if="easy" class="callout mdm-note">Easy Mode builds its own rules. Switch to Advanced Mode to insert modules or move rules. You can still browse, save and share modules.</p>
  <p class="hint mdm-msg" role="status" aria-live="polite" :class="bad?'bad':''">{{ msg }}</p>
  <div class="mdm-body">

   <section class="mdm-pane" aria-labelledby="mdmL">
    <div class="mdm-ph"><h3 id="mdmL" class="mdm-h">Modules</h3>
     <div class="seg" role="group" aria-label="Module source">
      <button type="button" :aria-pressed="src==='all'" @click="src='all'">All ({{ all.length }})</button>
      <button type="button" :aria-pressed="src==='builtin'" @click="src='builtin'">Built-in ({{ builtin.length }})</button>
      <button type="button" :aria-pressed="src==='mine'" @click="src='mine'">Mine ({{ mine.length }})</button>
     </div></div>
    <details class="mdm-more">
     <summary><span>Create or import a module</span><span class="mdm-mchev" aria-hidden="true" v-html="icon('chevron-right')"></span></summary>
     <div class="mdm-edit">
      <span class="hint">Save rules of your filter ({{ rules.length }} now) as a module.</span>
      <div class="mdm-tools">
       <div class="mdm-f2"><label class="lab" for="mdName">Name</label><input id="mdName" class="field" type="text" maxlength="40" v-model="form.name" placeholder="e.g. Hide junk" autocomplete="off" @keydown.enter.prevent="save(false)"></div>
       <div class="mdm-f1"><label class="lab" for="mdFrom">From rule</label><input id="mdFrom" class="field" type="number" min="1" inputmode="numeric" v-model="form.from"></div>
       <div class="mdm-f1"><label class="lab" for="mdTo">To rule</label><input id="mdTo" class="field" type="number" min="1" inputmode="numeric" v-model="form.to"></div>
      </div>
      <div class="mdm-tools">
       <div class="mdm-f2"><label class="lab" for="mdDesc">Description (optional)</label><input id="mdDesc" class="field" type="text" maxlength="200" v-model="form.desc" autocomplete="off"></div>
       <div class="mdm-f1"><label class="lab" for="mdCatIn">Category (optional)</label><input id="mdCatIn" class="field" type="text" maxlength="30" v-model="form.cat" autocomplete="off"></div>
       <div class="mdm-f1"><label class="lab" for="mdTagIn">Tags (optional)</label><input id="mdTagIn" class="field" type="text" v-model="form.tags" placeholder="a, b, c" autocomplete="off"></div>
      </div>
      <div class="mdm-row"><button type="button" class="btn gold" id="mdSave" @click="save(false)">Save module</button><button type="button" class="btn" id="mdAll" @click="save(true)">Save all rules</button></div>
      <label class="lab" for="mdImp" style="margin-top:8px">Import a module</label>
      <textarea id="mdImp" class="field" rows="2" v-model="imp" placeholder="Paste a copied module here"></textarea>
      <div class="mdm-row"><button type="button" class="btn" @click="doImport">Import module</button></div>
     </div>
    </details>
    <div class="mdm-tools">
     <div class="mdm-f2"><label class="lab" for="mdQ">Search</label><input id="mdQ" ref="search" class="field" type="search" v-model="q" placeholder="Name, description, category, tag, base, line" autocomplete="off"></div>
     <div class="mdm-f1"><label class="lab" for="mdCat">Category</label><div class="selwrap"><select id="mdCat" v-model="cat"><option value="">All categories</option><option v-for="c in cats" :key="c" :value="c">{{ c }}</option></select></div></div>
    </div>
    <div v-if="tags.length" class="mdm-tags" role="group" aria-label="Filter by tag">
     <button v-for="t in tags" :key="t" type="button" class="mdm-tag" :aria-pressed="tag===t" @click="tag=tag===t?'':t">{{ t }}</button>
    </div>
    <div class="mdm-sum" role="status" aria-live="polite">
     <b>{{ sel.length }} module{{ sel.length===1?'':'s' }} · {{ plan.rules.length }} rule{{ plan.rules.length===1?'':'s' }}</b>
     <span class="mdm-sp"></span>
     <button type="button" class="btn mdm-sm" @click="toggleAll" :disabled="!shown.length" :aria-label="allFolded?'Expand all modules':'Collapse all modules'"><span class="mdm-chev" :class="{open:!allFolded}" aria-hidden="true" v-html="icon('chevron-right')"></span><span>{{ allFolded ? 'Expand all' : 'Collapse all' }}</span></button>
     <button type="button" class="btn mdm-sm" @click="selectShown" :disabled="!shown.length">Select shown</button>
     <button type="button" class="btn mdm-sm" @click="sel=[]" :disabled="!sel.length">Clear</button>
    </div>

    <ul class="mdm-list" id="mdList">
     <li v-if="!shown.length" class="hint mdm-empty">{{ all.length ? 'No module matches your search or filters.' : 'No modules yet.' }}</li>
     <li v-for="m in shown" :key="m.id" :data-md="m.id" class="mdm-card" :class="{sel:isSel(m.id),dragging:drag&&drag.kind==='mods'&&drag.ids.includes(m.id)}"
         @click="cardClick($event,m)" :draggable="!easy&&!mode[m.id]" @dragstart="dragMods($event,m)" @dragend="dragEnd">
      <div class="mdm-ch">
       <button type="button" class="mdm-ib mdm-fold" @click.stop="toggleFold(m.id)" :aria-expanded="!isFolded(m)" :aria-label="(isFolded(m)?'Expand ':'Collapse ')+m.name"><span class="mdm-chev" :class="{open:!isFolded(m)}" aria-hidden="true" v-html="icon('chevron-right')"></span></button>
       <input type="checkbox" class="mdm-chk" :checked="isSel(m.id)" @change="toggleSel(m.id)" :aria-label="'Select module '+m.name">
       <div class="mdm-cm">
        <b class="mdm-cn" :title="m.name">{{ m.name }}</b>
        <span class="hint">{{ info(m) }}</span>
       </div>
      </div>
      <template v-if="!isFolded(m)">
      <p v-if="m.desc" class="hint mdm-desc">{{ m.desc }}</p>
      <div class="mdm-badges">
       <span v-if="m.cat" class="mdm-badge">{{ m.cat }}</span>
       <span v-for="t in (m.tags||[])" :key="t" class="mdm-badge tag">{{ t }}</span>
       <span v-if="sellOf(m).length" class="mdm-badge warn">Contains Sell rules</span>
      </div>

      <template v-if="mode[m.id]==='ren'">
       <div class="mdm-edit">
        <input class="field" type="text" maxlength="40" v-model="edit.name" aria-label="Module name" @keydown.enter.prevent="saveEdit(m)">
        <input class="field" type="text" maxlength="200" v-model="edit.desc" aria-label="Description" placeholder="Description (optional)">
        <input class="field" type="text" maxlength="30" v-model="edit.cat" aria-label="Category" placeholder="Category (optional)">
        <input class="field" type="text" v-model="edit.tags" aria-label="Tags, separated by commas" placeholder="Tags, separated by commas (optional)">
        <div class="mdm-row"><button type="button" class="btn gold" @click="saveEdit(m)">Save</button><button type="button" class="btn" @click="mode={}">Cancel</button></div>
       </div>
      </template>
      <div v-else-if="mode[m.id]==='del'" class="mdm-row"><span class="hint">Delete this module?</span><button type="button" class="btn danger" @click="del(m)">Delete</button><button type="button" class="btn" @click="mode={}">Cancel</button></div>
      <div v-else-if="mode[m.id]==='rep'" class="mdm-row"><span class="hint">Replace all {{ rules.length }} rules of your filter?</span><button type="button" class="btn danger" @click="replace(m)">Replace filter</button><button type="button" class="btn" @click="mode={}">Cancel</button></div>
      <div v-else-if="mode[m.id]==='shr'" class="mdm-edit">
       <input class="field" type="text" readonly :value="shareUrl" aria-label="Share link" data-mdurl="1">
       <div class="mdm-row"><button type="button" class="btn" @click="copy(shareUrl,'Link copied.')">Copy link</button><button type="button" class="btn" @click="copy('[Oathfilter module]('+shareUrl+')','Discord link copied.')">Copy for Discord</button><button type="button" class="btn" @click="mode={}">Close</button></div>
      </div>
      <div v-else class="mdm-row">
       <button type="button" class="btn mdm-sm" :disabled="easy" :title="easy?'Advanced Mode only':'Insert this module at the insert point'" @click="insertIds([m.id])"><span v-html="icon('plus')"></span><span>Insert</span></button>
       <template v-if="!m.builtin">
        <button type="button" class="btn mdm-sm" @click="startEdit(m)">Edit</button>
        <button type="button" class="btn mdm-sm" @click="askReplace(m)">Replace filter</button>
        <button type="button" class="btn mdm-sm" @click="dup(m)">Duplicate</button>
        <button type="button" class="btn mdm-sm" @click="share(m)">Share</button>
        <button type="button" class="btn mdm-sm" @click="copy(fileOf(m),'Module copied. Paste it into Import module.')">Copy</button>
        <button type="button" class="btn mdm-sm danger" @click="mode={};mode[m.id]='del'">Delete</button>
       </template>
      </div>
      </template>
     </li>
    </ul>

   </section>

   <section class="mdm-pane mdm-drop" aria-labelledby="mdmR" @dragover="overRules" @dragleave="leaveRules" @drop="dropRules">
    <div class="mdm-ph"><h3 id="mdmR" class="mdm-h">Filter rules <span class="hint">first match wins</span></h3></div>
    <p v-if="!easy && rules.length>1" class="hint mdm-dndhint">Reorder: drag a row (on touch: press and hold), or use the arrow buttons.</p>
    <div class="mdm-ins">
     <div class="mdm-row">
      <span class="hint">Insert point:</span>
      <b class="mdm-where">{{ whereText }}</b>
      <span class="mdm-sp"></span>
      <button type="button" class="btn mdm-sm" @click="at=0">Top</button>
      <button type="button" class="btn mdm-sm" :disabled="curIdx<0" @click="at=curIdx+1">After selected</button>
      <button type="button" class="btn mdm-sm" @click="at=null">End</button>
      <label class="sr" for="mdAt">Insert before rule number</label>
      <input id="mdAt" class="field mdm-num" type="number" min="1" :max="rules.length+1" inputmode="numeric" :value="eff+1" @change="setAtNum($event.target.value)">
     </div>
     <button type="button" class="btn gold mdm-batch" id="mdBatch" :disabled="blocked" @click="insertIds(sel)">
      <span v-html="icon('layers')"></span><span>Insert {{ sel.length }} selected module{{ sel.length===1?'':'s' }} ({{ plan.rules.length }} rule{{ plan.rules.length===1?'':'s' }}) at insert point</span></button>
     <ul v-if="sel.length||easy" class="mdm-checks">
      <li v-if="easy" class="hint warn">Advanced Mode only.</li>
      <template v-else>
       <li class="hint" :class="over?'bad':''">Total after insert: <b>{{ check.total }} / {{ check.max }}</b>.<span v-if="over"> Delete {{ check.total-check.max }} rule{{ check.total-check.max===1?'':'s' }} first.</span></li>
       <li v-for="n in plan.notes" :key="n" class="hint">{{ n }}</li>
       <li v-for="s in check.issues" :key="s.rule+s.code" class="hint bad">Rule {{ s.rule+1 }} of the new block: {{ s.text }}</li>
       <li v-for="s in check.shadowed" :key="'s'+s.rule" class="hint warn">New rule {{ s.rule+1 }} would never be reached: {{ s.byNew?'an earlier new rule':'your rule '+(s.by+1) }} already catches everything it catches.</li>
       <li v-for="s in check.shadows" :key="'h'+s.rule" class="hint warn">Your rule {{ s.rule+1 }} would never be reached after this insert.</li>
       <li v-if="check.sell.length" class="hint warn">Contains Sell rules. You will be asked to confirm.</li>
      </template>
     </ul>
    </div>

    <ol class="mdm-rules" id="mdRules" aria-label="Rules in priority order">
     <li v-if="!rules.length" class="hint mdm-empty" :class="{drop:dropAt===0}">Your filter has no rules. Drag a module here or use the insert button.</li>
     <template v-for="(r,i) in rules" :key="r.id">
      <li class="mdm-gap" :class="{mark:eff===i&&!drag,drop:dropAt===i}" aria-hidden="true"><button type="button" tabindex="-1" class="mdm-gapb" @click="at=i" :title="'Insert before rule '+(i+1)"></button></li>
      <li class="mdm-rule" :class="{cur:r.id===curId,off:!r.on,dragging:drag&&drag.kind==='rule'&&drag.from===i}" :data-i="i" :data-rid="r.id" :draggable="!easy" @dragstart="dragRule($event,i)" @dragend="dragEnd">
       <span class="mdm-no">{{ i+1 }}</span>
       <span class="mdm-rt"><b :title="r.title">{{ r.title }}</b><span class="hint">{{ r.sub }}</span></span>
       <span class="mdm-act" :class="r.cls">{{ r.act }}</span>
       <button type="button" class="mdm-ib" :disabled="easy||i===0" @click="moveRule(i,i-1)" :aria-label="'Move rule '+(i+1)+' up'"><span aria-hidden="true" v-html="icon('arrow-up')"></span></button>
       <button type="button" class="mdm-ib" :disabled="easy||i===rules.length-1" @click="moveRule(i,i+1)" :aria-label="'Move rule '+(i+1)+' down'"><span aria-hidden="true" v-html="icon('arrow-down')"></span></button>
       <label class="mdm-on" :title="r.on?'Rule is active':'Rule is off'"><input type="checkbox" :checked="r.on" :disabled="easy" @change="toggleOn(r,$event)" :aria-label="'Rule '+(i+1)+' active'"><span class="sr">active</span></label>
      </li>
     </template>
     <li v-if="rules.length" class="mdm-gap end" :class="{mark:eff===rules.length&&!drag,drop:dropAt===rules.length}" aria-hidden="true"><button type="button" tabindex="-1" class="mdm-gapb" @click="at=null" title="Insert at the end"></button></li>
    </ol>
   </section>
  </div>
 </div>
</div>`;

export function mountModuleUi(Vue,ctx,el){
  const {createApp,ref,reactive,computed,watch,nextTick,onMounted,onUpdated}=Vue;
  let vmRef=null;
  /* Icons come from v-html as <i data-lucide> placeholders. Swap them right after every render (not a frame later) so no placeholder is ever visible, empty or stale. The icon strings stay constant (chevrons are rotated by CSS), so Vue never rewrites an already converted icon. */
  const swapIcons=()=>{try{if(window.lucide&&el.querySelector("i[data-lucide]"))window.lucide.createIcons();}catch(e){}};
  const app=createApp({
    template:TPL,
    setup(){
      const open=ref(false),src=ref("all"),q=ref(""),cat=ref(""),tag=ref(""),msg=ref(""),bad=ref(false),mode=ref({}),shareUrl=ref(""),imp=ref(""),tick=ref(0);
      const sel=ref([]),at=ref(null),drag=ref(null),dropAt=ref(-1),dlg=ref(null),search=ref(null);
      const form=reactive({name:"",from:"",to:"",desc:"",cat:"",tags:"",over:""}),edit=reactive({name:"",desc:"",cat:"",tags:""});
      let opener=null;
      onMounted(swapIcons);onUpdated(swapIcons);
      const say=(m,b)=>{msg.value=m;bad.value=!!b;};
      const icon=n=>ctx.icon?ctx.icon(n):"";
      const mine=computed(()=>{tick.value;return ctx.store.all().map(cleanModule).filter(Boolean).sort((a,b)=>a.name.localeCompare(b.name));});
      const all=computed(()=>BUILTIN.concat(mine.value));
      const easy=computed(()=>{tick.value;return ctx.easy();});
      const rules=computed(()=>{tick.value;return ctx.F().rules.map(r=>Object.assign({id:r.id,on:r.on!==0},ctx.describe(r)));});
      const curId=computed(()=>{tick.value;return ctx.curId();});
      const curIdx=computed(()=>rules.value.findIndex(r=>r.id===curId.value));
      const list=computed(()=>src.value==="builtin"?BUILTIN:src.value==="mine"?mine.value:all.value);
      const cats=computed(()=>{const s=new Set(list.value.map(m=>m.cat).filter(Boolean));return [...BUILTIN_CATS.filter(c=>s.has(c)),...[...s].filter(c=>!BUILTIN_CATS.includes(c)).sort()];});
      const tags=computed(()=>[...new Set(list.value.flatMap(m=>m.tags||[]))].sort());
      const shown=computed(()=>filterModules(list.value,q.value,cat.value,tag.value));
      watch(src,()=>{cat.value="";tag.value="";mode.value={};});
      const rulesOf=m=>m.builtin?builtinRules(m):fitRules(moduleRules(m).map(deep));
      const stat=new Map();
      const info=m=>{const k=m.id+"|"+(m.c||"");let s=stat.get(k);if(!s){const r=rulesOf(m).rules;s={n:r.length,e:entriesOf(r)};stat.set(k,s);}return s.n+" rule"+(s.n===1?"":"s")+(s.e?" · "+s.e+" list entr"+(s.e===1?"y":"ies"):"");};
      const sellOf=m=>sellCaution(moduleRules(m));
      /* the selected modules as one ordered block (selection order), split to the Patch 87 list limits */
      const plan=computed(()=>{
        const out=[],notes=[];
        sel.value.forEach(id=>{const m=all.value.find(x=>x.id===id);if(!m)return;const r=rulesOf(m);out.push(...r.rules.map(deep));notes.push(...r.notes);});
        return {rules:out,notes:[...new Set(notes)]};
      });
      const eff=computed(()=>{const n=rules.value.length;return at.value===null?n:Math.max(0,Math.min(n,at.value));});
      const whereText=computed(()=>{const n=rules.value.length;return eff.value>=n?(n?"after the last rule (end)":"empty filter"):eff.value===0?"top, before rule 1":"before rule "+(eff.value+1);});
      const check=computed(()=>{tick.value;return insertCheck(ctx.F().rules,plan.value.rules,eff.value,ctx.curId());});
      const over=computed(()=>(sel.value.length?check.value.total:rules.value.length)>MAX_RULES);
      /* nb / nr with all / an, or a list over its cap that cannot be cut (an = N) never goes into the filter */
      const blocked=computed(()=>easy.value||!sel.value.length||!plan.value.rules.length||check.value.over||check.value.issues.length>0);
      const isSel=id=>sel.value.includes(id);
      const toggleSel=id=>{sel.value=isSel(id)?sel.value.filter(x=>x!==id):[...sel.value,id];};
      /* a click anywhere on the card (not on its buttons or fields) ticks or unticks the module */
      const cardClick=(e,m)=>{if(e.target.closest&&e.target.closest("button,input,select,textarea,a,label,.mdm-edit"))return;if(mode.value[m.id])return;toggleSel(m.id);};
      /* fold state: ids of folded cards; a card with an open edit/delete/share form is always shown */
      const folded=ref([]);
      const isFolded=m=>folded.value.includes(m.id)&&!mode.value[m.id];
      const toggleFold=id=>{folded.value=folded.value.includes(id)?folded.value.filter(x=>x!==id):[...folded.value,id];};
      const allFolded=computed(()=>shown.value.length>0&&shown.value.every(m=>folded.value.includes(m.id)));
      const toggleAll=()=>{const ids=shown.value.map(m=>m.id);folded.value=allFolded.value?folded.value.filter(x=>!ids.includes(x)):[...new Set([...folded.value,...ids])];};
      const selectShown=()=>{const have=new Set(sel.value);sel.value=[...sel.value,...shown.value.map(m=>m.id).filter(id=>!have.has(id))];};
      const setAtNum=v=>{const n=parseInt(v,10);if(!(n>=1)){return;}at.value=Math.min(n-1,rules.value.length);};
      const refresh=()=>{tick.value++;if(!open.value)return;const n=rules.value.length;if(at.value!==null&&at.value>=n)at.value=null;sel.value=sel.value.filter(id=>all.value.some(m=>m.id===id));};

      /* ---- insert (button, drag and drop) ---- */
      const insertIds=async(ids,pos)=>{
        if(easy.value){say("Easy Mode builds its own rules. Switch to Advanced Mode to insert modules.",true);return;}
        const mods=ids.map(id=>all.value.find(m=>m.id===id)).filter(Boolean);
        if(!mods.length){say("Select at least one module first.",true);return;}
        const rs=[],notes=[];
        for(const m of mods){const r=rulesOf(m);if(!r.rules.length){say("“"+m.name+"” could not be read.",true);return;}rs.push(...r.rules.map(deep));notes.push(...r.notes);}
        const where=pos===undefined?eff.value:pos;
        const ck=insertCheck(ctx.F().rules,rs,where,ctx.curId());
        if(ck.over){say("The filter would have "+ck.total+" rules. The limit is "+MAX_RULES+". Delete "+(ck.total-MAX_RULES)+" rule"+(ck.total-MAX_RULES===1?"":"s")+" first.",true);return;}
        if(ck.issues.length){say("Rule "+(ck.issues[0].rule+1)+" of the new block: "+ck.issues[0].text,true);return;}
        if(ck.sell.length&&!(await ctx.caution(ck.sell.map(s=>s.kind))))return;
        const label=mods.length===1?mods[0].name:mods.length+" modules";
        if(ctx.insert(rs,where,label)){
          say("Inserted "+rs.length+" rule"+(rs.length===1?"":"s")+" as one block"+(mods.length===1?" from “"+mods[0].name+"”":" from "+mods.length+" modules")+".");
          at.value=at.value===null||where>=ctx.F().rules.length-rs.length?null:where+rs.length;
          if(ids.length===sel.value.length&&ids.every(x=>sel.value.includes(x)))sel.value=[];
          refresh();
        }
      };
      /* ---- drag and drop ---- */
      const dragMods=(e,m)=>{
        if(easy.value||!e.dataTransfer){e.preventDefault();return;}
        const ids=isSel(m.id)&&sel.value.length>1?sel.value.slice():[m.id];
        drag.value={kind:"mods",ids};e.dataTransfer.effectAllowed="copy";try{e.dataTransfer.setData("text/plain",ids.join(","));}catch(x){}
      };
      const dragRule=(e,i)=>{
        if(easy.value||!e.dataTransfer){e.preventDefault();return;}
        drag.value={kind:"rule",from:i};e.dataTransfer.effectAllowed="move";try{e.dataTransfer.setData("text/plain",String(i+1));}catch(x){}
      };
      const dragEnd=()=>{drag.value=null;dropAt.value=-1;};
      const overRules=e=>{
        if(!drag.value||easy.value)return;
        e.preventDefault();if(e.dataTransfer)e.dataTransfer.dropEffect=drag.value.kind==="rule"?"move":"copy";
        const li=e.target.closest&&e.target.closest("li.mdm-rule");
        if(li){const i=+li.dataset.i,b=li.getBoundingClientRect();dropAt.value=e.clientY<b.top+b.height/2?i:i+1;}
        else{const gap=e.target.closest&&e.target.closest("li.mdm-gap");if(gap&&gap.classList.contains("end"))dropAt.value=rules.value.length;else if(e.target===e.currentTarget||!gap)dropAt.value=rules.value.length;}
      };
      const leaveRules=e=>{if(!e.currentTarget.contains(e.relatedTarget))dropAt.value=-1;};
      const dropRules=e=>{
        e.preventDefault();const d=drag.value,g=dropAt.value;dragEnd();
        if(!d||g<0||easy.value)return;
        if(d.kind==="rule"){const to=d.from<g?g-1:g;if(to!==d.from)moveRule(d.from,to);}
        else insertIds(d.ids,g);
      };
      const moveRule=(from,to)=>{
        if(easy.value||to<0||to>=rules.value.length||from===to)return;
        if(ctx.move(from,to)){say("Moved rule "+(from+1)+" to position "+(to+1)+".");refresh();
        nextTick(()=>{const li=dlg.value&&dlg.value.querySelector('li[data-i="'+to+'"]');if(!li)return;const bs=[...li.querySelectorAll(".mdm-ib")],b=(to<from?bs[0]:bs[1]);const t=b&&!b.disabled?b:bs.find(x=>!x.disabled);if(t)t.focus({preventScroll:true});});}
      };
      const toggleOn=async(r,e)=>{
        const want=e.target.checked;e.target.checked=r.on;
        const ok=await ctx.setOn(r.id,want);
        if(ok)say("Rule "+(rules.value.findIndex(x=>x.id===r.id)+1)+(want?" is active.":" is off."));
        refresh();
      };

      /* ---- custom module management ---- */
      const askReplace=m=>{mode.value={};if(!ctx.F().rules.length){replace(m);return;}mode.value={[m.id]:"rep"};};
      const replace=async m=>{
        const r=rulesOf(m).rules;if(!r.length){say("This module could not be read.",true);return;}
        const k=sellCaution(r);if(k.length&&!(await ctx.caution(k.map(s=>s.kind))))return;
        ctx.replace(deep(r),m.name);mode.value={};say("Replaced your filter with “"+m.name+"”.");refresh();
      };
      const save=all0=>{
        const rs=ctx.F().rules,n=rs.length,name=form.name.trim().slice(0,40);
        if(!name){say("Give the module a name first.",true);return;}
        if(!n){say("There are no rules to save.",true);return;}
        let a=parseInt(form.from,10),b=parseInt(form.to,10);
        if(all0){a=1;b=n;}else{const cur=rs.findIndex(r=>r.id===ctx.curId())+1;if(!a)a=cur;if(!b)b=a;}
        if(!(a>=1)||b<a||b>n){say("Choose rule numbers from 1 to "+n+", with “From” not above “To”.",true);return;}
        const list0=ctx.store.all().map(cleanModule).filter(Boolean),i=list0.findIndex(x=>x.name.toLowerCase()===name.toLowerCase());
        if(i>=0&&form.over!==name.toLowerCase()){form.over=name.toLowerCase();say("“"+list0[i].name+"” already exists. Save again to overwrite it.");return;}
        if(i<0&&list0.length>=CUSTOM_MAX){say("You can keep up to "+CUSTOM_MAX+" modules. Delete one first.",true);return;}
        const sel0=rs.slice(a-1,b),old=i>=0?list0[i]:null;
        const rec=cleanModule({id:old?old.id:"m"+Date.now().toString(36)+uid().slice(0,3),name:old?old.name:name,c:encode({preset:"-1",rules:sel0}),n:sel0.map(r=>r.name||""),t:Date.now(),desc:form.desc.trim()||(old&&old.desc)||"",cat:form.cat.trim()||(old&&old.cat)||"",tags:form.tags.trim()?cleanTags(form.tags):(old&&old.tags)||[]});
        if(old)list0[i]=rec;else list0.unshift(rec);
        if(!ctx.store.put(list0)){say(ctx.storageMsg,true);return;}
        form.over="";say((old?"Updated “":"Saved “")+rec.name+"” ("+sel0.length+" rule"+(sel0.length===1?"":"s")+").");form.name=form.from=form.to=form.desc=form.cat=form.tags="";refresh();
      };
      const startEdit=m=>{mode.value={[m.id]:"ren"};edit.name=m.name;edit.desc=m.desc||"";edit.cat=m.cat||"";edit.tags=(m.tags||[]).join(", ");};
      const saveEdit=m=>{
        const nn=edit.name.trim().slice(0,40);if(!nn){say("Give the module a name.",true);return;}
        const list0=ctx.store.all().map(cleanModule).filter(Boolean);
        if(list0.some(y=>y.id!==m.id&&y.name.toLowerCase()===nn.toLowerCase())){say("Another module is already called “"+nn+"”.",true);return;}
        const x=list0.find(y=>y.id===m.id);if(!x)return;x.name=nn;x.desc=edit.desc.trim().slice(0,200);x.cat=edit.cat.trim().slice(0,30);
        const tg=cleanTags(edit.tags);if(tg.length)x.tags=tg;else delete x.tags;
        if(!x.desc)delete x.desc;if(!x.cat)delete x.cat;
        if(!ctx.store.put(list0)){say(ctx.storageMsg,true);return;}mode.value={};say("Saved.");refresh();
      };
      const del=m=>{const r=ctx.store.all().filter(y=>y.id!==m.id);mode.value={};if(ctx.store.put(r)){sel.value=sel.value.filter(x=>x!==m.id);say("Deleted “"+m.name+"”.");refresh();}else say("Could not delete (browser storage error).",true);};
      const dup=m=>{const r=duplicateModule(ctx.store.all().map(cleanModule).filter(Boolean),m.id);if(r.err){say(r.err,true);return;}if(!ctx.store.put(r.list)){say(ctx.storageMsg,true);return;}say("Duplicated as “"+r.module.name+"”.");refresh();};
      const fileOf=m=>moduleToShare(m);
      const copy=async(txt,ok)=>{try{await navigator.clipboard.writeText(txt);say(ok);}catch(e){say(ctx.copyBlocked,true);}};
      const share=async m=>{say("Creating link…");const r=await ctx.share(m);if(!r){say("The link could not be created.",true);return;}shareUrl.value=r.url;mode.value={[m.id]:"shr"};say(r.offline?"Offline link created. It works without the service"+(r.url.length>1800?", but it is long and Discord may cut it.":"."):"Link created.");};
      const doImport=()=>{
        const r=moduleFromShare(imp.value);if(r.err){say(r.err,true);return;}
        const list0=ctx.store.all().map(cleanModule).filter(Boolean);if(list0.length>=CUSTOM_MAX){say("You can keep up to "+CUSTOM_MAX+" modules. Delete one first.",true);return;}
        r.module.name=uniqueName(list0,r.module.name);list0.unshift(r.module);
        if(!ctx.store.put(list0)){say(ctx.storageMsg,true);return;}imp.value="";say("Imported “"+r.module.name+"” ("+r.rules+" rule"+(r.rules===1?"":"s")+").");refresh();
      };

      /* ---- open / close, focus ---- */
      const doOpen=()=>{
        if(open.value)return;
        opener=document.activeElement&&document.activeElement!==document.body?document.activeElement:null;
        refresh();mode.value={};say("");open.value=true;document.body.classList.add("mdm-lock");
        nextTick(()=>{const t=search.value||dlg.value;if(t)t.focus({preventScroll:true});});
      };
      const close=()=>{
        if(!open.value)return;
        open.value=false;drag.value=null;dropAt.value=-1;document.body.classList.remove("mdm-lock");
        const back=(ctx.opener&&ctx.opener())||opener;
        nextTick(()=>{if(back&&back.focus)back.focus({preventScroll:true});});
      };
      const onKey=e=>{
        e.stopPropagation(); /* the page's own shortcuts (Alt+Arrow, Ctrl+D, Escape in the rule search) must not act behind the modal */
        if(e.key==="Escape"){
          if(mode.value&&Object.keys(mode.value).length&&e.target.closest&&e.target.closest(".mdm-card")){mode.value={};e.preventDefault();return;}
          e.preventDefault();close();return;
        }
        if(e.key==="Tab"&&dlg.value){
          const f=focusables(dlg.value);if(!f.length){e.preventDefault();dlg.value.focus();return;}
          const first=f[0],last=f[f.length-1],a=document.activeElement;
          if(e.shiftKey&&(a===first||a===dlg.value)){e.preventDefault();last.focus();}
          else if(!e.shiftKey&&a===last){e.preventDefault();first.focus();}
          else if(!dlg.value.contains(a)){e.preventDefault();first.focus();}
        }
      };
      vmRef={open:doOpen,close,refresh,isOpen:()=>open.value};
      return {open,src,q,cat,tag,msg,bad,mode,shareUrl,imp,form,edit,sel,at,drag,dropAt,dlg,search,
        max:MAX_RULES,builtin:BUILTIN,mine,all,easy,rules,curId,curIdx,cats,tags,shown,plan,eff,whereText,check,over,blocked,icon,
        isSel,toggleSel,cardClick,isFolded,toggleFold,allFolded,toggleAll,selectShown,setAtNum,info,sellOf,insertIds,dragMods,dragRule,dragEnd,overRules,leaveRules,dropRules,moveRule,toggleOn,
        askReplace,replace,save,startEdit,saveEdit,del,dup,fileOf,copy,share,doImport,close,onKey};
    }
  });
  app.mount(el);
  return {open:()=>vmRef.open(),close:()=>vmRef.close(),refresh:()=>vmRef.refresh(),isOpen:()=>vmRef.isOpen()};
}

/* confirm dialog for Sell rules: returns a promise that resolves true only when the user confirms. It layers above the organizer (z-index 120). */
export function mountCaution(Vue,el){
  const {createApp,ref,nextTick}=Vue;
  const state=ref(null),ok=ref(false);
  const app=createApp({
    template:`<div v-if="s" class="mdm-caut" @keydown.stop="key" role="presentation">
      <div class="sub grid gap-3 max-w-md w-full" role="alertdialog" aria-modal="true" aria-labelledby="cautT" aria-describedby="cautD" ref="box" tabindex="-1" style="background:var(--bg-panel,#161b22);display:grid;gap:12px;max-width:28rem;width:100%">
        <h3 id="cautT" class="subtitle m-0">Caution: Sell</h3>
        <div id="cautD" style="display:grid;gap:8px"><p style="margin:0">{{ base }}</p><p v-for="t in s.texts" :key="t" class="hint" style="margin:0">{{ t }}</p><p class="hint" style="margin:0"><b>Not confirmed:</b> the exact in-game Sell behaviour is known only for gems. For other items it is unconfirmed, and the Drop Test treats Sell like Hide.</p></div>
        <label style="display:flex;gap:8px;align-items:center"><input type="checkbox" v-model="ok" ref="chk"> <span>I understand that matching items are sold.</span></label>
        <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end"><button type="button" class="btn" @click="no">Cancel</button><button type="button" class="btn danger" :disabled="!ok" @click="yes">Use Sell</button></div>
      </div></div>`,
    setup(){
      const box=ref(null),chk=ref(null);
      const done=v=>{const r=state.value&&state.value.res,back=state.value&&state.value.back;state.value=null;if(back&&back.focus&&document.contains(back))back.focus({preventScroll:true});if(r)r(v);};
      const key=e=>{
        if(e.key==="Escape"){e.preventDefault();done(false);return;}
        if(e.key==="Tab"&&box.value){const f=focusables(box.value);if(!f.length)return;const a=document.activeElement,first=f[0],last=f[f.length-1];
          if(e.shiftKey&&(a===first||a===box.value)){e.preventDefault();last.focus();}else if(!e.shiftKey&&a===last){e.preventDefault();first.focus();}else if(!box.value.contains(a)){e.preventDefault();first.focus();}}
      };
      return {s:state,ok,box,chk,base:CAUTION.base,key,yes(){done(true);},no(){done(false);}};
    }
  });
  app.mount(el);
  return kinds=>new Promise(res=>{ok.value=false;state.value={texts:kinds.map(k=>CAUTION[k]).filter(Boolean),res,back:document.activeElement};nextTick(()=>{const t=el.querySelector("[role=alertdialog]");if(t)t.focus({preventScroll:true});});});
}
