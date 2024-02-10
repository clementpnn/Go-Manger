import { Button } from "../ui/button";

interface RestaurateurOrderProperties {
  state: "default" | "accepted" | "finished",
  name: string,
  code: string,
  details: string
}

const RestaurateurOrder: React.FC<RestaurateurOrderProperties> = ({ state, name, code, details }) => {
  return (
    <div className="flex justify-between items-center gap-y-2 px-4 py-4 border border-neutral-2 bg-neutral-0 rounded-md">
      <div className="flex items-center gap-10">
        <div className="flex justify-center items-center bg-secondary py-2 px-4 rounded-md w-28 h-12">
          <p className="body text-neutral-2">{code}</p>
        </div>
        <div className="flex flex-col gap-y-2">
          <p className="body-sm text-neutral-400">{details}</p>
          <p className="header-4 text-neutral-2">{name}</p>
        </div>
      </div>
      <div className="flex flex-row gap-x-4">
        <Button variant="secondary">{state === "accepted" ? "Terminer" : state === "default" ? "Refuser" : "Récupérer"}</Button>
        <Button className={state === "default" ? "block" : "hidden"}>Accepter</Button>
      </div>
    </div>
  )
}

export default RestaurateurOrder
