import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { NgModule } from '@angular/core';
import { ProductFormComponent } from './features/products/components/product-form/product-form.component';
import { ProductListComponent } from './features/products/components/product-list/product-list.component';
import { ListClientsComponent } from './features/clients/components/list-clients/list-clients.component';

export const routes: Routes = [
    { path: 'products/:id', component: ProductFormComponent },
    { path: 'home', component: HomeComponent },
    {path: 'products', component: ProductFormComponent},
    {path: 'listaProductos', component: ProductListComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {path: 'clients', component:ListClientsComponent},
    { path: '**', redirectTo: '/home' } 
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}