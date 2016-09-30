import React, { Component } from 'react'
import { connect } from 'react-redux'
import reactCSS from 'reactcss'
import throttle from 'react-throttle-render'

import { Card, CardHeader, CardText } from 'material-ui/Card'

const mapStateToProps = ({page, users, text, joined, answered, red_description}) => ({
  page,
  users,
  text,
  joined, 
  answered, 
  red_description,
})

function createHeaderInfoStr(page, joined, answered, red_description) {
  switch (page) {
    case "description":
      return "("+red_description+"人が説明を読み終えました)"
    case "experiment":
      return "("+answered+"人が回答を済ませました)"
    default:
      return ""
  }
}

function createUserStatuStr(user, page, text) {
  const style = reactCSS({
    'default': {
      selected: {
        color: '#000000',
      },
      nonselect: {
        color: '#DCDCDC',
      }
    }
  })

  switch (page) {
    case "description":
      return (
        <span>
          {
            user.is_red_description
            ? <span style={ style.selected }>既読</span>
            : <span style={ style.nonselect }>既読</span>
          }
          <span>・</span>
          {
            !user.is_red_description
            ? <span style={ style.selected }>未読</span>
            : <span style={ style.nonselect }>未読</span>
          }
        </span>
      )
    case "experiment": case "result":
      return (
        <span>
          {
            user.status == "a"
            ? <span style={ style.selected }>{text.answers[0]}</span>
            : <span style={ style.nonselect }>{text.answers[0]}</span>
          }
          <span>・</span>
          {
            user.status == "b"
            ? <span style={ style.selected }>{text.answers[1]}</span>
            : <span style={ style.nonselect }>{text.answers[1]}</span>
          }
          <span>・</span>
          {
            user.status == "each"
            ? <span style={ style.selected }>{text.answers[2]}</span>
            : <span style={ style.nonselect }>{text.answers[2]}</span>
          }
        </span>
      )
    default:
      return <span>-</span>
  }
}

const User = ({ id, user, page, text }) => (
  <tr>
    <td>{id}</td>
    <td>{createUserStatuStr(user, page, text)}</td>
  </tr>
)

class Users extends Component {
  render() {
    const {users, page, text, joined, answered, red_description} = this.props

    return (
      <Card>
        <CardHeader
          title={"登録者 "+joined + "人 "+createHeaderInfoStr(page, joined, answered, red_description)}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>状態</th>
              </tr>
            </thead>
            <tbody>
              {
                Object.keys(users).map(id => (
                  users[id].status != "noactive"
                    ? <User
                      key={id}
                      id={id}
                      user={users[id]}
                      page={page}
                      text={text}
                    />
                    : null
                )).reverse()
              }
            </tbody>
          </table>
        </CardText>
      </Card>
    )
  }
}

export default connect(mapStateToProps)(throttle(Users, 200))
