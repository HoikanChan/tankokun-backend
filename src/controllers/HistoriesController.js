const {
  History
} = require('../models')
const _ = require('lodash')
module.exports = {
  async index (req, res) {
    try {
      const userId = req.user.id
      let histories = await History.find({'userId': userId})
        .populate({path: 'songId', select: ['title', 'artist', 'album']})
        .sort({date: -1})
      histories = histories.map(history => history.toJSON())
      .map(history => _.extend({},
        history.songId,
        history
      ))
      res.send(_.uniqBy(histories, history => history.title))
    } catch (err) {
      res.status(500).send({
        error: 'An error occured when trying to fectch History.'
      })
    }
  },
  async post (req, res) {
    try {
      const {SongId} = req.body
      const UserId = req.user.id
      if (UserId && SongId) {
        const newHistory = await History.create({
          userId: UserId,
          songId: SongId
        })
        res.send(newHistory)
      } else {
        res.send(null)
      }
    } catch (err) {
      res.status(500).send({
        error: 'An error occured when trying to create history.'
      })
    }
  }
}
