import http from "http";
import { __DIR__ } from "./constants/constants.js";
import fs from "fs";

import  serverConfigJSON from "./server.config.json" with { type: "json" };  
import { promisify } from "./utils/promisify.js";

const readFile = promisify(fs.readFile);




/**
 * This function initializes the application, setting up necessary configurations and starting the server.
 * It utilizes constants from the configuration file and a promisified version of the file system's readFile function.
 * The App class, located below, manages the server initialization and routing logic.
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
    } 
    else {
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
        await readFile(__DIR__ + "/pages/about.html", async (err, data) => {
          if (err) {
            res.writeHead(500);
            res.end('Error loading about.html');
          } else {
            res.writeHead(200);
            res.end(data);
          }
        });
        break;
      }

      default: {
        res.writeHead(404);
        res.end();
      }
    }
  }
}
