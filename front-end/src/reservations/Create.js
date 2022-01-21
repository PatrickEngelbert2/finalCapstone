import React, { useState, useEffect } from "react";
import { Link, useRouteMatch, useParams, useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { createReservation } from "../utils/api";
import Form from "./Form";

export default function Create(handleSubmit) {
  const history = useHistory();
  const [createError, setCreateError] = useState(null);
  const submitHandler = async (reservation) => {
    reservation.people = Number(reservation.people);
    await createReservation(reservation)
      .then(response => history.push(`/dashboard?date=${reservation.reservation_date}`))
      .catch(setCreateError);
    // history.push(`/dashboard?date=${reservation.reservation_date}`);
  };
  //   function cancel () {

  //   }
  //   function createError() {

  //   }

  return (
    <div>
      <h1>Create a new reservation</h1>
      <ErrorAlert error={createError} />
      <Form submitHandler={submitHandler} />
    </div>
  );
}
