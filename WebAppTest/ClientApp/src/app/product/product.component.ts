import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { ProductService } from './shared/product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public displayedColumns: string[] = ['DatePurchased', 'Description', 'Price', 'Paid', 'Actions'];
  public dataSource: MatTableDataSource<any[]>;

  private products: any[];

  constructor(private productService: ProductService, private router: Router, private modalService: NgbModal) { }

  ngOnInit() {
    this.getProductList();
  }

  async getProductList() {
    this.productService.getAllProducts().then((data: any[]) => {
      this.products = data;
      this.dataSource = new MatTableDataSource<any[]>(this.products);
    })
    .catch((error) => {
      // if (error.status === 401) {}
    });
  }

  // open and close modal 'product-create-modal'
  openProductCreateModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'product-create-modal'}).result.then((result) => {
      // this.onReset();
    }, (reason) => {
      // this.onReset();
    });
  }

  // open and close modal 'product-update-modal'
  openProductUpdateModal(content, productId: number) {
    this.productService.sendProductId(productId);
    this.modalService.open(content, {ariaLabelledBy: 'product-update-modal'}).result.then((result) => {
      // this.onReset();
    }, (reason) => {
      // this.onReset();
    });
  }

  deleteProductById(id: number) {
    this.productService.deleteProduct(id.toString()).then((data: any[]) => {
      this.getProductList();
    })
    .catch((error) => {
      // if (error.status == 401) {}
    });
  }
}
