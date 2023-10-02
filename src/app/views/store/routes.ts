import { Route } from "@angular/router";
import { WrapperComponent } from "./wrapper/wrapper.component";
import { HomeComponent } from "./home/home.component";
import { FavoritesComponent } from "./favorites/favorites.component";
import { CartComponent } from "./cart/cart.component";
import { ProductDetailsComponent } from "./product-details/product-details.component";
import { CategoryDetailsComponent } from "./category-details/category-details.component";

export const STORE_ROUTES: Route[] = [
    {
        path: "",
        component: WrapperComponent,
        children: [
            {
                path: "",
                redirectTo: "/",
                pathMatch: "full"
            },
            { path: '', component: HomeComponent },
            { path: 'category/:id', component: CategoryDetailsComponent },
            { path: 'product/:id', component: ProductDetailsComponent },
            { path: 'favorites', component: FavoritesComponent },
            { path: 'cart', component: CartComponent }
        ]
    }
];