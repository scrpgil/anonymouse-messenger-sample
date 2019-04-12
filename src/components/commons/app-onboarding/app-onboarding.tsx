import { Component } from "@stencil/core";
import { UserProvider } from "../../../providers/user";
import { APP_NAME } from "../../../helpers/config";

@Component({
  tag: "app-onboarding",
  styleUrl: "app-onboarding.scss"
})
export class AppOnboarding {
  async login() {
    UserProvider.login();
  }
  render() {
    return (
      <div class="onboard-wrapper">
        <div class="logo-wrapper">
          <h1>{APP_NAME}</h1>
          <ion-icon name="mail" />
        </div>
        <div class="login-wrapper">
          <ion-button
            onClick={() => this.login()}
            shape="round"
            size="large"
            class="login"
          >
            <ion-icon slot="start" name="logo-google" />
            Googleでログイン
          </ion-button>
        </div>
      </div>
    );
  }
}
