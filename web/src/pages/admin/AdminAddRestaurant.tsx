import RegisterRestaurantForm from "@/components/form/registerRestaurant";
import restaurant from "@/assets/images/restaurant.png"

export default function AdminAddRestaurant() {
  return (
    <div className="flex flex-row">
      <RegisterRestaurantForm/>
      <img src={restaurant} alt="image of a restaurant" className="w-3/5 h-screen object-cover"/>
    </div>
  );
}
