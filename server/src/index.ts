import http from "http";
import { __DIR__ } from "./constants/constants.js";
import fs from "fs";
import { delay } from "./utils/delay.js";

const __PORT__: number = 3003;

const app = http.createServer(async (req, res) => {


  switch(req.url){
    case "/":
    case '/home': {
      fs.readFile(__DIR__ + "/pages/index.html", (err, data) => {

        if(err){
          res.writeHead(500);
          res.end();
        }
        else {
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
  
});

app.listen(__PORT__, async () => {
  console.log(`Server running on http://localhost:${__PORT__}`);
});
