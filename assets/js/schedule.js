const CFG={src:["https://docs.google.com/spreadsheets/d/e/2PACX-1vSlpI1TXzb4Hhzz8cfvg20wh28wub0gEKbPjsQI-FC47eaQkV3kGyXdG5G_kYSdegv4Jp_8wY7QErN-/pub?gid=0&single=true&output=csv"]}; /* 先頭から順に試す。Cloudflare WorkerなどのプロキシURLを使う場合は、配列の先頭に追加する */ /* 公開CSVのURL、または /api/schedule を入れる（手順は運用ガイド参照） */
const W=[["WED","水曜日","水",[["10:30","11:20","Morning Class","SHiN"],["16:00","17:20","Kids","SHiN"],["17:30","18:50","K-POP Girls","Yuzuki"],["19:00","20:20","HipHop/R&B","moeca"]]],["THU","木曜日","木",[["16:00","16:50","Child","SHiN"],["17:00","18:20","Kids","Yuuki"],["18:30","19:50","Girls","Urara"],["20:00","21:20","Jazz","hana ito"]]],["FRI","金曜日","金",[["18:00","19:20","HipHop Freestyle","hina okuyama"],["19:30","20:50","Master Class","講師変動制"]]]];
const VEN={"カムカム新蒲田":"東京都大田区新蒲田一丁目18番16号 カムカム新蒲田","池上会館":"東京都大田区池上1丁目32-8 池上会館","池上会館多目的ホール":"東京都大田区池上1丁目32-8 池上会館"};
const $=s=>document.getElementById(s);
const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const map=v=>"https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(VEN[v]||v);
const p2=n=>String(n).padStart(2,"0");
const norm=s=>String(s).toLowerCase().replace(/[\s\u3000]/g,"");
$("week").innerHTML=W.map(d=>`<div class="day"><h3 class="disp">${d[0]}<small style="font:500 12px 'Noto Sans JP';color:var(--mu);margin-left:10px">${d[1]}</small></h3>${d[3].map(x=>`<div class="row"><span class="tm">${x[0]}–${x[1]}</span><span class="cl">${x[2]}</span><span class="in">${esc(x[3])}</span></div>`).join("")}</div>`).join("");
function parseCSV(t){const r=[];let row=[],f="",q=false;for(let i=0;i<t.length;i++){const c=t[i];if(q){if(c==='"'){if(t[i+1]==='"'){f+='"';i++}else q=false}else f+=c}else if(c==='"')q=true;else if(c===","){row.push(f);f=""}else if(c==="\n"||c==="\r"){if(c==="\r"&&t[i+1]==="\n")i++;row.push(f);r.push(row);row=[];f=""}else f+=c}if(f!==""||row.length){row.push(f);r.push(row)}return r}
const nd=s=>{const m=String(s).match(/(\d{4})\D+(\d{1,2})\D+(\d{1,2})/);return m?m[1]+"-"+p2(m[2])+"-"+p2(m[3]):null};
const nt=s=>{const m=String(s).match(/(\d{1,2})[:：時](\d{2})/);return m?p2(m[1])+":"+m[2]:""};
const nst=s=>{s=String(s);return /休講/.test(s)?"休講":/時間変更/.test(s)?"時間変更":/調整中/.test(s)?"調整中":"通常"};
function toData(rows){const h=rows[0].map(x=>x.replace(/^\uFEFF/,"").trim()),ix=n=>h.indexOf(n),g={},v=(r,n)=>ix(n)<0?"":(r[ix(n)]||"").trim();
 rows.slice(1).forEach(r=>{const d=nd(v(r,"日付"));if(!d)return;const o=g[d]=g[d]||{day:null,cls:[]},c=v(r,"クラス名"),x={c:c,s:nt(v(r,"開始時間")),e:nt(v(r,"終了時間")),v:v(r,"会場"),r:v(r,"部屋名"),st:nst(v(r,"開催状況")+v(r,"状態")),n:v(r,"備考"),raw:v(r,"開催状況")+v(r,"状態")};if(c)o.cls.push(x);else o.day=x});return g}
