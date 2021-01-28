import Country from "./Country";

const converNumber = (number) => {
  let percent = (number / 7693165599) * 100;
  return `${percent}%`;
};

const Countries = ({ tenHighestPopulation }) => {
  let listCountries = tenHighestPopulation.map((value) => {
    return (
      <Country
        key={value.name}
        countries={value}
        percent={(number) => converNumber(value.population)}
      ></Country>
    );
  });
  return listCountries;
};
export default Countries;
