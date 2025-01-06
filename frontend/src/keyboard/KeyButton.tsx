import React, { memo, useEffect, useState } from "react";

type KeyButtonProps = {
    keyVal: string;
    isSpecialKey?: boolean;
    status?: string;
    handleClick: (key:string) => void;
    children: React.ReactNode;
};

/**
 * Renders a key button with the given key value and status
 * The status is used to determine if the key value is in the guesses list and if its correct in place, correct not in place, incorrect, or not yet guessed
 * The key button will change its background color based on the status
 * @property keyVal - Char value of the key
 * @property isSpecialKey - boolean value to determine if the key is a special key (backspace, enter)
 * @property status - string value of the status (1, 0, x, or '')
 * @property handleClick - Function to handle the click event, will dispatch the setWord action with the key as the payload if the key is not a special key, if the key is a special key, it will dispatch removeLastCharacter action or attemptGuess action
 * @returns KeyButton component
 */
const KeyButton = memo(({keyVal, isSpecialKey, status, handleClick, children }: KeyButtonProps) => {
    
    const [keyStatusClass, setKeyStatusClass] = useState('bg-dark-gray active:bg-light-gray');
    const [specialKeyClass, setSpecialKeyClass] = useState('');

    useEffect(() => {
        setKeyStatusClass(status === '1' ? 'bg-green active:brightness-125' : status === '0' ? 'bg-mustard active:brightness-125' : status === 'x' ? 'bg-light-gray active:brightness-125' : 'bg-dark-gray active:bg-light-gray');
    }, [status]);

    useEffect(() => {

        setSpecialKeyClass(isSpecialKey ? 'w-9 md:w-16 h-10 md:h-14 text-2 leading-2 md:text-xs -tracking-1' : 'w-7 md:w-11 h-10 md:h-14 text-xs/3 md:text-xl/5 -tracking-2');
    }, [isSpecialKey]);

    return (
        <button className={`flex items-center justify-center ${keyStatusClass} ${specialKeyClass} font-inter font-bold text-white uppercase p-2  rounded  transition ease-in-out`} onClick={(e) => handleClick(keyVal)}>{children}</button>
    );
});

export default KeyButton;