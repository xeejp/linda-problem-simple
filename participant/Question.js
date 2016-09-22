import React, { Component } from 'react'
import { connect } from 'react-redux'

import QuestionText from './QuestionText'
import QuestionAnswers from './QuestionAnswers'

import { Card, CardText } from 'material-ui/Card'

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
    return <Card><CardText><div>
      <QuestionText />
      <QuestionAnswers />
    </div></CardText></Card>
  }
}

export default connect()(Question)
