const bot = require("../config/bot");
const User = require("../models/user.model");

const HELP_MESSAGE = `
🤖 *Joke Bot Help Menu*

Available Commands:
/start - Initialize the bot
/enable - Resume receiving jokes
/disable - Pause receiving jokes
/set <n> - Set interval in minutes (e.g., /set 5)
`;

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text?.trim();

  if (!text) return;

  try {
    let user = await User.findOne({ chatId });

    // 1. /start
    if (text.toLowerCase() === "/start") {
      if (!user) {
        user = await User.create({ chatId });
      }
      return bot.sendMessage(chatId, `👋 *Welcome!*\n\nCurrently, I'm set to send jokes every ${user.frequency} minute(s).\n${HELP_MESSAGE}`, { parse_mode: "Markdown" });
    }

    // Ensure user exists before proceeding to other commands
    if (!user) {
      return bot.sendMessage(chatId, "Please type /start first.");
    }

    // 2. /enable
    if (text.toLowerCase() === "/enable") {
      if (user.isEnabled) {
        return bot.sendMessage(chatId, "ℹ️ Joke delivery is *already* enabled.", { parse_mode: "Markdown" });
      }
      user.isEnabled = true;
      await user.save();
      return bot.sendMessage(chatId, "✅ Joke delivery resumed!", { parse_mode: "Markdown" });
    }

    // 3. /disable
    if (text.toLowerCase() === "/disable") {
      if (!user.isEnabled) {
        return bot.sendMessage(chatId, "ℹ️ Joke delivery is *already* paused.", { parse_mode: "Markdown" });
      }
      user.isEnabled = false;
      await user.save();
      return bot.sendMessage(chatId, "⏸️ Joke delivery paused. Use /enable to resume.", { parse_mode: "Markdown" });
    }

    // 4. /set <number>
    // This regex looks for "/set" followed by one or more digits
    const setMatch = text.match(/^\/set\s+(\d+)$/i);
    if (setMatch) {
      const freq = parseInt(setMatch[1]);

      if (freq <= 0) {
        return bot.sendMessage(chatId, "❌ Please provide a number greater than 0.");
      }

      user.frequency = freq;
      await user.save();
      return bot.sendMessage(chatId, `⏱️ Frequency updated! You will now receive jokes every *${freq} minute(s)*.`, { parse_mode: "Markdown" });
    }

    // 5. Unknown Command (If it starts with / but didn't match anything above)
    if (text.startsWith("/")) {
      return bot.sendMessage(chatId, `❓ *Unknown Command*\n${HELP_MESSAGE}`, { parse_mode: "Markdown" });
    }

  } catch (error) {
    console.error("Bot Error:", error.message);
    bot.sendMessage(chatId, "⚠️ An error occurred while processing your request.");
  }
});