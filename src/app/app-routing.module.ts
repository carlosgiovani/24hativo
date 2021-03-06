import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthAutenticacaoGuard } from './core/auth-autenticacao';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule), canActivate : [AuthAutenticacaoGuard] },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./cadastro/cadastro.module').then( m => m.CadastroPageModule),
    canActivate : [AuthAutenticacaoGuard] 
  },
  {
    path: 'week',
    loadChildren: () => import('./week/week.module').then( m => m.WeekPageModule),
    canActivate : [AuthAutenticacaoGuard] 
  },
  {
    path: 'day',
    loadChildren: () => import('./day/day.module').then( m => m.DayPageModule),
    canActivate : [AuthAutenticacaoGuard]
  },
  {
    path: 'modal',
    loadChildren: () => import('./components/modal/modal.module').then( m => m.ModalPageModule),
    canActivate : [AuthAutenticacaoGuard]
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
