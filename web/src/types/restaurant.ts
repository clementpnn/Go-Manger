import { z } from "zod";

export enum MenuItemType {
  Starter = "starter",
  Dish = "dish",
  Dessert = "dessert",
  Drink = "drink",
}


export const FormRestaurantMenuItem = z.object({
  name: z.string().min(0, { message: "Name cannot be empty" }).max(25, { message: "Name cannot be longer than 25 characters" }),
  description: z.string().min(1, { message: "Description cannot be empty" }).max(255, { message: "Description cannot be longer than 255 characters" }),
  type: z.nativeEnum(MenuItemType),
  price: z.number().min(0, { message: "Price must be a positive number" }).max(1000, { message: "Price seems unrealistically high" }),
});

