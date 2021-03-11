import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'
import './countries.scss'

const LanguageGraph = ({ data: { language, count } }) => (
  <div className='bars'>
    <div>{language}</div>
    <div className='bar' style={{ width: `${count}%`, height: '35px' }}></div>
    <div>{count}</div>
  </div>
)

const LanguageGraphBars = ({ languages }) => {
  const bars = languages.map((data) => {
    return <LanguageGraph key={data.language} data={data} />
  })
  return <div className='graphWrapper'>{bars}</div>
}

const PopulationGraph = ({ data: { name, population } }) => {
  const worldPopulation = 7693165599 // World population
  let formattedName
  if (name === 'Russian Federation') formattedName = 'Russia'
  else if (name === 'United States of America') formattedName = 'USA'
  else formattedName = name

  const width = Math.round((population / worldPopulation) * 100)
  return (
    <div className='bars'>
      <div>{formattedName}</div>
      <div className='bar' style={{ width: `${width}%`, height: '35px' }}></div>
      <div>{population.toLocaleString()}</div>
    </div>
  )
}

const PopulationGraphBars = ({ populations }) => {
  const bars = populations.map((data) => {
    return <PopulationGraph key={data.name} data={data} />
  })
  return (
    <div className='graphWrapper'>
      <PopulationGraph data={{ name: 'World', population: 7693165599 }} />
      {bars}
    </div>
  )
}

