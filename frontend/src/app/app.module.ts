import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { MatListModule, MatExpansionModule } from '@angular/material'

import { AppComponent } from './app.component'
import { ElevatorsComponent } from './components/elevators/elevators.component'
import { ElevatorComponent } from './components/elevator/elevator.component'
import { BuildingService } from './services/building.service'

/*
NOTE: import angular material modules after BrowserModule, because order matters.
*/
@NgModule({
  declarations: [
    AppComponent,
    ElevatorsComponent,
    ElevatorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatListModule,
    MatExpansionModule
  ],
  providers: [
    BuildingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
