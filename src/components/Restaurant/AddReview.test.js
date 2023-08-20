

import { BrowserRouter as Router } from "react-router-dom";
import AddReview from "./AddReview";
import { logRoles, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("AddReview", () => {
    test('should input correctly', () => {

        const view = render(<Router><AddReview restaurantId={'asdffas'} /></Router>);
        logRoles(view.container);
        const inputElem = screen.getByRole('textbox');
        expect(inputElem).toBeInTheDocument();
    });

    test('should render a button', () => {
        render(<Router><AddReview restaurantId={'asdffas'} /></Router>);
        const buttonElem = screen.getByRole('button');
        expect(buttonElem).toBeInTheDocument();
    });

    test('should insert a value in the input', async () => {
        render(<Router><AddReview restaurantId={'asdffas'} /></Router>);
        const inputElem = screen.getByRole('textbox');

        await userEvent.type(inputElem, 'This is a test review');
        expect(inputElem).toHaveValue('This is a test review');
    });
});