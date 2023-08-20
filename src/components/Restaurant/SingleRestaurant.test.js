

import { logRoles, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import SingleRestaurant from "./SingleRestaurant";

describe('Single Restaurrant', () => {

    test('should render', () => {
        const view = render(<Router><SingleRestaurant /></Router>);
        logRoles(view.container);
    });

    test('should render a restaurant pic', () => {
        render(<Router><SingleRestaurant /></Router>);
        const imgElem = screen.getByRole('img', { name: /restaurant pic/i });
        expect(imgElem).toBeInTheDocument();
    });

    test('should render a level 3 reviews header', () => {
        render(<Router><SingleRestaurant /></Router>);
        const headingElement = screen.getAllByRole('heading', { level: 3, name: /reviews/i });
        expect(headingElement).toBeDefined();
    });

    test('should render a level 3 description header', () => {
        render(<Router><SingleRestaurant /></Router>);
        const headingElement = screen.getAllByRole('heading', { level: 3, name: /desc/i });
        expect(headingElement).toBeDefined();
    });

    test('should render a reservation button', () => {
        render(<Router><SingleRestaurant /></Router>);
        const buttomElem = screen.getAllByRole('button', { name: /reservation/i });
        expect(buttomElem).toBeDefined();
    });

    test('should render a review button', () => {
        render(<Router><SingleRestaurant /></Router>);
        const buttomElem = screen.getAllByRole('button', { name: /review/i });
        expect(buttomElem).toBeDefined();
    });

    test('should render a view button', () => {
        render(<Router><SingleRestaurant /></Router>);
        const buttomElem = screen.getAllByRole('button', { name: /view/i });
        expect(buttomElem).toBeDefined();
    });

    test('should render a input', () => {
        render(<Router><SingleRestaurant /></Router>);
        const inputElem = screen.getByRole('textbox');
        expect(inputElem).toBeInTheDocument();
    });


    test('should show options (i.e Dashboard, My Profile, My Reservations, My Favorite Restaurants and Log out) on clicking menu button', () => {
        render(<Router><SingleRestaurant /></Router>);

        const linkElements = screen.getAllByRole('link');

        expect(linkElements[0]).toHaveAccessibleName('Dashboard');
        expect(linkElements[1]).toHaveAccessibleName('My Profile');
        expect(linkElements[2]).toHaveAccessibleName('My Reservations');
        expect(linkElements[3]).toHaveAccessibleName('My Favorite Restaurants');
        expect(linkElements[4]).toHaveAccessibleName('Log out');
        expect(linkElements[5]).toHaveAccessibleName('Welcome back, !');
    });

    test('should render a user pic', () => {
        render(<Router><SingleRestaurant /></Router>);
        const imgElem = screen.getByRole('img', { name: 'User Profile Pic' });
        expect(imgElem).toBeInTheDocument();
    })


    test('should show a unorder list for navigation', () => {
        render(<Router><SingleRestaurant /></Router>);
        const listElem = screen.getByRole('list');
        expect(listElem).toBeInTheDocument();
    });

    test('should show list items of navigation options', () => {
        render(<Router><SingleRestaurant /></Router>);
        const listItemsElem = screen.getAllByRole('listitem');
        expect(listItemsElem).toBeDefined();
    });
});