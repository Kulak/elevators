import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { BuildingSection } from '../wire/buildingSection'

@Injectable()
export class BuildingService {

  constructor(
    private http:HttpClient
  ) { }

  getBuildingSection(): Observable<BuildingSection[]> {
    return this.http.get<BuildingSection[]>("http://localhost:3000/api/building/elevators")
  }

}