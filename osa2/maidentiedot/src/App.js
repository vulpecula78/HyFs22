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
    console.log(selectedCountry.length + ' now selected')
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
