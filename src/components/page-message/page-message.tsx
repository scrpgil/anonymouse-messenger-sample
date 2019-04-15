import { Component, Element, State } from "@stencil/core";
import { UserProvider } from "../../providers/user";
import { MessageProvider } from "../../providers/message";
import { APP_NAME } from "../../helpers/config";

@Component({
  tag: "page-message",
  styleUrl: "page-message.scss"
})
export class MessagePage {
  @State() loginUser: any = null;
  @State() fetched: boolean = false;
  @State() messages: any = [];
  @Element() el: HTMLElement;

  componentWillLoad() {
    this.loggedIn();
  }

  async getList(created: string = "") {
    const res = await MessageProvider.getList(this.loginUser.uid, created);
    if (res) {
      if (created === "") {
        this.messages = res;
      } else {
        this.messages = this.messages.concat(res);
      }
    }
    this.fetched = true;
  }
  async loggedIn() {
    this.loginUser = await UserProvider.loggedIn();
    if (this.loginUser) {
      this.getList();
    } else {
      this.fetched = true;
    }
  }

  async componentDidLoad() {
    const iRefresher: any = this.el.querySelector("#refresher-component");
    iRefresher.addEventListener("ionRefresh", async () => {
      await this.getList();
      iRefresher.complete();
    });

    const iScroll: HTMLIonInfiniteScrollElement = this.el.querySelector(
      "#infinite-scroll"
    );
    iScroll.addEventListener("ionInfinite", async () => {
      if (this.fetched && this.messages.length > 0) {
        let created = "";
        if (this.messages.length > 1) {
          created = this.messages[this.messages.length - 1].created;
        }
        await this.getList(created);
      }
      iScroll.complete();
    });
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

      <ion-content>
        <ion-refresher slot="fixed" id="refresher-component">
          <ion-refresher-content />
        </ion-refresher>
        {(() => {
          if (this.fetched) {
            if (this.loginUser) {
              return (
                <div class="messages-wrapper">
                  <app-message-list
                    tab="message"
                    uid={this.loginUser.uid}
                    messages={this.messages}
                  />
                </div>
              );
            } else {
              return <app-onboarding />;
            }
          }
        })()}
        <ion-infinite-scroll id="infinite-scroll">
          <ion-infinite-scroll-content
            loadingSpinner="bubbles"
            loadingText="読み込み中..."
          />
        </ion-infinite-scroll>
      </ion-content>
    ];
  }
}
