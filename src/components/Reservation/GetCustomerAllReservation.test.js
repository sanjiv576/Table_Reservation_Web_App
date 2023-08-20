import { logRoles, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import GetCustomerAllReservation from './GetCustomerAllReservation';
import Footer from "../Footer/Footer";


describe('GetCustomerAllReservation page', () => {

    test('should render header', () => {
        render(<Router><GetCustomerAllReservation /></Router>);
        const h1Elem = screen.getByRole('heading', { name: /reservation/i });
        expect(h1Elem).toBeInTheDocument();
    });

    test('should render edit, view and delete buttons', () => {
        render(<Router><GetCustomerAllReservation /></Router>);
        const editBtn = screen.queryByTestId('edit-btn-id');
        expect(editBtn).toBeDefined();
        const viewBtn = screen.queryByTestId('view-btn-id');
        expect(viewBtn).toBeDefined();
        const deleteBtn = screen.queryByTestId('delete-btn-id');
        expect(deleteBtn).toBeDefined();
    });

    test('should render edit, view and delete icons', () => {
        render(<Router><GetCustomerAllReservation /></Router>);
        const editIcon = screen.queryByTestId('edit-icon-id');
        expect(editIcon).toBeDefined();
        const viewIcon = screen.queryByTestId('view-icon-id');
        expect(viewIcon).toBeDefined();
        const deleteIcon = screen.queryByTestId('delete-icon-id');
        expect(deleteIcon).toBeDefined();
    });

    test('should render a table', () => {
        render(<Router><GetCustomerAllReservation /></Router>);
        const tableElem = screen.queryByTestId('table-id');
        expect(tableElem).toBeDefined();

    });

    test('should render a table row', () => {
        render(<Router><GetCustomerAllReservation /></Router>);
        const tableRowElem = screen.queryByTestId('table-row-id');
        expect(tableRowElem).toBeDefined();

    });

    test('should render table headers', () => {
        render(<Router><GetCustomerAllReservation /></Router>);
        const nameTableHead = screen.queryByTestId('name-id');
        expect(nameTableHead).toBeDefined();
        const dateTableHead = screen.queryByTestId('date-id');
        expect(dateTableHead).toBeDefined();
        const timeTableHead = screen.queryByTestId('time-id');
        expect(timeTableHead).toBeDefined();
        const dinnerNumTableHead = screen.queryByTestId('dinnerNum-id');
        expect(dinnerNumTableHead).toBeDefined();
        const placeTypeTableHead = screen.queryByTestId('plactType-id');
        expect(placeTypeTableHead).toBeDefined();
        const actionsTableHead = screen.queryByTestId('actions-id');
        expect(actionsTableHead).toBeDefined();
    });

    test('should show options (i.e Dashboard, My Profile, My Reservations, My Favorite Restaurants and Log out) on clicking menu button', () => {
        const view = render(<Router><GetCustomerAllReservation /></Router>);
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
        render(<Router><GetCustomerAllReservation /></Router>);
        const imgElem = screen.getByRole('img', { name: 'User Profile Pic' });
        expect(imgElem).toBeInTheDocument();
    })


    test('should show a unorder list for navigation', () => {
        render(<Router><GetCustomerAllReservation /></Router>);
        const listElem = screen.getByRole('list');
        expect(listElem).toBeInTheDocument();
    });

    test('should show list items of navigation options', () => {
        render(<Router><GetCustomerAllReservation /></Router>);
        const listItemsElem = screen.getAllByRole('listitem');
        expect(listItemsElem).toBeDefined();
    });

    test('should render the footer text correctly', () => {
        render(<Footer />);

        const footerText = screen.getByText(/Table Reservation App/i);

        expect(footerText).toBeInTheDocument();
    });
});