module.exports = mongoose => {
  const LikeAndDislike = {
    model: null,
    name: 'LikeAndDislike'
  }
  const schema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    songId: {type: mongoose.Schema.Types.ObjectId, ref: 'Song'},
    like: {
      type: Boolean
    }
  })
  LikeAndDislike.model = mongoose.model(LikeAndDislike.name, schema)
  return LikeAndDislike
}
