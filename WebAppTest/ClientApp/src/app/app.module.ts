import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { MatPaginatorModule, MatDialogModule } from '@angular/material';
import { MatTableModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { ProductComponent } from './product/product.component';
import { ProductCreateComponent } from './product/product-create/product-create.component';
import { ProductUpdateComponent } from './product/product-update/product-update.component';
import { CategoryComponent } from './category/category.component';
import { CategoryCreateComponent } from './category/category-create/category-create.component';
import { CategoryUpdateComponent } from './category/category-update/category-update.component';
import { OverviewPricesComponent } from './overview-prices/overview-prices.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    ProductComponent,
    ProductCreateComponent,
    ProductUpdateComponent,
    CategoryComponent,
    CategoryCreateComponent,
    CategoryUpdateComponent,
    OverviewPricesComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatMenuModule,
    MatPaginatorModule,
    MatTableModule,
    MatTooltipModule,
    MatDialogModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
