import React from "react";

function Header(props) {
  if (props.isNote === false && props.isAdd === false) {
    const onChangeSearch = (e) => {
      props.getTextSearch(e.target.value);
    };
    return (
      <header className="note-header">
        <h1 className="header-h1">Note App</h1>
        <div className="header-search">
          <input
            className="header-search-input"
            onChange={(e) => onChangeSearch(e)}
          ></input>
          <img src="./img/search.png" alt="search"></img>
        </div>

        <div className="note-header-view">
          <img src="./img/list.png" alt="list" className="note-header-list" />
          <img
            src="./img/grid-disable.png"
            alt="grid"
            className="clickable"
            //onClick={() => this.props.changeView()}
          />
          <select
            className="header-sort-select clickable"
            // onChange={(ev) => this.onChangeSort(ev)}
            // defaultValue={this.props.valueSort}
          >
            <option value={0}>Sort</option>
            <option value={1}>A-Z</option>
            <option value={2}>Z-A</option>
          </select>
        </div>
      </header>
    );
  } else if (props.isNote) {
    return (
      <header className="single-note-header">
        <h1
          className="single-note-header-h1 clickable"
          onClick={() => props.setIsNote()}
        >
          &lt;&lt;
        </h1>
      </header>
    );
  } else if (props.isAdd) {
    return (
      <header className="single-note-header">
        <h1
          className="single-note-header-h1 clickable"
          onClick={() => props.setIsAdd()}
        >
          &lt;&lt;
        </h1>
      </header>
    );
  }
}

export default Header;
