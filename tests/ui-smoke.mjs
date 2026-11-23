/* Browser smoke check for the collapsible UI and the Lucide icons.
     node tests/ui-smoke.mjs
   Needs Playwright (the logic tests in tests/run.mjs do not):  npm i -D playwright && npx playwright install chromium
   Exit code 0 = all checks passed, 1 = a check failed, 2 = Playwright is not installed (nothing was checked).
   Offline / sandbox: point it at local copies of the CDN files, e.g.
     OF_VUE_FILE=/path/vue.esm-browser.prod.js OF_LUCIDE_FILE=/path/lucide.min.js node tests/ui-smoke.mjs
   Without these variables the real CDN files are used. If Playwright is installed outside the project, OF_PLAYWRIGHT=/path/to/playwright/index.js.
   It runs three passes: with Lucide, without Lucide (the built-in SVG icons) and with a Lucide that throws.
   Checked per pass: no script errors, no icon placeholders or empty icons, no leftover text arrows,
   fold toggling by mouse and keyboard (Advanced folds, "More conditions", Easy Mode "Details", Guide and About cards),
   fold chevrons turning with the state, and the Module Organizer (fold chevrons, re-render, Esc, focus return). */
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

async function run(name,mode){
  pass=name;
  const browser=await chromium.launch();
  const page=await (await browser.newContext({viewport:{width:1400,height:1000}})).newPage();
  const errors=[];
  page.on("pageerror",e=>errors.push(String(e).slice(0,160)));
  page.on("console",m=>{if(m.type()==="error"&&!/Failed to load|ERR_|net::/.test(m.text()))errors.push(m.text().slice(0,160));});
  await page.route("**/*",async route=>{
    const u=route.request().url();
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
  await page.click("[data-view=edit]");await page.waitForTimeout(300);
  await icons(page,"editor, first load");

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

  /* Easy Mode "Details" keeps its chevron when its text is updated */
  await page.click("#ezMode button:first-child");await page.waitForTimeout(400);
  await icons(page,"Easy Mode");
  ok((await page.$$("#ezDet>summary .fold-chev")).length===1,"Easy Mode Details has one chevron");
  await page.click("#ezDet>summary");await page.waitForTimeout(200);
  ok(await page.$eval("#ezDet",d=>d.open),"Easy Mode Details opens");
  ok(await page.evaluate(ROT,"#ezDet .fold-chev")===ROTATED,"Easy Mode Details chevron turns");
  await page.focus("#ezDet>summary");await page.keyboard.press("Enter");await page.waitForTimeout(150);
  ok(!(await page.$eval("#ezDet",d=>d.open)),"Enter closes Easy Mode Details");

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

try{
  await run("lucide","on");
  await run("no lucide (built-in icons)","nolucide");
  await run("lucide throws","throwing");
}finally{server.close();}
console.log(`${passed} passed, ${failed} failed`);
process.exit(failed?1:0);
