import React, { Component } from 'react'
import { connect } from 'react-redux'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import RaisedButton from 'material-ui/RaisedButton'
import LinearProgress from 'material-ui/LinearProgress';

import { submitAnswer } from './actions'

import { ReadJSON, LineBreak } from '../util/ReadJSON'

const multi_text = ReadJSON().static_text

const mapStateToProps = ({status, answered, joined, text}) => ({
  status,
  joined,
  answered,
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
    const { status, answered, joined, text } = this.props

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
        </RadioButtonGroup><br />

        {
          status != null
          ? <div>
            <RaisedButton label={multi_text["question_answers_text"]["send"]} primary={true} disabled={true} onClick={this.handleClick.bind(this)} />
            <p>{multi_text["question_answers_text"]["number"][0]}{joined - answered}{multi_text["question_answers_text"]["number"][1]}</p>
            <p>{multi_text["question_answers_text"]["number"][2]}</p>
            <LinearProgress mode="determinate" max={joined} value={answered} />
          </div>
          : this.state.value != null || status != null
            ? <div>
              <RaisedButton label={multi_text["question_answers_text"]["send"]} primary={true} onClick={this.handleClick.bind(this)} />
              </div>
            : null
        }
      </div>
    )
  }
}

export default connect(mapStateToProps)(QuestionAnswers)
