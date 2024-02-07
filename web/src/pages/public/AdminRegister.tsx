import dishes from "@/assets/images/dishes.png"
import RegisterAdminForm from "@/components/form/registerAdmin"

export default function AdminRegister() {
  return (
    <div className="flex justify-center items-center h-screen">
      <RegisterAdminForm />
      <img src={dishes} alt="image of a dishes" className="hidden lg:block lg:w-3/5 lg:h-screen"/>
    </div>
  )
}
