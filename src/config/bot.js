const TelegramBot = require("node-telegram-bot-api");

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
  polling: true
});

bot.setMyCommands([
  {
    command: "start",
    description: "Start the bot and receive jokes"
  },
  {
    command: "enable",
    description: "Resume joke delivery"
  },
  {
    command: "disable",
    description: "Pause joke delivery"
  },
  {
    command: "set",
    description: "Set joke frequency in minutes (usage: /set 5)"
  }
]);

module.exports = bot;
