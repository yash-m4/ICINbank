import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { TrnsdialogComponent } from '../trnsdialog/trnsdialog.component';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { MyApiService } from 'src/app/services/my-api.service';
import { Transaction } from 'src/app/models/transection';
import { TranshistoryComponent } from '../transhistory/transhistory.component';


@Component({
  selector: 'app-acount',
  templateUrl: './acount.component.html',
  styleUrls: ['./acount.component.css']
})
export class AcountComponent {
  users: User[] = [];
  transactions: Transaction[] = [];
  isAdmin:boolean=true;
  primaryBalance?:number;
  savingBalance?:number;
  isAccess:boolean=false;
  constructor(public dialog: MatDialog,private userService:UserService,private apiService:MyApiService) { }
//  for Admin 
  openEditDialog(user: User): void {
    debugger;
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '30cm',
      height: '8cm',
      data: user,
    },
    );

    dialogRef.afterClosed().subscribe(() => {
      // Handle dialog close if needed
    });
  }

   // Open Transaction Dialog
   openTransDialog(): void {
    const userId = sessionStorage.getItem('userId'); // Define userId here
    debugger;
    const deposit=true;
    const dialogReff = this.dialog.open(TrnsdialogComponent, {
      width: '18cm',
      height: '10cm',
      data: { userId, deposit }, // Pass the userId as data
    });

    dialogReff.afterClosed().subscribe(() => {
      
      this.pageLoad();
      // Handle dialog close if needed
    });
  }
    // Open Withdrawal Dialog
    openWithdrawalDialog(): void {
      const userId = sessionStorage.getItem('userId'); // Define userId here
      
      const deposit=false;
      const dialogReff = this.dialog.open(TrnsdialogComponent, {
        width: '15cm',
        height: '8cm',
        data: { userId, deposit }, // Pass the userId as data
      });
  
      dialogReff.afterClosed().subscribe(() => {
        this.pageLoad();
      });
    }

    openPrimaryAcDialog(): void {
      const userId = sessionStorage.getItem('userId'); // Define userId here
      this.apiService.getAllTransectionData().subscribe(
        {
          next: (response) => {
            debugger;
            this.transactions=response.prTh;
            const primary=true;
            const dialogReff = this.dialog.open(TranshistoryComponent, {
              width: '25cm',
              height: '10cm',
              data: {
                transactions: this.transactions,
                check: primary
              }
            });
        
            dialogReff.afterClosed().subscribe(() => {
              // Handle dialog close if needed
            });
          },
          error(error) {
            console.log("error", error);
          },
          complete() {
            console.log("Request Complete");
          }
        }
      )
    }

    
    openSavingAcDialog(): void {
      const userId = sessionStorage.getItem('userId'); // Define userId here
      this.apiService.getAllTransectionData().subscribe(
        {
          next: (response) => {
            debugger;
            this.transactions=response.sdTh;
            const primary=false;
            const dialogReff = this.dialog.open(TranshistoryComponent, {
              width: '25cm',
              height: '10cm',
              data: {
                transactions: this.transactions,
                check: primary
              }
            });
        
            dialogReff.afterClosed().subscribe(() => {
              debugger;
            });
          },
          error(error) {
            console.log("error", error);
          },
          complete() {
            console.log("Request Complete");
          }
        }
      )
   
    }


  ngOnInit() {
    this.pageLoad();
  };
  pageLoad(){
    if(sessionStorage.getItem('userRole')=='1'){
      this.isAdmin=true;
    }else{
      this.isAdmin=false;
    }
    if(sessionStorage.getItem('fnStatus')=='1'){
      this.isAccess=true;
    }else{
      this.isAccess=false;
    }
    this.apiService.getUserDetails().subscribe(
      {
        next: (response) => {
          debugger;
          console.log(response.data)
          this.users=response.data;
          console.log("users---",this.users)
        },
        error(error) {
          console.log("error", error);
        },
        complete() {
          console.log("Request Complete");
        }
      }

    )
    this.apiService.getAcountBalance().subscribe(
      {
        next: (response) => {
          debugger;
          debugger;
          this.primaryBalance=response.pAcB;
          this.savingBalance=response.sAcB;
        },
        error(error) {
          console.log("error", error);
        },
        complete() {
          console.log("Request Complete");
        }
      }
    )
  }
}
