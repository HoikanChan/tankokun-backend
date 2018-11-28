module.exports = mongoose => {
  const Bookmark = {
    model: null,
    name: 'Bookmark'
  }
  const schema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    wordId: {type: mongoose.Schema.Types.ObjectId, ref: 'Word'}
  })
  Bookmark.model = mongoose.model(Bookmark.name, schema)
  return Bookmark
}
