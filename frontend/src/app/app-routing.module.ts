import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ElevatorsComponent } from './components/elevators/elevators.component'
import { PeopleComponent } from './components/people/people.component'

const routes: Routes = [
  { path: '', redirectTo: '/elevators', pathMatch: 'full' },
  { path: 'elevators', component: ElevatorsComponent },
  { path: 'people', component: PeopleComponent}
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }