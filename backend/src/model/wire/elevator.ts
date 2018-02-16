// Elevator describes elevator specific state.
export class Elevator {
    constructor(
        // id uniquely identifies eleveator instance
        public id: number,
        // currentFloor points to the floor being occupied by the elevator.
        public currentFloor: number,
        // targetFloor is the floor to move elevator to.
        public targetFloor: number,
        public doorsClosed: boolean
    ) {}

    isIdle(): boolean {
        return (this.currentFloor == this.targetFloor) && this.doorsClosed
    }

    sendIdleTo(floor: number): boolean {
        if (this.isIdle()) {
            this.targetFloor = floor
            return true
        }
        return false
    }

    move() {
        let direction = 1
        if (this.targetFloor < this.currentFloor) {
            direction = -1
        }
        this.currentFloor += direction
        console.log("elevator %i moved to %i floor", this.id, this.currentFloor)
        // check if arrived
        if (this.targetFloor == this.currentFloor) {
            // arrived; open doors
            this.openDoors()
        }
    }

    openDoors() {
        if (this.doorsClosed) {
            this.doorsClosed = false
            console.log("elevator %i doors opened", this.id)
        }
    }

    closeDoors() {
        if (!this.doorsClosed) {
            this.doorsClosed = true
            console.log("elevator %i doors closed", this.id)
        }
    }

    closeDoorsAndSendTo(targetFloor: number):void {
        this.closeDoors()
        this.targetFloor = targetFloor
    }

}