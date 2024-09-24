import { Injectable, inject } from '@angular/core';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  private _snackbar = inject(MatSnackBar)

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor() { }

  showMessage(message: string, action: string = 'X', type: 'success' | 'error') {
    this._snackbar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
      panelClass: type === 'success' ? ['snackbar-success'] : ['snackbar-error'],
    });
  }
}
