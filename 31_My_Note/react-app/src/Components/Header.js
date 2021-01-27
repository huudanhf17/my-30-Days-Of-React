import React, { Component } from "react";

class Header extends Component {
  onChangeSearch = (e) => {
    this.props.getSearchInput(e.target.value);
  };

  render() {
    if (this.props.isListView && this.props.isNote === false) {
      return (
        <header className="note-header">
          <h1 className="header-h1">Note App</h1>
          <div className="header-search">
            <input
              className="header-search-input"
              onChange={(e) => this.onChangeSearch(e)}
            ></input>
            <img src="./img/search.png" alt="search"></img>
          </div>

          <div className="note-header-view">
            <img src="./img/list.png" alt="list" className="note-header-list" />
            <img
              src="./img/grid-disable.png"
              alt="grid"
              className="clickable"
              onClick={() => this.props.changeView()}
            />
            <select className="header-sort-select">
              <option value>Sort</option>
              <option value={1}>A-Z</option>
              <option value={2}>Z-A</option>
            </select>
          </div>
        </header>
      );
    } else if (this.props.isListView === false && this.props.isNote === false) {
      return (
        <header className="note-header">
          <h1 className="header-h1">Note App</h1>
          <div className="header-search">
            <input
              className="header-search-input"
              onChange={(e) => this.onChangeSearch(e)}
            ></input>
            <img src="./img/search.png" alt="search"></img>
          </div>
          <div className="note-header-view">
            <img
              src="./img/list-disable.png"
              alt="list"
              className="note-header-list clickable"
              onClick={() => this.props.changeView()}
            />
            <img src="./img/grid.png" alt="grid" />
            <select className="header-sort-select">
              <option value>Sort</option>
              <option value={1}>A-Z</option>
              <option value={2}>Z-A</option>
            </select>
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
