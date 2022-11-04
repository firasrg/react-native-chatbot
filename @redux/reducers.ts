import { combineReducers } from '@reduxjs/toolkit';

import { DiscussionState } from "@app/screens/discussion/state";

export default combineReducers({
    discussion: DiscussionState.reducer
});
