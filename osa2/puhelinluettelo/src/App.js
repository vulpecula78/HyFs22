import { useState } from 'react'

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

const AddName = (props) => {
  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: props.newName,
      number: props.newNumber
    }

    if (props.persons.find(( {name} ) =>
      name === props.newName)) {
        alert(`${props.newName} already added to phonebook`)
      } else {
        props.setPersons(props.persons.concat(nameObject))
        props.setNewName('')
        props.setNewNumber('')
      }
  }
  return (
    <div>
      <form onSubmit={addName}>      
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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123 1234' },
    { name: 'Konrad Zuse', number: '+44 50 554 3444' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  
  const addNewName = (event) => {
    setNewName(event.target.value)
    console.log(event.target)
  }

  const addNewNumber = (event) => {
    setNewNumber(event.target.value)
    console.log(newNumber)
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
        setPersons(persons.concat(nameObject))
        setNewName('')
        setNewNumber('')
      }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} addFilterName={addFilterName} />
      <h2>add a new</h2>
      <AddName newName={newName} addNewName={addNewName} newNumber={newNumber}
        addNewNumber={addNewNumber} persons={persons} setPersons={setPersons}
        setNewName={setNewName} />
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
      <Person persons={persons} filterName={filterName} />
    </div>
  )
}

export default App

