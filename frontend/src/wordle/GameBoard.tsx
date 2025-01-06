import React from "react";
import BoardRow from "./BoardRow";
import { useSelector } from "react-redux";
import { RootState } from "../WordleStore";

/**
 * Renders the game board, board is a list of BoardRow components, the total number of rows is 6
 * will render first all the guesses, then a new BoardRow with the current word being guessed, and finally empty BoardRow components to complete the 6 rows
 * @property word - current word being guessed
 * @property guesses - array of Guess objects, each object contains the word attempted and the result of the guess
 * @property maxGuesses - maximum number of guesses allowed
 * @param param0 
 * @returns 
 */
const GameBoard = () => {

    const word = useSelector((state: RootState) => state.game.word);
    const guesses = useSelector((state: RootState) => state.game.guesses);
    const maxGuesses = useSelector((state: RootState) => state.game.maxGuesses);

    return (<div className="flex flex-col gap-2 md:gap-2.5">
        {guesses.map((guess, index) => index < maxGuesses ? <BoardRow key={index} guess={guess?.word} result={guess?.result} />: null)}
        {guesses.length < maxGuesses && <BoardRow guess={word} currentRow={true} />}
        {guesses.length < maxGuesses && Array(maxGuesses - 1  - guesses.length).fill(0).map((_, index) => <BoardRow key={index} />)}
    </div>)
};

export default GameBoard;