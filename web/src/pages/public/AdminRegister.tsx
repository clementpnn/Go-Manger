import RegisterAdminForm from "@/components/form/registerAdmin"
import NavbarAdmin from "@/components/navbar/navbarAdmin"

export default function AdminRegister() {
  return (
    <div className="flex flex-col gap-y-[3.75rem]">
      <NavbarAdmin />
      <div className="flex items-center justify-center">
        <RegisterAdminForm />
      </div>
    </div>
  )
}
