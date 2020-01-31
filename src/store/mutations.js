import * as types from './mutation-types'

const mutations = {
  [types.SET_PROBLEM](state, problem) {
    state.problem = problem
  },
}

export default mutations