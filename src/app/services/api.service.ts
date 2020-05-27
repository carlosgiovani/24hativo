import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
    API_URL = environment.urlBase;

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

    cadastrarAtividade(atividade){   
        return this.httpClient.post(this.API_URL + '/atleta/login?email=', 
        {
            "atleta": {
                "_id": atividade.id_atleta
              },
            "evento": {
                "_id": atividade.id_evento
              },
              "semana": atividade.sena,
              "dia": atividade.dia,
              "tempo": atividade.tempo,
              "concluido": atividade.concluido,
              "pontuacao": atividade.pontuacao,
              "pontuacao_mensagem": atividade.pontuacao_mensagem,
              "observacao": atividade.observacao,
              "data_cadastro": atividade.data_cadastro,
              "esforco": atividade.esforco
        });
    }
}