import React, { Component } from 'react'
import { connect } from 'react-redux'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import RaisedButton from 'material-ui/RaisedButton'
import LinearProgress from 'material-ui/LinearProgress';

import { submitAnswer } from './actions'

const mapStateToProps = ({status, ans_a, ans_b, ans_each, joined, text}) => ({
  status,
  ans_a,
  ans_b,
  ans_each,
  joined,
  text,
})

class QuestionAnswers extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {value: null}
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event, value) {
    this.setState({
      value
    })
  }

  handleClick() {
    const { dispatch } = this.props
    dispatch(submitAnswer(this.state.value))
  }

  render() {
    const { status, ans_a, ans_b, ans_each, joined, text } = this.props
    return (
      <div>
        <RadioButtonGroup 
          name="shipSpeed" 
          onChange={this.handleChange} 
          defaultSelected={status}
        >
          <RadioButton value="a" label={text.answers[0]} disabled={status!=null} />
          <RadioButton value="b" label={text.answers[1]} disabled={status!=null} />
          <RadioButton value="each" label={text.answers[2]} disabled={status!=null} />
        </RadioButtonGroup>

        {
          status != null
          ? <div>
            <RaisedButton label="送信" primary={true} disabled={true} onClick={this.handleClick.bind(this)} />
            <p>残り{joined - ans_a - ans_b - ans_each}名です。</p>
            <p>しばらくお待ちください</p>
            <LinearProgress mode="determinate" max={joined} value={ans_a+ans_b+ans_each} />
          </div>
          : this.state.value != null || status != null
            ? <div>
              <RaisedButton label="送信" primary={true} onClick={this.handleClick.bind(this)} />
              </div>
            : null
        }
      </div>
    )
  }
}

export default connect(mapStateToProps)(QuestionAnswers)
