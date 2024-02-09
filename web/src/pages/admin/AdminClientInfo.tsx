import DeleteButton from "@/components/button/DeleteButton";
import NavbarAdmin from "@/components/navbar/navbarAdmin";
import { Button } from "@/components/ui/button";
import { AdminClientInfoService } from "@/services/admin";
import { OrderClient } from "@/types/order";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export default function AdminClientInfo() {
  const { id } = useParams({ from: "/admin/user/$id" });
  const [orders, setOrders] = useState<OrderClient[]>([]);

  useEffect(() => {
    setOrders([]);
    const source = new EventSource(`http://127.0.0.1:3000/api/admin/client/order/${id}?token=${localStorage.getItem("jwtToken")}`);

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
  }, [id]);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["adminClientInfo"],
    queryFn: () => AdminClientInfoService(Number(id)),
  });
  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <div className="flex flex-col gap-y-[3.75rem]">
        <NavbarAdmin />
        <div className="flex flex-row justify-between items-center px-20">
          <div className="flex flex-col gap-y-10 justify-center">
            <p className="text-neutral-3 header-2">{data.data.name}'s profile</p>
            <p className="body text-neutral-2">{data.data.name}</p>
            <p className="body text-neutral-2">{data.data.email}</p>
          </div>
          <div className="flex flex-row gap-x-10">
            <Link to="/admin/user/update/$id" params={{ id: data.data.id.toString() }}>
              <Button>Modifier</Button>
            </Link>
            <DeleteButton />
          </div>
        </div>
      </div>
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
