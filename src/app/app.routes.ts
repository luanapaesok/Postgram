import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home-component/home-component';
import { Login } from './pages/login/login';
import { AuthGuard } from './guards/auth.guards';

export const routes: Routes = [
    {
        path: '', 
        component: Login,
        title: 'Faça Login'
    },
    {
        path: 'home',
        component: HomeComponent,
        title: "Página Inicial", 
        canActivate: [AuthGuard]
    },
];
