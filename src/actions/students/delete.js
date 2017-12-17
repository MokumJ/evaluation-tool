
import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

const api = new API()
export const STUDENT_DELETED = "STUDENT_DELETED";


export default (batchId, studentId) => {
  return (dispatch) => {

    dispatch({ type: APP_LOADING })

    api.delete(`batches/${batchId}/${studentId}`)
      .then(res => {
        dispatch({ type: STUDENT_DELETED, payload: res.body })
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })
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
