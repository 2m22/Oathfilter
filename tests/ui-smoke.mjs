/* Browser smoke check for the collapsible UI and the Lucide icons.
     node tests/ui-smoke.mjs
   Needs Playwright (the logic tests in tests/run.mjs do not):  npm i -D playwright && npx playwright install chromium
   Exit code 0 = all checks passed, 1 = a check failed, 2 = Playwright is not installed (nothing was checked).
   Offline / sandbox: point it at local copies of the CDN files, e.g.
     OF_VUE_FILE=/path/vue.esm-browser.prod.js OF_LUCIDE_FILE=/path/lucide.min.js node tests/ui-smoke.mjs
   Without these variables the real CDN files are used. If Playwright is installed outside the project, OF_PLAYWRIGHT=/path/to/playwright/index.js.
   It runs four passes: with Lucide, without Lucide (the built-in SVG icons), with a Lucide that throws, and a 420px-wide pass for the top bar and the Organizer modal.
   Checked per pass: no script errors, no icon placeholders or empty icons, no leftover text arrows,
   fold toggling by mouse and keyboard (Advanced folds, "More conditions", Easy Mode "Details", Guide and About cards),
   fold chevrons turning with the state, the Module Organizer (fold chevrons, re-render, Esc, focus return), the inline notes (game code vs share link, SHOW*, Sell not confirmed), the separate Clear filter button and the 420px layout. */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath,pathToFileURL} from "node:url";

let chromium;
try{const m=await import(process.env.OF_PLAYWRIGHT?pathToFileURL(process.env.OF_PLAYWRIGHT).href:"playwright");chromium=m.chromium||m.default.chromium;}
catch(e){console.error("SKIPPED: Playwright is not installed (npm i -D playwright && npx playwright install chromium).");process.exit(2);}

const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const MIME={".html":"text/html",".js":"text/javascript",".mjs":"text/javascript",".css":"text/css",".json":"application/json",".svg":"image/svg+xml",".png":"image/png",".ico":"image/x-icon"};
const server=http.createServer((req,res)=>{
  const p=path.join(ROOT,decodeURIComponent(req.url.split("?")[0]).replace(/\/$/,"/index.html"));
  if(!p.startsWith(ROOT)||!fs.existsSync(p)||fs.statSync(p).isDirectory()){res.writeHead(404);res.end();return;}
  res.writeHead(200,{"Content-Type":MIME[path.extname(p)]||"application/octet-stream"});fs.createReadStream(p).pipe(res);
});
await new Promise(r=>server.listen(0,"127.0.0.1",r));
const BASE="http://127.0.0.1:"+server.address().port+"/index.html";

let failed=0,passed=0,pass="";
const ok=(c,msg)=>{if(c){passed++;}else{failed++;console.error(`FAIL [${pass}]: ${msg}`);}};

const localFile=n=>process.env[n]&&fs.existsSync(process.env[n])?fs.readFileSync(process.env[n],"utf8"):null;
async function cdnBody(route,envName){const f=localFile(envName);if(f!==null)return f;const r=await route.fetch();return r.text();}

const ICON_STATE=()=>({
  placeholders:document.querySelectorAll("i[data-lucide]").length,
  emptyIcons:[...document.querySelectorAll("svg.li")].filter(s=>!s.children.length).length,
  tinyIcons:[...document.querySelectorAll("svg.li")].filter(s=>{const r=s.getBoundingClientRect();return r.width&&(r.width<8||r.height<8);}).length,
  glyphs:/[▸▾↑↓▶]/.test(document.body.innerText),
  chevrons:document.querySelectorAll(".fold-chev").length
});
const ROT=sel=>{const e=document.querySelector(sel);return e?getComputedStyle(e).transform:"missing";};
const ROTATED="matrix(0, 1, -1, 0, 0, 0)"; /* 90 degrees */

