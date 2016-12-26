import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, CardText, CardTitle } from 'material-ui/Card'
import CircularProgress from 'material-ui/CircularProgress'

import { ReadJSON, LineBreak } from '../util/ReadJSON'

const multi_text = ReadJSON().static_text

const mapStateToProps = ({joined}) => ({
  joined
})

class Waiting extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  componentDidMount() {
  }

  render() {
    const { joined } = this.props
    return (
      <Card>
        <CardTitle title={multi_text["waiting_text"]["title"]} subtitle={multi_text["waiting_text"]["subtitle"]} />
          <CardText>
            <p>{multi_text["waiting_text"]["text"][0]}</p>
            <p>{multi_text["waiting_text"]["text"][1]}</p>
            <p>{multi_text["waiting_text"]["text"][2]}{joined}{multi_text["waiting_text"]["text"][3]}</p>
          </CardText>
          <div style={{textAlign: "center"}}>
          <CircularProgress size={2}/>
        </div>
      </Card>
    )
  }
}

export default connect(mapStateToProps)(Waiting)
