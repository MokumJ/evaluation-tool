import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'
import API from '../../api/client'
import { push } from 'react-router-redux'
import { fetchOneBatch } from '../batches/fetch'

export const PICK_COLOR = 'PICK_COLOR'

const api = new API()

export default (studentId, batch) => {
  return dispatch => {
    dispatch({ type: APP_LOADING })

    api.put(`students/${studentId}`, batch)
      .then((result) => {
      dispatch({ type: APP_DONE_LOADING })
      dispatch({ type: LOAD_SUCCESS })
      dispatch (fetchOneBatch(batch._id))
      dispatch(push(`/students/${result.body._id}`))
  })
    .catch((error) => {
      dispatch({ type: APP_DONE_LOADING })
      dispatch({
        type: LOAD_ERROR,
        payload: error.message
      })
    })

  }
}
