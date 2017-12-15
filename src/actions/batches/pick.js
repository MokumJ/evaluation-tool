import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'
import API from '../../api/client'
import { push } from 'react-router-redux'
import { fetchOneBatch } from '../batches/fetch'

export const PICK_STUDENT = 'PICK_STUDENT'

const api = new API()

export default (batch) => {
  return dispatch => {
    dispatch({ type: APP_LOADING })

    api.put(`/batches/${batch._id}`, batch)
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
