import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomPost } from '../../interfaces/custom-post.interface';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { EditUsuarioDialog } from '../edit-usuario-dialog/edit-usuario-dialog';
import { CustomUpdatePost } from '../../interfaces/custom-update-post.interface';
import { PostService } from '../../services/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBar } from '../../services/snack-bar.service';

@Component({
  selector: 'app-edit-post-dialog',
  imports: [MatDialogContent, ReactiveFormsModule],
  templateUrl: './edit-post-dialog.html',
  styleUrl: './edit-post-dialog.scss'
})
export class EditPostDialog implements OnInit {
  editPostForm!: FormGroup;
  postService = inject(PostService)
  snackBarService = inject(SnackBar)

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { post: CustomUpdatePost },
    private dialogRef: MatDialogRef<EditUsuarioDialog>
  ) { }

  ngOnInit(): void {
    this.editPostForm = new FormGroup({
      title: new FormControl(this.data.post.title, Validators.required), // FormControl with initial value and validator
      description: new FormControl(this.data.post.description, [Validators.required]),
    });
  }

  onSubmit() {
    if (this.editPostForm.valid) {
      let updatePost: CustomUpdatePost = {
        title: this.editPostForm.value.title,
        description: this.editPostForm.value.description,
        id: this.data.post.id
      }

      this.postService.update(updatePost).subscribe({
        next: () => {
          this.dialogRef.close(updatePost)
          this.snackBarService.openSnackBar("Post alterado com sucesso!")
        },
        error: (err) => console.error('Erro ao editar post', err)
      })
    } else {
      console.log('Form is invalid.');
    }
  }
}
