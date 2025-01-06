import { configureStore } from "@reduxjs/toolkit";

import  GameState from './state/GameState';
import KeyBoardState from './state/KeyBoardState';

export const WordleStore = configureStore({
    reducer: {
       game:GameState,
       keyboard: KeyBoardState
    }
});

export type RootState = ReturnType<typeof WordleStore.getState>;
export type AppDispatch = typeof WordleStore.dispatch;