import LoginForm from "@/components/form/login";
import dishesImage from "@/assets/images/dishes.png"

export default function LoginRestaurateur() {
  return (
    <div className="flex flex-row">
      <LoginForm type="restaurant"/>
      <img src={dishesImage} alt="image of two restaurants plates" className="w-3/5 h-screen"/>
    </div>
  )
}
