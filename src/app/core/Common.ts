import { Injectable, OnInit } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class CommonService implements OnInit  { 

    private meses = [ "Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
    private dias = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];

    ngOnInit() {

    }

    public getMonthsEvent(startEventDate)
    {
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

        return eventMonths;
    }

    public getWeekEvent(atividades){

        if(atividades.length == 0)
        {
            let weeks = 
            [
                { Titulo: 'Semana 1', Concluido: false , Class: "week-open" },
                { Titulo: 'Semana 2', Concluido: false , Class: "week-open" },
                { Titulo: 'Semana 3', Concluido: false,  Class: "week-open" },
                { Titulo: 'Semana 4', Concluido: false , Class: "week-open" }
            ];

            return weeks;
        }


        

    }
}