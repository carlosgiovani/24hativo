import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {
    API_URL = 'http://localhost:3333';
    eventos:any = [];
    rows: any;

    constructor(private httpClient: HttpClient){

    }

    autenticar(email, senha){   
        return this.httpClient.get(this.API_URL + '/atleta/login?email=' + email + '&senha=' + senha);
    }

    buscarEventoAtual(user){
        // this.httpClient
        //         .get(this.API_URL + '/eventosatleta?id_atleta=' + user._id)
        //         .subscribe( response => {
        //             this.rows = response;

        //             if(this.rows.eventosAtleta && this.rows.eventosAtleta.length !== 0){
                        
        //                 this.httpClient
        //                             .get(this.API_URL + '/eventos?id_evento=' + this.rows.eventosAtleta[0].id_evento)
        //                             .subscribe( respEvento => {
        //                                 return respEvento;
        //                             });

        //             }
        //         });
    }
}