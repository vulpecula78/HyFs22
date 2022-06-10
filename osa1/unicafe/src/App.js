import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick  = {handleClick}>
	{text}
  </button>  
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  
  const handleGoodClick = () => (
    setGood(good + 1)
    setAll(all + 1)
  )
  
  const handleNeutralClick = () => (
    setNeutral(neutral + 1)
  )

  const handleBadClick = () => (
    setBad(bad + 1)
  )
  
  return (
    <div>
	  <h1>Give feedback</h1>
	  <div>
		<Button handleClick={handleGoodClick} text='good' />
		<Button handleClick={handleNeutralClick} text='neutral' />
		<Button handleClick={handleBadClick} text='bad' />
	  </div>
      <h1>statistics</h1>
	  <p>
        good {good} <br />
		neutral {neutral} <br />
	    bad {bad} <br />
		all {all} <br />
	  </p>
    </div>
  )
}

export default App;