async function icons(page,label){
  await page.waitForTimeout(150);
  const s=await page.evaluate(ICON_STATE);
  ok(s.placeholders===0,`${label}: ${s.placeholders} icon placeholder(s) left`);
  ok(s.emptyIcons===0,`${label}: ${s.emptyIcons} empty icon(s)`);
  ok(s.tinyIcons===0,`${label}: ${s.tinyIcons} icon(s) smaller than 8px`);
  ok(!s.glyphs,`${label}: text arrow glyph in the page`);
  return s;
}

async function openPage(mode,width=1400){
  const browser=await chromium.launch();
  const page=await (await browser.newContext({viewport:{width,height:width<600?860:1000}})).newPage();
  const errors=[];
  page.on("pageerror",e=>errors.push(String(e).slice(0,160)));
  page.on("console",m=>{if(m.type()==="error"&&!/Failed to load|ERR_|net::/.test(m.text()))errors.push(m.text().slice(0,160));});
  await page.route("**/*",async route=>{
    const u=route.request().url();
    if(/version\.json/.test(u))return route.abort(); /* no update window: a local copy has no build id */
    if(u.startsWith("http://127.0.0.1"))return route.continue();
    try{
      if(/vue\.esm-browser/.test(u)){return route.fulfill({body:await cdnBody(route,"OF_VUE_FILE"),contentType:"application/javascript"});}
      if(/lucide/.test(u)){
        if(mode==="nolucide")return route.abort();
        let b=await cdnBody(route,"OF_LUCIDE_FILE");
        if(mode==="throwing")b+=";(function(){var l=window.lucide||globalThis.lucide;if(l)l.createIcons=function(){throw new Error('lucide test error');};})();";
        return route.fulfill({body:b,contentType:"application/javascript"});
      }
    }catch(e){return route.abort();}
    return route.abort(); /* Tailwind, Sortable and fonts are not needed for these checks */
  });
  await page.goto(BASE);await page.waitForTimeout(900);
  return {browser,page,errors};
}
const box=(page,sel)=>page.$eval(sel,e=>{const r=e.getBoundingClientRect();return {l:r.left,r:r.right,t:r.top,b:r.bottom,w:r.width,h:r.height};});

