import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";

import { AutenticacaoService } from '../services/autenticacao.service';

@Injectable({ providedIn: 'root' })
export class AuthAutenticacaoGuard implements CanActivate {
   

    constructor(private autenticacaoService: AutenticacaoService,
                private router: Router){}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean | Observable<boolean> | Promise<boolean> {
        if(!this.autenticacaoService.isLogged()) {
            this.router.navigate(['login'])
            return false;
        }
        return true;
    }
}