# Ionicで始めるPWA開発

技術書典6で出版した「[Ionicで始めるPWA開発](https://techbookfest.org/event/tbf06/circle/34010001)」 のサポートリポジトリです。

このリポジトリには本書で作成するサンプルコードの他に、各コンポーネントの解説をしています。
解説については随時追加していきます。


## デモサイト

本ソースコードは以下のURLで公開されています。レイアウトはスマホに特化しています。

[https://anonymous-messenger-sample.firebaseapp.com](https://anonymous-messenger-sample.firebaseapp.com)

## 各コンポーネントについて

以下が各コンポーネントの構成です。

| コンポーネント | 説明 |
| :--- | :--- |
| app-root | ルーティング |
| commons/app-message-list | メッセージ一覧 |
| commons/app-onboarding | ログイン前画面 |
| commons/app-textarea | 質問フォーム |
| commons/auth-button | ログインボタン |
| commons/user-profile | ユーザー表示 |
| page-home | ホーム画面 |
| page-message-answer | メッセージ詳細画面 |
| page-message | メッセージ一覧画面 |
| page-setting | 設定画面 |
| page-tabs | タブレイアウト |
| page-other-user-message | ユーザー別のメッセージ一覧画面 |
| page-user-detail | ユーザー詳細画面 |
| page-user | ユーザー一覧画面 |

## サンプルを動かすには

サンプルを動かすためにはFirebaseのプロジェクトの設定が必要です。
第4章にFirebaseの設定についての記載があるのでそこでプロジェクトを作成し、src/helpers/firebaseConfig.ts のファイルにAPI_KEY等を設定してください。


```typescript:src/helpers/firebaseConfig.ts
export var firebaseConfig = {
  apiKey: "<API_KEY>",
  authDomain: "<AUTH_DOMAIN>",
  databaseURL: "<DATABASE_URL>",
  projectId: "<PROJECT_ID>",
  storageBucket: "<STORAGE_BUCKET>",
  messagingSenderId: "<MESSAGING_SENDER_ID>"
};
```

## 意見と質問

このサンプルコードについて気になる点がありましたらTwitterかこのリポジトリのイシューに投げていただけると助かります。

* TwitterID: @scrpgil  
* GitHubID: scrpgil  

