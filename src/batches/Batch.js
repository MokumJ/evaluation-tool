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
import Divider from 'material-ui/Divider';
import SvgIcon from 'material-ui/SvgIcon';


const studentShape = PropTypes.shape({
  evaluations: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  batchId: PropTypes.string.isRequired,
})

const style = {
  margin: '20x'

};


const listItem = {

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
      <div className= 'list'>
          <List
          style={{
             width: '50%',
           }}>
          {batch.students.map((student) => (
            <ListItem
            key={student._id}
            primaryText= {student.name}

            style={{
            margin: '20x',
            padding: '0,5rem',
            }}
            leftAvatar={
              <Avatar
                src= {student.picture}
                size={40}
                style={style}
              />
            }
            RigthIcon={
              <SvgIcon
              backgroundColor={student.currentColor}
              size={40}
              style={style}
              >
          A
          </SvgIcon>
            }
            onClick={this.linkToStudent(student._id)}>

            </ListItem>

            ))}
        </List>
      </div>
        <div className = "editor" >
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
