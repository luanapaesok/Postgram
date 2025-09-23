import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home-component/home-component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: "Página Inicial"
    }
];
