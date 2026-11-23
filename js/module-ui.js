/* Module library UI (Vue 3). All logic lives in modules.js and filter-engine.js; this file only shows it and calls back into app.js through ctx.
   ctx: {F(), curId(), easy(), insert(rules,pos,name), replace(rules,name), toast(msg,bad), share(module), store:{all(),put(list),max}, storageMsg, undoMsg} */
import {encode,uid,MAX_RULES,NAME_MAX} from "./filter-engine.js";
import {BUILTIN,BUILTIN_CATS,builtinRules,moduleRules,fitRules,filterModules,insertCheck,sellCaution,CAUTION,cleanModule,uniqueName,duplicateModule,moduleToShare,moduleFromShare,CUSTOM_MAX} from "./modules.js";

const POS=[["after","After selected rule"],["top","Top"],["end","End"]];
const TPL=`
<div class="grid gap-3" data-mdui>
  <div class="flex gap-2 flex-wrap" role="tablist" aria-label="Module library">
    <button type="button" class="btn" role="tab" :aria-selected="tab==='builtin'" :aria-pressed="tab==='builtin'" @click="setTab('builtin')">Built-in ({{ builtin.length }})</button>
    <button type="button" class="btn" role="tab" :aria-selected="tab==='mine'" :aria-pressed="tab==='mine'" @click="setTab('mine')">My modules ({{ mine.length }})</button>
  </div>
  <div class="flex gap-2 flex-wrap items-end">
    <div class="flex-1 min-w-36"><label class="lab" for="mdQ">Search modules</label><input id="mdQ" class="field" type="search" v-model="q" placeholder="Name, description, category, base, line" autocomplete="off"></div>
    <div v-if="tab==='builtin'" class="min-w-40"><label class="lab" for="mdCat">Category</label><div class="selwrap"><select id="mdCat" v-model="cat"><option value="">All categories</option><option v-for="c in cats" :key="c" :value="c">{{ c }}</option></select></div></div>
    <div v-else class="min-w-40"><label class="lab" for="mdCatMine">Category</label><div class="selwrap"><select id="mdCatMine" v-model="cat"><option value="">All categories</option><option v-for="c in mineCats" :key="c" :value="c">{{ c }}</option></select></div></div>
  </div>
  <p class="hint m-0 normal-case tracking-normal" role="status" aria-live="polite" :class="bad?'text-hide':''">{{ msg }}</p>
  <p v-if="easy" class="hint m-0">Easy Mode builds its own rules. Switch to Advanced Mode to insert modules.</p>

  <div v-if="tab==='mine'" class="grid gap-2">
    <div class="sub grid gap-2">
      <span class="lab">Save rules as a module</span>
      <div class="flex gap-2 flex-wrap items-end">
        <div class="flex-[2_1_160px]"><label class="lab" for="mdName">Name</label><input id="mdName" class="field" type="text" maxlength="40" v-model="form.name" placeholder="e.g. Hide junk" autocomplete="off" @keydown.enter.prevent="save(false)"></div>
        <div class="flex-[1_1_80px]"><label class="lab" for="mdFrom">From rule</label><input id="mdFrom" class="field" type="number" min="1" inputmode="numeric" v-model="form.from"></div>
        <div class="flex-[1_1_80px]"><label class="lab" for="mdTo">To rule</label><input id="mdTo" class="field" type="number" min="1" inputmode="numeric" v-model="form.to"></div>
      </div>
      <div class="flex gap-2 flex-wrap items-end">
        <div class="flex-[2_1_160px]"><label class="lab" for="mdDesc">Description (optional)</label><input id="mdDesc" class="field" type="text" maxlength="200" v-model="form.desc" autocomplete="off"></div>
        <div class="flex-[1_1_120px]"><label class="lab" for="mdCatIn">Category (optional)</label><input id="mdCatIn" class="field" type="text" maxlength="30" v-model="form.cat" autocomplete="off"></div>
      </div>
      <div class="flex gap-2 flex-wrap"><button type="button" class="btn gold" id="mdSave" @click="save(false)">Save module</button><button type="button" class="btn" id="mdAll" @click="save(true)">Save all rules</button></div>
    </div>
    <div class="sub grid gap-2">
      <span class="lab">Import a module</span>
      <label class="sr" for="mdImp">Module file text</label><textarea id="mdImp" class="field" rows="2" v-model="imp" placeholder="Paste a copied module here"></textarea>
      <div><button type="button" class="btn" @click="doImport">Import module</button></div>
    </div>
  </div>

  <ul class="lfl m-0" id="mdList">
    <li v-if="!shown.length" class="hint" style="border-style:dashed">{{ tab==='mine' ? (mine.length ? 'No module matches your search.' : 'No modules yet. Save a few rules above.') : 'No module matches your search.' }}</li>
    <li v-for="m in shown" :key="m.id" :data-md="m.id" class="grid gap-2">
      <div class="lfi">
        <b :title="m.name">{{ m.name }}</b>
        <span class="hint">{{ info(m) }}</span>
        <span v-if="m.cat" class="hint">{{ m.cat }}</span>
        <span v-if="m.desc" class="hint normal-case tracking-normal line-clamp-3 [overflow-wrap:anywhere]">{{ m.desc }}</span>
        <span v-if="sellOf(m).length" class="hint text-warn">Contains Sell rules</span>
      </div>
      <template v-if="mode[m.id]==='ren'">
        <input class="field" type="text" maxlength="40" v-model="edit.name" aria-label="New name" @keydown.enter.prevent="saveEdit(m)" @keydown.esc="mode={}">
        <input class="field" type="text" maxlength="200" v-model="edit.desc" aria-label="Description" placeholder="Description (optional)">
        <input class="field" type="text" maxlength="30" v-model="edit.cat" aria-label="Category" placeholder="Category (optional)">
        <div class="lfb"><button type="button" class="btn gold" @click="saveEdit(m)">Save</button><button type="button" class="btn" @click="mode={}">Cancel</button></div>
      </template>
      <div v-else-if="mode[m.id]==='del'" class="lfb"><button type="button" class="btn danger" @click="del(m)">Delete</button><button type="button" class="btn" @click="mode={}">Cancel</button></div>
      <div v-else-if="mode[m.id]==='rep'" class="grid gap-2">
        <div v-if="sellOf(m).length" class="callout normal-case tracking-normal" role="alert"><b>Caution.</b> <span v-for="s in sellOf(m)" :key="s.kind">{{ s.text }} </span><label class="flex gap-2 items-center mt-2"><input type="checkbox" v-model="ack"> <span>I understand that matching items are sold.</span></label></div>
        <div class="lfb"><button type="button" class="btn danger" :disabled="sellOf(m).length&&!ack" @click="replace(m)">Replace current filter</button><button type="button" class="btn" @click="mode={}">Cancel</button></div></div>
      <div v-else-if="mode[m.id]==='shr'" class="grid gap-2">
        <input class="field" type="text" readonly :value="shareUrl" aria-label="Share link" data-mdurl="1">
        <div class="lfb"><button type="button" class="btn" @click="copy(shareUrl,'Link copied.')">Copy link</button><button type="button" class="btn" @click="copy('[Oathfilter module]('+shareUrl+')','Discord link copied.')">Copy for Discord</button><button type="button" class="btn" @click="mode={}">Close</button></div></div>
      <div v-else class="lfb">
        <button type="button" class="btn" :disabled="easy" :title="easy?'Easy Mode builds its own rules. Switch to Advanced Mode to insert modules.':''" @click="openInsert(m)">{{ easy ? 'Advanced Mode only' : 'Insert' }}</button>
        <template v-if="!m.builtin">
          <button type="button" class="btn" @click="askReplace(m)">Replace filter</button>
          <button type="button" class="btn" @click="startEdit(m)">Edit info</button>
          <button type="button" class="btn" @click="dup(m)">Duplicate</button>
          <button type="button" class="btn" @click="share(m)">Share link</button>
          <button type="button" class="btn" @click="copy(fileOf(m),'Module copied. Paste it into Import module.')">Copy module</button>
          <button type="button" class="btn danger" @click="mode={};mode[m.id]='del'">Delete</button>
        </template>
      </div>
      <div v-if="pre&&pre.key===m.id" class="sub grid gap-2 normal-case tracking-normal" :data-precheck="m.id">
        <p class="m-0"><b>{{ pre.check.added }}</b> rule{{ pre.check.added===1?'':'s' }} added, total <b :class="pre.check.over?'text-hide':''">{{ pre.check.total }} / {{ pre.check.max }}</b>.</p>
        <div><label class="lab" :for="'pos-'+m.id">Insert at</label><div class="selwrap"><select :id="'pos-'+m.id" v-model="pre.pos"><option v-for="p in POS" :key="p[0]" :value="p[0]">{{ p[1] }}</option></select></div></div>
        <p v-if="pre.check.over" class="m-0 text-hide" role="alert">{{ overText }}</p>
        <ul class="m-0 pl-4 grid gap-1">
          <li v-for="n in pre.notes" :key="n" class="hint">{{ n }}</li>
          <li v-for="s in pre.check.shadowed" :key="'s'+s.rule" class="hint text-warn">Rule {{ s.rule+1 }}{{ pre.rules[s.rule].name?' ('+pre.rules[s.rule].name+')':'' }} would never be reached: {{ s.byNew?'an earlier rule of this module':'rule '+(s.by+1)+' of your filter' }} already catches everything it catches.</li>
          <li v-for="s in pre.check.shadows" :key="'h'+s.rule" class="hint text-warn">Your rule {{ s.rule+1 }} would never be reached after this insert: a new rule catches everything it catches.</li>
          <li v-for="s in pre.check.issues" :key="s.rule+s.code" class="hint text-warn">Rule {{ s.rule+1 }}: {{ s.text }}</li>
        </ul>
        <div v-if="pre.check.sell.length" class="callout normal-case tracking-normal" role="alert"><b>Caution.</b> {{ base }} <span v-for="s in pre.check.sell" :key="s.kind">{{ s.text }} </span>
          <label class="flex gap-2 items-center mt-2"><input type="checkbox" v-model="ack"> <span>I understand that matching items are sold.</span></label></div>
        <div class="lfb"><button type="button" class="btn gold" :disabled="blocked" @click="doInsert">Insert {{ pre.check.added }} rule{{ pre.check.added===1?'':'s' }}</button><button type="button" class="btn" @click="pre=null">Cancel</button></div>
      </div>
    </li>
  </ul>
</div>`;

