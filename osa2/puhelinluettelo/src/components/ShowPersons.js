import React from 'react'

const ShowPersons = ({persons, filter, removePerson}) => {
    return (
      <div>
      {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map((person, i) =>
        <p key={person.name}>{person.name} {person.number} <button onClick={() => removePerson(person)}>delete</button></p>
        )}
        </div>
    )
  }

export default ShowPersons