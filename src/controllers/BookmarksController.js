const {
  Bookmark
} = require('../models')

module.exports = {
  async index (req, res) {
    try {
      const {songId} = req.query
      const userId = req.user._id
      let where = {
        'userId': userId
      }
      if (songId) {
        where.songId = songId
      }
      let bookmark = await Bookmark.find(where)
      // .populate({path: 'songId', select: ['title', 'artist', 'album']})
      bookmark = bookmark.map(bookmark => bookmark.toJSON())
      .map(bookmark => {
        return bookmark._id
      })
      res.send(bookmark)
    } catch (err) {
      res.status(500).send({
        error: 'An error occured when trying to fectch bookmark.'
      })
    }
  },
  async post (req, res) {
    try {
      const {songId} = req.body
      const userId = req.user._id
      if (userId && songId) {
        const sameExistBookmark = await Bookmark.findOne({
          'userId': userId,
          'songId': songId
        })
        let newBookmark = null
        if (!sameExistBookmark) {
          newBookmark = await Bookmark.create({
            userId: userId,
            songId: songId
          })
        }
        res.send(newBookmark)
      } else {
        res.send(null)
      }
    } catch (err) {
      res.status(500).send({
        error: 'An error occured when trying to create bookmark.'
      })
    }
  },
  async delete (req, res) {
    try {
      const bookmarkId = req.params.bookmarkId
      const bookmarkToRemove = await Bookmark.findByIdAndRemove(bookmarkId)
      console.log(bookmarkToRemove)
      res.send(bookmarkToRemove)
    } catch (err) {
      res.status(500).send({
        error: 'An error occured when trying to delete bookmark.'
      })
    }
  }
}
