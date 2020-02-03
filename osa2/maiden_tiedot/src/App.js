import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ShowCountries from './components/ShowCountries'
import FilterField from './components/FilterField'

const App = () => {
  const [countries, setCountries] = useState([])
  const [activeCountry, setActiveCountry] = useState([0])
  const [filter, setFilter] = useState('')
  const [hideActive, setHideActive] = useState(true)

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        console.log(response.data)
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setHideActive(true)
    setFilter(event.target.value)
  }

  const handleActiveCountry = (country) => {
    setHideActive(false)
    setActiveCountry(country)
  }


  return (
  <div>
    
    <FilterField
    filter={filter}
    handleFilterChange={handleFilterChange}/>

    <ShowCountries
    filter={filter}
    countries ={countries}
    handleActiveCountry={handleActiveCountry}
    activeCountry={activeCountry}
    hideActive={hideActive}/>
    </div>
  )
}

export default App;
