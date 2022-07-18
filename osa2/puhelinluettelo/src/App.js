import { useState, useEffect } from 'react'
import axios from'axios'

const RenderPerson = ( {person} ) => {
  return (
    <div>
      {person.name} {person.number}
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

const Person = ( {persons, filterName} ) => {
  return (
    persons.filter(nameFilter => 
    nameFilter.name.toLowerCase().includes(filterName.toLowerCase()))
    .map(person => <RenderPerson key={person.name} person={person} />)
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
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
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
        alert(`${newName} already added to phonebook`)
      } else {
        axios
          .post('http://localhost:3001/persons', nameObject)
          .then(response => {
            console.log('Adding new person')
            setPersons(persons.concat(nameObject))
            setNewName('')
            setNewNumber('')
        })
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
      <Person persons={persons} filterName={filterName} />
    </div>
  )
}

export default App

