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


  backToBatch = batchId => event => this.props.push(`batch/${batchId}`)

  render() {
    const { student } = this.props
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
         <Evaluation studentId={student} batchId={student.batchId} />
       </div>
        <RaisedButton
            onClick={ this.backToBatch() }
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


export default connect(mapStateToProps, { fetchOneBatch,  push })(StudentPage)
