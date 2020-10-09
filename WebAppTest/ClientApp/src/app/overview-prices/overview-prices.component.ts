import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { ProductService } from '../product/shared/product.service';
import { CategoryService } from './../category/shared/category.service';

@Component({
  selector: 'app-overview-prices',
  templateUrl: './overview-prices.component.html',
  styleUrls: ['./overview-prices.component.css']
})
export class OverviewPricesComponent implements OnInit {

  public displayedColumns: string[] = ['Month', 'Price', 'PricePaid', 'PriceToPaid'];
  public dataSource: MatTableDataSource<any[]>;
  private overviewPrices: any[];
  public categories: any[];

  // Default Date variables
  public dateToday = new Date();
  public yearToday = this.dateToday.getFullYear().toString();

  // Filter variables
  public yearFilter = this.yearToday;
  public year = this.yearToday;
  public catgFilter = '';
  public defaultYear = this.yearToday;

  constructor(private productService: ProductService, private categoryService: CategoryService, private router: Router) { }

  ngOnInit() {
    this.getCategoryList();
    this.getOverviewPricesList(this.yearFilter, this.catgFilter);
  }

  async getOverviewPricesList(year: string, catg: string) {
    this.productService.GetOverviewPriceProductsByFilter(year, catg).then((data: any[]) => {
      this.overviewPrices = data;
      console.log(data);
      this.dataSource = new MatTableDataSource<any[]>(this.overviewPrices);
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

  selectYear(year: any) { // year = event
    this.yearFilter = year.target.value.toString();
  }

  selectCategory(catg: any) { // catg = event
    this.catgFilter = catg.target.value.toString();
  }

  searchButton() {
    this.getOverviewPricesList(this.yearFilter, this.catgFilter);
    this.year = this.yearFilter;
  }

  // translate month number to month string --> 1 = January,...
  translateMonthNumber(monthNumber: number) {
    const monthDict = { 1 : 'Januari', 2 : 'Februari', 3 : 'Maart', 4 : 'April', 5 : 'Mei', 6 : 'Juni', 7 : 'Juli', 8 : 'Augustus',
                        9 : 'September', 10 : 'Oktober', 11 : 'November', 12 : 'December' };

    return monthDict[monthNumber];
  }
}
