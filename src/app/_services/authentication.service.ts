import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../_models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  //the currentUser observable can be used when you want a component to reactively update when a
  // user logs in or out, for example in the app.component.ts so it can show/hide the main nav bar when the user logs in/out.
  public currentUser: Observable<User>;

  constructor(private http:HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

   public get currentUserValue():User{
     return this.currentUserSubject.value;
   }
   
   login(username:string, password:string){

    //  return this.http.post<any>(`${environment.apiUrl}/users/authenticate`,{username,password})
    return this.http.post<any>('http://localhost:5050/api/authenticate',{username, password})
     .pipe(map(user =>{
      // login successful if there's a jwt token in the response
      //  if(user &&user.token){}
          if(user && user.token){
            localStorage.setItem('currentUser',JSON.stringify(user));
            this.currentUserSubject.next(user);
          }
          return user;
     }));
   }
   
   logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
}
}
