import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { CustomUsuario } from '../interfaces/custom-usuario.interface';
import { customUpdateUsuario } from '../interfaces/custom-update-usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  readonly urlAPI = "http://localhost:3000/usuarios";
  htppClient = inject(HttpClient);

  get(){
    return this.htppClient.get<Usuario[]>(this.urlAPI)
  }

  getUserByID(id: number){
    return this.htppClient.get(`${this.urlAPI}/${id}`)
  }

  getPostsUserByID(id: number){
    return this.htppClient.get<Usuario>(`${this.urlAPI}/${id}`);
  }

  create(user: CustomUsuario){
    return this.htppClient.post<CustomUsuario>(this.urlAPI, user)
  }

  delete(id: number){
    return this.htppClient.delete(`${this.urlAPI}/${id}`)
  }

  update(user: customUpdateUsuario){
    return this.htppClient.patch(`${this.urlAPI}/${user.id}`, user)
  }
}
