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

@Component({
  selector: 'app-posts-viewer.component',
  imports: [MatDialogContent, MatDialogActions],
  templateUrl: './posts-viewer.component.html',
  styleUrl: './posts-viewer.component.scss'
})
export class PostsViewerComponent implements OnInit{
  constructor(@Inject(MAT_DIALOG_DATA) public data: {id: number, nome: string}) { }
  readonly dialog = inject(MatDialog);
  usuariosService = inject(UsuariosService);
  postsList: Post[] = []

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(){
    return this.usuariosService.getPostsUserByID(this.data.id).subscribe((user) => {
      user.posts.map((post) => this.postsList.push(post))
    })
  }

  openDialogCreatePost(idUser: number){
    const dialogRef = this.dialog.open(CreatePostDialog, {
      data: {idUser}
    });

    dialogRef.afterClosed().subscribe((novoPost) => {
      if(novoPost){
        this.postsList.push(novoPost);
      }
    })
  }
}
