const cron = require("node-cron");
const User = require("../models/user.model");
const bot = require("../config/bot");
const { getRandomJoke } = require("./joke.service");

const startScheduler = () => {
    
  cron.schedule("* * * * *", async () => {
    try {
      const users = await User.find({ isEnabled: true });

      const now = new Date();

      for (const user of users) {
        if (
          !user.lastSentAt ||
          (now - user.lastSentAt) / 60000 >= user.frequency
        ) {
          const joke = await getRandomJoke();

          await bot.sendMessage(user.chatId, joke);

          user.lastSentAt = new Date();
          await user.save();
        }
      }
    } catch (error) {
      console.error("Scheduler error:", error.message);
    }
  });
};

module.exports = { startScheduler };
