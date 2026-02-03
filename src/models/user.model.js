const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  chatId: {
    type: String,
    required: true,
    unique: true
  },
  isEnabled: {
    type: Boolean,
    default: true
  },
  frequency: {
    type: Number,
    default: 1 
  },
  lastSentAt: {
    type: Date,
    default: null
  }
});

module.exports = mongoose.model("User", userSchema);
