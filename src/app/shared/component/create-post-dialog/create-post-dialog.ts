import { Component, inject, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { CustomPost } from '../../interfaces/custom-post.interface';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-create-post-dialog',
  imports: [ReactiveFormsModule, MatDialogContent],
  templateUrl: './create-post-dialog.html',
  styleUrl: './create-post-dialog.scss'
})
export class CreatePostDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {idUser: number},
    private dialogRef: MatDialogRef<CreatePostDialog>
  ) { }
  postsService = inject(PostService)
  formPost!: FormGroup;

  ngOnInit() {
    this.formPost = new FormGroup({
      title: new FormControl('', Validators.required), // FormControl with initial value and validator
      description: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
      if (this.formPost.valid) {
        let newPost: CustomPost = {
          title: this.formPost.value.title,
          description: this.formPost.value.description,
          usuarioID: this.data.idUser
        }
  
        this.postsService.create(newPost).subscribe({
          next: (postCriado) => {
            this.dialogRef.close(postCriado)
          }, 
          error: (err) => console.error('Erro ao criar post', err)
        })
      } else {
        console.log('Form is invalid.');
      }
    }
}
