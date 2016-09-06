import React, { Component } from 'react'
import { connect } from 'react-redux'

import CircularProgress from 'material-ui/CircularProgress'

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
      <div>
        <p>参加者の登録を待っています。(現在の参加者:{joined}人)</p>
        <p>この画面のまましばらくお待ちください。</p>
        <div style={{textAlign: "center"}}>
          <CircularProgress />
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Waiting)
