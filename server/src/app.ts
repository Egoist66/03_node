import http from "http";
import { __DIR__ } from "./constants/constants.js";
import fs from "fs";
import { delay } from "./utils/delay.js";

export class App {
  static __PORT__: number = 3003;
  static #instance: http.Server = null;

  static init(): http.Server {
    if (App.#instance !== null) {
      console.log("Server already initialized");
      return App.#instance;
      
    } else {


      App.#instance = http.createServer(async (req, res) => {
        res.setHeader("Content-Type", "text/html");

        await App.route(req, res);
      });

      return App.#instance;
    }
  }

  static async route(req: http.IncomingMessage, res: http.ServerResponse) {
    switch (req.url) {
      case "/":
      case "/home": {
        fs.readFile(__DIR__ + "/pages/index.html", async (err, data) => {
          if (err) {
            res.writeHead(500);
            res.end();
          } else {
            res.writeHead(200);
            res.end(data);
          }
        });
        break;
      }
      case "/about": {
        await delay(1000);
        res.end("About");
        break;
      }

      default: {
        res.writeHead(404);
        res.end();
      }
    }
  }
}
