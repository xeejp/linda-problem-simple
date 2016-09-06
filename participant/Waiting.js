import React, { Component } from 'react'
import { connect } from 'react-redux'

import CircularProgress from 'material-ui/CircularProgress'

const mapStateToProps = ({join_experiment}) => ({
  join_experiment
})

class Waiting extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  componentDidMount() {
  }

  render() {
    const { join_experiment } = this.props
    return (
      <div>
        <p>参加者の登録を待っています。(現在の参加者:{join_experiment}人)</p>
        <p>この画面のまましばらくお待ちください。</p>
        <div style={{textAlign: "center"}}>
          <CircularProgress />
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Waiting)
