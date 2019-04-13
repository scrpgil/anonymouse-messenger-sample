import { Component, Prop } from "@stencil/core";
import { formatDate } from "../../../helpers/utils";

@Component({
  tag: "app-message-list",
  styleUrl: "app-message-list.scss"
})
export class AppMessageList {
  @Prop() uid: string = "";
  @Prop() tab: string = "";
  @Prop() messages: any = [];

  render() {
    return (
      <div class="messages-wrapper">
        {(() => {
          if (this.uid && this.messages.length > 0) {
            let list = [];
            for (const message of this.messages) {
              list.push(
                <div class="message-wrapper">
                  <div class="created">{formatDate(message.created)}</div>
                  <div class="message">{message.message}</div>
                  <div class="answer-button">
                    <ion-button
                      fill="clear"
                      size="small"
                      color={message.answered ? "medium" : "primary"}
                      href={this.tab + "/" + this.uid + "/" + message.id}
                    >
                      <ion-icon slot="start" name="chatbubbles" />
                      {message.answered ? "回答済み" : "回答する"}
                    </ion-button>
                  </div>
                </div>
              );
            }
            return list;
          } else {
            return <div class="empty text-medium">まだ質問がありません</div>;
          }
        })()}
      </div>
    );
  }
}
