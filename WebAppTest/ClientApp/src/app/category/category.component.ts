import { Component, OnInit } from '@angular/core';
import { CategoryService } from './shared/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  private categories: any[];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.getCategoryList();
  }

  async getCategoryList() {
    this.categoryService.getAllCategories().then((data: any[]) => {
      this.categories = data;
      console.log(data);
    })
    .catch((error) => {
      // if (error.status === 401) {}
    });
  }
}
