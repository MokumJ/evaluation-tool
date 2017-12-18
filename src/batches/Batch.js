import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { fetchOneBatch } from '../actions/batches/fetch'
import './Batch.css'
import StudentEditor from '../students/StudentEditor'
import FontIcon from 'material-ui/FontIcon';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import SvgIcon from 'material-ui/SvgIcon';
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
  }
    linkToStudent = (batchId, studentId)=> event => this.props.push((`/students-path/${batchId}/${studentId}`))

    sortStudent() {
      const { batch } = this.props
      const red = batch.students.filter(s => s.evaluation[s.evaluation.length -1].color === "red")
      const yellow = batch.students.filter(s => s.evaluation[s.evaluation.length -1].color === "yellow")
      const green = batch.students.filter(s => s.evaluation[s.evaluation.length -1].color === "green")
      const poul = [red, red, red, yellow, yellow, green]
      return [].concat(...poul)
    }

    pickStudent() {
      const poul = this.sortStudent()
      const luckyOne = (poul[Math.floor(Math.random()*poul.length)])
      this.setState({
      luckyOne: luckyOne.name})
      console.log(this.state.luckyOne)
    }

    showPercentageBar() {
        const { batch } = this.props
        const evaluation = batch.students.map(s => s.evaluation)
        const colors = evaluation.map(e => e.map(e => e.color))
        const colorGroup = [].concat(...colors)
        const percentage = (color) => {
        const average = colorGroup.filter(c => c === color).length
          return ( average / colorGroup.length * 100 ) + "%"

        }
    return (
      <div className="percentageBar">
      <h3>Average </h3>
      <div className="green" style={{width: percentage("green")}}> </div>
      <div className="yellow" style={{width: percentage("yellow")}}></div>
      <div className="red" style={{width: percentage("red")}}></div>
      </div>
    )
  }

  render() {
    const { batch } = this.props
    if (!batch) return null
    const { batchId } = this.props.match.params

    return(
    <div>
      {batch ? this.showPercentageBar() : null}
     <div className= "list">
      <List style={{
          width: '60%',
          marginTop: '300x'
                  }}>
      {batch.students.map((student) => (
        <ListItem
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
            </ListItem>
                      ))}
       <ListItem
         style={{
         margin: '50x',
         padding: '0,5rem',
        }}
        verticalAlign='middle'
        primaryText=  {<p> pick Student: --------------------->   {this.state.luckyOne}</p>}
        leftIcon={
          <ActionAccessibility
          tooltipPosition="bottom-left"
          size= {30}
          />}
        onClick={ this.pickStudent.bind(this)} >
      </ListItem>
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


export default connect(mapStateToProps, { fetchOneBatch, push  })(Batch)