const Country = ({
  country: { name, capital, flag, languages, population, currency },
}) => {
  const formattedCapital =
    capital.length > 0 ? (
      <>
        <span>Capital: </span>
        {capital}
      </>
    ) : (
      ''
    )
  const formattedLanguage = languages.length > 1 ? `Languages` : `Language`

  return (
    <div className='country'>
      <div className='country_flag'>
        <img src={flag} alt={name} />
      </div>
      <h3 className='country_name'>{name.toUpperCase()}</h3>
      <div className='country_text'>
        <p>{formattedCapital}</p>
        <p>
          <span>{formattedLanguage}: </span>
          {languages.map((language) => language.name).join(', ')}
        </p>
        <p>
          <span>Population: </span>
          {population.toLocaleString()}
        </p>
        <p>
          <span>Currency: </span>
        </p>
      </div>
    </div>
  )
}
const Footer = (props) => {
  return (
    <footer className='country-footer'>
      <div className='country-footer-wrapper'>
        <p>Copyright &copy;2020 30 Days Of React</p>
        <p>
          Join{' '}
          <a
            href='https://github.com/Asabeneh/30-Days-Of-React'
            target='_blank'
            rel='noopener noreferrer'
          >
            30 Days of React challenge
          </a>
        </p>
        <small>
          Designed and Built by{' '}
          <a
            href='https://www.linkedin.com/in/asabeneh/'
            target='_blank'
            rel='noopener noreferrer'
          >
            Asabeneh Yetayeh
          </a>
        </small>
        <div className='arrow'>
          <a href='#root'>
            <i className='fas fa-arrow-alt-circle-up'></i>
          </a>
        </div>
      </div>
    </footer>
  )
}
const CountriesData = (props) => {
  // setting initial state and method to update state
  const [data, setData] = useState([])
  const [permData, setPermData] = useState([])
  const [value, setValue] = useState('')
  const [graph, setGraph] = useState('population')
  const [flag, setFlag] = useState({
    name: true,
    capital: false,
    population: false,
  })

  useEffect(() => {
    ;(async function () {
      let result = await fetchData()
      let filteredCountries = filterCountries(result, value)
      setPermData(result)
      setData(filteredCountries)
    })()
  }, [value, flag, graph])

  const onChange = (e) => setValue(e.target.value)

  const sortByName = (data) => {
    let sortedCountries =
      value === ''
        ? reverseCountries(data)
        : sortCountries(filterCountries(data, value), 'name')
    setData(sortedCountries)
  }
  const sortByCapital = (data) => {
    let sortedCountries =
      value === ''
        ? reverseCountries(data)
        : sortCountries(filterCountries(data, value), 'capital')
    if (flag.capital) {
      setFlag({ ...flag, name: false, population: false })
      setData(sortedCountries)
    } else {
      setData(sortedCountries)
    }
  }

  const sortByPopulation = () => {
    let sortedCountries =
      value === ''
        ? reverseCountries(data)
        : sortCountries(filterCountries(data, value), 'population')
    setData(sortedCountries)
  }

  const changeToPopulationGraph = () => {
    setGraph('population')
  }
  const changeToLanguageGraph = () => {
    setGraph('language')
  }

  const fetchData = async () => {
    const url = 'https://restcountries.eu/rest/v2/all'
    try {
      const response = await fetch(url)
      const data = await response.json()
      return data
    } catch (error) {
      console.log(error)
    }
  }
  /* === Sorting countries either by name, capital or population === */
  const sortCountries = (arr, type) => {
    const countries = [...arr]
    const sortedCountries = countries.sort((a, b) => {
      if (a[type] > b[type]) return -1
      if (a[type] < b[type]) return 1
      return 0
    })
    return sortedCountries
  }
  /* === Filter countries based on search input === */
  const filterCountries = (arr, search) => {
    let searchTerm = search.toLowerCase()
    const filteredCountries = arr.filter((country) => {
      const { name, capital, languages } = country
      const isName = name.toLowerCase().includes(searchTerm)
      const isCapital = capital.toLowerCase().includes(searchTerm)

      const isLanguages = languages
        .map(({ name }) => name)
        .join()
        .toLowerCase()
        .includes(searchTerm)

      return isName || isCapital || isLanguages
    })
    const result = search === '' ? arr : filteredCountries
    return result
  }
  /* === Reverse countries array === */
  const reverseCountries = (arr) => {
    const countries = [...arr]
    return countries.reverse()
  }
  /* create bar graph for language */
  const countLanguages = (arr) => {
    const langSet = new Set()
    const allLangArr = []
    const languageFrequency = []
    arr.forEach((country) => {
      let { languages } = country
      for (const language of languages) {
        allLangArr.push(language.name)
        langSet.add(language.name)
      }
    })
    for (const l of langSet) {
      const countries = allLangArr.filter((lang) => lang === l)
      languageFrequency.push({ language: l, count: countries.length })
    }
    return languageFrequency
  }

  /*=== Ten most populated countries ===*/
  const mostPopulatedCountries = sortCountries(data, 'population').slice(0, 10)

  /*=== Ten most spoken language by region or by location ===*/
  const mostSpokenLanguages = sortCountries(
    countLanguages(data),
    'count'
  ).slice(0, 10)

  return (
    <>
      <header id='countries' className='country-header'>
        <h2 className="">World Countries Data</h2>
        <p className='subtitle'>
          Currently, we have {permData.length} countries
        </p>
        {value !== '' ? (
          <p className='feedback'>
            {data.length} satisfied the search criteria
          </p>
        ) : (
          ''
        )}
      </header>
      <div className='controls'>
        <input
          className='search-input'
          type='text'
          onChange={onChange}
          value={value}
          placeholder='Search countries by name, city and languages'
          autoFocus
        />

        {/* <div className='buttons'>
          <button onClick={() => sortByName(data)} className='name'>
            Name <i className='fas fa-long-arrow-alt-down name' disabled></i>
          </button>
          <button onClick={() => sortByCapital(data)} className='capital'>
            Capital{' '}
            <i className='fas fa-long-arrow-alt-down capital' disabled></i>
          </button>
          <button onClick={() => sortByPopulation(data)} className='population'>
            Population
            <i className='fas fa-long-arrow-alt-down population' disabled></i>
          </button>
          <a href='#stat'>
            <i className='fas fa-chart-bar'></i>
          </a>
        </div> */}

        <div>
          <a href='#stat'>
            <i className='fas fa-chart-bar'></i>
          </a>
        </div>
      </div>
      <div>
        <div className='countries-wrapper'>
          {data.map((country) => (
            <Country key={country.name} country={country} />
          ))}
        </div>
      </div>
      {/* dddd graph */}
      <div className='graph-wrapper'>
        <div className='graph-buttons'>
          <button onClick={changeToPopulationGraph} className='population'>
            Population
          </button>
          <button onClick={changeToLanguageGraph} className='languages'>
            Languages
          </button>
        </div>
        <h4 className='graph-title'>
          {graph === 'population' && value === ''
            ? '10 Most populated countries in the world'
            : '10 Most spoken languages in the world'}
        </h4>
        <div className='graphs'>
          <div className='graph-wrapper' id='stat'>
            {graph === 'population' ? (
              <PopulationGraphBars
                populations={mostPopulatedCountries}
                className={graph}
              />
            ) : (
              <LanguageGraphBars
                languages={mostSpokenLanguages}
                className={graph}
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default CountriesData
