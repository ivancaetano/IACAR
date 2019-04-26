import { DialogFlowService, Message, Mensagem, Dialogo } from './../shared/services/dialog-flow.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, OnDestroy } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { interval, Subscription } from 'rxjs';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnDestroy {
  @ViewChild(IonContent) content: IonContent;
  msg: string;
  resultados: Mensagem[];
  subscription: Subscription;
  rangeKM: number = 100;
  rangePreco: any = { lower: 20000, upper: 50000 };
  rangeAno: any = { lower: 2016, upper: 2019 };
  tipoEntrada: string = '';
  constructor(private chatBoot: DialogFlowService) {
    this.initBoot();

  }
  onFocus() {
    //const source = interval(1000);
    //this.subscription = source.subscribe(val => this.scrollToBottom());
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

  }
  initBoot() {
    this.resultados = []
    this.chatBoot.responde('ola')
      .subscribe((lista: Dialogo) => {
        this.insereMensagens(lista);
      })
  }
  insereMensagens(data: Dialogo) {
    let tempo = 0;
    this.tipoEntrada = '';
    data.result.fulfillment.messages
      .filter(m => m.type == 0)
      .forEach((element) => {

        setTimeout(() => {
          this.resultados.push({ icBot: true, mensagem: element.speech, data: data.timestamp, tipo: element.type });
          this.scrollToBottom();
        }, tempo);
        tempo = tempo + element.speech.length * 25;

      });
    data.result.fulfillment.messages
      .filter(m => m.type == 'suggestion_chips')
      .forEach((element) => {

        setTimeout(() => {
          this.resultados.push({ icBot: true, mensagem: element.speech, data: data.timestamp, tipo: element.type, opcoes: element.suggestions });
          this.scrollToBottom();
        }, tempo);
        tempo = tempo + 500;


      });

    setTimeout(() => {
      this.resultados.forEach(r => {
        r.enviando = false;
      });
      this.tipoEntrada = data.result.action;
      this.scrollToBottom();
    }, tempo);

  }
  selecionaOpcao(opcao: string, msg: Mensagem) {
    this.resultados = this.resultados.filter(item => item !== msg);
    this.resultados.push({ icBot: false, mensagem: opcao, data: new Date(), enviando: true, tipo: '0' });
    this.chatBoot.responde(this.removerAcentos(opcao))
      .subscribe(
        (lista: Dialogo) => {
          this.insereMensagens(lista);
        });
  }
  sendKM() {
    this.resultados.push({ icBot: false, mensagem: this.rangeKM + ' Km', data: new Date(), enviando: true, tipo: '0' });
    this.chatBoot.responde(this.rangeKM + ' Km')
      .subscribe(
        (lista: Dialogo) => {
          this.insereMensagens(lista);
        });
    this.rangeKM = 100;
  }
  sendPreco() {
    let msg = 'Preço entre ' + this.rangePreco.lower / 1000 + ' mil e ' + this.rangePreco.upper / 1000 + ' mil.'
    this.resultados.push({ icBot: false, mensagem: msg, data: new Date(), enviando: true, tipo: '0' });
    this.chatBoot.responde(msg)
      .subscribe(
        (lista: Dialogo) => {
          this.insereMensagens(lista);
        });
    this.rangeKM = 100;
  }
  sendAno() {
    let msg = 'Ano entre ' + this.rangeAno.lower + ' e ' + this.rangeAno.upper + '.'
    this.resultados.push({ icBot: false, mensagem: msg, data: new Date(), enviando: true, tipo: '0' });
    this.chatBoot.responde(msg)
      .subscribe(
        (lista: Dialogo) => {
          this.insereMensagens(lista);
        });
    this.rangeKM = 100;
  }
  sendMessage() {
    if (this.msg != '') {
      this.resultados.push({ icBot: false, mensagem: this.msg, data: new Date(), enviando: true, tipo: '0' });
      this.chatBoot.responde(this.removerAcentos(this.msg))
        .subscribe(
          (lista: Dialogo) => {
            this.insereMensagens(lista);
          });

      this.msg = '';
    }

  }
  scrollToBottom() {
    this.content.scrollToBottom(0);
  }
  private removerAcentos(s) {
    return s.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
  }

}
