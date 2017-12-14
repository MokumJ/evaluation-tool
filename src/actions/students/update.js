
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'
import API from '../../api/client'

export const UPDATE_STUDENT = 'UPDATE_STUDENT'

const api = new API()

export default (student, studentId) => {
  return dispatch => {
    dispatch({ type: APP_LOADING })

    api.put(`students/${studentId}`, student  )
      .then((res) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({
          type: UPDATE_STUDENT,
          payload: res.body
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
