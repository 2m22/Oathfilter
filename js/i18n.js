/* Page-text translation. The English text of the page is the key: lang/<code>.json carries "ui3": {"English text": "translation"}.
   Text nodes and the title / aria-label / placeholder attributes are swapped in place, also for text the app writes later (a MutationObserver re-applies it).
   Keys may hold {n}-style placeholders ("{n} picked"). Anything without a translation stays English. */
const ATTRS=["title","aria-label","placeholder"];
const SKIP=/^(SCRIPT|STYLE|TEXTAREA|CODE|PRE)$/;
export function createI18n(getDict){
  let tmpl=null,tmplFor=null;
  const templates=d=>{
    if(tmplFor===d)return tmpl;
    tmplFor=d;tmpl=Object.keys(d).filter(k=>/\{\w+\}/.test(k)).map(k=>{
      const names=[];const re=new RegExp("^"+k.replace(/[.*+?^$()|[\]\\]/g,"\\$&").replace(/\{(\w+)\}/g,(m,n)=>{names.push(n);return "(.+?)";})+"$");
      return{re,names,to:d[k]};});
    return tmpl;
  };
  const lookup=key=>{
    const d=getDict()||{};if(!key)return key;
    if(Object.prototype.hasOwnProperty.call(d,key))return d[key];
    for(const t of templates(d)){const m=key.match(t.re);if(m)return t.to.replace(/\{(\w+)\}/g,(x,n)=>{const i=t.names.indexOf(n);return i>=0?m[i+1]:x;});}
    return key;
  };
  const tx=(s,vars)=>{let r=lookup(s);if(vars)r=r.replace(/\{(\w+)\}/g,(x,n)=>vars[n]!==undefined?vars[n]:x);return r;};
  const node=n=>{
    const v=n.nodeValue;let key;
    if(n.__t!==undefined&&v===n.__t)key=n.__o;
    else{key=v.replace(/\s+/g," ").trim();if(!key||!/[A-Za-z]/.test(key)){n.__t=undefined;return;}n.__w=[v.match(/^\s*/)[0],v.match(/\s*$/)[0]];}
    const t=lookup(key);
    if(t===key&&n.__t===undefined)return; /* nothing to translate, nothing to remember */
    const out=(n.__w?n.__w[0]:"")+t+(n.__w?n.__w[1]:"");
    n.__o=key;n.__t=out;if(n.nodeValue!==out)n.nodeValue=out;
  };
  const attrs=el=>{
    ATTRS.forEach(a=>{if(!el.hasAttribute||!el.hasAttribute(a))return;
      const cur=el.getAttribute(a),m=el.__a||(el.__a={}),s=m[a];let key;
      if(s&&s.t===cur)key=s.o;else{key=cur.trim();if(!/[A-Za-z]/.test(key))return;}
      const t=lookup(key);if(t===key&&!s)return;
      m[a]={o:key,t};if(cur!==t)el.setAttribute(a,t);});
  };
  const walk=root=>{
    if(!root)return;
    if(root.nodeType===3){if(!SKIP.test(root.parentNode&&root.parentNode.tagName||""))node(root);return;}
    if(root.nodeType!==1||SKIP.test(root.tagName)||root.hasAttribute("data-noi18n"))return;
    attrs(root);
    for(let c=root.firstChild;c;c=c.nextSibling)walk(c);
  };
  let obs=null;
  const apply=(root)=>{if(obs)obs.disconnect();try{walk(root||document.body);}finally{if(obs)obs.observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:ATTRS});}};
  const start=()=>{
    let q=new Set(),pend=false;
    obs=new MutationObserver(ms=>{
      ms.forEach(m=>{if(m.type==="childList")m.addedNodes.forEach(n=>q.add(n));else q.add(m.target);});
      if(!pend){pend=true;queueMicrotask(()=>{pend=false;const l=[...q];q=new Set();obs.disconnect();try{l.forEach(n=>walk(n.nodeType===3?n:n));}finally{obs.observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:ATTRS});}});}
    });
    apply(document.body);
  };
  return{tx,apply,start,lookup};
}