async function run(name,mode){
  pass=name;
  const {browser,page,errors}=await openPage(mode);
  await page.click("[data-view=edit]");await page.waitForTimeout(300);
  await icons(page,"editor, first load");

  /* warnings and the Clear filter button where they matter */
  {const sh=await box(page,"#shMake"),cl=await box(page,"#clearF");
   ok(cl.l-sh.r>=60,"Clear filter sits well apart from Copy and Share ("+Math.round(cl.l-sh.r)+"px)");
   ok(await page.$eval("#clearF",e=>e.classList.contains("danger")),"Clear filter has the danger style");}
  await page.click('details.fold[data-fold=act]>summary').catch(()=>{});await page.waitForTimeout(100);
  if(!(await page.$eval("details.fold[data-fold=act]",d=>d.open)))await page.click('details.fold[data-fold=act]>summary');
  await page.click('#rows .pickb');await page.waitForTimeout(200); /* make sure a rule is selected */
  await page.click('button[data-set="action,4"]');await page.waitForTimeout(300);
  ok(await page.isVisible("#cautionHost [role=alertdialog]"),"choosing Sell opens the caution dialog");
  ok(/Not confirmed/.test(await page.textContent("#cautionHost [role=alertdialog]")),"the Sell caution says the in-game behaviour is not confirmed");
  await page.click("#cautionHost [role=alertdialog] button:has-text('Cancel')");await page.waitForTimeout(250);
  ok(!(await page.isVisible("#cautionHost [role=alertdialog]")),"Cancel closes the Sell caution");
  { /* named lines: show only the mods that fit the rule's item type */
    const list=()=>page.$$eval("#pl-a button[data-padd]",b=>b.map(x=>x.textContent));
    await page.selectOption("#f-type","0");await page.waitForTimeout(150);
    ok(!(await page.$("#pkfitsel-a")),"no mod filter while the rule is on Any gear");
    const all=(await list()).length,baseList=()=>page.$$eval("#pl-b button[data-padd]",b=>b.map(x=>x.textContent)),allB=(await baseList()).length;
    await page.selectOption("#f-type","10");await page.waitForTimeout(200);
    ok(!!(await page.$("#pkfitsel-a")),"the mod filter shows for a specific item type (Rings)");
    const fit=await list();
    ok(fit.length>0&&fit.length<all,"choosing an item type filters the mods at once ("+fit.length+" of "+all+")");
    ok(!fit.some(t=>/to Armour/.test(t))&&fit.some(t=>/Life/.test(t)),"Rings: no Armour line, Life is there");
    const bl=await baseList();
    ok(bl.length>0&&bl.length<allB&&!bl.some(t=>/Boots|Helm|Bow/.test(t)),"the base list follows the item type too ("+bl.length+" of "+allB+")");
    await page.selectOption("#pkfitsel-a","0");await page.waitForTimeout(200);
    ok((await list()).length===all,"All mods shows every mod again");
    await page.selectOption("#pkfitsel-a","1");await page.waitForTimeout(100);
    await page.selectOption("#f-type","0");await page.waitForTimeout(200);
    ok((await list()).length===all&&(await baseList()).length===allB,"back on Any gear the full lists return");
    /* item type + defence type combine for the base list */
    await page.selectOption("#f-type","6");await page.waitForTimeout(200);
    const body=(await baseList()).length;
    await page.selectOption("#m-d","1");await page.waitForTimeout(250);
    const bodyPlate=await baseList();
    ok(bodyPlate.length>0&&bodyPlate.length<body&&body>bodyPlate.length,"body armour + defence type Armour: fewer bases ("+bodyPlate.length+" of "+body+")");
    ok(!bodyPlate.some(t=>/Silk|Leather|Helm|Gloves|Boots/.test(t)),"only plate body armours are listed");
    await page.selectOption("#m-d","");await page.selectOption("#f-type","0");await page.waitForTimeout(200);
    /* named reds follow the item type and the picked bases */
    const redList=()=>page.$$eval("#pl-rn button[data-padd]",b=>b.map(x=>x.textContent));
    const allR=(await redList()).length;
    await page.selectOption("#f-type","18");await page.waitForTimeout(250);
    const bowR=await redList();
    ok(bowR.length>0&&bowR.length<allR,"named reds follow the item type ("+bowR.length+" of "+allR+")");
    await page.fill("#pk-b","Hunter's Bow");await page.waitForTimeout(150);
    await page.click('#pl-b button[data-padd]');await page.waitForTimeout(300);
    const oneR=await redList();
    ok(!!(await page.$("#pkfit-rn input[data-pkbase]")),"a switch for reds appears once a base is picked");
    ok(oneR.length<bowR.length,"picked base narrows the reds further ("+oneR.length+" of "+bowR.length+")");
    await page.uncheck("#pkfit-rn input[data-pkbase]");await page.waitForTimeout(150);
    ok((await redList()).length===bowR.length,"switch off: back to the item type's reds");
    await page.click('[data-pclr="b"]');await page.selectOption("#f-type","0");await page.waitForTimeout(250);
    ok((await redList()).length===allR,"Any gear: every red again");
    /* type 9 is split into shields, foci and quivers for the mod check */
    await page.selectOption("#f-type","9");await page.waitForTimeout(200);
    ok(!!(await page.$("#pkscope-a")),"shields/foci/quivers: an item-kind select shows");
    const k0=(await list()).length;
    await page.selectOption("#pkscope-a","quiver");await page.waitForTimeout(200);
    const kq=await list();await page.selectOption("#pkscope-a","shield");await page.waitForTimeout(200);const ks=await list();
    ok(kq.length>0&&ks.length>0&&kq.length<k0&&ks.length<k0&&kq.join("|")!==ks.join("|"),"quivers and shields list different mods ("+kq.length+" / "+ks.length+" of "+k0+")");
    await page.selectOption("#pkscope-a","");await page.selectOption("#f-type","0");await page.waitForTimeout(150);
    /* bases picked: the list hides the mods that cannot roll on them */
    await page.selectOption("#f-type","0");await page.waitForTimeout(150);
    const full=(await list()).length;
    await page.fill("#pk-b","Hunter");await page.waitForTimeout(150);
    await page.click('#pl-b button[data-padd]');await page.waitForTimeout(300);
    ok(!!(await page.$("#pkfit-a input[data-pkbase]")),"a checkbox appears once a base is picked");
    const some=await list();
    ok(some.length>0&&some.length<full&&!some.some(t=>/to Armour/.test(t)),"with a bow picked, mods it cannot roll are hidden ("+some.length+" of "+full+")");
    await page.uncheck("#pkfit-a input[data-pkbase]");await page.waitForTimeout(150);
    ok((await list()).length===full,"unchecking shows every mod again");
    await page.check("#pkfit-a input[data-pkbase]");await page.waitForTimeout(100);
    await page.click('[data-pclr="b"]');await page.waitForTimeout(250);
    ok(!(await page.$("#pkfit-a input[data-pkbase]")),"no bases: no checkbox");
    await page.selectOption("#f-type","10");await page.selectOption("#pkfitsel-a","0").catch(()=>{});await page.waitForTimeout(100);
  }

  /* Advanced folds: mouse, keyboard, remembered state */
  const sum="details.fold[data-fold=preset]>summary",det="details.fold[data-fold=preset]";
  ok(await page.$eval(det,d=>d.open),"preset fold starts open");
  ok(await page.evaluate(ROT,det+" .fold-chev")===ROTATED,"open fold: chevron is turned down");
  await page.click(sum);await page.waitForTimeout(200);
  ok(!(await page.$eval(det,d=>d.open)),"click closes the fold");
  ok(await page.evaluate(ROT,det+" .fold-chev")!==ROTATED,"closed fold: chevron points right");
  await page.focus(sum);await page.keyboard.press("Enter");await page.waitForTimeout(150);
  ok(await page.$eval(det,d=>d.open),"Enter on the heading opens the fold");
  await page.keyboard.press("Space");await page.waitForTimeout(150);
  ok(!(await page.$eval(det,d=>d.open)),"Space on the heading closes the fold");
  await page.reload();await page.waitForTimeout(900);await page.click("[data-view=edit]");await page.waitForTimeout(300);
  ok(!(await page.$eval(det,d=>d.open)),"a closed fold stays closed after a reload");
  await page.click(sum);await page.waitForTimeout(150);

  /* a fold that the editor redraws (What happens) keeps its state and its icon */
  const act="details.fold[data-fold=act]>summary";
  await page.click(act);await page.waitForTimeout(150);await page.click(act);await page.waitForTimeout(150);
  await icons(page,"editor, after folding What happens");

  /* "More conditions": a button with aria-expanded */
  const more=".moreb";
  const e0=await page.getAttribute(more,"aria-expanded");
  await page.focus(more);await page.keyboard.press("Enter");await page.waitForTimeout(250);
  ok(await page.getAttribute(more,"aria-expanded")!==e0,"Enter on More conditions toggles aria-expanded");
  await page.keyboard.press("Space").catch(()=>{});await page.waitForTimeout(150);
  await icons(page,"editor, after More conditions");
  ok((await page.$$(more+" svg.li")).length>=2,"More conditions shows its icon and chevron");

  /* Drop Test: the SHOW* legend is shown whenever a SHOW* sample is on screen; the Sell tile says unconfirmed */
  await page.click("[data-view=test]");await page.waitForTimeout(300);
  for(let i=0;i<8;i++){await page.click("button:has-text('Drop 25')");await page.waitForTimeout(120);}
  const guarded=await page.$$eval(".vd",v=>v.some(x=>x.textContent.trim()==="SHOW*"));
  ok(!guarded||await page.isVisible("#guardNote"),"SHOW* samples are explained by a visible note");
  ok(await page.$eval("#guardNote",e=>e.hidden)===!guarded||guarded,"the SHOW* note stays hidden when no SHOW* sample exists");
  ok(/unconfirmed/.test(await page.$eval("#stSell",e=>e.textContent)),"the Sell result tile says unconfirmed");
  await icons(page,"Drop Test");
  await page.click("[data-view=edit]");await page.waitForTimeout(300);

  /* Easy Mode "Details" keeps its chevron when its text is updated */
  await page.click("#ezMode button:first-child");await page.waitForTimeout(400);
  await icons(page,"Easy Mode");
  ok((await page.$$("#ezDet>summary .fold-chev")).length===1,"Easy Mode Details has one chevron");
  await page.click("#ezDet>summary");await page.waitForTimeout(200);
  ok(await page.$eval("#ezDet",d=>d.open),"Easy Mode Details opens");
  ok(await page.evaluate(ROT,"#ezDet .fold-chev")===ROTATED,"Easy Mode Details chevron turns");
  await page.focus("#ezDet>summary");await page.keyboard.press("Enter");await page.waitForTimeout(150);
  ok(!(await page.$eval("#ezDet",d=>d.open)),"Enter closes Easy Mode Details");

  /* Easy Mode: three steps, three strictness cards, badge transitions */
  const pressed=()=>page.$$eval("#ezCtl .ezcard",b=>b.filter(x=>x.getAttribute("aria-pressed")==="true").map(x=>x.querySelector("b").textContent));
  const st=()=>page.$eval("#ezState",e=>e.textContent.trim());
  const bb=()=>page.$eval("#ezBuildsB",e=>!e.hidden);
  ok(JSON.stringify(await page.$$eval("#ezCtl .ezcard b",b=>b.map(x=>x.textContent)))===JSON.stringify(["Leveling","Endgame","Uber Strict"]),"Easy Mode shows the three strictness cards");
  ok((await page.$$("#ez-rl,.ezsl,.eztk")).length===0,"the Rupture Level slider and tier bar are gone");
  ok(JSON.stringify(await page.$$eval("#ezCtl .ezg .ezgt span",s=>s.map(x=>x.textContent)))===JSON.stringify(["Playstyle","Damage","Defences","Utility"]),"Build focus has the four pill groups");
  ok(JSON.stringify(await page.$$eval("#ezCtl .ezt",s=>s.map(x=>x.textContent.replace(/^\d/,"").trim())))===JSON.stringify(["Filter strictness","Build focus","Always keep & Rare bases","Hide & Dwarven Runes"]),"Easy Mode headings: steps 1 and 2, then the two utility cards");
  ok(JSON.stringify(await page.$$eval("#ezCtl .ezu .cb2 span",s=>s.map(x=>x.textContent)))===JSON.stringify(["Core-touched","Rune bases","Truesworn bases","Rare Ashen & Gnome-made","Normal gear","Magic gear","Sell instead of hide","Hide Normal & Magic Dwarven Runes"]),"the utility cards hold the requested switches");
  ok((await page.$$eval("#ezSumK,#ezSumH",e=>e.map(x=>x.textContent.length>10))).every(Boolean),"each utility card has one summary line");
  await page.click('#ezCtl [data-ez="pre,endgame"]');await page.waitForTimeout(150);
  ok(JSON.stringify(await pressed())==='["Endgame"]'&&await st()===""&&!await bb(),"Endgame: card selected, no Custom, no + builds");
  await page.click('#ezCtl [data-ez="arch,attack"]');await page.waitForTimeout(150);
  ok(JSON.stringify(await pressed())==='["Endgame"]'&&await st()===""&&await bb(),"a build pill adds + builds and keeps Endgame");
  await page.click('#ezCtl [data-ez="hn"]');await page.waitForTimeout(150);
  ok((await pressed()).length===0&&await st()==="Custom","changing a preset-owned switch turns the state to Custom");
  ok(await bb()===false,"Custom does not show + builds");
  await page.click('#ezCtl [data-ez="pre,uber"]');await page.waitForTimeout(150);
  ok(JSON.stringify(await pressed())==='["Uber Strict"]'&&await st()==="","choosing a card again clears Custom");
  ok(await page.$eval('#ezCtl [data-ez="hr"]',b=>b.getAttribute("aria-pressed"))==="true","Uber Strict turns Hide Dwarven Runes on");
  await page.click('#ezCtl [data-ez="pre,leveling"]');await page.waitForTimeout(150);
  ok(await page.$eval('#ezCtl [data-ez="hn"]',b=>b.getAttribute("aria-pressed"))==="false"&&await page.$eval('#ezCtl [data-ez="hm"]',b=>b.getAttribute("aria-pressed"))==="false","Leveling hides no Normal or Magic gear");
  await page.click('#ezCtl [data-ez="clear,all"]');await page.waitForTimeout(150);
  ok(!await bb()&&JSON.stringify(await pressed())==='["Leveling"]',"Clear all removes + builds and keeps the strictness");
  ok(/\d+ \/ 200/.test(await page.$eval("#cap",e=>e.textContent)),"the header shows the one rule counter, X / 200");
  ok(/\d+ \/ 200 rules/.test(await page.$eval("#ezOut",e=>e.textContent)),"the Easy Mode status bar shows the rule count");
  ok(!/\d+ \/ 200/.test(await page.$eval("#ezDetS",e=>e.textContent)),"the collapsed details do not repeat it");

  /* Language selector translates the page, also text the app renders later, and restores English */
  { const txt=()=>page.evaluate(()=>document.body.textContent);
    await page.selectOption("#langSel","de");await page.waitForTimeout(700);
    let d=await txt();
    ok(/Filterstrenge/.test(d)&&/Build-Fokus/.test(d)&&/Anleitung/.test(d)&&/Drop-Test/.test(d)&&/Immer behalten/.test(d),"German replaces the header, tabs and Easy Mode headings");
    ok(await page.$eval('#ezCtl [data-ez="pre,endgame"]',b=>/Blendet minderwertige/.test(b.textContent)),"the strictness card text is translated");
    await page.click('#ezCtl [data-ez="arch,cold"]');await page.waitForTimeout(300);
    d=await txt();
    ok(/\+ Builds/.test(d)&&/gewählt/.test(d),"text rendered after the switch (+ builds, picked) is translated");
    await page.click('#ezCtl [data-ez="clear,all"]');await page.waitForTimeout(200);
    await page.selectOption("#langSel","en");await page.waitForTimeout(700);
    d=await txt();
    ok(/Filter strictness/.test(d)&&/Build focus/.test(d)&&!/Filterstrenge|Build-Fokus/.test(d),"switching back restores English");
    ok(await page.$eval("#langSel",e=>e.value)==="en","the selector shows English again");
  }

  /* Guide and About cards: the heading is a role=button */
  for(const v of ["info","about"]){
    await page.click(`[data-view=${v}]`);await page.waitForTimeout(300);
    const card=`#p-${v} .plate.fold.shut`;
    const n=await page.$$eval(`#p-${v} .plate.fold`,c=>c.length);
    ok(n>=2,`${v}: collapsible cards exist (${n})`);
    const head=`${card}>.coltitle`;
    ok(await page.$eval(head,h=>h.getAttribute("role")==="button"&&h.tabIndex===0&&h.getAttribute("aria-expanded")==="false"),`${v}: heading is a focusable button, collapsed`);
    ok(await page.$eval(head,h=>h.querySelector("svg.li,i[data-lucide]")!==null),`${v}: heading has a chevron`);
    await page.focus(head);await page.keyboard.press("Enter");await page.waitForTimeout(200);
    ok(await page.evaluate(v2=>[...document.querySelectorAll(`#p-${v2} .plate.fold`)].some((c,i)=>i>0&&!c.classList.contains("shut")),v),`${v}: Enter opens a collapsed card`);
    await page.keyboard.press("Space");await page.waitForTimeout(200);
    ok(await page.evaluate(v2=>[...document.querySelectorAll(`#p-${v2} .plate.fold`)].filter((c,i)=>i>0).every(c=>c.classList.contains("shut")),v),`${v}: Space closes it again`);
    await page.keyboard.press("Enter");await page.waitForTimeout(200);
    ok(await page.evaluate(v2=>{const c=[...document.querySelectorAll(`#p-${v2} .plate.fold`)].find((c,i)=>i>0&&!c.classList.contains("shut"));return !!c&&getComputedStyle(c.children[1]).display!=="none";},v),`${v}: an opened card shows its content`);
    await icons(page,v);
  }

  /* Module Organizer (needs Vue; the local/CDN copy is served above) */
  await page.click("[data-view=edit]");await page.waitForTimeout(300);
  await page.click("#ezMode button:last-child");await page.waitForTimeout(400); /* Advanced Mode: the Modules button lives there */
  await page.click("#mdOpen");await page.waitForTimeout(600);
  const state=await icons(page,"organizer, opened");
  ok(await page.isVisible(".mdm-dndhint")&&/press and hold/.test(await page.textContent(".mdm-dndhint")),"the organizer explains touch reordering");
  ok(state.chevrons>=1||(await page.$$(".mdm-chev svg")).length>=1,"organizer shows fold chevrons");
  ok((await page.$$(".mdm .mdm-fold .mdm-chev svg")).length>=1,"organizer cards have a chevron icon");
  const allBtn=".mdm button:has-text('ollapse all'),.mdm button:has-text('xpand all')";
  const t0=(await page.textContent(allBtn)).trim();
  await page.click(allBtn);await page.waitForTimeout(250);
  ok((await page.textContent(allBtn)).trim()!==t0,"Collapse/Expand all changes its label");
  ok(await page.evaluate(()=>[...document.querySelectorAll(".mdm-fold .mdm-chev")].every(c=>!c.classList.contains("open"))),"Collapse all: every card chevron points right");
  await icons(page,"organizer, after Collapse all");
  await page.click(allBtn);await page.waitForTimeout(250);
  ok(await page.evaluate(()=>[...document.querySelectorAll(".mdm-fold .mdm-chev")].every(c=>c.classList.contains("open"))),"Expand all: every card chevron points down");
  await icons(page,"organizer, after Expand all");
  await page.click(".mdm-fold");await page.waitForTimeout(200);
  await icons(page,"organizer, after one card fold");
  const q=".mdm input[type=search],.mdm input[placeholder*='earch']";
  await page.fill(q,"armour");await page.waitForTimeout(300);
  await icons(page,"organizer, after a search (list re-rendered)");
  await page.fill(q,"");await page.waitForTimeout(300);
  await icons(page,"organizer, search cleared");
  await page.keyboard.press("Escape");await page.waitForTimeout(250);
  ok(!(await page.isVisible(".mdm-back")),"Esc closes the organizer");
  ok(await page.evaluate(()=>document.activeElement&&document.activeElement.id==="mdOpen"),"focus returns to the Modules button");

  if(mode==="throwing")ok(await page.evaluate(()=>document.querySelectorAll("svg.li").length>10),"throwing Lucide: the built-in icons were drawn");
  ok(errors.length===0,"script errors: "+errors.join(" | "));
  await browser.close();
}



