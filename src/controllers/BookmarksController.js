const {
  Bookmark
} = require('../models')
const sendResult = require("../utils/sendResult");

module.exports = {
  async index (req, res) {
    try {
      const {wordId} = req.query
      const userId = req.user._id
      let where = {
        'userId': userId
      }
      if (wordId) {
        where.wordId = wordId
      }
      let bookmark = await Bookmark.find(where)
      // .populate({path: 'wordId', select: ['title', 'artist', 'album']})
      bookmark = bookmark.map(bookmark => bookmark.toJSON())
      .map(bookmark => {
        return bookmark._id
      })
      sendResult.success(res,bookmark)
    } catch (err) {
      res.status(500).send({
        error: 'An error occured when trying to fectch bookmark.'
      })
    }
  },
  async post (req, res) {
    try {
      const {wordId} = req.body
      const userId = req.user._id
      if (userId && wordId) {
        const sameExistBookmark = await Bookmark.findOne({
          'userId': userId,
          'wordId': wordId
        })
        let newBookmark = null
        if (!sameExistBookmark) {
          newBookmark = await Bookmark.create({
            userId: userId,
            wordId: wordId
          })
        }
        sendResult.success(res,newBookmark)
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
      sendResult.success(res,bookmarkToRemove)
    } catch (err) {
      res.status(500).send({
        error: 'An error occured when trying to delete bookmark.'
      })
    }
  }
}
