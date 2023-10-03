import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
isAdmin:boolean=true;
ngOnInit(){
  if(sessionStorage.getItem('userRole')=='1'){
    this.isAdmin=true;
  }else{
    this.isAdmin=false;
  }
}
}
