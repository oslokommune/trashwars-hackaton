import React, { Component } from 'react';

const leaderboard = [
  {
    id: 1,
    name: 'Bøler søppelfotball',
    score: 12855021,
  },
  {
    id: 2,
    name: 'Hølaløkka løkkesøppel',
    score: 812384821,
  },
  {
    id: 3,
    name: 'Svartdalens svarte riddere',
    score: 72483812,
  },
];

export default class Leaderboard extends Component {
  render() {
    return (
      <ul>
        {leaderboard.map(l => (<li key={l.id}>{l.name}</li>))}
      </ul>
    );
  }
}
