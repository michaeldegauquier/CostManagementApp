import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dateSubstring_1_10, noWhitespaceValidator } from '../shared/productHelper';
import { Subscription } from 'rxjs';
import { ProductService } from './../shared/product.service';
import { ProductComponent } from '../product.component';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['../product.component.css']
})
export class ProductUpdateComponent implements OnInit {

  product: any;
  productId: number;
  clickEventsubscription: Subscription;
  productUpdateForm: FormGroup;
  submitted = false;

  constructor(private productComponent: ProductComponent, private modalService: NgbModal,
              private formBuilder: FormBuilder, private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProductId().subscribe(id => this.productId = id);
    this.createForm(); // Always creates the default Form
    this.getProductById(this.productId);
  }

  // Default Form
  createForm() {
    this.productUpdateForm = this.formBuilder.group({
      Id: [0],
      // validates date format yyyy-mm-dd
      datePurchased: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      description: ['', [Validators.required, Validators.maxLength(200)]],
      price: [null, [Validators.required, Validators.min(0)]],
      paid: [false, Validators.required]
    }, {
      validator: noWhitespaceValidator('description')
    });
  }

  // Updateable Form
  updateForm() {
    this.productUpdateForm = this.formBuilder.group({
      Id: [this.product.id],
      // validates date format yyyy-mm-dd
      datePurchased: [dateSubstring_1_10(this.product.datePurchased), [Validators.required,
                                     Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      description: [this.product.description, [Validators.required, Validators.maxLength(200)]],
      price: [this.product.price, [Validators.required, Validators.min(0)]],
      paid: [this.product.paid, Validators.required]
    }, {
      validator: noWhitespaceValidator('description')
    });
  }

  async getProductById(id: number) {
    this.productService.getProductById(id.toString()).then((data: any[]) => {
      this.product = data;
      console.log(data);
      this.updateForm();
    })
    .catch((error) => {
      // if (error.status === 401) {}
    });
  }

  // Convenience getter for easy access to form fields
  get f() { return this.productUpdateForm.controls; }

  // Submit the form
  onSubmit() {
    this.submitted = true;

    // Stop here if form is invalid
    if (this.productUpdateForm.invalid) {
        return;
    }

    this.productService.updateProduct(this.productUpdateForm.value, this.productId.toString()).then((data: any[]) => {
      this.productComponent.ngOnInit();
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
    this.productUpdateForm.reset(); // Reset form
  }
}
