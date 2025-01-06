import { createSlice } from "@reduxjs/toolkit";

export type Char =  'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' 
| 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' 
| 'W' | 'X' | 'Y' | 'Z' ;

type KeyState  = {
    key: Char;
    status: string;
    row: number
};

interface KeyStateProps {
    keys: KeyState[];
};

const initialState: KeyStateProps = {
    keys: [
        {key: 'Q', status: '', row: 0},
        {key: 'W', status: '', row: 0},
        {key: 'E', status: '', row: 0},
        {key: 'R', status: '', row: 0},
        {key: 'T', status: '', row: 0},
        {key: 'Y', status: '', row: 0},
        {key: 'U', status: '', row: 0},
        {key: 'I', status: '', row: 0},
        {key: 'O', status: '', row: 0},
        {key: 'P', status: '', row: 0},
        {key: 'A', status: '', row: 1},
        {key: 'S', status: '', row: 1},
        {key: 'D', status: '', row: 1},
        {key: 'F', status: '', row: 1},
        {key: 'G', status: '', row: 1},
        {key: 'H', status: '', row: 1},
        {key: 'J', status: '', row: 1},
        {key: 'K', status: '', row: 1},
        {key: 'L', status: '', row: 1},
        {key: 'Z', status: '', row: 2},
        {key: 'X', status: '', row: 2},
        {key: 'C', status: '', row: 2},
        {key: 'V', status: '', row: 2},
        {key: 'B', status: '', row: 2},
        {key: 'N', status: '', row: 2},
        {key: 'M', status: '', row: 2}
    ]
};

const KeyBoardState = createSlice({
    name: "keyboard",
    initialState,
    reducers: {
        /**
         * Update the status of the key
         * payload: {world: string, result: string}
         * @param {*} state KeyState
         * @param {*} action PayloadAction
         */
        setKeysStatus(state, action) {
            
            const {word, result} = action.payload;
            word?.split('').forEach((key:String, index:number) => {
                
                const keyIndex = state.keys.findIndex(k => k.key === key);
                if(keyIndex !== -1) state.keys[keyIndex].status = result[index];
            });
        }
    }
});

export const { setKeysStatus} = KeyBoardState.actions;
export default KeyBoardState.reducer;