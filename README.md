# MAGNA DANCE SCHOOL 公式ホームページ（magna-website）

GitHub Pagesで公開する静的サイトです。ビルド不要で、このフォルダの中身をそのままアップロードすれば動きます。

## 構成
| ファイル | 内容 |
|---|---|
| `index.html` | トップページ（NEWS・CLASS・PRICE・INSTRUCTOR・ACCESS・CONTACT） |
| `instructor.html` | 講師紹介（経歴の全文） |
| `schedule.html` | レッスンスケジュール（月別の会場・休講は、Googleスプレッドシートから読み込み） |
| `terms.html` | 会員規約（2027年1月1日施行） |
| `assets/css/` | `style.css`（全ページ共通）、ページ別のCSS |
| `assets/js/` | ページ別のJavaScript、`common.js`（表示アニメーション） |
| `assets/images/` | ロゴ、ヒーロー写真、LINEのQR、`instructors/`（講師写真） |
| `tools/` | スケジュール用のスプレッドシート雛形、Cloudflare Worker（任意） |

リンクはすべて相対パスです。プロジェクトサイト（`https://ユーザー名.github.io/magna-website/`）でも、独自ドメインでも動きます。

## 公開手順（GitHub Pages）
1. GitHubでリポジトリ `magna-website` を作る（Public）。
2. このフォルダの中身を、リポジトリの直下にアップロードする（`.nojekyll` も含める）。
3. リポジトリの Settings → Pages → Source を「Deploy from a branch」、Branch を `main` / `(root)` にして保存する。
4. 数分後、`https://ユーザー名.github.io/magna-website/` で公開される。

## 更新するとき
- **文言・料金・時間割**: `assets/js/data.js`（時間割・NEWS・料金はここ。トップ・news.html・class.html・price.html に反映）、`assets/js/index.js`（講師の紹介文・Instagram）、各HTML（HTMLにも同じ内容が書かれているので、あわせて直します）
- **講師の経歴**: `assets/js/instructor.js`
- **講師の写真**: `assets/images/instructors/<名前>.jpg` を同じ名前で差し替える
- **会員規約**: `terms.html`
- **月別の会場・休講**: コードの変更は不要。Googleスプレッドシートを編集する（iPhoneのアプリで可）。反映まで数分かかる。

## スケジュールとスプレッドシート
- 読み込み先は `assets/js/schedule.js` の `CFG.src`（スプレッドシートの公開CSV）。
- 読み込めないときは、ページのURLの末尾に `#debug` を付けると、原因（CSP / CORS / ネットワーク）が表示される。
- GitHub Pagesでは `/api` などのサーバー処理は使えない。CORSで失敗する場合は、`tools/cloudflare-worker.js` をCloudflare Workerとして作り、そのURLを `CFG.src` の先頭に追加する。
- 公開するのは「schedule」シートだけ。備考欄は、そのまま公開される。
