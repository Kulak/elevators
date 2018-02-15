import { BuildingSectionService } from "./buildingSection.service";
import { PeopleService } from "./people.service";

/** 
 * SceneService provides emulation of the building environment.
 * It provides environment to which people with goals belong
 * and through wich people navigate to get to the target floor.
*/
export class SceneService {
    constructor(
        private buildingSectionService: BuildingSectionService,
        private peopleService: PeopleService,
    ) {}

    public oneCycle():string {
        console.log("***cycle***")
        // the order of the steps is not important
        this.peopleService.oneCycle()
        this.buildingSectionService.oneCycle()
        let description = this.describe()
        console.log(description)
        return description
    }

    public describe(): string {
        return JSON.stringify([
            this.buildingSectionService.state(),
            this.peopleService.state()
        ])
    }
}