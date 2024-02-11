import NavbarAdmin from "@/components/navbar/navbarAdmin";
import { Button } from "@/components/ui/button";
import { RestaurantInfoPublicService } from "@/services/public";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";

export default function AdminRestaurantInfo() {
  const { id } = useParams({ from: "/admin/restaurant/$id" });
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["restaurantAdminInfo"],
    queryFn: () => RestaurantInfoPublicService(Number(id)),
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const sortedMenuItems: Record<MenuItem["type"], MenuItem[]> = {
    starter: [],
    dish: [],
    dessert: [],
    drink: [],
  };

  data.data.menuItems.forEach((item: MenuItem) => {
    sortedMenuItems[item.type]?.push(item);
  });

  return (
    <div className="flex flex-col gap-y-[3.75rem]">
      <NavbarAdmin />
      <div className="flex flex-row justify-between items-center px-20">
        <div className="flex flex-col gap-y-3">
          <p className="header-2 text-neutral-3">{data.data.name}</p>
          <p className="body text-neutral-2">{data.data.description}</p>
          <Link to="/admin/restaurant/update/$id" params={{ id: data.data.id.toString() }}>
            <Button>
              Modifier
            </Button>
          </Link>
        </div>
        <img src={`http://localhost:3000/uploads/${data.data.image}`} alt={`image of ${data.data.image}`} className="w-[25.75rem] h-[13.25rem] rounded-md"/>
      </div>
      <div className="flex flex-col gap-y-10 px-20">
        <p className="header-3 text-neutral-3">Menu</p>
        <div className="flex flex-wrap justify-between gap-20">
        {Object.entries(sortedMenuItems).map(
          ([type, items]) =>
            items.length > 0 && (
              <div key={type} className="w-full">
                <h2 className="header-4 font-bold capitalize mb-4">{type}</h2>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {items.map((item: any) => (
                    <div key={item.id} className="p-6 flex flex-col gap-2 border border-neutral-3 rounded-md bg-white">
                      <h3 className="header-4 font-semibold">{item.name}</h3>
                      <p className="body-sm text-gray-500">{item.description}</p>
                      <p className="body text-gray-700 font-bold">{item.price} €</p>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}