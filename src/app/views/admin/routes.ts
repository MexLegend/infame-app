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


export const ADMIN_ROUTES: Route[] = [
    {
        path: "",
        component: WrapperComponent
    },
    {
        path: ":storeId",
        component: WrapperComponent,
        children: [
            { path: '', component: DashboardComponent },
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
            { path: 'sizes', component: SizesComponent },
            { path: 'colors', component: ColorsComponent },
            { path: 'products', component: ProductsComponent },
            { path: 'orders', component: OrdersComponent },
            { path: 'settings', component: SettingsComponent }
        ]
    }
];