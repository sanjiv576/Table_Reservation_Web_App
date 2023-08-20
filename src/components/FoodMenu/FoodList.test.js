

import { logRoles, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import FoodList from "./FoodList";

describe('Foood List page', () => {

    test('should render a food menu header', () => {
        const view = render(<Router><FoodList /></Router>);
        logRoles(view.container);
        const headerElem = screen.getAllByRole('heading', { name: /food menu/i });
        expect(headerElem).toBeDefined();
    });

    test('should render a  no food menu header', () => {
        render(<Router><FoodList /></Router>);
        const headerElem = screen.getAllByRole('heading', { name: /no food menu/i });
        expect(headerElem).toBeDefined();
    });
}); 
