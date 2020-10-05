import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from './product.model';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  readonly rootUrl = environment.rootUrl;

  // Shared Message for consultant ID
  private productId = new BehaviorSubject(0);

  constructor(private http: HttpClient) { }

  // Pass productId to shared variable for UpdateProduct
  sendProductId(id: number) {
    this.productId.next(id);
  }

  getProductId() {
    return this.productId.asObservable();
  }

  async getAllProducts() {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return await this.http.get(this.rootUrl + '/Product', {headers: headers}).toPromise();
  }

  async getAllProductsByDate(year: string, month: string, day: string) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return await this.http.get(this.rootUrl + `/Product/Date?year=${year}&month=${month}&day=${day}`, {headers: headers}).toPromise();
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

  async updateProductPropPaid(formData: Product, id: string) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return await this.http.put(this.rootUrl + '/Product/PropPaid/' + id, formData, {headers: headers}).toPromise();
  }

  async deleteProduct(id: string) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return await this.http.delete(this.rootUrl + '/Product/' + id, {headers: headers}).toPromise();
  }
}
