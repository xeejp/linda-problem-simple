import React, { Component } from 'react'
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton'
import SwipeableViews from 'react-swipeable-views'
import {Card, CardHeader, CardText} from 'material-ui/Card'
import CircularProgress from 'material-ui/CircularProgress'

import { finishDescription } from './actions'

import { ReadJSON, LineBreak } from '../util/ReadJSON'

const multi_text = ReadJSON().static_text

const mapStateToProps = ({text}) => ({
  text
})

class Description extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      slideIndex: 0,
    }
  }

  handleSlideIndex(value) {
    this.setState({
      slideIndex: value,
    })
  }

  handleNext() {
    this.setState({
      slideIndex: this.state.slideIndex + 1,
    })
  }

  handleBack() {
    this.setState({
      slideIndex: this.state.slideIndex - 1,
    })
  }

  componentWillMount() {
  }

  render() {
    const { text } = this.props
    if (this.state.slideIndex == this.props.text.descriptions.length) {
      const { dispatch } = this.props
      dispatch(finishDescription())
    }
    let desc = [<div key={-1}>
              <CardHeader
                title={multi_text["description_text"]["title"]}
                subtitle={multi_text["description_text"]["subtitle"] + (text.descriptions.length+1)+"/"+(text.descriptions.length+1)}
              />
              <CardText expandable={false}>
                <p>{multi_text["description_text"]["card_text"]}</p>
                <div style={{textAlign: "center"}}>
                  <CircularProgress />
                </div>
              </CardText>
            </div>]
    return (
      <div>
        <Card style={{marginBottom: "5%"}}>
          <SwipeableViews
            index={this.state.slideIndex}
            onChangeIndex={this.handleSlideIndex.bind(this)}
          >
            {
              text.descriptions.map((description, index) => (
                <div key={index}>
                  <CardHeader
                    title={multi_text["description_text"]["title"]}
                    subtitle={multi_text["description_text"]["subtitle"] + (index+1) + "/" + (text.descriptions.length+1)}
                  />
                  <CardText expandable={false}>
                    {description.text.split('\n').map( line => <p key={line}>{line}</p>)}
                  </CardText>
                </div>
              )).concat(desc)
            }
          </SwipeableViews>
        </Card>
        <RaisedButton 
          label={multi_text["description_text"]["back"]} 
          style={{float: "left"}} 
          onTouchTap={this.handleBack.bind(this)}
          disabled={this.state.slideIndex == 0}
        />
        <RaisedButton
          label={multi_text["description_text"]["next"]} 
          style={{float: "right"}} 
          onTouchTap={this.handleNext.bind(this)}
          primary={true} 
          disabled={this.state.slideIndex == text.descriptions.length}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps)(Description)
