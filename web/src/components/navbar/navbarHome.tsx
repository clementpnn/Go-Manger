import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";

export default function NavbarHome() {
  return (
    <div className="sticky z-40 top-0 bg-neutral-1 flex flex-row justify-between items-center px-5 lg:px-20 py-10 border-b border-neutral-3">
      <div className="header-2 flex flex-row gap-x-4">
        <span>Go</span>
        <span className="text-primary">Manger</span>
      </div>
      <Link to="/signin">
        <Button>Se connecter</Button>
      </Link>
    </div>
  )
}