async function runBuildz(){
  pass="build link";
  const {browser,page,errors}=await openPage("normal");
  const zlib=await import("node:zlib");
  const tok=o=>zlib.deflateRawSync(Buffer.from(JSON.stringify(o))).toString("base64url");
  const bd={v:1,name:"Rangtest",level:100,items:[{slot:"MainHand",rarity:"Rare",base:"ct_proj_bow_9",item_level:84,affixes:[{id:"riven95_skill_level_bow",tier:1},{id:"life",tier:2}]},{slot:"Chest",rarity:"Unique",unique:"adders_kiss",affixes:[]}]};
  await page.goto(BASE+"#buildz="+tok(bd));await page.waitForTimeout(900);
  ok(await page.isVisible("#shrLoad"),"a #buildz link opens the import dialog");
  const t=await page.textContent("#shrLoad").catch(()=>"");const dlg=await page.evaluate(()=>document.body.innerText);
  ok(/Import this build/.test(dlg)&&/Rangtest/.test(dlg)&&/Gear pieces/.test(dlg),"the dialog names the build and its gear");
  await page.selectOption("#bzMode","uber");await page.waitForTimeout(200);
  ok(/top roll/.test(await page.textContent("#shrBody")),"the strictness select switches the import to Uber Strict");
  await page.selectOption("#bzMode","leveling");await page.waitForTimeout(200);
  ok(await page.isChecked("#bzHide"),"the hide switch is on by default");
  await page.click("#shrLoad");await page.waitForTimeout(500);
  const n=await page.$$eval("#rows .rrow, #rows > *",e=>e.length);
  ok(n>=3,"Replace my filter loads the build rules ("+n+" rows)");
  ok(!/#buildz=/.test(page.url()),"the link is removed from the address bar");
  await page.goto(BASE+"#buildz=AAAA");await page.waitForTimeout(700);
  ok(/cannot be opened/.test(await page.evaluate(()=>document.body.innerText)),"a broken build link shows the error dialog");
  ok(errors.length===0,"no page errors ("+errors.join("; ")+")");
  await browser.close();
}
async function runNarrow(){
  pass="420px";
  const {browser,page,errors}=await openPage("on",420);
  await page.click("[data-view=edit]");await page.waitForTimeout(300);
  {const sh=await box(page,"#shMake"),cl=await box(page,"#clearF");
   ok(cl.t>=sh.b,"Clear filter sits on its own row below Copy and Share");
   ok(cl.r<=420,"Clear filter is inside the viewport");}
  ok(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+1),"editor: no horizontal scroll");
  await page.click("#mdOpen");await page.waitForTimeout(600);
  await icons(page,"organizer at 420px");
  ok(await page.evaluate(()=>document.querySelector(".mdm").scrollWidth<=document.querySelector(".mdm").clientWidth+1),"organizer: no horizontal scroll");
  const over=await page.evaluate(()=>{const m=document.querySelector(".mdm").getBoundingClientRect(),o=[];document.querySelectorAll(".mdm *").forEach(e=>{const q=e.getBoundingClientRect();if(!q.width||getComputedStyle(e).visibility==="hidden")return;if(q.right>m.right+1){let p=e.parentElement,clip=false;while(p&&p.className!==document.querySelector(".mdm").className){if(/(auto|scroll|hidden)/.test(getComputedStyle(p).overflowX)){clip=true;break;}p=p.parentElement;}if(!clip)o.push((e.id||e.className||e.tagName).toString().slice(0,30));}});return o;});
  ok(over.length===0,"organizer: nothing sticks out on the right ("+over.slice(0,4).join(", ")+")");
  const panes=await page.$$eval(".mdm-pane",p=>p.map(x=>{const r=x.getBoundingClientRect();return {t:r.top+scrollY,b:r.bottom+scrollY};}));
  ok(panes.length===2&&panes[0].b<=panes[1].t+1,"organizer: the module list and the rules do not overlap");
  const lst=await page.evaluate(()=>{const l=document.querySelector("#mdList").getBoundingClientRect(),p=document.querySelector(".mdm-pane").getBoundingClientRect();return l.bottom<=p.bottom+1&&l.top>=p.top;});
  ok(lst,"organizer: the module list stays inside its own pane");
  await page.locator("#mdRules").scrollIntoViewIfNeeded();await page.waitForTimeout(200);
  ok(await page.isVisible(".mdm-dndhint"),"organizer: the reorder hint is visible");
  const arrow=await page.$eval(".mdm-rules .mdm-ib",e=>{const r=e.getBoundingClientRect();return Math.min(r.width,r.height);});
  ok(arrow>=24,"organizer: arrow buttons are at least 24px ("+Math.round(arrow)+"px)");
  await page.keyboard.press("Escape");await page.waitForTimeout(250);
  ok(errors.length===0,"script errors: "+errors.join(" | "));
  await browser.close();
}

try{
  await run("lucide","on");
  await run("no lucide (built-in icons)","nolucide");
  await run("lucide throws","throwing");
  await runBuildz();
  await runNarrow();
}finally{server.close();}
console.log(`${passed} passed, ${failed} failed`);
process.exit(failed?1:0);
