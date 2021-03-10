import React from "react";
import PropTypes from "prop-types";

Country.propTypes = {};

function Country(props) {
  return (
    <div className="country">
      <div className="country_flag">
        <img src="https://restcountries.eu/data/afg.svg" alt="Afghanistan" />
      </div>
      <h3 className="country_name">AFGHANISTAN</h3>
      <div className="country_text">
        <p>
          <span>Capital: </span>Kabul
        </p>
        <p>
          <span>Languages: </span>Pashto, Uzbek, Turkmen
        </p>
        <p>
          <span>Population: </span>27.657.145
        </p>
        <p>
          <span>Currency: </span>
        </p>
      </div>
    </div>
  );
}

export default Country;
