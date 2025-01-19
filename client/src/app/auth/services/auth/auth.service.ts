import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../storage/storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(signupRequest: any):Observable<any>{

    let headers = new HttpHeaders();
    if (StorageService.getToken()) {
      headers = headers.append('Authorization', 'Bearer ' + StorageService.getToken());
    }
    return this.http.post("api/auth/signup", signupRequest, { headers });
  }

  login(loginRequest: any):Observable<any>{
    return this.http.post("api/auth/signin", loginRequest);
  }
}
