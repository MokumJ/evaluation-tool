import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'
export const CREATE_EVALUATION = 'CREATE_EVALUATION'

const api = new API()

export default ( batchId, studentId, evaluation, student) => {
  return (dispatch) => {

    dispatch({ type: APP_LOADING })

    const content = {batchId, studentId, student, evaluation}

    api.put(`batches/${batchId}`, content)
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({
          type: CREATE_EVALUATION,
          payload: result.body
        })

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
