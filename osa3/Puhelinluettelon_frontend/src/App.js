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
  const [message, setMessage] = useState(null)
  const [errorMesg, setErrorMesg] = useState(false)
  
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

  const timer = () => {
    setTimeout(() => {
      setMessage(null)
      setErrorMesg(false)
    }, 4000)
  }

  const Notification = ( {message} ) => {
    if (message === null) {
      return null
    }

    if (errorMesg) {
      return (
        <div className='error'>
          {message}
        </div>
      )
    } else {
    return (
      <div className='message'>
        {message}
      </div>
    )}
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
              setMessage(`Number updated for ${person.name}`)
              timer()
            })
            .catch(error => {
              setErrorMesg(true)
              setMessage(`Information of ${person.name} has already been removed from server!`)
              setPersons(persons.filter(listed => listed.id !== person.id))
              timer()
            })
        }
      } else {
        personService
          .addPerson(nameObject)
          .then(addedPerson => {
            setPersons(persons.concat(addedPerson))
            setNewName('')
            setNewNumber('')
            setMessage(`Added ${newName}`)
            timer()
        })
        .catch(error => {
          setErrorMesg(true)
          setMessage(`Failed to  add ${newName}!`)
          setPersons(persons.filter(listed => listed.name !== newName))
        })
        timer()
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
          setMessage(`${name} deleted`)
          timer()
        })
        .catch(error => {
          setErrorMesg(true)
          setMessage(`the person '${name}' was already deleted`)
          timer()
        })
    } else {
      console.log('Cancel')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
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
