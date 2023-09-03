import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import * as CryptoJS from 'crypto-js';
import { globalFunctions } from "../functions/global.function";

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(
    private globalFunctions: globalFunctions
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          const responseData = event.body;
          responseData.data = this.decryptData(event.body.data);
          delete responseData.error;
          delete responseData.message;

          return event.clone({ body: responseData });
          //return event;
        }
      })
    );
  }

  decryptData(data) {
    try {
      const iv = data.iv;
      const encryptedData = data.encryptedData;
      const algorithm = 'aes-256-cbc'; // Şifreleme algoritması
      const secretKey = '7ce2daf0bdac7688ca2fd73f08a8e130'; // Gizli anahtar

      const key = CryptoJS.enc.Utf8.parse(secretKey);
      const ivValue = CryptoJS.enc.Hex.parse(iv);
      const encryptedDataBytes = CryptoJS.enc.Hex.parse(encryptedData);

      const decryptedData = CryptoJS.AES.decrypt({ ciphertext: encryptedDataBytes }, key, {
        iv: ivValue,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });

      return JSON.parse(decryptedData.toString(CryptoJS.enc.Utf8));
    } catch (error) {
      return data;
    }

  }

}
