import { logRoles, screen, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import OwnerViewReservations from "./OwnerViewReservations";
import userEvent from "@testing-library/user-event";


describe('Owner View Reservations', () => {

    test('should render the header', () => {
        render(<Router><OwnerViewReservations /></Router>);
        const h1Elem = screen.getByRole('heading', { level: 1, name: /no reservations/i });
        expect(h1Elem).toBeInTheDocument();
    })

    test('should render navbar correctly as well', () => {
        const view = render(<Router><OwnerViewReservations></OwnerViewReservations></Router>)
        logRoles(view.container)
        const navElem = screen.getByRole('navigation');
        expect(navElem).toBeInTheDocument();
    });

    test('should render a list', () => {
        render(<Router><OwnerViewReservations /></Router>);
        const listElem = screen.getByRole('list');
        expect(listElem).toBeInTheDocument();
    });

    test('should render list items', () => {
        render(<Router><OwnerViewReservations /></Router>);
        const listItemElem = screen.getAllByRole('listitem');
        expect(listItemElem).toBeDefined();
    });

    test('should render several links', () => {
        render(<Router><OwnerViewReservations /></Router>);
        const linkElements = screen.getAllByRole('link');

        expect(linkElements[0]).toHaveAccessibleName('Profile');
        expect(linkElements[1]).toHaveAccessibleName('New Reservations');
        expect(linkElements[2]).toHaveAccessibleName('Add Food Item');
        expect(linkElements[3]).toHaveAccessibleName('View Food Orders');
        expect(linkElements[4]).toHaveAccessibleName('View Reviews');
        expect(linkElements[5]).toHaveAccessibleName('Logout');
    });


    test('should render a image', () => {
        render(<Router><OwnerViewReservations /></Router>);
        const imgElem = screen.getByRole('img');
        expect(imgElem).toBeInTheDocument();
    });

    // correct tab order => Profile => New Reservations => Add Food Item => View Food Orders => View Reviews => Logout =>  Label
    test('should render tab in a correct order in Navbar page', () => {
        render(<Router><OwnerViewReservations /></Router>);
        const linkElements = screen.getAllByRole('link');
        const labelElem = screen.getByTestId('label-id');

        userEvent.tab();
        expect(linkElements[0]).toHaveFocus();

        userEvent.tab();
        expect(linkElements[1]).toHaveFocus();

        userEvent.tab();
        expect(linkElements[2]).toHaveFocus();

        userEvent.tab();
        expect(linkElements[3]).toHaveFocus();

        userEvent.tab();
        expect(linkElements[4]).toHaveFocus();

        userEvent.tab();
        expect(linkElements[5]).toHaveFocus();

        userEvent.tab();
        expect(labelElem).toHaveFocus();

    });
});