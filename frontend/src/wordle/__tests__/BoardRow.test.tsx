import React from 'react';
import { render, screen , act} from '@testing-library/react';
import { Provider } from 'react-redux';
import BoardRow from '../BoardRow';
import { configureStore } from '@reduxjs/toolkit';

const initialState:{game: {letters: number, invalidAttempt: boolean}} = {
    game: {
        letters: 5,
        invalidAttempt: false
    }
};

const testStore = configureStore({
    reducer: (state = initialState) => state,
});

describe('BoardRow Component', () => {

    test('renders BoardRow with default props', () => {
        render(
            <Provider store={testStore}>
                <BoardRow />
            </Provider>
        );

        const cells = screen.getAllByRole('cell');
        expect(cells).toHaveLength(5);
    });

    test('renders BoardRow with guess and result', async() => {
        render(
            <Provider store={testStore}>
                <BoardRow guess="minus" result="0xxx1" />
            </Provider>
        );

        const cells = screen.getAllByRole('cell');
        expect(cells).toHaveLength(5);
        expect(cells[0]).toHaveTextContent('m');
        expect(cells[1]).toHaveTextContent('i');
        expect(cells[2]).toHaveTextContent('n');
        expect(cells[3]).toHaveTextContent('u');
        expect(cells[4]).toHaveTextContent('s');

        await act(async () => { await new Promise((r) => { setTimeout(r, 1500) }) });

        expect(cells[0]).toHaveClass('bg-mustard');
        expect(cells[1]).toHaveClass('border-red');
        expect(cells[2]).toHaveClass('border-red');
        expect(cells[3]).toHaveClass('border-red');
        expect(cells[4]).toHaveClass('bg-green');
    });

    test('renders BoardRow with currentRow and invalidAttempt', () => {
        
        testStore.getState().game.invalidAttempt = true;
        render(
            <Provider store={testStore}>
                <BoardRow currentRow />
            </Provider>
        );
        const row = screen.getByRole('row');
        expect(row).toHaveClass('animate-bounce-sides');
        testStore.getState().game.invalidAttempt = false;
    });

    test('renders BoardRow with active cell', () => {
        
        render(
            <Provider store={testStore}>
                <BoardRow guess="gam" currentRow />
            </Provider>
        );
        const cells = screen.getAllByRole('cell');
        expect(cells[2]).toHaveClass('border-light-gray');
    });
});