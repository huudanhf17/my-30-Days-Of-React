import React from "react";

function HistoryPayments(props) {
  let coinsLength = props.coins.length;

  return (
    <div>
      <h1>History of Payments</h1>
      <p className="text-right HistoryRental-summary">
        Total: <b>{coinsLength} times</b> -{" "}
        <b>
          {props.formatCash(
            `${props.coins.reduce((acc, value) => acc + value.plus, 0)}`
          )}
          đ
        </b>
      </p>
      <table style={{ width: "100%" }}>
        <tbody>
          <tr>
            <th>Qty</th>
            <th>Date Create</th>
            <th>Value</th>
            <th>By User</th>
          </tr>
          {props.coins
            .map((value, index) => (
              <tr key={value._id}>
                <td>{coinsLength - index}</td>
                <td>{props.renderTime(value.created_at)}</td>
                <td className="text-right">
                  {props.formatCash(`${value.plus}`)}đ
                </td>
                <td>{props.handleUserEmail(value.user_id)}</td>
              </tr>
            ))
            .reverse()}
        </tbody>
      </table>
    </div>
  );
}

export default HistoryPayments;
