import React from 'react'

const ShowCountries = (props) => {
    const filteredCountries = props.countries.filter(country => country.name.toLowerCase().startsWith(props.filter.toLowerCase()))
    console.log(filteredCountries)
    if (props.hideActive) {
        if (filteredCountries.length > 10) {
            return (<p>Too many matches, specify another filter</p>)
        }
        return (
            filteredCountries.map(country => <p key={country.name}>{country.name} <button onClick={() => props.handleActiveCountry(country)}> Show</button></p>)
        )
    }
    else {
        return (
            ShowCountry(props.activeCountry)
        )
    }
}

const ShowCountry = (country) => {
    return (
        <div><h1>{country.name}</h1>
            Capital: {country.capital}
            <br></br>
            Population: {country.population}

            <h2>Languages</h2>
            <ul>
                {country.languages.map((language, i) => <li key={i}>{language.name}</li>)}
            </ul>
            <img src={country.flag} width="300" height="200" />
        </div>)
}

export default ShowCountries