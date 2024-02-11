import { useQuery } from "@tanstack/react-query";
import { GetRestaurantProfileService } from "@/services/restaurant"
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import NavbarRestaurateur from "@/components/navbar/navbarRestaurateur";
import LogoutButton from "@/components/button/LogoutButton";

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
      <p className="header-2 text-neutral-3 px-20">Profile</p>
      <div className="flex flex-row justify-between items-center px-20">
        <div className="flex flex-col gap-y-10 justify-center">
          <img src={`http://localhost:3000/uploads/${data.data.image}`} alt={`image of ${data.data.image}`} className="w-[12rem] h-[12rem] rounded-md"/>
          <p className="body text-neutral-2">{data.data.name}</p>
          <p className="body text-neutral-2">{data.data.description}</p>
        </div>
        <div className="flex gap-x-10">
          <Link to="/restaurant/profile/update">
            <Button>Modifier</Button>
          </Link>
          <Link to="/restaurant/profile/delete">
            <Button>Delete</Button>
          </Link>
          <LogoutButton />
        </div>
      </div>
    </div>
  )
}
