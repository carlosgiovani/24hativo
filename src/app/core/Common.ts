import { Injectable, OnInit } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class CommonService implements OnInit  { 
    public weekView_key = 'weekView_key';
    public DAY_VIEW_KEY = 'DAY_VIEW_KEY';
    private startIndexEventDate_key = 'startEventDate_key';    

    //private meses = [ "Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
    public dias = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];

    ngOnInit() {

    }

    public getIndextStartEventDate(){
        var retrievedObject = localStorage.getItem(this.startIndexEventDate_key);

        if(retrievedObject) {
            return JSON.parse(retrievedObject);
        }
    }


    GetEventoUsuario(dataInicial) {
        let evento = this.CriarEventoPadrao(dataInicial);

        return evento;
    }

    CriarEventoPadrao(dataInicial) { 

        let periodos = [];
        let nroSemana = 1;
        let nroDia = 1;
        let data = this.ConverterParaDateEhAcrescentarDias(dataInicial , 0);

        for(let p=0; p < 3; p++) {
            let qtdDiasAcrescentar = p == 0 ? 0 : p === 1 ? 28 : 56;
            let periodo = {
                Periodo : p + 1,  
                DataInicio: this.addDays(dataInicial , qtdDiasAcrescentar),
                Semanas: []
            };

            let dataInicioSemana = periodo.DataInicio;

            for(let s=0; s < 4; s++) { 

                var semana = { 
                    Titulo: 'Semana ' + nroSemana,
                    Numero: nroSemana, 
                    Concluida: false,
                    Class: 'week-closed',
                    DataInicio: dataInicioSemana,
                    Pontuacao: 0,
                    Tempo: 0,
                    TempoAtividade: 5,
                    Dias: [] 
                };
                
                dataInicioSemana = this.addDays(dataInicioSemana, 6);

                for(let d=0; d < 7; d++) { 
                    let data = this.addDays(dataInicial, nroDia -1);
                    var dia =  {
                        Titulo: 'Dia ' + nroDia,
                        Concluido: false,
                        Class: "day-closed",
                        Numero: nroDia,
                        Data : data,
                        Pontuacao: 0,
                        Tempo: 0
                    };

                    semana.Dias.push(dia);
                    nroDia++;
                };
        
                periodo.Semanas.push(semana);
                nroSemana++;	
            };  
            periodos.push(periodo);
        }

        return { Periodos: periodos } ;
    }

    setData(data, key) {
        localStorage.removeItem(key);
        localStorage.setItem(key, JSON.stringify(data));
    }

    getData(key){
        var retrievedObject = localStorage.getItem(key);

        if(retrievedObject) {
            return JSON.parse(retrievedObject);
        }
    }

    public formatarMinutos(time) { 
    var hours = Math.floor(time / 60);  
    var minutes = time % 60;
    return hours + ":" + minutes;         
    }


    addDays(date, days) {
        var result = new Date(date);
        var parametro = result.getDate() + 1;
        result.setDate(parametro + days);
        result.setHours(0);
        result.setMinutes(0);

        result.setSeconds(0);

        return result;
      }

      ConverterParaDateEhAcrescentarDias(date, days) {
        var result = new Date(date);
        var parametro = result.getDate() + 1;
        result.setDate(parametro + days);
        result.setHours(0);
        result.setMinutes(0);

        result.setSeconds(0);

        return result;
      }
}