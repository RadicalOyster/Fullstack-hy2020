import React from 'react'

const Course = ({course}) => {
    return (
        <div>
            <Header course={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>
    )
}

const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

const Content = ({parts}) => {
    return (
        <div>
            {parts.map((part, i) => <Part key={i} part={part}></Part>)}
        </div>
    )
}

const Total = ({parts}) => {
    let sum = parts.reduce(function(sum, part) {
        return sum + part.exercises
    }, 0)

    return (
        <p>
            <b>total of {sum} exercises</b>
        </p>
    )
}

const Part = ({part}) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

export default Course