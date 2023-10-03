import { Component ,ViewChild} from '@angular/core';
import { MyApiService } from 'src/app/services/my-api.service';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-usertransection',
  templateUrl: './usertransection.component.html',
  styleUrls: ['./usertransection.component.css']
})
export class UsertransectionComponent {
acNumber?:number;
confirmAcNumber?:number;
amount?:number;
message?:string;
acountType?:string;
submitDisable:boolean=false;
@ViewChild('myForm1') myForm!: NgForm;

constructor( public dialogRef: MatDialogRef<UsertransectionComponent>,private myapiService:MyApiService){}

  onSubmit(){
    debugger;
   if(this.acNumber==this.confirmAcNumber){
    debugger;
      this.myapiService.userDoTransection(this.acNumber!,this.amount!,this.acountType!).subscribe(
        {
          next: (response) =>{
            this.submitDisable=true;
            debugger;
            this.message=response.message;
            setTimeout(() => {
              this.message=''
              debugger;
              this.submitDisable=false;
              this.myForm.resetForm();
            }, 2000);
          }
        }
      )
   }else{
    this.message='Acounts Numbers Do not match ';
   }
  }
 
  closeDialog(){
    debugger;
    this.dialogRef.close(); 
  }
}
