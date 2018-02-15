import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { take, catchError } from 'rxjs/operators'
import { of } from 'rxjs/observable/of';
import { BuildingSection } from '../model/wire/buildingSection'
import { Elevator } from '../model/wire/elevator';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { MessagesService } from './messages.service';

@Injectable()
export class BuildingService {

  private websocket: WebSocket
  private websocketSubject$ = new BehaviorSubject<BuildingSection[]>([])
  private websocket$ = this.websocketSubject$.asObservable()

  constructor(
    private http:HttpClient,
    private messagesSvc: MessagesService
  ) { }

  /** 
   * Standard way to load list of elevators using GET method.
  */
  getBuildingSections(): Observable<BuildingSection[]> {
    const url = "http://localhost:3000/api/building/elevators"
    return this.http.get<BuildingSection[]>(url)
  }

  /** 
   * Web socket based way of watching backend application state.
  */
  monitorBuildingSections(): Observable<BuildingSection[]> {
    if (this.websocket) {
      return this.websocket$
    }

    const url = 'ws://localhost:3000/'
    this.websocket = new WebSocket(url)

    this.websocket.onopen = () => {
      console.log("ws connected")
    }

    this.websocket.onmessage = (ev:MessageEvent) => {
      console.log("ws message", ev)
      let l: BuildingSection[] = JSON.parse(ev.data)
      let sections: BuildingSection[] = []
      l.forEach((s:BuildingSection) => {
        let section = new BuildingSection(s.bottomFloor, s.topFloor, [])
        s.elevators.forEach((e:Elevator)=>{
          let elevator = new Elevator(e.id, e.currentFloor, e.targetFloor, e.doorsClosed)
          section.elevators.push(elevator)
        })
        sections.push(section)
      })
      console.log("ws message data (object, class)", l, sections)
      this.websocketSubject$.next(sections)
    }
    return this.websocket$
  }

  /** Post changes to elevator with ID.
   * Server may not take some of the parameters.
   * For example, server currently implements only change to the target floor.
   */
  updateElevator(elevator:Elevator): Observable<Elevator> {
    let message = "Sent change to elevator " + elevator.id + 
    " with target floor " + elevator.targetFloor
    this.messagesSvc.add(message)

    const url = "http://localhost:3000/api/building/elevator"
    return this.http.post<Elevator>(url, elevator).pipe(
      catchError((error, caught)=>{ return this.handleError("update elevator", error, caught)})
    )
  }

  handleError<T>(action:string, error: any, caught: Observable<T>): Observable<T> {
    console.error(`Failed to ${action}:`, error, caught)
    let message:string
    if (error instanceof HttpErrorResponse) {
      message = error.message
    } else if (error instanceof ErrorEvent) {
      message = error.error.message
    } else {
      message = `server returned code ${error.status} with body "${error.error}"`
    }
    this.messagesSvc.add(`Failed to ${action}: ${message}`)
    return of(null)
  }

}