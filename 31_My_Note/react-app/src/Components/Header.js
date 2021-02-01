import React, { Component } from "react";
import Sort from "./Sort";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortValue: 0,
    };
  }

  componentDidMount() {
    this.setState({
      sortValue: this.props.sortValue,
    });
  }
  onChangeSearch = (e) => {
    this.props.getSearchInput(e.target.value);
  };

  onChangeSort = (ev) => {
    this.props.sortNotes(ev.target.value);
  };

  backOnclick = () => {
    this.props.resetSearch();
    this.props.changeIsNote();
  };

  backOnclick2 = () => {
    this.props.resetSearch();
    this.props.changeIsAdd();
  };

  render() {
    if (
      this.props.isListView &&
      this.props.isNote === false &&
      this.props.isAdd === false
    ) {
      console.log(this.props.valueSort);
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
            <Sort
              valueSort={this.props.valueSort}
              sortNotes={(a) => this.props.sortNotes(a)}
            ></Sort>
          </div>
        </header>
      );
    } else if (
      this.props.isListView === false &&
      this.props.isNote === false &&
      this.props.isAdd === false
    ) {
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
            <select
              className="header-sort-select clickable"
              onChange={(ev) => this.onChangeSort(ev)}
            >
              <option value={0}>Sort</option>
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
            onClick={() => this.backOnclick()}
          >
            &lt;&lt;
          </h1>
        </header>
      );
    } else if (this.props.isAdd) {
      return (
        <header className="single-note-header">
          <h1
            className="single-note-header-h1 clickable"
            onClick={() => this.backOnclick2()}
          >
            &lt;&lt;
          </h1>
        </header>
      );
    }
  }
}

export default Header;
