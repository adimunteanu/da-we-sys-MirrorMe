const mongoose = require("mongoose");
const express = require("express");
const {check, validationResult} = require("express-validator");
const auth = require("../middleware/auth.js");
mongoose.set('useFindAndModify', false);

const router = express.Router();

const Scoreboard = require("../model/Scoreboard.js")


/**
 * @method - POST
 * @param - /addScore
 * @description - add Score to DB
 */

router.post(
  "/addScore",
  auth,
  [
    check("nickname", "Please enter a valid nickname")
      .isString()
      .isLength({
        min: 4,
      }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const {nickname, score} = req.body;
    try {
      let userScore = await Scoreboard.findOne({
        nickname,
      });
      if (userScore) {
        return res.status(400).json({
          msg: "Nickname Already Exists",
        });
      }

      userScore = new Scoreboard({
        nickname,
        score,
      });

      await userScore.save();
      res.status(200).send("Score from "+ nickname + " uploaded");

    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }
  }
);


/**
 * @method - GET
 * @param - /scoreboard
 * @description - get all scores
 */

router.get("/getAll", auth, async (req, res) => {
  try {
    const allScores = await Scoreboard.find({}, function (err, scores) {
      var scoreMap = {};

      scores.forEach(function (userScore) {
        scoreMap[userScore._id] = userScore;
      });
      res.json(scoreMap);
    });
  } catch (e) {
    res.send({message: "Error in Fetching user"});
  }
});

/**
 * @method - PUT
 * @param - /update
 * @description - update Scoreboard Object from Given Nickname
 */

router.put("/update", auth, async (req, res) => { //REMOVED AUTHENTICATION FOR TESTING

  const {nickname, score} = req.body;
  try {
    let userScore = await Scoreboard.findOne({
      nickname,
    });
    if (!userScore) {
      return res.status(400).json({
        msg: "Nickname Not Found",
      });
    }

    const filter = { nickname: nickname};
    const update = { score: score };
    const scoreboard = await Scoreboard.findOneAndUpdate(filter, update,{new: true});

    res.status(200).send("Score from " + scoreboard.nickname +" updated to " + scoreboard.score);

  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error in Updating");
  }
});

/**
 * @method - DELETE
 * @param - /delete
 * @description - delete Nickname out of DB
 */

router.delete("/delete", auth, async (req, res) => { //REMOVED AUTHENTICATION FOR TESTING
  const {nickname} = req.body;
  try {

    let userScore = await Scoreboard.findOne({
      nickname,
    });

    if (!userScore) {
      return res.status(400).json({
        msg: "Nickname Not Found",
      });
    }

    Scoreboard.findOneAndDelete({nickname}, function (err) {
      if (err) console.log(err);
      console.log("Successful deletion");
    })

    res.status(200).send("Nickname And Score Deleted");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error in Deleting");
  }
});


module.exports = router;
