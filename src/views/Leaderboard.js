import React, { Component } from 'react'

const leaderboard = [
  {
    id: 1,
    name: 'Bøler søppelfotball',
    score: '412 855 021'
  },
  {
    id: 2,
    name: 'Hølaløkka løkkesøppel',
    score: '112 384 821'
  },
  {
    id: 3,
    name: 'Svartdalens svarte riddere',
    score: '72 483 812'
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
              <span className="leaderboard__id">{l.id}</span>
              <div>
                <span className="leaderboard__name">{l.name}</span>
                <span className="leaderboard__score">{l.score}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    )
  }
}
