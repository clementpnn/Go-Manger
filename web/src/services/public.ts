import { kyInstancePublic } from "./utils/instance"

export function HomeService(): Promise<HomeRequest> {
  return kyInstancePublic.get("restaurant").json()
}

export function LoginService({ type, email, password }: { type: "client" | "restaurant" | "admin", email: string, password: string }): Promise<SignInRequest> {
  return kyInstancePublic.post(`auth/login/${type}`, { json: { email, password } }).json()
}

export function RestaurantInfoPublicService(id: number): Promise<RestaurantInfoPublic> {
  return kyInstancePublic.get(`restaurant/${id}`).json()
}