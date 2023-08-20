import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import userService from '../../../services/userService';

export default function Navbar() {

  const [user, setUser] = useState({});

  const handleLogout = () => {
    userService.userLogout()
      .then(res => {
        console.log(res.data);
        window.localStorage.removeItem('userId');
        window.localStorage.removeItem('token');
      })
      .catch(err => err.response.data.error);
  }



  useEffect(() => {
    const userId = window.localStorage.getItem('userId');

    userService.getUserDetails(userId)
      .then(res => {
        setUser(res.data)
      })
      .catch(err => window.alert(err.response.data.error));
  }, [])
  return (
    <div>


      <div className="navbar bg-base-100">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link to='/customerDashboard'>Dashboard</Link></li>
            <li><Link to='/customerProfile'>My Profile</Link></li>
            <li><Link to='/reservations'>My Reservations</Link></li>
            <li><Link to='/customerViewFavorites'>My Favorite Restaurants</Link></li>
            <li><Link to='/' onClick={handleLogout}>Log out</Link></li>
          </ul>
        </div>

        <div className="flex-1 navbar-center">
          <Link className="btn btn-ghost normal-case text-xl">Welcome back, {user.fullName} !</Link>
          {/* <Link className="btn btn-ghost normal-case text-xl">Welcome back, Name !</Link> */}
        </div>
        <div className="flex-none">

          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={`http://localhost:3004/uploads/${user.picture}`} alt='User Profile Pic' />
              </div>
            </label>

          </div>
        </div>
      </div>


    </div>
  )
}
