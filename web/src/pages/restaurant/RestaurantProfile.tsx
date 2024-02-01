import { useQuery } from "@tanstack/react-query";
import { GetRestaurantProfileService } from "@/services/restaurant"
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import NavbarRestaurateur from "@/components/navbar/navbarRestaurateur";

export default function RestaurantProfile() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["RestaurantProfile"],
    queryFn: () => GetRestaurantProfileService()
  })
  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <div className="flex flex-col gap-y-[3.75rem]">
      <NavbarRestaurateur />
      <p className="header-2 text-neutral-3 px-20">profile</p>
      <div className="flex flex-row justify-between items-center px-20">
        <div className="flex flex-col gap-y-10 justify-center">
          <img src={data.data.image} alt="profile picture" className="w-[12rem] h-[12rem] rounded-md"/>
          <p className="body text-neutral-2">{data.data.name}</p>
          <p className="body text-neutral-2">{data.data.description}</p>
        </div>
        {/* /restaurant/profile/update */}
        <Link to="/">
          <Button>Modifier</Button>
        </Link>
      </div>
    </div>
  )
}
