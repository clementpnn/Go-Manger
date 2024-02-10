import { RootRoute, Route, Router } from "@tanstack/react-router"
import { User } from "@/types/user"
import NotFound from "@/pages/public/NotFound"
import ClientInfo from "@/pages/client/ClientInfo";
import Home from "@/pages/public/Home";
import SignIn from "@/pages/public/SignIn";
import Restaurant from "@/pages/public/Restaurant";
import ClientOrder from "@/pages/client/ClientOrder";
import ClientNewOrder from "@/pages/client/ClientNewOrder";
import ClientOrderDetail from "@/pages/client/ClientOrderDetail";
import ClientProfile from "@/pages/client/ClientProfile";
import RestaurantDelete from "@/pages/restaurant/RestaurantDelete";
import RestaurantOrder from "@/pages/restaurant/RestaurantOrder";
import RestaurantAddMenuItem from "@/pages/restaurant/RestaurantAddMenuItem";
import RestaurantUpdateMenuItem from "@/pages/restaurant/RestaurantUpdateMenuItem";
import RestaurantProfile from "@/pages/restaurant/RestaurantProfile";
import Admin from "@/pages/admin/Admin";
import AdminRestaurant from "@/pages/admin/AdminRestaurant";
import AdminAddRestaurant from "@/pages/admin/AdminAddRestaurant";
import AdminUpdateRestaurant from "@/pages/admin/AdminUpdateRestaurant";
import withClientAuth from "@/middleware/auth";
import LoginAdmin from "@/pages/public/LoginAdmin";
import LoginRestaurateur from "@/pages/public/LoginRestaurateur";
import LoginClient from "@/pages/public/LoginClient";
import AdminProfile from "@/pages/admin/AdminProfile";
import AdminUpdateProfile from "@/pages/admin/AdminUpdateProfile";
import ClientUpdateProfile from "@/pages/client/ClientUpdateProfile";
import ClientRegister from "@/pages/public/ClientRegister";
import RestaurantUpdateProfile from "@/pages/restaurant/RestaurantUpdateProfile";
import AdminRegister from "@/pages/public/AdminRegister";
import AdminClient from "@/pages/admin/AdminClient";
import AdminClientInfo from "@/pages/admin/AdminClientInfo";
import AdminClientUpdate from "@/pages/admin/AdminClientUpdate";
import AdminAllClients from "@/pages/admin/AdminAllClients";
import AdminRestaurantInfo from "@/pages/admin/AdminRestaurantInfo";
import RestaurantMenuItem from "@/pages/restaurant/RestaurantMenuItem";

const rootRoute = new RootRoute()
// Public routes
const indexRoute = new Route({ getParentRoute: () => rootRoute, path: "/", component: Home })
const signInRoute = new Route({ getParentRoute: () => rootRoute, path: "/signin", component: SignIn })
const RestaurantInfoRoute = new Route({ getParentRoute: () => rootRoute, path: "/restaurant/$id", component: Restaurant })
const LoginAdminRoute = new Route({ getParentRoute : () => rootRoute, path: "/loginAdmin", component: LoginAdmin })
const LoginRestaurateurRoute = new Route({ getParentRoute : () => rootRoute, path: "/loginRestaurateur", component: LoginRestaurateur })
const LoginClientRoute = new Route({ getParentRoute : () => rootRoute, path: "/loginClient", component: LoginClient })
const RegisterClientRoute = new Route({ getParentRoute: () => rootRoute, path: "/registerClient", component: ClientRegister })
// Client routes
const ClientRoute = new Route({ getParentRoute: () => rootRoute, path: "/client", component: withClientAuth(ClientInfo, User.Client) })
const ClientOrderRoute = new Route({ getParentRoute: () => rootRoute, path: "/client/order", component: withClientAuth(ClientOrder, User.Client) })
const ClientNewOrderRoute = new Route({ getParentRoute: () => rootRoute, path: "/client/new", component: withClientAuth(ClientNewOrder, User.Client) })
const ClientOrderDetailRoute = new Route({ getParentRoute: () => rootRoute, path: "/client/order/$id", component: withClientAuth(ClientOrderDetail, User.Client) })
const ClientProfileRoute = new Route({ getParentRoute: () => rootRoute, path: "/client/profile", component: withClientAuth(ClientProfile, User.Client) })
const ClientUpdateProfileRoute = new Route({ getParentRoute: () => rootRoute, path: "/client/profile/update", component: withClientAuth(ClientUpdateProfile, User.Client) })
// Restaurant routes
const RestaurantOrderRoute = new Route({ getParentRoute: () => rootRoute, path: "/restaurant/order", component: withClientAuth(RestaurantOrder, User.Restaurant) })
const RestaurantMenuItemRoute = new Route({ getParentRoute: () => rootRoute, path: "/restaurant/menu", component: withClientAuth(RestaurantMenuItem, User.Restaurant) })
const RestaurantAddMenuItemRoute = new Route({ getParentRoute: () => rootRoute, path: "/restaurant/menu/add", component: withClientAuth(RestaurantAddMenuItem, User.Restaurant) })
const RestaurantUpdateMenuItemRoute = new Route({ getParentRoute: () => rootRoute, path: "/restaurant/update/$id", component: withClientAuth(RestaurantUpdateMenuItem, User.Restaurant) })
const RestaurantProfileRoute = new Route({ getParentRoute: () => rootRoute, path: "/restaurant/profile", component: withClientAuth(RestaurantProfile, User.Restaurant) })
const RestaurantUpdateProfileRoute = new Route({ getParentRoute: () => rootRoute, path: "/restaurant/profile/update", component: withClientAuth(RestaurantUpdateProfile, User.Restaurant) })
const RestaurantRoute = new Route({ getParentRoute: () => rootRoute, path: "/restaurant/profile/delete", component: withClientAuth(RestaurantDelete, User.Restaurant) })

