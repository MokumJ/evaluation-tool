import API from '../../api/client'
import {
APP_LOADING,
APP_DONE_LOADING,
LOAD_ERROR,
LOAD_SUCCESS,
} from '../loading'
import { fetchOneBatch } from '../batches/fetch'

export const EVALUATE = 'EVALUATE'

const api = new API()

export default (batch, evaluate, studentId, batchId) => {
return dispatch => {
  dispatch({ type: APP_LOADING })

 api.put(`/batches/${batch._id}`, batch, evaluate, studentId, batchId)
    .then((result) => {
      dispatch({ type: APP_DONE_LOADING })
      dispatch({ type: LOAD_SUCCESS })
      dispatch(fetchOneBatch(batchId))

      dispatch({
        type: EVALUATE,
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
