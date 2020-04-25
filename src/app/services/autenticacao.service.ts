import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AutenticacaoService {
    private user_atleta_key = 'user_atleta_key';
    private user;

    constructor(){

    }

    getUser(){

        var retrievedObject = localStorage.getItem(this.user_atleta_key);

        if(retrievedObject) {
            this.user = JSON.parse(retrievedObject);
        }

        return this.user;
    }

    isLogged(){

        var retrievedObject = localStorage.getItem(this.user_atleta_key);

        if(retrievedObject) {
            return true;
        }

        return false;
    }

    checkAndSaveIfValid(data){

        if(!data.atleta || data.atleta.length === 0 || data.length > 1){
            return false;
        }

        const atleta = data.atleta[0];
        this.user = 
        { 
            "_id" : atleta._id, 
            "Nome": atleta.nome, 
            "Email": atleta.email 
        };;

        localStorage.setItem(this.user_atleta_key, JSON.stringify(this.user));

        return true;
    }
}