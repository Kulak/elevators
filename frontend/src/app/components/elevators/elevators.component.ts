import { Component, OnInit } from '@angular/core'
import { Elevator } from '../../model/wire/elevator'
import { BuildingService } from '../../services/building.service'
import { BuildingSection } from '../../model/wire/buildingSection';

@Component({
  selector: 'app-elevators',
  templateUrl: './elevators.component.html',
  styleUrls: ['./elevators.component.css']
})
export class ElevatorsComponent implements OnInit {
  sections: BuildingSection[]
  selectedElevator: Elevator

  constructor(
    private buildingService: BuildingService
  ) {}

  ngOnInit() {
    this.buildingService.monitorBuildingSections().subscribe(
      (sections:BuildingSection[]) => {
        console.log("received update", typeof(sections), sections)
        if (this.selectedElevator) {
          // loaded data is a set of new objects with the same elevator IDs.
          //
          // find selected elevator object in the new graph
          // and set it or unset if not found
          // to preserve selection after data has been updated
          let id = this.selectedElevator.id
          this.selectedElevator = null
          sections.find(
            section => section.elevators.find(
                elevator => {
                  if (elevator.id == id) {
                    // assign new elevator object
                    this.selectedElevator = elevator
                    return true
                  }
                  return false
                }) != null
          )
        }
        this.sections = sections
      }
    )
  }

  onSelect(elevator: Elevator): void {
    this.selectedElevator = elevator
  }

}