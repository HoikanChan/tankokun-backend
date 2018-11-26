module.exports = mongoose => {
  const Bookmark = {
    model: null,
    name: 'Bookmark'
  }
  const schema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    songId: {type: mongoose.Schema.Types.ObjectId, ref: 'Song'}
  })
  Bookmark.model = mongoose.model(Bookmark.name, schema)
  return Bookmark
}
