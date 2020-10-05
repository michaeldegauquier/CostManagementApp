import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { ProductService } from './shared/product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from './shared/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public displayedColumns: string[] = ['DatePurchased', 'Description', 'Price', 'Paid', 'Actions'];
  public dataSource: MatTableDataSource<any[]>;

  // Default Date variables
  public dateToday = new Date();
  public yearToday = this.dateToday.getFullYear().toString();
  public monthToday = (this.dateToday.getMonth() + 1).toString();

  // Filter Date variables
  public yearFilter: string = this.dateToday.getFullYear().toString();
  public monthFilter: string = (this.dateToday.getMonth() + 1).toString();
  public dayFilter = '';
  public defaultYearMonth = `${this.yearFilter}-${Number(this.monthFilter) < 10 ? '0' + this.monthFilter : this.monthFilter}`;

  public amountDaysMonth = Array.from({length: 31}, (_, i) => i + 1);
  private products: any[];

  constructor(private productService: ProductService, private router: Router, private modalService: NgbModal) { }

  ngOnInit() {
    this.getProductList(this.yearToday, this.monthToday, '');
  }

  async getProductList(yearToday: string, monthToday: string, dayToday: string) {
    this.productService.getAllProductsByDate(yearToday, monthToday, dayToday).then((data: any[]) => {
      this.products = data;
      this.dataSource = new MatTableDataSource<any[]>(this.products);
    })
    .catch((error) => {
      // if (error.status === 401) {}
    });
  }

  selectYearMonth(ym: any) {
    if (ym.target.value.toString() !== '') {
      this.yearFilter = ym.target.value.toString().split('-')[0];
      this.monthFilter = ym.target.value.toString().split('-')[1];
    } else {
      this.yearFilter = '';
      this.monthFilter = '';
    }
    this.getProductList(this.yearFilter, this.monthFilter, this.dayFilter);
  }

  selectDay(day: any) {
    this.dayFilter = day.target.value.toString();
    this.getProductList(this.yearFilter, this.monthFilter, this.dayFilter);
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

  updatePropPaid(productId: number, propPaid: any) { // propPaid = event
    const product: Product = { Id: productId, Paid: propPaid.target.checked };

    this.productService.updateProductPropPaid(product, productId.toString()).then((data: any[]) => {
      // this.getProductList();
    })
    .catch((error) => {
      // if (error.status == 401) {}
    });
  }

  deleteProductById(productId: number) {
    this.productService.deleteProduct(productId.toString()).then((data: any[]) => {
      this.getProductList(this.yearToday, this.monthToday, '');
    })
    .catch((error) => {
      // if (error.status == 401) {}
    });
  }
}
