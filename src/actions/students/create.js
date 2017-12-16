
import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'
import { fetchOneBatch } from '../batches/fetch'
const STUDENT_ADDED = 'STUDENT_ADDED'
export const CREATE_STUDENT = 'CREATE_STUDENT'

const api = new API()

export default (student, batchId) => {
  return (dispatch) => {
    api.patch(`batches/${batchId}`, student, batchId)
      .then(res => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })
        dispatch({ type: STUDENT_ADDED, payload: res.body })
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
