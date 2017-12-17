import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchOneBatch } from '../actions/batches'
import { updateStudent } from '../actions/students'
import { push } from 'react-router-redux'
import Evaluation from './Evaluation'
import Title from '../components/Title'
import './StudentPage.css'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import { createEvaluation } from '../actions/evaluations'
import RaisedButton from 'material-ui/RaisedButton'
import EvaluationColor from '../components/Colors'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

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
const PLACEHOLDER = 'http://via.placeholder.com/500x180?text=No%20Image'

class StudentPage extends PureComponent {

  componentWillMount() {
  const { batch, fetchOneBatch } = this.props
  const { batchId } = this.props.match.params

  if (!batch) { fetchOneBatch(batchId) }
}



  renderEvaluation = (evaluation, index) => {
    return (
       <TableRow key={index}>
        <TableRowColumn>{evaluation.color}</TableRowColumn>
        <TableRowColumn>{evaluation.remark}</TableRowColumn>
        <TableRowColumn>{evaluation.date}</TableRowColumn>
      </TableRow>
    )
  }

  state = {}


  submitForm(event) {
      event.preventDefault()
      const batchId = this.props.match.params.batchId
    	const studentId = this.props.match.params.studentId
      const student = this.props.student
        const evaluation = {
          color: this.state.value,
          date: this.refs.date.getValue(),
          remark: this.refs.remark.getValue()
        }
        console.table(evaluation)
        console.log(studentId)
        console.log(batchId)
        this.props.createEvaluation( batchId, studentId, evaluation, student )

      }

  setColor = (value) => { this.setState({value}) }

  handleChange = (value) => { this.setState({value}) }


  backToBatch = batchId => event => this.props.push(`batch/${batchId}`)

  render() {
    const { student, batch } = this.props
  		if (!student) return null



  return (

      <article className="StudentItem">
        <header>
          <Title content={ student.name } className="level-2" />
          <div className="color">
        <EvaluationColor currentColor={student.currentColor} />}
          </div>
          <div
            className="cover"
             style={{backgroundImage:`url(${ student.picture })`}}/>

        </header>
        <Table>
                  <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                       <TableHeaderColumn>Evaluation</TableHeaderColumn>
                       <TableHeaderColumn>Remarks</TableHeaderColumn>
                       <TableHeaderColumn>date</TableHeaderColumn>
                     </TableRow>
                  </TableHeader>
                  <TableBody displayRowCheckbox={false}>
                    {student.evaluation.map(this.renderEvaluation)}
                  </TableBody>
                </Table>

        <footer>
        <div>
        <Paper style={ dialogStyle }>
          <Title content="" level={2} />

          <form onSubmit={this.submitForm.bind(this, batch._id, student._id )} ref="form">
          <div className="input">
            <div className="colors" >
              <div className="red" style={red} onClick={()=>this.setColor('red')}></div>
              <div className="yellow" style={yellow} onClick={()=>this.setColor('yellow')}></div>
              <div className="green" style={green} onClick={()=>this.setColor('green')}></div>
            </div>
            </div>

           <h4>Evaluate: {(this.state.value)}

              </h4>
            <div className="input">
              <h4>Date: </h4>
              <TextField ref="date" type="date" placeholder='Date' id="pickDate"
                defaultValue={new Date()}
                    />
           </div>
          <div className="input">
            <h4>Remarks: </h4>
            <TextField ref="remark" type="text" placeholder='Remarks'
              id="remark"
              defaultValue={this.state.remarks}

              multiLine={true}
              rows={2}
              rowsMax={4} />
          </div>
          </form>

          <RaisedButton
            style={ buttonStyle }
            onClick={ this.submitForm.bind( this) }
            label="Evaluate"
            primary={true} />
        </Paper>
      )
    }
  }
       </div>
        <RaisedButton
            onClick={ this.backToBatch(batch._id) }
            label="Back"
            primary={true} />
        </footer>
      </article>

    )
  }
}


const mapStateToProps = ({ batches }, { match }) => {
	const student = batches.reduce((prev, next) => {
		if (next._id === match.params.batchId) {
			return next.students.filter(s => s._id === match.params.studentId)[0];
		}
		return prev;
	}, null);
	const batch = batches.reduce((prev, next) => {
		if (next._id === match.params.batchId) {
			return next;
		}
		return prev;
	}, null);

	return { student, batch };
};


export default connect(mapStateToProps, { fetchOneBatch,  push , createEvaluation})(StudentPage)
