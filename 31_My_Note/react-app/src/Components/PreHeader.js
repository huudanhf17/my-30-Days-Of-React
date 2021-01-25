import React, { Component } from "react";

function getDate() {
  let date = new Date();
  setTimeout(() => getDate(), 1000);
  return date;
}

class PreHeader extends Component {
  time = `${getDate().getHours()}:${getDate().getMinutes()}:${getDate().getSeconds()}`;

  render() {
    return (
      <div className="note-pre-header">
        <b>
          <p>{this.time}</p>
        </b>
      </div>
    );
  }
}

export default PreHeader;
