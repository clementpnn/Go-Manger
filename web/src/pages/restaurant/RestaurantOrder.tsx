import NavbarRestaurateur from "@/components/navbar/navbarRestaurateur";
import RestaurateurOrder from "@/components/orders/restaurateurOrder";
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
    <div className="flex flex-col gap-y-[3.75rem]">
      <NavbarRestaurateur />
      <div className="flex flex-col gap-y-10 px-20">
        <p className="header-2 text-neutral-3">Commandes</p>
        {orders.length === 0 ? (
          <p className="body text-neutral-2">No orders</p>
        ) : (
          <div className="flex flex-col gap-y-10">
            {orders.map((order) => (
              <div key={order.id}>
                <RestaurateurOrder state={"default"} name={order.clientName} code={order.identificationCode} details={order.status} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
