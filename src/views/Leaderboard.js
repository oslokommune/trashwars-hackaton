import React, { Component } from 'react'

const leaderboard = [
  {
    id: 1,
    name: 'Bøler søppelfotball',
    score: '412 855 000'
  },
  {
    id: 2,
    name: 'Hølaløkka løkkesøppel',
    score: '112 384 400'
  },
  {
    id: 3,
    name: 'Svartdalens svarte riddere',
    score: '72 483 800'
  },
  {
    id: 4,
    name: 'Au Pairs de Holmenkollen',
    score: '48 140 300'
  },
  {
    id: 5,
    name: 'Lille Tøyen søppelklubb',
    score: '42 552 800'
  },
  {
    id: 6,
    name: 'Løkka deTrashers',
    score: '31 257 900',
    active: true
  },
  {
    id: 7,
    name: 'Ernst & Young',
    score: '28 899 000'
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
            <li
              className={
                'leaderboard__element' +
                (l.active ? ' leaderboard__element--active' : '')
              }
              key={l.id}
            >
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
