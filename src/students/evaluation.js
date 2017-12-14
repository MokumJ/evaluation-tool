import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { evaluate } from '../actions/evaluations'
import PropTypes from 'prop-types'
import Title from '../components/UI/Title'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { push } from 'react-router-redux'
import './Evaluation.css'


const red = {
  display: 'flex',
  height: '50px',
  width: '50px',
  backgroundColor: 'red',
}
const yellow = {
  height: '50px',
  width: '50px',
  backgroundColor: 'yellow',
}
const green = {
  height: '50px',
  width: '50px',
  backgroundColor: 'green',
}

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
  float: 'center',
}

class Evaluation extends PureComponent {

  static propTypes = {
    evaluate: PropTypes.func.isRequired,
    color: PropTypes.number,
    studentId: PropTypes.string,
}

  state = {}

  submitForm(event) {
    event.preventDefault()
      const { studentId, batchId } = this.props
      const evaluation = {
        color: this.state.value,
        date: this.refs.date.getValue(),
        remark: this.refs.remark.getValue()
      }
      this.props.evaluate(evaluation, studentId, batchId)
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

      this.props.evaluate(evaluation, studentId, batchId)
      this.props.push(`/students/${this.props.students[(this.props.students.findIndex(
        s=>s._id === studentId)+1)%this.props.students.length]._id}`)
      }

  handleChange = (value) => { this.setState({value}) }

  render() {
    return (
      <Paper style={ dialogStyle }>
        <Title content="" level={2} />

        <form onSubmit={this.submitForm.bind(this)} ref="form">
        <div className="input">
          <div className="colors" >
            <div className="red" style={red} onClick={()=>this.setColor(0)}></div>
            <div className="yellow" style={yellow} onClick={()=>this.setColor(1)}></div>
            <div className="green" style={green} onClick={()=>this.setColor(2)}></div>
          </div>
          </div>

         <h4>Evaluate: {this.state.value}</h4>
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
          style={ buttonStyle }
          onClick={ this.submitForm.bind(this) }
          label="Evaluate"
          primary={true} />
      </Paper>
    )
  }
}

const mapStateToProps = ({ students }) => ({ students })

export default connect(mapStateToProps, { evaluate , push })(Evaluation)
