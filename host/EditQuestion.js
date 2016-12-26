import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ImageEdit from 'material-ui/svg-icons/image/edit'
import ImageAdd from 'material-ui/svg-icons/content/add';
import ImageDelete from 'material-ui/svg-icons/action/delete';
import FlatButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import Snackbar from 'material-ui/Snackbar'

import { fetchContents, updateText } from './actions'

import { ReadJSON } from '../util/ReadJSON'

const mapStateToProps = ({ text, page }) => ({
  text, page
})

const multi_text = ReadJSON().static_text

class EditQuestion extends Component {
  constructor(props){
    super(props)
    const { text } = this.props
    var default_text = text
    if(!text) {
      default_text = ReadJSON().dynamic_text
      const { dispatch } = this.props
      dispatch(updateText(default_text))
    }
    console.log(default_text)
    this.state = {
      text: default_text,
      isOpenDialog: false,
      isOpenSnackbar: false,
      snackbarMessage: "",
      slideIndex: 0,
      default_text: ReadJSON().dynamic_text,
    }
  }

  DescriptionTab() {
    return (
      <div>
        <table>
          <tbody>
            {
              this.state.text.descriptions.map((description, index) => (
                <tr key={description.id}>
                  <td>
                    <FloatingActionButton
                      mini={true}
                      secondary={true}
                      onTouchTap={this.deleteDescription.bind(this, index)}
                      disabled={this.state.text.descriptions.length <= 1}
                    >
                      <ImageDelete />
                    </FloatingActionButton>
                  </td>
                  <td>
                    <TextField
                      hintText={multi_text["edit_question_text"][0]}
                      defaultValue={description.text}
                      onBlur={this.handleChange.bind(this, ["descriptions", index, "text"])}
                      multiLine={true}
                      fullWidth={true}
                    />
                  </td>
                </tr>
              ))
            }
            <tr>
              <td>
                <FloatingActionButton
                  mini={true}
                  onTouchTap={this.addDescription.bind(this)}
                >
                  <ImageAdd />
                </FloatingActionButton>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  ExperimentTab() {
    return (
      <div>
        <p>{multi_text["edit_question_text"][1]}</p>
        <TextField
          hintText={multi_text["edit_question_text"][0]}
          defaultValue={this.state.text.question}
          onBlur={this.handleChange.bind(this, ["question"])}
          multiLine={true}
          fullWidth={true}
        />
        <p>{multi_text["edit_question_text"][2]}</p>
        <TextField
          hintText={multi_text["edit_question_text"][2]}
          defaultValue={this.state.text.answers[0]}
          onBlur={this.handleChange.bind(this, ["answers", 0])}
          multiLine={false}
          fullWidth={true}
        />
        <TextField
          hintText={multi_text["edit_question_text"][2]}
          defaultValue={this.state.text.answers[1]}
          onBlur={this.handleChange.bind(this, ["answers", 1])}
          multiLine={false}
          fullWidth={true}
        />
        <TextField
          hintText={multi_text["edit_question_text"][2]}
          defaultValue={this.state.text.answers[2]}
          onBlur={this.handleChange.bind(this, ["answers", 2])}
          multiLine={false}
          fullWidth={true}
        />
      </div>
    )
  }

  handleOpen() {
    const { dispatch } = this.props
    dispatch(fetchContents())
    this.setState({ 
      isOpenDialog: true,
      slideIndex: 0,
      text: this.props.text,
    });
  }

  handleClose() {
    this.setState({ isOpenDialog: false })
  }

  handleChange(value, event){
    var text = Object.assign({}, this.state.text)
    var temp = text
    for(var i = 0; i < value.length - 1; i++){
      temp = temp[value[i]]
    }
    temp[value[value.length - 1]] = event.target.value
    this.setState({ text: text })
  }

  handleSlideIndex(value) {
    this.setState({
      slideIndex: value
    })
  }

  handleRequestClose() {
    this.setState({
      isOpenSnackbar: false,
    })
  }

  deleteDescription(index) {
    var { text } = this.state
    text.descriptions.splice(index, 1)
    this.setState({
      text: text,
    })
  }

  addDescription() {
    var { text } = this.state
    var id = 0
    var flag = false
    while (!flag) {
      for (var i = 0; i < text.descriptions.length; i++) {
        if (text.descriptions[i].id == id) {
          id++
          break
        } else if (i >= text.descriptions.length-1) {
          flag = true
        }
      }
    }
    text.descriptions.push({id: id, text: ""})
    this.setState({
      text: text,
    })
  }

  submit() {
    this.setState({ 
      isOpenDialog: false,
      isOpenSnackbar: true,
      snackbarMessage: multi_text["edit_question_text"][3],
    })
    const { dispatch } = this.props
    dispatch(updateText(this.state.text))
  }

  reset(){
    this.setState({ 
      isOpenDialog: false,
      isOpenSnackbar: true,
      snackbarMessage: multi_text["edit_question_text"][4],
    })
    const { dispatch } = this.props
    dispatch(updateText(this.state.default_text))
  }

  render(){
    const { page, text, style } = this.props

    const actions = [
      <FlatButton
        label={multi_text["edit_question_text"][5]}
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.submit.bind(this)}
      />,
      <FlatButton
        label={multi_text["edit_question_text"][6]}
        onTouchTap={this.handleClose.bind(this)}
      />,
     <FlatButton
        label={multi_text["edit_question_text"][7]}
        onTouchTap={this.reset.bind(this)}
      />,
    ]
    return (<span>
      <FloatingActionButton onClick={this.handleOpen.bind(this)} style={style} disabled={page != "waiting"}>
         <ImageEdit />
      </FloatingActionButton>
      <Dialog
        title={multi_text["edit_question_text"][8]}
        actions={actions}
        modal={false}
        open={this.state.isOpenDialog}
        autoScrollBodyContent={true}
      >
        <Tabs
          onChange={this.handleSlideIndex.bind(this)}
          value={this.state.slideIndex}
        >
          <Tab label={multi_text["edit_question_text"][9]} value={0} />
          <Tab label={multi_text["edit_question_text"][10]} value={1} />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleSlideIndex.bind(this)}
        >
          {this.DescriptionTab()}
          {this.ExperimentTab()}
        </SwipeableViews>
      </Dialog>
      <Snackbar
        open={this.state.isOpenSnackbar}
        message={this.state.snackbarMessage}
        autoHideDuration={2000}
        onRequestClose={this.handleRequestClose.bind(this)}
      />
    </span>)
  }
}

export default connect(mapStateToProps)(EditQuestion)
