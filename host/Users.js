import React, { Component } from 'react'
import { connect } from 'react-redux'
import reactCSS from 'reactcss'

import { Card, CardHeader, CardText } from 'material-ui/Card'


function createUserStatuStr(status) {
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

  return (
    <span>
      {
        status == "programmer"
        ? <span style={ style.selected }>プログラマ</span>
        : <span style={ style.nonselect }>プログラマ</span>
      }
      <span>・</span>
      {
        status == "banker"
        ? <span style={ style.selected }>銀行員</span>
        : <span style={ style.nonselect }>銀行員</span>
      }
      <span>・</span>
      {
        status == "each"
        ? <span style={ style.selected }>プログラマで環境保護活動家</span>
        : <span style={ style.nonselect }>プログラマで環境保護活動家</span>
      }
    </span>
  )
}

const User = ({ id, status }) => (
  <tr>
    <td>{id}</td>
    <td>{createUserStatuStr(status)}</td>
  </tr>
)

const mapStateToProps = ({users}) => ({
  users,
})

class Users extends Component {
  render() {
    const {users} = this.props

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
                      status={users[id].status}
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
