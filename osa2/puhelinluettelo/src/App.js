import { useState } from 'react'

const Person = ( {person} ) => {
  return (
    <div>
      {person.name} {person.number}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123 1234' },
    { name: 'Konrad Zuse', number: '+44 50 554 3444' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  
  const addNewName = (event) => {
    setNewName(event.target.value)
    console.log(event.target)
  }

  const addNewNumber = (event) => {
    setNewNumber(event.target.value)
    console.log(newNumber)
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
        setPersons(persons.concat(nameObject))
        setNewName('')
        setNewNumber('')
      }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={addNewName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={addNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <Person key={person.name} person={person} />)}
    </div>
  )
}

export default App

