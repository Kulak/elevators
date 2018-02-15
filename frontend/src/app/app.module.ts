import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { MatListModule, MatExpansionModule, MatIconModule, MatIcon
} from '@angular/material'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component'
import { ElevatorsComponent } from './components/elevators/elevators.component'
import { ElevatorComponent } from './components/elevator/elevator.component'
import { BuildingService } from './services/building.service';
import { AppRoutingModule } from './/app-routing.module'

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
    MatExpansionModule,
    NoopAnimationsModule,
    MatIconModule,
    AppRoutingModule
  ],
  providers: [
    BuildingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
