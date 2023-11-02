import { Route } from "@angular/router";
import { HomeComponent } from "../home/home.component";
import { WrapperComponent } from "../store/wrapper/wrapper.component";
import { ProductDetailsComponent } from "../store/product-details/product-details.component";
import { FavoritesComponent } from "./favorites/favorites.component";
import { CartComponent } from "./cart/cart.component";
import { authGuard } from "src/app/guards/auth.guard";
import { OrderCheckoutComponent } from "./order-checkout/order-checkout.component";

export const HOME_ROUTES: Route[] = [
    {
        path: "",
        component: WrapperComponent,
        children: [
            { path: '', component: HomeComponent },
            {
                path: "product/:id",
                component: ProductDetailsComponent
            },
            { path: 'favorites', canActivate: [authGuard], component: FavoritesComponent },
            { path: 'cart', component: CartComponent },
            { path: 'order/:orderId', component: OrderCheckoutComponent }
        ]
    }
];