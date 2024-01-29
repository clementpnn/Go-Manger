import { Link } from "@tanstack/react-router"

export interface RestaurantCardProperties {
  restaurantName: string,
  description: string,
  image: string
}

const RestaurantCard: React.FC<RestaurantCardProperties> = ({ restaurantName, description, image }) => {
  return (
    // TODO ajouter la logique pour récupérer le chemin vers restaurant/$id
    <Link to="/">
      <div className="relative h-[19.063rem] w-[19.063rem] flex flex-col justify-end">
        <img src={image} alt={image} className="h-[19.063rem] w-[19.063rem] object-cover rounded-md brightness-50"/>
        <div className="absolute flex flex-col px-2 py-2">
          <p className="header-3 text-neutral-0 z-40">{restaurantName}</p>
          <p className="body text-neutral-1 z-40">{description}</p>
        </div>
      </div>
    </Link>
  )
}

export default RestaurantCard
