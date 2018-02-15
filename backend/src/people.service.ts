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
    private people: Person[] = []

    constructor(
        private sectionSvc: BuildingSectionService,
    ) {
        let section = sectionSvc.getBuildingSection()
        this.people = [
            // name, current floor, target floor
            new Person("Bob", section.topFloor, section.bottomFloor),
            new Person("Alice", 2, 4)
            // new Person("Jeff", buildingSection.topFloor - 2, buildingSection.bottomFloor)
        ]
    }

    public oneCycle():void {
        this.people.forEach((person:Person) =>{
            if (person.targetFloor == person.currentFloor) {
                person.goBack()
            }
            // work to our goal
            let container = this.sectionSvc.findContainer(person)
            if (container == null)  {
                // not in elevator; call an elevator regardless if one has been called already
                console.log("people service: %s is not in any elevator", person.name)
                let arrivedContainer = this.sectionSvc.requestElevator(person.currentFloor);
                if (arrivedContainer != null) {
                    // enter into elevator and send it to the target floor
                    arrivedContainer.enter(person)
                }
            } else {
                // in elevator; check if it is time to leave the elevator
                console.log("person %s is in elevator %i", person.name, container.elevator.id)
                if (container.elevator.currentFloor == container.person.targetFloor) {
                    // leave elevator
                    container.leave()
                }
            }
        })
    }

    state():Object {
        return {"people": this.people}
    }
 
}