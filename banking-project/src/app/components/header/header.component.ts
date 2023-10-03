import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UsertransectionComponent } from '../usertransection/usertransection.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isAdmin:boolean=true;
  isAccess:boolean=false;
constructor(private router:Router,public dialog: MatDialog){

}
ngOnInit() {
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
}
  logOut(){
    debugger;
    sessionStorage.clear()
   const isLog= sessionStorage.getItem('isLoggedIn');
    this.router.navigate(['/login'])
    
  }


  //  for Admin 
  transdialog(): void {
    debugger;
    const dialogRef = this.dialog.open(UsertransectionComponent, {
      width: '20cm',
      height: '12cm',
      // data: user,
    },
    );

    dialogRef.afterClosed().subscribe(() => {
      // Handle dialog close if needed
    });
  }

}
