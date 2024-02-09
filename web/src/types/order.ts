export interface Order {
  id: number;
  identificationCode: string;
  status: string;
  clientName: string;
}

export interface OrderClient {
  id: number;
  identificationCode: string;
  status: string;
  restaurantName: string;
}
