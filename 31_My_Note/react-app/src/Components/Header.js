import React, { Component } from "react";

class Header extends Component {
  render() {
    if (this.props.isListView && this.props.isNote === false) {
      return (
        <header className="note-header">
          <h1>Note</h1>
          <div className="note-header-view">
            <img src="./img/list.png" alt="list" className="note-header-list" />
            <img
              src="./img/grid-disable.png"
              alt="grid"
              className="clickable"
              onClick={() => this.props.changeView()}
            />
          </div>
        </header>
      );
    } else if (this.props.isListView === false && this.props.isNote === false) {
      return (
        <header className="note-header">
          <h1>Note</h1>
          <div className="note-header-view">
            <img
              src="./img/list-disable.png"
              alt="list"
              className="note-header-list clickable"
              onClick={() => this.props.changeView()}
            />
            <img src="./img/grid.png" alt="grid" />
          </div>
        </header>
      );
    } else if (this.props.isNote) {
      return (
        <header className="single-note-header">
          <h1
            className="single-note-header-h1 clickable"
            onClick={() => this.props.changeIsNote()}
          >
            &lt;&lt;
          </h1>
        </header>
      );
    }
  }
}

export default Header;
