# app-root

app-rootは、主にルーティングの情報が書かれたファイルです。
本サンプルコードでは、タブレイアウト用のルーティング構成になっています。

## ルーティング

| コンポーネント | URL | 説明 |
| :--- | :--- | :--- |
| page-home | /home | ホーム画面 |
| page-message-answer | /home/:ユーザーID/:メッセージID | メッセージ詳細画面 |
| page-message | /message | メッセージ一覧画面 |
| page-message-answer | /message/:ユーザーID/:メッセージID | メッセージ詳細画面 |
| page-user | /user | ユーザー一覧画面 |
| page-user-detail | /user/:ユーザーID | ユーザー詳細画面 |
| page-other-user-message | /user/:ユーザーID/:メッセージID  | ユーザー別のメッセージ一覧画面 |
| page-message-answer | /user/:ユーザーID/:メッセージID | メッセージ詳細画面 |
| page-setting | /setting | 設定画面 |

## リダイレクト

次のコードにより、/のURLを/homeにリダイレクトしています。

```
<ion-route-redirect from="/" to="home" />
```
