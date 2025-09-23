import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,

} from '@angular/material/dialog';
import { UsuariosService } from '../../services/usuarios.service';
import { CustomUsuario } from '../../interfaces/custom-usuario.interface';
import { SnackBar } from '../../services/snack-bar.service';

@Component({
  selector: 'app-create-dialog-usuario-component',
  imports: [MatDialogActions, MatDialogContent, ReactiveFormsModule],
  templateUrl: './create-dialog-usuario-component.html',
  styleUrl: './create-dialog-usuario-component.scss'
})
export class CreateDialogUsuarioComponent implements OnInit{
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
    });
  }

  onSubmit() {
    if (this.formUser.valid) {
      let newUser: CustomUsuario = {
        nome: this.formUser.value.nome,
        email: this.formUser.value.email
      }

      this.usuarioService.create(newUser).subscribe({
        next: (usuarioCriado) => {
          this.dialogRef.close(usuarioCriado)
          this.snackBarService.openSnackBar("Usuário criado com sucesso!")
        }, 
        error: (err) => console.error('Erro ao criar usuário', err)
      })
    } else {
      console.log('Form is invalid.');
    }
  }
}
