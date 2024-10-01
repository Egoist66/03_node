import http from "http";
import { __DIR__ } from "./constants/constants.js";
import fs from "fs";
import { delay } from "./utils/delay.js";

import serverConfigJSON from "./server.config.json" assert { type: "json" };
import { promisify } from "./utils/promisify.js";

const readFile = promisify(fs.readFile);

/**
 * The App class is the main class of the application. It creates an instance of an HTTP server and listens on a specified port.
 * The server is configured to handle GET requests for the root ('/') and '/about' paths.
 * The server is also configured to handle POST requests for the '/about' path.
 * The server uses the 'fs' module to read the contents of the 'index.html' file and the 'about.html' file and return them as the response to the GET requests.
 * The server also uses the 'delay' function to simulate a delay in responding to the GET and POST requests.
 * The server is configured to listen on port 3003 and to log a message to the console when it is listening.
 * @class App
 * @author Farid
 * @since 2023-02-24
 * @version 1.0.0
 */

export class App {
  static config: typeof serverConfigJSON.config = serverConfigJSON.config;
  static #instance: http.Server = null;

  /**
   * Initializes the server instance if it has not been initialized already.
   *
   * @param {function} [callback=(req: http.IncomingMessage, res: http.ServerResponse) => void] - Optional callback function to be executed for each request.
   * @return {http.Server} The server instance.
   */
  static init(
    callback?: (req: http.IncomingMessage, res: http.ServerResponse) => void
  ): http.Server {
    if (App.#instance !== null) {
      console.log("Server already initialized");
      return App.#instance;
    } else {
      App.#instance = http.createServer(async (req, res) => {
        res.setHeader("Content-Type", "text/html");

        if (callback) callback(req, res);
        else await App.route(req, res);
      });

      return App.#instance;
    }
  }

  static async route(req: http.IncomingMessage, res: http.ServerResponse) {
    switch (req.url) {
      case "/":
      case "/home": {

     
        await readFile(__DIR__ + "/pages/index.html", async (err, data) => {
          if (err) {
            res.writeHead(500);
            res.end('Error loading index.html');
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
