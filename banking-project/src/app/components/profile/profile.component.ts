import { Component } from '@angular/core';
import { MyApiService } from 'src/app/services/my-api.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  fName?:string;
  lName?:string;
  email?:string;
  cNo?:number;
  uName?:string;
  pAss?:string;
  pAc?:string;
  sAc?:string;
  constructor(private apiService:MyApiService){}

  ngOnInit() {
    this.apiService.getAcountBalance().subscribe(
      {
        next: (response)=> {
          this.fName=response.fName;
          this.lName=response.lName;
          this.email=response.email;
          this.cNo=response.cNo;
          this.uName=response.uName;
          this.pAss=response.pAss;
          this.pAc=response.pAc;
          this.sAc=response.sAc;
        },
        error(err) {
          
        },
        complete() {
          
        },
      }
    )
  };

}
