import { KyInstancePrivate } from "./utils/instance"

export function GetRestaurantProfileService(): Promise<RestaurantProfile> {
  return KyInstancePrivate.get("restaurant/me").json()
}