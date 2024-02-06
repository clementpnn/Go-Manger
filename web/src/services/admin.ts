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

export function UpdateRestaurantService(id: number, { email, name, password, description, image }: { email: string, name: string, password: string, description: string, image: File }): Promise<UpdateRequest> {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("name", name);
  formData.append("password", password);
  formData.append("description", description);
  formData.append("image", image, image.name);

  return KyInstancePrivate.put(`admin/restaurant/${id}`, { body: formData }).json();
}