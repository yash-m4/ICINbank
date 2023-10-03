import { Component } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Transaction } from 'src/app/models/transection';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-transhistory',
  templateUrl: './transhistory.component.html',
  styleUrls: ['./transhistory.component.css']
})
export class TranshistoryComponent {
history:Transaction[]=[]
primary?:boolean;
userId?:number;
  constructor(public dialogRef: MatDialogRef<TranshistoryComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {
    debugger;
    // Now you can access this.data.transactions and this.data.check
   this.history =data.transactions;
    this.primary = data.check;
    this.userId=Number(sessionStorage.getItem('userId'))

  }
  closeDialog(){
    this.dialogRef.close(); 
  }
}
