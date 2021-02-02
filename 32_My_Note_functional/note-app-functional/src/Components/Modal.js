import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ isShowing, hide, removeClick }) =>
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
                <h1>Are you sure?</h1>
                <p>You won't be able to revert this!</p>

                <button
                  className="btn clickable"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={hide}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger clickable"
                  onClick={() => removeClick()}
                >
                  Yes, delete it!
                </button>
              </div>
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;

export default Modal;
