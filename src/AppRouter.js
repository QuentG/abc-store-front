import { Redirect, Route, Switch } from "react-router"
import { NotFound } from "./components/HttpErrors/NotFound"
import { Products } from "./components/Products/Products"
import { Product } from "./components/Products/Product"
import { Cart } from "./components/Cart/Cart"

export const AppRouter = () => {
    return (
        // App Router who registered all routes
        <Switch>
            <Route exact path={'/'} component={Products} />
            <Route path={'/products/:id'} component={Product} />
            <Route exact path={'/cart'} component={Cart} />

            <Route path={'/404'} component={NotFound} />
            <Route path={'*'} render={() => <Redirect to={'/404'}/>} />
        </Switch>
    )
}