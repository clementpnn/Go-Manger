import { Button } from "@/components/ui/button";
import { AdminDeleteClientService } from "@/services/admin";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";

export default function DeleteButton() {
  const { id } = useParams({ from: "/admin/user/$id" });
  const navigate = useNavigate({ from: "/admin/user/$id" });
  const { mutate } = useMutation({ mutationFn: AdminDeleteClientService });
  const handleDeleteClick = () => {
    mutate(Number(id));
    navigate({ to: "/admin/clients" })
  }
  return (
    <Button onClick={handleDeleteClick}>Supprimer</Button>
  );
}
