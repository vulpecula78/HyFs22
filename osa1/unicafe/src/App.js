import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick  = {handleClick}>
    {text}
  </button>  
)

const Statistics = (props) => {
  const all = (props.good + props.neutral + props.bad)
  return (
    <div>
      <h1>statistics</h1>
      <p>
        good {props.good}  <br />
        neutral {props.neutral} <br />
        bad {props.bad} <br />
        all {all} <br />
        average {(props.good + props.bad*-1)/all} <br />
        positive {props.good / all * 100} % <br />
      </p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const handleGoodClick = () => (
    setGood(good + 1)
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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App;
