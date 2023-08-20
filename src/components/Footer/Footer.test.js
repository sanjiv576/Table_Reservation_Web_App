import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
    
    test('should render the footer text correctly', () => {
        render(<Footer />);

        const footerText = screen.getByText(/Table Reservation App/i);

        expect(footerText).toBeInTheDocument();
    });
});
