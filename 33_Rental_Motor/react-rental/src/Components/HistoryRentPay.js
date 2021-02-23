import React from "react";
import "./HistoryRentPay.css";

function HistoryRentPay(props) {
  return (
    <div className="HistoryRentPay-div">
      <div className="HistoryRentPay-container">
        <h1>History of Rent - Payment </h1>

        <table style={{ width: "100%" }}>
          <tbody>
            <tr>
              <th>Qty</th>
              <th>Time</th>
              <th>Description</th>
              <th>Other...</th>
            </tr>

            {console.log(props.coins)}
            {props.coins.map((value, index) => (
              <tr key={value._id}>
                <td>{index + 1}</td>
                <td>{value.created_at}</td>
                <td>Plus: {value.plus}</td>
                <td>...</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="HistoryRentPay-div2">.....</div>
    </div>
  );
}

export default HistoryRentPay;
