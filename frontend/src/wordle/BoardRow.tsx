import React,{ memo, useEffect } from 'react';
import BoardCell from "./BoardCell";
import { Char } from '../state/KeyBoardState';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../WordleStore';
import { setInvalidAttempt } from '../state/GameState';

type BoardRowProps = {
    guess?: string,
    result?: string,
    currentRow?: boolean
};

/**
 * Renders BoardRow component, the BoardRow is a row of BoardCell components, the number of cells is determined by the maxLetters prop in the game state, current value is 5
 * BoardRow is memoized to prevent unnecessary re-renders, if the BoardRow is the current row and a guess attempt is triggered with an invalid guess, the row will animate (bounce sides) to indicate the invalid attempt
 * For the current BoardRow in the game, the active prop is set to true for the current cell being guessed
 * @property guess - the guess word to be displayed, it can be an already guessed word or the current word being guessed
 * @property result - the api result of the guess word for an already guessed word
 * @property currentRow - boolean to determine if the row is the current row
 */
const BoardRow = memo(function BoardRow({guess = '', result = '', currentRow = false}: BoardRowProps) {

    const invalidAttempt = useSelector((state: RootState) => state.game.invalidAttempt);
    const maxLetters = useSelector((state: RootState) => state.game.letters);
    const dispatch = useDispatch();

    // If its the current row and an invalid attempt was triggered, animate the row and clear the invalid attempt
    useEffect(() => {
        if(currentRow && invalidAttempt) {
            setTimeout(() => {             
                dispatch(setInvalidAttempt(false));
            }, 1000);
        }
    }, [invalidAttempt, currentRow]);
    
    return(<div role='row' className={`flex gap-2 md:gap-2.5  ${currentRow && invalidAttempt ? 'relative animate-bounce-sides' : ''}`}>
        {Array(maxLetters).fill(0).map((_, index) => <BoardCell key={index} letter={guess[index] as Char} active={currentRow && guess?.length === index + 1} result={result[index]} delay={index*150}/>)}
    </div>)
});

export default BoardRow;