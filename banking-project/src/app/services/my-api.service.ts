import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '../models/user';
import { CheckBookRequest } from '../models/ckRequest';

@Injectable({
  providedIn: 'root'
})
export class MyApiService {
  private apiUrl = 'http://localhost:8082/user';
  private apiUrlD = 'http://localhost:8082/dash';
  constructor(private http: HttpClient) { }

  authLogin(userName: string, password: string): Observable<any> {
    const params = new HttpParams().set('userName', userName).set('password', password);
    return this.http.get(`${this.apiUrl}/login`, { params })

  }
  userRegister(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/registerUser`, user);
  }
  getUserDetails(): Observable<any> {
    return this.http.get(`${this.apiUrlD}/userAcount`);
  }
  updateUserDetails(id: number, userName: string, firstName: string, lastName: string, email: string, contactNo: number, status: number,fnStatus:number): Observable<any> {
    const params = new HttpParams().set('id', id).set('userName', userName).set('firstName', firstName).set('lastName', lastName).set('email', email).set('contactNo', contactNo).set('status', status).set('fnStatus',fnStatus);
    debugger;
    return this.http.get(`${this.apiUrlD}/updateUser`,{params});
  }
  createRequest(ckReq:CheckBookRequest):Observable<any> {
    ckReq.userId=Number(sessionStorage.getItem("userId"))
    return this.http.post(`${this.apiUrlD}/createCBRequest`,ckReq);
  }
  getcheckBookRequest(): Observable<any>{
    return this.http.get(`${this.apiUrlD}/getckRequest`);
  }
  approvePendingReq(Id: number, userId: number): Observable<any> {
    const params = new HttpParams()
      .set('Id', Id.toString()); 
    return this.http.post(`${this.apiUrlD}/approveReq`, null, { params });
  }
  depositMoney(creditId: number, amount: number,amountType:string,depositeMedium:string): Observable<any> {
    debugger;
    const params = new HttpParams()
    .set('debitId',0).set('creditId',creditId).set('amount',amount).set('amountType',amountType)
      .set('depositeBy', 0).set('depositeMedium',depositeMedium);
    return this.http.post(`${this.apiUrlD}/depostAmount`, null, { params });
  }

  withdrawalMoney(debitId: number, amount: number,amountType:string): Observable<any> {
    debugger;
    const params = new HttpParams()
    .set('debitId',debitId).set('amount',amount).set('amountType',amountType);
    return this.http.post(`${this.apiUrlD}/withdrawalAmount`, null, { params });
  }
  
  getAllTransectionData(): Observable<any> {
    debugger;
    const params = new HttpParams()
    .set('userId',Number(sessionStorage.getItem("userId")));
    return this.http.post(`${this.apiUrlD}/allAcTrans`, null, { params });
  }
  userDoTransection(acountNo:number,amount:number,acountType:string):Observable<any>{
    debugger;
    const params = new HttpParams()
    .set('acountNo',acountNo).set('amount',amount).set('userId',Number(sessionStorage.getItem("userId"))).set('acountType',acountType);
    return this.http.post(`${this.apiUrlD}/userTransection`, null, { params });
  }
  getAcountBalance(): Observable<any>{
    const params = new HttpParams()
    .set('userId',Number(sessionStorage.getItem("userId")));
    return this.http.post(`${this.apiUrlD}/getuserAcbalance`, null, { params });
  }
  
  
}
