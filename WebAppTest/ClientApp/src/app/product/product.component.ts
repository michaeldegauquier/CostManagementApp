import { ProductService } from './shared/product.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Log } from 'oidc-client';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public displayedColumns: string[] = ['DatePurchased', 'Description', 'Paid'];
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

}
