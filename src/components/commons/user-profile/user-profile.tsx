import { Component, Prop } from "@stencil/core";

@Component({
  tag: "user-profile",
  styleUrl: "user-profile.scss"
})
export class UserProfileComponent {
  @Prop() image: string = "";
  @Prop() name: string = "";
  @Prop() size: number = 200;
  @Prop() message: string = "なんでも質問受け付けます。";

  render() {
    return (
      <div class="profile-wrapper">
        <img
          style={{ width: this.size + "px", height: this.size + "px" }}
          src={this.image}
        />
        <div class="name">{this.name}</div>
        <div class="message">{this.message}</div>
      </div>
    );
  }
}
