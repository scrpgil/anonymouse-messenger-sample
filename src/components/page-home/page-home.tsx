import { Component, State } from "@stencil/core";
import { UserProvider } from "../../providers/user";

@Component({
  tag: "page-home",
  styleUrl: "page-home.scss"
})
export class HomePage {
  @State() loginUser: any = null;
  @State() fetched: boolean = false;

  componentWillLoad() {
    this.loggedIn();
  }

  async loggedIn() {
    this.loginUser = await UserProvider.loggedIn();
    this.fetched = true;
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
                    uid={this.loginUser.uid}
                    placeholder="気になることを聞いてみよう"
                    btText="送信する"
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
