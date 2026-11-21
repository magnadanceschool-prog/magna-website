/* ===== 講師データ（トップページの講師カードと詳細表示）。クラス・料金・お知らせは data.js ===== */
const INSTRUCTOR_PAGE="instructor.html";
const INSTR=[
 {id:"shin",ig:"https://www.instagram.com/shin_radiofish_",n:"SHiN",cls:"代表 / 水 Morning Class・Kids・Basic Class / 木 Child / 日 Training Class",pos:"50% 20%",txt:"MAGNA DANCE SCHOOL代表。事務所：ワタナベエンターテインメント所属／アーティスト：RADIOFISH。現在は次世代のダンサー育成に力を入れている。"},
 {id:"moeca",ig:"https://www.instagram.com/moeca_kimura",n:"moeca",cls:"水 HipHop/R&B",pos:"50% 10%",txt:"8歳でJAZZを始め、9歳でHIP HOPを始める。FUNKJAZZ、モダンバレエ、コンテンポラリーなど様々なジャンルを習得。高校卒業とともに、東京スカイツリーでのパフォーマーダンサーをきっかけに上京。チーム活動、ナンバー出展、インストラクター、様々なMV・LIVE出演など。"},
 {id:"hina",ig:"https://www.instagram.com/hinaokuyama",n:"hina okuyama",cls:"金 HipHop Freestyle",pos:"50% 20%",txt:"6歳からダンスをはじめ、今はHIP-HOP、freestyleを中心にダンサー、インストラクターとして活動中。"},
 {id:"yuuki",ig:"https://www.instagram.com/nn__uu__",n:"Yuuki",cls:"木 Kids",pos:"50% 70%",txt:"高校の部活動からダンスを始め、専門学校進学後にHipHop、Jazz、Contemporary、House、Heelsなど幅広くジャンルを習得。現在はインストラクターを中心に、ダンサーとして活動中。メンズアイドル育成経験あり。"},
 {id:"hana",ig:"https://www.instagram.com/hanaito0216",n:"hana ito",cls:"木 Jazz",pos:"50% 45%",txt:"高校卒業後ダンスを始め、Jazz・Contemporaryを主にその他様々なジャンルに触れる。関東某テーマパークでのパフォーマーを経て、現在はダンサー、インストラクターとして東京・大阪を拠点に活動中。"},
 {id:"urara",ig:"https://www.instagram.com/urara111",n:"Urara",cls:"木 Girls",pos:"50% 10%",txt:"8歳の頃に大阪のHIRO DANCE COMPANYでダンスを始め、Jazz / Hiphop / Funkjazz / Balletなど様々なジャンルを習得。現在は東京を拠点にLIVE、MV、振付、アシスタントなどの活動をしている。"},
 {id:"yuzuki",ig:"https://www.instagram.com/snmn_yuzu",n:"Yuzuki",cls:"水 K-POP Girls",pos:"50% 60%",txt:""}];
/* ===== ここまで ===== */

const $=s=>document.querySelector(s);
const md=$("#md");
$("#instBody").innerHTML=INSTR.map((x,i)=>`<button class="p" data-i="${i}" aria-label="${x.n}の詳細"><img src="assets/images/instructors/${x.id}.jpg" alt="${x.n}" style="object-position:${x.pos}"><em>${x.n}</em><span>${x.cls}</span></button>`).join("");
$("#instBody").addEventListener("click",e=>{const b=e.target.closest(".p");if(!b)return;const x=INSTR[b.dataset.i];
 md.innerHTML=`<div class="bx" role="dialog" aria-modal="true" aria-label="${x.n}"><button class="x" aria-label="閉じる">×</button><img src="assets/images/instructors/${x.id}.jpg" alt="${x.n}" style="object-position:${x.pos}"><div class="tx"><h3 class="disp">${x.n}</h3><p class="cls">${x.cls}</p>${x.txt?`<p>${x.txt}</p>`:""}<a class="more" href="${INSTRUCTOR_PAGE}#${x.id}">経歴を見る</a>${x.ig?`<a class="more ig" href="${x.ig}" target="_blank" rel="noopener">Instagram ↗</a>`:""}</div></div>`;
 md.hidden=false;md.querySelector(".x").focus()});
md.addEventListener("click",e=>{if(e.target===md||e.target.closest(".x"))md.hidden=true});
document.addEventListener("keydown",e=>{if(e.key==="Escape")md.hidden=true});
