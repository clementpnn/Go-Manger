import { KyInstancePrivate } from "./utils/instance"

export function AdminRestaurantService(): Promise<HomeRequest> {
  return KyInstancePrivate.get("admin/restaurant").json()
}

export function RegisterRestaurantService({ email, name, image, description }: { email: string, name: string, image: File, description: string }): Promise<SignInRequest> {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("name", name);
  formData.append("description", description);
  formData.append("image", image, image.name);

  return KyInstancePrivate.post("admin/restaurant", { body: formData }).json();
}

export function GetAdminProfileService(): Promise<AdminProfileInfo> {
  return KyInstancePrivate.get("admin/profile").json()
}

export function UpdateAdminProfileService({ email, name }: { email: string, name: string }): Promise<UpdateRequest> {
  return KyInstancePrivate.put("admin/profile", { json: { email, name } }).json()
}

export function AdminClientService(): Promise<ClientList> {
  return KyInstancePrivate.get("admin/client").json()
}