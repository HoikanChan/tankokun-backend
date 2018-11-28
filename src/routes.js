const AuthenticationController = require('./controllers/AuthenticationController')
const WordsController = require('./controllers/WordsController')
const BookmarksController = require('./controllers/BookmarksController')
const LikeAndDislikeController = require('./controllers/LikeAndDislikeController')
const HistoriesController = require('./controllers/HistoriesController')
const AuthenticationPolicy = require('./policies/AuthenticationPolicy')
const isAuthenticated = require('./policies/isAuthenticated')
module.exports = app => {
  app.post('/register',
    AuthenticationPolicy.register,
    AuthenticationController.register
  )
  app.post('/login',
    AuthenticationController.login
  )

  app.get('/words',
    WordsController.index
  )
  app.get('/words/:word',
    WordsController.search
  )
  app.post('/words',
    WordsController.post
  )
  app.put('/words/:wordId',
    WordsController.put
  )

  app.get('/bookmarks',
    isAuthenticated,
    BookmarksController.index
  )
  app.post('/bookmarks',
    isAuthenticated,
    BookmarksController.post
  )
  app.delete('/bookmarks/:bookmarkId',
    isAuthenticated,
    BookmarksController.delete
  )

  app.get('/like',
    isAuthenticated,
    LikeAndDislikeController.index
  )
  app.post('/like',
    isAuthenticated,
    LikeAndDislikeController.post
  )
  app.delete('/like/:likeId',
    isAuthenticated,
    LikeAndDislikeController.delete
  )
  app.put('/like/:likeId',
    isAuthenticated,
    LikeAndDislikeController.put
  )

  app.get('/histories',
    isAuthenticated,
    HistoriesController.index
  )
  app.post('/histories',
    isAuthenticated,
    HistoriesController.post
  )
}
