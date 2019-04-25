import { DialogFlowService, Message } from './../shared/services/dialog-flow.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { IonContent } from '@ionic/angular';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage {
  @ViewChild(IonContent) content: IonContent;
  msg: string;
  resultados: Message[]

  constructor(private chatBoot: DialogFlowService) {
    this.initBoot();
  }
  onFocus() {
    this.scrollToBottom();
  }
  
  initBoot() {
    this.resultados = []
    this.chatBoot.responde('ola')
      .subscribe((lista: any) => {
        lista.result.fulfillment.messages.forEach((element) => {
          this.resultados.push({ remetente: 'bot', mensagem: element.speech, data: lista.timestamp })
          this.scrollToBottom();
        });
      })
  }

  sendMessage() {
    if (this.msg != '') {
      this.resultados.push({ remetente: 'user', mensagem: this.msg, data: new Date(), enviando: true });
      this.chatBoot.responde(this.removerAcentos(this.msg))
        .subscribe((lista: any) => {
          lista.result.fulfillment.messages.forEach((element) => {
            this.resultados.push({ remetente: 'bot', mensagem: element.speech, data: lista.timestamp })
          });
          this.resultados.forEach(r => {
            r.enviando = false;
          })
          this.scrollToBottom();
        })

      this.msg = '';
    }

  }
  scrollToBottom() {
    this.content.scrollToBottom(400);
  }

  private removerAcentos(s) {
    return s.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
  }

}
