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
    let tempElevator = this.elevator.clone()
    console.log("cloned elevator: ", tempElevator)
    let dialogRef = this.dialog.open(ElevatorControllerComponent, {
      width: '250px',
      data: tempElevator
    })

    dialogRef.afterClosed().subscribe((result:Elevator) => {
      if (result != null) {
        console.log('The dialog was closed with', result)
        this.buildingSvc.updateElevator(result).subscribe(updatedElevator => {
          if (updatedElevator) {
            this.messagesSvc.add(`Elevator ${updatedElevator.id} updated`)
          } else {
            this.messagesSvc.add(`Elevator ${updatedElevator.id} completed with errors`)
          }
        })
      }
    })
  }

}