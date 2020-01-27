import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const StatisticLine = ({ good, neutral, bad }) => {
    if (CountAll({ good, neutral, bad }) === 0) {
        return <div>No feedback given</div>
    }
    return <div>
        <table>
            <tbody>
                <tr>
                    <th align="left">Good: </th>
                    <th align="left">{good}</th>
                </tr>
                <tr>
                    <th align="left">Neutral: </th>
                    <th align="left">{neutral}</th>
                </tr>
                <tr>
                    <th align="left">Bad: </th>
                    <th align="left">{bad}</th>
                </tr>
                <tr>
                    <th align="left">All: </th>
                    <th align="left"><CountAll good={good} neutral={neutral} bad={bad} /></th>
                </tr>
                <tr>
                    <th align="left">Average: </th>
                    <th align="left"><CalculateAverage good={good} neutral={neutral} bad={bad} /></th>
                </tr>
                <tr>
                    <th align="left">Positive: </th>
                    <th align="left"><CalculatePositivePercentage good={good} neutral={neutral} bad={bad} />%</th>
                </tr>
            </tbody>
        </table>
    </div>
}

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const CountAll = ({ good, neutral, bad }) => {
    return (
        good + neutral + bad
    )
}

const CalculateAverage = ({ good, neutral, bad }) => {
    return (
        (good - bad) / CountAll({ good, neutral, bad })
    )
}

const CalculatePositivePercentage = ({ good, neutral, bad }) => {
    return (
        good / CountAll({ good, neutral, bad }) * 100
    )
}



const App = (props) => {
    const increaseGood = () => setGood(good + 1)
    const increaseNeutral = () => setNeutral(neutral + 1)
    const increaseBad = () => setBad(bad + 1)
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h1>Give feedback</h1>
            <Button
                handleClick={increaseGood}
                text='Good'
            />
            <Button
                handleClick={increaseNeutral}
                text='Neutral'
            />
            <Button
                handleClick={increaseBad}
                text='bad'
            />
            <h1>Statistics</h1>
            <StatisticLine
                good={good}
                neutral={neutral}
                bad={bad} />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)