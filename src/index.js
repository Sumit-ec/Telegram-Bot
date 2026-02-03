const app = require("./app");
const { startScheduler } = require("./services/scheduler.service");

require("./bot/commands");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  startScheduler();
});
