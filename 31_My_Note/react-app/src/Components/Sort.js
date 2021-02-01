import React, { Component } from "react";

class Sort extends Component {
  render() {
    return (
      <select
        className="header-sort-select clickable"
        onChange={(ev) => this.onChangeSort(ev)}
        defaultValue={this.props.valueSort}
      >
        <option value={0}>Sort</option>
        <option value={1}>A-Z</option>
        <option value={2}>Z-A</option>
      </select>
    );
  }
}

export default Sort;
