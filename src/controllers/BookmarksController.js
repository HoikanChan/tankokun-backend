const { Bookmark } = require("../models");
const sendResult = require("../utils/sendResult");

module.exports = {
  async index(req, res) {
    try {
      const { wordId } = req.query;
      const userId = req.user.id;
      let where = {
        userId: userId
      };
      if (wordId) {
        where.wordId = wordId;
      }
      let bookmark = await Bookmark.find(where);
      // .populate({path: 'wordId', select: ['title', 'artist', 'album']})
      bookmark = bookmark
        .map(bookmark => bookmark.toJSON())
        .map(bookmark => {
          return bookmark._id;
        });
      sendResult.success(res, bookmark);
    } catch (err) {
      sendResult.error(res, err);
    }
  },
  async post(req, res) {
    try {
      const { wordId } = req.body;
      const userId = req.user.id;
      if (userId && wordId) {
        const sameExistBookmark = await Bookmark.findOne({
          userId: userId,
          wordId: wordId
        });
        let newBookmark = null;
        if (!sameExistBookmark) {
          newBookmark = await Bookmark.create({
            userId: userId,
            wordId: wordId
          });
        }
        sendResult.success(res, newBookmark);
      } else {
        res.send(null);
      }
    } catch (err) {
      sendResult.error(res, err);
    }
  },
  async delete(req, res) {
    try {
      const { wordId } = req.query;
      const userId = req.user.id;
      let where = {
        userId: userId
      };
      if (wordId) {
        where.wordId = wordId;
      } else {
        throw '缺少参数 wordId'
      }
      const bookmarkToRemove = await Bookmark.deleteOne(where);
      sendResult.success(res, bookmarkToRemove);
    } catch (err) {
      sendResult.error(res, err);
    }
  }
};
