import { Component, Element, Prop, State } from "@stencil/core";
import { MessageProvider } from "../../providers/message";
import { APP_NAME } from "../../helpers/config";

@Component({
  tag: "page-other-user-message",
  styleUrl: "page-other-user-message.scss"
})
export class OtherUserMessagePage {
  @Prop() uid: string = "";
  @State() fetched: boolean = false;
  @State() messages: any = [];
  @Element() el: HTMLElement;

  componentWillLoad() {
    this.getList();
  }

  async getList(created: string = "") {
    const res = await MessageProvider.getList(this.uid, created);
    if (res) {
      if (created === "") {
        this.messages = res;
      } else {
        this.messages = this.messages.concat(res);
      }
    }
    this.fetched = true;
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
            <ion-back-button defaultHref="/user" text="戻る" />
          </ion-buttons>
          <ion-title>{APP_NAME}</ion-title>
          <ion-buttons slot="end">
            <auth-button />
          </ion-buttons>
        </ion-toolbar>
      </ion-header>,

      <ion-content padding>
        <ion-refresher slot="fixed" id="refresher-component">
          <ion-refresher-content />
        </ion-refresher>
        <div class="messages-wrapper">
          {(() => {
            if (this.uid && this.fetched) {
              return (
                <app-message-list
                  tab="user"
                  uid={this.uid}
                  messages={this.messages}
                />
              );
            }
          })()}
        </div>
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
