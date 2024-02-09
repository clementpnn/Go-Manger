import { useMutation } from "@tanstack/react-query"
import { Button } from "../ui/button"
import { useNavigate } from "@tanstack/react-router"
import { DeleteClientService } from "@/services/client"

export default function DeleteClientButton() {
  const { mutate } = useMutation({ mutationFn: DeleteClientService })
  const navigate = useNavigate()
  const handleDeleteClientClick = () => {
    mutate()
    localStorage.removeItem("jwtToken")
    navigate({ to: "/signin" })
    window.location.reload()
  }
  return (
    <Button onClick={handleDeleteClientClick} variant={"destructive"}>Supprimer</Button>
  )
}
