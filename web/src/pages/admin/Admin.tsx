import NavbarAdmin from "@/components/navbar/navbarAdmin";
import RestaurateurOrder from "@/components/orders/restaurateurOrder";
import { Order } from "@/types/order";
import { useEffect, useState } from "react";

export default function Admin() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setOrders([]);
    const source = new EventSource(`http://127.0.0.1:3000/api/admin/order?token=${localStorage.getItem("jwtToken")}`);

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
      <NavbarAdmin />
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

// TODO: Tableau de bord de l'admin
// vu sur les dernières commandes passées avec leur état (SSE ou WebSocket)
// poussibilité d'avoir plus d'information sur la commande de de changer l'état de la commande
// voir les demandes de tickets pour les restaurants et de les traiter (à voir)

// Lien vers autres pages
// possibilité de voir les restaurants et de les modifier / supprimer
// possibilité de voir les clients et de les modifier / supprimer
