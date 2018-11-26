module.exports = mongoose => {
  const Song = {
    model: null,
    name: 'Song'
  }
  const schema = new mongoose.Schema({
    name: {
      type: String,
      unique: true
    },
    userId: String,
    albumImageUrl: String,
    tune: String,
    caps: String,
    pattern: String,
    tab: Array,
    author: {type: String, default: 'TabTube'},
    likedTimes: {type: Number, default: 0},
    dislikedTimes: {type: Number, default: 0},
    creatAt: { type: Date, default: Date.now }

  })
  Song.model = mongoose.model(Song.name, schema)
  return Song
}
