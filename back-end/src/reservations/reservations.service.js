const knex = require("../db/connection");

function listReservations(date) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date: date })
    .orderBy("reservation_time");
}

function create(newReservation) {
  return knex("reservations")
    .insert(newReservation)
    .returning("*")
    .then((res) => res[0]);
}

module.exports = {
  listReservations,
  create,
};
