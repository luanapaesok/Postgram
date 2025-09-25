import { inject, Injectable } from "@angular/core";
import { LoginService } from "../shared/services/login.service";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  router = inject(Router)
  constructor(
    private authService: LoginService
  ) { }

  canActivate() {
    if(this.authService.logado()){
      return true
    } else {
      this.router.navigate(['home']);
      return false
    }
  }
}