import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,

} from '@angular/material/dialog';
import { UsuariosService } from '../../services/usuarios.service';
import { SnackBar } from '../../services/snack-bar.service';
import { CreateUsuario } from '../../interfaces/create-usuario.interface';

@Component({
  selector: 'app-create-dialog-usuario-component',
  imports: [MatDialogActions, MatDialogContent, ReactiveFormsModule],
  templateUrl: './create-dialog-usuario-component.html',
  styleUrl: './create-dialog-usuario-component.scss'
})
export class CreateDialogUsuarioComponent implements OnInit {
  formUser!: FormGroup;
  usuarioService = inject(UsuariosService);
  snackBarService = inject(SnackBar)

  constructor(
    private dialogRef: MatDialogRef<CreateDialogUsuarioComponent>,
  ) { }

  ngOnInit() {
    this.formUser = new FormGroup({
      nome: new FormControl('', Validators.required), // FormControl with initial value and validator
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit() {
    if (this.formUser.valid) {
      let newUser: CreateUsuario = {
        nome: this.formUser.value.nome,
        email: this.formUser.value.email,
        password: this.formUser.value.password
      }

      this.usuarioService.create(newUser).subscribe({
        next: (usuarioCriado) => {
          this.dialogRef.close(usuarioCriado)
          this.snackBarService.openSnackBar("Usuário criado com sucesso!")
        },
        error: (err) => {
          this.dialogRef.close()
          this.snackBarService.openSnackBar(err.error.message)
        }
      })
    } else {
      this.snackBarService.openSnackBar("Informe nome e e-mail.")
    }
  }
}
