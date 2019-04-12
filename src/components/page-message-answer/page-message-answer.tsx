import { Component, State, Prop } from "@stencil/core";
import { UserProvider } from "../../providers/user";
import { MessageProvider } from "../../providers/message";
import { APP_NAME } from "../../helpers/config";

@Component({
  tag: "page-message-answer",
  styleUrl: "page-message-answer.scss"
})
export class MessageDetailPage {
  @State() loginUser: any = null;
  @State() user: any = null;
  @State() text: string = "";
  @State() message: any;
  @State() twitterLink: string = "#";

  @Prop() uid: string;
  @Prop() id: string;
  @Prop({ connect: "ion-loading-controller" })
  loadingCtrl: HTMLIonLoadingControllerElement;

  componentWillLoad() {
    this.loggedIn();
    this.getMessage();
    this.getUser();
  }

  async getUser() {
    this.user = await UserProvider.get(this.uid);
  }

  async getMessage() {
    this.message = await MessageProvider.get(this.uid, this.id);
    if (this.message && this.message.answered) {
      this.text = this.message.answer;
      const link =
        "https://" + location.host + "/user/" + this.uid + "/" + this.id;
      this.twitterLink =
        "https://twitter.com/intent/tweet?url=" +
        encodeURIComponent(link) +
        "&text=" +
        encodeURIComponent(this.message.answer);
    }
  }

  async loggedIn() {
    this.loginUser = await UserProvider.loggedIn();
  }

  async send(ev) {
    if (ev && ev.detail) {
      const loadingElement = await this.loadingCtrl.create({
        message: "送信中",
        translucent: true,
        duration: 20000
      });
      await loadingElement.present();
      const message = { answer: ev.detail };
      const token = await UserProvider.getToken();
      await MessageProvider.answer(token, this.uid, this.id, message);
      await loadingElement.dismiss();
    }
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-back-button text="戻る" />
          </ion-buttons>
          <ion-title>{APP_NAME}</ion-title>
          <ion-buttons slot="end">
            <auth-button />
          </ion-buttons>
        </ion-toolbar>
      </ion-header>,

      <ion-content padding>
        <div class="thumbnail-wrapper">
          <img
            src={
              "https://firebasestorage.googleapis.com/v0/b/anonymous-messenger-sample.appspot.com/o/users%2F" +
              this.uid +
              "%2F" +
              this.id +
              "%2F" +
              this.id +
              ".jpg?alt=media"
            }
          />
          {(() => {
            if (this.message) {
              return (
                <div class="answer-wrapper">
                  <div class="user-wrapper">
                    <user-profile
                      image={this.user.icon}
                      name=""
                      size={50}
                      message=""
                    />
                    <div class="name-wrapper">{this.user.name}</div>
                  </div>
                  <div class="answer-message-wrapper">
                    {this.message.answered
                      ? this.message.answer
                      : "まだ回答はありません"}
                  </div>
                  {(() => {
                    if (this.message.answered) {
                      return (
                        <div class="post-twitter-wrapper">
                          <a
                            class="post-twitter"
                            href={this.twitterLink}
                            target="_blank"
                          >
                            <ion-icon name="logo-twitter" />
                            Twitterにも投稿する
                          </a>
                        </div>
                      );
                    }
                  })()}
                </div>
              );
            }
          })()}
        </div>
        {(() => {
          if (this.message && this.loginUser && this.user) {
            if (this.loginUser.uid == this.uid) {
              return (
                <app-textarea
                  placeholder="回答を書こう"
                  btText="回答する"
                  onSendBtClicked={ev => this.send(ev)}
                />
              );
            }
          }
        })()}
      </ion-content>
    ];
  }
}
