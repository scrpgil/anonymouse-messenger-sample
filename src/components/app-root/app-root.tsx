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
            </ion-route>
          </ion-route>
        </ion-router>
        <ion-nav />
      </ion-app>
    );
  }
}
