import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changePage } from './actions'

const mapStateToProps = ({users, page, ans_programmer, ans_banker, ans_each, join_experiment}) => ({
  users,
  page,
  ans_programmer, 
  ans_banker, 
  ans_each, 
  join_experiment
})

class Participants extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  render() {
    const {
      users,
      page,
      ans_programmer, 
      ans_banker, 
      ans_each, 
      join_experiment
    } = this.props
    if (page == "experiment" && join_experiment == (ans_programmer + ans_banker + ans_each)) {
      console.log("finished")
      const { dispatch } = this.props
      dispatch(changePage("result"))
    }
    return (
      <div>
        {
          page == "waiting"
          ? <p>現在{Object.keys(users).length}人参加しています。</p>
          : page == "experiment"
            ? <p>現在{join_experiment}人中{ans_programmer+ans_banker+ans_each}人が回答を済ませました</p>
            : null
        }
      </div>
    )
  }
}

export default connect(mapStateToProps)(Participants)
