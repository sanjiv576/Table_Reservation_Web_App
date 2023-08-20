
import { logRoles, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ReservationForm from "./ReservationForm";

describe('ReservationForm', () => {


    test('should render a heading of level 1', () => {
        const view = render(<Router><ReservationForm /></Router>);
        logRoles(view.container);
        const headingElement = screen.getByRole('heading', { level: 1, name: /reservation form/i });
        expect(headingElement).toBeInTheDocument();
    });


    test('should render spinbutton', () => {
        render(<Router><ReservationForm /></Router>);
        const spinElem = screen.getByRole('spinbutton');
        expect(spinElem).toBeInTheDocument();
    });

    test('should render dropdown', () => {
        render(<Router><ReservationForm /></Router>);
        const dropdownElem = screen.getByRole('combobox');
        expect(dropdownElem).toBeInTheDocument();
    });

    test('should render multiple options', () => {
        render(<Router><ReservationForm /></Router>);
        const optionsElem = screen.getAllByRole('option');


        expect(optionsElem[0]).toHaveAccessibleName(/select/i);
        expect(optionsElem[1]).toHaveAccessibleName('Indoor');
        expect(optionsElem[2]).toHaveAccessibleName('Outdoor');
    });

    test('should render a button', () => {
        render(<Router><ReservationForm /></Router>);
        const btnElem = screen.getByRole('button');
        expect(btnElem).toBeInTheDocument();
    });


});








