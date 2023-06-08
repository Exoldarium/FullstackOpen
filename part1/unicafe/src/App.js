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

  const keys = Object.keys(obj);
  const empty = obj.good === 0 && obj.neutral === 0 && obj.bad === 0;
  const showStatistics = keys.map(text => {
    return (
      <Statistics text={text} obj={obj} key={text} />
    )
  });

  function handleClick(e) {
    if (e.target) {
      obj[e.target.name] += 1;
    }
    setGood(obj.good);
    setNeutral(obj.neutral);
    setBad(obj.bad);
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button obj={obj} handleClick={handleClick} />
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