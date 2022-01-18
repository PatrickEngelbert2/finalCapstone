/**
 * List handler for reservation resources
 */
const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
  const data = await service.listReservations(req.query.date);
  res.json({ data });
}

function errorValidation(req, res, next) {
  let errors = [];
  const { data } = req.body;
  if (!data) {
    // next({ status: 400, message: "data cannot be empty" });
    errors.push("data cannot be empty")
  } 
  if (!data.first_name || data.first_name === "") {
    // next({ status: 400, message: "first_name cannot be empty" });
    errors.push("first_name cannot be empty")
  }
  if (!data.last_name || data.last_name === "") {
    // next({ status: 400, message: "last_name cannot be empty" });
    errors.push("last_name cannot be empty")
  }
  if (!data.mobile_number || data.mobile_number === "") {
    // next({ status: 400, message: "mobile_number cannot be empty" });
    errors.push("mobile_number cannot be empty")
  }
  if (!data.people || !data.people > 0 || !Number.isInteger(data.people)) {
    // next({ status: 400, message: "people must be a number > 0" });
    errors.push("people must be a number > 0")
  }

  const dateFormat = /\d\d\d\d-\d\d-\d\d/;
  const timeFormat = /\d\d:\d\d/;
  if (!data.reservation_date || !data.reservation_date.match(dateFormat)) {
    // next({
    //   status: 400,
    //   message: "reservation_date must be a date",
    // });
    errors.push("reservation_date must be a date")
  }
  if (!data.reservation_time || !data.reservation_time.match(timeFormat)) {
    // next({
    //   status: 400,
    //   message: "reservation_time must be a time",
    // });
    errors.push("reservation_time must be a time")
  }

  if (dateIsInPast(data.reservation_date)) {
    // next({
    //   status: 400,
    //   message: "reservation_date must be in the future",
    // });
    errors.push("reservation_date must be in the future")
  }
  const dateAndTime = `${data.reservation_date} ${data.reservation_time}`
  if (isTuesday(dateAndTime)) {
    // next({
    //   status: 400,
    //   message: "The resturaunt is closed on Tuesday",
    // });
    errors.push("The resturaunt is closed on Tuesday")
  }

  console.log(typeof(data.reservation_time))

  if (compareTime(data.reservation_time, "10:30") || !compareTime(data.reservation_time, "21:30")) {
    errors.push("The resturaunt is open from 10:30AM to 9:30PM")
  }

  if (errors.length) {
    next({
      status: 400,
      message: errors.join(", ")
    })
  }

  next();
}

const compareTime = (time1, time2) => {
  return new Date(time1) > new Date(time2); // true if time1 is later
}

const isTuesday = (date) => {
  const newDate = new Date(date);
  if (newDate.getDay() == 2) return true;
  return false;
};

const dateIsInPast = (date) => {
  const today = new Date();
  const checkedDate = new Date(date);
  return today > checkedDate;
};

async function create(req, res, next) {
  const newReservation = await service.create(req.body.data);
  res.status(201).json({ data: newReservation });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [errorValidation, asyncErrorBoundary(create)],
};
