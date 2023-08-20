import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../../services/userService';
import Navbar from '../Dashboard/Customer/Navbar';
import './CustomerProfile.css';
export default function CustomerProfile() {
  // console.log(auth.data.user);
  const [user, setUser] = useState({});
  const [file, setFile] = useState(null);

  const navigate = useNavigate();



  const handleUpdate = (e) => {
    e.preventDefault();
    console.log(user.password)

    if ((user.password === '' || user.password === undefined) ||
      (user.email === '' || user.email === undefined) || (user.fullName === '' || user.fullName === undefined)
      || (user.contact === '' || user.contact === undefined) || (user.username === '' || user.username === undefined)) {
      alert('field is empty');
      return;
    }
    const updatedContent = {
      fullName: user.fullName,
      contact: user.contact,
      email: user.email,
      username: user.username,
      password: user.password
    }
    const confirmUpdate = window.confirm('Are you sure want to update credentials ?');
    if (confirmUpdate) {
      userService.editUserDetails(user.id, updatedContent)
        .then(res => {
          setUser(res.data)
        })
        .catch(err => window.alert(err.response.data.error));
    }

  }

  const handleUpload = (e) => {
    e.preventDefault();

    if (!file) {

      alert('File is empty');
      return;
    }
    const confirmationUpload = window.confirm('Are you sure want to upload picture ?');
    if (confirmationUpload) {
      userService.uploadImage(file)
        .then(res => {
          console.log(res.data);
          setUser({ ...user, picture: res.data.filename });

        })
        .catch(err => window.alert(err.response.data.error));

    }

  }
  useEffect(() => {
    const userId = window.localStorage.getItem('userId');

    userService.getUserDetails(userId)
      .then(res => {
        setUser(res.data)
      })
      .catch(err => window.alert(err.response.data.error));
  }, [])

  const handleDeleteAccount = (e) => {
    e.preventDefault();
    const confirmationDelete = window.confirm('Are you sure want to delete account ?');
    if (confirmationDelete) {
      const userId = window.localStorage.getItem('userId');

      userService.deleteUserAccount(userId)
        .then(res => {
          window.localStorage.removeItem('userId');
          window.localStorage.removeItem('token');

          console.log('Account deleted');
          navigate('/');

        })
        .catch(err => window.alert(err.response.data.error));
    }
  };

  return (
    <div>
      <Navbar />
      <div className='outer-container'>
        <div className='inner-container'>

          <div className="avatar profile-picture">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9tl086_bs0NPt0fVNPqSBkVr32Jy5RCcUkUf8qmPXzuBxSBvGy6z4v0621fnKyMy6fns&usqp=CAU" alt='User pic'/> */}
              <img src={`http://localhost:3004/uploads/${user.picture}`} alt='User pic' />
            </div>
          </div>
          <div className='user-details'>
            <form >
              <div className='individual-input-div'>
                <label htmlFor="">Full name </label>
                <input
                  data-testId="name-id"
                  type="text"
                  value={user.fullName}
                  onChange={(e) => setUser({
                    ...user,
                    fullName: e.target.value
                  })}
                  required
                />
              </div>
              <div className='individual-input-div'>
                <label htmlFor="">Email </label>
                <input
                  data-testId="email-id"

                  type="text"
                  value={user.email}
                  onChange={(e) => setUser({
                    ...user,
                    email: e.target.value
                  })}
                  required
                />
              </div>
              <div className='individual-input-div'>
                <label htmlFor="">Contact </label>
                <input
                  data-testId="contact-id"

                  type="text"
                  value={user.contact}
                  onChange={(e) => setUser({
                    ...user,
                    contact: e.target.value
                  })}
                  required
                />
              </div>
              <div className='individual-input-div'>
                <label htmlFor="">Username </label>
                <input
                  data-testId="username-id"

                  type="text"
                  value={user.username}
                  onChange={(e) => setUser({
                    ...user,
                    username: e.target.value
                  })}
                  required
                />
              </div>
              <div className='individual-input-div'>
                <label htmlFor="">Password </label>
                <input
                  data-testId="password-id"
                  id='my-password'
                  type="password"
                  onChange={(e) => setUser({
                    ...user,
                    password: e.target.value
                  })}
                  required
                />
              </div>
              <br />

              <button className="btn btn-primary" onClick={handleUpdate}>Update</button>

            </form>
            <br />
            <form>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                required />

              <button className="btn btn-secondary" onClick={handleUpload}>Upload  Picture</button>

            </form>

            <br />
            <button className='btn btn-primary' onClick={handleDeleteAccount}>Delete Account</button>
            <br /><br />
          </div>

        </div>


      </div>

    </div>
  )
}
