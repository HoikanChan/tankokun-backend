module.exports = mongoose => {
  const History = {
    model: null,
    name: 'History'
  }
  const schema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    songId: {type: mongoose.Schema.Types.ObjectId, ref: 'Song'},
    date: { type: Date, default: Date.now }
  })
  History.model = mongoose.model(History.name, schema)
  return History
}
