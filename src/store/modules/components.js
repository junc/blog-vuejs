
const state = {
  /**
   * Current component.
   * Uses to switch active component.
   * 
   * @example 'HomeComponent', 'EntryComponent'
   * @type String
   */
  current: null,

  /**
   * Current pathname.
   * Uses to change current header link.
   * 
   * @type String
   */
  pathname: window.location.pathname,

  /**
   * Is current action is retrieving data from server.
   * 
   * @type Boolean
   */
  isLoading: false,
}

const mutations = {
  setComponent(state, component) {
    state.current = component
  },
  setLoading(state, isLoading) {
    state.isLoading = isLoading
  },
  setPathname(state, pathname) {
    state.pathname = pathname
  },
}

const getters = {}

const actions = {
  setComponent ({ commit }, component) {
    commit('setComponent', component)
  },
  setLoading ({ commit }, isLoading) {
    commit('setLoading', isLoading)
  },
  setPathname ({ commit }, pathname) {
    commit('setPathname', pathname)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
}
