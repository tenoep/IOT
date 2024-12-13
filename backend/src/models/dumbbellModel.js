const mongoose = require("mongoose");

const dumbbellSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
    enum: ["on", "off", "charging", "broken"],
    default: "off",
  },
  chargeBattery: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    validate: {
      validator: async function (value) {
        const user = await mongoose.model("user").findById(value);
        return !!user;
      },
      message: "User does not exist",
    },
  },
  currentWeight: {
    type: Number,
    default: 0,
  },
});

const dumbbell = mongoose.model("dumbbell", dumbbellSchema);

module.exports = dumbbell;
