import { Button } from "../ui/button";

interface RestaurateurOrderProperties {
  state: "default" | "accepted" | "finished",
  name: string,
  code: string,
  details: string
}

const RestaurateurOrder: React.FC<RestaurateurOrderProperties> = ({ state, name, code, details }) => {
  return (
    <div className="flex flex-col gap-y-5 px-4 py-4 border border-neutral-2 bg-neutral-0 rounded-md">
      <div className="flex flex-row justify-between items-center">
        <p className="body text-neutral-2">{name}</p>
        <p className="body text-neutral-2">{code}</p>
        <div className="flex flex-row gap-x-10">
          <Button className={state === "default" ? "block" : "hidden"}>Accepter</Button>
          <Button>{state === "accepted" ? "Terminer" : state === "default" ? "Refuser" : "Récupérer"}</Button>
        </div>
      </div>
      <div className="flex flex-row justify-start items-center">
        <p className="body text-neutral-2">{details}</p>
      </div>
    </div>
  )
}

export default RestaurateurOrder
