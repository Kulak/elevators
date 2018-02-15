import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ElevatorsComponent } from './components/elevators/elevators.component'

const routes: Routes = [
  { path: '', redirectTo: '/elevators', pathMatch: 'full' },
  { path: 'elevators', component: ElevatorsComponent }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }