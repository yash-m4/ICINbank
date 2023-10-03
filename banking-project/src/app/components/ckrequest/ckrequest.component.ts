import { Component } from '@angular/core';
import { MyApiService } from 'src/app/services/my-api.service';
import { CheckBookRequest } from 'src/app/models/ckRequest';

@Component({
  selector: 'app-ckrequest',
  templateUrl: './ckrequest.component.html',
  styleUrls: ['./ckrequest.component.css']
})
export class CkrequestComponent {
  selectedAccount: string = 'Primary'; // Default account
  description: string = '';
  message: string = ''
  admin: boolean = true
  ckReq = new CheckBookRequest()
  ckPending: CheckBookRequest[] = [];
  ckAapproved: CheckBookRequest[] = [];
  isPendingButtonClicked: boolean = true;
  isApprovedButtonClicked: boolean = false;
  constructor(private myapiService: MyApiService) { }

  ngOnInit() {
   
    this.myapiService.getcheckBookRequest().subscribe(
      {
        next: (response) => {
          debugger;
          if(sessionStorage.getItem('userRole')=='1'){
            this.admin=true;
          }else{
            this.admin=false;
          }
          for (const strArray of response.ckPending) {
            const ckAdd: CheckBookRequest = {
              userId: strArray[0], // Assuming id is a number
              userName: strArray[1],
              acountType: strArray[2],
              description: strArray[3],
              status: strArray[4],
              id:strArray[5],
              isApproved:false,
            };
            this.ckPending.push(ckAdd);
          }
          for (const strArray of response.ckApproved) {
            debugger;
            const ckAdd: CheckBookRequest = {
              userId: strArray[0], // Assuming id is a number
              userName: strArray[1],
              acountType: strArray[2],
              description: strArray[3],
              status: strArray[4],
              id:strArray[5],
              isApproved:true,
            };
            this.ckAapproved.push(ckAdd);
          }
        },
        error(error) {
          console.log(error)
        },
        complete() {

        },
      }
    )
  }
  submitRequest() {
    // Perform any action you need with the selected account and description
    console.log('Selected Account:', this.selectedAccount);
    console.log('Description:', this.description);
    const sAC = this.selectedAccount;
    const desc = this.description;
    this.ckReq.acountType = sAC
    this.ckReq.description = desc;
    this.myapiService.createRequest(this.ckReq).subscribe(
      {
        next: (response) => {
          debugger;
          this.message = response.message;
          setTimeout(() => {
            this.selectedAccount = 'Primary'
            this.description = ''
          }, 5000);
        },
        error(error) {

        },
        complete() {

        },
      }
    )

    debugger;

  }
  approvedReq() {
    this.isApprovedButtonClicked = true
    this.isPendingButtonClicked = false
  }
  pendingReq() {
    this.isPendingButtonClicked = true
    this.isApprovedButtonClicked = false

  }
  approvedRequest(req:CheckBookRequest){
    this.myapiService.approvePendingReq(req.id!,req.userId!).subscribe(
      {
        next: (response)=>{
          debugger;
          req.isApproved = true;
        },
        error(error){

        },
        complete() {
          
        },
      }
    )
debugger;
  }

}
