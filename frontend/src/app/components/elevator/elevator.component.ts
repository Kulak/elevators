import { Component, OnInit, Input } from '@angular/core'
import { MatDialog } from '@angular/material'
import  { Elevator } from '../../model/wire/elevator'
import { ElevatorControllerComponent } from '../elevator-controller/elevator-controller.component';
import { MessagesService } from '../../services/messages.service';
import { BuildingService } from '../../services/building.service';

@Component({
  selector: 'app-elevator',
  templateUrl: './elevator.component.html',
  styleUrls: ['./elevator.component.css']
})
export class ElevatorComponent implements OnInit {
  @Input() elevator: Elevator
  
  constructor(
    public dialog: MatDialog, 
    private messagesSvc: MessagesService,
    private buildingSvc: BuildingService
  ) { }

  ngOnInit() {
  }

  openDialog(): void {
    console.log("cloned elevator: ", this.elevator.clone())
    let dialogRef = this.dialog.open(ElevatorControllerComponent, {
      width: '250px',
      data: this.elevator.clone()
    })

    dialogRef.afterClosed().subscribe((result:Elevator) => {
      if (result != null) {
        console.log('The dialog was closed with', result)
        this.buildingSvc.updateElevator(result).subscribe(updatedElevator => {
          if (updatedElevator) {
            this.messagesSvc.add("Elevator updated: " + updatedElevator)
          }
        })
      }
    })
  }

}