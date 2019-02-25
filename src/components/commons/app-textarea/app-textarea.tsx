import { Component, Element, Prop, State } from "@stencil/core";
import { MessageProvider } from "../../../providers/message";
import { UserProvider } from "../../../providers/user";
import { Message } from "../../../models/message";

@Component({
  tag: "app-textarea",
  styleUrl: "app-textarea.scss"
})
export class AppTextarea {
  @Prop() type: string = "create";
  @Prop() placeholder: string = "";
  @Prop() btText: string = "";
  @Prop() uid: string = "";
  @Prop() id: string = "";

  @Prop({ connect: "ion-loading-controller" })
  loadingCtrl: HTMLIonLoadingControllerElement;

  @Element() el: HTMLElement;

  @State() text: string = "";
  @State() validate: boolean = true;

  textInput(el) {
    this.text = el.srcElement.value;
    if (this.text.length <= 0 || 100 <= this.text.length) {
      this.validate = true;
    } else {
      this.validate = false;
    }
  }

  async send() {
    const loadingElement = await this.loadingCtrl.create({
      message: "送信中",
      translucent: true,
      duration: 20000
    });
    await loadingElement.present();
    if (this.type == "create") {
      const message = new Message({ message: this.text });
      await MessageProvider.create(this.uid, message);
    } else {
      const message = new Message({ answer: this.text });
      const token = await UserProvider.getToken();
      await MessageProvider.answer(token, this.uid, this.id, message);
    }
    this.text = "";
    let textarea: any = this.el.querySelector("#textarea");
    textarea.value = "";
    await loadingElement.dismiss();
  }

  render() {
    return (
      <div class="textarea-wrapper">
        <textarea
          id="textarea"
          placeholder={this.placeholder}
          onInput={e => this.textInput(e)}
        />
        <div class="number-of-characters">{this.text.length}/100</div>
        <ion-button
          class="send-button"
          disabled={this.validate}
          onClick={() => this.send()}
        >
          <ion-icon slot="start" name="send" />
          {this.btText}
        </ion-button>
      </div>
    );
  }
}
