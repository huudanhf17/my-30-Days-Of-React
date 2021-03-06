import React, { useState } from "react";
import ReactDOM from "react-dom";
import useModal from "../../utils/useModal";
import "./ModalMotorBan.scss";
import SpecificModal from "./SpecificModal";

const axios = require("axios").default;
const url = "http://localhost:5000/";

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
      let result = await axios({
        method: "PATCH",
        url: url + "users",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          userId: dataModalMotorBan.value.user_id,
          type: "banned",
        },
      });

      let result2 = await axios({
        method: "PATCH",
        url: url + "orders/ban",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          orderId: dataModalMotorBan.value.order_id,
        },
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
