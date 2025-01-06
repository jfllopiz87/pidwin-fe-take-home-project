import React from 'react';
import KeyBoard from './keyboard/KeyBoard';
import GameBoard from './wordle/GameBoard';
import GuessButton from './wordle/GuessButton';

const App = () => {
  
  return (
    <div className="bg-black flex flex-col min-h-lvh">
      <h1 className="font-inter font-extrabold text-white text-center -tracking-2 p-3 md:p-6 border-b border-dark-gray text-3xl/8 md:text-4xl/10">Wordle</h1>
      <div className='grow flex-col flex items-center justify-center gap-4 md:gap-12 my-12 md:my-20 px-3 md:px-0'>
        <GameBoard/>
        <GuessButton />
        <KeyBoard/>
      </div>
    </div>
  );
}

export default App;
