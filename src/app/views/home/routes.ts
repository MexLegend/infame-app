import { Route } from "@angular/router";
import { HomeComponent } from "../home/home.component";
import { WrapperComponent } from "../store/wrapper/wrapper.component";
import { ProductDetailsComponent } from "../store/product-details/product-details.component";

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
        ]
    }
];