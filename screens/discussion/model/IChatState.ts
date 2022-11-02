import { IMessage } from "react-native-gifted-chat";

export interface IChatState {
  stepIndex: number,
  messages: Array<IMessage>,
  botIsTyping: boolean,
}
