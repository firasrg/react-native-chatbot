
// Expressions
const EXPRESSION_GREETING: string = `Hello John doe! 👋 How can I help you?`;
const EXPRESSION_SIGNUP: string = `Hmm I see. Please write your email address?`;
const EXPRESSION_GOOD_BYE: string = `Good bye`;


// exports
export const BotExpression = {
  EXPRESSION_GREETING,
  EXPRESSION_SIGNUP,
  EXPRESSION_GOOD_BYE
} as const;


// Replies 

// # Step 1 - greeting
const REPLY_SIGN_UP: string = `Sign me up`;
const REPLY_QUIT: string = `Quit`;

export const BotReply = {
  REPLY_SIGN_UP,
  REPLY_QUIT,
} as const;

// FRE - this is temporary, for demo purpose 
export const NAVIGATE_TO_PROFILE_SCREEN: string = "profile-consult";

// Message IDs
const MESSAGE_GREETING_ID = 1;
const MESSAGE_SIGNUP_ID = 2;
const MESSAGE_QUIT_ID = 3;

export const MessageID = {
  MESSAGE_GREETING_ID,
  MESSAGE_SIGNUP_ID,
  MESSAGE_QUIT_ID,
}



