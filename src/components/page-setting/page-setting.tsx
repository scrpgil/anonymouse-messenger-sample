import { Component, State, Prop } from "@stencil/core";
import { UserProvider } from "../../providers/user";
import { APP_NAME } from "../../helpers/config";

@Component({
  tag: "page-setting",
  styleUrl: "page-setting.scss"
})
export class SettingPage {
  @State() loginUser: any = null;
  @State() fetched: boolean = false;
  @State() sended: boolean = false;
  textInput!: HTMLInputElement;

  @Prop({ connect: "ion-alert-controller" })
  alertCtrl: HTMLIonAlertControllerElement;

  @Prop({ connect: "ion-loading-controller" })
  loadingCtrl: HTMLIonLoadingControllerElement;

  componentWillLoad() {
    this.loggedIn();
  }

  handleSubmit = (ev: Event) => {
    ev.preventDefault();
    console.log(this.textInput.value);
  };

  async loggedIn() {
    this.loginUser = await UserProvider.loggedIn();
    this.fetched = true;
  }

  async send() {
    this.sended = true;
    const token = await UserProvider.getToken();
    const user = { name: this.textInput.value };
    await UserProvider.updateName(token, this.loginUser.uid, user);
    this.sended = false;
  }

  async logout() {
    UserProvider.logout();
  }

  async deleteUser() {
    const alertElement = await this.alertCtrl.create({
      header: "退会しますか？",
      message:
        "この操作は取り消せません。退会するとメッセージが他のユーザーに表示されなくなります。それでも退会する場合はユーザIDを入力してください。",
      inputs: [
        {
          name: "id",
          placeholder: ""
        }
      ],
      buttons: [
        {
          text: "いいえ",
          handler: () => {
            console.log("Confirm Cancel: blah");
          }
        },
        {
          text: "はい",
          cssClass: "secondary",
          handler: async res => {
            if (res.id && res.id == this.loginUser.uid) {
              const loadingElement = await this.loadingCtrl.create({
                message: "ちょっとまってね...",
                translucent: true,
                duration: 20000
              });
              await loadingElement.present();
              await UserProvider.delete();
              await loadingElement.dismiss();
              setTimeout(() => {
                location.href = "/";
              }, 200);
            }
          }
        }
      ]
    });
    await alertElement.present();
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>{APP_NAME}</ion-title>
          <ion-buttons slot="end">
            <auth-button />
          </ion-buttons>
        </ion-toolbar>
      </ion-header>,

      <ion-content>
        {(() => {
          if (this.fetched) {
            if (this.loginUser) {
              return (
                <div class="setting-wrapper">
                  <div class="title text-medium">設定</div>
                  <div class="input-wrapper">
                    <div class="label">表示名</div>
                    <div class="input">
                      <ion-input
                        value={this.loginUser.displayName}
                        disabled={true}
                        ref={el => (this.textInput = el as HTMLInputElement)}
                      />
                    </div>
                    <div class="label">ユーザーID</div>
                    <div class="input">
                      <ion-input value={this.loginUser.uid} disabled={true} />
                    </div>
                    <div class="save-wrapper">
                      <ion-button
                        class="send-button"
                        disabled={this.sended}
                        onClick={() => this.send()}
                      >
                        <ion-icon slot="start" name="send" />
                        {this.sended ? "保存中" : "保存する"}
                      </ion-button>
                    </div>
                  </div>
                  <div class="logout-wrapper">
                    <ion-button
                      color="medium"
                      size="small"
                      fill="clear"
                      class="login-button"
                      onClick={() => this.logout()}
                    >
                      ログアウトする
                    </ion-button>
                  </div>
                  <div class="delete-wrapper">
                    <ion-button
                      class="login-button"
                      color="danger"
                      size="small"
                      fill="clear"
                      onClick={() => this.deleteUser()}
                    >
                      退会する
                    </ion-button>
                    <div class="message text-danger">
                      *退会するとメッセージ等が他のユーザーに表示されなくなります
                    </div>
                  </div>
                </div>
              );
            } else {
              return <app-onboarding />;
            }
          }
        })()}
      </ion-content>
    ];
  }
}
