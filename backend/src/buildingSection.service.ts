import { BuildingSection } from './wire/buildingSection'
import { Elevator } from './wire/elevator';
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
}

export class BuildingSectionService {
    private containers: ElevatorContainer[]

    constructor(
        private buildingSection: BuildingSection
    ) {
        this.containers = []
        buildingSection.elevators.forEach((elevator:Elevator) => {
            this.containers.push(new ElevatorContainer(elevator))
        })
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

    enterElevator(container:ElevatorContainer, person:Person):void {
        console.log("person %s entered elevator %i and is going to %i floor", 
            person.name, container.elevator.id, person.targetFloor)
        container.person = person
        container.elevator.closeDoorsAndSendTo(person.targetFloor)
    }

    leaveElevator(container:ElevatorContainer):boolean {
        console.log("preson %s left elevator %i", container.person.name, container.elevator.id)
        container.person.currentFloor = container.elevator.currentFloor
        container.person = null
        container.elevator.closeDoors()
        return true
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