export function mountModuleUi(Vue,ctx,el){
  const {createApp,ref,reactive,computed,watch}=Vue;
  const app=createApp({
    template:TPL,
    setup(){
      const tab=ref("builtin"),q=ref(""),cat=ref(""),msg=ref(""),bad=ref(false),mode=ref({}),pre=ref(null),ack=ref(false),shareUrl=ref(""),imp=ref(""),tick=ref(0);
      const form=reactive({name:"",from:"",to:"",desc:"",cat:""}),edit=reactive({name:"",desc:"",cat:""});
      const say=(m,b)=>{msg.value=m;bad.value=!!b;};
      const mineAll=computed(()=>{tick.value;return ctx.store.all().map(cleanModule).filter(Boolean).sort((a,b)=>a.name.localeCompare(b.name));});
      const mine=computed(()=>mineAll.value);
      const easy=computed(()=>{tick.value;return ctx.easy();});
      const list=computed(()=>tab.value==="builtin"?BUILTIN:mine.value);
      const shown=computed(()=>filterModules(list.value,q.value,cat.value));
      const mineCats=computed(()=>[...new Set(mine.value.map(m=>m.cat).filter(Boolean))].sort());
      const rulesOf=m=>m.builtin?builtinRules(m):fitRules(moduleRules(m).map(r=>JSON.parse(JSON.stringify(r))));
      const sellOf=m=>sellCaution(moduleRules(m));
      const info=m=>{const n=rulesOf(m).rules.length;return n+" rule"+(n===1?"":"s");};
      const recheck=()=>{if(!pre.value)return;pre.value.check=insertCheck(ctx.F().rules,pre.value.rules,pre.value.pos,ctx.curId());};
      watch(()=>pre.value&&pre.value.pos,recheck);
      watch(tab,()=>{q.value="";cat.value="";pre.value=null;mode.value={};say("");});
      const blocked=computed(()=>!pre.value||pre.value.check.over||(pre.value.check.sell.length>0&&!ack.value)||easy.value);
      const overText=computed(()=>pre.value?"The filter would have "+pre.value.check.total+" rules. The limit is "+MAX_RULES+". Delete "+(pre.value.check.total-MAX_RULES)+" rule"+(pre.value.check.total-MAX_RULES===1?"":"s")+" first.":"");
      const openInsert=m=>{
        if(pre.value&&pre.value.key===m.id){pre.value=null;return;}
        const r=rulesOf(m);if(!r.rules.length){say("This module could not be read.",true);return;}
        const pos=m.builtin?m.pos:"after";
        pre.value={key:m.id,mod:m,rules:r.rules,notes:r.notes,pos,check:insertCheck(ctx.F().rules,r.rules,pos,ctx.curId())};ack.value=false;mode.value={};say("");
      };
      const doInsert=()=>{
        if(blocked.value)return;
        const p=pre.value,rs=JSON.parse(JSON.stringify(p.rules));
        if(ctx.insert(rs,p.pos,p.mod.name)){pre.value=null;say("");}
      };
      const askReplace=m=>{pre.value=null;ack.value=false;mode.value={};if(!ctx.F().rules.length){replace(m);return;}mode.value={[m.id]:"rep"};};
      const replace=m=>{const r=rulesOf(m).rules;if(!r.length){say("This module could not be read.",true);return;}ctx.replace(JSON.parse(JSON.stringify(r)),m.name);mode.value={};say("");};
      const save=all=>{
        const rules=ctx.F().rules,n=rules.length,name=form.name.trim().slice(0,40);
        if(!name){say("Give the module a name first.",true);return;}
        if(!n){say("There are no rules to save.",true);return;}
        let a=parseInt(form.from,10),b=parseInt(form.to,10);
        if(all){a=1;b=n;}else{const cur=rules.findIndex(r=>r.id===ctx.curId())+1;if(!a)a=cur;if(!b)b=a;}
        if(!(a>=1)||b<a||b>n){say("Choose rule numbers from 1 to "+n+", with “From” not above “To”.",true);return;}
        const all0=ctx.store.all().map(cleanModule).filter(Boolean),i=all0.findIndex(x=>x.name.toLowerCase()===name.toLowerCase());
        if(i>=0&&form.over!==name.toLowerCase()){form.over=name.toLowerCase();say("“"+all0[i].name+"” already exists. Save again to overwrite it.");return;}
        if(i<0&&all0.length>=CUSTOM_MAX){say("You can keep up to "+CUSTOM_MAX+" modules. Delete one first.",true);return;}
        const sel=rules.slice(a-1,b),old=i>=0?all0[i]:null;
        const rec=cleanModule({id:old?old.id:"m"+Date.now().toString(36)+uid().slice(0,3),name:old?old.name:name,c:encode({preset:"-1",rules:sel}),n:sel.map(r=>r.name||""),t:Date.now(),desc:form.desc.trim()||(old&&old.desc)||"",cat:form.cat.trim()||(old&&old.cat)||""});
        if(old)all0[i]=rec;else all0.unshift(rec);
        if(!ctx.store.put(all0)){say(ctx.storageMsg,true);return;}
        form.over="";say((old?"Updated “":"Saved “")+rec.name+"” ("+sel.length+" rule"+(sel.length===1?"":"s")+").");form.name=form.from=form.to=form.desc=form.cat="";tick.value++;
      };
      const startEdit=m=>{pre.value=null;mode.value={[m.id]:"ren"};edit.name=m.name;edit.desc=m.desc||"";edit.cat=m.cat||"";};
      const saveEdit=m=>{
        const nn=edit.name.trim().slice(0,40);if(!nn){say("Give the module a name.",true);return;}
        const all0=ctx.store.all().map(cleanModule).filter(Boolean);
        if(all0.some(y=>y.id!==m.id&&y.name.toLowerCase()===nn.toLowerCase())){say("Another module is already called “"+nn+"”.",true);return;}
        const x=all0.find(y=>y.id===m.id);if(!x)return;x.name=nn;x.desc=edit.desc.trim().slice(0,200);x.cat=edit.cat.trim().slice(0,30);
        if(!x.desc)delete x.desc;if(!x.cat)delete x.cat;
        if(!ctx.store.put(all0)){say(ctx.storageMsg,true);return;}mode.value={};say("Saved.");tick.value++;
      };
      const del=m=>{const r=ctx.store.all().filter(y=>y.id!==m.id);mode.value={};if(ctx.store.put(r)){say("Deleted “"+m.name+"”.");tick.value++;}else say("Could not delete (browser storage error).",true);};
      const dup=m=>{const r=duplicateModule(ctx.store.all().map(cleanModule).filter(Boolean),m.id);if(r.err){say(r.err,true);return;}if(!ctx.store.put(r.list)){say(ctx.storageMsg,true);return;}say("Duplicated as “"+r.module.name+"”.");tick.value++;};
      const fileOf=m=>moduleToShare(m);
      const copy=async(txt,ok)=>{try{await navigator.clipboard.writeText(txt);say(ok);}catch(e){say(ctx.copyBlocked,true);}};
      const share=async m=>{say("Creating link…");const r=await ctx.share(m);if(!r){say("The link could not be created.",true);return;}shareUrl.value=r.url;mode.value={[m.id]:"shr"};say(r.offline?"Offline link created. It works without the service"+(r.url.length>1800?", but it is long and Discord may cut it.":"."):"Link created.");};
      const doImport=()=>{
        const r=moduleFromShare(imp.value);if(r.err){say(r.err,true);return;}
        const all0=ctx.store.all().map(cleanModule).filter(Boolean);if(all0.length>=CUSTOM_MAX){say("You can keep up to "+CUSTOM_MAX+" modules. Delete one first.",true);return;}
        r.module.name=uniqueName(all0,r.module.name);all0.unshift(r.module);
        if(!ctx.store.put(all0)){say(ctx.storageMsg,true);return;}imp.value="";say("Imported “"+r.module.name+"” ("+r.rules+" rule"+(r.rules===1?"":"s")+").");tick.value++;
      };
      const setTab=t=>{tab.value=t;};
      return {tab,q,cat,msg,bad,mode,pre,ack,shareUrl,imp,form,edit,mine,builtin:BUILTIN,cats:BUILTIN_CATS,mineCats,shown,easy,POS,base:CAUTION.base,blocked,overText,
        setTab,info,sellOf,openInsert,doInsert,askReplace,replace,save,startEdit,saveEdit,del,dup,fileOf,copy,share,doImport,
        refresh(){tick.value++;recheck();}};
    }
  });
  const vm=app.mount(el);
  return {refresh:()=>vm.refresh()};
}

