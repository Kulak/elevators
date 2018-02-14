import * as express from "express"
import { BuildingService } from "./building.service"

let app = express();
let buildingSvc = new BuildingService()

/* 
 * Allow CORS, production system needs to be restricted to proper domain names.
 * General CORS info:
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
 * 
 * This allows webbrowser to send request that was served by another domain.
 * For ExpressJS:
 * https://enable-cors.org/server_expressjs.html
 */
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

/* configure routes */ 
app.get('/', function (request: express.Request, response: express.Response) {
    response.send('This application service API requests and not the web files.');
})
app.get("/api/building/elevators", (req,res)=>buildingSvc.fillElevatorsList(req, res))

app.listen(3000)