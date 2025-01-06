import React, {memo, useEffect, useState} from 'react';
import { Char } from '../state/KeyBoardState';

type BoardCellProps = {
    letter?: Char,
    active: boolean
    result?: string,
    delay?: number,
};

/**
 * Render the BoardCell component, which represents a single cell in the game board
 * BoardCell is memoized to prevent unnecessary re-renders
 * @property letter - The letter to display in the cell
 * @property active - Wheter the cell is the current cell being guessed, if true, the cell will have a light gray border
 * @property result - The result of the guess for this cell (1, 0, x, ''), 
 * if the result is 1, the cell will animate with a green background, if the result is 0, the cell will animate with a mustard background,
 * if the result is x, the cell will animate with a red border and a red diagonal line
 * @property delay - The delay before the animation starts, instead of all cells animating at the same time, they animate one after the other
 * 
 */
const BoardCell = memo(({letter, active, result, delay = 0}:BoardCellProps) => {

    const [cellClass, setCellClass] = useState('');
    const [blockLetter, setBlockLetter] = useState(false);
    
    // Animate the cell based on the result, background color and border color depending on the result, delay depends on the index of the cell
    useEffect(() => {
        
        if(result === '1') {
            
            setTimeout(() => setCellClass(`animate-flip-down`), delay);
            setTimeout(() => setCellClass(`animate-flip-up bg-green border-green`), 250 + delay);
        } 
        else if(result === '0') {
            setTimeout(() => setCellClass(`animate-flip-down`), delay);
            setTimeout(() => setCellClass(`animate-flip-up bg-mustard border-mustard`), 250 + delay);
        }
        else if(result === 'x') {
            setTimeout(() => setCellClass(`animate-flip-down`), delay);
            setTimeout(() => {
                setCellClass(`animate-flip-up border-red`);
                setBlockLetter(true);
            }, 250 + delay);
        }
    }, [result, delay]);

    return (<span role='cell' className={`font-inter font-bold text-2xl/6 border-2 rounded md:rounded-none ${active ? `border-light-gray`:`border-dark-gray`}  w-16 md:w-15 h-16 md:h-15 flex items-center justify-center text-white ${cellClass}`}>
        {letter}
        {blockLetter && <span data-testid='diagonal-line' className="absolute w-20 bg-red h-0.5 -rotate-45"></span>}
    </span>);
});

export default BoardCell;