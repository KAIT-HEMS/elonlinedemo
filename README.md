# ECHONET Lite Online Control Demonstration Program - エコーネットライト オンライン制御デモアプリ

The ECHONET Lite (EL) Online Control Demonstration Program provides an easy-to-use UI to allow users to search, confugure, or get/set property values of, any EL-compliant devices (or nodes) that can communicate with your system through UDP.

## インストール手順

1. 該当するGitレポジトリーを `git-clone` 。

   ```bash
   git clone git@bitbucket.org:team-itra/el-demoapp.git
   cd el-demoapp
   ```

2. インストールしたいブランチを `git-checkout` 。

   ```bash
   git checkout <ブランチ名>
   ```

3. 依存ライブラリーをインストール。

   ```bash
   npm ci
   ```

4. Web UIのソースコードをビルド。

   ```bash
   npm run build
   ```

## アンインストール手順

1. `el-demoapp` フォルダーを削除。

## 初期設定

1. `el-demoapp` > `conf` > `app.json` を任意のテキストエディターで開く。

2. 下表を参考に、必要なプロパティー値を変更。デフォルト値のままでもOK。

   | 主要プロパティー | データ型 | 内容 |
   | --- | --- | --- |
   | title | string | 本アプリ名。起動時にターミナルに表示される。 |
   | copyright | string | 著作権表記。起動時にターミナルに表示される。 |
   | dict.text | string | Web UIの国際化テキストファイルのパス。 |
   | dict.mra | string | `mraData` フォルダーのパス。 |
   | dict.mfrs | string | ELメーカーコードファイルのパス。 |
   | dir.html | string | Web UIのドキュメントルート。デフォルトはVue CLIツールのビルド出力先 `dist` フォルダー。 |
   | dir.help | string | ヘルプ画面で表示するヘルプドキュメント保管用のフォルダー。本アプリは当フォルダー内のファイル名が `help_(en\|ja).md` のMarkdownファイルを読込む。デフォルトは `doc` フォルダー。 |
   | dir.tmp | string | 本アプリが実行中に使用する一時ファイル保管用のフォルダー。デフォルトは `tmp` フォルダー。 |
   | verbose | boolean | 詳細ログ出力モードでの起動を常に有効にするか否か。 |
   | http.port | number | Webサーバー（HTTP、WebSocket通信）の待受ポート番号。Web UIへのアクセスなどに使用。 |
   | el.network | string | ELコントローラーが参加するネットワーク。`vpn` `lan` `cloud` のいずれか。 |
   | el.ipv6 | boolean | ELコントローラーがIPv6を使用するか否か。 |
   | el.multicast.ipv4 | string | ELのマルチキャストアドレス（IPv4）。 |
   | el.multicast.ipv6 | string | ELのマルチキャストアドレス（IPv6）。 |
   | el.port | number | ELの待受ポート番号。 |
   | el.self | object | セルフノードのEOJとそのプロパティー。 |
   | el.myeoj | string | セルフノードの主要EOJ。デフォルトは `05FF01`（コントローラー）。 |
   | el.interval | number | ELフレームの送信間隔。ミリ秒単位。 |
   | settings.singleDeviceOptions | array | 単体機器制御設定画面に表示されるクラスとチェック状態のリスト。 |

   ※プロパティー名の変更、プロパティー値のデータ型の変更、プロパティーの削除は動作保証外。

## 起動手順

1. `el-demoapp` フォルダーをターミナルで開く。

2. 下表を参考に、必要な起動モードの起動コマンドを入力。

   | 起動モード         | 起動コマンド                      |
   | ------------------ | --------------------------------- |
   | サイレントモード   | `node .`　または　`npm run start` |
   | 詳細ログ出力モード | `node . v`                        |

   ※`app.json` の `verbose` プロパティーが `true` であれば、起動コマンドに依らず、常に「詳細ログ出力モード」となる。

3. `Hello` と表示されれば起動完了。

4. この時点から、本アプリが「エコーネットライト コントローラー」として動作開始。

5. 表示されたURL（IPv4とIPv6のどちらでも）にWebブラウザーでアクセス。

6. この時点から、Webブラウザーと本アプリとのWebSocket通信が開始。

## 終了手順

1. 本アプリを起動したターミナルで `Ctrl + C` を押下。
2. `Bye` と表示されれば終了。

