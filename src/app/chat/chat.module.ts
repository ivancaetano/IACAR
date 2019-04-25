import { HttpClientModule } from '@angular/common/http';
import { ReaisPipe } from './../shared/pipes/reais.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChatPage } from './chat.page';
import { DialogFlowService } from '../shared/services/dialog-flow.service';

const routes: Routes = [
  {
    path: '',
    component: ChatPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    HttpClientModule
  ],
  declarations: [ChatPage],
  providers: [
    DialogFlowService
  ]
})
export class ChatPageModule { }
