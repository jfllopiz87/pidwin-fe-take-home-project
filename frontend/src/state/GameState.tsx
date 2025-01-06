import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from "../WordleStore";
import { setKeysStatus } from "./KeyBoardState";

/**
 * Handle the async thunk with the correct types
 */
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: RootState
    dispatch: AppDispatch
}>();

/*
* Guess Type
* @property word - current guess word
* @property result - result of the guess API call
* */
type Guess = {
    word: string;
    result: string;
};

/**
 * Interface for the GameState
 * @property completed - boolean to indicate if the game is completed
 * @property word - current word being guessed
 * @property letters - number of letters in the word, will be also use to display the number of cells in the board, current value is 5
 * @property guesses - array of Guess objects, each object contains the word attempted and the result of the guess
 * @property maxGuesses - maximum number of guesses allowed, current value is 6
 * @property wordCompleted - boolean to indicate if the current word length is same as letters
 * @property invalidAttempt - aux variable to indicate if an attempt to guess the current word is invalid, will be used to animate current row in the board
 * and attempt is invalid if current word length is less than letters
 */
interface GameStateProps {
    completed: boolean;
    word: string;
    letters: number;
    guesses: Guess[];
    maxGuesses: number;
    wordCompleted: boolean;
    invalidAttempt: boolean
};

/**
 * Custom async thunk to add a guess to the game state if the game is not completed and the current word is valid
 * if the game is completed or the maxGuesses is already reached the thunk won't do anything
 * if the current word is not valid, set invalidAttempt to true, this will force current row to animate (side bounce) as feedback to the user
 * if the current word is valid, call the guess API, add the new guess to the guesses array and update the keys status to re render them with background colors
 */
export const addAttemptIfAllowed = createAppAsyncThunk('game/addAttemptIfAllowed', async (empty: string | void , {getState, dispatch}) => {
    
    const state = getState();

    if(state.game.completed || state.game.guesses.length === state.game.maxGuesses) return;
    if(!state.game.wordCompleted || state.game.word.length !== state.game.letters) {
        dispatch(setInvalidAttempt(true));
        return;
    }

    const response = await fetch(`http://localhost:5000/api/word?guess=${state.game.word}`, {});
    const data = await response.json();
    
    if(data.success) {
        dispatch(addGuess({word: state.game.word, result: data.result}));
        dispatch(setKeysStatus({word: state.game.word, result: data.result}));
    }
    else {
        dispatch(setInvalidAttempt(true));
    }
});

/**
 * Initial state for the GameState
 */
const initialState: GameStateProps = {
    completed: false,
    word: "",
    letters: 5,
    guesses: [],
    maxGuesses: 6,
    wordCompleted: false,
    invalidAttempt: false
};

/**
 * GameState slice to handle the game state
 * @property setWord - action to set the current word, called when a key is clicked or pressed
 * @property removeLastCharacter - action to remove the last character from the current word, called when the backspace key is clicked or pressed
 * @property addGuess - action to add a new guess to the guesses array, called in the addAttemptIfAllowed thunk
 * @property setInvalidAttempt - action to set the invalidAttempt variable, called in the addAttemptIfAllowed thunk and cleared on the current row useEffect after the animation
 */
const GameState = createSlice({
    name: "state",
    initialState,
    reducers: {
       /**
        * If the game is completed, no more actions are allowed, return the current state
        * Add the new character to the current word if the current word length is less than letters (5)
        * Replace the last character of the current word with the new character if the current word length equals letters (5)
        * Set wordCompleted to true if the current word length is equal to letters (5)
        * @param {*} state GameState
        * @param {*} action PayloadAction
        */
        setWord(state, action) {
            
            if(state.completed) return state;
            const newWord = state.word.length < state.letters ? state.word + action.payload : state.word.slice(0,-1) + action.payload;
            return {...state, word: newWord, wordCompleted: newWord.length === state.letters};
        },
        /**
         * If the game is completed or the current world is empty, return the current state
         * Remove the last character from the current world
         * Set wordCompleted to false
         * @param {*} state GameState
         */
        removeLastCharacter(state) {
           
            if(state.completed || state.word.length === 0) return state;
            return {...state, word: state.word.slice(0, state.word.length - 1), wordCompleted: false};
        },
        /**
         * Add the new guess to the guesses array if the guesses length is less than the maxGuesses
         * Set current word to an empty string
         * Set wordCompleted to false
         * Set completed to true if the new guess result is 11111 or the guesses length is equal to maxGuesses
         * @param {*} state GameState
         * @param {*} action PayloadAction
         */
        addGuess(state, action) {
            if(state.guesses.length === state.maxGuesses) return state;
            return {...state, guesses: [...state.guesses, action.payload], word: '', wordCompleted: false, completed: action.payload.result === '11111' || state.guesses.length + 1 === state.maxGuesses};
        },
        /**
         * Set the invalidAttempt variable to the payload, set to true in the addAttemptIfAllowed thunk if the current word is not valid and
         * set to false in the useEffect of the current row if invalidAttempt is true
         * @param {*} state GameState
         * @param {*} action PayloadAction
         */
        setInvalidAttempt(state, action) {
            return {...state, invalidAttempt: action.payload};
        }
    },
    /**
     * Add the addAttemptIfAllowed thunk to the extraReducers to handle the fulfilled action
     * @param builder 
     */
    extraReducers: (builder) => {
        builder.addCase(addAttemptIfAllowed.fulfilled, (state, action) => {
            return state;
        });
    }
});

export const { setWord, removeLastCharacter, addGuess, setInvalidAttempt } = GameState.actions;
export default GameState.reducer;