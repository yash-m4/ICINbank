import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { MyApiService } from 'src/app/services/my-api.service';



@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent {
  user: User = new User();
  message:string=''
  @ViewChild('usernameCell') usernameCell!: ElementRef;
  @ViewChild('firstNameCell') firstNameCell!: ElementRef;
  @ViewChild('lstnameCell') lstnameCell!: ElementRef;
  @ViewChild('emailChange') emailChange!: ElementRef;
  @ViewChild('contactChange') contactChange!: ElementRef;
  @ViewChild('statusChnage') statusChnage!: ElementRef;
  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,private apiService:MyApiService) { }
  ngOnInit() {
    this.user = this.data
  }
  isChecked = false;
  closeDialog(): void {
    this.dialogRef.close();
  }
  onToggleChange() {
    console.log('Toggle changed to', this.isChecked);
  }
  assgin(use: User) {
    debugger;
    const userss = use
    console.log(use.firstName)
    const ccc = use.firstName;
  }

  onSubmit() {
    const newUsername = this.usernameCell.nativeElement.textContent;
    const newFirstName = this.firstNameCell.nativeElement.textContent;
    const newLastName = this.lstnameCell.nativeElement.textContent;
    const newEmail = this.emailChange.nativeElement.textContent;
    const newContact = this.contactChange.nativeElement.textContent;
    const newStatus = this.user.status
    const id:number= this.user.id!;
    const newfnStatus = this.user.functionAccess
    debugger;
    console.log('Username:', newUsername);
    console.log('First Name:', newFirstName);
    this.apiService.updateUserDetails(id,newUsername,newFirstName,newLastName,newEmail,newContact,newStatus,newfnStatus).subscribe(
      {
        next: (response) => {
          debugger;
          this.message=response.message
          setTimeout(() => {
            console.log("DCLosed Dialog");
            this.dialogRef.close();
          }, 5000)
          console.log(response.data)
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
  toggleStatus(user: User) {
    user.status = user.status === 1 ? 2 : 1; // Toggle between 1 and 2
    console.log(user.status)
  }
  functionStatus(user: User){
    user.functionAccess = user.functionAccess === 1 ? 2 : 1; // Toggle between 1 and 2
    console.log(user.functionAccess)
  }

}
