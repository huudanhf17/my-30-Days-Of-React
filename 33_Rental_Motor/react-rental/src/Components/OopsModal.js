import React from "react";
import ReactDOM from "react-dom";
import "./OopsModal.css";

const OopsModal = ({ isShowing, hide, isOops }) => {
  const OopsClick = () => {
    hide();
    isOops.focus();
  };

  return isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="OopsModal-overlay" />
          <div
            className="OopsModal-wrapper"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <div className="OopsModal">
              <div className="OopsModal-header"></div>
              <div className="OopsModal-body">
                {isOops ? (
                  <img src="./img/oops-cir.png" alt="oops"></img>
                ) : (
                  <img src="./img/money.png" alt="oops"></img>
                )}

                {isOops ? (
                  <h1 className="OopsModal-title text-yellow">Oops...</h1>
                ) : (
                  <h1 className="OopsModal-title">Out of coins</h1>
                )}

                <p className="OopsModal-cc"></p>

                <p className="text-left OopsModal-details">
                  {isOops
                    ? "You have not chosen rent duration yet!"
                    : "You can click HERE to top up to rent motor."}
                </p>

                <button
                  className={
                    isOops
                      ? "btn clickable bg-yellow btn-new OopsModal-btn"
                      : "btn clickable btn-danger btn-new OopsModal-btn"
                  }
                  data-dismiss="OopsModal"
                  aria-label="Close"
                  onClick={isOops ? () => OopsClick() : hide}
                >
                  OK, Close
                </button>
              </div>
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;
};
export default OopsModal;
