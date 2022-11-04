/**
 * FRE - for bot chat and any other sort
 */
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@redux/store";
import { ICustomMessage } from "../model";

export interface ITextInput {
  shown: boolean,
  content: undefined | string | number
}

export interface IDiscussionState {
  botIsTyping: boolean,
  currentStepId: number,
  messages: Array<ICustomMessage>,
  textInput: ITextInput,
  navParams: undefined | any
}

export const initialState: IDiscussionState = {
  botIsTyping: true,
  currentStepId: 0,
  messages: [],
  textInput: {
    shown: false,
    content: undefined
  },
  navParams: undefined
};

export const discussionSlice = createSlice({
  name: 'discussion',
  initialState,
  reducers: {
    setBotTyping: (state, action) => {
      const isTyping: boolean = !!action.payload;
      state.botIsTyping = isTyping;
    },
    setNavParams: (state, action) => {
      const navParams = action.payload;
      state.navParams = navParams;
    }
  },
});

export const discussionSelector = (state: RootState) => state.discussion;

export const { reducer, actions } = discussionSlice;

export const { setNavParams, setBotTyping} = actions;

export default reducer;
