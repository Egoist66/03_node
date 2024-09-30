import { App } from "./app.js";

const server = App.init();


server.listen(App.config.PORT, async () => {
  console.log(`${App.config.APP_MSG} http://${App.config.HOST}:${App.config.PORT}`);
});