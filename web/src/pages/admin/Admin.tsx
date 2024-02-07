import { Order } from "@/types/order";
import { Link } from "@tanstack/react-router";
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
    <>
      <div>Admin</div>
      <Link to="/admin/restaurant" className="pointer">
        Voir tous les restaurants
      </Link>
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
    </>
  );
}

// TODO: Tableau de bord de l'admin
// vu sur les dernières commandes passées avec leur état (SSE ou WebSocket)
// poussibilité d'avoir plus d'information sur la commande de de changer l'état de la commande
// voir les demandes de tickets pour les restaurants et de les traiter (à voir)

// Lien vers autres pages
// possibilité de voir les restaurants et de les modifier / supprimer
// possibilité de voir les clients et de les modifier / supprimer
