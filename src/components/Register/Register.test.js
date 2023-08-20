import { logRoles, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Register from './Register';
import userEvent from "@testing-library/user-event";


describe('Register page', () => {

    test('should show welcome header', () => {
        const view = render(<Router><Register /></Router>);
        logRoles(view.container);

        const h1Elem = screen.getByRole('heading', { level: 1, name: /welcome/i });
        expect(h1Elem).toBeInTheDocument();
    });

    test('should render several lables', () => {
        render(<Router><Register /></Router>);
        const nameLabel = screen.getAllByTestId(/name-label-id/i);
        expect(nameLabel).toBeDefined();
        const emailLabel = screen.getAllByTestId(/email-label-id/i);
        expect(emailLabel).toBeDefined();
        const contactLabel = screen.getAllByTestId(/contact-label-id/i);
        expect(contactLabel).toBeDefined();
        const roleLabel = screen.getAllByTestId(/role-label-id/i);
        expect(roleLabel).toBeDefined();
        const usernameLabel = screen.getAllByTestId(/username-label-id/i);
        expect(usernameLabel).toBeDefined();
        const passwordLabel = screen.getAllByTestId(/password-label-id/i);
        expect(passwordLabel).toBeDefined();
        const confirmPasswordLabel = screen.getAllByTestId(/confirm-password-label-id/i);
        expect(confirmPasswordLabel).toBeDefined();
    });

    test('should render inputs', () => {
        render(<Router><Register /></Router>);
        const inputElements = screen.getAllByRole('textbox');
        expect(inputElements[0]).toHaveAccessibleName(/name/i);
        expect(inputElements[1]).toHaveAccessibleName(/contact/i);
        expect(inputElements[2]).toHaveAccessibleName(/email/i);
        expect(inputElements[3]).toHaveAccessibleName(/username/i);

        const passwordInputElem = screen.getByTestId('password-id');
        expect(passwordInputElem).toBeInTheDocument();
        const confirmPasswordInputElem = screen.getByTestId('confirm-password-id');
        expect(confirmPasswordInputElem).toBeInTheDocument();
    });

    test('should render dropdown for roles', () => {
        render(<Router><Register /></Router>);
        const dropdownElem = screen.getByRole('combobox');
        expect(dropdownElem).toBeInTheDocument();
    });

    test('should render options of combox', () => {
        render(<Router><Register /></Router>);
        const optionElem = screen.getAllByRole('option');

        expect(optionElem[0]).toHaveAccessibleName(/role/i);
        expect(optionElem[1]).toHaveAccessibleName(/owner/i);
        expect(optionElem[2]).toHaveAccessibleName(/customer/i);
    });

    test('should render submit button', () => {
        render(<Router><Register /></Router>);

        const registerBtn = screen.getByRole('button', { name: /sign up/i });
        expect(registerBtn).toBeInTheDocument();
    });

    test('should render login link', () => {
        render(<Router><Register /></Router>);

        const loginLink = screen.getByRole('link', { name: /login/i });
        expect(loginLink).toBeInTheDocument();
    });

    test('should render a paragraph', () => {
        render(<Router><Register /></Router>);
        const pElem = screen.getByTestId('para-id');
        expect(pElem).toBeInTheDocument();
    });
    test('should render correctly while tapping', async () => {
        render(<Router><Register /></Router>);

        const inputElements = screen.getAllByRole('textbox');
        const passwordInputElem = screen.getByTestId('password-id');
        const confirmPasswordInputElem = screen.getByTestId('confirm-password-id');
        const dropdownElem = screen.getByRole('combobox');

        const registerBtn = screen.getByRole('button', { name: /sign up/i });
        const loginLink = screen.getByRole('link', { name: /login/i });

        await userEvent.tab();
        expect(inputElements[0]).toHaveFocus();
        await userEvent.tab();
        expect(inputElements[1]).toHaveFocus();
        await userEvent.tab();
        expect(inputElements[2]).toHaveFocus();
        await userEvent.tab();
        expect(dropdownElem).toHaveFocus();
        await userEvent.tab();
        expect(inputElements[3]).toHaveFocus();
        await userEvent.tab();
        expect(passwordInputElem).toHaveFocus();
        await userEvent.tab();
        expect(confirmPasswordInputElem).toHaveFocus();
        await userEvent.tab();
        expect(registerBtn).toHaveFocus();
        await userEvent.tab();
        expect(loginLink).toHaveFocus();

    });

    test('should insert values in the inputs', async () => {
        render(<Router><Register /></Router>);

        const inputElements = screen.getAllByRole('textbox');
        const passwordInputElem = screen.getByTestId('password-id');
        const confirmPasswordInputElem = screen.getByTestId('confirm-password-id');

        await userEvent.type(inputElements[0], 'Sanjiv Shrestha');
        expect(inputElements[0]).toHaveValue('Sanjiv Shrestha');
        await userEvent.type(inputElements[1], '9812345678');
        expect(inputElements[1]).toHaveValue('9812345678');
        await userEvent.type(inputElements[2], 'shrestha@gmail.com');
        expect(inputElements[2]).toHaveValue('shrestha@gmail.com');
        await userEvent.type(inputElements[3], 'sanjiv');
        expect(inputElements[3]).toHaveValue('sanjiv');
        await userEvent.type(passwordInputElem, 'sanjiv123');
        expect(passwordInputElem).toHaveValue('sanjiv123');
        await userEvent.type(confirmPasswordInputElem, 'sanjiv123');
        expect(confirmPasswordInputElem).toHaveValue('sanjiv123');
    });

});