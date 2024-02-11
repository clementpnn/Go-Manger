import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import menuFill from "@/assets/icons/menu-fill.svg"
import { useState } from "react";

export default function NavbarClient() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className={`${isOpen ? "border-none" : "border-b"} sticky top-0 z-40 flex flex-row justify-between items-center w-full px-5 py-10 border-neutral-3 bg-neutral-1 lg:px-20`}>
        <div className="header-2 flex flex-row gap-x-4">
          <span>Go</span>
          <span className="text-primary">Manger</span>
        </div>
        <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}><img src={menuFill} alt="menu" /></Button>
        <div className="hidden md:flex flex-row gap-x-10">
          <Link to="/">
            <Button variant={"link"}>Restaurants</Button>
          </Link>
          <Link to="/client/order">
            <Button variant={"link"}>Commandes</Button>
          </Link>
          <Link to="/client/profile">
            <Button variant={"link"}>Profil</Button>
          </Link>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden flex flex-col gap-4 bg-neutral-1 border-b border-neutral-3 pb-10">
          <Link to="/">
            <Button variant={"link"}>Restaurants</Button>
          </Link>
          <Link to="/client/order">
            <Button variant={"link"}>Commandes</Button>
          </Link>
          <Link to="/client/profile">
            <Button variant={"link"}>Profil</Button>
          </Link>
        </div>
      )}
    </>
  )
}