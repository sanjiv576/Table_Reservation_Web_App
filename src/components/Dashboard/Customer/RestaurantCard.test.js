import React from 'react';
import { render, screen } from '@testing-library/react';
import RestaurantCard from './RestaurantCard';
import { BrowserRouter as Router } from 'react-router-dom';

const restaurants = [
    {
        id: 1,
        name: 'Restaurant 1',
        picture: 'restaurant1.jpg',
        location: 'Location 1',
        contact: 'Contact 1',
        reviews: [{ reviewId: 1, text: 'Review 1' }],
    },
    {
        id: 2,
        name: 'Restaurant 2',
        picture: 'restaurant2.jpg',
        location: 'Location 2',
        contact: 'Contact 2',
        reviews: [{ reviewId: 1, text: 'Review 1' }, { reviewId: 2, text: 'Review 2' }],
    },
];

test('should render restaurant cards', () => {
    render(
        <Router>
            <RestaurantCard restaurants={restaurants} />
        </Router>
    );

    const restaurantCards = screen.getAllByTestId('restaurant-card');
    expect(restaurantCards).toHaveLength(restaurants.length);
});

test('should render restaurant details', () => {
    render(
        <Router>
            <RestaurantCard restaurants={restaurants} />
        </Router>
    );
    restaurants.forEach((restaurant) => {
        const restaurantName = screen.getByText(restaurant.name);
        const restaurantLocation = screen.getByText(`Location: ${restaurant.location}`);
        const restaurantContact = screen.getByText(`Contact: ${restaurant.contact}`);
        expect(restaurantName).toBeInTheDocument();
        expect(restaurantLocation).toBeInTheDocument();
        expect(restaurantContact).toBeInTheDocument();
    });
});

test('should render links for reservation and view', () => {
    render(
        <Router>
            <RestaurantCard restaurants={restaurants} />
        </Router>
    );

    restaurants.forEach((restaurant) => {
        const reservationLink = screen.getAllByRole('link', { name: 'Reserve now' });
        const viewLink = screen.getAllByRole('link', { name: 'View' });

        expect(reservationLink).toBeDefined();
        expect(viewLink).toBeDefined();

    });
});
