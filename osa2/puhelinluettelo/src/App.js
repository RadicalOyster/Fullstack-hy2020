import React, { useState, useEffect } from 'react'
import ShowPersons from './components/ShowPersons'
import PersonForm from './components/PersonForm'
import FilterField from './components/FilterField'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    personsService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
    setMessage(null)
  }, [])

  console.log('render', persons.length, 'persons')

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState([])

  const Notification = () => {
    if (message === null) {
      return null;
    }

    return (
      <div className='notification'>{message.content}</div>
    )
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.filter(person => person.name === newName).length !== 0) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        let person = persons.filter(person => person.name === newName)[0]
        person.number = newNumber
        personsService.update(person.id, person)
          .then(response => {
            personsService
              .getAll()
              .then(response => {
                console.log(response.data)
                persons.concat(response.data)
              })
              setMessage({ content: "Updated " + newName + "'s phone number" })
              setTimeout(() => {
                setMessage(null)
              }, 5000)
          })

      }
      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }

    personsService
      .create(personObject)
      .then(response => {
        console.log(response.data.name, response.data.number, response.data.id)
        const newPerson = { name: response.data.name, number: response.data.number, id: response.data.id }
        setPersons(persons.concat(newPerson))
        console.log(persons)
      })
      .catch(error => {
        console.log(error.response.data)
        setMessage({content: error.response.data})
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        return
      })


    setMessage({ content: "Added " + newName + " to the phonebook" })
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const removePerson = (personToRemove) => {
    if (window.confirm("Delete " + personToRemove.name + "?")) {
      personsService
        .deletePerson(personToRemove)
        .then(response => {
          console.log("HEYHEY")
          setPersons(persons.filter(person => person.id !== personToRemove.id))
        })
    }
    setMessage({ content: "Removed " + personToRemove.name + " from the phonebook" })
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification />
      <FilterField
        filter={filter}
        handleFilterChange={handleFilterChange} />
      <h1>Add new</h1>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <ShowPersons
        persons={persons}
        filter={filter}
        removePerson={removePerson} />
    </div>
  )

}

export default App