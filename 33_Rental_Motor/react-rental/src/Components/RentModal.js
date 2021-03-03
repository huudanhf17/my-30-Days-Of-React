import React from "react";
import ReactDOM from "react-dom";
import "./RentModal.css";

const RentModal = ({
  isShowing,
  hide,
  motor,
  imgMotor,
  dataRent,
  durationRent,
  formatCash,
  innerTime,
  indexMotor,
  getRentInfo,
}) =>
  isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="RentModal-overlay" />
          <div
            className="RentModal-wrapper"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <div className="RentModal">
              <div className="RentModal-header">
                <div className="RentalModal-success">
                  <h1 className="RentModal-title">Rent Success</h1>
                  <img src="./img/success.png" alt="success"></img>
                </div>
                <button
                  type="button"
                  className="RentModal-close-button clickable"
                  data-dismiss="RentModal"
                  aria-label="Close"
                  onClick={hide}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="RentModal-body">
                <b>
                  {motor.brand} {motor.name}
                </b>{" "}
                <span className="RentModal-cc">{motor.cc}cc</span>
                <br></br>
                {imgMotor(motor.name)}
                <p className="text-left RentModal-details">
                  Price: {formatCash(`${dataRent}`)}đ
                </p>
                <p className="text-left RentModal-details">
                  Duration: {innerTime(durationRent)}
                </p>
                <button
                  className="btn clickable RentModal-btn"
                  data-dismiss="RentModal"
                  aria-label="Close"
                  onClick={hide}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger clickable RentModal-btn"
                  onClick={() =>
                    getRentInfo(
                      motor.motor_id,
                      dataRent,
                      durationRent,
                      indexMotor
                    )
                  }
                >
                  RENT
                </button>
              </div>
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;

export default RentModal;
