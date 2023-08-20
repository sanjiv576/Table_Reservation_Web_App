import { logRoles, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import FoodOrderConfirmation from './FoodOrderConfirmation';


describe('Food Order page', () => {

    test('should render the skip button', () => {
        render(<Router><FoodOrderConfirmation /></Router>);
        const btnElem = screen.getByRole('button', { name: /skip/i });
        expect(btnElem).toBeInTheDocument();

    });

    test('should render food order button', () => {
        render(<Router><FoodOrderConfirmation /></Router>);
        const btnElem = screen.getByRole('button', { name: /food order/i });
        expect(btnElem).toBeInTheDocument();

    });

    test('should show options (i.e Dashboard, My Profile, My Reservations, My Favorite Restaurants and Log out) on clicking menu button', () => {
        const view = render(<Router><FoodOrderConfirmation /></Router>);
        logRoles(view.container);

        const linkElements = screen.getAllByRole('link');

        expect(linkElements[0]).toHaveAccessibleName('Dashboard');
        expect(linkElements[1]).toHaveAccessibleName('My Profile');
        expect(linkElements[2]).toHaveAccessibleName('My Reservations');
        expect(linkElements[3]).toHaveAccessibleName('My Favorite Restaurants');
        expect(linkElements[4]).toHaveAccessibleName('Log out');
        expect(linkElements[5]).toHaveAccessibleName('Welcome back, !');
    });

    test('should render a user pic', () => {
        render(<Router><FoodOrderConfirmation /></Router>);
        const imgElem = screen.getByRole('img', { name: 'User Profile Pic' });
        expect(imgElem).toBeInTheDocument();
    })


    test('should show a unorder list for navigation', () => {
        render(<Router><FoodOrderConfirmation /></Router>);
        const listElem = screen.getByRole('list');
        expect(listElem).toBeInTheDocument();
    });

    test('should show list items of navigation options', () => {
        render(<Router><FoodOrderConfirmation /></Router>);
        const listItemsElem = screen.getAllByRole('listitem');
        expect(listItemsElem).toBeDefined();
    });
});