import React from 'react';
import { render, screen , act} from '@testing-library/react';
import BoardCell from '../BoardCell';
import '@testing-library/jest-dom/extend-expect';

describe('BoardCell Component', () => {
    test('renders without crashing', () => {
        render(<BoardCell active={false} />);
        const cellElement = screen.getByRole('cell');
        expect(cellElement).toBeInTheDocument();
    });

    test('displays the correct letter', () => {
        render(<BoardCell letter="A" active={false} />);
        const cellElement = screen.getByText('A');
        expect(cellElement).toBeInTheDocument();
    });

    test('applies active class when active is true', () => {
        render(<BoardCell active={true} />);
        const cellElement = screen.getByRole('cell');
        expect(cellElement).toHaveClass('border-light-gray');
    });

    test('applies class animate-flip-down when result is received, after 250ms remove it and applies class animate-flip-up', async () => {
        render(<BoardCell result="1" active={false} />);
        const cellElement = screen.getByRole('cell');
        await act(async () => { await new Promise((r) => { setTimeout(r, 50) }) });
        expect(cellElement).toHaveClass('animate-flip-down');
        await act(async () => { await new Promise((r) => { setTimeout(r, 250) }) });        
        expect(cellElement).not.toHaveClass('animate-flip-down'); 
        expect(cellElement).toHaveClass('animate-flip-up');       
    });

    test('applies correct class for result 1 after 250ms delay', async () => {
        render(<BoardCell result="1" active={false} />);
        const cellElement = screen.getByRole('cell');
        await act(async () => { await new Promise((r) => { setTimeout(r, 250) }) });
        expect(cellElement).toHaveClass('bg-green border-green');       
    });
    
    test('applies correct class for result 0 after 250ms delay', async () => {
        render(<BoardCell result="0" active={false} />);
        const cellElement = screen.getByRole('cell');
        await act(async () => { await new Promise((r) => { setTimeout(r, 250) }) });
        expect(cellElement).toHaveClass('bg-mustard border-mustard');       
    });
    
    test('applies correct class and diagonal line for result x after 250ms delay', async () => {
        render(<BoardCell result="x" active={false} />);
        const cellElement = screen.getByRole('cell');
        await act(async () => { await new Promise((r) => { setTimeout(r, 250) }) });
        expect(cellElement).toHaveClass('border-red');  
        const diagonalLineElement = screen.queryByTestId('diagonal-line');
        expect(diagonalLineElement).toBeInTheDocument();     
    });

    test('applies delay correctly', async () => {
        render(<BoardCell result="1" active={false} delay={300} />);
        const cellElement = screen.getByRole('cell');
        await act(async () => { await new Promise((r) => { setTimeout(r, 600) }) });
        expect(cellElement).toHaveClass('bg-green border-green');
    });
});