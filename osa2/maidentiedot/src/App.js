import { useState, useEffect } from 'react'
import axios from 'axios'

const FindCountry = ( {countryFilter, addCountryFilter} ) => {
  return (
    <div>
        find countries <input value={countryFilter} onChange={addCountryFilter} />
    </div>
  )
}


const ShowCountry = ( {selectedCountry, handleClick} ) => {
  if (selectedCountry.length === 1) {
    console.log(selectedCountry)
    const country = selectedCountry[0]
    return (
      <div>
        <h2>{country.name.common}</h2>
        Capital: {country.capital}<br />
        Area: {country.area}
        <h3>languages:</h3>
        <ul>
          {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
        </ul>
        <img src={country.flags.png} alt='country flag' />
        <br />
        <Weather city={country.capital} />
      </div>
    )
  } else if (selectedCountry.length < 11) {
    return (
      <div>
        {selectedCountry.map(country =>
          <div key={country.name.common}>
            {country.name.common} &nbsp;
            <button value={country.name.common} onClick={handleClick}>Show</button></div>)}
      </div>
    )
  } else {
    return (
      <div>
        Too many matches, specify another filter.
      </div>
    )
  }
}

const Weather = ( {city} ) => {
  const api_key = process.env.REACT_APP_API_KEY
  const [weather, setWeather] = useState("")

  const toCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(2)
  }

  const weatherHook = () => {
    console.log('Weather effect')
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`)
      .then(response => {
        console.log('promise fulfilled!')
        setWeather(response.data)
      })
  }

  useEffect(weatherHook, [api_key, city, setWeather])

  console.log(weather.main)

  if (weather) {
    const icon = new URL(`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`)
    return (
      <div>
        <h3>Weather in {city}</h3>
        <p>
          Temperature {toCelsius(weather.main.temp)}&deg;C
        </p>
          <img src={icon} alt='weather icon' />
        <p>
          Wind: {weather.wind.speed} m/s
        </p>
      </div>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [countryFilter, setCountryFilter] = useState('')
  const [selectedCountry, setSelectedCountry] = useState([])

  useEffect(() => {
    console.log('Effect.')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('Promise fulfilled!')
        setCountries(response.data)
        setSelectedCountry(response.data)
      })
  }, [])


  const addCountryFilter = (event) => {
    setCountryFilter(event.target.value)
    setSelectedCountry(countries.filter(cFilter =>
      cFilter.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
    console.log(selectedCountry.length + ' selected')
  }

  const handleClick = (event) => {
    setCountryFilter(event.target.value)
    setSelectedCountry(countries.filter(cFilter =>
      cFilter.name.common.includes(event.target.value)))
  }


  return (
    <div>
        <FindCountry countryFilter={countryFilter} addCountryFilter={addCountryFilter} ShowCountries />
        <ShowCountry selectedCountry={selectedCountry} handleClick={handleClick} />
    </div>
  )
}

export default App;
