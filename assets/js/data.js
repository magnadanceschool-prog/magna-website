/* ===== 更新用データ：ここを書き換えるだけでクラス・料金・お知らせが変わります ===== */
const NEWS=[
 {date:"2026.10.16",tag:"実績",t:"ANIMA FORTIS 3位入賞",d:"2026年9月27日のDANCE STAGE CONTEST in LANDMARKHALL 2026で、コンテストチームのANIMA FORTISが3位に入賞しました。振り付け指導はhina okuyama先生です。"},
 {date:"2026.09.20",tag:"重要",t:"2027年度のクラス再編成について",d:"2027年度より、レッスンの80分化、チケット料金の変更、受け放題プランの廃止を行います。詳細はClass・Priceをご覧ください。",w:1}
];
const DAYS={
 WED:[["10:30–11:20","Morning Class","SHiN","morning"],["16:00–17:20","Kids","SHiN","kids-wed"],["17:30–18:50","K-POP Girls","Yuzuki","kpop-girls"],["19:00–20:20","HipHop/R&B","moeca","hiphop-rnb"],["20:30–21:20","Basic Class","SHiN","basic"]],
 THU:[["16:00–16:50","Child","SHiN","child"],["17:00–18:20","Kids","Yuuki","kids-thu"],["18:30–19:50","Girls","Urara"],["20:00–21:20","Jazz","hana ito"]],
 FRI:[["18:00–19:20","HipHop Freestyle","hina okuyama","hiphop-freestyle"],["19:30–20:50","Master Class","講師変動制","master"]],
 SUN:[["時間変動","Training Class","SHiN","training"]]};
const CARDS=[
 {h:"50分クラス（18歳以上）",l:[["ビジター（当日1回）","¥3,000"],["チケット4回","¥10,000"],["チケット10回","¥21,000"]]},
 {h:"Kidsクラス（80分）",l:[["ビジター（当日1回）","¥3,500"],["チケット4回","¥12,000"],["チケット10回","¥26,000"]]},
 {h:"Childクラス（50分）",l:[["ビジター（当日1回）","¥2,500"],["チケット4回","¥8,000"],["チケット10回","¥16,000"]]},
 {h:"3クラス定額プラン",l:[["月額（月3クラスまで）","¥24,000"]],x:"3クラス以上は、このプランに10回チケットを組み合わせて受講できます。"},
 {h:"プライベートレッスン（SHiN）",l:[["月1回 60分","¥10,000"],["月1回 90分","¥15,000"]],x:"2〜4回のプランもあります。別途スタジオ代がかかります。"}];
/* お知らせは、スプレッドシートの「お知らせ」タブから読み込みます（読み込めない場合は上のNEWSを表示します） */
const NEWS_CSV="https://docs.google.com/spreadsheets/d/e/2PACX-1vSlpI1TXzb4Hhzz8cfvg20wh28wub0gEKbPjsQI-FC47eaQkV3kGyXdG5G_kYSdegv4Jp_8wY7QErN-/pub?gid=452681320&single=true&output=csv";
/* ===== ここまで ===== */

(function(){
 var el=function(i){return document.getElementById(i)};
 var DAYJP={WED:"水曜日",THU:"木曜日",FRI:"金曜日",SUN:"日曜日"};
 var n=el("newsList");
 var esc=function(t){return String(t==null?"":t).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})};
 function drawNews(list,fromSheet){
  var short=n.hasAttribute("data-short");
  n.innerHTML=(short?list.slice(0,3):list).map(function(x){var t=fromSheet?esc(x.t):x.t,tag=fromSheet?esc(x.tag):x.tag,d=fromSheet?esc(x.d).replace(/\n/g,"<br>"):x.d;return '<li><time>'+x.date+'</time><div class="t">'+(tag?'<span class="tag'+(x.w?" w":"")+'">'+tag+'</span>':"")+t+'</div>'+(!short&&d?'<p class="d">'+d+'</p>':"")+'</li>'}).join("")}
 function csv(t){var r=[],row=[],f="",q=false;for(var i=0;i<t.length;i++){var c=t[i];if(q){if(c==='"'){if(t[i+1]==='"'){f+='"';i++}else q=false}else f+=c}else if(c==='"')q=true;else if(c===","){row.push(f);f=""}else if(c==="\n"||c==="\r"){if(c==="\r"&&t[i+1]==="\n")i++;row.push(f);r.push(row);row=[];f=""}else f+=c}if(f!==""||row.length){row.push(f);r.push(row)}return r}
 function fromCSV(t){
  var rows=csv(t);if(rows.length<2)return [];
  var h=rows[0].map(function(x){return x.replace(/^\uFEFF/,"").replace(/[\s\u3000]/g,"").toLowerCase()});
  function col(names,def){for(var i=0;i<names.length;i++){var k=h.indexOf(names[i]);if(k>=0)return k}return def}
  var ci={d:col(["日付","日にち","date"],0),g:col(["種別","タグ","カテゴリ","カテゴリー","分類"],1),t:col(["タイトル","見出し","題名","title"],2),b:col(["本文","詳細","内容","body"],3)};
  var out=[];
  rows.slice(1).forEach(function(r){
   var m=String(r[ci.d]||"").match(/(\d{4})\D+(\d{1,2})\D+(\d{1,2})/),ti=String(r[ci.t]||"").trim();
   if(!m||!ti)return;
   var z=function(v){return ("0"+v).slice(-2)},tag=String(r[ci.g]||"").trim();
   out.push({date:m[1]+"."+z(m[2])+"."+z(m[3]),tag:tag,t:ti,d:String(r[ci.b]||"").trim(),w:/重要/.test(tag)})});
  out.sort(function(a,b){return a.date<b.date?1:a.date>b.date?-1:0});
  return out}
 if(n){drawNews(NEWS,false);
  if(typeof NEWS_CSV==="string"&&NEWS_CSV&&window.fetch)fetch(NEWS_CSV).then(function(r){if(!r.ok)throw 0;return r.text()}).then(function(t){var l=fromCSV(t);if(l.length)drawNews(l,true)}).catch(function(){})}
 var c=el("classBody");
 if(c)c.innerHTML=Object.keys(DAYS).map(function(d){return '<div class="day"><h3 class="disp">'+d+'<small style="font:500 12px \'Noto Sans JP\';color:var(--mu);margin-left:10px">'+DAYJP[d]+'</small></h3>'+DAYS[d].map(function(x){return '<div class="row"><span class="tm">'+x[0]+'</span><span class="cl">'+(x[3]?'<a href="class-'+x[3]+'.html">'+x[1]+'</a>':x[1])+'</span><span class="in">'+x[2]+'</span></div>'}).join("")+'</div>'}).join("");
 var p=el("priceBody");
 if(p)p.innerHTML=CARDS.map(function(c){return '<div class="card"><h3>'+c.h+'</h3>'+c.l.map(function(x){return '<div class="ln"><span>'+x[0]+'</span><b>'+x[1]+'</b></div>'}).join("")+(c.x?'<p style="margin:12px 0 0;font-size:12px;color:var(--mu)">'+c.x+'</p>':"")+'</div>'}).join("")})();
