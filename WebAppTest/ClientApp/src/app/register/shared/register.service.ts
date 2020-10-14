import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/login/shared/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  readonly rootUrl = environment.rootUrl;

  constructor(private http: HttpClient) { }

  async Register(formData: User) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return await this.http.post(this.rootUrl + '/User/Register', formData, {headers: headers}).toPromise();
  }
}
