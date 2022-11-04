import {
  configureStore,
  ThunkAction,
  Action
} from '@reduxjs/toolkit';
import reducers from "./reducers";

export const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    devTools: true
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type RootThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
