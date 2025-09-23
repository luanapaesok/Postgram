import { Component, inject, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,

} from '@angular/material/dialog';
import { Post } from '../../interfaces/post';
import { UsuariosService } from '../../services/usuarios.service';
import { CreatePostDialog } from '../create-post-dialog/create-post-dialog';
import { CustomPost } from '../../interfaces/custom-post.interface';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-posts-viewer.component',
  imports: [MatDialogContent, MatDialogActions],
  templateUrl: './posts-viewer.component.html',
  styleUrl: './posts-viewer.component.scss'
})
export class PostsViewerComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number, nome: string }) { }
  readonly dialog = inject(MatDialog);
  usuariosService = inject(UsuariosService);
  postService = inject(PostService)
  postsList: Post[] = []

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    return this.usuariosService.getPostsUserByID(this.data.id).subscribe((user) => {
      user.posts.map((post) => this.postsList.push(post))
    })
  }

  openDialogCreatePost(idUser: number) {
    const dialogRef = this.dialog.open(CreatePostDialog, {
      data: { idUser }
    });

    dialogRef.afterClosed().subscribe((novoPost) => {
      if (novoPost) {
        this.postsList.push(novoPost);
      }
    })
  }

  delete(id: number) {
    // apaga do banco
    this.postService.delete(id).subscribe({
      next: () => {
        // apaga da usuariosList
        const indice = this.postsList.findIndex(post => post.id === id);

        //quando retorna -1 é porque não encontrou o obj pelo id
        if (indice > -1) {
          this.postsList.splice(indice, 1);
        }
      },
      error: (e) => console.log("Post não encontrado.")
    });
  }
}
