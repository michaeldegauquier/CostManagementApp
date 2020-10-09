import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { ProductService } from './shared/product.service';
import { CategoryService } from './../category/shared/category.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from './shared/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./../shared/styles.css', './product.component.css']
})
export class ProductComponent implements OnInit {

  public displayedColumns: string[] = ['DatePurchased', 'Category', 'Description', 'Price', 'Paid', 'Actions'];
  public dataSource: MatTableDataSource<any[]>;
  private products: any[];
  public categories: any[];

  // Default Date variables
  public dateToday = new Date();
  public yearToday = this.dateToday.getFullYear().toString();
  public monthToday = (this.dateToday.getMonth() + 1).toString();

  // Filter variables
  public yearFilter: string = this.dateToday.getFullYear().toString();
  public monthFilter: string = (this.dateToday.getMonth() + 1).toString();
  public dayFilter = '';
  public descFilter = '';
  public catgFilter = '';
  public defaultYearMonth = `${this.yearFilter}-${Number(this.monthFilter) < 10 ? '0' + this.monthFilter : this.monthFilter}`;
  public amountDaysMonth = Array.from({length: 31}, (_, i) => i + 1); // Days 1 - 31
  public totalToPaid: string;
  public totalPaid: string;
  public totalPrice: string;

  // Sort Column variables
  public sortDateAsc = false;
  public sortPriceAsc = false;
  public sortPaidAsc = false;

  constructor(private productService: ProductService, private categoryService: CategoryService, private router: Router,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.getProductList(this.yearToday, this.monthToday, '', '', '');
    this.getCategoryList();
  }

  async getProductList(yearToday: string, monthToday: string, dayToday: string, description: string, category: string) {
    this.productService.getAllProductsByFilter(yearToday, monthToday, dayToday, description, category).then((data: any[]) => {
      this.products = data;
      this.dataSource = new MatTableDataSource<any[]>(this.products);
      this.checkSorted();
      this.totalToPaid = this.getTotalPrices(this.products)[0];
      this.totalPaid = this.getTotalPrices(this.products)[1];
      this.totalPrice = this.getTotalPrices(this.products)[2];
    })
    .catch((error) => {
      // if (error.status === 401) {}
    });
  }

  async getCategoryList() {
    this.categoryService.getAllCategories().then((data: any[]) => {
      this.categories = data;
    })
    .catch((error) => {
      // if (error.status === 401) {}
    });
  }

  getTotalPrices(product: any) {
    let totalToPaid = 0;
    let totalPaid = 0;
    let totalPrice = 0;
    product.forEach(element => {
      totalToPaid += element.paid === false ? element.price : 0.00;
      totalPaid += element.paid === true ? element.price : 0.00;
      totalPrice += element.price;
    });
    return [totalToPaid.toFixed(2), totalPaid.toFixed(2), totalPrice.toFixed(2)];
  }

  selectYearMonth(ym: any) { // ym = event
    if (ym.target.value.toString() !== '') {
      this.yearFilter = ym.target.value.toString().split('-')[0];
      this.monthFilter = ym.target.value.toString().split('-')[1];
    } else {
      this.yearFilter = '';
      this.monthFilter = '';
    }
    this.getProductList(this.yearFilter, this.monthFilter, this.dayFilter, this.descFilter, this.catgFilter);
  }

  selectDay(day: any) { // day = event
    this.dayFilter = day.target.value.toString();
    this.getProductList(this.yearFilter, this.monthFilter, this.dayFilter, this.descFilter, this.catgFilter);
  }

  selectCategoryFilter(category: any) { // category = event
    this.catgFilter = category.target.value.toString();
    this.getProductList(this.yearFilter, this.monthFilter, this.dayFilter, this.descFilter, this.catgFilter);
  }

  selectSearchBar(description: any) { // description = ngModel
    this.descFilter = description.toString();
    this.getProductList(this.yearFilter, this.monthFilter, this.dayFilter, this.descFilter, this.catgFilter);
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
      this.getProductList(this.yearFilter, this.monthFilter, this.dayFilter, this.descFilter, this.catgFilter);
    })
    .catch((error) => {
      // if (error.status == 401) {}
    });
  }

  deleteProductById(productId: number) {
    this.productService.deleteProduct(productId.toString()).then((data: any[]) => {
      this.getProductList(this.yearFilter, this.monthFilter, this.dayFilter, this.descFilter, this.catgFilter);
    })
    .catch((error) => {
      // if (error.status == 401) {}
    });
  }

  // Sort Functions
  sortOnDate() {
    if (this.sortDateAsc === false) {
      this.dataSource.data = this.products.sort((a, b) => a.datePurchased.localeCompare(b.datePurchased));
      this.sortDateAsc = true;
    } else {
      this.dataSource.data = this.products.sort((a, b) => b.datePurchased.localeCompare(a.datePurchased));
      this.sortDateAsc = false;
    }
    this.sortPaidAsc = false, this.sortPriceAsc = false;
  }

  sortOnPrice() {
    if (this.sortPriceAsc === false) {
      this.dataSource.data = this.products.sort((a, b) => a.price - b.price);
      this.sortPriceAsc = true;
    } else {
      this.dataSource.data = this.products.sort((a, b) => b.price - a.price);
      this.sortPriceAsc = false;
    }
    this.sortPaidAsc = false, this.sortDateAsc = false;
  }

  sortOnPaid() {
    if (this.sortPaidAsc === false) {
      this.dataSource.data = this.products.sort((a, b) => a.paid - b.paid);
      this.sortPaidAsc = true;
    } else {
      this.dataSource.data = this.products.sort((a, b) => b.paid - a.paid);
      this.sortPaidAsc = false;
    }
    this.sortDateAsc = false, this.sortPriceAsc = false;
  }

  checkSorted() {
    if (this.sortPaidAsc === true) {
      this.sortPaidAsc = false;
      this.sortOnPaid();
    } else if (this.sortPriceAsc === true) {
      this.sortPriceAsc = false;
      this.sortOnPrice();
    } else if (this.sortDateAsc === true) {
      this.sortDateAsc = false;
      this.sortOnDate();
    }
  }
}
