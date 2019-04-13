import { Component } from "@stencil/core";

@Component({
  tag: "app-root",
  styleUrl: "app-root.scss"
})
export class AppRoot {
  render() {
    return (
      <ion-app>
        <ion-router useHash={false}>
          <ion-route-redirect from="/" to="home" />
          <ion-route component="page-tabs">
            <ion-route url="/home" component="tab-home">
              <ion-route component="page-home" />
              <ion-route url="/:uid/:id" component="page-message-answer" />
            </ion-route>
            <ion-route url="/message" component="tab-message">
              <ion-route component="page-message" />
              <ion-route url="/:uid/:id" component="page-message-answer" />
            </ion-route>
            <ion-route url="/user" component="tab-user">
              <ion-route component="page-user" />
              <ion-route url="/:uid" component="page-user-detail" />
              <ion-route
                url="/:uid/message"
                component="page-other-user-message"
              />
              <ion-route url="/:uid/:id" component="page-message-answer" />
            </ion-route>
            <ion-route url="/setting" component="tab-setting">
              <ion-route component="page-setting" />
            </ion-route>
          </ion-route>
        </ion-router>
        <ion-nav />
      </ion-app>
    );
  }
}
