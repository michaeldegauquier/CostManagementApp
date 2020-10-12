import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from './category.model';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  readonly rootUrl = environment.rootUrl;

  // Shared Message for category ID
  private categoryId = new BehaviorSubject(0);

  constructor(private http: HttpClient) { }

  // Pass categoryId to shared variable for UpdateCategory
  sendCategoryId(id: number) {
    this.categoryId.next(id);
  }

  getCategoryId() {
    return this.categoryId.asObservable();
  }

  async getAllCategories() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token});
    return await this.http.get(this.rootUrl + '/Category', {headers: headers}).toPromise();
  }

  async getCategoryById(id: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token});
    return await this.http.get(this.rootUrl + '/Category/' + id, {headers: headers}).toPromise();
  }

  async createCategory(formData: Category) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token});
    return await this.http.post(this.rootUrl + '/Category', formData, {headers: headers}).toPromise();
  }

  async updateCategory(formData: Category, id: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token});
    return await this.http.put(this.rootUrl + '/Category/' + id, formData, {headers: headers}).toPromise();
  }

  async deleteCategory(id: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token});
    return await this.http.delete(this.rootUrl + '/Category/' + id, {headers: headers}).toPromise();
  }
}