// Admin routes
const AdminRoute = new Route({ getParentRoute: () => rootRoute, path: "/admin", component: withClientAuth(Admin, User.Admin) })
const AdminRestaurantRoute = new Route({ getParentRoute: () => rootRoute, path: "/admin/restaurant", component: withClientAuth(AdminRestaurant, User.Admin) })
const AdminAddRestaurantRoute = new Route({ getParentRoute: () => rootRoute, path: "/admin/restaurant/add", component: withClientAuth(AdminAddRestaurant, User.Admin) })
const AdminUpdateRestaurantRoute = new Route({ getParentRoute: () => rootRoute, path: "/admin/restaurant/update/$id", component: withClientAuth(AdminUpdateRestaurant, User.Admin) })
const AdminProfileRoute = new Route({ getParentRoute: () => rootRoute, path: "/admin/profile", component: withClientAuth(AdminProfile, User.Admin) })
const AdminUpdateAdminProfileRoute = new Route({ getParentRoute: () => rootRoute, path: "/admin/profile/update", component: withClientAuth(AdminUpdateProfile, User.Admin) })
const RegisterAdminRoute = new Route({ getParentRoute: () => rootRoute, path: "/admin/registerAdmin", component: withClientAuth(AdminRegister, User.Admin) })
const AdminClientListRoute = new Route({ getParentRoute: () => rootRoute, path: "/admin/user", component: withClientAuth(AdminClient, User.Admin) })
const AdminClientRoute = new Route({ getParentRoute: () => rootRoute, path: "/admin/user/$id", component: withClientAuth(AdminClientInfo, User.Admin) })
const AdminClientUpdateRoute = new Route({ getParentRoute: () => rootRoute, path: "/admin/user/update/$id", component: withClientAuth(AdminClientUpdate, User.Admin) })
const AdminAllClientsRoute = new Route({ getParentRoute: () => rootRoute, path: "/admin/clients", component: withClientAuth(AdminAllClients, User.Admin) })
const AdminRestaurantInfoRoute = new Route({ getParentRoute: () => rootRoute, path: "/admin/restaurant/$id", component: withClientAuth(AdminRestaurantInfo, User.Admin) })
// Not found route
const NotFoundRoute = new Route({ getParentRoute: () => rootRoute, path: "*", component: NotFound })

const routeTree = rootRoute.addChildren([indexRoute, signInRoute, RestaurantInfoRoute, LoginAdminRoute,
  LoginRestaurateurRoute,
  LoginClientRoute,
  RegisterClientRoute,
  RegisterAdminRoute,
  ClientRoute,
  ClientOrderRoute,
  ClientNewOrderRoute,
  ClientOrderDetailRoute,
  ClientProfileRoute,
  ClientUpdateProfileRoute,
  RestaurantRoute,
  RestaurantOrderRoute,
  RestaurantMenuItemRoute,
  RestaurantAddMenuItemRoute,
  RestaurantUpdateMenuItemRoute,
  RestaurantProfileRoute,
  RestaurantUpdateProfileRoute,
  AdminRoute,
  AdminRestaurantRoute,
  AdminAddRestaurantRoute,
  AdminUpdateRestaurantRoute,
  AdminProfileRoute,
  AdminUpdateAdminProfileRoute,
  AdminClientListRoute,
  AdminClientRoute,
  AdminClientUpdateRoute,
  AdminAllClientsRoute,
  AdminRestaurantInfoRoute,
  NotFoundRoute
])

const router = new Router({ routeTree })

export default router

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}