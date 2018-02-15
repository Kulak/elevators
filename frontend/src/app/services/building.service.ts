import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { BuildingSection } from '../wire/buildingSection'
import { Elevator } from '../wire/elevator';

@Injectable()
export class BuildingService {

  private websocket: WebSocket
  private websocketSubject$ = new BehaviorSubject<BuildingSection[]>([])
  private websocket$ = this.websocketSubject$.asObservable()

  constructor(
    private http:HttpClient
  ) { }

  /** 
   * Standard way to load list of elevators using GET method.
  */
  getBuildingSections(): Observable<BuildingSection[]> {
    return this.http.get<BuildingSection[]>("http://localhost:3000/api/building/elevators")
  }

  monitorBuildingSections(): Observable<BuildingSection[]> {
    if (this.websocket) {
      return this.websocket$
    }

    const destination = 'ws://localhost:3000/'
    this.websocket = new WebSocket(destination)

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

    // let subject = Observable.webSocket('ws://localhost:8081');
    // subject
    //   .retry()
    //   .subscribe(
    //      (msg) => console.log('message received: ' + msg),
    //      (err) => console.log(err),
    //      () => console.log('complete')
    //    );
    // subject.next(JSON.stringify({ op: 'hello' }));
    // return subject

    // const ws = new WebSocket('ws://localhost:3000/');
    // ws.addEventListener('open', (ev:Event) => {
    //   console.log("ws open", ev)
    // })
    // ws.addEventListener('message', (ev:Event) => {
    //   console.log("ws message", ev)
    // })
  }

}