import { Component, OnInit, Input } from '@angular/core'
import  { Elevator } from '../../wire/elevator'

@Component({
  selector: 'app-elevator',
  templateUrl: './elevator.component.html',
  styleUrls: ['./elevator.component.css']
})
export class ElevatorComponent implements OnInit {
  @Input() elevator: Elevator
  
  constructor() { }

  ngOnInit() {
  }

}
