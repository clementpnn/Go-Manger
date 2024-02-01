type ApiRequest = {
  status: string
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

type Admin = {
  id: number
  name: string
  email: string
}

type AdminProfileInfo = ApiRequest & {
  data: Admin
}