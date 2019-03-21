import React, { Component } from 'react'

const leaderboard = [
  {
    id: 1,
    name: 'Bøler søppelfotball',
    score: 12855021
  },
  {
    id: 2,
    name: 'Hølaløkka løkkesøppel',
    score: 812384821
  },
  {
    id: 3,
    name: 'Svartdalens svarte riddere',
    score: 72483812
  }
]

export default class Leaderboard extends Component {
  render() {
    return (
      <div className="leaderboard">
        <ul className="leaderboard__nav">
          <li className="leaderboard__navelement leaderboard__navelement--active">
            Oslo
          </li>
          <li className="leaderboard__navelement">Grünerløkka</li>
          <li className="leaderboard__navelement">Klan</li>
        </ul>

        <ol className="leaderboard__list">
          {leaderboard.map(l => (
            <li className="leaderboard__element" key={l.id}>
              {l.name}
            </li>
          ))}
        </ol>
      </div>
    )
  }
}
