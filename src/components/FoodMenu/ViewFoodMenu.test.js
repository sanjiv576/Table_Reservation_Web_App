import { logRoles, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ViewFoodMenu from './ViewFoodMenu';


describe('View Food Menu page', () => {

    test('should render a food menu header', () => {
        const view = render(<Router><ViewFoodMenu /></Router>);
        logRoles(view.container);
        const headerElem = screen.getAllByRole('heading', { name: /food menu/i });
        expect(headerElem).toBeDefined();
    });

    test('should render a  no food menu header', () => {
        render(<Router><ViewFoodMenu /></Router>);
        const headerElem = screen.getAllByRole('heading', { name: /no food menu/i });
        expect(headerElem).toBeDefined();
    });

    test('should show options (i.e Dashboard, My Profile, My Reservations, My Favorite Restaurants and Log out) on clicking menu button', () => {
        const view = render(<Router><ViewFoodMenu /></Router>);
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
        render(<Router><ViewFoodMenu /></Router>);
        const imgElem = screen.getByRole('img', { name: 'User Profile Pic' });
        expect(imgElem).toBeInTheDocument();
    })


    test('should show a unorder list for navigation', () => {
        render(<Router><ViewFoodMenu /></Router>);
        const listElem = screen.getByRole('list');
        expect(listElem).toBeInTheDocument();
    });

    test('should show list items of navigation options', () => {
        render(<Router><ViewFoodMenu /></Router>);
        const listItemsElem = screen.getAllByRole('listitem');
        expect(listItemsElem).toBeDefined();
    });
});