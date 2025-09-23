import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomUsuario } from '../../interfaces/custom-usuario.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { UsuariosService } from '../../services/usuarios.service';
import { customUpdateUsuario } from '../../interfaces/custom-update-usuario.interface';

@Component({
  selector: 'app-edit-usuario-dialog',
  imports: [MatDialogContent, ReactiveFormsModule],
  templateUrl: './edit-usuario-dialog.html',
  styleUrl: './edit-usuario-dialog.scss'
})
export class EditUsuarioDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { user: CustomUsuario, userID: number },
    private dialogRef: MatDialogRef<EditUsuarioDialog>
  ) { }
  usuarioService = inject(UsuariosService)
  formEditUser!: FormGroup;

  ngOnInit() {
    this.formEditUser = new FormGroup({
      nome: new FormControl<string>(this.data.user.nome, Validators.required), // FormControl with initial value and validator
      email: new FormControl<string>(this.data.user.email, [Validators.required, Validators.email]),
    });
  }

  onSubmit() {
    if (this.formEditUser.valid) {
      let updateUser: customUpdateUsuario = {
        nome: this.formEditUser.value.nome,
        email: this.formEditUser.value.email,
        id: this.data.userID
      }

      this.usuarioService.update(updateUser).subscribe({
        next: () => {
          this.dialogRef.close(updateUser)
        }, 
        error: (err) => console.error('Erro ao criar usuário', err)
      })
    } else {
      console.log('Form is invalid.');
    }
  }
}
