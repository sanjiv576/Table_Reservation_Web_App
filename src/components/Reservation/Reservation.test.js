import { logRoles, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Reservation from './Reservation';


describe('Reservation page', () => {

    test('should render header', () => {
        render(<Router><Reservation /></Router>);
        const h1Elem = screen.getAllByRole('heading');
        expect(h1Elem[1]).toHaveAccessibleName(/fill/i);
        expect(h1Elem[0]).toHaveAccessibleName('');
    });

    test('should render spibbutton', () => {
        render(<Router><Reservation /></Router>);
        const spinElem = screen.getByRole('spinbutton');
        expect(spinElem).toBeInTheDocument();
    });

    test('should render dropdown', () => {
        render(<Router><Reservation /></Router>);
        const dropdownElem = screen.getByRole('combobox');
        expect(dropdownElem).toBeInTheDocument();
    });

    test('should show options (i.e Dashboard, My Profile, My Reservations, My Favorite Restaurants and Log out) on clicking menu button', () => {
        const view = render(<Router><Reservation /></Router>);
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
        render(<Router><Reservation /></Router>);
        const imgElem = screen.getByRole('img', { name: 'User Profile Pic' });
        expect(imgElem).toBeInTheDocument();
    })


    test('should show a unorder list for navigation', () => {
        render(<Router><Reservation /></Router>);
        const listElem = screen.getByRole('list');
        expect(listElem).toBeInTheDocument();
    });

    test('should show list items of navigation options', () => {
        render(<Router><Reservation /></Router>);
        const listItemsElem = screen.getAllByRole('listitem');
        expect(listItemsElem).toBeDefined();
    });
});