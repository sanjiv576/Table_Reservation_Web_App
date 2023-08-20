import { Route, Routes } from 'react-router-dom';
import './App.css';
import CustomerDashboard from './components/Dashboard/Customer/CustomerDashboard';
import OwnerDashboard from './components/Dashboard/Owner/OwnerDashboard';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Reservation from './components/Reservation/Reservation';
import { AuthProvider } from './utils/authContext';
import Footer from './components/Footer/Footer';
import GetCustomerAllReservation from './components/Reservation/GetCustomerAllReservation';
import CustomerProfile from './components/Profile/CustomerProfile';
import RestaurantCreate from './components/Dashboard/Owner/RestaurantCreate';
import OwnerProfile from './components/Dashboard/Owner/OwnerProfile';
import OwnerViewReservations from './components/Dashboard/Owner/OwnerViewReservations';
import SingleRestaurant from './components/Restaurant/SingleRestaurant';
import FoodOrder from './components/FoodOrder/FoodOrder';
import FoodList from './components/FoodMenu/FoodList';
import FoodOrderConfirmation from './components/FoodOrder/FoodOrderConfirmation';
import AddFood from './components/FoodMenu/AddFood';
import ViewFoodMenu from './components/FoodMenu/ViewFoodMenu';
import CustomerViewFavorites from './components/Dashboard/Customer/CustomerViewFavorites';
import OwnerViewFoodOrder from './components/Dashboard/Owner/OwnerViewFoodOrder';
import OwnerViewAllReviews from './components/Dashboard/Owner/OwnerViewAllReviews';
import { RequireAuth } from './utils/RequireAuth';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/ownerDashboard' element={<RequireAuth><OwnerDashboard /></RequireAuth>} />
          <Route path='/customerDashboard' element={<RequireAuth><CustomerDashboard /></RequireAuth>} />
          <Route path='/reservation/:restaurantId' element={<RequireAuth><Reservation /></RequireAuth>} />
          <Route path='/restaurant/:restaurantId' element={<RequireAuth><SingleRestaurant /></RequireAuth>} />
          <Route path='/reservations' element={<RequireAuth><GetCustomerAllReservation /></RequireAuth>} />
          <Route path='/customerProfile' element={<RequireAuth><CustomerProfile /></RequireAuth>} />
          <Route path='/restaurantCreate' element={<RequireAuth><RestaurantCreate /></RequireAuth>} />
          <Route path='/ownerProfile' element={<RequireAuth><OwnerProfile /></RequireAuth>} />
          <Route path='/ownerViewReservations' element={<RequireAuth><OwnerViewReservations /></RequireAuth>} />
          <Route path='/foodOrder/:restaurantId' element={<RequireAuth><FoodOrder /></RequireAuth>} />
          <Route path='/menu/:restaurantId' element={<RequireAuth><FoodList /></RequireAuth>} />
          <Route path='/viewMenu/:restaurantId' element={<RequireAuth><ViewFoodMenu /></RequireAuth>} />
          <Route path='/menu/addFoodItem/:restaurantId' element={<RequireAuth><AddFood /></RequireAuth>} />
          <Route path='/reservation/:restaurantId/foodOrder' element={<RequireAuth><FoodOrderConfirmation /></RequireAuth>} />
          <Route path='/customerViewFavorites' element={<RequireAuth><CustomerViewFavorites /></RequireAuth>} />
          <Route path='/ownerViewFoodOrders' element={<RequireAuth><OwnerViewFoodOrder /></RequireAuth>} />
          <Route path='/reviews' element={<RequireAuth><OwnerViewAllReviews /></RequireAuth>} />

        </Routes>
      </AuthProvider>
      <Footer />

    </div>

  );
}

export default App;
