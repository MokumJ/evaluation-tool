// src/students/StudentEditor.js
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { createStudent } from '../actions/students'
import PropTypes from 'prop-types'
import Title from '../components/UI/Title'
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'

const buttonStyle = {
  marginLeft: '3rem',
  color: 'green',
}

class StudentEditor extends PureComponent {
  static propTypes = {
    createStudent: PropTypes.func.isRequired,
    batchId: PropTypes.string
  }

  state = {}

  submitForm(event) {
    event.preventDefault()
      const { batchId } = this.props
      const student = {
        name: this.refs.name.getValue(),
        picture: this.refs.picture.getValue(),
        batchId: batchId,
        evaluations: [{}],
      }
      this.props.createStudent(student, batchId)
      this.refs.form.reset()
    }

  render() {
    return (
      <Paper zDepth={2}>
        <Title content=" Add New Student"  />

        <form onSubmit={this.submitForm.bind(this)} ref="form">
          <div className="input">
            <h4>Full name: </h4>
            <TextField ref="name" type="text" hintText="Full Name" id="name"/>
          </div>
          <div className="input">
            <h4>Photo: </h4>
            <TextField ref="picture" type="text" hintText='url' id="picture"/>
         </div>
        </form>
        <RaisedButton
          style={ buttonStyle }
          onClick={ this.submitForm.bind(this) }
          label="Add"
          primary={true} />
      </Paper>
    )
  }
}

const mapStateToProps = ({ student }) => ({ student })

export default connect(mapStateToProps, { createStudent })(StudentEditor)
