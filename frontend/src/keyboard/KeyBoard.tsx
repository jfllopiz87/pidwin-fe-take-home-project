import React, { useCallback, useEffect } from 'react';
import KeyButton from './KeyButton';
import { useDispatch, useSelector} from 'react-redux';
import { setWord, removeLastCharacter } from '../state/GameState';
import { RootState } from '../WordleStore';
import { useFetchAttempt } from '../hooks/useFetchAttempt';

/**
 * render the keyboard component using the keys from the KeyBoardState, plus the Enter and Back keys
 * divide the keys into 3 rows, and render each row separately, with the Enter and Back keys in the last row
 * listen to keydown event and dispatch the setWord action, removeLastCharacter action, or attemptGuess action based on the key pressed
 * useCallback to memoize the TriggerKey function, KeyButton component will re-render only if the key status changes
 * @returns Keyboard component
 */
const KeyBoard = () => {

    const keys = useSelector((state: RootState) => state.keyboard.keys);
    const { attemptGuess } = useFetchAttempt();
    const dispatch = useDispatch();
    
    /**
     * Dispatch the setWord action with the key as the payload if the key is not a special key
     * Dispatch removeLastCharacter action if the key is backspace
     * Call the attemptGuess function if the key is enter
     * @param key string
     */
    const TriggerKey = useCallback((key: string) => {
            
        switch(key) {
            case 'ENTER':
                attemptGuess();
                break;
            case 'BACKSPACE':
                dispatch(removeLastCharacter());
                break;
            default:
                dispatch(setWord(key));
                break;
        }
    }, []);

    /**
     * Add an event listener to the window for keydown event
     * Remove the event listener when the component is unmounted
     */
    useEffect(() => {

        /**
         * Listen to keydown event, if the key is shift, ctrl, alt, or meta do nothing
         * prevent the default behavior of the key to avoid bubbling
         * trigger the key if the key is enter, backspace, or a letter
         * @param {*} e KeyboardEvent
         */
        const HandleKeyDown =  (e: KeyboardEvent) => {

            if(e.shiftKey || e.ctrlKey || e.altKey || e.metaKey) return;
            e.preventDefault();
            
            const pressedKey = e.key.toUpperCase();
            const pressedKeyCode = e.keyCode;

            if(pressedKeyCode === 13 || pressedKeyCode === 8 || (pressedKeyCode >= 65 && pressedKeyCode <= 90))
            {
                TriggerKey(pressedKey);
            }

            e.stopPropagation();
        };
        
        window.addEventListener('keydown', HandleKeyDown);


        return () => {
            window.removeEventListener('keydown', HandleKeyDown);
        };
    },[]);

    return (<div className="flex flex-col items-center justify-center gap-2">
        <div className="flex gap-1 md:gap-2">
            {keys.filter(key => key.row === 0).map((key) => <KeyButton key={key.key} keyVal={key.key} status={key.status} handleClick={TriggerKey}>{key.key}</KeyButton>)}
        </div>
        <div className="flex gap-1 md:gap-2">
        {keys.filter(key => key.row === 1).map((key) => <KeyButton key={key.key} keyVal={key.key} status={key.status} handleClick={TriggerKey}>{key.key}</KeyButton>)}
        </div>
        <div className="flex gap-1 md:gap-2">      
            <KeyButton key={'ENTER'} keyVal={'ENTER'} isSpecialKey={true} handleClick={TriggerKey}>ENTER</KeyButton>
            {keys.filter(key => key.row === 2).map((key) => <KeyButton key={key.key} keyVal={key.key} status={key.status} handleClick={TriggerKey}>{key.key}</KeyButton>)}
            <KeyButton key="BACKSPACE" keyVal="BACKSPACE" isSpecialKey={true} handleClick={TriggerKey}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z" />
                </svg>
            </KeyButton>
        </div>
    </div>);

};

export default KeyBoard;