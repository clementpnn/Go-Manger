import NavbarClient from "@/components/navbar/navbarCient";
import { OrderClient } from "@/types/order";
import { useEffect, useState } from "react";

export default function ClientOrder() {
  const [orders, setOrders] = useState<OrderClient[]>([]);

  useEffect(() => {
    setOrders([]);
    const source = new EventSource(`http://127.0.0.1:3000/api/client/order?token=${localStorage.getItem("jwtToken")}`);

    source.onmessage = (event: MessageEvent) => {
      setOrders(JSON.parse(event.data));
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
      <NavbarClient />
      <div className="flex flex-col gap-y-10">
        <div className="px-5 header-3 text-neutral-3 lg:px-20 lg:header-2">Mes Commandes</div>
        <div className="px-5 grid grid-cols-2 gap-5 lg:flex lg:flex-wrap lg:justify-between lg:px-20 lg:gap-10">
          {orders.map((order) => (
            <div key={order.id}>
              <div className="flex flex-col justify-center gap-y-3 bg-neutral-0 rounded-md px-2 h-[11.563rem] w-[11.563rem] lg:h-[19.063rem] lg:w-[19.063rem]">
                <div className="body-sm text-neutral-2 lg:body">{order.restaurantName}</div>
                <div className="body-sm text-neutral-2 lg:body">{order.identificationCode}</div>
                <div className="body-sm text-neutral-2 lg:body">{order.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
