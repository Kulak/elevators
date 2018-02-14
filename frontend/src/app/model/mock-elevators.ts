import { Elevator } from '../wire/elevator'

let NextElevatorId: number = 1

export const BuildingElevators: Elevator[] = [
    new Elevator(NextElevatorId++, 0, 10, 0),
    new Elevator(NextElevatorId++, 0, 10, 0),
    new Elevator(NextElevatorId++, 10, 20, 0),
    new Elevator(NextElevatorId++, 10, 20, 0)
]