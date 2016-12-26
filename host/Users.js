import React, { Component } from 'react'
import { connect } from 'react-redux'
import reactCSS from 'reactcss'
import throttle from 'react-throttle-render'

import { bindActionCreators } from 'redux'
import { openParticipantPage } from './actions'

import { Card, CardHeader, CardText } from 'material-ui/Card'

import { ReadJSON, LineBreak } from '../util/ReadJSON'

const mapStateToProps = ({page, users, text, joined, answered, red_description}) => ({
  page,
  users,
  text,
  joined, 
  answered, 
  red_description,
})

const multi_text = ReadJSON().static_text

function createHeaderInfoStr(page, joined, answered, red_description) {
  switch (page) {
    case "description":
      return "("+red_description+multi_text["users_text"][0]
    case "experiment":
      return "("+answered+multi_text["users_text"][1]
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
            ? <span style={ style.selected }>{multi_text["users_text"][2]}</span>
            : <span style={ style.nonselect }>{multi_text["users_text"][2]}</span>
          }
          <span>{multi_text["users_text"][3]}</span>
          {
            !user.is_red_description
            ? <span style={ style.selected }>{multi_text["users_text"][4]}</span>
            : <span style={ style.nonselect }>{multi_text["users_text"][4]}</span>
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
          <span>{multi_text["users_text"][3]}</span>
          {
            user.status == "b"
            ? <span style={ style.selected }>{text.answers[1]}</span>
            : <span style={ style.nonselect }>{text.answers[1]}</span>
          }
          <span>{multi_text["users_text"][3]}</span>
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

const User = ({ id, user, page, text, openParticipantPage }) => (
  <tr>
    <td><a onClick={openParticipantPage(id)}>{id}</a></td>
    <td>{createUserStatuStr(user, page, text)}</td>
  </tr>
)

const mapDispatchToProps = (dispatch) => {
  const open = bindActionCreators(openParticipantPage, dispatch)
  return {
    openParticipantPage: (id) => () => open(id)
  }
}

class Users extends Component {
  render() {
    const {users, page, text, joined, answered, red_description, openParticipantPage} = this.props

    return (
      <Card>
        <CardHeader
          title={multi_text["users_text"][5]+joined +multi_text["users_text"][6]+createHeaderInfoStr(page, joined, answered, red_description)}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>{multi_text["users_text"][7]}</th>
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
                      openParticipantPage={openParticipantPage}
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

export default connect(mapStateToProps, mapDispatchToProps)(throttle(Users, 200))
