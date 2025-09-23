import { Component, inject, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../interfaces/usuario';
import { MatDialog } from '@angular/material/dialog';
import { CreateDialogUsuarioComponent } from '../create-dialog-usuario-component/create-dialog-usuario-component';
import { PostsViewerComponent } from '../posts-viewer.component/posts-viewer.component';
import { switchMap } from 'rxjs';
import { CustomUsuario } from '../../interfaces/custom-usuario.interface';
import { EditUsuarioDialog } from '../edit-usuario-dialog/edit-usuario-dialog';
import { SnackBar } from '../../services/snack-bar.service';

@Component({
  selector: 'app-usuarios-component',
  imports: [],
  templateUrl: './usuarios-component.html',
  styleUrl: './usuarios-component.scss'
})
export class UsuariosComponent implements OnInit {
  usuarioService = inject(UsuariosService);
  usuariosList: Usuario[] = [];
  readonly dialog = inject(MatDialog);
  snackBarService = inject(SnackBar)

  ngOnInit(): void {
    this.get();
  }

  get() {
    return this.usuarioService.get().subscribe((usuarios) => {
      usuarios.map((user) => {
        this.usuariosList.push(user);
      })
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateDialogUsuarioComponent);

    dialogRef.afterClosed().subscribe((novoUsuario) => {
      if (novoUsuario) {
        //pega o objeto enviado pelo dialog e adiciona à nova lista
        this.usuariosList.push(novoUsuario);
      }
    });
  }

  openDialogPosts(id: number, nome: string) {
    this.dialog.open(PostsViewerComponent, {
      data: { id, nome }
    });
  }

  delete(id: number) {
    // apaga do banco
    this.usuarioService.delete(id).subscribe({
      next: () => {
        // apaga da do usuariosList
        const indice = this.usuariosList.findIndex(user => user.id === id);

        //quando retorna -1 é porque não encontrou o obj pelo id
        if (indice > -1) {
          this.usuariosList.splice(indice, 1);
        }

        this.snackBarService.openSnackBar("Usuário deletado com sucesso!")
      },
      error: (e) => console.log("Usuário não encontrado.")
    });
  }

  openDialogEditUser(user: CustomUsuario, userID: number) {
    const dialogRef = this.dialog.open(EditUsuarioDialog, {
      data: { user, userID }
    });

    dialogRef.afterClosed().subscribe({
      next: (userUpdated) => {
        // pega o indice
        const i = this.usuariosList.findIndex(user => user.id === userUpdated.id);
       
        // atualiza o objeto do array que está naquele indice
        this.usuariosList[i] = {
          email: userUpdated.email,
          id: userUpdated.id,
          nome: userUpdated.nome,
          posts: userUpdated.posts
        }
      }
    });
  }
}