function card(d,o,today){const dt=new Date(+d.slice(0,4),+d.slice(5,7)-1,+d.slice(8)),wd="日月火水木金土"[dt.getDay()],day=o.day||{v:"",r:"",st:"通常",n:""};
 const rows=((W.find(w=>w[2]===wd)||[0,0,0,[]])[3]).map(t=>({c:t[2],s:t[0],e:t[1],ts:t[0],te:t[1],v:day.v,r:day.r,st:day.st,n:""}));
 o.cls.forEach(x=>{const k=rows.find(r=>norm(r.c)===norm(x.c));if(k){k.v=x.v||day.v;k.r=x.r||day.r;k.st=x.st;k.n=x.n;if(x.s){k.s=x.s;k.e=x.e||k.e;if(x.st==="通常"&&(k.s!==k.ts||k.e!==k.te))k.st="時間変更"}}else rows.push({c:x.c,s:x.s,e:x.e,ts:"",te:"",v:x.v||day.v,r:x.r||day.r,st:x.st,n:x.n})});
 const cv=day.v||(o.day?"":(rows[0]&&rows[0].v)||""),lk=(v,r)=>`<a class="vn" href="${map(v)}" target="_blank" rel="noopener">会場：${esc(v)}${r?" ／ "+esc(r):""} ↗</a>`;
 const bd=day.st==="休講"?'<span class="bd x">全クラス休講</span>':day.st==="時間変更"?'<span class="bd t">時間変更</span>':day.st==="調整中"?'<span class="bd p">調整中</span>':"";
 const ve=cv?lk(cv,day.r):day.st==="休講"?"":'<span class="vn">会場：調整中</span>';
 return `<div class="dc${d<today?" past":""}"><div class="dh"><span class="dd">${+d.slice(8)}</span><span class="dw">${+d.slice(5,7)}月 ${wd}曜日</span>${bd}</div>${ve}${day.n?`<p class="nt">${esc(day.n)}</p>`:""}${rows.map(r=>{
  const tm=!r.s?"時間調整中":r.st==="時間変更"&&r.ts&&(r.s!==r.ts||r.e!==r.te)?`<span class="old">${r.ts}–${r.te}</span> → <span class="tt">${r.s}–${r.e}</span>`:`<span class="tt">${r.s}${r.e?"–"+r.e:""}</span>`;
  const b2=r.st==="休講"&&day.st!=="休講"?'<span class="bd x">休講</span>':r.st==="時間変更"&&day.st!=="時間変更"?'<span class="bd t">時間変更</span>':"";
  return `<div class="cr${r.st==="休講"?" cx":""}"><div class="t1">${tm}<span class="nm">${esc(r.c)}</span>${b2}</div>${r.v&&r.v!==cv?lk(r.v,r.r):""}${r.n?`<p class="nt">${esc(r.n)}</p>`:""}</div>`}).join("")}</div>`}
function show(msg){$("mtabs").innerHTML="";$("mbody").innerHTML=`<div class="empty">${msg}</div>`}
function view(g){const now=new Date(),today=now.getFullYear()+"-"+p2(now.getMonth()+1)+"-"+p2(now.getDate()),b=now<new Date(2027,0,1)?new Date(2027,0,1):now,ms=[0,1,2].map(i=>{const d=new Date(b.getFullYear(),b.getMonth()+i,1);return{k:d.getFullYear()+"-"+p2(d.getMonth()+1),l:(d.getMonth()+1)+"月"}});
 const ok=o=>o.cls.length>0||!!(o.day&&(o.day.v||o.day.raw)),has=m=>Object.keys(g).some(d=>d.startsWith(m.k)&&ok(g[d]));let cur=Math.max(0,ms.findIndex(has));
 const draw=()=>{$("mtabs").innerHTML=ms.map((m,i)=>`<button role="tab" data-i="${i}" aria-selected="${i===cur}">${m.l}</button>`).join("");
  const ds=has(ms[cur])?Object.keys(g).filter(d=>d.startsWith(ms[cur].k)).sort():[];
  $("mbody").innerHTML=ds.length?ds.map(d=>card(d,g[d],today)).join(""):'<div class="empty">未掲載</div>'};
 $("mtabs").onclick=e=>{const b=e.target.closest&&e.target.closest("button");if(b){cur=+b.dataset.i;draw()}};draw()}
const DBG=/[?&#]debug/.test(location.search+location.hash),LOG=[];let csp=false;
const mask=u=>u.replace(/\/e\/[^\/?]+/,"/e/…");
function dlog(m){LOG.push(m);console.log("[schedule] "+m);const p=$("dbg");if(DBG&&p){p.hidden=false;p.textContent=LOG.join("\n")}}
document.addEventListener("securitypolicyviolation",e=>{csp=true;dlog("CSP違反: "+e.violatedDirective+" → "+mask(e.blockedURI||""))});
async function tryGet(u){const t0=Date.now();try{const r=await fetch(u,{cache:"no-store"});dlog(mask(u)+" → HTTP "+r.status+" ("+r.type+", "+(Date.now()-t0)+"ms)");if(!r.ok)throw new Error("HTTP "+r.status);const t=await r.text();if(t.indexOf("日付")<0)throw new Error("CSVの形式ではありません（先頭: "+t.slice(0,40).replace(/\s+/g," ")+"）");return t}catch(e){dlog("失敗: "+(e&&e.name)+": "+(e&&e.message));throw e}}
async function diagnose(u){if(csp)return"原因: CSP。実行環境が外部への通信を禁止しています（Claudeのプレビューはこの制限で読み込めません。公開後の環境で確認してください）";
 try{await fetch(u,{mode:"no-cors",cache:"no-store"});return"原因: CORS。通信は届きますが、応答にAccess-Control-Allow-Originがなく、ブラウザが読み取りを拒否しています（/api/schedule またはWorker経由にしてください）"}catch(e){return"原因: ネットワークに到達できない、またはブロックされています（オフライン、拡張機能、CSPなど）"}}
(async()=>{dlog("origin: "+location.origin+" / "+navigator.userAgent);show("読み込み中…");
 for(const u of CFG.src){try{const t=await tryGet(u);view(toData(parseCSV(t)));dlog("成功: "+mask(u));return}catch(e){}}
 show("スケジュールを読み込めませんでした。時間をおいて、もう一度お試しください。");
 const w=await diagnose(CFG.src[CFG.src.length-1]);dlog(w);console.error("[schedule] "+w)})();
