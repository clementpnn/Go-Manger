import RestaurantCard from "@/components/card/restaurantCard";
import NavbarAdmin from "@/components/navbar/navbarAdmin";
import { Button } from "@/components/ui/button";
import { AdminRestaurantService } from "@/services/admin";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

export default function AdminRestaurant() {
  const { isPending, isError, data, error } = useQuery({ queryKey: ["adminRestaurant"], queryFn: AdminRestaurantService });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="flex flex-col gap-y-[3.75rem]">
      <NavbarAdmin />
      <div className="flex flex-col gap-y-[3.75rem] px-20">
        <div className="flex flex-row justify-between items-center">
          <p className="header-2 text-neutral-3">Restaurants</p>
          <Link to="/admin/restaurant/add">
            <Button>Add Restaurant</Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-wrap justify-between px-20 gap-y-10">
        {data.data.map((item: Restaurant) => (
          <Link key={item.id} to="/admin/restaurant/$id" params={{ id: item.id.toString() }} className="pointer">
            <RestaurantCard restaurantName={item.name} description={item.description} image={item.image} />
          </Link>
        ))}
      </div>
    </div>
  );
}
