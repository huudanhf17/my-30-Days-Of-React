import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import "./Normal.scss";

const Normal = ({ isShowing, hide, type }) => {
  return isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="Normal-overlay" />
          <div
            className="Normal-wrapper"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <div className="Normal">
              <div className="Normal-header"></div>
              <div className="Normal-body">
                <img src="./img/oops-cir.png" alt="oops"></img>

                <h1 className="Normal-title text-yellow">Oops...</h1>

                <p className="Normal-cc"></p>

                <p className="text-left Normal-details">
                  You have to
                  {type === undefined ? " sign in " : " active account "}to use
                  this feature!
                </p>
                {type === undefined ? (
                  <div>
                    <Link to="/signup" className="Normal-a">
                      <button
                        className={
                          "btn clickable btn-new Normal-btn bg-trans text-black"
                        }
                        data-dismiss="Normal"
                        aria-label="Close"
                        onClick={() => hide()}
                      >
                        Sign Up
                      </button>
                    </Link>
                    <Link to="/signin" className="Normal-a">
                      <button
                        className={"btn clickable btn-new Normal-btn  bg-dg"}
                        data-dismiss="Normal"
                        aria-label="Close"
                        onClick={() => hide()}
                      >
                        Sign In
                      </button>
                    </Link>
                  </div>
                ) : (
                  <button
                    className={"btn clickable btn-new Normal-btn  bg-dg"}
                    data-dismiss="Normal"
                    aria-label="Close"
                    onClick={() => hide()}
                  >
                    Active
                  </button>
                )}
              </div>
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;
};
export default Normal;
