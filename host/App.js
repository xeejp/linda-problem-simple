import React, { Component } from 'react'
import { connect } from 'react-redux'

import Divider from 'material-ui/Divider'

import { fetchContents } from './actions'

import PageStepper from './PageStepper'
import Users from './Users'
import EditQuestion from './EditQuestion'
import DownloadButton from './DownloadButton'
import Chart from './Chart'

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
        <EditQuestion />
        <DownloadButton
          fileName={"linda_problem_simple.csv"}
          list={[
            ["リンダ問題(簡易版)"],
            ["実験日", new Date()],
            ["登録者数", Object.keys(users).length],
            ["ID", "回答"],
          ].concat(
            Object.keys(users).map(id => [id, (users[id].status == 'a')? text.answeres[0] : (users[id].status == 'b')? text.answeres[1] : (users[id].status == 'each')? text.answers[2] : "未回答"])
          )}
          style={{marginLeft: '2%'}}
          disabled={page != "result"}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps)(App)
