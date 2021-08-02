const mongoose = require("mongoose");

const ScoreSchema = mongoose.Schema({
  nickname: {
    type: String,
    required: true
  },
  score: {
    scoreTotal: {
      type: Number,
      required: true,
      default: 0,
    },
    scoreReddit: {
      type: Number,
      default: 0,
    },
    scoreInsta: {
      type: Number,
      default: 0,
    },
    scoreFacebook: {
      type: Number,
      default: 0,
    },
  },
});

// export model user with ScoreSchema
module.exports = mongoose.model("scoreboard", ScoreSchema);
