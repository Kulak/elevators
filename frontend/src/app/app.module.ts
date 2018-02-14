import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { ElevatorsComponent } from './components/elevators/elevators.component'
import { ElevatorComponent } from './components/elevator/elevator.component'
import { BuildingService } from './services/building.service'

@NgModule({
  declarations: [
    AppComponent,
    ElevatorsComponent,
    ElevatorComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    BuildingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
