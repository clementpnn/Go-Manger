import { Button } from "@/components/ui/button";
import { AdminDeleteRestaurantService } from "@/services/admin";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";

export default function DeleteRestaurantButton() {
  const { id } = useParams({ from: "/admin/restaurant/$id" });
  const navigate = useNavigate({ from: "/admin/restaurant/$id" });
  const { mutate } = useMutation({ mutationFn: AdminDeleteRestaurantService });
  const handleDeleteClick = () => {
    mutate(Number(id));
    navigate({ to: "/admin/restaurant" })
  }
  return (
    <Button className="w-fit" variant={"destructive"} onClick={handleDeleteClick}>Supprimer</Button>
  );
}
