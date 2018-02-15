import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { // list is sorted alphabetically
  MatButtonModule,
  MatDialogModule,
  MatExpansionModule, 
  MatIcon, 
  MatIconModule, 
  MatInputModule,
  MatListModule, 
  MatSidenavModule, 
  MatToolbarModule, 
} from '@angular/material'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component'
import { ElevatorsComponent } from './components/elevators/elevators.component'
import { ElevatorComponent } from './components/elevator/elevator.component'
import { BuildingService } from './services/building.service';
import { AppRoutingModule } from './/app-routing.module';
import { PeopleComponent } from './components/people/people.component';
import { ElevatorControllerComponent } from './components/elevator-controller/elevator-controller.component';
import { MessagesComponent } from './components/messages/messages.component'
import { MessagesService } from './services/messages.service';

/*
NOTE: import angular material modules after BrowserModule, because order matters.
*/
@NgModule({
  declarations: [
    AppComponent,
    ElevatorsComponent,
    ElevatorComponent,
    PeopleComponent,
    ElevatorControllerComponent,
    MessagesComponent
  ],
  entryComponents: [
    ElevatorControllerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // list is sorted alphabetically below this line
    MatButtonModule,
    MatDialogModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    NoopAnimationsModule,
  ],
  providers: [
    BuildingService,
    MessagesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
