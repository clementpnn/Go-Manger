import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";

export default function NavbarAdmin() {
  return (
    <div className="sticky z-40 top-0 bg-neutral-1 flex flex-row justify-between items-center px-20 py-10 border-b border-neutral-3">
      <div className="header-2 flex flex-row gap-x-4">
        <span>Go</span>
        <span className="text-primary">Manger</span>
      </div>
      <div className="flex flex-row gap-x-5">
        <Link to="/admin">
          <Button variant={"link"}>commandes</Button>
        </Link>
        <Link to="/admin/restaurant">
          <Button variant={"link"}>restaurants</Button>
        </Link>
        <Link to="/admin/clients">
          <Button variant={"link"}>clients</Button>
        </Link>
        <Link to="/admin/registerAdmin">
          <Button variant={"link"}>ajouter admin</Button>
        </Link>
        <Link to="/admin/profile">
          <Button variant={"link"}>profile</Button>
        </Link>
      </div>
    </div>
  )
}