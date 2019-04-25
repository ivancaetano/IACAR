import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogFlowService {
  private token: string = environment.tokenDialog;
  private session: string = session();
  constructor(private http: HttpClient) { }
  responde(query: string) {
    let data = {
      query: query,
      lang: 'pt-br',
      sessionId: this.session
    }


    return this.http.post(environment.endpointDialog, data, { headers: this.getHeaders() });
  }
  public getHeaders() {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${this.token}`);
    return headers;
  }

}
function session() {
  let length = 10;
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
export interface Message {
  remetente?: string;
  mensagem: string;
  data?: Date;
  enviando?:boolean;
}