import React from "react";
import "./Motor.css";

function Motor(props) {
  return (
    <>
      <h1>Motor</h1>
      <ul className="User-submenu">
        <li className="User-ul-li clickable">All (xxx)</li>
        <li className="User-ul-li clickable">Unactive(xxx)</li>
        <li className="User-ul-li clickable">Active(xxx)</li>
        <li className="User-ul-li clickable">Banned(xxx)</li>
      </ul>
      <table style={{ width: "100%" }}>
        <tbody>
          <tr>
            <th>Qty</th>
            <th>Date Create</th>
            <th>Name</th>
            <th>Status</th>
            <th>Total Rental</th>
            <th>Total Revenue</th>
            <th>Currently Rent</th>
            <th>Action</th>
          </tr>
          <tr>
            <td>...</td>
            <td>...</td>
            <td>...</td>
            <td>...</td>
            <td>...</td>
            <td>...</td>
            <td>...</td>
            <td>
              <button>Abc-Xyz</button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default Motor;
