import NavbarRestaurateur from "@/components/navbar/navbarRestaurateur";
import { GetOrderInfoRestaurantService } from "@/services/restaurant";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";

export default function RestaurantOrderDetails() {
  const { id } = useParams({ from: "/restaurant/order/$id" });
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["RestaurantOrderInfo"],
    queryFn: () => GetOrderInfoRestaurantService(Number(id)),
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  console.log(data.data);
  return (
    <div className="flex flex-col gap-y-[3.75rem]">
      <NavbarRestaurateur />
      <div className="flex flex-col gap-y-10 px-20">
        <p className="header-2 text-neutral-3">Information Commande</p>
        <div className="flex flex-col gap-y-3">
          <p className="body text-neutral-2">CLIENT: {data.data.clientName}</p>
          <p className="body text-neutral-2">CODE: {data.data.identificationCode}</p>
          <p className="body text-neutral-2">STATUT : {data.data.status}</p>
          {data.data.orderItems.map((item, _) => (
            <div key={_} className="gap-4">
              <p className="body text-neutral-2">Plât: {item.name}</p>
              <p className="body text-neutral-2">Quantité : {item.quantity}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
