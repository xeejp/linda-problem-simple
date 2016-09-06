import React, { Component } from 'react'
import { connect } from 'react-redux'
import reactCSS from 'reactcss'

import { Card, CardHeader, CardText } from 'material-ui/Card'

const mapStateToProps = ({page, users, text}) => ({
  page,
  users,
  text,
})

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
            user.is_finish_description
            ? <span style={ style.selected }>既読</span>
            : <span style={ style.nonselect }>既読</span>
          }
          <span>・</span>
          {
            !user.is_finish_description
            ? <span style={ style.selected }>未読</span>
            : <span style={ style.nonselect }>未読</span>
          }
        </span>
      )
    case "experiment":
      return (
        <span>
          {
            status == "programmer"
            ? <span style={ style.selected }>{text.answers[0]}</span>
            : <span style={ style.nonselect }>{text.answers[0]}</span>
          }
          <span>・</span>
          {
            status == "banker"
            ? <span style={ style.selected }>{text.answers[1]}</span>
            : <span style={ style.nonselect }>{text.answers[1]}</span>
          }
          <span>・</span>
          {
            status == "each"
            ? <span style={ style.selected }>{text.answers[2]}</span>
            : <span style={ style.nonselect }>{text.answers[2]}</span>
          }
        </span>
      )
    default:
      return null
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
    const {users, page, text} = this.props

    return (
      <Card 
        style={{marginBottom: "5%"}}
      >
        <CardHeader
          title={"登録者 " + Object.keys(users).length + "人"}
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

export default connect(mapStateToProps)(Users)
