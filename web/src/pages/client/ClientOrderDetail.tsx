import NavbarClient from "@/components/navbar/navbarCient";
import { GetOrderInfoClientService } from "@/services/client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";

export default function ClientOrderDetail() {
  const { id } = useParams({ from: "/admin/$id" });
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["ClientOrderInfo"],
    queryFn: () => GetOrderInfoClientService(Number(id)),
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <div className="flex flex-col gap-y-[3.75rem]">
      <NavbarClient />
      <div className="flex flex-col gap-y-10 px-20">
        <p className="header-2 text-neutral-3">Order Informations</p>
        <div className="flex flex-col gap-y-3">
          <p className="body text-neutral-2">CODE: {data.data.identificationCode}</p>
          <p className="body text-neutral-2">STATUS : {data.data.status}</p>
        </div>
      </div>
    </div>
  )
}
