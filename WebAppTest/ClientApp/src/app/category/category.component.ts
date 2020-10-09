import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { CategoryService } from './shared/category.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./../shared/styles.css', './category.component.css']
})
export class CategoryComponent implements OnInit {

  public displayedColumns: string[] = ['Name', 'Actions'];
  public dataSource: MatTableDataSource<any[]>;
  private categories: any[];

  // Sort Column variables
  public sortNameAsc = false;

  constructor(private categoryService: CategoryService, private router: Router,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.getCategoryList();
  }

  async getCategoryList() {
    this.categoryService.getAllCategories().then((data: any[]) => {
      this.categories = data;
      this.dataSource = new MatTableDataSource<any[]>(this.categories);
    })
    .catch((error) => {
      // if (error.status === 401) {}
    });
  }

  // open and close modal 'category-create-modal'
  openCategoryCreateModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'category-create-modal'}).result.then((result) => {
      // this.onReset();
    }, (reason) => {
      // this.onReset();
    });
  }

  // open and close modal 'category-update-modal'
  openCategoryUpdateModal(content, categoryId: number) {
    this.categoryService.sendCategoryId(categoryId);
    this.modalService.open(content, {ariaLabelledBy: 'category-update-modal'}).result.then((result) => {
      // this.onReset();
    }, (reason) => {
      // this.onReset();
    });
  }

  deleteCategoryById(categoryId: number, content) {
    this.categoryService.deleteCategory(categoryId.toString()).then((data: any[]) => {
      this.getCategoryList();
    })
    .catch((error) => {
      // if (error.status == 401) {}
      if (error.status === 500) {
        console.log(content);
        this.modalService.open(content, {ariaLabelledBy: 'category-delete-modal'}).result.then((result) => {
          // this.onReset();
        }, (reason) => {
          // this.onReset();
        });
      }
    });
  }

  // Sort Functions
  sortOnName() {
    if (this.sortNameAsc === false) {
      this.dataSource.data = this.categories.sort((a, b) => a.name.localeCompare(b.name));
      this.sortNameAsc = true;
    } else {
      this.dataSource.data = this.categories.sort((a, b) => b.name.localeCompare(a.name));
      this.sortNameAsc = false;
    }
  }

  checkSorted() {
    if (this.sortNameAsc === true) {
      this.sortNameAsc = false;
      this.sortOnName();
    }
  }

  // close the modal
  closeModal() {
    this.modalService.dismissAll(); // Close all modals
  }
}
