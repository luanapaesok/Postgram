import { inject, Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackBarMessage } from "../component/snack-bar-message/snack-bar-message";

@Injectable({
    providedIn: 'root'
})
export class SnackBar {
    private _snackBar = inject(MatSnackBar);

    openSnackBar(mensagem: string) {
        this._snackBar.openFromComponent(SnackBarMessage, {
            duration: 5 * 1000,
            data: mensagem
        });
    }
}