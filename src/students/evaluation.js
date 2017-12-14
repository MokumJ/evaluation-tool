import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { evaluate } from '../actions/evaluations/evaluate'
import PropTypes from 'prop-types'
import Title from '../components/ui/Title'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { push } from 'react-router-redux'


const dialogStyle = {
  width: '470px',
  height: '550px',
  margin: '20px',
  padding: '2rem',
}

const button1 = {
  float: 'left',
}
const buttonStyle = {
  float: 'right',
}

class Evaluation extends PureComponent {

  state = {}

  submitForm(event) {
    event.preventDefault()
      const { studentId, batchId } = this.props
      const evaluation = {
        color: this.state.value,
        date: this.refs.date.getValue(),
        remark: this.refs.remark.getValue()
      }

      this.props.push(`/batches/${batchId}`)
    }

    submitNext(event) {
      event.preventDefault()
      const { studentId, batchId } = this.props
      const evaluation = {
        color: this.state.value,
        date: this.refs.date.getValue(),
        remark: this.refs.remark.getValue()
        }

      this.props.(evaluation, studentId, batchId)
      this.props.push(`/students/${this.props.students[(this.props.students.findIndex(
        s=>s._id === studentId)+1)%this.props.students.length]._id}`)
      }

  handleChange = (value) => { this.setState({value}) }

  render() {
    return (
      <Paper style={ dialogStyle }>
        <Title content="Rate Student" level={2} />

        <form onSubmit={this.submitForm.bind(this)} ref="form">
        <div className="input">
          <div className="colors" >
            <div className="green1" onClick={()=>this.handleChange("green")}></div>
            <div className="yellow1" onClick={()=>this.handleChange("yellow")}></div>
            <div className="red1" onClick={()=>this.handleChange("red")}></div>
          </div>
        </div>
         <h4>Rate: {this.state.value}</h4>
          <div className="input">
            <h4>Date: </h4>
            <TextField ref="date" type="date" placeholder='Date' id="pickDate"
              defaultValue={new Date()} />
         </div>
        <div className="input">
          <h4>Remarks: </h4>
          <TextField ref="remark" type="text" placeholder='Remarks'
            id="remark"
            multiLine={true}
            rows={2}
            rowsMax={4} />
        </div>
        </form>
        <RaisedButton
          style={ button1 }
          onClick={ this.submitNext.bind(this) }
          label="Save and next"
          primary={true}/>
        <RaisedButton
          style={ buttonStyle }
          onClick={ this.submitForm.bind(this) }
          label="Save"
          primary={true} />
      </Paper>
    )
  }
}

const mapStateToProps = ({ students }) => ({ students })

export default connect(mapStateToProps, { evaluate , push })(Evaluation)
