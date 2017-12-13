import React, { PureComponent } from 'react'

import { connect } from 'react-redux'
import { createBatch } from '../actions/batches'
import PropTypes from 'prop-types'
import Title from '../components/UI/Title'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

const dialogStyle = {
  width: '300px',
  margin: '30px',
  padding: '2rem',
}

const buttonStyle = {
  float: 'right',
  marginLeft: '2rem',
}

class BatchEditor extends PureComponent {
  static propTypes = {
    createBatch: PropTypes.func.isRequired,
  }

  submitForm(event) {
    event.preventDefault()
      const batch = {
        batchNumber: this.refs.number.getValue(),
        startDate: this.refs.startdate.getValue(),
        endDate: this.refs.enddate.getValue(),
      }
      this.props.createBatch(batch)
      this.refs.batchEditor.reset()
    }

  render() {
    return (
      <Paper style= { dialogStyle }>
        <Title content="Add Batch"/>
        <form onSubmit={this.submitForm.bind(this)} ref="batchEditor">
          <div className="input">
            <h4>Batch number: </h4>
            <TextField ref="number" type="number" placeholder="batch number" />
          </div>
          <div className="input">
            <h4>Startdate: </h4>
            <TextField ref="startdate" type="date"/>
         </div>
         <div className="input">
           <h4>Startdate: </h4>
           <TextField ref="enddate" type="date"/>
        </div>
        </form>
        <RaisedButton
          style={ buttonStyle }
          onClick={ this.submitForm.bind(this) }
          label="Add batch"
          primary={true} />
      </Paper>
    )
  }
}

const mapStateToProps = ({ batch }) => ({ batch })

export default connect(mapStateToProps, { createBatch })(BatchEditor)
