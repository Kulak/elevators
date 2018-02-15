// Elevator
// 
// Building scale for floor numbers.
// There are 2 scales when elevator is concerned.
// 1st scale is intuitive to the user and it is a building scale
// of floor numbers.  
// For example, elevator services floors 10 through 20
// and numbers are 10 to 20 on the building scale.
// 
// Negative numbers on the building scale represent floors
// below street level.
//
// Zero number on the building scale represents street level.
// 
// Numbers above zer0 represent floors above street level.
export class Elevator {
    constructor(
        // id uniquely identifies eleveator instance
        public id: number,
        // currentFloor points to the floor being occupied by the elevator.
        //
        // floating value is used to represent the status of the elevator
        // between the floors.
        //
        // If the current floor number is within 0.0001 it is considered
        // that elevator has safely reached the floor and doors can be 
        // opened.
        public currentFloor: number,
        public targetFloor: number,
        public doorsClosed: boolean
    ) {}

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

}