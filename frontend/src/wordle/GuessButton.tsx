import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../WordleStore";
import { useFetchAttempt } from "../hooks/useFetchAttempt";

/**
 * Renders the GuessButton component, the button is disabled until the word is completed
 * The button is gone once the game is completed or all attempts are used
 * The button triggers the attemptGuess action when clicked
 * @returns GuessButton component
 */
const GuessButton = () => {

    const wordCompleted = useSelector((state: RootState) => state.game.wordCompleted);
    const completed = useSelector((state: RootState) => state.game.completed);
    const {attemptGuess} = useFetchAttempt();

    const handleClick = () => {
        attemptGuess();
    };
    
    if(completed) return null;

    return(
        <button disabled={!wordCompleted} onClick={handleClick} className="transition-colors ease-in-out w-full md:w-85 px-6 py-3 md:py-4 rounded-lg text-base/4 font-semibold text-white bg-dark-gray disabled:text-dark-gray disabled:bg-black-disabled">Guess Word</button>
    );
};

export default GuessButton;