import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { fetchOneBatch } from '../actions/batches/fetch'
import fetchEvaluations  from '../actions/evaluations/fetch'
import Title from '../components/Title'
import './Batch.css'
import StudentEditor from '../students/StudentEditor'
import { GridList, GridTile} from 'material-ui/GridList';
import FileFolder from 'material-ui/svg-icons/file/folder';
import FontIcon from 'material-ui/FontIcon';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import SvgIcon from 'material-ui/SvgIcon';
import EvaluationColor from '../components/Colors'
import { pickStudent } from '../actions/batches'
import RaisedButton from 'material-ui/RaisedButton'

const studentShape = PropTypes.shape({
  evaluations: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  batchId: PropTypes.string.isRequired,
  currentColor: PropTypes.number,
})


export class Batch extends PureComponent {
  static propTypes = {
    pickStudent: PropTypes.func,
    fetchOneBatch: PropTypes.func.isRequired,
    batch: PropTypes.shape({
      students: PropTypes.arrayOf(studentShape),
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
      pickStudent: PropTypes.array,
      })
  }
    componentWillMount() {
       const { batchId } = this.props.match.params
        {this.props.fetchOneBatch(batchId)}
        //pickRandom Student function
  }
    linkToStudent = studentId => event => this.props.push(`/students/${studentId}`)

    pickStudent() {
     const { batch } = this.props
     this.props.pickStudent(batch)
   }

render() {

      const { batch } = this.props
      if (!batch) return null

  return(
    <div>
      <div className= 'list'>
          <List
          style={{
             width: '80%',

           }}>
          {batch.students.map((student) => (
            <ListItem
            key={student._id}
            leftAvatar={
            <EvaluationColor currentColor={student.currentColor} />}
            primaryText= {student.name}
            style={{
            margin: '20x',
            padding: '0,6rem',
            }}
            rightAvatar={
              <Avatar
                src= {student.picture}
                size={30}
              />
            }

            onClick={this.linkToStudent(student._id)}>
            </ListItem>
            ))}
        </List>
        <p> {batch.pickStudent} </p>
      </div>
        <div className = "editor" >
        <StudentEditor batchId= { batch._id}/>
        <RaisedButton
      label="Pick Student"
      primary={true}
      onClick={ this.pickStudent.bind(this)}
      />
      </div>
      </div>

    )
  }
}

    const mapStateToProps = ({ batches }, { match }) => {
    const batch = batches.filter((b) => (b._id === match.params.batchId))[0]
    return {
      batch
    }
  }


export default connect(mapStateToProps, { fetchOneBatch, push, pickStudent })(Batch)
