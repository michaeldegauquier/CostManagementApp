import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { OverviewPricesComponent } from './overview-prices/overview-prices.component';

const appRoutes: Routes = [
    { path: '', component: ProductComponent, pathMatch: 'full' },
    { path: 'category', component: CategoryComponent },
    { path: 'overview_prices', component: OverviewPricesComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}
