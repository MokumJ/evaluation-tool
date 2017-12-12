// src/reducers/students.js
import students from  '../fixtures/students'
import {
  TOGGLE_LIKE_RECIPE,
  FETCHED_RECIPES,
  CREATE_RECIPE
} from '../actions/students'

const newId = (state) => {
  const ids = state
    .map((student) => student._id)
    .sort()
  return ['abcd', parseInt(ids[ids.length - 1].split('abcd')[1], 10) + 1].join('')
}

export default (state = students, {type, payload} = {}) => {
  switch(type) {
    case FETCHED_RECIPES :
      return [ ...payload ]

    case CREATE_RECIPE :
      return [{ ...payload, _id: newId(state) }].concat(state)

    case TOGGLE_LIKE_RECIPE :
      return state.map((student) => {
        if (student._id === payload) {
          return { ...student, liked: !student.liked }
        }

        return student
      })

    default :
      return state
  }
}
