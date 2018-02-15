import * as express from "express"
import * as http from "http"
import * as webs from 'ws'
import * as url from 'url'

import { BuildingSection } from './wire/buildingSection'
import { BuildingSectionService } from "./buildingSection.service"
import { Elevator } from "./wire/elevator";
import { SceneService } from "./scene.service";
import { PeopleService, Person } from "./people.service";

const app = express();
const server = http.createServer(app);
let nextElevatorId = 1
const buildingSection = new BuildingSection(1, 8, [
    new Elevator(nextElevatorId++, 1, 1, true),
    new Elevator(nextElevatorId++, 1, 1, true),
    new Elevator(nextElevatorId++, 1, 1, true)
])
const buildingSectionSvc = new BuildingSectionService(buildingSection)

/* emulate changes to the building through scene */
const people = [
    // name, current floor, target floor
    new Person("Bob", buildingSection.topFloor, buildingSection.bottomFloor)//,
    // new Person("Alice", buildingSection.bottomFloor, buildingSection.topFloor),
    // new Person("Jeff", buildingSection.topFloor - 2, buildingSection.bottomFloor)
]
const peopleSvc = new PeopleService(buildingSectionSvc, people)
const sceneSvc = new SceneService(buildingSectionSvc, peopleSvc)
console.log("***start state***")
console.log(sceneSvc.describe())

const wss = new webs.Server({ server });

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
app.get("/api/building/elevators", (req,res)=>res.send(buildingSection))
app.get("/api/scene/cycle", (req,res)=>res.send(sceneSvc.oneCycle()))

let nextConnectionID = 1
wss.on('connection', (ws: webs, req: http.IncomingMessage) => {
        const location = url.parse(req.url, true);
        const connId = nextConnectionID++
        console.log("ws %i connected to %s", connId, req.url)
        ws.send(JSON.stringify(buildingSection))

        ws.on('message', (message: string) => {
            if (message == 'list') {
                console.log('ws %i list request', connId)
                ws.send(JSON.stringify(buildingSection))
            } else {
                console.log('ws %i unknown command: %s', connId, message)
                ws.send(`Error, unknown command -> ${message}`)
            }
        })

        ws.on('close', () => {
            console.log("ws %i closed", connId)
        })
})

/* TODO: detect dead web sockets */

const interval = setInterval(() => {
    // sceneSvc.oneCycle();
}, 10000);

server.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port ${server.address().port}`)
})