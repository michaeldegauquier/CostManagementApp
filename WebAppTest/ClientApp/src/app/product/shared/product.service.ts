import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from './product.model';

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

  async getProductById(id: string) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return await this.http.get(this.rootUrl + '/Product/' + id, {headers: headers}).toPromise();
  }

  async createProduct(formData: Product) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return await this.http.post(this.rootUrl + '/Product', formData, {headers: headers}).toPromise();
  }

  async updateProduct(formData: Product, id: string) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return await this.http.put(this.rootUrl + '/Product/' + id, formData, {headers: headers}).toPromise();
  }

  async deleteProduct(id: string) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return await this.http.delete(this.rootUrl + '/Product/' + id, {headers: headers}).toPromise();
  }
}
