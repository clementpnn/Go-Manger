export interface RestaurantCardProperties {
  restaurantName: string;
  description: string;
  image: string;
}

const RestaurantCard: React.FC<RestaurantCardProperties> = ({ restaurantName, description, image }) => {
  return (
    <div className="relative z-30 h-[11.563rem] w-[11.563rem] lg:h-[19.063rem] lg:w-[19.063rem] flex flex-col justify-end">
      <img
        src={`http://localhost:3000/uploads/${image}`}
        alt="image restaurant"
        className="h-[11.563rem] w-[11.563rem] lg:h-[19.063rem] lg:w-[19.063rem] object-cover rounded-md brightness-50"
      />
      <div className="absolute flex flex-col px-2 py-2">
        <p className="header-4 lg:header-3 text-neutral-0 z-40">{restaurantName}</p>
        <p className="body-sm lg:body text-neutral-1 z-40">{description}</p>
      </div>
    </div>
  );
};

export default RestaurantCard;
