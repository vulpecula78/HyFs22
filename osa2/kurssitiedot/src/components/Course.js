const Course = ( {course} ) => {
  const total = course.parts.reduce((s, p) => s + p.exercises, 0)
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={total} />	
    </div>
  )
}

const Header = ( {course} ) => <h2>{course}</h2>

const Total = ( {sum} ) => <p><b>Number of exercises {sum}</b></p>

const Part = ( {part} ) => {
  return (
    <div>
      <p>
        {part.name} {part.exercises}
      </p>
    </div>
  )
}

const Content = ( {parts} ) => {
  return (
    <div>
      {parts.map(part => 
        <Part key={part.id} part={part} />
      )}
    </div>
  )
}

export default Course
