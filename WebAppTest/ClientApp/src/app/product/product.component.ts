import { ProductService } from './shared/product.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table/typings/table-data-source';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public displayedColumns: string[] = ['DatePurchased', 'Description', 'Paid'];
  public dataSource: MatTableDataSource<any[]>;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
  }

}
