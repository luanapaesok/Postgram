import { Component } from '@angular/core';
import { UsuariosComponent } from '../../shared/component/usuarios-component/usuarios-component';

@Component({
  selector: 'app-home-component',
  imports: [UsuariosComponent],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss'
})
export class HomeComponent {

}
