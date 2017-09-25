import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule} from '@angular/forms';

import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LightStatesComponent } from './components/light-states/light-states.component';
import { LightService } from './services/light.service'
import { LightData } from './services/lightdata.service';
import { LightsComponent } from './components/lights/lights.component';


const appRoutes=[
  {path:'', component:DashboardComponent},
  {path:'light-states', component:LightStatesComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    LightStatesComponent,
    LightsComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpModule
  ],
  providers: [LightService, LightData],
  bootstrap: [AppComponent]
})
export class AppModule { }
