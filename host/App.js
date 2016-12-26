import React, { Component } from 'react'
import { connect } from 'react-redux'

import Divider from 'material-ui/Divider'

import { fetchContents } from './actions'

import PageStepper from './PageStepper'
import Users from './Users'
import Config from './Config'
import EditQuestion from './EditQuestion'
import DownloadButton from './DownloadButton'
import Chart from './Chart'

import { ReadJSON, LineBreak } from '../util/ReadJSON'

const mapStateToProps = ({ users, text, page }) => ({
  users, text, page
})

class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchContents())
  }

  render() {
    const { users, text, page } = this.props
    const multi_text = ReadJSON().static_text
    return (
      <div>
        <PageStepper />
        <Divider
          style={{
            marginTop: '5%',
            marginBottom: '5%',
          }}
        />
        <Users /><br />
        <Chart /><br />
        <Config />
        <EditQuestion style={{marginLeft: '2%'}} />
        <DownloadButton
          fileName={"linda_problem_simple.csv"}
          list={[
            [multi_text["download_text"][0]]
            [multi_text["download_text"][1], new Date()],
            [multi_text["download_text"][2], Object.keys(users).length],
            ["ID", multi_text["download_text"][3]],
          ].concat(
            Object.keys(users).map(id => [id, (users[id].status == 'a')? text.answeres[0] : (users[id].status == 'b')? text.answeres[1] : (users[id].status == 'each')? text.answers[2] : multi_text["download_text"][4]])
          )}
          style={{marginLeft: '2%'}}
          disabled={page != "result"}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps)(App)
