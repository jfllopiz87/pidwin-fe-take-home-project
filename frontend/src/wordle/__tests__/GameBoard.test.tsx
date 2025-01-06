import React from "react";
import { render, screen, act } from "@testing-library/react";
import { Provider } from "react-redux";
import GameBoard from "../GameBoard";
import { configureStore } from "@reduxjs/toolkit";



const initialState:{game: {word: string, guesses: string[], maxGuesses: number}} = {
    game: {
        word: '',
        guesses: [],
        maxGuesses: 6,
    }
};

const testStore = configureStore({
    reducer: (state = initialState) => state,
});

describe("GameBoard Component", () => {
   
    it("renders without crashing", () => {
        render(
            <Provider store={testStore}>
                <GameBoard />
            </Provider>
        );
    });

    it("renders the correct number of BoardRow components if guesses is empty", () => {
       
        testStore.getState().game.guesses = [];
        render(
            <Provider store={testStore}>
                <GameBoard />
            </Provider>
        );
        const rows = screen.getAllByRole('row');
        expect(rows).toHaveLength(6);
    });


    it("renders the correct number of BoardRow components if guesses is 2", () => {
        testStore.getState().game.guesses = [{word: "minus", result: "0xxx1"}, {word: "games", result: "11111"}];
        render(
            <Provider store={testStore}>
                <GameBoard />
            </Provider>
        );
        const rows = screen.getAllByRole('row');
        expect(rows).toHaveLength(6);
        testStore.getState().game.guesses = [];
    });

    it("renders the correct number of BoardRow components if guesses is 6", () => {
        testStore.getState().game.guesses = [{word: "minus", result: "0xxx1"},
            {word: "minus", result: "0xxx1"},
            {word: "minus", result: "0xxx1"},
            {word: "minus", result: "0xxx1"},
            {word: "minus", result: "0xxx1"},
            {word: "games", result: "11111"}];

        render(
            <Provider store={testStore}>
                <GameBoard />
            </Provider>
        );
        const rows = screen.getAllByRole('row');
        expect(rows).toHaveLength(6);
        testStore.getState().game.guesses = [];
    });

    it("renders the correct number of BoardRow components if guesses is more than 6", () => {
        testStore.getState().game.guesses = [{word: "minus", result: "0xxx1"},
            {word: "minus", result: "0xxx1"},
            {word: "minus", result: "0xxx1"},
            {word: "minus", result: "0xxx1"},
            {word: "minus", result: "0xxx1"},
            {word: "minus", result: "0xxx1"},
            {word: "games", result: "11111"}];
            
        render(
            <Provider store={testStore}>
                <GameBoard />
            </Provider>
        );
        const rows = screen.getAllByRole('row');
        expect(rows).toHaveLength(6);
        testStore.getState().game.guesses = [];
    });
});