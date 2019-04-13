import { Component, Element, State, Prop } from "@stencil/core";
import { UserProvider } from "../../providers/user";
import { MessageProvider } from "../../providers/message";
import { APP_NAME } from "../../helpers/config";

@Component({
  tag: "page-user-detail",
  styleUrl: "page-user-detail.scss"
})
export class UserDetailPage {
  @State() user: any = null;
  @State() text: string = "";
  @State() sended: boolean = false;

  @Prop() uid: string = "";
  @Prop({ connect: "ion-loading-controller" })
  loadingCtrl: HTMLIonLoadingControllerElement;

  @Element() el: HTMLElement;

  textInput(el) {
    this.text = el.srcElement.value;
  }

  componentWillLoad() {
    this.getUser();
  }

  async getUser() {
    this.user = await UserProvider.get(this.uid);
  }

  async send(ev) {
    if (ev && ev.detail) {
      const loadingElement = await this.loadingCtrl.create({
        message: "送信中",
        translucent: true,
        duration: 20000
      });
      await loadingElement.present();
      const message = { message: ev.detail };
      const res = await MessageProvider.create(this.uid, message);
      await loadingElement.dismiss();
      (this.el.closest("ion-nav") as any).push("app-message-answer", {
        uid: this.uid,
        id: res.id
      });
    }
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/user" text="戻る" />
          </ion-buttons>
          <ion-title>{APP_NAME}</ion-title>
          <ion-buttons slot="end">
            <auth-button />
          </ion-buttons>
        </ion-toolbar>
      </ion-header>,

      <ion-content padding>
        {(() => {
          if (this.user) {
            return (
              <user-profile image={this.user.icon} name={this.user.name} />
            );
          }
        })()}
        <app-textarea
          placeholder="気になることを聞いてみよう"
          btText="送信する"
          onSendBtClicked={ev => this.send(ev)}
        />
        {(() => {
          if (this.user) {
            return (
              <div class="message-wrapper">
                <ion-button
                  color="medium"
                  href={"user/" + this.uid + "/message/"}
                  fill="clear"
                  size="small"
                >
                  {this.user.name}宛の質問を見る
                </ion-button>
              </div>
            );
          }
        })()}
      </ion-content>
    ];
  }
}
