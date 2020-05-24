import { Injectable, OnInit } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class CommonService implements OnInit  { 
    public weekView_key = 'weekView_key';
    private weekInfo_key = 'weekInfo_key';
    private monthInfo_key = 'monthInfo_key';
    private startIndexEventDate_key = 'startEventDate_kye';    

    private meses = [ "Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
    public dias = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];

    ngOnInit() {

    }

    public getIndextStartEventDate(){
        var retrievedObject = localStorage.getItem(this.startIndexEventDate_key);

        if(retrievedObject) {
            return JSON.parse(retrievedObject);
        }
    }

    public getMonthsEvent(startEventDate)
    {
        var retrievedObject = localStorage.getItem(this.monthInfo_key);

        if(retrievedObject) {
            return JSON.parse(retrievedObject);
        }

        let dataArray = startEventDate.split('-');
        let firstMonth = dataArray[1] - 1;
        let secondMonth = firstMonth + 1 === 12 ? 0: firstMonth + 1;
        let thirdMonth = secondMonth + 1 === 12 ? 0: secondMonth + 1;

        const currentMonth = new Date().getMonth();

        let eventMonths = 
        [
            { 
                Value: firstMonth, 
                CurrentMonth: firstMonth === currentMonth ? 'selected' : '', 
                Description: this.meses[firstMonth] 
            },
            { 
                Value: secondMonth, 
                CurrentMonth:secondMonth === currentMonth ? 'selected' : '',  
                Description: this.meses[secondMonth] 
            },
            { 
                Value: thirdMonth,  
                CurrentMonth:thirdMonth === currentMonth ? 'selected' : '', 
                Description: this.meses[thirdMonth] 
            }
        ];

        localStorage.setItem(this.monthInfo_key, JSON.stringify(eventMonths));

        return eventMonths;
    }

    public getWeekInfo(atividades, dataInicio){
        var retrievedObject = localStorage.getItem(this.weekInfo_key);

        if(retrievedObject) {
            return JSON.parse(retrievedObject);
        }

        return this.getWeekEvent(atividades, dataInicio);
    }

    
    getWeekEvent(atividades, dataInicio){
        
        let dataInicioParametro = this.addDays(dataInicio,0);


        this.setData(dataInicioParametro.getDay(), this.startIndexEventDate_key);

        let semana01 = this.addDays(dataInicio,6);
        let semana02 = this.addDays(semana01,6);
        let semana03 = this.addDays(semana02,6);
        let semana04 = this.addDays(semana03,6);

        let semana05 = this.addDays(semana04,6);
        let semana06 = this.addDays(semana05,6);
        let semana07 = this.addDays(semana06,6);
        let semana08 = this.addDays(semana07,6);

        let semana09 = this.addDays(semana08,6);
        let semana10 = this.addDays(semana09,6);
        let semana11 = this.addDays(semana10,6);
        let semana12 = this.addDays(semana11,6);

        let mesAtivo = dataInicioParametro <= semana04 ? 1 : dataInicioParametro <= semana07 ? 2 : 3;

        let semanaAtual01 = mesAtivo === 1 ? 1 : mesAtivo === 2 ? 5 : 9;
        let semanaAtual02 = semanaAtual01 + 1;
        let semanaAtual03 = semanaAtual02 + 1;
        let semanaAtual04 = semanaAtual03 + 1;

        let dataAtualParametro = this.addDays(new Date(), -1);
        let semanaAtiva = 1;

        if(mesAtivo === 1) {
            semanaAtiva = dataAtualParametro <= semana01 ? 1 : dataAtualParametro <= semana02 ? 2 : dataAtualParametro <= semana03 ? 3 : 4; 
        }
        if(mesAtivo === 2) {
            semanaAtiva = dataAtualParametro <= semana05 ? 5 : dataAtualParametro <= semana06 ? 6 : dataAtualParametro <= semana07 ? 7 : 8; 
        }
        if(mesAtivo === 3) {
            semanaAtiva = dataAtualParametro <= semana09 ? 9 : dataAtualParametro <= semana10 ? 10 : dataAtualParametro <= semana11 ? 11 : 12; 
        }

        let weeks = 
        [
            { 
                Titulo: 'Semana ' + semanaAtual01,
                InfoSemana: this.buscarDadosPorSemana(atividades, semanaAtual01), 
                Class: (semanaAtiva == semanaAtual01 ? "week-open" : "week-closed") 
            },
            { 
                Titulo: 'Semana ' + semanaAtual02, 
                InfoSemana: this.buscarDadosPorSemana(atividades, semanaAtual02) , 
                Class: (semanaAtiva == semanaAtual02 ? "week-open" : "week-closed") 
            },
            { 
                Titulo: 'Semana ' + semanaAtual03, 
                InfoSemana: this.buscarDadosPorSemana(atividades, semanaAtual03),  
                Class: (semanaAtiva == semanaAtual03 ? "week-open" : "week-closed") 
            },
            { 
                Titulo: 'Semana ' + semanaAtual04, 
                InfoSemana: this.buscarDadosPorSemana(atividades, semanaAtual04) , 
                Class: (semanaAtiva == semanaAtual04 ? "week-open" : "week-closed") 
            }
        ];

        localStorage.setItem(this.weekInfo_key, JSON.stringify(weeks));

        return weeks;

    }

    buscarDadosPorSemana(atividades: any, semana : number){

        let semanaAtual = atividades.filter(x => x.semana === semana);
        var tempo = 0;
        var pontos = 0;

        let retorno = semanaAtual.reduce( ({} , semanaAtual ) => { 
             tempo += semanaAtual.tempo;
             pontos += semanaAtual.pontuacao;

            return {
                tempo: this.formatarMinutos(tempo),
                pontuacao: pontos
            };
        }, { tempo:0, pontuacao:0, concluida : false });

        retorno.atividades = semanaAtual;
        retorno.concluida = semanaAtual.length === 7;

        return retorno;
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
        return result;
      }
}