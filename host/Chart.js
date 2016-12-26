import React, { Component } from 'react'
import { connect } from 'react-redux'
import throttle from 'react-throttle-render'

import Highcharts from 'react-highcharts'
import { Card, CardHeader, CardText } from 'material-ui/Card'

import { ReadJSON, LineBreak } from '../util/ReadJSON'

const mapStateToProps = ({text, ans_a, ans_b, ans_each}) => ({
  text,
  ans_a,
  ans_b,
  ans_each,
})

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: false,
    }
  }

  handleExpandChange(expanded) {
    this.setState({
      expanded: expanded,
    })
  }

  render() {
    const { text, ans_a, ans_b, ans_each } = this.props
    const multi_text = ReadJSON().static_text
    if(!text) return null
    return (
      <Card
        expanded={this.state.expanded}
        onExpandChange={this.handleExpandChange.bind(this)}
      >
        <CardHeader
          title={multi_text["chart_text"][0]}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
        <Highcharts 
          config={{
            chart: {
              type: 'column',
              inverted: false
            },
            title: {
              text: multi_text["chart_text"][0]
            },
            xAxis: {
              type: 'category',
            },
            yAxis: {
              min: 0,
              allowDecimals: false,
              title: {
                text: multi_text["chart_text"][1]
              }
            },
            credits: {
              enabled: false
            },
            legend: {
              enabled: false
            },
            tooltip: {
              enabled: false
            },
            series: [{
              name: multi_text["chart_text"][1],
              data: [
                [text.answers[0], ans_a],
                [text.answers[1], ans_b],
                [text.answers[2], ans_each]
              ],
              dataLabels: {
                enabled: true,
                color: '#000',
                align: 'center',
                format: '{point.y}',
              }
            }]
          }} 
        />
      </CardText>
    </Card>
    )
  }
}

export default connect(mapStateToProps)(throttle(App, 200))
