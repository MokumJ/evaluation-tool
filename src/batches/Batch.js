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
import { pickColor } from '../actions/students'
import { ActionAccessibility, ActionAccessible, ActionAccountBalance } from 'material-ui/svg-icons'



const studentShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  batchId: PropTypes.string.isRequired,
  currentColor: PropTypes.string,
  evaluation: PropTypes.arrayOf(evaluationShape)
})
const evaluationShape = PropTypes.shape({
      color: PropTypes.string,
      date: PropTypes.string,
      remark: PropTypes.string,
})

export class Batch extends PureComponent {
  static propTypes = {
    pickStudent: PropTypes.func,
    fetchOneBatch: PropTypes.func.isRequired,
    batch: PropTypes.shape({
      students: PropTypes.arrayOf(studentShape),
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
      luckyOne: PropTypes.string.isRequired,
      students: PropTypes.arrayOf(studentShape),
      pickStudent: PropTypes.array,
      })
  }
  constructor(props) {
		super(props);
		this.state = {
			LuckyOne: null,

		};
	}
    componentWillMount() {
       const { batchId } = this.props.match.params
        {this.props.fetchOneBatch(batchId)}

        //pickRandom Student function
  }
    linkToStudent = (batchId, studentId)=> event => this.props.push((`/students-path/${batchId}/${studentId}`))

    pickStudent() {
      const { batch } = this.props
      const reds = batch.students.filter(s => s.evaluation[s.evaluation.length -1].color === "red")
      const yellows = batch.students.filter(s => s.evaluation[s.evaluation.length -1].color === "yellow")
      const greens = batch.students.filter(s => s.evaluation[s.evaluation.length -1].color === "green")
      const poul = [reds, reds, reds, yellows, yellows, greens]
      return [].concat(...poul)
    }

    getRandom() {
      const poul = this.pickStudent()
      const luckyOne = (poul[Math.floor(Math.random()*poul.length)])
      this.setState({
      luckyOne: luckyOne.name})
      console.log(this.state.luckyOne)
    }

    showPercentage() {
        const { batch } = this.props
        const evaluation = batch.students.map(s => s.evaluation)
        const colors1 = evaluation.map(e => e.map(e => e.color))
        const colors2 = [].concat(...colors1)
        const perc = (color) => {
        const occ = colors2.filter(c => c === color).length
          return ( occ / colors2.length * 100 ) + "%"
          console.log(occ)
        }
    return (
  <div className="avgScore">
    <h3>Average Score: </h3>
    <div className="green" style={{width: perc("green")}}> </div>
    <div className="yellow" style={{width: perc("yellow")}}></div>
    <div className="red" style={{width: perc("red")}}></div>

  </div>
)
}

render() {
    const { batch } = this.props
      if (!batch) return null
    const { batchId } = this.props.match.params
    return(
    <div>
      {
           batch ? this.showPercentage() : null
         }
         <div className= "list">
        <List style={{  width: '60%',
                        marginTop: '300x'}}>
          {batch.students.map((student) => (
        <span>  <ListItem
            key={student._id}

            leftAvatar={
            <Avatar
              src= {student.picture}
              size={30}
            />}
            primaryText= {student.name}
            style={{
              margin: '50x',
             padding: '0,5rem',
            }}
            rightAvatar={
           <Avatar backgroundColor = {student.evaluation[student.evaluation.length-1].color} size = {30}/> }

            onClick={this.linkToStudent(batch._id, student._id)}>

            </ListItem> </span>
          ))}

      <span>  <ListItem
        style={{
          margin: '50x',
         padding: '0,5rem',

        }}
        verticalAlign='middle'
        primaryText=  {<p> pick Student: --------------------->   {this.state.luckyOne}</p>}
        leftIcon={
       <ActionAccessibility
      tooltipPosition="bottom-left"
       size= {30}/>}
        onClick={ this.getRandom.bind(this)} >
        </ListItem> </span>

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


export default connect(mapStateToProps, { fetchOneBatch, push, pickStudent, pickColor })(Batch)
