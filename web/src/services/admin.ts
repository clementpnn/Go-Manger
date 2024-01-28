import { KyInstancePrivate } from "./utils/instance"

export function AdminRestaurantService(): Promise<HomeRequest> {
  return KyInstancePrivate.get("admin/restaurant").json()
}

export function RegisterRestaurantService({ email, name, image }: { email: string, name: string, image: File }): Promise<SignInRequest> {
  return KyInstancePrivate.post("admin/restaurant", { json: { email, name, image } }).json()
}