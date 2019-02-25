import { Component, State, Prop } from "@stencil/core";
import { UserProvider } from "../../providers/user";
import { MessageProvider } from "../../providers/message";
import { Message } from "../../models/message";

@Component({
  tag: "page-home",
  styleUrl: "page-home.scss"
})
export class HomePage {
  @State() loginUser: any = null;
  @State() fetched: boolean = false;

  @Prop({ connect: "ion-loading-controller" })
  loadingCtrl: HTMLIonLoadingControllerElement;

  componentWillLoad() {
    this.loggedIn();
  }

  async loggedIn() {
    this.loginUser = await UserProvider.loggedIn();
    this.fetched = true;
  }

  async send(ev) {
    if (ev && ev.detail) {
      const loadingElement = await this.loadingCtrl.create({
        message: "送信中",
        translucent: true,
        duration: 20000
      });
      await loadingElement.present();
      const message = new Message({ message: ev.detail });
      await MessageProvider.create(this.loginUser.uid, message);
      await loadingElement.dismiss();
    }
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Home</ion-title>
          <ion-buttons slot="end">
            <auth-button />
          </ion-buttons>
        </ion-toolbar>
      </ion-header>,

      <ion-content padding>
        {(() => {
          if (this.fetched) {
            if (this.loginUser) {
              return (
                <div class="home-wrapper">
                  <user-profile
                    image={this.loginUser.providerData[0].photoURL}
                    name={this.loginUser.displayName}
                  />
                  <app-textarea
                    placeholder="気になることを聞いてみよう"
                    btText="送信する"
                    onSendEmit={ev => this.send(ev)}
                  />
                </div>
              );
            }
          }
        })()}
      </ion-content>
    ];
  }
}
