import React, { Component } from 'react'
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton'
import SwipeableViews from 'react-swipeable-views'
import {Card, CardHeader, CardText} from 'material-ui/Card'
import CircularProgress from 'material-ui/CircularProgress'

import { finishDescription } from './actions'

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
                    title="リンダ問題(簡易版)"
                    subtitle={"ルールの説明 " + (index+1) + "/" + (text.descriptions.length+1)}
                  />
                  <CardText expandable={false}>
                    {description.text.split('\n').map( line => <p key={line}>{line}</p>)}
                  </CardText>
                </div>
              ))
            }
            <div>
              <CardHeader
                title="リンダ問題(簡易版)"
                subtitle={"ルールの説明 " + (text.descriptions.length+1)+"/"+(text.descriptions.length+1)}
              />
              <CardText expandable={false}>
                <p>実験が開始されるまでしばらくお待ちください</p>
                <div style={{textAlign: "center"}}>
                  <CircularProgress />
                </div>
              </CardText>
            </div>
          </SwipeableViews>
        </Card>
        <RaisedButton 
          label="戻る" 
          style={{float: "left"}} 
          onTouchTap={this.handleBack.bind(this)}
          disabled={this.state.slideIndex == 0}
        />
        <RaisedButton
          label="進む" 
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
