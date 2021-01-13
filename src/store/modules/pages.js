import Codemeo from '../../codemeo'

const state = {
  /**
   * Current page.
   * Uses in PageComponent.
   * 
   * @type Object
   */
  currentPage: {},
}

const mutations = {
  setCurrentPage(state, page) {
    state.currentPage = page
  },
}

const getters = {}

const actions = {
  /**
   * Get page by URL path.
   */
  getPage({ commit, state }, pageUrl) {
    return new Promise((resolve, reject) => {
      Codemeo.API.getPage(pageUrl)
        .then( page => {
          resolve( page )
        })
        .catch( err => reject(err) )
    })
  },

  setCurrentPage({ commit }, page) {
    commit('setCurrentPage', page)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
}
