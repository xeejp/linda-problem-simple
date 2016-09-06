import React, { Component } from 'react'
import { connect } from 'react-redux'

const mapStateToProps = ({text}) => ({
  text
})

class QuestionText extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  componentDidMount() {
  }

  render() {
    const { text } = this.props
    return <div>
      {text.question.split('\n').map( line => <p key={line}>{line}</p>)}
    </div>
  }
}

export default connect(mapStateToProps)(QuestionText)
