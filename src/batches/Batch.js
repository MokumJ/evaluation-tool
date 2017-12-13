import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { fetchOneBatch } from '../actions/batches/fetch'
import { Link } from 'react-router-dom'
import Title from '../components/Title'
import './Batch.css'
import '../students/StudentEditor'
import { GridList, GridTile} from 'material-ui/GridList';

const PLACEHOLDER = 'http://via.placeholder.com/500x180?text=No%20Image'

const studentShape = PropTypes.shape({
  evaluations: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  batchId: PropTypes.string.isRequired,
})

const styles = {
gridList: {
  width: 500,
  height: 100,
  marginTop: '20x',
},
};

export class Batch extends PureComponent {
  static propTypes = {
    fetchOneBatch: PropTypes.func.isRequired,
    batch: PropTypes.shape({
      batchId: PropTypes.number,
      students: PropTypes.arrayOf(studentShape),
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
      pickStudent: PropTypes.array,
      })
  }
    componentWillMount() {
       const { batchId } = this.props.match.params
       this.props.fetchOneBatch(batchId)
        //pickRandom Student function
  }
    linkToStudent = studentId => event => this.props.push(`/students/${studentId}`)

    render() {
    const { batch } = this.props

    return(

  <GridList cellHeight={100}
     style ={styles.gridList}>

        {batch.students.map((student) => (
         <GridTile key={student._id}
         title={student.name}>
           <img className ="studentPicture" src={student.picture} alt= "student"
            onClick={this.linkToStudent(student._id)}/>
        </GridTile>

      ))}
   </GridList>

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
