import Codemeo from './codemeo'
import page from 'page'

function errorHandler({ context, store }) {
  store.dispatch('components/setComponent', 'ErrorComponent')
  store.dispatch('components/setPathname', context.pathname)

  store.dispatch('components/setLoading', false)
  Codemeo.Events.trigger('route:updated')
}

function init({ app }) {
  let store = app.$store

  // Single post page
  page('/post/:entryId', context => {
    var timeout = setTimeout(() => { store.dispatch('components/setLoading', true) }, 100)
    
    let entryId = context.params.entryId

    store.dispatch('components/setPathname', context.pathname)
    store.dispatch('posts/getPost', entryId)
      .then( entry => {
        store.dispatch('posts/setCurrentPost', entry)

        store.dispatch('components/setComponent', 'EntryComponent')

        clearTimeout( timeout )
        store.dispatch('components/setLoading', false)
        Codemeo.Events.trigger('route:updated')

        if ( process.env.NODE_ENV === 'production' ) {
          app.$ga.page( context.pathname )
        }
      })
      .catch( err => {
        // If entry not exists
        clearTimeout( timeout )
        errorHandler({ context, store })
      })
  })

  // Post in category
  page('/category/:category', context => {
    var timeout = setTimeout(() => { store.dispatch('components/setLoading', true) }, 100)
    let category = context.params.category

    if ( typeof store.state.posts.categories[ category ] === 'undefined' ) {
      errorHandler({ context, store })
      return
    }

    store.dispatch('posts/setCurrentCategory', category)
    store.dispatch('components/setPathname', context.pathname)
    store.dispatch('posts/getPosts')
      .then( posts => {
        store.dispatch('components/setComponent', 'HomeComponent')

        clearTimeout( timeout )
        store.dispatch('components/setLoading', false)
        Codemeo.Events.trigger('route:updated')

        if ( process.env.NODE_ENV === 'production' ) {
          app.$ga.page( context.pathname )
        }
      })
  })

  // Home page
  page('/', context => {
    var timeout = setTimeout(() => { store.dispatch('components/setLoading', true) }, 100)

    store.dispatch('posts/setCurrentCategory', 'all')
    store.dispatch('components/setPathname', context.pathname)
    store.dispatch('posts/getPosts')
      .then( posts => {
        store.dispatch('components/setComponent', 'HomeComponent')
        
        clearTimeout( timeout )
        store.dispatch('components/setLoading', false)
        Codemeo.Events.trigger('route:updated')

        if ( process.env.NODE_ENV === 'production' ) {
          app.$ga.page( context.pathname )
        }
      })
  })
  
  // Error page
  page('*', context => {
    var timeout = setTimeout(() => { store.dispatch('components/setLoading', true) }, 100)

    let pageUrl = context.pathname

    store.dispatch('components/setPathname', context.pathname)
    store.dispatch('pages/getPage', pageUrl)
      .then( page => {
        store.dispatch('pages/setCurrentPage', page)

        store.dispatch('components/setComponent', 'PageComponent')
        
        clearTimeout( timeout )
        store.dispatch('components/setLoading', false)
        Codemeo.Events.trigger('route:updated')

        if ( process.env.NODE_ENV === 'production' ) {
          app.$ga.page( context.pathname )
        }
      })
      .catch( err => {
        // If entry not exists
        clearTimeout( timeout )
        errorHandler({ context, store })
      })
  })
  page()
}

export default {
  init,
}
