// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setRandomVariable } from '../redux/actions/ui'

const mapStateToProps = state => {
  return {
    ui: state.ui
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setRandomVariable: value => dispatch(setRandomVariable(value))
  }
}

type Props = {
  ui: Object,
  setRandomVariable: boolean => void
}

type State = {}

class MainView extends Component<Props, State> {
  render() {
    const { ui, setRandomVariable } = this.props
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
          margin: 0,
          padding: 0,
          backgroundColor: 'lightGray'
        }}
      >
        <div className="profile">
          <div className="profile__imagewrapper">
            <img src="/img/profile.png" className="profile__image" />
            <a href="#" className="profile__imageupload" />
          </div>
        </div>
        <div
          style={{
            flex: 1,
            marginTop: 200,
            backgroundColor: 'darkBlue'
          }}
        >
          <div style={{ color: 'yellow' }}>Løkka deTrashers</div>
          <div>26 medlemmer</div>
        </div>
      </div>
    )
  }
}

export default (connect: any)(mapStateToProps, mapDispatchToProps)(MainView)
