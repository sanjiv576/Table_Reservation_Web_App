import { logRoles, screen, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import OwnerProfile from "./OwnerProfile";
import userEvent from "@testing-library/user-event";

describe('Owner Navbar', () => {

    test('should render a restaurant image', () => {
        render(<Router><OwnerProfile /></Router>);
        const imgElem = screen.getByRole('img', { name: 'Restaurant Pic' });
        expect(imgElem).toBeInTheDocument();
    });

    test('should render name input', () => {
        render(<Router><OwnerProfile /></Router>);
        const nameInputElem = screen.getByTestId('name-id');
        expect(nameInputElem).toBeInTheDocument();
    });

    test('should render location input', () => {
        render(<Router><OwnerProfile /></Router>);
        const locationInputElem = screen.getByTestId('location-id');
        expect(locationInputElem).toBeInTheDocument();
    });

    test('should render contact input', () => {
        render(<Router><OwnerProfile /></Router>);
        const contactInputElem = screen.getByTestId('contact-id');
        expect(contactInputElem).toBeInTheDocument();
    });

    test('should insert value in the name input', async () => {
        render(<Router><OwnerProfile /></Router>);
        const nameInput = screen.getByTestId('name-id');
        await userEvent.type(nameInput, 'ABC Restaurant');
        expect(nameInput).toHaveValue('ABC Restaurant');
    });

    test('should insert value in the contact input', async () => {
        render(<Router><OwnerProfile /></Router>);
        const inputElem = screen.getByTestId('contact-id');
        await userEvent.type(inputElem, '9812345678');
        expect(inputElem).toHaveValue('9812345678');
    });


    test('should insert value in the location input', async () => {
        render(<Router><OwnerProfile /></Router>);
        const inputElem = screen.getByTestId('location-id');
        await userEvent.type(inputElem, 'Putalisadak, Kathmandu');
        expect(inputElem).toHaveValue('Putalisadak, Kathmandu');
    });

    test('should render update button', () => {
        render(<Router><OwnerProfile /></Router>);
        const btnElem = screen.getByRole('button', { name: 'UPDATE' });
        expect(btnElem).toBeInTheDocument();
    });

    test('should render upload picture button', () => {
        render(<Router><OwnerProfile /></Router>);
        const btnElem = screen.getByRole('button', { name: 'Upload Picture' });
        expect(btnElem).toBeInTheDocument();
    });

    // correct tab order => Profile => New Reservations => Add Food Item => View Food Orders
    // => View Reviews => Logout =>  Label => name input => location input => contact input 
    // => update button => file input => upload pic button
    test('should render tab in a correct order in Navbar page', () => {

        render(<Router><OwnerProfile /></Router>);

        const linkElements = screen.getAllByRole('link');
        const labelElem = screen.getByTestId('label-id');
        const nameInput = screen.getByTestId('name-id');

        const locationInput = screen.getByTestId('location-id');
        const contactInput = screen.getByTestId('contact-id');
        const updateBtn = screen.getByRole('button', { name: 'UPDATE' });

        const fileInputElem = screen.getByTestId('file-id');
        const uploadPicBtn = screen.getByRole('button', { name: 'Upload Picture' });


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


        userEvent.tab();
        expect(nameInput).toHaveFocus();

        userEvent.tab();
        expect(locationInput).toHaveFocus();

        userEvent.tab();
        expect(contactInput).toHaveFocus();

        userEvent.tab();
        expect(updateBtn).toHaveFocus();

        userEvent.tab();
        expect(fileInputElem).toHaveFocus();

        userEvent.tab();
        expect(uploadPicBtn).toHaveFocus();

    });

    test('should render several labels', () => {
        render(<Router><OwnerProfile /></Router>);
        const nameLabel = screen.getByTestId('label-restaurantName-id');
        const ownerNameLabel = screen.getByTestId('label-ownerName-id');
        const locationLabel = screen.getByTestId('label-location-id');
        const contactLabel = screen.getByTestId('label-contact-id');
        const reviewsLabel = screen.getByTestId('label-reviews-id');
        const reservationsLabel = screen.getByTestId('label-reservations-id');


        expect(nameLabel).toBeInTheDocument();
        expect(ownerNameLabel).toBeInTheDocument();
        expect(locationLabel).toBeInTheDocument();
        expect(contactLabel).toBeInTheDocument();
        expect(reviewsLabel).toBeInTheDocument();
        expect(reservationsLabel).toBeInTheDocument();
    });


    test('should render navbar correctly', () => {
        const view = render(<Router><OwnerProfile></OwnerProfile></Router>)
        logRoles(view.container)
        const navElem = screen.getByRole('navigation');
        expect(navElem).toBeInTheDocument();
    });

    test('should render a list', () => {
        render(<Router><OwnerProfile /></Router>);
        const listElem = screen.getByRole('list');
        expect(listElem).toBeInTheDocument();
    });

    test('should render list items', () => {
        render(<Router><OwnerProfile /></Router>);
        const listItemElem = screen.getAllByRole('listitem');
        expect(listItemElem).toBeDefined();
    });

    test('should render several links', () => {
        render(<Router><OwnerProfile /></Router>);
        const linkElements = screen.getAllByRole('link');

        expect(linkElements[0]).toHaveAccessibleName('Profile');
        expect(linkElements[1]).toHaveAccessibleName('New Reservations');
        expect(linkElements[2]).toHaveAccessibleName('Add Food Item');
        expect(linkElements[3]).toHaveAccessibleName('View Food Orders');
        expect(linkElements[4]).toHaveAccessibleName('View Reviews');
        expect(linkElements[5]).toHaveAccessibleName('Logout');
    });

    test('should render a user image', () => {
        render(<Router><OwnerProfile /></Router>);
        const imgElem = screen.getByRole('img', { name: 'User Profile Pic' });
        expect(imgElem).toBeInTheDocument();
    });
});