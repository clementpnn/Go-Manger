import { Button } from "@/components/ui/button";
import { AdminDeleteClientService } from "@/services/admin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { toast } from "sonner";

export default function DeleteButton() {
  const { id } = useParams({ from: "/admin/user/$id" });
  const queryClient = useQueryClient();
  const { mutate } = useMutation(() => AdminDeleteClientService(Number(id)), {
    onSuccess: () => {
      toast("Client supprimé avec succès");
      queryClient.invalidateQueries(["adminClientInfo"]);
    },
    // onError: (error) => {
    //   toast(Erreur lors de la suppression: ${error.message});
    // },
  });
  const handleDeleteClick = () => {
    mutate();
  };
  return (
    <Button onClick={handleDeleteClick}>Supprimer</Button>
  );
}
