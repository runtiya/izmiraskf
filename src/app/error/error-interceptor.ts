import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
  HttpEvent
} from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Observable, ObservableInput, throwError } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(

  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error.error) {
          let errorMessage = error.error.message;
          return throwError(() => errorMessage);
        } else {
          return null;
        }

      })
    );
  }
}
