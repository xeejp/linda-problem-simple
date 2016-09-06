import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchContents } from './actions'

import Chart from './Chart'

const mapStateToProps = ({page}) => ({
})

class Result extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  componentDidMount() {
  }

  render() {
    const { page } = this.props
    return (
      <div>
        <Chart />
      </div>
    )
  }
}

export default connect(mapStateToProps)(Result)
