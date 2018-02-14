import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import { Elevator } from '../wire/elevator'

@Injectable()
export class BuildingService {

  constructor(
    private http:HttpClient
  ) { }

  getElevators(): Observable<Elevator[]> {
    return this.http.get<Elevator[]>("http://localhost:3000/api/building/elevators")
  }

}