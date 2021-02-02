import React from "react";

function Header(props) {
  const onChangeSearch = (e) => {
    props.getTextSearch(e.target.value);
  };

  const onChangeSort = (ev) => {
    props.sortNotes(ev.target.value);
  };

  if (props.isNote === false && props.isAdd === false && props.isListView) {
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
            onClick={() => props.setIsListView()}
          />
          <select
            className="header-sort-select clickable"
            onChange={(ev) => onChangeSort(ev)}
            defaultValue={localStorage.getItem("valueSort")}
          >
            <option value={0}>Sort</option>
            <option value={1}>A-Z</option>
            <option value={2}>Z-A</option>
          </select>
        </div>
      </header>
    );
  } else if (
    props.isListView === false &&
    props.isNote === false &&
    props.isAdd === false
  ) {
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
          <img
            src="./img/list-disable.png"
            alt="list"
            className="note-header-list clickable"
            onClick={() => props.setIsListView()}
          />
          <img src="./img/grid.png" alt="grid" />
          <select
            className="header-sort-select clickable"
            onChange={(ev) => onChangeSort(ev)}
            defaultValue={localStorage.getItem("valueSort")}
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
