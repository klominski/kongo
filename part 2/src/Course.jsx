import React from "react";

const Header = ({ course }) => {
    return (
        <h1>{course.name}</h1>
    );
};

const Part = ({ name, exercises }) => {
    return (
        <p>
        {name} {exercises}
        </p>
    );
};

const Content = ({ parts }) => {
    return (
        <div>
        {parts.map((part, index) => (
            <Part key={index} name={part.name} exercises={part.exercises} />
        ))}
        </div>
    );
};

const Total = ({ parts }) => {
    const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
    return (
        <p>Total {totalExercises} exercises</p>
    );
};

const Course = ({ course }) => {
    return (
        <div key={course.id}>
        <Header course={course} />
        <Content parts={course.parts} />
        <b><Total parts={course.parts} /></b>
        </div>
    );
};

export default Course;