import { App } from "./app.js";
const server = App.init();
server.listen(App.__PORT__, async () => {
    console.log(`Server running on http://localhost:${App.__PORT__}`);
});
//# sourceMappingURL=index.js.map