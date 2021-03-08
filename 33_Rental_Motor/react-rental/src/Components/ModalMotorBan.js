import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./ModalMotorBan.css";
import SpecificModal from "./SpecificModal";
import useModal from "./useModal";

const ModalMotorBan = ({
  isShowing,
  hide,
  dataModalMotorBan,
  setRefreshData,
  setRefreshUserList,
}) => {
  const [isActive, setIsActive] = useState();
  const [isShowing2, toggle2] = useModal();

  const banClick = async () => {
    try {
      let result = await fetch(`http://localhost:5000/users/`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: dataModalMotorBan.value.user_id,
          type: "banned",
        }),
      });

      let result2 = await fetch(`http://localhost:5000/orders/ban`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: dataModalMotorBan.value.order_id,
        }),
      });

      setRefreshData(Math.random());
      setRefreshUserList(Math.random());

      toggle2();

      hide();
    } catch (err) {
      console.log("Fail to ban " + err);
    }
  };

  return isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="ModalMotorBan-overlay" />

          <div
            className="ModalMotorBan-wrapper"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <div className="ModalMotorBan">
              <div className="ModalMotorBan-header"></div>
              <div className="ModalMotorBan-body">
                <img src="../img/ban.png" alt="oops"></img>

                <h1 className="ModalMotorBan-title">Are you sure?</h1>

                <p className="ModalMotorBan-cc"></p>

                <p className="text-left ModalMotorBan-details">
                  Ban <b>{dataModalMotorBan.email}</b> is renting{" "}
                  {dataModalMotorBan.motor} now!
                </p>

                <button
                  className="clickable btn-new ModalMotorBan-btn text-black margin-right-12"
                  data-dismiss="ModalMotorBan"
                  aria-label="Close"
                  onClick={hide}
                >
                  Cancel
                </button>
                <button
                  className="btn clickable btn-danger btn-new ModalMotorBan-btn margin-left-12"
                  onClick={() => banClick()}
                >
                  Confirm, Ban
                </button>
              </div>
            </div>
          </div>

          <SpecificModal
            isShowing={isShowing2}
            hide={toggle2}
            isActive={isActive}
            // removeClick={(uuidRemove) => removeClick(uuidRemove)}
          />
        </React.Fragment>,
        document.body
      )
    : null;
};
export default ModalMotorBan;
