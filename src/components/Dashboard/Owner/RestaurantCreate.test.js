import { logRoles, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import RestaurantCreate from "./RestaurantCreate";

describe('Restaurant Create page', () => {

    test('should render h2 header', () => {
        const view = render(<Router><RestaurantCreate /></Router>);
        logRoles(view.container);

        const h2Elem = screen.getByRole('heading', { level: 2 });
        expect(h2Elem).toBeInTheDocument();

    });

    test('should render three inputs i.e name, location and contact', () => {
        render(<Router><RestaurantCreate /></Router>);
        const inputElem = screen.getAllByRole('textbox');
        expect(inputElem[0]).toHaveClass('restaurant-input');
        expect(inputElem[1]).toHaveClass('restaurant-input');
        expect(inputElem[2]).toHaveClass('restaurant-input');
    });

    test('should render submit button', () => {
        render(<Router><RestaurantCreate /></Router>);
        const btnElem = screen.getByRole('button');
        expect(btnElem).toHaveDisplayValue(/create/i);
    });

    // correct order => name input, location input, contact input and button
    test('should render tab in a correct order', async () => {
        render(<Router><RestaurantCreate /></Router>);
        const inputElements = screen.getAllByRole('textbox');
        const btnElem = screen.getByRole('button');

        await userEvent.tab();
        expect(inputElements[0]).toHaveFocus();

        await userEvent.tab();
        expect(inputElements[1]).toHaveFocus();

        await userEvent.tab();
        expect(inputElements[2]).toHaveFocus();

        await userEvent.tab();
        expect(btnElem).toHaveFocus();

    });

    test('should insert value in the name input', async () => {
        render(<Router><RestaurantCreate /></Router>);
        const inputElem = screen.getByTestId('name-id');

        await userEvent.type(inputElem, 'ABC restaurant');
        expect(inputElem).toHaveValue('ABC restaurant');
    });

    test('should insert value in the location input', async () => {
        render(<Router><RestaurantCreate /></Router>);
        const inputElem = screen.getByTestId('location-id');

        await userEvent.type(inputElem, 'Kathmandu');
        expect(inputElem).toHaveValue('Kathmandu');
    });
    test('should insert value in the contact input', async () => {
        render(<Router><RestaurantCreate /></Router>);
        const inputElem = screen.getByTestId('contact-id');

        await userEvent.type(inputElem, '9711111111');
        expect(inputElem).toHaveValue('9711111111');
    });
});