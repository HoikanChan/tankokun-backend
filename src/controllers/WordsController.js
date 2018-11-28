const { Words } = require("../models");
const sendResult = require("../utils/sendResult");
const request = require("superagent");
const config = require("../config/config");
const md5 = require("blueimp-md5");
function searchInYoudao(word) {
  const { url, key, appKey } = config.youdaoApi;
  const salt = new Date().getTime();
  const from = "";
  const to = "en";
  const sign = md5(appKey + word + salt + key);
  return request(url).query({
    q: word,
    appKey: appKey,
    salt: salt,
    from: from,
    to: to,
    sign: sign
  });
}
module.exports = {
  async search(req, res) {
    try {
      let requestingWord = req.params.word,
        result;

      const wordInDb = await Words.findOne({
        name: requestingWord
      });

      if (wordInDb) {
        result = wordInDb;
      } else {
        const youdaoRes = await searchInYoudao(requestingWord);
        const wordDetail = JSON.parse(youdaoRes.text);
        result = await Words.create({
          name: requestingWord,
          wordDetail
        });
      }
      sendResult.success(res, result);
    } catch (err) {
      sendResult.error(res, err);
    }
  },
  async index(req, res) {
    try {
      const search = req.query.search;
      let word = null;
      if (search) {
        const LIKE_SEARCH = new RegExp(search, "i");
        word = await Words.find({
          $or: [
            { title: LIKE_SEARCH },
            { album: LIKE_SEARCH },
            { artist: LIKE_SEARCH },
            { genre: LIKE_SEARCH }
          ]
        });
      } else {
        word = await Words.find().limit(10);
      }
      sendResult.success(res, word);
    } catch (err) {
      sendResult.error(res, err);
    }
  },
  async show(req, res) {
    try {
      const word = await Words.findOne({
        _id: req.params.wordId
      });
      res.success(res, word);
    } catch (err) {
      sendResult.error(res, err);
    }
  },
  async put(req, res) {
    try {
      await Words.findByIdAndUpdate(req.params.wordId, req.body);
      res.success(res, req.body);
    } catch (err) {
      sendResult.error(res, err);
    }
  },
  async post(req, res) {
    try {
      await Words.create(req.body);
      res.success(res);
    } catch (err) {
      sendResult.error(res, err);
    }
  }
};
