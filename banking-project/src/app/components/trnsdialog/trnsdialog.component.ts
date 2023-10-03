import { Component, Inject ,ViewChild} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { MyApiService } from 'src/app/services/my-api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-trnsdialog',
  templateUrl: './trnsdialog.component.html',
  styleUrls: ['./trnsdialog.component.css']
})
export class TrnsdialogComponent {
  user: User = new User();
  loginuserId:number=0;
  selectedAccountType: string = 'Primary';
  creditCardNumber: string = '';
  amountToAdd: number = 0;
  amountTowithdtraw:number=0;
  isDeposit?:boolean;
  message:string=''
  @ViewChild('myForm') myForm!: NgForm;
  @ViewChild('myForm1') myForm1!: NgForm;
  constructor(
    public dialogRef: MatDialogRef<TrnsdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userId: number; deposit: boolean }, private apiService: MyApiService) { }
  ngOnInit() {
    debugger;
    this.loginuserId = this.data.userId
    this.isDeposit=this.data.deposit
  }
  onDeposit(): void {
    debugger;
    this.apiService.depositMoney(this.loginuserId,this.amountToAdd,this.selectedAccountType,this.creditCardNumber).subscribe(
      {
        next: (response) => {
          this.message = response.message;
          setTimeout(() => {
            this.message=''
            this.myForm.resetForm();
          }, 2000);
        },
        error: (err) => {
          if (err.error && err.error.message) {
            this.message = err.error.message;
          } else {
            this.message = 'An error occurred during the deposit.';
          }
        },
        complete: () => {
          // Handle completion (if needed)
        },
      }
    )
  }

  onwithdrawal(): void {
    debugger;
    this.apiService.withdrawalMoney(this.loginuserId,this.amountTowithdtraw,this.selectedAccountType).subscribe(
      {
        next: (response) => {
          this.message = response.message;
          setTimeout(() => {
            this.message=''
            this.myForm1.resetForm();
          }, 2000);
        },
        error: (err) => {
          if (err.error && err.error.message) {
            this.message = err.error.message;
          } else {
            this.message = 'An error occurred during the deposit.';
          }
        },
        complete: () => {
          // Handle completion (if needed)
        },
      }
    )
  }

  closeDialog(){
    debugger;
    this.dialogRef.close(); 
  }
}
