import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Header(props) {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log(searchTerm);
      props.getTextSearch(searchTerm);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const onChangeSort = (ev) => {
    props.sortNotes(ev.target.value);
  };

  return (
    <Switch>
      <Route exact path="/">
        <header className="note-header">
          <h1 className="header-h1">Note App</h1>

          <div className="header-search">
            <input
              className="header-search-input"
              onChange={(e) => setSearchTerm(e.target.value)}
            ></input>
            <img src="./img/search.png" alt="search"></img>
          </div>

          <div className="note-header-view">
            <img src="./img/list.png" alt="list" className="note-header-list" />
            <Link to="/grid">
              <img
                src="./img/grid-disable.png"
                alt="grid"
                className="clickable"
              />
            </Link>
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
      </Route>
      <Route path="/grid">
        <header className="note-header">
          <h1 className="header-h1">Note App</h1>
          <div className="header-search">
            <input
              className="header-search-input"
              onChange={(e) => setSearchTerm(e.target.value)}
            ></input>
            <img src="./img/search.png" alt="search"></img>
          </div>
          <div className="note-header-view">
            <Link to="/">
              <img
                src="./img/list-disable.png"
                alt="list"
                className="note-header-list clickable"
              />
            </Link>
            <img src="./img/grid.png" alt="grid" className="Header-grid-img" />
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
      </Route>
      <Route exact path="/:slug.:id">
        <header className="single-note-header">
          <Link to="/">
            <h1 className="single-note-header-h1 clickable">&lt;&lt;</h1>
          </Link>
        </header>
      </Route>
      <Route exact path="/new">
        <header className="single-note-header">
          <Link to="/">
            <h1 className="single-note-header-h1 clickable">&lt;&lt;</h1>
          </Link>
        </header>
      </Route>
    </Switch>
  );
}

export default Header;
