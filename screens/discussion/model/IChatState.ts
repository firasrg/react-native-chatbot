import { IMessage } from "react-native-gifted-chat";

export interface IChatState {
  currentStepId: number | string,
  messages: Array<IMessage>,
  textInput: {
    shown: boolean,
    content: undefined | string
  }
}
