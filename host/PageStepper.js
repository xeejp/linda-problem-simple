import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Step, Stepper, StepButton} from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'

import { changePage } from './actions'
import { getPage } from '../util/index'

import { ReadJSON, LineBreak } from '../util/ReadJSON'

const pages = ["waiting", "description", "experiment", "result"]

const mapStateToProps = ({page, joined, answered}) => ({
  page,
  joined,
  answered,
})

class PageStepper extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  nextPage() {
    const { page } = this.props
    switch (page) {
      case "waiting":
        this.changePage("description")
        break
      case "description":
        this.changePage("experiment")
        break
      case "experiment":
        this.changePage("result")
        break
      case "result":
        this.changePage("waiting")
        break
    } 
  }

  backPage() {
    const { page } = this.props
    switch (page) {
      case "waiting":
        this.changePage("result")
        break
      case "description":
        this.changePage("waiting")
        break
      case "experiment":
        this.changePage("description")
        break
      case "result":
        this.changePage("experiment")
        break
    } 
  }

  changePage(page) {
    const { dispatch } = this.props
    dispatch(changePage(page))
  }

  finishExperiment() {
    this.changePage("result")
  }

  render() {
    const { page, joined, answered } = this.props
    const multi_text = ReadJSON().static_text

    if (page == "experiment" && joined == answered) {
      this.finishExperiment()
    }
    const steps = []
    for (let i = 0; i < pages.length; i++) {
      steps[i] = (
        <Step key={i}>
          <StepButton onTouchTap={this.changePage.bind(this, pages[i])}>
            {getPage(pages[i])}
          </StepButton>
        </Step>
      )
    }
    return (
      <div>
        <Stepper activeStep={pages.indexOf(page)} linear={false}>
          {steps}
        </Stepper>
        <RaisedButton 
          label={multi_text["page_stepper_text"][0]}
          style={{marginLeft: '3%'}}
          disabled={pages.indexOf(page) == 0}
          onClick={this.backPage.bind(this)}
        />
        <RaisedButton
          label={multi_text["page_stepper_text"][1]} 
          style={{marginLeft: '3%'}}
          primary={true} 
          disabled={pages.indexOf(page) == pages.length-1}
          onClick={this.nextPage.bind(this)} 
        />
      </div>
    )
  }
}

export default connect(mapStateToProps)(PageStepper)
