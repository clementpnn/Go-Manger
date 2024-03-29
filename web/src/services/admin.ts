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

export function RegisterAdminService({ email, name }: { email: string, name: string }): Promise<SignInRequest> {
  return KyInstancePrivate.post("auth/register/admin", { json: { email, name } }).json()
}

export function UpdateAdminClientProfileService({ email, name, id }: { email: string, name: string, id: string }): Promise<UpdateRequest> {
  return KyInstancePrivate.put(`admin/client/${Number(id)}`, { json: { email, name } }).json()
}

export function AdminClientService(): Promise<ClientList> {
  return KyInstancePrivate.get("admin/client").json()
}

export function AdminClientInfoService(id: number): Promise<ClientProfile> {
  return KyInstancePrivate.get(`admin/client/${id}`).json()
}

export function AdminDeleteClientService(id: number): Promise<ApiRequest> {
  return KyInstancePrivate.delete(`admin/client/${id}`).json()
}

export function UpdateRestaurantService({ email, name, password, description, image, id }: { email: string, name: string, password: string, description: string, image: File, id: string }): Promise<UpdateRequest> {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("name", name);
  formData.append("password", password);
  formData.append("description", description);
  formData.append("image", image, image.name);

  return KyInstancePrivate.put(`admin/restaurant/${Number(id)}`, { body: formData }).json();
}

export function UpdateRestaurantOrderAdminService({ status, id }: { status: string, id: number }): Promise<ApiRequest> {
  return KyInstancePrivate.put(`admin/client/order/${id}`, { json: status }).json()
}

export function GetOrderInfoAdminService(id: number): Promise<OrderInfoRestaurant> {
  return KyInstancePrivate.get(`admin/order/${id}`).json()
}

export function AdminDeleteRestaurantService(id: number): Promise<ApiRequest> {
  return KyInstancePrivate.delete(`admin/restaurant/${id}`).json()
}
