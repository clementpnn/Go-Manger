import RestaurantCard from "@/components/card/restaurantCard";
import NavbarHome from "@/components/navbar/navbarHome";
import { HomeService } from "@/services/public";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export default function Home() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const jwt = localStorage.getItem("jwtToken");
  useEffect(() => {
    if (jwt) {
      setIsAuthorized(true);
    }
  }, [jwt]);
  const { isPending, isError, data, error } = useQuery({ queryKey: ["home"], queryFn: HomeService });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="flex flex-col gap-y-[3.75rem]">
      {isAuthorized ? <div>navbarclient</div> : <NavbarHome /> }
      <div className="flex flex-col gap-y-[3.75rem] px-5 lg:px-20">
        <p className="header-2 text-neutral-3">Restaurants</p>
      </div>
      <div className="flex flex-wrap px-5 lg:justify-between lg:px-20 lg:gap-y-10">
        {data.data.map((item: Restaurant) => (
          <Link key={item.id} to="/restaurant/$id" params={{ id: item.id.toString() }} className="pointer">
            <RestaurantCard restaurantName={item.name} description={item.description} image={item.image} />
          </Link>
        ))}
      </div>
    </div>
  );
}
