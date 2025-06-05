import { App } from "./app.js";

const server = App.create();



server.listen(App.config.PORT, async () => {
  console.log(`${App.config.APP_MSG} http://${App.config.HOST}:${App.config.PORT}`);
});




//fs.createReadStream(__DIR__ + '/server/src/server.config.json')
// .pipe(fs.createWriteStream('./dist/server2.config.json'));