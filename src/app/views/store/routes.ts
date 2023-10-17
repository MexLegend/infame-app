import { Route } from "@angular/router";
import { HomeComponent } from "../home/home.component";
import { WrapperComponent } from "./wrapper/wrapper.component";
import { StoreComponent } from "./store/store.component";
import { FavoritesComponent } from "./favorites/favorites.component";
import { CartComponent } from "./cart/cart.component";
import { ProductDetailsComponent } from "./product-details/product-details.component";
import { CategoryDetailsComponent } from "./category-details/category-details.component";

export const STORE_ROUTES: Route[] = [
    {
        path: "store/:slug",
        component: WrapperComponent,
        children: [
            { path: '', component: StoreComponent, data: { transparentNavbar: true } },
            { path: 'category/:id', component: CategoryDetailsComponent },
            { path: 'product/:id', component: ProductDetailsComponent },
            { path: 'favorites', component: FavoritesComponent },
            { path: 'cart', component: CartComponent }
        ]
    }
];