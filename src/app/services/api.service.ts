import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {
    API_URL = 'http://localhost:3333';

    constructor(private httpClient: HttpClient){

    }

    autenticar(email, senha){   
        return this.httpClient.get(this.API_URL + '/atleta/login?email=' + email + '&senha=' + senha);
    }

    buscarEventoAtivo(user) : any {
        return this.httpClient.get(this.API_URL + '/eventoativoatleta?id_atleta=' + user._id);
    }

    buscarAtividadesPorEventoAtleta(user, id_evento) : any {
        return this.httpClient.get(this.API_URL + '/atividades?id_atleta=' + user._id + '&id_evento='+ id_evento);
    }
}