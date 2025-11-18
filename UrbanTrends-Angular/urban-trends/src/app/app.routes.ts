import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './components/cart/cart.component';
import { OrdersComponent } from './components/orders/orders.component';

export const routes: Routes = [
    {path:'', component:ProductListComponent},
    {path:'category/:category', component:ProductListComponent},
    {path:'carts', component:CartComponent},
    {path:'orders', component:OrdersComponent}

];
