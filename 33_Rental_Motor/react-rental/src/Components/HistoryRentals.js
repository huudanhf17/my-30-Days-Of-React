import React from "react";
import "./HistoryRentals.css";

function HistoryRentals(props) {
  let paymentsLength = props.payments.length;

  return (
    <>
      <h1 className="fade-in">History of Payments</h1>
      <p className="text-right HistoryRental-summary fade-in">
        Total: <b>{paymentsLength} times</b> -{" "}
        <b>
          {props.formatCash(
            `${props.payments.reduce((acc, value) => acc + value.price, 0)}`
          )}
          đ
        </b>
      </p>
      <table style={{ width: "100%" }}>
        <tbody>
          <tr>
            <th>Qty</th>
            <th>Date Create</th>
            <th>Duration</th>
            <th>Price</th>
            <th>By User</th>
          </tr>
          {props.payments
            .map((value, index) => (
              <tr key={value._id}>
                <td>{paymentsLength - index}</td>
                <td>{props.renderTime(value.start)}</td>
                <td className="text-right">
                  {props.innerTime(value.duration)}
                </td>
                <td className="text-right">
                  {props.formatCash(`${value.price}`)}đ
                </td>
                <td className="text-right">
                  {props.handleUserEmail(value.user_id)}
                </td>
              </tr>
            ))
            .reverse()}
        </tbody>
      </table>
    </>
  );
}

export default HistoryRentals;
