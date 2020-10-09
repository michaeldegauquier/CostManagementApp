import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { noWhitespaceValidator, checkExistenceCatgNameValidator } from '../shared/categoryHelper';
import { Subscription } from 'rxjs';
import { CategoryService } from './../../category/shared/category.service';
import { CategoryComponent } from '../category.component';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./../../shared/styles.css', '../category.component.css']
})
export class CategoryCreateComponent implements OnInit {

  public categories: any[];
  clickEventsubscription: Subscription;
  categoryCreateForm: FormGroup;
  submitted = false;

  constructor(private categoryComponent: CategoryComponent, private modalService: NgbModal, private formBuilder: FormBuilder,
              private categoryService: CategoryService) { }

  ngOnInit() {
    this.createForm();
    this.getCategoryList();
  }

  // Default Form
  createForm() {
    this.categoryCreateForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(100)]]
    }, {
      validator: [noWhitespaceValidator('name'),
                  checkExistenceCatgNameValidator('name', this.categories)]
    });
  }

  async getCategoryList() {
    this.categoryService.getAllCategories().then((data: any[]) => {
      this.categories = data;
      this.createForm();
    })
    .catch((error) => {
      // if (error.status === 401) {}
    });
  }

  // Convenience getter for easy access to form fields
  get f() { return this.categoryCreateForm.controls; }

  // Submit the form
  onSubmit() {
    this.submitted = true;

    // Stop here if form is invalid
    if (this.categoryCreateForm.invalid) {
        return;
    }

    this.categoryService.createCategory(this.categoryCreateForm.value).then((data: any[]) => {
      this.categoryComponent.getCategoryList();
    })
    .catch((error) => {
      if (error.status === 404) {
        console.log('No connection with Database (404)');
      }
    });

    this.onReset();
  }

  // Reset the form
  onReset() {
    this.submitted = false;
    this.modalService.dismissAll(); // Close all modals
    this.categoryCreateForm.reset(); // Reset form
  }
}
