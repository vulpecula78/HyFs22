import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick  = {handleClick}>
    {text}
  </button>  
)

const StatisticLine = ({text, val}) => {
  return (
      <tr>
        <td>{text}</td>
        <td>{val}</td>
      </tr>
  )
}

const Statistics = (props) => {
  const all = (props.good + props.neutral + props.bad)

  if (all === 0) {
    return (
      <div>
        <h1>statistics</h1>
        No feedback given.
      </div>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text='good' val={props.good} />
          <StatisticLine text='neutral' val={props.neutral} />
          <StatisticLine text='bad' val={props.bad} />
          <StatisticLine text='all' val={all} />
          <StatisticLine text='average' val={(props.good + props.bad * -1)/all} />
          <StatisticLine text='positive' val={props.good / all * 100 + '%'} />
        </tbody>
      </table>
  </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <div>
      <h1>Give feedback</h1>
      <div>
        <Button handleClick={() => setGood(good + 1)} text='good' />
        <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
        <Button handleClick={() => setBad(bad + 1)} text='bad' />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App;
