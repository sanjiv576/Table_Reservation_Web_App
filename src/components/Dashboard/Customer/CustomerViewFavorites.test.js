import { logRoles, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import CustomerViewFavorites from './CustomerViewFavorites';


describe('Customer View Favorites page', () => {

    test('should show options (i.e Dashboard, My Profile, My Reservations, My Favorite Restaurants and Log out) on clicking menu button', () => {
        const view = render(<Router><CustomerViewFavorites /></Router>);
        logRoles(view.container);

        const linkElements = screen.getAllByRole('link');

        expect(linkElements[0]).toHaveAccessibleName('Dashboard');
        expect(linkElements[1]).toHaveAccessibleName('My Profile');
        expect(linkElements[2]).toHaveAccessibleName('My Reservations');
        expect(linkElements[3]).toHaveAccessibleName('My Favorite Restaurants');
        expect(linkElements[4]).toHaveAccessibleName('Log out');
        expect(linkElements[5]).toHaveAccessibleName('Welcome back, !');
    });

    test('should render a restaurant pic', () => {
        render(<Router><CustomerViewFavorites /></Router>);
        const imgElem = screen.getByRole('img', { name: 'User Profile Pic' });
        expect(imgElem).toBeInTheDocument();
    })


    test('should render no favorite restaurants heading when the any favorites are found', () => {

        render(<Router><CustomerViewFavorites /></Router>);
        const h1Element = screen.getByRole('heading', { level: 1, name: 'No Favorite Restaurants Yet !' });
        expect(h1Element).toBeInTheDocument();

    });
});