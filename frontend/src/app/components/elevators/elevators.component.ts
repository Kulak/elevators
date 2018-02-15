import { Component, OnInit } from '@angular/core'
import { Elevator } from '../../wire/elevator'
import { BuildingService } from '../../services/building.service'
import { BuildingSection } from '../../wire/buildingSection';

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
    // classic polling way of doing things
    // this.buildingService.getBuildingSections().subscribe(
    //   (sections:BuildingSection[]) => {
    //     console.log("received building section", sections)
    //     this.sections = sections
    //   }
    // )
    this.buildingService.monitorBuildingSections().subscribe(
      (sections:BuildingSection[]) => {
        console.log("received update", typeof(sections), sections)
        this.sections = sections
      }
    )
  }

  onSelect(elevator: Elevator): void {
    this.selectedElevator = elevator
  }

}