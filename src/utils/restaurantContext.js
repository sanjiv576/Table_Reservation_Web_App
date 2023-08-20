import { createContext, useContext, useState } from "react";

const RestaurantContext = createContext(null);

export const RestaurantProvider = ({ children }) => {
    const [restaurant, setRestaurant] = useState(null);

    return (
        <RestaurantContext.Provider value={{ restaurant, setRestaurant }}>
            {children}
        </ RestaurantContext.Provider>
    );
};

export const useRestaurant = () => {
    return useContext(RestaurantContext);
}