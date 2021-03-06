// src/students/StudentEditor.js
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { createStudent } from '../actions/students'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'

const buttonStyle = {
  marginLeft: '3rem',
  color: 'green',
}

class StudentEditor extends PureComponent {
  submitForm(event) {
    event.preventDefault()
      const  { batchId } = this.props
      const student = {
        name: this.refs.name.getValue(),
        picture: this.refs.picture.getValue(),
        batchId: batchId,
        evaluation: [{
          color: 'green',
          remark: 'Good luck!',
          date: Date.now(0,10)
        }],
      }
      this.props.createStudent(student, batchId)
      this.refs.form.reset()
    }

  render() {
    return (

      <Paper zDepth={2}>
        <form onSubmit={this.submitForm.bind(this)} ref="form">
          <div className="input">
            <TextField ref="name" type="text" hintText="Full Name" id="name"/>
          </div>
          <div className="input">
            <TextField ref="picture" type="text" hintText='Picture url' id="picture"/>
         </div>
        </form>
        <RaisedButton
          style={ buttonStyle }
          onClick={ this.submitForm.bind(this) }
          label="Add new Student"
          primary={true} />
      </Paper>
    )
  }
}

const mapStateToProps = ({ batches }, { match }) => ({ batches, match })

export default connect(mapStateToProps, { createStudent })(StudentEditor)
