const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  );
}

const Part = (props) => {
  const { parts } = props;
  return (
    <>
      {parts.map(part => {
        return <p key={part.name}>{part.name} {part.exercises}</p>
      })}
    </>
  )
}

const Content = (props) => {
  const { parts } = props;
  return (
    <>
      <Part parts={parts} />
    </>
  )
}

const Total = (props) => {
  const { exercises } = props;
  <p>Number of exercises {exercises[0].exercises + exercises[1].exercises + exercises[2].exercises}</p>
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content
        parts={course.parts}
      />
      <Total
        exercises={course.parts}
      />
    </div>
  )
}

export default App