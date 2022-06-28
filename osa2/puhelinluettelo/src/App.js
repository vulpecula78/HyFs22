import { useState } from 'react'

const Person = ( {person} ) => {
	return (
	<div>
	  {person.name}
	</div>
)}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  
  const addNewName = (event) => {
	  setNewName(event.target.value)
	  console.log(event.target)
  }
  
  const addName = (event) => {
	  event.preventDefault()
	  const nameObject = {
	  name: newName
	  }
	  
	  setPersons(persons.concat(nameObject))
	  setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input onChange={addNewName} />
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

