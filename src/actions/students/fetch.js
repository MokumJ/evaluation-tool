
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'
import API from '../../api/client'
import { fetchOneBatch } from '../batches/fetch'

export const FETCHED_ONE_STUDENT = 'FETCHED_ONE_STUDENT'

const api = new API()

export default (studentId) => {
  return dispatch => {
    dispatch({ type: APP_LOADING })

   api.get(`/students/${studentId}`)
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({
          type: FETCHED_ONE_STUDENT,
          payload: result.body
        })
        dispatch(fetchOneBatch(result.body.batchId))
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
