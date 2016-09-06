import React, { Component } from 'react'
import { connect } from 'react-redux'

import Highcharts from 'react-highcharts'

const mapStateToProps = ({ans_programmer, ans_banker, ans_each}) => ({
  ans_programmer,
  ans_banker,
  ans_each,
})

class App extends Component {
  render() {
    const { ans_programmer, ans_banker, ans_each } = this.props

    return (
      <Highcharts 
        config={{
          chart: {
            type: 'column',
            inverted: false
          },
          title: {
            text: '実験結果'
          },
          xAxis: {
            type: 'category',
          },
          yAxis: {
            min: 0,
            allowDecimals: false,
            title: {
              text: '人数'
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
            name: '人数',
            data: [
              ['プログラマ', ans_programmer],
              ['銀行員', ans_banker],
              ['プログラマで環境保護活動家', ans_each]
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
    )
  }
}

export default connect(mapStateToProps)(App)
