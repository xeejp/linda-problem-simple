import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchContents } from './actions'

import Waiting from './Waiting'
import Description from './Description'
import Question from './Question'
import Result from './Result'

import { ReadJSON, LineBreak } from '../util/ReadJSON'

const mapStateToProps = ({page, status}) => ({
  page,
  status,
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
    const { page, status } = this.props
    const multi_text = ReadJSON().static_text

    return (
      <div>
        { (status != "noactive" || page == "result")
          ? <div>
              { (page == "waiting") ? <Waiting /> : null }
              { (page == "description") ? <Description /> : null }
              { (page == "experiment") ? <Question /> : null }
              { (page == "result") ? <Result /> : null }
            </div>
          : <div>
              <p>{LineBreak(multi_text["end"])}</p>
            </div>
          
        }
      </div>
    )
  }
}

export default connect(mapStateToProps)(App)
