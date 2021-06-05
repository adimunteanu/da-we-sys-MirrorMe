const mongoose = require("mongoose");
const express = require("express");
const {check, validationResult} = require("express-validator");
const auth = require("../middleware/auth.js");

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
      res.status(200).send("Score Uploaded");

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

router.get("/getAll", auth, async (req, res) => { //REMOVED AUTHENTICATION FOR TESTING
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


module.exports = router;
