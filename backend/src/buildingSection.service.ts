import { BuildingSection } from './model/wire/buildingSection'
import { Elevator } from './model/wire/elevator';
import { Person } from './people.service';

// Tracks person in the elevator relationship.
// We don't put it into the Elevator, because Elevator is a wire level object
// and we don't want to expose people data.
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

    findContainer(targetPerson: Person):ElevatorContainer {
        return this.containers.find((container:ElevatorContainer) => {
            return container.person == targetPerson
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

}