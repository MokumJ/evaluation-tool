import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'
export const EVALUATION_CREATED = 'EVALUATION_CREATED'

const api = new API()

export default (batch, studentId, evaluation, student) => {
  return (dispatch) => {

    dispatch({ type: APP_LOADING })

    const content = {batch, studentId, evaluation, student}

    api.put(`batches/${batch._id}`, content)
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({
          type: EVALUATION_CREATED,
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
