import React from "react";
import ReactDOM from "react-dom";
import "./RentModal.css";

const RentModal = ({ isShowing, hide }) =>
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
                <h1 className="RentModal-title">RENT SUCCESS</h1>
                <p className="RentModal-cc">cc</p>

                <p className="text-left RentModal-details">Price: đ</p>
                <p className="text-left RentModal-details">Duration:</p>
                <button
                  className="btn clickable RentModal-btn"
                  data-dismiss="RentModal"
                  aria-label="Close"
                  onClick={hide}
                >
                  Cancel
                </button>
                <button className="btn btn-danger clickable RentModal-btn">
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
