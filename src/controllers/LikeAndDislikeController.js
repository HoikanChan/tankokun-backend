const {
  LikeAndDislike
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
      let likeDocs = await LikeAndDislike.find(where)
      // .populate({path: 'songId', select: ['title', 'artist', 'album']})
      likeDocs = likeDocs.map(doc => doc.toJSON())
      .map(doc => {
        return {
          _id: doc._id,
          like: doc.like
        }
      })
      res.send(likeDocs)
    } catch (err) {
      res.status(500).send({
        error: 'An error occured when trying to fectch bookmark.'
      })
    }
  },
  async post (req, res) {
    try {
      const {songId, like} = req.body
      const userId = req.user._id
      if (userId && songId) {
        const sameExistBookmark = await LikeAndDislike.findOne({
          'userId': userId,
          'songId': songId
        })
        let newLikeDoc = null
        if (!sameExistBookmark) {
          newLikeDoc = await LikeAndDislike.create({
            userId: userId,
            songId: songId,
            like: like
          })
        }
        res.send(newLikeDoc)
      } else {
        res.send(null)
      }
    } catch (err) {
      res.status(500).send({
        error: 'An error occured when trying to create bookmark.'
      })
    }
  },
  async put (req, res) {
    try {
      await LikeAndDislike.findByIdAndUpdate(req.params.likeId, req.body)
      res.send(req.body)
    } catch (err) {
      res.status(500).send({
        error: 'An error occured when trying to update songs.'
      })
    }
  },
  async delete (req, res) {
    try {
      const likeId = req.params.likeId
      const likeDocToRemove = await LikeAndDislike.findByIdAndRemove(likeId)
      console.log(likeDocToRemove)
      res.send(likeDocToRemove)
    } catch (err) {
      res.status(500).send({
        error: 'An error occured when trying to delete bookmark.'
      })
    }
  }
}
