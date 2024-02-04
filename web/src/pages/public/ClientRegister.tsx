import restaurant from "@/assets/images/restaurant.png"
import RegisterClientForm from "@/components/form/registerClient"

export default function ClientRegister() {
  return (
    <div className="flex flex-row">
      <RegisterClientForm />
      <img src={restaurant} alt="image of a restaurant" className="w-3/5 h-screen object-cover"/>
    </div>
  )
}
