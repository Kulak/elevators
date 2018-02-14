import { Component, OnInit } from '@angular/core'
import { Elevator } from '../../wire/elevator'
import { BuildingService } from '../../services/building.service'

@Component({
  selector: 'app-elevators',
  templateUrl: './elevators.component.html',
  styleUrls: ['./elevators.component.css']
})
export class ElevatorsComponent implements OnInit {
  elevators: Elevator[]
  selectedElevator: Elevator

  constructor(
    private buildingService: BuildingService
  ) {}

  ngOnInit() {
    this.buildingService.getElevators().subscribe(
      elevators => this.elevators = elevators
    )
  }

  onSelect(elevator: Elevator): void {
    this.selectedElevator = elevator
  }

}