import * as express from 'express'
import { BuildingSection } from '../model/wire/buildingSection'
import { Elevator } from '../model/wire/elevator';
import { Person } from './people.service';

/*
 * Service and its model are in one file,
 * with exception of wire level structures.
 */

// Tracks person in the elevator relationship.
// Placing location data into person, adding elevator to person,
// adding people to elevator makes model less "normalized" and 
// "denormalization" will complicate the application state management at fast rate.
//
// However, the model denormalization improves performance of the application.
//
// Clean model has been chosen instead of high performance.
export class ElevatorContainer {
    constructor(
        public elevator: Elevator,
        // or people to support multiple
        public person: Person = null
    ) {}

    public enter(person:Person):void {
        console.log("person %s entered elevator %i and is going to %i floor", 
            person.name, this.elevator.id, person.targetFloor)
        this.person = person
        this.elevator.closeDoorsAndSendTo(person.targetFloor)
    }

    public leave():boolean {
        console.log("preson %s left elevator %i", this.person.name, this.elevator.id)
        this.person.currentFloor = this.elevator.currentFloor
        this.person = null
        this.elevator.closeDoors()
        return true
    }
}

export class BuildingSectionService {
    private containers: ElevatorContainer[]
    private buildingSection: BuildingSection

    constructor() {
        let nextElevatorId = 1
        this.buildingSection = new BuildingSection(1, 8, [
            new Elevator(nextElevatorId++, 1, 1, true),
            new Elevator(nextElevatorId++, 1, 1, true),
            new Elevator(nextElevatorId++, 1, 1, true)
        ])
        this.containers = []
        this.buildingSection.elevators.forEach((elevator:Elevator) => {
            this.containers.push(new ElevatorContainer(elevator))
        })
    }

    getBuildingSection(): BuildingSection {
        return this.buildingSection
    }

    // Building section sends one elevator if there is idle elevator
    // and opens elevator doors when elevator is on the target floor.
    // returns elevator object with open doors or null otherwise.
    requestElevator(targetFloor: number): ElevatorContainer {
        let found:ElevatorContainer = null
        // check if there is elevator on the target floor
        found = this.containers.find((container:ElevatorContainer) => {
            if (container.elevator.currentFloor == targetFloor && container.person == null) {
                container.elevator.openDoors()
                return true
            }
            return false
        })
        if (found) {
            console.log("Elevator %i has arrived", found.elevator.id)
            return found
        }

        // check if elevator has been dispatched
        found = this.containers.find((container:ElevatorContainer) => {
            return container.elevator.targetFloor == targetFloor
        })
        if (found) {
            return null
        }

        // request an elevator from another floor
        this.containers.find((container:ElevatorContainer) => {
            let success: boolean = container.elevator.sendIdleTo(targetFloor)
            if (success) {
                let e = container.elevator
                console.log("Moving elevator %i from %i to %i floor", 
                    e.id, e.currentFloor, e.targetFloor)
            }
            return success
        })
        return null
    }

    findByPerson(targetPerson: Person):ElevatorContainer {
        return this.containers.find((container:ElevatorContainer) => {
            return container.person == targetPerson
        })
    }

    findByElevator(elevatorId: number):ElevatorContainer {
        return this.containers.find((container:ElevatorContainer) => {
            return container.elevator.id == elevatorId
        })
    }

    oneCycle(): void {
        this.containers.forEach((container:ElevatorContainer) => {
            let elevator = container.elevator
            if (elevator.targetFloor != elevator.currentFloor) {
                // move
                elevator.move()
            } else {
                // doors are open and on the target floor; close doors
                elevator.closeDoors()
            }
        })
    }

    state():Object {
        return {"buildingSection": this.buildingSection}
    }

    updateElevator(req: express.Request, res: express.Response) {
        console.log("update requested", req.body)
        let update = req.body // JSON.parse(req.body)
        let container = this.findByElevator(update.id)
        if (container) {
            let elevator = container.elevator
            // validate incoming data is in range
            if (update.targetFloor < this.buildingSection.bottomFloor
                || update.targetFloor > this.buildingSection.topFloor) 
            {
                console.error("400: Requested target floor %i is outside of valid range",
                    update.targetFloor)
                res.statusMessage = "Bad target floor number"
                res.sendStatus(400)
                return
            }
            elevator.targetFloor = update.targetFloor
            console.log("200: Forced elevator to go to floor %i", update.targetFloor)
            res.statusMessage = "Updated successfully"
            res.send(elevator)
            return
        }
        console.log("400: Failed to locate elevator container for id %i", update.id)
        res.statusMessage = "Bad elevator ID"
        res.sendStatus(400)
    }

}