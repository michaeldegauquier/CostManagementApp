import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { noWhitespaceValidator } from '../shared/productHelper';
import { ProductService } from './../shared/product.service';
import { ProductComponent } from '../product.component';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['../product.component.css']
})
export class ProductCreateComponent implements OnInit {

  productCreateForm: FormGroup;
  submitted = false;

  constructor(private productComponent: ProductComponent, private modalService: NgbModal,
              private formBuilder: FormBuilder, private productService: ProductService) { }

  ngOnInit() {
    this.createForm();
  }

  // open and close modal
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-product-create'}).result.then((result) => {
      this.onReset();
    }, (reason) => {
      this.onReset();
    });
  }

  // default Form
  createForm() {
    this.productCreateForm = this.formBuilder.group({
      // validates date format yyyy-mm-dd
      datePurchased: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      description: ['', [Validators.required, Validators.maxLength(200)]],
      price: [null, [Validators.required, Validators.min(0)]],
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

    // stop here if form is invalid
    if (this.productCreateForm.invalid) {
        return;
    }

    this.productService.createProduct(this.productCreateForm.value).then((data: any[]) => {
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
    this.modalService.dismissAll();
    this.productCreateForm.reset();
  }
}
