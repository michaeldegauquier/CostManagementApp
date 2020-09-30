import { ProductService } from './shared/product.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public displayedColumns: string[] = ['DatePurchased', 'Description', 'Price', 'Paid', 'Actions'];
  public dataSource: MatTableDataSource<any[]>;

  private products: any[];

  constructor(private productService: ProductService, private router: Router) { }

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

  // dd/MM/yyyy
  transformDateToString(dateString: string) {
    const day = dateString.substring(8, 10);
    const month = dateString.substring(5, 7);
    const year = dateString.substring(0, 4);

    const newDateString = day + '/' + month + '/' + year;
    return newDateString;
  }

}
