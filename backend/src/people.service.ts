import { BuildingSectionService } from "./buildingSection.service";
import { Elevator } from "./wire/elevator";

export class Person {
    constructor(
        public name: string,
        public currentFloor: number,
        public targetFloor: number,
        public lastFloor: number = currentFloor,
    ) {}

    public goBack(): void {
        console.log("person %s at %i floor goes back to %i floor", 
            this.name, this.currentFloor, this.lastFloor)
        this.targetFloor = this.lastFloor
        this.lastFloor = this.currentFloor
    }
}

/** 
 * People interract with the building.
*/
export class PeopleService {
    constructor(
        private buildingSectionSevice: BuildingSectionService,
        private people: Person[]
    ) {}

    public oneCycle():void {
        this.people.forEach((person:Person) =>{
            if (person.targetFloor == person.currentFloor) {
                person.goBack()
            }
            // work to our goal
            let container = this.buildingSectionSevice.findContainer(person)
            if (container == null)  {
                // not in elevator; call an elevator regardless if one has been called already
                console.log("people service: %s is not in any elevator", person.name)
                let arrivedContainer = this.buildingSectionSevice.requestElevator(person.currentFloor);
                if (arrivedContainer != null) {
                    // enter into elevator and send it to the target floor
                    this.buildingSectionSevice.enterElevator(arrivedContainer, person)
                }
            } else {
                // in elevator; check if it is time to leave the elevator
                console.log("person %s is in elevator %i", person.name, container.elevator.id)
                if (container.elevator.currentFloor == container.person.targetFloor) {
                    // leave elevator
                    this.buildingSectionSevice.leaveElevator(container)
                }
            }
        })
    }

    state():Object {
        return {"people": this.people}
    }
 
}