import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLog:Boolean=false;
  getisLog(){
    return this.isLog;
  }
  setisLog(){
    this.isLog=true;
  }

  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  setUser(user: User): void {
    this.userSubject.next(user);
  }

  getUser(): User | null {
    return this.userSubject.value;
  }

  getUserName(): string | undefined {
    return this.userSubject.value?.userName;
  }

  logout(): void {
    this.userSubject.next(null);
  }
  isAvailable() {
    return of(this.userSubject.value?.isLoggedIn).pipe(
      tap((v) => console.log(v))
    )
  }
}
