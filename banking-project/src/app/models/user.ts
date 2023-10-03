import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class User {
    id?: number;
    firstName: string = '';
    lastName: string = '';
    email: string = '';
    contactNo: number = 0;
    userName: string = '';
    password: string = '';
    primaryaccountNumber?: number ;
    savingaccountNumber?: number ;
    status: number = 0;
    role: number = 0;
    isLoggedIn:Boolean=false
    functionAccess:number=0;

  }
  