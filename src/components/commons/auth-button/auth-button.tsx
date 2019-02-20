import { Component, State } from "@stencil/core";
import { UserProvider } from "../../../providers/user";

@Component({
  tag: "auth-button",
  styleUrl: "auth-button.scss"
})
export class AuthButtonComponent {
  @State() fetched: boolean = false;
  @State() loginUser: any = null;

  componentWillLoad() {
    this.loggedIn();
  }

  async login() {
    UserProvider.login();
  }

  async loggedIn() {
    this.loginUser = await UserProvider.loggedIn();
    this.fetched = true;
  }

  render() {
    return (
      <div>
        {(() => {
          if (this.fetched) {
            if (this.loginUser) {
              return [
                <ion-button class="auth-button">
                  <img src={this.loginUser.providerData[0].photoURL} />
                </ion-button>
              ];
            } else {
              return [
                <ion-button onClick={() => this.login()}>ログイン</ion-button>
              ];
            }
          }
        })()}
      </div>
    );
  }
}
