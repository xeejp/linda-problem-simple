import React, { Component } from 'react'
import { connect } from 'react-redux'

import QuestionText from './QuestionText'
import QuestionAnswers from './QuestionAnswers'

const mapStateToProps = ({}) => ({
})

class Question extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  componentDidMount() {
  }

  render() {
    return <div>
      <QuestionText />
      <QuestionAnswers />
    </div>
  }
}

export default connect()(Question)
