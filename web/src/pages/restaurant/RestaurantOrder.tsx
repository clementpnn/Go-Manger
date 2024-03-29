import NavbarRestaurateur from "@/components/navbar/navbarRestaurateur";
import { Button } from "@/components/ui/button";
import { UpdateRestaurantOrderService } from "@/services/restaurant";
import { Order } from "@/types/order";
import { useMutation } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export default function RestaurantOrder() {
  const [orders, setOrders] = useState<Order[]>([]);
  const { mutate } = useMutation({ mutationFn: UpdateRestaurantOrderService });

  useEffect(() => {
    setOrders([]);
    const source = new EventSource(`http://127.0.0.1:3000/api/restaurant/order?token=${localStorage.getItem("jwtToken")}`);

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
  const handleClick = (status: string, id: number) => {
    mutate({ status, id });
  };
  return (
    <div className="flex flex-col gap-y-[3.75rem]">
      <NavbarRestaurateur />
      <div className="flex flex-col gap-y-10 px-20">
        <p className="header-2 text-neutral-3">Commandes</p>
        {orders.length === 0 ? (
          <p className="body text-neutral-2">0 commande</p>
        ) : (
          <div className="flex flex-col gap-y-10">
            {orders.map((order) => (
              <div key={order.id}>
                <div className="flex justify-between items-center gap-y-2 px-4 py-4 border border-neutral-2 bg-neutral-0 rounded-md">
                  <div className="flex items-center gap-10">
                    <div className="flex justify-center items-center bg-secondary py-2 px-4 rounded-md w-28 h-12">
                      <p className="body text-neutral-2">{order.identificationCode}</p>
                    </div>
                    <div className="flex flex-col gap-y-2">
                      <p className="body-sm text-neutral-400">{order.status}</p>
                      <p className="header-4 text-neutral-2">{order.clientName}</p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-x-4">
                    <Link to="/restaurant/order/$id" params={{ id: order.id.toString() }}>
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
