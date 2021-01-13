import Codemeo from '../../codemeo'

const state = {
  /**
   * Total count of posts.
   * 
   * @type Number
   */
  totalPosts: 0,

  /**
   * Posts on home page.
   * 
   * @type Array
   */
  posts: [],

  /**
   * Current post.
   * Uses in EntryComponent.
   * 
   * @type Object
   */
  currentPost: {},

  categories: {
    all     : 'All entries',
    travel  : 'Travel',
    thoughts: 'Thoughts',
    other   : 'Other',
  },

  currentCategory: 'all',
}

const mutations = {
  setTotalPosts(state, total) {
    state.totalPosts = total
  },

  setPosts(state, posts) {
    state.posts = posts
  },

  setCurrentPost(state, post) {
    state.currentPost = post
  },

  setCurrentCategory(state, category) {
    state.currentCategory = category
  },
}

const getters = {
  categoryPosts: state => {
    if ( ! state.posts ) {
      return []
    }

    if ( state.currentCategory === 'all' ) {
      return state.posts
    }

    return state.posts.filter( post => post.category_url === state.currentCategory )
  }
}

const actions = {
  /**
   * Get cached posts or retrieve them from server.
   */
  getPosts({ commit, state }) {
    return new Promise((resolve, reject) => {
      if (state.posts && state.posts.length) {
        resolve( state.posts )
        return
      }

      Codemeo.API.getPosts()
        .then( response => {
          commit('setPosts', response.list)
          commit('setTotalPosts', response.count)
          resolve( response.list )
        })
    })
  },

  /**
   * Get one post.
   */
  getPost({ commit, state }, postUrl) {
    return new Promise((resolve, reject) => {
      // postUrl = +postUrl;
      let found = state.posts.filter(post => post.url === postUrl && post.content);
      if (found.length) {
        resolve(found[0])
        return
      }

      Codemeo.API.getPost(postUrl)
        .then( post => {
          resolve( post )
        })
        .catch( err => reject(err) )
    })
  },

  setCurrentPost({ commit }, post) {
    commit('setCurrentPost', post)
  },

  setCurrentCategory({ commit }, category) {
    commit('setCurrentCategory', category)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
}
