import { ReaisPipe } from './../shared/pipes/reais.pipe';

import { GoogleService } from './../shared/services/google.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { InsereDadosPage } from './insere-dados.page';
import { HttpClientModule } from '@angular/common/http';
const routes: Routes = [
  {
    path: '',
    component: InsereDadosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [InsereDadosPage,
    ReaisPipe],
  providers: [
    GoogleService,
    Geolocation
  ],
})
export class InsereDadosPageModule { }
