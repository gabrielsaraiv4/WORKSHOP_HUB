import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  exibir(mensagem: string, tipo: 'sucesso' | 'erro' = 'sucesso') {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: tipo === 'sucesso' ? ['success-snackbar'] : ['error-snackbar']
    });
  }
}