const bot = require("../config/bot");
const User = require("../models/user.model");

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text?.trim();

  if (!text) return;

  try {
    let user = await User.findOne({ chatId });

    if (text === "/start") {
      if (!user) {
        user = await User.create({ chatId });
      }
      return bot.sendMessage(
        chatId,
        "Welcome!\nYou'll receive jokes every 1 minute.\n\nCommands:\nENABLE\nDISABLE\nSET <minutes>",
      );
    }

    if (!user) {
      return bot.sendMessage(chatId, "Please type /start first.");
    }

    if (text === "ENABLE" || text === "/enable") {
      user.isEnabled = true;
      await user.save();
      return bot.sendMessage(chatId, "✅ Joke delivery resumed");
    }

    if (text === "DISABLE" || text === "/disable") {
      user.isEnabled = false;
      await user.save();
      return bot.sendMessage(chatId, "⏸️ Joke delivery paused");
    }

    if (text.startsWith("SET") || text.startsWith("/set")) {
      const parts = text.split(" ");
      const freq = Number(parts[1]);

      if (!freq || freq <= 0) {
        return bot.sendMessage(
          chatId,
          "Usage: /set <minutes>\nExample: /set 5",
        );
      }

      user.frequency = freq;
      await user.save();

      return bot.sendMessage(
        chatId,
        `Frequency updated to ${freq} minute(s)`,
      );
    }
    return bot.sendMessage(chatId, "Unknown command ");
  } catch (error) {
    console.error("Bot command error:", error.message);
    bot.sendMessage(chatId, "Something went wrong. Please try again.");
  }
});
