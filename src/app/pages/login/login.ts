import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../shared/services/login.service';
import { SnackBar } from '../../shared/services/snack-bar.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit {
  loginForm!: FormGroup;
  loginService = inject(LoginService);
  snackBarService = inject(SnackBar);
  router = inject(Router)

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
        next: () => {
          this.snackBarService.openSnackBar("Login realizado com sucesso!")
          setTimeout(() => {
            this.router.navigate(['home']);
          }, 1000)
        }
      })
    } else {
      this.snackBarService.openSnackBar("Preencha e-mail e senha.")
    }
  }
}
