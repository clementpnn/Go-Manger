import { useNavigate } from "@tanstack/react-router";
import { Button } from "../ui/button";

export default function LogoutButton() {
  const navigate = useNavigate()
  const handleClickLogout = () => {
    localStorage.removeItem("jwtToken")
    navigate({ to: "/signin" })
    window.location.reload()
  }
  return (
    <Button onClick={handleClickLogout}>Se déconnecter</Button>
  )
}
