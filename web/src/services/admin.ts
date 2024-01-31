import { KyInstancePrivate } from "./utils/instance"

export function AdminRestaurantService(): Promise<HomeRequest> {
  return KyInstancePrivate.get("admin/restaurant").json()
}

export function RegisterRestaurantService({ email, name, image }: { email: string, name: string, image: File }): Promise<SignInRequest> {
  return KyInstancePrivate.post("admin/restaurant", { json: { email, name, image } }).json()
}

export function GetAdminProfileService(): Promise<AdminProfileInfo> {
  return KyInstancePrivate.get("admin/profile").json()
}

export function UpdateAdminProfileService({ email, name }: { email: string, name: string }): Promise<UpdateRequest> {
  return KyInstancePrivate.put("admin/profile", { json: { email, name } }).json()
}