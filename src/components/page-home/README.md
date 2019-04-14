# page-home

page-homeはホーム画面のコンポーネントになります。

![Imgur](https://i.imgur.com/mwlj4XX.png)


### 質問送付後にメッセージ詳細画面へ遷移する処理を追加

send()関数内でメッセージ詳細画面に遷移する処理を追加

```
(this.el.closest("ion-nav") as any).push("page-message-answer", {
  uid: this.loginUser.uid,
  id: res.id
});
```


### オンボーディング画面の追加

非ログイン時にオンボーディング画面を表示するようにしています。

```
} else {
  return <app-onboarding />;
}
```
