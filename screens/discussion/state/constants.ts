
// Expressions
const EXPRESSION_GREETING: string = `Hello John doe! 👋 How can I help you?`;
const EXPRESSION_SIGNUP: string = `Hmm I see. Please write your email address?`;
const EXPRESSION_GOOD_BYE: string = `Good bye`;
const EXPRESSION_CHECKING_PROFILE: string = `We're checking the profile...`;
const EXPRESSION_NO_SUCH_PROFILE: string = `No such profile`;
const EXPRESSION_PROFILE_FOUND: string = `We've found your profile`;
const EXPRESSION_DO_SOMETHING_ELSE: string = `Would you like to do something else?`;
const EXPRESSION_REDIRECTION: string = `We're redirecting you to your target.`;

// exports
export const BotExpression = {
  EXPRESSION_GREETING,
  EXPRESSION_SIGNUP,
  EXPRESSION_GOOD_BYE,
  EXPRESSION_CHECKING_PROFILE,
  EXPRESSION_NO_SUCH_PROFILE,
  EXPRESSION_PROFILE_FOUND,
  EXPRESSION_DO_SOMETHING_ELSE,
  EXPRESSION_REDIRECTION
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
const MESSAGE_CHECK_PROFILE_ID = 4;
const MESSAGE_GO_TO_PROFILE_ID = 5;
const MESSAGE_PROFILE_NOT_FOUND_ID = 6;
const MESSAGE_SOMETHING_ELSE_ID = 7;
const MESSAGE_REDIRECTION_ID = 8;

export const MessageID = {
  MESSAGE_GREETING_ID,
  MESSAGE_SIGNUP_ID,
  MESSAGE_QUIT_ID,
  MESSAGE_CHECK_PROFILE_ID,
  MESSAGE_GO_TO_PROFILE_ID,
  MESSAGE_PROFILE_NOT_FOUND_ID,
  MESSAGE_SOMETHING_ELSE_ID,
  MESSAGE_REDIRECTION_ID
}



