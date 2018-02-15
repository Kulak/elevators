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
    this.buildingService.getBuildingSection().subscribe(
      (sections:BuildingSection[]) => {
        console.log("received building section", sections)
        this.sections = sections
      }
    )
  }

  onSelect(elevator: Elevator): void {
    this.selectedElevator = elevator
  }

}