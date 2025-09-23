import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction, MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar-message',
  imports: [MatButtonModule, MatSnackBarLabel],
  templateUrl: './snack-bar-message.html',
  styleUrl: './snack-bar-message.scss'
})
export class SnackBarMessage {
  snackBarRef = inject(MatSnackBarRef);
  constructor(@Inject(MAT_SNACK_BAR_DATA) public mensagem: string) { }
}
