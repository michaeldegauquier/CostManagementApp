import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  readonly rootUrl = environment.rootUrl;

  constructor(private http: HttpClient) { }

  async getAllProducts() {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return await this.http.get(this.rootUrl + '/Product', {headers: headers}).toPromise();
  }
}
