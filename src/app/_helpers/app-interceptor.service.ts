import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpParams, HttpErrorResponse,  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AuthenticationService } from '../_services';

@Injectable({
  providedIn: 'root'
})
export class AppInterceptorService implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {}

   handleError(error:HttpErrorResponse){
    console.log(error);
    return throwError(error)
  }

  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
  //   return next.handle(req);

  // }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    let currentUser = this.authenticationService.currentUserValue;

    const headers = new HttpHeaders({
      'x-auth-token':`${currentUser.token}`,
    });

    // const params = new HttpParams().append('UserName','chandrabrt');

    const clone = req.clone({
      headers:headers
      // params:params
    });
    return next.handle(clone)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );

  }
}

