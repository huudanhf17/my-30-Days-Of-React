import React, { useDebugValue } from "react";
import PropTypes from "prop-types";

Country.propTypes = {};

function Country(props) {
  const formattedLanguage =
    props.languages.length > 1 ? `Languages` : `Language`;

  return (
    <div className="country">
      <div className="country_flag">
        <img src={props.flag} alt="Afghanistan" />
      </div>
      <h3 className="country_name">{props.name}</h3>
      <div className="country_text">
        <p>
          <span>Capital: </span>
          {props.capital}
        </p>
        <p>
          <span>{formattedLanguage}: </span>
          {props.languages.map((value) => value.name).join(", ")}
        </p>
        <p>
          <span>Population: </span>
          {props.population.toLocaleString()}
        </p>
        <p>
          <span>Currency: </span>
          {props.currencies.map((value) => value.name).join(", ")}
        </p>
      </div>
    </div>
  );
}

export default Country;
