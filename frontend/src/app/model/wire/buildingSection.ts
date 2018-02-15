import { Elevator } from './elevator'

/** 
 * BuildingSection plays a role of the container
 * holding all elevators for the section.
 * 
 * There is only 1 section in many buildings lower less than 12 or so floors.
 */
export class BuildingSection {
    constructor(
        // bottomFloor points to the lowest floor number 
        // on the building scale.
        public bottomFloor: number,
        // topFloor points to the highest floor number 
        // on the building scale.
        public topFloor: number,
        public elevators: Elevator[]
    ) {}

}