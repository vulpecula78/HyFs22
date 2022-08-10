const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())

morgan.token('body', function getBody (req) {
	return JSON.stringify(req.body)
})

app.use(express.static('build'))
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
	{
		id: 1,
		name: "Arto Hellas",
		number: "040-123456"
	},
	{
		id: 2,
		name: "Ada Lovelace",
		number: "39-44-5323523"
	},
	{
		id: 3,
		name: "Dan Abromov",
		number: "12-43-234345"
	},
	{
		id: 4,
		name: "Mary Poppendick",
		number: "39-23-6423122"
	}
]

app.get('/info', (req, res) => {
	const date = new Date
	res.send (`<p>Phonebook has info for ${persons.length} people.</p><p>${date}</p>`)
})

app.get('/api/persons', (req, res) => {
	res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id)
	const person = persons.find(person => person.id === id)
	
	if (person) {	
		res.json(person)
	} else {
		return res.status(404).end()
	}
})

app.delete('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id)
	persons = persons.filter(person => person.id !== id)
	res.status(204).end()
})

app.post('/api/persons', (req, res) => {
	const body = req.body
	console.log(body)

	if (!body.name) {
		return res.status(400).json(
			{ error: 'name missing' }
		)
	}

	if (persons.find(person => person.name === body.name)) {
		return res.status(400).json(
			{ error: 'name must be unique' }
		)
	}

	if (!body.number) {
		return res.status(400).json(
			{ error: 'number missing' }
		)
	}

	const person = {
		id: generateId(),
		name: body.name,
		number: body.number
	}

	persons = persons.concat(person)
	res.json(person)
})

const generateId = () => {
	return Math.floor(Math.random() * 50000)
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
