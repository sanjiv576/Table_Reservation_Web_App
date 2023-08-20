import { logRoles, render, screen } from "@testing-library/react";
import Login from "./Login";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe('Login', () => {
    test('should render login page with username and password correctly', () => {
        const view = render(<Router><Login /></Router>);
        logRoles(view.container);

        const pElem = screen.getByText("Don't have an account ?", { exact: false });
        expect(pElem).toBeInTheDocument();
    });

    test('should render login link', () => {
        render(<Router><Login /></Router>);
        const linkElement = screen.getByRole('link', { name: 'Register Now' });
        expect(linkElement).toBeInTheDocument();

    });

    test('should render username and password text', () => {
        render(<Router><Login /></Router>);
        const usernameLabel = screen.getByText('Username');
        expect(usernameLabel).toBeInTheDocument();

        const passwordLable = screen.getByText('Password');
        expect(passwordLable).toBeInTheDocument();

    });

    test('should render input fields for username and password', () => {
        render(<Router><Login /></Router>);
        const usernameInput = screen.getByRole('textbox');
        expect(usernameInput).toBeInTheDocument();

    });

    test('should have submit button', () => {
        render(<Router><Login /></Router>);
        const submitBtn = screen.getByRole('button', { name: 'Submit' });
        expect(submitBtn).toBeInTheDocument();
    });

    test('should insert username in the input', async () => {

        render(<Router><Login /></Router>);
        const usernameInput = screen.getByRole('textbox');
        await userEvent.type(usernameInput, 'sanjiv');
        expect(usernameInput).toHaveValue('sanjiv');

    });

    // correct order of tapping => input ==> submit button ==> link 
    test('should tab the elements in a correct order', () => {

        render(<Router><Login /></Router>);

        // find input, button and link
        const firstInputElem = screen.getByTestId('username-input');
        const secondInputElem = screen.getByTestId('userPassword-input');
        const btnElem = screen.getByRole('button', { name: 'Submit' });
        const linkElem = screen.getByRole('link', { name: 'Register Now' });


        userEvent.tab();
        expect(firstInputElem).toHaveFocus();

        userEvent.tab();
        expect(secondInputElem).toHaveFocus();

        userEvent.tab();
        expect(btnElem).toHaveFocus();

        userEvent.tab();
        expect(linkElem).toHaveFocus();
    });

    
});