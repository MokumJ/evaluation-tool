import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { fetchOneBatch } from '../actions/batches/fetch'
import fetchEvaluations  from '../actions/evaluations/fetch'
import { Link } from 'react-router-dom'
import Title from '../components/Title'
import './Batch.css'
import StudentEditor from '../students/StudentEditor'
import { GridList, GridTile} from 'material-ui/GridList';
import FileFolder from 'material-ui/svg-icons/file/folder';
import FontIcon from 'material-ui/FontIcon';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';


const studentShape = PropTypes.shape({
  evaluations: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  batchId: PropTypes.string.isRequired,
  currentColor:
})
const style = {
  marginTop: '20x'
};

const styles = {
List: {
  width: 500,
  height: 100,
  marginTop: '20x',
},
};
const listItem = {
  marginTop: '20x',
};

export class Batch extends PureComponent {
  static propTypes = {
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

render() {
      const { batch } = this.props
      if (!batch) return null

    return(
      <div>
       <List
       style={styles.List}>
        {batch.students.map((student) => (
         <ListItem
          key={student._id}
          style={listItem}
          leftAvatar={
            <Avatar
              src= {student.picture}
              size={60}
              style={style}
           />
          }
          RigthAvatar={
        <Avatar
          color={student.currentColor}
          backgroundColor={student.currentColor}
          size={60}
          style={style}
        >
          A
        </Avatar>
      }
            onClick={this.linkToStudent(student._id)}
            primaryText={student.name}>
         </ListItem>

      ))}
        </List>

      <div>
        <StudentEditor batchId= { batch._id}/>
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


export default connect(mapStateToProps, { fetchOneBatch, push })(Batch)
