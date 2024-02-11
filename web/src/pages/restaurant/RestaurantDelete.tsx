import NavbarRestaurateur from "@/components/navbar/navbarRestaurateur";
import { Button } from "@/components/ui/button";
import { DeleteRestaurantService } from "@/services/restaurant";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { toast } from "sonner";

export default function RestaurantDelete() {
  const navigate = useNavigate({ from: "/restaurant/profile/delete" })
  const { mutate, data, isError, error, status } = useMutation({ mutationFn: DeleteRestaurantService });
  useEffect(() => {
    if (status === "success") {
      toast(data.message);
    }

    if (isError) {
      console.log(error);
    }

  }, [status, data, isError, error]);
  const handleDeleteClick = () => {
    mutate()
    localStorage.removeItem('jwtToken');
    navigate({ to: "/"})
  }
  return (
    <div className="flex flex-col gap-y-[3.75rem]">
      <NavbarRestaurateur />
      <div className="w-full flex flex-col items-center gap-6">
        <h2 className="header-2">Supprimer le restaurant</h2>
        <div className="flex gap-4">
          <Link to="/restaurant/profile">
            <Button variant="secondary">Cancel</Button>
          </Link>
          <Button size="sm" onClick={handleDeleteClick}>Delete</Button>
        </div>
      </div>
    </div>
  );
}
