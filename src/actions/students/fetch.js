// src/actions/students/fetch
import ApiClient from '../../api/client'
// import loading from '../loading' // ???
// import loadError from '../loadError' // ???
export const FETCHED_RECIPES = 'FETCHED_RECIPES'

const api = new ApiClient()

export default () => {
  return dispatch => {
    // dispatch(loading(true)) // ???

    api.get('students')
      .then(res => dispatch({ type: FETCHED_RECIPES, payload: res.body }))
      

    // dispatch(loading(false)) // ???
  }
}
