const {
  Song
} = require('../models')

module.exports = {
  async index (req, res) {
    try {
      const search = req.query.search
      let song = null
      if (search) {
        const LIKE_SEARCH = new RegExp(search, 'i')
        song = await Song.find({
          $or: [
            {'title': LIKE_SEARCH},
            {'album': LIKE_SEARCH},
            {'artist': LIKE_SEARCH},
            {'genre': LIKE_SEARCH}
          ]
        })
      } else {
        song = await Song.find().limit(10)
      }
      res.send(song)
    } catch (err) {
      res.status(500).send({
        error: 'An error occured when trying to fectch songs.'
      })
    }
  },
  async show (req, res) {
    try {
      const song = await Song.findOne(
        {
          '_id': req.params.songId
        }
      )
      res.send(song)
    } catch (err) {
      res.status(500).send({
        error: 'An error occured when trying to fectch songs.'
      })
    }
  },
  async put (req, res) {
    try {
      await Song.findByIdAndUpdate(req.params.songId, req.body)
      res.send(req.body)
    } catch (err) {
      res.status(500).send({
        error: 'An error occured when trying to update songs.'
      })
    }
  },
  async post (req, res) {
    try {
      const song = await Song.create(req.body)
      res.send(song)
    } catch (err) {
      res.status(500).send({
        error: 'An error occured when trying to create songs.'
      })
    }
  }
}