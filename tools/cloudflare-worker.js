// Cloudflare Worker（Pagesの配置方法に関係なく使える代替案）
// ダッシュボードの「Workers & Pages」→「Create」→「Worker」に貼り付けて、デプロイする。
// 発行された https://○○.workers.dev のURLを、ページの CFG.src の先頭に追加する。
const DEFAULT_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSlpI1TXzb4Hhzz8cfvg20wh28wub0gEKbPjsQI-FC47eaQkV3kGyXdG5G_kYSdegv4Jp_8wY7QErN-/pub?gid=0&single=true&output=csv";

export default {
  async fetch(request, env) {
    const cors = { "access-control-allow-origin": "*" }; // 公開データのみのため全許可（必要ならサイトのURLに限定）
    const res = await fetch(env.SHEET_CSV_URL || DEFAULT_URL, { cf: { cacheTtl: 60, cacheEverything: true } });
    if (!res.ok) return new Response("upstream " + res.status, { status: 502, headers: cors });
    return new Response(await res.text(), {
      headers: { ...cors, "content-type": "text/csv; charset=utf-8", "cache-control": "public, max-age=60" },
    });
  },
};
