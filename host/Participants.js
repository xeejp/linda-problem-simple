import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changePage } from './actions'

const mapStateToProps = ({users, page, ans_a, ans_b, ans_each, joined}) => ({
  users,
  page,
  ans_a, 
  ans_b, 
  ans_each, 
  joined
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
      ans_a, 
      ans_b, 
      ans_each, 
      joined
    } = this.props
    if (page == "experiment" && joined == (ans_a + ans_b + ans_each)) {
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
            ? <p>現在{joined}人中{ans_a+ans_b+ans_each}人が回答を済ませました</p>
            : null
        }
      </div>
    )
  }
}

export default connect(mapStateToProps)(Participants)
