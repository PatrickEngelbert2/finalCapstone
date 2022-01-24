import React, { useEffect, useState, Link } from "react";
import { listReservations } from "../utils/api";
import { next, previous, today } from "../utils/date-time"
import ErrorAlert from "../layout/ErrorAlert";
import useQuery from "../utils/useQuery";
import Tables from "./Tables";
import { useHistory } from "react-router";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function ReservationsList({ date, reservations }) {
//   const [reservations, setReservations] = useState([]);
//   const [reservationsError, setReservationsError] = useState(null);
//   const history = useHistory();
//   const query = useQuery();
//   const getDate = query.get("date");
//   if (getDate) date = getDate;
//   useEffect(loadDashboard, [date]);

//   function loadDashboard() {
//     const abortController = new AbortController();
//     setReservationsError(null);
//     listReservations({ date }, abortController.signal)
//       .then(setReservations)
//       .catch(setReservationsError);
//     return () => abortController.abort();
//   }

  let mappedReservations = reservations.map((reservation) => {
    const seatButton = (<td><a
      href={`/reservations/${reservation.reservation_id}/seat`}
      className="btn btn-primary"
    >
      Seat
    </a></td>)

    return (
      <tr key={reservation.reservation_id}>
        <th scope="row">{reservation.reservation_id}</th>
        <td>{reservation.first_name}</td>
        <td>{reservation.last_name}</td>
        <td>{reservation.mobile_number}</td>
        <td>{reservation.reservation_date}</td>
        <td>{reservation.reservation_time}</td>
        <td>{reservation.people}</td>
        <td data-reservation-id-status={reservation.reservation_id}>{reservation.status}</td>
        {reservation.status === "booked" ? seatButton : null}
      </tr>
  )
  });

  return (
    <main>
      <table className="table table-dark table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Mobile Number</th>
            <th scope="col">Reservation Date</th>
            <th scope="col">Reservation Time</th>
            <th scope="col">Party Size</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
        {reservations.length ? mappedReservations : null}
        </tbody>
      </table>
    </main>
  );
}

export default ReservationsList;