import dishesImage from "@/assets/images/dishes.png"
import { Button } from "@/components/ui/button"
import { Link } from "@tanstack/react-router"

export default function SignIn() {
  return (
    <div className="flex flex-row">
      <div className="flex flex-col px-20 items-center justify-center w-2/5">
        <div className="flex flex-col gap-y-20 w-full">
          <div className="header-1 flex flex-row gap-x-4">
            <span>Go</span>
            <span className="text-primary">Manger</span>
          </div>
          <div className="flex flex-col gap-y-10">
            <Link to="/loginAdmin">
              <Button className="w-full">Administrateur</Button>
            </Link>
            <Link to="/loginRestaurateur">
              <Button className="w-full">Restaurateur</Button>
            </Link>
            <Link to="/">
              <Button className="w-full">Client</Button>
            </Link>
          </div>
        </div>
      </div>
      <img src={dishesImage} alt="image of two restaurants plates" className="w-3/5"/>
    </div>
  );
}
