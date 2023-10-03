import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MyApiService } from 'src/app/services/my-api.service';
import { Router ,Navigation} from '@angular/router';
import { User } from 'src/app/models/user'; 
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
username:string='';
password:string='';
isloggedIn:Boolean=false
message:string=''


constructor(private apiservice:MyApiService,private router:Router,private user:User, private userService: UserService,private authService: AuthService){}
  // form =new FormGroup(
  //   {
  //     username:new FormControl("",[Validators.required,Validators.minLength(4),Validators.maxLength(10)]),
  //     password:new FormControl("",[Validators.required,Validators.minLength(8)])
  //   }
  // )
  login(data:any){
  this.apiservice.authLogin(this.username,this.password).subscribe({
    next :(response)=> {
      debugger;
      if(response.status){
        const user: User = {
          id:response.data.id,
          firstName:response.data.firstName,
          lastName: response.data.firstName,
          email: response.data.firstName,
          contactNo:response.data.firstName,
          userName: response.data.firstName,
          password: response.data.firstName,
          primaryaccountNumber: response.data.firstName ,
          savingaccountNumber:response.data.firstName,
          status: response.data.firstName,
          role: response.data.firstName,
          isLoggedIn:true,
          functionAccess:data.functionAccess
        };
        debugger;
        this.authService.loggedIn = true;
        sessionStorage.setItem('isLoggedIn','true' );
        sessionStorage.setItem('user',response.data.userName);
        sessionStorage.setItem('userId',response.data.id);
        sessionStorage.setItem('userRole',response.data.role);
        sessionStorage.setItem('fnStatus',response.data.functionAccess);
        sessionStorage.setItem('token',"Bearer dgguydgedjnnnnkkndekdnekddk");
        this.userService.setisLog()
        this.userService.setUser(user);
        this.router.navigate(['/dashboard']);
      }else{
        this.message=response.message
      }
      
    },
    error: (error) => {
      debugger;
      this.message = error.error.message;
      console.log("error", error);
    },
    complete(){
      console.log("Request Complete");
    }
  })
}
}
