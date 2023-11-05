import { Route } from "@angular/router";
import { WrapperComponent } from "./wrapper/wrapper.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { BillboardsComponent } from "./billboards/billboards.component";
import { CategoriesComponent } from "./categories/categories.component";
import { SizesComponent } from "./sizes/sizes.component";
import { ProductsComponent } from "./products/products.component";
import { OrdersComponent } from "./orders/orders.component";
import { SettingsComponent } from "./settings/settings.component";
import { ColorsComponent } from "./colors/colors.component";
import { NewBillboardComponent } from "./new-billboard/new-billboard.component";
import { NewCategoryComponent } from "./new-category/new-category.component";
import { NewSizeComponent } from "./new-size/new-size.component";
import { NewColorComponent } from "./new-color/new-color.component";
import { NewProductComponent } from "./new-product/new-product.component";


export const ADMIN_ROUTES: Route[] = [
    {
        path: "",
        component: WrapperComponent
    },
    {
        path: ":storeId",
        component: WrapperComponent,
        children: [
            { path: '', redirectTo: "overview", pathMatch: "full" },
            { path: 'overview', component: DashboardComponent },
            { path: 'billboards', component: BillboardsComponent },
            {
                path: 'billboards/new', component: NewBillboardComponent,
                data: { action: 'Create' }
            },
            {
                path: 'billboards/:id', component: NewBillboardComponent,
                data: { action: 'Edit' }
            },
            { path: 'categories', component: CategoriesComponent },
            {
                path: 'categories/new', component: NewCategoryComponent,
                data: { action: 'Create' }
            },
            {
                path: 'categories/:id', component: NewCategoryComponent,
                data: { action: 'Edit' }
            },
            { path: 'sizes', component: SizesComponent },
            {
                path: 'sizes/new', component: NewSizeComponent,
                data: { action: 'Create' }
            },
            {
                path: 'sizes/:id', component: NewSizeComponent,
                data: { action: 'Edit' }
            },
            { path: 'colors', component: ColorsComponent },
            {
                path: 'colors/new', component: NewColorComponent,
                data: { action: 'Create' }
            },
            {
                path: 'colors/:id', component: NewColorComponent,
                data: { action: 'Edit' }
            },
            { path: 'products', component: ProductsComponent },
            {
                path: 'products/new', component: NewProductComponent,
                data: { action: 'Create' }
            },
            {
                path: 'products/:id', component: NewProductComponent,
                data: { action: 'Edit' }
            },
            { path: 'orders', component: OrdersComponent },
            { path: 'settings', component: SettingsComponent }
        ]
    }
];