import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.css']
})
export class ConfirmacionComponent {
  constructor(
        public _dialog: MatDialog,
        public dialogRef: MatDialogRef<ConfirmacionComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
      ) { }
    
      si(): void {
        this.dialogRef.close(true);
      }
      no (): void {
        this.dialogRef.close(false);
      }
}
