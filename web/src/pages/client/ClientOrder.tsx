import NavbarClient from "@/components/navbar/navbarCient";
import { OrderClient } from "@/types/order";
import { useEffect, useState } from "react";

export default function ClientOrder() {
  const [orders, setOrders] = useState<OrderClient[]>([]);

  useEffect(() => {
    setOrders([]);
    const source = new EventSource(`http://127.0.0.1:3000/api/client/order?token=${localStorage.getItem("jwtToken")}`);

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
    <>
      <NavbarClient />
      <div>ClientOrder</div>
      {orders.map((order) => (
        <div key={order.id}>
          <div>
            <div>{order.restaurantName}</div>
            <div>{order.identificationCode}</div>
            <div>{order.status}</div>
          </div>
        </div>
      ))}
    </>
  );
}