/* confirm dialog for Sell rules: returns a promise that resolves true only when the user confirms */
export function mountCaution(Vue,el){
  const {createApp,ref}=Vue;
  const state=ref(null);
  const app=createApp({
    template:`<div v-if="s" class="fixed inset-0 z-[80] grid place-items-center p-4" style="background:rgb(0 0 0 / .6)" @keydown.esc="no" role="presentation">
      <div class="sub grid gap-3 max-w-md w-full" role="alertdialog" aria-modal="true" aria-labelledby="cautT" aria-describedby="cautD" style="background:var(--bg-panel,#161b22)">
        <h3 id="cautT" class="subtitle m-0">Caution: Sell</h3>
        <div id="cautD" class="grid gap-2"><p class="m-0">{{ base }}</p><p v-for="t in s.texts" :key="t" class="m-0 hint">{{ t }}</p></div>
        <label class="flex gap-2 items-center"><input type="checkbox" v-model="ok" ref="box"> <span>I understand that matching items are sold.</span></label>
        <div class="flex gap-2 flex-wrap justify-end"><button type="button" class="btn" @click="no">Cancel</button><button type="button" class="btn danger" :disabled="!ok" @click="yes">Use Sell</button></div>
      </div></div>`,
    setup(){const ok=ref(false);return {s:state,ok,base:CAUTION.base,yes(){const r=state.value.res;state.value=null;r(true);},no(){const r=state.value&&state.value.res;state.value=null;if(r)r(false);}};}
  });
  app.mount(el);
  return kinds=>new Promise(res=>{state.value={texts:kinds.map(k=>CAUTION[k]).filter(Boolean),res};});
}
