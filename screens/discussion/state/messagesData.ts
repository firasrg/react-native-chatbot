import {
  BotExpression,
  BotReply,
  MessageID,
} from "./constants";
import { ICustomMessage } from "../model";
import { IMessage } from "react-native-gifted-chat";

const messages = [
  {
    _id: MessageID.MESSAGE_GREETING_ID,
    text: BotExpression.EXPRESSION_GREETING,
    quickReplies: {
      type: 'radio', // or 'checkbox',
      keepIt: false,
      values: [
        {
          title: BotReply.REPLY_SIGN_UP,
          value: 'signup',
          messageId: MessageID.MESSAGE_SIGNUP_ID
        },
        {
          title: BotReply.REPLY_QUIT,
          value: 'quit',
          messageId: MessageID.MESSAGE_QUIT_ID
        }
      ],
    },
  },
  {
    _id: MessageID.MESSAGE_SIGNUP_ID,
    text: BotExpression.EXPRESSION_SIGNUP,
    decision: MessageID.MESSAGE_CHECK_PROFILE_ID
  },
  {
    _id: MessageID.MESSAGE_CHECK_PROFILE_ID,
    text: BotExpression.EXPRESSION_CHECKING_PROFILE
  },
  {
    _id: MessageID.MESSAGE_PROFILE_NOT_FOUND_ID,
    text: BotExpression.EXPRESSION_NO_SUCH_PROFILE
  },
  {
    _id: MessageID.MESSAGE_GO_TO_PROFILE_ID,
    text: BotExpression.EXPRESSION_PROFILE_FOUND
  },
  {
    _id: MessageID.MESSAGE_REDIRECTION_ID,
    text: BotExpression.EXPRESSION_REDIRECTION,
  },
  {
    _id: MessageID.MESSAGE_QUIT_ID,
    text: BotExpression.EXPRESSION_GOOD_BYE,
  },
] as Array<ICustomMessage>;

const additionalObject = {
  _id: 1,
  name: 'Bot',
}

function withObjectForEach(messages: Array<IMessage>, additionalAttributes: Object){
  return messages.map(obj => ({ ...obj, ...additionalAttributes}))
}

export default withObjectForEach(messages, {user: additionalObject})
