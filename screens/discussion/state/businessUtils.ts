import {
  IMessage,
  User,
  Reply,
  TimeProps
} from "react-native-gifted-chat";
import * as Linking from 'expo-linking'
import format from "date-fns/format";

/** declaring users **/
const FAKE_INSURED: User = { _id: 2, name: 'John Doe' };

const BOT_USER_IMG_URI: string = "https://e7.pngegg.com/pngimages/498/917/png-clipart-computer-icons-desktop-chatbot-icon-blue-angle.png";
const BOT_TYPING_DELAY_IN_SECONDS: number = 1200;
const RANDOM_MSG_IDENTIFIER: number = Math.round(Math.random() * 1000000);

const findStep = (step: number) => (message: IMessage) => message._id === step;

const filterBotMessages = (message: IMessage) =>
  !message.system
  && message.user
  && message.user._id
  && message.user._id === 1;

function botNextStepLookup(messages: Array<IMessage>, nextStepId: number){
  return messages
    .filter(filterBotMessages)
    .find(findStep(nextStepId))
}

const parsePatterns = (_linkStyle: any) => {
  return [
    {
      pattern: /(\+([0-9]{1,3})-([0-9]{2})-([0-9]{3})-([0-9]{3}){0,12})/,
      style: { textDecorationLine: 'underline', color: 'darkorange' },
      // TODO: get the phone number from REST API
      onPress: () => Linking.openURL('tel:+21698000000'),
    },
  ]
}

function msgAvoidQuickReplies (msg: IMessage, replies: Array<Reply> | undefined ) {
 
  const hasRepliesToAvoid: boolean = !!replies?.length;

  if(hasRepliesToAvoid) {
    
    const valuesArray: Array<Reply> | undefined = msg?.quickReplies?.values;
    const msgHasReplies: boolean = !!valuesArray?.length;

    if (msgHasReplies) {

      replies?.forEach(replyToAvoid => {

        if (replyToAvoid) {
          const qr = msg?.quickReplies;

          const filterResult = msg
            ?.quickReplies?.values
            .filter(replyValue => replyValue.value !== replyToAvoid.value) as Reply[];

          if (qr && filterResult && msg) {
            msg = {
              ...msg,
              _id: RANDOM_MSG_IDENTIFIER,
              quickReplies: {
                ...qr,
                values: filterResult
              }
            }
          }
        }
      })
    }
  }
  
  return msg;
}

function formatTimeBasedOnLanguage(RNGiftedChatTimeProps: TimeProps<IMessage>, currentLanguage: string){
  return format(
    RNGiftedChatTimeProps.currentMessage?.createdAt as Date,
    currentLanguage === "en" ? "hh:mm a" : "hh:mm"
  )
}

export default {
  INSURED: FAKE_INSURED,
  BOT_USER_IMG_URI,
  BOT_TYPING_DELAY_IN_SECONDS,
  RANDOM_MSG_IDENTIFIER,
  findStep,
  filterBotMessages,
  botNextStepLookup,
  parsePatterns,
  msgAvoidQuickReplies,
  formatTimeBasedOnLanguage
}
