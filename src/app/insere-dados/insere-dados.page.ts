import { GoogleService, GeoCode } from './../shared/services/google.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation/ngx';
@Component({
  selector: 'app-insere-dados',
  templateUrl: './insere-dados.page.html',
  styleUrls: ['./insere-dados.page.scss'],
})

export class InsereDadosPage implements OnInit {
 

  
  form: FormGroup;
  submitted = false;
  idades: SelectIdade[] = new Array();
  constructor(public formBuilder: FormBuilder,
    private service: GoogleService,
    private geolocation: Geolocation) { }
  ngOnInit() {
    for (let index = 18; index < 100; index++) {
      let i = new SelectIdade();
      i.value = index;
      i.label = index.toString();
      this.idades.push(i);
    }
    this.form = this.formBuilder.group({
      nome: new FormControl('', Validators.required),
      idade: new FormControl('', Validators.required),
      cidade: new FormControl('', Validators.required),
      situacao: new FormControl('', Validators.required),
      combustivel: new FormControl('', Validators.required),
      trasmissao: new FormControl('', Validators.required),
      motorizacao: new FormControl(10, Validators.required),
      assentos: new FormControl('', Validators.required),
      consumo: new FormControl('', Validators.required),
      cor: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required),
      preco: new FormControl({
        lower: 20000, upper: 60000
      }, Validators.required)
    });
    this.capturaPosicao();
  }
  capturaPosicao() {
    this.geolocation.getCurrentPosition().then((resp) => {
      var location = {
        longitude: resp.coords.longitude,
        latitude: resp.coords.latitude
      }
      this.service.getGeocode(location).subscribe(
        (data: GeoCode) => {

          data.results.forEach(r => {
            if (r.types.includes('administrative_area_level_1')) {
              this.form.get('cidade').setValue(r.formatted_address);
            }
          }
          );

          ;

        },
        error => {
          console.error(error);
        }
      );
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
  onSubmit(values) {
    console.log(values);
    this.submitted = true;
    if (this.form.valid) {
      console.log(values);
    }

  }

}
export class SelectIdade {

  public value: number;
  public label: string;

}