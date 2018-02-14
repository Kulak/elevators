import { Injectable } from '@angular/core'
import { Elevator } from '../wire/elevator'
import { BuildingElevators } from '../model/mock-elevators'
import { } from 'rxjs/Observable'

@Injectable()
export class BuildingService {

  constructor() { }

  getElevators(): Elevator[] {
    return BuildingElevators
  }

}
