import React, { useState, useEffect } from "react";
import { Link, useRouteMatch, useParams, useHistory } from "react-router-dom";

import { today } from "../utils/date-time";

export default function CreateReservation() {
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [partySize, setPartySize] = useState(0);
  async function handleSubmit(evt) {
    evt.preventDefault();
    alert("Form Submitted");
    history.push(`/dashboard`);
  }
  return (
    <form class="needs-validation" onSubmit={handleSubmit} novalidate>
      <div class="form-row">
        <div class="col-md-4 mb-3">
          <label for="validationCustom01">First name</label>
          <input
            name="first_name"
            type="text"
            class="form-control"
            id="first_name"
            value={firstName}
            onChange={(evt) => setFirstName(evt.target.value)}
            required
          />
          <div class="valid-feedback">Looks good!</div>
        </div>
        <div class="col-md-4 mb-3">
          <label for="last_name">Last name</label>
          <input
            name="last_name"
            type="text"
            class="form-control"
            id="last_name"
            value={lastName}
            onChange={(evt) => setLastName(evt.target.value)}
            required
          />
          <div class="valid-feedback">Looks good!</div>
        </div>
        <div class="col-md-4 mb-3">
          <label for="mobile_number">Phone number</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroupPrepend">
                #
              </span>
            </div>
            <input
              name="mobile_number"
              type="tel"
              class="form-control"
              id="mobile_number"
              value={phoneNumber}
              onChange={(evt) => setPhoneNumber(evt.target.value)}
              aria-describedby="inputGroupPrepend"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              required
            />
            <div class="invalid-feedback">
              Please type a valid phone number.
            </div>
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="col-md-6 mb-3">
          <label for="reservation_date">Date</label>
          <input
            name="reservation_date"
            placeholder="YYYY-MM-DD"
            pattern="\d{4}-\d{2}-\d{2}"
            type="date"
            value={date}
            onChange={(evt) => setDate(evt.target.value)}
            class="form-control"
            id="reservation_date"
            required
          />
          <div class="invalid-feedback">Please provide a valid date.</div>
        </div>
        <div class="col-md-3 mb-3">
          <label for="validationCustom04">Time</label>
          <input
            type="time"
            placeholder="HH:MM"
            pattern="[0-9]{2}:[0-9]{2}"
            name="reservation_time"
            class="form-control"
            value={time}
            onChange={(evt) => setTime(evt.target.value)}
            id="reservation_time"
            required
          />
          <div class="invalid-feedback">Please select a valid time.</div>
        </div>
        <div class="col-md-3 mb-3">
          <label for="validationCustom05">Party Size</label>
          <input
            name="people"
            type="number"
            class="form-control"
            value={partySize}
            onChange={(evt) => setPartySize(evt.target.value)}
            id="validationCustom05"
            required
          />
          <div class="invalid-feedback">
            There must be at least 1 person in your party.
          </div>
        </div>
      </div>
      <button class="btn btn-primary" type="submit">
        Submit
      </button>
      <button onClick={history.goBack} className="btn btn-warning m-2">
        Cancel
      </button>
    </form>
  );
}
