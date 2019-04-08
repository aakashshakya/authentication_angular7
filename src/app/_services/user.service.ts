import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { User } from '../_models';
import { environment } from 'src/environments/environment';
// import {map,tap, catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  // getAll():Observable<User[]>{
  //   return this.http.get<User[]>(`${environment.apiUrl}/Users`,{observe:'response'})
  //   .pipe(
  //     tap(response =>console.log(response)),
  //     map(response=>response.body),
  //     retry(3) //add retry before error handling
  //   );

  //   getAll():Observable<User[]>{
  //     const headers = new HttpHeaders({
  //       'UserName':'chandrabrt'
  //     });

      // const params = new HttpParams().append('UserName','chandrabrt');
  //     return this.http.get<User[]>(`${environment.apiUrl}/Users`,{headers:headers, params:params})
  //     .pipe(
  //       retry(3), //add retry before error handling
  //       catchError(this.handleError)
  //     );

  // }

  getAll():Observable<User[]>{
    return this.http.get<User[]>(`${environment.apiUrl}/users`)
  }

  getById(id:number):Observable<User>{
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`)

  }
  register(user:User):Observable<User>{
    return this.http.post<User>(`${environment.apiUrl}/users/`, user)
  }

  // update(id:number,user:User):Observable<User>{
  //   return this.http.put<User>(`${environment.apiUrl}/users/${id}`,user)
  // }
  update(id:number,user:User):Observable<User>{
    return this.http.put<User>(`${environment.apiUrl}/users/${id}`,user)
  }

  // delete(id:number):Observable<User>{
  //   return this.http.delete<User>(`${environment.apiUrl}/Users/${id}`)
  //   .pipe(
  //     catchError(this.handleError)
  //   );
  // }
  delete(id:number):Observable<User>{
    return this.http.delete<User>(`${environment.apiUrl}/users/${id}`);
  }

  // handleError(error:HttpErrorResponse){
  //   console.log(error);
  //   return throwError(error)
  // }
  
}
