import NavbarAdmin from "@/components/navbar/navbarAdmin";
import { RestaurantInfoPublicService } from "@/services/public";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";

export default function Restaurant() {
  const { id } = useParams({ from: "/restaurant/$id" });
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["restaurantPublic"],
    queryFn: () => RestaurantInfoPublicService(Number(id)),
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="flex flex-col gap-y-[3.75rem]">
      <NavbarAdmin />
      <div className="flex flex-row justify-between items-center px-20">
        <div className="flex flex-col gap-x-4">
          <p className="header-2 text-neutral-3">{data.data.name}</p>
          <p className="body text-neutral-2">{data.data.description}</p>
        </div>
        <img src={`http://localhost:3000/uploads/${data.data.image}`} alt={`image of ${data.data.image}`} className="w-[25.75rem] h-[13.25rem] rounded-md"/>
      </div>
      <div className="flex flex-col gap-y-10 px-20">
        <p className="header-3 text-neutral-3">Menu</p>
        <div className="flex flex-wrap justify-between gap-20">
          {data.data.menuItems.map((item: any) => (
            <ul key={item.id}>
              <li className="list-disc body text-neutral-2">
                {item.name}
              </li>
              <li className="list-disc body text-neutral-2">
                {item.description}
              </li>
              <li className="list-disc body text-neutral-2">
                {item.price}
              </li>
              <li className="list-disc body text-neutral-2">
                {item.available === true ? "available" : "not available"}
              </li>
              <li className="list-disc body text-neutral-2">
                {item.type}
              </li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
