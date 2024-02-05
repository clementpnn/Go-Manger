import { KyInstancePrivate } from "./utils/instance"

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