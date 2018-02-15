import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Elevator } from '../../model/wire/elevator';

@Component({
  selector: 'app-elevator-controller',
  templateUrl: './elevator-controller.component.html',
  styleUrls: ['./elevator-controller.component.css']
})
export class ElevatorControllerComponent {

  constructor(
    public dialogRef: MatDialogRef<ElevatorControllerComponent>,
    @Inject(MAT_DIALOG_DATA) public elevator: Elevator
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
