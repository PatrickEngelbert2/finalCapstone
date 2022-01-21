import React, { useEffect, useState } from "react";
import { listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { deleteSeat } from "../utils/api";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
export default function Tables() {
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  useEffect(loadTables, []);

  function loadTables() {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }

  function handleFinish() {
    if (
      window.confirm(
        "Is this table ready to seat new guests? \nThis cannot be undone."
      )
    ) {
    }
  }

  let mappedTables = tables.map((table) => (
    <tr key={table.table_id}>
      <th scope="row">{table.table_id}</th>
      <td>{table.table_name}</td>
      <td>{table.capacity}</td>
      <td data-table-id-status={table.table_id}>
        {table.reservation_id === null ? "Free" : "Occupied"}
      </td>
      <td>{table.reservation_id}</td>
      <td data-table-id-status={table.table_id}>
        {table.reservation_id !== null ? (
          <button onClick={() => handleFinish()} className="btn btn-primary m-2">
            Finish
          </button>
        ) : null}
      </td>
    </tr>
  ));

  return (
    <main>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Tables for date</h4>
      </div>
      <ErrorAlert error={tablesError} />
      <table className="table table-dark table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Table Name</th>
            <th scope="col">Capacity</th>
            <th scope="col">Table Status</th>
            <th scope="col">Reservation Id</th>
          </tr>
        </thead>
        <tbody>{tables.length ? mappedTables : null}</tbody>
      </table>
    </main>
  );
}
