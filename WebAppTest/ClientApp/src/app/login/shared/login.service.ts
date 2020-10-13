import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  readonly rootUrl = environment.rootUrl;

  constructor(private http: HttpClient) { }

  async Login(formData: User) {
    return await this.http.post(this.rootUrl + '/Session', formData).toPromise();
  }
}
