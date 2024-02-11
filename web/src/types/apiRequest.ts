type ApiRequest = {
  message: string
}

type SignInRequest = ApiRequest & {
  data: string
}

type UpdateRequest = ApiRequest & {
  data: string
}

type Restaurant = {
  id: number
  name: string
  description: string
  image: string
}

type RestaurantProfile = ApiRequest & {
  data: Restaurant
}

type HomeRequest = ApiRequest & {
  data: Restaurant[]
}

type MenuItem = {
  id: number
  name: string
  description: string
  price: number
  available: boolean
  type: "starter" | "dish" | "dessert" | "drink"
}

type RestaurantWithMenu = Restaurant & {
  menuItems: MenuItem[]
}

type RestaurantInfoPublic = ApiRequest & {
  data: RestaurantWithMenu
}

type MenuItemByRestaurant = ApiRequest & {
  data: MenuItem[]
}

type Admin = {
  id: number
  name: string
  email: string
}

type AdminProfileInfo = ApiRequest & {
  data: Admin
}

type Client = {
  id: number
  name: string
  email: string
}

type ClientProfile = ApiRequest & {
  data: Client
}

type ClientList = ApiRequest & {
  data: Client[]
}

type Order = {
  id: number
  name: string
  status: string
  identificationCode: string
}

type OrderInfo = ApiRequest & {
  data: Order
}