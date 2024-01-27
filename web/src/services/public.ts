import { KyInstancePublic } from "./utils/instance"

export function HomeService(): Promise<HomeRequest> {
  return KyInstancePublic.get("home").json()
}

export function LoginService({ type, email, password }: { type: "client" | "restaurant" | "admin", email: string, password: string }): Promise<SignInRequest> {
  return KyInstancePublic.post(`auth/login/${type}`, { json: { email, password } }).json()
}

export function RestaurantInfoPublicService(id: number): Promise<RestaurantInfoPublic> {
  return KyInstancePublic.get(`search/${id}`).json()
}