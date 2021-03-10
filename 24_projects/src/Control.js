import React from "react";
import PropTypes from "prop-types";

Control.propTypes = {};

function Control(props) {
  return (
    <div className="controls">
      <input
        className="search-input"
        type="text"
        placeholder="Search countries by name, city and languages"
      />
      <div>
        <a href="#stat">
          <i className="fas fa-chart-bar"></i>
        </a>
      </div>
    </div>
  );
}

export default Control;
