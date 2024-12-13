const mongoose = require("mongoose");

const serieSchema = new mongoose.Schema({
  weightGoal: {
    type: Number,
    default: 0,
  },
  weightDone: {
    type: Number,
    default: 0,
  },
  // timeGoal and timeDone are in seconds
  timeGoal: {
    type: Number,
    default: 0,
  },
  timeDone: {
    type: Number,
    default: 0,
  },
  repetitionsGoal: {
    type: Number,
    default: 0,
  },
  repetitionsDone: {
    type: Number,
    default: 0,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    validate: {
      validator: async function (value) {
        // Check if a user with the given ID exists
        const user = await mongoose.model("user").findById(value);
        return !!user; // Return true if user exists, false otherwise
      },
      message: "Owner does not exist",
    },
  },
  dumbbellId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "dumbbell",
    validate: {
      validator: async function (value) {
        // Check if a dumbbell with the given ID exists
        const dumbbell = await mongoose.model("dumbbell").findById(value);
        return !!dumbbell; // Return true if dumbbell exists, false otherwise
      },
      message: "Dumbbell does not exist",
    },
  },
  dateCreation: {
    type: Date,
    default: Date.now,
  },
  dateDone: {
    type: Date,
  },
});

const Serie = mongoose.model("serie", serieSchema);
module.exports = Serie;
