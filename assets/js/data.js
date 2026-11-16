/* ===== 更新用データ：ここを書き換えるだけでクラス・料金・お知らせが変わります ===== */
const NEWS=[
 {date:"2026.10.16",tag:"実績",t:"ANIMA FORTIS 3位入賞",d:"2026年9月27日のDANCE STAGE CONTEST in LANDMARKHALL 2026で、コンテストチームのANIMA FORTISが3位に入賞しました。振り付け指導はhina okuyama先生です。"},
 {date:"2026.09.20",tag:"重要",t:"2027年度のクラス再編成について",d:"2027年度より、レッスンの80分化、チケット料金の変更、受け放題プランの廃止を行います。詳細はClass・Priceをご覧ください。",w:1}
];
const DAYS={
 WED:[["10:30–11:20","Morning Class","SHiN"],["16:00–17:20","Kids","SHiN"],["17:30–18:50","K-POP Girls","Yuzuki"],["19:00–20:20","HipHop/R&B","moeca"]],
 THU:[["16:00–16:50","Child","SHiN"],["17:00–18:20","Kids","Yuuki"],["18:30–19:50","Girls","Urara"],["20:00–21:20","Jazz","hana ito"]],
 FRI:[["18:00–19:20","HipHop Freestyle","hina okuyama"],["19:30–20:50","Master Class","講師変動制"]]};
const CARDS=[
 {h:"50分クラス（18歳以上）",l:[["ビジター（当日1回）","¥3,000"],["チケット4回","¥10,000"],["チケット10回","¥21,000"]]},
 {h:"Kidsクラス（80分）",l:[["ビジター（当日1回）","¥3,500"],["チケット4回","¥12,000"],["チケット10回","¥26,000"]]},
 {h:"Childクラス（50分）",l:[["ビジター（当日1回）","¥2,500"],["チケット4回","¥8,000"],["チケット10回","¥16,000"]]},
 {h:"3クラス定額プラン",l:[["月額（月3クラスまで）","¥24,000"]],x:"3クラス以上は、このプランに10回チケットを組み合わせて受講できます。"},
 {h:"プライベートレッスン（SHiN）",l:[["月1回 60分","¥10,000"],["月1回 90分","¥15,000"]],x:"2〜4回のプランもあります。別途スタジオ代がかかります。"}];
/* ===== ここまで ===== */

(function(){
 var el=function(i){return document.getElementById(i)};
 var DAYJP={WED:"水曜日",THU:"木曜日",FRI:"金曜日"};
 var n=el("newsList");
 if(n){var short=n.hasAttribute("data-short");
  n.innerHTML=(short?NEWS.slice(0,3):NEWS).map(function(x){return '<li><time>'+x.date+'</time><div class="t"><span class="tag'+(x.w?" w":"")+'">'+x.tag+'</span>'+x.t+'</div>'+(!short&&x.d?'<p class="d">'+x.d+'</p>':"")+'</li>'}).join("")}
 var c=el("classBody");
 if(c)c.innerHTML=Object.keys(DAYS).map(function(d){return '<div class="day"><h3 class="disp">'+d+'<small style="font:500 12px \'Noto Sans JP\';color:var(--mu);margin-left:10px">'+DAYJP[d]+'</small></h3>'+DAYS[d].map(function(x){return '<div class="row"><span class="tm">'+x[0]+'</span><span class="cl">'+x[1]+'</span><span class="in">'+x[2]+'</span></div>'}).join("")+'</div>'}).join("");
 var p=el("priceBody");
 if(p)p.innerHTML=CARDS.map(function(c){return '<div class="card"><h3>'+c.h+'</h3>'+c.l.map(function(x){return '<div class="ln"><span>'+x[0]+'</span><b>'+x[1]+'</b></div>'}).join("")+(c.x?'<p style="margin:12px 0 0;font-size:12px;color:var(--mu)">'+c.x+'</p>':"")+'</div>'}).join("")})();
