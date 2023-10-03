import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {tap} from 'rxjs';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

export const loginGaurd = () => {
    const router = inject(Router);
    const service = inject(UserService)
    const authser = inject(AuthService)
    // const islogchek=authser.loggedIn;
    // console.log("islogged",service.getUser());
    // const isLoggedIn=service.getUser();
    // const isLog=service.getisLog()
    debugger;
     const isLoggedIn=sessionStorage.getItem('isLoggedIn');
     if(isLoggedIn){
      return true;
     }else{
      router.navigate(['/login'])
      return false;
     }
    //  very Importent Dont Remove 
  //   return service.isAvailable().pipe(
  //   tap((value) => {
  //     return !value ? router.navigate(['/login']) : true
  //   }
  // ))
}

// Class for Auth gaurd which is decrepted
// // auth.guard.ts
// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//   constructor(private userService: UserService, private router: Router) {}

//   canActivate(): boolean {
//     const user = this.userService.getUser();

//     if (user && user.isLoggedIn) {
//       return true; // Allow access to /dashboard
//     } else {
//       this.router.navigate(['/login']);
//       return false; // Redirect to login page
//     }
//   }
// }
