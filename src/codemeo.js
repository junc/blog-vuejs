'use strict';

/**
 * Codemeo v0.0.1
 * @copyright 2018 Codemeo
*/
var API_URL = 'https://codemeo.com';

// Local development
if ( process.env.NODE_ENV !== 'production' ) {
  API_URL = 'http://localhost:4005';
}

const POSTS_PER_PAGE = 15;

var Codemeo = {
  API: {},
}

var CodemeoData = {
  entries: {},
}

const CodemeoRequestOptions = {
  method: "POST",
  mode: "cors",
  cache: "no-cache",
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  redirect: "follow",
  referrer: "no-referrer",
}

/**
 * Get current section of Codemeo.
 * @return {string}
 */
Codemeo.getCurrentSection = (function(){
  return function(){
    return window.location.pathname
  }
})();


/**
 * Get posts.
 * 
 * @param {umber} offset
 */
Codemeo.API.getPosts = function(offset) {
  return new Promise( resolve => {
    // fetch(API_URL + "/api/entries/get?count=" + POSTS_PER_PAGE, CodemeoRequestOptions )
    fetch(API_URL + "/api/entries/get", CodemeoRequestOptions )
      .then( response => response.json() )
      .then( response => {
        resolve( response )
      })
      .catch( err => {  } )
  })
}

/**
 * Get post by ID.
 * 
 * @param {number} postId
 */
Codemeo.API.getPost = function(postId) {
  return new Promise( ( resolve, reject ) => {
    if ( typeof CodemeoData.entries[ postId ] !== 'undefined' ) {
      resolve( CodemeoData.entries[ postId ] )
      return
    }

    fetch(API_URL + "/api/entries/get?id=" + postId, CodemeoRequestOptions )
      .then( response => response.json() )
      .then( response => {
        if ( response.success !== false ) {
          CodemeoData.entries[ postId ] = response;
          resolve( response )
          return
        }

        reject( new Error( response.message ) )
      })
      .catch( err => { } )
  })
};


/**
 * Get page by URL path.
 * 
 * @param {string} pageUrl
 */
Codemeo.API.getPage = function(pageUrl) {
  return new Promise( ( resolve, reject ) => {
    fetch(API_URL + "/api/pages/get?url=" + pageUrl, CodemeoRequestOptions )
      .then( response => response.json() )
      .then( response => {
        if ( response.success !== false ) {
          resolve( response )
          return
        }

        reject( new Error( response.message ) )
      })
      .catch( err => { } )
  });
};


/**
 * Event manager.
 * 
 * Add custom event with anonymous function and then call it:
 * @example Codemeo.Events.on('custom_event', () => alert('fired') );
 * @example Codemeo.Events.trigger('custom_event');
 * 
 * Or with custom param:
 * @example Codemeo.Events.on('custom_event', name => alert(name) );
 * @example Codemeo.Events.trigger('custom_event', 'Harry Potter');
 */
Codemeo.Events = (function(){
  var _handlers = {}

  var Events = {
    /**
     * Listen to event.
     * 
     * @param {string} type Event name
     * @param {function} handler Event callback
     */
    on(type, handler) {
      var handlers = _handlers[type]
      var i, length

      if (typeof handlers === 'undefined') {
        handlers = _handlers[ type ] = []
      }
      
      // Prevent dublicate handler
      for (i = 0, length = handlers.length; i < length; i++) {
        if (handlers[i] === handler) {
          return
        }
      }

      handlers.push(handler)
    },

    /**
     * Trigger all events with same type.
     * 
     * @param {string} type Event name
     * @param {mixed} params Event params
     */
    trigger(type, params) {
      if (typeof _handlers[type] === 'undefined') {
        return
      }

      // Clone array to prevent to call undefined handlers
      // when a handler switch off another handlers
      var handlers = _handlers[type].concat()

      // Call handlers
      for (var i in handlers) {
        handlers[i](params)
      }
    },

    /**
     * Remove handler.
     * 
     * @param {string} type 
     * @param {function} handler 
     */
    off(type, handler) {
      var handlers = _handlers[type]
      var i, length

      for (i = 0, length = handlers.length; i < length; i++) {
        if (handlers[i] === handler) {
          handlers.splice(i, 1)
          break
        }
      }
    },
  }

  return Events
})();

export default Codemeo
