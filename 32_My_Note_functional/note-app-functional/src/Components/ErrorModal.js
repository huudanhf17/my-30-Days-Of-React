import React from "react";
import ReactDOM from "react-dom";

const ErrorModal = ({ isShowing, hide }) =>
  isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="modal-overlay" />
          <div
            className="modal-wrapper"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <div className="modal">
              <div className="modal-header">
                <button
                  type="button"
                  className="modal-close-button clickable"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={hide}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <img src="./img/warning.png" alt="warning"></img>
                <h1>Unable to Upload Image</h1>
                <p>This image size is too large to be stored.</p>
                <p>Please reduce size and upload again!</p>

                <button
                  className="btn btn-danger clickable"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={hide}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;

export default ErrorModal;
