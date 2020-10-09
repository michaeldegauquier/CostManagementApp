import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { noWhitespaceValidator } from '../shared/productHelper';
import { Subscription } from 'rxjs';
import { ProductService } from './../shared/product.service';
import { CategoryService } from './../../category/shared/category.service';
import { ProductComponent } from '../product.component';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./../../shared/styles.css', '../product.component.css']
})
export class ProductCreateComponent implements OnInit {

  public categories: any[];
  clickEventsubscription: Subscription;
  productCreateForm: FormGroup;
  submitted = false;

  constructor(private productComponent: ProductComponent, private modalService: NgbModal, private formBuilder: FormBuilder,
              private productService: ProductService, private categoryService: CategoryService) { }

  ngOnInit() {
    this.getCategoryList();
    this.createForm();
  }

  async getCategoryList() {
    this.categoryService.getAllCategories().then((data: any[]) => {
      this.categories = data;
    })
    .catch((error) => {
      // if (error.status === 401) {}
    });
  }

  // Default Form
  createForm() {
    this.productCreateForm = this.formBuilder.group({
      // validates date format yyyy-mm-dd
      datePurchased: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      categoryId: [null, [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(200)]],
      price: [null, [Validators.required, Validators.min(0), Validators.pattern(/^-?\d*(?:[.,]\d{1,2})?$/)]],
      paid: [false, Validators.required]
    }, {
      validator: noWhitespaceValidator('description')
    });
  }

  // Convenience getter for easy access to form fields
  get f() { return this.productCreateForm.controls; }

  // Submit the form
  onSubmit() {
    this.submitted = true;

    // Stop here if form is invalid
    if (this.productCreateForm.invalid) {
        return;
    }
    // convert categoryId (string) to number
    this.productCreateForm.value.categoryId = Number(this.productCreateForm.value.categoryId);
    this.productService.createProduct(this.productCreateForm.value).then((data: any[]) => {
      this.productComponent.getProductList(this.productComponent.yearFilter,
        this.productComponent.monthFilter,
        this.productComponent.dayFilter,
        this.productComponent.descFilter,
        this.productComponent.catgFilter);
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
    this.productCreateForm.reset(); // Reset form
  }
}
