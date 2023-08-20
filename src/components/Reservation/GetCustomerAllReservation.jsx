import React, { useEffect, useState } from 'react';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdRemoveRedEye } from "react-icons/md";
import reservationService from '../../services/reservationService';
import Navbar from '../Dashboard/Customer/Navbar';

export default function GetCustomerAllReservation() {
  const [reservations, setReservations] = useState([]);
  const [editedReservationId, setEditedReservationId] = useState('')
  const [singleReservation, setSingleReservation] = useState({
    dinnerPlace: '',
    numberOfDinners: '',
    date: '',
    time: ''
  });
  const [viewReservationInfo, setViewReservationInfo] = useState({});


  const handleDelete = (reservationId) => {
    const confirmDelete = window.confirm('Do you want to sure delete ?');
    if (confirmDelete) {
      reservationService.deleteAReservation(reservationId)
        .then(res => {
          // also update the reservations state with the latest data
          const newReservations = reservations.filter((reservation) => reservation.id !== reservationId);
          setReservations(newReservations);

        })
        .catch((err) => {
          window.alert(err.response.data.error)

        })

    }
  }
  const handleEdit = (reservationId) => {

    reservationService.getAReservation(reservationId)
      .then(res => {
        setEditedReservationId(reservationId);

        // get and set the data
        setSingleReservation({
          "time": '',
          "date": '',
          "dinnerPlace": res.data.dinnerPlace,
          "numberOfDinners": res.data.numberOfDinners
        });

        // open modal
        window.myModal.showModal()

      })

  }
  const handleView = (viewReservation) => {


    reservationService.getAReservation(viewReservation.id)
      .then(res => {
        console.log(res.data)
        setViewReservationInfo(res.data)


      })
      .catch((err) => {
        window.alert(err.response.data.error)

      })
    window.viewModal.showModal();
  }

  const handleEditReservation = () => {

    // console.log(`Reservation id is : ${editedReservationId}`)
    const editedReservationInfo = {
      date: singleReservation.date,
      time: singleReservation.time,
      dinnerPlace: singleReservation.dinnerPlace,
      numberOfDinners: singleReservation.numberOfDinners
    }
    reservationService.editAReservation(editedReservationId, editedReservationInfo)
      .then((res) => {
        window.alert('Reservation edited successfully');

        // update the old reservations state with the updated reservation
        setReservations((prevReservations) => {
          const updatedReservations = prevReservations.map((reservation) => {
            if (reservation.id === editedReservationId) {
              return {
                ...reservation,
                date: singleReservation.date,
                time: singleReservation.time,
                dinnerPlace: singleReservation.dinnerPlace,
                numberOfDinners: singleReservation.numberOfDinners,
              };
            }
            return reservation;
          });
          return updatedReservations;
        });
        // Reset form fields
        setSingleReservation({
          dinnerPlace: '',
          numberOfDinners: '',
          date: '',
          time: ''
        })

      })
      .catch((err) => {
        window.alert(err.response.data.error)

      })
      .finally(() => {
        // Reset the edited reservation ID
        setEditedReservationId('');
      });


  }

  useEffect(() => {
    reservationService.getAllReservationsByCustomer()
      .then(res => {
        // set the reservations
        setReservations(res.data);
      })
      .catch(err => window.alert(err.response.data.error))

  }, []);

  return (
    <div>
      <Navbar />

      {
        reservations.length === 0
          ?
          <h1 className='font-bold text-lg'>No Reservation Yet</h1>
          :

          <>

            <h1 className='font-bold text-lg'>My Reservations</h1>

            <dialog id="viewModal" className="modal">

              <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                  <img src={`http://localhost:3004/uploads/${viewReservationInfo.restaurantPicture}`} alt='Resservation Img' className="max-w-sm rounded-lg shadow-2xl" />
                  <div>
                    <h1 className="text-5xl font-bold font-black text-black">{viewReservationInfo.restaurantName}</h1>
                    {/* wants to reserve tables for ${_reservationEntity!.numberOfDinners} people at ${_reservationEntity!.dinnerPlace} on ${_reservationEntity!.date} at ${_reservationEntity!.time}. */}
                    <p className="py-6 text-black text-left">
                      {viewReservationInfo.userName} reserved tables for {viewReservationInfo.numberOfDinners} people at {viewReservationInfo.dinnerPlace} on {viewReservationInfo.date} at {viewReservationInfo.time}.
                    </p>
                    <br />
                    <button data-testId="back-btn-id" className="btn btn-primary" onClick={() => window.viewModal.close()}>Back</button>
                  </div>
                </div>
              </div>

            </dialog>

            <dialog id="myModal" className="modal">

              <form method="dialog" className="modal-box" >

                <div className="input-container">
                  <label>Date </label>
                  <input
                    type="date"
                    // value={singleReservation.date}

                    // placeholder='E.g. Jul 14, 2023'
                    onChange={(e) => {
                      setSingleReservation({
                        ...singleReservation,
                        date: e.target.value
                      })
                    }}
                    required />
                </div>

                <div className="input-container">
                  <label>Time:</label>
                  <input
                    type="time"
                    // value={singleReservation.time}
                    onChange={(e) => {
                      setSingleReservation({
                        ...singleReservation,
                        time: e.target.value
                      })
                    }}
                    required />
                </div>

                <div className="input-container">
                  <label>Number of People:</label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={singleReservation.numberOfDinners}
                    onChange={(e) => setSingleReservation({
                      ...singleReservation,
                      numberOfDinners: e.target.value,
                    })}
                    required
                  />
                </div>

                <div className="input-container">
                  <label>Location:</label>

                  <select
                    value={singleReservation.dinnerPlace}
                    onChange={(e) => setSingleReservation({
                      ...singleReservation,
                      dinnerPlace: e.target.value
                    })}
                    className="select select-bordered w-full max-w-xs">
                    <option disabled selected>Select Place Type</option>
                    <option value="indoor">Indoor</option>
                    <option value="outdoor">Outdoor</option>

                    required
                  </select>
                </div>

                <button className='submit-button' onClick={(handleEditReservation)} type="submit">Edit</button>
              </form>


            </dialog>

            <div className="overflow-x-auto">
              <table className="table table-xs table-sm table-md table-lg" data-testId="table-id">
                {/* head */}
                <thead>
                  <tr>

                    <th data-testId="name-id">Name</th>
                    <th data-testId="date-id">Date</th>
                    <th data-testId="time-id">Time</th>
                    <th data-testId="dinnerNum-id">Number of Dinner</th>
                    <th data-testId="placeType-id">Place type</th>
                    <th data-testId="actions-id">Actions</th>
                  </tr>
                </thead>
                <tbody>

                  {
                    reservations.map(reservation =>
                      <tr key={reservation.id} data-testId="table-row-id">

                        <td>
                          <div className="flex items-center space-x-3">
                            <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                <img src={`http://localhost:3004/uploads/${reservation.restaurantPicture}`} alt="Restaurant Pic" />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold">{reservation.restaurantName}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          {reservation.date}

                        </td>
                        <td>{reservation.time}</td>
                        <td>{reservation.numberOfDinners}</td>
                        <td>{reservation.dinnerPlace}</td>

                        <td>

                          <button data-testId="edit-btn-id" className="btn btn-outline btn-primary btn-xs sm:btn-sm md:btn-md" onClick={() => handleEdit(reservation.id)}>
                            <AiFillEdit data-testId="edit-icon-id" /> Edit

                          </button>
                          {' '}
                          <button data-testId="view-btn-id" className="btn btn-outline btn-primary btn-xs sm:btn-sm md:btn-md " onClick={() => handleView(reservation)}>
                            <MdRemoveRedEye data-testId="view-icon-id" /> View
                          </button>
                          {' '}
                          <button data-testId="delete-btn-id" className="btn btn-outline btn-primary btn-xs sm:btn-sm md:btn-md" onClick={() => handleDelete(reservation.id)}>
                            <AiFillDelete data-testId="delete-icon-id" /> Delete
                          </button>
                        </td>
                      </tr>)
                  }
                </tbody>


              </table>
            </div>
          </>
      }

    </div>
  )
}

