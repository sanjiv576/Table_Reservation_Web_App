import { logRoles, screen, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import AddFood from "./AddFood";
import userEvent from "@testing-library/user-event";


describe('Add Food', () => {

    test('should render inputs', () => {
        render(<Router><AddFood /></Router>);
        const inputsElem = screen.getAllByRole('textbox');
        expect(inputsElem).toBeDefined();
    });

    test('should render dropdown', () => {
        render(<Router><AddFood /></Router>);
        const dropdownElem = screen.getByRole('combobox');
        expect(dropdownElem).toBeInTheDocument();
    });

    test('should render multiple options', () => {
        render(<Router><AddFood /></Router>);
        const optionsElem = screen.getAllByRole('option');


        expect(optionsElem[0]).toHaveAccessibleName(/select/i);
        expect(optionsElem[1]).toHaveAccessibleName(/non-veg/i);
        expect(optionsElem[2]).toHaveAccessibleName(/veg/i);
    });

    test('should render a submit button', () => {
        render(<Router><AddFood /></Router>);
        const btnElem = screen.getByRole('button');
        expect(btnElem).toBeInTheDocument();
    });

    test('should render a food menu header', () => {
        const view = render(<Router><AddFood /></Router>);
        logRoles(view.container);
        const headerElem = screen.getAllByRole('heading', { name: /food menu/i });
        expect(headerElem).toBeDefined();
    });

    test('should render a  no food menu header', () => {
        render(<Router><AddFood /></Router>);
        const headerElem = screen.getAllByRole('heading', { name: /no food menu/i });
        expect(headerElem).toBeDefined();
    });

    test('should render navbar correctly', () => {
        const view = render(<Router><AddFood></AddFood></Router>)
        logRoles(view.container)
        const navElem = screen.getByRole('navigation');
        expect(navElem).toBeInTheDocument();
    });

    test('should render a list', () => {
        render(<Router><AddFood /></Router>);
        const listElem = screen.getByRole('list');
        expect(listElem).toBeInTheDocument();
    });

    test('should render list items', () => {
        render(<Router><AddFood /></Router>);
        const listItemElem = screen.getAllByRole('listitem');
        expect(listItemElem).toBeDefined();
    });

    test('should render several links', () => {
        render(<Router><AddFood /></Router>);
        const linkElements = screen.getAllByRole('link');

        expect(linkElements[0]).toHaveAccessibleName('Profile');
        expect(linkElements[1]).toHaveAccessibleName('New Reservations');
        expect(linkElements[2]).toHaveAccessibleName('Add Food Item');
        expect(linkElements[3]).toHaveAccessibleName('View Food Orders');
        expect(linkElements[4]).toHaveAccessibleName('View Reviews');
        expect(linkElements[5]).toHaveAccessibleName('Logout');
    });


    test('should render a image', () => {
        render(<Router><AddFood /></Router>);
        const imgElem = screen.getByRole('img');
        expect(imgElem).toBeInTheDocument();
    });

    // correct tab order => Profile => New Reservations => Add Food Item => View Food Orders => View Reviews => Logout =>  Label
    test('should render tab in a correct order in Navbar page', () => {
        render(<Router><AddFood /></Router>);
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