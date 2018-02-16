// Elevator represents the state of the elevator.
export class Elevator {
    constructor(
        // id uniquely identifies eleveator instance
        public id: number,
        // currentFloor points to the floor being occupied by the elevator.
        // It is an integer.
        public currentFloor: number,
        // targetFloor tracks floor to get to.
        // It is an integer.
        public targetFloor: number,
        // doorsClosed tracks doors closed vs open status.
        public doorsClosed: boolean
    ) {}

    // movementStatus provides a short description of the status.
    //
    // It is a helper method for HTML template.
    // The same logic is harder to implement in the template.
    movementStatus():string {
        let delta = this.currentFloor-this.targetFloor
        if (delta == 0) {
            if (this.doorsClosed) {
                return ""
            } else {
                return "doors open"
            }
        } else if (delta < 0) {
            return "going up"
        } else {
            return "going down"
        }
    }

    clone():Elevator {
        return new Elevator(this.id, this.currentFloor, 
            this.targetFloor, this.doorsClosed);
    }

}