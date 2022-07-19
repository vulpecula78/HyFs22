import { useState, useEffect } from 'react'
import personService from './services/persons'

const RenderPerson = ( {person, deleteName} ) => {
  return (
    <div>
      {person.name} {person.number} &nbsp;
      <button onClick={() =>
        deleteName(person.id, person.name)}>delete</button>
    </div>
  )
}

const Filter = ( {filterName, addFilterName} ) => {
  return (
    <div>
      <form>
        filter shown with <input value={filterName} onChange={addFilterName} />
      </form>
    </div>
  )
}

const Person = ( {persons, filterName, deleteName} ) => {
  return (
    persons.filter(nameFilter => 
    nameFilter.name.toLowerCase().includes(filterName.toLowerCase()))
    .map(person => <RenderPerson key={person.name} person={person} deleteName={deleteName} />)
  )
}

const PersonForm = (props) => {
  return (
    <div>
      <form onSubmit={props.addName}>
        <div>
          name: <input value={props.newName} onChange={props.addNewName} />
        </div>
        <div>
          number: <input value={props.newNumber} onChange={props.addNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addNewName = (event) => {
    setNewName(event.target.value)
  }

  const addNewNumber = (event) => {
    setNewNumber(event.target.value)
  }
  
  const addFilterName = (event) => {
    setFilterName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }

    if (persons.find(( {name} ) =>
      name === newName)) {
        if(window.confirm(`${newName} already added to phonebook, replace old number?`)) {
          console.log('replace number')
          const person = persons.find(person => person.name === newName)
          const changePerson = { ...person, number: newNumber }
          personService
            .update(changePerson, person.id)
            .then(changedPerson => {
              setPersons(persons.map(listedPerson =>
                listedPerson.id !== person.id ? listedPerson : changedPerson
              ))
              setNewName('')
              setNewNumber('')
              console.log(changedPerson)
          })
        }
      } else {
        personService
          .addPerson(nameObject)
          .then(addedPerson => {
            setPersons(persons.concat(addedPerson))
            setNewName('')
            setNewNumber('')
        })
      }
  }

  const deleteName = (id, name) => {
    console.log('Delete name with id ' + id)
    if (window.confirm(`Really delete ${name}`)) {
      personService
        .deletePerson(id)
        .then(response => {
          console.log(response)
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          console.log(`the person '${name}' was already deleted`)
        })
    } else {
      console.log('Cancel')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} addFilterName={addFilterName} />
      <h2>add a new</h2>
      <PersonForm addName={addName}
        newName={newName} addNewName={addNewName}
        newNumber={newNumber} addNewNumber={addNewNumber}
        />
      <h2>Numbers</h2>
      <Person persons={persons} filterName={filterName} deleteName={deleteName} />
    </div>
  )
}

export default App

