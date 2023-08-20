import { logRoles, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import CustomerProfile from './CustomerProfile';
import userEvent from "@testing-library/user-event";


describe('Customer Profile', () => {


    test('should render a user image', () => {
        render(<Router><CustomerProfile /></Router>);
        const imgElem = screen.getAllByRole('img', { name: /pic/i });
        expect(imgElem).toBeDefined();
    });

    test('should render a user profile', () => {
        render(<Router><CustomerProfile /></Router>);
        const imgElem = screen.getAllByRole('img', { name: /profile/i });
        expect(imgElem).toBeDefined();
    });

    test('should render name input', () => {
        render(<Router><CustomerProfile /></Router>);
        const inputElem = screen.getByTestId('name-id');
        expect(inputElem).toBeInTheDocument();
    });

    test('should render email input', () => {
        render(<Router><CustomerProfile /></Router>);
        const inputElem = screen.getByTestId('email-id');
        expect(inputElem).toBeInTheDocument();
    });

    test('should render username input', () => {
        render(<Router><CustomerProfile /></Router>);
        const inputElem = screen.getByTestId('username-id');
        expect(inputElem).toBeInTheDocument();
    });

    test('should render contact input', () => {
        render(<Router><CustomerProfile /></Router>);
        const inputElem = screen.getByTestId('contact-id');
        expect(inputElem).toBeInTheDocument();
    });

    test('should render password input', () => {
        render(<Router><CustomerProfile /></Router>);
        const inputElem = screen.getByTestId('password-id');
        expect(inputElem).toBeInTheDocument();
    });

    test('should insert value in the name input', async () => {
        render(<Router><CustomerProfile /></Router>);
        const nameInput = screen.getByTestId('name-id');
        await userEvent.type(nameInput, 'Sanjiv');
        expect(nameInput).toHaveValue('Sanjiv');
    });

    test('should insert value in the email input', async () => {
        render(<Router><CustomerProfile /></Router>);
        const nameInput = screen.getByTestId('email-id');
        await userEvent.type(nameInput, 'shrestha@gmail.com');
        expect(nameInput).toHaveValue('shrestha@gmail.com');
    });

    test('should insert value in the contact input', async () => {
        render(<Router><CustomerProfile /></Router>);
        const nameInput = screen.getByTestId('contact-id');
        await userEvent.type(nameInput, '9876767676');
        expect(nameInput).toHaveValue('9876767676');
    });

    test('should insert value in the username input', async () => {
        render(<Router><CustomerProfile /></Router>);
        const nameInput = screen.getByTestId('username-id');
        await userEvent.type(nameInput, 'sanjiv');
        expect(nameInput).toHaveValue('sanjiv');
    });

    test('should insert value in the password input', async () => {
        render(<Router><CustomerProfile /></Router>);
        const nameInput = screen.getByTestId('password-id');
        await userEvent.type(nameInput, 'sanjiv123');
        expect(nameInput).toHaveValue('sanjiv123');
    });

    test('should render update button', () => {
        render(<Router><CustomerProfile /></Router>);
        const btnElem = screen.getByRole('button', { name: /update/i });
        expect(btnElem).toBeInTheDocument();
    });

    test('should render upload picture button', () => {
        render(<Router><CustomerProfile /></Router>);
        const btnElem = screen.getByRole('button', { name: /upload/i });
        expect(btnElem).toBeInTheDocument();
    });

    test('should show options (i.e Dashboard, My Profile, My Reservations, My Favorite Restaurants and Log out) on clicking menu button', () => {
        const view = render(<Router><CustomerProfile /></Router>);
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
        render(<Router><CustomerProfile /></Router>);
        const imgElem = screen.getByRole('img', { name: 'User Profile Pic' });
        expect(imgElem).toBeInTheDocument();
    })


    test('should show a unorder list for navigation', () => {
        render(<Router><CustomerProfile /></Router>);
        const listElem = screen.getByRole('list');
        expect(listElem).toBeInTheDocument();
    });

    test('should show list items of navigation options', () => {
        render(<Router><CustomerProfile /></Router>);
        const listItemsElem = screen.getAllByRole('listitem');
        expect(listItemsElem).toBeDefined();
    });
});