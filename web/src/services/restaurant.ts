import { KyInstancePrivate } from "./utils/instance"
import { MenuItemType } from "@/types/restaurant";

export function GetRestaurantProfileService(): Promise<RestaurantProfile> {
  return KyInstancePrivate.get("restaurant/me").json()
}

export function UpdateRestaurantProfileService({ email, name, password, description, image }: { email: string, name: string, password: string, description: string, image: File }): Promise<UpdateRequest> {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("name", name);
  formData.append("password", password);
  formData.append("description", description);
  formData.append("image", image, image.name);

  return KyInstancePrivate.put("restaurant/me/update", { body: formData }).json();
}

export function AddRestaurantMenuItemService({ name, description, type, price }: { name: string, description: string, type: MenuItemType, price : number }): Promise<ApiRequest> {
  return KyInstancePrivate.post("restaurant/menu", { json: { name, description, type, price } }).json()
}