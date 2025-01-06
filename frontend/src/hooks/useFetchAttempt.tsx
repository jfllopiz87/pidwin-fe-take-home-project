import { WordleStore } from "../WordleStore";
import { addAttemptIfAllowed } from "../state/GameState";

/**
 * Custom hook to attempt to add the current word as a guess to the game state guessing array
 * @returns attemptGuess function  - a function that will attempt to add a guess to the game state
 */
export function useFetchAttempt() {    

    const attemptGuess = () => {
        
       WordleStore.dispatch(addAttemptIfAllowed());
    };
    
    return {attemptGuess};
};