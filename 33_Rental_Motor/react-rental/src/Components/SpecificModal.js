import React from "react";
import ReactDOM from "react-dom";
import "./SpecificModal.css";

const SpecificModal = ({ isShowing, hide, isActive }) => {
  return isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="SpecificModal-overlay" />
          <div
            className="SpecificModal-wrapper"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <div className="SpecificModal">
              <div className="SpecificModal-header"></div>
              <div className="SpecificModal-body">
                {isActive ? (
                  <p className="text-green SpecificModal-text">
                    <b>
                      Active User Success{" "}
                      <img
                        src="../img/success.png"
                        alt="success"
                        className="SpecificModal-img"
                      ></img>
                    </b>
                  </p>
                ) : (
                  <p className="text-danger SpecificModal-text">
                    <b>
                      Ban User Success{" "}
                      <img
                        src="../img/success.png"
                        alt="success"
                        className="SpecificModal-img"
                      ></img>
                    </b>
                  </p>
                )}
              </div>
            </div>
            {setTimeout(() => hide(), 500)}
          </div>
        </React.Fragment>,
        document.body
      )
    : null;
};
export default SpecificModal;
