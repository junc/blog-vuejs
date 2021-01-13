import Codemeo from './codemeo'

/**
 * Available events:
 * - route:updated - fires when page content is loaded
 */


// Scroll to top when page content has changed
Codemeo.Events.on('route:updated', function(){
  let app = window.document.getElementById('app')
  if (app && typeof app.scrollTo === 'function') {
    app.scrollTo(0, 0)
  }
})
