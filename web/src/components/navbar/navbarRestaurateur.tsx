import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";

export default function NavbarRestaurateur() {
  return (
    <div className="sticky z-40 top-0 bg-neutral-1 flex flex-row justify-between items-center px-20 py-10 border-b border-neutral-3">
      <div className="header-2 flex flex-row gap-x-4">
        <span>Go</span>
        <span className="text-primary">Manger</span>
      </div>
      <div className="flex flex-row gap-x-10">
        <Link to="/restaurant/order">
          <Button variant={"link"}>Commandes</Button>
        </Link>
        <Link to="/restaurant/menu">
          <Button variant={"link"}>Menu</Button>
        </Link>
        <Link to="/restaurant/profile">
          <Button variant={"link"}>Restaurant</Button>
        </Link>
      </div>
    </div>
  )
}
