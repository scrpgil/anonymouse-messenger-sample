import { Component, Element, State, Prop } from "@stencil/core";
import { UserProvider } from "../../providers/user";
import { APP_NAME } from "../../helpers/config";

@Component({
  tag: "page-user",
  styleUrl: "page-user.scss"
})
export class UserPage {
  @State() users: any = [];

  @Prop() uid: string = "";

  @Element() el: HTMLElement;

  componentWillLoad() {
    this.getUserList();
  }

  async getUserList(created: string = "") {
    const res = await UserProvider.getList(created);
    if (res) {
      if (created === "") {
        this.users = res;
      } else {
        this.users = this.users.concat(res);
      }
    }
  }

  async componentDidLoad() {
    const iRefresher: any = this.el.querySelector("#refresher-component");
    iRefresher.addEventListener("ionRefresh", async () => {
      await this.getUserList();
      iRefresher.complete();
    });

    const iScroll: HTMLIonInfiniteScrollElement = this.el.querySelector(
      "#infinite-scroll"
    );
    iScroll.addEventListener("ionInfinite", async () => {
      if (this.users.length > 0) {
        let created = "";
        if (this.users.length > 1) {
          created = this.users[this.users.length - 1].created;
        }
        await this.getUserList(created);
      }
      iScroll.complete();
    });
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
        <ion-refresher slot="fixed" id="refresher-component">
          <ion-refresher-content />
        </ion-refresher>
        <ion-list class="users-wrapper">
          <ion-list-header>
            <ion-label class="text-medium">新着ユーザー</ion-label>
          </ion-list-header>
          {(() => {
            if (this.users.length > 0) {
              let list = [];
              for (const user of this.users) {
                list.push(
                  <ion-item
                    class="user-wrapper"
                    href={"user/" + user.uid}
                    lines="full"
                  >
                    <ion-avatar slot="start">
                      <img src={user.icon} />
                    </ion-avatar>
                    <ion-label>{user.name}</ion-label>
                  </ion-item>
                );
              }
              return list;
            }
          })()}
        </ion-list>
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
