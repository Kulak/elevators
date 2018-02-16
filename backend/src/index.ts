import * as express from "express"
import * as http from "http"
import * as webs from 'ws'
import * as url from 'url'
import * as bodyParser from 'body-parser'

import { BuildingSectionService } from "./services/buildingSection.service"
import { SceneService } from "./services/scene.service";
import { PeopleService, Person } from "./services/people.service";

const app = express();
app.on('error', (err) => {
    console.error("Error: ", err)
})
const server = http.createServer(app);

const sectionSvc = new BuildingSectionService()

/* emulate changes to the building through scene */
const sceneSvc = new SceneService(sectionSvc, new PeopleService(sectionSvc))
console.log("***start state***")
console.log(sceneSvc.describe())

const wss = new webs.Server({ server });

app.use(bodyParser.json())
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
    res.header("Access-Control-Allow-Origin", "*")
    //res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
    res.header("Access-Control-Allow-Headers", 
        "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
    next();
});

/* configure routes */ 
app.get('/', function (request: express.Request, response: express.Response) {
    response.send('This application service API requests and not the web files.');
})
app.get("/api/building/elevators", (req,res)=>res.send([sectionSvc.getBuildingSection()]))
app.get("/api/scene/cycle", (req,res)=>res.send(sceneSvc.oneCycle()))
app.post("/api/building/elevator", (req,res)=>sectionSvc.updateElevator(req, res))

/* web socket server related */
let nextConnectionID = 1
let wsSessions:webs[] = []
wss.on('connection', (ws: webs, req: http.IncomingMessage) => {
        wsSessions.push(ws)
        const location = url.parse(req.url, true);
        const connId = nextConnectionID++
        console.log("ws %i connected to %s", connId, req.url)
        ws.send(JSON.stringify([sectionSvc.getBuildingSection()]))

        ws.on('message', (message: string) => {
            if (message == 'list') {
                console.log('ws %i list request', connId)
                ws.send(JSON.stringify([sectionSvc.getBuildingSection()]))
            } else {
                console.log('ws %i unknown command: %s', connId, message)
                ws.send(`Error, unknown command -> ${message}`)
            }
        })

        ws.on('close', () => {
            console.log("ws %i closed", connId)
            let idx = wsSessions.indexOf(ws, 0)
            if (idx > -1) {
                wsSessions.splice(idx, 1)
                console.log("removed web socket, total active: %i", wsSessions.length)
            } else {
                console.error("Failed to locate ws")
            }
        })

        ws.on('error', (err) => {
            console.error("Web socket ERROR", err)
            // to generate error:
            // open web socket and terminate the client application abruptly
            // by closing web socket window in chrome
            // This generates an error that will crash the process unless this handler exists
            // 
            // close event is generated automatically after the error event
        })
})

const interval = setInterval(() => {
    sceneSvc.oneCycle();
    wsSessions.forEach((ws:webs) => {
        ws.send(JSON.stringify([sectionSvc.getBuildingSection()]))
    })
}, 5 * 1000);

server.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port ${server.address().port}`)
})