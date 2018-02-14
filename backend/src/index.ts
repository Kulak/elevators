import * as express from "express"
import { BuildingService } from "./building.service"

let app = express();
let buildingSvc = new BuildingService()

app.get('/', function (request: express.Request, response: express.Response) {
    response.send('This application service API requests and not the web files.');
})
app.get("/api/building/elevators", (req,res)=>buildingSvc.fillElevatorsList(req, res))

app.listen(3000)