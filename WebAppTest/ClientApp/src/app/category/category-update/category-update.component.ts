import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { noWhitespaceValidator, checkExistenceCatgNameUpdateValidator } from '../shared/categoryHelper';
import { Subscription } from 'rxjs';
import { CategoryService } from './../../category/shared/category.service';
import { CategoryComponent } from '../category.component';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./../../shared/styles.css', '../category.component.css']
})
export class CategoryUpdateComponent implements OnInit {

  public categories: any[];
  public category: any;
  categoryId: number;
  clickEventsubscription: Subscription;
  categoryUpdateForm: FormGroup;
  submitted = false;

  constructor(private categoryComponent: CategoryComponent, private modalService: NgbModal, private formBuilder: FormBuilder,
              private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getCategoryId().subscribe(id => this.categoryId = id);
    this.createForm(); // Always creates the default Form
    this.getCategoryById(this.categoryId);
    this.getCategoryList();
  }

  // Default Form
  createForm() {
    this.categoryUpdateForm = this.formBuilder.group({
      id: [0],
      name: ['', [Validators.required, Validators.maxLength(100)]]
    }, {
      validator: [noWhitespaceValidator('name'),
                  checkExistenceCatgNameUpdateValidator('name', this.categories, '')]
    });
  }

  // Updateable Form
  updateForm() {
    this.categoryUpdateForm = this.formBuilder.group({
      id: [this.category.id],
      name: [this.category.name, [Validators.required, Validators.maxLength(100)]]
    }, {
      validator: [noWhitespaceValidator('name'),
                  checkExistenceCatgNameUpdateValidator('name', this.categories, this.category.name)]
    });
  }

  async getCategoryById(id: number) {
    this.categoryService.getCategoryById(id.toString()).then((data: any[]) => {
      this.category = data;
      this.updateForm();
    })
    .catch((error) => {
      // if (error.status === 401) {}
    });
  }

  async getCategoryList() {
    this.categoryService.getAllCategories().then((data: any[]) => {
      this.categories = data;
      this.updateForm();
    })
    .catch((error) => {
      // if (error.status === 401) {}
    });
  }

  // Convenience getter for easy access to form fields
  get f() { return this.categoryUpdateForm.controls; }

  // Submit the form
  onSubmit() {
    this.submitted = true;

    // Stop here if form is invalid
    if (this.categoryUpdateForm.invalid) {
        return;
    }

    this.categoryService.updateCategory(this.categoryUpdateForm.value, this.categoryId.toString()).then((data: any[]) => {
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
    this.categoryUpdateForm.reset(); // Reset form
  }
}
