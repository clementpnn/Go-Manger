import RestaurantCard from "@/components/card/restaurantCard";
import NavbarHome from "@/components/navbar/navbarHome";
import { HomeService } from "@/services/public";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

export default function Home() {
  const { isPending, isError, data, error } = useQuery({ queryKey: ["home"], queryFn: HomeService });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="flex flex-col gap-y-[3.75rem]">
      <NavbarHome />
      <div className="flex flex-col gap-y-[3.75rem] px-20">
        <p className="header-2 text-neutral-3">Restaurants</p>
      </div>
      <div className="flex flex-wrap justify-between px-20 gap-y-10">
        {data.data.map((item: Restaurant) => (
          <Link key={item.id} to="/restaurant/$id" params={{ id: item.id.toString() }} className="pointer">
            <RestaurantCard restaurantName={item.name} description={item.description} image={item.image} />
          </Link>
        ))}
      </div>
    </div>
  );
}
