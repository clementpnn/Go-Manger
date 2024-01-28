import LoginForm from "@/components/form/login";
import dishesImage from "@/assets/images/dishes.png"

export default function LoginClient() {
  return (
    <div className="flex justify-center items-center h-screen">
      <LoginForm type="client"/>
      <img src={dishesImage} alt="image of two restaurants plates" className="hidden lg:block lg:w-3/5 lg:h-screen"/>
    </div>
  )
}
