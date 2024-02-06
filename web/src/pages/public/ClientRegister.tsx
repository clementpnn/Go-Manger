import restaurant from "@/assets/images/restaurant.png"
import RegisterClientForm from "@/components/form/registerClient"

export default function ClientRegister() {
  return (
    <div className="flex justify-center items-center h-screen">
      <RegisterClientForm />
      <img src={restaurant} alt="image of a restaurant" className="hidden lg:block lg:w-3/5 lg:h-screen"/>
    </div>
  )
}
