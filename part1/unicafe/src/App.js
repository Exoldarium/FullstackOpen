import { useState } from 'react'

const Button = ({ handleClick }) => {
  return (
    <>
      <button onClick={handleClick} name="good">good</button>
      <button onClick={handleClick} name="neutral">neutral</button>
      <button onClick={handleClick} name="bad">bad</button>
    </>
  )
}

const Statistics = ({ obj, text }) => {
  return <StatisticsLine obj={obj} text={text} />
}

const StatisticsLine = ({ obj, text }) => {
  return (
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{obj[text]}</td>
      </tr>
    </tbody>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = (good / all) * 100;

  const obj = {
    good: good,
    neutral: neutral,
    bad: bad,
    all: all,
    average: average,
    positive: positive,
  };
  const copy = { ...obj };

  const keys = Object.keys(copy);
  const empty = copy.good === 0 && copy.neutral === 0 && copy.bad === 0;
  const showStatistics = keys.map(text => {
    return (
      <Statistics text={text} obj={copy} key={text} />
    )
  });

  function handleClick(e) {
    if (e.target) {
      copy[e.target.name] += 1;
    }
    setGood(copy.good);
    setNeutral(copy.neutral);
    setBad(copy.bad);
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button obj={copy} handleClick={handleClick} />
      <h1>statistics</h1>
      <table>
        {empty ?
          <tbody>
            <tr>
              <td>No feedback given</td>
            </tr>
          </tbody>
          : showStatistics}
      </table>
    </div>
  )
}

export default App;