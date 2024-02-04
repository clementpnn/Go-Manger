import { Order } from "@/types/order";
import { useEffect, useState } from "react";

export default function RestaurantOrder() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setOrders([]);
    const source = new EventSource(`http://127.0.0.1:3000/api/restaurant/order?token=${localStorage.getItem("jwtToken")}`);

    source.onmessage = (event: MessageEvent) => {
      setOrders((prevOrders) => [...prevOrders, JSON.parse(event.data)]);
    };

    source.onerror = function (event: Event) {
      console.error("EventSource failed:", event);
      source.close();
    };

    return () => {
      source.close();
    };
  }, []);
  return (
    <div>
      <div>Restaurant</div>
      {orders.length === 0 ? (
        <p>No orders</p>
      ) : (
        <div className="flex">
          {orders.map((order) => (
            <div key={order.id}>
              <div>{order.clientName}</div>
              <div>{order.identificationCode}</div>
              <div>{order.status}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
