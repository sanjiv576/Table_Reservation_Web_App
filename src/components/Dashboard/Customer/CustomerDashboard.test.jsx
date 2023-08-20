import { logRoles, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import CustomerDashboard from "./CustomerDashboard";

describe('Customer Dashboard', () => {


    test('should show options (i.e Dashboard, My Profile, My Reservations, My Favorite Restaurants and Log out) on clicking menu button', () => {
        const view = render(<Router><CustomerDashboard /></Router>);
        logRoles(view.container);

        const linkElements = screen.getAllByRole('link');

        expect(linkElements[0]).toHaveAccessibleName('Dashboard');
        expect(linkElements[1]).toHaveAccessibleName('My Profile');
        expect(linkElements[2]).toHaveAccessibleName('My Reservations');
        expect(linkElements[3]).toHaveAccessibleName('My Favorite Restaurants');
        expect(linkElements[4]).toHaveAccessibleName('Log out');
        expect(linkElements[5]).toHaveAccessibleName('Welcome back, !');
    });

    test('should render a list', () => {
        render(<Router><CustomerDashboard /></Router>);
        const listElement = screen.getByRole('list');
        expect(listElement).toBeInTheDocument();
    });

    test('should show the list items of the restaurants', async () => {

        const view = render(<Router><CustomerDashboard /></Router>);
        logRoles(view.container);

        // wait for fetching data and render them
        await waitFor(() => {
            const listItemElem = screen.getAllByRole('listitem');
            expect(listItemElem.length).toBeGreaterThan(0);
        });
    });

    test('should render a restaurant image', () => {
        render(<Router><CustomerDashboard /></Router>)
        const imageElem = screen.getByRole('img');
        expect(imageElem).toBeInTheDocument();
    });
});