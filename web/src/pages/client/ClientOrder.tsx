import NavbarClient from "@/components/navbar/navbarCient";
import { OrderClient } from "@/types/order";
import { Link } from "@tanstack/react-router";
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
          {orders.length === 0 ? (
            <p className="body text-neutral-2">No orders</p>
          ) : (
            <div className="flex flex-col gap-y-10 w-full">
              {orders.map((order) => (
                <Link key={order.id} to="/client/order/$id" params={{ id: order.id.toString() }} className="pointer">
                  <div className="flex justify-between items-center gap-y-2 px-4 py-4 border border-neutral-2 bg-neutral-0 rounded-md w-full">
                    <div className="flex items-center gap-10">
                      <div className="flex justify-center items-center bg-secondary py-2 px-4 rounded-md w-28 h-12">
                        <p className="body text-neutral-2">{order.identificationCode}</p>
                      </div>
                      <div className="flex flex-col gap-y-2">
                        <p className="body-sm text-neutral-400">{order.status}</p>
                        <p className="header-4 text-neutral-2">{order.restaurantName}</p>
                      </div>
                    </div>
                    {/* <div className="flex flex-row gap-x-4">
                      <Link to="/admin/$id" params={{ id: order.id.toString() }}>
                        <Button>Voir infos</Button>
                      </Link>
                      <Button
                        onClick={() => handleClick("started", order.id)}
                        className={`${order.status === "pending" ? "block" : "hidden"}`}
                      >
                        Accepter
                      </Button>
                      <Button
                        onClick={() => handleClick("refused", order.id)}
                        className={`${order.status === "pending" ? "block" : "hidden"}`}
                        variant={"destructive"}
                      >
                        Refuser
                      </Button>
                      <Button onClick={() => handleClick("ready", order.id)} className={`${order.status === "started" ? "block" : "hidden"}`}>
                        Terminée
                      </Button>
                      <Button onClick={() => handleClick("recover", order.id)} className={`${order.status === "ready" ? "block" : "hidden"}`}>
                        Récupérée
                      </Button>
                    </div> */}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
