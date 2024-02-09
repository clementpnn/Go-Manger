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
  type: string
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