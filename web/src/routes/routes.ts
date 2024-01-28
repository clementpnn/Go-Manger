import { RootRoute, Route, Router } from "@tanstack/react-router"
import NotFound from "@/pages/public/NotFound"
import ClientInfo from "@/pages/client/ClientInfo";
import Home from "@/pages/public/Home";
import SignIn from "@/pages/public/SignIn";
import Restaurant from "@/pages/public/Restaurant";
import ClientOrder from "@/pages/client/ClientOrder";
import ClientNewOrder from "@/pages/client/ClientNewOrder";
import ClientOrderDetail from "@/pages/client/ClientOrderDetail";
import RestaurantInfo from "@/pages/restaurant/RestaurantInfo";
import RestaurantOrder from "@/pages/restaurant/RestaurantOrder";
import RestaurantMenuItem from "@/pages/restaurant/RestaurantMenuItem";
import RestaurantUpdateMenuItem from "@/pages/restaurant/RestaurantUpdateMenuItem";
import Admin from "@/pages/admin/Admin";
import AdminRestaurant from "@/pages/admin/AdminRestaurant";
import AdminAddRestaurant from "@/pages/admin/AdminAddRestaurant";
import AdminUpdateRestaurant from "@/pages/admin/AdminUpdateRestaurant";
import withClientAuth from "@/middleware/auth";
import LoginAdmin from "@/pages/public/LoginAdmin";
import LoginRestaurateur from "@/pages/public/LoginRestaurateur";
import LoginClient from "@/pages/public/LoginClient";

const rootRoute = new RootRoute()
// Public routes
const indexRoute = new Route({ getParentRoute: () => rootRoute, path: "/", component: Home })
const signInRoute = new Route({ getParentRoute: () => rootRoute, path: "/signin", component: SignIn })
const RestaurantInfoRoute = new Route({ getParentRoute: () => rootRoute, path: "/restaurant/$id", component: Restaurant })
const LoginAdminRoute = new Route({ getParentRoute : () => rootRoute, path: "/loginAdmin", component: LoginAdmin })
const LoginRestaurateurRoute = new Route({ getParentRoute : () => rootRoute, path: "/loginRestaurateur", component: LoginRestaurateur })
const LoginClientRoute = new Route({ getParentRoute : () => rootRoute, path: "/loginClient", component: LoginClient })
// Client routes
const ClientRoute = new Route({ getParentRoute: () => rootRoute, path: "/client", component: withClientAuth(ClientInfo, "client") })
const ClientOrderRoute = new Route({ getParentRoute: () => rootRoute, path: "/client/order", component: withClientAuth(ClientOrder, "client") })
const ClientNewOrderRoute = new Route({ getParentRoute: () => rootRoute, path: "/client/new", component: withClientAuth(ClientNewOrder, "client") })
const ClientOrderDetailRoute = new Route({ getParentRoute: () => rootRoute, path: "/client/order/$id", component: withClientAuth(ClientOrderDetail, "client") })
// Restaurant routes
const RestaurantRoute = new Route({ getParentRoute: () => rootRoute, path: "/restaurant", component: withClientAuth(RestaurantInfo, "restaurant") })
const RestaurantOrderRoute = new Route({ getParentRoute: () => rootRoute, path: "/restaurant/order", component: withClientAuth(RestaurantOrder, "restaurant") })
const RestaurantMenuItemRoute = new Route({ getParentRoute: () => rootRoute, path: "/restaurant/menu", component: withClientAuth(RestaurantMenuItem, "restaurant") })
const RestaurantUpdateMenuItemRoute = new Route({ getParentRoute: () => rootRoute, path: "/restaurant/update/$id", component: withClientAuth(RestaurantUpdateMenuItem, "restaurant") })
// Admin routes
const AdminRoute = new Route({ getParentRoute: () => rootRoute, path: "/admin", component: withClientAuth(Admin, "admin") })
const AdminRestaurantRoute = new Route({ getParentRoute: () => rootRoute, path: "/admin/restaurant", component: withClientAuth(AdminRestaurant, "admin") })
const AdminAddRestaurantRoute = new Route({ getParentRoute: () => rootRoute, path: "/admin/restaurant/add", component: withClientAuth(AdminAddRestaurant, "admin") })
const AdminUpdateRestaurantRoute = new Route({ getParentRoute: () => rootRoute, path: "/admin/restaurant/update/$id", component: withClientAuth(AdminUpdateRestaurant, "admin") })
// Not found route
const NotFoundRoute = new Route({ getParentRoute: () => rootRoute, path: "*", component: NotFound })

const routeTree = rootRoute.addChildren([indexRoute, signInRoute, RestaurantInfoRoute, LoginAdminRoute,
  LoginRestaurateurRoute,
  LoginClientRoute,
  ClientRoute,
  ClientOrderRoute,
  ClientNewOrderRoute,
  ClientOrderDetailRoute,
  RestaurantRoute,
  RestaurantOrderRoute,
  RestaurantMenuItemRoute,
  RestaurantUpdateMenuItemRoute,
  AdminRoute,
  AdminRestaurantRoute,
  AdminAddRestaurantRoute,
  AdminUpdateRestaurantRoute,
  NotFoundRoute
])

const router = new Router({ routeTree })

export default router

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}