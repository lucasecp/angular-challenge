import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
interface AddressFromApi {
  cep: string
  logradouro: string
  numero: string
  complemento: string
  uf: string
  localidade: string
  bairro: string
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  cep = '';
  street = '';
  number = '';
  complement = '';
  state = '';
  city = '';
  neighborhood = '';

  loading = false

  constructor(private http: HttpClient) {}

  onCepChange(){

    if (this.cep.length === 8) {
      this.loading = true
      this.http
      .get<AddressFromApi>(`https://viacep.com.br/ws/${this.cep}/json/`)
        .subscribe((data) => {
          this.street = data.logradouro;
          this.number = data.numero;
          this.complement = data.complemento;
          this.state = data.uf;
          this.city = data.localidade;
          this.neighborhood = data.bairro;
        }).add(() => {
          this.loading = false
     });
    }
  };
}
