module.exports = mongoose => {
  const Words = {
    model: null,
    name: "Words"
  };
  const schema = new mongoose.Schema({
    name: {
      type: String,
      unique: true
    },
    wordDetail: mongoose.Schema.Types.Mixed,
    // userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    // likedTimes: {type: Number, default: 0},
    // dislikedTimes: {type: Number, default: 0},
    creatAt: { type: Date, default: Date.now }
  });
  Words.model = mongoose.model(Words.name, schema);
  return Words;
};
